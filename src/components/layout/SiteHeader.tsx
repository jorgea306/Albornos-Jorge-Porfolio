import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Link as RouterLink, useLocation } from 'react-router';
import { content, getCaseBySlug } from '../../content';
import { ALTURA_BARRA } from '../../theme';
import ThemeToggle from '../ThemeToggle';
import NavMenu from './NavMenu';

const { navegacion, sitio } = content;

type Variante = 'inicio' | 'detalle' | 'minima';

// La barra cambia según la ruta: Inicio (enlaces + Hablemos), detalle de caso (volver) y el resto (solo logo).
// Un slug inexistente bajo /casos/ se muestra como 404 con la barra del Inicio (decisión PROVISORIA D6).
function varianteDe(ruta: string): Variante {
  const limpia = ruta.length > 1 ? ruta.replace(/\/$/, '') : ruta;
  if (limpia === '/') return 'inicio';
  const slug = limpia.match(/^\/casos\/([^/]+)$/)?.[1];
  if (slug === undefined) return 'minima';
  return getCaseBySlug(slug) ? 'detalle' : 'inicio';
}

export default function SiteHeader() {
  const variante = varianteDe(useLocation().pathname);

  return (
    <Box
      component="header"
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 'appBar',
        borderBottom: 1,
        borderColor: 'divider',
        // El fondo translúcido deja ver el contenido que pasa por debajo; el desenfoque mantiene legible el texto.
        bgcolor: 'rgba(var(--mui-palette-background-defaultChannel) / 0.85)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <Container maxWidth="lg" sx={{ display: 'flex', alignItems: 'center', gap: 1, height: ALTURA_BARRA }}>
        <Link
          component={RouterLink}
          to="/"
          aria-label={navegacion.irAlInicio}
          underline="none"
          sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.5, minHeight: 44, mr: 'auto' }}
        >
          <Box
            aria-hidden="true"
            sx={{
              display: 'grid',
              placeItems: 'center',
              width: 36,
              height: 36,
              borderRadius: 1,
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              fontWeight: 800,
            }}
          >
            {navegacion.logo}
          </Box>
          <Typography component="span" sx={{ fontWeight: 600, display: { xs: 'none', sm: 'inline' } }}>
            {sitio.nombre}
          </Typography>
        </Link>

        {variante === 'inicio' && (
          <Box
            component="nav"
            aria-label={navegacion.etiquetaSecciones}
            sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5 }}
          >
            {navegacion.enlaces.map((enlace) => (
              <Button key={enlace.ancla} component={RouterLink} to={{ pathname: '/', hash: enlace.ancla }}>
                {enlace.texto}
              </Button>
            ))}
          </Box>
        )}

        {variante === 'detalle' && (
          <Button component={RouterLink} to={{ pathname: '/', hash: 'casos' }}>
            {navegacion.todosLosCasos}
          </Button>
        )}

        {variante === 'inicio' && <NavMenu />}
        <ThemeToggle />
        {variante === 'inicio' && (
          <Button component={RouterLink} to={{ pathname: '/', hash: 'contacto' }} variant="contained">
            {navegacion.hablemos}
          </Button>
        )}
      </Container>
    </Box>
  );
}
