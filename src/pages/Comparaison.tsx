import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Trash2, BarChart3, X, ChevronDown, Check, X as XIcon } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

interface PropertyDetails {
  bedrooms?: number;
  bathrooms?: number;
  rooms?: number;
  floors?: number;
  living_area?: number;
  condition?: string;
  vue_mer?: boolean;
  vue_montagne?: boolean;
  vue_ville?: boolean;
  vue_jardin?: boolean;
  vue_cour?: boolean;
  vue_degagee?: boolean;
}

interface PropertyAmenities {
  piscine?: boolean;
  garage?: boolean;
  jardin?: boolean;
  terrasse?: boolean;
  balcon?: boolean;
  cave?: boolean;
  grenier?: boolean;
  buanderie?: boolean;
}

interface PropertySecurity {
  gardien?: boolean;
  ascenseur?: boolean;
  acces_handicape?: boolean;
  video_surveillance?: boolean;
  digicode?: boolean;
  interphone?: boolean;
  alarme?: boolean;
  portail_electrique?: boolean;
}

interface PropertyNearby {
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
}

interface PropertyDocuments {
  titre_propriete?: boolean;
  acte_propriete?: boolean;
  livret_foncier?: boolean;
  certificat_inscription_fonciere?: boolean;
  plans_cadastraux?: boolean;
  documents_cadastraux?: boolean;
  fiche_fiscale?: boolean;
  certificat_urbanisme?: boolean;
  permis_construire?: boolean;
  certification_conformite?: boolean;
  contrat_location?: boolean;
  promesse_vente?: boolean;
  mainlevee?: boolean;
  permis_exploitation?: boolean;
  certificat_non_negativite?: boolean;
  certification_possession?: boolean;
}

interface Locality {
  name: string;
  wilaya?: {
    name: string;
  };
}

interface Property {
  id: string;
  title: string;
  price: number | null;
  surface: number | null;
  image_url: string | null;
  typology: string | null;
  status: string | null;
  description?: string | null;
  localities?: Locality | Locality[] | null;
  property_details?: PropertyDetails | PropertyDetails[] | null;
  property_amenities_structured?: PropertyAmenities | PropertyAmenities[] | null;
  property_security_structured?: PropertySecurity | PropertySecurity[] | null;
  property_nearby_structured?: PropertyNearby | PropertyNearby[] | null;
  property_documents_structured?: PropertyDocuments | PropertyDocuments[] | null;
}

