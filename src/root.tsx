import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import Link from '@mui/material/Link';
import { ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Link as RouterLink, Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import ThemeToggle from './components/ThemeToggle';
import { content } from './content';
import { theme } from './theme';

const { sitio, interfaz } = content;

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
          <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Box component="header" sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Container
                maxWidth="lg"
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 1 }}
              >
                <Link component={RouterLink} to="/" underline="none">
                  <Typography variant="subtitle1" component="span" sx={{ fontWeight: 600 }}>
                    {sitio.nombre}
                  </Typography>
                </Link>
                <ThemeToggle />
              </Container>
            </Box>
            <Box component="main" sx={{ flex: 1 }}>
              {children}
            </Box>
            <Box component="footer" sx={{ borderTop: 1, borderColor: 'divider', py: 3 }}>
              <Container maxWidth="lg">
                <Typography variant="body2" color="text.secondary">
                  {interfaz.pie}
                </Typography>
              </Container>
            </Box>
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
