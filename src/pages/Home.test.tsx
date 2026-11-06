import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { mostrarConTema } from '../test/render';
import Home from './Home';

describe('Home', () => {
  it('muestra las 6 anclas en el orden de la spec (Hero, Servicios, Casos, Proceso, Sobre mí, Contacto)', () => {
    const { container } = mostrarConTema(<Home />);
    const anclas = [...container.querySelectorAll('section[id]')].map((s) => s.id);
    expect(anclas).toEqual(['inicio', 'servicios', 'casos', 'proceso', 'sobre-mi', 'contacto']);
  });

  it('el Hero abre la página: hay un solo h1 y está antes que las demás secciones', () => {
    const { container } = mostrarConTema(<Home />);
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    const primeraSeccion = container.firstElementChild;
    expect(primeraSeccion?.querySelector('h1')).not.toBeNull();
  });

  it('cada sección tiene un h2 y el Stack no suma uno propio', () => {
    mostrarConTema(<Home />);
    const titulos = screen.getAllByRole('heading', { level: 2 }).map((h) => h.textContent);
    expect(titulos).toEqual([
      'Qué puedo resolver para vos',
      'Problema, solución, resultado',
      'De la charla al sistema funcionando',
      'Jorge Albornos',
      '¿Qué tarea te gustaría no volver a hacer a mano?',
    ]);
  });

  it('el Stack está dentro de #sobre-mi', () => {
    const { container } = mostrarConTema(<Home />);
    const sobreMi = container.querySelector('#sobre-mi');
    expect(sobreMi?.querySelectorAll('dt')).toHaveLength(5);
    const filas = [...(sobreMi?.querySelectorAll('dt') ?? [])].map((dt) => dt.textContent);
    expect(filas).toEqual(['Backend', 'IA', 'Frontend', 'Datos', 'Cloud']);
  });
});
