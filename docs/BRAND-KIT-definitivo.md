# Brand Kit definitivo — Clasificados Las Flores

> Versión 2 · Unifica dos fuentes que se habían separado: **el sistema que ya corre en la web** (`BRAND-KIT.md` + `DESIGN.md` + `src/styles/global.css`) y **la paleta que trabajamos para el UI kit** (azul `#0791FE`, tinta `#0B192C`, naranja `#FF6B00`).
> Reemplaza a `BRAND-KIT.md` y a la primera versión `kit-de-marca-clasificados-las-flores.md`.
> Marca: **Clasificados Las Flores** — "El directorio local de Las Flores, Buenos Aires". Tagline: *Lo que necesitás, más cerca.*
> Sitio: `https://clasificadoslasflores.com.ar`

---

## 0. Qué se decidió al unificar (leer primero)

Las dos paletas coincidían en la idea (azul + tinta + blanco + un cálido) pero chocaban en cuatro puntos. Esto es lo que quedó:

| # | Tema | Boceto UI kit | Web (código) | **Definitivo** | Por qué |
|---|---|---|---|---|---|
| 1 | **Azul** | `#0791FE` | `brand-600` `#155DDC` | **Los dos, con roles distintos.** `#0791FE` pasa a ser `brand-500` (identidad, logo, foco, decoración). `brand-600` `#155DDC` sigue siendo el primario de acción (botones, links). | Blanco sobre `#0791FE` da ~3.2:1 (no pasa para texto chico). Blanco sobre `#155DDC` da ~5.8:1. Son del mismo matiz azul, así que conviven bien. Cambia **un solo token** del código. |
| 2 | **Acento cálido** | Naranja `#FF6B00` como CTA | Ámbar `#F59E0B` solo para Vidriera Digital | **Ámbar como único cálido.** El naranja se retira como color de marca. | La web ya enseña "si ves ámbar, ese negocio paga Vidriera". Un segundo cálido como CTA rompe esa señal. Además blanco sobre `#FF6B00` da ~2.9:1. "Registrar mi comercio" va en azul primario (regla: un solo primario por pantalla). |
| 3 | **Texto** | `#0B192C` | `ink-900` `#0F172A` | **`#0F172A`** | Son casi idénticos; el de la web ya está implementado y validado con `pnpm design:lint`. |
| 4 | **Fondo** | Blanco `#FFFFFF` | Página `ink-50` `#F8FAFC`, tarjetas blancas | **Web:** página `ink-50`, tarjetas blancas con borde `ink-200` | Las tarjetas blancas destacan sobre el fondo suave. |
| 5 | **Grises** | `#E2E8F0` | `ink-200` `#E2E8F0` | Igual. Se completa la escala `ink` (slate) 300–700. | Ya coincidían. |
| 6 | **Semánticos** | Verde / amarillo / rojo | No existían | **Éxito verde, error rojo, advertencia naranja (no ámbar), info = `brand-50`.** | El "amarillo `#F59E0B`" que había propuesto era el mismo ámbar premium: habría confundido una advertencia con un plan pago. |
| 7 | **Tipografía** | Pendiente | Sora + Inter | **Sora + Inter** | Ya está resuelta y self-hosted. |
| 8 | **Escala azul** | Propuse `#0561C8`, `#043F96`… | Escala `brand` 50–900 | **Se usa la escala del código.** Mi propuesta se descarta. | Ya existe, está implementada y cubre los mismos roles. |

> Si preferís mantener el naranja para captar comercios (por ejemplo, solo en una landing de captación), es la decisión más fácil de revertir. Pero conviene que nunca conviva con el ámbar dentro del directorio.

---

## 1. La idea de marca

**Local, directo y confiable.** El vecino entra, encuentra un comercio en segundos y lo contacta por WhatsApp sin intermediarios. El diseño no busca impresionar: busca que la respuesta se vea antes que la decoración.

- **Qué es:** una vidriera digital y directorio comercial de Las Flores. **No** es un marketplace de compraventa.
- **Propósito:** fomentar el consumo de cercanía y darle a cada negocio un espacio profesional en internet.
- **Promesa al vecino:** encontrar lo que necesita, cerca y rápido.
- **Promesa al comerciante:** presencia profesional y visibilidad sin complicaciones.
- **Personalidad (propuesta para validar):** confiable, cercana, directa, práctica, orgullosa de lo local.
- **Paleta en una frase:** azul para la acción, tinta para la estructura, blanco para el contenido y ámbar solo para lo premium. Nada de púrpura, nada de gradientes que compitan.

