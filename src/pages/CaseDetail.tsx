import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { content, getCaseBySlug } from '../content';
import { metaPagina } from '../lib/meta';
import type { Route } from './+types/CaseDetail';
import NotFound, { metaNoEncontrado } from './NotFound';

export function meta({ params }: Route.MetaArgs) {
  const caso = getCaseBySlug(params.slug);
  if (!caso) return metaNoEncontrado();
  return metaPagina({
    titulo: `${caso.seo.titulo} | ${content.sitio.nombre}`,
    descripcion: caso.seo.descripcion,
    imagen: caso.seo.ogImagen,
  });
}

// Plantilla provisoria: el slice 4 agrega problema, arquitectura, decisiones y resultados.
export default function CaseDetail({ params }: Route.ComponentProps) {
  const caso = getCaseBySlug(params.slug);
  if (!caso) return <NotFound />;
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h3" component="h1">
        {caso.titulo}
      </Typography>
    </Container>
  );
}
