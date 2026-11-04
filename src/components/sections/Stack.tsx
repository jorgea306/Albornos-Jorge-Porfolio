import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { content } from '../../content';
import SectionBlock from './SectionBlock';

const { stack } = content.inicio;

export default function Stack() {
  return (
    <SectionBlock id={stack.id} titulo={stack.titulo}>
      <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' } }}>
        {stack.grupos.map((grupo) => (
          <Box key={grupo.titulo}>
            <Typography variant="h6" component="h3" sx={{ mb: 1 }}>
              {grupo.titulo}
            </Typography>
            <Box component="ul" sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, listStyle: 'none', m: 0, p: 0 }}>
              {grupo.tecnologias.map((tecnologia) => (
                <li key={tecnologia}>
                  <Chip label={tecnologia} variant="outlined" />
                </li>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </SectionBlock>
  );
}
