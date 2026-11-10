import Box from '@mui/material/Box';
import { content } from '../../content';
import type { Medio } from '../../content.types';
import { FUENTE_MONO, radio } from '../../theme';

interface Props {
  slug: string;
  medios: Medio[];
}

const marco = { width: '100%', overflow: 'hidden', borderRadius: `${radio.tarjeta}px`, border: 1, borderColor: 'divider' };

// Recuadro rotulado para el medio que todavía no está en public/: reserva el mismo espacio que tendrá el archivo.
function Pendiente({ medio }: { medio: Medio }) {
  return (
    <Box
      sx={{
        ...marco,
        aspectRatio: `${medio.ancho} / ${medio.alto}`,
        display: 'grid',
        placeItems: 'center',
        p: 2,
        textAlign: 'center',
        bgcolor: 'background.paper',
        color: 'text.secondary',
        fontFamily: FUENTE_MONO,
        fontSize: '0.8125rem',
      }}
    >
      {content.detalle.medioPendiente}
    </Box>
  );
}

// Imagen principal (1200×480) y video del caso, bajo la bajada. Muestra el primer medio de cada tipo; sin ninguno no dibuja nada.
// Se usan <img> y <video> nativos: en Box, `width` y `height` serían estilos y no atributos, y el navegador los necesita para reservar espacio.
export default function CaseMedia({ slug, medios }: Props) {
  const imagen = medios.find((medio) => medio.tipo === 'imagen');
  const video = medios.find((medio) => medio.tipo === 'video');
  if (!imagen && !video) return null;
  const ruta = (archivo: string) => `/casos/${slug}/${archivo}`;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 6 }}>
      {imagen &&
        (imagen.pendiente ? (
          <Pendiente medio={imagen} />
        ) : (
          <Box sx={{ ...marco, aspectRatio: `${imagen.ancho} / ${imagen.alto}` }}>
            <img
              src={ruta(imagen.archivo)}
              alt={imagen.alt}
              width={imagen.ancho}
              height={imagen.alto}
              style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Box>
        ))}
      {video &&
        (video.pendiente ? (
          <Pendiente medio={video} />
        ) : (
          <Box sx={{ ...marco, aspectRatio: `${video.ancho} / ${video.alto}` }}>
            {/* preload="none": el navegador no baja el video hasta que se reproduce; mientras tanto se ve el póster. */}
            <video
              controls
              preload="none"
              poster={video.poster ? ruta(video.poster) : undefined}
              aria-label={video.alt}
              width={video.ancho}
              height={video.alto}
              style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
            >
              <source src={ruta(video.archivo)} />
            </video>
          </Box>
        ))}
    </Box>
  );
}
