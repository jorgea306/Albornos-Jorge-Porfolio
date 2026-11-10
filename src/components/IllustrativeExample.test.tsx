import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { content } from '../content';
import type { EjemploIlustrativo } from '../content.types';
import { mostrarConTema } from '../test/render';
import IllustrativeExample from './IllustrativeExample';

// Ejemplo ficticio de prueba: el componente no depende de los textos reales de content.ts.
const ejemplo: EjemploIlustrativo = {
  titulo: 'terminal de prueba',
  leyenda: 'de una corrida de prueba',
  lineas: [
    { tipo: 'comando', texto: 'node correr.js datos.csv' },
    { tipo: 'entrada', etiqueta: 'consulta', texto: 'pregunta de prueba' },
    { tipo: 'ok', etiqueta: 'auditoría', texto: 'registro #0001' },
  ],
};

describe('IllustrativeExample', () => {
  it('es un figure con figcaption que contiene el rótulo y la leyenda', () => {
    const { container } = mostrarConTema(<IllustrativeExample ejemplo={ejemplo} />);
    expect(screen.getByRole('figure')).toBeInTheDocument();
    const leyenda = container.querySelector('figure > figcaption');
    expect(leyenda).toHaveTextContent(`${content.interfaz.ejemploIlustrativo} ${ejemplo.leyenda}`);
  });

  it('el rótulo sale de content.interfaz y no depende de la prop', () => {
    mostrarConTema(<IllustrativeExample ejemplo={{ ...ejemplo, leyenda: 'otra' }} />);
    expect(screen.getByText(content.interfaz.ejemploIlustrativo)).toBeInTheDocument();
  });

  it('lista una línea por <li> y marca el rol con texto', () => {
    mostrarConTema(<IllustrativeExample ejemplo={ejemplo} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(ejemplo.lineas.length);
    expect(screen.getByText('consulta')).toBeInTheDocument();
    expect(screen.getByText('auditoría')).toBeInTheDocument();
  });

  it('los símbolos decorativos llevan aria-hidden', () => {
    const { container } = mostrarConTema(<IllustrativeExample ejemplo={ejemplo} />);
    expect(screen.getByText('$')).toHaveAttribute('aria-hidden', 'true');
    // Los 3 puntos de ventana están dentro de un contenedor oculto.
    expect(container.querySelectorAll('[aria-hidden="true"]').length).toBeGreaterThanOrEqual(2);
  });

  it('no usa imágenes ni canvas', () => {
    const { container } = mostrarConTema(<IllustrativeExample ejemplo={ejemplo} />);
    expect(container.querySelector('img, canvas')).toBeNull();
  });
});
