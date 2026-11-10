import type { ComponentType } from 'react';
import type { DiagramId } from '../content.types';
import AgenteWhatsApp from './AgenteWhatsApp';
import AgentesMultiempresa from './AgentesMultiempresa';
import ApiUsuarios from './ApiUsuarios';
import CargaMasiva from './CargaMasiva';
import CargaVisitas from './CargaVisitas';
import DallasNote from './DallasNote';
import type { PropsDiagrama } from './DiagramFrame';
import PeluqueriaAgente from './PeluqueriaAgente';

// Mapa de identificador de diagrama a su componente: uno por cada caso completo.
export const diagramas: Record<DiagramId, ComponentType<PropsDiagrama>> = {
  'carga-masiva': CargaMasiva,
  'agentes-multiempresa': AgentesMultiempresa,
  'dallas-note': DallasNote,
  'api-usuarios': ApiUsuarios,
  'carga-visitas': CargaVisitas,
  'agente-whatsapp': AgenteWhatsApp,
  'peluqueria-agente': PeluqueriaAgente,
};
