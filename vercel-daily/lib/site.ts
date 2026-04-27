export function getSiteOrigin(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) {
    return fromEnv.replace(/\/$/, "");
  }
  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) {
    return `https://${vercel.replace(/\/$/, "")}`;
  }
  return "https://vercel-daily-seven.vercel.app";
}

export function articleCanonicalUrl(slug: string): string {
  return `${getSiteOrigin()}/articles/${encodeURIComponent(slug)}`;
}
