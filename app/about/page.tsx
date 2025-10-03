"use client";

import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Smartphone, Award, Users, Globe, Star, Shield } from 'lucide-react';
import { FadeIn } from '@/components/anim/FadeIn';
import { Reveal } from '@/components/anim/Reveal';

export default function AboutPage() {
  const stats = [
    { icon: Users, label: 'Happy Customers', value: '50,000+' },
    { icon: Smartphone, label: 'Devices Sold', value: '100,000+' },
    { icon: Award, label: 'Years Experience', value: '15+' },
   
  ];

  const values = [
    {
      icon: Star,
      title: 'Premium Quality',
      description: 'We only sell authentic products from authorized dealers with full manufacturer warranties.'
    },
    {
      icon: Shield,
      title: 'Secure Shopping',
      description: 'Your personal and payment information is protected with industry-standard security.'
    },
    {
      icon: Users,
      title: 'Customer First',
      description: 'Our dedicated support team is here to help you find the perfect device for your needs.'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Fast and reliable shipping worldwide with comprehensive tracking and insurance.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-hero text-white py-20 bg-[url('/images/s25ultra.avif')] bg-cover bg-center">
        <FadeIn className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">About ET Store</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Your trusted partner for the latest smartphones and mobile technology since 2014
          </p>
        </FadeIn>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Reveal key={index}>
                <Card className="text-center bg-gradient-card">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-2xl md:text-3xl font-bold text-primary mb-2">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <FadeIn className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Story</h2>
              <p className="text-lg text-muted-foreground">How we became a leading mobile commerce destination</p>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div>
                  <Badge className="mb-4">Founded in 2005</Badge>
                  <FadeIn>
                  <h3 className="text-2xl font-bold mb-4">From Passion to Purpose</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    ET Store started as a small tech enthusiast's dream to make the latest smartphones accessible to everyone. What began in a garage has grown into a trusted destination for mobile technology lovers worldwide.
                  </p>
                  </FadeIn>
                </div>

                <div>
                  <FadeIn>
                  <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    To provide customers with authentic, high-quality mobile devices while delivering exceptional service and competitive prices. We believe everyone deserves access to the technology that connects us all.
                  </p>
                  </FadeIn>
                </div>
              </div>

              <Reveal>
              <div className="bg-gradient-card rounded-2xl p-8">
                <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center">
                  <Smartphone className="w-16 h-16 text-muted-foreground" />
                </div>
              </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">The principles that guide everything we do</p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Reveal key={index}>
                <Card className="text-center bg-gradient-card product-hover">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                      <value.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-3">{value.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-lg text-muted-foreground">The passionate people behind ET Store</p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { name: 'Enkhtuul', role: 'CEO & Founder', bio: 'Tech visionary with 15+ years in mobile industry' },
              { name: 'Battur', role: 'CTO', bio: 'Web developer' },
              { name: 'Unubold', role: 'Head of Customer Success', bio: 'Dedicated to ensuring every customer has an amazing experience' }
            ].map((member, index) => (
              <Reveal key={index}>
                <Card className="text-center bg-gradient-card">
                  <CardContent className="p-6">
                    <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                    <Badge variant="outline" className="mb-3">{member.role}</Badge>
                    <p className="text-sm text-muted-foreground">{member.bio}</p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-white bg-[url('/images/ip.jpg')] bg-cover bg-center">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Journey</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Be part of our story and discover why thousands of customers trust ET Store for their mobile needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products" className="inline-block">
              <button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition-smooth">Shop Now</button>
            </Link>
            <Link href="/contact" className="inline-block">
              <button className="border border-white/30 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-smooth">Get in Touch</button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
