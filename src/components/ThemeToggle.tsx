import IconButton from '@mui/material/IconButton';
import SvgIcon from '@mui/material/SvgIcon';
import { useColorScheme } from '@mui/material/styles';
import { content } from '../content';

// Ambos iconos viajan en el HTML y el CSS muestra uno segun el esquema activo.
// Asi el servidor y el cliente renderizan lo mismo y no hay desajuste de hidratacion.
const ocultarEn = (esquema: 'light' | 'dark') => ({
  display: 'block',
  '.dark &': esquema === 'dark' ? { display: 'none' } : undefined,
  '.light &': esquema === 'light' ? { display: 'none' } : undefined,
});

export default function ThemeToggle() {
  const { mode, systemMode, setMode } = useColorScheme();
  // Con mode "system" el esquema real lo da systemMode.
  const actual = mode === 'system' ? systemMode : mode;

  return (
    <IconButton
      aria-label={content.interfaz.cambiarTema}
      onClick={() => setMode(actual === 'dark' ? 'light' : 'dark')}
      color="inherit"
    >
      {/* Luna: se ve en esquema claro. */}
      <SvgIcon sx={ocultarEn('dark')} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </SvgIcon>
      {/* Sol: se ve en esquema oscuro. */}
      <SvgIcon sx={ocultarEn('light')} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </SvgIcon>
    </IconButton>
  );
}
