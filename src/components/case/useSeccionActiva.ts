import { useEffect, useState } from 'react';
import { ALTURA_BARRA } from '../../theme';

// Devuelve el id de la sección que se está leyendo. Sirve al índice lateral del detalle y, en el slice 9, a la barra.
// Parte siempre del primer id: así el HTML del prerender y el primer render del cliente son iguales (sin desajuste de hidratación)
// y el valor solo cambia después, dentro del efecto, cuando el navegador ya puede observar el scroll.
export function useSeccionActiva(ids: string[]): string {
  const [activa, setActiva] = useState(ids[0] ?? '');
  const clave = ids.join('|');

  useEffect(() => {
    // Sin IntersectionObserver el índice queda en la primera entrada; sus enlaces siguen funcionando.
    if (typeof IntersectionObserver === 'undefined') return;
    const lista = clave.split('|');
    const visibles = new Set<string>();
    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (entrada.isIntersecting) visibles.add(entrada.target.id);
          else visibles.delete(entrada.target.id);
        }
        // Gana la primera sección visible en el orden de la página; si ninguna lo está (entre dos artículos), se conserva la anterior.
        const primera = lista.find((id) => visibles.has(id));
        if (primera) setActiva(primera);
      },
      // La franja de lectura empieza bajo la barra fija y termina a mitad de pantalla.
      { rootMargin: `-${ALTURA_BARRA + 8}px 0px -55% 0px` },
    );
    for (const id of lista) {
      const elemento = document.getElementById(id);
      if (elemento) observador.observe(elemento);
    }
    return () => observador.disconnect();
  }, [clave]);

  return activa;
}
