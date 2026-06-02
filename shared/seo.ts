import { machineSlug } from './machineSlug';

export const SEO = {
  siteName: 'Landbrugsmaskiner.dk',
  baseUrl: 'https://www.landbrugsmaskiner.dk',
  company: 'Birkballe & Nicholaisen ApS',
  tagline: 'Kvalitet — Kompetence — Service',
  telephone: '+4586379268',
  telephoneDisplay: '86 37 92 68',
  fax: '86 37 93 33',
  email: 'lbb@landbrugsmaskiner.dk',
  logo: '/images/lm-logo.png',
  defaultImage: '/images/hero.jpg',
  locale: 'da_DK',
  language: 'da-DK',
  founded: 1973,
  address: {
    street: 'Mørkevej 8',
    city: 'Thorsager',
    postalCode: '8410',
    region: 'Midtjylland',
    country: 'DK',
  },
  geo: {
    latitude: 56.341803,
    longitude: 10.434819,
  },
  openingHours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '06:00', closes: '16:00' },
  ],
  brands: ['Deutz-Fahr', 'Maschio', 'Pöttinger', 'Rabe', 'Keltec', 'Suire'],
  defaultKeywords: [
    'landbrugsmaskiner',
    'brugte traktorer',
    'nye traktorer',
    'Deutz-Fahr',
    'Maschio',
    'Pottinger',
    'Thorsager',
    'Djursland',
    'maskinforhandler',
    'værksted',
    'reservedele',
  ],
} as const;

export type BreadcrumbItem = { label: string; path: string };

export function absoluteUrl(path = ''): string {
  if (!path) return SEO.baseUrl;
  if (path.startsWith('http')) return path;
  return `${SEO.baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: absoluteUrl(item.path),
    })),
  };
}

export function organizationSchema() {
  return {
    '@type': 'Organization',
    '@id': `${SEO.baseUrl}/#organization`,
    name: SEO.company,
    alternateName: SEO.siteName,
    url: SEO.baseUrl,
    logo: absoluteUrl(SEO.logo),
    telephone: SEO.telephone,
    email: SEO.email,
    foundingDate: String(SEO.founded),
    address: {
      '@type': 'PostalAddress',
      streetAddress: SEO.address.street,
      addressLocality: SEO.address.city,
      postalCode: SEO.address.postalCode,
      addressCountry: SEO.address.country,
    },
    sameAs: ['https://www.facebook.com/landbrugsmaskiner'],
  };
}

export function localBusinessSchema() {
  return {
    '@type': 'AutoDealer',
    '@id': `${SEO.baseUrl}/#localbusiness`,
    name: SEO.company,
    alternateName: SEO.siteName,
    url: SEO.baseUrl,
    image: absoluteUrl(SEO.defaultImage),
    logo: absoluteUrl(SEO.logo),
    telephone: SEO.telephone,
    email: SEO.email,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: SEO.address.street,
      addressLocality: SEO.address.city,
      postalCode: SEO.address.postalCode,
      addressRegion: SEO.address.region,
      addressCountry: SEO.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SEO.geo.latitude,
      longitude: SEO.geo.longitude,
    },
    openingHoursSpecification: SEO.openingHours.map((entry) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: entry.days,
      opens: entry.opens,
      closes: entry.closes,
    })),
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Djursland' },
      { '@type': 'Country', name: 'Denmark' },
    ],
    sameAs: ['https://www.facebook.com/landbrugsmaskiner'],
  };
}

export function webSiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': `${SEO.baseUrl}/#website`,
    name: SEO.siteName,
    url: SEO.baseUrl,
    inLanguage: SEO.language,
    publisher: { '@id': `${SEO.baseUrl}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SEO.baseUrl}/maskiner?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function homeGraphSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [organizationSchema(), localBusinessSchema(), webSiteSchema()],
  };
}

export function webPageSchema(title: string, description: string, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: absoluteUrl(path),
    inLanguage: SEO.language,
    isPartOf: { '@id': `${SEO.baseUrl}/#website` },
    about: { '@id': `${SEO.baseUrl}/#organization` },
  };
}

export interface MachineSeoInput {
  id: number;
  title: string;
  brand: string;
  model?: string;
  year?: string;
  price: string;
  currency?: string;
  description?: string;
  pictures?: { url: string }[];
  category?: { name: string }[];
}

export function productSchema(machine: MachineSeoInput, slug: string) {
  const price = parseInt(machine.price, 10);
  const images = machine.pictures?.map((p) => p.url).filter(Boolean) ?? [];
  const categoryName = machine.category?.[0]?.name;

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${machine.brand} ${machine.title}`.trim(),
    description: machine.description?.slice(0, 500) || `${machine.brand} ${machine.title} til salg hos ${SEO.siteName} i Thorsager.`,
    sku: String(machine.id),
    brand: { '@type': 'Brand', name: machine.brand },
    category: categoryName,
    image: images.length > 0 ? images : [absoluteUrl(SEO.defaultImage)],
    url: absoluteUrl(`/maskine/${slug}`),
    itemCondition: 'https://schema.org/UsedCondition',
    offers: {
      '@type': 'Offer',
      url: absoluteUrl(`/maskine/${slug}`),
      priceCurrency: machine.currency || 'DKK',
      price: Number.isFinite(price) && price > 0 ? price : undefined,
      availability: 'https://schema.org/InStock',
      seller: { '@id': `${SEO.baseUrl}/#organization` },
      areaServed: 'DK',
    },
  };
}

export interface MachineListItem {
  id: number;
  title: string;
  brand: string;
}

export function itemListSchema(machines: MachineListItem[], path: string, listName: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: listName,
    url: absoluteUrl(path),
    numberOfItems: machines.length,
    itemListElement: machines.slice(0, 50).map((machine, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: `${machine.brand} ${machine.title}`.trim(),
      url: absoluteUrl(`/maskine/${machineSlug(machine.id, machine.title)}`),
    })),
  };
}

export { machineSlug };

export function formatMachineDescription(machine: MachineSeoInput): string {
  const parts = [
    `${machine.brand} ${machine.title}`.trim(),
    machine.year ? `fra ${machine.year}` : null,
    'til salg hos Birkballe & Nicholaisen i Thorsager',
  ].filter(Boolean);

  const price = parseInt(machine.price, 10);
  if (Number.isFinite(price) && price > 0) {
    parts.push(`Pris ${price.toLocaleString('da-DK')} kr. ekskl. moms`);
  } else {
    parts.push('Ring for pris');
  }

  parts.push('Ring 86 37 92 68 for fremvisning.');
  return parts.join('. ').replace(/\.\./g, '.');
}

export function pageKeywords(extra: string[] = []): string[] {
  return [...SEO.defaultKeywords, ...extra];
}
