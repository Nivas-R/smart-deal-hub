
export type Platform = 'Amazon' | 'Flipkart' | 'Myntra' | 'Meesho';

export type Category = 'Beauty' | 'Clothing' | 'Home Essentials' | 'General';

export interface Product {
  id: string;
  name: string;
  imageUrl: string;
  affiliateLink: string;
  platform: Platform;
  categories: Category[];
  description: string;
  isTrending: boolean;
  timestamp: string;
}

export interface GoogleSheetsData {
  status: 'success' | 'error';
  data?: Product[];
  message?: string;
}
