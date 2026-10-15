import { test, expect } from '@playwright/test';

test.describe('home', () => {
  test('carga con h1, buscador y sin errores de consola', async ({ page }) => {
    const errores: string[] = [];
    page.on('pageerror', (e) => errores.push(String(e)));
    await page.goto('/');
    await expect(page).toHaveTitle(/Clasificados Las Flores/);
    await expect(page.getByRole('heading', { name: /Lo que necesitás/ })).toBeVisible();
    await expect(page.getByRole('search')).toBeVisible();
    await expect(page.locator('#conteo, dl').first()).toBeVisible();
    expect(errores).toEqual([]);
  });

  test('el buscador navega al directorio con query', async ({ page }) => {
    await page.goto('/');
    await page.locator('#q').fill('gratis');
    await page.getByRole('button', { name: 'Buscar' }).click();
    await expect(page).toHaveURL(/\/directorio\?q=gratis/);
    await expect(page.locator('#resultados')).toContainText(/Tu Comercio Acá/);
  });

  test('stats únicas + secciones pobladas al hacer scroll', async ({ page }) => {
    await page.goto('/');
    // Una sola banda de números (no duplicada en hero): la de Confianza
    const banda = page.locator('section[aria-label="Confianza de la comunidad"]');
    await expect(banda).toContainText(/negocio publicado/);
    for (const titulo of ['Buscá por categoría', 'Comercios destacados', 'Recién llegados']) {
      await expect(page.getByRole('heading', { name: titulo })).toBeVisible();
    }
    // Las cards aparecen al scrollear (reveals) + slots "publicitá aquí" poblando la grilla
    const cards = page.locator('[data-business-card]');
    await expect(cards.first()).toBeVisible();
    await expect(page.locator('[data-slot-publicitario]').first()).toBeVisible();
    // La vidriera real existe entre los slots
    await expect(cards.filter({ hasText: /Tu Comercio Acá/ }).first()).toBeVisible();
    await expect(page.getByText('De la búsqueda al WhatsApp')).toBeVisible();
  });

  test('categorías navegan y footer acredita MembyStudio', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /Gastronomía/ }).first().click();
    await expect(page).toHaveURL('/categoria/gastronomia');
    await page.goto('/');
    await expect(page.locator('footer')).toContainText('MembyStudio');
  });

  test('banner Publicite aquí después de Destacados con CTA a ventas', async ({ page }) => {
    await page.goto('/');
    const banner = page.locator('[aria-label="Publicite aquí"]');
    await expect(banner).toBeVisible();
    await expect(banner).toContainText(/Tu marca donde todo el barrio mira/);
    // La estrategia es posicional: va justo después de ver a la competencia destacada.
    const orden = await page.locator('main section').evaluateAll((secs) =>
      secs.map((s) => s.getAttribute('aria-label') ?? s.querySelector('h2')?.textContent?.trim() ?? ''),
    );
    expect(orden.indexOf('Publicite aquí')).toBeGreaterThan(orden.findIndex((t) => /destacado/i.test(t)));
    // El CTA lleva a ventas, no a publicar (es pauta, no ficha).
    await expect(banner.getByRole('link', { name: /Quiero publicitar/ })).toHaveAttribute('href', '/contacto');
  });
});
