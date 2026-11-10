import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { COMPLETAR, content, getCaseBySlug, getSiguienteCaso } from './content';

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

  it('ordena los casos: A, Dallas Note, Plataforma, API, Carga de visitas y luego los dos cortos', () => {
    expect(content.casos.map((c) => c.slug)).toEqual([
      'carga-masiva-productos',
      'dallas-note',
      'plataforma-agentes-ia',
      'api-usuarios-nestjs',
      'carga-visitas-contactos',
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

  it('el Caso A tiene título largo, 4 métricas con la estimada explicada (43,5 h), terminal y diagrama de 3 cajas', () => {
    const casoA = getCaseBySlug('carga-masiva-productos')!;
    expect(casoA.tituloLargo).toBe('De una planilla de dos columnas a una tienda online completa en minutos');
    expect(casoA.tituloLargo).not.toBe(casoA.titulo);
    expect(casoA.resultados?.map((m) => m.valor)).toEqual(['652', '6,5 min', '43,5 h', '2']);
    const estimadas = casoA.resultados!.filter((m) => m.tipo === 'estimado');
    expect(estimadas).toHaveLength(1);
    expect(estimadas[0].etiqueta).toContain('652 productos × 4 min');
    expect(casoA.terminal?.lineas[0].texto).toBe('node cargar-productos.js planilla.xlsx');
    expect(casoA.terminal?.lineas.at(-1)?.texto).toBe('652 / 652 productos cargados · 6m 30s');
    expect(casoA.arquitectura?.diagrama).toBe('carga-masiva');
    expect(casoA.aprendizajes.length).toBeGreaterThanOrEqual(2);
    expect(casoA.solucion.length).toBeGreaterThan(0);
  });

  it('el Caso A tiene Rol y Estado escritos y la Duración pendiente; el Estado de los casos en desarrollo está escrito', () => {
    const { metadatos } = getCaseBySlug('carga-masiva-productos')!;
    expect([metadatos.rol, metadatos.duracion, metadatos.estado]).toEqual(['Desarrollo completo', COMPLETAR, 'En uso']);
    for (const caso of content.casos.filter((c) => c.estado === 'en-desarrollo')) {
      expect(caso.metadatos.estado, caso.slug).toBe('En desarrollo');
    }
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

  it('foto y CV: pendiente es false solo si el archivo existe en public/ (los dos sentidos)', () => {
    const { foto, cv } = content.inicio.sobreMi;
    for (const { archivo, pendiente } of [foto, cv]) {
      const existe = existsSync(join(RAIZ, 'public', archivo));
      expect(pendiente, archivo).toBe(!existe);
    }
  });

  it('los datos sin confirmar siguen marcados con COMPLETAR (4+ años, título técnico, LinkedIn)', () => {
    const { destacados, sobreMi } = content.inicio;
    expect(destacados.items.find((d) => d.valor.startsWith('4+ años'))?.valor).toContain(COMPLETAR);
    expect(sobreMi.subtitulo).toContain(COMPLETAR);
    expect(sobreMi.parrafos[0]).toContain(COMPLETAR);
    expect(content.redes.linkedin.url).toBe(COMPLETAR);
  });

  it('la bio tiene dos párrafos, nombra a Extrados y Global, y marca como pendiente lo que hace hoy', () => {
    const { parrafos } = content.inicio.sobreMi;
    expect(parrafos).toHaveLength(2);
    expect(parrafos.join(' ')).toContain('Extrados');
    expect(parrafos.join(' ')).toContain('Global');
    expect(parrafos[1]).toContain(COMPLETAR);
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

const COMPLETOS = [
  'carga-masiva-productos',
  'dallas-note',
  'plataforma-agentes-ia',
  'api-usuarios-nestjs',
  'carga-visitas-contactos',
];

describe('casos completos y cortos', () => {
  const completos = content.casos.filter((c) => c.variante === 'completa');
  const cortos = content.casos.filter((c) => c.variante === 'corta');

  it('los 5 casos completos son los esperados', () => {
    expect(completos.map((c) => c.slug)).toEqual(COMPLETOS);
  });

  it.each(COMPLETOS)('%s tiene arquitectura, al menos 2 aprendizajes y los 4 metadatos', (slug) => {
    const caso = getCaseBySlug(slug)!;
    expect(caso.arquitectura, slug).toBeDefined();
    expect(caso.aprendizajes.length, slug).toBeGreaterThanOrEqual(2);
    const { rol, stack, duracion, estado } = caso.metadatos;
    expect([rol, duracion, estado].every((dato) => dato.trim() !== ''), slug).toBe(true);
    expect(stack.length, slug).toBeGreaterThan(0);
    expect(caso.solucion.length, slug).toBeGreaterThan(0);
  });

  it('cada caso completo apunta a un diagrama distinto', () => {
    const ids = completos.map((c) => c.arquitectura!.diagrama);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('todo caso completo con resultados trae al menos una cifra numérica o COMPLETAR', () => {
    for (const caso of completos.filter((c) => c.resultados)) {
      const hayCifra = caso.resultados!.some((m) => /\d/.test(m.valor) || m.valor.includes(COMPLETAR));
      expect(hayCifra, caso.slug).toBe(true);
    }
  });

  it('Dallas Note trae 3 métricas y la API de usuarios una métrica pendiente', () => {
    expect(getCaseBySlug('dallas-note')!.resultados!.map((m) => m.valor)).toEqual(['2', '2', 'USD 0']);
    expect(getCaseBySlug('api-usuarios-nestjs')!.resultados!.map((m) => m.valor)).toEqual([COMPLETAR]);
  });

  it('la Plataforma no trae resultados y no incluye la nota privada de Jorge', () => {
    const plataforma = getCaseBySlug('plataforma-agentes-ia')!;
    expect(plataforma.resultados).toBeUndefined();
    expect(JSON.stringify(plataforma)).not.toMatch(/Nota de Jorge|empleador/i);
  });

  it('las afirmaciones sin confirmar de los casos llevan COMPLETAR', () => {
    const dallas = getCaseBySlug('dallas-note')!;
    expect(dallas.aprendizajes[0]).toContain(COMPLETAR);
    const plataforma = getCaseBySlug('plataforma-agentes-ia')!;
    expect(plataforma.solucion.find((d) => d.includes('JWT'))).toContain(COMPLETAR);
    expect(plataforma.metadatos.duracion).toBe('Marzo – septiembre de 2026');
    expect(plataforma.metadatos.stack).toContain(COMPLETAR);
  });

  it('la Plataforma suma el orquestador, el clasificador y las integraciones sin nombres internos de la empresa', () => {
    const texto = getCaseBySlug('plataforma-agentes-ia')!.solucion.join(' ');
    expect(texto).toContain('orquestador');
    expect(texto).toContain('clasificador');
    expect(texto).toContain('clientes, contactos, calendario y tareas');
    expect(texto).not.toMatch(/SIC|CRM core/);
  });

  it('Carga de visitas y contactos está en desarrollo con detalle completo, 2 métricas y todo lo a confirmar con COMPLETAR', () => {
    const caso = getCaseBySlug('carga-visitas-contactos')!;
    expect([caso.estado, caso.variante, caso.metadatos.estado]).toEqual(['en-desarrollo', 'completa', 'En desarrollo']);
    expect(caso.imagenTarjeta).toBeUndefined();
    expect(caso.arquitectura?.diagrama).toBe('carga-visitas');
    expect(caso.resultados?.map((m) => m.valor)).toEqual(['2', '188']);
    for (const metrica of caso.resultados!) expect(metrica.etiqueta).toContain(COMPLETAR);
    for (const aprendizaje of caso.aprendizajes) expect(aprendizaje).toContain(COMPLETAR);
    expect([caso.metadatos.rol, caso.metadatos.duracion].every((d) => d.includes(COMPLETAR))).toBe(true);
    expect(caso.solucion).toHaveLength(7);
  });

  it('los casos cortos no tienen arquitectura, aprendizajes ni resultados', () => {
    expect(cortos).toHaveLength(2);
    for (const caso of cortos) {
      expect([caso.arquitectura, caso.resultados, caso.aprendizajes], caso.slug).toEqual([undefined, undefined, []]);
    }
  });
});

describe('getSiguienteCaso', () => {
  it('recorre el ciclo completo A → Dallas → Plataforma → API → Carga de visitas → A', () => {
    const recorrido = [COMPLETOS[0]];
    for (let i = 0; i < COMPLETOS.length; i++) recorrido.push(getSiguienteCaso(recorrido.at(-1))!.slug);
    expect(recorrido).toEqual([...COMPLETOS, COMPLETOS[0]]);
  });

  it('sigue el orden de content.casos entre los casos completos', () => {
    expect(getSiguienteCaso('carga-masiva-productos')?.slug).toBe('dallas-note');
    expect(getSiguienteCaso('dallas-note')?.slug).toBe('plataforma-agentes-ia');
    expect(getSiguienteCaso('plataforma-agentes-ia')?.slug).toBe('api-usuarios-nestjs');
    expect(getSiguienteCaso('api-usuarios-nestjs')?.slug).toBe('carga-visitas-contactos');
  });

  it('es circular: el último caso completo apunta al primero', () => {
    expect(getSiguienteCaso('carga-visitas-contactos')?.slug).toBe('carga-masiva-productos');
  });

  it('los casos cortos y los slugs desconocidos no tienen siguiente', () => {
    expect(getSiguienteCaso('agente-whatsapp-ferreteria')).toBeUndefined();
    expect(getSiguienteCaso('peluqueria-agente-ia')).toBeUndefined();
    expect(getSiguienteCaso('no-existe')).toBeUndefined();
    expect(getSiguienteCaso(undefined)).toBeUndefined();
  });

  it('nunca devuelve un caso corto', () => {
    for (const caso of content.casos) {
      const siguiente = getSiguienteCaso(caso.slug);
      if (siguiente) expect(siguiente.variante).toBe('completa');
    }
  });
});
