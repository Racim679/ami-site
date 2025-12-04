import { useState } from "react";
import { Button } from "@/components/ui/button";
import { EnhancedCard, EnhancedCardContent } from "@/components/ui/enhanced-card";
import { Section, SectionHeader, SectionTitle, SectionSubtitle } from "@/components/ui/section";
import { MapPin, Bed, Bath, Square, Eye, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import PropertyFilters, { FilterState } from "@/components/PropertyFilters";
import FavoritesSystem from "./FavoritesSystem";
import { usePropertyTypeStorage } from "@/hooks/usePropertyTypeStorage";
const BiensSection = () => {
  const { storePropertyType } = usePropertyTypeStorage();
  const [filters, setFilters] = useState<FilterState>({
    typeOffre: "",
    type: "",
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
    const matchesLocalite = !filters.localite || residence.location.toLowerCase().includes(filters.localite.toLowerCase());

    return matchesTypeOffre && matchesType && matchesLocalite;
  });
  const displayedResidences = filteredResidences.slice(0, visibleResidences);
  const loadMore = () => {
    const increment = window.innerWidth >= 768 ? 9 : 3;
    setVisibleResidences(prev => prev + increment);
  };

  const handlePropertyClick = (residence: any) => {
    if (residence.typology) {
      storePropertyType(residence.typology);
    }
  };
  return <>
    {/* Hero Section with Enhanced Header */}
    <Section variant="gradient" className="py-12 md:py-16">
      <SectionHeader>
        <SectionTitle className="animate-fade-in-up">
          Nos Biens d'Exception
        </SectionTitle>
        <SectionSubtitle className="animate-fade-in-up delay-200">
          Découvrez notre sélection de propriétés de luxe dans les quartiers les plus prisés d'Algérie
        </SectionSubtitle>
      </SectionHeader>
    </Section>

    {/* Filters Section */}
    <Section variant="muted" className="py-12">
      <div className="animate-fade-in">
        <PropertyFilters onSearch={setFilters} />
      </div>
    </Section>

    {/* Residences Section */}
    <Section className="py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedResidences.map((residence, index) => (
          <EnhancedCard 
            key={residence.id} 
            variant="luxury" 
            className="group overflow-hidden hover:shadow-luxury transition-all duration-500 animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="relative overflow-hidden">
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={residence.image} 
                  alt={residence.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Status Badge */}
              <div className="absolute top-4 left-4">
                <div className="bg-gradient-to-r from-primary to-primary-light text-primary-foreground px-4 py-2 rounded-full text-sm font-bold shadow-lg backdrop-blur-sm">
                  {residence.status}
                </div>
              </div>

              {/* Price Badge */}
              <div className="absolute bottom-4 left-4">
                <div className="bg-black/80 backdrop-blur-md text-white px-4 py-2 rounded-xl border border-white/20">
                  <span className="text-xl font-bold font-heading">
                    {residence.price.toLocaleString()} DA
                  </span>
                </div>
              </div>

              {/* Favorites Heart */}
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

              {/* Hover Actions */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/20">
                <Link 
                  to={`/bien/${residence.id}`}
                  onClick={() => handlePropertyClick(residence)}
                >
                  <Button variant="glass" size="lg" className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <Eye className="mr-2 h-4 w-4" />
                    Voir les détails
                  </Button>
                </Link>
              </div>
            </div>

            <EnhancedCardContent className="p-6 bg-gradient-to-br from-card to-muted/20">
              <div className="mb-4">
                <h3 className="text-2xl font-bold font-heading mb-2 text-foreground group-hover:text-primary transition-colors duration-300">
                  {residence.title}
                </h3>
                
                {/* Location */}
                <div className="flex items-center text-muted-foreground mb-3">
                  <MapPin className="h-4 w-4 mr-2 text-primary" />
                  <span className="text-sm font-body">{residence.locality}</span>
                </div>
              </div>
              
              {/* Property Details Grid */}
              <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-muted/30 rounded-lg">
                <div className="flex flex-col items-center text-center">
                  <Bed className="h-5 w-5 text-primary mb-1" />
                  <span className="text-sm font-semibold">{residence.bedrooms}</span>
                  <span className="text-xs text-muted-foreground">Chambres</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Bath className="h-5 w-5 text-primary mb-1" />
                  <span className="text-sm font-semibold">{residence.bathrooms}</span>
                  <span className="text-xs text-muted-foreground">SdB</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Square className="h-5 w-5 text-primary mb-1" />
                  <span className="text-sm font-semibold">{residence.surface}</span>
                  <span className="text-xs text-muted-foreground">m²</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="bg-gradient-to-r from-accent/20 to-primary/20 px-4 py-2 rounded-full border border-primary/20">
                  <span className="text-sm font-bold text-primary">
                    {residence.typology}
                  </span>
                </div>
                <Link 
                  to={`/bien/${residence.id}`}
                  onClick={() => handlePropertyClick(residence)}
                >
                  <Button variant="outline" size="sm" className="font-semibold">
                    Détails
                  </Button>
                </Link>
              </div>
            </EnhancedCardContent>
          </EnhancedCard>
        ))}
      </div>

      {visibleResidences < filteredResidences.length && (
        <div className="text-center mt-16 animate-fade-in">
          <Button 
            onClick={loadMore} 
            variant="luxury" 
            size="lg" 
            className="px-12 py-4 text-lg font-bold"
          >
            Découvrir Plus de Biens
          </Button>
        </div>
      )}
    </Section>
  </>;
};
export default BiensSection;