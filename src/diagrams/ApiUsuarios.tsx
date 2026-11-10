import DiagramaVertical from './DiagramaVertical';
import type { PropsDiagrama } from './DiagramFrame';

// Diagrama de la API de usuarios: Cliente → Validación → Servicio (MongoDB) → Swagger.
export default function ApiUsuarios({ arquitectura }: PropsDiagrama) {
  const { etiquetas: e } = arquitectura;
  return (
    <DiagramaVertical
      id="api-usuarios"
      arquitectura={arquitectura}
      pasos={[
        { nombre: e.cliente, lineas: [e.clienteDetalle1, e.clienteDetalle2] },
        { nombre: e.validacion, lineas: [e.validacionDetalle] },
        { nombre: e.servicio, lineas: [e.servicioDetalle1, e.servicioDetalle2] },
        { nombre: e.swagger, lineas: [e.swaggerDetalle1, e.swaggerDetalle2] },
      ]}
    />
  );
}
