// Tipos de src/content.ts. Contrato definido en el diseno (sdd/portfolio/design).

export type DiagramId = 'carga-masiva' | 'agentes-multiempresa' | 'dallas-note' | 'api-usuarios';

export interface Metrica {
  etiqueta: string;
  antes?: string;
  despues: string;
  // 'estimado' obliga a rotular el valor como estimado (lo verifica content.test.ts).
  tipo: 'medido' | 'estimado';
}

export interface Medio {
  tipo: 'imagen' | 'video';
  // Nombre del archivo dentro de public/casos/<slug>/.
  archivo: string;
  alt: string;
  poster?: string;
  ancho: number;
  alto: number;
  // true mientras Jorge no exporte el archivo: la pagina muestra un placeholder.
  pendiente: boolean;
}

export interface Caso {
  slug: string;
  titulo: string;
  resumen: string;
  estado: 'publicado' | 'en-desarrollo';
  variante: 'completa' | 'corta';
  problema: string;
  tecnologias: string[];
  arquitectura?: {
    diagrama: DiagramId;
    descripcion: string;
    etiquetas: Record<string, string>;
  };
  decisiones?: string[];
  resultados?: Metrica[];
  medios: Medio[];
  seo: { titulo: string; descripcion: string; ogImagen: string };
}

export interface Contenido {
  sitio: Sitio;
  interfaz: TextosInterfaz;
  noEncontrado: TextosNoEncontrado;
  casos: Caso[];
}

export interface Sitio {
  nombre: string;
  titulo: string;
  descripcion: string;
  // URL publica absoluta (para Open Graph). Pendiente hasta conocer el dominio de *.vercel.app.
  url: string;
}

export interface TextosInterfaz {
  cambiarTema: string;
  pie: string;
}

export interface TextosNoEncontrado {
  titulo: string;
  descripcion: string;
  enlace: string;
  seoTitulo: string;
}
