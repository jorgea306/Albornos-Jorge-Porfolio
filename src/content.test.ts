import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { COMPLETAR, content, getCaseBySlug } from './content';

const RAIZ = process.cwd();
const ARCHIVO_DENYLIST = join(RAIZ, 'confidencialidad.local.json');

describe('content.ts', () => {
  it('tiene slugs unicos', () => {
    const slugs = content.casos.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('getCaseBySlug devuelve el caso o undefined', () => {
    expect(getCaseBySlug('dallas-note')?.titulo).toBe('Dallas Note');
    expect(getCaseBySlug('no-existe')).toBeUndefined();
  });

  it('la variante corta no incluye arquitectura', () => {
    for (const caso of content.casos.filter((c) => c.variante === 'corta')) {
      expect(caso.arquitectura, caso.slug).toBeUndefined();
    }
  });

  it('las metricas estimadas estan rotuladas como estimadas', () => {
    for (const caso of content.casos) {
      for (const metrica of caso.resultados ?? []) {
        if (metrica.tipo === 'estimado') {
          expect(metrica.etiqueta, caso.slug).toMatch(/estimad/i);
        }
      }
    }
  });

  it('cada medio existe en public/casos/<slug>/ o esta marcado como pendiente', () => {
    for (const caso of content.casos) {
      for (const medio of caso.medios) {
        if (medio.pendiente) continue;
        const ruta = join(RAIZ, 'public', 'casos', caso.slug, medio.archivo);
        expect(existsSync(ruta), ruta).toBe(true);
      }
    }
  });

  it('exporta el marcador COMPLETAR', () => {
    expect(COMPLETAR).toBe('[COMPLETAR]');
  });
});

function listarArchivos(dir: string): string[] {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((nombre) => {
    const ruta = join(dir, nombre);
    return statSync(ruta).isDirectory() ? listarArchivos(ruta) : [ruta];
  });
}

// Palabra completa y con mayusculas exactas: evita falsos positivos como "globalThis".
// Ojo: dentro de un template literal el limite de palabra se escribe `\\b`; con `\b` seria un backspace.
function contieneNombre(texto: string, nombre: string): boolean {
  return new RegExp(`\\b${nombre}\\b`).test(texto);
}

describe('contieneNombre', () => {
  it('detecta el nombre como palabra completa', () => {
    expect(contieneNombre('Carga de productos para Acme Shop', 'Acme')).toBe(true);
  });

  it('no marca falsos positivos', () => {
    expect(contieneNombre('usa acmeThing y acme/utils', 'Acme')).toBe(false);
    expect(contieneNombre('una tienda online', 'Acme')).toBe(false);
  });
});

// La lista de nombres confidenciales vive fuera de git (repo publico). Sin el archivo, se omite.
describe.skipIf(!existsSync(ARCHIVO_DENYLIST))('confidencialidad', () => {
  it('src/, public/ y docs/ no contienen nombres de la denylist local', () => {
    const { denylist } = JSON.parse(readFileSync(ARCHIVO_DENYLIST, 'utf8')) as { denylist: string[] };
    const archivos = ['src', 'public', 'docs']
      .flatMap((carpeta) => listarArchivos(join(RAIZ, carpeta)))
      .filter((ruta) => /\.(tsx?|json|svg|html|css|md|txt)$/.test(ruta));
    const hallazgos: string[] = [];
    for (const archivo of archivos) {
      const texto = readFileSync(archivo, 'utf8');
      for (const nombre of denylist) {
        if (contieneNombre(texto, nombre)) hallazgos.push(`${archivo}: ${nombre}`);
      }
    }
    expect(hallazgos).toEqual([]);
  });
});
