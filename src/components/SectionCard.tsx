import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router';
import { FUENTE_MONO } from '../theme';

// Espacio de imagen de la tarjeta. Si `pendiente` es true no hay archivo todavía: se muestra un recuadro rotulado.
export interface MedioTarjeta {
  src: string;
  alt: string;
  ancho: number;
  alto: number;
  pendiente: boolean;
  // Rótulo visible del recuadro cuando falta el archivo.
  textoPendiente: string;
}

interface Props {
  titulo: string;
  descripcion: string;
  medio?: MedioTarjeta;
  // Ícono decorativo (debe venir con aria-hidden) y etiquetas cortas en fuente monoespaciada.
  icono?: ReactNode;
  etiquetas?: string[];
  // Etiqueta corta sobre el titulo (por ejemplo el estado del caso).
  etiqueta?: string;
  // Si se indica, toda la tarjeta es un enlace a esta ruta.
  to?: string;
  // Texto de cierre visible solo en las tarjetas con enlace.
  accion?: string;
}

// Tarjeta comun de Servicios y Casos. Recibe todo el texto por props: no define ninguno propio.
export default function SectionCard({ titulo, descripcion, medio, icono, etiquetas, etiqueta, to, accion }: Props) {
  const imagen = medio && (
    <Box sx={{ aspectRatio: `${medio.ancho} / ${medio.alto}`, width: '100%', overflow: 'hidden' }}>
      {medio.pendiente ? (
        <Box
          sx={{
            display: 'grid',
            placeItems: 'center',
            width: '100%',
            height: '100%',
            p: 2,
            textAlign: 'center',
            bgcolor: 'background.default',
            borderBottom: 1,
            borderColor: 'divider',
            color: 'text.secondary',
            fontFamily: FUENTE_MONO,
            fontSize: '0.8125rem',
          }}
        >
          {medio.textoPendiente}
        </Box>
      ) : (
        // Se usa <img> nativo: en Box, `width` y `height` serían estilos y no atributos (el navegador los necesita para reservar espacio).
        <img
          src={medio.src}
          alt={medio.alt}
          width={medio.ancho}
          height={medio.alto}
          loading="lazy"
          style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
        />
      )}
    </Box>
  );

  const contenido = (
    <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1, flexGrow: 1 }}>
      {icono && (
        <Box
          sx={{
            display: 'grid',
            placeItems: 'center',
            width: 44,
            height: 44,
            mb: 1,
            fontSize: 24,
            borderRadius: 2,
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
          }}
        >
          {icono}
        </Box>
      )}
      {etiqueta && <Chip label={etiqueta} size="small" color="primary" sx={{ alignSelf: 'flex-start' }} />}
      <Typography variant="h6" component="h3">
        {titulo}
      </Typography>
      <Typography color="text.secondary">{descripcion}</Typography>
      {etiquetas && (
        <Box component="ul" sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, listStyle: 'none', m: 0, mt: 'auto', p: 0, pt: 1 }}>
          {etiquetas.map((texto) => (
            <li key={texto}>
              <Chip label={texto} size="small" variant="outlined" sx={{ fontFamily: FUENTE_MONO, fontSize: '0.75rem' }} />
            </li>
          ))}
        </Box>
      )}
      {to && accion && (
        <Typography variant="body2" sx={{ mt: 'auto', pt: 1, fontWeight: 600 }}>
          {accion}
        </Typography>
      )}
    </CardContent>
  );

  return (
    <Card component="article" variant="outlined" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {to ? (
        <CardActionArea
          component={RouterLink}
          to={to}
          sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch', justifyContent: 'flex-start' }}
        >
          {imagen}
          {contenido}
        </CardActionArea>
      ) : (
        <>
          {imagen}
          {contenido}
        </>
      )}
    </Card>
  );
}
