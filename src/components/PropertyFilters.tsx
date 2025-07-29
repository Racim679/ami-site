import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface PropertyFiltersProps {
  onSearch?: (filters: FilterState) => void;
  className?: string;
}

export interface FilterState {
  keyword: string;
  typeOffre: string;
  type: string;
  etat: string;
  prixMin: string;
  prixMax: string;
}

const PropertyFilters = ({ onSearch, className = "" }: PropertyFiltersProps) => {
  const [filters, setFilters] = useState<FilterState>({
    keyword: "",
    typeOffre: "",
    type: "",
    etat: "",
    prixMin: "",
    prixMax: ""
  });

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onSearch?.(newFilters);
  };

  const handleSearch = () => {
    onSearch?.(filters);
  };

  const resetFilters = () => {
    const resetState = {
      keyword: "",
      typeOffre: "",
      type: "",
      etat: "",
      prixMin: "",
      prixMax: ""
    };
    setFilters(resetState);
    onSearch?.(resetState);
  };

  return (
    <div className={`bg-slate-800 p-6 rounded-xl shadow-lg ${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 items-end">
        {/* Mot-clé */}
        <div className="space-y-2">
          <label className="text-white text-sm font-medium block">Mot-clé</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Rechercher par mot-clé"
              value={filters.keyword}
              onChange={(e) => handleFilterChange("keyword", e.target.value)}
              className="bg-white border-0 h-12 pl-10 text-slate-800"
            />
          </div>
        </div>

        {/* Type d'offre */}
        <div className="space-y-2">
          <label className="text-white text-sm font-medium block">Type d'offre</label>
          <Select value={filters.typeOffre} onValueChange={(value) => handleFilterChange("typeOffre", value)}>
            <SelectTrigger className="bg-white border-0 h-12 text-slate-800">
              <SelectValue placeholder="Type d'offre" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="à vendre">À vendre</SelectItem>
              <SelectItem value="fondu">Fondu</SelectItem>
              <SelectItem value="alloué">Alloué</SelectItem>
              <SelectItem value="loué">Loué</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Type */}
        <div className="space-y-2">
          <label className="text-white text-sm font-medium block">Type</label>
          <Select value={filters.type} onValueChange={(value) => handleFilterChange("type", value)}>
            <SelectTrigger className="bg-white border-0 h-12 text-slate-800">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent className="max-h-60">
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

        {/* État */}
        <div className="space-y-2">
          <label className="text-white text-sm font-medium block">État</label>
          <Select value={filters.etat} onValueChange={(value) => handleFilterChange("etat", value)}>
            <SelectTrigger className="bg-white border-0 h-12 text-slate-800">
              <SelectValue placeholder="État" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="neuf">Neuf</SelectItem>
              <SelectItem value="rénové">Rénové</SelectItem>
              <SelectItem value="bon état">Bon état</SelectItem>
              <SelectItem value="à rénover">À rénover</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Prix */}
        <div className="space-y-2">
          <label className="text-white text-sm font-medium block">Prix</label>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={filters.prixMin}
              onChange={(e) => handleFilterChange("prixMin", e.target.value)}
              className="bg-white border-0 h-12 text-slate-800"
            />
            <Input
              type="number"
              placeholder="Max"
              value={filters.prixMax}
              onChange={(e) => handleFilterChange("prixMax", e.target.value)}
              className="bg-white border-0 h-12 text-slate-800"
            />
          </div>
        </div>

        {/* Boutons */}
        <div className="flex gap-2 lg:flex-col">
          <Button 
            onClick={handleSearch}
            className="bg-amber-500 hover:bg-amber-600 text-white h-12 px-6 font-medium"
          >
            Rechercher
          </Button>
          <Button 
            onClick={resetFilters}
            variant="outline"
            className="bg-transparent border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white h-12 px-4"
          >
            Réinitialiser les filtres
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PropertyFilters;