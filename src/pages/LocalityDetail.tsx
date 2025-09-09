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

interface Property {
  id: string;
  title: string;
  description: string;
  prix_dinar: number;
  surface_m2: number;
  status: string;
  image_url: string;
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

        // Fetch properties in this locality
        const { data: propertiesData } = await supabase
          .from('properties')
          .select('*')
          .eq('locality_id', localityId);

        if (propertiesData) {
          setProperties(propertiesData);
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
                              price: property.prix_dinar,
                              surface: property.surface_m2 || 0,
                              location: locality.name,
                              image: property.image_url || "",
                              type: property.status
                            }} />
                          </div>
                          <div className="flex gap-2">
                            <Badge variant="secondary">
                              {property.status}
                            </Badge>
                            {property.surface_m2 && (
                              <Badge variant="outline">
                                {property.surface_m2} m²
                              </Badge>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent className="p-0">
                          <p className="text-muted-foreground mb-4 line-clamp-3">
                            {property.description}
                          </p>
                          <div className="flex justify-between items-center">
                            <span className="text-2xl font-bold text-primary">
                              {formatPrice(property.prix_dinar)}
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