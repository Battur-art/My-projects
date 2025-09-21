import { useState } from 'react';
import { Heart, Plus, Minus, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart, Product } from '@/contexts/CartContext';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart, removeFromCart, isInCart } = useCart();
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const inCart = isInCart(product.id);

  const handleCartAction = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inCart) {
      removeFromCart(product.id);
    } else {
      addToCart(product);
    }
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <Card 
      className="group overflow-hidden bg-gradient-card shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer border-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/products/${product.id}`}>
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Overlay Actions */}
          <div className={`absolute inset-0 bg-black/20 flex items-center justify-center transition-all duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="flex space-x-2">
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full bg-white/90 hover:bg-white transition-bounce transform hover:scale-110"
                onClick={handleLike}
              >
                <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-foreground'}`} />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full bg-white/90 hover:bg-white transition-bounce transform hover:scale-110"
              >
                <Eye className="h-4 w-4 text-foreground" />
              </Button>
            </div>
          </div>

          {/* Price Badge */}
          <div className="absolute top-4 left-4">
            <span className="bg-brand-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold shadow-button">
              ${product.price}
            </span>
          </div>
        </div>

        <CardContent className="p-6">
          <div className="space-y-3">
            <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-brand-primary transition-colors">
              {product.title}
            </h3>
            <p className="text-muted-foreground text-sm line-clamp-2">
              {product.description}
            </p>
            
            <div className="flex items-center justify-between pt-2">
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-foreground">
                  ${product.price}
                </span>
                <span className="text-xs text-muted-foreground uppercase tracking-wide">
                  {product.category}
                </span>
              </div>
              
              <Button
                variant={inCart ? "destructive" : "default"}
                size="sm"
                className={`transition-all duration-300 ${
                  inCart 
                    ? "bg-destructive hover:bg-destructive/90" 
                    : "bg-gradient-primary hover:shadow-button transform hover:scale-105"
                }`}
                onClick={handleCartAction}
              >
                {inCart ? (
                  <>
                    <Minus className="h-4 w-4 mr-1" />
                    Remove
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-1" />
                    Add to Cart
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default ProductCard;