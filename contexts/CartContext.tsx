"use client";

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { CartItem, Phone } from '@/types';
import { toast } from '@/hooks/use-toast';
import { lsGet, lsSet } from '@/utils/storage';

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { phone: Phone; color: string; storage: string } }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] };

interface CartContextType extends CartState {
  addToCart: (phone: Phone, color: string, storage: string) => void;
  removeFromCart: (phoneId: string) => void;
  updateQuantity: (phoneId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Helper to compute the effective price for a cart item based on selected storage
const priceFor = (item: CartItem) => {
  const storagePrice = item.phone.priceByStorage?.[item.selectedStorage];
  return storagePrice ?? item.phone.price;
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { phone, color, storage } = action.payload;
      const existingItemIndex = state.items.findIndex(
        item => item.phone.id === phone.id && 
                item.selectedColor === color && 
                item.selectedStorage === storage
      );

      let newItems: CartItem[];
      if (existingItemIndex > -1) {
        newItems = [...state.items];
        newItems[existingItemIndex].quantity += 1;
      } else {
        newItems = [...state.items, {
          phone,
          quantity: 1,
          selectedColor: color,
          selectedStorage: storage
        }];
      }

      const total = newItems.reduce((sum, item) => sum + (priceFor(item) * item.quantity), 0);
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

      return { items: newItems, total, itemCount };
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.phone.id !== action.payload);
      const total = newItems.reduce((sum, item) => sum + (item.phone.price * item.quantity), 0);
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

      return { items: newItems, total, itemCount };
    }

    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_ITEM', payload: id });
      }

      const newItems = state.items.map(item =>
        item.phone.id === id ? { ...item, quantity } : item
      );
      const total = newItems.reduce((sum, item) => sum + (item.phone.price * item.quantity), 0);
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

      return { items: newItems, total, itemCount };
    }

    case 'CLEAR_CART':
      return { items: [], total: 0, itemCount: 0 };

    case 'LOAD_CART': {
      const items = action.payload;
      const total = items.reduce((sum, item) => sum + (priceFor(item) * item.quantity), 0);
      const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
      return { items, total, itemCount };
    }

    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0, itemCount: 0 });

  // Load cart from localStorage on mount
  useEffect(() => {
    const cartItems = lsGet<CartItem[]>('cart', []);
    if (Array.isArray(cartItems) && cartItems.length > 0) {
      dispatch({ type: 'LOAD_CART', payload: cartItems });
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    lsSet('cart', state.items);
  }, [state.items]);

  const addToCart = (phone: Phone, color: string, storage: string) => {
    dispatch({ type: 'ADD_ITEM', payload: { phone, color, storage } });
    toast({
      title: "Added to cart",
      description: `${phone.name} has been added to your cart.`,
    });
  };

  const removeFromCart = (phoneId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: phoneId });
    toast({
      title: "Removed from cart",
      description: "Item has been removed from your cart.",
    });
  };

  const updateQuantity = (phoneId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: phoneId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
    });
  };

  return (
    <CartContext.Provider value={{
      ...state,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};