const Comparaison: React.FC = () => {
  const navigate = useNavigate();
  const [comparisonItems, setComparisonItems] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    caracteristiques: false,
    commodites: false,
    securite: false,
    proximite: false,
    documents: false,
  });

  // Charger les données complètes depuis Supabase
  useEffect(() => {
    const fetchComparisonData = async () => {
      try {
        // Récupérer les IDs depuis localStorage
        const stored = JSON.parse(localStorage.getItem('comparison') || '[]');
        if (stored.length === 0) {
          setLoading(false);
          return;
        }

        const propertyIds = stored.map((item: any) => item.id);

        // Charger les données complètes depuis Supabase
        const { data, error } = await supabase
          .from('properties')
          .select(`
            id,
            title,
            status,
            surface,
            price,
            image_url,
            typology,
            description,
            commune:communes(name, wilaya:wilayas(name)),
            property_details (
              bedrooms,
              bathrooms,
              rooms,
              floors,
              living_area,
              condition,
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
            ),
            property_documents_structured (
              titre_propriete,
              acte_propriete,
              livret_foncier,
              certificat_inscription_fonciere,
              plans_cadastraux,
              documents_cadastraux,
              fiche_fiscale,
              certificat_urbanisme,
              permis_construire,
              certification_conformite,
              contrat_location,
              promesse_vente,
              mainlevee,
              permis_exploitation,
              certificat_non_negativite,
              certification_possession
            )
          `)
          .in('id', propertyIds);

        if (error) {
          console.error('Erreur lors du chargement des données:', error);
          setLoading(false);
          return;
        }

        // Transformer les données pour gérer les arrays/objects
        const transformedData = (data || []).map(property => {
          // Gérer commune avec wilaya imbriquée
          let locality: Locality | null = null;
          if (property.commune) {
            const communeData = Array.isArray(property.commune) ? property.commune[0] : property.commune;
            if (communeData && typeof communeData === 'object' && 'name' in communeData) {
              let wilayaData = null;
              if (communeData.wilaya) {
                wilayaData = Array.isArray(communeData.wilaya) ? communeData.wilaya[0] : communeData.wilaya;
              }
              locality = {
                name: communeData.name,
                wilaya: wilayaData
              };
            }
          }

          // Gérer property_details
          let details: PropertyDetails | null = null;
          if (property.property_details) {
            if (Array.isArray(property.property_details) && property.property_details.length > 0) {
              details = property.property_details[0];
            } else if (typeof property.property_details === 'object' && !Array.isArray(property.property_details)) {
              details = property.property_details;
            }
          }

          // Gérer property_amenities_structured
          let amenities: PropertyAmenities | null = null;
          if (property.property_amenities_structured) {
            if (Array.isArray(property.property_amenities_structured) && property.property_amenities_structured.length > 0) {
              amenities = property.property_amenities_structured[0];
            } else if (typeof property.property_amenities_structured === 'object' && !Array.isArray(property.property_amenities_structured)) {
              amenities = property.property_amenities_structured;
            }
          }

          // Gérer property_security_structured
          let security: PropertySecurity | null = null;
          if (property.property_security_structured) {
            if (Array.isArray(property.property_security_structured) && property.property_security_structured.length > 0) {
              security = property.property_security_structured[0];
            } else if (typeof property.property_security_structured === 'object' && !Array.isArray(property.property_security_structured)) {
              security = property.property_security_structured;
            }
          }

          // Gérer property_nearby_structured
          let nearby: PropertyNearby | null = null;
          if (property.property_nearby_structured) {
            if (Array.isArray(property.property_nearby_structured) && property.property_nearby_structured.length > 0) {
              nearby = property.property_nearby_structured[0];
            } else if (typeof property.property_nearby_structured === 'object' && !Array.isArray(property.property_nearby_structured)) {
              nearby = property.property_nearby_structured;
            }
          }

          // Gérer property_documents_structured
          let documents: PropertyDocuments | null = null;
          if (property.property_documents_structured) {
            if (Array.isArray(property.property_documents_structured) && property.property_documents_structured.length > 0) {
              documents = property.property_documents_structured[0];
            } else if (typeof property.property_documents_structured === 'object' && !Array.isArray(property.property_documents_structured)) {
              documents = property.property_documents_structured;
            }
          }

          return {
            ...property,
            localities: locality,
            property_details: details,
            property_amenities_structured: amenities,
            property_security_structured: security,
            property_nearby_structured: nearby,
            property_documents_structured: documents,
          };
        });

        setComparisonItems(transformedData);
      } catch (error) {
        console.error('Erreur:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchComparisonData();
  }, []);

  const removeFromComparison = (propertyId: string) => {
    const newComparison = comparisonItems.filter(item => item.id !== propertyId);
    setComparisonItems(newComparison);
    
    // Mettre à jour localStorage
    const stored = JSON.parse(localStorage.getItem('comparison') || '[]');
    const updatedStored = stored.filter((item: any) => item.id !== propertyId);
    localStorage.setItem('comparison', JSON.stringify(updatedStored));
  };

  const clearComparison = () => {
    setComparisonItems([]);
    localStorage.removeItem('comparison');
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Fonctions utilitaires pour les métriques
  const getPricePerSquareMeter = (property: Property): number | null => {
    if (!property.price || !property.surface || property.surface === 0) return null;
    return Math.round(property.price / property.surface);
  };

  const getBedroomsPerSurface = (property: Property): number | null => {
    const details = Array.isArray(property.property_details) 
      ? property.property_details[0] 
      : property.property_details;
    if (!details?.bedrooms || !property.surface || property.surface === 0) return null;
    return Math.round((details.bedrooms / property.surface) * 100) / 100;
  };

  const countAmenities = (property: Property): number => {
    const amenities = Array.isArray(property.property_amenities_structured)
      ? property.property_amenities_structured[0]
      : property.property_amenities_structured;
    if (!amenities) return 0;
    return Object.values(amenities).filter(Boolean).length;
  };

  const countNearby = (property: Property): number => {
    const nearby = Array.isArray(property.property_nearby_structured)
      ? property.property_nearby_structured[0]
      : property.property_nearby_structured;
    if (!nearby) return 0;
    return Object.values(nearby).filter(Boolean).length;
  };

  const getViews = (property: Property): string[] => {
    const details = Array.isArray(property.property_details)
      ? property.property_details[0]
      : property.property_details;
    if (!details) return [];
    const views: string[] = [];
    if (details.vue_mer) views.push('Mer');
    if (details.vue_montagne) views.push('Montagne');
    if (details.vue_ville) views.push('Ville');
    if (details.vue_jardin) views.push('Jardin');
    if (details.vue_cour) views.push('Cour');
    if (details.vue_degagee) views.push('Dégagée');
    return views;
  };

  const getDocumentNames = (property: Property): string[] => {
    const documents = Array.isArray(property.property_documents_structured)
      ? property.property_documents_structured[0]
      : property.property_documents_structured;
    if (!documents) return [];
    
    const documentLabels: Record<string, string> = {
      titre_propriete: 'Titre de propriété',
      acte_propriete: 'Acte de propriété',
      livret_foncier: 'Livret foncier',
      certificat_inscription_fonciere: 'Certificat d\'inscription foncière',
      plans_cadastraux: 'Plans cadastraux',
      documents_cadastraux: 'Documents cadastraux',
      fiche_fiscale: 'Fiche fiscale',
      certificat_urbanisme: 'Certificat d\'urbanisme',
      permis_construire: 'Permis de construire',
      certification_conformite: 'Certification de conformité',
      contrat_location: 'Contrat de location',
      promesse_vente: 'Promesse de vente',
      mainlevee: 'Mainlevée',
      permis_exploitation: 'Permis d\'exploitation',
      certificat_non_negativite: 'Certificat de non négativité',
      certification_possession: 'Certification de possession',
    };

    return Object.entries(documents)
      .filter(([_, value]) => value === true)
      .map(([key, _]) => documentLabels[key] || key);
  };

  const getWhatsAppMessage = (): string => {
    let message = "Bonjour, je souhaite obtenir un conseil concernant ma comparaison de biens immobiliers.\n\n";
    message += `J'ai comparé ${comparisonItems.length} bien${comparisonItems.length > 1 ? 's' : ''} :\n\n`;
    
    comparisonItems.forEach((property, index) => {
      message += `📍 Bien ${index + 1} :\n`;
      message += `• ${property.title || 'Sans titre'}\n`;
      message += `• Localisation : ${getLocalityName(property)}\n`;
      message += `• Prix : ${property.price ? formatPrice(property.price) : 'N/A'}\n`;
      message += `• Surface : ${property.surface ? `${property.surface} m²` : 'N/A'}\n`;
      message += `• Typologie : ${property.typology || 'N/A'}\n`;
      message += `• Statut : ${property.status || 'N/A'}\n`;
      
      const details = Array.isArray(property.property_details) 
        ? property.property_details[0] 
        : property.property_details;
      if (details?.bedrooms) {
        message += `• Chambres : ${details.bedrooms}\n`;
      }
      if (details?.bathrooms) {
        message += `• Salles de bain : ${details.bathrooms}\n`;
      }
      
      const pricePerM2 = getPricePerSquareMeter(property);
      if (pricePerM2) {
        message += `• Prix au m² : ${formatPrice(pricePerM2)}\n`;
      }
      
      message += "\n";
    });
    
    message += "Pourriez-vous me donner votre avis et vos recommandations ?\nMerci !";
    
    return encodeURIComponent(message);
  };

  const handleRequestAdvice = () => {
    const phoneNumber = "33765683250";
    const message = getWhatsAppMessage();
    const whatsappUrl = `https://api.whatsapp.com/send/?phone=${phoneNumber}&text=${message}&type=phone_number&app_absent=0`;
    window.open(whatsappUrl, '_blank');
  };

  const renderBoolean = (value: boolean | null | undefined) => {
    if (value === true) {
      return (
        <div className="flex items-center justify-center">
          <Check className="h-5 w-5 text-green-600 mx-auto bg-green-50 rounded-full p-0.5" />
        </div>
      );
    }
    return (
      <div className="flex items-center justify-center">
        <XIcon className="h-5 w-5 text-gray-400 mx-auto bg-gray-50 rounded-full p-0.5" />
      </div>
    );
  };

  const getLocalityName = (property: Property): string => {
    if (!property.localities) return 'N/A';
    const locality = Array.isArray(property.localities) ? property.localities[0] : property.localities;
    return locality?.name || 'N/A';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement des données de comparaison...</p>
          </div>
        </div>
      </div>
    );
  }

  if (comparisonItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Aucun bien à comparer
            </h2>
            <p className="text-gray-600 mb-6">
              Ajoutez des biens à votre comparaison depuis la page des biens.
            </p>
            <Button onClick={() => navigate('/nos-biens')}>
              Voir nos biens
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => navigate('/nos-biens')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Retour
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Comparaison de Biens
                </h1>
                <p className="text-lg text-gray-600">
                  {comparisonItems.length} bien{comparisonItems.length > 1 ? 's' : ''} à comparer
                </p>
              </div>
            </div>
            <Button
              variant="destructive"
              onClick={clearComparison}
              className="flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Vider la comparaison
            </Button>
          </div>
        </div>
      </div>

      {/* Tableau de comparaison */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 border-b sticky left-0 bg-gray-50 z-10 min-w-[200px]">
                      Critères
                    </th>
                    {comparisonItems.map((property) => (
                      <th key={property.id} className="px-4 py-3 text-center text-sm font-medium text-gray-900 border-b min-w-[200px]">
                        <div className="relative group">
                          <button
                            onClick={() => removeFromComparison(property.id)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-all duration-200 hover:scale-110 shadow-lg z-20"
                            aria-label="Retirer de la comparaison"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                          <div className="overflow-hidden rounded-lg mb-2">
                            <img
                              src={property.image_url || "/placeholder.svg"}
                              alt={property.title}
                              className="w-full h-32 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>
                          <p className="font-semibold text-sm text-gray-900 group-hover:text-primary transition-colors duration-200">{property.title}</p>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Informations de base - Toujours visible */}
                  <tr className="border-b bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10">
                    <td colSpan={comparisonItems.length + 1} className="px-4 py-3">
                      <h3 className="font-semibold text-gray-900 text-lg flex items-center gap-2">
                        <BarChart3 className="h-5 w-5 text-primary" />
                        Informations de base
                      </h3>
                    </td>
                  </tr>
                  
                  <tr className="border-b hover:bg-gray-50/50 transition-colors duration-150">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 bg-gray-50 sticky left-0 z-10">Photo</td>
                    {comparisonItems.map((property) => (
                      <td key={`${property.id}-image`} className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center">
                          <img
                            src={property.image_url || "/placeholder.svg"}
                            alt={property.title}
                            className="w-16 h-16 object-cover rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                          />
                        </div>
                      </td>
                    ))}
                  </tr>

                  <tr className="border-b hover:bg-gray-50/50 transition-colors duration-150">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 bg-gray-50 sticky left-0 z-10">Titre</td>
                    {comparisonItems.map((property) => (
                      <td key={`${property.id}-title`} className="px-4 py-3 text-sm text-gray-900 text-center">
                        {property.title || 'N/A'}
                      </td>
                    ))}
                  </tr>

                  <tr className="border-b hover:bg-gray-50/50 transition-colors duration-150">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 bg-gray-50 sticky left-0 z-10">Prix</td>
                    {comparisonItems.map((property) => (
                      <td key={`${property.id}-price`} className="px-4 py-3 text-sm text-center">
                        <span className="font-bold text-lg text-green-600">
                          {property.price ? formatPrice(property.price) : <span className="text-gray-400">N/A</span>}
                        </span>
                      </td>
                    ))}
                  </tr>

                  <tr className="border-b hover:bg-gray-50/50 transition-colors duration-150">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 bg-gray-50 sticky left-0 z-10">Localisation</td>
                    {comparisonItems.map((property) => (
                      <td key={`${property.id}-location`} className="px-4 py-3 text-sm text-gray-900 text-center">
                        {getLocalityName(property)}
                      </td>
                    ))}
                  </tr>

                  <tr className="border-b hover:bg-gray-50/50 transition-colors duration-150">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 bg-gray-50 sticky left-0 z-10">Typologie</td>
                    {comparisonItems.map((property) => (
                      <td key={`${property.id}-typology`} className="px-4 py-3 text-sm text-gray-900 text-center">
                        {property.typology || 'N/A'}
                      </td>
                    ))}
                  </tr>

                  <tr className="border-b hover:bg-gray-50/50 transition-colors duration-150">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 bg-gray-50 sticky left-0 z-10">Statut</td>
                    {comparisonItems.map((property) => (
                      <td key={`${property.id}-status`} className="px-4 py-3 text-sm text-gray-900 text-center">
                        {property.status || 'N/A'}
                      </td>
                    ))}
                  </tr>

                  <tr className="border-b hover:bg-gray-50/50 transition-colors duration-150">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 bg-gray-50 sticky left-0 z-10">Surface (m²)</td>
                    {comparisonItems.map((property) => (
                      <td key={`${property.id}-surface`} className="px-4 py-3 text-sm text-gray-900 text-center">
                        {property.surface ? `${property.surface} m²` : 'N/A'}
                      </td>
                    ))}
                  </tr>

                  {/* Métriques comparatives */}
                  <tr className="border-b bg-gradient-to-r from-purple-50 via-purple-50/50 to-purple-50">
                    <td colSpan={comparisonItems.length + 1} className="px-4 py-3">
                      <h3 className="font-semibold text-gray-900 text-lg flex items-center gap-2">
                        <BarChart3 className="h-5 w-5 text-purple-600" />
                        Métriques comparatives
                      </h3>
                    </td>
                  </tr>

                  <tr className="border-b hover:bg-gray-50/50 transition-colors duration-150">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 bg-gray-50 sticky left-0 z-10">Prix au m²</td>
                    {comparisonItems.map((property) => {
                      const pricePerM2 = getPricePerSquareMeter(property);
                      return (
                        <td key={`${property.id}-price-per-m2`} className="px-4 py-3 text-sm text-center">
                          {pricePerM2 ? (
                            <Badge variant="secondary" className="bg-blue-100 text-blue-800 font-semibold px-3 py-1 shadow-sm hover:shadow-md transition-shadow duration-200">
                              {formatPrice(pricePerM2)}
                            </Badge>
                          ) : (
                            <span className="text-gray-400">N/A</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>

                  <tr className="border-b hover:bg-gray-50/50 transition-colors duration-150">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 bg-gray-50 sticky left-0 z-10">Ratio chambres/surface</td>
                    {comparisonItems.map((property) => {
                      const ratio = getBedroomsPerSurface(property);
                      return (
                        <td key={`${property.id}-bedrooms-ratio`} className="px-4 py-3 text-sm text-center">
                          {ratio ? (
                            <Badge variant="secondary" className="bg-purple-100 text-purple-800 font-semibold px-3 py-1 shadow-sm hover:shadow-md transition-shadow duration-200">
                              {ratio.toFixed(2)} ch/m²
                            </Badge>
                          ) : (
                            <span className="text-gray-400">N/A</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>

                  <tr className="border-b hover:bg-gray-50/50 transition-colors duration-150">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 bg-gray-50 sticky left-0 z-10">Nombre de commodités</td>
                    {comparisonItems.map((property) => {
                      const count = countAmenities(property);
                      return (
                        <td key={`${property.id}-amenities-count`} className="px-4 py-3 text-sm text-center">
                          <Badge variant="secondary" className="bg-green-100 text-green-800 font-semibold px-3 py-1 shadow-sm hover:shadow-md transition-shadow duration-200">
                            {count}
                          </Badge>
                        </td>
                      );
                    })}
                  </tr>

                  <tr className="border-b hover:bg-gray-50/50 transition-colors duration-150">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 bg-gray-50 sticky left-0 z-10">Score de proximité</td>
                    {comparisonItems.map((property) => {
                      const count = countNearby(property);
                      return (
                        <td key={`${property.id}-nearby-count`} className="px-4 py-3 text-sm text-center">
                          <Badge variant="secondary" className="bg-orange-100 text-orange-800 font-semibold px-3 py-1 shadow-sm hover:shadow-md transition-shadow duration-200">
                            {count}
                          </Badge>
                        </td>
                      );
                    })}
                  </tr>

                  {/* Caractéristiques - Collapsible */}
                  <tr className="border-b bg-gradient-to-r from-blue-50 via-blue-50/50 to-blue-50">
                    <td colSpan={comparisonItems.length + 1} className="px-4 py-0">
                      <Collapsible open={expandedSections.caracteristiques} onOpenChange={() => toggleSection('caracteristiques')}>
                        <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-3 hover:bg-blue-100/50 transition-colors duration-200 rounded-t-lg cursor-pointer group">
                          <h3 className="font-semibold text-gray-900 text-lg flex items-center gap-2 group-hover:text-blue-700 transition-colors duration-200">
                            <BarChart3 className="h-5 w-5 text-blue-600" />
                            Caractéristiques
                          </h3>
                          <ChevronDown className={`h-5 w-5 text-gray-600 transition-all duration-300 ${expandedSections.caracteristiques ? 'rotate-180 text-blue-600' : 'group-hover:text-blue-600'}`} />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up overflow-hidden">
                          <table className="w-full">
                            <tbody>
                              <tr className="border-b hover:bg-gray-50/50 transition-colors duration-150">
                                <td className="px-4 py-3 text-sm font-medium text-gray-900 bg-gray-50 sticky left-0 z-10">Chambres</td>
                                {comparisonItems.map((property) => {
                                  const details = Array.isArray(property.property_details) ? property.property_details[0] : property.property_details;
                                  return (
                                    <td key={`${property.id}-bedrooms`} className="px-4 py-3 text-sm text-gray-900 text-center">
                                      {details?.bedrooms ?? 'N/A'}
                                    </td>
                                  );
                                })}
                              </tr>
                              <tr className="border-b hover:bg-gray-50/50 transition-colors duration-150">
                                <td className="px-4 py-3 text-sm font-medium text-gray-900 bg-gray-50 sticky left-0 z-10">Salles de bain</td>
                                {comparisonItems.map((property) => {
                                  const details = Array.isArray(property.property_details) ? property.property_details[0] : property.property_details;
                                  return (
                                    <td key={`${property.id}-bathrooms`} className="px-4 py-3 text-sm text-gray-900 text-center">
                                      {details?.bathrooms ?? 'N/A'}
                                    </td>
                                  );
                                })}
                              </tr>
                              <tr className="border-b hover:bg-gray-50/50 transition-colors duration-150">
                                <td className="px-4 py-3 text-sm font-medium text-gray-900 bg-gray-50 sticky left-0 z-10">Pièces</td>
                                {comparisonItems.map((property) => {
                                  const details = Array.isArray(property.property_details) ? property.property_details[0] : property.property_details;
                                  return (
                                    <td key={`${property.id}-rooms`} className="px-4 py-3 text-sm text-gray-900 text-center">
                                      {details?.rooms ?? 'N/A'}
                                    </td>
                                  );
                                })}
                              </tr>
                              <tr className="border-b hover:bg-gray-50/50 transition-colors duration-150">
                                <td className="px-4 py-3 text-sm font-medium text-gray-900 bg-gray-50 sticky left-0 z-10">Étages</td>
                                {comparisonItems.map((property) => {
                                  const details = Array.isArray(property.property_details) ? property.property_details[0] : property.property_details;
                                  return (
                                    <td key={`${property.id}-floors`} className="px-4 py-3 text-sm text-gray-900 text-center">
                                      {details?.floors ?? 'N/A'}
                                    </td>
                                  );
                                })}
                              </tr>
                              <tr className="border-b hover:bg-gray-50/50 transition-colors duration-150">
                                <td className="px-4 py-3 text-sm font-medium text-gray-900 bg-gray-50 sticky left-0 z-10">Surface habitable (m²)</td>
                                {comparisonItems.map((property) => {
                                  const details = Array.isArray(property.property_details) ? property.property_details[0] : property.property_details;
                                  return (
                                    <td key={`${property.id}-living-area`} className="px-4 py-3 text-sm text-gray-900 text-center">
                                      {details?.living_area ? `${details.living_area} m²` : 'N/A'}
                                    </td>
                                  );
                                })}
                              </tr>
                              <tr className="border-b hover:bg-gray-50/50 transition-colors duration-150">
                                <td className="px-4 py-3 text-sm font-medium text-gray-900 bg-gray-50 sticky left-0 z-10">Vues</td>
                                {comparisonItems.map((property) => {
                                  const views = getViews(property);
                                  return (
                                    <td key={`${property.id}-views`} className="px-4 py-3 text-sm text-center">
                                      {views.length > 0 ? (
                                        <div className="flex flex-wrap gap-1 justify-center">
                                          {views.map((view, idx) => (
                                            <Badge key={idx} variant="outline" className="text-xs">
                                              {view}
                                            </Badge>
                                          ))}
                                        </div>
                                      ) : (
                                        <span className="text-gray-400">N/A</span>
                                      )}
                                    </td>
                                  );
                                })}
                              </tr>
                            </tbody>
                          </table>
                        </CollapsibleContent>
                      </Collapsible>
                    </td>
                  </tr>

                  {/* Commodités - Collapsible */}
                  <tr className="border-b bg-gradient-to-r from-green-50 via-green-50/50 to-green-50">
                    <td colSpan={comparisonItems.length + 1} className="px-4 py-0">
                      <Collapsible open={expandedSections.commodites} onOpenChange={() => toggleSection('commodites')}>
                        <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-3 hover:bg-green-100/50 transition-colors duration-200 rounded-t-lg cursor-pointer group">
                          <h3 className="font-semibold text-gray-900 text-lg flex items-center gap-2 group-hover:text-green-700 transition-colors duration-200">
                            <BarChart3 className="h-5 w-5 text-green-600" />
                            Commodités
                          </h3>
                          <ChevronDown className={`h-5 w-5 text-gray-600 transition-all duration-300 ${expandedSections.commodites ? 'rotate-180 text-green-600' : 'group-hover:text-green-600'}`} />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up overflow-hidden">
                          <table className="w-full">
                            <tbody>
                              {[
                                { key: 'piscine', label: 'Piscine' },
                                { key: 'garage', label: 'Garage' },
                                { key: 'jardin', label: 'Jardin' },
                                { key: 'terrasse', label: 'Terrasse' },
                                { key: 'balcon', label: 'Balcon' },
                                { key: 'cave', label: 'Cave' },
                                { key: 'grenier', label: 'Grenier' },
                                { key: 'buanderie', label: 'Buanderie' },
                              ].map(({ key, label }) => (
                                <tr key={key} className="border-b hover:bg-gray-50/50 transition-colors duration-150">
                                  <td className="px-4 py-3 text-sm font-medium text-gray-900 bg-gray-50 sticky left-0 z-10">{label}</td>
                                  {comparisonItems.map((property) => {
                                    const amenities = Array.isArray(property.property_amenities_structured)
                                      ? property.property_amenities_structured[0]
                                      : property.property_amenities_structured;
                                    return (
                                      <td key={`${property.id}-${key}`} className="px-4 py-3 text-center">
                                        {renderBoolean(amenities?.[key as keyof PropertyAmenities])}
                                      </td>
                                    );
                                  })}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </CollapsibleContent>
                      </Collapsible>
                    </td>
                  </tr>

                  {/* Sécurité & Accessibilité - Collapsible */}
                  <tr className="border-b bg-gradient-to-r from-yellow-50 via-yellow-50/50 to-yellow-50">
                    <td colSpan={comparisonItems.length + 1} className="px-4 py-0">
                      <Collapsible open={expandedSections.securite} onOpenChange={() => toggleSection('securite')}>
                        <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-3 hover:bg-yellow-100/50 transition-colors duration-200 rounded-t-lg cursor-pointer group">
                          <h3 className="font-semibold text-gray-900 text-lg flex items-center gap-2 group-hover:text-yellow-700 transition-colors duration-200">
                            <BarChart3 className="h-5 w-5 text-yellow-600" />
                            Sécurité & Accessibilité
                          </h3>
                          <ChevronDown className={`h-5 w-5 text-gray-600 transition-all duration-300 ${expandedSections.securite ? 'rotate-180 text-yellow-600' : 'group-hover:text-yellow-600'}`} />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up overflow-hidden">
                          <table className="w-full">
                            <tbody>
                              {[
                                { key: 'gardien', label: 'Gardien' },
                                { key: 'ascenseur', label: 'Ascenseur' },
                                { key: 'acces_handicape', label: 'Accès handicapé' },
                                { key: 'video_surveillance', label: 'Vidéosurveillance' },
                                { key: 'digicode', label: 'Digicode' },
                                { key: 'interphone', label: 'Interphone' },
                                { key: 'alarme', label: 'Alarme' },
                                { key: 'portail_electrique', label: 'Portail électrique' },
                              ].map(({ key, label }) => (
                                <tr key={key} className="border-b hover:bg-gray-50/50 transition-colors duration-150">
                                  <td className="px-4 py-3 text-sm font-medium text-gray-900 bg-gray-50 sticky left-0 z-10">{label}</td>
                                  {comparisonItems.map((property) => {
                                    const security = Array.isArray(property.property_security_structured)
                                      ? property.property_security_structured[0]
                                      : property.property_security_structured;
                                    return (
                                      <td key={`${property.id}-${key}`} className="px-4 py-3 text-center">
                                        {renderBoolean(security?.[key as keyof PropertySecurity])}
                                      </td>
                                    );
                                  })}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </CollapsibleContent>
                      </Collapsible>
                    </td>
                  </tr>

                  {/* Proximité - Collapsible */}
                  <tr className="border-b bg-gradient-to-r from-orange-50 via-orange-50/50 to-orange-50">
                    <td colSpan={comparisonItems.length + 1} className="px-4 py-0">
                      <Collapsible open={expandedSections.proximite} onOpenChange={() => toggleSection('proximite')}>
                        <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-3 hover:bg-orange-100/50 transition-colors duration-200 rounded-t-lg cursor-pointer group">
                          <h3 className="font-semibold text-gray-900 text-lg flex items-center gap-2 group-hover:text-orange-700 transition-colors duration-200">
                            <BarChart3 className="h-5 w-5 text-orange-600" />
                            Proximité
                          </h3>
                          <ChevronDown className={`h-5 w-5 text-gray-600 transition-all duration-300 ${expandedSections.proximite ? 'rotate-180 text-orange-600' : 'group-hover:text-orange-600'}`} />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up overflow-hidden">
                          <table className="w-full">
                            <tbody>
                              {[
                                { key: 'ecoles', label: 'Écoles' },
                                { key: 'pharmacies', label: 'Pharmacies' },
                                { key: 'mosquees', label: 'Mosquées' },
                                { key: 'transports_publics', label: 'Transports publics' },
                                { key: 'banques', label: 'Banques' },
                                { key: 'universites', label: 'Universités' },
                                { key: 'commerces', label: 'Commerces' },
                                { key: 'restaurants', label: 'Restaurants' },
                                { key: 'aeroports', label: 'Aéroports' },
                                { key: 'hopitaux', label: 'Hôpitaux' },
                                { key: 'parcs', label: 'Parcs' },
                                { key: 'plages', label: 'Plages' },
                              ].map(({ key, label }) => (
                                <tr key={key} className="border-b hover:bg-gray-50/50 transition-colors duration-150">
                                  <td className="px-4 py-3 text-sm font-medium text-gray-900 bg-gray-50 sticky left-0 z-10">{label}</td>
                                  {comparisonItems.map((property) => {
                                    const nearby = Array.isArray(property.property_nearby_structured)
                                      ? property.property_nearby_structured[0]
                                      : property.property_nearby_structured;
                                    return (
                                      <td key={`${property.id}-${key}`} className="px-4 py-3 text-center">
                                        {renderBoolean(nearby?.[key as keyof PropertyNearby])}
                                      </td>
                                    );
                                  })}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </CollapsibleContent>
                      </Collapsible>
                    </td>
                  </tr>

                  {/* Documents - Collapsible */}
                  <tr className="border-b bg-gradient-to-r from-indigo-50 via-indigo-50/50 to-indigo-50">
                    <td colSpan={comparisonItems.length + 1} className="px-4 py-0">
                      <Collapsible open={expandedSections.documents} onOpenChange={() => toggleSection('documents')}>
                        <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-3 hover:bg-indigo-100/50 transition-colors duration-200 rounded-t-lg cursor-pointer group">
                          <h3 className="font-semibold text-gray-900 text-lg flex items-center gap-2 group-hover:text-indigo-700 transition-colors duration-200">
                            <BarChart3 className="h-5 w-5 text-indigo-600" />
                            Documents
                          </h3>
                          <ChevronDown className={`h-5 w-5 text-gray-600 transition-all duration-300 ${expandedSections.documents ? 'rotate-180 text-indigo-600' : 'group-hover:text-indigo-600'}`} />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up overflow-hidden">
                          <table className="w-full">
                            <tbody>
                              <tr className="border-b hover:bg-gray-50/50 transition-colors duration-150">
                                <td className="px-4 py-3 text-sm font-medium text-gray-900 bg-gray-50 sticky left-0 z-10">Documents disponibles</td>
                                {comparisonItems.map((property) => {
                                  const documents = getDocumentNames(property);
                                  return (
                                    <td key={`${property.id}-documents`} className="px-4 py-3 text-sm text-center">
                                      {documents.length > 0 ? (
                                        <div className="flex flex-wrap gap-1 justify-center">
                                          {documents.map((doc, idx) => (
                                            <Badge key={idx} variant="outline" className="text-xs">
                                              {doc}
                                            </Badge>
                                          ))}
                                        </div>
                                      ) : (
                                        <span className="text-gray-400">N/A</span>
                                      )}
                                    </td>
                                  );
                                })}
                              </tr>
                            </tbody>
                          </table>
                        </CollapsibleContent>
                      </Collapsible>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          <Button
            variant="outline"
            onClick={() => navigate('/nos-biens')}
          >
            Ajouter d'autres biens
          </Button>
          <Button
            onClick={handleRequestAdvice}
          >
            Demander un conseil
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Comparaison;
