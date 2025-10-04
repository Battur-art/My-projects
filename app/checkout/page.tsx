"use client";

export const dynamic = "force-dynamic";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/enhanced-button";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, CreditCard, Lock } from 'lucide-react';
import { lsGet, lsSet } from '@/utils/storage';
import { FadeIn } from '@/components/anim/FadeIn';
import { Reveal } from '@/components/anim/Reveal';

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const [customerInfo, setCustomerInfo] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (items.length === 0) {
      router.push('/cart');
    }
  }, [items.length, router]);

  const handleInputChange = (field: string, value: string) => {
    setCustomerInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const order = {
        id: Date.now().toString(),
        userId: user?.id || 'guest',
        items,
        total: total,
        customerInfo,
        orderDate: new Date().toISOString(),
        status: 'confirmed' as const,
      };
      const existingOrders = lsGet<any[]>('orders', []);
      existingOrders.push(order);
      lsSet('orders', existingOrders);
      clearCart();
      toast({ title: 'Order placed successfully!', description: `Order #${order.id} has been confirmed.` });
      router.push(`/order-confirmation?orderId=${order.id}`);
    } catch (error) {
      toast({ title: 'Order failed', description: 'Something went wrong. Please try again.', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const finalTotal = total;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <FadeIn>
          <Button variant="ghost" onClick={() => router.push('/cart')} className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Cart
          </Button>

          <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Customer Information Form */}
          <Reveal>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lock className="w-5 h-5 mr-2" /> Billing Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input id="name" type="text" value={customerInfo.name} onChange={(e) => handleInputChange('name', e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" type="email" value={customerInfo.email} onChange={(e) => handleInputChange('email', e.target.value)} required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input id="phone" type="tel" value={customerInfo.phone} onChange={(e) => handleInputChange('phone', e.target.value)} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Shipping Address *</Label>
                  <Textarea id="address" rows={3} value={customerInfo.address} onChange={(e) => handleInputChange('address', e.target.value)} placeholder="Enter your complete address including city, state, and ZIP code" required />
                </div>

                <div className="pt-4">
                  <Button type="submit" variant="gradient" size="lg" className="w-full" disabled={isLoading}>
                    <CreditCard className="w-5 h-5 mr-2" />
                    {isLoading ? 'Processing Order...' : `Place Order - ₮${finalTotal.toLocaleString()}`}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
          </Reveal>

          {/* Order Summary */}
          <Reveal>
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {items.map((item, index) => (
                  <FadeIn key={index}>
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <img src={item.phone.image} alt={item.phone.name} className="w-12 h-12 object-cover rounded" />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{item.phone.name}</h4>
                        <p className="text-xs text-muted-foreground">{item.selectedColor} • {item.selectedStorage} • Qty: {item.quantity}</p>
                      </div>
                      <span className="font-medium">₮{(item.phone.price * item.quantity).toLocaleString()}</span>
                    </div>
                  </FadeIn>
                ))}
              </div>

              <div className="space-y-2 pt-4 border-t">
                <div className="flex justify-between"><span>Subtotal</span><span>₮{total.toLocaleString()}</span></div>
                <div className="flex justify-between"><span>Shipping</span><span className="text-success">Free</span></div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t"><span>Total</span><span className="text-primary">₮{finalTotal.toLocaleString()}</span></div>
              </div>

              <div className="bg-muted/50 p-3 rounded-lg mt-6">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Lock className="w-4 h-4 mr-2" />
                  <span>This is a demo checkout. No actual payment will be processed.</span>
                </div>
              </div>
            </CardContent>
          </Card>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
