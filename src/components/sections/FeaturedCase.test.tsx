import { screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { content } from '../../content';
import type { Caso } from '../../content.types';
import { mostrarConTema } from '../../test/render';
import FeaturedCase from './FeaturedCase';

const { casos } = content.inicio;
const casoA = content.casos[0] as Caso;

describe('FeaturedCase', () => {
  it('muestra los chips, el título y los tres bloques con sus rótulos', () => {
    mostrarConTema(<FeaturedCase caso={casoA} />);
    expect(screen.getByText(casos.destacado)).toBeInTheDocument();
    for (const chip of ['Node.js', 'E-commerce']) expect(screen.getByText(chip)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: casoA.titulo })).toBeInTheDocument();
    for (const rotulo of Object.values(casos.rotulos)) expect(screen.getByText(rotulo)).toBeInTheDocument();
    expect(screen.getByText(casoA.destacado!.resultado)).toBeInTheDocument();
  });

  it('repite las cifras de la franja de datos: 652 productos y 6,5 minutos', () => {
    mostrarConTema(<FeaturedCase caso={casoA} />);
    expect(screen.getByText('652 productos en 6,5 minutos')).toBeInTheDocument();
    expect(screen.getByText(/652 \/ 652 productos · 6,5 min/)).toBeInTheDocument();
  });

  it('rotula como estimado el tiempo de carga manual', () => {
    mostrarConTema(<FeaturedCase caso={casoA} />);
    expect(screen.getByText(casoA.destacado!.problema)).toHaveTextContent(/estimado/);
  });

  it('el texto del progreso está disponible como texto y la barra queda oculta', () => {
    const { container } = mostrarConTema(<FeaturedCase caso={casoA} />);
    expect(screen.getByText(casoA.progreso!.texto)).toBeInTheDocument();
    const barra = container.querySelector('[aria-hidden="true"]');
    expect(barra).not.toBeNull();
    // La barra no contiene texto: no agrega información que falte en el panel.
    expect(barra).toHaveTextContent('');
  });

  it('enlaza "Leer el caso completo" a la página del caso', () => {
    mostrarConTema(<FeaturedCase caso={casoA} />);
    const enlace = screen.getByRole('link', { name: casos.leerCompleto });
    expect(enlace).toHaveAttribute('href', '/casos/carga-masiva-productos');
    expect(within(screen.getByRole('article')).getAllByRole('link')).toHaveLength(1);
  });

  it('no dibuja nada si el caso no es el destacado', () => {
    const { container } = mostrarConTema(<FeaturedCase caso={content.casos[1]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
