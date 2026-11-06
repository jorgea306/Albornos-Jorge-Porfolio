import { screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { content } from '../../content';
import { mostrarConTema } from '../../test/render';
import Process from './Process';

const { proceso } = content.inicio;

describe('Process', () => {
  it('muestra el encabezado y 4 pasos en una lista ordenada', () => {
    mostrarConTema(<Process />);
    expect(screen.getByText('03 / CÓMO TRABAJO')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'De la charla al sistema funcionando' })).toBeInTheDocument();
    const lista = screen.getByRole('list');
    expect(lista.tagName).toBe('OL');
    const pasos = within(lista).getAllByRole('listitem');
    expect(pasos).toHaveLength(4);
    expect(pasos.map((paso) => within(paso).getByRole('heading', { level: 3 }).textContent)).toEqual([
      'Diagnóstico',
      'Prototipo',
      'Implementación',
      'Acompañamiento',
    ]);
  });

  it('numera cada paso según su posición y oculta el número al lector de pantalla', () => {
    const { container } = mostrarConTema(<Process />);
    const numeros = [...container.querySelectorAll('[aria-hidden="true"]')];
    expect(numeros.map((n) => n.textContent)).toEqual(['01', '02', '03', '04']);
    expect(proceso.pasos).toHaveLength(4);
  });
});
