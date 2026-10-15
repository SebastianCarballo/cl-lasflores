import { test, expect } from '@playwright/test';

// Open Graph: la vista previa de un link compartido (WhatsApp, Facebook, X,
// LinkedIn) es hoy el principal canal de distribución del portal. Estas reglas
// no son cosméticas: un og:image en SVG no se renderiza y sale el link sin
// imagen, y unas dimensiones falsas hacen que la red recorte la foto.

function metas(page: import('@playwright/test').Page, selector: string) {
  return page.$$eval(selector, (els) => els.map((el) => el.getAttribute('content') ?? ''));
}

// Lee el ancho y alto reales desde la cabecera IHDR de un PNG, sin dependencias.
async function pngSize(url: string): Promise<{ width: number; height: number }> {
  const res = await fetch(url);
  const buf = Buffer.from(await res.arrayBuffer());
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

test.describe('Open Graph', () => {
  test('la home anuncia el cover del portal con dimensiones reales', async ({ page, baseURL }) => {
    await page.goto('/');

    const ogImage = await metas(page, 'meta[property="og:image"]');
    const ogType = await metas(page, 'meta[property="og:image:type"]');
    const width = await metas(page, 'meta[property="og:image:width"]');
    const height = await metas(page, 'meta[property="og:image:height"]');

    expect(ogImage).toEqual(['https://clasificadoslasflores.com.ar/og-cover.png']);
    expect(ogType).toEqual(['image/png']);
    expect(width).toEqual(['1200']);
    expect(height).toEqual(['630']);

    // Las dimensiones declaradas tienen que coincidir con el archivo servido,
    // si no las redes recortan mal la vista previa.
    const real = await pngSize(new URL('/og-cover.png', baseURL).toString());
    expect(real).toEqual({ width: 1200, height: 630 });
    expect(ogImage[0]).not.toMatch(/\.svg$/i);
  });

  test('la ficha de un comercio no comparte un SVG', async ({ page }) => {
    await page.goto('/comercio/ficha-gratis-muestra');

    const ogImage = await metas(page, 'meta[property="og:image"]');
    expect(ogImage).toHaveLength(1);
    // El placeholder de la ficha es .svg: cae al cover en vez de romperse.
    expect(ogImage[0]).toBe('https://clasificadoslasflores.com.ar/og-cover.png');
    expect(ogImage[0]).not.toMatch(/\.svg$/i);

    // La ficha es contenido fechado y así se declara.
    await expect(page.locator('meta[property="article:published_time"]')).toHaveAttribute(
      'content',
      '2026-08-30',
    );

    // Alt descriptivo, no el título genérico.
    const alt = await metas(page, 'meta[property="og:image:alt"]');
    expect(alt[0]).toMatch(/Foto de Tu Comercio Acá/);
  });

  test('la ficha declara dimensiones solo cuando las conoce', async ({ page }) => {
    await page.goto('/comercio/ficha-gratis-muestra');

    // El cover declarado desde public/ trae su tamaño; si el día de mañana una
    // ficha use una foto 4:3, width/height deben salir de esa foto y no 1200x630.
    const width = await metas(page, 'meta[property="og:image:width"]');
    const height = await metas(page, 'meta[property="og:image:height"]');
    expect(width).toEqual(['1200']);
    expect(height).toEqual(['630']);
  });

  test('título y descripción OG coinciden con el SEO visible', async ({ page }) => {
    await page.goto('/planes');

    const title = await page.title();
    const ogTitle = await metas(page, 'meta[property="og:title"]');
    const desc = await page.getAttribute('meta[name="description"]', 'content');
    const ogDesc = await metas(page, 'meta[property="og:description"]');

    expect(ogTitle[0]).toBe(title);
    expect(ogDesc[0]).toBe(desc);

    // Canonical absoluta y OG:url iguales: nunca dos URLs canónicas.
    const canonical = await page.getAttribute('link[rel="canonical"]', 'href');
    const ogUrl = await metas(page, 'meta[property="og:url"]');
    expect(ogUrl[0]).toBe(canonical);
    expect(ogUrl[0]).toBe('https://clasificadoslasflores.com.ar/planes/');
  });
});
