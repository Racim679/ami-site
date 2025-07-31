import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Placeholder videos - you can replace these with actual video URLs
  const videos = [
    "/placeholder-video-1.mp4",
    "/placeholder-video-2.mp4", 
    "/placeholder-video-3.mp4"
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % videos.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + videos.length) % videos.length);
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          key={currentSlide}
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={videos[currentSlide]} type="video/mp4" />
          {/* Fallback background for demo */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/40" />
        </video>
        
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 h-12 w-12 bg-white/20 text-white hover:bg-white/30"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 h-12 w-12 bg-white/20 text-white hover:bg-white/30"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center text-white">
          <h1 className="text-6xl font-bold mb-6">
            Promoteur Immobilier
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Votre partenaire de confiance pour tous vos projets immobiliers
          </p>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {videos.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? "bg-white" : "bg-white/50"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;