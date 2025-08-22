import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, Phone, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PropertyQuoteForm from '@/components/PropertyQuoteForm';
import PropertyCarousel from '@/components/PropertyCarousel';
import PropertyVideoCarousel from '@/components/PropertyVideoCarousel';
import PropertyInfoSection from '@/components/PropertyInfoSection';
import PropertyMap from '@/components/PropertyMap';
import { PropertyAmenitiesSection, PropertySecuritySection, PropertyDocumentsSection, PropertyNearbySection, PropertyBuildingSection } from '@/components/PropertyInfoSection';

interface PropertyDetailData {
  id: string;
  title: string;
  description?: string;
  surface?: number;
  price?: number;
  status: string;
  image_url?: string;
  created_at: string;
  latitude?: number;
  longitude?: number;
  typology?: string;
  phone_whatsapp: string;
  locality?: {
    name: string;
    city?: {
      name: string;
    };
  };
  property_details?: {
    bedrooms?: number;
    bathrooms?: number;
    rooms?: number;
    floors?: number;
    living_area?: number;
    condition?: string;
    vue_ville?: boolean;
    vue_mer?: boolean;
    vue_montagne?: boolean;
    vue_jardin?: boolean;
    vue_cour?: boolean;
    vue_degagee?: boolean;
  };
  property_photos?: Array<{ photo_url: string; caption?: string }>;
  property_videos?: Array<{ video_url: string; video_type?: string }>;
  property_building?: Array<{ text: string }>;
  property_amenities_structured?: {
    piscine?: boolean;
    garage?: boolean;
    jardin?: boolean;
    terrasse?: boolean;
    balcon?: boolean;
    cave?: boolean;
    grenier?: boolean;
    buanderie?: boolean;
  };
  property_security_structured?: {
    gardien?: boolean;
    video_surveillance?: boolean;
    alarme?: boolean;
    digicode?: boolean;
    interphone?: boolean;
    portail_electrique?: boolean;
    ascenseur?: boolean;
    acces_handicape?: boolean;
  };
  property_documents_structured?: {
    titre_propriete?: boolean;
    acte_propriete?: boolean;
    livret_foncier?: boolean;
    certificat_inscription_fonciere?: boolean;
    plans_cadastraux?: boolean;
    documents_cadastraux?: boolean;
    fiche_fiscale?: boolean;
    certificat_urbanisme?: boolean;
    permis_construire?: boolean;
    certification_conformite?: boolean;
    contrat_location?: boolean;
    promesse_vente?: boolean;
    mainlevee?: boolean;
    permis_exploitation?: boolean;
    certificat_non_negativite?: boolean;
    certification_possession?: boolean;
  };
  property_nearby_structured?: {
    ecoles?: boolean;
    pharmacies?: boolean;
    mosquees?: boolean;
    transports_publics?: boolean;
    banques?: boolean;
    universites?: boolean;
    commerces?: boolean;
    restaurants?: boolean;
    aeroports?: boolean;
    hopitaux?: boolean;
    parcs?: boolean;
    plages?: boolean;
  };
}

const PropertyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<PropertyDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) return;

      try {
        const { data, error } = await supabase
          .from('properties')
          .select(`
            *,
            locality:localities(
              name,
              city:cities(name)
            ),
            property_details(*),
            property_photos(text),
            property_videos(text),
            property_building(text),
            property_amenities_structured(*),
            property_security_structured(*),
            property_documents_structured(*),
            property_nearby_structured(*)
          `)
          .eq('id', id)
          .maybeSingle();

        if (error) throw error;
        
        // Transform the data to match our interface
        if (data) {
          const transformedData = {
            ...data,
            property_details: data.property_details?.[0] || null,
            property_photos: data.property_photos?.map(p => ({ photo_url: p.text })) || [],
            property_videos: data.property_videos?.map(v => ({ video_url: v.text, video_type: 'youtube' })) || [],
            property_building: data.property_building || [],
            property_amenities_structured: data.property_amenities_structured?.[0] || null,
            property_security_structured: data.property_security_structured?.[0] || null,
            property_documents_structured: data.property_documents_structured?.[0] || null,
            property_nearby_structured: data.property_nearby_structured?.[0] || null,
          };
          setProperty(transformedData);
        }
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
  }, [id, toast]);

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

  const getWhatsAppLink = () => {
    const message = encodeURIComponent(`Bonjour, je suis intéressé par votre propriété "${property.title}"`);
    return `https://wa.me/${property.phone_whatsapp.replace(/[^0-9]/g, '')}?text=${message}`;
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

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1 lg:w-2/3">
            {/* Main Image */}
            <div className="mb-8">
              <div 
                className="w-full rounded-lg overflow-hidden bg-muted cursor-pointer"
                style={{ height: '82vh' }}
                onClick={() => property.property_photos && property.property_photos.length > 0 && window.open(property.property_photos[0].photo_url, '_blank')}
              >
                {property.image_url ? (
                  <img
                    src={property.image_url}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    Aucune image disponible
                  </div>
                )}
              </div>
            </div>

            {/* Video Carousel */}
            {property.property_videos && property.property_videos.length > 0 && (
              <div className="mb-8">
                <PropertyVideoCarousel videos={property.property_videos} />
              </div>
            )}

            {/* Photo Carousel */}
            {property.property_photos && property.property_photos.length > 0 && (
              <div className="mb-8">
                <PropertyCarousel photos={property.property_photos} />
              </div>
            )}

            {/* Property Title & Basic Info */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-4">{property.title}</h1>
              <div className="text-3xl font-bold text-primary mb-4">
                {formatPrice(property.price)}
              </div>
              <div className="flex items-center text-muted-foreground mb-6">
                <MapPin className="w-5 h-5 mr-2" />
                <span className="text-lg">{getLocationText()}</span>
              </div>
            </div>

            {/* Property Details */}
            {property.property_details && (
              <div className="mb-8">
                <PropertyInfoSection propertyInfo={property.property_details} />
              </div>
            )}

            {/* Description */}
            {property.description && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {property.description}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Points Forts - Two columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {property.property_amenities_structured && (
                <PropertyAmenitiesSection amenities={property.property_amenities_structured} />
              )}
              
              {property.property_security_structured && (
                <PropertySecuritySection security={property.property_security_structured} />
              )}
              
              {property.property_nearby_structured && (
                <PropertyNearbySection nearby={property.property_nearby_structured} />
              )}
            </div>

            {/* Building Features */}
            {property.property_building && property.property_building.length > 0 && (
              <div className="mb-8">
                <PropertyBuildingSection items={property.property_building.map(b => ({ building_feature: b.text }))} />
              </div>
            )}

            {/* Documents */}
            {property.property_documents_structured && (
              <div className="mb-8">
                <PropertyDocumentsSection documents={property.property_documents_structured} />
              </div>
            )}

            {/* Map */}
            {property.latitude && property.longitude && (
              <div className="mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Localisation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <PropertyMap 
                      latitude={property.latitude} 
                      longitude={property.longitude}
                      title={property.title}
                    />
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:w-1/3">
            <div className="lg:sticky lg:top-8 space-y-6">
              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Propriétaire du bien</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-primary" />
                    <span className="text-lg">{property.phone_whatsapp}</span>
                  </div>
                  
                  <Button 
                    onClick={() => window.open(getWhatsAppLink(), '_blank')}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Contacter via WhatsApp
                  </Button>
                </CardContent>
              </Card>

              {/* Location Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Localisation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{getLocationText()}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Status Badge */}
              <Card>
                <CardContent className="p-4">
                  <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                    {property.status}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      {/* Section de demande de devis */}
      <PropertyQuoteForm 
        propertyTitle={property.title}
        latitude={property.latitude}
        longitude={property.longitude}
      />
      
      <Footer />
    </div>
  );
};

export default PropertyDetail;