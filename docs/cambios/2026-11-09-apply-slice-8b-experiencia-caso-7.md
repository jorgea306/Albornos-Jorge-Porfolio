# Slice 8b: experiencia en la bio, Plataforma completa y séptimo caso

**Qué se cambió:** `src/content.ts` pasa la bio de "Sobre mí" a pasado (Extrados hasta marzo de 2026, Global hasta septiembre) y confirma "Tech Lead" y "Multiempresa" en los datos destacados. Completa `plataforma-agentes-ia` y suma el caso `carga-visitas-contactos`.

**Cómo funciona:** el caso nuevo está en desarrollo pero tiene detalle completo. Por eso aparece como tercer enlace del Laboratorio (`Lab.tsx`), no como tarjeta, y `getSiguienteCaso()` ahora mira solo la variante `completa`. Su diagrama es `CargaVisitas.tsx`, armado sobre `DiagramaVertical.tsx`.

**Decisiones:** el nombre interno del sistema no está en el repo; se usa "Carga de visitas y contactos". Lo no confirmado (mes de ingreso a Extrados, qué hace Jorge hoy, métricas del caso 7) lleva `[COMPLETAR]`.

**A revisar:** los casos de WhatsApp y peluquería siguen cortos y pasan al slice 8c. Lighthouse, 390 px y revisión visual quedan manuales.

Detalle SDD: `sdd/portfolio/tasks` (Slice 8b) y `sdd/portfolio/apply-progress` en Engram.
