let rawBase = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5001";
// Sanitize misconfigured URLs (remove trailing dots, slashes, and '/api')
rawBase = rawBase.replace(/[\.\/]+$/, "");
if (rawBase.endsWith("/api")) {
  rawBase = rawBase.substring(0, rawBase.length - 4);
}
export const CMS_API_BASE_URL = rawBase;


type CmsRecord = {
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
};

type DisplayOrderedRecord = {
  displayOrder?: number | null;
};

export type CmsSolution = CmsRecord & DisplayOrderedRecord & {
  title: string;
  slug: string;
  description: string;
  icon?: string;
  image?: string;
  category?: string;
  detailedContent?: string;
};

export type CmsCaseStudy = CmsRecord & {
  title: string;
  slug: string;
  clientName: string;
  challenge: string;
  solution: string;
  outcome: string;
  industry?: string;
  image?: string;
  featured?: boolean;
};

export type CmsInsight = CmsRecord & {
  title: string;
  slug: string;
  author?: string;
  date?: string;
  category?: string;
  summary?: string;
  bodyContent?: string;
  image?: string;
  downloadFileUrl?: string;
  published?: boolean;
  showcaseOnHome?: boolean;
  showcaseOrder?: number | null;
};

export type CmsTeamMember = CmsRecord & DisplayOrderedRecord & {
  name: string;
  role: string;
  bio?: string;
  photoUrl?: string;
};

export type CmsPartner = CmsRecord & DisplayOrderedRecord & {
  name: string;
  logoUrl: string;
  website?: string;
  category?: string;
  description?: string;
};

export type CmsHomePage = CmsRecord & {
  heroHeadline?: string;
  heroSubheadline?: string;
  heroPrimaryCtaLabel?: string;
  heroSecondaryCtaLabel?: string;
  stat1Value?: string;
  stat1Label?: string;
  stat2Value?: string;
  stat2Label?: string;
  stat3Value?: string;
  stat3Label?: string;
  fiveESectionEyebrow?: string;
  fiveEHeadline?: string;
  fiveESubheadline?: string;
  fiveESectionCtaLabel?: string;
  fiveECard1Tag?: string;
  fiveECard1Headline?: string;
  fiveECard1Tagline?: string;
  fiveECard2Tag?: string;
  fiveECard2Headline?: string;
  fiveECard2Tagline?: string;
  fiveECard3Tag?: string;
  fiveECard3Headline?: string;
  fiveECard3Tagline?: string;
  fiveECard4Tag?: string;
  fiveECard4Headline?: string;
  fiveECard4Tagline?: string;
  fiveECard5Tag?: string;
  fiveECard5Headline?: string;
  fiveECard5Tagline?: string;
  solutionsEyebrow?: string;
  solutionsHeadline?: string;
  solutionsSubheadline?: string;
  solutionsCtaLabel?: string;
  testimonialQuote?: string;
  testimonialAuthor?: string;
  testimonialCtaLabel?: string;
  eduflowEyebrow?: string;
  eduflowHeadline?: string;
  eduflowSubheadline?: string;
  eduflowCtaLabel?: string;
  ctaEyebrow?: string;
  ctaHeadline?: string;
  ctaSubheadline?: string;
  ctaButtonLabel?: string;
};

export async function apiFetch(input: string | URL | Request, init?: RequestInit): Promise<Response> {
  let response = await fetch(input, init);
  if (!response.ok) {
    const urlStr = input.toString();
    if (urlStr.includes('/api/') && !urlStr.includes('/api/api/')) {
      const fallbackUrl = urlStr.replace('/api/', '/api/api/');
      const fallbackResponse = await fetch(fallbackUrl, init);
      if (fallbackResponse.ok || fallbackResponse.status === 404) {
        response = fallbackResponse;
      }
    }
  }
  return response;
}

