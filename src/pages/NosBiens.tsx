import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import PropertyMap from "@/components/PropertyMap";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Heart, BarChart3 } from "lucide-react";
import PropertyFilters, { FilterState } from "@/components/PropertyFilters";
import { useFavorites } from "@/components/FavoritesSystem";
import { useComparison } from "@/components/ComparisonSystem";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { AnimatedSection, AnimatedCard } from "@/components/AnimatedComponents";

const NosBiens = () => {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState<FilterState>({
    typeOffre: "",
    type: "",
    etat: "",
    localite: "",
    minPrice: "",
    maxPrice: ""
  });
  const [visibleResidences, setVisibleResidences] = useState(9);
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { addToComparison, isInComparison } = useComparison();

  // Appliquer les filtres depuis l'URL au chargement
  useEffect(() => {
    const urlFilters: FilterState = {
      typeOffre: searchParams.get("typeOffre") || "",
      type: searchParams.get("type") || "",
      etat: searchParams.get("etat") || "",
      localite: searchParams.get("localite") || "",
      minPrice: searchParams.get("minPrice") || "",
      maxPrice: searchParams.get("maxPrice") || ""
    };
    setFilters(urlFilters);
  }, [searchParams]);

  const residences = [
    {
      id: 1,
      title: "Résidence Al Manar",
      location: "Said Hamdine, Alger",
      description: "Un complexe résidentiel moderne offrant tout le confort nécessaire pour une vie paisible et luxueuse.",
      image: "/placeholder.svg",
      typology: "F3",
      status: "À vendre",
      etat: "Neuf",
      city: "Alger",
      price: 450000
    },
    {
      id: 2,
      title: "Complexe Andalous Garden",
      location: "Hydra, Alger",
      description: "Des appartements haut de gamme dans un cadre verdoyant avec toutes les commodités modernes.",
      image: "/placeholder.svg",
      typology: "F4",
      status: "À louer",
      etat: "Rénové",
      city: "Alger",
      price: 2800
    },
    {
      id: 3,
      title: "Villa Park Premium",
      location: "Dely Ibrahim, Alger",
      description: "Résidence de standing avec vue panoramique et finitions de qualité supérieure.",
      image: "/placeholder.svg",
      typology: "F5",
      status: "Vendu",
      etat: "Bon état",
      city: "Alger",
      price: 850000
    },
    {
      id: 4,
      title: "Tour Horizon City",
      location: "El Biar, Alger",
      description: "Une tour moderne au cœur de la ville avec tous les services à proximité.",
      image: "/placeholder.svg",
      typology: "F2",
      status: "À vendre",
      etat: "À rénover",
      city: "Alger",
      price: 320000
    },
    {
      id: 5,
      title: "Résidence Marina Bay",
      location: "Ain Benian, Alger",
      description: "Résidence en bord de mer offrant une vue exceptionnelle sur la baie d'Alger.",
      image: "/placeholder.svg",
      typology: "Duplex",
      status: "Loué",
      etat: "Neuf",
      city: "Alger",
      price: 4200
    },
    {
      id: 6,
      title: "Les Jardins de Bab El Oued",
      location: "Bab El Oued, Alger",
      description: "Complexe résidentiel avec jardins paysagers et espaces communs de qualité.",
      image: "/placeholder.svg",
      typology: "F3",
      status: "À vendre",
      etat: "Neuf",
      city: "Alger",
      price: 380000
    },
    {
      id: 7,
      title: "Résidence El Madania",
      location: "El Madania, Alger",
      description: "Appartements de standing dans un quartier résidentiel prisé d'Alger.",
      image: "/placeholder.svg",
      typology: "F4",
      status: "À louer",
      etat: "Rénové",
      city: "Alger",
      price: 3500
    },
    {
      id: 8,
      title: "Villa El Khroub",
      location: "El Khroub, Constantine",
      description: "Villa spacieuse avec jardin privé dans un environnement calme et familial.",
      image: "/placeholder.svg",
      typology: "Villa",
      status: "À vendre",
      etat: "Bon état",
      city: "Constantine",
      price: 650000
    },
    {
      id: 9,
      title: "Appartement Bir El Djir",
      location: "Bir El Djir, Oran",
      description: "Appartement moderne avec vue sur la mer dans un quartier en développement.",
      image: "/placeholder.svg",
      typology: "F2",
      status: "À vendre",
      etat: "Neuf",
      city: "Oran",
      price: 280000
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "À vendre":
        return "bg-green-100 text-green-800";
      case "À louer":
        return "bg-blue-100 text-blue-800";
      case "Vendu":
        return "bg-gray-100 text-gray-800";
      case "Loué":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredResidences = residences.filter(residence => {
    if (filters.typeOffre && residence.status !== filters.typeOffre) return false;
    if (filters.type && residence.typology !== filters.type) return false;
    if (filters.etat && residence.etat !== filters.etat) return false;
    if (filters.localite && residence.city !== filters.localite) return false;
    if (filters.minPrice && residence.price < parseInt(filters.minPrice)) return false;
    if (filters.maxPrice && residence.price > parseInt(filters.maxPrice)) return false;
    return true;
  });

  const displayedResidences = filteredResidences.slice(0, visibleResidences);

  const loadMore = () => {
    setVisibleResidences(prev => prev + 6);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <AnimatedSection className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Nos Biens Immobiliers
          </motion.h1>
          <motion.p
            className="text-xl text-primary-foreground/90 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Découvrez notre sélection de propriétés exceptionnelles à Alger et dans toute l'Algérie
          </motion.p>
        </div>
      </AnimatedSection>

      {/* Filtres */}
      <AnimatedSection className="py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <PropertyFilters filters={filters} setFilters={setFilters} />
        </div>
      </AnimatedSection>

      {/* Carte Google Maps */}
      <AnimatedSection className="py-8">
        <div className="container mx-auto px-4">
          <PropertyMap />
        </div>
      </AnimatedSection>

      {/* Liste des biens */}
      <AnimatedSection className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            initial="hidden"
            animate="show"
          >
            {displayedResidences.map((residence, index) => (
              <motion.div
                key={residence.id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.5 }}
              >
                <AnimatedCard className="group overflow-hidden hover:shadow-xl transition-all duration-300 bg-card border border-border">
                  <div className="relative overflow-hidden">
                    <img
                      src={residence.image}
                      alt={residence.title}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(residence.status)}`}>
                        {residence.status}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4 flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => isFavorite(residence.id)
                          ? removeFromFavorites(residence.id)
                          : addToFavorites(residence)
                        }
                        className="w-8 h-8 p-0 rounded-full bg-white/80 hover:bg-white"
                      >
                        <Heart className={`w-4 h-4 ${isFavorite(residence.id) ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => addToComparison(residence)}
                        disabled={isInComparison(residence.id)}
                        className="w-8 h-8 p-0 rounded-full bg-white/80 hover:bg-white"
                      >
                        <BarChart3 className={`w-4 h-4 ${isInComparison(residence.id) ? "text-primary" : "text-gray-600"}`} />
                      </Button>
                    </div>
                    {residence.price > 0 && (
                      <div className="absolute bottom-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                        {formatCurrency(residence.price)}
                      </div>
                    )}
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-foreground">
                      {residence.title}
                    </h3>
                    <div className="flex items-center text-muted-foreground mb-3">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{residence.location}</span>
                    </div>
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {residence.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        <span className="text-sm px-3 py-1 bg-muted rounded-full text-muted-foreground">
                          {residence.typology}
                        </span>
                        <span className="text-sm px-3 py-1 bg-muted rounded-full text-muted-foreground">
                          {residence.etat}
                        </span>
                      </div>
                      <Button variant="outline" size="sm">
                        Voir détails
                      </Button>
                    </div>
                  </CardContent>
                </AnimatedCard>
              </motion.div>
            ))}
          </motion.div>

          {/* Bouton "Voir plus" */}
          {visibleResidences < filteredResidences.length && (
            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Button onClick={loadMore} size="lg" className="bg-primary hover:bg-primary/90">
                Voir plus de biens
              </Button>
            </motion.div>
          )}
        </div>
      </AnimatedSection>

      {/* Footer */}
      <Footer />

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
};

export default NosBiens;