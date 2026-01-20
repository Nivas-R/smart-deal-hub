
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProducts } from '../services/api';
import { Product, Platform, Category } from '../types';
import { CATEGORIES } from '../constants';
import ProductCard from '../components/ProductCard';

const PlatformPage: React.FC = () => {
  const { platformName } = useParams<{ platformName: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const [loading, setLoading] = useState(true);

  const currentPlatform = (platformName?.charAt(0).toUpperCase() + platformName?.slice(1)) as Platform;

  useEffect(() => {
    setLoading(true);
    fetchProducts().then(data => {
      const platformProducts = data.filter(p => p.platform.toLowerCase() === platformName?.toLowerCase());
      setProducts(platformProducts);
      setFilteredProducts(platformProducts);
      setLoading(false);
    });
    // Scroll to top on navigation
    window.scrollTo(0, 0);
  }, [platformName]);

  useEffect(() => {
    if (activeCategory === 'All') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.categories.includes(activeCategory as Category)));
    }
  }, [activeCategory, products]);

  return (
    <div className="pb-20">
      {/* Platform Hero */}
      <section className="bg-white/50 py-20 mb-12 border-b border-[#310A31]/5">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4 text-[#310A31]">
            {currentPlatform} Finds
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Our top-rated picks specifically from {currentPlatform}. Curated for quality, style, and value.
          </p>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="max-w-6xl mx-auto px-4 mb-12">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => setActiveCategory('All')}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
              activeCategory === 'All' 
                ? 'bg-[#310A31] text-white shadow-lg' 
                : 'bg-white text-gray-500 hover:bg-gray-100'
            }`}
          >
            All Items
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeCategory === cat 
                  ? 'bg-[#310A31] text-white shadow-lg' 
                  : 'bg-white text-gray-500 hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Product Grid */}
      <section className="max-w-6xl mx-auto px-4">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1,2,3,4,5,6,7,8].map(i => (
              <div key={i} className="aspect-[4/5] bg-white rounded-3xl animate-pulse"></div>
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 animate-in fade-in duration-500">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/40 rounded-[40px] border border-dashed border-[#310A31]/20">
            <h3 className="text-xl font-serif mb-2">No products found</h3>
            <p className="text-gray-500">Try selecting a different category or platform.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default PlatformPage;
