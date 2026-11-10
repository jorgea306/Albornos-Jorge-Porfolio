import { ThemeProvider } from '@mui/material/styles';
import { render, screen } from '@testing-library/react';
import { createRoutesStub } from 'react-router';
import { describe, expect, it } from 'vitest';
import { content } from '../content';
import { theme } from '../theme';
import CaseDetail from './CaseDetail';
import NotFound from './NotFound';

function abrir(ruta: string) {
  // CaseDetail recibe `params` de React Router; el stub lo entrega igual que en la app real.
  const Stub = createRoutesStub([
    { path: '/casos/:slug', Component: CaseDetail as never },
    { path: '*', Component: NotFound },
  ]);
  render(
    <ThemeProvider theme={theme}>
      <Stub initialEntries={[ruta]} />
    </ThemeProvider>,
  );
}

describe('pagina 404', () => {
  it('un slug desconocido muestra la 404 con enlace al inicio', () => {
    abrir('/casos/no-existe');
    expect(screen.getByRole('heading', { name: content.noEncontrado.titulo })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: content.noEncontrado.enlace })).toHaveAttribute('href', '/');
  });

  it('una ruta cualquiera muestra la misma 404', () => {
    abrir('/cualquier-cosa');
    expect(screen.getByRole('heading', { name: content.noEncontrado.titulo })).toBeInTheDocument();
  });

  it('un slug existente muestra el caso y no la 404', () => {
    abrir('/casos/dallas-note');
    expect(screen.getByRole('heading', { name: 'Dallas Note' })).toBeInTheDocument();
    expect(screen.queryByText(content.noEncontrado.titulo)).not.toBeInTheDocument();
  });
});
