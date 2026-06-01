const LEGACY_PATHS: Record<string, string> = {
  '/om-os': '/firmaprofil',
  '/finansiering': '/',
  '/reservedele': '/',
};

export function normalizePath(path: string): string {
  const [pathname, ...searchParts] = path.split('?');
  const search = searchParts.length ? searchParts.join('?') : '';

  let normalized = pathname;
  if (normalized.length > 1 && normalized.endsWith('/')) {
    normalized = normalized.replace(/\/+$/, '') || '/';
  }

  const legacy = LEGACY_PATHS[normalized.toLowerCase()];
  if (legacy) normalized = legacy;

  return search ? `${normalized}?${search}` : normalized;
}
