import type { Ancla, Caso, Contenido, Medio } from './content.types';

// Marca todo dato que falta. content.test.ts y, mas adelante, scripts/listar-pendientes.mjs lo buscan.
export const COMPLETAR = '[COMPLETAR]';

const OG_GENERAL = '/og/general.png';

// Anclas de las secciones del Inicio. La barra, el pie y los botones del Hero apuntan a ellas.
const ANCLA = {
  inicio: 'inicio',
  servicios: 'servicios',
  casos: 'casos',
  proceso: 'proceso',
  sobreMi: 'sobre-mi',
  contacto: 'contacto',
} satisfies Record<string, Ancla>;

// Espacio de imagen de una tarjeta del Inicio. Mientras Jorge no exporte la captura queda `pendiente`
// y la tarjeta muestra un recuadro rotulado en lugar de una imagen rota.
function imagenTarjeta(alt: string): Medio {
  return { tipo: 'imagen', archivo: 'tarjeta.webp', alt, ancho: 800, alto: 450, pendiente: true };
}

// Los textos largos de cada caso se completan en los slices 7 y 8; aqui la identidad, el estado y lo que muestra el Inicio.
function casoBase(
  datos: Pick<Caso, 'slug' | 'titulo' | 'resumen' | 'estado' | 'variante'> &
    Partial<Omit<Caso, 'slug' | 'titulo' | 'resumen' | 'estado' | 'variante' | 'seo' | 'medios'>>,
): Caso {
  // Valores por defecto: lo que no se pasa queda como pendiente. Los datos recibidos pisan estos valores.
  return {
    tituloLargo: datos.titulo,
    bajada: datos.resumen,
    metadatos: {
      rol: COMPLETAR,
      stack: [],
      duracion: COMPLETAR,
      estado: datos.estado === 'en-desarrollo' ? 'En desarrollo' : COMPLETAR,
    },
    problema: COMPLETAR,
    solucion: [],
    aprendizajes: [],
    medios: [],
    ...datos,
    seo: { titulo: datos.titulo, descripcion: datos.resumen, ogImagen: OG_GENERAL },
  };
}

