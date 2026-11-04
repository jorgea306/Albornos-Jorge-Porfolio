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
  it('muestra exactamente 4 tarjetas', () => {
    mostrarConTema(<Services />);
    expect(screen.getAllByRole('article')).toHaveLength(4);
    for (const servicio of servicios.items) {
      expect(screen.getByRole('heading', { level: 3, name: servicio.titulo })).toBeInTheDocument();
    }
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
