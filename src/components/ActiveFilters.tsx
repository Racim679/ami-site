import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FilterState } from "./PropertyFilters";

interface ActiveFiltersProps {
  filters: FilterState;
  onRemoveFilter: (key: keyof FilterState, value?: string) => void;
  onResetAll: () => void;
}

export const ActiveFilters = ({ filters, onRemoveFilter, onResetAll }: ActiveFiltersProps) => {
  const getFilterLabel = (key: keyof FilterState, value: string): string => {
    const labels: Record<string, string> = {
      typeOffre: "Type d'offre",
      type: "Type",
      etat: "État",
      localite: "Localité",
      minPrice: "Prix min",
      maxPrice: "Prix max",
      minSurface: "Surface min",
      maxSurface: "Surface max",
      chambres: "Chambres",
      sallesBain: "Salles de bain",
      etages: "Étages",
      vue: "Vue"
    };
    return labels[key] || key;
  };

  const activeFilters: Array<{ key: keyof FilterState; label: string; value: string }> = [];

  // Filtres simples
  Object.entries(filters).forEach(([key, value]) => {
    if (key === 'commodites' || key === 'securite' || key === 'documents' || key === 'proximite') {
      return; // Gérés séparément
    }
    if (value && value !== "" && typeof value === 'string') {
      activeFilters.push({
        key: key as keyof FilterState,
        label: getFilterLabel(key as keyof FilterState, value),
        value: value
      });
    }
  });

  // Filtres de prix et surface
  if (filters.minPrice) {
    activeFilters.push({
      key: 'minPrice',
      label: `Prix min: ${parseInt(filters.minPrice).toLocaleString('fr-FR')} DA`,
      value: filters.minPrice
    });
  }
  if (filters.maxPrice) {
    activeFilters.push({
      key: 'maxPrice',
      label: `Prix max: ${parseInt(filters.maxPrice).toLocaleString('fr-FR')} DA`,
      value: filters.maxPrice
    });
  }
  if (filters.minSurface) {
    activeFilters.push({
      key: 'minSurface',
      label: `Surface min: ${filters.minSurface} m²`,
      value: filters.minSurface
    });
  }
  if (filters.maxSurface) {
    activeFilters.push({
      key: 'maxSurface',
      label: `Surface max: ${filters.maxSurface} m²`,
      value: filters.maxSurface
    });
  }

  // Filtres array (commodités, sécurité, etc.)
  filters.commodites.forEach(item => {
    activeFilters.push({
      key: 'commodites',
      label: item,
      value: item
    });
  });
  filters.securite.forEach(item => {
    activeFilters.push({
      key: 'securite',
      label: item,
      value: item
    });
  });
  filters.documents.forEach(item => {
    activeFilters.push({
      key: 'documents',
      label: item,
      value: item
    });
  });
  filters.proximite.forEach(item => {
    activeFilters.push({
      key: 'proximite',
      label: item,
      value: item
    });
  });

  if (activeFilters.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      <span className="text-sm text-muted-foreground mr-2">Filtres actifs:</span>
      {activeFilters.map((filter, index) => (
        <Button
          key={`${filter.key}-${index}`}
          variant="secondary"
          size="sm"
          className="h-7 text-xs"
          onClick={() => onRemoveFilter(filter.key, filter.value)}
        >
          {filter.label}
          <X className="ml-1 h-3 w-3" />
        </Button>
      ))}
      {activeFilters.length > 1 && (
        <Button
          variant="ghost"
          size="sm"
          className="h-7 text-xs text-muted-foreground hover:text-foreground"
          onClick={onResetAll}
        >
          Tout effacer
        </Button>
      )}
    </div>
  );
};

