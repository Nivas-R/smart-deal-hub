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
      {/* HERO */}
<section className="relative pt-32 pb-40 px-4 overflow-hidden">

  {/* Background glow */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute top-24 left-16 w-[420px] h-[420px] bg-[#310A31] rounded-full blur-[180px] opacity-40 animate-float"></div>
    <div className="absolute bottom-24 right-16 w-[420px] h-[420px] bg-[#310A31] rounded-full blur-[180px] opacity-30 animate-float"></div>
  </div>

  <div className="relative z-10 max-w-6xl mx-auto text-center">

    {/* Title */}
    <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6
                   bg-gradient-to-r from-[#7a1849] via-[#d14b8f] to-[#7a1849]
                   bg-[length:300%_100%] bg-clip-text text-transparent
                   animate-fade-up"
        style={{ animation: 'gradientFlow 6s linear infinite' }}>
      Smart Deals. Zero Effort.
    </h1>

    {/* Subtitle */}
    <p className="text-lg text-gray-700 max-w-2xl mx-auto animate-fade-up">
      Discover handpicked products and the best deals in one place.
    </p>

    {/* Platform Cards */}
    <div className="mt-16 flex flex-wrap justify-center gap-8">

      {[
        { src: '/amazon.jpg', name: 'Amazon' },
        { src: '/flipkart.jpg', name: 'Flipkart' },
        { src: '/myntra.jpg', name: 'Myntra' },
        { src: '/meesho.jpg', name: 'Meesho' },
      ].map((platform, idx) => (
        <div
          key={platform.name}
          style={{ animationDelay: `${idx * 120}ms` }}
          className="w-[180px] h-[200px] rounded-3xl glass custom-shadow
                     flex flex-col items-center justify-center gap-4
                     animate-fade-up animate-float magnetic"
        >
          <img
            src={platform.src}
            alt={platform.name}
            className="w-[110px] h-[110px] object-contain"
          />
          <span className="font-semibold tracking-wide">
            {platform.name}
          </span>
        </div>
      ))}

    </div>

    {/* Platform Text */}
    <div className="mt-6 text-sm text-gray-600 tracking-wide">
      Amazon <span className="mx-2">|</span>
      Flipkart <span className="mx-2">|</span>
      Myntra <span className="mx-2">|</span>
      Meesho
    </div>

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
