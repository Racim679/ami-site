import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
}

const PropertyFilters = ({ onSearch, className = "" }: PropertyFiltersProps) => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<FilterState>({
    typeOffre: "",
    type: "",
    etat: "",
    localite: "",
    minPrice: "",
    maxPrice: ""
  });

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onSearch?.(newFilters);
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
    const resetState = {
      typeOffre: "",
      type: "",
      etat: "",
      localite: "",
      minPrice: "",
      maxPrice: ""
    };
    setFilters(resetState);
    onSearch?.(resetState);
  };

  return (
    <div className={`bg-emerald-700 p-6 rounded-lg ${className}`}>
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
              <SelectItem value="à vendre">À vendre</SelectItem>
              <SelectItem value="fondu">Fondu</SelectItem>
              <SelectItem value="alloué">Alloué</SelectItem>
              <SelectItem value="loué">Loué</SelectItem>
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
              <SelectItem value="neuf">Neuf</SelectItem>
              <SelectItem value="rénové">Rénové</SelectItem>
              <SelectItem value="bon état">Bon état</SelectItem>
              <SelectItem value="à rénover">À rénover</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Prix minimum */}
        <div className="space-y-2">
          <label className="text-white text-sm font-medium block">Prix min (€)</label>
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
          <label className="text-white text-sm font-medium block">Prix max (€)</label>
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
    </div>
  );
};

export default PropertyFilters;