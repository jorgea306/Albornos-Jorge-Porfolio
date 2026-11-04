import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import Link from '@mui/material/Link';
import { ThemeProvider } from '@mui/material/styles';
import { Links, Meta, Outlet, Scripts, ScrollRestoration, type LinksFunction } from 'react-router';
import SiteFooter from './components/layout/SiteFooter';
import SiteHeader from './components/layout/SiteHeader';
import { content } from './content';
import { precargaFuentes } from './fuentes';
import { theme } from './theme';

const { navegacion } = content;

// Precarga los .woff2 latinos de Bricolage e Inter para que el h1 no espere al CSS de la fuente.
export const links: LinksFunction = () => precargaFuentes;

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: InitColorSchemeScript agrega la clase light/dark antes de que React hidrate.
    <html lang="es" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        {/* Fija la clase light/dark antes del primer pintado para evitar el parpadeo. */}
        <InitColorSchemeScript attribute="class" defaultMode="system" />
      </head>
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {/* id="arriba": destino de "Volver arriba", que existe también en las páginas de detalle. */}
          <Box id="arriba" sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            {/* Primer foco al presionar Tab: queda fuera de pantalla hasta recibirlo. */}
            <Link
              href="#contenido"
              sx={{
                position: 'absolute',
                top: 8,
                left: 8,
                zIndex: 'tooltip',
                px: 2,
                py: 1.5,
                borderRadius: 1,
                bgcolor: 'background.paper',
                border: 1,
                borderColor: 'divider',
                transform: 'translateY(-200%)',
                '&:focus-visible': { transform: 'none' },
              }}
            >
              {navegacion.saltarAlContenido}
            </Link>
            <SiteHeader />
            {/* tabIndex -1: el enlace "Saltar al contenido" puede dejar el foco aquí sin sumar una parada de Tab. */}
            <Box component="main" id="contenido" tabIndex={-1} sx={{ flex: 1, '&&:focus-visible': { outline: 'none' } }}>
              {children}
            </Box>
            <SiteFooter />
          </Box>
        </ThemeProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
