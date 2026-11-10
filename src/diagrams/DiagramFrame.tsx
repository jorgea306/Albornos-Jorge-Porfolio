import Box from '@mui/material/Box';
import { useId } from 'react';
import type { ReactNode } from 'react';
import type { Caso, DiagramId } from '../content.types';
import { radio } from '../theme';

// Lo que recibe cada diagrama: la arquitectura del caso (textos de las cajas y leyenda).
export interface PropsDiagrama {
  arquitectura: NonNullable<Caso['arquitectura']>;
}

interface Props {
  id: DiagramId;
  leyenda: string;
  children: ReactNode;
}

// Marco común de los diagramas. `data-diagrama` es el contrato que busca el build (chequeo del slice 7b)
// para confirmar que un caso completo tiene diagrama. La leyenda nombra el diagrama para el lector de pantalla.
export default function DiagramFrame({ id, leyenda, children }: Props) {
  const idLeyenda = useId();
  return (
    <Box
      component="figure"
      data-diagrama={id}
      aria-labelledby={idLeyenda}
      sx={{
        m: 0,
        p: { xs: 2, md: 3 },
        border: 1,
        borderColor: 'divider',
        borderRadius: `${radio.tarjeta}px`,
        bgcolor: 'background.paper',
      }}
    >
      {children}
      <Box id={idLeyenda} component="figcaption" sx={{ mt: 2, fontSize: '0.875rem', color: 'text.secondary' }}>
        {leyenda}
      </Box>
    </Box>
  );
}
