import { test, expect } from '@playwright/test';

test.describe('directorio', () => {
  test('filtra en vivo, sincroniza URL y cuenta resultados', async ({ page }) => {
    await page.goto('/directorio');
    await expect(page.locator('#resultados [data-business-card]')).toHaveCount(1);

    await page.locator('#q').fill('gratis');
    await expect(page).toHaveURL(/q=gratis/);
    await expect(page.locator('#conteo')).toContainText('1');
    await expect(page.locator('#resultados')).toContainText(/Tu Comercio Acá/);

    // Limpiar restaura todo (re-inserción, no display:none)
    await page.locator('#q').fill('');
    await expect(page.locator('#resultados [data-business-card]')).toHaveCount(1);
  });

  test('modelos de muestra: uno por plan con sus features reales (4 planes del PDF)', async ({ page }) => {
    await page.goto('/directorio');
    const modelos = page.locator('[data-modelo-plan]');
    await expect(modelos).toHaveCount(4);
    await expect(page.locator('[data-modelo-plan="oro"]')).toContainText(/compartimos en nuestras redes/);
    await expect(page.locator('[data-modelo-plan="gratis"]')).toContainText(/Sin botón directo/);
    await expect(page.locator('[data-modelo-plan="bronce"]')).toContainText(/Botón directo a WhatsApp/);
    await expect(page.locator('[data-modelo-plan="plata"]')).toContainText(/Informe mensual/);
    await page.locator('[data-modelo-plan="oro"] a').click();
    await expect(page).toHaveURL(/\/publicar\?plan=oro/);
  });

  test('modelos en una sola fila con botones alineados (no se rompen)', async ({ page }) => {
    // Viewport ancho explícito: a 1280 el breakpoint xl queda al límite por el scrollbar.
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/directorio');
    const cards = page.locator('[data-modelo-plan]');
    await expect(cards).toHaveCount(4);

    // Las 4 cards comparten fila: mismo top (tolerancia 2px por subpíxeles).
    const tops = await cards.evaluateAll((els) => els.map((el) => el.getBoundingClientRect().top));
    expect(Math.max(...tops) - Math.min(...tops)).toBeLessThanOrEqual(2);

    // Los CTA terminan a la misma altura: la lista empuja el botón abajo.
    const bottoms = await cards
      .locator('a')
      .evaluateAll((els) => els.map((el) => el.getBoundingClientRect().bottom));
    expect(Math.max(...bottoms) - Math.min(...bottoms)).toBeLessThanOrEqual(2);

    // Nada desborda horizontalmente (pills + textos largos contenidos).
    const overflows = await cards.evaluateAll((els) =>
      els.map((el) => el.scrollWidth - el.clientWidth),
    );
    for (const o of overflows) expect(o).toBeLessThanOrEqual(1);
  });

  test('filtros rápidos por categoría con aria-current', async ({ page }) => {
    await page.goto('/directorio');
    await page.locator('[data-cat-link="comercios"]').click();
    await expect(page).toHaveURL(/cat=comercios/);
    await expect(page.locator('[data-cat-link="comercios"]')).toHaveAttribute('aria-current', 'true');
    const cards = page.locator('#resultados [data-business-card]');
    await expect(cards).toHaveCount(1);
    await expect(page.locator('#resultados')).toContainText(/Tu Comercio Acá/);
  });

  test('tolerancia a acentos y estado vacío útil', async ({ page }) => {
    await page.goto('/directorio');
    await page.locator('#q').fill('muestra');
    await expect(page.locator('#resultados')).toContainText(/Tu Comercio Acá/);

    await page.locator('#q').fill('xyzsinresultados');
    await expect(page.locator('#sin-resultados')).toBeVisible();
    await expect(page.locator('#sin-resultados')).toContainText(/Publicalo gratis/);
  });

  test('respeta ?q= y ?cat= directos (links compartidos)', async ({ page }) => {
    await page.goto('/directorio?cat=comercios&q=gratis');
    await expect(page.locator('#conteo')).toContainText('1');
    await page.locator('#resultados [data-business-card] a').first().click();
    await expect(page).toHaveURL(/\/comercio\/ficha-gratis-muestra/);
  });

  test('ordena por nombre (A–Z) y lo persiste en la URL', async ({ page }) => {
    await page.goto('/directorio?orden=az');
    await expect(page.locator('#orden')).toHaveValue('az');
    await expect(page).toHaveURL(/orden=az/);
    await expect(page.locator('#filtros-activos')).toContainText('orden A–Z');

    await page.locator('#orden').selectOption('destacados');
    await expect(page).not.toHaveURL(/orden=/);
  });

  test('el filtro "solo con WhatsApp" no inventa resultados', async ({ page }) => {
    await page.goto('/directorio');
    await expect(page.locator('#resultados [data-business-card]')).toHaveCount(1);

    // La ficha de muestra es plan Gratis y no tiene botón: el filtro debe
    // llevar a un vacío honesto, no a mostrar igual la tarjeta.
    await page.locator('#solo-wa').check();
    await expect(page).toHaveURL(/wa=1/);
    await expect(page.locator('#sin-resultados')).toBeVisible();
    await expect(page.locator('#filtros-activos')).toContainText('solo con WhatsApp');

    await page.locator('#limpiar').click();
    await expect(page.locator('#resultados [data-business-card]')).toHaveCount(1);
    await expect(page).not.toHaveURL(/wa=1/);
  });
});
