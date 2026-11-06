import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { content } from '../../content';
import { FUENTE_MONO } from '../../theme';

const { stack } = content.inicio;

// Tarjeta con una fila por grupo de tecnologías. Va dentro de Sobre mí, por eso no abre una sección
// ni un h2 propio: su título es un h3 que cuelga del h2 de la sección.
export default function StackCard() {
  return (
    <Card variant="outlined" sx={{ p: { xs: 2.5, md: 3 } }}>
      <Typography variant="h5" component="h3" sx={{ mb: 2 }}>
        {stack.titulo}
      </Typography>
      <Box component="dl" sx={{ display: 'grid', gap: 2, m: 0 }}>
        {stack.grupos.map((grupo) => (
          <Box key={grupo.titulo}>
            <Typography
              variant="overline"
              component="dt"
              color="text.secondary"
              sx={{ display: 'block', fontFamily: FUENTE_MONO }}
            >
              {grupo.titulo}
            </Typography>
            <Box component="dd" sx={{ m: 0 }}>
              <Box component="ul" sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, listStyle: 'none', m: 0, p: 0 }}>
                {grupo.tecnologias.map((tecnologia) => (
                  <li key={tecnologia}>
                    <Chip label={tecnologia} variant="outlined" />
                  </li>
                ))}
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Card>
  );
}
