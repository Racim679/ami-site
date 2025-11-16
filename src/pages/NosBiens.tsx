import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Heart, BarChart3, Bed, Bath, Square } from "lucide-react";
import PropertyFilters, { FilterState } from "@/components/PropertyFilters";
import { MobileFilters } from "@/components/MobileFilters";
import { useFavorites } from "@/components/FavoritesSystem";
import { useComparison } from "@/components/ComparisonSystem";
import ScrollToTop from "@/components/ScrollToTop";
import { AnimatedSection, AnimatedCard } from "@/components/AnimatedComponents";
import { supabase } from "@/integrations/supabase/client";
import { formatPrice } from "@/lib/utils";
interface Property {
  id: string;
  title: string;
  status: string;
  latitude?: number;
  longitude?: number;
  surface?: number;
  price?: number;
  image_url?: string;
  localities?: {
    name: string;
  } | null;
  typology?: string;
  property_details?: {
    bedrooms?: number;
    bathrooms?: number;
    rooms?: number;
    floors?: number;
    living_area?: number;
    condition?: string;
    has_city_view?: boolean;
    vue_mer?: boolean;
    vue_montagne?: boolean;
    vue_ville?: boolean;
    vue_jardin?: boolean;
    vue_cour?: boolean;
    vue_degagee?: boolean;
  }[] | null;
  property_amenities_structured?: {
    piscine?: boolean;
    garage?: boolean;
    jardin?: boolean;
    terrasse?: boolean;
    balcon?: boolean;
    cave?: boolean;
    grenier?: boolean;
    buanderie?: boolean;
  }[] | null;
  property_security_structured?: {
    gardien?: boolean;
    ascenseur?: boolean;
    acces_handicape?: boolean;
    video_surveillance?: boolean;
    digicode?: boolean;
    interphone?: boolean;
    alarme?: boolean;
    portail_electrique?: boolean;
  }[] | null;
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
  }[] | null;
}
const NosBiens = () => {
  const [searchParams] = useSearchParams();
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
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const {
    addToFavorites,
    removeFromFavorites,
    isFavorite
  } = useFavorites();
  const {
    addToComparison,
    isInComparison
  } = useComparison();

  // Récupérer les propriétés depuis Supabase
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const {
          data,
          error
        } = await supabase.from('properties').select(`
            id,
            title,
            status,
            latitude,
            longitude,
            surface,
            price,
            image_url,
            typology,
            localities!inner(name),
            property_details (
              bedrooms,
              bathrooms,
              rooms,
              floors,
              living_area,
              condition,
              has_city_view,
              vue_mer,
              vue_montagne,
              vue_ville,
              vue_jardin,
              vue_cour,
              vue_degagee
            ),
            property_amenities_structured (
              piscine,
              garage,
              jardin,
              terrasse,
              balcon,
              cave,
              grenier,
              buanderie
            ),
            property_security_structured (
              gardien,
              ascenseur,
              acces_handicape,
              video_surveillance,
              digicode,
              interphone,
              alarme,
              portail_electrique
            ),
            property_nearby_structured (
              ecoles,
              pharmacies,
              mosquees,
              transports_publics,
              banques,
              universites,
              commerces,
              restaurants,
              aeroports,
              hopitaux,
              parcs,
              plages
            )
          `).order('created_at', {
          ascending: false
        });
        if (error) {
          console.error('Erreur lors de la récupération des propriétés:', error);
        } else {
          // Transform data to match our interface
          const transformedData = data?.map(property => ({
            ...property,
            localities: Array.isArray(property.localities) && property.localities.length > 0 ? property.localities[0] : null
          })) || [];
          setProperties(transformedData);
        }
      } catch (error) {
        console.error('Erreur:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  // Appliquer les filtres depuis l'URL au chargement
  useEffect(() => {
    const urlFilters: FilterState = {
      typeOffre: searchParams.get("typeOffre") || "",
      type: searchParams.get("type") || "",
      etat: searchParams.get("etat") || "",
      localite: searchParams.get("localite") || "",
      minPrice: searchParams.get("minPrice") || "",
      maxPrice: searchParams.get("maxPrice") || "",
      minSurface: searchParams.get("minSurface") || "",
      maxSurface: searchParams.get("maxSurface") || "",
      chambres: searchParams.get("chambres") || "",
      sallesBain: searchParams.get("sallesBain") || "",
      etages: searchParams.get("etages") || "",
      commodites: searchParams.get("commodites")?.split(",") || [],
      securite: searchParams.get("securite")?.split(",") || [],
      documents: searchParams.get("documents")?.split(",") || [],
      proximite: searchParams.get("proximite")?.split(",") || [],
      vue: searchParams.get("vue") || ""
    };
    setFilters(urlFilters);
  }, [searchParams]);
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'À Vendre':
        return 'À Vendre';
      case 'Vendu':
        return 'Vendu';
      case 'À louer':
        return 'À louer';
      default:
        return status;
    }
  };
  const getStatusColor = (status: string) => {
    switch (status) {
      case "À Vendre":
        return "bg-green-100 text-green-800";
      case "Vendu":
        return "bg-red-100 text-red-800";
      case "À louer":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  const filteredProperties = properties.filter(property => {
    // Filtres principaux avec comparaisons insensibles à la casse
    if (filters.typeOffre && property.status?.toLowerCase() !== filters.typeOffre.toLowerCase()) return false;
    if (filters.type && property.typology?.toLowerCase() !== filters.type.toLowerCase()) return false;
    if (filters.localite && property.localities?.name?.toLowerCase() !== filters.localite.toLowerCase()) return false;

    // Filtres de prix
    if (filters.minPrice && property.price && property.price < parseInt(filters.minPrice)) return false;
    if (filters.maxPrice && property.price && property.price > parseInt(filters.maxPrice)) return false;

    // Filtres de surface
    if (filters.minSurface && property.surface && property.surface < parseInt(filters.minSurface)) return false;
    if (filters.maxSurface && property.surface && property.surface > parseInt(filters.maxSurface)) return false;

    // Filtre état (condition depuis property_details)
    if (filters.etat && property.property_details && property.property_details.length > 0) {
      const condition = property.property_details[0]?.condition;
      if (condition?.toLowerCase() !== filters.etat.toLowerCase()) return false;
    }

    // Filtres property_details (chambres, salles de bain, étages)
    if (property.property_details && property.property_details.length > 0) {
      const details = property.property_details[0];
      if (filters.chambres && details.bedrooms !== parseInt(filters.chambres)) return false;
      if (filters.sallesBain && details.bathrooms !== parseInt(filters.sallesBain)) return false;
      if (filters.etages && details.floors !== parseInt(filters.etages)) return false;
    }

    // Filtres de vue
    if (filters.vue && property.property_details && property.property_details.length > 0) {
      const details = property.property_details[0];
      const vueMapping = {
        'mer': details.vue_mer,
        'montagne': details.vue_montagne,
        'ville': details.vue_ville,
        'jardin': details.vue_jardin,
        'cour': details.vue_cour,
        'degagee': details.vue_degagee
      };
      if (!vueMapping[filters.vue as keyof typeof vueMapping]) return false;
    }

    // Filtres commodités
    if (filters.commodites.length > 0 && property.property_amenities_structured && property.property_amenities_structured.length > 0) {
      const amenities = property.property_amenities_structured[0];
      const commoditesMapping = {
        'Piscine': amenities.piscine,
        'Garage': amenities.garage,
        'Jardin': amenities.jardin,
        'Terrasse': amenities.terrasse,
        'Balcon': amenities.balcon,
        'Cave': amenities.cave,
        'Grenier': amenities.grenier,
        'Buanderie': amenities.buanderie
      };
      for (const commodite of filters.commodites) {
        if (!commoditesMapping[commodite as keyof typeof commoditesMapping]) return false;
      }
    }

    // Filtres sécurité
    if (filters.securite.length > 0 && property.property_security_structured && property.property_security_structured.length > 0) {
      const security = property.property_security_structured[0];
      const securiteMapping = {
        'Gardiennage': security.gardien,
        'Ascenseur': security.ascenseur,
        'Accès handicapé': security.acces_handicape,
        'Videosurveillance': security.video_surveillance,
        'Digicode': security.digicode,
        'Interphone': security.interphone,
        'Alarme': security.alarme,
        'Portail électrique': security.portail_electrique
      };
      for (const securiteItem of filters.securite) {
        if (!securiteMapping[securiteItem as keyof typeof securiteMapping]) return false;
      }
    }

    // Filtres proximité
    if (filters.proximite.length > 0 && property.property_nearby_structured && property.property_nearby_structured.length > 0) {
      const nearby = property.property_nearby_structured[0];
      const proximiteMapping = {
        'Écoles': nearby.ecoles,
        'Pharmacies': nearby.pharmacies,
        'Mosquées': nearby.mosquees,
        'Transports publics': nearby.transports_publics,
        'Banques': nearby.banques,
        'Universités': nearby.universites,
        'Commerces': nearby.commerces,
        'Restaurants': nearby.restaurants,
        'Aéroports': nearby.aeroports,
        'Hôpitaux': nearby.hopitaux,
        'Parcs': nearby.parcs,
        'Plages': nearby.plages
      };
      for (const proximiteItem of filters.proximite) {
        if (!proximiteMapping[proximiteItem as keyof typeof proximiteMapping]) return false;
      }
    }
    return true;
  });
  const displayedProperties = filteredProperties.slice(0, visibleResidences);
  const loadMore = () => {
    setVisibleResidences(prev => prev + 6);
  };
  if (loading) {
    return <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Chargement des propriétés...</p>
          </div>
        </div>
      </div>;
  }
  return <div className="min-h-screen bg-background">
      <Header />


      {/* Filtres - Desktop seulement (mobile géré par Header) */}
      <AnimatedSection className="hidden md:block py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <PropertyFilters onSearch={setFilters} />
        </div>
      </AnimatedSection>


      {/* Liste des biens */}
      <AnimatedSection className="py-16">
        <div className="container mx-auto px-4">
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" variants={{
          hidden: {
            opacity: 0
          },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1
            }
          }
        }} initial="hidden" animate="show">
            {displayedProperties.map((property, index) => <motion.div key={property.id} variants={{
            hidden: {
              opacity: 0,
              y: 30
            },
            show: {
              opacity: 1,
              y: 0
            }
          }} transition={{
            duration: 0.5
          }}>
                <AnimatedCard className="group overflow-hidden hover:shadow-xl transition-all duration-300 bg-card border border-border">
                  <Link to={`/bien/${property.id}`} className="block">
                    <div className="relative overflow-hidden">
                      <img src={property.image_url || "/placeholder.svg"} alt={property.title} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(property.status)}`}>
                          {getStatusLabel(property.status)}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4 flex gap-2">
                        <Button variant="ghost" size="sm" onClick={e => {
                      e.preventDefault();
                      e.stopPropagation();
                      isFavorite(property.id) ? removeFromFavorites(property.id) : addToFavorites({
                        id: property.id,
                        title: property.title,
                        price: property.price || 0,
                        surface: property.surface || 0,
                        location: property.localities?.name || "",
                        image: property.image_url || "/placeholder.svg",
                        type: property.typology || ""
                      });
                    }} className="w-8 h-8 p-0 rounded-full bg-white/80 hover:bg-white">
                          <Heart className={`w-4 h-4 ${isFavorite(property.id) ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={e => {
                      e.preventDefault();
                      e.stopPropagation();
                      addToComparison({
                        id: property.id,
                        title: property.title,
                        price: property.price || 0,
                        surface: property.surface || 0,
                        location: property.localities?.name || "",
                        image: property.image_url || "/placeholder.svg",
                        type: property.typology || "",
                        status: getStatusLabel(property.status),
                        etat: "N/A"
                      });
                    }} disabled={isInComparison(property.id)} className="w-8 h-8 p-0 rounded-full bg-white/80 hover:bg-white">
                          <BarChart3 className={`w-4 h-4 ${isInComparison(property.id) ? "text-primary" : "text-gray-600"}`} />
                        </Button>
                      </div>
                       {property.price && property.price > 0 && <div className="absolute bottom-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                           {formatPrice(property.price)}
                         </div>}
                    </div>

                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-3 text-foreground">
                        {property.title}
                      </h3>
                      
                      {/* Property Details Row */}
                      {property.property_details && property.property_details.length > 0 && <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
                          {property.property_details[0].bedrooms !== null && <div className="flex items-center gap-1">
                              <Bed className="h-4 w-4" />
                              <span>{property.property_details[0].bedrooms}</span>
                            </div>}
                          {property.property_details[0].bathrooms !== null && <div className="flex items-center gap-1">
                              <Bath className="h-4 w-4" />
                              <span>{property.property_details[0].bathrooms}</span>
                            </div>}
                          {property.surface && <div className="flex items-center gap-1">
                              <Square className="h-4 w-4" />
                              <span>{property.surface} m²</span>
                            </div>}
                        </div>}

                      {/* Location */}
                      <div className="flex items-center text-muted-foreground mb-4">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="text-sm">{property.localities?.name || "N/A"}</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm px-3 py-1 bg-muted rounded-full text-muted-foreground">
                          {property.typology || "N/A"}
                        </span>
                        <Button variant="outline" size="sm">
                          Voir détails
                        </Button>
                      </div>
                    </CardContent>
                  </Link>
                </AnimatedCard>
              </motion.div>)}
          </motion.div>

          {/* Bouton "Voir plus" */}
          {visibleResidences < filteredProperties.length && <motion.div className="text-center mt-12" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5
        }}>
              <Button onClick={loadMore} size="lg" className="bg-primary hover:bg-primary/90">
                Voir plus de biens
              </Button>
            </motion.div>}
        </div>
      </AnimatedSection>

      {/* Footer */}
      <Footer />

      {/* Scroll to Top */}
      <ScrollToTop />
    </div>;
};
export default NosBiens;