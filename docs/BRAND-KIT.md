# Brand Kit — Clasificados Las Flores

Documento de marca y sistema visual del portal. Fuente de verdad técnica: `DESIGN.md` + `src/styles/global.css`. Este archivo explica **qué color va dónde, por qué y qué no hacer**.

> Marca: **Clasificados Las Flores** — "El directorio local de Las Flores, Buenos Aires".  
> Tagline interno: *Lo que necesitás, más cerca.*  
> Sitio: `https://clasificadoslasflores.com.ar` · WhatsApp comercial: `+54 9 2244 42-8714`

---

## 1. La idea de marca en una frase

**Local, directo y confiable.** El vecino entra, encuentra un comercio en segundos y lo contacta por WhatsApp sin intermediarios. El diseño no busca impresionar: busca que la respuesta se vea antes que la decoración.

Por eso la paleta es **azul clasificados + tinta profunda + blanco + un ámbar solo para lo destacado**. Nada de púrpura, nada de gradientes que compitan.

---

## 2. Paletas de colores

### 2.1 Paleta principal — Azul Clasificados (`brand`)

Es el color de acción. Links, botones primarios, estados activos, foco y selección.

| Token Tailwind | Hex | Uso |
|---|---|---|
| `brand-50` | `#EEF7FF` | Fondos suaves, alertas informativas, bloques `muted-content` |
| `brand-100` | `#D9ECFF` | Hover suave, chips |
| `brand-200` | `#BCE0FF` | Bordes suaves, gradientes |
| `brand-300` | `#8ECDFF` | Decoración, aurora hero |
| `brand-400` | `#59B0FC` | Decoración |
| `brand-500` | `#338FFA` | Foco `:focus-visible`, detalles vivos |
| **`brand-600`** | **`#155DDC`** | **Primario. Botones, links, CTA** |
| `brand-700` | `#184EB4` | Hover del primario |
| `brand-800/900` | `#193F8D` | Profundidad, texto sobre fondo claro (poco uso) |

**Regla:** si hay un botón principal en pantalla, es `brand-600` con texto blanco. Nunca compite con otro color.

### 2.2 Paleta neutra — Tinta / Slate (`ink`)

Es la estructura. Header, hero oscuro, texto, bordes y fondos de página.

| Token Tailwind | Hex | Uso |
|---|---|---|
| `ink-50` | `#F8FAFC` | **Fondo de página** (`bg-ink-50`), superficies suaves |
| `ink-100` | `#F1F5F9` | Bordes, fondos de FAQ, pills |
| `ink-200` | `#E2E8F0` | Bordes de tarjetas |
| `ink-800` | `#1E293B` | Header oscuro, menús |
| `ink-900` | `#0F172A` | **Texto principal** (`text-ink-900`), bloques de alto contraste |
| `ink-950` | `#020617` | Hero oscuro, footer profundo |

**Textos:**
- Principal: `ink-900` sobre blanco / `ink-50`.
- Secundario / muted: `#475569` (slate-600) — nunca gris claro sobre blanco para datos esenciales.

### 2.3 Acento — Ámbar Vidriera (`accent`)

Es **solo** para destacar lo premium. No es un segundo primario.

| Token Tailwind | Hex | Uso |
|---|---|---|
| `accent-400` | `#FBBF24` | Brillos, bordes dorados |
| **`accent-500`** | **`#F59E0B`** | **Badge Vidriera Digital, destacados** |
| `accent-600` | `#D97706` | Badge fuerte, hover, borde dorado |

**Dónde sí:** badge "Vidriera Digital", borde `.oro-card`, highlights promocionales, CTA de planes.  
**Dónde no:** botón de búsqueda, link normal, texto corrido.

### 2.4 Semántica — qué significa cada color

| Color | Significado en la marca | Ejemplo |
|---|---|---|
| Azul `brand-600` | "Tocá acá" / acción principal | Botón Buscar, Publicar, WhatsApp |
| Tinta `ink-900` | "Esto es importante" / estructura | Título, precio, nombre del negocio |
| Ámbar `accent-500` | "Esto es premium" | Vidriera Digital, borde dorado |
| Blanco `#FFFFFF` | "Contenido" | Tarjeta de negocio |
| `ink-50` `#F8FAFC` | "Fondo" | Fondo de página |

> **No dependas solo del color** para plan o verificación: el badge Vidriera siempre lleva texto ("Vidriera Digital") y el Verificado lleva insignia + texto.

---

## 3. Fondos, superficies y bordes

- **Fondo de página:** `ink-50` `#F8FAFC`
- **Superficie de tarjeta:** `#FFFFFF` con borde `ink-200` `#E2E8F0`, radio `lg` (1.5rem)
- **Bloque suave informativo:** `brand-50` `#EEF7FF` con texto `ink-900`
- **Hero / header oscuro:** `ink-950` `#020617` con aurora decorativa (azul + ámbar diluidos, blur). El texto siempre blanco por encima.

