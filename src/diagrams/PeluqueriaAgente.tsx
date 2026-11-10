import DiagramaVertical from './DiagramaVertical';
import type { PropsDiagrama } from './DiagramFrame';

// Diagrama del sistema para peluquerías: Cliente → Backend → Agente de IA → Local.
export default function PeluqueriaAgente({ arquitectura }: PropsDiagrama) {
  const { etiquetas: e } = arquitectura;
  return (
    <DiagramaVertical
      id="peluqueria-agente"
      arquitectura={arquitectura}
      pasos={[
        { nombre: e.cliente, lineas: [e.clienteDetalle1, e.clienteDetalle2] },
        { nombre: e.backend, lineas: [e.backendDetalle1, e.backendDetalle2] },
        { nombre: e.agente, lineas: [e.agenteDetalle1, e.agenteDetalle2] },
        { nombre: e.local, lineas: [e.localDetalle1, e.localDetalle2] },
      ]}
    />
  );
}
