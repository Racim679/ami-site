import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, Ruler, DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { formatPrice } from '@/lib/utils';
import Header from '@/components/Header';
import PropertyCarousel from '@/components/PropertyCarousel';
import PropertyVideoPlayer from '@/components/PropertyVideoPlayer';
import MediaCarousel from '@/components/MediaCarousel';
import PropertyInfoSection, {
  PropertyAmenitiesSection,
  PropertySecuritySection,
  PropertyBuildingSection,
  PropertyNearbySection,
  PropertyDocumentsSection
} from '@/components/PropertyInfoSection';
import PropertyQuoteForm from '@/components/PropertyQuoteForm';
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
import { ChatbotProvider } from '@/contexts/ChatbotContext';

interface PropertyPageData {
  id: string;
  title: string;
  description?: string;
  surface_m2?: number;
  prix_dinar?: number;
  status: string;
  image_url?: string;
  phone_whatsapp: string;
  created_at: string;
  latitude?: number;
  longitude?: number;
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

function PropertyPage() {
  const { propertyId } = useParams<{ propertyId: string }>();
  const [property, setProperty] = useState<PropertyPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [carouselOpen, setCarouselOpen] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const { toast } = useToast();

  console.log('PropertyPage - propertyId from URL:', propertyId);

  useEffect(() => {
    const fetchProperty = async () => {
      if (!propertyId) {
        console.error('No propertyId provided');
        setLoading(false);
        return;
      }

      console.log('Fetching property with ID:', propertyId);

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

        if (propertyError) {
          console.error('Property fetch error:', propertyError);
          throw propertyError;
        }

        // Charger les photos depuis la base de données
        const { data: photosData } = await supabase
          .from('property_photos')
          .select('text')
          .eq('property_id', propertyId)
          .order('created_at', { ascending: true });

        const photos = photosData?.map(p => ({ photo_url: p.text })) || [];
        
        // Charger les vidéos depuis la base de données
        const { data: videosData } = await supabase
          .from('property_videos')
          .select('text')
          .eq('property_id', propertyId)
          .order('created_at', { ascending: true });

        const videos = videosData?.map(v => ({ video_url: v.text, video_type: 'youtube' })) || [];
        
        // Charger les détails de la propriété
        const { data: detailsData } = await supabase
          .from('property_details')
          .select('*')
          .eq('property_id', propertyId)
          .maybeSingle();

        const details = detailsData ? {
          bedrooms: detailsData.bedrooms,
          bathrooms: detailsData.bathrooms,
          rooms: detailsData.rooms,
          floors: detailsData.floors,
          living_area: detailsData.living_area,
          has_city_view: detailsData.has_city_view,
          condition: detailsData.condition
        } : null;
        
        // Charger les commodités structurées
        const { data: amenitiesData } = await supabase
          .from('property_amenities_structured')
          .select('*')
          .eq('property_id', propertyId)
          .maybeSingle();

        const amenities = amenitiesData ? [
          ...(amenitiesData.piscine ? [{ amenity: 'Piscine' }] : []),
          ...(amenitiesData.garage ? [{ amenity: 'Garage' }] : []),
          ...(amenitiesData.jardin ? [{ amenity: 'Jardin' }] : []),
          ...(amenitiesData.terrasse ? [{ amenity: 'Terrasse' }] : []),
          ...(amenitiesData.balcon ? [{ amenity: 'Balcon' }] : []),
          ...(amenitiesData.cave ? [{ amenity: 'Cave' }] : []),
          ...(amenitiesData.grenier ? [{ amenity: 'Grenier' }] : []),
          ...(amenitiesData.buanderie ? [{ amenity: 'Buanderie' }] : [])
        ] : [];
        
        // Charger les éléments de sécurité
        const { data: securityData } = await supabase
          .from('property_security_structured')
          .select('*')
          .eq('property_id', propertyId)
          .maybeSingle();

        const securityFeatures = securityData ? [
          ...(securityData.gardien ? [{ security_feature: 'Gardiennage' }] : []),
          ...(securityData.ascenseur ? [{ security_feature: 'Ascenseur' }] : []),
          ...(securityData.acces_handicape ? [{ security_feature: 'Accès handicapé' }] : []),
          ...(securityData.video_surveillance ? [{ security_feature: 'Vidéosurveillance' }] : []),
          ...(securityData.digicode ? [{ security_feature: 'Digicode' }] : []),
          ...(securityData.interphone ? [{ security_feature: 'Interphone' }] : []),
          ...(securityData.alarme ? [{ security_feature: 'Alarme' }] : []),
          ...(securityData.portail_electrique ? [{ security_feature: 'Portail électrique' }] : [])
        ] : [];
        
        // Charger les caractéristiques du bâtiment
        const { data: buildingData } = await supabase
          .from('property_building')
          .select('text')
          .eq('property_id', propertyId)
          .order('created_at', { ascending: true });

        const buildingFeatures = buildingData?.map(b => ({ building_feature: b.text })) || [];
        
        // Charger les éléments à proximité
        const { data: nearbyData } = await supabase
          .from('property_nearby_structured')
          .select('*')
          .eq('property_id', propertyId)
          .maybeSingle();

        const nearby = nearbyData ? [
          ...(nearbyData.ecoles ? [{ nearby_feature: 'Écoles' }] : []),
          ...(nearbyData.pharmacies ? [{ nearby_feature: 'Pharmacies' }] : []),
          ...(nearbyData.mosquees ? [{ nearby_feature: 'Mosquées' }] : []),
          ...(nearbyData.transports_publics ? [{ nearby_feature: 'Transports publics' }] : []),
          ...(nearbyData.banques ? [{ nearby_feature: 'Banques' }] : []),
          ...(nearbyData.universites ? [{ nearby_feature: 'Universités' }] : []),
          ...(nearbyData.commerces ? [{ nearby_feature: 'Commerces' }] : []),
          ...(nearbyData.restaurants ? [{ nearby_feature: 'Restaurants' }] : []),
          ...(nearbyData.aeroports ? [{ nearby_feature: 'Aéroports' }] : []),
          ...(nearbyData.hopitaux ? [{ nearby_feature: 'Hôpitaux' }] : []),
          ...(nearbyData.parcs ? [{ nearby_feature: 'Parcs' }] : []),
          ...(nearbyData.plages ? [{ nearby_feature: 'Plages' }] : [])
        ] : [];
        
        // Charger les documents
        const { data: documentsData } = await supabase
          .from('property_documents_structured')
          .select('*')
          .eq('property_id', propertyId)
          .maybeSingle();

        const documents = documentsData ? [
          ...(documentsData.livret_foncier ? [{ document_name: 'Livret foncier' }] : []),
          ...(documentsData.acte_propriete ? [{ document_name: 'Acte de propriété' }] : []),
          ...(documentsData.titre_propriete ? [{ document_name: 'Titre de propriété' }] : []),
          ...(documentsData.contrat_location ? [{ document_name: 'Contrat de location' }] : []),
          ...(documentsData.certification_possession ? [{ document_name: 'Certification de possession' }] : []),
          ...(documentsData.certificat_inscription_fonciere ? [{ document_name: 'Certificat d\'inscription foncière' }] : []),
          ...(documentsData.fiche_fiscale ? [{ document_name: 'Fiche fiscale' }] : []),
          ...(documentsData.documents_cadastraux ? [{ document_name: 'Documents cadastraux' }] : []),
          ...(documentsData.plans_cadastraux ? [{ document_name: 'Plans cadastraux' }] : []),
          ...(documentsData.certificat_urbanisme ? [{ document_name: 'Certificat d\'urbanisme' }] : []),
          ...(documentsData.permis_construire ? [{ document_name: 'Permis de construire' }] : []),
          ...(documentsData.certification_conformite ? [{ document_name: 'Certification de conformité' }] : []),
          ...(documentsData.promesse_vente ? [{ document_name: 'Promesse de vente' }] : []),
          ...(documentsData.mainlevee ? [{ document_name: 'Mainlevée' }] : []),
          ...(documentsData.permis_exploitation ? [{ document_name: 'Permis d\'exploitation' }] : []),
          ...(documentsData.certificat_non_negativite ? [{ document_name: 'Certificat de non-négativité' }] : [])
        ] : [];

        console.log('All property data fetched:', { propertyData, photos, videos, details, amenities });

        const completePropertyData: PropertyPageData = {
          ...propertyData,
          photos,
          videos,
          details,
          amenities,
          securityFeatures,
          buildingFeatures,
          nearby,
          documents
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

  const getLocationText = () => {
    const parts = [];
    if (property.locality?.name) parts.push(property.locality.name);
    if (property.locality?.city?.name) parts.push(property.locality.city.name);
    return parts.join(', ') || 'Localisation non spécifiée';
  };

  const getMediaItems = () => {
    const media = [];
    
    // Ajouter les photos
    if (property?.photos) {
      property.photos.forEach(photo => {
        media.push({
          type: 'image' as const,
          url: photo.photo_url,
          caption: photo.caption
        });
      });
    }
    
    // Ajouter les vidéos
    if (property?.videos) {
      property.videos.forEach(video => {
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
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Breadcrumb Navigation */}
      <div className="bg-muted py-4">
        <div className="container mx-auto px-4">
          <div className="text-sm text-muted-foreground">
            Propriétés / <span className="text-foreground font-medium">{property.title}</span>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Image Section */}
        <div className="mb-8">
          {property.photos && property.photos.length > 0 ? (
            <div className="relative">
              {/* Main large image */}
              <div 
                className="aspect-[16/9] rounded-lg overflow-hidden bg-muted mb-4 cursor-pointer hover:opacity-95 transition-opacity"
                onClick={() => openCarousel(0)}
              >
                <img
                  src={property.photos[0].photo_url}
                  alt={property.photos[0].caption || property.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Thumbnail gallery */}
              {property.photos.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {property.photos.slice(1, 5).map((photo, index) => (
                    <div 
                      key={index} 
                      className="relative aspect-video rounded-lg overflow-hidden bg-muted cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => openCarousel(index + 1)}
                    >
                      <img
                        src={photo.photo_url}
                        alt={photo.caption || `Photo ${index + 2}`}
                        className="w-full h-full object-cover"
                      />
                      {index === 3 && property.photos.length > 5 && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="text-white font-semibold">+{property.photos.length - 4}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : property.image_url ? (
            <div 
              className="aspect-[16/9] rounded-lg overflow-hidden bg-muted cursor-pointer hover:opacity-95 transition-opacity"
              onClick={() => openCarousel(0)}
            >
              <img
                src={property.image_url}
                alt={property.title}
                className="w-full h-full object-cover"
              />
            </div>
          ) : null}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-2 space-y-8">
            {/* Property Header */}
            <div>
              <div className="text-sm text-primary font-medium mb-2">{property.typology?.label || 'Propriété'} à vendre</div>
              <h1 className="text-4xl font-bold mb-4">{property.title}</h1>
              <div className="text-3xl font-bold text-primary mb-4">{formatPrice(property.prix_dinar)}</div>
              <div className="flex items-center text-muted-foreground">
                <MapPin className="w-4 h-4 mr-1" />
                {getLocationText()}
              </div>
            </div>

            {/* Property Quick Info with Icons */}
            {property.details && (
              <div className="grid grid-cols-4 gap-4 py-6 border-y">
                {property.details.bedrooms && (
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-2 bg-muted rounded-lg flex items-center justify-center">
                      🛏️
                    </div>
                    <div className="font-semibold">{property.details.bedrooms}</div>
                    <div className="text-sm text-muted-foreground">Chambres</div>
                  </div>
                )}
                {property.details.bathrooms && (
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-2 bg-muted rounded-lg flex items-center justify-center">
                      🚿
                    </div>
                    <div className="font-semibold">{property.details.bathrooms}</div>
                    <div className="text-sm text-muted-foreground">Salles de bain</div>
                  </div>
                )}
                {property.surface_m2 && (
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-2 bg-muted rounded-lg flex items-center justify-center">
                      📐
                    </div>
                    <div className="font-semibold">{property.surface_m2} m²</div>
                    <div className="text-sm text-muted-foreground">Surface</div>
                  </div>
                )}
                {property.details.floors && (
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-2 bg-muted rounded-lg flex items-center justify-center">
                      🏢
                    </div>
                    <div className="font-semibold">{property.details.floors}</div>
                    <div className="text-sm text-muted-foreground">Étages</div>
                  </div>
                )}
              </div>
            )}

            {/* Description */}
            {property.description && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Description</h3>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{property.description}</p>
              </div>
            )}

            {/* Amenities in 3-column layout */}
            {property.amenities && property.amenities.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Équipements et Commodités</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-medium mb-3">Intérieur</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {property.amenities.slice(0, Math.ceil(property.amenities.length/3)).map((item, index) => (
                        <li key={index}>• {item.amenity}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3">Sécurité</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {property.securityFeatures.map((item, index) => (
                        <li key={index}>• {item.security_feature}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3">Bâtiment</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {property.buildingFeatures.map((item, index) => (
                        <li key={index}>• {item.building_feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Nearby Features */}
            {property.nearby && property.nearby.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-4">À Proximité</h3>
                <div className="flex flex-wrap gap-3">
                  {property.nearby.map((item, index) => (
                    <span key={index} className="px-3 py-1 bg-muted rounded-full text-sm">
                      • {item.nearby_feature}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Documents */}
            {property.documents && property.documents.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Documents Associés</h3>
                <div className="flex flex-wrap gap-3">
                  {property.documents.map((item, index) => (
                    <span key={index} className="px-3 py-1 bg-muted rounded-full text-sm">
                      • {item.document_name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Right Side */}
          <div className="space-y-6">
            {/* Share Button */}
            <Button variant="outline" className="w-full">
              🔗 Partager
            </Button>

            {/* Property Owner Card */}
            <Card>
              <CardHeader>
                <CardTitle>Propriétaire du bien</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground">Numéro de téléphone</div>
                  <div className="font-medium">+213 5 41 22 55 52</div>
                </div>
                <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                  💬 WhatsApp
                </Button>
              </CardContent>
            </Card>

            {/* Location */}
            <Card>
              <CardHeader>
                <CardTitle>Localisation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <span className="text-muted-foreground">Carte</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      {/* Section de demande de devis */}
      <PropertyQuoteForm 
        propertyTitle={property.title}
        latitude={property.latitude}
        longitude={property.longitude}
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
  );
}

export default PropertyPage;