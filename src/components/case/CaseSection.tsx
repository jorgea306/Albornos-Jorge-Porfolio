import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';
import type { SeccionDetalle } from '../../content.types';

interface Props {
  seccion: SeccionDetalle;
  // Posición de la sección (empieza en 1): se muestra como "01", "02", etc.
  numero: number;
  children: ReactNode;
}

// Artículo numerado del detalle. El `id` es el ancla a la que enlaza el índice lateral (slice 7b).
export default function CaseSection({ seccion, numero, children }: Props) {
  return (
    <Box component="article" id={seccion.id} aria-labelledby={`${seccion.id}-titulo`} sx={{ mb: 6 }}>
      <Typography variant="overline" component="p" color="text.secondary">
        {String(numero).padStart(2, '0')}
      </Typography>
      <Typography id={`${seccion.id}-titulo`} variant="h2" sx={{ fontSize: { xs: '1.75rem', md: '2.25rem' }, mb: 2 }}>
        {seccion.titulo}
      </Typography>
      {children}
    </Box>
  );
}
