import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { content } from '../../content';
import SectionCard from '../SectionCard';
import SectionBlock from './SectionBlock';

const { casos } = content.inicio;

export default function Cases() {
  return (
    <SectionBlock id={casos.id} titulo={casos.titulo}>
      <Typography color="text.secondary" sx={{ mb: 3, mt: -1 }}>
        {casos.introduccion}
      </Typography>
      <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' } }}>
        {content.casos.map((caso) => (
          <SectionCard
            key={caso.slug}
            titulo={caso.titulo}
            descripcion={caso.resumen}
            etiqueta={caso.estado === 'en-desarrollo' ? casos.enDesarrollo : undefined}
            to={`/casos/${caso.slug}`}
            accion={casos.verCaso}
          />
        ))}
      </Box>
    </SectionBlock>
  );
}
