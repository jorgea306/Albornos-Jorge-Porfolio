// Revisa el HTML prerenderizado de build/client despues de `npm run build`.
// Falla (codigo 1) si algun HTML no trae titulo, Open Graph y estilos de Emotion.
import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';

const RAIZ = 'build/client';
// El fallback SPA es un cascaron sin contenido: nunca se indexa ni se comparte.
const EXCLUIDOS = new Set(['__spa-fallback.html']);

const REQUISITOS = [
  ['<title>', /<title>[^<]+<\/title>/],
  ['og:title', /property="og:title"/],
  ['og:image', /property="og:image"/],
  ['<style data-emotion', /<style data-emotion/],
];

async function listarHtml(dir) {
  const entradas = await readdir(dir, { withFileTypes: true });
  const archivos = await Promise.all(
    entradas.map((e) => {
      const ruta = join(dir, e.name);
      if (e.isDirectory()) return listarHtml(ruta);
      return e.name.endsWith('.html') && !EXCLUIDOS.has(e.name) ? [ruta] : [];
    }),
  );
  return archivos.flat();
}

const archivos = await listarHtml(RAIZ).catch(() => []);
if (archivos.length === 0) {
  console.error(`No hay HTML en ${RAIZ}. Corre "npm run build" primero.`);
  process.exit(1);
}

let fallas = 0;
for (const archivo of archivos) {
  const html = await readFile(archivo, 'utf8');
  const faltantes = REQUISITOS.filter(([, patron]) => !patron.test(html)).map(([n]) => n);
  const nombre = relative(RAIZ, archivo);
  if (faltantes.length > 0) {
    fallas++;
    console.error(`FALLA ${nombre}: falta ${faltantes.join(', ')}`);
  } else {
    console.log(`OK    ${nombre}`);
  }
}
process.exit(fallas > 0 ? 1 : 0);