---

## 2. Paleta definitiva

### 2.1 Azul Clasificados — `brand`

| Token | HEX | Uso |
|---|---|---|
| `brand-50` | `#EEF7FF` | Fondos suaves, alertas informativas, bloques `muted-content` |
| `brand-100` | `#D9ECFF` | Hover suave, chips |
| `brand-200` | `#BCE0FF` | Bordes suaves, gradientes |
| `brand-300` | `#8ECDFF` | Decoración, aurora del hero |
| `brand-400` | `#59B0FC` | Decoración |
| **`brand-500`** | **`#0791FE`** | **Azul de identidad: logo, foco `:focus-visible`, detalles vivos.** ⚠️ *Cambia: antes `#338FFA`* |
| **`brand-600`** | **`#155DDC`** | **Primario de acción: botones, links, CTA** |
| `brand-700` | `#184EB4` | Hover del primario |
| `brand-800/900` | `#193F8D` | Profundidad; texto sobre fondo claro (poco uso) |

**Reglas del azul**
- Si hay un botón principal en pantalla, es `brand-600` con texto blanco. Nunca compite con otro color.
- `brand-500` (`#0791FE`) **no** se usa como fondo de botones con texto blanco chico (contraste ~3.2:1). Sí sirve para el logo, íconos, foco, ilustración y elementos grandes.
- Los links en texto corrido usan `brand-600`.

### 2.2 Tinta / Slate — `ink`

| Token | HEX | Uso |
|---|---|---|
| `ink-50` | `#F8FAFC` | **Fondo de página** |
| `ink-100` | `#F1F5F9` | Fondos de FAQ, pills |
| `ink-200` | `#E2E8F0` | Bordes de tarjetas, divisores |
| `ink-300` | `#CBD5E1` | Bordes de inputs *(completar)* |
| `ink-400` | `#94A3B8` | Íconos inactivos; **solo decorativo** *(completar)* |
| `ink-500` | `#64748B` | Placeholders *(completar)* |
| `ink-600` | `#475569` | **Texto secundario / muted** *(ya usado como slate-600)* |
| `ink-700` | `#334155` | Texto de apoyo fuerte *(completar)* |
| `ink-800` | `#1E293B` | Header oscuro, menús |
| **`ink-900`** | **`#0F172A`** | **Texto principal**, bloques de alto contraste |
| `ink-950` | `#020617` | Hero oscuro, footer profundo |

Texto principal: `ink-900` sobre blanco o `ink-50`. Texto secundario: `ink-600`. Nunca gris claro sobre blanco para datos esenciales.

### 2.3 Ámbar Vidriera — `accent` (solo premium)

| Token | HEX | Uso |
|---|---|---|
| `accent-50` | `#FFFBEB` | Fondo suave de destacados *(agregar)* |
| `accent-100` | `#FEF3C7` | Fondo de badge suave *(agregar)* |
| `accent-400` | `#FBBF24` | Brillos, bordes dorados |
| **`accent-500`** | **`#F59E0B`** | **Badge Vidriera Digital, destacados** |
| `accent-600` | `#D97706` | Badge fuerte, hover, borde dorado `.oro-card` |
| `accent-700` | `#B45309` | **Texto ámbar sobre fondo claro** *(agregar)* |

**Regla de oro:** el ámbar saturado (relleno `accent-500`, borde dorado) **solo** aparece en negocios del plan Vidriera Digital y en destacados promocionales. Texto encima: siempre tinta, nunca blanco.

### 2.4 Semánticos (estados) — *propuesta, aún no existen en el código*

| Estado | Fondo | Borde | Texto / ícono | Uso |
|---|---|---|---|---|
| **Éxito** (verde) | `#F0FDF4` | `#BBF7D0` | `#15803D` | Confirmación de registro, acción completada |
| **Error** (rojo) | `#FEF2F2` | `#FECACA` | `#B91C1C` | Errores de formulario, plan vencido |
| **Advertencia** (naranja) | `#FFF7ED` | `#FED7AA` | `#C2410C` | Pendiente de revisión, datos incompletos |
| **Información** (azul) | `brand-50` `#EEF7FF` | `brand-200` `#BCE0FF` | `brand-700` `#184EB4` | Avisos neutros |

