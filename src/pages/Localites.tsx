import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Search } from "lucide-react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import heroImage from "@/assets/hero-localites.jpg";
import babElOuedImage from "@/assets/bab-el-oued.jpg";
import elMadaniaImage from "@/assets/el-madania.jpg";
import hydraImage from "@/assets/hydra.jpg";
import elKhroubImage from "@/assets/el-khroub.jpg";
import belgaidImage from "@/assets/belgaid.jpg";
import birElDjirImage from "@/assets/bir-el-djir.jpg";

interface Locality {
  id: string;
  name: string;
  description: string;
  city_id: string;
}

interface City {
  id: string;
  name: string;
  localities: Locality[];
}

const Localites = () => {
  const [citiesWithLocalities, setCitiesWithLocalities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [propertyCounts, setPropertyCounts] = useState<Record<string, number>>({});

  // Map locality names to their corresponding images
  const localityImages: Record<string, string> = {
    "Bab El Oued": babElOuedImage,
    "El Madania": elMadaniaImage,
    "Hydra": hydraImage,
    "El Khroub": elKhroubImage,
    "Belgaïd": belgaidImage,
    "Bir El Djir": birElDjirImage,
  };

  useEffect(() => {
    const fetchCitiesAndLocalities = async () => {
      try {
        // Fetch cities
        const { data: cities, error: citiesError } = await supabase
          .from("cities")
          .select("*")
          .order("name");

        if (citiesError) throw citiesError;

        // Fetch localities
        const { data: localities, error: localitiesError } = await supabase
          .from("localities")
          .select("*")
          .order("name");

        if (localitiesError) throw localitiesError;

        // Group localities by city
        const citiesWithLocalitiesData: City[] = cities.map((city) => ({
          ...city,
          localities: localities.filter((locality) => locality.city_id === city.id),
        }));

        setCitiesWithLocalities(citiesWithLocalitiesData);

        // Fetch property counts for each locality
        const counts: Record<string, number> = {};
        for (const locality of localities) {
          const { count } = await supabase
            .from('properties')
            .select('*', { count: 'exact', head: true })
            .eq('locality_id', locality.id);
          counts[locality.id] = count || 0;
        }
        setPropertyCounts(counts);
      } catch (error) {
        if (import.meta.env.DEV) {
          console.error("Error fetching data:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCitiesAndLocalities();
  }, []);

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

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Trouvez votre futur appartement
            </h1>
            <p className="text-xl md:text-2xl text-white/90">
              Découvrez nos quartiers d'exception
            </p>
          </div>
        </div>
      </section>

      {/* Localities Section */}
      <main className="container mx-auto px-4 py-16">
        {/* Barre de recherche */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Rechercher une localité..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {citiesWithLocalities.map((city) => {
          // Filtrer les localités selon la recherche
          const filteredLocalities = city.localities.filter((locality) =>
            locality.name.toLowerCase().includes(searchQuery.toLowerCase())
          );

          if (filteredLocalities.length === 0) return null;

          return (
          <section key={city.id} className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-foreground text-center">
              {city.name}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredLocalities.map((locality) => (
                <Link key={locality.id} to={`/localite/${locality.id}`}>
                  <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={localityImages[locality.name] || babElOuedImage}
                        alt={locality.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="h-5 w-5 text-white" />
                          <h3 className="text-xl font-semibold text-white">
                            {locality.name}
                          </h3>
                        </div>
                        {locality.description && (
                          <p className="text-white/90 text-sm">
                            {locality.description}
                          </p>
                        )}
                        {propertyCounts[locality.id] !== undefined && (
                          <p className="text-white font-semibold text-sm mt-1">
                            {propertyCounts[locality.id]} {propertyCounts[locality.id] === 1 ? 'bien disponible' : 'biens disponibles'}
                          </p>
                        )}
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
          );
        })}
      </main>
    </div>
  );
};

export default Localites;