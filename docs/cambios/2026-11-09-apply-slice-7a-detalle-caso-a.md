# Slice 7a: plantilla de detalle, Caso A y diagrama de tres cajas

**Qué se cambió:** `CaseDetail.tsx` ahora arma la página de un caso con `CaseHeader` (migas, título largo, bajada y metadatos) y artículos numerados con `CaseSection`. El Caso A (carga masiva) tiene su contenido completo y el diagrama `CargaMasiva.tsx`.

**Por qué:** la spec pide una plantilla común para los seis casos, con una variante corta para los que están en desarrollo, y un diagrama propio por caso completo.

**Cómo funciona ahora:** `CaseDetail` dibuja solo los artículos que tienen datos y los numera por orden de aparición. Deja `data-variante` en el HTML para que el build pueda comprobar qué plantilla se usó. `DiagramFrame.tsx` pone `data-diagrama` y la leyenda accesible del diagrama.

**Decisiones:** el diagrama se resolvió con HTML y flechas SVG decorativas, no con un SVG único, para que el orden se lea como texto. Las tarjetas de resultado (`CaseResults`) y la tarjeta final de contacto (`CaseCta`) quedaron para el slice 7b, donde se agregaron.

Detalle SDD: `sdd/portfolio/tasks` (Slice 7a) y `sdd/portfolio/apply-progress` en Engram.
