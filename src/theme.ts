import { createTheme } from '@mui/material/styles';

// Tipografías: los archivos se cargan en src/fuentes.ts. Los nombres de familia vienen de @fontsource-variable.
const FUENTE_CUERPO = '"Inter Variable", system-ui, -apple-system, "Segoe UI", sans-serif';
const FUENTE_TITULO = '"Bricolage Grotesque Variable", "Inter Variable", system-ui, sans-serif';
// Etiquetas, datos y consola. Si hace falta aliviar la carga, basta cambiar esta línea por la monoespaciada del sistema.
export const FUENTE_MONO = '"JetBrains Mono Variable", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';

// Medidas compartidas: un nombre legible en lugar de números sueltos en cada componente.
export const radio = { tarjeta: 16, destacada: 20, contacto: 24 };
// Alto de la barra fija (SiteHeader). También evita que las anclas queden tapadas por ella.
export const ALTURA_BARRA = 64;
// Zona de toque mínima de los controles (nav R4).
const TOQUE_MINIMO = 44;
const TOQUE_MINIMO_GRANDE = 52;

// Botón principal: oscuro sobre crema en claro y salvia en oscuro. Un solo lugar para el override y para el test de contraste.
export const botonPrincipal = {
  light: { fondo: '#1f2b24', fondoHover: '#34463b', texto: '#f5f2ea' },
  dark: { fondo: '#a8d5b8', fondoHover: '#bfe3cb', texto: '#131a16' },
};

// "Línea 2" de la paleta: borde de los botones de contorno, solo en oscuro.
export const lineaFuerte = '#3d5045';

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
    fontFamily: FUENTE_CUERPO,
    h1: {
      fontFamily: FUENTE_TITULO,
      fontSize: 'clamp(2.5rem, 5.4vw, 4.5rem)',
      fontWeight: 800,
      lineHeight: 1.02,
    },
    h2: { fontFamily: FUENTE_TITULO, fontSize: 'clamp(2rem, 3.6vw, 3rem)', fontWeight: 700, lineHeight: 1.1 },
    h3: { fontFamily: FUENTE_TITULO, fontWeight: 700 },
    h4: { fontFamily: FUENTE_TITULO, fontWeight: 700 },
    h5: { fontFamily: FUENTE_TITULO, fontWeight: 700 },
    h6: { fontFamily: FUENTE_TITULO, fontWeight: 700 },
    // Etiqueta de sección ("01 / SERVICIOS"): se reutiliza overline para no ampliar los tipos de MUI.
    overline: { fontFamily: FUENTE_MONO, fontSize: '0.8125rem', fontWeight: 500, letterSpacing: '0.08em' },
  },
  shape: { borderRadius: 8 },
  components: {
    // Anclas: scroll-padding-top evita que la barra fija tape el título al saltar a #casos (también desde /casos/<slug>).
    MuiCssBaseline: {
      styleOverrides: (t) => ({
        html: {
          scrollPaddingTop: ALTURA_BARRA + 8,
          '@media (prefers-reduced-motion: no-preference)': { scrollBehavior: 'smooth' },
        },
        // Indicador de foco visible con contraste >= 3:1 (text.primary contra el fondo). ButtonBase lo anula con outline: 0.
        'a:focus-visible, button:focus-visible, [tabindex]:focus-visible': {
          outline: `3px solid ${t.vars.palette.text.primary}`,
          outlineOffset: 2,
        },
      }),
    },
    MuiIconButton: { styleOverrides: { root: { minWidth: TOQUE_MINIMO, minHeight: TOQUE_MINIMO } } },
    MuiCard: { styleOverrides: { root: { borderRadius: radio.tarjeta } } },
    MuiContainer: {
      styleOverrides: {
        root: ({ theme: t }) => ({
          paddingLeft: 20,
          paddingRight: 20,
          [t.breakpoints.up('sm')]: { paddingLeft: 32, paddingRight: 32 },
        }),
        // 1200 de contenido + 2 x 32 de margen. El selector doble gana sobre el ancho que MUI asigna a "lg".
        maxWidthLg: { '&.MuiContainer-maxWidthLg': { maxWidth: 1264 } },
      },
    },
    // Los botones de texto y contorno usan primary.main como color de texto; ahi el salvia no alcanza 4,5:1.
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { minHeight: TOQUE_MINIMO, textTransform: 'none', fontWeight: 600 },
        sizeLarge: { minHeight: TOQUE_MINIMO_GRANDE },
        text: ({ theme: t }) => ({ color: t.vars.palette.text.primary }),
        outlined: ({ theme: t }) => ({
          color: t.vars.palette.text.primary,
          ...t.applyStyles('dark', { borderColor: lineaFuerte }),
        }),
      },
      variants: [
        {
          props: { variant: 'contained', color: 'primary' },
          style: ({ theme: t }) => ({
            backgroundColor: botonPrincipal.light.fondo,
            color: botonPrincipal.light.texto,
            '&:hover': { backgroundColor: botonPrincipal.light.fondoHover },
            ...t.applyStyles('dark', {
              backgroundColor: botonPrincipal.dark.fondo,
              color: botonPrincipal.dark.texto,
              '&:hover': { backgroundColor: botonPrincipal.dark.fondoHover },
            }),
          }),
        },
      ],
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