Fondo sólido con texto blanco: éxito `#15803D` (~5.0:1), error `#DC2626` (~4.8:1), advertencia `#C2410C` (~5.2:1).

**Reglas de semánticos**
- Siempre llevan **ícono + texto**, nunca solo color.
- La advertencia es **naranja, no ámbar**, para que no se confunda con la señal premium.
- Se usan en formularios, paneles y avisos; **no** dentro de las tarjetas del listado.
- El badge "Verificado" lleva insignia + texto. *Pendiente decidir su color (azul o verde).*

### 2.5 Qué significa cada color

| Color | Significado | Ejemplo |
|---|---|---|
| Azul `brand-600` | "Tocá acá" / acción principal | Buscar, Publicar, WhatsApp |
| Azul `brand-500` | "Esto es Clasificados" / identidad | Logo, foco, ilustración |
| Tinta `ink-900` | "Esto es importante" / estructura | Título, precio, nombre del negocio |
| Ámbar `accent-500` | "Esto es premium" | Vidriera Digital, borde dorado |
| Blanco `#FFFFFF` | "Contenido" | Tarjeta de negocio |
| `ink-50` `#F8FAFC` | "Fondo" | Fondo de página |

---

## 3. Storytelling de los colores

Cada color tiene tres capas: **la ciencia** (qué dice la psicología del color), **la estrategia** (por qué en este proyecto) y **la frase** (para pitch y presentaciones).

> Nota de honestidad: la psicología del color es una guía, no una ley. Los significados cambian según cultura y experiencia, y casi todas las fuentes son de divulgación y marketing. Usalo como argumento de diseño, no como dato científico duro.

### 🔵 Azul — dos tonos, una misma familia

**La ciencia.** El azul es de los colores más usados en branding y de los más elegidos como favorito. Se asocia con confianza, seguridad, lealtad, calma, credibilidad y tecnología; por eso lo usan bancos, redes sociales y marcas de salud. Es además el color que menos rechazo genera.

**La estrategia.** Un directorio solo funciona si el vecino confía en que la información es real y está al día. El sistema usa dos azules con dos trabajos:
- **Azul identidad `#0791FE` (`brand-500`):** el azul luminoso del logo. Es el color que se recuerda; transmite cielo abierto, tecnología accesible y energía local.
- **Azul acción `#155DDC` (`brand-600`):** más profundo, el que se toca. Transmite seriedad y solidez justo donde el usuario decide: buscar, publicar, contactar.

Uno te reconoce, el otro te guía. Son del mismo matiz, así que se ven como una sola marca.

**La frase.** *"El azul no grita: genera certeza."*

**Palabras clave:** confianza · seguridad · tecnología · credibilidad · calma · lealtad

### ⚫ Tinta — `#0F172A`

**La ciencia.** Los tonos casi negros se asocian con seriedad, autoridad, elegancia y permanencia. El riesgo del negro puro es que se siente frío y pesado en pantalla si no tiene mucho espacio en blanco alrededor.

**La estrategia.** La tinta es un azul-slate casi negro: conserva la autoridad del negro pero comparte familia con el azul de marca, así que el sistema se siente coherente y más cálido. Cuando el nombre de un negocio o un precio aparece en tinta, se lee como un dato firme. Es el color de lo que **no** puede dudarse: el nombre, el rubro, el contacto.

**La frase.** *"No necesita convencer a nadie: su presencia dice que esto es serio."*

**Palabras clave:** autoridad · seriedad · permanencia · claridad

### 🟡 Ámbar Vidriera — `#F59E0B`

**La ciencia.** Los tonos entre amarillo y naranja se asocian con energía, optimismo, calidez, luz y atención; también con valor y dinero. Las fuentes de branding coinciden en usarlos como **acento** y no como color dominante, sobre blanco o gris, porque son muy visibles y cansan si abundan.

**La estrategia.** El ámbar es la luz de una vidriera encendida: lo que hace que, entre muchos locales, uno llame la atención. En la marca tiene **un solo trabajo**: señalar lo premium. Funciona porque es escaso: si aparece ámbar, ese negocio eligió destacarse. Esa regla lo vuelve una señal honesta para el vecino (sabe qué significa) y un argumento comercial para el comerciante (se nota y se entiende).

