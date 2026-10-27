import type { APIRoute } from 'astro';

type Cotizacion = {
  casa: string;
  nombre: string;
  compra: number;
  venta: number;
  fechaActualizacion?: string;
};

export const GET: APIRoute = async () => {
  const datos: Record<string, Cotizacion> = Object.create(null);
  const casasDolarApi = new Set(['oficial', 'blue', 'bolsa', 'contadoconliqui', 'tarjeta']);

  // 1. DolarApi: oficial, blue, bolsa, contadoconliqui, tarjeta, mayorista, cripto
  try {
    const r = await fetch('https://dolarapi.com/v1/dolares', {
      cache: 'no-store',
      signal: AbortSignal.timeout(8_000),
    });
    if (r.ok) {
      const lista: unknown = await r.json();
      if (!Array.isArray(lista)) throw new Error('DolarApi devolvió un formato inválido');
      lista.forEach((item: unknown) => {
        if (typeof item !== 'object' || item === null) return;
        const d = item as Partial<Cotizacion>;
        if (
          typeof d.casa !== 'string' ||
          !casasDolarApi.has(d.casa) ||
          typeof d.compra !== 'number' ||
          !Number.isFinite(d.compra) ||
          typeof d.venta !== 'number' ||
          !Number.isFinite(d.venta)
        ) return;
        datos[d.casa] = {
          casa: d.casa,
          nombre: typeof d.nombre === 'string' ? d.nombre : d.casa,
          compra: d.compra,
          venta: d.venta,
          ...(typeof d.fechaActualizacion === 'string' && { fechaActualizacion: d.fechaActualizacion }),
        };
      });
    } else {
      throw new Error(`DolarApi respondió ${r.status}`);
    }
  } catch (error) {
    console.error('No se pudieron cargar las cotizaciones de DolarApi:', error);
  }

  // 2. Criptoya: dólar MEP (AL30, 24hs), consultado durante la generación estática
  try {
    const r = await fetch('https://criptoya.com/api/dolar', {
      cache: 'no-store',
      signal: AbortSignal.timeout(8_000),
    });
    if (r.ok) {
      const data = (await r.json()) as {
        mep?: { al30?: { '24hs'?: { price?: unknown } } };
      };
      const mepAl30 = data.mep?.al30?.['24hs']?.price;
      if (typeof mepAl30 === 'number' && Number.isFinite(mepAl30)) {
        datos.mep = {
          casa: 'mep',
          nombre: 'MEP',
          compra: Math.round(mepAl30 * 0.995 * 100) / 100, // compra aprox. 0.5% menos que venta
          venta: Math.round(mepAl30 * 100) / 100,
          fechaActualizacion: new Date().toISOString(),
        };
      }
    } else {
      throw new Error(`CriptoYa respondió ${r.status}`);
    }
  } catch (error) {
    console.error('No se pudo cargar la cotización MEP de CriptoYa:', error);
  }

  return new Response(JSON.stringify(datos), {
    status: 200,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=60' },
  });
};
