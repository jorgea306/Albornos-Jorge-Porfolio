import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';

interface Props {
  id: string;
  titulo: string;
  // Etiqueta mono sobre el titulo ("01 / SERVICIOS") y texto de apoyo debajo.
  etiqueta?: string;
  bajada?: string;
  children: ReactNode;
}

// Envoltorio comun de las secciones del Inicio: ancla (`id`), encabezado h2 y ancho de contenido.
export default function SectionBlock({ id, titulo, etiqueta, bajada, children }: Props) {
  const idTitulo = `${id}-titulo`;
  return (
    <Box component="section" id={id} aria-labelledby={idTitulo} sx={{ py: { xs: 4, md: 7 } }}>
      <Container maxWidth="lg">
        {etiqueta && (
          <Typography variant="overline" component="p" color="text.secondary" sx={{ mb: 1 }}>
            {etiqueta}
          </Typography>
        )}
        <Typography id={idTitulo} variant="h2" component="h2" sx={{ mb: bajada ? 1.5 : 3 }}>
          {titulo}
        </Typography>
        {bajada && (
          <Typography color="text.secondary" sx={{ mb: 4, maxWidth: '60ch' }}>
            {bajada}
          </Typography>
        )}
        {children}
      </Container>
    </Box>
  );
}
