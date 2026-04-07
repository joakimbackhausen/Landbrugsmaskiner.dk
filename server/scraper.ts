import * as cheerio from "cheerio";

const FEED_URL =
  "https://lister.maskinbladet.dk/eksterne/extListe_1.php?GUID=5df23c59-4f75-4277-98df-405da4caec6a&udtraek=1&styleVer=std&CAT=_all_";

interface Machine {
  id: number;
  ad_id: number;
  sku: number;
  company_id: string;
  title: string;
  model: string;
  brand: string;
  year: string;
  price: string;
  currency: string;
  url: string;
  pictures: { url: string; date: string }[];
  category: { id: string; tid: string; name: string }[];
  description: string;
  contact: string;
  address: string;
  extra_parameters: Record<string, { name: string; value: string }>;
  printUrl: string;
}

// ── Cache ──
let cachedMachines: Machine[] | null = null;
let cacheTimestamp = 0;
const CACHE_TTL = 10 * 60 * 1000;
let isRefreshing = false;

async function fetchPage(url: string): Promise<string> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.statusText}`);
  // Feed uses ISO-8859-1 (latin1) encoding — decode properly
  const buffer = await res.arrayBuffer();
  return new TextDecoder("iso-8859-1").decode(buffer);
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/æ/g, "ae")
    .replace(/ø/g, "oe")
    .replace(/å/g, "aa")
    .replace(/ü/g, "u")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function parseListPage(html: string): Machine[] {
  const $ = cheerio.load(html);
  const machines: Machine[] = [];
  let machineId = 1;

  // This feed uses extListe_1 format:
  // - Top-level categories are <h1> elements (e.g. "Entreprenørmaskiner")
  // - Subcategories are in .bgHeader spans (e.g. "Traktorer --> Kompakt traktorer (1)")
  // - Each machine is a <table> with a unique GUID id
  // - Table rows: row 1 = headers, row 2 = image + brand/model/year/price, row 4 = info

  let topCategory = "";
  let subCategory = "";

  // Walk through headings and tables
  $("h1, .bgHeader, table[id]").each((_, el) => {
    const $el = $(el);
    const tagName = (el as any).name || (el as any).tagName?.toLowerCase();

    if (tagName === "h1") {
      topCategory = $el.text().trim();
      return;
    }

    if ($el.hasClass("bgHeader")) {
      // Extract subcategory from span text, e.g. "Traktorer --> Kompakt traktorer  (1)"
      const raw = $el.find("span").text().trim();
      // Remove bullet image text artifacts and count suffix
      subCategory = raw
        .replace(/^\s*\S*\s*/, "") // remove leading bullet
        .replace(/\s*\(\d+\)\s*$/, "") // remove count
        .trim();
      return;
    }

    // This is a machine table
    const tableId = $el.attr("id") || "";
    if (!tableId || tableId.length < 10) return; // skip non-GUID tables

    const rows = $el.find("tr");
    if (rows.length < 2) return;

    // Row index 1 has: image td (rowspan), spacer td, brand+model td, year td, price td
    const dataRow = $(rows[1]);
    const tds = dataRow.find("td");

    // Find the image
    const img = $el.find("img").first();
    const imgSrc = img.attr("src") || "";
    const fullImg = imgSrc
      .replace(/&w=\d+&h=\d+/, "&w=800&h=600")
      .replace(/\?w=\d+&h=\d+/, "?w=800&h=600")
      .replace(/\?list=ext1&w=\d+&h=\d+/, "?w=800&h=600");

    // Find cells with class "background" — these contain brand+model, year, price
    const bgCells = $el.find("td.background");
    const brandModel = $(bgCells[0]).text().trim();
    const year = $(bgCells[1]).text().trim();
    const rawPrice = $(bgCells[2]).text().trim();

    // Split brand and model from "Brand Model" or "Brand  model text"
    // The feed uses &nbsp; between brand and model
    const parts = brandModel.split(/\s+/);
    const brand = parts[0] || "";
    const model = parts.slice(1).join(" ") || "";

    // Clean price: "41.660,00" → "41660"
    const cleanPrice = rawPrice.replace(/\./g, "").replace(/,\d+$/, "");

    // Extract description from Info: text
    let description = "";
    $el.find("li").each((_, li) => {
      const text = $(li).text().trim();
      if (text.startsWith("Info:")) {
        description = text.replace(/^Info:\s*/, "");
      }
    });

    // Extract detail link
    const detailLink = $el.find('a[href*="extDetail"]').first().attr("href") || "";
    const fullDetailLink = detailLink && !detailLink.startsWith("http")
      ? `https://lister.maskinbladet.dk/eksterne/${detailLink}`
      : detailLink;

    const title = `${brand} ${model}`.trim();
    if (!title || title.length < 2) return;

    const categoryName = subCategory || topCategory || "Andet";
    const catSlug = slugify(categoryName);

    machines.push({
      id: machineId,
      ad_id: machineId,
      sku: machineId,
      company_id: "lm",
      title,
      model: model || title,
      brand,
      year,
      price: cleanPrice || "0",
      currency: "DKK",
      url: fullDetailLink,
      pictures: fullImg ? [{ url: fullImg, date: "" }] : [],
      category: [
        { id: slugify(topCategory || "andet"), tid: slugify(topCategory || "andet"), name: topCategory || "Andet" },
        ...(subCategory && subCategory !== topCategory
          ? [{ id: catSlug, tid: catSlug, name: subCategory }]
          : []),
      ],
      description,
      contact: "Leif Birkballe",
      address: "Mørkevej 8, DK-8410 Thorsager",
      extra_parameters: {},
      printUrl: "",
    });
    machineId++;
  });

  return machines;
}

