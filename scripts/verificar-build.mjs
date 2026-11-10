// Revisa build/client despues de `npm run build`. Falla (codigo 1) si:
//  1. algun HTML no trae titulo, Open Graph y estilos de Emotion;
//  2. algun HTML deja a la vista el marcador [COMPLETAR] (texto, atributos o <head>);
//  3. algun archivo del build nombra a alguien de confidencialidad.local.json (si el archivo existe);
//  4. algun caso completo (data-variante="completa") no trae su diagrama (data-diagrama=).
// Con `--pendientes=aviso` (o VERCEL_ENV=preview) los chequeos 2 y 4 solo avisan: sirve para revisar slices y vistas previas.
// Uso con npm: `npm run verify -- --pendientes=aviso` (npm agrega el argumento al final del script).
import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';

const RAIZ = 'build/client';
const ARCHIVO_DENYLIST = 'confidencialidad.local.json';
const MARCADOR = '[COMPLETAR]';
// El fallback SPA es un cascaron sin contenido: nunca se indexa ni se comparte.
const EXCLUIDOS = new Set(['__spa-fallback.html']);
const EXTENSIONES_DENYLIST = /\.(html|js|css|svg|json|txt)$/;
const soloAvisar = process.argv.includes('--pendientes=aviso') || process.env.VERCEL_ENV === 'preview';

const REQUISITOS = [
  ['<title>', /<title>[^<]+<\/title>/],
  ['og:title', /property="og:title"/],
  ['og:image', /property="og:image"/],
  ['<style data-emotion', /<style data-emotion/],
];

async function listarArchivos(dir) {
  const entradas = await readdir(dir, { withFileTypes: true });
  const archivos = await Promise.all(
    entradas.map((e) => {
      const ruta = join(dir, e.name);
      return e.isDirectory() ? listarArchivos(ruta) : [ruta];
    }),
  );
  return archivos.flat();
}

// Cada aparicion del marcador, descrita para que se vea donde esta: atributo de una etiqueta o texto visible.
// Se quitan <script> y <style> antes: ahi viaja el contenido serializado y el CSS, que no se ven en pantalla.
function buscarPendientes(html) {
  const visible = html.replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, '');
  const hallazgos = [];
  for (const etiqueta of visible.match(/<[^>]*\[COMPLETAR\][^>]*>/g) ?? []) {
    const atributo = etiqueta.match(/[\w:-]+="[^"]*\[COMPLETAR\][^"]*"/);
    hallazgos.push(`atributo ${atributo ? atributo[0] : etiqueta.slice(0, 80)}`);
  }
  const texto = visible.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ');
  for (let i = texto.indexOf(MARCADOR); i !== -1; i = texto.indexOf(MARCADOR, i + MARCADOR.length)) {
    hallazgos.push(`texto "${texto.slice(Math.max(0, i - 50), i + MARCADOR.length + 30).trim()}"`);
  }
  return hallazgos;
}

// Un caso completo debe llevar su diagrama. Se mira solo el HTML visible (sin <script> ni <style>), igual que con los pendientes.
// El script no importa src/content.ts: se apoya en los dos atributos que dejan CaseDetail y DiagramFrame.
function faltaDiagrama(html) {
  const visible = html.replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, '');
  return /data-variante="completa"/.test(visible) && !/data-diagrama=/.test(visible);
}

// Palabra completa y con mayusculas exactas. En un string normal el limite de palabra se escribe '\\b'.
function nombraA(texto, nombre) {
  const escapado = nombre.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp('\\b' + escapado + '\\b').test(texto);
}

async function leerDenylist() {
  try {
    const { denylist } = JSON.parse(await readFile(ARCHIVO_DENYLIST, 'utf8'));
    return denylist;
  } catch {
    return null;
  }
}

const todos = await listarArchivos(RAIZ).catch(() => []);
const archivosHtml = todos.filter((r) => r.endsWith('.html') && !EXCLUIDOS.has(r.split(/[\\/]/).pop()));
if (archivosHtml.length === 0) {
  console.error(`No hay HTML en ${RAIZ}. Corre "npm run build" primero.`);
  process.exit(1);
}

let fallas = 0;
for (const archivo of archivosHtml) {
  const html = await readFile(archivo, 'utf8');
  const nombre = relative(RAIZ, archivo);
  const faltantes = REQUISITOS.filter(([, patron]) => !patron.test(html)).map(([n]) => n);
  const pendientes = buscarPendientes(html);
  const sinDiagrama = faltaDiagrama(html);
  if (sinDiagrama) {
    // Como los pendientes: hasta el slice 8 hay casos completos sin diagrama, y con --pendientes=aviso solo se avisa.
    if (!soloAvisar) fallas++;
    console.error(`${soloAvisar ? 'AVISO' : 'FALLA'} ${nombre}: es un caso completo y no tiene data-diagrama`);
  }
  if (faltantes.length > 0) {
    fallas++;
    console.error(`FALLA ${nombre}: falta ${faltantes.join(', ')}`);
  }
  for (const pendiente of pendientes) {
    if (!soloAvisar) fallas++;
    console.error(`${soloAvisar ? 'AVISO' : 'FALLA'} ${nombre}: ${MARCADOR} en ${pendiente}`);
  }
  if (faltantes.length === 0 && pendientes.length === 0 && !sinDiagrama) console.log(`OK    ${nombre}`);
}

const denylist = await leerDenylist();
if (denylist === null) {
  console.warn(`AVISO: no hay ${ARCHIVO_DENYLIST}; se omite la revision de nombres protegidos en ${RAIZ}.`);
} else {
  for (const archivo of todos.filter((r) => EXTENSIONES_DENYLIST.test(r))) {
    const texto = await readFile(archivo, 'utf8');
    for (const nombre of denylist.filter((n) => nombraA(texto, n))) {
      fallas++;
      console.error(`FALLA ${relative(RAIZ, archivo)}: nombra a "${nombre}" (confidencialidad)`);
    }
  }
}
process.exit(fallas > 0 ? 1 : 0);
