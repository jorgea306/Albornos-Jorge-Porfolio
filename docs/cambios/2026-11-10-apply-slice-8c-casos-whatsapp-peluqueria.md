# Slice 8c: casos de WhatsApp y peluquería con detalle completo

**Qué se cambió:** en `src/content.ts`, los casos `agente-whatsapp-ferreteria` y `peluqueria-agente-ia` pasan de variante `corta` a `completa`. Cada uno suma su diagrama: `AgenteWhatsApp.tsx` y `PeluqueriaAgente.tsx`, armados sobre `DiagramaVertical.tsx` y registrados en `src/diagrams/index.ts`.

**Cómo funciona:** los dos siguen "En desarrollo" y en el Laboratorio del Inicio. Como `getSiguienteCaso()` filtra por variante `completa`, el ciclo de "Siguiente caso" ahora tiene 7 casos y cierra en la peluquería, que vuelve al Caso A. No tienen tarjetas de resultados porque no hay cifras.

**Decisiones:** lo marcado `[COMPLETAR]` o `[CONFIRMAR]` en el texto de Jorge se carga con la constante `COMPLETAR` (stack de WhatsApp, derivación a una persona, NestJS en la peluquería, duración, aprendizajes). La plantilla corta (`CaseDetail`, `CaseHeader`) se conserva; sus pruebas usan un caso de prueba en `CaseDetail.test.tsx`.

**A revisar:** la plantilla completa exige 2 aprendizajes, y el texto traía uno (WhatsApp) o ninguno (peluquería); se completó con `COMPLETAR`. Confirmar con Jorge esos datos y la revisión visual de los dos diagramas.

Detalle SDD: `sdd/portfolio/tasks` (Slice 8c) y `sdd/portfolio/apply-progress` en Engram.
