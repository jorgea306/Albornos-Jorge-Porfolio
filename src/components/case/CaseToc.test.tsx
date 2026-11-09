import { act, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { content } from '../../content';
import { mostrarConTema } from '../../test/render';
import CaseToc from './CaseToc';

const secciones = Object.values(content.detalle.secciones);

// jsdom no trae IntersectionObserver: se reemplaza por uno que deja a la prueba disparar el aviso.
function simularObservador() {
  let aviso: IntersectionObserverCallback = () => {};
  const desconectar = vi.fn();
  vi.stubGlobal(
    'IntersectionObserver',
    class {
      constructor(callback: IntersectionObserverCallback) {
        aviso = callback;
      }
      observe() {}
      disconnect = desconectar;
    },
  );
  const ver = (id: string, visible = true) =>
    act(() => aviso([{ target: { id }, isIntersecting: visible } as unknown as IntersectionObserverEntry], {} as IntersectionObserver));
  return { ver, desconectar };
}

function enlaceActivo() {
  return screen.getAllByRole('link').find((a) => a.getAttribute('aria-current') === 'true');
}

afterEach(() => vi.unstubAllGlobals());

describe('CaseToc', () => {
  it('lista las 4 entradas numeradas, enlazadas a sus artículos, bajo el rótulo "En este caso"', () => {
    simularObservador();
    mostrarConTema(<CaseToc secciones={secciones} />);
    expect(screen.getByRole('navigation', { name: content.detalle.indice })).toBeInTheDocument();
    const enlaces = screen.getAllByRole('link');
    expect(enlaces).toHaveLength(4);
    enlaces.forEach((enlace, i) => {
      expect(enlace).toHaveAttribute('href', `#${secciones[i].id}`);
      expect(enlace).toHaveTextContent(`${String(i + 1).padStart(2, '0')}${secciones[i].titulo}`);
    });
  });

  it('arranca con la primera entrada activa y la marca con aria-current', () => {
    simularObservador();
    mostrarConTema(<CaseToc secciones={secciones} />);
    const actuales = screen.getAllByRole('link').filter((a) => a.getAttribute('aria-current') === 'true');
    expect(actuales).toHaveLength(1);
    expect(actuales[0]).toHaveAttribute('href', `#${secciones[0].id}`);
  });

  it('cuando otra sección entra en la franja de lectura, pasa a ser la activa', () => {
    const { ver } = simularObservador();
    mostrarConTema(<CaseToc secciones={secciones} />);
    ver(secciones[2].id);
    ver(secciones[0].id, false);
    expect(enlaceActivo()).toHaveAttribute('href', `#${secciones[2].id}`);
  });

  it('conserva la última activa si ninguna sección está visible y desconecta el observador al desmontar', () => {
    const { ver, desconectar } = simularObservador();
    const { unmount } = mostrarConTema(<CaseToc secciones={secciones} />);
    ver(secciones[1].id);
    ver(secciones[1].id, false);
    expect(enlaceActivo()).toHaveAttribute('href', `#${secciones[1].id}`);
    unmount();
    expect(desconectar).toHaveBeenCalled();
  });

  it('sin IntersectionObserver igual muestra los enlaces y deja activa la primera', () => {
    vi.stubGlobal('IntersectionObserver', undefined);
    mostrarConTema(<CaseToc secciones={secciones} />);
    expect(screen.getAllByRole('link')).toHaveLength(4);
    expect(enlaceActivo()).toHaveAttribute('href', `#${secciones[0].id}`);
  });
});
