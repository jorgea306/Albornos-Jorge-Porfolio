import { ThemeProvider } from '@mui/material/styles';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { content } from '../content';
import { theme } from '../theme';
import ThemeToggle from './ThemeToggle';

// jsdom no trae matchMedia: se simula con el esquema del sistema que pida cada prueba.
function simularSistema(esquema: 'dark' | 'light') {
  vi.stubGlobal('matchMedia', (consulta: string) => ({
    matches: consulta.includes('dark') ? esquema === 'dark' : esquema === 'light',
    media: consulta,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
    onchange: null,
  }));
}

function mostrar() {
  render(
    <ThemeProvider theme={theme}>
      <ThemeToggle />
    </ThemeProvider>,
  );
}

const clase = () => document.documentElement.className;

describe('ThemeToggle', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = '';
  });
  afterEach(() => vi.unstubAllGlobals());

  it('sigue al sistema cuando no hay eleccion previa', () => {
    simularSistema('dark');
    mostrar();
    expect(clase()).toContain('dark');
  });

  it('cambia al esquema contrario con un clic', async () => {
    simularSistema('dark');
    mostrar();
    await userEvent.click(screen.getByRole('button', { name: content.interfaz.cambiarTema }));
    expect(clase()).toContain('light');
    expect(clase()).not.toContain('dark');
  });

  it('guarda la eleccion para la proxima visita', async () => {
    simularSistema('light');
    mostrar();
    await userEvent.click(screen.getByRole('button', { name: content.interfaz.cambiarTema }));
    expect(localStorage.getItem('mui-mode')).toBe('dark');
  });
});
