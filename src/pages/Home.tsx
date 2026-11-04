import Cases from '../components/sections/Cases';
import Hero from '../components/sections/Hero';
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

// Faltan Experiencia y Contacto: llegan en el slice 3 (el orden final lo fija ese slice).
export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Cases />
      <Stack />
    </>
  );
}
