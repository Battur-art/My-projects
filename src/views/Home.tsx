import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/enhanced-button';
import { Card, CardContent } from '@/components/ui/card';
import { ProductCard } from '@/components/ProductCard';
import { ArrowRight, Star, Shield, Truck, CreditCard } from 'lucide-react';
import { getFeaturedPhones, getBestSellers, getNewArrivals } from '@/data/phones';

export const Home: React.FC = () => {
  const featuredPhones = getFeaturedPhones();
  const bestSellers = getBestSellers().slice(0, 4);
  const newArrivals = getNewArrivals().slice(0, 4);

  const features = [
    {
      icon: Shield,
      title: 'Warranty Protection',
      description: 'All products come with manufacturer warranty'
    },
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'Free delivery on orders over $500'
    },
    {
      icon: CreditCard,
      title: 'Secure Payment',
      description: 'Your payment information is always secure'
    },
    {
      icon: Star,
      title: 'Premium Quality',
      description: 'Only authentic products from authorized dealers'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative text-white py-20 overflow-hidden bg-[url('/images/background.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/20 "></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-in slide-in-from-bottom-4 duration-1000">
              Хамгийн сүүлийн үеийн утаснууд
              <span className="block text-3xl md:text-5xl mt-2 opacity-90">
                Premium Technology
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto animate-in slide-in-from-bottom-4 duration-1000 delay-200">
                Хамгийн сүүлийн үеийн онцлог, гайхалтай дизайн бүхий iPhone болон Samsung Galaxy-ийн хамгийн сүүлийн үеийн загваруудыг олж мэдээрэй.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in slide-in-from-bottom-4 duration-1000 delay-400">
              <Link to="/products">
                <Button variant="hero" size="xl">
                  Shop Now
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/products?filter=new">
                <Button variant="outline" size="xl" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                  New Arrivals
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center bg-gradient-card">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Онцлох бүтээгдэхүүн</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Бидний сонгосон хамгийн алдартай, хамгийн сүүлийн үеийн ухаалаг гар утаснуудтай танилцана уу
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredPhones.map((phone) => (
              <ProductCard key={phone.id} phone={phone} />
            ))}
          </div>

          <div className="text-center">
            <Link to="/products">
              <Button variant="gradient" size="lg">
                View All Products
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Best Sellers</h2>
              <p className="text-muted-foreground">Most popular choices among our customers</p>
            </div>
            <Link to="/products?filter=bestseller">
              <Button variant="outline">
                View All
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((phone) => (
              <ProductCard key={phone.id} phone={phone} />
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">New Arrivals</h2>
              <p className="text-muted-foreground">Latest releases from top brands</p>
            </div>
            <Link to="/products?filter=new">
              <Button variant="outline">
                View All
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((phone) => (
              <ProductCard key={phone.id} phone={phone} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-white bg-[url('/images/amanz-fYru5LNyJiM-unsplash.jpg')] bg-cover bg-center">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
           Утсаа шинэчлэхэд бэлэн үү?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Гар утасныхаа хэрэгцээнд бидэнд итгэдэг олон мянган сэтгэл хангалуун үйлчлүүлэгчидтэй нэгдээрэй
          </p>
          <Link to="/products">
            <Button variant="hero" size="xl" className="bg-white text-primary hover:bg-white/90">
              Start Shopping
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;