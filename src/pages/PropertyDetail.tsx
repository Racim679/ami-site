import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, Phone, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import { ChatbotProvider } from '@/contexts/ChatbotContext';
import SimilarPropertiesCarousel from '@/components/SimilarPropertiesCarousel';
import DynamicTypeCarousel from '@/components/DynamicTypeCarousel';
import { usePropertyTypeStorage } from '@/hooks/usePropertyTypeStorage';
import PropertyCarousel from '@/components/PropertyCarousel';
import PropertyVideoCarousel from '@/components/PropertyVideoCarousel';
import PropertyInfoSection from '@/components/PropertyInfoSection';
import PropertyMap from '@/components/PropertyMap';
import MediaCarousel from '@/components/MediaCarousel';
import { PropertyAmenitiesSection, PropertySecuritySection, PropertyDocumentsSection, PropertyNearbySection, PropertyBuildingSection } from '@/components/PropertyInfoSection';
import PropertyFeaturesTabsSection from '@/components/PropertyFeaturesTabsSection';
import { formatPrice } from '@/lib/utils';
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";

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
  const [carouselOpen, setCarouselOpen] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const { toast } = useToast();
  const { storePropertyType } = usePropertyTypeStorage();

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
          console.log('Raw data from Supabase:', data);
          console.log('property_amenities_structured:', data.property_amenities_structured);
          console.log('property_security_structured:', data.property_security_structured);
          
          const transformedData = {
            ...data,
            property_details: data.property_details?.[0] || null,
            property_photos: data.property_photos?.map(p => ({ photo_url: p.text })) || [],
            property_videos: data.property_videos?.map(v => ({ video_url: v.text, video_type: 'youtube' })) || [],
            property_building: data.property_building || [],
            property_amenities_structured: data.property_amenities_structured || null,
            property_security_structured: data.property_security_structured || null,
            property_documents_structured: data.property_documents_structured || null,
            property_nearby_structured: data.property_nearby_structured || null,
          };
          
          console.log('Transformed data:', transformedData);
          console.log('Final amenities:', transformedData.property_amenities_structured);
          console.log('Final security:', transformedData.property_security_structured);
          
          setProperty(transformedData);
          
          // Stocker le type de bien dans localStorage si disponible
          if (transformedData.typology) {
            storePropertyType(transformedData.typology);
          }
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
      </div>
    );
  }

  const formatPrice = (price?: number) => {
    if (!price) return 'Prix sur demande';
    
    if (price >= 10000000) {
      const md = price / 10000000;
      return `${md % 1 === 0 ? md.toString() : md.toFixed(1)} Md`;
    } else if (price >= 1000000) {
      const m = price / 1000000;
      return `${m % 1 === 0 ? m.toString() : m.toFixed(1)} M`;
    } else if (price >= 10000) {
      const mil = price / 10000;
      return `${mil % 1 === 0 ? mil.toString() : mil.toFixed(1)} m`;
    } else {
      return `${new Intl.NumberFormat('fr-TN', {
        style: 'decimal',
        minimumFractionDigits: 0,
      }).format(price)} DA`;
    }
  };

  const getLocationText = () => {
    const parts = [];
    if (property.locality?.name) parts.push(property.locality.name);
    if (property.locality?.city?.name) parts.push(property.locality.city.name);
    return parts.join(', ') || 'Localisation non spécifiée';
  };

  const getWhatsAppLink = () => {
    const cleanPhoneNumber = property.phone_whatsapp.replace(/[^0-9]/g, '');
    return `https://api.whatsapp.com/send/?phone=${cleanPhoneNumber}&text=Bonjour%2C+je+vous+contacte+concernant+le+bien+que+vous+proposez+via+AMI+Immobilier.+Pourriez-vous+me+donner+plus+d%27informations+s%27il+vous+pla%C3%AEt+%3F&type=phone_number&app_absent=0`;
  };

  const getMediaItems = () => {
    const media = [];
    
    // Ajouter les photos
    if (property?.property_photos) {
      property.property_photos.forEach(photo => {
        media.push({
          type: 'image' as const,
          url: photo.photo_url,
          caption: photo.caption
        });
      });
    }
    
    // Ajouter les vidéos
    if (property?.property_videos) {
      property.property_videos.forEach(video => {
        media.push({
          type: 'video' as const,
          url: video.video_url,
          videoType: video.video_type || 'youtube'
        });
      });
    }
    
    return media;
  };

  const openCarousel = (index: number) => {
    setCarouselIndex(index);
    setCarouselOpen(true);
  };

  return (
    <ChatbotProvider>
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

        {/* Main Image - Full Width - Hidden on mobile */}
        <div className="mb-8 -mx-4 hidden md:block">
          <div 
            className="w-full bg-muted cursor-pointer hover:opacity-95 transition-opacity"
            style={{ height: '80vh' }}
            onClick={() => openCarousel(0)}
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

        {/* Video Carousel - Full Width */}
        {property.property_videos && property.property_videos.length > 0 && (
          <div className="mb-8 -mx-4">
            <div className="px-4">
              <PropertyVideoCarousel videos={property.property_videos} />
            </div>
          </div>
        )}

        {/* Photo Carousel - Full Width */}
        {property.property_photos && property.property_photos.length > 0 && (
          <div className="mb-8 -mx-4">
            <div className="px-4">
              <div className="relative">
                <h3 className="text-2xl font-bold mb-4 hidden md:block">Photos de la propriété</h3>
                
                {/* Mobile: Une seule image */}
                <div className="block md:hidden">
                  <div 
                    className="h-64 rounded-lg overflow-hidden bg-muted cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => openCarousel(0)}
                  >
                    <img
                      src={property.property_photos[0].photo_url}
                      alt={property.property_photos[0].caption || `Photo principale`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-center text-sm text-muted-foreground mt-2">
                    Cliquez pour voir toutes les {property.property_photos.length} photo{property.property_photos.length > 1 ? 's' : ''}
                  </div>
                </div>

                {/* Desktop: Grille de photos */}
                <div className="hidden md:block">
                  <div className="grid grid-cols-4 gap-4">
                    {property.property_photos.slice(0, 4).map((photo, index) => (
                      <div 
                        key={index}
                        className="h-56 rounded-lg overflow-hidden bg-muted cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => openCarousel(index)}
                      >
                        <img
                          src={photo.photo_url}
                          alt={photo.caption || `Photo ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="text-center text-sm text-muted-foreground mt-2">
                    Affichage de {Math.min(4, property.property_photos.length)} sur {property.property_photos.length} photo{property.property_photos.length > 1 ? 's' : ''}
                    {property.property_photos.length > 4 && (
                      <span className="block mt-1 text-primary cursor-pointer" onClick={() => openCarousel(0)}>
                        Cliquez sur une image pour voir toutes les photos et vidéos
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1 lg:w-2/3">

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
              
              {/* Additional Property Info */}
              <div className="grid grid-cols-3 md:grid-cols-3 gap-2 md:gap-4 mb-6">
                {property.surface && (
                  <div className="flex flex-col md:flex-row md:items-center md:space-x-2">
                    <span className="text-xs md:text-sm font-medium">Surface:</span>
                    <span className="text-xs md:text-sm font-bold">{property.surface} m²</span>
                  </div>
                )}
                {property.typology && (
                  <div className="flex flex-col md:flex-row md:items-center md:space-x-2">
                    <span className="text-xs md:text-sm font-medium">Type:</span>
                    <span className="text-xs md:text-sm font-bold">{property.typology}</span>
                  </div>
                )}
                {property.status && (
                  <div className="flex flex-col md:flex-row md:items-center md:space-x-2">
                    <span className="text-xs md:text-sm font-medium">Statut:</span>
                    <span className="inline-block px-1 md:px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium">
                      {property.status}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Property Details */}
            {property.property_details && (
              <div className="mb-8">
                <PropertyInfoSection 
                  propertyInfo={{
                    ...property.property_details,
                    surface: property.surface
                  }} 
                  className="md:block"
                />
              </div>
            )}

            {/* Points forts - Onglets */}
            <div className="mb-8">
              <PropertyFeaturesTabsSection 
                amenities={property.property_amenities_structured || {}}
                security={property.property_security_structured || {}}
                documents={property.property_documents_structured || {}}
                nearby={property.property_nearby_structured || {}}
                building={property.property_building || []}
              />
            </div>


            {/* Description */}
            {property.description && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Description</h2>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  {property.description}
                </p>
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
      
      {/* Carrousel dynamique par type */}
      <DynamicTypeCarousel 
        currentPropertyId={property.id}
      />
      
      {/* Section des biens similaires */}
      <SimilarPropertiesCarousel 
        currentPropertyId={property.id}
        typology={property.typology}
        cityName={property.locality?.city?.name}
        surface={property.surface}
      />

      {/* Media Carousel */}
      <MediaCarousel
        isOpen={carouselOpen}
        onClose={() => setCarouselOpen(false)}
        media={getMediaItems()}
        initialIndex={carouselIndex}
      />
      
      {/* WhatsApp Floating Button */}
      <WhatsAppFloatingButton phoneNumber={property.phone_whatsapp} />
    </div>
    </ChatbotProvider>
  );
};

export default PropertyDetail;