import { test, expect } from '@playwright/test';

test.describe('contacto (100% cliente, sin backend)', () => {
  test('valida, enfoca el error y confirma sin llamar a ninguna API', async ({ page }) => {
    let apiLlamada = false;
    await page.route('**/api/**', (r) => {
      apiLlamada = true;
      return r.abort();
    });
    await page.route('https://wa.me/**', (r) => r.abort());
    await page.goto('/contacto');

    await page.getByRole('button', { name: /enviar mi consulta/ }).click();
    const error = page.locator('#contacto-error');
    await expect(error).toBeVisible();
    await expect(error).toBeFocused();

    await page.locator('#contacto-nombre').fill('Vecina Test');
    await page.locator('#contacto-email').fill('vecina@test.com');
    await page.locator('#contacto-asunto').fill('Quiero publicitar');
    await page.locator('#contacto-mensaje').fill('Tengo un comercio y quiero saber más de los planes.');
    await page.getByRole('button', { name: /enviar mi consulta/ }).click();
    await expect(page.locator('#contacto-ok')).toBeVisible();
    expect(apiLlamada).toBe(false);
  });
});
