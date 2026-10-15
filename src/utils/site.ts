import type { ImageMetadata } from 'astro';

export function whatsappLink(phone: string, businessName: string): string {
  const tel = phone.replace(/\D/g, '');
  const text = encodeURIComponent(
    `Hola ${businessName}, vi tu perfil en Clasificados Las Flores y quiero consultar por…`,
  );
  return `https://wa.me/${tel}?text=${text}`;
}

export function formatPrice(value: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(value);
}

// Muestra legible de un teléfono AR internacional sin + ("5492224421234" → "+54 9 2224 42-1234").
// El href tel: sigue usando el número crudo.
export function formatPhoneDisplay(phone: string): string {
  const m = phone.match(/^54(9?)(\d{3,4})(\d{2})(\d{4})$/);
  if (!m) return `+${phone}`;
  const [, mobile, area, p1, p2] = m;
  return `+54 ${mobile ? '9 ' : ''}${area} ${p1}-${p2}`;
}

export interface SeoProps {
  title: string;
  description: string;
  canonical?: string;
  /** Imagen de la ficha o portada. Acepta ruta pública o asset local. */
  image?: string | ImageMetadata;
  /** Texto alternativo de la imagen OG. Default: el título de la página. */
  imageAlt?: string;
  type?: 'website' | 'article';
  /** Para type="article": fecha ISO (Google la usa para mostrar la ficha). */
  publishedTime?: string;
  schema?: Record<string, unknown> | Record<string, unknown>[];
}

export const SITE = {
  name: 'Clasificados Las Flores',
  tagline: 'El directorio local de Las Flores, Buenos Aires',
  url: 'https://clasificadoslasflores.com.ar',
  locale: 'es_AR',
  // Cover de portada para Open Graph. Las dimensiones son las reales del
  // archivo (ver tests/e2e/og.spec.ts). Si se reemplaza public/og-cover.png,
  // hay que actualizarlas acá o las redes recortarán mal la vista previa.
  ogCover: {
    src: '/og-cover.png',
    width: 1200,
    height: 630,
  },
  // Canal comercial público del portal (ventas/soporte). No es secreto.
  whatsapp: '5492224000000',
  email: 'hola@clasificadoslasflores.com.ar',
};

// Formatos que las redes aceptan como og:image. WhatsApp, Facebook, X y LinkedIn
// NO renderizan SVG: un link compartido con una imagen .svg sale sin vista
// previa. Por eso la ficha de muestra (cuyo placeholder es .svg) cae al cover
// del portal en vez de mostrar un cuadro roto.
const OG_RASTER = /\.(png|jpe?g|webp)$/i;

export interface OgImageMeta {
  /** Ruta pública o URL absoluta, lista para usar en og:image. */
  src: string;
  /** Extensión real, para og:image:type. */
  ext: 'png' | 'jpeg' | 'webp';
  /** Dimensiones reales si se conocen. Jamás se inventan. */
  width?: number;
  height?: number;
}

/**
 * Resuelve la imagen de Open Graph de una página.
 *
 * Reglas: siempre raster (nunca SVG) y con dimensiones reales cuando se
 * conocen. Declarar 1200x630 fijo hacía que las redes recortaran mal la vista
 * previa de las fichas con foto 4:3 o vertical.
 */
export function ogImageMeta(image?: string | ImageMetadata): OgImageMeta {
  if (image === undefined) return { ...SITE.ogCover, ext: 'png' };

  const src = typeof image === 'string' ? image : image.src;

  // Sin SVG: los crawlers de redes no lo renderizan.
  if (!OG_RASTER.test(src)) return { ...SITE.ogCover, ext: 'png' };

  const ext = /\.jpe?g$/i.test(src) ? 'jpeg' : /\.webp$/i.test(src) ? 'webp' : 'png';
  // Un asset local trae sus dimensiones reales; de una ruta pública no se
  // pueden saber, así que se omiten en vez de declarar un tamaño falso.
  const size =
    typeof image !== 'string' && image.width && image.height
      ? { width: image.width, height: image.height }
      : {};

  return { src, ext, ...size };
}

