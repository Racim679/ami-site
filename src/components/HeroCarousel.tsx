import { useState } from "react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeader, SectionTitle, SectionSubtitle } from "@/components/ui/section";

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  
  // Placeholder videos - you can replace these with actual video URLs
  const videos = [
    "/placeholder-video-1.mp4",
    "/placeholder-video-2.mp4", 
    "/placeholder-video-3.mp4"
  ];

  const slides = [
    {
      title: "Promoteur Immobilier d'Exception",
      subtitle: "Créateur de résidences de luxe dans les quartiers les plus prestigieux",
      cta: "Découvrir nos projets"
    },
    {
      title: "Architecture Moderne & Élégante",
      subtitle: "Des designs innovants qui redéfinissent l'art de vivre",
      cta: "Voir nos réalisations"
    },
    {
      title: "Votre Futur Commence Ici",
      subtitle: "Investissez dans l'excellence avec notre expertise reconnue",
      cta: "Nous contacter"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % videos.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + videos.length) % videos.length);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          key={currentSlide}
          className="h-full w-full object-cover"
          autoPlay={isPlaying}
          muted
          loop
          playsInline
        >
          <source src={videos[currentSlide]} type="video/mp4" />
          {/* Enhanced fallback background */}
          <div className="absolute inset-0 bg-gradient-to-br from-secondary via-primary to-accent" />
        </video>
        
        {/* Dynamic overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="glass"
        size="icon"
        className="absolute left-8 top-1/2 -translate-y-1/2 z-20 h-14 w-14 hover:scale-110 transition-all duration-300"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-7 w-7" />
      </Button>

      <Button
        variant="glass"
        size="icon"
        className="absolute right-8 top-1/2 -translate-y-1/2 z-20 h-14 w-14 hover:scale-110 transition-all duration-300"
        onClick={nextSlide}
      >
        <ChevronRight className="h-7 w-7" />
      </Button>

      {/* Play/Pause Control */}
      <Button
        variant="glass"
        size="icon"
        className="absolute bottom-8 left-8 z-20 h-12 w-12"
        onClick={togglePlayPause}
      >
        {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
      </Button>

      {/* Enhanced Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center text-white max-w-5xl mx-auto px-6">
          <div className="animate-fade-in-up">
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-black font-heading mb-8 leading-none">
              <span className="bg-gradient-to-r from-primary via-accent to-primary-light bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_auto]">
                {slides[currentSlide].title}
              </span>
            </h1>
          </div>
          
          <div className="animate-fade-in-up delay-300">
            <p className="text-2xl md:text-3xl lg:text-4xl font-body mb-12 text-white/90 leading-relaxed max-w-4xl mx-auto">
              {slides[currentSlide].subtitle}
            </p>
          </div>

          <div className="animate-fade-in-up delay-500">
            <Button 
              variant="luxury" 
              size="xl" 
              className="text-xl px-12 py-6 hover:scale-105 transition-all duration-300 animate-glow-ring"
            >
              {slides[currentSlide].cta}
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-4 z-20">
        {videos.map((_, index) => (
          <button
            key={index}
            className={`relative overflow-hidden rounded-full transition-all duration-500 ${
              index === currentSlide 
                ? "w-12 h-4 bg-gradient-to-r from-primary to-accent shadow-gold" 
                : "w-4 h-4 bg-white/50 hover:bg-white/70"
            }`}
            onClick={() => setCurrentSlide(index)}
          >
            {index === currentSlide && (
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent animate-shimmer bg-[length:200%_100%]" />
            )}
          </button>
        ))}
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-16 animate-float">
        <div className="w-24 h-24 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-xl" />
      </div>
      <div className="absolute top-1/3 right-20 animate-float delay-1000">
        <div className="w-32 h-32 bg-gradient-to-r from-accent/20 to-primary/20 rounded-full blur-xl" />
      </div>
    </section>
  );
};

export default HeroCarousel;