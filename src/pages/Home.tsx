import About from '../components/sections/About';
import Cases from '../components/sections/Cases';
import Hero from '../components/sections/Hero';
import Highlights from '../components/sections/Highlights';
import Process from '../components/sections/Process';
import Services from '../components/sections/Services';
import { content } from '../content';
import { metaPagina } from '../lib/meta';

export function meta() {
  return metaPagina({
    titulo: content.sitio.titulo,
    descripcion: content.sitio.descripcion,
    imagen: '/og/general.png',
  });
}

// Falta Contacto: llega en el siguiente commit, que fija el orden final.
export default function Home() {
  return (
    <>
      <Hero />
      <Highlights />
      <Services />
      <Cases />
      <Process />
      <About />
    </>
  );
}
