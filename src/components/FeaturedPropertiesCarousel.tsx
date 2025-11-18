import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { formatPrice } from "@/lib/utils";
import { MapPin, Bed, Bath, Square, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Section, SectionHeader, SectionTitle, SectionSubtitle } from "@/components/ui/section";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { usePropertyTypeStorage } from "@/hooks/usePropertyTypeStorage";

interface Property {
  id: string;
  title: string;
  status: string;
  surface?: number;
  price?: number;
  image_url?: string;
  typology?: string;
  localities?: {
    name: string;
    city?: {
      name: string;
    };
  } | null;
  property_details?: {
    bedrooms?: number;
    bathrooms?: number;
  }[] | null;
}

const FeaturedPropertiesCarousel = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const { storePropertyType } = usePropertyTypeStorage();

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true, 
      dragFree: true,
      align: "start",
      slidesToScroll: 1
    },
    [Autoplay({ delay: 5000, stopOnInteraction: true })]
  );

  // Fetch featured properties
  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        const { data, error } = await supabase
          .from("properties")
          .select(`
            id,
            title,
            status,
            surface,
            price,
            image_url,
            typology,
            localities(
              name,
              city:cities(name)
            ),
            property_details(
              bedrooms,
              bathrooms
            )
          `)
          .eq("status", "available")
          .not("price", "is", null)
          .order("created_at", { ascending: false })
          .limit(10);

        if (error) {
          console.error("Error fetching featured properties:", error);
          throw error;
        }
        console.log("FeaturedPropertiesCarousel - Fetched properties:", data?.length || 0);
        setProperties(data || []);
      } catch (error) {
        console.error("Error fetching featured properties:", error);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProperties();
  }, []);

  const scrollPrev = () => {
    if (emblaApi) emblaApi.scrollPrev();
  };

  const scrollNext = () => {
    if (emblaApi) emblaApi.scrollNext();
  };

  const getLocationText = (property: Property) => {
    const parts = [];
    if (property.localities?.name) parts.push(property.localities.name);
    if (property.localities?.city?.name) parts.push(property.localities.city.name);
    return parts.join(", ") || "Localisation non spécifiée";
  };

  const handlePropertyClick = (property: Property) => {
    if (property.typology) {
      storePropertyType(property.typology);
    }
  };

  if (loading) {
    return (
      <Section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
            <p className="mt-4 text-muted-foreground">Chargement des biens...</p>
          </div>
        </div>
      </Section>
    );
  }

  if (properties.length === 0) {
    console.log("FeaturedPropertiesCarousel - No properties to display");
    return null;
  }

  console.log("FeaturedPropertiesCarousel - Rendering with", properties.length, "properties");

  return (
    <Section className="py-16 bg-gradient-to-b from-background to-muted/20">
      <SectionHeader>
        <SectionTitle className="text-3xl md:text-4xl lg:text-5xl">
          Nos Biens en Vedette
        </SectionTitle>
        <SectionSubtitle className="text-base md:text-lg">
          Découvrez une sélection de nos meilleures propriétés disponibles
        </SectionSubtitle>
      </SectionHeader>

      <div className="relative">
        {/* Navigation Buttons */}
        {properties.length > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-background/90 hover:bg-background shadow-lg hidden md:flex"
              onClick={scrollPrev}
              aria-label="Précédent"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-background/90 hover:bg-background shadow-lg hidden md:flex"
              onClick={scrollNext}
              aria-label="Suivant"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </>
        )}

        {/* Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {properties.map((property) => (
              <div 
                key={property.id} 
                className="flex-[0_0_85%] md:flex-[0_0_40%] lg:flex-[0_0_33.333%] min-w-0 pl-4 md:pl-6"
              >
                <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 bg-card border border-border h-full flex flex-col">
                  <div className="relative overflow-hidden">
                    <div className="aspect-[4/3] bg-muted">
                      {property.image_url ? (
                        <img
                          src={property.image_url}
                          alt={property.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-muted">
                          <span>Aucune image</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Status Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="inline-block px-3 py-1 bg-primary/90 text-primary-foreground rounded-full text-xs font-semibold backdrop-blur-sm">
                        {property.status}
                      </span>
                    </div>

                    {/* Price Badge */}
                    {property.price && property.price > 0 && (
                      <div className="absolute top-4 right-4">
                        <div className="bg-black/80 backdrop-blur-md text-white px-4 py-2 rounded-lg border border-white/20">
                          <span className="text-lg font-bold font-heading">
                            {formatPrice(property.price)}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Gradient Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>

                  <CardContent className="p-5 flex flex-col flex-grow">
                    <h3 className="font-bold text-lg md:text-xl mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {property.title}
                    </h3>
                    
                    {/* Location */}
                    <div className="flex items-center text-sm text-muted-foreground mb-3">
                      <MapPin className="w-4 h-4 mr-1 flex-shrink-0 text-primary" />
                      <span className="line-clamp-1">{getLocationText(property)}</span>
                    </div>

                    {/* Property Details */}
                    <div className="flex items-center gap-4 mb-4 text-sm">
                      {property.property_details && property.property_details.length > 0 && (
                        <>
                          {property.property_details[0].bedrooms !== null && (
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Bed className="w-4 h-4" />
                              <span>{property.property_details[0].bedrooms}</span>
                            </div>
                          )}
                          {property.property_details[0].bathrooms !== null && (
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Bath className="w-4 h-4" />
                              <span>{property.property_details[0].bathrooms}</span>
                            </div>
                          )}
                        </>
                      )}
                      {property.surface && (
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Square className="w-4 h-4" />
                          <span>{property.surface} m²</span>
                        </div>
                      )}
                      {property.typology && (
                        <span className="ml-auto px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold">
                          {property.typology}
                        </span>
                      )}
                    </div>

                    {/* CTA Button */}
                    <div className="mt-auto pt-4">
                      <Button 
                        variant="outline" 
                        className="w-full group/btn"
                        asChild
                      >
                        <Link to={`/bien/${property.id}`} onClick={() => handlePropertyClick(property)}>
                          Voir les détails
                          <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Indicators */}
        {properties.length > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            {properties.map((_, index) => (
              <button
                key={index}
                className="w-2 h-2 rounded-full bg-muted transition-all hover:bg-primary"
                aria-label={`Aller à la slide ${index + 1}`}
                onClick={() => {
                  if (emblaApi) {
                    emblaApi.scrollTo(index);
                  }
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* CTA Button */}
      <div className="text-center mt-12">
        <Link to="/nos-biens">
          <Button variant="default" size="lg" className="group">
            Voir tous nos biens
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </Section>
  );
};

export default FeaturedPropertiesCarousel;

