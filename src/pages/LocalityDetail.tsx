import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import FavoritesSystem from "@/components/FavoritesSystem";
import { formatPrice } from "@/lib/utils";

interface Locality {
  id: string;
  name: string;
  description: string;
  image_url?: string;
}

interface PropertyDetails {
  bedrooms: number;
  bathrooms: number;
  rooms: number;
}

interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  surface: number;
  status: string;
  image_url: string;
  typology: string;
  property_details?: PropertyDetails;
}

const LocalityDetail = () => {
  const { localityId } = useParams<{ localityId: string }>();
  const [locality, setLocality] = useState<Locality | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocalityAndProperties = async () => {
      if (!localityId) return;

      try {
        // Fetch locality details
        const { data: localityData } = await supabase
          .from('localities')
          .select('*')
          .eq('id', localityId)
          .single();

        if (localityData) {
          setLocality(localityData);
        }

        // Fetch properties in this locality with details
        const { data: propertiesData } = await supabase
          .from('properties')
          .select(`
            *,
            property_details (
              bedrooms,
              bathrooms,
              rooms
            )
          `)
          .eq('locality_id', localityId);

        if (propertiesData) {
          setProperties(propertiesData as any);
        }
      } catch (error) {
        console.error('Error fetching locality data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocalityAndProperties();
  }, [localityId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Chargement...</div>
        </div>
      </div>
    );
  }

  if (!locality) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Localité non trouvée</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Découvrez la commune de {locality.name}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {locality.description}
          </p>
        </div>

        {/* Properties Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-foreground mb-6">
            Nos biens à {locality.name}
          </h2>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Properties List */}
          <div className="lg:col-span-2">
            {properties.length > 0 ? (
              <div className="grid gap-6">
                {properties.map((property) => (
                  <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3">
                        <img
                          src={property.image_url || "/placeholder.svg"}
                          alt={property.title}
                          className="w-full h-48 md:h-full object-cover"
                        />
                      </div>
                      <div className="md:w-2/3 p-6">
                        <CardHeader className="p-0 mb-4">
                          <div className="flex justify-between items-start mb-2">
                            <CardTitle className="text-xl font-semibold">
                              {property.title}
                            </CardTitle>
                            <FavoritesSystem property={{
                              id: property.id,
                              title: property.title,
                              price: property.price,
                              surface: property.surface || 0,
                              location: locality.name,
                              image: property.image_url || "",
                              type: property.status
                            }} />
                          </div>
                          <div className="flex flex-wrap gap-2 mb-3">
                            <Badge variant="secondary">
                              {property.status}
                            </Badge>
                            {property.typology && (
                              <Badge variant="outline">
                                {property.typology}
                              </Badge>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent className="p-0">
                          <p className="text-muted-foreground mb-4 line-clamp-2">
                            {property.description}
                          </p>
                          
                          {/* Property Details */}
                          <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
                            {property.surface && (
                              <div className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                </svg>
                                <span>{property.surface} m²</span>
                              </div>
                            )}
                            {property.property_details && (
                              <>
                                {property.property_details.bedrooms > 0 && (
                                  <div className="flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                                    <span>{property.property_details.bedrooms} chambres</span>
                                  </div>
                                )}
                                {property.property_details.bathrooms > 0 && (
                                  <div className="flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                                    </svg>
                                    <span>{property.property_details.bathrooms} salles de bain</span>
                                  </div>
                                )}
                                {property.property_details.rooms > 0 && (
                                  <div className="flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                    <span>{property.property_details.rooms} pièces</span>
                                  </div>
                                )}
                              </>
                            )}
                            <div className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              <span>{locality.name}</span>
                            </div>
                          </div>

                          <div className="flex justify-between items-center">
                            <span className="text-2xl font-bold text-primary">
                              {formatPrice(property.price)}
                            </span>
                          </div>
                        </CardContent>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground">
                    Aucun bien disponible dans cette localité pour le moment.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Map Placeholder */}
          <div className="lg:col-span-1">
            <Card className="h-96 lg:sticky lg:top-8">
              <CardHeader>
                <CardTitle>Localisation</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center h-full">
                <div className="text-center text-muted-foreground">
                  <div className="w-16 h-16 bg-muted rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <p>Carte interactive</p>
                  <p className="text-sm">(à configurer)</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LocalityDetail;