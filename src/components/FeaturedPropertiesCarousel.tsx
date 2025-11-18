import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { formatPrice } from "@/lib/utils";
import { MapPin, Bed, Bath, Square, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Section, SectionHeader, SectionTitle, SectionSubtitle } from "@/components/ui/section";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { usePropertyTypeStorage } from "@/hooks/usePropertyTypeStorage";
import { FilterState } from "@/components/PropertyFilters";
import AuditButton from "@/components/ui/audit-button";
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
type FilterType = "Tous" | "Maisons" | "Villas" | "Appartements";
interface FeaturedPropertiesCarouselProps {
  externalFilters?: FilterState;
}
const FeaturedPropertiesCarousel = ({
  externalFilters
}: FeaturedPropertiesCarouselProps = {}) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("Tous");
  const {
    storePropertyType
  } = usePropertyTypeStorage();
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

  // Fetch featured properties
  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        const {
          data,
          error
        } = await supabase.from("properties").select(`
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
          `).neq("status", "Vendu").limit(10);
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

  // Filter properties by selected filter and external filters
  const filteredProperties = properties.filter(property => {
    // Apply category filter (Tous, Villas, Appartements, Maisons)
    let matchesCategory = true;
    if (selectedFilter === "Tous") {
      matchesCategory = true;
    } else if (selectedFilter === "Maisons") {
      matchesCategory = property.typology?.toLowerCase().includes("maison") || false;
    } else if (selectedFilter === "Villas") {
      matchesCategory = property.typology?.toLowerCase().includes("villa") || false;
    } else if (selectedFilter === "Appartements") {
      matchesCategory = property.typology?.toLowerCase().includes("appartement") || property.typology?.toLowerCase().includes("f") || property.typology?.toLowerCase().startsWith("f") || false;
    }
    if (!matchesCategory) return false;

    // Apply external filters if provided
    if (externalFilters) {
      // Type d'offre filter
      if (externalFilters.typeOffre && property.status.toLowerCase() !== externalFilters.typeOffre.toLowerCase()) {
        return false;
      }

      // Type filter
      if (externalFilters.type && property.typology?.toLowerCase() !== externalFilters.type.toLowerCase()) {
        return false;
      }

      // Localité filter
      if (externalFilters.localite) {
        const locationText = getLocationText(property).toLowerCase();
        if (!locationText.includes(externalFilters.localite.toLowerCase())) {
          return false;
        }
      }

      // Price filters
      if (externalFilters.minPrice && property.price) {
        const minPrice = parseFloat(externalFilters.minPrice) * 10000; // Convert millions to actual price
        if (property.price < minPrice) return false;
      }
      if (externalFilters.maxPrice && property.price) {
        const maxPrice = parseFloat(externalFilters.maxPrice) * 10000; // Convert millions to actual price
        if (property.price > maxPrice) return false;
      }

      // Surface filters
      if (externalFilters.minSurface && property.surface) {
        if (property.surface < parseFloat(externalFilters.minSurface)) return false;
      }
      if (externalFilters.maxSurface && property.surface) {
        if (property.surface > parseFloat(externalFilters.maxSurface)) return false;
      }

      // Chambres filter
      if (externalFilters.chambres && property.property_details && property.property_details.length > 0) {
        if (property.property_details[0].bedrooms !== parseInt(externalFilters.chambres)) return false;
      }

      // Salles de bain filter
      if (externalFilters.sallesBain && property.property_details && property.property_details.length > 0) {
        if (property.property_details[0].bathrooms !== parseInt(externalFilters.sallesBain)) return false;
      }
    }
    return true;
  });
  const filters: FilterType[] = ["Tous", "Villas", "Appartements", "Maisons"];

  // Reset carousel to first slide when filter changes
  useEffect(() => {
    if (emblaApi) {
      emblaApi.scrollTo(0);
    }
  }, [selectedFilter, externalFilters, emblaApi]);
  if (loading) {
    return <Section className="py-4 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
            <p className="mt-4 text-muted-foreground">Chargement des biens...</p>
          </div>
        </div>
      </Section>;
  }
  if (properties.length === 0) {
    console.log("FeaturedPropertiesCarousel - No properties to display");
    return null;
  }
  if (filteredProperties.length === 0) {
    console.log("FeaturedPropertiesCarousel - No filtered properties to display");
    return null;
  }
  console.log("FeaturedPropertiesCarousel - Rendering with", filteredProperties.length, "filtered properties");
  return <Section className="pt-2 md:pt-3 pb-4 md:pb-6 lg:pb-8 bg-gradient-to-b from-background to-muted/20">
      <SectionHeader className="mb-3 md:mb-4">
        <SectionTitle className="text-3xl md:text-4xl font-serif lg:text-5xl">
          Nos Biens en Vedette
        </SectionTitle>
        <SectionSubtitle className="text-base md:text-lg">
          Découvrez une sélection de nos meilleures propriétés disponibles
        </SectionSubtitle>
      </SectionHeader>

      {/* Filter Buttons */}
      <div className="flex justify-center gap-2 md:gap-4 mb-4 md:mb-6 flex-wrap">
        {filters.map(filter => <button key={filter} onClick={() => setSelectedFilter(filter)} className={selectedFilter === filter ? "px-2 py-1 md:px-6 md:py-2 rounded-lg bg-primary text-primary-foreground text-xs md:text-base font-semibold font-heading transition-all duration-300" : "px-2 py-1 md:px-6 md:py-2 rounded-lg bg-transparent text-foreground text-xs md:text-base font-semibold font-heading hover:bg-muted/50 transition-all duration-300"}>
            {filter}
          </button>)}
      </div>

      <div className="relative">
        {/* Navigation Buttons */}
        {filteredProperties.length > 1 && <>
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
            {filteredProperties.map(property => <div key={property.id} className="flex-[0_0_85%] md:flex-[0_0_40%] lg:flex-[0_0_33.333%] min-w-0 pl-4 md:pl-6">
                <Link to={`/bien/${property.id}`} onClick={() => handlePropertyClick(property)} className="block">
                  <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 bg-card border border-border cursor-pointer h-[45vh] max-h-[400px] md:h-[50vh] md:max-h-[500px] lg:h-[70vh]">
                    <div className="relative w-full h-full">
                      {property.image_url ? <img src={property.image_url} alt={property.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" /> : <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-muted">
                          <span>Aucune image</span>
                        </div>}
                      
                      {/* Dark Gradient Overlay at Bottom */}
                      <div className="absolute inset-0 bg-gradient-to-t from-overlay-dark/90 via-overlay-dark/50 to-transparent" />
                      
                      {/* Status Badge - Top Left */}
                      <div className="absolute top-3 left-3 z-10">
                        <span className="inline-block px-2 py-1 bg-primary/90 text-primary-foreground rounded-full text-xs font-semibold backdrop-blur-sm">
                          {property.status}
                        </span>
                      </div>

                      {/* Price Badge - Top Right */}
                      {property.price && property.price > 0 && <div className="absolute top-3 right-3 z-10">
                          <div className="bg-black/80 backdrop-blur-md text-white px-3 py-1.5 rounded-lg border border-white/20">
                            <span className="text-base md:text-lg font-bold font-heading">
                              {formatPrice(property.price)}
                            </span>
                          </div>
                        </div>}

                      {/* Property Info Overlay - Bottom */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white z-10">
                        {/* Title */}
                        <h3 className="font-bold text-lg md:text-2xl lg:text-3xl mb-2 line-clamp-2 drop-shadow-lg">
                          {property.title}
                        </h3>
                        
                        {/* Location */}
                        <div className="flex items-center text-sm md:text-base mb-3 text-white/90">
                          <MapPin className="w-4 h-4 md:w-5 md:h-5 mr-1.5 flex-shrink-0" />
                          <span className="line-clamp-1">{getLocationText(property)}</span>
                        </div>

                        {/* Property Details */}
                        <div className="flex items-center gap-3 md:gap-4 text-sm md:text-base">
                          {property.property_details && property.property_details.length > 0 && <>
                              {property.property_details[0].bedrooms !== null && <div className="flex items-center gap-1.5 text-white/90">
                                  <Bed className="w-4 h-4 md:w-5 md:h-5" />
                                  <span className="font-medium">{property.property_details[0].bedrooms}</span>
                                </div>}
                              {property.property_details[0].bathrooms !== null && <div className="flex items-center gap-1.5 text-white/90">
                                  <Bath className="w-4 h-4 md:w-5 md:h-5" />
                                  <span className="font-medium">{property.property_details[0].bathrooms}</span>
                                </div>}
                            </>}
                          {property.surface && <div className="flex items-center gap-1.5 text-white/90">
                              <Square className="w-4 h-4 md:w-5 md:h-5" />
                              <span className="font-medium">{property.surface} m²</span>
                            </div>}
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </div>)}
          </div>
        </div>

        {/* Carousel Indicators */}
        {filteredProperties.length > 1 && <div className="flex justify-center gap-2 mt-4">
            {filteredProperties.map((_, index) => <button key={index} className="w-2 h-2 rounded-full bg-muted border border-primary/30 transition-all hover:bg-primary hover:border-primary" aria-label={`Aller à la slide ${index + 1}`} onClick={() => {
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
            <AuditButton text="Voir tous nos biens" showArrow={true} onClick={() => navigate('/nos-biens')} width="100%" height={50} fontSize={14} className="w-full sm:w-auto sm:!w-[380px]" />
          </div>
        </div>
      </div>
    </Section>;
};
export default FeaturedPropertiesCarousel;