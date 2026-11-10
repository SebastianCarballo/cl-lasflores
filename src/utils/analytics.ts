// Distribuye eventos a Plausible y Meta Pixel cuando están habilitados.

import { SITE } from '@/utils/site';

export const ANALYTICS_DOMAIN: string = import.meta.env.PUBLIC_ANALYTICS_DOMAIN ?? '';

// Taxonomía de eventos (los que ya emiten los CTAs con data-event).
// Los nombres se mantienen estables: cambiarlos rompe el histórico.
export const EVENTOS = [
  'buscar',
  'whatsapp_click',
  'compartir_ficha',
  'elegir_plan',
  'alta_negocio',
  'contacto_formulario',
  'contacto_email',
  'newsletter_suscribe',
  'view_content',
  'slot_publicar',
  'cta_publicar',
  'cta_directorio',
  'cta_historia',
  'cta_publicidad',
  'cta_socio',
  'cta_socio_sumarse',
  'contacto_ventas',
  'guia_descarga',
  'guia_a_publicar',
  'home_copy_exposure',
] as const;

export type Evento = (typeof EVENTOS)[number];

declare global {
  type MetaPixelFunction = ((...args: unknown[]) => void) & {
    callMethod?: (...args: unknown[]) => void;
    queue: unknown[][];
    push: (...args: unknown[]) => void;
    loaded: boolean;
    version: string;
  };

  interface Window {
    plausible?: (event: string, opts?: { props?: Record<string, string> }) => void;
    fbq?: MetaPixelFunction;
    _fbq?: MetaPixelFunction;
  }
}

export function track(event: string, props: Record<string, string> = {}): void {
  try {
    if (ANALYTICS_DOMAIN) window.plausible?.(event, { props });
  } catch {
    // La analítica nunca debe romper la experiencia
  }
  try {
    // Meta Pixel: eventos estándar (Contact/Lead) y custom.
    if (!window.fbq) return;
    const standard: Record<string, string> = {
      buscar: 'Search',
      view_content: 'ViewContent',
      whatsapp_click: 'Contact',
      contacto_ventas: 'Contact',
      contacto_formulario: 'Lead',
      contacto_email: 'Contact',
      alta_negocio: 'Lead',
      guia_descarga: 'Lead',
      newsletter_suscribe: 'CompleteRegistration',
    };
    const fbEvent = standard[event] ?? event;
    window.fbq(standard[event] ? 'track' : 'trackCustom', fbEvent, {
      ...props,
      dl: window.location.pathname,
    });
  } catch {
    // El píxel nunca debe romper la experiencia
  }
}

// El píxel se carga inline en el <head> de BaseLayout (script `is:inline` con
// el stub oficial de Meta). Esta fn queda para HMR / SPA: no-op si el stub
// inline o fbevents.js ya están presentes (window.fbq existe).
export function initMetaPixel(): void {
  if (!SITE.metaPixelId || typeof window === 'undefined' || window.fbq) return;

  const fbq: MetaPixelFunction = (...args) => {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue.push(args);
  };
  fbq.queue = [];
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = '2.0';
  window.fbq = fbq;
  window._fbq ??= fbq;
  fbq('init', SITE.metaPixelId);
  fbq('track', 'PageView');

  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  document.head.appendChild(script);
}

export function trackCustom(event: string, props: Record<string, string> = {}): void {
  try {
    window.fbq?.('trackCustom', event, { ...props, dl: window.location.pathname });
  } catch {}
}
