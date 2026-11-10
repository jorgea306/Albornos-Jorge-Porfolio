import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { content, getCaseBySlug } from '../../content';
import type { Caso } from '../../content.types';
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
    mostrarSiguiente('peluqueria-agente-ia');
    expect(screen.getByRole('link')).toHaveAttribute('href', '/casos/carga-masiva-productos');
  });

  it('los casos en desarrollo con detalle completo también enlazan al siguiente', () => {
    mostrarSiguiente('carga-visitas-contactos');
    expect(screen.getByRole('link')).toHaveAttribute('href', '/casos/agente-whatsapp-ferreteria');
  });

  it('un caso corto o desconocido no muestra la tarjeta', () => {
    const corto: Caso = { ...getCaseBySlug('dallas-note')!, slug: 'caso-corto-de-prueba', variante: 'corta' };
    const { container } = mostrarConTema(<NextCase caso={corto} />);
    expect(container).toBeEmptyDOMElement();
  });
});
