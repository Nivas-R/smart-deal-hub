import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white rounded-3xl overflow-hidden custom-shadow group transition-all duration-300 hover:-translate-y-1">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-serif font-bold mb-2 line-clamp-1">
          {product.name}
        </h3>

        <p className="text-sm text-gray-500 mb-5 line-clamp-2 h-10">
          {product.description}
        </p>
        
        <a 
          href={product.affiliateLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center py-3 rounded-xl bg-[#310A31] text-white font-semibold transition-all hover:bg-[#4a124a] active:scale-95"
        >
          Buy Now
        </a>
      </div>
    </div>
  );
};

export default ProductCard;
