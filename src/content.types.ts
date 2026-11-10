// Tipos de src/content.ts. Contrato definido en el diseno (sdd/portfolio/design).

export type DiagramId = 'carga-masiva' | 'agentes-multiempresa' | 'dallas-note' | 'api-usuarios';

// Una tarjeta de resultado: un número y lo que significa. Sin "antes/después": el valor estimado es su propia tarjeta.
export interface Metrica {
  valor: string;
  etiqueta: string;
  // 'estimado' obliga a rotular el valor como estimado (lo verifica content.test.ts).
  tipo: 'medido' | 'estimado';
}

// Fila de datos bajo el título del detalle. Un dato desconocido lleva COMPLETAR.
export interface MetadatosCaso {
  rol: string;
  stack: string[];
  duracion: string;
  estado: string;
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
  // Etiquetas cortas de la tarjeta del Inicio (tecnologías o rubro).
  chips?: string[];
  // Solo el caso destacado del Inicio: los tres bloques PROBLEMA / SOLUCIÓN / RESULTADO.
  destacado?: { problema: string; solucion: string; resultado: string };
  // Solo el caso destacado: texto del panel de progreso (accesible) y avance de la barra decorativa, de 0 a 100.
  progreso?: { texto: string; valor: number };
  // Espacio de imagen de la tarjeta del Inicio; `pendiente` mientras falte el archivo.
  imagenTarjeta?: Medio;
  // Título largo del h1 del detalle (el corto, `titulo`, queda para tarjetas y migas) y bajada que lo acompaña.
  tituloLargo: string;
  bajada: string;
  metadatos: MetadatosCaso;
  problema: string;
  // Decisiones de "La solución": una viñeta por decisión. El stack vive en `metadatos`, no en una sección propia.
  solucion: string[];
  // Terminal ilustrativo de "La solución" (solo el Caso A).
  terminal?: EjemploIlustrativo;
  arquitectura?: {
    diagrama: DiagramId;
    descripcion: string;
    etiquetas: Record<string, string>;
  };
  resultados?: Metrica[];
  aprendizajes: string[];
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
  detalle: TextosDetalle;
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
  // El texto resaltado va dentro del mismo h1, para que se lea como una sola frase.
  titulo: { antes: string; resaltado: string; despues: string };
  descripcion: string;
  principal: Enlace;
  secundario: Enlace;
  consola: EjemploIlustrativo;
}

export interface DatoDestacado {
  valor: string;
  descripcion: string;
}

export interface TextosDestacados {
  // Nombre accesible de la franja (no tiene titulo visible).
  etiqueta: string;
  items: DatoDestacado[];
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
  encabezado: Encabezado;
  // Chip del caso destacado.
  destacado: string;
  rotulos: { problema: string; solucion: string; resultado: string };
  leerCompleto: string;
  // Texto de cierre de las tarjetas con enlace.
  verCaso: string;
  // Rótulo del recuadro que ocupa el lugar de una captura que todavía no existe.
  imagenPendiente: string;
  // Bloque de los casos en desarrollo: se muestran como enlaces, no como tarjetas.
  laboratorio: { titulo: string; etiqueta: string };
}

export interface GrupoStack {
  titulo: string;
  tecnologias: string[];
}

// El Stack ya no es una sección: vive dentro de Sobre mí, así que no tiene ancla ni h2 propio.
export interface TextosStack {
  titulo: string;
  grupos: GrupoStack[];
}

export interface PasoProceso {
  titulo: string;
  descripcion: string;
}

// El número de cada paso sale de su posición en `pasos`; no se guarda.
export interface TextosProceso {
  id: string;
  encabezado: Encabezado;
  pasos: PasoProceso[];
}

// Archivo descargable (CV). Se ofrece solo si `pendiente` es false, o sea, si el archivo ya está en public/.
export interface Descarga {
  // Nombre del archivo dentro de public/.
  archivo: string;
  texto: string;
  pendiente: boolean;
}

export interface TextosSobreMi {
  id: string;
  encabezado: { etiqueta: string; titulo: string };
  // Título técnico: queda como COMPLETAR hasta que Jorge lo confirme.
  subtitulo: string;
  parrafos: string[];
  // Foto de perfil: `archivo` es el nombre dentro de public/. Con `pendiente` en true se muestra el avatar con iniciales.
  foto: Medio;
  cv: Descarga;
}

export interface TextosContacto {
  id: string;
  // Pregunta del bloque (h2) y frase que la acompaña.
  titulo: string;
  bajada: string;
  telefono: EnlaceExterno;
  whatsapp: EnlaceExterno;
  email: string;
  copiar: string;
  copiado: string;
  copiarFallo: string;
}

export interface Inicio {
  hero: TextosHero;
  destacados: TextosDestacados;
  servicios: TextosServicios;
  casos: TextosCasos;
  proceso: TextosProceso;
  sobreMi: TextosSobreMi;
  stack: TextosStack;
  contacto: TextosContacto;
}

export interface TextosInterfaz {
  cambiarTema: string;
  ejemploIlustrativo: string;
  pie: string;
}

export interface SeccionDetalle {
  // Ancla del artículo; el índice lateral del slice 7b enlaza a ella.
  id: string;
  titulo: string;
}

// Textos fijos de la plantilla de detalle de caso. El número de cada artículo sale de su posición.
export interface TextosDetalle {
  // Etiquetas de la fila de metadatos.
  metadatos: { rol: string; stack: string; duracion: string; estado: string };
  // Nombre accesible de la fila de tarjetas de resultado.
  resultados: string;
  // Rótulo que acompaña a la métrica de tipo `estimado`.
  estimado: string;
  secciones: { problema: SeccionDetalle; solucion: SeccionDetalle; funciona: SeccionDetalle; aprendizajes: SeccionDetalle };
  // Subtítulo de la lista de decisiones dentro de "La solución".
  decisiones: string;
  // Rótulo y nombre accesible del índice lateral del detalle.
  indice: string;
  // Rótulo de la tarjeta que lleva al caso siguiente.
  siguiente: string;
  // Rótulo del recuadro que ocupa el lugar de la imagen o el video principal mientras falta el archivo.
  medioPendiente: string;
  // Tarjeta final con enlace a #contacto.
  cta: { pregunta: string; accion: string };
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
