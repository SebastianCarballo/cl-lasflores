# Copy CRO — portada de Clasificados Las Flores

## Brief basado en el sitio

- **Producto:** directorio local de comercios, oficios, servicios, alquileres y empleo en Las Flores, Buenos Aires. Permite buscar por rubro, revisar fichas y consultar los datos de contacto disponibles.
- **Audiencia primaria:** vecinos que necesitan resolver algo en la ciudad. Suelen conocer la necesidad y la categoría, pero no necesariamente el directorio: **conscientes de la solución**.
- **Audiencia secundaria:** comerciantes, profesionales y emprendimientos locales que quieren aparecer cuando alguien busca su rubro. Están **conscientes del problema** (cuesta ordenar y encontrar la información comercial) y empezando a evaluar soluciones.
- **Dolor primario:** encontrar un contacto útil implica rebuscar entre mensajes, publicaciones y datos dispersos.
- **Resultado deseado:** localizar opciones de Las Flores en un solo lugar y consultar la ficha/contacto sin crear una cuenta.
- **Canal y formato:** hero de la página de inicio, más CTA secundario para comercios.
- **Acción principal:** buscar comercios o servicios en el directorio.
- **Acción secundaria:** publicar una ficha. El plan Gratis cuesta $0 para siempre e incluye una foto básica, dirección, horarios y contacto; no incluye botón directo de WhatsApp. Los planes pagos y sus prestaciones están detallados en `/planes`.

## Variantes de titular

### A — Beneficio directo (predeterminada)

**Titular:** Clasificados Las Flores: encontrá comercios y servicios cerca.

**Bajada:** Buscá por rubro, revisá fichas locales y consultá los datos de contacto, sin crear una cuenta.

**Rationale:** explica el producto, la geografía y el resultado en una lectura. Reduce la incertidumbre sobre qué hacer en la página.

### B — Dolor reconocido

**Titular:** ¿Buscás un contacto entre mensajes y publicaciones viejas?

**Bajada:** Encontrá comercios, oficios y servicios de Las Flores en un directorio ordenado por rubro.

**Rationale:** conecta con la dispersión de información que la propia página “Nosotros” describe. Hipótesis: resonará más con quien ya sufrió esa búsqueda.

### C — Ejemplos concretos

**Titular:** ¿Plomero, pizza o alquiler? Buscá opciones locales.

**Bajada:** Explorá comercios, servicios, inmuebles y más en Las Flores; revisá cada ficha y sus opciones de contacto.

**Rationale:** convierte una propuesta amplia en búsquedas reconocibles y facilita que el visitante se imagine usando el buscador.

## Beneficios y objeciones

- **Vecinos:** búsqueda por categorías, información de negocios locales y acceso a los canales de contacto publicados. Buscar no requiere cuenta.
- **Comercios:** una ficha gratuita para empezar; pueden ampliar visibilidad y prestaciones mediante los planes pagos publicados en `/planes`.
- **Objeción de vecinos — “¿Tengo que registrarme o pagar para buscar?”** Microcopy: “Buscá sin crear una cuenta”.
- **Objeción de comercios — “¿Tengo que pagar para aparecer?”** Microcopy: “Empezá con una ficha gratis para siempre. Sin tarjeta”.

## Microcopy de CTA

**Buscador (dos opciones para probar):**
1. **Buscar comercios** — deja explícito qué aparecerá.
2. **Ver opciones locales** — enfatiza el beneficio de explorar.

**Publicación (dos opciones para probar):**
1. **Publicar mi ficha gratis** — aclara el resultado y elimina la duda de precio.
2. **Empezar gratis** — menor carga cognitiva; el contexto explica qué se inicia.

En la versión predeterminada de la portada se usa **“Buscar comercios”** y el enlace secundario **“¿Tenés un negocio? Publicá tu ficha gratis”**.

## Protocolo A/B

Las versiones se pueden abrir con `/?copy=a`, `/?copy=b` y `/?copy=c`; sin parámetro se muestra A. El evento `home_copy_exposure` identifica la variante y el evento existente `buscar` mide el envío del buscador con la misma variante.

- **Hipótesis:** B aumentará la búsqueda entre visitantes que reconocen el problema; C aumentará el inicio de búsqueda entre visitantes con una necesidad concreta.
- **Métrica primaria:** envíos del buscador por exposición de variante.
- **Métricas de control:** clics a categorías, resultados sin coincidencias y clics a publicar.
- **Regla de interpretación:** comparar períodos y fuentes de tráfico equivalentes; no elegir ganador solo por clics si suben las búsquedas sin resultados.
- **Integridad:** evitar promesas de “verificado” para todos los resultados, contactos garantizados, urgencia artificial o escasez no respaldada.
