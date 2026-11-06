import About from '../components/sections/About';
import Cases from '../components/sections/Cases';
import Contact from '../components/sections/Contact';
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

// Orden final del Inicio (sec R1). El pie vive en root.tsx, así que no figura acá.
export default function Home() {
  return (
    <>
      <Hero />
      <Highlights />
      <Services />
      <Cases />
      <Process />
      <About />
      <Contact />
    </>
  );
}
