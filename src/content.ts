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
    Partial<Omit<Caso, 'slug' | 'titulo' | 'resumen' | 'estado' | 'variante' | 'seo'>>,
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
    // "Tech Lead" y "Multiempresa" están confirmados por Jorge. "4+ años" sigue con COMPLETAR (falta el mes de ingreso a Extrados) y npm run verify lo marca.
    destacados: {
      etiqueta: 'Datos destacados',
      items: [
        { valor: '652', descripcion: 'productos cargados en 6,5 minutos con un script' },
        { valor: `4+ años ${COMPLETAR}`, descripcion: 'desarrollando software en producción' },
        { valor: 'Tech Lead', descripcion: 'experiencia liderando el frontend en React' },
        { valor: 'Multiempresa', descripcion: 'agentes con datos aislados y acciones auditadas' },
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
    // Bio con la experiencia en Extrados y Global (texto de Jorge, 2026-11-09). Siguen con COMPLETAR el mes de ingreso en 2022 y lo que hace hoy (después de septiembre de 2026), así npm run verify bloquea la publicación. El título técnico y los archivos de foto y CV siguen pendientes.
    sobreMi: {
      id: ANCLA.sobreMi,
      encabezado: { etiqueta: '04 / SOBRE MÍ', titulo: 'Jorge Albornos' },
      subtitulo: `Técnico Superior en Desarrollo de Software ${COMPLETAR}`,
      parrafos: [
        `Soy desarrollador full stack y trabajo desde Córdoba, Argentina. Entre 2022 (mes de ingreso: ${COMPLETAR}) y marzo de 2026 trabajé en Extrados Software Technology: entré como Full Stack Developer y llegué a React Tech Lead, coordinando el equipo de frontend, haciendo code reviews, definiendo la arquitectura y acompañando a otros desarrolladores. Después, hasta septiembre de 2026, en Global armé el backend de una plataforma de agentes de IA con NestJS y TypeScript.`,
        `Hoy me dedico sobre todo a agentes de IA que usan herramientas y dejan registro de cada acción, y a automatizar tareas repetitivas para que un equipo recupere horas de trabajo. ${COMPLETAR}`,
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
    estimado: 'Estimado',
    indice: 'En este caso',
    siguiente: 'SIGUIENTE CASO →',
    medioPendiente: 'Captura pendiente',
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
  // Caso A (destacado), Dallas Note, Plataforma de agentes y API de usuarios; después los "en desarrollo" (Laboratorio):
  // primero la carga de visitas y contactos (completo) y al final los dos cortos.
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
          'Cargar a mano 652 productos en una tienda online llevaría unas 43,5 horas (estimado: 4 minutos por producto).',
        solucion:
          'Un script de Node.js lee una planilla de dos columnas y publica el catálogo completo, sin cargar nada a mano.',
        resultado: '652 productos en 6,5 minutos',
      },
      progreso: { texto: 'planilla.xlsx · 2 columnas → 652 / 652 productos · 6,5 min', valor: 100 },
      // Textos del detalle cargados desde el texto final de Jorge (2026-11-09). La duración sigue pendiente.
      tituloLargo: 'De una planilla de dos columnas a una tienda online completa en minutos',
      bajada:
        'Un script de Node.js convierte una planilla de dos columnas en el catálogo completo de una tienda online: 652 productos en 6,5 minutos.',
      metadatos: { rol: 'Desarrollo completo', stack: ['Node.js'], duracion: COMPLETAR, estado: 'En uso' },
      problema:
        'Una tienda online necesitaba publicar su catálogo de 652 productos. Cargarlos uno por uno desde el panel de la tienda llevaría unas 43,5 horas (estimado: 4 minutos por producto), y cualquier error de tipeo habría que corregirlo a mano.',
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
          scriptDetalle: 'Node.js lee cada fila y arma la ficha completa del producto',
          tienda: 'Tienda online',
          tiendaDetalle: 'Productos publicados',
        },
      },
      resultados: [
        { valor: '652', etiqueta: 'productos cargados', tipo: 'medido' },
        { valor: '6,5 min', etiqueta: 'de punta a punta', tipo: 'medido' },
        { valor: '43,5 h', etiqueta: 'estimado a mano (652 productos × 4 min)', tipo: 'estimado' },
        { valor: '2', etiqueta: 'columnas de entrada', tipo: 'medido' },
      ],
      // Imagen principal del detalle (1200×480). Jorge la exporta a public/casos/carga-masiva-productos/principal.webp y pasa `pendiente` a false.
      medios: [
        {
          tipo: 'imagen',
          archivo: 'principal.webp',
          alt: 'Planilla de dos columnas y tienda online con los 652 productos cargados',
          ancho: 1200,
          alto: 480,
          pendiente: true,
        },
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
      chips: ['NestJS', 'React', 'PostgreSQL'],
      imagenTarjeta: imagenTarjeta('Captura de la aplicación Dallas Note'),
      tituloLargo: 'Una semana organizada en un tablero: prioridades claras y avisos a tiempo',
      bajada:
        'Aplicación web para planificar la semana con un tablero estilo Kanban, matriz de Eisenhower, notificaciones push y un planificador con IA.',
      metadatos: {
        rol: 'Proyecto propio · diseño, backend, frontend y deploy',
        stack: ['NestJS', 'Prisma', 'PostgreSQL', 'React', 'Vite', 'TypeScript'],
        duracion: COMPLETAR,
        estado: COMPLETAR,
      },
      problema:
        'Las listas de tareas comunes muestran todo al mismo nivel: lo urgente se mezcla con lo importante y las fechas se pasan sin aviso. Necesitaba una herramienta para organizar la semana, ver de un vistazo qué hacer primero y recibir alertas antes de que algo se venciera.',
      solucion: [
        'Un tablero estilo Kanban con vista semanal, porque mover tarjetas entre columnas es más rápido que editar una lista.',
        'Matriz de Eisenhower (urgente / importante) para decidir prioridades con un criterio claro y no a ojo.',
        'Notificaciones push en el navegador para que los avisos lleguen aunque la app no esté abierta.',
        'Un planificador con IA que ayuda a distribuir las tareas en la semana.',
        'Monorepo con pnpm: la API y la web comparten tipos de TypeScript y se versionan juntas.',
        'Diseño minimalista con paleta pastel y modo claro/oscuro.',
      ],
      arquitectura: {
        diagrama: 'dallas-note',
        descripcion: 'Flujo: la web consume la API, la API guarda en PostgreSQL y dispara los avisos.',
        etiquetas: {
          titulo: 'Diagrama de la arquitectura de Dallas Note',
          web: 'Web',
          webStack: 'React + Vite',
          webDespliegue: 'Publicada en Cloudflare Pages',
          api: 'API',
          apiStack: 'NestJS + Prisma',
          apiDespliegue: 'Desplegada en Render',
          datos: 'Base de datos',
          datosStack: 'PostgreSQL',
          datosDespliegue: 'Alojada en Neon',
          avisos: 'Avisos',
          avisosDetalle: 'Notificaciones push en el navegador',
        },
      },
      resultados: [
        { valor: '2', etiqueta: 'apps en un monorepo (API y web)', tipo: 'medido' },
        { valor: '2', etiqueta: 'temas: claro y oscuro', tipo: 'medido' },
        { valor: 'USD 0', etiqueta: 'de infraestructura, en planes gratuitos sin tarjeta', tipo: 'medido' },
      ],
      aprendizajes: [
        `Se puede desplegar un stack completo sin costo y sin cargar tarjeta combinando Render, Neon y Cloudflare Pages; la contracara es el arranque en frío de la API en el plan gratuito. ${COMPLETAR}`,
        'Un monorepo con tipos compartidos evita que el frontend y el backend se desincronicen.',
        COMPLETAR,
      ],
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
      tituloLargo: 'Agentes de IA para varias empresas, con datos aislados y cada acción registrada',
      bajada:
        'Capa de lógica de negocio y orquestación sobre un motor de IA externo, para que varias empresas usen agentes con sus datos separados y sus acciones auditadas.',
      metadatos: {
        rol: 'Desarrollador backend y agentes de IA',
        stack: ['NestJS', 'TypeScript', 'Express/Node (servicios previos)', COMPLETAR],
        duracion: 'Marzo – septiembre de 2026',
        estado: COMPLETAR,
      },
      problema:
        'Un motor de IA por sí solo responde preguntas, pero no sabe a qué empresa pertenece cada usuario, qué datos puede ver ni qué acciones tiene permitido ejecutar. Para ofrecer agentes a varias empresas hacía falta una capa intermedia que separara los datos de cada una y dejara registro de todo lo que hace el agente.',
      solucion: [
        'Arquitectura multiempresa (multi-tenant): cada consulta viaja con la identificación de su empresa y el agente solo accede a los datos de esa empresa.',
        'El agente ejecuta tareas a través de herramientas definidas en el backend, no con acceso libre a los sistemas.',
        'Cada acción queda en un registro de auditoría: quién la pidió, qué herramienta usó y qué resultado dio.',
        'Integraciones por webhooks para conectar el agente con los sistemas de cada empresa.',
        'El servicio central de agentes actúa como orquestador: configura cada agente (instrucciones, herramientas y modelo de respaldo) y ejecuta las llamadas a herramientas, pero no invoca modelos directamente.',
        'Un clasificador y un resumen automático de casos con métricas de calidad.',
        'Integraciones de negocio (clientes, contactos, calendario y tareas) expuestas como herramientas del agente.',
        `Autenticación con JWT / OAuth2. ${COMPLETAR}`,
      ],
      arquitectura: {
        diagrama: 'agentes-multiempresa',
        descripcion:
          'Flujo de una consulta: el usuario de una empresa consulta, el backend arma el contexto, el motor de IA decide, las herramientas actúan y la auditoría registra.',
        etiquetas: {
          titulo: 'Diagrama de la plataforma de agentes multiempresa',
          usuario: 'Usuario de una empresa',
          usuarioDetalle: 'Envía una consulta',
          backend: 'Backend NestJS',
          backendDetalle1: 'Identifica la empresa',
          backendDetalle2: 'Valida permisos',
          backendDetalle3: 'Arma el contexto',
          motor: 'Motor de IA',
          motorDetalle1: 'Decide qué hacer y qué',
          motorDetalle2: 'herramienta usar',
          herramientas: 'Herramientas',
          herramientasDetalle1: 'Ejecutan la acción sobre los',
          herramientasDetalle2: 'datos de esa empresa',
          auditoria: 'Auditoría',
          auditoriaDetalle: 'Registra la acción y su resultado',
        },
      },
      // Sin cifras publicables: no hay `resultados` y la página no muestra la fila de tarjetas.
      aprendizajes: [COMPLETAR, COMPLETAR],
    }),
    casoBase({
      slug: 'api-usuarios-nestjs',
      titulo: 'API de usuarios con NestJS',
      resumen: 'API REST para gestionar usuarios, hecha con NestJS y MongoDB y documentada con Swagger.',
      estado: 'publicado',
      variante: 'completa',
      chips: ['NestJS', 'MongoDB', 'Swagger'],
      imagenTarjeta: imagenTarjeta('Documentación Swagger de la API de usuarios'),
      tituloLargo: 'Una API de usuarios ordenada, segura y documentada',
      bajada: 'API REST para gestionar usuarios, hecha con NestJS y MongoDB y documentada con Swagger.',
      metadatos: {
        rol: 'Desarrollo completo',
        stack: ['NestJS', 'TypeScript', 'MongoDB', 'Swagger'],
        duracion: COMPLETAR,
        estado: COMPLETAR,
      },
      problema:
        'Casi cualquier sistema necesita registrar usuarios, validar sus datos y controlar quién accede a qué. Hacerlo de forma improvisada deja huecos de seguridad y endpoints que nadie más sabe cómo usar.',
      solucion: [
        'NestJS con módulos, controladores y servicios separados, para que cada parte tenga una sola responsabilidad.',
        'Validación de los datos de entrada con DTOs antes de que lleguen a la base.',
        `MongoDB para guardar los usuarios. ${COMPLETAR}`,
        'Documentación automática con Swagger: cualquiera puede probar los endpoints desde el navegador.',
        COMPLETAR,
      ],
      arquitectura: {
        diagrama: 'api-usuarios',
        descripcion: 'Flujo de una llamada: el cliente llama, el DTO valida, el servicio consulta MongoDB y Swagger documenta.',
        etiquetas: {
          titulo: 'Diagrama del flujo de la API de usuarios',
          cliente: 'Cliente',
          clienteDetalle1: 'Llama a un endpoint: crear,',
          clienteDetalle2: 'listar, editar o borrar usuarios',
          validacion: 'Validación',
          validacionDetalle: 'El DTO revisa los datos',
          servicio: 'Servicio (MongoDB)',
          servicioDetalle1: 'Aplica la lógica y',
          servicioDetalle2: 'consulta MongoDB',
          swagger: 'Swagger',
          swaggerDetalle1: 'Documenta cada endpoint',
          swaggerDetalle2: 'con ejemplos',
        },
      },
      // El texto fuente no trae números para este caso: la tarjeta queda como pendiente.
      resultados: [{ valor: COMPLETAR, etiqueta: COMPLETAR, tipo: 'medido' }],
      aprendizajes: [COMPLETAR, COMPLETAR],
    }),
    // Caso en desarrollo con variante completa: va al Laboratorio del Inicio y tiene detalle completo.
    // Los datos que Jorge marcó como "a confirmar" llevan COMPLETAR. Sin volúmenes del negocio ni nombre interno del proyecto.
    casoBase({
      slug: 'carga-visitas-contactos',
      titulo: 'Carga de visitas y contactos',
      resumen:
        'Sistema de carga de visitas y contactos con perfiles de vendedor y administrador, donde cada vendedor ve solo sus datos.',
      estado: 'en-desarrollo',
      variante: 'completa',
      tituloLargo: 'Cada vendedor carga sus visitas y contactos, y ve solo lo suyo',
      bajada:
        'Sistema para que un equipo de vendedores registre visitas y contactos, con perfiles de vendedor y administrador y los datos aislados por usuario.',
      metadatos: {
        rol: `${COMPLETAR} · diseño, backend y frontend`,
        stack: ['NestJS', 'Prisma', 'PostgreSQL (Neon)', 'React', 'TypeScript', 'Monorepo con pnpm'],
        duracion: COMPLETAR,
        estado: 'En desarrollo',
      },
      problema:
        'Los vendedores registraban sus visitas y contactos sin un sistema central. El administrador no podía consultar lo que cargaba cada uno, y no había forma de asegurar que un vendedor no viera los contactos de otro.',
      solucion: [
        'El rol y el identificador del usuario salen solo del token de sesión. Ningún dato enviado por el cliente puede cambiar de quién es un contacto.',
        'Un vendedor que pide un contacto ajeno recibe un 404, igual que si no existiera. El administrador ve todos.',
        'Los contactos se borran de forma lógica (se marcan, no se eliminan), así el administrador puede recuperarlos.',
        'Cada alta lleva un identificador del cliente que evita duplicados si se repite, pensado para cargar sin conexión más adelante.',
        'El sistema avisa si el teléfono ya existe, pero no bloquea la carga.',
        'Contraseñas con Argon2id, límite de intentos en el login y cambio de contraseña obligatorio en el primer ingreso.',
        'PostgreSQL en Neon, elegido por tener un plan gratuito con buen rendimiento.',
      ],
      arquitectura: {
        diagrama: 'carga-visitas',
        descripcion:
          'Flujo de una consulta: el usuario inicia sesión, la API valida el token y el rol, el aislamiento limita la consulta y PostgreSQL guarda los datos.',
        etiquetas: {
          titulo: 'Diagrama de la carga de visitas y contactos',
          usuario: 'Usuario',
          usuarioDetalle1: 'Inicia sesión como vendedor',
          usuarioDetalle2: 'o administrador',
          api: 'API NestJS',
          apiDetalle: 'Valida el token y el rol',
          aislamiento: 'Aislamiento',
          aislamientoDetalle1: 'Limita cada consulta a los',
          aislamientoDetalle2: 'contactos del usuario (el administrador',
          aislamientoDetalle3: 'no tiene límite)',
          datos: 'PostgreSQL',
          datosDetalle: 'Guarda los contactos y las visitas',
        },
      },
      resultados: [
        { valor: '2', etiqueta: `perfiles: administrador y vendedor ${COMPLETAR}`, tipo: 'medido' },
        {
          valor: '188',
          etiqueta: `pruebas automáticas (93 unitarias y 95 de integración, al 6 de noviembre) ${COMPLETAR}`,
          tipo: 'medido',
        },
      ],
      aprendizajes: [
        `Centralizar la regla de "quién ve qué" en un único punto y probarla con un vendedor A, uno B y un administrador evita fugas de datos entre usuarios. ${COMPLETAR}`,
        `Probar la conexión a Neon antes de armar el resto reveló que el arranque en frío tarda unos 2,4 segundos. ${COMPLETAR}`,
      ],
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
      resumen:
        'Sistema para peluquerías con turnos, cobros y un agente de IA que atiende consultas y sugiere cortes a partir de una foto.',
      estado: 'en-desarrollo',
      variante: 'corta',
    }),
  ],
};

export function getCaseBySlug(slug: string | undefined): Caso | undefined {
  return content.casos.find((caso) => caso.slug === slug);
}

// Caso que sigue al actual en el orden de `content.casos`, mirando solo los casos de variante completa
// (incluye los que están en desarrollo pero ya tienen detalle completo, como la carga de visitas y contactos).
// Es circular: después del último vuelve al primero. Un caso corto o un slug desconocido no tiene siguiente.
export function getSiguienteCaso(slug: string | undefined): Caso | undefined {
  const elegibles = content.casos.filter((caso) => caso.variante === 'completa');
  const posicion = elegibles.findIndex((caso) => caso.slug === slug);
  if (posicion === -1) return undefined;
  const siguiente = elegibles[(posicion + 1) % elegibles.length];
  return siguiente.slug === slug ? undefined : siguiente;
}
