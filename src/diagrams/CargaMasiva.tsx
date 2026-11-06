import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { radio } from '../theme';
import DiagramFrame, { type PropsDiagrama } from './DiagramFrame';

// Flecha entre dos cajas. Es decorativa: el orden lo da la lista numerada y el texto de la leyenda.
// Apunta a la derecha en pantallas anchas y hacia abajo en 390 px, donde las cajas se apilan.
function Flecha() {
  return (
    <Box
      component="svg"
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      sx={{
        flex: 'none',
        width: 32,
        height: 32,
        my: 1,
        mx: { sm: 1 },
        color: 'text.secondary',
        transform: { xs: 'rotate(90deg)', sm: 'none' },
      }}
    >
      <path d="M3 12h16m-6-6 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Box>
  );
}

// Diagrama del Caso A: Planilla → Script → Tienda online. Es HTML con CSS (no un SVG único) para que el texto de
// las cajas se acomode solo a 390 px. No menciona proveedor, columnas del CSV intermedio ni archivos comprimidos.
export default function CargaMasiva({ arquitectura }: PropsDiagrama) {
  const { etiquetas, descripcion } = arquitectura;
  const cajas = [
    { nombre: etiquetas.planilla, detalle: etiquetas.planillaDetalle },
    { nombre: etiquetas.script, detalle: etiquetas.scriptDetalle },
    { nombre: etiquetas.tienda, detalle: etiquetas.tiendaDetalle },
  ];
  return (
    <DiagramFrame id="carga-masiva" leyenda={descripcion}>
      <Box
        component="ol"
        sx={{
          listStyle: 'none',
          m: 0,
          p: 0,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'stretch', sm: 'center' },
        }}
      >
        {cajas.map((caja, indice) => (
          <Box
            key={caja.nombre}
            component="li"
            sx={{ display: 'flex', flex: 1, flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center' }}
          >
            <Box
              sx={{
                flex: 1,
                width: '100%',
                p: 2,
                textAlign: 'center',
                border: 2,
                borderColor: 'text.primary',
                borderRadius: `${radio.tarjeta}px`,
                bgcolor: 'background.default',
              }}
            >
              <Typography component="span" sx={{ display: 'block', fontWeight: 700 }}>
                {caja.nombre}
              </Typography>
              <Typography component="span" variant="body2" color="text.secondary" sx={{ display: 'block' }}>
                {caja.detalle}
              </Typography>
            </Box>
            {indice < cajas.length - 1 && <Flecha />}
          </Box>
        ))}
      </Box>
    </DiagramFrame>
  );
}
