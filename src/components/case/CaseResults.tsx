import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { content } from '../../content';
import type { Metrica } from '../../content.types';
import { FUENTE_MONO, radio } from '../../theme';

interface Props {
  resultados?: Metrica[];
}

// Fila de tarjetas de resultado: un número grande y lo que significa. Sin métricas no dibuja nada (la Plataforma de agentes no las tiene).
// Solo la métrica `estimado` lleva el rótulo "Estimado" junto al número: el resto son valores medidos.
export default function CaseResults({ resultados }: Props) {
  if (!resultados || resultados.length === 0) return null;

  return (
    <Box
      component="ul"
      aria-label={content.detalle.resultados}
      sx={{
        listStyle: 'none',
        m: 0,
        mb: 6,
        p: 0,
        display: 'grid',
        gap: 2,
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: `repeat(${Math.min(resultados.length, 4)}, 1fr)` },
      }}
    >
      {resultados.map((metrica) => (
        <Box
          component="li"
          key={metrica.etiqueta}
          sx={{ p: 2.5, border: 1, borderColor: 'divider', borderRadius: `${radio.tarjeta}px`, bgcolor: 'background.paper' }}
        >
          <Typography component="p" variant="h3" sx={{ fontSize: { xs: '2rem', md: '2.25rem' }, overflowWrap: 'anywhere' }}>
            {metrica.valor}
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 0.5 }}>
            {metrica.etiqueta}
          </Typography>
          {metrica.tipo === 'estimado' && (
            <Chip
              label={content.detalle.estimado}
              size="small"
              variant="outlined"
              sx={{ mt: 1.5, fontFamily: FUENTE_MONO, fontSize: '0.75rem' }}
            />
          )}
        </Box>
      ))}
    </Box>
  );
}
