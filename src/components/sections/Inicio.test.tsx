import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { content } from '../../content';
import { mostrarConTema } from '../../test/render';
import Hero from './Hero';
import Services from './Services';
import Stack from './Stack';

const { hero, servicios, stack } = content.inicio;

describe('Hero', () => {
  it('muestra el titulo como h1 y los botones llevan a Casos y Contacto', () => {
    mostrarConTema(<Hero />);
    expect(screen.getByRole('heading', { level: 1, name: hero.titulo })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: hero.principal.texto })).toHaveAttribute('href', '#casos');
    expect(screen.getByRole('link', { name: hero.secundario.texto })).toHaveAttribute('href', '#contacto');
  });
});

describe('Services', () => {
  it('muestra el encabezado y exactamente 4 tarjetas con ícono oculto y etiquetas', () => {
    const { container } = mostrarConTema(<Services />);
    const { encabezado } = servicios;
    expect(screen.getByText(encabezado.etiqueta)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: encabezado.titulo })).toBeInTheDocument();
    expect(screen.getByText(encabezado.bajada!)).toBeInTheDocument();
    expect(screen.getAllByRole('article')).toHaveLength(4);
    for (const servicio of servicios.items) {
      expect(screen.getByRole('heading', { level: 3, name: servicio.titulo })).toBeInTheDocument();
      for (const etiqueta of servicio.etiquetas) expect(screen.getAllByText(etiqueta).length).toBeGreaterThan(0);
    }
    const iconos = container.querySelectorAll('svg');
    expect(iconos).toHaveLength(4);
    for (const icono of iconos) expect(icono).toHaveAttribute('aria-hidden', 'true');
  });
});

describe('Stack', () => {
  it('muestra cada grupo con sus tecnologias', () => {
    mostrarConTema(<Stack />);
    for (const grupo of stack.grupos) {
      expect(screen.getByRole('heading', { level: 3, name: grupo.titulo })).toBeInTheDocument();
    }
    expect(screen.getAllByRole('listitem')).toHaveLength(stack.grupos.flatMap((g) => g.tecnologias).length);
  });
});
