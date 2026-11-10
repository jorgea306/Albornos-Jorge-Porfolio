import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { content } from '../../content';
import { mostrarConTema } from '../../test/render';
import SiteHeader from './SiteHeader';

const { navegacion, sitio } = content;

// jsdom no trae matchMedia y ThemeToggle (dentro de la barra) lo necesita.
beforeEach(() => {
  vi.stubGlobal('matchMedia', (consulta: string) => ({
    matches: false,
    media: consulta,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
    onchange: null,
  }));
});

// jsdom no evalúa media queries: los enlaces de escritorio quedan con display none por defecto, por eso `hidden: true`.
const enlace = (nombre: string) => screen.getByRole('link', { name: nombre, hidden: true });

describe('SiteHeader en el Inicio', () => {
  it('enlaza cada sección y "Hablemos" a su ancla con /#ancla', () => {
    mostrarConTema(<SiteHeader />, '/');
    for (const { texto, ancla } of navegacion.enlaces) {
      expect(enlace(texto)).toHaveAttribute('href', `/#${ancla}`);
    }
    expect(enlace(navegacion.hablemos)).toHaveAttribute('href', '/#contacto');
  });

  it('muestra el logo con el nombre accesible y el botón de tema', () => {
    mostrarConTema(<SiteHeader />, '/');
    expect(screen.getByRole('link', { name: navegacion.irAlInicio })).toHaveAttribute('href', '/');
    expect(screen.getByText(sitio.nombre)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: content.interfaz.cambiarTema })).toBeInTheDocument();
  });

  it('el menú móvil abre con aria-expanded, cierra con Escape y devuelve el foco al botón', async () => {
    const usuario = userEvent.setup();
    mostrarConTema(<SiteHeader />, '/');
    const boton = screen.getByRole('button', { name: navegacion.abrirMenu });
    expect(boton).toHaveAttribute('aria-expanded', 'false');

    await usuario.click(boton);
    expect(boton).toHaveAttribute('aria-expanded', 'true');
    const menu = await screen.findByRole('menu');
    expect(within(menu).getAllByRole('menuitem')).toHaveLength(navegacion.enlaces.length);

    await usuario.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());
    expect(boton).toHaveFocus();
    expect(boton).toHaveAttribute('aria-expanded', 'false');
  });

  it('el menú cierra al elegir un enlace', async () => {
    const usuario = userEvent.setup();
    mostrarConTema(<SiteHeader />, '/');
    await usuario.click(screen.getByRole('button', { name: navegacion.abrirMenu }));
    const menu = await screen.findByRole('menu');
    expect(within(menu).getByRole('menuitem', { name: navegacion.enlaces[1].texto })).toHaveAttribute(
      'href',
      `/#${navegacion.enlaces[1].ancla}`,
    );
    await usuario.click(within(menu).getByRole('menuitem', { name: navegacion.enlaces[1].texto }));
    await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());
  });
});

describe('SiteHeader en otras rutas', () => {
  it('en el detalle de un caso muestra logo, "← Todos los casos" a /#casos y el botón de tema', () => {
    const slug = content.casos[0].slug;
    mostrarConTema(<SiteHeader />, `/casos/${slug}`);
    expect(enlace(navegacion.todosLosCasos)).toHaveAttribute('href', '/#casos');
    expect(screen.getByRole('link', { name: navegacion.irAlInicio })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: content.interfaz.cambiarTema })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: navegacion.abrirMenu })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: navegacion.hablemos, hidden: true })).not.toBeInTheDocument();
  });

  it('en una ruta desconocida muestra solo logo y botón de tema', () => {
    mostrarConTema(<SiteHeader />, '/cualquier-cosa');
    expect(screen.getByRole('link', { name: navegacion.irAlInicio })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: content.interfaz.cambiarTema })).toBeInTheDocument();
    expect(screen.getAllByRole('link', { hidden: true })).toHaveLength(1);
  });

  it('un slug inexistente bajo /casos/ usa la variante del Inicio (decisión provisoria D6)', () => {
    mostrarConTema(<SiteHeader />, '/casos/no-existe');
    expect(enlace(navegacion.hablemos)).toHaveAttribute('href', '/#contacto');
    expect(enlace(navegacion.enlaces[0].texto)).toHaveAttribute('href', `/#${navegacion.enlaces[0].ancla}`);
  });
});
