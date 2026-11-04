# Slice 2: secciones del Inicio

**Qué se cambió:** la página `/` ahora muestra Hero, Servicios, Casos y Stack. Los textos viven en `src/content.ts` (bloque `inicio` y `resumen` de cada caso).

**Por qué:** hasta el slice 1 `Home.tsx` era un título provisorio. Sin estas secciones no hay nada que medir en Lighthouse ni que enlazar a los casos.

**Cómo funciona ahora:** `Home.tsx` arma `Hero`, `Services`, `Cases` y `Stack` (en `src/components/sections/`). `Services` y `Cases` pintan tarjetas con `SectionCard.tsx`; `SectionBlock.tsx` aporta el ancla y el encabezado h2. `Cases` recorre `content.casos` y enlaza cada tarjeta a `/casos/<slug>`.

**Prueba de textos fijos:** `src/components/sin-literales.test.ts` usa el compilador de TypeScript para leer cada `.tsx` y falla si encuentra texto visible escrito a mano.

**Decisiones:** el orden de tarjetas es el del arreglo `content.casos` (completos primero). Se descartó una lista de orden aparte para no duplicar datos. Provisorias: botón "Contáctame" (forma neutra del brief), orden de tarjetas y textos de servicios y stack.

**A revisar:** el botón "Contáctame" apunta a `#contacto`, sección que llega en el slice 3. Falta `favicon` (404 en consola).
