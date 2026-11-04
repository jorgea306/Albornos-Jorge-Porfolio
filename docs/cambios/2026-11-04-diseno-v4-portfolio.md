# Diseño técnico v4 del portfolio

Artefacto SDD completo: Engram `sdd/portfolio/design` (v4). Respaldo del anterior: `sdd/portfolio/design-v3`. Propuesta: `sdd/portfolio/proposal` (v4).

**Qué se cambió:** el diseño técnico se adaptó al diseño visual de Jorge. Se mantiene la base del slice 1 (prerender desde `src/content.ts`, Emotion, `src/theme.ts` único) y se agregan barra fija, tres fuentes, ejemplos ilustrativos y la nueva página de detalle.

**Decisiones principales:** `primary` sigue siendo salvia y el botón principal oscuro en claro se define aparte en `theme.ts`, para no cambiar el significado del color por esquema. Bajo 900 px los enlaces van a un menú desplegable. La consola y el terminal son un `<figure>` con texto real y rótulo fijo. El build falla en producción si queda un `[COMPLETAR]` visible y revisa la lista de nombres protegidos en `build/client/`.

**A tener en cuenta:** con `npm run verify` como comando de Vercel, producción no se publica hasta que se confirmen todos los datos pendientes. Los slices 4 y 5 reemplazan unas 150 líneas del slice 2 (`Hero.tsx`, `Cases.tsx` y sus pruebas).
