import DiagramaVertical from './DiagramaVertical';
import type { PropsDiagrama } from './DiagramFrame';

// Diagrama de Dallas Note: Web → API → Base de datos → Avisos, con el lugar donde se despliega cada pieza.
export default function DallasNote({ arquitectura }: PropsDiagrama) {
  const { etiquetas: e } = arquitectura;
  return (
    <DiagramaVertical
      id="dallas-note"
      arquitectura={arquitectura}
      pasos={[
        { nombre: e.web, lineas: [e.webStack, e.webDespliegue] },
        { nombre: e.api, lineas: [e.apiStack, e.apiDespliegue] },
        { nombre: e.datos, lineas: [e.datosStack, e.datosDespliegue] },
        { nombre: e.avisos, lineas: [e.avisosDetalle] },
      ]}
    />
  );
}
