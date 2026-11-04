# Slice 3: paleta, fuentes, barra fija, pie y voseo

**Qué se cambió:** `src/theme.ts` aplica la paleta salvia y crema, la tipografía y el botón principal. Se agregan `SiteHeader`, `NavMenu` y `SiteFooter` en `src/components/layout/`. Los textos pasan a voseo.

**Por qué:** el diseño v4 pide una barra fija con anclas, un pie y tres tipografías servidas desde el propio sitio. Sin eso los slices 4 a 6 no tienen dónde apoyarse.

**Cómo funciona ahora:** `root.tsx` carga `fuentes.ts` y arma barra, contenido y pie dentro de `App`. `SiteHeader` elige su variante según la ruta (Inicio, detalle o resto) y todos sus enlaces van a `/#ancla`. Bajo 900 px los 4 enlaces pasan a `NavMenu`. `theme.test.ts` mide el contraste de los pares nuevos.

**Decisiones:** `fuentes.css` declara solo el subconjunto latino de cada familia, porque los paquetes `@fontsource-variable` no traen un CSS solo latino (3 archivos, 130 KB). Barra y pie viven en `App` y no en `Layout`: el HTML de respaldo se genera en `/` y causaba un error de hidratación (React reconstruye el HTML del servidor y avisa que no coincide) en las rutas 404. Provisorio: un slug inexistente bajo `/casos/` usa la barra del Inicio.

**A revisar:** los enlaces `#proceso`, `#sobre-mi` y `#contacto` no tienen sección hasta el slice 6. La URL de LinkedIn sigue en `[COMPLETAR]`.
