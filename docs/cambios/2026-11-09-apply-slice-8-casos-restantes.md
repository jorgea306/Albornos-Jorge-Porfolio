# Slice 8: casos Dallas Note, Plataforma de agentes y API de usuarios, con sus diagramas

**Qué se cambió:** `src/content.ts` carga con el texto final de Jorge los casos `dallas-note`, `plataforma-agentes-ia` y `api-usuarios-nestjs`, y ajusta el Caso A (Rol "Desarrollo completo", Estado "En uso", tarjeta de 43,5 h). Cada caso completo tiene su diagrama en `src/diagrams/`.

**Cómo funciona:** los tres diagramas nuevos (`DallasNote.tsx`, `AgentesMultiempresa.tsx`, `ApiUsuarios.tsx`) arman la lista de pasos y la pasan a `DiagramaVertical.tsx`, que dibuja un SVG con `role="img"`, `<title>` y `<desc>` dentro de `DiagramFrame`. Los datos sin confirmar llevan `[COMPLETAR]`, así `npm run verify` los detecta. La Plataforma no tiene `resultados`, por eso no muestra la fila de tarjetas.

**Decisiones:** el diagrama es vertical para que el texto no se achique a 390 px. Los casos cortos (WhatsApp y peluquería) siguen igual y pasan al slice 8b.

**A revisar:** Chrome a 390 px y Lighthouse en las 6 rutas quedan para verificación manual.

Detalle SDD: `sdd/portfolio/tasks` (Slice 8) y `sdd/portfolio/apply-progress` en Engram.
