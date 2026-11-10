# Slice 1 del portfolio: base, tema MUI y prerender

Resumen de 5-10 líneas. El detalle está en los artefactos SDD del cambio `portfolio` (engram: `sdd/portfolio/proposal`, `spec`, `design`, `tasks`, `apply-progress`).

**Qué se cambió:** se armó la base del sitio con React Router 7 (`ssr: false`, rutas prerenderizadas), MUI con tema claro/oscuro, `ThemeToggle`, layout, tipos de contenido, Vitest y `vercel.json`.

**Por qué:** el sitio necesita HTML con título, Open Graph y estilos ya incluidos, porque LinkedIn y WhatsApp no ejecutan JavaScript. Antes de construir más, el spike (tarea 1.5) confirmó que Emotion, el CSS que genera MUI, sale dentro del HTML del build.

**Cómo funciona ahora:** `react-router.config.ts` toma los slugs de `src/content.ts` y prerenderiza `/` y cada `/casos/<slug>`. `src/root.tsx` pone `InitColorSchemeScript` en el `<head>`: elige la clase `light` o `dark` antes del primer pintado y evita el parpadeo. `scripts/verificar-build.mjs` revisa que cada HTML de `build/client` tenga `<title>`, `og:title`, `og:image` y `<style data-emotion`.

**Decisiones:** no hizo falta `src/entry.server.tsx` ni el plan B (`vite-react-ssg`): Emotion inserta sus estilos en el HTML por defecto. `ThemeToggle` guarda la elección con el `localStorage` de MUI (decisión PROVISORIA, pregunta abierta 5). El acento salvia vive solo en `src/theme.ts`; el texto de botones de texto y enlaces usa `text.primary` para cumplir contraste AA.

**A tener en cuenta:** las tareas 1.17 (repo público en GitHub) y 1.18 (Vercel) son acciones de Jorge y quedan pendientes. Las páginas `Home` y `CaseDetail` son provisorias hasta los slices 2 y 4. `docs/` y `.atl/` no se versionan (están en `.git/info/exclude`) hasta que Jorge decida.
