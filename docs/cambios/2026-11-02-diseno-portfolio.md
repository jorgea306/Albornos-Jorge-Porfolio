# Diseño técnico del sitio web del portfolio

Artefacto SDD completo: Engram `sdd/portfolio/design`. Propuesta: `sdd/portfolio/proposal` (v3, aprobada el 2026-11-02).

**Qué se cambió:** se definió cómo se construye el sitio. Se usa React Router v7 en "modo framework" (la estructura de proyecto donde React Router maneja el build y el prerender) con la carpeta `src/`. Los textos y los casos viven en `src/content.ts`, y todavía no hay código.

**Por qué:** LinkedIn y WhatsApp leen el HTML sin ejecutar JavaScript. Cada ruta, como `/casos/carga-masiva-productos`, necesita llegar con su título, su Open Graph y sus estilos ya incluidos en el HTML.

**Cómo funciona ahora:** `react-router.config.ts` lista las rutas a prerenderizar leyendo los slugs de `src/content.ts`. Cada página declara su título y Open Graph con la función `meta`. En el build, el CSS que genera Emotion queda dentro de cada HTML de `build/client/`, y Vercel sirve esos archivos (ver diagramas).

**Decisiones:** se eligió el modo framework porque `meta` y el prerender son oficiales de React Router; `vite-react-ssg` queda como plan B. Las páginas importan `src/content.ts` directo, sin loaders, para que un slug desconocido muestre `NotFound` sin errores. Las pruebas usan Vitest con Testing Library, más un script que revisa el HTML generado. La lista de nombres confidenciales queda en un archivo local fuera de git, porque el repo es público.

**A tener en cuenta:** la extracción del CSS de Emotion y la ausencia de parpadeo claro/oscuro no están verificadas. Por eso la primera tarea del slice 1 es un spike de verificación con Lighthouse. Si falla, se pasa a `vite-react-ssg` antes de escribir secciones. Un slug inexistente devuelve código 200 con la página `NotFound`, no un 404 real.

```mermaid
flowchart LR
    C["src/content.ts<br/>casos, textos, SEO"] --> CFG["react-router.config.ts<br/>prerender: / + /casos/slug"]
    C --> P["src/pages/<br/>Home, CaseDetail, NotFound<br/>meta() por ruta"]
    T["src/theme.ts<br/>verde salvia, claro/oscuro"] --> P
    DG["src/diagrams/<br/>SVG A, B, D, E"] --> P
    CFG --> B["npm run build<br/>un HTML por ruta<br/>con CSS de Emotion"]
    P --> B
    B --> OUT["build/client/<br/>index.html, casos/slug/index.html,<br/>__spa-fallback.html"]
    OUT --> V["Vercel<br/>vercel.json con rewrite"]
    V --> A["Vercel Analytics<br/>vista por ruta"]
```

```mermaid
flowchart TD
    R["Porfolio/"] --> S["src/"]
    R --> PU["public/<br/>casos/slug/, og/"]
    R --> SC["scripts/verificar-build.mjs"]
    R --> CF["react-router.config.ts<br/>vercel.json, vite.config.ts"]
    S --> ROOT["root.tsx, routes.ts"]
    S --> CT["content.ts, content.types.ts"]
    S --> TH["theme.ts"]
    S --> PG["pages/<br/>Home, CaseDetail, NotFound"]
    S --> CO["components/<br/>SectionCard, CaseHero,<br/>DiagramFrame, ThemeToggle"]
    CO --> SE["sections/<br/>Hero, Services, Cases,<br/>Experience, Stack, Contact"]
    CO --> CA["case/<br/>CaseMetrics, CaseMedia,<br/>CaseVideo, TechTags"]
    S --> DI["diagrams/<br/>index.ts + 4 SVG"]
```
