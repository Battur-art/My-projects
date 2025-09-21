import { useState } from "react";
import { X, ZoomIn } from "lucide-react";
import f1PitStop from "../assets/pit stop.jpg";
import f1Cockpit from "../assets/cockpit.webp";
import maxVerstappen from "../assets/max.jpeg";
import lewisHamilton from "../assets/lewis.jpg";
import charlesLeclerc from "../assets/leclerc.avif";
import landoNorris from "../assets/lando.jpg";

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  caption: string;
}

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: f1PitStop,
    alt: "F1 Pit Stop Action",
    caption: "Pit Stop Perfection — Red Bull Racing — 2024"
  },
  {
    id: 2,
    src: maxVerstappen,
    alt: "Max Verstappen Portrait",
    caption: "Max Verstappen — Red Bull Racing — World Champion"
  },
  {
    id: 3,
    src: f1Cockpit,
    alt: "F1 Car Cockpit",
    caption: "F1 Cockpit Technology — Advanced Controls — 2024"
  },
  {
    id: 4,
    src: lewisHamilton,
    alt: "Lewis Hamilton Portrait",
    caption: "Lewis Hamilton — Mercedes AMG — 7x Champion"
  },
  {
    id: 5,
    src: charlesLeclerc,
    alt: "Charles Leclerc Portrait",
    caption: "Charles Leclerc — Scuderia Ferrari — Rising Star"
  },
  {
    id: 6,
    src: landoNorris,
    alt: "Lando Norris Portrait",
    caption: "Lando Norris — McLaren — Young Talent"
  }
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  return (
    <section id="gallery" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-racing font-black mb-6">
            <span className="heading-f1">GALLERY</span>
          </h2>
          <p className="text-xl text-f1-silver max-w-3xl mx-auto">
            Immersive visuals capturing the speed, technology, and passion of Formula 1 racing
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div 
              key={image.id}
              className="relative group cursor-pointer card-f1 p-4 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedImage(image)}
            >
              <div className="relative overflow-hidden rounded-lg">
                <img 
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                  <ZoomIn 
                    size={32} 
                    className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-f1-silver text-sm font-medium">
                  {image.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl max-h-full">
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-f1-red transition-colors"
            >
              <X size={32} />
            </button>
            
            <img 
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            
            <div className="text-center mt-4">
              <p className="text-f1-silver font-medium">
                {selectedImage.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;