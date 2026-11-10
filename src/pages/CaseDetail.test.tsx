import { cleanup, screen, within } from '@testing-library/react';
import type { ComponentProps } from 'react';
import { describe, expect, it } from 'vitest';
import { content, getCaseBySlug } from '../content';
import { mostrarConTema } from '../test/render';
import CaseDetail, { meta } from './CaseDetail';

const { secciones } = content.detalle;
const casoA = content.casos[0];

function mostrarCaso(slug: string) {
  const props = { params: { slug } } as ComponentProps<typeof CaseDetail>;
  return mostrarConTema(<CaseDetail {...props} />, `/casos/${slug}`);
}

describe('CaseDetail: Caso A (plantilla completa)', () => {
  it('muestra los bloques en orden: migas, h1, imagen, resultados, artículos 01 a 04, siguiente caso y tarjeta final', () => {
    const { container } = mostrarCaso(casoA.slug);
    const orden = [
      screen.getByRole('navigation', { name: content.navegacion.migas.etiqueta }),
      screen.getByRole('heading', { level: 1 }),
      screen.getByText(content.detalle.medioPendiente),
      screen.getByRole('list', { name: content.detalle.resultados }),
      ...Object.values(secciones).map((s) => container.querySelector(`#${s.id}`)!),
      screen.getByRole('link', { name: new RegExp(content.detalle.siguiente) }),
      screen.getByRole('link', { name: content.detalle.cta.accion }),
    ];
    for (let i = 1; i < orden.length; i++) {
      const sigue = orden[i - 1].compareDocumentPosition(orden[i]) & Node.DOCUMENT_POSITION_FOLLOWING;
      expect(sigue, `bloque ${i}`).toBeTruthy();
    }
  });

  it('el h1 es el título largo y las migas llevan a /#casos con el título sin enlace', () => {
    mostrarCaso(casoA.slug);
    expect(screen.getByRole('heading', { level: 1, name: casoA.tituloLargo })).toBeInTheDocument();
    const migas = screen.getByRole('navigation', { name: content.navegacion.migas.etiqueta });
    expect(within(migas).getByRole('link', { name: content.navegacion.migas.casos })).toHaveAttribute('href', '/#casos');
    expect(within(migas).getByText(casoA.titulo)).toHaveAttribute('aria-current', 'page');
  });

  it('la imagen principal pendiente aparece como recuadro rotulado entre el encabezado y los artículos', () => {
    const { container } = mostrarCaso(casoA.slug);
    const recuadro = screen.getByText(content.detalle.medioPendiente);
    const h1 = screen.getByRole('heading', { level: 1 });
    const primerArticulo = container.querySelector(`#${secciones.problema.id}`)!;
    expect(h1.compareDocumentPosition(recuadro) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(recuadro.compareDocumentPosition(primerArticulo) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(container.querySelector('img')).toBeNull();
  });

  it('el índice "En este caso" va antes de los artículos y enlaza a los 4', () => {
    const { container } = mostrarCaso(casoA.slug);
    const indice = screen.getByRole('navigation', { name: content.detalle.indice });
    const primerArticulo = container.querySelector(`#${secciones.problema.id}`)!;
    expect(indice.compareDocumentPosition(primerArticulo) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    const hrefs = within(indice).getAllByRole('link').map((a) => a.getAttribute('href'));
    expect(hrefs).toEqual(Object.values(secciones).map((s) => `#${s.id}`));
  });

  it('muestra las 4 tarjetas de resultado y la tarjeta final lleva a /#contacto', () => {
    mostrarCaso(casoA.slug);
    const resultados = screen.getByRole('list', { name: content.detalle.resultados });
    expect(within(resultados).getAllByRole('listitem')).toHaveLength(4);
    expect(screen.getByText(content.detalle.cta.pregunta)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: content.detalle.cta.accion })).toHaveAttribute('href', '/#contacto');
  });

  it('cierra con la tarjeta de Siguiente caso después del último artículo', () => {
    const { container } = mostrarCaso(casoA.slug);
    const siguiente = screen.getByRole('link', { name: new RegExp(content.detalle.siguiente) });
    expect(siguiente).toHaveAttribute('href', '/casos/dallas-note');
    const ultimo = container.querySelector(`#${secciones.aprendizajes.id}`)!;
    expect(ultimo.compareDocumentPosition(siguiente) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('los h2 son solo los 4 artículos, sin Decisiones, Tecnologías ni Arquitectura', () => {
    mostrarCaso(casoA.slug);
    const titulos = screen.getAllByRole('heading', { level: 2 }).map((h) => h.textContent);
    expect(titulos).toEqual(Object.values(secciones).map((s) => s.titulo));
    for (const prohibido of ['Decisiones', 'Tecnologías', 'Arquitectura']) {
      expect(screen.queryByRole('heading', { level: 2, name: prohibido })).toBeNull();
    }
  });

  it('muestra los 4 metadatos, al menos 2 aprendizajes, el terminal y el diagrama de 3 cajas', () => {
    const { container } = mostrarCaso(casoA.slug);
    for (const rotulo of Object.values(content.detalle.metadatos)) expect(screen.getByText(rotulo)).toBeInTheDocument();
    const aprendizajes = container.querySelector<HTMLElement>(`#${secciones.aprendizajes.id}`)!;
    expect(within(aprendizajes).getAllByRole('listitem').length).toBeGreaterThanOrEqual(2);
    expect(container.querySelector(`#${secciones.solucion.id}`)).toHaveTextContent('node cargar-productos.js planilla.xlsx');
    const diagrama = container.querySelector<HTMLElement>('[data-diagrama="carga-masiva"]')!;
    expect(diagrama).not.toBeNull();
    expect(diagrama.querySelectorAll('svg').length).toBeGreaterThan(0);
    expect(diagrama).toHaveAccessibleName(/Planilla, Script, Tienda online/);
    expect(diagrama.textContent).not.toMatch(/proveedor|11 columnas|zip/i);
    expect(container.querySelector('[data-variante="completa"]')).not.toBeNull();
  });

  it('solo hay un ejemplo ilustrativo rotulado; no hay pre ni code, "Ver código" ni enlace a repositorios', () => {
    const { container } = mostrarCaso(casoA.slug);
    expect(container.querySelectorAll('pre, code')).toHaveLength(0);
    expect(screen.queryByText(/ver código/i)).toBeNull();
    expect(screen.getAllByText(content.interfaz.ejemploIlustrativo)).toHaveLength(1);
    const repos = screen.queryAllByRole('link').filter((a) => /github\.com/.test(a.getAttribute('href') ?? ''));
    expect(repos).toHaveLength(0);
  });
});

describe('CaseDetail: variante corta y slug desconocido', () => {
  it('el caso corto muestra título, estado y El problema, sin diagrama ni artículos de la solución', () => {
    const corto = content.casos.find((c) => c.variante === 'corta')!;
    const { container } = mostrarCaso(corto.slug);
    expect(screen.getByRole('heading', { level: 1, name: corto.tituloLargo })).toBeInTheDocument();
    expect(screen.getByText(corto.metadatos.estado)).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { level: 2 }).map((h) => h.textContent)).toEqual([secciones.problema.titulo]);
    expect(container.querySelector('[data-diagrama]')).toBeNull();
    expect(screen.queryByRole('navigation', { name: content.detalle.indice })).toBeNull();
    expect(screen.queryByText(content.detalle.siguiente)).toBeNull();
    expect(screen.queryByRole('list', { name: content.detalle.resultados })).toBeNull();
    // La tarjeta final es igual que en los casos completos.
    expect(screen.getByText(content.detalle.cta.pregunta)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: content.detalle.cta.accion })).toHaveAttribute('href', '/#contacto');
    expect(container.querySelector('[data-variante="corta"]')).not.toBeNull();
  });

  it('un slug desconocido muestra la 404 con enlace a /', () => {
    mostrarCaso('no-existe');
    expect(screen.getByRole('heading', { level: 1, name: content.noEncontrado.titulo })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: content.noEncontrado.enlace })).toHaveAttribute('href', '/');
  });
});

