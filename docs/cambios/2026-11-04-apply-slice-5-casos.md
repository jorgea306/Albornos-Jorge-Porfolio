# Slice 5: Casos del Inicio

**Qué se cambió:** la sección Casos ahora muestra un caso destacado (`FeaturedCase.tsx`), tres tarjetas con espacio de imagen y el bloque "Laboratorio" (`Lab.tsx`). `SectionCard.tsx` acepta la prop `medio`. `Cases.tsx` se reescribió.

**Por qué:** el diseño v4 pide mostrar primero el caso fuerte (carga masiva) con su resultado, y separar los proyectos en desarrollo para que no parezcan casos terminados.

**Cómo funciona ahora:** `Cases.tsx` lee `content.casos` y reparte: el caso con `destacado` va a `FeaturedCase`, los otros publicados a `SectionCard` y los `en-desarrollo` a `Lab`. El orden de `content.casos` pasó a A, Dallas Note, Plataforma, API (decisión D5). Sin archivo de captura (`pendiente: true`), la tarjeta muestra un recuadro "Captura pendiente" y no una imagen rota.

**Decisiones:** el texto del panel de progreso es accesible y la barra es `aria-hidden`. Se usó `<img>` nativo en la tarjeta, porque en `Box` el ancho y el alto serían estilos y no atributos. Se descartó mostrar captura en el destacado: no hay archivos todavía.

**A revisar:** los textos del destacado son provisorios y Jorge debe confirmarlos. `public/casos/<slug>/tarjeta.webp` no existe: al subirlo hay que poner `pendiente: false`. El texto "Captura pendiente" es visible en el sitio público hasta entonces.
