# Slice 6: Proceso, Sobre mí con Stack y Contacto

**Qué se cambió:** el Inicio ahora cierra con `Process.tsx` (4 pasos), `About.tsx` (bio, botones y tarjeta de Stack) y `Contact.tsx` (teléfono, WhatsApp y email copiable). `Stack.tsx` pasó a `StackCard.tsx` y `Home.tsx` fija el orden final.

**Por qué:** la spec reemplaza la sección Experiencia por Sobre mí, y pide un contacto sin formulario. El Stack deja de ser una sección y pasa a ser una tarjeta dentro de `#sobre-mi`.

**Cómo funciona ahora:** `About` muestra la foto y el botón de CV solo si `pendiente` es `false` en `content.ts`; si no, usa un avatar con iniciales. `Contact` copia el email con `navigator.clipboard` (el portapapeles del navegador) y anuncia el resultado en una región `role="status"`. Si falla, avisa por texto y el email sigue visible.

**Decisiones:** LinkedIn y GitHub se leen de `content.redes` (la barra y el pie ya las usan), no de `sobreMi`. Se descartó duplicarlas. La bio, los textos de Proceso y el título técnico son provisorios y Jorge debe confirmarlos.

**A revisar:** `COMPLETAR` en LinkedIn, título técnico y "4+ años" hace que `npm run verify` falle hasta que Jorge los cargue. Faltan `public/retrato.webp` y `public/cv-jorge-albornos.pdf`; al subirlos hay que poner `pendiente: false` (`content.test.ts` lo exige).

Detalle SDD: `sdd/portfolio/tasks` (Slice 6) y `sdd/portfolio/apply-progress` en Engram.
