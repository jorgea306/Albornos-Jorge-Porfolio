import Button from '@mui/material/Button';
import type { Route } from './+types/CaseDetail';

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `Caso ${params.slug} | Portfolio` },
    { property: 'og:title', content: `Caso ${params.slug}` },
    { property: 'og:image', content: '/og/general.png' },
  ];
}

export default function CaseDetail() {
  return <Button variant="contained">Spike caso</Button>;
}
