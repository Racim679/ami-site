import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { formatPrice } from "@/lib/utils";
import { MapPin, Bed, Bath, Square } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Section, SectionHeader, SectionTitle, SectionSubtitle } from "@/components/ui/section";
import useEmblaCarousel from "embla-carousel-react";
import { usePropertyTypeStorage } from "@/hooks/usePropertyTypeStorage";

interface Property {
  id: string;
  title: string;
  status: string;
  surface?: number;
  price?: number;
  image_url?: string;
  typology?: string;
  commune?: {
    name: string;
    wilaya?: {
      name: string;
    };
  } | null;
  property_details?: {
    bedrooms?: number;
    bathrooms?: number;
  }[] | null;
}

type FilterType = "Tous" | "Maisons" | "Villas" | "Appartements";

const ExclusivePropertiesSection = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("Tous");
  const { storePropertyType } = usePropertyTypeStorage();

  // Embla carousel for mobile
  const [emblaRef] = useEmblaCarousel(
    { 
      loop: false, 
      dragFree: true,
      containScroll: 'trimSnaps'
    }
  );

  // Fetch properties ordered by price descending
  useEffect(() => {
    const fetchProperties = async () => {
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
            commune:communes(
              name,
              wilaya:wilayas(name)
            ),
            property_details(
              bedrooms,
              bathrooms
            )
          `)
          .neq("status", "Vendu")
          .not("price", "is", null)
          .order("price", { ascending: false })
          .limit(15);

        if (error) throw error;
        
        // Transform data to handle array/object responses
        const transformedData = (data || []).map(property => {
          let communeData = null;
          if (property.commune) {
            if (Array.isArray(property.commune) && property.commune.length > 0) {
              communeData = property.commune[0];
            } else if (typeof property.commune === 'object' && !Array.isArray(property.commune)) {
              communeData = property.commune;
            }
          }
          return { ...property, commune: communeData };
        });
        setProperties(transformedData);
      } catch (error) {
        console.error("Error fetching exclusive properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Filter properties by selected filter
  const filteredProperties = properties.filter((property) => {
    if (selectedFilter === "Tous") return true;
    if (selectedFilter === "Maisons")
      return property.typology?.toLowerCase().includes("maison");
    if (selectedFilter === "Villas")
      return property.typology?.toLowerCase().includes("villa");
    if (selectedFilter === "Appartements") {
      return (
        property.typology?.toLowerCase().includes("appartement") ||
        property.typology?.toLowerCase().includes("f") ||
        property.typology?.toLowerCase().startsWith("f")
      );
    }
    return true;
  });

  const getLocationText = (property: Property) => {
    const parts = [];
    if (property.commune?.name) parts.push(property.commune.name);
    if (property.commune?.wilaya?.name) parts.push(property.commune.wilaya.name);
    return parts.join(", ") || "Localisation non spécifiée";
  };

  const handlePropertyClick = (property: Property) => {
    if (property.typology) {
      storePropertyType(property.typology);
    }
  };

  const filters: FilterType[] = ["Tous", "Villas", "Appartements", "Maisons"];

  if (loading) {
    return (
      <Section className="py-20">
        <div className="text-center">Chargement...</div>
      </Section>
    );
  }

  if (filteredProperties.length === 0) {
    return null;
  }

  return (
    <Section className="py-20">
      {/* Section Header */}
      <SectionHeader>
        <SectionTitle>Biens à ne pas manquer</SectionTitle>
        <SectionSubtitle>
          Explorez les propriétés les plus recherchées, soigneusement sélectionnées pour vous.
        </SectionSubtitle>
      </SectionHeader>

      {/* Filter Buttons */}
      <div className="flex justify-center gap-4 mb-12 flex-wrap">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setSelectedFilter(filter)}
            className={
              selectedFilter === filter
                ? "px-6 py-2 rounded-lg bg-accent text-accent-foreground font-semibold font-heading transition-all duration-300"
                : "px-6 py-2 rounded-lg bg-transparent text-foreground font-semibold font-heading hover:bg-muted/50 transition-all duration-300"
            }
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Desktop Grid */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProperties.map((property) => (
          <Card
            key={property.id}
            className="group overflow-hidden hover:shadow-xl transition-all duration-300 bg-card border border-border"
          >
            <Link
              to={`/bien/${property.id}`}
              onClick={() => handlePropertyClick(property)}
              className="block"
            >
              <div className="relative overflow-hidden">
                <img
                  src={property.image_url || "/placeholder.svg"}
                  alt={property.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Dark overlay at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />
                
                {/* Content on overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold font-heading mb-2 line-clamp-2">
                    {property.title}
                  </h3>
                  
                  {/* Location */}
                  <div className="flex items-center text-white/90 mb-3 text-sm">
                    <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                    <span className="line-clamp-1">{getLocationText(property)}</span>
                  </div>

                  {/* Property Details */}
                  {property.property_details && property.property_details.length > 0 && (
                    <div className="flex items-center gap-4 mb-3 text-sm text-white/90">
                      {property.property_details[0].bedrooms !== null && (
                        <div className="flex items-center gap-1">
                          <Bed className="h-4 w-4" />
                          <span>{property.property_details[0].bedrooms}</span>
                        </div>
                      )}
                      {property.property_details[0].bathrooms !== null && (
                        <div className="flex items-center gap-1">
                          <Bath className="h-4 w-4" />
                          <span>{property.property_details[0].bathrooms}</span>
                        </div>
                      )}
                      {property.surface && (
                        <div className="flex items-center gap-1">
                          <Square className="h-4 w-4" />
                          <span>{property.surface} m²</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Price badge bottom right */}
                {property.price && property.price > 0 && (
                  <div className="absolute bottom-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-lg font-bold font-heading shadow-lg">
                    {formatPrice(property.price)}
                  </div>
                )}
              </div>
            </Link>
          </Card>
        ))}
      </div>

      {/* Mobile Carousel */}
      <div className="md:hidden overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {filteredProperties.map((property) => (
            <div key={property.id} className="flex-[0_0_85%] min-w-0 pl-4">
              <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 bg-card border border-border">
                <Link
                  to={`/bien/${property.id}`}
                  onClick={() => handlePropertyClick(property)}
                  className="block"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={property.image_url || "/placeholder.svg"}
                      alt={property.title}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Dark overlay at bottom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />
                    
                    {/* Content on overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-xl font-bold font-heading mb-2 line-clamp-2">
                        {property.title}
                      </h3>
                      
                      {/* Location */}
                      <div className="flex items-center text-white/90 mb-3 text-sm">
                        <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                        <span className="line-clamp-1">{getLocationText(property)}</span>
                      </div>

                      {/* Property Details */}
                      {property.property_details && property.property_details.length > 0 && (
                        <div className="flex items-center gap-4 mb-3 text-sm text-white/90">
                          {property.property_details[0].bedrooms !== null && (
                            <div className="flex items-center gap-1">
                              <Bed className="h-4 w-4" />
                              <span>{property.property_details[0].bedrooms}</span>
                            </div>
                          )}
                          {property.property_details[0].bathrooms !== null && (
                            <div className="flex items-center gap-1">
                              <Bath className="h-4 w-4" />
                              <span>{property.property_details[0].bathrooms}</span>
                            </div>
                          )}
                          {property.surface && (
                            <div className="flex items-center gap-1">
                              <Square className="h-4 w-4" />
                              <span>{property.surface} m²</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Price badge bottom right */}
                    {property.price && property.price > 0 && (
                      <div className="absolute bottom-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-lg font-bold font-heading shadow-lg">
                        {formatPrice(property.price)}
                      </div>
                    )}
                  </div>
                </Link>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Carousel indicators for mobile */}
      {filteredProperties.length > 1 && (
        <div className="md:hidden flex justify-center gap-2 mt-6">
          {filteredProperties.map((_, index) => (
            <div
              key={index}
              className="w-2 h-2 rounded-full bg-muted"
            />
          ))}
        </div>
      )}
    </Section>
  );
};

export default ExclusivePropertiesSection;

