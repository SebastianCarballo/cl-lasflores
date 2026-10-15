// Recomendación de plan por rubro. Traduce la matriz de planes a la realidad de
// cada oficio: qué necesita de verdad una pizzería vs. un plomero.
// Fuente única para /planes (misma data alimenta el schema, sin copy duplicada).

export interface RubroPlan {
  slug: string;
  rubro: string;
  icono: string;
  /** Plan recomendado para este rubro. */
  tier: 'gratis' | 'bronce' | 'plata' | 'oro';
  /** Por qué ese plan y no otro, en una línea. */
  porque: string;
  /** El gancho concreto: qué gana el negocio con ese plan. */
  gancho: string;
}

export const RUBROS: RubroPlan[] = [
  {
    slug: 'gastronomia',
    rubro: 'Gastronomía',
    icono: '🍕',
    tier: 'oro',
    porque: 'Se decide por la foto y el antojo: aparecer arriba en la categoría es la diferencia entre que pidan o no.',
    gancho: 'Vidriera en el inicio + catálogo con precios, que es lo que más se consulta antes de pedir.',
  },
  {
    slug: 'servicios',
    rubro: 'Servicios y oficios',
    icono: '🔧',
    tier: 'bronce',
    porque: 'Viven del contacto directo: el botón de WhatsApp es su herramienta de venta, no un extra.',
    gancho: 'Botón de WhatsApp en la ficha para que te llamen mientras estás en camino a otro trabajo.',
  },
  {
    slug: 'comercios',
    rubro: 'Comercios',
    icono: '🛒',
    tier: 'plata',
    porque: 'Tienen local, horarios y reputación que cuidar: el badge Verificado ordena la categoría.',
    gancho: 'Badge Verificado y catálogo de productos con horarios actualizados.',
  },
  {
    slug: 'inmuebles',
    rubro: 'Inmuebles',
    icono: '🏠',
    tier: 'plata',
    porque: 'Cada propiedad es una ficha con varios datos; verificarla evita consultas falsas.',
    gancho: 'Ficha verificada con catálogo de propiedades y consultas directas por WhatsApp.',
  },
  {
    slug: 'vehiculos',
    rubro: 'Vehículos',
    icono: '🚗',
    tier: 'plata',
    porque: 'La confianza manda en autos usados, y el badge Verificado pesa más que el precio.',
    gancho: 'Badge Verificado y catálogo con ficha técnica de cada unidad.',
  },
  {
    slug: 'empleo',
    rubro: 'Empleo',
    icono: '💼',
    tier: 'gratis',
    porque: 'Publicar un aviso no debería costar nada: así se llena la categoría y el directorio gana.',
    gancho: 'Aviso publicado con el plan Gratis, sin pagar por estar visible.',
  },
  {
    slug: 'salud',
    rubro: 'Salud',
    icono: '🩺',
    tier: 'plata',
    porque: 'Un paciente busca obra social, horarios y dirección antes de llamar: los datos tienen que estar verificados.',
    gancho: 'Ficha Verificado con horarios, obras sociales y contacto directo.',
  },
  {
    slug: 'educacion',
    rubro: 'Educación',
    icono: '📚',
    tier: 'bronce',
    porque: 'Cada consulta es una inscripción posible: responder rápido por WhatsApp es la ventaja.',
    gancho: 'Botón de WhatsApp para que te escriban al instante con la consulta del curso.',
  },
];

// Etiqueta corta del plan, alineada con src/content/plans/*.json.
export const TIER_LABEL: Record<RubroPlan['tier'], string> = {
  gratis: 'Gratis',
  bronce: 'Contacto Directo',
  plata: 'Comercio Verificado',
  oro: 'Vidriera Digital',
};
