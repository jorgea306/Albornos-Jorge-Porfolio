import Box from '@mui/material/Box';
import { keyframes } from '@mui/material/styles';
import { content } from '../content';
import type { EjemploIlustrativo, LineaEjemplo } from '../content.types';
import { FUENTE_MONO, radio } from '../theme';

const aparecer = keyframes`
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: none; }
`;

interface Props {
  ejemplo: EjemploIlustrativo;
}

// Peso del texto según el tipo de línea. El rol se lee en `etiqueta`, no en el estilo.
const PESO: Record<LineaEjemplo['tipo'], number> = { comando: 500, entrada: 400, evento: 400, salida: 500, ok: 500 };

// Consola o terminal ficticio, con texto real (no imagen). El rótulo "Ejemplo ilustrativo" lo agrega este
// componente, así ningún ejemplo puede mostrarse sin él. Las líneas aparecen una a una solo si el usuario
// no pidió movimiento reducido; sin esa preferencia o sin JavaScript se ven completas desde el inicio.
export default function IllustrativeExample({ ejemplo }: Props) {
  return (
    <Box
      component="figure"
      sx={{
        m: 0,
        bgcolor: 'background.paper',
        border: 1,
        borderColor: 'divider',
        borderRadius: `${radio.destacada}px`,
        overflow: 'hidden',
        fontFamily: FUENTE_MONO,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 2, py: 1.5, borderBottom: 1, borderColor: 'divider' }}>
        <Box aria-hidden="true" sx={{ display: 'flex', gap: 0.75 }}>
          {[0, 1, 2].map((punto) => (
            <Box key={punto} sx={{ width: 10, height: 10, borderRadius: '50%', border: 1, borderColor: 'text.secondary' }} />
          ))}
        </Box>
        <Box component="span" sx={{ fontSize: '0.8125rem', color: 'text.secondary', overflowWrap: 'anywhere' }}>
          {ejemplo.titulo}
        </Box>
      </Box>
      <Box
        component="ol"
        sx={{ listStyle: 'none', m: 0, p: 2, display: 'grid', gap: 1.25, fontSize: '0.875rem', lineHeight: 1.5 }}
      >
        {ejemplo.lineas.map((linea, indice) => (
          <Box
            key={indice}
            component="li"
            sx={{
              color: 'text.primary',
              fontWeight: PESO[linea.tipo],
              whiteSpace: 'pre-wrap',
              overflowWrap: 'anywhere',
              '@media (prefers-reduced-motion: no-preference)': {
                animation: `${aparecer} 400ms ease-out both`,
                animationDelay: `${indice * 250}ms`,
              },
            }}
          >
            {linea.tipo === 'comando' && (
              <Box component="span" aria-hidden="true" sx={{ color: 'text.secondary', mr: 1 }}>
                $
              </Box>
            )}
            {linea.etiqueta && (
              <Box
                component="span"
                sx={{ color: 'text.secondary', fontWeight: 400, mr: 1, '&::after': { content: '":"' } }}
              >
                {linea.etiqueta}
              </Box>
            )}
            {linea.texto}
          </Box>
        ))}
      </Box>
      <Box
        component="figcaption"
        sx={{ px: 2, py: 1.5, borderTop: 1, borderColor: 'divider', fontSize: '0.8125rem', color: 'text.secondary' }}
      >
        <Box component="strong" sx={{ color: 'text.primary' }}>
          {content.interfaz.ejemploIlustrativo}
        </Box>{' '}
        {ejemplo.leyenda}
      </Box>
    </Box>
  );
}
