import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useLocalities } from "@/hooks/useLocalities";

interface PropertyFiltersProps {
  onSearch?: (filters: FilterState) => void;
  className?: string;
}

export interface FilterState {
  typeOffre: string;
  type: string;
  localite: string;
  minPrice: string;
  maxPrice: string;
  // Caractéristiques
  minSurface: string;
  maxSurface: string;
  chambres: string;
  sallesBain: string;
  etages: string;
  // Commodités
  commodites: string[];
  // Sécurité & Accessibilité
  securite: string[];
  // Documents Associés
  documents: string[];
  // Proximité
  proximite: string[];
  // Vue
  vue: string;
}

const PropertyFilters = ({ onSearch, className = "" }: PropertyFiltersProps) => {
  const navigate = useNavigate();
  const { localities, loading: localitiesLoading } = useLocalities();
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
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showCaracteristiques, setShowCaracteristiques] = useState(false);
  const [showCommodites, setShowCommodites] = useState(false);
  const [showSecurite, setShowSecurite] = useState(false);
  const [showDocuments, setShowDocuments] = useState(false);
  const [showProximite, setShowProximite] = useState(false);
  const [showVue, setShowVue] = useState(false);

  const handleFilterChange = (key: keyof FilterState, value: string | string[]) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onSearch?.(newFilters);
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

  const handleSearch = () => {
    // Créer les paramètres d'URL
    const searchParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        // Si c'est un tableau, le joindre avec des virgules
        if (Array.isArray(value)) {
          if (value.length > 0) {
            searchParams.set(key, value.join(","));
          }
        } else {
          // Pour les chaînes, vérifier qu'elles ne sont pas vides
          const stringValue = value as string;
          if (stringValue.trim() !== "") {
            searchParams.set(key, stringValue);
          }
        }
      }
    });

    // Rediriger vers la page nos-biens avec les filtres
    navigate(`/nos-biens?${searchParams.toString()}`);
  };

  const resetFilters = () => {
    const resetState: FilterState = {
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
    setFilters(resetState);
    onSearch?.(resetState);
  };

  return (
    <div className={`bg-primary p-6 rounded-2xl shadow-luxury ${className}`}>
      <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
        {/* Filtres de base */}
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4 items-end">
          {/* Typologie */}
          <div className="space-y-2">
            <label className="text-white text-sm font-medium block">Typologie</label>
            <Select value={filters.type} onValueChange={(value) => handleFilterChange("type", value)}>
              <SelectTrigger className="bg-white border-0 h-12 text-slate-800">
                <SelectValue placeholder="Sélectionner la typologie" />
              </SelectTrigger>
              <SelectContent className="max-h-60 bg-white z-50">
                <SelectItem value="appartement">Appartement</SelectItem>
                <SelectItem value="maison">Maison</SelectItem>
                <SelectItem value="villa">Villa</SelectItem>
                <SelectItem value="studio">Studio</SelectItem>
                <SelectItem value="loft">Loft</SelectItem>
                <SelectItem value="terrain">Terrain</SelectItem>
                <SelectItem value="immeuble duplex">Immeuble duplex</SelectItem>
                <SelectItem value="propriété de campagne">Propriété de campagne</SelectItem>
                <SelectItem value="triplex">Triplex</SelectItem>
                <SelectItem value="locaux commerciaux">Locaux commerciaux</SelectItem>
                <SelectItem value="ranch">Ranch</SelectItem>
                <SelectItem value="appartement commercial">Appartement commercial</SelectItem>
                <SelectItem value="immeuble commercial">Immeuble commercial</SelectItem>
                <SelectItem value="hôtel">Hôtel</SelectItem>
                <SelectItem value="complexe touristique">Complexe touristique</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Statut */}
          <div className="space-y-2">
            <label className="text-white text-sm font-medium block">Statut</label>
            <Select value={filters.typeOffre} onValueChange={(value) => handleFilterChange("typeOffre", value)}>
              <SelectTrigger className="bg-white border-0 h-12 text-slate-800">
                <SelectValue placeholder="Sélectionner le statut" />
              </SelectTrigger>
              <SelectContent className="bg-white z-50">
                <SelectItem value="À Vendre">À Vendre</SelectItem>
                <SelectItem value="Vendu">Vendu</SelectItem>
                <SelectItem value="À louer">À louer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Localité */}
          <div className="space-y-2">
            <label className="text-white text-sm font-medium block">Localité</label>
            <Select value={filters.localite} onValueChange={(value) => handleFilterChange("localite", value)}>
              <SelectTrigger className="bg-white border-0 h-12 text-slate-800">
                <SelectValue placeholder={localitiesLoading ? "Chargement..." : "Sélectionner la localité"} />
              </SelectTrigger>
              <SelectContent className="bg-white z-50">
                {localitiesLoading ? (
                  <SelectItem value="loading" disabled>Chargement...</SelectItem>
                ) : (
                  localities.map((locality) => (
                    <SelectItem key={locality.id} value={locality.name}>
                      {locality.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Prix minimum */}
          <div className="space-y-2">
            <label className="text-white text-sm font-medium block">Prix min (Millions)</label>
            <Input
              type="number"
              step="0.1"
              placeholder="Ex: 5.5"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange("minPrice", e.target.value)}
              className="bg-white border-0 h-12 text-slate-800"
            />
          </div>

          {/* Prix maximum */}
          <div className="space-y-2">
            <label className="text-white text-sm font-medium block">Prix max (Millions)</label>
            <Input
              type="number"
              step="0.1"
              placeholder="Ex: 50"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
              className="bg-white border-0 h-12 text-slate-800"
            />
          </div>

          {/* Bouton Filtres avancés */}
          <div className="space-y-2">
            <label className="text-white text-sm font-medium block opacity-0">Filtres avancés</label>
            <CollapsibleTrigger asChild>
              <Button
                variant="outline"
                className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20 h-12 flex items-center justify-center gap-2"
              >
                <span>Filtres avancés</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
              </Button>
            </CollapsibleTrigger>
          </div>

          {/* Bouton Rechercher */}
          <div className="space-y-2">
            <label className="text-white text-sm font-medium block opacity-0">Rechercher</label>
            <Button
              onClick={handleSearch}
              className="bg-gradient-to-r from-accent to-accent-light hover:from-accent-light hover:to-accent text-white h-12 w-full font-medium shadow-elegant hover:shadow-luxury transition-all duration-300 hover:scale-105"
            >
              Rechercher
            </Button>
          </div>
        </div>

        {/* Filtres avancés - Contenu */}
        <CollapsibleContent className="mt-4 space-y-4">
            {/* Boutons de catégories en ligne */}
            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                onClick={() => setShowCaracteristiques(!showCaracteristiques)}
                className={`bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all duration-300 ${showCaracteristiques ? 'bg-gradient-to-r from-accent to-accent-light hover:from-accent-light hover:to-accent' : ''}`}
              >
                Caractéristiques
                <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${showCaracteristiques ? 'rotate-180' : ''}`} />
              </Button>
              
              <Button
                variant="outline"
                onClick={() => setShowCommodites(!showCommodites)}
                className={`bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all duration-300 ${showCommodites ? 'bg-gradient-to-r from-accent to-accent-light hover:from-accent-light hover:to-accent' : ''}`}
              >
                Commodités
                <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${showCommodites ? 'rotate-180' : ''}`} />
              </Button>
              
              <Button
                variant="outline"
                onClick={() => setShowSecurite(!showSecurite)}
                className={`bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all duration-300 ${showSecurite ? 'bg-gradient-to-r from-accent to-accent-light hover:from-accent-light hover:to-accent' : ''}`}
              >
                Sécurité & Accessibilité
                <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${showSecurite ? 'rotate-180' : ''}`} />
              </Button>
              
              <Button
                variant="outline"
                onClick={() => setShowDocuments(!showDocuments)}
                className={`bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all duration-300 ${showDocuments ? 'bg-gradient-to-r from-accent to-accent-light hover:from-accent-light hover:to-accent' : ''}`}
              >
                Documents Associés
                <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${showDocuments ? 'rotate-180' : ''}`} />
              </Button>
              
              <Button
                variant="outline"
                onClick={() => setShowProximite(!showProximite)}
                className={`bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all duration-300 ${showProximite ? 'bg-gradient-to-r from-accent to-accent-light hover:from-accent-light hover:to-accent' : ''}`}
              >
                Proximité
                <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${showProximite ? 'rotate-180' : ''}`} />
              </Button>
              
              <Button
                variant="outline"
                onClick={() => setShowVue(!showVue)}
                className={`bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all duration-300 ${showVue ? 'bg-gradient-to-r from-accent to-accent-light hover:from-accent-light hover:to-accent' : ''}`}
              >
                Vue
                <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${showVue ? 'rotate-180' : ''}`} />
              </Button>
              
            </div>

            {/* Filtres Caractéristiques */}
            {showCaracteristiques && (
              <div className="border border-white/20 rounded-lg p-4 bg-white/5">
                <h4 className="text-white font-medium mb-3">Caractéristiques</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  <div className="space-y-2">
                    <label className="text-white text-sm font-medium block">Surface min (m²)</label>
                    <Input
                      type="number"
                      placeholder="Min"
                      value={filters.minSurface}
                      onChange={(e) => handleFilterChange("minSurface", e.target.value)}
                      className="bg-white border-0 h-10 text-slate-800"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-white text-sm font-medium block">Surface max (m²)</label>
                    <Input
                      type="number"
                      placeholder="Max"
                      value={filters.maxSurface}
                      onChange={(e) => handleFilterChange("maxSurface", e.target.value)}
                      className="bg-white border-0 h-10 text-slate-800"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-white text-sm font-medium block">Chambres</label>
                    <Select value={filters.chambres} onValueChange={(value) => handleFilterChange("chambres", value)}>
                      <SelectTrigger className="bg-white border-0 h-10 text-slate-800">
                        <SelectValue placeholder="Tout" />
                      </SelectTrigger>
                      <SelectContent className="bg-white z-50">
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="5">5+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-white text-sm font-medium block">Salles de bain</label>
                    <Select value={filters.sallesBain} onValueChange={(value) => handleFilterChange("sallesBain", value)}>
                      <SelectTrigger className="bg-white border-0 h-10 text-slate-800">
                        <SelectValue placeholder="Tout" />
                      </SelectTrigger>
                      <SelectContent className="bg-white z-50">
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-white text-sm font-medium block">Étages</label>
                    <Select value={filters.etages} onValueChange={(value) => handleFilterChange("etages", value)}>
                      <SelectTrigger className="bg-white border-0 h-10 text-slate-800">
                        <SelectValue placeholder="Tout" />
                      </SelectTrigger>
                      <SelectContent className="bg-white z-50">
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {/* Filtres Commodités */}
            {showCommodites && (
              <div className="border border-white/20 rounded-lg p-4 bg-white/5">
                <h4 className="text-white font-medium mb-3">Commodités</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {["Piscine", "Garage", "Jardin", "Terrasse", "Balcon", "Cave", "Grenier", "Buanderie"].map((commodite) => (
                    <div key={commodite} className="flex items-center space-x-2">
                      <Checkbox
                        id={commodite}
                        checked={filters.commodites.includes(commodite)}
                        onCheckedChange={(checked) => handleArrayFilterChange("commodites", commodite, checked as boolean)}
                        className="border-white text-white"
                      />
                      <label htmlFor={commodite} className="text-white text-sm">{commodite}</label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Filtres Sécurité & Accessibilité */}
            {showSecurite && (
              <div className="border border-white/20 rounded-lg p-4 bg-white/5">
                <h4 className="text-white font-medium mb-3">Sécurité & Accessibilité</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {["Gardiennage", "Ascenseur", "Accès handicapé", "Videosurveillance", "Digicode", "Interphone", "Alarme", "Portail électrique"].map((securite) => (
                    <div key={securite} className="flex items-center space-x-2">
                      <Checkbox
                        id={securite}
                        checked={filters.securite.includes(securite)}
                        onCheckedChange={(checked) => handleArrayFilterChange("securite", securite, checked as boolean)}
                        className="border-white text-white"
                      />
                      <label htmlFor={securite} className="text-white text-sm">{securite}</label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Filtres Documents Associés */}
            {showDocuments && (
              <div className="border border-white/20 rounded-lg p-4 bg-white/5">
                <h4 className="text-white font-medium mb-3">Documents Associés</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {["Acte de propriété", "Permis de construire", "Certificat de conformité", "Diagnostic énergétique", "Expertise technique", "Plans", "Cadastre", "Assurance"].map((document) => (
                    <div key={document} className="flex items-center space-x-2">
                      <Checkbox
                        id={document}
                        checked={filters.documents.includes(document)}
                        onCheckedChange={(checked) => handleArrayFilterChange("documents", document, checked as boolean)}
                        className="border-white text-white"
                      />
                      <label htmlFor={document} className="text-white text-sm">{document}</label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Filtres Proximité */}
            {showProximite && (
              <div className="border border-white/20 rounded-lg p-4 bg-white/5">
                <h4 className="text-white font-medium mb-3">Proximité</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {["Écoles", "Pharmacies", "Mosquées", "Transports publics", "Banques", "Universités", "Commerces", "Restaurants", "Aéroports", "Hôpitaux", "Parcs", "Plages"].map((proximite) => (
                    <div key={proximite} className="flex items-center space-x-2">
                      <Checkbox
                        id={proximite}
                        checked={filters.proximite.includes(proximite)}
                        onCheckedChange={(checked) => handleArrayFilterChange("proximite", proximite, checked as boolean)}
                        className="border-white text-white"
                      />
                      <label htmlFor={proximite} className="text-white text-sm">{proximite}</label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Filtres Vue */}
            {showVue && (
              <div className="border border-white/20 rounded-lg p-4 bg-white/5">
                <h4 className="text-white font-medium mb-3">Vue</h4>
                <div className="space-y-2">
                  <Select value={filters.vue} onValueChange={(value) => handleFilterChange("vue", value)}>
                    <SelectTrigger className="bg-white border-0 h-10 text-slate-800">
                      <SelectValue placeholder="Sélectionner la vue" />
                    </SelectTrigger>
                    <SelectContent className="bg-white z-50">
                      <SelectItem value="mer">Vue mer</SelectItem>
                      <SelectItem value="montagne">Vue montagne</SelectItem>
                      <SelectItem value="ville">Vue ville</SelectItem>
                      <SelectItem value="jardin">Vue jardin</SelectItem>
                      <SelectItem value="cour">Vue cour</SelectItem>
                      <SelectItem value="degagee">Vue dégagée</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}


            <div className="mt-4 flex gap-4">
              <Button
                onClick={resetFilters}
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                Réinitialiser les filtres
              </Button>
            </div>
          </CollapsibleContent>
        </Collapsible>
    </div>
  );
};

export default PropertyFilters;