// Promo lanzamiento (finalizada): mostraba solo Gratis + Vidriera Digital con
// 30 días gratis para traccionar oferta. Con `activa: false` se ven los 4
// planes del PDF en /planes, home, directorio y el select de /publicar
// (los slugs y ?plan= nunca cambian). Se conserva el objeto para no romper
// los condicionales que lo leen; el copy de la oferta se retiró de cada vista.
export const PROMO_LANZAMIENTO = {
  activa: false,
  planesVisibles: ['gratis', 'oro'] as const,
  titular: '🚀 Lanzamiento en Las Flores',
  texto: 'Vidriera Digital completa gratis por 30 días.',
};

export function planesVisibles<T extends { tier: string }>(planes: T[]): T[] {
  if (!PROMO_LANZAMIENTO.activa) return planes;
  const visibles = new Set<string>([...PROMO_LANZAMIENTO.planesVisibles]);
  return planes.filter((p) => visibles.has(p.tier));
}

// Socio estratégico: agencia de marketing digital que trabaja a la par.
// Fuente única para footer, sección de socios y schemas.
export const STUDIO = {
  name: 'MembyStudio',
  tagline: 'Agencia de Marketing Digital',
  url: 'https://membystudio.com',
  rol: 'Socio estratégico: diseño, posicionamiento y difusión del portal.',
};

export function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export function localBusinessSchema(b: {
  slug?: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  image: ImageMetadata | string;
  latitude?: number;
  longitude?: number;
}) {
  const base = SITE.url;
  const img = typeof b.image === 'string' ? b.image : b.image.src;
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: b.name,
    description: b.description,
    url: b.slug ? `${base}/comercio/${b.slug}` : base,
    address: {
      '@type': 'PostalAddress',
      streetAddress: b.address,
      addressLocality: 'Las Flores',
      addressRegion: 'Buenos Aires',
      addressCountry: 'AR',
    },
    telephone: `+${b.phone}`,
    image: [img.startsWith('http') ? img : `${base}${img.startsWith('/') ? '' : '/'}${img}`],
    areaServed: {
      '@type': 'City',
      name: 'Las Flores',
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: 'Buenos Aires, Argentina',
      },
    },
    // AEO: qué fragmento puede "hablar" un asistente de voz / AI Overview
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.ficha-desc'],
    },
    ...(b.latitude !== undefined &&
      b.longitude !== undefined && {
        geo: {
          '@type': 'GeoCoordinates',
          latitude: b.latitude,
          longitude: b.longitude,
        },
      }),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE.url}${item.path}`,
    })),
  };
}

// NAP canónico del portal para SEO local: quiénes somos, dónde operamos, cómo contactarnos.
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/logo-flores.webp`,
    description: SITE.tagline,
    slogan: 'Lo que necesitás, más cerca.',
    // GEO/LLM: temas que cubre el portal (coinciden con las 8 categorías).
    knowsAbout: [
      'Directorio comercial de Las Flores Buenos Aires',
      'Clasificados de Las Flores provincia de Buenos Aires',
      'Gastronomía en Las Flores',
      'Servicios y oficios en Las Flores',
      'Comercios en Las Flores',
      'Inmuebles y alquileres en Las Flores',
      'Vehículos en Las Flores',
      'Empleo en Las Flores',
      'Salud en Las Flores',
      'Educación en Las Flores',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Las Flores',
      addressRegion: 'Buenos Aires',
      addressCountry: 'AR',
    },
    areaServed: {
      '@type': 'City',
      name: 'Las Flores',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+5492224000000',
      contactType: 'sales',
      areaServed: 'AR',
      availableLanguage: 'es',
    },
    sameAs: [
      'https://instagram.com/clasificadoslasflores',
      'https://facebook.com/clasificadoslasflores',
    ],
  };
}

// AEO: las respuestas deben existir como datos, no solo como texto visible.
export function faqPageSchema(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}
