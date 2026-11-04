import type { Caso, Contenido } from './content.types';

// Marca todo dato que falta. content.test.ts y, mas adelante, scripts/listar-pendientes.mjs lo buscan.
export const COMPLETAR = '[COMPLETAR]';

const OG_GENERAL = '/og/general.png';

// Anclas de las secciones del Inicio. Los botones del Hero apuntan a ellas.
// 'contacto' todavia no existe en la pagina: la seccion llega en el slice 3.
const ANCLA = { casos: 'casos', contacto: 'contacto' };

// Los textos largos de cada caso se completan en los slices 4 y 5; aqui la identidad, el estado y el resumen de la tarjeta.
function casoBase(
  datos: Pick<Caso, 'slug' | 'titulo' | 'resumen' | 'estado' | 'variante'>,
): Caso {
  return {
    ...datos,
    problema: COMPLETAR,
    tecnologias: [],
    medios: [],
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
  inicio: {
    hero: {
      etiqueta: 'Desarrollador full stack freelance · Córdoba, Argentina',
      titulo: 'Construyo agentes de IA y automatizaciones que le ahorran horas de trabajo a tu negocio',
      principal: { texto: 'Ver proyectos', destino: `#${ANCLA.casos}` },
      secundario: { texto: 'Contáctame', destino: `#${ANCLA.contacto}` },
    },
    servicios: {
      id: 'servicios',
      titulo: 'Servicios',
      items: [
        {
          titulo: 'Agentes de IA',
          descripcion:
            'Asistentes que atienden consultas y ejecutan tareas dentro de tus sistemas, con registro de cada acción.',
        },
        {
          titulo: 'APIs con NestJS y Node',
          descripcion:
            'Servicios de backend que conectan tu negocio con otras aplicaciones, con acceso seguro y datos ordenados.',
        },
        {
          titulo: 'Interfaces con React',
          descripcion: 'Paneles y sitios web rápidos, pensados para verse bien en el celular y en la computadora.',
        },
        {
          titulo: 'Automatizaciones',
          descripcion:
            'Tareas repetitivas que se ejecutan solas: cargas de datos, avisos e integraciones entre sistemas.',
        },
      ],
    },
    casos: {
      id: ANCLA.casos,
      titulo: 'Casos',
      introduccion: 'Cada caso explica el problema, cómo se resolvió y qué resultado dejó.',
      enDesarrollo: 'En desarrollo',
      verCaso: 'Ver caso',
    },
    stack: {
      id: 'stack',
      titulo: 'Stack',
      grupos: [
        { titulo: 'Backend', tecnologias: ['Node.js', 'NestJS', 'TypeScript', 'TypeORM', 'JWT y OAuth2'] },
        { titulo: 'Frontend', tecnologias: ['React', 'TypeScript', 'Material UI', 'React Router'] },
        {
          titulo: 'IA aplicada',
          tecnologias: ['Agentes con herramientas', 'Webhooks', 'Auditoría de acciones', 'Multiempresa'],
        },
        { titulo: 'Datos', tecnologias: ['MySQL', 'MongoDB', 'Firebase'] },
        { titulo: 'Cloud', tecnologias: ['AWS EC2', 'Vercel'] },
      ],
    },
  },
  interfaz: {
    cambiarTema: 'Cambiar entre tema claro y oscuro',
    pie: '© 2026 Jorge Albornos',
  },
  noEncontrado: {
    titulo: 'Página no encontrada',
    descripcion: 'La dirección que abriste no existe o cambió de lugar.',
    enlace: 'Ir al inicio',
    seoTitulo: 'Página no encontrada | Jorge Albornos',
  },
  // El orden de este arreglo es el orden de las tarjetas en el Inicio: completos primero, "en desarrollo" al final.
  casos: [
    casoBase({
      slug: 'carga-masiva-productos',
      titulo: 'Carga masiva de productos',
      resumen:
        'Un script convierte una planilla de dos columnas en la carga completa de una tienda online: 652 productos en 6,5 minutos.',
      estado: 'publicado',
      variante: 'completa',
    }),
    casoBase({
      slug: 'dallas-note',
      titulo: 'Dallas Note',
      resumen:
        'Aplicación de planificación de tareas con vista semanal, matriz de Eisenhower, notificaciones push y un planificador con IA.',
      estado: 'publicado',
      variante: 'completa',
    }),
    casoBase({
      slug: 'api-usuarios-nestjs',
      titulo: 'API de usuarios con NestJS',
      resumen: 'API REST para gestionar usuarios, hecha con NestJS y MongoDB y documentada con Swagger.',
      estado: 'publicado',
      variante: 'completa',
    }),
    casoBase({
      slug: 'plataforma-agentes-ia',
      titulo: 'Plataforma de agentes de IA multiempresa',
      resumen:
        'Arquitectura para que varias empresas usen agentes de IA, cada una con sus datos aislados y sus acciones auditadas.',
      estado: 'publicado',
      variante: 'completa',
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
