import { screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { content, getCaseBySlug } from '../../content';
import type { Metrica } from '../../content.types';
import { mostrarConTema } from '../../test/render';
import CaseResults from './CaseResults';

const metricas: Metrica[] = [
  { valor: '652', etiqueta: 'productos cargados', tipo: 'medido' },
  { valor: '2.608 min', etiqueta: 'a mano: 652 productos × 4 min', tipo: 'estimado' },
];

describe('CaseResults', () => {
  it('muestra una tarjeta por métrica, con su número y su etiqueta', () => {
    mostrarConTema(<CaseResults resultados={metricas} />);
    const lista = screen.getByRole('list', { name: content.detalle.resultados });
    const tarjetas = within(lista).getAllByRole('listitem');
    expect(tarjetas).toHaveLength(2);
    expect(tarjetas[0]).toHaveTextContent('652');
    expect(tarjetas[0]).toHaveTextContent('productos cargados');
  });

  it('"Estimado" aparece solo en la métrica estimada', () => {
    mostrarConTema(<CaseResults resultados={metricas} />);
    const [medida, estimada] = screen.getAllByRole('listitem');
    expect(within(medida).queryByText(content.detalle.estimado)).toBeNull();
    expect(within(estimada).getByText(content.detalle.estimado)).toBeInTheDocument();
    expect(screen.getAllByText(content.detalle.estimado)).toHaveLength(1);
  });

  it('sin métricas no dibuja nada', () => {
    const { container, rerender } = mostrarConTema(<CaseResults resultados={[]} />);
    expect(container).toBeEmptyDOMElement();
    rerender(<CaseResults />);
    expect(container).toBeEmptyDOMElement();
  });

  it('con las 4 métricas reales del Caso A, solo la de 2.608 min es estimada', () => {
    mostrarConTema(<CaseResults resultados={getCaseBySlug('carga-masiva-productos')!.resultados} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(4);
    expect(screen.getAllByText(content.detalle.estimado)).toHaveLength(1);
  });
});
