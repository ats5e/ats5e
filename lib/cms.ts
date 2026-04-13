export const CMS_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5001";

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

export async function fetchCmsCollection<T>(collection: string): Promise<T[]> {
  const response = await fetch(`${CMS_API_BASE_URL}/api/crud/${collection}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${collection}.`);
  }

  const data = (await response.json().catch(() => [])) as unknown;
  return Array.isArray(data) ? (data as T[]) : [];
}

export async function fetchCmsItem<T>(collection: string, id: string): Promise<T | null> {
  const response = await fetch(`${CMS_API_BASE_URL}/api/crud/${collection}/${id}`);

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch ${collection}/${id}.`);
  }

  return (await response.json()) as T;
}

export function sortByDisplayOrder<T extends DisplayOrderedRecord>(items: T[]): T[] {
  return [...items].sort((left, right) => (left.displayOrder ?? 0) - (right.displayOrder ?? 0));
}

export function logCmsFallback(message: string, error: unknown): void {
  if (process.env.NODE_ENV !== "production") {
    console.warn(message, error);
  }
}
