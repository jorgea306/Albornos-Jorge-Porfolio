import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router';
import { content } from '../../content';
import type { Caso } from '../../content.types';
import { FUENTE_MONO, radio } from '../../theme';

const { casos } = content.inicio;

interface Props {
  caso: Caso;
}

// Caso destacado del Inicio: tres bloques de texto y un panel con el avance de la carga.
// Sin `destacado` o sin `progreso` no hay nada que mostrar, así que no dibuja nada.
export default function FeaturedCase({ caso }: Props) {
  const { destacado, progreso } = caso;
  if (!destacado || !progreso) return null;

  const bloques = [
    { rotulo: casos.rotulos.problema, texto: destacado.problema },
    { rotulo: casos.rotulos.solucion, texto: destacado.solucion },
    { rotulo: casos.rotulos.resultado, texto: destacado.resultado },
  ];

  return (
    <Card
      component="article"
      variant="outlined"
      sx={{
        display: 'grid',
        gap: { xs: 3, md: 5 },
        p: { xs: 2.5, md: 4 },
        borderRadius: `${radio.destacada}px`,
        gridTemplateColumns: { xs: '1fr', md: '1.2fr 1fr' },
        alignItems: 'center',
      }}
    >
      <Box>
        <Box component="ul" sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, listStyle: 'none', m: 0, mb: 2, p: 0 }}>
          <li>
            <Chip label={casos.destacado} size="small" color="primary" />
          </li>
          {caso.chips?.map((chip) => (
            <li key={chip}>
              <Chip label={chip} size="small" variant="outlined" sx={{ fontFamily: FUENTE_MONO, fontSize: '0.75rem' }} />
            </li>
          ))}
        </Box>
        <Typography variant="h3" component="h3" sx={{ fontSize: { xs: '1.75rem', md: '2.125rem' }, mb: 2.5 }}>
          {caso.titulo}
        </Typography>
        <Box component="dl" sx={{ display: 'grid', gap: 2, m: 0 }}>
          {bloques.map((bloque) => (
            <Box key={bloque.rotulo}>
              <Typography variant="overline" component="dt" color="text.secondary">
                {bloque.rotulo}
              </Typography>
              <Typography component="dd" sx={{ m: 0 }}>
                {bloque.texto}
              </Typography>
            </Box>
          ))}
        </Box>
        <Link
          component={RouterLink}
          to={`/casos/${caso.slug}`}
          underline="always"
          sx={{ display: 'inline-flex', alignItems: 'center', minHeight: 44, mt: 2, fontWeight: 600 }}
        >
          {casos.leerCompleto}
        </Link>
      </Box>

      {/* Panel de avance: el texto lleva toda la información; la barra solo la acompaña. */}
      <Box
        sx={(t) => ({
          p: { xs: 2.5, md: 3 },
          borderRadius: `${radio.tarjeta}px`,
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          ...t.applyStyles('dark', { bgcolor: 'background.default', color: 'text.primary', border: 1, borderColor: 'divider' }),
        })}
      >
        <Typography sx={{ fontFamily: FUENTE_MONO, fontSize: '0.875rem', overflowWrap: 'anywhere' }}>
          {progreso.texto}
        </Typography>
        <Box
          aria-hidden="true"
          sx={(t) => ({
            height: 10,
            mt: 2,
            overflow: 'hidden',
            borderRadius: 5,
            bgcolor: 'background.paper',
            ...t.applyStyles('dark', { bgcolor: 'divider' }),
          })}
        >
          <Box
            sx={(t) => ({
              width: `${progreso.valor}%`,
              height: '100%',
              bgcolor: 'primary.contrastText',
              ...t.applyStyles('dark', { bgcolor: 'primary.main' }),
            })}
          />
        </Box>
      </Box>
    </Card>
  );
}
