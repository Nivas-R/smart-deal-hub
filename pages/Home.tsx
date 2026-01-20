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
    <div className="space-y-20 pb-20">

      {/* HERO + PLATFORM FIRST */}
      <section className="relative pt-24 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#310A31] rounded-full blur-[120px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#310A31] rounded-full blur-[120px]"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-14">
            {PLATFORMS.map(platform => (
              <Link
                key={platform}
                to={`/${platform.toLowerCase()}`}
                className="bg-white rounded-2xl py-6 font-semibold text-lg shadow-md transition-all hover:-translate-y-1 hover:bg-[#310A31] hover:text-white"
              >
                {platform}
              </Link>
            ))}
          </div>

          <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#310A31] mb-4">
            Trending Deals Across Top Platforms
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Handpicked products from Amazon, Flipkart, Myntra & Meesho. Updated daily.
          </p>
        </div>
      </section>

      {/* WHY TRUST US */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { title: 'Curated Picks', desc: 'Only quality products make it to our list.' },
            { title: 'Social Trends', desc: 'Viral and trending products on Instagram.' },
            { title: 'Verified Deals', desc: 'Trusted affiliate links from top platforms.' }
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-white/40 custom-shadow border border-white/60"
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
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-serif font-bold">Trending Now</h2>
          <div className="h-[2px] flex-grow mx-8 bg-[#310A31]/10 rounded-full"></div>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="aspect-[3/4] rounded-3xl bg-white animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {trending.map(product => (
              <ProductCard key={product.id} product={product} />
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
            className="p-8 rounded-[40px] bg-gradient-to-br from-purple-600 to-pink-500 text-white custom-shadow"
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
            className="p-8 rounded-[40px] bg-green-600 text-white custom-shadow"
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
