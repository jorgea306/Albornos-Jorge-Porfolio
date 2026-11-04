# Glosario del proyecto

Términos técnicos que aparecen en los artefactos del portfolio, explicados con ejemplos de este proyecto.

| Término | Qué significa en este proyecto |
|---|---|
| MUI (Material UI) | Librería de componentes de React con un sistema de temas. El portfolio la usa como base de componentes propios como `SectionCard` y define colores pastel en `src/theme.ts` con `createTheme`. |
| Emotion | Librería que MUI usa por debajo para generar el CSS desde JavaScript. En el prerender hay que capturar ese CSS, o el HTML de `/casos/dallas-note` saldría sin estilos. |
| SPA (Single Page Application, aplicación de una sola página) | El navegador recibe un HTML casi vacío y React arma cada pantalla con JavaScript. Es lo que genera Vite por defecto para el portfolio. |
| Prerender | En el build se ejecuta React una vez por ruta y se guarda el HTML resultante. Así, `/casos/carga-masiva-productos` llega con su texto y su Open Graph sin esperar al JavaScript. |
| Ruta | Dirección dentro del sitio que muestra una página concreta. Ejemplo: `/` muestra el Inicio y `/casos/dallas-note` muestra la página de Dallas Note. |
| Rewrite | Regla de `vercel.json` que sirve otro archivo sin cambiar la dirección. Si alguien abre una ruta sin HTML propio, Vercel devuelve la SPA y el router decide qué mostrar. |
| Vercel Analytics | Servicio de Vercel que cuenta las visitas por ruta sin usar cookies. Lo agrega el componente `<Analytics />` de `@vercel/analytics`; el plan gratis incluye 50.000 eventos por mes. |
| Open Graph | Etiquetas en el `<head>` que definen el título, la descripción y la imagen que aparecen al compartir un link del portfolio en LinkedIn o WhatsApp. |
| Lighthouse | Herramienta de Chrome que puntúa una página de 0 a 100 en rendimiento, accesibilidad y SEO. La meta es >= 90 en mobile. |
| SEO (Search Engine Optimization, optimización para buscadores) | Ajustes para que Google entienda y muestre bien el sitio: título, descripción y estructura de títulos. |
| Mobile first | Se diseña primero para pantallas de celular (390 px de ancho) y después se agregan estilos para pantallas más grandes. |
| Slice (PR encadenado) | Una porción chica y autónoma del trabajo que se revisa en su propio PR. Ejemplo: el slice 4 es la plantilla de detalle con los Casos A y B. |
| Hidratación | Paso en el que React toma el HTML prerenderizado y le conecta los eventos sin volver a dibujarlo. Ejemplo: `ThemeToggle` aparece en el HTML de `/` y recién responde al clic después de la hidratación. |
| Modo framework (React Router) | Forma de usar React Router donde también maneja el build y el prerender, con `react-router.config.ts` y `src/routes.ts`. Es lo que permite declarar el título de `/casos/dallas-note` con la función `meta`. |
| Spike de verificación | Prueba corta y con tiempo límite para confirmar algo no verificado antes de construir encima. Ejemplo: la primera tarea del slice 1 confirma que el HTML de `/` sale con el CSS de Emotion. |
| Carga diferida | Pedir un archivo recién cuando hace falta. Ejemplo: los videos de `/casos/dallas-note` usan `preload="none"` y solo muestran su póster hasta que el usuario toca reproducir. |
| Vitest y Testing Library | Herramientas de pruebas automáticas: Vitest ejecuta las pruebas y Testing Library renderiza componentes como los usa una persona. Ejemplo: probar que `CaseDetail` no muestra diagrama en un caso "En desarrollo". |
| Placeholder `[COMPLETAR]` | Marca en `src/content.ts` o imagen provisoria que indica un dato o captura que Jorge todavía tiene que cargar. |
