import Box from '@mui/material/Box';
import { useId } from 'react';
import type { DiagramId } from '../content.types';
import DiagramFrame, { type PropsDiagrama } from './DiagramFrame';

export interface Paso {
  nombre: string;
  // Una línea de detalle por elemento: el SVG no parte el texto solo, así que cada línea ya viene corta.
  lineas: string[];
}

interface Props extends PropsDiagrama {
  id: DiagramId;
  pasos: Paso[];
}

// Medidas en unidades del viewBox. Con 340 de ancho el SVG se ve casi a tamaño real en 390 px.
const ANCHO = 340;
const X_CAJA = 12;
const ANCHO_CAJA = ANCHO - 2 * X_CAJA;
const ALTO_FLECHA = 30;
const CENTRO_FLECHA = ANCHO / 2;
// Colores por variable CSS del tema: cambian solos al alternar claro y oscuro y no repiten hexadecimales.
const TEXTO = 'var(--mui-palette-text-primary)';
const TEXTO_2 = 'var(--mui-palette-text-secondary)';
const FONDO = 'var(--mui-palette-background-default)';

const altoCaja = (paso: Paso) => 45 + 19 * paso.lineas.length;

// Diagrama vertical de pasos: cada paso es una caja numerada con su detalle y una flecha con punta hacia el siguiente.
// Va hacia abajo en cualquier ancho, así el texto nunca se achica de más a 390 px. El orden se entiende por el número,
// por la posición y por la flecha, no por el color. Usan este componente los diagramas de Dallas Note, la plataforma y la API.
export default function DiagramaVertical({ id, arquitectura, pasos }: Props) {
  const idTitulo = useId();
  const idDescripcion = useId();
  const alto = pasos.reduce((suma, paso) => suma + altoCaja(paso), 0) + ALTO_FLECHA * (pasos.length - 1) + 4;
  let y = 2;

  return (
    <DiagramFrame id={id} leyenda={arquitectura.descripcion}>
      <Box
        component="svg"
        role="img"
        aria-labelledby={`${idTitulo} ${idDescripcion}`}
        viewBox={`0 0 ${ANCHO} ${alto}`}
        sx={{ display: 'block', width: '100%', maxWidth: 420, height: 'auto', mx: 'auto' }}
      >
        <title id={idTitulo}>{arquitectura.etiquetas.titulo}</title>
        <desc id={idDescripcion}>{pasos.map((paso) => paso.nombre).join(', ')}</desc>
        {pasos.map((paso, indice) => {
          const arriba = y;
          const abajo = arriba + altoCaja(paso);
          y = abajo + ALTO_FLECHA;
          return (
            <g key={paso.nombre} fontFamily="inherit">
              <rect x={X_CAJA} y={arriba} width={ANCHO_CAJA} height={altoCaja(paso)} rx={14} fill={FONDO} stroke={TEXTO} strokeWidth={2} />
              <circle cx={X_CAJA + 28} cy={arriba + 28} r={14} fill="none" stroke={TEXTO} strokeWidth={2} />
              <text x={X_CAJA + 28} y={arriba + 28} textAnchor="middle" dominantBaseline="central" fontSize={15} fontWeight={700} fill={TEXTO}>
                {indice + 1}
              </text>
              <text data-paso="" x={X_CAJA + 54} y={arriba + 33} fontSize={16} fontWeight={700} fill={TEXTO}>
                {paso.nombre}
              </text>
              {paso.lineas.map((linea, k) => (
                <text key={linea} x={X_CAJA + 54} y={arriba + 55 + 19 * k} fontSize={13.5} fill={TEXTO_2}>
                  {linea}
                </text>
              ))}
              {indice < pasos.length - 1 && (
                <g aria-hidden="true" fill="none" stroke={TEXTO} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d={`M${CENTRO_FLECHA} ${abajo + 2}V${abajo + ALTO_FLECHA - 3}`} />
                  <path d={`M${CENTRO_FLECHA - 6} ${abajo + ALTO_FLECHA - 10}L${CENTRO_FLECHA} ${abajo + ALTO_FLECHA - 3}L${CENTRO_FLECHA + 6} ${abajo + ALTO_FLECHA - 10}`} />
                </g>
              )}
            </g>
          );
        })}
      </Box>
    </DiagramFrame>
  );
}
