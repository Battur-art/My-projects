"use client";

import Hero from "@/components/Hero";
import DriversGrid from "@/components/DriversGrid";
import FactsGrid from "@/components/FactsGrid";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import F1Insights from "@/components/F1Insights";
import F1Lab from "@/components/F1Lab";
import TracksGrid from "@/components/TracksGrid";
import F1News from "@/components/F1News";

export default function Page() {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <F1News />
      <DriversGrid />
      <FactsGrid />
      <F1Insights />
      <F1Lab />
      <TracksGrid />
      <Gallery />
      <Contact />
    </main>
  );
}
