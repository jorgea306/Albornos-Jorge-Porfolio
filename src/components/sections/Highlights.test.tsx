import { screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { COMPLETAR, content } from '../../content';
import { mostrarConTema } from '../../test/render';
import Highlights from './Highlights';

const { destacados } = content.inicio;

describe('Highlights', () => {
  it('muestra 4 tarjetas en una lista con nombre accesible y en el orden de content.ts', () => {
    mostrarConTema(<Highlights />);
    const lista = within(screen.getByRole('region', { name: destacados.etiqueta })).getByRole('list');
    const tarjetas = within(lista).getAllByRole('listitem');
    expect(tarjetas).toHaveLength(4);
    expect(tarjetas[0]).toHaveTextContent('652');
    expect(tarjetas[0]).toHaveTextContent('6,5 minutos');
    expect(tarjetas[1]).toHaveTextContent('4+ años');
    expect(tarjetas[2]).toHaveTextContent('Tech Lead');
    expect(tarjetas[3]).toHaveTextContent('Multiempresa');
  });

  it('los datos sin confirmar llevan el marcador COMPLETAR (content R8)', () => {
    mostrarConTema(<Highlights />);
    const tarjetas = screen.getAllByRole('listitem');
    expect(tarjetas[0]).not.toHaveTextContent(COMPLETAR);
    for (const tarjeta of tarjetas.slice(1)) expect(tarjeta).toHaveTextContent(COMPLETAR);
  });
});
