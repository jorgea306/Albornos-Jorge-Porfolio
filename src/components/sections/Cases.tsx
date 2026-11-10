import Box from '@mui/material/Box';
import { content } from '../../content';
import SectionCard from '../SectionCard';
import FeaturedCase from './FeaturedCase';
import Lab from './Lab';
import SectionBlock from './SectionBlock';

const { casos } = content.inicio;

// Casos del Inicio. El orden sale de content.casos: el destacado primero, después las tarjetas y al final el Laboratorio.
export default function Cases() {
  const publicados = content.casos.filter((caso) => caso.estado === 'publicado');
  const destacado = publicados.find((caso) => caso.destacado);
  const tarjetas = publicados.filter((caso) => caso !== destacado);
  const enDesarrollo = content.casos.filter((caso) => caso.estado === 'en-desarrollo');

  return (
    <SectionBlock
      id={casos.id}
      titulo={casos.encabezado.titulo}
      etiqueta={casos.encabezado.etiqueta}
      bajada={casos.encabezado.bajada}
    >
      <Box sx={{ display: 'grid', gap: 3 }}>
        {destacado && <FeaturedCase caso={destacado} />}
        <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' } }}>
          {tarjetas.map((caso) => (
            <SectionCard
              key={caso.slug}
              titulo={caso.titulo}
              descripcion={caso.resumen}
              etiquetas={caso.chips}
              medio={
                caso.imagenTarjeta && {
                  src: `/casos/${caso.slug}/${caso.imagenTarjeta.archivo}`,
                  alt: caso.imagenTarjeta.alt,
                  ancho: caso.imagenTarjeta.ancho,
                  alto: caso.imagenTarjeta.alto,
                  pendiente: caso.imagenTarjeta.pendiente,
                  textoPendiente: casos.imagenPendiente,
                }
              }
              to={`/casos/${caso.slug}`}
              accion={casos.verCaso}
            />
          ))}
        </Box>
        <Lab casos={enDesarrollo} />
      </Box>
    </SectionBlock>
  );
}
