import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin } from "lucide-react";
import babElOuedImage from "@/assets/bab-el-oued.jpg";
import elMadaniaImage from "@/assets/el-madania.jpg";
import hydraImage from "@/assets/hydra.jpg";
import elKhroubImage from "@/assets/el-khroub.jpg";
import belgaidImage from "@/assets/belgaid.jpg";
import birElDjirImage from "@/assets/bir-el-djir.jpg";

interface Commune {
  id: number;
  name: string;
  wilaya_id: number;
  wilaya?: {
    name: string;
  };
}

interface Property {
  id: string;
  title: string;
  price: number;
  image_url: string;
  typology: string;
  surface: number;
  commune: {
    name: string;
    wilaya?: {
      name: string;
    };
  };
}

// Map commune names to their corresponding images
const communeImages: Record<string, string> = {
  "Bab El Oued": babElOuedImage,
  "El Madania": elMadaniaImage,
  "Hydra": hydraImage,
  "El Khroub": elKhroubImage,
  "Belgaïd": belgaidImage,
  "Bir El Djir": birElDjirImage,
};

const LocalityDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [commune, setCommune] = useState<Commune | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCommuneAndProperties = async () => {
      if (!id) return;

      try {
        // Fetch commune details
        const { data: communeData, error: communeError } = await supabase
          .from("communes")
          .select("*, wilaya:wilayas(name)")
          .eq("id", id)
          .single();

        if (communeError) throw communeError;
        setCommune(communeData);

        // Fetch properties in this commune
        const { data: propertiesData, error: propertiesError } = await supabase
          .from("properties")
          .select(`
            id,
            title,
            price,
            image_url,
            typology,
            surface,
            commune:communes(
              name,
              wilaya:wilayas(name)
            )
          `)
          .eq("commune_id", id)
          .neq('status', 'Vendu'); // Exclude sold properties

        if (propertiesError) throw propertiesError;
        
        // Transform data to handle array/object responses
        const transformedData = (propertiesData || []).map(property => {
          let communeData = null;
          if (property.commune) {
            if (Array.isArray(property.commune) && property.commune.length > 0) {
              communeData = property.commune[0];
            } else if (typeof property.commune === 'object' && !Array.isArray(property.commune)) {
              communeData = property.commune;
            }
          }
          return { ...property, commune: communeData } as Property;
        });
        setProperties(transformedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCommuneAndProperties();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center h-screen">
          <div className="text-lg text-muted-foreground">Chargement...</div>
        </div>
      </div>
    );
  }

  if (!commune) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Commune non trouvée</h2>
            <Link to="/localites">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour aux localités
              </Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <div className="relative h-[40vh] overflow-hidden">
        <img
          src={communeImages[commune.name] || babElOuedImage}
          alt={commune.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">{commune.name}</h1>
            {commune.wilaya && (
              <p className="text-xl md:text-2xl text-white/90">Wilaya de {commune.wilaya.name}</p>
            )}
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link to="/localites">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour aux localités
            </Button>
          </Link>
        </div>

        <h2 className="text-2xl font-bold mb-6">
          Propriétés à {commune.name} ({properties.length})
        </h2>

        {properties.length === 0 ? (
          <div className="text-center py-12 bg-muted/30 rounded-lg">
            <p className="text-muted-foreground text-lg">
              Aucune propriété disponible dans cette commune pour le moment.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <Link key={property.id} to={`/property/${property.id}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 h-full">
                  <div className="relative h-48">
                    <img
                      src={property.image_url || "/placeholder.svg"}
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 left-2 bg-black/60 text-white px-2 py-1 rounded text-sm">
                      {property.typology}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-xl font-semibold mb-2 line-clamp-1">
                      {property.title}
                    </h3>
                    <div className="flex items-center text-muted-foreground mb-2 text-sm">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{property.commune.name}, {property.commune.wilaya?.name}</span>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <span className="font-bold text-primary text-lg">
                        {property.price ? `${property.price.toLocaleString()} DA` : "Prix sur demande"}
                      </span>
                      {property.surface && (
                        <span className="text-sm text-muted-foreground">
                          {property.surface} m²
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default LocalityDetail;