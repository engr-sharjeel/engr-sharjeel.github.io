import { site } from './site';
import { withBase } from '../lib/urls';

/** Public native-POST delivery settings; there are no frontend mail credentials. */
export const enquiryDelivery = {
  endpoint: `https://formsubmit.co/${site.email}`,
  recipient: site.email,
  subject: `Portfolio project enquiry for ${site.name}`,
  template: 'table',
  returnPath: '/contact/thanks/',
  privacyUrl: 'https://formsubmit.co/privacy.pdf',
} as const;

export function enquiryReturnUrl(origin: URL | string): string {
  return new URL(withBase(enquiryDelivery.returnPath), origin).href;
}

export const contactPreferences = [
  { value: 'email', label: 'Email' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'phone', label: 'Phone' },
] as const;

export const enquiryFields = {
  service: { label: 'Service / type of help' },
  name: { label: 'Name', maxLength: 120 },
  email: { label: 'Email', maxLength: 254 },
  preferred_contact: { label: 'Preferred contact method' },
  phone: { label: 'Phone / WhatsApp number', maxLength: 60 },
  message: { label: 'What do you need?', maxLength: 5000 },
  project_title: { label: 'Project title', maxLength: 160 },
  organisation: { label: 'Organisation / company', maxLength: 160 },
  timeframe: { label: 'Desired timeframe' },
  budget_currency: { label: 'Budget currency' },
  budget_estimate: { label: 'Budget range or estimate', maxLength: 160 },
  reference_url: { label: 'Reference URL', maxLength: 1000 },
} as const;

export const enquiryTimeframes = [
  'Flexible / not sure',
  'Within a month',
  'In 1–3 months',
  'More than 3 months away',
] as const;

export const enquiryCurrencies = ['PKR', 'USD', 'GBP', 'EUR', 'CAD', 'AUD', 'Other'] as const;
