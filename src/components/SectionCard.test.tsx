import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { mostrarConTema } from '../test/render';
import SectionCard from './SectionCard';

// Textos de prueba ficticios: la tarjeta no depende de content.ts.
const base = { titulo: 'Titulo de prueba', descripcion: 'Descripcion de prueba' };

describe('SectionCard', () => {
  it('muestra titulo y descripcion sin enlace por defecto', () => {
    mostrarConTema(<SectionCard {...base} />);
    expect(screen.getByRole('heading', { level: 3, name: base.titulo })).toBeInTheDocument();
    expect(screen.getByText(base.descripcion)).toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('con `to` toda la tarjeta es un enlace a esa ruta', () => {
    mostrarConTema(<SectionCard {...base} to="/casos/ejemplo" accion="Ver mas" />);
    const enlace = screen.getByRole('link');
    expect(enlace).toHaveAttribute('href', '/casos/ejemplo');
    expect(enlace).toHaveTextContent('Ver mas');
  });

  it('muestra la etiqueta cuando se indica', () => {
    mostrarConTema(<SectionCard {...base} etiqueta="Etiqueta de prueba" />);
    expect(screen.getByText('Etiqueta de prueba')).toBeInTheDocument();
  });

  describe('medio', () => {
    const medio = { src: '/casos/ejemplo/tarjeta.webp', alt: 'Captura de ejemplo', ancho: 800, alto: 450, textoPendiente: 'Falta la captura' };

    it('con el archivo disponible muestra la imagen con ancho y alto declarados', () => {
      const { container } = mostrarConTema(<SectionCard {...base} medio={{ ...medio, pendiente: false }} />);
      const imagen = screen.getByRole('img', { name: medio.alt });
      expect(imagen).toHaveAttribute('src', medio.src);
      expect(imagen).toHaveAttribute('width', '800');
      expect(imagen).toHaveAttribute('height', '450');
      expect(container).not.toHaveTextContent(medio.textoPendiente);
    });

    it('con el archivo pendiente muestra un recuadro rotulado y ninguna imagen rota', () => {
      const { container } = mostrarConTema(<SectionCard {...base} medio={{ ...medio, pendiente: true }} />);
      expect(screen.getByText(medio.textoPendiente)).toBeInTheDocument();
      expect(container.querySelector('img')).toBeNull();
    });

    it('sin medio no reserva espacio de imagen', () => {
      const { container } = mostrarConTema(<SectionCard {...base} />);
      expect(container.querySelector('img')).toBeNull();
    });
  });

  it('muestra el ícono y las etiquetas cuando se indican', () => {
    mostrarConTema(<SectionCard {...base} icono={<svg aria-hidden="true" data-testid="icono" />} etiquetas={['Uno', 'Dos']} />);
    expect(screen.getByTestId('icono')).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getAllByRole('listitem').map((li) => li.textContent)).toEqual(['Uno', 'Dos']);
  });
});
