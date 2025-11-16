import { SearchX, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  title?: string;
  description?: string;
  onReset?: () => void;
  resetLabel?: string;
}

export const EmptyState = ({ 
  title = "Aucun bien trouvé", 
  description = "Essayez de modifier vos filtres pour voir plus de résultats.",
  onReset,
  resetLabel = "Réinitialiser les filtres"
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="rounded-full bg-muted p-6 mb-4">
        <SearchX className="h-12 w-12 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-foreground">{title}</h3>
      <p className="text-muted-foreground text-center max-w-md mb-6">
        {description}
      </p>
      {onReset && (
        <Button 
          onClick={onReset}
          variant="outline"
          className="gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          {resetLabel}
        </Button>
      )}
    </div>
  );
};

