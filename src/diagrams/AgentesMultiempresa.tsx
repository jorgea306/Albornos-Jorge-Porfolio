import DiagramaVertical from './DiagramaVertical';
import type { PropsDiagrama } from './DiagramFrame';

// Diagrama genérico de la plataforma multiempresa: Usuario → Backend → Motor de IA → Herramientas → Auditoría.
// No lleva nombres ni datos de clientes: solo el recorrido de una consulta.
export default function AgentesMultiempresa({ arquitectura }: PropsDiagrama) {
  const { etiquetas: e } = arquitectura;
  return (
    <DiagramaVertical
      id="agentes-multiempresa"
      arquitectura={arquitectura}
      pasos={[
        { nombre: e.usuario, lineas: [e.usuarioDetalle] },
        { nombre: e.backend, lineas: [e.backendDetalle1, e.backendDetalle2, e.backendDetalle3] },
        { nombre: e.motor, lineas: [e.motorDetalle1, e.motorDetalle2] },
        { nombre: e.herramientas, lineas: [e.herramientasDetalle1, e.herramientasDetalle2] },
        { nombre: e.auditoria, lineas: [e.auditoriaDetalle] },
      ]}
    />
  );
}
