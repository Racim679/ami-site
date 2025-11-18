import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
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

interface DynamicTypeCarouselProps {
  currentPropertyId?: string;
  className?: string;
}

const DynamicTypeCarousel: React.FC<DynamicTypeCarouselProps> = ({
  currentPropertyId,
  className = ""
}) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const navigate = useNavigate();
  
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: false, 
      dragFree: true,
      containScroll: 'trimSnaps'
    },
    [Autoplay({ delay: 4000, stopOnInteraction: true })]
  );

  // Fonction pour stocker le type de bien dans localStorage
  const storePropertyType = (typology: string) => {
    localStorage.setItem('selectedPropertyType', typology);
  };

  // Fonction pour récupérer le type depuis localStorage
  const getStoredPropertyType = (): string | null => {
    return localStorage.getItem('selectedPropertyType');
  };

  useEffect(() => {
    // Récupérer le type stocké dans localStorage
    const storedType = getStoredPropertyType();
    console.log('DynamicTypeCarousel - Stored type from localStorage:', storedType);
    setSelectedType(storedType);

    const fetchPropertiesByType = async () => {
      if (!storedType) {
        console.log('DynamicTypeCarousel - No stored type found, not loading');
        setLoading(false);
        return;
      }

      console.log('DynamicTypeCarousel - Fetching properties for type:', storedType);

      try {
        const { data, error } = await supabase
          .from('properties')
          .select(`
            *,
            locality:localities(
              name,
              city:cities(name)
            )
          `)
          .neq('status', 'Vendu')
          .eq('typology', storedType)
          .neq('id', currentPropertyId || '')
          .limit(12);

        console.log('DynamicTypeCarousel - Query result:', { data, error });

        if (error) throw error;

        console.log('DynamicTypeCarousel - Found properties count:', data?.length || 0);
        setProperties(data || []);
      } catch (error) {
        console.error('Erreur lors du chargement des biens par type:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPropertiesByType();
  }, [currentPropertyId]);

  const scrollPrev = () => {
    if (emblaApi) emblaApi.scrollPrev();
  };

  const scrollNext = () => {
    if (emblaApi) emblaApi.scrollNext();
  };

  console.log('DynamicTypeCarousel - Render conditions:', {
    selectedType,
    loading,
    propertiesCount: properties.length,
    shouldRender: selectedType && !loading && properties.length > 0
  });

  if (!selectedType && !loading) {
    console.log('DynamicTypeCarousel - Not rendering: no type selected');
    return null;
  }

  if (loading) {
    return (
      <section className={`py-20 bg-gradient-subtle ${className}`}>
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-muted rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (properties.length === 0) {
    console.log('DynamicTypeCarousel - Not rendering: no properties found');
    return (
      <section className={`py-20 bg-gradient-subtle ${className}`}>
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4 text-secondary">
              Autres biens de type "{selectedType}"
            </h2>
            <p className="text-muted-foreground text-lg">
              Aucun autre bien de ce type n'est actuellement disponible. 
              Explorez nos autres propriétés disponibles.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const getLocationText = (property: Property) => {
    const parts = [];
    if (property.locality?.name) parts.push(property.locality.name);
    if (property.locality?.city?.name) parts.push(property.locality.city.name);
    return parts.join(', ') || 'Localisation non spécifiée';
  };

  const handlePropertyClick = (property: Property) => {
    // Stocker le nouveau type de bien sélectionné
    if (property.typology) {
      storePropertyType(property.typology);
    }
  };

  return (
    <section className={`py-16 bg-gradient-subtle ${className}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-luxury-navy">
            Biens de type "{selectedType}"
          </h2>
          <p className="text-muted-foreground text-lg">
            Découvrez notre sélection de {selectedType.toLowerCase()}s disponibles
          </p>
        </div>

        <div className="relative">
          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background shadow-elegant"
            onClick={scrollPrev}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background shadow-elegant"
            onClick={scrollNext}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>

          {/* Carousel */}
          <div className="overflow-hidden mx-12" ref={emblaRef}>
            <div className="flex">
              {properties.map((property) => (
                <div key={property.id} className="flex-[0_0_320px] min-w-0 px-3">
                  <Card className="group hover-scale animate-fade-in shadow-elegant hover:shadow-luxury-glow transition-all duration-300">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <div className="aspect-[4/3] bg-muted">
                        {property.image_url ? (
                          <img
                            src={property.image_url}
                            alt={property.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-gradient-subtle">
                            <div className="text-center">
                              <div className="text-4xl mb-2">🏠</div>
                              <div className="text-sm">Aucune image</div>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Status Badge */}
                      <div className="absolute top-3 right-3">
                        <span className="inline-block px-3 py-1 bg-primary/90 text-primary-foreground rounded-full text-xs font-medium shadow-sm">
                          {property.status}
                        </span>
                      </div>
                      
                      {/* Type Badge */}
                      <div className="absolute top-3 left-3">
                        <span className="inline-block px-3 py-1 bg-luxury-gold/90 text-white rounded-full text-xs font-medium shadow-sm">
                          {property.typology}
                        </span>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-3 line-clamp-2 text-luxury-navy">
                        {property.title}
                      </h3>
                      
                      <div className="text-2xl font-bold text-primary mb-4">
                        {formatPrice(property.price)}
                      </div>

                      <div className="flex items-center text-sm text-muted-foreground mb-4">
                        <MapPin className="w-4 h-4 mr-2 flex-shrink-0 text-luxury-gold" />
                        <span className="line-clamp-1">{getLocationText(property)}</span>
                      </div>

                      {property.surface && (
                        <div className="text-sm text-muted-foreground mb-4">
                          <span className="font-medium">Surface:</span> {property.surface} m²
                        </div>
                      )}

                      <Link 
                        to={`/bien/${property.id}`}
                        onClick={() => handlePropertyClick(property)}
                      >
                        <Button className="w-full group btn-luxury">
                          Voir les détails
                          <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
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

        {/* Property Count */}
        <div className="text-center mt-4">
          <p className="text-sm text-muted-foreground">
            {properties.length} bien{properties.length > 1 ? 's' : ''} de type "{selectedType}" disponible{properties.length > 1 ? 's' : ''}
          </p>
        </div>
      </div>
    </section>
  );
};

export default DynamicTypeCarousel;