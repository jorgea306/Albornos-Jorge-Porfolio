import { screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { getCaseBySlug } from '../content';
import { mostrarConTema } from '../test/render';
import CargaMasiva from './CargaMasiva';

const arquitectura = getCaseBySlug('carga-masiva-productos')!.arquitectura!;

describe('CargaMasiva', () => {
  it('dibuja las 3 cajas en orden: Planilla, Script, Tienda online', () => {
    mostrarConTema(<CargaMasiva arquitectura={arquitectura} />);
    const cajas = within(screen.getByRole('list')).getAllByRole('listitem');
    expect(cajas).toHaveLength(3);
    expect(cajas[0]).toHaveTextContent('Planilla');
    expect(cajas[1]).toHaveTextContent('Script');
    expect(cajas[2]).toHaveTextContent('Tienda online');
  });

  it('el nombre accesible enumera "Planilla, Script, Tienda online"', () => {
    const { container } = mostrarConTema(<CargaMasiva arquitectura={arquitectura} />);
    const figura = container.querySelector<HTMLElement>('[data-diagrama="carga-masiva"]')!;
    expect(figura).toHaveAccessibleName(/Planilla, Script, Tienda online/);
  });

  it('no menciona proveedor, 11 columnas ni ZIP', () => {
    const { container } = mostrarConTema(<CargaMasiva arquitectura={arquitectura} />);
    expect(container.textContent).not.toMatch(/proveedor|11 columnas|zip/i);
  });

  it('el HTML contiene al menos un svg (las flechas), todas decorativas', () => {
    const { container } = mostrarConTema(<CargaMasiva arquitectura={arquitectura} />);
    const flechas = container.querySelectorAll('svg');
    expect(flechas.length).toBeGreaterThan(0);
    flechas.forEach((f) => expect(f).toHaveAttribute('aria-hidden', 'true'));
  });
});
