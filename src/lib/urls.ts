export function withBase(path = '/'): string {
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  return `${base}/${path.replace(/^\/+/, '')}`;
}

export function projectUrl(slug: string): string {
  return withBase(`/projects/${slug}/`);
}
