import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { content } from '../../content';

const { interfaz, navegacion, redes } = content;

// Cada enlace mide al menos 44 px de alto y de ancho (nav R4).
const enlaceSx = { display: 'inline-flex', alignItems: 'center', minHeight: 44, minWidth: 44 };

export default function SiteFooter() {
  return (
    <Box component="footer" sx={{ borderTop: 1, borderColor: 'divider', py: 3 }}>
      <Container
        maxWidth="lg"
        sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', columnGap: 3 }}
      >
        <Typography variant="body2" color="text.secondary">
          {interfaz.pie}
        </Typography>
        <Box component="ul" sx={{ display: 'flex', flexWrap: 'wrap', columnGap: 2, listStyle: 'none', m: 0, p: 0 }}>
          {[redes.linkedin, redes.github].map((red) => (
            <li key={red.texto}>
              <Link href={red.url} target="_blank" rel="noopener noreferrer" sx={enlaceSx}>
                {red.texto}
              </Link>
            </li>
          ))}
          <li>
            {/* Va a #arriba y no a #inicio: #inicio no existe en las páginas de detalle. */}
            <Link href="#arriba" sx={enlaceSx}>
              {navegacion.volverArriba}
            </Link>
          </li>
        </Box>
      </Container>
    </Box>
  );
}
