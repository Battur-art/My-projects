import React, { useState } from 'react';
import { ArrowLeft, Heart, Share2, Star, Truck, Shield } from 'lucide-react';
import { products } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { Product } from '../../types';

interface ProductDetailPageProps {
  productId: string;
  onNavigate: (page: string) => void;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ productId, onNavigate }) => {
  const product = products.find(p => p.id === productId);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Product Not Found</h2>
          <button
            onClick={() => onNavigate('shop')}
            className="text-amber-600 hover:text-amber-700 font-medium"
          >
            Return to Shop
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Please select both size and color');
      return;
    }
    addItem(product, selectedSize, selectedColor, quantity);
    // Show success message or redirect to cart
    alert('Item added to cart!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => onNavigate('shop')}
          className="flex items-center text-slate-600 hover:text-slate-900 mb-8 group"
        >
          <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Shop
        </button>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-8">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-96 lg:h-[500px] object-cover"
                />
              </div>
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === index ? 'border-amber-500' : 'border-transparent hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-20 object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {product.isNew && (
                      <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                        NEW
                      </span>
                    )}
                    {product.isBestSeller && (
                      <span className="bg-amber-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                        BEST SELLER
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                      <Heart className="h-5 w-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-slate-600 transition-colors">
                      <Share2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-2">{product.name}</h1>
                
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-slate-900">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-amber-400 fill-current" />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">(24 reviews)</span>
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>

              {/* Size Selection */}
              <div>
                <h3 className="text-lg font-medium text-slate-900 mb-3">Size</h3>
                <div className="grid grid-cols-4 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 px-3 text-sm font-medium border rounded-lg transition-colors ${
                        selectedSize === size
                          ? 'border-amber-500 bg-amber-50 text-amber-700'
                          : 'border-gray-300 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div>
                <h3 className="text-lg font-medium text-slate-900 mb-3">Color</h3>
                <div className="grid grid-cols-2 gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`py-2 px-3 text-sm font-medium border rounded-lg transition-colors text-left ${
                        selectedColor === color
                          ? 'border-amber-500 bg-amber-50 text-amber-700'
                          : 'border-gray-300 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <h3 className="text-lg font-medium text-slate-900 mb-3">Quantity</h3>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="text-lg font-medium min-w-[3rem] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <div className="space-y-4">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-slate-900 text-white py-3 px-6 rounded-lg font-semibold hover:bg-slate-800 transition-colors"
                >
                  Add to Cart
                </button>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Truck className="h-4 w-4 mr-2" />
                    Free shipping
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Shield className="h-4 w-4 mr-2" />
                    2-year warranty
                  </div>
                </div>
              </div>

              {/* Stock Status */}
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  {product.stock > 10 ? (
                    <span className="text-green-600">✓ In stock</span>
                  ) : product.stock > 0 ? (
                    <span className="text-amber-600">⚠ Only {product.stock} left in stock</span>
                  ) : (
                    <span className="text-red-600">✗ Out of stock</span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;