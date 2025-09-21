import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { CartItem, Product } from '../types';

interface CartState {
  items: CartItem[];
  total: number;
}

type CartAction = 
  | { type: 'ADD_ITEM'; payload: { product: Product; size: string; color: string; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' };

const CartContext = createContext<{
  state: CartState;
  addItem: (product: Product, size: string, color: string, quantity: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
} | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, size, color, quantity } = action.payload;
      const itemId = `${product.id}-${size}-${color}`;
      
      const existingItem = state.items.find(item => 
        `${item.product.id}-${item.size}-${item.color}` === itemId
      );

      if (existingItem) {
        const updatedItems = state.items.map(item =>
          `${item.product.id}-${item.size}-${item.color}` === itemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        return {
          items: updatedItems,
          total: updatedItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
        };
      }

      const newItems = [...state.items, { product, size, color, quantity }];
      return {
        items: newItems,
        total: newItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
      };
    }
    case 'REMOVE_ITEM': {
      const newItems = state.items.filter((_, index) => index.toString() !== action.payload);
      return {
        items: newItems,
        total: newItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
      };
    }
    case 'UPDATE_QUANTITY': {
      const newItems = state.items.map((item, index) =>
        index.toString() === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      return {
        items: newItems,
        total: newItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
      };
    }
    case 'CLEAR_CART':
      return { items: [], total: 0 };
    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 });

  const addItem = (product: Product, size: string, color: string, quantity: number) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, size, color, quantity } });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    }
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider value={{ state, addItem, removeItem, updateQuantity, clearCart }}>
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