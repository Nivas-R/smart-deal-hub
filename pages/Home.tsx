import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../services/api';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts().then(data => {
      setProducts(data); // fetch ALL products
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-28 pb-28 overflow-hidden">

      {/* HERO */}
      <section className="relative pt-32 pb-32 px-4">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-24 left-20 w-[420px] h-[420px] bg-[#310A31] rounded-full blur-[160px] opacity-40 animate-float"></div>
          <div className="absolute bottom-24 right-20 w-[420px] h-[420px] bg-[#310A31] rounded-full blur-[160px] opacity-30 animate-float"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#310A31] mb-6 animate-fade-up">
            Smart Deals. Zero Effort.
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto animate-fade-up">
            Discover handpicked products and the best deals in one place.
          </p>
        </div>
      </section>

      {/* ALL PRODUCTS */}
      <section className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-serif font-bold mb-12 animate-fade-up">
          All Products
        </h2>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map(i => (
              <div
                key={i}
                className="aspect-[3/4] rounded-3xl bg-white animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {products.map((product, idx) => (
              <div
                key={product.id}
                style={{ animationDelay: `${idx * 100}ms` }}
                className="animate-fade-up magnetic"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <a
            href="https://www.instagram.com/smart.deal.hub_/"
            target="_blank"
            rel="noopener noreferrer"
            className="magnetic animate-pulse-slow p-10 rounded-[44px]
                       bg-gradient-to-br from-purple-600 to-pink-500 text-white custom-shadow"
          >
            <h3 className="text-3xl font-serif font-bold mb-3">
              Follow on Instagram
            </h3>
            <p>Daily product drops & deals.</p>
          </a>

          <a
            href="https://whatsapp.com/channel/0029Vb7DX1b30LKT5g1Fdm2y"
            target="_blank"
            rel="noopener noreferrer"
            className="magnetic animate-pulse-slow p-10 rounded-[44px]
                       bg-green-600 text-white custom-shadow"
          >
            <h3 className="text-3xl font-serif font-bold mb-3">
              WhatsApp Channel
            </h3>
            <p>Instant alerts. No clutter.</p>
          </a>
        </div>
      </section>

    </div>
  );
};

export default Home;
