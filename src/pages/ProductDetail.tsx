import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/enhanced-button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Star, ShoppingCart, Heart, Share2, Check } from 'lucide-react';
import { getPhoneById } from '@/data/phones';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedStorage, setSelectedStorage] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  const phone = id ? getPhoneById(id) : null;

  React.useEffect(() => {
    if (phone && phone.colors.length > 0) {
      setSelectedColor(phone.colors[0]);
    }
    if (phone && phone.storage.length > 0) {
      setSelectedStorage(phone.storage[0]);
    }
  }, [phone]);

  if (!phone) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Button onClick={() => navigate('/products')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedColor || !selectedStorage) {
      toast({
        title: "Please select options",
        description: "Choose color and storage before adding to cart.",
        variant: "destructive",
      });
      return;
    }

    for (let i = 0; i < quantity; i++) {
      addToCart(phone, selectedColor, selectedStorage);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <Card className="bg-gradient-card">
              <CardContent className="p-8">
                <div className="relative">
                  <img
                    src={phone.imagesByColor?.[selectedColor] || phone.image}
                    alt={`${phone.name} - ${selectedColor || 'Default'}`}
                    className="w-full h-96 object-cover rounded-lg"
                  />
                  {phone.isNew && (
                    <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
                      New
                    </Badge>
                  )}
                  {phone.isBestSeller && (
                    <Badge className="absolute top-4 right-4 bg-warning text-warning-foreground">
                      Best Seller
                    </Badge>
                  )}
                  {!phone.inStock && (
                    <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                      <Badge variant="destructive" className="text-lg font-medium px-6 py-2">
                        Out of Stock
                      </Badge>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline">{phone.brand}</Badge>
                {phone.inStock ? (
                  <Badge className="bg-success text-success-foreground">
                    <Check className="w-3 h-3 mr-1" />
                    In Stock
                  </Badge>
                ) : (
                  <Badge variant="destructive">Out of Stock</Badge>
                )}
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{phone.name}</h1>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(phone.rating)
                          ? 'text-warning fill-current'
                          : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-muted-foreground">
                    {phone.rating} ({phone.reviews} reviews)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-primary">
                  ₮{phone.price.toLocaleString()}
                </span>
                {phone.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    ₮{phone.originalPrice.toLocaleString()}
                  </span>
                )}
                {phone.originalPrice && (
                  <Badge className="bg-destructive text-destructive-foreground">
                    Save ₮{(phone.originalPrice - phone.price).toLocaleString()}
                  </Badge>
                )}
              </div>

              <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                {phone.description}
              </p>
            </div>

            {/* Options */}
            {phone.inStock && (
              <div className="space-y-4">
                {/* Color Selection */}
                {phone.colors[0] !== 'TBA' && (
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Color: <span className="text-primary">{selectedColor}</span>
                    </label>
                    <Select value={selectedColor} onValueChange={setSelectedColor}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select color" />
                      </SelectTrigger>
                      <SelectContent>
                        {phone.colors.map((color) => (
                          <SelectItem key={color} value={color}>
                            {color}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Storage Selection */}
                {phone.storage[0] !== 'TBA' && (
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Storage: <span className="text-primary">{selectedStorage}</span>
                    </label>
                    <Select value={selectedStorage} onValueChange={setSelectedStorage}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select storage" />
                      </SelectTrigger>
                      <SelectContent>
                        {phone.storage.map((storage) => (
                          <SelectItem key={storage} value={storage}>
                            {storage}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Quantity */}
                <div>
                  <label className="block text-sm font-medium mb-2">Quantity</label>
                  <Select value={quantity.toString()} onValueChange={(value) => setQuantity(parseInt(value))}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="cart"
                size="lg"
                className="flex-1"
                onClick={handleAddToCart}
                disabled={!phone.inStock}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {phone.inStock ? 'Add to Cart' : 'Out of Stock'}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="sm:w-auto"
                onClick={() => toast({ title: "Added to wishlist!" })}
              >
                <Heart className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="sm:w-auto"
                onClick={() => {
                  navigator.share?.({ 
                    title: phone.name, 
                    url: window.location.href 
                  }) || toast({ title: "Link copied!" });
                }}
              >
                <Share2 className="w-5 h-5" />
              </Button>
            </div>

            {/* Features */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Key Features</h3>
                <ul className="space-y-2">
                  {phone.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="w-4 h-4 text-success mr-3" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;