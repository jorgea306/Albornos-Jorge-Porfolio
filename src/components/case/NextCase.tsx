import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router';
import { content, getSiguienteCaso } from '../../content';
import type { Caso } from '../../content.types';
import { FUENTE_MONO, radio } from '../../theme';

interface Props {
  // El caso que se está leyendo; la tarjeta apunta al que le sigue.
  caso: Caso;
}

// Tarjeta "SIGUIENTE CASO →". No dibuja nada en los casos cortos ni si no hay otro caso completo al que ir.
export default function NextCase({ caso }: Props) {
  const siguiente = getSiguienteCaso(caso.slug);
  if (!siguiente) return null;

  return (
    <Card variant="outlined" sx={{ borderRadius: `${radio.tarjeta}px`, mb: 6 }}>
      <CardActionArea component={RouterLink} to={`/casos/${siguiente.slug}`}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1, p: { xs: 2.5, md: 3 } }}>
          <Typography component="p" sx={{ fontFamily: FUENTE_MONO, fontSize: '0.8125rem', letterSpacing: '0.08em', color: 'text.secondary' }}>
            {content.detalle.siguiente}
          </Typography>
          <Typography variant="h5" component="p">
            {siguiente.titulo}
          </Typography>
          <Typography color="text.secondary">{siguiente.resumen}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