export async function fetchCmsCollection<T>(collection: string): Promise<T[]> {
  try {
    const response = await apiFetch(`${CMS_API_BASE_URL}/api/crud/${collection}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch ${collection}: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    logCmsFallback(`Failed to fetch ${collection}`, error);
    throw error;
  }
}

export async function fetchCmsItem<T>(collection: string, id: string): Promise<T | null> {
  try {
    const response = await apiFetch(`${CMS_API_BASE_URL}/api/crud/${collection}/${id}`, {
      cache: "no-store",
    });

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error(`Failed to fetch ${collection}/${id}: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    logCmsFallback(`Failed to fetch ${collection}/${id}`, error);
    throw error;
  }
}

// Server-side variants: cached with ISR and tolerant of an unreachable backend,
// so pages can render CMS content into the initial HTML and fall back to static data.
const CMS_REVALIDATE_SECONDS = 60;
const CMS_SERVER_TIMEOUT_MS = 4000;

export async function fetchCmsCollectionServer<T>(collection: string): Promise<T[] | null> {
  try {
    const response = await apiFetch(`${CMS_API_BASE_URL}/api/crud/${collection}`, {
      next: { revalidate: CMS_REVALIDATE_SECONDS, tags: [`cms:${collection}`] },
      signal: AbortSignal.timeout(CMS_SERVER_TIMEOUT_MS),
    });
    if (!response.ok) return null;
    const data = await response.json();
    return Array.isArray(data) ? data : null;
  } catch (error) {
    logCmsFallback(`Server fetch failed for ${collection}`, error);
    return null;
  }
}

// Like fetchCmsItemServer, but also reports when the CMS definitively has no such item
// (as opposed to being unreachable), so pages can return a real 404 without risking one
// during a CMS outage.
export async function fetchCmsItemResultServer<T>(collection: string, id: string): Promise<{ item: T | null; missing: boolean }> {
  try {
    const response = await apiFetch(`${CMS_API_BASE_URL}/api/crud/${collection}/${encodeURIComponent(id)}`, {
      next: { revalidate: CMS_REVALIDATE_SECONDS, tags: [`cms:${collection}`] },
      signal: AbortSignal.timeout(CMS_SERVER_TIMEOUT_MS),
    });
    if (response.status === 404) return { item: null, missing: true };
    if (!response.ok) return { item: null, missing: false };
    const item = (await response.json()) as T | null;
    return { item, missing: item === null };
  } catch (error) {
    logCmsFallback(`Server fetch failed for ${collection}/${id}`, error);
    return { item: null, missing: false };
  }
}

export async function fetchCmsItemServer<T>(collection: string, id: string): Promise<T | null> {
  try {
    const response = await apiFetch(`${CMS_API_BASE_URL}/api/crud/${collection}/${encodeURIComponent(id)}`, {
      next: { revalidate: CMS_REVALIDATE_SECONDS, tags: [`cms:${collection}`] },
      signal: AbortSignal.timeout(CMS_SERVER_TIMEOUT_MS),
    });
    if (!response.ok) return null;
    return response.json();
  } catch (error) {
    logCmsFallback(`Server fetch failed for ${collection}/${id}`, error);
    return null;
  }
}

export function sortByDisplayOrder<T extends DisplayOrderedRecord>(items: T[]): T[] {
  return [...items].sort((left, right) => (left.displayOrder ?? 0) - (right.displayOrder ?? 0));
}

export function logCmsFallback(message: string, error: unknown): void {
  if (process.env.NODE_ENV !== "production") {
    console.warn(message, error);
  }
}

export function isInsightLive(insight: { published?: boolean; date?: string }, now: number = Date.now()): boolean {
  if (insight.published === false) return false;
  const timestamp = Date.parse(insight.date ?? "");
  return Number.isNaN(timestamp) || timestamp <= now;
}

function insightTimestamp(insight: CmsInsight): number {
  const parsed = Date.parse(insight.date ?? insight.createdAt ?? "");
  return Number.isNaN(parsed) ? 0 : parsed;
}

// CMS insights plus repo-published extras the CMS has no record for, newest first.
// A CMS record always wins on slug, including an unpublished one, so editors can override or
// hide any repo piece. Only repo extras are date-gated; CMS visibility is just `published`.
export function mergeInsightLists(primary: CmsInsight[], extras: CmsInsight[], now: number = Date.now()): CmsInsight[] {
  const cmsSlugs = new Set(primary.map((insight) => insight.slug).filter(Boolean));
  const visible = primary.filter((insight) => insight.slug && insight.published !== false);
  const additions = extras.filter((insight) => !cmsSlugs.has(insight.slug) && isInsightLive(insight, now));
  return [...visible, ...additions].sort((left, right) => insightTimestamp(right) - insightTimestamp(left));
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function formatInsightDate(candidate?: string): string {
  const timestamp = Date.parse(candidate ?? "");
  if (Number.isNaN(timestamp)) return "";
  const date = new Date(timestamp);
  return `${date.getUTCDate()} ${MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}

// Short teaser for listing cards: the first paragraph, cut at a sentence end when one fits,
// otherwise at a word boundary — never mid-word or mid-number.
export function createInsightExcerpt(bodyContent?: string, summary?: string, maxLength = 190): string {
  const firstParagraph = (bodyContent ?? "").trim().split(/\n\s*\n/)[0]?.replace(/^##\s*/, "").replace(/\s+/g, " ").trim();
  const source = firstParagraph || summary?.trim() || "";
  if (source.length <= maxLength) return source;

  const window = source.slice(0, maxLength);
  const sentenceEnd = Math.max(window.lastIndexOf(". "), window.lastIndexOf("? "), window.lastIndexOf("! "));
  if (sentenceEnd >= maxLength * 0.55) return window.slice(0, sentenceEnd + 1);

  const wordEnd = window.lastIndexOf(" ");
  return `${window.slice(0, wordEnd > 0 ? wordEnd : maxLength).replace(/[,;:\u2014-]+$/, "")}\u2026`;
}
