import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Cotton T-Shirt',
    price: 29.99,
    originalPrice: 39.99,
    image: 'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Soft, breathable cotton t-shirt perfect for everyday wear. Made from 100% organic cotton with a comfortable fit.',
    category: 'unisex',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['White', 'Black', 'Navy', 'Gray'],
    isNew: true,
    stock: 50
  },
  {
    id: '2',
    name: 'Elegant Midi Dress',
    price: 79.99,
    image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Sophisticated midi dress with a flattering silhouette. Perfect for both casual and formal occasions.',
    category: 'women',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'Burgundy'],
    isBestSeller: true,
    stock: 30
  },
  {
    id: '3',
    name: 'Classic Denim Jeans',
    price: 59.99,
    image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'High-quality denim jeans with a perfect fit. Durable construction with classic styling that never goes out of style.',
    category: 'unisex',
    sizes: ['28', '30', '32', '34', '36', '38'],
    colors: ['Dark Blue', 'Light Blue', 'Black'],
    isBestSeller: true,
    stock: 40
  },
  {
    id: '4',
    name: 'Wool Blend Sweater',
    price: 89.99,
    originalPrice: 119.99,
    image: 'https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Cozy wool blend sweater perfect for chilly weather. Soft texture with excellent warmth retention.',
    category: 'unisex',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Cream', 'Gray', 'Forest Green', 'Navy'],
    stock: 25
  },
  {
    id: '5',
    name: 'Summer Floral Blouse',
    price: 49.99,
    image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Light and airy blouse with beautiful floral patterns. Perfect for summer days and evening outings.',
    category: 'women',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Floral Pink', 'Floral Blue', 'White'],
    isNew: true,
    stock: 35
  },
  {
    id: '6',
    name: 'Casual Button-Up Shirt',
    price: 45.99,
    image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Versatile button-up shirt suitable for work or casual occasions. Made from breathable cotton blend.',
    category: 'men',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Light Blue', 'Gray'],
    stock: 45
  },
  {
    id: '7',
    name: 'Athletic Sports Bra',
    price: 24.99,
    image: 'https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'High-support sports bra perfect for workouts and active lifestyle. Moisture-wicking fabric.',
    category: 'women',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'White', 'Pink', 'Gray'],
    isNew: true,
    stock: 60
  },
  {
    id: '8',
    name: 'Leather Jacket',
    price: 199.99,
    originalPrice: 259.99,
    image: 'https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Premium leather jacket with classic styling. Durable construction with attention to detail.',
    category: 'unisex',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Brown'],
    isBestSeller: true,
    stock: 20
  }
];