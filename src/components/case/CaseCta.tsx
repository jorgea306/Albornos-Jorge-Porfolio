import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router';
import { content } from '../../content';
import { radio } from '../../theme';

// Tarjeta final del detalle, igual en casos completos y cortos: lleva al bloque de Contacto del Inicio.
// El salvia va como relleno y el texto en `primary.contrastText` (contraste AA, ver theme.ts).
export default function CaseCta() {
  const { cta } = content.detalle;
  return (
    <Box
      component="aside"
      sx={{
        p: { xs: 3, md: 5 },
        borderRadius: `${radio.destacada}px`,
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { sm: 'center' },
        justifyContent: 'space-between',
        gap: 2,
      }}
    >
      <Typography variant="h4" component="p" sx={{ fontSize: { xs: '1.5rem', md: '1.875rem' } }}>
        {cta.pregunta}
      </Typography>
      <Link
        component={RouterLink}
        to={{ pathname: '/', hash: 'contacto' }}
        underline="always"
        color="inherit"
        sx={{ display: 'inline-flex', alignItems: 'center', minHeight: 44, fontWeight: 700, fontSize: '1.125rem' }}
      >
        {cta.accion}
      </Link>
    </Box>
  );
}
