import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SvgIcon from '@mui/material/SvgIcon';
import { useId, useState } from 'react';
import { Link as RouterLink } from 'react-router';
import { content } from '../../content';

const { navegacion } = content;

// Menú de los 4 enlaces bajo 900 px. El Menu de MUI ya cierra con Escape, cierra al elegir un item
// y devuelve el foco al botón que lo abrió.
export default function NavMenu() {
  const [ancla, setAncla] = useState<HTMLElement | null>(null);
  const idMenu = useId();
  const abierto = Boolean(ancla);
  const cerrar = () => setAncla(null);

  return (
    <>
      <IconButton
        aria-label={navegacion.abrirMenu}
        aria-haspopup="true"
        aria-expanded={abierto}
        aria-controls={abierto ? idMenu : undefined}
        onClick={(evento) => setAncla(evento.currentTarget)}
        color="inherit"
        sx={{ display: { md: 'none' } }}
      >
        <SvgIcon fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
          <path d="M4 7h16M4 12h16M4 17h16" />
        </SvgIcon>
      </IconButton>
      <Menu id={idMenu} anchorEl={ancla} open={abierto} onClose={cerrar}>
        {navegacion.enlaces.map((enlace) => (
          <MenuItem
            key={enlace.ancla}
            component={RouterLink}
            to={{ pathname: '/', hash: enlace.ancla }}
            onClick={cerrar}
            sx={{ minHeight: 44 }}
          >
            {enlace.texto}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
