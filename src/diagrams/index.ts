import type { ComponentType } from 'react';
import type { DiagramId } from '../content.types';
import CargaMasiva from './CargaMasiva';
import type { PropsDiagrama } from './DiagramFrame';

// Mapa de identificador de diagrama a su componente. Los diagramas de los casos B, D y E se suman en el slice 8.
export const diagramas: Partial<Record<DiagramId, ComponentType<PropsDiagrama>>> = {
  'carga-masiva': CargaMasiva,
};
