// Analítica liviana y privada por defecto.
//
// Cómo activar (sin tocar código): definí PUBLIC_ANALYTICS_DOMAIN en .env o en
// las variables de entorno del hosting. Sin esa variable, track() es no-op: el
// sitio no pide nada a terceros, no setea cookies y no gasta requests.
// Compatible con Plausible: si window.plausible existe, lo usa.

export const ANALYTICS_DOMAIN: string = import.meta.env.PUBLIC_ANALYTICS_DOMAIN ?? '';

// Taxonomía de eventos (los que ya emiten los CTAs con data-event).
// Los nombres se mantienen estables: cambiarlos rompe el histórico.
export const EVENTOS = [
  'buscar',
  'whatsapp_click',
  'compartir_ficha',
  'elegir_plan',
  'alta_negocio',
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
] as const;

export type Evento = (typeof EVENTOS)[number];

declare global {
  interface Window {
    plausible?: (event: string, opts?: { props?: Record<string, string> }) => void;
  }
}

export function track(event: string, props: Record<string, string> = {}): void {
  try {
    if (!ANALYTICS_DOMAIN) return;
    window.plausible?.(event, { props });
  } catch {
    // La analítica nunca debe romper la experiencia
  }
}
