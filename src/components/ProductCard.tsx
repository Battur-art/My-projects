import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <div 
      className="group cursor-pointer bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100"
      onClick={onClick}
    >
      <div className="aspect-w-1 aspect-h-1 relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {(product.isNew || product.isBestSeller) && (
          <div className="absolute top-3 left-3">
            {product.isNew && (
              <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                NEW
              </span>
            )}
            {product.isBestSeller && !product.isNew && (
              <span className="bg-amber-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                BEST SELLER
              </span>
            )}
          </div>
        )}
        {product.originalPrice && (
          <div className="absolute top-3 right-3">
            <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
              SALE
            </span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-900 group-hover:text-slate-800 transition-colors line-clamp-2">
          {product.name}
        </h3>
        
        <div className="mt-2 flex items-center space-x-2">
          <span className="text-lg font-semibold text-slate-800">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        <div className="mt-2 text-xs text-gray-500">
          {product.colors.length} {product.colors.length === 1 ? 'color' : 'colors'} • {product.sizes.length} sizes
        </div>
      </div>
    </div>
  );
};

export default ProductCard;