import Cases from '../components/sections/Cases';
import Hero from '../components/sections/Hero';
import Highlights from '../components/sections/Highlights';
import Services from '../components/sections/Services';
import Stack from '../components/sections/Stack';
import { content } from '../content';
import { metaPagina } from '../lib/meta';

export function meta() {
  return metaPagina({
    titulo: content.sitio.titulo,
    descripcion: content.sitio.descripcion,
    imagen: '/og/general.png',
  });
}

// Faltan Proceso, Sobre mí y Contacto: llegan en el slice 6, que fija el orden final.
export default function Home() {
  return (
    <>
      <Hero />
      <Highlights />
      <Services />
      <Cases />
      <Stack />
    </>
  );
}
