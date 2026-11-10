import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router';
import { COMPLETAR, content } from '../../content';
import type { Caso } from '../../content.types';
import { FUENTE_MONO } from '../../theme';

const { detalle, navegacion } = content;

interface Props {
  caso: Caso;
}

// Cabecera del detalle: migas, título largo, bajada y fila de metadatos (Rol, Stack, Duración, Estado).
// La variante corta muestra solo el Estado. Un dato desconocido se ve como COMPLETAR, no como un hueco.
export default function CaseHeader({ caso }: Props) {
  const { metadatos } = caso;
  const completos = [
    { rotulo: detalle.metadatos.rol, valor: metadatos.rol },
    { rotulo: detalle.metadatos.stack, valor: metadatos.stack.join(' · ') || COMPLETAR },
    { rotulo: detalle.metadatos.duracion, valor: metadatos.duracion },
  ];
  const filas = caso.variante === 'completa' ? completos : [];

  return (
    <Box component="header" sx={{ mb: 4 }}>
      <Breadcrumbs aria-label={navegacion.migas.etiqueta} sx={{ mb: 2 }}>
        <Link component={RouterLink} to={{ pathname: '/', hash: 'casos' }} underline="always">
          {navegacion.migas.casos}
        </Link>
        <Typography aria-current="page" color="text.primary" component="span">
          {caso.titulo}
        </Typography>
      </Breadcrumbs>
      <Typography variant="h1" sx={{ fontSize: { xs: '2rem', md: '3rem' }, mb: 2 }}>
        {caso.tituloLargo}
      </Typography>
      <Typography color="text.secondary" sx={{ fontSize: '1.125rem', maxWidth: '60ch', mb: 3 }}>
        {caso.bajada}
      </Typography>
      <Box component="dl" sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: 2, md: 4 }, m: 0 }}>
        {filas.map((fila) => (
          <Box key={fila.rotulo}>
            <Typography component="dt" variant="overline" color="text.secondary">
              {fila.rotulo}
            </Typography>
            <Typography component="dd" sx={{ m: 0, fontWeight: 600, overflowWrap: 'anywhere' }}>
              {fila.valor}
            </Typography>
          </Box>
        ))}
        <Box>
          <Typography component="dt" variant="overline" color="text.secondary">
            {detalle.metadatos.estado}
          </Typography>
          <Typography component="dd" sx={{ m: 0, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* El punto solo acompaña: el significado del estado está en el texto. */}
            <Box
              component="span"
              aria-hidden="true"
              sx={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                border: 2,
                borderColor: 'text.primary',
                bgcolor: caso.estado === 'publicado' ? 'text.primary' : 'transparent',
              }}
            />
            <Box component="span" sx={{ fontFamily: FUENTE_MONO, fontSize: '0.9375rem' }}>
              {metadatos.estado}
            </Box>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
