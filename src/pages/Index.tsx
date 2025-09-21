import Hero from "@/components/Hero";
import DriversGrid from "@/components/DriversGrid";
import FactsGrid from "@/components/FactsGrid";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <DriversGrid />
      <FactsGrid />
      <Gallery />
      <Contact />
    </main>
  );
};

export default Index;
