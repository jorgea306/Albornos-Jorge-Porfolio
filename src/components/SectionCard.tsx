import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router';

interface Props {
  titulo: string;
  descripcion: string;
  // Etiqueta corta sobre el titulo (por ejemplo el estado del caso).
  etiqueta?: string;
  // Si se indica, toda la tarjeta es un enlace a esta ruta.
  to?: string;
  // Texto de cierre visible solo en las tarjetas con enlace.
  accion?: string;
}

// Tarjeta comun de Servicios y Casos. Recibe todo el texto por props: no define ninguno propio.
export default function SectionCard({ titulo, descripcion, etiqueta, to, accion }: Props) {
  const contenido = (
    <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1, height: '100%' }}>
      {etiqueta && <Chip label={etiqueta} size="small" color="primary" sx={{ alignSelf: 'flex-start' }} />}
      <Typography variant="h6" component="h3">
        {titulo}
      </Typography>
      <Typography color="text.secondary">{descripcion}</Typography>
      {to && accion && (
        <Typography variant="body2" sx={{ mt: 'auto', pt: 1, fontWeight: 600 }}>
          {accion}
        </Typography>
      )}
    </CardContent>
  );

  return (
    <Card component="article" variant="outlined" sx={{ height: '100%' }}>
      {to ? (
        <CardActionArea component={RouterLink} to={to} sx={{ height: '100%' }}>
          {contenido}
        </CardActionArea>
      ) : (
        contenido
      )}
    </Card>
  );
}
