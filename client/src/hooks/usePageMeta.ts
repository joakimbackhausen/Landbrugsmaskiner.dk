import { useEffect, useMemo } from 'react';
import {
  SEO,
  absoluteUrl,
  breadcrumbSchema,
  type BreadcrumbItem,
} from '@shared/seo';

export type { BreadcrumbItem };

type OgType = 'website' | 'product' | 'article';

interface PageMetaOptions {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
  ogType?: OgType;
  keywords?: string[];
}

function setMeta(name: string, content: string, property = false) {
  const attr = property ? 'property' : 'name';
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.content = content;
}

function setLink(rel: string, href: string, hreflang?: string) {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`;
  let el = document.querySelector(selector) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    if (hreflang) el.hreflang = hreflang;
    document.head.appendChild(el);
  }
  el.href = href;
}

function setCanonical(href: string) {
  setLink('canonical', href);
}

export function usePageMeta({
  title,
  description,
  path = '',
  image,
  noIndex,
  ogType = 'website',
  keywords,
}: PageMetaOptions) {
  useEffect(() => {
    const fullTitle = title.includes(SEO.siteName) ? title : `${title} | ${SEO.siteName}`;
    const url = absoluteUrl(path);
    const ogImage = image ? absoluteUrl(image) : absoluteUrl(SEO.defaultImage);

    document.title = fullTitle;
    document.documentElement.lang = 'da';

    setMeta('description', description);
    setMeta('keywords', (keywords ?? SEO.defaultKeywords).join(', '));
    setMeta('author', SEO.company);
    setMeta('robots', noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    setMeta('geo.region', 'DK-82');
    setMeta('geo.placename', 'Thorsager');
    setMeta('geo.position', `${SEO.geo.latitude};${SEO.geo.longitude}`);
    setMeta('ICBM', `${SEO.geo.latitude}, ${SEO.geo.longitude}`);

    setCanonical(url);
    setLink('alternate', url, SEO.language);

    setMeta('og:title', fullTitle, true);
    setMeta('og:description', description, true);
    setMeta('og:url', url, true);
    setMeta('og:image', ogImage, true);
    setMeta('og:image:alt', `${SEO.siteName} — ${SEO.tagline}`, true);
    setMeta('og:type', ogType, true);
    setMeta('og:locale', SEO.locale, true);
    setMeta('og:site_name', SEO.siteName, true);

    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);
    setMeta('twitter:image', ogImage);
  }, [title, description, path, image, noIndex, ogType, keywords]);
}

export function useJsonLd(id: string, data: Record<string, unknown> | null | undefined) {
  const serialized = useMemo(() => (data ? JSON.stringify(data) : null), [data]);

  useEffect(() => {
    if (!serialized) return;

    let script = document.getElementById(id) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = serialized;

    return () => {
      script?.remove();
    };
  }, [id, serialized]);
}

export function useBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  useJsonLd(
    'jsonld-breadcrumb',
    items.length > 0 ? breadcrumbSchema(items) : null,
  );
}

interface PageSeoOptions extends PageMetaOptions {
  breadcrumbs?: BreadcrumbItem[];
  jsonLd?: Record<string, unknown> | null;
  jsonLdId?: string;
}

export function usePageSeo({
  breadcrumbs,
  jsonLd,
  jsonLdId = 'jsonld-page',
  ...meta
}: PageSeoOptions) {
  usePageMeta(meta);
  useBreadcrumbJsonLd(breadcrumbs ?? []);
  useJsonLd(jsonLdId, jsonLd ?? null);
}

export { SEO, absoluteUrl };
