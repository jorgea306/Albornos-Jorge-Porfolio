import Button from '@mui/material/Button';
import type { Route } from './+types/Home';

export function meta(_: Route.MetaArgs) {
  return [
    { title: 'Inicio | Portfolio' },
    { property: 'og:title', content: 'Inicio | Portfolio' },
    { property: 'og:image', content: '/og/general.png' },
  ];
}

export default function Home() {
  return <Button variant="contained">Spike inicio</Button>;
}
