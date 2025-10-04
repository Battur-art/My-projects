"use client";

export const dynamic = "force-dynamic";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button } from "@/components/ui/enhanced-button";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { FadeIn } from '@/components/anim/FadeIn';
import { Reveal } from '@/components/anim/Reveal';

export default function CartPage() {
  const { items, total, updateQuantity, removeFromCart, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <FadeIn className="text-center py-16">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
            </p>
            <Link href="/products">
              <Button variant="gradient" size="lg">Start Shopping</Button>
            </Link>
          </FadeIn>
        </div>
      </div>
    );
  }

  const handleCheckout = () => {
    if (!isAuthenticated) {
      router.push('/login?redirect=/checkout');
    } else {
      router.push('/checkout');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <FadeIn className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Shopping Cart</h1>
            <p className="text-muted-foreground">
              {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
          <Button variant="outline" onClick={() => router.push('/products')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Button>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Cart Items</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearCart}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear Cart
              </Button>
            </div>

            {items.map((item) => (
              <Reveal key={`${item.phone.id}-${item.selectedColor}-${item.selectedStorage}`}>
              <Card className="bg-gradient-card">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Product Image */}
                    <div className="w-full sm:w-32 h-32 bg-muted rounded-lg overflow-hidden">
                      <img src={item.phone.image} alt={item.phone.name} className="w-full h-full object-cover" />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">{item.phone.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline">{item.selectedColor}</Badge>
                            <Badge variant="outline">{item.selectedStorage}</Badge>
                          </div>
                        </div>
                        <div className="text-right mt-2 sm:mt-0">
                          <p className="text-2xl font-bold text-primary">₮{item.phone.price.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">₮{(item.phone.price * item.quantity).toLocaleString()} total</p>
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between pt-4">
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.phone.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-12 text-center font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.phone.id, item.quantity + 1)}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.phone.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              </Reveal>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Reveal>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₮{total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-success">Free</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-primary">₮{total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-4">
                  <Button variant="gradient" size="lg" className="w-full" onClick={handleCheckout}>
                    {isAuthenticated ? 'Proceed to Checkout' : 'Login to Checkout'}
                  </Button>

                  {!isAuthenticated && (
                    <p className="text-xs text-muted-foreground text-center">
                      You'll need to login or create an account to complete your purchase
                    </p>
                  )}

                  <Link href="/products">
                    <Button variant="outline" className="w-full">Continue Shopping</Button>
                  </Link>
                </div>

                <div className="pt-4 space-y-2 text-sm text-muted-foreground">
                  <p className="flex items-center">
                    <span className="w-2 h-2 bg-success rounded-full mr-2"></span>
                    Free shipping on orders over ₮500
                  </p>
                  <p className="flex items-center">
                    <span className="w-2 h-2 bg-success rounded-full mr-2"></span>
                    30-day return policy
                  </p>
                  <p className="flex items-center">
                    <span className="w-2 h-2 bg-success rounded-full mr-2"></span>
                    Secure checkout
                  </p>
                </div>
              </CardContent>
            </Card>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}
