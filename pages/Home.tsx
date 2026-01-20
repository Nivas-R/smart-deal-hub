
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../services/api';
import { Product } from '../types';
import { PLATFORMS, SITE_NAME } from '../constants';
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
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#310A31] rounded-full blur-[120px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#310A31] rounded-full blur-[120px]"></div>
        </div>

        <div className="relative z-10 max-w-3xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 text-[#310A31]">
            Curated Picks for Your Modern Lifestyle
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-10 font-light leading-relaxed">
            Discover trending products seen on Instagram. We find the best deals across premium platforms so you don't have to.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#trending" className="bg-[#310A31] text-white px-8 py-4 rounded-full font-semibold transition-transform hover:scale-105 active:scale-95">
              Explore Trending
            </a>
            <a href="#platforms" className="border border-[#310A31] text-[#310A31] px-8 py-4 rounded-full font-semibold transition-transform hover:bg-[#310A31] hover:text-white hover:scale-105 active:scale-95">
              Shop by Platform
            </a>
          </div>
        </div>
      </section>

      {/* Why Trust Us */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-8 rounded-3xl bg-white/40 custom-shadow border border-white/60">
            <div className="w-12 h-12 bg-[#310A31] rounded-full flex items-center justify-center mx-auto mb-4 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-serif font-bold text-xl mb-2">Curated Picks</h3>
            <p className="text-sm text-gray-500">Only the highest quality products make it onto our list.</p>
          </div>
          <div className="p-8 rounded-3xl bg-white/40 custom-shadow border border-white/60">
            <div className="w-12 h-12 bg-[#310A31] rounded-full flex items-center justify-center mx-auto mb-4 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
              </svg>
            </div>
            <h3 className="font-serif font-bold text-xl mb-2">Social Trends</h3>
            <p className="text-sm text-gray-500">Products currently viral on Instagram Reels and TikTok.</p>
          </div>
          <div className="p-8 rounded-3xl bg-white/40 custom-shadow border border-white/60">
            <div className="w-12 h-12 bg-[#310A31] rounded-full flex items-center justify-center mx-auto mb-4 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75m0 1.5v.75m0 1.5v.75m0 1.5V15m0 1.5V18m0 1.5v.75A.75.75 0 013 21h-.75a.75.75 0 01-.75-.75V19.5a.75.75 0 01.75-.75H3z" />
              </svg>
            </div>
            <h3 className="font-serif font-bold text-xl mb-2">Verified Deals</h3>
            <p className="text-sm text-gray-500">Hand-verified affiliate links from trustworthy platforms.</p>
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section id="trending" className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-serif font-bold">Trending Now</h2>
          <div className="h-[2px] flex-grow mx-8 bg-[#310A31]/10 rounded-full"></div>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1,2,3,4].map(i => <div key={i} className="aspect-[3/4] rounded-3xl bg-white animate-pulse"></div>)}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {trending.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Platforms Section */}
      <section id="platforms" className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-serif font-bold mb-12 text-center">Shop by Platform</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {PLATFORMS.map((platform) => (
            <Link 
              key={platform}
              to={`/${platform.toLowerCase()}`}
              className="group bg-white rounded-3xl p-8 flex flex-col items-center justify-center text-center custom-shadow transition-all hover:-translate-y-2 hover:bg-[#310A31] hover:text-white"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#F4ECD6] mb-4 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <span className="text-2xl font-serif font-bold text-[#310A31] group-hover:text-white">
                  {platform[0]}
                </span>
              </div>
              <h3 className="font-bold text-lg">{platform}</h3>
              <p className="text-xs mt-2 opacity-60">Curated Collection</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Instagram/WhatsApp CTA */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a 
            href="https://instagram.com" 
            className="group p-8 rounded-[40px] bg-gradient-to-br from-purple-600 to-pink-500 text-white custom-shadow overflow-hidden relative"
          >
            <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform">
              <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.247 2.242 1.308 3.607.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.332 2.633-1.308 3.608-.975.975-2.242 1.247-3.607 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.332-3.608-1.308-.975-.975-1.247-2.242-1.308-3.607-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608.975-.975 2.242-1.247 3.607-1.308 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.058-1.281.072-1.689.072-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.058-1.689-.072-4.948-.072zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </div>
            <h3 className="text-2xl font-serif font-bold mb-2">Follow on Instagram</h3>
            <p className="text-sm opacity-90">Daily trending deals & reels delivered to your feed.</p>
          </a>

          <a 
            href="https://whatsapp.com" 
            className="group p-8 rounded-[40px] bg-green-600 text-white custom-shadow overflow-hidden relative"
          >
            <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform">
              <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.675 1.439 5.662 1.439h.056c6.555 0 11.89-5.335 11.893-11.892a11.826 11.826 0 00-3.522-8.414z"/></svg>
            </div>
            <h3 className="text-2xl font-serif font-bold mb-2">WhatsApp Channel</h3>
            <p className="text-sm opacity-90">Join for instant alerts on the deepest discounts.</p>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
