import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { content, getCaseBySlug } from '../../content';
import { mostrarConTema } from '../../test/render';
import NextCase from './NextCase';

function mostrarSiguiente(slug: string) {
  return mostrarConTema(<NextCase caso={getCaseBySlug(slug)!} />);
}

describe('NextCase', () => {
  it('desde el Caso A lleva a Dallas Note, con el rótulo "SIGUIENTE CASO →"', () => {
    mostrarSiguiente('carga-masiva-productos');
    const enlace = screen.getByRole('link');
    expect(enlace).toHaveAttribute('href', '/casos/dallas-note');
    expect(enlace).toHaveTextContent(content.detalle.siguiente);
    expect(enlace).toHaveTextContent('Dallas Note');
  });

  it('es circular: desde el último caso completo vuelve al Caso A', () => {
    mostrarSiguiente('api-usuarios-nestjs');
    expect(screen.getByRole('link')).toHaveAttribute('href', '/casos/carga-masiva-productos');
  });

  it('los casos cortos no muestran la tarjeta', () => {
    const { container } = mostrarSiguiente('agente-whatsapp-ferreteria');
    expect(container).toBeEmptyDOMElement();
  });
});
