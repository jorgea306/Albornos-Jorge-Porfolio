import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { getCaseBySlug } from '../content';
import { mostrarConTema } from '../test/render';
import { diagramas } from './index';

// Los cuatro diagramas verticales comparten el contrato: figura con data-diagrama, SVG con role="img", title y desc,
// y los pasos en el orden del texto "03 · Cómo funciona".
const CASOS = [
  { slug: 'dallas-note', pasos: ['Web', 'API', 'Base de datos', 'Avisos'] },
  { slug: 'plataforma-agentes-ia', pasos: ['Usuario de una empresa', 'Backend NestJS', 'Motor de IA', 'Herramientas', 'Auditoría'] },
  { slug: 'api-usuarios-nestjs', pasos: ['Cliente', 'Validación', 'Servicio (MongoDB)', 'Swagger'] },
  { slug: 'carga-visitas-contactos', pasos: ['Usuario', 'API NestJS', 'Aislamiento', 'PostgreSQL'] },
];

describe.each(CASOS)('Diagrama de $slug', ({ slug, pasos }) => {
  const arquitectura = getCaseBySlug(slug)!.arquitectura!;
  const Diagrama = diagramas[arquitectura.diagrama];

  it('dibuja los pasos en orden, numerados, dentro de una figura con data-diagrama', () => {
    const { container } = mostrarConTema(<Diagrama arquitectura={arquitectura} />);
    const figura = container.querySelector(`figure[data-diagrama="${arquitectura.diagrama}"]`);
    expect(figura).not.toBeNull();
    const nombres = [...container.querySelectorAll('[data-paso]')].map((n) => n.textContent);
    expect(nombres).toEqual(pasos);
  });

  it('el SVG tiene role="img", title y desc, y su nombre accesible enumera los pasos en orden', () => {
    const { container } = mostrarConTema(<Diagrama arquitectura={arquitectura} />);
    const svg = screen.getByRole('img');
    expect(svg.querySelector('title')).toHaveTextContent(arquitectura.etiquetas.titulo);
    expect(svg.querySelector('desc')).toHaveTextContent(pasos.join(', '));
    expect(svg).toHaveAccessibleName(new RegExp(pasos.join(', ').replace(/[()]/g, '\\$&')));
    expect(container.querySelector('figcaption')).toHaveTextContent(arquitectura.descripcion);
  });

  it('las flechas son decorativas y hay una menos que pasos; sin colores fijos en el SVG', () => {
    const { container } = mostrarConTema(<Diagrama arquitectura={arquitectura} />);
    expect(container.querySelectorAll('svg g[aria-hidden="true"]')).toHaveLength(pasos.length - 1);
    expect(container.innerHTML).not.toMatch(/#[0-9a-f]{3,8}\b/i);
  });
});
