import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router';
import { content } from '../../content';
import type { Caso } from '../../content.types';
import { radio } from '../../theme';

const { laboratorio } = content.inicio.casos;

interface Props {
  // Casos en desarrollo: se muestran como enlaces, no como tarjetas con imagen.
  casos: Caso[];
}

export default function Lab({ casos }: Props) {
  if (casos.length === 0) return null;
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        p: { xs: 2.5, md: 3 },
        border: 1,
        borderStyle: 'dashed',
        borderColor: 'divider',
        borderRadius: `${radio.tarjeta}px`,
      }}
    >
      <Typography variant="overline" component="p" color="text.secondary">
        {laboratorio.etiqueta}
      </Typography>
      <Typography variant="h5" component="h3">
        {laboratorio.titulo}
      </Typography>
      <Box component="ul" sx={{ display: 'flex', flexWrap: 'wrap', columnGap: 4, listStyle: 'none', m: 0, p: 0 }}>
        {casos.map((caso) => (
          <li key={caso.slug}>
            <Link
              component={RouterLink}
              to={`/casos/${caso.slug}`}
              underline="always"
              sx={{ display: 'inline-flex', alignItems: 'center', minHeight: 44, fontWeight: 600 }}
            >
              {caso.titulo}
            </Link>
          </li>
        ))}
      </Box>
    </Box>
  );
}
