import { fireEvent, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { content } from '../../content';
import { mostrarConTema } from '../../test/render';
import Contact from './Contact';

const { contacto } = content.inicio;

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('Contact', () => {
  it('muestra la pregunta y la frase de la spec', () => {
    mostrarConTema(<Contact />);
    expect(
      screen.getByRole('heading', { level: 2, name: '¿Qué tarea te gustaría no volver a hacer a mano?' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Contame en dos líneas y te respondo con una propuesta concreta.')).toBeInTheDocument();
  });

  it('enlaza el teléfono con tel: y WhatsApp con wa.me', () => {
    mostrarConTema(<Contact />);
    expect(screen.getByRole('link', { name: contacto.telefono.texto })).toHaveAttribute('href', 'tel:+5493834400061');
    expect(screen.getByRole('link', { name: contacto.whatsapp.texto })).toHaveAttribute(
      'href',
      'https://wa.me/5493834400061',
    );
  });

  it('copia jorgea306@gmail.com al portapapeles y anuncia "Email copiado"', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal('navigator', { ...navigator, clipboard: { writeText } });
    mostrarConTema(<Contact />);
    fireEvent.click(screen.getByRole('button', { name: contacto.copiar }));
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('Email copiado'));
    expect(writeText).toHaveBeenCalledWith('jorgea306@gmail.com');
  });

  it('sin portapapeles no lanza error, avisa por texto y deja el email visible', async () => {
    vi.stubGlobal('navigator', { ...navigator, clipboard: undefined });
    mostrarConTema(<Contact />);
    fireEvent.click(screen.getByRole('button', { name: contacto.copiar }));
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent(contacto.copiarFallo));
    expect(screen.getByText('jorgea306@gmail.com')).toBeVisible();
  });

  it('con el permiso denegado también avisa por texto', async () => {
    const writeText = vi.fn().mockRejectedValue(new DOMException('denegado', 'NotAllowedError'));
    vi.stubGlobal('navigator', { ...navigator, clipboard: { writeText } });
    mostrarConTema(<Contact />);
    fireEvent.click(screen.getByRole('button', { name: contacto.copiar }));
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent(contacto.copiarFallo));
  });

  it('no tiene formulario ni textos de agenda', () => {
    const { container } = mostrarConTema(<Contact />);
    expect(container.querySelector('form')).toBeNull();
    expect(container.textContent).not.toMatch(/agendar|llamada de 20 min/i);
  });
});
