import type { PlaceholderValues } from './types';

// Default placeholder values - TODO: Replace before production
export const DEFAULT_PLACEHOLDERS: PlaceholderValues = {
  companyName: '[COMPANY NAME]',
  companyLegalName: '[COMPANY LEGAL NAME]',
  address: '[ADDRESS]',
  email: 'legal@example.com', // TODO: Update before production
  siret: '[SIRET]',
  dpoEmail: '[DPO EMAIL]',
  country: '[COUNTRY]',
};

/**
 * Replaces placeholders in legal content with actual values
 * @param content The content string containing placeholders
 * @param values The placeholder values to use (falls back to defaults)
 * @returns Content with placeholders replaced
 */
export function replacePlaceholders(
  content: string,
  values: PlaceholderValues = DEFAULT_PLACEHOLDERS
): string {
  const mergedValues = { ...DEFAULT_PLACEHOLDERS, ...values };

  return content
    .replace(/\[COMPANY NAME\]/g, mergedValues.companyName || '[COMPANY NAME]')
    .replace(/\[COMPANY LEGAL NAME\]/g, mergedValues.companyLegalName || '[COMPANY LEGAL NAME]')
    .replace(/\[ADDRESS\]/g, mergedValues.address || '[ADDRESS]')
    .replace(/\[EMAIL\]/g, mergedValues.email || '[EMAIL]')
    .replace(/\[SIRET\]/g, mergedValues.siret || '[SIRET]')
    .replace(/\[DPO EMAIL\]/g, mergedValues.dpoEmail || '[DPO EMAIL]')
    .replace(/\[COUNTRY\]/g, mergedValues.country || '[COUNTRY]');
}

/**
 * Replaces placeholders in an array of content strings
 */
export function replacePlaceholdersInArray(
  content: string[],
  values?: PlaceholderValues
): string[] {
  return content.map(item => replacePlaceholders(item, values));
}
