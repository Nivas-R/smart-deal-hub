
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SITE_NAME, PLATFORMS } from '../constants';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.hash === path;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#F4ECD6]/80 backdrop-blur-md border-b border-[#310A31]/10">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="text-2xl font-serif font-bold tracking-tight text-[#310A31]">
            {SITE_NAME.toUpperCase()}
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`relative transition-colors hover:text-opacity-70 ${isActive('#/') ? 'font-semibold active-link' : ''}`}>
              Home
            </Link>
            {PLATFORMS.map((platform) => (
              <Link
                key={platform}
                to={`/${platform.toLowerCase()}`}
                className={`relative transition-colors hover:text-opacity-70 ${isActive(`#/${platform.toLowerCase()}`) ? 'font-semibold active-link' : ''}`}
              >
                {platform}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-[#310A31]" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>

        {/* Mobile Sidebar */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#F4ECD6] border-b border-[#310A31]/10 px-4 py-4 space-y-4">
            <Link onClick={() => setIsMenuOpen(false)} to="/" className="block text-lg">Home</Link>
            {PLATFORMS.map((platform) => (
              <Link
                key={platform}
                onClick={() => setIsMenuOpen(false)}
                to={`/${platform.toLowerCase()}`}
                className="block text-lg"
              >
                {platform}
              </Link>
            ))}
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white/50 border-t border-[#310A31]/5 pt-12 pb-8 mt-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <h3 className="text-xl font-serif font-bold mb-4">{SITE_NAME}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Your destination for hand-picked, premium products trending across social media. We curate only the best deals for your lifestyle.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link to="/">Home</Link></li>
                {PLATFORMS.map(p => (
                  <li key={p}><Link to={`/${p.toLowerCase()}`}>{p} Deals</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support & Contact</h4>
              <p className="text-sm text-gray-600 mb-2">Email: businessguymr@gmail.com</p>
              <div className="bg-[#F4ECD6] p-4 rounded-xl mt-4 text-xs text-[#310A31]/80 italic">
                <strong>Affiliate Disclosure:</strong> As an affiliate partner, we may earn a small commission from qualifying purchases at no extra cost to you. This helps us keep this platform running.
              </div>
            </div>
          </div>
          <div className="text-center pt-8 border-t border-gray-100 text-xs text-gray-400">
            &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
