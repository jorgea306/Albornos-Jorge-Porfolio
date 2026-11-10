import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { content } from '../../content';
import type { SeccionDetalle } from '../../content.types';
import { ALTURA_BARRA, FUENTE_MONO } from '../../theme';
import { useSeccionActiva } from './useSeccionActiva';

interface Props {
  // Los artículos que se dibujan, en orden. El número de cada entrada sale de su posición, igual que en `CaseSection`.
  secciones: SeccionDetalle[];
}

// Índice "En este caso". Los enlaces son anclas normales (#id), así que funcionan sin JavaScript.
// Desde `md` queda pegado a la izquierda mientras se lee; en pantallas chicas va arriba y no se fija, para no tapar contenido.
export default function CaseToc({ secciones }: Props) {
  const activa = useSeccionActiva(secciones.map((s) => s.id));

  return (
    <Box component="nav" aria-label={content.detalle.indice} sx={{ position: { md: 'sticky' }, top: { md: ALTURA_BARRA + 24 } }}>
      <Typography variant="overline" component="p" color="text.secondary" sx={{ mb: 1, textTransform: 'uppercase' }}>
        {content.detalle.indice}
      </Typography>
      <Box component="ol" sx={{ listStyle: 'none', m: 0, p: 0, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        {secciones.map((seccion, indice) => {
          const esActiva = seccion.id === activa;
          return (
            <li key={seccion.id}>
              <Link
                href={`#${seccion.id}`}
                underline="none"
                aria-current={esActiva ? 'true' : undefined}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  minHeight: 44,
                  px: 1.5,
                  borderRadius: 2,
                  borderLeft: 3,
                  borderColor: esActiva ? 'text.primary' : 'transparent',
                  // El salvia solo va como relleno: el texto conserva el contraste AA (ver theme.ts).
                  bgcolor: esActiva ? 'primary.main' : 'transparent',
                  color: esActiva ? 'primary.contrastText' : 'text.secondary',
                  fontWeight: esActiva ? 700 : 500,
                  '&:hover': { color: esActiva ? 'primary.contrastText' : 'text.primary' },
                }}
              >
                <Box component="span" sx={{ fontFamily: FUENTE_MONO, fontSize: '0.8125rem' }}>
                  {String(indice + 1).padStart(2, '0')}
                </Box>
                {seccion.titulo}
              </Link>
            </li>
          );
        })}
      </Box>
    </Box>
  );
}
