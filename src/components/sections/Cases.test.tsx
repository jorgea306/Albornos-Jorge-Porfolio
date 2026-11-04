import { screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { content } from '../../content';
import { mostrarConTema } from '../../test/render';
import Cases from './Cases';

describe('Cases', () => {
  it('muestra una tarjeta por caso con enlace a /casos/<slug>', () => {
    mostrarConTema(<Cases />);
    expect(screen.getAllByRole('article')).toHaveLength(content.casos.length);
    for (const caso of content.casos) {
      const enlace = screen.getByRole('link', { name: new RegExp(caso.titulo) });
      expect(enlace).toHaveAttribute('href', `/casos/${caso.slug}`);
    }
  });

  it('solo los casos en desarrollo llevan la etiqueta "En desarrollo"', () => {
    mostrarConTema(<Cases />);
    for (const caso of content.casos) {
      const tarjeta = screen.getByRole('link', { name: new RegExp(caso.titulo) });
      const etiqueta = within(tarjeta).queryByText(content.inicio.casos.enDesarrollo);
      if (caso.estado === 'en-desarrollo') expect(etiqueta, caso.slug).toBeInTheDocument();
      else expect(etiqueta, caso.slug).not.toBeInTheDocument();
    }
    expect(screen.getAllByText(content.inicio.casos.enDesarrollo)).toHaveLength(2);
  });

  it('ordena las tarjetas: completos primero y en desarrollo al final', () => {
    mostrarConTema(<Cases />);
    const titulos = screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent);
    expect(titulos).toEqual(content.casos.map((c) => c.titulo));
  });
});
