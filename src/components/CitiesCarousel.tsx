import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Section, SectionHeader, SectionTitle, SectionSubtitle } from "@/components/ui/section";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import AuditButton from "@/components/ui/audit-button";
import babElOuedImage from "@/assets/bab-el-oued.jpg";
import elMadaniaImage from "@/assets/el-madania.jpg";
import hydraImage from "@/assets/hydra.jpg";
import elKhroubImage from "@/assets/el-khroub.jpg";
import belgaidImage from "@/assets/belgaid.jpg";
import birElDjirImage from "@/assets/bir-el-djir.jpg";
import heroImage from "@/assets/hero-localites.jpg";

interface City {
  id: number;
  name: string;
  propertyCount: number;
  image: string;
}

// Map city names to their corresponding images
// We'll use the first commune image or a default image
const cityImages: Record<string, string> = {
  "ALGER": babElOuedImage,
  // Default image for Alger
  "TIPAZA": heroImage // Default image for Tipaza
};

// Map commune names to their corresponding images (from Localites.tsx)
const communeImages: Record<string, string> = {
  "Bab El Oued": babElOuedImage,
  "El Madania": elMadaniaImage,
  "Hydra": hydraImage,
  "El Khroub": elKhroubImage,
  "Belgaïd": belgaidImage,
  "Bir El Djir": birElDjirImage
};

const CitiesCarousel = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    dragFree: true,
    align: "start",
    slidesToScroll: 1
  }, [Autoplay({
    delay: 5000,
    stopOnInteraction: true
  })]);

  useEffect(() => {
    const fetchCitiesWithPropertyCounts = async () => {
      try {
        // Fetch cities
        const {
          data: citiesData,
          error: citiesError
        } = await supabase.from("cities").select("*").order("name");
        if (citiesError) throw citiesError;

        // Fetch communes
        const {
          data: communesData,
          error: communesError
        } = await supabase.from("communes").select("*").order("name");
        if (communesError) throw communesError;

        // Fetch property counts for each city
        const citiesWithCounts: City[] = await Promise.all((citiesData || []).map(async city => {
          // Get all communes for this city (assuming city.id corresponds to wilaya_id)
          const cityCommunes = (communesData || []).filter(commune => commune.wilaya_id === city.id);

          // Count properties in all communes of this city
          let totalCount = 0;
          for (const commune of cityCommunes) {
            const {
              count
            } = await supabase.from('properties').select('*', {
              count: 'exact',
              head: true
            }).eq('commune_id', commune.id).neq('status', 'Vendu'); // Only count available properties
            totalCount += count || 0;
          }

          // Get image for city - use first commune image or default
          let cityImage = cityImages[city.name.toUpperCase()] || heroImage;
          if (cityCommunes.length > 0) {
            const firstCommune = cityCommunes[0];
            cityImage = communeImages[firstCommune.name] || cityImage;
          }
          return {
            id: city.id,
            name: city.name,
            propertyCount: totalCount,
            image: cityImage
          };
        }));

        // Filter out cities with no properties and sort by property count (descending)
        const citiesWithProperties = citiesWithCounts.filter(city => city.propertyCount > 0).sort((a, b) => b.propertyCount - a.propertyCount);
        setCities(citiesWithProperties);
      } catch (error) {
        if (import.meta.env.DEV) {
          console.error("Error fetching cities:", error);
        }
        setCities([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCitiesWithPropertyCounts();
  }, []);

  const scrollPrev = () => {
    if (emblaApi) emblaApi.scrollPrev();
  };

  const scrollNext = () => {
    if (emblaApi) emblaApi.scrollNext();
  };

  if (loading) {
    return <Section className="py-4 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
          <p className="mt-4 text-muted-foreground">Chargement des villes...</p>
        </div>
      </div>
    </Section>;
  }

  if (cities.length === 0) {
    return null;
  }

  return <Section className="pt-2 md:pt-3 pb-4 md:pb-6 lg:pb-8 bg-background">
    <SectionHeader className="mb-3 md:mb-4">
      <SectionTitle className="text-3xl md:text-4xl font-serif lg:text-5xl">
        Trouvez des propriétés dans ces villes
      </SectionTitle>
      <SectionSubtitle className="text-base md:text-lg">
        Choisissez votre ville et commencez votre exploration.
      </SectionSubtitle>
    </SectionHeader>

    <div className="relative">
      {/* Navigation Buttons */}
      {cities.length > 1 && <>
        <Button variant="outline" size="icon" className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-background/90 hover:bg-background shadow-lg hidden md:flex" onClick={scrollPrev} aria-label="Précédent">
          <ChevronLeft className="w-5 h-5" />
        </Button>

        <Button variant="outline" size="icon" className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-background/90 hover:bg-background shadow-lg hidden md:flex" onClick={scrollNext} aria-label="Suivant">
          <ChevronRight className="w-5 h-5" />
        </Button>
      </>}

      {/* Carousel */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {cities.map(city => <div key={city.id} className="flex-[0_0_85%] md:flex-[0_0_40%] lg:flex-[0_0_33.333%] min-w-0 pl-4 md:pl-6">
            <Link to={`/localites`} className="block">
              <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 bg-card border border-border cursor-pointer h-[50vh] max-h-[400px] md:h-[55vh] md:max-h-[450px]">
                <div className="relative w-full h-full">
                  <img src={city.image} alt={city.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />

                  {/* Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-overlay-dark/70 via-overlay-dark/20 to-transparent" />

                  {/* City Info Overlay - Top Left */}
                  <div className="absolute top-4 left-4 md:top-6 md:left-6 text-white z-10">
                    {/* City Name */}
                    <h3 className="font-bold text-2xl md:text-3xl lg:text-4xl drop-shadow-lg mb-2">
                      {city.name.toUpperCase()}
                    </h3>

                    {/* Property Count */}
                    <p className="text-white/90 text-base md:text-lg font-semibold">
                      {city.propertyCount} {city.propertyCount === 1 ? 'Propriété' : 'Propriétés'}
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          </div>)}
        </div>
      </div>

      {/* Carousel Indicators */}
      {cities.length > 1 && <div className="flex justify-center gap-2 mt-4">
        {cities.map((_, index) => <button key={index} className="w-2 h-2 rounded-full bg-muted border border-primary/30 transition-all hover:bg-primary hover:border-primary" aria-label={`Aller à la slide ${index + 1}`} onClick={() => {
          if (emblaApi) {
            emblaApi.scrollTo(index);
          }
        }} />)}
      </div>}
    </div>

    {/* CTA Button */}
    <div className="text-center mt-4">
      <div className="w-full flex justify-center px-4 sm:px-0">
        <div className="w-full sm:w-auto max-w-xs sm:max-w-none">
          <AuditButton text="Voir toutes les localités" showArrow={true} onClick={() => navigate('/localites')} width="100%" height={50} fontSize={14} className="w-full sm:w-auto sm:!w-[380px]" />
        </div>
      </div>
    </div>
  </Section>;
};

export default CitiesCarousel;