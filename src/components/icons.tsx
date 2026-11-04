import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon';
import type { ReactElement } from 'react';
import type { IconoServicio } from '../content.types';

// Íconos de Servicios con trazos propios (evitan sumar @mui/icons-material). Son decorativos: aria-hidden.
function Icono(props: SvgIconProps) {
  return (
    <SvgIcon
      aria-hidden="true"
      fontSize="inherit"
      {...props}
      sx={{ fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }}
    />
  );
}

export const iconosServicio: Record<IconoServicio, ReactElement> = {
  // Globo de chat con tres puntos.
  agente: (
    <Icono>
      <path d="M4 5h16v11h-9l-4 3.5V16H4z" />
      <path d="M8.5 10.5h.01M12 10.5h.01M15.5 10.5h.01" />
    </Icono>
  ),
  // Llaves angulares con una barra: código de servidor.
  api: (
    <Icono>
      <path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 5l-4 14" />
    </Icono>
  ),
  // Ventana con barra de título.
  interfaz: (
    <Icono>
      <path d="M3 5h18v14H3zM3 9.5h18M6.5 7.25h.01" />
    </Icono>
  ),
  // Rayo: algo que se ejecuta solo.
  automatizacion: (
    <Icono>
      <path d="M13 3L5 14h6l-1 7 8-11h-6z" />
    </Icono>
  ),
};
