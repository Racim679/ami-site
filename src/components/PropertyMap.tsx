import React, { useEffect, useState, useRef, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { AlertTriangle, RefreshCw, MapPin } from 'lucide-react';
import { useAsyncMapLoader } from '@/hooks/useAsyncMapLoader';
import { useOptimizedMarkers } from '@/hooks/useOptimizedMarkers';
import ProgressiveLoading from '@/components/ProgressiveLoading';
import FallbackMapView from '@/components/FallbackMapView';

interface Property {
  id: string;
  title: string;
  status: string;
  latitude: number;
  longitude: number;
  surface_m2?: number;
  prix_dinar?: number;
  image_url?: string;
  locality_id?: string;
  typology_id?: string;
  locality?: {
    name: string;
  };
  typology?: {
    label: string;
  };
}

// Composant optimisé avec React.memo
const PropertyMap: React.FC = React.memo(() => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [showFallback, setShowFallback] = useState(false);
  
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<google.maps.Map | null>(null);
  const { toast } = useToast();
  
  // Utilisation des hooks optimisés
  const { initializeMap, retryMapLoad, state } = useAsyncMapLoader();
  const { updateMarkers, clearAllMarkers } = useOptimizedMarkers(map.current);

  // Fetch properties de manière optimisée avec mise en cache
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        console.log('Fetching properties from database...');
        const { data, error } = await supabase
          .from('properties')
          .select(`
            id, title, status, latitude, longitude, surface_m2, prix_dinar, image_url,
            locality:localities(name),
            typology:typologies(label)
          `)
          .not('latitude', 'is', null)
          .not('longitude', 'is', null)
          .order('created_at', { ascending: false })
          .limit(50);

        if (error) throw error;
        
        console.log('Properties fetched successfully:', data?.length);
        const propertyData = data || [];
        setProperties(propertyData);
        setFilteredProperties(propertyData);
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les données des propriétés",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [toast]);

  // Filter properties de manière optimisée
  const filteredPropertiesMemo = useMemo(() => {
    if (selectedStatus === 'all') {
      return properties;
    }
    return properties.filter(property => property.status === selectedStatus);
  }, [selectedStatus, properties]);

  useEffect(() => {
    setFilteredProperties(filteredPropertiesMemo);
  }, [filteredPropertiesMemo]);

  // Initialisation asynchrone et intelligente de la carte
  useEffect(() => {
    let isMounted = true;
    
    const setupMap = async () => {
      if (!mapContainer.current || map.current) return;
      
      const newMap = await initializeMap(mapContainer.current);
      if (isMounted && newMap) {
        map.current = newMap;
        console.log('Map initialized successfully');
      }
    };

    setupMap();
    
    return () => {
      isMounted = false;
    };
  }, [initializeMap]);

  // Mise à jour optimisée des marqueurs
  useEffect(() => {
    if (!map.current || !state.mapLoaded) return;
    
    console.log('Updating markers for properties:', filteredProperties.length);
    updateMarkers(filteredProperties);
  }, [filteredProperties, state.mapLoaded, updateMarkers]);

  // Nettoyage lors du démontage
  useEffect(() => {
    return () => {
      clearAllMarkers();
    };
  }, [clearAllMarkers]);

  // Calcul optimisé des statuts uniques
  const uniqueStatuses = useMemo(() => {
    return [...new Set(properties.map(p => p.status))];
  }, [properties]);

  const handleRetryMapLoad = () => {
    setShowFallback(false);
    retryMapLoad();
    // Force re-render en réinitialisant la référence
    map.current = null;
  };

  const handleShowFallback = () => {
    setShowFallback(true);
  };

  // Mode dégradé ou chargement progressif
  if (showFallback) {
    return (
      <FallbackMapView 
        properties={filteredProperties}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        uniqueStatuses={uniqueStatuses}
      />
    );
  }

  if (loading) {
    return (
      <ProgressiveLoading 
        dataLoading={loading}
        dataLoaded={!loading}
        mapLoadingProgress={state.mapLoadingProgress}
        isMapLoading={state.isLoading}
        propertiesCount={properties.length}
      />
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Carte Interactive des Biens Immobiliers</CardTitle>
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium">Filtrer par status:</label>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sélectionner un status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les status</SelectItem>
              {uniqueStatuses.map(status => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {!loading && (
          <ProgressiveLoading 
            dataLoading={false}
            dataLoaded={true}
            mapLoadingProgress={state.mapLoadingProgress}
            isMapLoading={state.isLoading}
            propertiesCount={filteredProperties.length}
          />
        )}
        
        {state.mapError ? (
          <div className="h-96 w-full rounded-lg bg-muted flex items-center justify-center">
            <div className="text-center max-w-md">
              <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Erreur de chargement de la carte</h3>
              <p className="text-sm text-muted-foreground mb-4">{state.mapError}</p>
              <div className="flex gap-2 justify-center">
                <Button onClick={handleRetryMapLoad} variant="outline" className="gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Réessayer
                </Button>
                <Button onClick={handleShowFallback} variant="secondary" className="gap-2">
                  <MapPin className="h-4 w-4" />
                  Mode Liste
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Vous pouvez utiliser le mode liste pour voir les propriétés avec des liens vers des cartes externes
              </p>
            </div>
          </div>
        ) : !state.mapLoaded && !loading ? (
          <ProgressiveLoading 
            dataLoading={false}
            dataLoaded={true}
            mapLoadingProgress={state.mapLoadingProgress}
            isMapLoading={state.isLoading}
            propertiesCount={filteredProperties.length}
          />
        ) : null}
        
        <div 
          ref={mapContainer} 
          className={`w-full h-96 rounded-lg overflow-hidden ${!state.mapLoaded ? 'hidden' : ''}`}
        />
        
        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            {filteredProperties.length} bien(s) affiché(s) sur la carte
            {filteredProperties.length > 0 && " • Cliquez sur un marqueur pour plus d'informations"}
          </div>
          {state.mapLoaded && (
            <Button 
              onClick={handleShowFallback} 
              variant="ghost" 
              size="sm" 
              className="text-xs"
            >
              Voir en mode liste
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
});

PropertyMap.displayName = 'PropertyMap';

export default PropertyMap;