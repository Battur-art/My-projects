import FactCard from "./FactCard";
import factsData from "@/data/facts.json";

const FactsGrid = () => {
  return (
    <section className="py-20 px-6 bg-f1-carbon">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-racing font-black mb-6">
            <span className="heading-f1">DID YOU KNOW?</span>
          </h2>
          <p className="text-xl text-f1-silver max-w-3xl mx-auto">
            Fascinating facts about the cutting-edge technology and incredible athleticism in Formula 1
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {factsData.map((fact, index) => (
            <div 
              key={fact.id}
              className="animate-slide-in-left"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <FactCard fact={fact} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FactsGrid;