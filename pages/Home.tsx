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
    <div className="space-y-28 pb-28 overflow-hidden">

      {/* HERO */}
      <section className="relative pt-32 pb-32 px-4">
        {/* Floating Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-24 left-20 w-[420px] h-[420px] bg-[#310A31] rounded-full blur-[160px] opacity-40 animate-float"></div>
          <div className="absolute bottom-24 right-20 w-[420px] h-[420px] bg-[#310A31] rounded-full blur-[160px] opacity-30 animate-float"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">

          {/* PLATFORM CARDS */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-20">
            {PLATFORMS.map((platform, idx) => (
              <Link
                key={platform}
                to={`/${platform.toLowerCase()}`}
                style={{ animationDelay: `${idx * 120}ms` }}
                className="glass magnetic custom-shadow rounded-3xl py-8 text-lg font-semibold
                           animate-fade-up hover:shadow-[0_0_60px_rgba(49,10,49,0.35)]"
              >
                {platform}
              </Link>
            ))}
          </div>

          {/* HERO TEXT */}
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#310A31] mb-6 animate-fade-up">
            Smart Deals. Zero Effort.
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto animate-fade-up">
            Discover trending products across Amazon, Flipkart, Myntra & Meesho — handpicked daily.
          </p>
        </div>
      </section>

      {/* TRUST SECTION */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { title: 'Curated Picks', desc: 'Only products worth buying.' },
            { title: 'Social Proof', desc: 'Trending on Instagram & Reels.' },
            { title: 'Verified Deals', desc: 'Trusted affiliate platforms.' }
          ].map((item, idx) => (
            <div
              key={idx}
              style={{ animationDelay: `${idx * 150}ms` }}
              className="glass custom-shadow magnetic p-10 rounded-[36px] animate-fade-up"
            >
              <h3 className="font-serif font-bold text-2xl mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TRENDING */}
      <section className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-serif font-bold mb-12 animate-fade-up">
          Trending Now
        </h2>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="aspect-[3/4] rounded-3xl bg-white animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {trending.map((product, idx) => (
              <div
                key={product.id}
                style={{ animationDelay: `${idx * 120}ms` }}
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
            <p>Daily viral deals & reels.</p>
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
            <p>Instant alerts. Zero spam.</p>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
