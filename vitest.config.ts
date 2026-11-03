import { defineConfig } from 'vitest/config';

// Configuracion aparte de vite.config.ts: el plugin de React Router no corre en las pruebas.
export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
  },
});
