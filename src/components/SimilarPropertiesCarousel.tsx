import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { usePropertyTypeStorage } from '@/hooks/usePropertyTypeStorage';
import { formatPrice } from '@/lib/utils';
import AuditButton from '@/components/ui/audit-button';

interface Property {
  id: string;
  title: string;
  price?: number;
  image_url?: string;
  typology?: string;
  surface?: number;
  status: string;
  locality?: {
    name: string;
    city?: {
      name: string;
    };
  };
}

interface SimilarPropertiesCarouselProps {
  currentPropertyId: string;
  typology?: string;
  cityName?: string;
  surface?: number;
}

const SimilarPropertiesCarousel: React.FC<SimilarPropertiesCarouselProps> = ({
  currentPropertyId,
  typology,
  cityName,
  surface
}) => {
  const [similarProperties, setSimilarProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const { storePropertyType } = usePropertyTypeStorage();
  const navigate = useNavigate();
  
  const [emblaRef] = useEmblaCarousel(
    { loop: true, dragFree: true },
    [Autoplay({ delay: 4000 })]
  );

  useEffect(() => {
    const fetchSimilarProperties = async () => {
      try {
        // Priority 1: Same type
        let { data: sameType } = await supabase
          .from('properties')
          .select(`
            *,
            locality:localities(
              name,
              city:cities(name)
            )
          `)
          .neq('id', currentPropertyId)
          .eq('status', 'available')
          .eq('typology', typology || '')
          .limit(10);

        // Priority 2: Same city (get properties from same city)
        let sameCity: Property[] = [];
        if (cityName) {
          const { data: cityProps } = await supabase
            .from('properties')
            .select(`
              *,
              locality:localities(
                name,
                city:cities(name)
              )
            `)
            .neq('id', currentPropertyId)
            .eq('status', 'available')
            .limit(10);
          
          // Filter by city name on the client side
          sameCity = cityProps?.filter(p => p.locality?.city?.name === cityName) || [];
        }

        // Priority 3: Similar surface (±20%)
        const surfaceMin = surface ? Number(surface) * 0.8 : 0;
        const surfaceMax = surface ? Number(surface) * 1.2 : 999999;
        
        let { data: similarSurface } = await supabase
          .from('properties')
          .select(`
            *,
            locality:localities(
              name,
              city:cities(name)
            )
          `)
          .neq('id', currentPropertyId)
          .eq('status', 'available')
          .gte('surface', surfaceMin)
          .lte('surface', surfaceMax)
          .limit(10);

        // Combine and deduplicate results, maintaining priority order
        const allProperties = [
          ...(sameType || []),
          ...(sameCity || []),
          ...(similarSurface || [])
        ];

        // Remove duplicates while preserving order
        const uniqueProperties = allProperties.filter((property, index, arr) => 
          arr.findIndex(p => p.id === property.id) === index
        );

        setSimilarProperties(uniqueProperties.slice(0, 8));
      } catch (error) {
        console.error('Erreur lors du chargement des biens similaires:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSimilarProperties();
  }, [currentPropertyId, typology, cityName, surface]);

  if (loading || similarProperties.length === 0) {
    return null;
  }

  const getLocationText = (property: Property) => {
    const parts = [];
    if (property.locality?.name) parts.push(property.locality.name);
    if (property.locality?.city?.name) parts.push(property.locality.city.name);
    return parts.join(', ') || 'Localisation non spécifiée';
  };

  const handlePropertyClick = (property: Property) => {
    if (property.typology) {
      storePropertyType(property.typology);
    }
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Biens Similaires</h2>
          <p className="text-muted-foreground text-lg">
            Découvrez d'autres propriétés qui pourraient vous intéresser
          </p>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {similarProperties.map((property) => (
              <div key={property.id} className="flex-[0_0_300px] min-w-0 pl-4">
                <Card className="group hover-scale animate-fade-in">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <div className="aspect-[4/3] bg-muted">
                      {property.image_url ? (
                        <img
                          src={property.image_url}
                          alt={property.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          Aucune image
                        </div>
                      )}
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="inline-block px-2 py-1 bg-primary/90 text-primary-foreground rounded text-xs font-medium">
                        {property.status}
                      </span>
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                      {property.title}
                    </h3>
                    
                    <div className="text-2xl font-bold text-primary mb-3">
                      {formatPrice(property.price)}
                    </div>

                    <div className="flex items-center text-sm text-muted-foreground mb-3">
                      <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                      <span className="line-clamp-1">{getLocationText(property)}</span>
                    </div>

                    <div className="flex justify-between items-center text-sm mb-4">
                      {property.typology && (
                        <span className="font-medium">{property.typology}</span>
                      )}
                      {property.surface && (
                        <span className="text-muted-foreground">{property.surface} m²</span>
                      )}
                    </div>

                    <Link 
                      to={`/bien/${property.id}`}
                      onClick={() => handlePropertyClick(property)}
                    >
                      <Button className="w-full group">
                        Voir les détails
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-8">
          <div className="w-full flex justify-center px-4 sm:px-0">
            <div className="w-full sm:w-auto max-w-xs sm:max-w-none">
              <AuditButton 
                text="Voir tous nos biens" 
                showArrow={true} 
                onClick={() => navigate('/nos-biens')}
                width="100%"
                height={50}
                fontSize={14}
                className="w-full sm:w-auto sm:!w-[380px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimilarPropertiesCarousel;