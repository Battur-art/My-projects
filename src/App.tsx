import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import HomePage from './components/pages/HomePage';
import ShopPage from './components/pages/ShopPage';
import ProductDetailPage from './components/pages/ProductDetailPage';
import CartPage from './components/pages/CartPage';
import CheckoutPage from './components/pages/CheckoutPage';
import OrderConfirmationPage from './components/pages/OrderConfirmationPage';
import ContactPage from './components/pages/ContactPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);

  const handleNavigate = (page: string, additionalData?: string) => {
    setCurrentPage(page);
    
    if (page === 'product' && additionalData) {
      setSelectedProductId(additionalData);
    }
    
    if (page === 'order-confirmation' && additionalData) {
      setOrderId(additionalData);
    }

    // Scroll to top on navigation
    window.scrollTo(0, 0);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'shop':
        return <ShopPage onNavigate={handleNavigate} />;
      case 'product':
        return selectedProductId ? (
          <ProductDetailPage 
            productId={selectedProductId} 
            onNavigate={handleNavigate} 
          />
        ) : <ShopPage onNavigate={handleNavigate} />;
      case 'cart':
        return <CartPage onNavigate={handleNavigate} />;
      case 'checkout':
        return <CheckoutPage onNavigate={handleNavigate} />;
      case 'order-confirmation':
        return orderId ? (
          <OrderConfirmationPage 
            orderId={orderId} 
            onNavigate={handleNavigate} 
          />
        ) : <HomePage onNavigate={handleNavigate} />;
      case 'contact':
        return <ContactPage onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50">
        <Header currentPage={currentPage} onNavigate={handleNavigate} />
        <main>
          {renderCurrentPage()}
        </main>
        
        {/* Footer */}
        <footer className="bg-slate-900 text-white py-12 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="md:col-span-2">
                <h3 className="text-xl font-bold mb-4">StyleHub</h3>
                <p className="text-gray-300 mb-4 max-w-md">
                  Your destination for premium clothing that combines comfort, style, and quality. 
                  Discover fashion that fits your lifestyle.
                </p>
                <div className="flex space-x-4">
                  <button className="text-gray-300 hover:text-white transition-colors">Facebook</button>
                  <button className="text-gray-300 hover:text-white transition-colors">Instagram</button>
                  <button className="text-gray-300 hover:text-white transition-colors">Twitter</button>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <div className="space-y-2">
                  <button 
                    onClick={() => handleNavigate('shop')}
                    className="block text-gray-300 hover:text-white transition-colors"
                  >
                    Shop
                  </button>
                  <button 
                    onClick={() => handleNavigate('contact')}
                    className="block text-gray-300 hover:text-white transition-colors"
                  >
                    Contact
                  </button>
                  <button className="block text-gray-300 hover:text-white transition-colors">
                    Size Guide
                  </button>
                  <button className="block text-gray-300 hover:text-white transition-colors">
                    Returns
                  </button>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Support</h4>
                <div className="space-y-2">
                  <button className="block text-gray-300 hover:text-white transition-colors">
                    FAQ
                  </button>
                  <button className="block text-gray-300 hover:text-white transition-colors">
                    Shipping
                  </button>
                  <button className="block text-gray-300 hover:text-white transition-colors">
                    Track Order
                  </button>
                  <button className="block text-gray-300 hover:text-white transition-colors">
                    Privacy Policy
                  </button>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
              <p>&copy; 2025 StyleHub. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </CartProvider>
  );
}

export default App;