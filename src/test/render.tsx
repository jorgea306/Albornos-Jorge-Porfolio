import { ThemeProvider } from '@mui/material/styles';
import { render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { MemoryRouter } from 'react-router';
import { theme } from '../theme';

// Muestra un componente con el tema real y un enrutador en memoria (los enlaces necesitan ambos).
// `ruta` fija la dirección inicial: la barra elige su variante según ella.
export function mostrarConTema(ui: ReactElement, ruta = '/') {
  return render(
    <ThemeProvider theme={theme}>
      <MemoryRouter initialEntries={[ruta]}>{ui}</MemoryRouter>
    </ThemeProvider>,
  );
}
