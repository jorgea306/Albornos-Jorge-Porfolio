import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { content } from '../../content';
import IllustrativeExample from '../IllustrativeExample';

const { hero } = content.inicio;

export default function Hero() {
  return (
    <Box component="section" id="inicio" aria-labelledby="inicio-titulo" sx={{ py: { xs: 4, md: 8 } }}>
      <Container
        maxWidth="lg"
        sx={{ display: 'grid', gap: { xs: 4, md: 6 }, alignItems: 'center', gridTemplateColumns: { xs: '1fr', md: '1.1fr 1fr' } }}
      >
        <Box>
          <Typography variant="overline" component="p" color="text.secondary" sx={{ mb: 2 }}>
            {hero.etiqueta}
          </Typography>
          <Typography id="inicio-titulo" variant="h1" component="h1" sx={{ overflowWrap: 'break-word' }}>
            {hero.titulo.antes}
            {/* Resaltado dentro del h1: un lector de pantalla lo lee como una sola frase. */}
            <Box
              component="mark"
              sx={(t) => ({
                bgcolor: 'primary.main',
                color: 'text.primary',
                px: 0.5,
                borderRadius: 1,
                boxDecorationBreak: 'clone',
                ...t.applyStyles('dark', { bgcolor: 'transparent', color: 'primary.main', px: 0 }),
              })}
            >
              {hero.titulo.resaltado}
            </Box>
            {hero.titulo.despues}
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 3, maxWidth: '56ch', fontSize: '1.125rem' }}>
            {hero.descripcion}
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 4 }}>
            <Button href={hero.principal.destino} variant="contained" size="large">
              {hero.principal.texto}
            </Button>
            <Button href={hero.secundario.destino} variant="outlined" size="large">
              {hero.secundario.texto}
            </Button>
          </Box>
        </Box>
        <IllustrativeExample ejemplo={hero.consola} />
      </Container>
    </Box>
  );
}
