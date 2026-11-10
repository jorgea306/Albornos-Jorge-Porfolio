import { spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';

const SCRIPT = join(process.cwd(), 'scripts', 'verificar-build.mjs');
const carpetas: string[] = [];

// HTML mínimo que cumple los requisitos del chequeo 1 (título, Open Graph y estilos de Emotion).
function pagina(cuerpo: string, extra = '') {
  return `<!doctype html><html><head><title>Prueba</title>
<meta property="og:title" content="Prueba"><meta property="og:image" content="/og.png">
<style data-emotion="css">a{}</style></head><body>${cuerpo}${extra}</body></html>`;
}

// Arma un build/client falso en una carpeta temporal y corre el script ahí (el script lee rutas relativas).
function verificar(archivos: Record<string, string>, args: string[] = [], env: Record<string, string> = {}) {
  const dir = mkdtempSync(join(tmpdir(), 'verificar-'));
  carpetas.push(dir);
  mkdirSync(join(dir, 'build', 'client', 'assets'), { recursive: true });
  for (const [ruta, texto] of Object.entries(archivos)) writeFileSync(join(dir, ...ruta.split('/')), texto);
  const resultado = spawnSync(process.execPath, [SCRIPT, ...args], {
    cwd: dir,
    encoding: 'utf8',
    env: { ...process.env, VERCEL_ENV: '', ...env },
  });
  return { codigo: resultado.status, salida: `${resultado.stdout}${resultado.stderr}` };
}

afterEach(() => {
  for (const dir of carpetas.splice(0)) rmSync(dir, { recursive: true, force: true });
});

describe('verificar-build.mjs: pendientes visibles', () => {
  it('termina en 0 si no queda ningún marcador', () => {
    expect(verificar({ 'build/client/index.html': pagina('<p>Todo listo</p>') }).codigo).toBe(0);
  });

  it('termina en 1 y nombra el archivo y el texto si el marcador está en texto visible', () => {
    const { codigo, salida } = verificar({ 'build/client/index.html': pagina('<p>4+ años [COMPLETAR]</p>') });
    expect(codigo).toBe(1);
    expect(salida).toContain('index.html');
    expect(salida).toContain('4+ años [COMPLETAR]');
  });

  it('también falla si el marcador está en un href', () => {
    const { codigo, salida } = verificar({ 'build/client/index.html': pagina('<a href="[COMPLETAR]">LinkedIn</a>') });
    expect(codigo).toBe(1);
    expect(salida).toContain('atributo href="[COMPLETAR]"');
  });

  it('ignora el marcador que solo viaja dentro de un <script>', () => {
    const script = '<script>window.datos = {"url":"[COMPLETAR]"}</script>';
    expect(verificar({ 'build/client/index.html': pagina('<p>Listo</p>', script) }).codigo).toBe(0);
  });

  it('con --pendientes=aviso o VERCEL_ENV=preview solo avisa', () => {
    const archivos = { 'build/client/index.html': pagina('<p>[COMPLETAR]</p>') };
    const conBandera = verificar(archivos, ['--pendientes=aviso']);
    expect(conBandera.codigo).toBe(0);
    expect(conBandera.salida).toContain('AVISO');
    expect(verificar(archivos, [], { VERCEL_ENV: 'preview' }).codigo).toBe(0);
  });
});

describe('verificar-build.mjs: nombres protegidos', () => {
  const denylist = { 'confidencialidad.local.json': JSON.stringify({ denylist: ['Acme'] }) };

  it('falla si un archivo del build nombra a alguien de la denylist como palabra completa', () => {
    const { codigo, salida } = verificar({
      'build/client/index.html': pagina('<p>Listo</p>'),
      'build/client/assets/app.js': 'const cliente = "Acme Shop";',
      ...denylist,
    });
    expect(codigo).toBe(1);
    expect(salida).toContain('app.js');
  });

  it('respeta el límite de palabra (regresión de \\b perdido en un string)', () => {
    const { codigo } = verificar({
      'build/client/index.html': pagina('<p>Listo</p>'),
      'build/client/assets/app.js': 'const x = "acmeThing"; const y = "AcmeCorp";',
      ...denylist,
    });
    expect(codigo).toBe(0);
  });

  it('sin confidencialidad.local.json avisa y sigue', () => {
    const { codigo, salida } = verificar({ 'build/client/index.html': pagina('<p>Listo</p>') });
    expect(codigo).toBe(0);
    expect(salida).toContain('confidencialidad.local.json');
  });
});