describe('CaseDetail: los 5 casos completos y los 2 cortos', () => {
  const completos = content.casos.filter((c) => c.variante === 'completa');
  const cortos = content.casos.filter((c) => c.variante === 'corta');

  it.each(completos.map((c) => c.slug))('%s muestra su diagrama dentro de "Cómo funciona", con nombre accesible', (slug) => {
    const caso = getCaseBySlug(slug)!;
    const { container } = mostrarCaso(slug);
    const articulo = container.querySelector<HTMLElement>(`#${secciones.funciona.id}`)!;
    const diagrama = articulo.querySelector<HTMLElement>(`[data-diagrama="${caso.arquitectura!.diagrama}"]`)!;
    expect(diagrama).not.toBeNull();
    expect(diagrama.querySelector('svg')).not.toBeNull();
    expect(diagrama).toHaveAccessibleName(caso.arquitectura!.descripcion);
    expect(within(container.querySelector<HTMLElement>(`#${secciones.aprendizajes.id}`)!).getAllByRole('listitem').length).toBeGreaterThanOrEqual(2);
  });

  it('la Plataforma no muestra la fila de tarjetas de resultado; Dallas Note y la API sí', () => {
    mostrarCaso('plataforma-agentes-ia');
    expect(screen.queryByRole('list', { name: content.detalle.resultados })).toBeNull();
    cleanup();
    mostrarCaso('dallas-note');
    expect(within(screen.getByRole('list', { name: content.detalle.resultados })).getAllByRole('listitem')).toHaveLength(3);
    cleanup();
    mostrarCaso('api-usuarios-nestjs');
    expect(within(screen.getByRole('list', { name: content.detalle.resultados })).getAllByRole('listitem')).toHaveLength(1);
  });

  it('Siguiente caso recorre A → Dallas → Plataforma → API → Carga de visitas → A', () => {
    for (const [i, caso] of completos.entries()) {
      mostrarCaso(caso.slug);
      const destino = completos[(i + 1) % completos.length].slug;
      expect(screen.getByRole('link', { name: new RegExp(content.detalle.siguiente) })).toHaveAttribute('href', `/casos/${destino}`);
      cleanup();
    }
  });

  it.each(cortos.map((c) => c.slug))('%s no tiene índice, diagrama, aprendizajes ni Siguiente caso, y sí la tarjeta "Hablemos"', (slug) => {
    const { container } = mostrarCaso(slug);
    expect(container.querySelector('[data-diagrama]')).toBeNull();
    expect(screen.queryByRole('navigation', { name: content.detalle.indice })).toBeNull();
    expect(screen.queryByRole('heading', { level: 2, name: secciones.aprendizajes.titulo })).toBeNull();
    expect(screen.queryByText(content.detalle.siguiente)).toBeNull();
    expect(screen.getByRole('link', { name: content.detalle.cta.accion })).toHaveAttribute('href', '/#contacto');
  });

  it('la barra de migas es igual en un caso corto y en uno completo', () => {
    const forma = (slug: string) => {
      mostrarCaso(slug);
      const migas = screen.getByRole('navigation', { name: content.navegacion.migas.etiqueta });
      const resultado = [within(migas).getByRole('link').getAttribute('href'), within(migas).getByText(getCaseBySlug(slug)!.titulo).getAttribute('aria-current')];
      cleanup();
      return resultado;
    };
    expect(forma(cortos[0].slug)).toEqual(forma(completos[0].slug));
  });

  it('los 7 casos tienen h1 y título de la pestaña distintos', () => {
    const h1 = content.casos.map((caso) => {
      mostrarCaso(caso.slug);
      const texto = screen.getByRole('heading', { level: 1 }).textContent;
      cleanup();
      return texto;
    });
    expect(new Set(h1).size).toBe(7);
    const titulos = content.casos.map((caso) => {
      const entradas = meta({ params: { slug: caso.slug } } as never) as { title?: string }[];
      return entradas.find((entrada) => entrada.title)?.title;
    });
    expect(titulos.every(Boolean)).toBe(true);
    expect(new Set(titulos).size).toBe(7);
  });
});
