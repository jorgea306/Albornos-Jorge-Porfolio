import DiagramaVertical from './DiagramaVertical';
import type { PropsDiagrama } from './DiagramFrame';

// Diagrama del agente de WhatsApp para ferretería: Cliente → Agente → Herramientas → Respuesta.
export default function AgenteWhatsApp({ arquitectura }: PropsDiagrama) {
  const { etiquetas: e } = arquitectura;
  return (
    <DiagramaVertical
      id="agente-whatsapp"
      arquitectura={arquitectura}
      pasos={[
        { nombre: e.cliente, lineas: [e.clienteDetalle] },
        { nombre: e.agente, lineas: [e.agenteDetalle1, e.agenteDetalle2] },
        { nombre: e.herramientas, lineas: [e.herramientasDetalle] },
        { nombre: e.respuesta, lineas: [e.respuestaDetalle1, e.respuestaDetalle2] },
      ]}
    />
  );
}
