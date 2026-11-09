import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';
import CaseHeader from '../components/case/CaseHeader';
import CaseSection from '../components/case/CaseSection';
import CaseToc from '../components/case/CaseToc';
import NextCase from '../components/case/NextCase';
import IllustrativeExample from '../components/IllustrativeExample';
import { content, getCaseBySlug } from '../content';
import type { SeccionDetalle } from '../content.types';
import { diagramas } from '../diagrams';
import { metaPagina } from '../lib/meta';
import type { Route } from './+types/CaseDetail';
import NotFound, { metaNoEncontrado } from './NotFound';

const { secciones, decisiones } = content.detalle;

interface Articulo {
  seccion: SeccionDetalle;
  cuerpo: ReactNode;
}

export function meta({ params }: Route.MetaArgs) {
  const caso = getCaseBySlug(params.slug);
  if (!caso) return metaNoEncontrado();
  return metaPagina({
    titulo: `${caso.seo.titulo} | ${content.sitio.nombre}`,
    descripcion: caso.seo.descripcion,
    imagen: caso.seo.ogImagen,
  });
}

// Plantilla de detalle. El caso completo muestra los artículos 01 a 04 junto al índice lateral (dos columnas desde `md`); el corto, solo el problema.
// Al final del caso completo va "Siguiente caso". Las tarjetas de resultado y la tarjeta final de contacto no están dibujadas todavía.
// Una sección sin datos no se dibuja.
// `data-variante` deja en el HTML qué plantilla se usó, para que el build pueda verificarla.
export default function CaseDetail({ params }: Route.ComponentProps) {
  const caso = getCaseBySlug(params.slug);
  if (!caso) return <NotFound />;

  const completa = caso.variante === 'completa';
  const Diagrama = caso.arquitectura && diagramas[caso.arquitectura.diagrama];
  // El número sale del orden en que se dibujan los artículos presentes.
  const articulos: Articulo[] = [
    { seccion: secciones.problema, cuerpo: <Typography sx={{ maxWidth: '65ch' }}>{caso.problema}</Typography> },
    completa &&
      caso.solucion.length > 0 && {
        seccion: secciones.solucion,
        cuerpo: (
          <>
            <Typography variant="h3" component="h3" sx={{ fontSize: '1.125rem', mb: 1 }}>
              {decisiones}
            </Typography>
            <Box component="ul" sx={{ m: 0, mb: 3, pl: 3, maxWidth: '65ch' }}>
              {caso.solucion.map((decision) => (
                <li key={decision}>{decision}</li>
              ))}
            </Box>
            {caso.terminal && <IllustrativeExample ejemplo={caso.terminal} />}
          </>
        ),
      },
    completa &&
      caso.arquitectura &&
      Diagrama && {
        seccion: secciones.funciona,
        cuerpo: <Diagrama arquitectura={caso.arquitectura} />,
      },
    completa &&
      caso.aprendizajes.length > 0 && {
        seccion: secciones.aprendizajes,
        cuerpo: (
          <Box component="ul" sx={{ m: 0, pl: 3, maxWidth: '65ch' }}>
            {caso.aprendizajes.map((aprendizaje) => (
              <li key={aprendizaje}>{aprendizaje}</li>
            ))}
          </Box>
        ),
      },
  ].filter((articulo) => !!articulo);

  const articulosDibujados = articulos.map(({ seccion, cuerpo }, indice) => (
    <CaseSection key={seccion.id} seccion={seccion} numero={indice + 1}>
      {cuerpo}
    </CaseSection>
  ));

  return (
    <Container maxWidth="lg" data-variante={caso.variante} sx={{ py: { xs: 3, md: 6 } }}>
      <CaseHeader caso={caso} />
      {completa ? (
        // El índice va primero en el HTML: en pantallas chicas queda arriba y desde `md` pasa a la columna izquierda.
        <Box sx={{ display: 'grid', gap: { xs: 3, md: 6 }, gridTemplateColumns: { md: '220px minmax(0, 1fr)' }, alignItems: 'start' }}>
          <CaseToc secciones={articulos.map((a) => a.seccion)} />
          <Box sx={{ maxWidth: 760 }}>
            {articulosDibujados}
            <NextCase caso={caso} />
          </Box>
        </Box>
      ) : (
        <Box sx={{ maxWidth: 760 }}>{articulosDibujados}</Box>
      )}
    </Container>
  );
}
