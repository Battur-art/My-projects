import React from 'react';
import { Phone } from '@/types';
import { Button } from '@/components/ui/enhanced-button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  phone: Phone;
}

export const ProductCard: React.FC<ProductCardProps> = ({ phone }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (phone.inStock) {
      addToCart(phone, phone.colors[0], phone.storage[0]);
    }
  };

  return (
    <Link to={`/product/${phone.id}`} className="block">
      <Card className="product-hover bg-gradient-card h-full group">
        <CardContent className="p-4">
          <div className="relative mb-4">
            <img
              src={phone.image}
              alt={phone.name}
              className="w-full h-[300px  ] object-cover rounded-lg"
            />
            {phone.isNew && (
              <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground">
                New
              </Badge>
            )}
            {phone.isBestSeller && (
              <Badge className="absolute top-2 right-2 bg-warning text-warning-foreground">
                Best Seller
              </Badge>
            )}
            {!phone.inStock && (
              <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                <Badge variant="destructive" className="text-sm font-medium">
                  Out of Stock
                </Badge>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-lg group-hover:text-primary transition-smooth">
              {phone.name}
            </h3>
            
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(phone.rating)
                      ? 'text-warning fill-current'
                      : 'text-muted-foreground'
                  }`}
                />
              ))}
              <span className="text-sm text-muted-foreground ml-1">
                ({phone.reviews})
              </span>
            </div>

            <p className="text-sm text-muted-foreground line-clamp-2">
              {phone.description}
            </p>

            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-primary">
                ₮{phone.price}
              </span>
              {phone.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  ₮{phone.originalPrice}
                </span>
              )}
            </div>
          </div>
        </CardContent>

        <CardFooter className="pt-0 px-4 pb-4">
          <Button
            variant="cart"
            className="w-full"
            onClick={handleAddToCart}
            disabled={!phone.inStock}
          >
            <ShoppingCart className="w-4 h-4" />
            {phone.inStock ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};