import { screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { content } from '../../content';
import { mostrarConTema } from '../../test/render';
import Hero from './Hero';
import Services from './Services';
import Stack from './Stack';

const { hero, servicios, stack } = content.inicio;

const tituloCompleto = `${hero.titulo.antes}${hero.titulo.resaltado}${hero.titulo.despues}`;

describe('Hero', () => {
  it('muestra el h1 completo (con el resaltado dentro) y los botones llevan a Casos y Contacto', () => {
    mostrarConTema(<Hero />);
    const h1 = screen.getByRole('heading', { level: 1, name: tituloCompleto });
    expect(within(h1).getByText(hero.titulo.resaltado).tagName).toBe('MARK');
    expect(screen.getByRole('link', { name: hero.principal.texto })).toHaveAttribute('href', '#casos');
    expect(screen.getByRole('link', { name: hero.secundario.texto })).toHaveAttribute('href', '#contacto');
  });

  it('muestra la etiqueta, la descripción y la consola con su rótulo', () => {
    mostrarConTema(<Hero />);
    expect(screen.getByText(hero.etiqueta)).toBeInTheDocument();
    expect(screen.getByText(hero.descripcion)).toBeInTheDocument();
    expect(screen.getByRole('figure')).toHaveTextContent(content.interfaz.ejemploIlustrativo);
    expect(screen.getAllByRole('listitem')).toHaveLength(hero.consola.lineas.length);
  });
});

describe('Services', () => {
  it('muestra el encabezado y exactamente 4 tarjetas con ícono oculto y etiquetas', () => {
    const { container } = mostrarConTema(<Services />);
    const { encabezado } = servicios;
    expect(screen.getByText(encabezado.etiqueta)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: encabezado.titulo })).toBeInTheDocument();
    expect(screen.getByText(encabezado.bajada!)).toBeInTheDocument();
    expect(screen.getAllByRole('article')).toHaveLength(4);
    for (const servicio of servicios.items) {
      expect(screen.getByRole('heading', { level: 3, name: servicio.titulo })).toBeInTheDocument();
      for (const etiqueta of servicio.etiquetas) expect(screen.getAllByText(etiqueta).length).toBeGreaterThan(0);
    }
    const iconos = container.querySelectorAll('svg');
    expect(iconos).toHaveLength(4);
    for (const icono of iconos) expect(icono).toHaveAttribute('aria-hidden', 'true');
  });
});

describe('Stack', () => {
  it('muestra cada grupo con sus tecnologias', () => {
    mostrarConTema(<Stack />);
    for (const grupo of stack.grupos) {
      expect(screen.getByRole('heading', { level: 3, name: grupo.titulo })).toBeInTheDocument();
    }
    expect(screen.getAllByRole('listitem')).toHaveLength(stack.grupos.flatMap((g) => g.tecnologias).length);
  });
});
