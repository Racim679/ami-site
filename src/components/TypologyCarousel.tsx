import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import useEmblaCarousel from "embla-carousel-react";
import { cn } from "@/lib/utils";

interface Typology {
  id: string;
  label: string;
  value: string;
  image_url?: string;
}

interface TypologyCarouselProps {
  onSelectTypology?: (typology: string) => void;
  selectedTypology?: string;
  className?: string;
}

export const TypologyCarousel = ({ 
  onSelectTypology, 
  selectedTypology,
  className = "" 
}: TypologyCarouselProps) => {
  const [typologies, setTypologies] = useState<Typology[]>([]);
  const [loading, setLoading] = useState(true);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    dragFree: true,
    align: "start",
    slidesToScroll: 1,
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  // Récupérer les typologies depuis Supabase
  useEffect(() => {
    const fetchTypologies = async () => {
      try {
        const { data, error } = await supabase
          .from("typologies")
          .select("id, label, value")
          .order("label");

        if (error) {
          console.error("Erreur lors de la récupération des typologies:", error);
          return;
        }

        if (data) {
          // Construire les URLs des images depuis le bucket images_typologies
          const typologiesWithImages = data.map((typology) => {
            // Construire le nom du fichier (en minuscules, avec extension)
            // Essayer plusieurs formats possibles
            const possibleNames = [
              `${typology.value.toLowerCase()}.png`,
              `${typology.value.toLowerCase()}.jpg`,
              `${typology.label.toLowerCase().replace(/\s+/g, '-')}.png`,
              `${typology.label.toLowerCase().replace(/\s+/g, '-')}.jpg`,
              `${typology.label.toLowerCase().replace(/\s+/g, '_')}.png`,
            ];
            
            // Utiliser le premier format par défaut
            const imageName = possibleNames[0];
            
            // Obtenir l'URL publique depuis le bucket
            const { data: urlData } = supabase.storage
              .from("images_typologies")
              .getPublicUrl(imageName);

            return {
              ...typology,
              image_url: urlData.publicUrl,
            };
          });

          setTypologies(typologiesWithImages);
        }
      } catch (error) {
        console.error("Erreur:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTypologies();
  }, []);

  // Gérer les boutons de navigation
  useEffect(() => {
    if (!emblaApi) return;

    const updateScrollButtons = () => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };

    updateScrollButtons();
    emblaApi.on("select", updateScrollButtons);
    emblaApi.on("reInit", updateScrollButtons);

    return () => {
      emblaApi.off("select", updateScrollButtons);
      emblaApi.off("reInit", updateScrollButtons);
    };
  }, [emblaApi]);

  const scrollPrev = () => {
    emblaApi?.scrollPrev();
  };

  const scrollNext = () => {
    emblaApi?.scrollNext();
  };

  const handleTypologyClick = (typology: Typology) => {
    onSelectTypology?.(typology.value);
  };

  if (loading) {
    return (
      <div className={cn("flex items-center justify-center py-8", className)}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (typologies.length === 0) {
    return null;
  }

  return (
    <div className={cn("relative w-full", className)}>
      {/* Bouton précédent */}
      <Button
        variant="outline"
        size="icon"
        className={cn(
          "absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white shadow-md hover:bg-primary hover:text-white border-primary",
          !canScrollPrev && "opacity-50 cursor-not-allowed"
        )}
        onClick={scrollPrev}
        disabled={!canScrollPrev}
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

      {/* Carousel */}
      <div className="overflow-hidden mx-12" ref={emblaRef}>
        <div className="flex gap-2">
          {typologies.map((typology) => {
            const isSelected = selectedTypology === typology.value;
            return (
              <div
                key={typology.id}
                className="flex flex-col justify-center items-center gap-2 flex-shrink-0"
                style={{ minWidth: "80px", maxWidth: "80px" }}
              >
                <button
                  onClick={() => handleTypologyClick(typology)}
                  className={cn(
                    "flex items-center justify-center rounded-full border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2",
                    isSelected
                      ? "border-primary bg-primary text-white hover:bg-primary/90 focus:ring-primary"
                      : "border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary"
                  )}
                  style={{ width: "64px", height: "64px" }}
                >
                  {typology.image_url ? (
                    <img
                      src={typology.image_url}
                      alt={typology.label}
                      className="w-10 h-10 object-contain rounded-full"
                      onError={(e) => {
                        // Fallback si l'image n'existe pas - afficher la première lettre
                        const target = e.currentTarget;
                        target.style.display = "none";
                        const fallback = target.nextElementSibling as HTMLElement;
                        if (fallback) {
                          fallback.style.display = "block";
                        }
                      }}
                    />
                  ) : null}
                  <span 
                    className="text-xs font-semibold"
                    style={{ display: typology.image_url ? "none" : "block" }}
                  >
                    {typology.label.charAt(0)}
                  </span>
                </button>
                <h3 className="text-[10px] sm:text-xs font-semibold text-foreground whitespace-nowrap text-center">
                  {typology.label}
                </h3>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bouton suivant */}
      <Button
        variant="outline"
        size="icon"
        className={cn(
          "absolute right-0 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white shadow-md hover:bg-primary hover:text-white border-primary",
          !canScrollNext && "opacity-50 cursor-not-allowed"
        )}
        onClick={scrollNext}
        disabled={!canScrollNext}
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  );
};

