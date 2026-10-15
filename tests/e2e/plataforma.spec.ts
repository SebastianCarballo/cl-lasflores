import { test, expect } from '@playwright/test';

// Mejoras de plataforma: PWA, privacidad y comercial. No son cosmeticas:
// cada una cubre un hueco real que de otro modo se descubre en producción.

test.describe('manifest e instalabilidad', () => {
  test('el manifest existe, es válido y todos sus iconos se sirven', async ({ page, baseURL, request }) => {
    await page.goto('/');
    await expect(page.locator('link[rel="manifest"]')).toHaveAttribute('href', '/manifest.webmanifest');

    const res = await request.get('/manifest.webmanifest');
    expect(res.status()).toBe(200);
    const manifest = JSON.parse(await res.text());

    expect(manifest.name).toBe('Clasificados Las Flores');
    expect(manifest.start_url).toBe('/');
    expect(manifest.display).toBe('standalone');
    expect(manifest.theme_color).toBe('#1c72ef');

    // Un icono roto = la app no instala. Cada uno tiene que responder 200.
    for (const icon of manifest.icons) {
      const iconRes = await request.get(new URL(icon.src, baseURL).toString());
      expect(iconRes.status(), `icono ${icon.src}`).toBe(200);
    }
    expect(manifest.icons.map((i: { sizes: string }) => i.sizes)).toContain('512x512');
  });
});

test.describe('privacidad', () => {
  test('declara los terceros que realmente entran en juego', async ({ page }) => {
    await page.goto('/privacidad');
    const texto = (await page.locator('body').innerText()).toLowerCase();
    // WhatsApp (wa.me) y la API del dólar son los dos terceros concretos.
    expect(texto).toContain('whatsapp');
    expect(texto).toContain('dolarapi');
    expect(texto).toContain('cookies');
  });

  test('la política es alcanzable desde el footer', async ({ page }) => {
    await page.goto('/');
    const link = page.locator('footer a[href="/privacidad"]');
    await expect(link).toBeVisible();
  });

  test('navegar no setea ninguna cookie', async ({ page, context }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle').catch(() => {});
    expect(await context.cookies()).toEqual([]);
  });
});

test.describe('newsletter', () => {
  test('el footer ofrece el formulario con label y accesibilidad', async ({ page }) => {
    await page.goto('/');
    const form = page.locator('#form-newsletter');
    await expect(form).toBeVisible();
    // El label asociado es obligatorio: sin él el input no tiene nombre accesible.
    await expect(page.locator('label[for="newsletter-email"]')).toHaveCount(1);
    await expect(page.locator('#newsletter-email')).toHaveAttribute('type', 'email');
    await expect(page.locator('#newsletter-email')).toHaveAttribute('required', '');
    await expect(form.locator('button[type="submit"]')).toBeVisible();
  });

  test('rechaza un email inválido sin llamar a ningún servicio', async ({ page }) => {
    await page.goto('/');
    let huboRequest = false;
    page.on('request', (r) => {
      if (r.method() === 'POST') huboRequest = true;
    });
    await page.locator('#newsletter-email').fill('no-es-un-email');
    await page.locator('#form-newsletter button[type="submit"]').click();
    await expect(page.locator('#newsletter-estado')).toBeVisible();
    await expect(page.locator('#newsletter-estado')).toContainText('Revisá el email');
    expect(huboRequest).toBe(false);
  });

  test('si el envío falla ofrece WhatsApp en vez de perder el email', async ({ page }) => {
    await page.goto('/');
    await page.route('**/*', (route) => {
      if (route.request().method() === 'POST') return route.fulfill({ status: 500, body: 'ko' });
      return route.continue();
    });
    await page.locator('#newsletter-email').fill('vecina@ejemplo.com');
    await page.locator('#form-newsletter button[type="submit"]').click();

    const estado = page.locator('#newsletter-estado');
    await expect(estado).toContainText('No pudimos guardarlo');
    const wa = page.locator('a[href*="wa.me"][href*="newsletter"]');
    await expect(wa).toBeVisible();
    // El email tipeado viaja en el mensaje: no se pierde nada.
    await expect(wa).toHaveAttribute('href', /vecina%40ejemplo\.com/);
  });
});

test.describe('teléfonos útiles', () => {
  test('los 4 servicios con llamada directa y sin números rotos', async ({ page }) => {
    await page.goto('/');
    const bloque = page.locator('article:has(h3:text-is("Teléfonos útiles"))');
    await expect(bloque).toBeVisible();

    // Los 4 servicios con sus nombres reales.
    for (const nombre of ['Hospital Zonal', 'Policía', 'Comisaría de la Mujer', 'Bomberos']) {
      await expect(bloque.getByText(nombre)).toBeVisible();
    }

    // Cada número es un link tel: tocable, con nombre accesible.
    const llamadas = bloque.locator('a[href^="tel:"]');
    await expect(llamadas).toHaveCount(4 + 4 + 1 + 2);
    for (const href of await llamadas.evaluateAll((els) => els.map((el) => el.getAttribute('href') ?? ''))) {
      // Solo dígitos (y +54 donde corresponde): nada de espacios ni guiones que rompan el discado.
      expect(href).toMatch(/^tel:\+?\d+$/);
    }
    // El de la Comisaría trae característica y sale en formato internacional.
    await expect(bloque.locator('a[href="tel:+542244441122"]')).toBeVisible();
  });
});

test.describe('planes por rubro', () => {
  test('recomienda un plan distinto según el oficio', async ({ page }) => {
    await page.goto('/planes');
    const seccion = page.locator('[aria-label="Plan recomendado según tu rubro"]');
    await expect(seccion).toBeVisible();

    // Los 8 rubros del portal, cada uno con su plan.
    await expect(seccion.locator('li')).toHaveCount(8);
    await expect(seccion).toContainText('Gastronomía');
    await expect(seccion).toContainText('Vidriera Digital');
    await expect(seccion).toContainText('Empleo');

    // Cada hilo lleva a publicar con el plan ya elegido.
    await expect(seccion.locator('a[href="/publicar?plan=oro"]').first()).toBeVisible();
    await expect(seccion.locator('a[href="/publicar"]').first()).toBeVisible();
  });

  test('la recomendación también está como schema (AEO)', async ({ page }) => {
    await page.goto('/planes');
    const nodos = await page
      .locator('script[type="application/ld+json"]')
      .evaluateAll((els) => els.flatMap((el) => JSON.parse(el.textContent ?? '[]')));
    const preguntas = nodos.flatMap((n) => (n['@graph'] ? n['@graph'] : [n])).filter((x) => x['@type'] === 'Question');
    expect(preguntas.some((q) => /gastronomía en Las Flores/.test(q.name))).toBe(true);
    expect(preguntas.length).toBeGreaterThanOrEqual(8);
  });
});
