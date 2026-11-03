import type { Caso, Contenido } from './content.types';

// Marca todo dato que falta. content.test.ts y, mas adelante, scripts/listar-pendientes.mjs lo buscan.
export const COMPLETAR = '[COMPLETAR]';

const OG_GENERAL = '/og/general.png';

// Los textos de cada caso se completan en los slices 2, 4 y 5; aqui solo la identidad y el estado.
function casoBase(
  datos: Pick<Caso, 'slug' | 'titulo' | 'estado' | 'variante'>,
): Caso {
  return {
    ...datos,
    resumen: COMPLETAR,
    problema: COMPLETAR,
    tecnologias: [],
    medios: [],
    seo: { titulo: datos.titulo, descripcion: COMPLETAR, ogImagen: OG_GENERAL },
  };
}

export const content: Contenido = {
  casos: [
    casoBase({ slug: 'carga-masiva-productos', titulo: 'Carga masiva de productos', estado: 'publicado', variante: 'completa' }),
    casoBase({ slug: 'plataforma-agentes-ia', titulo: 'Plataforma de agentes de IA multiempresa', estado: 'publicado', variante: 'completa' }),
    casoBase({ slug: 'dallas-note', titulo: 'Dallas Note', estado: 'publicado', variante: 'completa' }),
    casoBase({ slug: 'api-usuarios-nestjs', titulo: 'API de usuarios con NestJS', estado: 'publicado', variante: 'completa' }),
    casoBase({ slug: 'agente-whatsapp-ferreteria', titulo: 'Agente de WhatsApp para ferretería', estado: 'en-desarrollo', variante: 'corta' }),
    casoBase({ slug: 'peluqueria-agente-ia', titulo: 'Agente de IA para peluquería', estado: 'en-desarrollo', variante: 'corta' }),
  ],
};

export function getCaseBySlug(slug: string | undefined): Caso | undefined {
  return content.casos.find((caso) => caso.slug === slug);
}
