import { screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { content } from '../../content';
import { mostrarConTema } from '../../test/render';
import SiteFooter from './SiteFooter';

const { interfaz, navegacion, redes } = content;

describe('SiteFooter', () => {
  it('muestra el texto del pie con el año, el nombre y la ciudad', () => {
    mostrarConTema(<SiteFooter />);
    expect(screen.getByText(interfaz.pie)).toBeInTheDocument();
    expect(interfaz.pie).toMatch(/2026.*Jorge Albornos.*Córdoba, Argentina/);
  });

  it('tiene 3 enlaces: LinkedIn, GitHub y "Volver arriba" a #arriba', () => {
    mostrarConTema(<SiteFooter />);
    const pie = screen.getByRole('contentinfo');
    expect(within(pie).getAllByRole('link')).toHaveLength(3);
    expect(within(pie).getByRole('link', { name: redes.linkedin.texto })).toHaveAttribute('href', redes.linkedin.url);
    expect(within(pie).getByRole('link', { name: redes.github.texto })).toHaveAttribute(
      'href',
      'https://github.com/jorgea306',
    );
    expect(within(pie).getByRole('link', { name: navegacion.volverArriba })).toHaveAttribute('href', '#arriba');
  });
});
