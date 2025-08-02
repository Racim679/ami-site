import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, Ruler, DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PropertyCarousel from '@/components/PropertyCarousel';
import PropertyVideoPlayer from '@/components/PropertyVideoPlayer';
import PropertyInfoSection, {
  PropertyAmenitiesSection,
  PropertySecuritySection,
  PropertyBuildingSection,
  PropertyNearbySection,
  PropertyDocumentsSection
} from '@/components/PropertyInfoSection';

interface PropertyPageData {
  id: string;
  title: string;
  description?: string;
  surface_m2?: number;
  prix_dinar?: number;
  status: string;
  image_url?: string;
  created_at: string;
  locality?: {
    name: string;
    city?: {
      name: string;
    };
  };
  typology?: {
    label: string;
  };
  // New fields from detailed tables
  photos: Array<{ photo_url: string; caption?: string }>;
  videos: Array<{ video_url: string; video_type?: string }>;
  details: {
    bedrooms?: number;
    bathrooms?: number;
    rooms?: number;
    floors?: number;
    living_area?: number;
    has_city_view?: boolean;
    condition?: string;
  } | null;
  amenities: Array<{ amenity: string }>;
  securityFeatures: Array<{ security_feature: string }>;
  buildingFeatures: Array<{ building_feature: string }>;
  nearby: Array<{ nearby_feature: string }>;
  documents: Array<{ document_name: string }>;
}