*(La asociación ámbar–oro–valor es una convención cultural común; no sale de las fuentes consultadas. La anécdota del naranja como color del comercio en la Antigua Grecia, que usamos en la versión anterior, se descarta porque no se traslada limpiamente al ámbar.)*

**La frase.** *"El ámbar es la luz de la vidriera: no pide atención, la gana."*

**Palabras clave:** destaque · calidez · valor · luz · optimismo

### ⚪ Blanco y neutros — `#FFFFFF` · `ink-50` · `ink-200`

**La ciencia.** El blanco simboliza claridad, simplicidad y un nuevo comienzo; el gris, neutralidad, estabilidad y profesionalismo. Combinados, dejan respirar a los colores llamativos.

**La estrategia.** El protagonista tiene que ser el comercio, no la plataforma. Cada tarjeta blanca con borde sutil es una ventana limpia donde un negocio se ve profesional, incluso si es su primera vez en internet. El fondo `ink-50` ordena y separa sin hacer ruido. Para quien siente que "todavía no está listo" para tener presencia digital, es una hoja en blanco: su historia puede empezar acá.

**La frase.** *"La decisión más generosa: dejarle el protagonismo al contenido."*

**Palabras clave:** claridad · orden · honestidad · simplicidad

---

## 4. Fondos, superficies y bordes

- **Fondo de página:** `ink-50` `#F8FAFC`
- **Tarjeta:** `#FFFFFF` con borde `ink-200` `#E2E8F0`, radio `lg` (1.5rem)
- **Bloque informativo suave:** `brand-50` `#EEF7FF` con texto `ink-900`
- **Hero / header oscuro:** `ink-950` `#020617` con aurora decorativa (azul + ámbar diluidos, blur). Texto siempre blanco encima.
- **Sombras restringidas:** borde primero, sombra pequeña solo en tarjetas interactivas y en el buscador del hero. Nada de flotantes grandes.

---

## 5. Accesibilidad: contraste

Valores aproximados (WCAG). Mínimos: **4.5:1** texto normal, **3:1** texto grande (18px+ o 14px negrita) y componentes de UI (bordes, íconos, foco). Verificalo con `pnpm design:lint` y un plugin de Figma (Stark o Contrast).

| Combinación | Contraste aprox. | Veredicto |
|---|---|---|
| `ink-900` sobre blanco | ~17.8:1 | ✅ |
| `ink-600` `#475569` sobre blanco | ~7.6:1 | ✅ |
| Blanco sobre `brand-600` `#155DDC` | ~5.8:1 | ✅ Botón primario |
| Blanco sobre `brand-700` `#184EB4` | ~7.5:1 | ✅ Hover |
| `brand-600` como texto sobre `ink-50` | ~5.5:1 | ✅ Links |
| Blanco sobre `brand-500` `#0791FE` | ~3.2:1 | ⚠️ Solo texto grande, íconos, foco |
| `brand-500` como foco sobre blanco | ~3.2:1 | ✅ Cumple 3:1 para componentes |
| `ink-900` sobre `accent-500` `#F59E0B` | ~8.3:1 | ✅ Badge Vidriera |
| `ink-900` sobre `accent-600` `#D97706` | ~5.6:1 | ✅ |
| Blanco sobre `accent-500` | ~2.2:1 | ❌ Nunca |
| `accent-500` como texto sobre blanco | ~2.2:1 | ❌ Usar `accent-700` `#B45309` (~5.0:1) |
| `ink-500` `#64748B` sobre blanco | ~4.8:1 | ✅ Placeholders |
| `ink-400` `#94A3B8` sobre blanco | ~2.6:1 | ❌ Solo decorativo |

Otras reglas no negociables:
- No dependas solo del color para plan o verificación: el badge Vidriera lleva texto "Vidriera Digital"; el Verificado, insignia + texto.
- Foco visible: `brand-500` con 3px + offset.
- Selección de texto: fondo `brand-600`, texto blanco.
- `prefers-reduced-motion`: sin animaciones ni transiciones.
- El contenido nunca queda oculto sin JS.

---

## 6. Tipografía

| Rol | Fuente | Peso | Uso |
|---|---|---|---|
| **Display / Títulos** | **Sora** (Variable, self-hosted) | 700–800 | H1, H2, nombres de negocio, precios |
| **Cuerpo / UI** | **Inter** (Variable, self-hosted) | 400–700 | Párrafos, labels, botones, metadatos |