async function enrichWithDetails(machine: Machine): Promise<Machine> {
  if (!machine.url || !machine.url.includes("extDetail")) return machine;
  try {
    const html = await fetchPage(machine.url);
    const $ = cheerio.load(html);

    const pictures: { url: string; date: string }[] = [];
    $("img").each((_, el) => {
      const src = $(el).attr("src") || "";
      if (src.includes("maskinbladet.dk/maskiner/images") || src.includes("maskinbasen.dk")) {
        // Use high-res version: request 1200px wide
        const baseSrc = src.replace(/\?w=\d+&h=\d+/, "");
        const hiRes = baseSrc + "?w=1200&h=900";
        if (!pictures.some((p) => p.url === hiRes)) {
          pictures.push({ url: hiRes, date: "" });
        }
      }
    });
    if (pictures.length > 0) machine.pictures = pictures;

    // Extract print URL for PDF spec sheet
    const printLink = $("a[href*='extPrint']").attr("href") || "";
    if (printLink) {
      const base = new URL(machine.url);
      machine.printUrl = printLink.startsWith("http") ? printLink : `${base.origin}${printLink.startsWith("/") ? "" : "/eksterne/"}${printLink}`;
    }
  } catch {
    // Ignore
  }
  return machine;
}

async function refreshCache(): Promise<void> {
  if (isRefreshing) return;
  isRefreshing = true;

  try {
    console.log("[scraper] Fetching machine list from Maskinbladet...");
    const html = await fetchPage(FEED_URL);
    const machines = parseListPage(html);

    cachedMachines = machines;
    cacheTimestamp = Date.now();
    console.log(`[scraper] Quick cache ready: ${machines.length} machines`);

    // Enrich with detail pages
    const BATCH_SIZE = 10;
    for (let i = 0; i < machines.length; i += BATCH_SIZE) {
      const batch = machines.slice(i, i + BATCH_SIZE);
      await Promise.all(batch.map((m) => enrichWithDetails(m)));
    }

    cachedMachines = machines;
    cacheTimestamp = Date.now();
    console.log(`[scraper] Full cache ready: ${machines.length} machines (with details)`);
  } catch (err) {
    console.error("[scraper] Refresh failed:", err);
  } finally {
    isRefreshing = false;
  }
}

refreshCache();

setInterval(() => {
  const age = Date.now() - cacheTimestamp;
  if (age > CACHE_TTL - 2 * 60 * 1000) refreshCache();
}, 2 * 60 * 1000);

export async function fetchAllMachines(): Promise<Machine[]> {
  if (cachedMachines) {
    if (Date.now() - cacheTimestamp > CACHE_TTL) refreshCache();
    return cachedMachines;
  }
  await refreshCache();
  return cachedMachines || [];
}

export async function fetchMachineById(id: number): Promise<Machine | undefined> {
  const machines = await fetchAllMachines();
  return machines.find((m) => m.id === id);
}

export async function fetchCategories(): Promise<{ slug: string; name: string; count: number }[]> {
  const machines = await fetchAllMachines();
  const catMap = new Map<string, { name: string; count: number }>();
  machines.forEach((m) => {
    // Use top-level category (first in array)
    const cat = m.category[0];
    if (cat) {
      const existing = catMap.get(cat.id);
      if (existing) existing.count++;
      else catMap.set(cat.id, { name: cat.name, count: 1 });
    }
  });
  return Array.from(catMap.entries())
    .map(([slug, { name, count }]) => ({ slug, name, count }))
    .sort((a, b) => b.count - a.count);
}
