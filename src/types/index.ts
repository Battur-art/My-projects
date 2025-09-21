export interface Phone {
  id: string;
  name: string;
  brand: 'Apple' | 'Samsung';
  model: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  features: string[];
  inStock: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  colors: string[];
  storage: string[];
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
  phone?: string;
  address?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  orderDate: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
}