import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface PropertyFiltersProps {
  onSearch?: (filters: FilterState) => void;
  className?: string;
}

export interface FilterState {
  typeOffre: string;
  type: string;
  etat: string;
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
  // Prix au mètre carré
  minPrixM2: string;
  maxPrixM2: string;
}

const PropertyFilters = ({ onSearch, className = "" }: PropertyFiltersProps) => {
  const navigate = useNavigate();
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
    vue: "",
    minPrixM2: "",
    maxPrixM2: ""
  });
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showCaracteristiques, setShowCaracteristiques] = useState(false);
  const [showCommodites, setShowCommodites] = useState(false);
  const [showSecurite, setShowSecurite] = useState(false);
  const [showDocuments, setShowDocuments] = useState(false);
  const [showProximite, setShowProximite] = useState(false);
  const [showVue, setShowVue] = useState(false);
  const [showPrixM2, setShowPrixM2] = useState(false);

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
        searchParams.set(key, value);
      }
    });

    // Rediriger vers la page nos-biens avec les filtres
    navigate(`/nos-biens?${searchParams.toString()}`);
  };

  const resetFilters = () => {
    const resetState: FilterState = {
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
      vue: "",
      minPrixM2: "",
      maxPrixM2: ""
    };
    setFilters(resetState);
    onSearch?.(resetState);
  };

  return (
    <div className={`bg-emerald-700 p-6 rounded-lg ${className}`}>
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
              <SelectValue placeholder="Sélectionner la localité" />
            </SelectTrigger>
            <SelectContent className="bg-white z-50">
              <SelectItem value="hydra">Hydra</SelectItem>
              <SelectItem value="kouba">Kouba</SelectItem>
              <SelectItem value="birkhadem">Birkhadem</SelectItem>
              <SelectItem value="dar el beida">Dar El Beida</SelectItem>
              <SelectItem value="said hamdine">Said Hamdine</SelectItem>
              <SelectItem value="dely ibrahim">Dely Ibrahim</SelectItem>
              <SelectItem value="el biar">El Biar</SelectItem>
              <SelectItem value="ain benian">Ain Benian</SelectItem>
              <SelectItem value="cheraga">Cheraga</SelectItem>
              <SelectItem value="ben aknoun">Ben Aknoun</SelectItem>
              <SelectItem value="bouzareah">Bouzareah</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* État */}
        <div className="space-y-2">
          <label className="text-white text-sm font-medium block">État</label>
          <Select value={filters.etat} onValueChange={(value) => handleFilterChange("etat", value)}>
            <SelectTrigger className="bg-white border-0 h-12 text-slate-800">
              <SelectValue placeholder="Sélectionner l'état" />
            </SelectTrigger>
            <SelectContent className="bg-white z-50">
              <SelectItem value="Neuf">Neuf</SelectItem>
              <SelectItem value="Rénové">Rénové</SelectItem>
              <SelectItem value="Bon état">Bon état</SelectItem>
              <SelectItem value="À rénover">À rénover</SelectItem>
              <SelectItem value="À démolir">À démolir</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Prix minimum */}
        <div className="space-y-2">
          <label className="text-white text-sm font-medium block">Prix min (DZD)</label>
          <Input
            type="number"
            placeholder="Prix minimum"
            value={filters.minPrice}
            onChange={(e) => handleFilterChange("minPrice", e.target.value)}
            className="bg-white border-0 h-12 text-slate-800"
          />
        </div>

        {/* Prix maximum */}
        <div className="space-y-2">
          <label className="text-white text-sm font-medium block">Prix max (DZD)</label>
          <Input
            type="number"
            placeholder="Prix maximum"
            value={filters.maxPrice}
            onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
            className="bg-white border-0 h-12 text-slate-800"
          />
        </div>

        {/* Bouton Rechercher */}
        <div className="mt-6">
          <Button
            onClick={handleSearch}
            className="bg-amber-500 hover:bg-amber-600 text-white h-12 w-full font-medium"
          >
            Rechercher
          </Button>
        </div>
      </div>

      {/* Filtres avancés */}
      <div className="mt-6">
        <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
          <CollapsibleTrigger asChild>
            <Button
              variant="outline"
              className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20 flex items-center justify-between"
            >
              <span>Filtres avancés</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4 space-y-4">
            {/* Boutons de catégories en ligne */}
            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                onClick={() => setShowCaracteristiques(!showCaracteristiques)}
                className={`bg-white/10 border-white/20 text-white hover:bg-white/20 ${showCaracteristiques ? 'bg-amber-500 hover:bg-amber-600' : ''}`}
              >
                Caractéristiques
                <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${showCaracteristiques ? 'rotate-180' : ''}`} />
              </Button>
              
              <Button
                variant="outline"
                onClick={() => setShowCommodites(!showCommodites)}
                className={`bg-white/10 border-white/20 text-white hover:bg-white/20 ${showCommodites ? 'bg-amber-500 hover:bg-amber-600' : ''}`}
              >
                Commodités
                <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${showCommodites ? 'rotate-180' : ''}`} />
              </Button>
              
              <Button
                variant="outline"
                onClick={() => setShowSecurite(!showSecurite)}
                className={`bg-white/10 border-white/20 text-white hover:bg-white/20 ${showSecurite ? 'bg-amber-500 hover:bg-amber-600' : ''}`}
              >
                Sécurité & Accessibilité
                <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${showSecurite ? 'rotate-180' : ''}`} />
              </Button>
              
              <Button
                variant="outline"
                onClick={() => setShowDocuments(!showDocuments)}
                className={`bg-white/10 border-white/20 text-white hover:bg-white/20 ${showDocuments ? 'bg-amber-500 hover:bg-amber-600' : ''}`}
              >
                Documents Associés
                <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${showDocuments ? 'rotate-180' : ''}`} />
              </Button>
              
              <Button
                variant="outline"
                onClick={() => setShowProximite(!showProximite)}
                className={`bg-white/10 border-white/20 text-white hover:bg-white/20 ${showProximite ? 'bg-amber-500 hover:bg-amber-600' : ''}`}
              >
                Proximité
                <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${showProximite ? 'rotate-180' : ''}`} />
              </Button>
              
              <Button
                variant="outline"
                onClick={() => setShowVue(!showVue)}
                className={`bg-white/10 border-white/20 text-white hover:bg-white/20 ${showVue ? 'bg-amber-500 hover:bg-amber-600' : ''}`}
              >
                Vue
                <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${showVue ? 'rotate-180' : ''}`} />
              </Button>
              
              <Button
                variant="outline"
                onClick={() => setShowPrixM2(!showPrixM2)}
                className={`bg-white/10 border-white/20 text-white hover:bg-white/20 ${showPrixM2 ? 'bg-amber-500 hover:bg-amber-600' : ''}`}
              >
                Prix au m²
                <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${showPrixM2 ? 'rotate-180' : ''}`} />
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
                  {["École", "Transport public", "Commerces", "Hôpital", "Pharmacie", "Banque", "Restaurant", "Parc", "Mosque", "Université", "Aéroport", "Plage"].map((proximite) => (
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

            {/* Filtres Prix au m² */}
            {showPrixM2 && (
              <div className="border border-white/20 rounded-lg p-4 bg-white/5">
                <h4 className="text-white font-medium mb-3">Prix au m²</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-white text-sm font-medium block">Prix min/m² (DZD)</label>
                    <Input
                      type="number"
                      placeholder="Min"
                      value={filters.minPrixM2}
                      onChange={(e) => handleFilterChange("minPrixM2", e.target.value)}
                      className="bg-white border-0 h-10 text-slate-800"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-white text-sm font-medium block">Prix max/m² (DZD)</label>
                    <Input
                      type="number"
                      placeholder="Max"
                      value={filters.maxPrixM2}
                      onChange={(e) => handleFilterChange("maxPrixM2", e.target.value)}
                      className="bg-white border-0 h-10 text-slate-800"
                    />
                  </div>
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
    </div>
  );
};

export default PropertyFilters;