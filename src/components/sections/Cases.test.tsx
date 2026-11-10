import { screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { content } from '../../content';
import { mostrarConTema } from '../../test/render';
import Cases from './Cases';

const { casos } = content.inicio;
const titulo = (slug: string) => content.casos.find((c) => c.slug === slug)!.titulo;

// Orden que fija la spec (sec R5): destacado, Dallas Note, Plataforma y API; los "en desarrollo" van al Laboratorio.
const ORDEN_TARJETAS = ['dallas-note', 'plataforma-agentes-ia', 'api-usuarios-nestjs'];
const ORDEN_COMPLETO = ['carga-masiva-productos', ...ORDEN_TARJETAS];

describe('Cases', () => {
  it('muestra el encabezado de la sección', () => {
    mostrarConTema(<Cases />);
    expect(screen.getByText(casos.encabezado.etiqueta)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: casos.encabezado.titulo })).toBeInTheDocument();
  });

  it('muestra el destacado, 3 tarjetas con imagen y el Laboratorio', () => {
    const { container } = mostrarConTema(<Cases />);
    // 1 destacado + 3 tarjetas: los casos en desarrollo no son tarjetas.
    expect(screen.getAllByRole('article')).toHaveLength(4);
    expect(screen.getAllByText(casos.imagenPendiente)).toHaveLength(3);
    expect(container.querySelector('img')).toBeNull();
    expect(screen.getByRole('heading', { level: 3, name: casos.laboratorio.titulo })).toBeInTheDocument();
  });

  it('enlaza el destacado y cada tarjeta a /casos/<slug>', () => {
    mostrarConTema(<Cases />);
    expect(screen.getByRole('link', { name: casos.leerCompleto })).toHaveAttribute('href', '/casos/carga-masiva-productos');
    for (const slug of ORDEN_TARJETAS) {
      const enlace = screen.getByRole('link', { name: new RegExp(titulo(slug)) });
      expect(enlace).toHaveAttribute('href', `/casos/${slug}`);
    }
  });

  it('respeta el orden de content.casos: destacado, Dallas Note, Plataforma, API y Laboratorio', () => {
    expect(content.casos.slice(0, 4).map((c) => c.slug)).toEqual(ORDEN_COMPLETO);
    mostrarConTema(<Cases />);
    const titulos = screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent);
    expect(titulos).toEqual([...ORDEN_COMPLETO.map(titulo), casos.laboratorio.titulo]);
  });

  it('los casos en desarrollo solo aparecen en el Laboratorio, sin tarjeta ni imagen', () => {
    mostrarConTema(<Cases />);
    const enDesarrollo = content.casos.filter((c) => c.estado === 'en-desarrollo');
    expect(enDesarrollo).toHaveLength(3);
    for (const caso of enDesarrollo) {
      const enlace = screen.getByRole('link', { name: caso.titulo });
      expect(enlace.closest('article'), caso.slug).toBeNull();
    }
    expect(screen.getAllByText(casos.laboratorio.etiqueta)).toHaveLength(1);
  });

  it('las tarjetas muestran sus chips y el cierre "Ver caso"', () => {
    mostrarConTema(<Cases />);
    for (const slug of ORDEN_TARJETAS) {
      const caso = content.casos.find((c) => c.slug === slug)!;
      const tarjeta = screen.getByRole('link', { name: new RegExp(caso.titulo) });
      expect(within(tarjeta).getByText(casos.verCaso)).toBeInTheDocument();
      for (const chip of caso.chips!) expect(within(tarjeta).getByText(chip)).toBeInTheDocument();
    }
  });
});
