# Slice 4: Hero con consola, franja de datos y Servicios

**Qué se cambió:** `Hero.tsx` ahora muestra el título con la frase resaltada y una consola de ejemplo (`IllustrativeExample.tsx`). Se suman `Highlights.tsx` (franja de 4 datos) e `icons.tsx` (íconos de Servicios). `SectionBlock` y `SectionCard` aceptan etiqueta, bajada, ícono y chips.

**Por qué:** el diseño v4 pide un Hero con prueba concreta de lo que hace un agente, y que los datos sin confirmar no se publiquen por error.

**Cómo funciona ahora:** los textos viven en `content.ts` (`inicio.hero`, `destacados`, `servicios`). La consola es un `<figure>` con una lista `<ol>`; el rótulo "Ejemplo ilustrativo" lo agrega el componente. Las líneas aparecen con CSS solo si no hay `prefers-reduced-motion`.

**Decisiones:** `verificar-build.mjs` falla si queda `[COMPLETAR]` visible y revisa la denylist en `build/client/`; `--pendientes=aviso` lo vuelve aviso y llega al script porque npm agrega los argumentos al final. `vercel.json` corre `npm run verify`. Se descartó un `<pre>` para la consola: a 390 px obliga a scroll horizontal.

**A revisar:** mientras haya `[COMPLETAR]` visibles, Vercel no publica (hoy no hay proyecto conectado). Jorge debe confirmar "4+ años", "Tech Lead" y "Multiempresa". `#proceso`, `#sobre-mi` y `#contacto` siguen sin sección hasta el slice 6.