Las sombras son **restringidas**: borde primero, sombra pequeña solo en tarjetas interactivas y hero search. Nada de flotantes grandes.

---

## 4. Tipografía — la voz de la marca

| Rol | Fuente | Peso | Uso |
|---|---|---|---|
| **Display / Títulos** | **Sora** (Variable, self-hosted) | 700–800 | H1, H2, nombres de negocio, precios |
| **Cuerpo / UI** | **Inter** (Variable, self-hosted) | 400–700 | Párrafos, labels, botones, metadatos |

- Títulos cortos y escaneables. Nada de mayúsculas sostenidas.
- Cuerpo con interlineado ~1.6, pensado para móvil.
- Labels en mayúsculas pequeñas (`0.75rem`, bold, tracking amplio) solo como etiqueta, no como texto corrido.
- **No introducir otra fuente.** Sora + Inter es el sistema completo.

---

## 5. Formas, espaciado y layout

- **Radios:** `sm` 0.75rem (controles), `md` 1rem (paneles), `lg` 1.5rem (tarjetas).
- **Pills:** solo filtros, tags y badges. Nunca contenedores grandes.
- **Espaciado:** `xs` 0.5 · `sm` 0.75 · `md` 1 · `lg` 1.5 · `xl` 2 · sección 4rem.
- **Layout:** mobile-first, contenido centrado `max-w-7xl`. Acciones a un pulgar en móvil.
- **Touch:** mínimo 44px, ideal 48px en botones y links de ficha.

---

## 6. Componentes del kit

| Componente | Color | Regla |
|---|---|---|
| Botón primario | `brand-600` → hover `brand-700`, texto blanco | 48px de alto, radio `sm` |
| Botón secundario | `ink-900` o outline neutro | Solo si el primario ya está visible |
| Tarjeta de negocio | Blanco + borde `ink-200` | Nombre, categoría, ubicación y WhatsApp escaneables |
| Buscador | Input blanco + botón `brand-600` | Funciona con GET sin JS |
| Badge Vidriera | `accent-500` fondo / `ink-900` texto | Ámbar + texto, nunca solo color |
| FAQ | Fondo `ink-100`, cruz que rota a azul al abrir | — |

---

## 7. Planes y su relación con el color

| Plan | Señal visual |
|---|---|
| **Gratis** | Sin acento. Tarjeta estándar. |
| **Contacto Directo** | Botón WhatsApp directo (azul). |
| **Comercio Verificado** | Insignia "Verificado" + texto. |
| **Vidriera Digital** | **Ámbar** + borde dorado `.oro-card` + difusión. Es el único plan que usa ámbar. |

Si ves ámbar en el sitio, es porque ese negocio paga Vidriera Digital.

---

## 8. Assets de marca (en `public/`)

| Archivo | Uso |
|---|---|
| `logo-flores.webp` | Logo principal (cabeza + PWA maskable) |
| `favicon-flores.png` / `apple-touch-icon-flores.png` | Favicon |
| `icono-192.png` / `icono-512.png` | PWA |
| `og-cover.png` (1200×630) | Vista previa en WhatsApp / Facebook / X |
| `clasificados-las-flores.webp` | Arte de marca |
| `memby-studio.webp` | Logo del socio estratégico |

Tema PWA: `theme_color #1C72EF`, `background_color #F8FAFC` (`public/manifest.webmanifest`).  
⚠️ Deuda conocida: ese azul `#1C72EF` no es exactamente `brand-600` `#155DDC`. Si se unifica, actualizar `manifest.webmanifest` y `BaseLayout` juntos.

---

## 9. Accesibilidad (no negociable)

- Contraste WCAG en texto esencial. Nada de gris claro sobre blanco.
- Foco visible: `brand-500` `#338FFA` con 3px + offset.
- Selección de texto: fondo `brand-600`, texto blanco.
- `prefers-reduced-motion`: sin animaciones ni transiciones.
- El contenido nunca queda oculto sin JS (reveals progresivos).

### Validar tokens

```bash
pnpm design:lint    # valida DESIGN.md (contraste, tokens huérfanos)
pnpm design:export  # exporta tokens a CSS @theme de Tailwind 4
```

---

## 10. Errores frecuentes — Do / Don't

**✅ Hacé**
- Azul `#155DDC` como única acción principal.
- Ámbar solo para Vidriera Digital y destacados.
- Tinta `#0F172A` para títulos y datos clave.
- Fondos `ink-50` y tarjetas blancas con borde sutil.
- Sora para títulos, Inter para todo lo demás.

**❌ No hagas**
- Usar ámbar como botón por defecto.
- Introducir púrpura, otra fuente o un estilo de tarjetas redondas distinto.
- Poner texto esencial en gris claro sobre blanco.
- Combinar varios gradientes que compitan o que bajen el contraste.
- Esconder datos detrás de hover.
- Inventar un color nuevo sin pasarlo por `DESIGN.md` y `design:lint`.
