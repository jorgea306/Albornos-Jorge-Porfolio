import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { content } from '../../content';
import { FUENTE_MONO } from '../../theme';
import SectionBlock from './SectionBlock';

const { proceso } = content.inicio;

// Cuatro pasos en una lista ordenada. El número visible se calcula con la posición del paso;
// va oculto para el lector de pantalla, que ya anuncia la posición dentro de la lista.
export default function Process() {
  const { encabezado, pasos } = proceso;
  return (
    <SectionBlock id={proceso.id} titulo={encabezado.titulo} etiqueta={encabezado.etiqueta}>
      <Box
        component="ol"
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
          listStyle: 'none',
          m: 0,
          p: 0,
        }}
      >
        {pasos.map((paso, indice) => (
          <Box component="li" key={paso.titulo} sx={{ display: 'flex' }}>
            <Card variant="outlined" sx={{ p: 3, width: '100%' }}>
              <Typography
                aria-hidden="true"
                color="text.secondary"
                sx={{ fontFamily: FUENTE_MONO, fontSize: '0.875rem', mb: 1 }}
              >
                {String(indice + 1).padStart(2, '0')}
              </Typography>
              <Typography variant="h5" component="h3" sx={{ mb: 1 }}>
                {paso.titulo}
              </Typography>
              <Typography color="text.secondary">{paso.descripcion}</Typography>
            </Card>
          </Box>
        ))}
      </Box>
    </SectionBlock>
  );
}