- Títulos cortos y escaneables. Nada de mayúsculas sostenidas.
- Cuerpo con interlineado ~1.6, pensado para móvil.
- Labels en mayúsculas chicas (`0.75rem`, bold, tracking amplio) solo como etiqueta, no como texto corrido.
- **No introducir otra fuente.** Sora + Inter es el sistema completo.

**Escala sugerida** *(propuesta: validar contra `global.css` antes de cargarla en Figma)*

| Estilo | Fuente | Tamaño / interlineado | Peso |
|---|---|---|---|
| Display | Sora | 48 / 52 | 800 |
| H1 | Sora | 36 / 40 | 800 |
| H2 | Sora | 28 / 34 | 700 |
| H3 | Sora | 22 / 28 | 700 |
| Cuerpo grande | Inter | 18 / 28 | 400 |
| Cuerpo | Inter | 16 / 26 | 400 |
| Caption | Inter | 14 / 20 | 400–500 |
| Label | Inter | 12 / 16 (mayúsculas, tracking amplio) | 700 |
| Botón | Inter | 16 / 24 | 700 |

---

## 7. Formas, espaciado y layout

- **Radios:** `sm` 0.75rem (controles) · `md` 1rem (paneles) · `lg` 1.5rem (tarjetas).
- **Pills:** solo filtros, tags y badges. Nunca contenedores grandes.
- **Espaciado:** `xs` 0.5 · `sm` 0.75 · `md` 1 · `lg` 1.5 · `xl` 2 · sección 4rem.
- **Layout:** mobile-first, contenido centrado `max-w-7xl`. Acciones a un pulgar en móvil.
- **Touch:** mínimo 44px, ideal 48px en botones y links de ficha.

---

## 8. Componentes

| Componente | Color | Regla |
|---|---|---|
| Botón primario | `brand-600` → hover `brand-700`, texto blanco | 48px de alto, radio `sm`. Uno por pantalla |
| Botón secundario | `ink-900` u outline neutro | Solo si el primario ya está visible |
| Tarjeta de negocio | Blanco + borde `ink-200` | Nombre, categoría, ubicación y WhatsApp escaneables |
| Buscador | Input blanco + botón `brand-600` | Funciona con GET sin JS |
| Badge Vidriera | Fondo `accent-500` / texto `ink-900` | Ámbar + texto, nunca solo color |
| FAQ | Fondo `ink-100`, cruz que rota a azul al abrir | — |
| Avisos (éxito, error, advertencia, info) | Ver 2.4 | Ícono + texto. Fuera del listado |
| CTA "Registrar mi comercio" | `brand-600`, texto blanco | Mismo botón primario. Sin color propio |

### Planes y color

| Plan | Señal visual |
|---|---|
| **Gratis** | Sin acento. Tarjeta estándar. |
| **Contacto Directo** | Botón WhatsApp directo (azul). |
| **Comercio Verificado** | Insignia "Verificado" + texto. |
| **Vidriera Digital** | **Ámbar** + borde dorado `.oro-card` + difusión. Único plan que usa ámbar. |

---

## 9. Hacé / No hagas

**✅ Hacé**
- `brand-600` como única acción principal.
- `brand-500` `#0791FE` para identidad: logo, foco, ilustración.
- Ámbar solo para Vidriera Digital y destacados, con texto tinta.
- Tinta `#0F172A` para títulos y datos clave.
- Fondo `ink-50` y tarjetas blancas con borde sutil.
- Sora para títulos, Inter para todo lo demás.
- Ícono + texto en cualquier estado (éxito, error, advertencia, plan).

**❌ No hagas**
- Ámbar como botón por defecto, como texto sobre blanco o con texto blanco encima.
- Naranja `#FF6B00` o cualquier segundo cálido dentro del directorio.
- Texto blanco chico sobre `brand-500`.
- Advertencias en ámbar (usá naranja).
- Púrpura, otra fuente o un estilo de tarjetas redondas distinto.
- Texto esencial en gris claro sobre blanco.
- Varios gradientes que compitan o que bajen el contraste.
- Esconder datos detrás de hover.
- Inventar un color nuevo sin pasarlo por `DESIGN.md` y `design:lint`.

---

## 10. Assets de marca (`public/`)

