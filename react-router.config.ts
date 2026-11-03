import type { Config } from '@react-router/dev/config';
import { content } from './src/content';

// Las rutas a prerenderizar salen de src/content.ts: un caso nuevo suma su pagina sin tocar el router.
const rutasPrerender = ['/', ...content.casos.map((caso) => `/casos/${caso.slug}`)];

export default {
  appDirectory: 'src',
  // Sin servidor en produccion: solo HTML estatico prerenderizado en build/client.
  ssr: false,
  prerender: async () => rutasPrerender,
} satisfies Config;
