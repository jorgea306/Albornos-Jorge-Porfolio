# Tareas del portfolio (SDD `portfolio`)

Resumen: 62 tareas en 6 slices, ordenadas por dependencia. El checklist completo vive en engram (`sdd/portfolio/tasks`, #270). Este documento resume el plan y no lo duplica.

**Qué se cambió:** se descompuso el diseño aprobado en tareas pequeñas, cada una con archivos concretos, criterio verificable y estimación de líneas. Cada slice cierra con verificación y un commit chico.

**Por qué:** el total estimado (~2.800 líneas) supera el presupuesto de revisión. Dividir en slices de 250 a 650 líneas permite revisar y revertir cada parte por separado.

**Cómo funciona ahora:** el slice 1 empieza con un spike (prueba corta de 1 día) que confirma que `react-router build` deja el CSS de Emotion en el HTML y no hay parpadeo de tema. Si falla, se prueba `src/entry.server.tsx` y luego `vite-react-ssg`. Los slices 2 a 6 construyen el Inicio, Experiencia y Contacto, la plantilla `src/pages/CaseDetail.tsx` con diagramas, los casos restantes y, al final, Analytics, README y listas de pendientes.

| Slice | Tareas | Líneas | Entra en 800 |
|---|---|---|---|
| 1 Base + spike, tema, layout | 1.1 a 1.18 | ~600 | Sí |
| 2 Inicio | 2.1 a 2.10 | ~450 | Sí |
| 3 Experiencia + Contacto | 3.1 a 3.7 | ~250 | Sí |
| 4 Detalle + casos A y B | 4.1 a 4.11 | ~650 | Sí |
| 5 Casos C, D, E, peluquería | 5.1 a 5.7 | ~550 | Sí |
| 6 OG, Analytics, README, listas | 6.1 a 6.9 | ~300 | Sí |

**Decisiones y alternativas descartadas:** Vitest se instala en la tarea 1.7, después del spike, para no instalar herramientas si hay que cambiar de plan. Se escriben pruebas junto al código (Strict TDD desactivado). Se descartó un slice aparte solo para pruebas: cada slice trae las suyas.

**A tener en cuenta:** hay tres acciones de Jorge (crear el repo público `jorgea306/<nombre>`, conectar Vercel, exportar capturas). La estrategia de PR encadenados queda pendiente: se decide antes de apply. La spec menciona `dist/`, pero la salida real es `build/client/`. Preguntas abiertas con recomendación: botones del Hero, rótulo "estimado", orden de tarjetas, imagen Open Graph, nombre del repo.
