import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";
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
    description: "Un complexe résidentiel moderne offrant tout le confort nécessaire pour une vie paisible et luxueuse.",
    image: "/placeholder.svg",
    typology: "F3",
    status: "À vendre",
    etat: "Neuf",
    city: "Alger"
  }, {
    id: 2,
    title: "Complexe Andalous Garden",
    location: "Hydra, Alger",
    description: "Des appartements haut de gamme dans un cadre verdoyant avec toutes les commodités modernes.",
    image: "/placeholder.svg",
    typology: "F4",
    status: "À louer",
    etat: "Rénové",
    city: "Alger"
  }, {
    id: 3,
    title: "Villa Park Premium",
    location: "Dely Ibrahim, Alger",
    description: "Résidence de standing avec vue panoramique et finitions de qualité supérieure.",
    image: "/placeholder.svg",
    typology: "F5",
    status: "Vendu",
    etat: "Bon état",
    city: "Alger"
  }, {
    id: 4,
    title: "Tour Horizon City",
    location: "El Biar, Alger",
    description: "Une tour moderne au cœur de la ville avec tous les services à proximité.",
    image: "/placeholder.svg",
    typology: "F2",
    status: "À vendre",
    etat: "À rénover",
    city: "Alger"
  }, {
    id: 5,
    title: "Résidence Marina Bay",
    location: "Ain Benian, Alger",
    description: "Résidence en bord de mer offrant une vue exceptionnelle sur la baie d'Alger.",
    image: "/placeholder.svg",
    typology: "Duplex",
    status: "Loué",
    etat: "Neuf",
    city: "Alger"
  }, {
    id: 6,
    title: "Green Valley Estate",
    location: "Cheraga, Alger",
    description: "Un projet écologique dans un environnement naturel préservé.",
    image: "/placeholder.svg",
    typology: "Studio",
    status: "À vendre",
    etat: "À démolir",
    city: "Alger"
  }, {
    id: 7,
    title: "Résidence Prestige",
    location: "Kouba, Alger",
    description: "Appartements de luxe avec finitions haut de gamme et services personnalisés.",
    image: "/placeholder.svg",
    typology: "F3",
    status: "Vendu",
    etat: "Bon état",
    city: "Alger"
  }, {
    id: 8,
    title: "Villa Royal Gardens",
    location: "Ben Aknoun, Alger",
    description: "Villas individuelles dans un cadre résidentiel calme et sécurisé.",
    image: "/placeholder.svg",
    typology: "F4",
    status: "Vendu",
    etat: "Rénové",
    city: "Alger"
  }, {
    id: 9,
    title: "Complexe Atlas Heights",
    location: "Bouzareah, Alger",
    description: "Résidence moderne avec vue sur la mer et espaces verts aménagés.",
    image: "/placeholder.svg",
    typology: "F5",
    status: "À louer",
    etat: "Neuf",
    city: "Alger"
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
              <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                {residence.typology}
              </div>
              <div className="absolute top-4 right-4">
                <FavoritesSystem
                  property={{
                    id: residence.id.toString(),
                    title: residence.title,
                    price: 0, // À remplacer par le vrai prix
                    surface: 0, // À remplacer par la vraie surface
                    location: residence.location,
                    image: residence.image,
                    type: residence.typology
                  }}
                />
              </div>
            </div>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2 text-foreground">{residence.title}</h3>
              <div className="flex items-center text-muted-foreground mb-3">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">{residence.location}</span>
              </div>
              <p className="text-muted-foreground mb-4 line-clamp-3">
                {residence.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm px-3 py-1 bg-muted rounded-full">
                  {residence.status}
                </span>
                <Button variant="outline" size="sm">
                  En savoir plus
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