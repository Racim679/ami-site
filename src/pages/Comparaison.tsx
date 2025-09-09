import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Trash2, BarChart3, X } from "lucide-react";
import Header from "@/components/Header";
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

const Comparaison: React.FC = () => {
  const navigate = useNavigate();
  const [comparisonItems, setComparisonItems] = useState<Property[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('comparison') || '[]');
    setComparisonItems(stored);
  }, []);

  const removeFromComparison = (propertyId: string) => {
    const newComparison = comparisonItems.filter(item => item.id !== propertyId);
    setComparisonItems(newComparison);
    localStorage.setItem('comparison', JSON.stringify(newComparison));
  };

  const clearComparison = () => {
    setComparisonItems([]);
    localStorage.removeItem('comparison');
  };

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

  const comparisonFields = [
    { key: 'image', label: 'Photo', type: 'image' },
    { key: 'title', label: 'Titre', type: 'text' },
    { key: 'price', label: 'Prix', type: 'price' },
    { key: 'location', label: 'Localisation', type: 'text' },
    { key: 'type', label: 'Typologie', type: 'text' },
    { key: 'status', label: 'Statut', type: 'text' },
    { key: 'etat', label: 'État', type: 'text' },
    { key: 'surface', label: 'Surface', type: 'text' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
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
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 border-b">
                      Critères
                    </th>
                    {comparisonItems.map((property) => (
                      <th key={property.id} className="px-4 py-3 text-center text-sm font-medium text-gray-900 border-b min-w-[200px]">
                        <div className="relative">
                          <button
                            onClick={() => removeFromComparison(property.id)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                          <img
                            src={property.image}
                            alt={property.title}
                            className="w-full h-32 object-cover rounded-lg mb-2"
                          />
                          <p className="font-semibold text-sm">{property.title}</p>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonFields.map((field) => (
                    <tr key={field.key} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 bg-gray-50">
                        {field.label}
                      </td>
                      {comparisonItems.map((property) => (
                        <td key={`${property.id}-${field.key}`} className="px-4 py-3 text-sm text-gray-900 text-center">
                          {field.type === 'image' ? (
                            <img
                              src={property[field.key as keyof Property] as string}
                              alt={property.title}
                              className="w-16 h-16 object-cover rounded mx-auto"
                            />
                          ) : field.type === 'price' ? (
                            <span className="font-semibold text-green-600">
                              {formatPrice(property.price)}
                            </span>
                          ) : (
                            <span>{property[field.key as keyof Property] as string || 'N/A'}</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="mt-8 flex justify-center gap-4">
          <Button
            variant="outline"
            onClick={() => navigate('/nos-biens')}
          >
            Ajouter d'autres biens
          </Button>
          <Button
            onClick={() => navigate('/contact')}
          >
            Demander un conseil
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Comparaison; 