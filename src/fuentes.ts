// Único lugar que carga las tipografías. Si Lighthouse baja de 90, el plan de reducción
// del diseño (quitar JetBrains Mono, luego limitar Bricolage a h1 y h2) toca solo este archivo y theme.ts.
import './fuentes.css';
// Precarga de las fuentes del texto más grande de la primera pantalla (h1 en Bricolage y cuerpo en Inter).
// El ?url devuelve la misma dirección con hash que usa el CSS, así el navegador no descarga el archivo dos veces.
import bricolageLatin from '@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-wght-normal.woff2?url';
import interLatin from '@fontsource-variable/inter/files/inter-latin-wght-normal.woff2?url';

export const precargaFuentes = [bricolageLatin, interLatin].map((href) => ({
  rel: 'preload',
  href,
  as: 'font',
  type: 'font/woff2',
  crossOrigin: 'anonymous' as const,
}));
