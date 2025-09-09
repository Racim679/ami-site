import React, { useState, useEffect } from "react";
import { X, BarChart3, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";

interface Property {
  id: string;
  title: string;
  price: number;
  surface: number;
  location: string;
  image: string;
  type: string;
  status?: string;
  etat?: string;
}

interface ComparisonSystemProps {
  className?: string;
}

const ComparisonSystem: React.FC<ComparisonSystemProps> = ({ className = "" }) => {
  const [comparisonItems, setComparisonItems] = useState<Property[]>([]);
  const maxItems = 5;

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('comparison') || '[]');
    setComparisonItems(stored);
  }, []);

  const addToComparison = (property: Property) => {
    if (comparisonItems.length >= maxItems) {
      alert(`Vous ne pouvez comparer que ${maxItems} biens maximum.`);
      return;
    }

    if (comparisonItems.some(item => item.id === property.id)) {
      alert('Ce bien est déjà dans la comparaison.');
      return;
    }

    const newComparison = [...comparisonItems, property];
    setComparisonItems(newComparison);
    localStorage.setItem('comparison', JSON.stringify(newComparison));
  };

  const removeFromComparison = (propertyId: string) => {
    const newComparison = comparisonItems.filter(item => item.id !== propertyId);
    setComparisonItems(newComparison);
    localStorage.setItem('comparison', JSON.stringify(newComparison));
  };

  const clearComparison = () => {
    setComparisonItems([]);
    localStorage.removeItem('comparison');
  };

  const isInComparison = (propertyId: string) => {
    return comparisonItems.some(item => item.id === propertyId);
  };

  if (comparisonItems.length === 0) {
    return null;
  }

  return (
    <div className={`fixed bottom-4 left-4 right-4 z-50 ${className}`}>
      <Card className="bg-white shadow-xl border-2 border-blue-200">
        <CardContent className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-gray-900">
                Comparaison ({comparisonItems.length}/{maxItems})
              </h3>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={clearComparison}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Vider
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  // Ouvrir la page de comparaison détaillée
                  window.open('/comparaison', '_blank');
                }}
              >
                Comparer
              </Button>
            </div>
          </div>

          {/* Liste des biens */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {comparisonItems.map((property) => (
              <div key={property.id} className="relative group">
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-20 object-cover"
                  />
                  <button
                    onClick={() => removeFromComparison(property.id)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
                <div className="mt-2 text-xs">
                  <p className="font-medium text-gray-900 truncate">{property.title}</p>
                  <p className="text-green-600 font-semibold">
                    {formatPrice(property.price)}
                  </p>
                  <p className="text-gray-600 truncate">{property.location}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Hook pour gérer la comparaison globalement
export const useComparison = () => {
  const [comparisonItems, setComparisonItems] = useState<Property[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('comparison') || '[]');
    setComparisonItems(stored);
  }, []);

  const addToComparison = (property: Property) => {
    if (comparisonItems.length >= 5) {
      alert('Vous ne pouvez comparer que 5 biens maximum.');
      return;
    }

    if (comparisonItems.some(item => item.id === property.id)) {
      alert('Ce bien est déjà dans la comparaison.');
      return;
    }

    const newComparison = [...comparisonItems, property];
    setComparisonItems(newComparison);
    localStorage.setItem('comparison', JSON.stringify(newComparison));
  };

  const removeFromComparison = (propertyId: string) => {
    const newComparison = comparisonItems.filter(item => item.id !== propertyId);
    setComparisonItems(newComparison);
    localStorage.setItem('comparison', JSON.stringify(newComparison));
  };

  const clearComparison = () => {
    setComparisonItems([]);
    localStorage.removeItem('comparison');
  };

  const isInComparison = (propertyId: string) => {
    return comparisonItems.some(item => item.id === propertyId);
  };

  return {
    comparisonItems,
    addToComparison,
    removeFromComparison,
    clearComparison,
    isInComparison
  };
};

export default ComparisonSystem; 