import DiagramaVertical from './DiagramaVertical';
import type { PropsDiagrama } from './DiagramFrame';

// Diagrama de la carga de visitas y contactos: Usuario → API NestJS → Aislamiento → PostgreSQL.
export default function CargaVisitas({ arquitectura }: PropsDiagrama) {
  const { etiquetas: e } = arquitectura;
  return (
    <DiagramaVertical
      id="carga-visitas"
      arquitectura={arquitectura}
      pasos={[
        { nombre: e.usuario, lineas: [e.usuarioDetalle1, e.usuarioDetalle2] },
        { nombre: e.api, lineas: [e.apiDetalle] },
        { nombre: e.aislamiento, lineas: [e.aislamientoDetalle1, e.aislamientoDetalle2, e.aislamientoDetalle3] },
        { nombre: e.datos, lineas: [e.datosDetalle] },
      ]}
    />
  );
}
