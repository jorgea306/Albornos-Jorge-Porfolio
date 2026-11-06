import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { content } from '../../content';
import { mostrarConTema } from '../../test/render';
import About from './About';

const { sobreMi } = content.inicio;
const fotoReal = { ...sobreMi.foto, pendiente: false };
const cvReal = { ...sobreMi.cv, pendiente: false };

describe('About', () => {
  it('muestra el encabezado, dos párrafos que nombran a Extrados y no tiene sección Experiencia', () => {
    mostrarConTema(<About />);
    expect(screen.getByText('04 / SOBRE MÍ')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Jorge Albornos' })).toBeInTheDocument();
    expect(sobreMi.parrafos).toHaveLength(2);
    for (const parrafo of sobreMi.parrafos) expect(screen.getByText(parrafo)).toBeInTheDocument();
    expect(sobreMi.parrafos.join(' ')).toContain('Extrados');
    expect(screen.queryByText(/experiencia/i)).not.toBeInTheDocument();
  });

  it('enlaza GitHub al perfil y LinkedIn a la URL de content.ts', () => {
    mostrarConTema(<About />);
    expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute('href', 'https://github.com/jorgea306');
    expect(screen.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute('href', content.redes.linkedin.url);
  });

  it('sin foto ni CV: no hay imagen de retrato, ni botón de CV, y se ve el avatar con iniciales', () => {
    const { container } = mostrarConTema(<About />);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(container.querySelector('img')).toBeNull();
    expect(screen.queryByRole('link', { name: sobreMi.cv.texto })).not.toBeInTheDocument();
    expect(screen.getByText(content.navegacion.logo)).toHaveAttribute('aria-hidden', 'true');
  });

  it('con foto y CV: muestra la imagen con ancho y alto y el enlace de descarga', () => {
    const { container } = mostrarConTema(<About foto={fotoReal} cv={cvReal} />);
    const imagen = screen.getByRole('img', { name: fotoReal.alt });
    expect(imagen).toHaveAttribute('width', String(fotoReal.ancho));
    expect(imagen).toHaveAttribute('height', String(fotoReal.alto));
    expect(imagen).toHaveAttribute('src', `/${fotoReal.archivo}`);
    const descarga = screen.getByRole('link', { name: cvReal.texto });
    expect(descarga).toHaveAttribute('href', `/${cvReal.archivo}`);
    expect(descarga).toHaveAttribute('download');
    expect(container.querySelectorAll('img')).toHaveLength(1);
  });

  it('incluye la tarjeta de Stack sin un h2 propio', () => {
    mostrarConTema(<About />);
    expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(1);
    expect(screen.getByRole('heading', { level: 3, name: content.inicio.stack.titulo })).toBeInTheDocument();
  });
});
