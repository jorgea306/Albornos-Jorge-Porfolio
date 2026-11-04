import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import type { CssVarsTheme } from '@mui/material/styles';
import { theme as temaBase } from './theme';

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

describe('acento unico', () => {
  it('ningun archivo de src/ salvo theme.ts define colores hexadecimales', () => {
    const recorrer = (dir: string): string[] =>
      readdirSync(dir).flatMap((nombre) => {
        const ruta = join(dir, nombre);
        return statSync(ruta).isDirectory() ? recorrer(ruta) : [ruta];
      });
    const infractores = recorrer(join(process.cwd(), 'src'))
      .filter((ruta) => /\.(ts|tsx|css)$/.test(ruta) && !/\.test\.tsx?$/.test(ruta) && !ruta.endsWith('theme.ts'))
      .filter((ruta) => /#[0-9a-f]{3,8}\b/i.test(readFileSync(ruta, 'utf8')));
    expect(infractores).toEqual([]);
  });
});
