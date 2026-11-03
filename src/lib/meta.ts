interface DatosMeta {
  titulo: string;
  descripcion: string;
  imagen: string;
  noindex?: boolean;
}

// Etiquetas <title> y Open Graph de una ruta. Quedan en el HTML prerenderizado,
// que es lo que leen LinkedIn y WhatsApp (no ejecutan JavaScript).
export function metaPagina({ titulo, descripcion, imagen, noindex }: DatosMeta) {
  return [
    { title: titulo },
    { name: 'description', content: descripcion },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: titulo },
    { property: 'og:description', content: descripcion },
    { property: 'og:image', content: imagen },
    ...(noindex ? [{ name: 'robots', content: 'noindex' }] : []),
  ];
}
