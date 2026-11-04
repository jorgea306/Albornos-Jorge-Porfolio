import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { content } from '../../content';

const { hero } = content.inicio;

export default function Hero() {
  return (
    <Box component="section" aria-labelledby="inicio-titulo" sx={{ py: { xs: 6, md: 12 } }}>
      <Container maxWidth="lg">
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          {hero.etiqueta}
        </Typography>
        <Typography
          id="inicio-titulo"
          variant="h2"
          component="h1"
          sx={{ fontWeight: 700, fontSize: { xs: '2rem', sm: '2.75rem', md: '3.5rem' }, maxWidth: '22ch' }}
        >
          {hero.titulo}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 4 }}>
          <Button href={hero.principal.destino} variant="contained" size="large">
            {hero.principal.texto}
          </Button>
          <Button href={hero.secundario.destino} variant="outlined" size="large">
            {hero.secundario.texto}
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
