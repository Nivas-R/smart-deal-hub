import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../services/api';
import { Product } from '../types';
import { PLATFORMS } from '../constants';
import ProductCard from '../components/ProductCard';

const Home: React.FC = () => {
  const [trending, setTrending] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts().then(data => {
      setTrending(data.filter(p => p.isTrending).slice(0, 4));
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-24 pb-24">

      {/* HERO + PLATFORM FIRST */}
      <section className="relative pt-28 pb-24 px-4 overflow-hidden">
        {/* Background Glow */}
        <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#310A31] rounded-full blur-[140px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#310A31] rounded-full blur-[140px] animate-pulse"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">

          {/* PLATFORM QUICK ACCESS */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-16">
            {PLATFORMS.map((platform, idx) => (
              <Link
                key={platform}
                to={`/${platform.toLowerCase()}`}
                style={{ animationDelay: `${idx * 120}ms` }}
                className="bg-white rounded-2xl py-6 font-semibold text-lg shadow-md
                           transform transition-all duration-500
                           hover:-translate-y-2 hover:shadow-xl hover:bg-[#310A31] hover:text-white
                           animate-fade-up"
              >
                {platform}
              </Link>
            ))}
          </div>

          {/* HERO TEXT */}
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#310A31] mb-4 animate-fade-up">
            Trending Deals Across Top Platforms
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto animate-fade-up delay-150">
            Handpicked products from Amazon, Flipkart, Myntra & Meesho. Updated daily.
          </p>
        </div>
      </section>

      {/* WHY TRUST US */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Curated Picks', desc: 'Only quality products make it to our list.' },
            { title: 'Social Trends', desc: 'Viral and trending products on Instagram.' },
            { title: 'Verified Deals', desc: 'Trusted affiliate links from top platforms.' }
          ].map((item, idx) => (
            <div
              key={idx}
              style={{ animationDelay: `${idx * 150}ms` }}
              className="p-8 rounded-3xl bg-white/40 custom-shadow border border-white/60
                         transform transition-all duration-500
                         hover:-translate-y-2 hover:shadow-xl
                         animate-fade-up"
            >
              <h3 className="font-serif font-bold text-xl mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TRENDING PRODUCTS */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-serif font-bold animate-fade-up">
            Trending Now
          </h2>
          <div className="h-[2px] flex-grow mx-8 bg-[#310A31]/10 rounded-full"></div>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div
                key={i}
                className="aspect-[3/4] rounded-3xl bg-white animate-pulse"
              ></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {trending.map((product, idx) => (
              <div
                key={product.id}
                style={{ animationDelay: `${idx * 120}ms` }}
                className="animate-fade-up"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* INSTAGRAM + WHATSAPP CTA */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* INSTAGRAM */}
          <a
            href="https://www.instagram.com/smart.deal.hub_/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-8 rounded-[40px] bg-gradient-to-br from-purple-600 to-pink-500 text-white custom-shadow
                       transform transition-all duration-500
                       hover:-translate-y-2 hover:scale-[1.02]
                       animate-fade-up"
          >
            <h3 className="text-2xl font-serif font-bold mb-2">
              Follow on Instagram
            </h3>
            <p className="text-sm opacity-90">
              Daily trending deals & reels.
            </p>
          </a>

          {/* WHATSAPP */}
          <a
            href="https://whatsapp.com/channel/0029Vb7DX1b30LKT5g1Fdm2y"
            target="_blank"
            rel="noopener noreferrer"
            className="p-8 rounded-[40px] bg-green-600 text-white custom-shadow
                       transform transition-all duration-500
                       hover:-translate-y-2 hover:scale-[1.02]
                       animate-fade-up delay-150"
          >
            <h3 className="text-2xl font-serif font-bold mb-2">
              WhatsApp Channel
            </h3>
            <p className="text-sm opacity-90">
              Instant deal alerts directly to you.
            </p>
          </a>

        </div>
      </section>
    </div>
  );
};

export default Home;
