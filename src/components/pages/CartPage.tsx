import React from 'react';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';

interface CartPageProps {
  onNavigate: (page: string) => void;
}

const CartPage: React.FC<CartPageProps> = ({ onNavigate }) => {
  const { state, removeItem, updateQuantity } = useCart();

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="h-12 w-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added anything to your cart yet. Start shopping to fill it up!
          </p>
          <button
            onClick={() => onNavigate('shop')}
            className="bg-slate-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {state.items.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full sm:w-24 h-48 sm:h-24 object-cover rounded-lg"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-medium text-slate-900 mb-2">
                      {item.product.name}
                    </h3>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>Size: {item.size}</p>
                      <p>Color: {item.color}</p>
                      <p className="text-lg font-semibold text-slate-900">
                        ${item.product.price.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(index.toString(), item.quantity - 1)}
                        className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="text-lg font-medium min-w-[2rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(index.toString(), item.quantity + 1)}
                        className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(index.toString())}
                      className="text-red-600 hover:text-red-700 p-2 transition-colors"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({state.items.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                  <span>${state.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{state.total >= 50 ? 'Free' : '$9.99'}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>${(state.total * 0.08).toFixed(2)}</span>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between text-lg font-semibold text-slate-900">
                  <span>Total</span>
                  <span>
                    ${(
                      state.total + 
                      (state.total >= 50 ? 0 : 9.99) + 
                      (state.total * 0.08)
                    ).toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => onNavigate('checkout')}
                className="w-full bg-slate-900 text-white py-3 px-6 rounded-lg font-semibold hover:bg-slate-800 transition-colors mb-4"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={() => onNavigate('shop')}
                className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Continue Shopping
              </button>

              {state.total < 50 && (
                <p className="text-sm text-amber-600 mt-4 text-center">
                  Add ${(50 - state.total).toFixed(2)} more for free shipping!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;