export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  description: string;
  category: 'men' | 'women' | 'unisex';
  sizes: string[];
  colors: string[];
  isNew?: boolean;
  isBestSeller?: boolean;
  stock: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

export interface Customer {
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

export interface Order {
  id: string;
  items: CartItem[];
  customer: Customer;
  paymentMethod: 'cod' | 'stripe';
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  createdAt: Date;
}