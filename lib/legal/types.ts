export interface LegalSection {
  title: string;
  content: string | string[]; // Single paragraph or array of paragraphs
}

export interface LegalDocument {
  title: string;
  lastUpdated: string; // ISO date string
  effectiveDate: string; // ISO date string
  sections: LegalSection[];
}

export interface LegalContent {
  en: LegalDocument;
  fr: LegalDocument;
}

export interface PlaceholderValues {
  companyName?: string;
  companyLegalName?: string;
  address?: string;
  email?: string;
  siret?: string;
  dpoEmail?: string;
  country?: string;
}

export type DocumentType = 'terms' | 'privacy' | 'disclaimer';
