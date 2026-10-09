// MCP server "clasificados-las-flores" (stdio).
// Expone el directorio como tools para que cualquier agente MCP pueda:
// buscar negocios, ver fichas, listar categorías y explicar los planes.
// Fuente de verdad: ../src/content/*.json (mismos datos que la web).

import { readFile, readdir } from 'node:fs/promises';
import { join, basename, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'content');

async function loadCollection(dir) {
  const files = (await readdir(join(ROOT, dir))).filter((f) => f.endsWith('.json'));
  const entries = [];
  for (const f of files) {
    const data = JSON.parse(await readFile(join(ROOT, dir, f), 'utf-8'));
    entries.push({ slug: basename(f, '.json'), ...data });
  }
  return entries;
}

// Caché en memoria con TTL: evita re-leer todo el FS en cada invocación.
const CACHE_TTL_MS = 60_000;
const cache = new Map();
async function cachedCollection(dir) {
  const hit = cache.get(dir);
  if (hit && Date.now() - hit.at < CACHE_TTL_MS) return hit.data;
  const data = await loadCollection(dir);
  cache.set(dir, { at: Date.now(), data });
  return data;
}

const norm = (s) =>
  String(s ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

const PLAN_ORDER = { oro: 0, plata: 1, bronce: 2, gratis: 3 };
const rank = (list) =>
  [...list].sort((a, b) => PLAN_ORDER[a.plan] - PLAN_ORDER[b.plan] || String(a.name).localeCompare(String(b.name)));

const server = new McpServer({
  name: 'clasificados-las-flores',
  version: '1.0.0',
});

server.registerTool(
  'buscar_negocios',
  {
    title: 'Buscar negocios en el directorio',
    description:
      'Busca comercios, oficios y servicios de Las Flores por texto libre y/o categoría. Devuelve ordenados por plan (Vidriera Digital primero).',
    inputSchema: {
      consulta: z.string().max(200).describe('Texto libre: ej "plomero", "pizza", "alquiler"').optional(),
      categoria: z
        .enum(['gastronomia', 'servicios', 'comercios', 'inmuebles', 'vehiculos', 'empleo', 'salud', 'educacion'])
        .describe('Filtra por categoría')
        .optional(),
      limite: z.number().int().min(1).max(50).optional().describe('Máximo de resultados (defecto 20)'),
    },
  },
  async ({ consulta = '', categoria, limite = 20 }) => {
    const all = await cachedCollection('businesses');
    const q = norm(consulta.trim());
    const words = q ? q.split(/\s+/) : [];
    const out = rank(
      all
        .filter((b) => !categoria || b.category === categoria)
        .filter((b) => {
          if (!words.length) return true;
          const hay = norm(`${b.name} ${b.shortDescription} ${b.description} ${b.tags.join(' ')} ${b.address}`);
          return words.every((w) => hay.includes(w));
        })
        .map((b) => ({
          slug: b.slug,
          nombre: b.name,
          categoria: b.category,
          resumen: b.shortDescription,
          direccion: b.address,
          horarios: b.hours,
          plan: b.plan,
          verificado: b.verified,
          whatsapp: b.hasWhatsAppButton ? b.whatsapp ?? null : null,
          ficha: `https://clasificadoslasflores.com.ar/comercio/${b.slug}`,
        }))
        .slice(0, limite),
    );
    return { content: [{ type: 'text', text: JSON.stringify(out, null, 2) }] };
  },
);

server.registerTool(
  'ver_negocio',
  {
    title: 'Ver ficha completa de un negocio',
    description: 'Devuelve todos los datos de un negocio por su slug.',
    inputSchema: { slug: z.string().min(1).max(200).regex(/^[a-z0-9-]+$/).describe('Slug del negocio, ej "ficha-gratis-muestra"') },
  },
  async ({ slug }) => {
    const all = await cachedCollection('businesses');
    const b = all.find((x) => x.slug === slug);
    if (!b) return { content: [{ type: 'text', text: `No existe el negocio "${slug}".` }], isError: true };
    return { content: [{ type: 'text', text: JSON.stringify(b, null, 2) }] };
  },
);

server.registerTool(
  'listar_categorias',
  {
    title: 'Listar categorías del directorio',
    description: 'Devuelve las 8 categorías con su descripción y cantidad de publicados.',
    inputSchema: {},
  },
  async () => {
    const [cats, biz] = await Promise.all([cachedCollection('categories'), cachedCollection('businesses')]);
    const out = cats.map((c) => ({
      ...c,
      publicados: biz.filter((b) => b.category === c.slug).length,
    }));
    return { content: [{ type: 'text', text: JSON.stringify(out, null, 2) }] };
  },
);

server.registerTool(
  'ver_planes',
  {
    title: 'Ver planes y precios',
    description:
      'Devuelve los 4 planes del modelo de negocio (Gratis, Contacto Directo $5.000, Comercio Verificado $12.000, Vidriera Digital $25.000) con features. Úsalo cuando pregunten por publicar, precios o visibilidad.',
    inputSchema: {},
  },
  async () => {
    const plans = await cachedCollection('plans');
    const order = ['gratis', 'bronce', 'plata', 'oro'];
    plans.sort((a, b) => order.indexOf(a.slug) - order.indexOf(b.slug));
    return { content: [{ type: 'text', text: JSON.stringify(plans, null, 2) }] };
  },
);

const transport = new StdioServerTransport();
await server.connect(transport);
