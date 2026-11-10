import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { Caso } from '../../content.types';
import { content } from '../../content';
import { mostrarConTema } from '../../test/render';
import Lab from './Lab';

const { laboratorio } = content.inicio.casos;
const enDesarrollo = content.casos.filter((c) => c.estado === 'en-desarrollo');

describe('Lab', () => {
  it('muestra la etiqueta y un enlace a cada caso en desarrollo', () => {
    mostrarConTema(<Lab casos={enDesarrollo} />);
    expect(screen.getByText(laboratorio.etiqueta)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Agente de WhatsApp para ferretería' })).toHaveAttribute(
      'href',
      '/casos/agente-whatsapp-ferreteria',
    );
    expect(screen.getByRole('link', { name: 'Agente de IA para peluquería' })).toHaveAttribute(
      'href',
      '/casos/peluqueria-agente-ia',
    );
  });

  it('no usa tarjetas ni imágenes', () => {
    const { container } = mostrarConTema(<Lab casos={enDesarrollo} />);
    expect(screen.queryAllByRole('article')).toHaveLength(0);
    expect(container.querySelector('img')).toBeNull();
  });

  it('sin casos en desarrollo no dibuja nada', () => {
    const { container } = mostrarConTema(<Lab casos={[] as Caso[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
