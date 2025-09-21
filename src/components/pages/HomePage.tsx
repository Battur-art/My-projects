import React from 'react';
import { ArrowRight, Star, Truck, Shield, RotateCcw } from 'lucide-react';
import { products } from '../../data/products';
import ProductCard from '../ProductCard';
import { Product } from '../../types';

interface HomePageProps {
  onNavigate: (page: string, productId?: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const newArrivals = products.filter(p => p.isNew).slice(0, 4);
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);

  const handleProductClick = (product: Product) => {
    onNavigate('product', product.id);
  };

  const features = [
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'Free shipping on orders over $50'
    },
    {
      icon: Shield,
      title: 'Secure Payment',
      description: 'Your payment information is safe'
    },
    {
      icon: RotateCcw,
      title: 'Easy Returns',
      description: '30-day return policy'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-slate-900 to-slate-700 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="ml-4 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
              Discover Your
              <span className="text-amber-400 block">Perfect Style</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl">
              Explore our curated collection of premium clothing designed for comfort, style, and confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => onNavigate('shop')}
                className="inline-flex items-center px-8 py-3 text-lg font-semibold text-slate-900 bg-amber-400 hover:bg-amber-500 rounded-lg transition-colors group"
              >
                Shop Collection
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center px-8 py-3 text-lg font-semibold text-white border-2 border-white hover:bg-white hover:text-slate-900 rounded-lg transition-colors"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 text-slate-600 rounded-full group-hover:bg-amber-100 group-hover:text-amber-600 transition-colors mb-4">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      {newArrivals.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">New Arrivals</h2>
                <p className="text-gray-600">Discover the latest additions to our collection</p>
              </div>
              <button
                onClick={() => onNavigate('shop')}
                className="text-slate-600 hover:text-slate-900 font-medium flex items-center group"
              >
                View All
                <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {newArrivals.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() => handleProductClick(product)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Best Sellers Section */}
      {bestSellers.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Best Sellers</h2>
                <p className="text-gray-600">Our most popular items that customers love</p>
              </div>
              <button
                onClick={() => onNavigate('shop')}
                className="text-slate-600 hover:text-slate-900 font-medium flex items-center group"
              >
                View All
                <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {bestSellers.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() => handleProductClick(product)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">What Our Customers Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what real customers think about StyleHub.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Johnson',
                comment: 'Amazing quality and fast shipping! The fit is perfect and the materials feel premium.',
                rating: 5
              },
              {
                name: 'Mike Chen',
                comment: 'Great customer service and the clothes are exactly as described. Highly recommend!',
                rating: 5
              },
              {
                name: 'Emily Davis',
                comment: 'Stylish designs and comfortable fit. This is now my go-to store for clothes.',
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-amber-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.comment}"</p>
                <p className="font-semibold text-slate-900">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and be the first to know about new arrivals, sales, and exclusive offers.
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 text-slate-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              <button className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;