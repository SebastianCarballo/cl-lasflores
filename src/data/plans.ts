import { getCollection } from 'astro:content';
import type { Plan } from '@/types';

const TIER_ORDER = ['gratis', 'bronce', 'plata', 'oro'];

export async function listPlans(): Promise<(Plan & { slug: string })[]> {
  const entries = await getCollection('plans');
  return entries
    .map((e) => {
      const tier = e.id.replace(/\.json$/, '') as Plan['tier'];
      return { slug: tier, ...(e.data as Omit<Plan, 'tier'>), tier };
    })
    .sort((a, b) => TIER_ORDER.indexOf(a.tier) - TIER_ORDER.indexOf(b.tier));
}
