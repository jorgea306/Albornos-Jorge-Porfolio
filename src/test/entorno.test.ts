import { describe, expect, it } from 'vitest';

describe('entorno de pruebas', () => {
  it('corre Vitest con jsdom y los matchers de jest-dom', () => {
    document.body.innerHTML = '<p>hola</p>';
    expect(document.querySelector('p')).toBeInTheDocument();
  });
});
