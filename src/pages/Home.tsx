import Cases from '../components/sections/Cases';
import Hero from '../components/sections/Hero';
import Highlights from '../components/sections/Highlights';
import Services from '../components/sections/Services';
import StackCard from '../components/sections/StackCard';
import { content } from '../content';
import { metaPagina } from '../lib/meta';

export function meta() {
  return metaPagina({
    titulo: content.sitio.titulo,
    descripcion: content.sitio.descripcion,
    imagen: '/og/general.png',
  });
}

// Transitorio: la tarjeta de Stack queda suelta hasta que Sobre mí la incluya (siguiente commit).
export default function Home() {
  return (
    <>
      <Hero />
      <Highlights />
      <Services />
      <Cases />
      <StackCard />
    </>
  );
}
