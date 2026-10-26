import { test, expect } from '@playwright/test';

test.describe('planes y alta', () => {
  test('planes muestra los 4 tiers con FAQ estructurada', async ({ page }) => {
    await page.goto('/planes');
    for (const nombre of ['Gratis', 'Contacto Directo', 'Comercio Verificado', 'Vidriera Digital']) {
      await expect(page.getByRole('heading', { name: nombre, exact: true })).toBeVisible();
    }
    // Precios del PDF: $0 / $5.000 / $12.000 / $20.000.
    for (const precio of [/\$0/, /\$5\.000/, /\$12\.000/, /\$20\.000/]) {
      await expect(page.getByText(precio).first()).toBeVisible();
    }
    // Cada plan tiene identidad propia: no son 4 cards iguales.
    await expect(page.getByText('Máxima visibilidad')).toBeVisible();
    await expect(page.getByText('Más popular')).toBeVisible();
    await expect(page.getByText(/te ahorrás 2 meses/).first()).toBeVisible();
    await page.getByText('¿Cuánto cuesta publicar?').click();
  });

  test('elegir plan preselecciona en publicar (funnel)', async ({ page }) => {
    await page.goto('/planes');
    await page.getByRole('link', { name: 'Quiero mi Vidriera' }).first().click();
    await expect(page).toHaveURL(/\/publicar\?plan=oro/);
    await expect(page.locator('#plan')).toHaveValue(/Vidriera/);
  });

  test('publicar valida, enfoca el error y confirma al enviar', async ({ page }) => {
    await page.goto('/publicar');
    // Popup de WhatsApp: no dejar que abra pestañas en el test
    await page.route('https://wa.me/**', (r) => r.abort());
    await page.getByRole('button', { name: /activar mi ficha/ }).click();
    const error = page.locator('#form-error');
    await expect(error).toBeVisible();
    await expect(error).toBeFocused();

    await page.locator('#nombre').fill('Test E2E Rotisería');
    await page.locator('#categoria').selectOption('Gastronomía');
    await page.locator('#whatsapp').fill('2244428714');
    await page.locator('#impulso').selectOption('Impulso 7 días');
    await page.locator('#desc').fill('Menú del día y empanadas todos los mediodías.');
    await expect(page.locator('#desc-count')).toContainText('✓');
    await page.getByRole('button', { name: /activar mi ficha/ }).click();
    await expect(page.locator('#form-exito')).toBeVisible();
    await expect(page.locator('#form-exito')).toContainText(/Vidriera Digital/);
  });

  test('guía capta con imán y nutre hacia publicar (?ref=guia)', async ({ page }) => {
    await page.goto('/guia-whatsapp');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/listo para vender/);
    await expect(page.getByRole('link', { name: /checklist por WhatsApp/ })).toHaveAttribute('href', /^https:\/\/wa\.me\//);

    await page.goto('/publicar?ref=guia');
    await expect(page.locator('[data-ref-banner]')).toBeVisible();
    await expect(page.locator('[data-ref-banner]')).toContainText(/guía de WhatsApp/);
  });
});
