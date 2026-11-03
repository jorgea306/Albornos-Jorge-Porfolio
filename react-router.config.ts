import type { Config } from '@react-router/dev/config';

// Provisorio (tarea 1.2): se reemplaza en 1.8 por los slugs de src/content.ts.
const rutasPrerender = ['/', '/casos/carga-masiva-productos'];

export default {
  appDirectory: 'src',
  // Sin servidor en produccion: solo HTML estatico prerenderizado en build/client.
  ssr: false,
  prerender: async () => rutasPrerender,
} satisfies Config;
