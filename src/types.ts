// Shared application types

export interface Phone {
  id: string;
  name: string;
  brand: string; // e.g., "Apple" | "Samsung"
  model: string;
  price: number;
  originalPrice?: number;
  image: string;
  // Optional map of color -> image URL. Falls back to `image` when not provided.
  imagesByColor?: Record<string, string>;
  description: string;
  features: string[];
  inStock: boolean;
  isBestSeller?: boolean;
  isNew?: boolean;
  colors: string[];
  storage: string[];
  // Optional map of storage option -> full price for that storage (not delta).
  priceByStorage?: Record<string, number>;
  rating: number;
  reviews: number;
}

export interface CartItem {
  phone: Phone;
  quantity: number;
  selectedColor: string;
  selectedStorage: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  // Optional contact details used across checkout/profile flows
  phone?: string;
  address?: string;
  // Optional because we remove it when storing the logged-in user in state
  password?: string;
}
