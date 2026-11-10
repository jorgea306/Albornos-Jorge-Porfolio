import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import ts from 'typescript';
import { describe, expect, it } from 'vitest';

const RAIZ = process.cwd();
// Atributos JSX cuyo valor lee una persona (lector de pantalla o texto en pantalla).
const ATRIBUTOS_VISIBLES = new Set(['aria-label', 'aria-description', 'alt', 'title', 'placeholder', 'label']);
const TIENE_LETRAS = /\p{L}/u;

// Devuelve los textos visibles escritos a mano en un archivo TSX: texto entre etiquetas,
// atributos de la lista y cadenas dentro de llaves como {'texto'}.
export function buscarLiterales(codigo: string): string[] {
  const fuente = ts.createSourceFile('archivo.tsx', codigo, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const hallazgos: string[] = [];
  const visitar = (nodo: ts.Node) => {
    if (ts.isJsxText(nodo) && TIENE_LETRAS.test(nodo.text)) {
      hallazgos.push(nodo.text.trim());
    } else if (ts.isJsxAttribute(nodo) && ATRIBUTOS_VISIBLES.has(nodo.name.getText())) {
      if (nodo.initializer && ts.isStringLiteral(nodo.initializer) && TIENE_LETRAS.test(nodo.initializer.text)) {
        hallazgos.push(nodo.initializer.text);
      }
    } else if (ts.isJsxExpression(nodo) && nodo.expression && ts.isStringLiteralLike(nodo.expression)) {
      if (TIENE_LETRAS.test(nodo.expression.text)) hallazgos.push(nodo.expression.text);
    }
    ts.forEachChild(nodo, visitar);
  };
  visitar(fuente);
  return hallazgos;
}

function listarTsx(dir: string): string[] {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((nombre) => {
    const ruta = join(dir, nombre);
    if (statSync(ruta).isDirectory()) return listarTsx(ruta);
    return /\.tsx$/.test(ruta) && !/\.test\.tsx$/.test(ruta) ? [ruta] : [];
  });
}

describe('buscarLiterales', () => {
  it('detecta texto entre etiquetas, atributos visibles y cadenas entre llaves', () => {
    expect(buscarLiterales('const a = <p>Hola mundo</p>;')).toEqual(['Hola mundo']);
    expect(buscarLiterales('const a = <img alt="Foto" />;')).toEqual(['Foto']);
    expect(buscarLiterales("const a = <p>{'Hola'}</p>;")).toEqual(['Hola']);
  });

  it('ignora texto que viene de content, atributos tecnicos y espacios', () => {
    expect(buscarLiterales('const a = <p variant="h3" id="x">{content.titulo}</p>;')).toEqual([]);
    expect(buscarLiterales('const a = <div>\n  <b />\n</div>;')).toEqual([]);
  });
});

describe('sin textos fijos fuera de content.ts', () => {
  it('src/components, src/pages, src/diagrams y root.tsx no tienen literales visibles', () => {
    const archivos = [
      ...['components', 'pages', 'diagrams'].flatMap((c) => listarTsx(join(RAIZ, 'src', c))),
      join(RAIZ, 'src', 'root.tsx'),
    ];
    expect(archivos.length).toBeGreaterThan(5);
    const hallazgos = archivos.flatMap((ruta) =>
      buscarLiterales(readFileSync(ruta, 'utf8')).map((texto) => `${ruta}: ${texto}`),
    );
    expect(hallazgos).toEqual([]);
  });
});
