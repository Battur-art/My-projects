import DriverCard from "./DriverCard";
import driversData from "@/data/drivers.json";

const DriversGrid = () => {
  return (
    <section id="drivers" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-racing font-black mb-6">
            <span className="heading-f1">THE DRIVERS</span>
          </h2>
          <p className="text-xl text-f1-silver max-w-3xl mx-auto">
            Meet the elite athletes who push the boundaries of speed and precision at over 300 km/h
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {driversData.map((driver, index) => (
            <div 
              key={driver.id} 
              className="animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <DriverCard driver={driver} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DriversGrid;