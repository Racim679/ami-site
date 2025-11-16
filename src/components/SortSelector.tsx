import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowUpDown } from "lucide-react";

export type SortOption = 
  | "date-desc"
  | "date-asc"
  | "price-asc"
  | "price-desc"
  | "surface-asc"
  | "surface-desc";

interface SortSelectorProps {
  value: SortOption;
  onValueChange: (value: SortOption) => void;
  className?: string;
}

export const SortSelector = ({ value, onValueChange, className = "" }: SortSelectorProps) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Trier par" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="date-desc">Plus récent</SelectItem>
          <SelectItem value="date-asc">Plus ancien</SelectItem>
          <SelectItem value="price-asc">Prix croissant</SelectItem>
          <SelectItem value="price-desc">Prix décroissant</SelectItem>
          <SelectItem value="surface-asc">Surface croissante</SelectItem>
          <SelectItem value="surface-desc">Surface décroissante</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

