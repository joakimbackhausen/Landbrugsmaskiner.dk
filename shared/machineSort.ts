interface Categorised {
  category?: { id: string; name: string }[];
  title?: string;
  id: number;
}

function categoryHaystack(slug: string, name: string): string {
  return `${slug} ${name.toLowerCase()}`.normalize('NFD').replace(/\p{Diacritic}/gu, '');
}

/** Lower = shown first in lists */
export function getCategorySortPriority(slug: string, name: string): number {
  const hay = categoryHaystack(slug, name);

  if (hay.includes('traktor')) return 0;
  if (hay.includes('mejet') || hay.includes('taersk') || hay.includes('tærsk')) return 1;
  if (hay.includes('minil') || hay.includes('minitraktor')) return 2;
  if (hay.includes('landbrug')) return 3;
  if (hay.includes('have') || hay.includes('park')) return 4;
  if (hay.includes('entrepren')) return 5;

  return 6;
}

export function getMachineSortPriority(machine: Categorised): number {
  let priority = 99;

  for (const cat of machine.category ?? []) {
    priority = Math.min(priority, getCategorySortPriority(cat.id, cat.name));
  }

  const title = machine.title?.toLowerCase() ?? '';
  if (priority > 0 && title.includes('traktor')) {
    priority = 0;
  }

  return priority;
}

export function compareMachinesForDisplay(a: Categorised, b: Categorised): number {
  const priorityDiff = getMachineSortPriority(a) - getMachineSortPriority(b);
  if (priorityDiff !== 0) return priorityDiff;
  return b.id - a.id;
}

export function sortMachinesForDisplay<T extends Categorised>(
  machines: T[],
  options?: { preserveCategoryOrder?: boolean },
): T[] {
  const sorted = [...machines];
  if (options?.preserveCategoryOrder) {
    sorted.sort((a, b) => b.id - a.id);
  } else {
    sorted.sort(compareMachinesForDisplay);
  }
  return sorted;
}

export function compareCategoriesForDisplay(
  a: { slug: string; name: string; count: number },
  b: { slug: string; name: string; count: number },
): number {
  const priorityDiff =
    getCategorySortPriority(a.slug, a.name) - getCategorySortPriority(b.slug, b.name);
  if (priorityDiff !== 0) return priorityDiff;
  return b.count - a.count;
}
