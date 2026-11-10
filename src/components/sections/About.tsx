import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { content } from '../../content';
import type { Descarga, Medio } from '../../content.types';
import { radio } from '../../theme';
import SectionBlock from './SectionBlock';
import StackCard from './StackCard';

const { sobreMi } = content.inicio;
const { linkedin, github } = content.redes;
const iniciales = content.navegacion.logo;

interface Props {
  // Se pueden reemplazar en las pruebas; por defecto salen de content.ts.
  foto?: Medio;
  cv?: Descarga;
}

// Sobre mí: bio, botones de perfil y la tarjeta de Stack. La foto y el CV solo aparecen si su archivo ya existe
// (`pendiente` en false); si no, se muestra un avatar con iniciales y no hay botón de descarga.
export default function About({ foto = sobreMi.foto, cv = sobreMi.cv }: Props) {
  const { encabezado, subtitulo, parrafos } = sobreMi;
  return (
    <SectionBlock id={sobreMi.id} titulo={encabezado.titulo} etiqueta={encabezado.etiqueta} bajada={subtitulo}>
      <Box sx={{ display: 'grid', gap: { xs: 4, md: 6 }, gridTemplateColumns: { xs: '1fr', md: '1.1fr 1fr' } }}>
        <Box>
          {foto.pendiente ? (
            <Box
              aria-hidden="true"
              sx={{
                display: 'grid',
                placeItems: 'center',
                width: 96,
                height: 96,
                mb: 3,
                borderRadius: `${radio.tarjeta}px`,
                bgcolor: 'secondary.main',
                color: 'secondary.contrastText',
                fontSize: '2rem',
                fontWeight: 800,
              }}
            >
              {iniciales}
            </Box>
          ) : (
            // <img> nativo: en Box, `width` y `height` serían estilos y no atributos; el navegador los usa para reservar espacio.
            <img
              src={`/${foto.archivo}`}
              alt={foto.alt}
              width={foto.ancho}
              height={foto.alto}
              style={{ display: 'block', width: 160, height: 'auto', marginBottom: 24, borderRadius: radio.tarjeta }}
            />
          )}
          {parrafos.map((parrafo) => (
            <Typography key={parrafo} sx={{ mb: 2, maxWidth: '60ch' }}>
              {parrafo}
            </Typography>
          ))}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mt: 3 }}>
            <Button variant="contained" href={linkedin.url}>
              {linkedin.texto}
            </Button>
            <Button variant="outlined" href={github.url}>
              {github.texto}
            </Button>
            {!cv.pendiente && (
              <Button variant="outlined" href={`/${cv.archivo}`} download>
                {cv.texto}
              </Button>
            )}
          </Box>
        </Box>
        <StackCard />
      </Box>
    </SectionBlock>
  );
}
