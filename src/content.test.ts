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

  it('ordena los casos como pide la spec: A, Dallas Note, Plataforma, API y luego los de desarrollo', () => {
    expect(content.casos.map((c) => c.slug)).toEqual([
      'carga-masiva-productos',
      'dallas-note',
      'plataforma-agentes-ia',
      'api-usuarios-nestjs',
      'agente-whatsapp-ferreteria',
      'peluqueria-agente-ia',
    ]);
  });

  it('solo el Caso A es destacado, con progreso, y repite 652 productos y 6,5 minutos', () => {
    const destacados = content.casos.filter((c) => c.destacado);
    expect(destacados.map((c) => c.slug)).toEqual(['carga-masiva-productos']);
    const [casoA] = destacados;
    expect(casoA.destacado?.resultado).toContain('652');
    expect(casoA.destacado?.resultado).toContain('6,5');
    expect(casoA.progreso?.texto).toBe('planilla.xlsx · 2 columnas → 652 / 652 productos · 6,5 min');
  });

  it('las 3 tarjetas del Inicio tienen espacio de imagen y chips; los casos en desarrollo no', () => {
    const tarjetas = content.casos.filter((c) => c.estado === 'publicado' && !c.destacado);
    expect(tarjetas).toHaveLength(3);
    for (const caso of tarjetas) {
      expect(caso.imagenTarjeta, caso.slug).toBeDefined();
      expect(caso.chips?.length, caso.slug).toBeGreaterThan(0);
    }
    for (const caso of content.casos.filter((c) => c.estado === 'en-desarrollo')) {
      expect(caso.imagenTarjeta, caso.slug).toBeUndefined();
    }
  });

  it('cada medio existe en public/casos/<slug>/ o esta marcado como pendiente', () => {
    for (const caso of content.casos) {
      const medios = [...caso.medios, ...(caso.imagenTarjeta ? [caso.imagenTarjeta] : [])];
      for (const medio of medios) {
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

// Voseo (portfolio-content R7): lista fija de tuteo = union de la spec y del diseno.
// "tu/tus" como posesivo es valido ("a tu negocio"), por eso no figura en la lista.
const FORMAS_DE_TUTEO = ['Contáctame', 'puedes', 'tienes', 'quieres', 'cuéntame', 'escríbeme', 'para ti'];

// Dentro de un template literal la barra se escribe doble: con `\p` suelto se pierde y queda `p{L}`.
function marcaForma(frase: string, forma: string): boolean {
  return new RegExp(`(?<![\\p{L}])${forma}(?![\\p{L}])`, 'iu').test(frase);
}

function contieneTuteo(frase: string): boolean {
  return FORMAS_DE_TUTEO.some((forma) => marcaForma(frase, forma));
}

describe('tono de los textos', () => {
  const texto = JSON.stringify(content);

  it.each(FORMAS_DE_TUTEO)('no usa la forma de tuteo "%s"', (forma) => {
    expect(marcaForma(texto, forma)).toBe(false);
  });

  it('el posesivo "a tu negocio" no se marca como tuteo', () => {
    expect(texto).toMatch(/a tu negocio/);
    expect(contieneTuteo('le ahorran horas a tu negocio')).toBe(false);
    expect(contieneTuteo('si quieres, escríbeme')).toBe(true);
  });

  it('respeta el límite de palabra (regresión de la barra perdida en \\p{L})', () => {
    expect(contieneTuteo('el grupuedes raro')).toBe(false);
    expect(contieneTuteo('lo que {puedes}')).toBe(true);
  });
});