| Archivo | Uso |
|---|---|
| `logo-flores.webp` | Logo principal (cabeza + PWA maskable) |
| `favicon-flores.png` / `apple-touch-icon-flores.png` | Favicon |
| `icono-192.png` / `icono-512.png` | PWA |
| `og-cover.png` (1200×630) | Vista previa en WhatsApp / Facebook / X |
| `clasificados-las-flores.webp` | Arte de marca |
| `memby-studio.webp` | Logo del socio estratégico |

### Deuda técnica: tres azules distintos

Hoy conviven **tres** azules en el proyecto: `#1C72EF` (`manifest.webmanifest`), `#155DDC` (tokens `brand-600`) y `#0791FE` (identidad / logo). Con esta versión quedan **dos, con roles claros** (`brand-500` identidad y `brand-600` acción).

- `theme_color` del manifest: pasarlo a **`#0791FE`** si el logo y el ícono PWA usan ese azul (así barra, splash e ícono coinciden). Si el logo usa otro azul, pasarlo a `#155DDC` como ya estaba previsto.
- ⚠️ **Verificar** el color real de `logo-flores.webp` antes de decidir.
- Actualizar `manifest.webmanifest` y `BaseLayout` juntos.

---

## 11. Tokens

### 11.1 Figma — Variables en dos capas

**Colección `Primitives`** (colores crudos): `brand/50…900`, `ink/50…950`, `accent/50…700`, más los de estado (`green`, `red`, `orange`).

**Colección `Tokens`** (con significado; los componentes usan **solo** estos):

| Token | Apunta a | Valor |
|---|---|---|
| `color/action/primary` | brand/600 | `#155DDC` |
| `color/action/primary-hover` | brand/700 | `#184EB4` |
| `color/brand/identity` | brand/500 | `#0791FE` |
| `color/focus/ring` | brand/500 | `#0791FE` |
| `color/surface/info` | brand/50 | `#EEF7FF` |
| `color/text/primary` | ink/900 | `#0F172A` |
| `color/text/secondary` | ink/600 | `#475569` |
| `color/text/placeholder` | ink/500 | `#64748B` |
| `color/text/link` | brand/600 | `#155DDC` |
| `color/text/on-primary` | white | `#FFFFFF` |
| `color/text/on-premium` | ink/900 | `#0F172A` |
| `color/surface/page` | ink/50 | `#F8FAFC` |
| `color/surface/card` | white | `#FFFFFF` |
| `color/surface/inverse` | ink/950 | `#020617` |
| `color/border/default` | ink/200 | `#E2E8F0` |
| `color/border/input` | ink/300 | `#CBD5E1` |
| `color/premium/fill` | accent/500 | `#F59E0B` |
| `color/premium/border` | accent/600 | `#D97706` |
| `color/premium/text` | accent/700 | `#B45309` |
| `color/feedback/success` | green/700 | `#15803D` |
| `color/feedback/error` | red/700 | `#B91C1C` |
| `color/feedback/warning` | orange/700 | `#C2410C` |

Ventaja: si cambia un color de marca, se cambia en una sola primitiva y todo el kit se actualiza. La colección `Tokens` queda lista para sumar un modo oscuro.

### 11.2 Código — qué cambia en `src/styles/global.css` (@theme, Tailwind 4)

*(Ajustar el formato a cómo ya está escrito tu `@theme`.)*

```css
@theme {
  /* CAMBIA: antes #338FFA */
  --color-brand-500: #0791FE;

  /* COMPLETAR escala ink (slate) */
  --color-ink-300: #CBD5E1;
  --color-ink-400: #94A3B8;
  --color-ink-500: #64748B;
  --color-ink-600: #475569;
  --color-ink-700: #334155;

  /* AGREGAR ámbar suave y texto */
  --color-accent-50: #FFFBEB;
  --color-accent-100: #FEF3C7;
  --color-accent-700: #B45309;

  /* AGREGAR semánticos */
  --color-success-50: #F0FDF4;
  --color-success-200: #BBF7D0;
  --color-success-700: #15803D;
  --color-error-50: #FEF2F2;
  --color-error-200: #FECACA;
  --color-error-700: #B91C1C;
  --color-warning-50: #FFF7ED;
  --color-warning-200: #FED7AA;
  --color-warning-700: #C2410C;
}
```

---

## 12. Plan de aplicación (qué hacer, en orden)

