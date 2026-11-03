import '@fontsource-variable/inter';
import { createTheme } from '@mui/material/styles';

// Unico lugar donde se define el acento (verde salvia). Cambiarlo aqui lo cambia en ambos esquemas.
// El salvia se usa solo en fondos y rellenos: el texto va en text.primary para cumplir contraste AA.
const SALVIA = { claro: '#8fb396', oscuro: '#a8cdaf' };

export const theme = createTheme({
  // Ambos esquemas viajan como variables CSS en el HTML; InitColorSchemeScript elige la clase antes de pintar.
  cssVariables: { colorSchemeSelector: 'class' },
  colorSchemes: {
    light: {
      palette: {
        primary: { main: SALVIA.claro, contrastText: '#16241a' },
        background: { default: '#f6f9f5', paper: '#ffffff' },
        text: { primary: '#16241a', secondary: '#425547' },
      },
    },
    dark: {
      palette: {
        primary: { main: SALVIA.oscuro, contrastText: '#0f1a12' },
        background: { default: '#131a15', paper: '#1b251e' },
        text: { primary: '#e9f1ea', secondary: '#b5c5b8' },
      },
    },
  },
  typography: {
    fontFamily: '"Inter Variable", system-ui, -apple-system, "Segoe UI", sans-serif',
  },
  shape: { borderRadius: 12 },
  components: {
    // Los botones de texto y contorno usan primary.main como color de texto; ahi el salvia no alcanza 4,5:1.
    MuiButton: {
      styleOverrides: {
        text: ({ theme: t }) => ({ color: t.vars.palette.text.primary }),
        outlined: ({ theme: t }) => ({ color: t.vars.palette.text.primary }),
      },
    },
    MuiLink: {
      styleOverrides: {
        root: ({ theme: t }) => ({ color: t.vars.palette.text.primary }),
      },
    },
    MuiPaper: {
      styleOverrides: {
        // En oscuro MUI suma un degradado claro sobre Paper; se quita para mantener el fondo definido arriba.
        root: ({ theme: t }) => ({ ...t.applyStyles('dark', { backgroundImage: 'none' }) }),
      },
    },
  },
});
