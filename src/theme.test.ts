import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import type { CssVarsTheme } from '@mui/material/styles';
import { botonPrincipal, FUENTE_MONO, lineaFuerte, radio, theme as temaBase } from './theme';

// createTheme con cssVariables devuelve un tema con colorSchemes, pero su tipo publico no lo declara.
const theme = temaBase as unknown as CssVarsTheme;

// Contraste segun WCAG 2.x: (L1 + 0,05) / (L2 + 0,05), con L = luminancia relativa.
function luminancia(hex: string): number {
  expect(hex, `color no hexadecimal: ${hex}`).toMatch(/^#[0-9a-f]{6}$/i);
  const [r, g, b] = [1, 3, 5].map((i) => {
    const canal = parseInt(hex.slice(i, i + 2), 16) / 255;
    return canal <= 0.03928 ? canal / 12.92 : ((canal + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contraste(a: string, b: string): number {
  const [claro, oscuro] = [luminancia(a), luminancia(b)].sort((x, y) => y - x);
  return (claro + 0.05) / (oscuro + 0.05);
}

const MINIMO_AA = 4.5;

describe.each(['light', 'dark'] as const)('contraste AA en esquema %s', (esquema) => {
  const p = theme.colorSchemes[esquema]!.palette;

  it.each([
    ['text.primary sobre fondo', p.text.primary, p.background.default],
    ['text.primary sobre paper', p.text.primary, p.background.paper],
    ['text.secondary sobre fondo', p.text.secondary, p.background.default],
    ['text.secondary sobre paper', p.text.secondary, p.background.paper],
    ['texto del boton sobre el acento salvia', p.primary.contrastText, p.primary.main],
    ['texto sobre el acento arena', p.secondary.contrastText, p.secondary.main],
  ])('%s >= 4,5:1', (_nombre, texto, fondo) => {
    expect(contraste(texto, fondo)).toBeGreaterThanOrEqual(MINIMO_AA);
  });
});

// Pares del diseno v4: boton principal, palabra resaltada del h1 y boton invertido del bloque Contacto.
describe.each(['light', 'dark'] as const)('pares nuevos de la paleta A en esquema %s', (esquema) => {
  const p = theme.colorSchemes[esquema]!.palette;
  const boton = botonPrincipal[esquema];
  // Claro: texto oscuro sobre el salvia. Oscuro: texto salvia sobre el fondo de la pagina.
  const resaltado = esquema === 'light' ? [p.text.primary, p.primary.main] : [p.primary.main, p.background.default];

  it.each([
    ['letra del boton principal sobre su fondo', boton.texto, boton.fondo],
    ['letra del boton principal sobre su fondo en hover', boton.texto, boton.fondoHover],
    ['palabra resaltada del h1', resaltado[0], resaltado[1]],
    ['boton invertido (primary.main sobre primary.contrastText)', p.primary.main, p.primary.contrastText],
  ])('%s >= 4,5:1', (_nombre, texto, fondo) => {
    expect(contraste(texto, fondo)).toBeGreaterThanOrEqual(MINIMO_AA);
  });

  it('el indicador de foco (text.primary) contrasta >= 3:1 con el fondo', () => {
    expect(contraste(p.text.primary, p.background.default)).toBeGreaterThanOrEqual(3);
  });
});

describe('valores de la tabla de la spec (portfolio-sections R12)', () => {
  it.each([
    ['light', { fondo: '#f5f2ea', paper: '#ffffff', linea: '#e2ddd0', salvia: '#c6e3cf', arena: '#f3ddb8', texto: '#1f2b24', texto2: '#56635a' }],
    ['dark', { fondo: '#131a16', paper: '#1a231e', linea: '#27342c', salvia: '#a8d5b8', arena: '#e8cf9e', texto: '#eaf0ec', texto2: '#a3b3a8' }],
  ] as const)('esquema %s', (esquema, v) => {
    const p = theme.colorSchemes[esquema]!.palette;
    expect([p.background.default, p.background.paper, p.divider, p.primary.main, p.secondary.main, p.text.primary, p.text.secondary]).toEqual([
      v.fondo, v.paper, v.linea, v.salvia, v.arena, v.texto, v.texto2,
    ]);
  });

  it('el boton principal coincide con la tabla y la linea 2 es la del esquema oscuro', () => {
    expect(botonPrincipal.light).toMatchObject({ fondo: '#1f2b24', texto: '#f5f2ea' });
    expect(botonPrincipal.dark).toMatchObject({ fondo: '#a8d5b8', texto: '#131a16' });
    expect(lineaFuerte).toBe('#3d5045');
  });
});

describe('medidas y tipografia del tema', () => {
  it('usa los radios, la tipografia y los toques de 44 px del diseno', () => {
    expect(theme.shape.borderRadius).toBe(8);
    expect(radio).toEqual({ tarjeta: 16, destacada: 20, contacto: 24 });
    expect(theme.typography.h1.fontWeight).toBe(800);
    expect(theme.typography.h1.fontFamily).toMatch(/Bricolage/);
    expect(theme.typography.h2.fontFamily).toMatch(/Bricolage/);
    expect(theme.typography.fontFamily).toMatch(/Inter Variable/);
    expect(theme.typography.overline.fontFamily).toBe(FUENTE_MONO);
    const boton = (temaBase.components!.MuiButton!.styleOverrides as Record<string, unknown>);
    expect(boton.root).toMatchObject({ minHeight: 44 });
    expect(boton.sizeLarge).toMatchObject({ minHeight: 52 });
  });
});

describe('acento unico', () => {
  it('ningun archivo de src/ salvo theme.ts define colores hexadecimales', () => {
    const recorrer = (dir: string): string[] =>
      readdirSync(dir).flatMap((nombre) => {
        const ruta = join(dir, nombre);
        return statSync(ruta).isDirectory() ? recorrer(ruta) : [ruta];
      });
    const infractores = recorrer(join(process.cwd(), 'src'))
      // content.ts queda afuera: la consola del Hero muestra el identificador de auditoría "#a91f", que no es un color.
      .filter((ruta) => /\.(ts|tsx|css)$/.test(ruta) && !/\.test\.tsx?$/.test(ruta) && !/(theme|content)\.ts$/.test(ruta))
      .filter((ruta) => /#[0-9a-f]{3,8}\b/i.test(readFileSync(ruta, 'utf8')));
    expect(infractores).toEqual([]);
  });
});
