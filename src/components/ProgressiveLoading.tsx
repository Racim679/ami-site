import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { MapPin, Database, Globe, CheckCircle } from 'lucide-react';

interface ProgressiveLoadingProps {
  dataLoading: boolean;
  dataLoaded: boolean;
  mapLoadingProgress: number;
  isMapLoading: boolean;
  propertiesCount?: number;
}

const ProgressiveLoading: React.FC<ProgressiveLoadingProps> = ({
  dataLoading,
  dataLoaded,
  mapLoadingProgress,
  isMapLoading,
  propertiesCount = 0
}) => {
  const getLoadingMessage = () => {
    if (dataLoading) return 'Chargement des données des propriétés...';
    if (!dataLoaded) return 'Préparation des données...';
    if (mapLoadingProgress < 30) return 'Initialisation de la carte...';
    if (mapLoadingProgress < 60) return 'Configuration de Google Maps...';
    if (mapLoadingProgress < 90) return 'Chargement des services de cartographie...';
    return 'Finalisation de l\'affichage...';
  };

  const getProgressPhase = () => {
    if (dataLoading) return 1;
    if (!dataLoaded) return 2;
    if (isMapLoading) return 3;
    return 4;
  };

  const currentPhase = getProgressPhase();

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* En-tête de chargement */}
          <div className="text-center">
            <MapPin className="h-12 w-12 text-primary mx-auto mb-4 animate-pulse" />
            <h3 className="text-lg font-semibold mb-2">Chargement de la Carte Interactive</h3>
            <p className="text-sm text-muted-foreground">{getLoadingMessage()}</p>
          </div>

          {/* Indicateurs de progression par phase */}
          <div className="space-y-4">
            {/* Phase 1: Chargement des données */}
            <div className="flex items-center gap-3">
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                currentPhase > 1 ? 'bg-green-100 text-green-600' : 
                currentPhase === 1 ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
              }`}>
                {currentPhase > 1 ? <CheckCircle className="h-4 w-4" /> : <Database className="h-4 w-4" />}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Données des propriétés</span>
                  {currentPhase > 1 && (
                    <span className="text-xs text-green-600">{propertiesCount} propriétés trouvées</span>
                  )}
                </div>
                {currentPhase === 1 && (
                  <div className="mt-1">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Phase 2: Configuration de la carte */}
            <div className="flex items-center gap-3">
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                currentPhase > 2 ? 'bg-green-100 text-green-600' : 
                currentPhase === 2 ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
              }`}>
                {currentPhase > 2 ? <CheckCircle className="h-4 w-4" /> : <Globe className="h-4 w-4" />}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Google Maps</span>
                  {currentPhase === 3 && (
                    <span className="text-xs text-blue-600">{mapLoadingProgress}%</span>
                  )}
                </div>
                {currentPhase === 3 && (
                  <div className="mt-1">
                    <Progress value={mapLoadingProgress} className="h-2" />
                  </div>
                )}
              </div>
            </div>

            {/* Phase 3: Affichage des marqueurs */}
            <div className="flex items-center gap-3">
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                currentPhase > 3 ? 'bg-green-100 text-green-600' : 
                currentPhase === 3 ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
              }`}>
                {currentPhase > 3 ? <CheckCircle className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}
              </div>
              <div className="flex-1">
                <span className="text-sm font-medium">Marqueurs et interactions</span>
              </div>
            </div>
          </div>

          {/* Preview des données pendant le chargement */}
          {dataLoaded && propertiesCount > 0 && currentPhase < 4 && (
            <div className="bg-muted/50 rounded-lg p-4">
              <h4 className="text-sm font-medium mb-3">Aperçu des propriétés à afficher :</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {Array.from({ length: Math.min(4, propertiesCount) }).map((_, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-4 flex-1" />
                  </div>
                ))}
              </div>
              {propertiesCount > 4 && (
                <p className="text-xs text-muted-foreground mt-2">
                  ...et {propertiesCount - 4} autres propriétés
                </p>
              )}
            </div>
          )}

          {/* Skeleton de la carte */}
          <Skeleton className="h-96 w-full rounded-lg" />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressiveLoading;