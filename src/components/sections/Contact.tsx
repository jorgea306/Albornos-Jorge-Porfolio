import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { content } from '../../content';
import { radio } from '../../theme';

const { contacto } = content.inicio;

// Botón invertido: sobre el fondo de acento, el botón principal quedaría casi invisible en el esquema oscuro.
// Usa los dos colores de la paleta al revés (fondo = texto del bloque, texto = fondo del bloque).
const botonInvertido = {
  bgcolor: 'primary.contrastText',
  color: 'primary.main',
  '&:hover': { bgcolor: 'primary.contrastText', opacity: 0.9 },
};

// Bloque final del Inicio: pregunta, frase y tres vías de contacto (teléfono, WhatsApp y email copiable).
// Sin formulario: el email queda visible y seleccionable aunque el navegador no permita usar el portapapeles.
export default function Contact() {
  const [aviso, setAviso] = useState('');

  async function copiarEmail() {
    try {
      await navigator.clipboard.writeText(contacto.email);
      setAviso(contacto.copiado);
    } catch {
      // Sin portapapeles o sin permiso: se avisa en texto y el email sigue a la vista.
      setAviso(contacto.copiarFallo);
    }
  }

  return (
    <Box component="section" id={contacto.id} aria-labelledby={`${contacto.id}-titulo`} sx={{ py: { xs: 4, md: 7 } }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            p: { xs: 3, md: 7 },
            borderRadius: `${radio.contacto}px`,
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
          }}
        >
          <Typography id={`${contacto.id}-titulo`} variant="h2" component="h2" sx={{ mb: 2, maxWidth: '24ch' }}>
            {contacto.titulo}
          </Typography>
          <Typography sx={{ mb: 4, maxWidth: '60ch' }}>{contacto.bajada}</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 3 }}>
            <Button variant="contained" color="inherit" size="large" href={contacto.telefono.url} sx={botonInvertido}>
              {contacto.telefono.texto}
            </Button>
            <Button
              variant="contained"
              color="inherit"
              size="large"
              href={contacto.whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              sx={botonInvertido}
            >
              {contacto.whatsapp.texto}
            </Button>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1.5 }}>
            <Typography sx={{ fontWeight: 600, overflowWrap: 'anywhere', userSelect: 'all' }}>{contacto.email}</Typography>
            <Button variant="contained" color="inherit" size="large" onClick={copiarEmail} sx={botonInvertido}>
              {contacto.copiar}
            </Button>
          </Box>
          {/* Región de aviso: siempre presente, para que el lector de pantalla anuncie el cambio de texto. */}
          <Typography role="status" aria-live="polite" sx={{ minHeight: '1.5em', mt: 1.5, fontWeight: 600 }}>
            {aviso}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
