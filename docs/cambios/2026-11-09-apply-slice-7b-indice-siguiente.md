# Slice 7b: índice lateral, Siguiente caso, imagen principal y chequeo de diagrama

**Qué se cambió:** `CaseDetail.tsx` pasó a dos columnas desde `md`: `CaseToc.tsx` (índice "En este caso") a la izquierda y los artículos a la derecha. Al final va `NextCase.tsx`, y bajo el encabezado `CaseMedia.tsx` dibuja la imagen principal y el video.

**Por qué:** la spec pide que el lector sepa en qué parte del caso está, que pueda seguir al próximo caso y que la imagen principal reserve su lugar aunque el archivo falte.

**Cómo funciona ahora:** `useSeccionActiva.ts` usa un `IntersectionObserver` para marcar con `aria-current` la sección que se está leyendo. Empieza siempre en la primera, así el prerender y el cliente coinciden. `getSiguienteCaso()` en `content.ts` recorre los casos completos y publicados, y es circular. `scripts/verificar-build.mjs` ahora falla si un HTML con `data-variante="completa"` no tiene `data-diagrama=`.

**Decisiones:** con `--pendientes=aviso` el chequeo del diagrama solo avisa, porque Dallas Note, la Plataforma y la API son casos completos sin diagrama hasta el slice 8. `npm run verify` sin bandera sí falla. El estado activo del índice usa el salvia como relleno y no como color de texto, para mantener el contraste AA.

**Incluido del 7a:** el punto de control 7a.11 había postergado tres piezas y entraron acá. `CaseResults.tsx` dibuja las tarjetas de `Metrica` (solo en casos completos y solo si hay métricas) y rotula "Estimado" únicamente la de tipo `estimado`. `CaseCta.tsx` es la tarjeta final "¿Tenés un problema parecido?" hacia `/#contacto`, igual en las dos variantes y después de `NextCase`. `CargaMasiva.test.tsx` cubre las 3 cajas, el nombre accesible y la ausencia de "proveedor", "11 columnas" y "ZIP".

**A revisar:** la imagen principal del Caso A (`public/casos/carga-masiva-productos/principal.webp`, 1200×480) sigue pendiente.

Detalle SDD: `sdd/portfolio/tasks` (Slice 7b) y `sdd/portfolio/apply-progress` en Engram.
