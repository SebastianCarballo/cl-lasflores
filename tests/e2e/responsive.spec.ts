import { test, expect } from '@playwright/test';

const routes = [
  '/',
  '/directorio/',
  '/categoria/comercios/',
  '/categoria/educacion/',
  '/categoria/empleo/',
  '/categoria/gastronomia/',
  '/categoria/inmuebles/',
  '/categoria/salud/',
  '/categoria/servicios/',
  '/categoria/vehiculos/',
  '/comercio/ficha-gratis-muestra/',
  '/planes/',
  '/publicar/',
  '/contacto/',
  '/nosotros/',
  '/guia-whatsapp/',
  '/404.html',
];

const viewportWidths = [320, 360, 390, 430, 768, 1024, 1280];

for (const route of routes) {
  test(`${route} se adapta a móvil y tablet sin desbordamiento horizontal`, async ({ page }) => {
    for (const width of viewportWidths) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(route);
      await expect(page.locator('main#contenido')).toBeVisible();

      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      );
      expect(overflow, `${route} desborda horizontalmente a ${width}px`).toBeLessThanOrEqual(1);
    }
  });
}
