import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { content } from '../../content';
import type { Medio } from '../../content.types';
import { mostrarConTema } from '../../test/render';
import CaseMedia from './CaseMedia';

const imagen: Medio = { tipo: 'imagen', archivo: 'principal.webp', alt: 'Vista del caso', ancho: 1200, alto: 480, pendiente: false };
const video: Medio = {
  tipo: 'video',
  archivo: 'demo.mp4',
  poster: 'demo-poster.webp',
  alt: 'Demostración del caso',
  ancho: 1280,
  alto: 720,
  pendiente: false,
};

describe('CaseMedia', () => {
  it('imagen pendiente: muestra el recuadro rotulado y no una imagen rota', () => {
    const { container } = mostrarConTema(<CaseMedia slug="x" medios={[{ ...imagen, pendiente: true }]} />);
    expect(screen.getByText(content.detalle.medioPendiente)).toBeInTheDocument();
    expect(container.querySelector('img')).toBeNull();
  });

  it('imagen lista: declara ancho y alto (1200×480) y apunta a public/casos/<slug>/', () => {
    mostrarConTema(<CaseMedia slug="x" medios={[imagen]} />);
    const img = screen.getByRole('img', { name: imagen.alt });
    expect(img).toHaveAttribute('src', '/casos/x/principal.webp');
    expect(img).toHaveAttribute('width', '1200');
    expect(img).toHaveAttribute('height', '480');
  });

  it('video listo: preload="none" y póster', () => {
    const { container } = mostrarConTema(<CaseMedia slug="x" medios={[video]} />);
    const elemento = container.querySelector('video')!;
    expect(elemento).toHaveAttribute('preload', 'none');
    expect(elemento).toHaveAttribute('poster', '/casos/x/demo-poster.webp');
    expect(elemento.querySelector('source')).toHaveAttribute('src', '/casos/x/demo.mp4');
  });

  it('video pendiente: recuadro rotulado, sin etiqueta video', () => {
    const { container } = mostrarConTema(<CaseMedia slug="x" medios={[{ ...video, pendiente: true }]} />);
    expect(screen.getByText(content.detalle.medioPendiente)).toBeInTheDocument();
    expect(container.querySelector('video')).toBeNull();
  });

  it('sin medios no dibuja nada', () => {
    const { container } = mostrarConTema(<CaseMedia slug="x" medios={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