export const content: Contenido = {
  sitio: {
    nombre: 'Jorge Albornos',
    titulo: 'Jorge Albornos | Agentes de IA y automatizaciones',
    descripcion:
      'Desarrollador full stack freelance en Córdoba, Argentina. Agentes de IA, APIs y automatizaciones que le ahorran horas de trabajo a tu negocio.',
    url: COMPLETAR,
  },
  navegacion: {
    logo: 'JA',
    irAlInicio: 'Jorge Albornos, ir al inicio',
    etiquetaSecciones: 'Secciones del sitio',
    enlaces: [
      { texto: 'Servicios', ancla: ANCLA.servicios },
      { texto: 'Casos', ancla: ANCLA.casos },
      { texto: 'Proceso', ancla: ANCLA.proceso },
      { texto: 'Sobre mí', ancla: ANCLA.sobreMi },
    ],
    hablemos: 'Hablemos',
    abrirMenu: 'Abrir el menú de secciones',
    volverArriba: 'Volver arriba',
    todosLosCasos: '← Todos los casos',
    saltarAlContenido: 'Saltar al contenido',
    migas: { etiqueta: 'Migas de pan', casos: 'Casos' },
  },
  redes: {
    linkedin: { texto: 'LinkedIn', url: COMPLETAR },
    github: { texto: 'GitHub', url: 'https://github.com/jorgea306' },
  },
  inicio: {
    hero: {
      etiqueta: 'Disponible para proyectos · Córdoba, Argentina',
      titulo: {
        antes: 'Agentes de IA y automatizaciones que le ',
        resaltado: 'devuelven horas',
        despues: ' a tu negocio.',
      },
      descripcion:
        'Desarrollador full stack especializado en backend con NestJS y en orquestación de agentes de IA. Conecto tus sistemas, automatizo lo repetitivo y dejo registro de cada acción.',
      principal: { texto: 'Ver casos', destino: `#${ANCLA.casos}` },
      secundario: { texto: 'Contame tu problema', destino: `#${ANCLA.contacto}` },
      // Datos ficticios: ningún nombre, producto ni precio pertenece a un cliente real.
      consola: {
        titulo: 'agente-ferreteria · log',
        leyenda: 'del flujo de un agente con herramientas y auditoría',
        lineas: [
          { tipo: 'entrada', etiqueta: 'consulta', texto: 'WhatsApp: ¿Tienen tornillos para madera de 4 x 40? ¿Cuánto salen 200?' },
          { tipo: 'evento', etiqueta: 'intención', texto: 'consulta_stock' },
          { tipo: 'evento', etiqueta: 'herramienta', texto: 'buscar_producto("tornillo madera 4 x 40") → 1 resultado, 850 en stock' },
          { tipo: 'evento', etiqueta: 'herramienta', texto: 'calcular_precio(cantidad: 200) → $ 18.400' },
          { tipo: 'salida', etiqueta: 'respuesta', texto: 'Hay stock. 200 tornillos salen $ 18.400. ¿Te los reservo?' },
          { tipo: 'ok', etiqueta: 'auditoría', texto: '#a91f · 3 acciones registradas' },
        ],
      },
    },
    // Los tres últimos datos no están confirmados por Jorge: llevan COMPLETAR y npm run verify los marca.
    destacados: {
      etiqueta: 'Datos destacados',
      items: [
        { valor: '652', descripcion: 'productos cargados en 6,5 minutos con un script' },
        { valor: `4+ años ${COMPLETAR}`, descripcion: 'desarrollando software en producción' },
        { valor: `Tech Lead ${COMPLETAR}`, descripcion: 'experiencia liderando el frontend en React' },
        { valor: `Multiempresa ${COMPLETAR}`, descripcion: 'agentes con datos aislados y acciones auditadas' },
      ],
    },
    servicios: {
      id: ANCLA.servicios,
      encabezado: {
        etiqueta: '01 / SERVICIOS',
        titulo: 'Qué puedo resolver para vos',
        bajada:
          'Desde un script que ahorra una tarde de carga manual hasta una plataforma de agentes para varias empresas.',
      },
      items: [
        {
          titulo: 'Agentes de IA',
          descripcion:
            'Asistentes que atienden consultas y ejecutan tareas dentro de tus sistemas, con registro de cada acción.',
          icono: 'agente',
          etiquetas: ['WhatsApp', 'Web', 'Herramientas'],
        },
        {
          titulo: 'APIs con NestJS y Node',
          descripcion:
            'Servicios de backend que conectan tu negocio con otras aplicaciones, con acceso seguro y datos ordenados.',
          icono: 'api',
          etiquetas: ['REST', 'JWT', 'OAuth2'],
        },
        {
          titulo: 'Interfaces con React',
          descripcion: 'Paneles y sitios web rápidos, pensados para verse bien en el celular y en la computadora.',
          icono: 'interfaz',
          etiquetas: ['Dashboards', 'Landings', 'Apps'],
        },
        {
          titulo: 'Automatizaciones',
          descripcion:
            'Tareas repetitivas que se ejecutan solas: cargas de datos, avisos e integraciones entre sistemas.',
          icono: 'automatizacion',
          etiquetas: ['Scripts', 'Webhooks', 'Cron'],
        },
      ],
    },
    casos: {
      id: ANCLA.casos,
      encabezado: {
        etiqueta: '02 / CASOS',
        titulo: 'Problema, solución, resultado',
        bajada: 'Cada caso explica el problema, cómo se resolvió y qué resultado dejó.',
      },
      destacado: 'Caso destacado',
      rotulos: { problema: 'PROBLEMA', solucion: 'SOLUCIÓN', resultado: 'RESULTADO' },
      leerCompleto: 'Leer el caso completo',
      verCaso: 'Ver caso',
      imagenPendiente: 'Captura pendiente',
      laboratorio: { titulo: 'Laboratorio', etiqueta: 'EN DESARROLLO' },
    },
    proceso: {
      id: ANCLA.proceso,
      encabezado: {
        etiqueta: '03 / CÓMO TRABAJO',
        titulo: 'De la charla al sistema funcionando',
      },
      pasos: [
        {
          titulo: 'Diagnóstico',
          descripcion: 'Entiendo qué tarea te consume tiempo y qué sistemas intervienen antes de proponer nada.',
        },
        {
          titulo: 'Prototipo',
          descripcion: 'Armo una versión mínima que resuelve un caso real, para que la veas funcionando.',
        },
        {
          titulo: 'Implementación',
          descripcion: 'Lo integro con tus sistemas, con pruebas automáticas y registro de cada acción.',
        },
        {
          titulo: 'Acompañamiento',
          descripcion: 'Reviso los resultados después de la entrega y ajusto lo que haga falta.',
        },
      ],
    },
    // Textos de la bio provisorios: Jorge debe confirmarlos. El primer párrafo lleva COMPLETAR hasta que lo apruebe, así npm run verify bloquea la publicación. El título técnico y los archivos de foto y CV siguen pendientes.
    sobreMi: {
      id: ANCLA.sobreMi,
      encabezado: { etiqueta: '04 / SOBRE MÍ', titulo: 'Jorge Albornos' },
      subtitulo: `Técnico Superior en Desarrollo de Software ${COMPLETAR}`,
      parrafos: [
        `Soy desarrollador full stack y trabajo desde Córdoba, Argentina. En Extrados desarrollo software en producción, con foco en APIs de backend y en interfaces con React. ${COMPLETAR}`,
        'Hoy me dedico sobre todo a agentes de IA que usan herramientas y dejan registro de cada acción, y a automatizar tareas repetitivas para que un equipo recupere horas de trabajo.',
      ],
      foto: {
        tipo: 'imagen',
        archivo: 'retrato.webp',
        alt: 'Retrato de Jorge Albornos',
        ancho: 480,
        alto: 480,
        pendiente: true,
      },
      cv: { archivo: 'cv-jorge-albornos.pdf', texto: 'Descargar CV', pendiente: true },
    },
    // Orden de la spec (sec R10): Backend, IA, Frontend, Datos, Cloud.
    stack: {
      titulo: 'Stack',
      grupos: [
        { titulo: 'Backend', tecnologias: ['Node.js', 'NestJS', 'TypeScript', 'TypeORM', 'JWT y OAuth2'] },
        {
          titulo: 'IA',
          tecnologias: ['Agentes con herramientas', 'Webhooks', 'Auditoría de acciones', 'Multiempresa'],
        },
        { titulo: 'Frontend', tecnologias: ['React', 'TypeScript', 'Material UI', 'React Router'] },
        { titulo: 'Datos', tecnologias: ['MySQL', 'MongoDB', 'Firebase'] },
        { titulo: 'Cloud', tecnologias: ['AWS EC2', 'Vercel'] },
      ],
    },
    contacto: {
      id: ANCLA.contacto,
      titulo: '¿Qué tarea te gustaría no volver a hacer a mano?',
      bajada: 'Contame en dos líneas y te respondo con una propuesta concreta.',
      telefono: { texto: '+54 9 383 440-0061', url: 'tel:+5493834400061' },
      whatsapp: { texto: 'WhatsApp', url: 'https://wa.me/5493834400061' },
      email: 'jorgea306@gmail.com',
      copiar: 'Copiar email',
      copiado: 'Email copiado',
      copiarFallo: 'No se pudo copiar. Seleccioná el email y copialo a mano.',
    },
  },
  interfaz: {
    cambiarTema: 'Cambiar entre tema claro y oscuro',
    ejemploIlustrativo: 'Ejemplo ilustrativo',
    pie: '© 2026 Jorge Albornos · Córdoba, Argentina',
  },
  noEncontrado: {
    titulo: 'Página no encontrada',
    descripcion: 'La dirección que abriste no existe o cambió de lugar.',
    enlace: 'Ir al inicio',
    seoTitulo: 'Página no encontrada | Jorge Albornos',
  },
  detalle: {
    metadatos: { rol: 'Rol', stack: 'Stack', duracion: 'Duración', estado: 'Estado' },
    resultados: 'Resultados',
    indice: 'En este caso',
    siguiente: 'SIGUIENTE CASO →',
    secciones: {
      problema: { id: 'el-problema', titulo: 'El problema' },
      solucion: { id: 'la-solucion', titulo: 'La solución' },
      funciona: { id: 'como-funciona', titulo: 'Cómo funciona' },
      aprendizajes: { id: 'aprendizajes', titulo: 'Aprendizajes' },
    },
    decisiones: 'Decisiones',
    cta: { pregunta: '¿Tenés un problema parecido?', accion: 'Hablemos →' },
  },
  // El orden de este arreglo es el orden de las tarjetas del Inicio y de "Siguiente caso":
  // Caso A (destacado), Dallas Note, Plataforma de agentes y API de usuarios; los "en desarrollo" al final (Laboratorio).
  casos: [
    casoBase({
      slug: 'carga-masiva-productos',
      titulo: 'Carga masiva de productos',
      resumen:
        'Un script convierte una planilla de dos columnas en la carga completa de una tienda online: 652 productos en 6,5 minutos.',
      estado: 'publicado',
      variante: 'completa',
      chips: ['Node.js', 'E-commerce'],
      destacado: {
        problema:
          'Cargar a mano 652 productos en una tienda online llevaría unas 43 horas (estimado: 4 minutos por producto).',
        solucion:
          'Un script de Node.js lee una planilla de dos columnas y publica el catálogo completo, sin cargar nada a mano.',
        resultado: '652 productos en 6,5 minutos',
      },
      progreso: { texto: 'planilla.xlsx · 2 columnas → 652 / 652 productos · 6,5 min', valor: 100 },
      // Textos del detalle redactados como borrador (PROVISORIOS): Jorge confirma rol, duración, estado y redacción.
      tituloLargo: 'De una planilla de dos columnas a una tienda online completa en minutos',
      bajada:
        'Un script de Node.js convierte una planilla de dos columnas en el catálogo completo de una tienda online: 652 productos en 6,5 minutos.',
      metadatos: { rol: COMPLETAR, stack: ['Node.js'], duracion: COMPLETAR, estado: COMPLETAR },
      problema:
        'Una tienda online necesitaba publicar su catálogo de 652 productos. Cargarlos uno por uno desde el panel de la tienda llevaría unas 43 horas (estimado: 4 minutos por producto) y cualquier error de tipeo habría que corregirlo a mano.',
      solucion: [
        'La entrada es una planilla de solo dos columnas, para que preparar el catálogo no exija conocer el formato interno de la tienda.',
        'Un único script de Node.js hace todo el recorrido, de la planilla a la tienda publicada, sin pasos manuales en el medio.',
        'El script muestra su avance y cuántos productos cargó (652 de 652), así se comprueba de un vistazo que no quedó ninguno afuera.',
      ],
      terminal: {
        titulo: 'terminal · carga de productos',
        leyenda: 'de una carga masiva con un script',
        lineas: [
          { tipo: 'comando', texto: 'node cargar-productos.js planilla.xlsx' },
          { tipo: 'salida', etiqueta: 'lectura', texto: 'planilla.xlsx · 2 columnas · 652 filas' },
          { tipo: 'ok', etiqueta: 'resultado', texto: '652 / 652 productos cargados · 6m 30s' },
        ],
      },
      arquitectura: {
        diagrama: 'carga-masiva',
        descripcion: 'Flujo de la carga masiva, de izquierda a derecha: Planilla, Script, Tienda online.',
        etiquetas: {
          planilla: 'Planilla',
          planillaDetalle: '2 columnas',
          script: 'Script',
          scriptDetalle: 'Node.js',
          tienda: 'Tienda online',
          tiendaDetalle: 'Productos publicados',
        },
      },
      resultados: [
        { valor: '652', etiqueta: 'productos cargados', tipo: 'medido' },
        { valor: '6,5 min', etiqueta: 'de punta a punta', tipo: 'medido' },
        { valor: '2.608 min', etiqueta: 'estimado a mano: 652 productos × 4 min', tipo: 'estimado' },
        { valor: '2', etiqueta: 'columnas de entrada', tipo: 'medido' },
      ],
      aprendizajes: [
        'Estimar el tiempo de la carga manual antes de automatizar da un punto de comparación; por eso las 43,5 horas figuran como estimado.',
        'Pedir lo mínimo como entrada (dos columnas) vuelve el script más fácil de usar y de volver a ejecutar cuando cambia el catálogo.',
      ],
    }),
    casoBase({
      slug: 'dallas-note',
      titulo: 'Dallas Note',
      resumen:
        'Aplicación de planificación de tareas con vista semanal, matriz de Eisenhower, notificaciones push y un planificador con IA.',
      estado: 'publicado',
      variante: 'completa',
      chips: ['React', 'Firebase', 'IA'],
      imagenTarjeta: imagenTarjeta('Captura de la aplicación Dallas Note'),
    }),
    casoBase({
      slug: 'plataforma-agentes-ia',
      titulo: 'Plataforma de agentes de IA multiempresa',
      resumen:
        'Arquitectura para que varias empresas usen agentes de IA, cada una con sus datos aislados y sus acciones auditadas.',
      estado: 'publicado',
      variante: 'completa',
      chips: ['NestJS', 'TypeScript', 'Agentes'],
      imagenTarjeta: imagenTarjeta('Esquema de la plataforma de agentes de IA multiempresa'),
    }),
    casoBase({
      slug: 'api-usuarios-nestjs',
      titulo: 'API de usuarios con NestJS',
      resumen: 'API REST para gestionar usuarios, hecha con NestJS y MongoDB y documentada con Swagger.',
      estado: 'publicado',
      variante: 'completa',
      chips: ['NestJS', 'MongoDB', 'Swagger'],
      imagenTarjeta: imagenTarjeta('Documentación Swagger de la API de usuarios'),
    }),
    casoBase({
      slug: 'agente-whatsapp-ferreteria',
      titulo: 'Agente de WhatsApp para ferretería',
      resumen: 'Demostración de un agente que atiende consultas por WhatsApp, probado con una ferretería ficticia.',
      estado: 'en-desarrollo',
      variante: 'corta',
    }),
    casoBase({
      slug: 'peluqueria-agente-ia',
      titulo: 'Agente de IA para peluquería',
      resumen: 'Agente de IA que atiende las consultas de una peluquería.',
      estado: 'en-desarrollo',
      variante: 'corta',
    }),
  ],
};

export function getCaseBySlug(slug: string | undefined): Caso | undefined {
  return content.casos.find((caso) => caso.slug === slug);
}

// Caso que sigue al actual en el orden de `content.casos`, mirando solo los casos completos y publicados.
// Es circular: después del último vuelve al primero. Un caso corto o un slug desconocido no tiene siguiente.
export function getSiguienteCaso(slug: string | undefined): Caso | undefined {
  const elegibles = content.casos.filter((caso) => caso.variante === 'completa' && caso.estado === 'publicado');
  const posicion = elegibles.findIndex((caso) => caso.slug === slug);
  if (posicion === -1) return undefined;
  const siguiente = elegibles[(posicion + 1) % elegibles.length];
  return siguiente.slug === slug ? undefined : siguiente;
}
