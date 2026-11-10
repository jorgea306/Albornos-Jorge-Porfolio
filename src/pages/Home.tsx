import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { content } from '../content';
import { metaPagina } from '../lib/meta';

export function meta() {
  return metaPagina({
    titulo: content.sitio.titulo,
    descripcion: content.sitio.descripcion,
    imagen: '/og/general.png',
  });
}

// Pagina provisoria: el slice 2 agrega Hero, Servicios, Casos y Stack.
export default function Home() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h2" component="h1">
        {content.sitio.nombre}
      </Typography>
    </Container>
  );
}
