import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Bed, Bath, Square } from "lucide-react";
import PropertyFilters, { FilterState } from "@/components/PropertyFilters";
import FavoritesSystem from "./FavoritesSystem";
const BiensSection = () => {
  const [filters, setFilters] = useState<FilterState>({
    typeOffre: "",
    type: "",
    etat: "",
    localite: "",
    minPrice: "",
    maxPrice: "",
    minSurface: "",
    maxSurface: "",
    chambres: "",
    sallesBain: "",
    etages: "",
    commodites: [],
    securite: [],
    documents: [],
    proximite: [],
    vue: ""
  });
  const [visibleResidences, setVisibleResidences] = useState(9);
  const residences = [{
    id: 1,
    title: "Résidence Al Manar",
    location: "Said Hamdine, Alger",
    locality: "Said Hamdine",
    description: "Un complexe résidentiel moderne offrant tout le confort nécessaire pour une vie paisible et luxueuse.",
    image: "/placeholder.svg",
    typology: "F3",
    status: "À vendre",
    etat: "Neuf",
    city: "Alger",
    bedrooms: 3,
    bathrooms: 2,
    surface: 95,
    price: 15000000
  }, {
    id: 2,
    title: "Complexe Andalous Garden",
    location: "Hydra, Alger",
    locality: "Hydra",
    description: "Des appartements haut de gamme dans un cadre verdoyant avec toutes les commodités modernes.",
    image: "/placeholder.svg",
    typology: "F4",
    status: "À louer",
    etat: "Rénové",
    city: "Alger",
    bedrooms: 4,
    bathrooms: 3,
    surface: 120,
    price: 25000000
  }, {
    id: 3,
    title: "Villa Park Premium",
    location: "Dely Ibrahim, Alger",
    locality: "Dely Ibrahim",
    description: "Résidence de standing avec vue panoramique et finitions de qualité supérieure.",
    image: "/placeholder.svg",
    typology: "F5",
    status: "Vendu",
    etat: "Bon état",
    city: "Alger",
    bedrooms: 5,
    bathrooms: 4,
    surface: 180,
    price: 35000000
  }, {
    id: 4,
    title: "Tour Horizon City",
    location: "El Biar, Alger",
    locality: "El Biar",
    description: "Une tour moderne au cœur de la ville avec tous les services à proximité.",
    image: "/placeholder.svg",
    typology: "F2",
    status: "À vendre",
    etat: "À rénover",
    city: "Alger",
    bedrooms: 2,
    bathrooms: 1,
    surface: 65,
    price: 12000000
  }, {
    id: 5,
    title: "Résidence Marina Bay",
    location: "Ain Benian, Alger",
    locality: "Ain Benian",
    description: "Résidence en bord de mer offrant une vue exceptionnelle sur la baie d'Alger.",
    image: "/placeholder.svg",
    typology: "Duplex",
    status: "Loué",
    etat: "Neuf",
    city: "Alger",
    bedrooms: 4,
    bathrooms: 3,
    surface: 150,
    price: 28000000
  }, {
    id: 6,
    title: "Green Valley Estate",
    location: "Cheraga, Alger",
    locality: "Cheraga",
    description: "Un projet écologique dans un environnement naturel préservé.",
    image: "/placeholder.svg",
    typology: "Studio",
    status: "À vendre",
    etat: "À démolir",
    city: "Alger",
    bedrooms: 1,
    bathrooms: 1,
    surface: 45,
    price: 8000000
  }, {
    id: 7,
    title: "Résidence Prestige",
    location: "Kouba, Alger",
    locality: "Kouba",
    description: "Appartements de luxe avec finitions haut de gamme et services personnalisés.",
    image: "/placeholder.svg",
    typology: "F3",
    status: "Vendu",
    etat: "Bon état",
    city: "Alger",
    bedrooms: 3,
    bathrooms: 2,
    surface: 100,
    price: 18000000
  }, {
    id: 8,
    title: "Villa Royal Gardens",
    location: "Ben Aknoun, Alger",
    locality: "Ben Aknoun",
    description: "Villas individuelles dans un cadre résidentiel calme et sécurisé.",
    image: "/placeholder.svg",
    typology: "F4",
    status: "Vendu",
    etat: "Rénové",
    city: "Alger",
    bedrooms: 4,
    bathrooms: 3,
    surface: 140,
    price: 30000000
  }, {
    id: 9,
    title: "Complexe Atlas Heights",
    location: "Bouzareah, Alger",
    locality: "Bouzareah",
    description: "Résidence moderne avec vue sur la mer et espaces verts aménagés.",
    image: "/placeholder.svg",
    typology: "F5",
    status: "À louer",
    etat: "Neuf",
    city: "Alger",
    bedrooms: 5,
    bathrooms: 4,
    surface: 160,
    price: 32000000
  }];
  const filteredResidences = residences.filter(residence => {
    const matchesTypeOffre = !filters.typeOffre || residence.status.toLowerCase() === filters.typeOffre.toLowerCase();
    const matchesType = !filters.type || residence.typology.toLowerCase().includes(filters.type.toLowerCase());
    const matchesEtat = !filters.etat || residence.etat.toLowerCase() === filters.etat.toLowerCase();
    const matchesLocalite = !filters.localite || residence.location.toLowerCase().includes(filters.localite.toLowerCase());

    return matchesTypeOffre && matchesType && matchesEtat && matchesLocalite;
  });
  const displayedResidences = filteredResidences.slice(0, visibleResidences);
  const loadMore = () => {
    const increment = window.innerWidth >= 768 ? 9 : 3;
    setVisibleResidences(prev => prev + increment);
  };
  return <>
    {/* Hero Section */}


    {/* Filters Section */}
    <section className="py-8">
      <div className="container mx-auto px-4">
        <PropertyFilters onSearch={setFilters} />
      </div>
    </section>

    {/* Residences Section */}
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedResidences.map(residence => <Card key={residence.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300">
            <div className="relative overflow-hidden">
              <img src={residence.image} alt={residence.title} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute top-4 left-4 bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                {residence.status}
              </div>
              <div className="absolute bottom-4 left-4 bg-black/80 text-white px-3 py-2 rounded-lg">
                <span className="text-lg font-bold">{residence.price.toLocaleString()} DA</span>
              </div>
              <div className="absolute top-4 right-4">
                <FavoritesSystem
                  property={{
                    id: residence.id.toString(),
                    title: residence.title,
                    price: residence.price,
                    surface: residence.surface,
                    location: residence.location,
                    image: residence.image,
                    type: residence.typology
                  }}
                />
              </div>
            </div>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-3 text-foreground">{residence.title}</h3>
              
              {/* Property Details Row */}
              <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Bed className="h-4 w-4" />
                  <span>{residence.bedrooms}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Bath className="h-4 w-4" />
                  <span>{residence.bathrooms}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Square className="h-4 w-4" />
                  <span>{residence.surface} m²</span>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center text-muted-foreground mb-4">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">{residence.locality}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm px-3 py-1 bg-muted rounded-full">
                  {residence.typology}
                </span>
                <Button variant="outline" size="sm">
                  Voir détails
                </Button>
              </div>
            </CardContent>
          </Card>)}
        </div>

        {visibleResidences < filteredResidences.length && <div className="text-center mt-12">
          <Button onClick={loadMore} size="lg" className="px-8">
            Voir plus
          </Button>
        </div>}
      </div>
    </section>
  </>;
};
export default BiensSection;