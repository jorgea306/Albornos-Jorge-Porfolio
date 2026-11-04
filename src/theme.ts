import '@fontsource-variable/inter';
import { createTheme } from '@mui/material/styles';

// Unico lugar donde se definen los colores. Paleta "Salvia y crema" del diseno de Jorge.
// El salvia (primary) y la arena (secondary) se usan solo en fondos y rellenos:
// el texto va en text.primary para cumplir contraste AA.
export const theme = createTheme({
  // Ambos esquemas viajan como variables CSS en el HTML; InitColorSchemeScript elige la clase antes de pintar.
  cssVariables: { colorSchemeSelector: 'class' },
  colorSchemes: {
    light: {
      palette: {
        primary: { main: '#c6e3cf', contrastText: '#1f2b24' },
        secondary: { main: '#f3ddb8', contrastText: '#1f2b24' },
        background: { default: '#f5f2ea', paper: '#ffffff' },
        text: { primary: '#1f2b24', secondary: '#56635a' },
        divider: '#e2ddd0',
      },
    },
    dark: {
      palette: {
        primary: { main: '#a8d5b8', contrastText: '#131a16' },
        secondary: { main: '#e8cf9e', contrastText: '#131a16' },
        background: { default: '#131a16', paper: '#1a231e' },
        text: { primary: '#eaf0ec', secondary: '#a3b3a8' },
        divider: '#27342c',
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
