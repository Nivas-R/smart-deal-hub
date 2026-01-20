import { Platform, Category } from './types';

export const COLORS = {
  bg: '#F4ECD6',
  accent: '#310A31',
  accentLight: '#4a124a',
};

export const PLATFORMS: Platform[] = [
  'Amazon',
  'Flipkart',
  'Myntra',
  'Meesho'
];

export const CATEGORIES: Category[] = [
  'Beauty',
  'Clothing',
  'Home Essentials',
  'General'
];

export const SITE_NAME = 'smart deal hub';

/**
 * Google Sheets GVIZ API (CORS-safe)
 * Sheet MUST be shared as "Anyone with the link – Viewer"
 */
export const API_ENDPOINT =
  'https://docs.google.com/spreadsheets/d/13gufIs4ClGekzl0fIzJMaw7iuRScKMgtKH2kB10J_-s/gviz/tq?tqx=out:json';
