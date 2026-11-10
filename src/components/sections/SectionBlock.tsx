import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';

interface Props {
  id: string;
  titulo: string;
  children: ReactNode;
}

// Envoltorio comun de las secciones del Inicio: ancla (`id`), encabezado h2 y ancho de contenido.
export default function SectionBlock({ id, titulo, children }: Props) {
  const idTitulo = `${id}-titulo`;
  return (
    <Box component="section" id={id} aria-labelledby={idTitulo} sx={{ py: { xs: 5, md: 8 } }}>
      <Container maxWidth="lg">
        <Typography id={idTitulo} variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          {titulo}
        </Typography>
        {children}
      </Container>
    </Box>
  );
}
