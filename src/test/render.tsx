import { ThemeProvider } from '@mui/material/styles';
import { render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { MemoryRouter } from 'react-router';
import { theme } from '../theme';

// Muestra un componente con el tema real y un enrutador en memoria (los enlaces necesitan ambos).
export function mostrarConTema(ui: ReactElement) {
  return render(
    <ThemeProvider theme={theme}>
      <MemoryRouter>{ui}</MemoryRouter>
    </ThemeProvider>,
  );
}
