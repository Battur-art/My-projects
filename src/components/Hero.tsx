import { ChevronDown } from "lucide-react";
const heroBg = "/images/hero.avif";

const Hero = () => {
  const scrollToDrivers = () => {
    const driversSection = document.getElementById('drivers');
    driversSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 hero-overlay" />
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
        <div className="animate-fade-in">
          <h1 className="font-racing font-black mb-6 leading-none tracking-tight text-4xl sm:text-6xl md:text-7xl lg:text-8xl">
            <span className="heading-f1 block lg:inline">SPEED</span>
            <span className="text-f1-white hidden lg:inline">.</span>
            <span className="heading-f1 block lg:inline">PRECISION</span>
            <span className="text-f1-white hidden lg:inline">.</span>
            <span className="heading-f1 block lg:inline">LEGACY</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-f1-silver mb-8 max-w-3xl mx-auto animate-slide-in-left">
            Formula 1's drivers, technology, and history — presented as a visual journey through the pinnacle of motorsport
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-scale-in">
            <button 
              onClick={scrollToDrivers}
              className="btn-racing text-lg px-8 py-4"
            >
              View Drivers
            </button>
            
            <a 
              href="#gallery" 
              className="px-8 py-4 rounded-xl border-2 border-f1-red text-f1-red font-semibold hover:bg-f1-red hover:text-white transition-all duration-300"
            >
              Gallery
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-racing-pulse">
        <button 
          onClick={scrollToDrivers}
          className="text-f1-silver hover:text-f1-red transition-colors"
        >
          <ChevronDown size={32} />
        </button>
      </div>
    </section>
  );
};

export default Hero;