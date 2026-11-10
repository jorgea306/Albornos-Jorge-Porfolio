import Box from '@mui/material/Box';
import { content } from '../../content';
import SectionCard from '../SectionCard';
import SectionBlock from './SectionBlock';

const { servicios } = content.inicio;

export default function Services() {
  return (
    <SectionBlock id={servicios.id} titulo={servicios.titulo}>
      <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' } }}>
        {servicios.items.map((servicio) => (
          <SectionCard key={servicio.titulo} titulo={servicio.titulo} descripcion={servicio.descripcion} />
        ))}
      </Box>
    </SectionBlock>
  );
}
