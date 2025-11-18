import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLocalities } from '@/hooks/useLocalities';
import { FilterState } from '@/components/PropertyFilters';
import { motion } from 'framer-motion';

const ALL = 'all';

interface MobileFiltersProps {
  onFiltersChange?: (filters: FilterState) => void;
}

const initialFilters: FilterState = {
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
};

export const MobileFilters = ({ onFiltersChange }: MobileFiltersProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('principaux');
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const { localities, loading: localitiesLoading } = useLocalities();

  // Synchroniser les filtres avec l'URL au chargement et quand l'URL change
  useEffect(() => {
    const urlFilters: FilterState = {
      typeOffre: searchParams.get("typeOffre") || "",
      type: searchParams.get("type") || "",
      localite: searchParams.get("localite") || "",
      minPrice: searchParams.get("minPrice") || "",
      maxPrice: searchParams.get("maxPrice") || "",
      minSurface: searchParams.get("minSurface") || "",
      maxSurface: searchParams.get("maxSurface") || "",
      chambres: searchParams.get("chambres") || "",
      sallesBain: searchParams.get("sallesBain") || "",
      etages: searchParams.get("etages") || "",
      commodites: searchParams.get("commodites")?.split(",").filter(Boolean) || [],
      securite: searchParams.get("securite")?.split(",").filter(Boolean) || [],
      documents: searchParams.get("documents")?.split(",").filter(Boolean) || [],
      proximite: searchParams.get("proximite")?.split(",").filter(Boolean) || [],
      vue: searchParams.get("vue") || ""
    };
    setFilters(urlFilters);
  }, [searchParams]);

  const handleFilterChange = (key: keyof FilterState, value: string | string[]) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
  };

  const handleArrayFilterChange = (key: keyof FilterState, value: string, checked: boolean) => {
    const currentArray = filters[key] as string[];
    let newArray;
    if (checked) {
      newArray = [...currentArray, value];
    } else {
      newArray = currentArray.filter(item => item !== value);
    }
    handleFilterChange(key, newArray);
  };

  const resetFilters = () => {
    setFilters(initialFilters);
    // Naviguer vers /nos-biens sans paramètres
    navigate('/nos-biens');
    // Appeler le callback si fourni (pour compatibilité)
    onFiltersChange?.(initialFilters);
    setIsOpen(false);
  };

  const applyFilters = () => {
    // Créer les paramètres d'URL (comme PropertyFilters)
    const urlParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        // Si c'est un tableau, le joindre avec des virgules
        if (Array.isArray(value)) {
          if (value.length > 0) {
            urlParams.set(key, value.join(","));
          }
        } else {
          // Pour les chaînes, vérifier qu'elles ne sont pas vides
          const stringValue = value as string;
          if (stringValue.trim() !== "") {
            urlParams.set(key, stringValue);
          }
        }
      }
    });

    // Naviguer vers /nos-biens avec les filtres dans l'URL
    navigate(`/nos-biens?${urlParams.toString()}`);
    
    // Appeler le callback si fourni (pour compatibilité)
    onFiltersChange?.(filters);
    
    // Fermer le modal
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative"
        >
          <motion.div
            className="absolute inset-0 bg-chatbot-primary rounded-lg blur-xl opacity-75"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <Button 
            className="lg:hidden relative bg-chatbot-primary hover:bg-chatbot-hover text-chatbot-primary-foreground px-4 py-2 rounded-lg flex items-center gap-2 font-medium shadow-lg transition-all duration-300 z-10"
          >
            <SlidersHorizontal className="h-5 w-5" />
            <span>Filtres</span>
          </Button>
        </motion.div>
      </SheetTrigger>
      
      <SheetContent side="bottom" className="h-[85vh] p-0">
        <div className="flex flex-col h-full">
          {/* Header - La croix de fermeture est gérée automatiquement par SheetContent */}
          <SheetHeader className="px-6 py-4 border-b">
            <SheetTitle className="text-xl font-semibold">Filtres</SheetTitle>
          </SheetHeader>

          {/* Tabs */}
          <div className="flex-1 overflow-hidden">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
              <TabsList className="w-full mx-4 my-4 grid grid-cols-2">
                <TabsTrigger 
                  value="principaux" 
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Principaux
                </TabsTrigger>
                <TabsTrigger 
                  value="avancees"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Avancées
                </TabsTrigger>
              </TabsList>

              <div className="flex-1 overflow-y-auto px-6">
                <TabsContent value="principaux" className="space-y-6 mt-0">
                  {/* Type - Premier filtre (le plus important) */}
                  <div className="space-y-3">
                    <h3 className="text-base font-medium">Type</h3>
                    <Select 
                      value={filters.type || ALL}
                      onValueChange={(value) => handleFilterChange('type', value === ALL ? "" : value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner le type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={ALL}>Tous les types</SelectItem>
                        <SelectItem value="appartement">Appartement</SelectItem>
                        <SelectItem value="maison">Maison</SelectItem>
                        <SelectItem value="villa">Villa</SelectItem>
                        <SelectItem value="studio">Studio</SelectItem>
                        <SelectItem value="terrain">Terrain</SelectItem>
                        <SelectItem value="duplex">Duplex</SelectItem>
                        <SelectItem value="penthouse">Penthouse</SelectItem>
                        <SelectItem value="triplex">Triplex</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Prix */}
                  <div className="space-y-3">
                    <h3 className="text-base font-medium">Prix (Millions)</h3>
                    <div className="flex space-x-2">
                      <div className="flex-1 relative">
                        <Input
                          placeholder="Min"
                          type="number"
                          step="0.1"
                          value={filters.minPrice}
                          onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                          className="pr-12"
                        />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs">
                          M
                        </div>
                      </div>
                      <div className="flex-1 relative">
                        <Input
                          placeholder="Max"
                          type="number"
                          step="0.1"
                          value={filters.maxPrice}
                          onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                          className="pr-12"
                        />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs">
                          M
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Localité */}
                  <div className="space-y-3">
                    <h3 className="text-base font-medium">Localité</h3>
                    <Select 
                      value={filters.localite || ALL}
                      onValueChange={(value) => handleFilterChange('localite', value === ALL ? "" : value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une localité" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={ALL}>Toutes les localités</SelectItem>
                        {!localitiesLoading && localities.map((locality) => (
                          <SelectItem key={locality.id} value={locality.name}>
                            {locality.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Statut - Dernier filtre (secondaire) */}
                  <div className="space-y-3">
                    <h3 className="text-base font-medium">Statut</h3>
                    <Select 
                      value={filters.typeOffre || ALL}
                      onValueChange={(value) => handleFilterChange('typeOffre', value === ALL ? "" : value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner le statut" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={ALL}>Tous les statuts</SelectItem>
                        <SelectItem value="À Vendre">À Vendre</SelectItem>
                        <SelectItem value="Vendu">Vendu</SelectItem>
                        <SelectItem value="À louer">À louer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>

                <TabsContent value="avancees" className="space-y-6 mt-0">
                  {/* Caractéristiques */}
                  <div className="space-y-4">
                    <h3 className="text-base font-medium">Caractéristiques</h3>
                    
                    <div className="space-y-3">
                      <Label className="text-sm">Nombre de chambres</Label>
                      <Select 
                        value={filters.chambres || ALL}
                        onValueChange={(value) => handleFilterChange('chambres', value === ALL ? "" : value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Toutes" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={ALL}>Toutes</SelectItem>
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="3">3</SelectItem>
                          <SelectItem value="4">4</SelectItem>
                          <SelectItem value="5">5+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-sm">Nombre de salles de bain</Label>
                      <Select 
                        value={filters.sallesBain || ALL}
                        onValueChange={(value) => handleFilterChange('sallesBain', value === ALL ? "" : value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Toutes" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={ALL}>Toutes</SelectItem>
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="3">3</SelectItem>
                          <SelectItem value="4">4+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-sm">Étages</Label>
                      <Select 
                        value={filters.etages || ALL}
                        onValueChange={(value) => handleFilterChange('etages', value === ALL ? "" : value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Tous" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={ALL}>Tous</SelectItem>
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="3">3</SelectItem>
                          <SelectItem value="4">4+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Surface */}
                  <div className="space-y-3">
                    <h3 className="text-base font-medium">Surface</h3>
                    <div className="flex space-x-2">
                      <div className="flex-1 relative">
                        <Input
                          placeholder="Min"
                          type="number"
                          value={filters.minSurface}
                          onChange={(e) => handleFilterChange('minSurface', e.target.value)}
                          className="pr-12"
                        />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs">
                          m²
                        </div>
                      </div>
                      <div className="flex-1 relative">
                        <Input
                          placeholder="Max"
                          type="number"
                          value={filters.maxSurface}
                          onChange={(e) => handleFilterChange('maxSurface', e.target.value)}
                          className="pr-12"
                        />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs">
                          m²
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Commodités */}
                  <div className="space-y-3">
                    <h3 className="text-base font-medium">Commodités</h3>
                    <div className="space-y-2">
                      {[
                        'Piscine', 'Garage', 'Jardin', 'Terrasse', 'Balcon', 'Cave', 'Buanderie', 'Grenier'
                      ].map((item) => (
                        <div key={item} className="flex items-center space-x-3">
                          <Checkbox
                            id={`commodites-${item}`}
                            checked={filters.commodites.includes(item)}
                            onCheckedChange={(checked) => 
                              handleArrayFilterChange('commodites', item, checked as boolean)
                            }
                          />
                          <Label htmlFor={`commodites-${item}`} className="text-sm">
                            {item}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Sécurité & Accessibilité */}
                  <div className="space-y-3">
                    <h3 className="text-base font-medium">Sécurité & Accessibilité</h3>
                    <div className="space-y-2">
                      {[
                        'Gardiennage', 'Ascenseur', 'Accès handicapé', 'Videosurveillance', 
                        'Digicode', 'Interphone', 'Alarme', 'Portail électrique'
                      ].map((item) => (
                        <div key={item} className="flex items-center space-x-3">
                          <Checkbox
                            id={`securite-${item}`}
                            checked={filters.securite.includes(item)}
                            onCheckedChange={(checked) => 
                              handleArrayFilterChange('securite', item, checked as boolean)
                            }
                          />
                          <Label htmlFor={`securite-${item}`} className="text-sm">
                            {item}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Documents Associés */}
                  <div className="space-y-3">
                    <h3 className="text-base font-medium">Documents Associés</h3>
                    <div className="space-y-2">
                      {[
                        'Livret foncier', 'Acte de propriété', 'Titre de propriété', 'Contrat de location',
                        'Certification de possession', 'Certificat d\'inscription foncière', 'Fiche fiscale',
                        'Documents cadastraux', 'Plans cadastraux', 'Certificat d\'urbanisme',
                        'Permis de construire', 'Certification de conformité', 'Promesse de vente',
                        'Mainlevée', 'Permis d\'exploitation', 'Certificat de non-négativité'
                      ].map((item) => (
                        <div key={item} className="flex items-center space-x-3">
                          <Checkbox
                            id={`documents-${item}`}
                            checked={filters.documents.includes(item)}
                            onCheckedChange={(checked) => 
                              handleArrayFilterChange('documents', item, checked as boolean)
                            }
                          />
                          <Label htmlFor={`documents-${item}`} className="text-sm">
                            {item}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Proximité */}
                  <div className="space-y-3">
                    <h3 className="text-base font-medium">Proximité</h3>
                    <div className="space-y-2">
                      {[
                        'Écoles', 'Pharmacies', 'Mosquées', 'Transports publics', 'Banques',
                        'Universités', 'Commerces', 'Restaurants', 'Aéroports', 'Hôpitaux', 'Parcs', 'Plages'
                      ].map((item) => (
                        <div key={item} className="flex items-center space-x-3">
                          <Checkbox
                            id={`proximite-${item}`}
                            checked={filters.proximite.includes(item)}
                            onCheckedChange={(checked) => 
                              handleArrayFilterChange('proximite', item, checked as boolean)
                            }
                          />
                          <Label htmlFor={`proximite-${item}`} className="text-sm">
                            {item}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Vue */}
                  <div className="space-y-3">
                    <h3 className="text-base font-medium">Vue</h3>
                    <Select 
                      value={filters.vue || ALL}
                      onValueChange={(value) => handleFilterChange('vue', value === ALL ? "" : value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner la vue" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={ALL}>Toutes les vues</SelectItem>
                        <SelectItem value="mer">Vue sur la mer</SelectItem>
                        <SelectItem value="montagne">Vue montagne</SelectItem>
                        <SelectItem value="ville">Vue sur la ville</SelectItem>
                        <SelectItem value="jardin">Vue jardin</SelectItem>
                        <SelectItem value="cour">Vue cour</SelectItem>
                        <SelectItem value="degagee">Vue dégagée</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>

          {/* Footer Actions */}
          <div className="border-t p-4 space-y-3">
            <Button 
              onClick={applyFilters}
              className="w-full bg-primary hover:bg-primary/90"
            >
              Appliquer les filtres
            </Button>
            <Button 
              onClick={resetFilters}
              variant="outline" 
              className="w-full"
            >
              Réinitialiser
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};