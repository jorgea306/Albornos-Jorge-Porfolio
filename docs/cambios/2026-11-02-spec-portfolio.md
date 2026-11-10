# Spec del portfolio: 7 capacidades nuevas

**Qué se cambió:** se escribieron las specs del cambio `portfolio` para 7 capacidades nuevas, con requisitos DEBE/DEBERÍA y escenarios Dado/Cuando/Entonces. Se guardaron en Engram como `sdd/portfolio/spec`.

**Por qué:** la propuesta v3 fue aprobada el 2026-11-02. Faltaba fijar qué debe cumplir el sitio de forma verificable antes del diseño y las tareas.

**Cómo funciona ahora:** cada capacidad cubre un tema de la propuesta. `portfolio-content` fija `src/content.ts`, la confidencialidad y las cifras del Caso A (2.608 min estimados contra 6,5 min medidos). `portfolio-sections` cubre el Inicio, el Contacto con `tel:` y `wa.me/5493834400061`, y el tema con acento verde salvia en `src/theme.ts`. `project-detail-pages` y `case-diagrams` cubren `/casos/<slug>`, la versión corta y la 404. `site-seo-performance`, `site-analytics` y `static-publishing` cubren el prerender, Lighthouse >= 90, Vercel Analytics y `vercel.json`.

**Decisiones:** no se agregó ningún requisito fuera de la propuesta; lo que faltaba quedó en "Preguntas abiertas". Se incluyeron bordes: captura faltante, ruta inexistente, caso "En desarrollo" y JavaScript lento.

**A tener en cuenta:** quedan 6 preguntas para diseño: código HTTP de la 404, texto alternativo de los SVG, imagen Open Graph, rótulo de "estimado", términos del plan Hobby y persistencia del tema elegido.

| Capacidad | Requisitos | Escenarios |
|---|---|---|
| `portfolio-content` | 5 | 10 |
| `portfolio-sections` | 7 | 14 |
| `project-detail-pages` | 6 | 11 |
| `case-diagrams` | 4 | 5 |
| `site-seo-performance` | 5 | 8 |
| `site-analytics` | 3 | 4 |
| `static-publishing` | 5 | 8 |
| **Total** | **35** | **60** |