const PropertyPage: React.FC = () => {
  const { propertyId } = useParams<{ propertyId: string }>();
  const [property, setProperty] = useState<PropertyPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProperty = async () => {
      if (!propertyId) return;

      try {
        // Main property data
        const { data: propertyData, error: propertyError } = await supabase
          .from('properties')
          .select(`
            *,
            locality:localities(
              name,
              city:cities(name)
            ),
            typology:typologies(label)
          `)
          .eq('id', propertyId)
          .single();

        if (propertyError) throw propertyError;

        // Fetch related data in parallel
        const fetchPromises = await Promise.allSettled([
          (supabase as any).from('property_photos').select('*').eq('property_id', propertyId).order('display_order'),
          (supabase as any).from('property_videos').select('*').eq('property_id', propertyId),
          (supabase as any).from('property_details').select('*').eq('property_id', propertyId).maybeSingle(),
          (supabase as any).from('property_amenities').select('*').eq('property_id', propertyId),
          (supabase as any).from('property_security_features').select('*').eq('property_id', propertyId),
          (supabase as any).from('property_building_features').select('*').eq('property_id', propertyId),
          (supabase as any).from('property_nearby').select('*').eq('property_id', propertyId),
          (supabase as any).from('property_documents').select('*').eq('property_id', propertyId)
        ]);

        const [
          photosResult,
          videosResult,
          detailsResult,
          amenitiesResult,
          securityFeaturesResult,
          buildingFeaturesResult,
          nearbyResult,
          documentsResult
        ] = fetchPromises;

        const photos = photosResult.status === 'fulfilled' ? photosResult.value.data || [] : [];
        const videos = videosResult.status === 'fulfilled' ? videosResult.value.data || [] : [];
        const details = detailsResult.status === 'fulfilled' ? detailsResult.value.data || null : null;
        const amenities = amenitiesResult.status === 'fulfilled' ? amenitiesResult.value.data || [] : [];
        const securityFeatures = securityFeaturesResult.status === 'fulfilled' ? securityFeaturesResult.value.data || [] : [];
        const buildingFeatures = buildingFeaturesResult.status === 'fulfilled' ? buildingFeaturesResult.value.data || [] : [];
        const nearby = nearbyResult.status === 'fulfilled' ? nearbyResult.value.data || [] : [];
        const documents = documentsResult.status === 'fulfilled' ? documentsResult.value.data || [] : [];

        const completePropertyData: PropertyPageData = {
          ...propertyData,
          photos: photos || [],
          videos: videos || [],
          details: details || null,
          amenities: amenities || [],
          securityFeatures: securityFeatures || [],
          buildingFeatures: buildingFeatures || [],
          nearby: nearby || [],
          documents: documents || []
        };

        setProperty(completePropertyData);
      } catch (error) {
        console.error('Erreur lors du chargement de la propriété:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les détails de cette propriété",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [propertyId, toast]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">Chargement...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Propriété non trouvée</h2>
                <Link to="/nos-biens">
                  <Button>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Retour à la liste
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  const formatPrice = (price?: number) => {
    if (!price) return 'Prix sur demande';
    return new Intl.NumberFormat('fr-TN', {
      style: 'decimal',
      minimumFractionDigits: 0,
    }).format(price) + ' DT';
  };

  const getLocationText = () => {
    const parts = [];
    if (property.locality?.name) parts.push(property.locality.name);
    if (property.locality?.city?.name) parts.push(property.locality.city.name);
    return parts.join(', ') || 'Localisation non spécifiée';
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/nos-biens">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour à la liste
            </Button>
          </Link>
        </div>

        <div className="space-y-8">
          {/* Video Section */}
          {property.videos && property.videos.length > 0 && (
            <PropertyVideoPlayer
              videoUrl={property.videos[0].video_url}
              videoType={property.videos[0].video_type}
              className="w-full"
            />
          )}

          {/* Photo Carousel */}
          {property.photos && property.photos.length > 0 ? (
            <PropertyCarousel photos={property.photos} className="w-full" />
          ) : property.image_url ? (
            <div className="aspect-video rounded-lg overflow-hidden bg-muted">
              <img
                src={property.image_url}
                alt={property.title}
                className="w-full h-full object-cover"
              />
            </div>
          ) : null}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Main Information */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
                <div className="flex items-center text-muted-foreground mb-4">
                  <MapPin className="w-4 h-4 mr-1" />
                  {getLocationText()}
                </div>
                <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  {property.status}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {property.typology?.label && (
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="font-semibold">Type</div>
                      <div className="text-muted-foreground">{property.typology.label}</div>
                    </CardContent>
                  </Card>
                )}
                
                {property.surface_m2 && (
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Ruler className="w-5 h-5 mx-auto mb-1 text-primary" />
                      <div className="font-semibold">{property.surface_m2} m²</div>
                      <div className="text-sm text-muted-foreground">Surface</div>
                    </CardContent>
                  </Card>
                )}
                
                <Card>
                  <CardContent className="p-4 text-center">
                    <DollarSign className="w-5 h-5 mx-auto mb-1 text-primary" />
                    <div className="font-semibold">{formatPrice(property.prix_dinar)}</div>
                    <div className="text-sm text-muted-foreground">Prix</div>
                  </CardContent>
                </Card>
              </div>

              {property.description && (
                <Card>
                  <CardHeader>
                    <CardTitle>Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {property.description}
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Property Details and Lists */}
            <div className="space-y-6">
              {/* Property Information */}
              {property.details && (
                <PropertyInfoSection 
                  propertyInfo={{
                    bedrooms: property.details.bedrooms,
                    bathrooms: property.details.bathrooms,
                    rooms: property.details.rooms,
                    floors: property.details.floors,
                    livingArea: property.details.living_area,
                    hasCityView: property.details.has_city_view,
                    condition: property.details.condition
                  }}
                />
              )}

              {/* Amenities */}
              <PropertyAmenitiesSection items={property.amenities} />

              {/* Security Features */}
              <PropertySecuritySection items={property.securityFeatures} />

              {/* Building Features */}
              <PropertyBuildingSection items={property.buildingFeatures} />

              {/* Nearby */}
              <PropertyNearbySection items={property.nearby} />

              {/* Documents */}
              <PropertyDocumentsSection items={property.documents} />

              {/* Contact Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Intéressé par cette propriété ?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Contactez-nous pour plus d'informations ou pour organiser une visite.
                  </p>
                  <Link to="/contact">
                    <Button className="w-full">
                      Nous contacter
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PropertyPage;