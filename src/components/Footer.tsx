"use client";

import React from "react";
import Link from "next/link";
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube, ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/anim/FadeIn";

export const Footer: React.FC = () => {
  const mapsUrl = "https://www.google.com/maps?q=WWC4+86F,+%D0%A7%D0%94+-+5+%D1%85%D0%BE%D1%80%D0%BE%D0%BE,+%D0%A3%D0%BB%D0%B0%D0%B0%D0%BD%D0%B1%D0%B0%D0%B0%D1%82%D0%B0%D1%80+15171";

  return (
    <footer className="border-t border-border bg-background">
      {/* Top */}
      <FadeIn className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-10" y={16}>
        {/* Brand */}
        <div>
          <h3 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">ET Store</h3>
          <p className="mt-3 text-sm text-muted-foreground">
            Your trusted destination for the latest smartphones and accessories.
          </p>
          <div className="mt-5 space-y-3 text-sm">
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 group">
              <span className="mt-0.5 p-2 rounded-md bg-muted text-muted-foreground">
                <MapPin className="w-4 h-4" />
              </span>
              <span className="leading-relaxed">
                WWC4+86F, ЧД - 5 хороо, Улаанбаатар 15171
                <span className="block text-primary group-hover:underline">View on Google Maps</span>
              </span>
            </a>
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-md bg-muted text-muted-foreground">
                <Phone className="w-4 h-4" />
              </span>
              <a href="tel:+976 99093681" className="hover:underline">+976 99093681</a>
            </div>
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-md bg-muted text-muted-foreground">
                <Mail className="w-4 h-4" />
              </span>
              <a href="mailto:support@etstore.mn" className="hover:underline">support@etstore.mn</a>
            </div>
          </div>
        </div>

        {/* Quick links */}
        <FadeIn className="grid grid-cols-2 gap-6" delay={0.05}>
          <div>
            <h4 className="font-semibold mb-3">Shop</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/products" className="hover:text-primary transition-smooth flex items-center gap-1">
                  <ArrowRight className="w-3 h-3" /> All Products
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-primary transition-smooth flex items-center gap-1">
                  <ArrowRight className="w-3 h-3" /> Cart
                </Link>
              </li>
              <li>
                <Link href="/checkout" className="hover:text-primary transition-smooth flex items-center gap-1">
                  <ArrowRight className="w-3 h-3" /> Checkout
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-primary transition-smooth flex items-center gap-1">
                  <ArrowRight className="w-3 h-3" /> About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-smooth flex items-center gap-1">
                  <ArrowRight className="w-3 h-3" /> Contact
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-primary transition-smooth flex items-center gap-1">
                  <ArrowRight className="w-3 h-3" /> Account
                </Link>
              </li>
            </ul>
          </div>
        </FadeIn>

        {/* Newsletter / Socials */}
        <FadeIn delay={0.1}>
          <h4 className="font-semibold">Stay in the loop</h4>
          <p className="text-sm text-muted-foreground mt-2">Get updates on new arrivals and special offers.</p>
          <form
            className="mt-4 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
            }}
         >
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <button className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-smooth">
              Subscribe
            </button>
          </form>

          <div className="mt-5 flex items-center gap-3 text-muted-foreground">
            <a href="#" aria-label="Facebook" className="p-2 rounded-md bg-muted hover:text-primary transition-smooth">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#" aria-label="Instagram" className="p-2 rounded-md bg-muted hover:text-primary transition-smooth">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" aria-label="YouTube" className="p-2 rounded-md bg-muted hover:text-primary transition-smooth">
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </FadeIn>
      </FadeIn>

      {/* Bottom */}
      <div className="border-t border-border">
        <FadeIn className="container mx-auto px-4 py-6 text-xs text-muted-foreground flex flex-col sm:flex-row gap-3 items-center justify-between" y={8}>
          <p>© {new Date().getFullYear()} ET Store. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-primary">Privacy</Link>
            <Link href="/terms" className="hover:text-primary">Terms</Link>
          </div>
        </FadeIn>
      </div>
    </footer>
  );
}
;

export default Footer;
