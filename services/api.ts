import { Product } from '../types';
import { API_ENDPOINT } from '../constants';

/**
 * MOCK DATA (used only if API fails)
 */
const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Minimalist Ceramic Vase',
    imageUrl: 'https://picsum.photos/seed/vase/400/400',
    affiliateLink: 'https://amazon.com',
    platform: 'Amazon',
    categories: ['Home Essentials', 'General'],
    description: 'Perfect for modern aesthetics and minimalist home decor.',
    isTrending: true,
    timestamp: new Date().toISOString()
  }
];

/**
 * FETCH PRODUCTS (READ ONLY)
 */
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    if (!API_ENDPOINT) throw new Error('API endpoint not set');

    const response = await fetch(API_ENDPOINT);
    const text = await response.text();

    // Google Sheets GVIZ returns wrapped JSON
    const json = JSON.parse(text.substring(47).slice(0, -2));
    const rows = json.table.rows;

    return rows.map((row: any): Product => ({
      id: String(row.c[0]?.v ?? ''),
      name: row.c[1]?.v ?? '',
      description: row.c[2]?.v ?? '',
      imageUrl: row.c[3]?.v ?? '',
      affiliateLink: row.c[4]?.v ?? '',
      platform: row.c[5]?.v ?? '',
      categories: row.c[6]?.v ? row.c[6].v.split(',').map((c: string) => c.trim()) : [],
      isTrending: row.c[7]?.v === true || row.c[7]?.v === 'true',
      timestamp: new Date().toISOString()
    }));
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return MOCK_PRODUCTS;
  }
};

/**
 * ADD PRODUCT (DISABLED FOR NOW)
 * We will enable this later after read works perfectly
 */
export const addProduct = async (): Promise<boolean> => {
  console.warn('addProduct is disabled in read-only mode');
  return false;
};
