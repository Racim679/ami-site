import React, { useState, useEffect } from "react";
import { MapPin, TrendingUp, Calculator, Info } from "lucide-react";

interface NeighborhoodData {
  name: string;
  avgPricePerSqm: number;
  minPrice: number;
  maxPrice: number;
  trend: 'up' | 'down' | 'stable';
  description: string;
}

interface PropertyEstimate {
  estimatedPrice: number;
  priceRange: {
    min: number;
    max: number;
  };
  pricePerSqm: number;
  confidence: number;
}

const PriceEstimator: React.FC = () => {
  const [selectedNeighborhood, setSelectedNeighborhood] = useState("");
  const [surface, setSurface] = useState(80);
  const [propertyType, setPropertyType] = useState("appartement");
  const [condition, setCondition] = useState("bon");
  const [estimate, setEstimate] = useState<PropertyEstimate | null>(null);

  // Données fictives des quartiers
  const neighborhoods: NeighborhoodData[] = [
    {
      name: "Bab El Oued",
      avgPricePerSqm: 2800,
      minPrice: 2500,
      maxPrice: 3200,
      trend: 'up',
      description: "Quartier populaire en pleine rénovation, proche de la mer"
    },
    {
      name: "El Madania",
      avgPricePerSqm: 4200,
      minPrice: 3800,
      maxPrice: 4800,
      trend: 'stable',
      description: "Quartier résidentiel calme, bien desservi"
    },
    {
      name: "Hydra",
      avgPricePerSqm: 5800,
      minPrice: 5200,
      maxPrice: 6500,
      trend: 'up',
      description: "Quartier huppé avec vue panoramique"
    },
    {
      name: "El Khroub",
      avgPricePerSqm: 2200,
      minPrice: 1900,
      maxPrice: 2600,
      trend: 'up',
      description: "Zone en développement, prix abordables"
    },
    {
      name: "Bir El Djir",
      avgPricePerSqm: 3100,
      minPrice: 2800,
      maxPrice: 3500,
      trend: 'stable',
      description: "Quartier moderne, bien équipé"
    },
    {
      name: "Belgaid",
      avgPricePerSqm: 3400,
      minPrice: 3000,
      maxPrice: 3800,
      trend: 'up',
      description: "Zone résidentielle en expansion"
    }
  ];

  const calculateEstimate = () => {
    if (!selectedNeighborhood) return;

    const neighborhood = neighborhoods.find(n => n.name === selectedNeighborhood);
    if (!neighborhood) return;

    // Facteurs de correction selon le type de bien
    const typeMultiplier = {
      appartement: 1.0,
      maison: 1.15,
      villa: 1.3,
      studio: 0.9
    };

    // Facteurs de correction selon l'état
    const conditionMultiplier = {
      excellent: 1.2,
      bon: 1.0,
      moyen: 0.85,
      à_renover: 0.7
    };

    // Calcul du prix de base
    let basePricePerSqm = neighborhood.avgPricePerSqm;
    basePricePerSqm *= typeMultiplier[propertyType as keyof typeof typeMultiplier];
    basePricePerSqm *= conditionMultiplier[condition as keyof typeof conditionMultiplier];

    // Calcul du prix estimé
    const estimatedPrice = basePricePerSqm * surface;

    // Calcul de la fourchette de prix
    const priceRange = {
      min: neighborhood.minPrice * surface * 0.9,
      max: neighborhood.maxPrice * surface * 1.1
    };

    // Calcul du niveau de confiance
    let confidence = 85;
    if (surface < 30 || surface > 200) confidence -= 10;
    if (condition === 'à_renover') confidence -= 15;

    setEstimate({
      estimatedPrice,
      priceRange,
      pricePerSqm: basePricePerSqm,
      confidence: Math.max(confidence, 60)
    });
  };

  useEffect(() => {
    if (selectedNeighborhood) {
      calculateEstimate();
    }
  }, [selectedNeighborhood, surface, propertyType, condition]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down':
        return <TrendingUp className="w-4 h-4 text-red-600 transform rotate-180" />;
      default:
        return <TrendingUp className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center gap-2 mb-6">
        <Calculator className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-800">Estimateur de Prix Immobilier</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Formulaire */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quartier
            </label>
            <select
              value={selectedNeighborhood}
              onChange={(e) => setSelectedNeighborhood(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Sélectionnez un quartier</option>
              {neighborhoods.map((neighborhood) => (
                <option key={neighborhood.name} value={neighborhood.name}>
                  {neighborhood.name}
                </option>
              ))}
            </select>
          </div>

          {selectedNeighborhood && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-blue-600" />
                <h4 className="font-medium text-blue-800">{selectedNeighborhood}</h4>
                {getTrendIcon(neighborhoods.find(n => n.name === selectedNeighborhood)?.trend || 'stable')}
              </div>
              <p className="text-sm text-blue-700">
                {neighborhoods.find(n => n.name === selectedNeighborhood)?.description}
              </p>
              <p className="text-sm text-blue-600 mt-2">
                Prix moyen au m² : {formatCurrency(neighborhoods.find(n => n.name === selectedNeighborhood)?.avgPricePerSqm || 0)}
              </p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Surface (m²)
            </label>
            <input
              type="number"
              value={surface}
              onChange={(e) => setSurface(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="20"
              max="500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type de bien
            </label>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="appartement">Appartement</option>
              <option value="maison">Maison</option>
              <option value="villa">Villa</option>
              <option value="studio">Studio</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              État du bien
            </label>
            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="excellent">Excellent</option>
              <option value="bon">Bon</option>
              <option value="moyen">Moyen</option>
              <option value="à_renover">À rénover</option>
            </select>
          </div>
        </div>

        {/* Résultats */}
        <div className="space-y-6">
          {estimate ? (
            <>
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Estimation de prix</h3>

                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Prix estimé</p>
                    <p className="text-3xl font-bold text-green-600">
                      {formatCurrency(estimate.estimatedPrice)}
                    </p>
                  </div>

                  <div className="border-t pt-4">
                    <p className="text-sm text-gray-600 mb-2">Fourchette de prix</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {formatCurrency(estimate.priceRange.min)} - {formatCurrency(estimate.priceRange.max)}
                    </p>
                  </div>

                  <div className="border-t pt-4">
                    <p className="text-sm text-gray-600 mb-2">Prix au m²</p>
                    <p className="text-lg font-semibold text-blue-600">
                      {formatCurrency(estimate.pricePerSqm)}
                    </p>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Niveau de confiance</span>
                      <span className="text-sm font-medium text-gray-800">{estimate.confidence}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${estimate.confidence}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="flex items-start gap-2">
                  <Info className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-800 mb-1">Information</h4>
                    <p className="text-sm text-yellow-700">
                      Cette estimation est basée sur les données du marché local.
                      Pour une évaluation précise, contactez un professionnel de l'immobilier.
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <Calculator className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">
                Sélectionnez un quartier pour obtenir une estimation de prix
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PriceEstimator; 