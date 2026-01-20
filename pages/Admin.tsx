
import React, { useState } from 'react';
import { addProduct } from '../services/api';
import { PLATFORMS, CATEGORIES } from '../constants';
import { Platform, Category } from '../types';

const Admin: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    imageUrl: '',
    affiliateLink: '',
    platform: PLATFORMS[0] as Platform,
    categories: [] as Category[],
    description: '',
    isTrending: false,
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.categories.length === 0) {
      alert('Please select at least one category');
      return;
    }
    
    setStatus('loading');
    const success = await addProduct(formData);
    if (success) {
      setStatus('success');
      setFormData({
        name: '',
        imageUrl: '',
        affiliateLink: '',
        platform: PLATFORMS[0],
        categories: [],
        description: '',
        isTrending: false,
      });
      setTimeout(() => setStatus('idle'), 3000);
    } else {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const toggleCategory = (cat: Category) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(cat) 
        ? prev.categories.filter(c => c !== cat)
        : [...prev.categories, cat]
    }));
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-20">
      <div className="bg-white rounded-[40px] p-8 md:p-12 custom-shadow border border-[#310A31]/5">
        <h1 className="text-4xl font-serif font-bold mb-8 text-[#310A31] text-center">Add New Product</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Product Name</label>
            <input 
              type="text" required
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              className="w-full px-5 py-3 rounded-2xl bg-[#F4ECD6]/30 border border-[#310A31]/10 focus:outline-none focus:ring-2 focus:ring-[#310A31]/20"
              placeholder="e.g. Minimalist Ceramic Vase"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Platform</label>
              <select 
                value={formData.platform}
                onChange={e => setFormData({...formData, platform: e.target.value as Platform})}
                className="w-full px-5 py-3 rounded-2xl bg-[#F4ECD6]/30 border border-[#310A31]/10 focus:outline-none focus:ring-2 focus:ring-[#310A31]/20"
              >
                {PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Product Image URL</label>
              <input 
                type="url" required
                value={formData.imageUrl}
                onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                className="w-full px-5 py-3 rounded-2xl bg-[#F4ECD6]/30 border border-[#310A31]/10 focus:outline-none focus:ring-2 focus:ring-[#310A31]/20"
                placeholder="https://..."
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Affiliate Link</label>
            <input 
              type="url" required
              value={formData.affiliateLink}
              onChange={e => setFormData({...formData, affiliateLink: e.target.value})}
              className="w-full px-5 py-3 rounded-2xl bg-[#F4ECD6]/30 border border-[#310A31]/10 focus:outline-none focus:ring-2 focus:ring-[#310A31]/20"
              placeholder="https://amzn.to/..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-3">Categories</label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(cat => (
                <button
                  key={cat} type="button"
                  onClick={() => toggleCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    formData.categories.includes(cat) 
                      ? 'bg-[#310A31] text-white' 
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Short Description</label>
            <textarea 
              rows={3} required
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              className="w-full px-5 py-3 rounded-2xl bg-[#F4ECD6]/30 border border-[#310A31]/10 focus:outline-none focus:ring-2 focus:ring-[#310A31]/20 resize-none"
              placeholder="Why is this product great?"
            />
          </div>

          <div className="flex items-center space-x-3 bg-[#F4ECD6]/30 p-4 rounded-2xl border border-[#310A31]/10">
            <input 
              type="checkbox" id="trending"
              checked={formData.isTrending}
              onChange={e => setFormData({...formData, isTrending: e.target.checked})}
              className="w-5 h-5 accent-[#310A31]"
            />
            <label htmlFor="trending" className="text-sm font-semibold cursor-pointer select-none">Mark as Trending (Appears on Homepage)</label>
          </div>

          <button 
            type="submit"
            disabled={status === 'loading'}
            className="w-full py-4 rounded-2xl bg-[#310A31] text-white font-bold text-lg transition-all hover:bg-[#4a124a] disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            {status === 'loading' ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                <span>Processing...</span>
              </>
            ) : status === 'success' ? (
              'Product Added Successfully!'
            ) : status === 'error' ? (
              'Failed to Add Product'
            ) : (
              'Add Product'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Admin;
