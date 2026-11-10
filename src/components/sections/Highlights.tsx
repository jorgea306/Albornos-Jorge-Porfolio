import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { content } from '../../content';

const { destacados } = content.inicio;

// Fondo y texto de cada tarjeta por posición: 1 en salvia, 2 en arena y el resto sobre la superficie.
// Sobre salvia o arena el texto usa `contrastText` (heredado) para mantener el contraste AA.
const FONDOS = [
  { bgcolor: 'primary.main', color: 'primary.contrastText' },
  { bgcolor: 'secondary.main', color: 'secondary.contrastText' },
];

// Franja de 4 datos bajo el Hero. No tiene título propio: la lista lleva un nombre accesible.
export default function Highlights() {
  return (
    <Box component="section" aria-label={destacados.etiqueta} sx={{ py: { xs: 2, md: 3 } }}>
      <Container maxWidth="lg">
        <Box
          component="ul"
          sx={{
            display: 'grid',
            gap: 2,
            listStyle: 'none',
            m: 0,
            p: 0,
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
          }}
        >
          {destacados.items.map((dato, indice) => (
            <Box key={dato.valor} component="li">
              <Card variant="outlined" sx={{ height: '100%', p: 2.5, ...FONDOS[indice] }}>
                <Typography variant="h4" component="p">
                  {dato.valor}
                </Typography>
                <Typography variant="body2" sx={{ mt: 0.5, color: FONDOS[indice] ? 'inherit' : 'text.secondary' }}>
                  {dato.descripcion}
                </Typography>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
