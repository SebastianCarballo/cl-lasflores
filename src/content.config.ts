import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';

// Fuente única de verdad del vocabulario del dominio.
// Agregar una categoría o plan = agregar un archivo JSON; el schema lo valida en build.
export const CATEGORY_SLUGS = [
  'gastronomia',
  'servicios',
  'comercios',
  'inmuebles',
  'vehiculos',
  'empleo',
  'salud',
  'educacion',
] as const;

export const PLAN_TIERS = ['gratis', 'bronce', 'plata', 'oro'] as const;

const businesses = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string().min(3),
    category: z.enum(CATEGORY_SLUGS),
    description: z.string().min(20),
    shortDescription: z.string().min(10).max(120),
    address: z.string().min(3),
    phone: z.string().regex(/^\d{10,15}$/, 'Teléfono en formato internacional sin +'),
    whatsapp: z
      .string()
      .regex(/^\d{10,15}$/)
      .optional(),
    hasWhatsAppButton: z.boolean().default(false),
    hours: z.string().min(3),
    image: z.string().refine((s) => s.startsWith('/') || /\.(jpe?g|png|webp)$/.test(s), {
      message: 'URL pública (/) o archivo local en src/assets/negocios',
    }),
    gallery: z
      .array(
        z.string().refine((s) => s.startsWith('/') || /\.(jpe?g|png|webp)$/.test(s)),
      )
      .min(1),
    verified: z.boolean().default(false),
    featured: z.boolean().default(false),
    demo: z.boolean().default(false),
    plan: z.enum(PLAN_TIERS),
    tags: z.array(z.string()).default([]),
    catalogo: z
      .array(z.object({ nombre: z.string().min(2), precio: z.string().min(1) }))
      .optional(),
    latitude: z.number().min(-90).max(90).optional(),
    longitude: z.number().min(-180).max(180).optional(),
    instagram: z.string().url().regex(/^https:\/\//, 'Solo URLs https').optional(),
    facebook: z.string().url().regex(/^https:\/\//, 'Solo URLs https').optional(),
    website: z.string().url().regex(/^https:\/\//, 'Solo URLs https').optional(),
    createdAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato YYYY-MM-DD'),
  }),
});

const categories = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string().min(2),
    description: z.string().min(10),
    icon: z.string().min(1),
    color: z.string().min(3),
  }),
});

const plans = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string().min(2),
    // Escalón del PDF (PRESENCIA, CONTACTO, CONFIANZA, VISIBILIDAD): eyebrow de la card.
    kicker: z.string().min(2),
    price: z.number().int().min(0),
    priceLabel: z.string().min(2),
    // Línea anual con ahorro ("o $50.000 al año · te ahorrás 2 meses"). Opcional.
    annualLabel: z.string().min(2).optional(),
    description: z.string().min(10),
    features: z.array(z.string()).min(1),
    limitations: z.array(z.string()).optional(),
    cta: z.string().min(2),
    highlighted: z.boolean().default(false),
    badge: z.string().optional(),
  }),
});

export const collections = { businesses, categories, plans };