1. **Decidir** los puntos 1 y 2 de la sección 0 (azul de dos roles y ámbar como único cálido). Son las dos decisiones de fondo.
2. **Verificar** el color real del logo (`logo-flores.webp`).
3. **Actualizar** `DESIGN.md` y `global.css`: `brand-500`, escala `ink`, `accent-50/100/700`, semánticos (sección 11.2).
4. **Correr** `pnpm design:lint` y revisar los usos de `brand-500` (foco y detalles vivos) para confirmar que el cambio de `#338FFA` a `#0791FE` se ve bien.
5. **Unificar** `theme_color` en `manifest.webmanifest` y `BaseLayout`.
6. **Actualizar** `PALETA-COLORES.html` (se entrega una versión nueva: `PALETA-COLORES-definitiva.html`).
7. **Cargar en Figma** las colecciones `Primitives` y `Tokens` (sección 11.1).

---

## 13. Qué falta para completar el kit

**Ya resuelto:** idea de marca · paleta y semántica · storytelling · tipografía · formas y espaciado · componentes base · planes y color · accesibilidad · assets.

**Pendiente:**

- [ ] **Logo:** versiones (principal, horizontal, solo ícono, monocromática, sobre fondo oscuro), zona de seguridad, tamaño mínimo, usos incorrectos.
- [ ] **Iconografía:** elegir una sola familia de íconos de línea (Lucide o Tabler, ambas gratuitas), fijar grosor y tamaños (16/20/24) y definir los íconos de rubros del directorio.
- [ ] **Imágenes:** estilo fotográfico (fotos reales de comercios de Las Flores, luz natural, sin bancos de imágenes genéricos) y tratamiento.
- [ ] **Voz y tono:** documentar cómo habla la marca. Punto de partida: rioplatense, voseo, directo, sin tecnicismos. Ejemplo: *"Lo que necesitás, más cerca."* Definir ejemplos de "sí" y "no" y el tono por contexto (botones, errores, emails de bienvenida, redes).
- [ ] **Color del badge "Verificado"** (azul o verde).
- [ ] **Variables en Figma** (sección 11.1).
- [ ] **Componentes en Figma** con Auto Layout: botones, inputs, chips/badges, tarjeta de negocio, navegación y buscador, pin y tarjeta del mapa, formulario de registro de comercio.
- [ ] **Página de Brand Guidelines** en Figma, exportable a PDF.

**Estructura sugerida del archivo de Figma**

```
📄 Portada
📄 Fundamentos
   ├─ Esencia de marca
   ├─ Logo
   ├─ Color (variables)
   ├─ Tipografía (text styles)
   ├─ Espaciado, radios, sombras
   └─ Iconografía
📄 Componentes
📄 Patrones (header, footer, filtros, mapa)
📄 Pantallas (home, listado, perfil de negocio, registro)
```

---

## 14. Validar tokens

```bash
pnpm design:lint    # valida DESIGN.md (contraste, tokens huérfanos)
pnpm design:export  # exporta tokens a CSS @theme de Tailwind 4
```

---

## 15. Fuentes consultadas (psicología del color)

- Canva — La psicología del color: https://www.canva.com/es_mx/aprende/psicologia-del-color/
- Mailchimp — Psicología del color para marketing y branding: https://mailchimp.com/es/resources/color-psychology/
- EBAC — Qué significa el color azul: https://ebac.mx/blog/que-significa-el-color-azul
- Berger Team — Psicología del color: azul: https://www.berger.team/es/branding/farbpsychologie-blau-vertrauen-ruhe-autoritaet-und-seine-wirkung-im-branding/
- Berger Team — Psicología del color: naranja: https://www.berger.team/es/branding/farbpsychologie-orange-energie-innovation-und-wie-es-kaufentscheidungen-beeinflusst/
- Uzink — La psicología del color: https://uzink.es/la-psicologia-del-color-potenciando-tu-identidad-de-marca/
- Unionn Estudio Creativo — Psicología del color y marcas: https://unionn.es/153-psicologia-del-color-significado-e-impacto-en-las-marcas/
- Awaken Visual — Psicología del color en el branding profesional: https://www.awakenvisual.com/psicologia-del-color-branding-profesional/
- Salima Sánchez — Significado de los colores: https://salimasanchez.com/psicologia-del-color-que-es-significado-colores/
