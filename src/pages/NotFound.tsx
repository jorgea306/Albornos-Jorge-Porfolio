import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router';
import { content } from '../content';
import { metaPagina } from '../lib/meta';

const { noEncontrado } = content;

export function metaNoEncontrado() {
  return metaPagina({
    titulo: noEncontrado.seoTitulo,
    descripcion: noEncontrado.descripcion,
    imagen: '/og/general.png',
    noindex: true,
  });
}

export function meta() {
  return metaNoEncontrado();
}

// Se usa en la ruta comodin "*" y dentro de CaseDetail cuando el slug no existe.
export default function NotFound() {
  return (
    <Container maxWidth="sm" sx={{ py: 10 }}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom>
          {noEncontrado.titulo}
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4 }}>
          {noEncontrado.descripcion}
        </Typography>
        <Button component={RouterLink} to="/" variant="contained">
          {noEncontrado.enlace}
        </Button>
      </Box>
    </Container>
  );
}
