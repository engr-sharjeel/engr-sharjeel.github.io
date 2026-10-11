/** Editorial priority for this power-engineering portfolio, not a demand score. */
export const projectPriority = [
  'range-extended-electric-vehicle',
  'center-tapped-transformer',
  'micro-hydropower-plant',
  'autonomous-navigation-robot',
  'smart-access-monitoring-system',
  'electronic-voting-machine',
  'substation-distribution-design',
  'pcb-layout-practice',
  'temperature-monitoring-system',
  'water-level-indication',
  'matlab-signal-calculator',
  'solidworks-engineering-drawing',
  'frequency-band-pass-filter',
  'audio-amplifier',
  'digital-logic-clock',
  'rain-detection-circuit',
  'university-management-system',
  'oop-library-management',
  'traffic-monitoring-ethics',
] as const;

export type PrioritisedProjectSlug = typeof projectPriority[number];

const priorities: ReadonlyMap<string, number> = new Map(projectPriority.map((slug, index) => [slug, index]));

export function projectPriorityIndex(slug: string): number {
  return priorities.get(slug) ?? Number.MAX_SAFE_INTEGER;
}

interface ProjectPriorityEntry {
  data: { slug: string };
}

export function compareProjectPriority(a: ProjectPriorityEntry, b: ProjectPriorityEntry): number {
  return projectPriorityIndex(a.data.slug) - projectPriorityIndex(b.data.slug)
    || a.data.slug.localeCompare(b.data.slug);
}

/** Return a sorted copy so callers retain their original collection. */
export function sortProjectsByPriority<T extends ProjectPriorityEntry>(projects: readonly T[]): T[] {
  return [...projects].sort(compareProjectPriority);
}
