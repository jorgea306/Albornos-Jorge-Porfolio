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
  navegacion: Navegacion;
  redes: Redes;
  inicio: Inicio;
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

// Textos de las secciones del Inicio. `id` es el ancla a la que apuntan los botones del Hero.
export interface Enlace {
  texto: string;
  destino: string;
}

// Cabecera de una seccion del Inicio: etiqueta mono ("01 / SERVICIOS"), titulo h2 y bajada opcional.
export interface Encabezado {
  etiqueta: string;
  titulo: string;
  bajada?: string;
}

// Cada linea indica su rol con texto (etiqueta), no solo con color. El tipo solo cambia el estilo.
export interface LineaEjemplo {
  tipo: 'comando' | 'entrada' | 'evento' | 'salida' | 'ok';
  etiqueta?: string;
  texto: string;
}

// Consola o terminal ficticio. El rotulo "Ejemplo ilustrativo" lo pone el componente (interfaz.ejemploIlustrativo).
export interface EjemploIlustrativo {
  titulo: string;
  lineas: LineaEjemplo[];
  // Continua el rotulo: se muestra como "Ejemplo ilustrativo <leyenda>".
  leyenda: string;
}

export interface TextosHero {
  etiqueta: string;
  titulo: string;
  principal: Enlace;
  secundario: Enlace;
}

export type IconoServicio = 'agente' | 'api' | 'interfaz' | 'automatizacion';

export interface Servicio {
  titulo: string;
  descripcion: string;
  icono: IconoServicio;
  etiquetas: string[];
}

export interface TextosServicios {
  id: string;
  encabezado: Encabezado;
  items: Servicio[];
}

export interface TextosCasos {
  id: string;
  titulo: string;
  introduccion: string;
  enDesarrollo: string;
  verCaso: string;
}

export interface GrupoStack {
  titulo: string;
  tecnologias: string[];
}

export interface TextosStack {
  id: string;
  titulo: string;
  grupos: GrupoStack[];
}

export interface Inicio {
  hero: TextosHero;
  servicios: TextosServicios;
  casos: TextosCasos;
  stack: TextosStack;
}

export interface TextosInterfaz {
  cambiarTema: string;
  ejemploIlustrativo: string;
  pie: string;
}

export interface TextosNoEncontrado {
  titulo: string;
  descripcion: string;
  enlace: string;
  seoTitulo: string;
}

// Anclas fijas del Inicio. La barra y el pie enlazan a ellas con un enlace del tipo "/#casos" desde cualquier ruta.
export type Ancla = 'inicio' | 'servicios' | 'casos' | 'proceso' | 'sobre-mi' | 'contacto';

export interface EnlaceAncla {
  texto: string;
  ancla: Ancla;
}

// Textos de la barra fija, el menu movil, las migas, el pie y el enlace para saltar al contenido.
export interface Navegacion {
  // Iniciales del logo; el nombre completo va en sitio.nombre.
  logo: string;
  irAlInicio: string;
  etiquetaSecciones: string;
  enlaces: EnlaceAncla[];
  hablemos: string;
  abrirMenu: string;
  volverArriba: string;
  todosLosCasos: string;
  saltarAlContenido: string;
  migas: { etiqueta: string; casos: string };
}

export interface EnlaceExterno {
  texto: string;
  url: string;
}

export interface Redes {
  linkedin: EnlaceExterno;
  github: EnlaceExterno;
}
