import React, { useEffect, useState, useRef, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { useAsyncMapLoader } from '@/hooks/useAsyncMapLoader';
import { useOptimizedMarkers } from '@/hooks/useOptimizedMarkers';

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
    retryMapLoad();
    // Force re-render en réinitialisant la référence
    map.current = null;
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Chargement des données...</div>
        </CardContent>
      </Card>
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
        {state.mapError ? (
          <div className="h-96 w-full rounded-lg bg-muted flex items-center justify-center">
            <div className="text-center max-w-md">
              <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Erreur de chargement</h3>
              <p className="text-sm text-muted-foreground mb-4">{state.mapError}</p>
              <Button onClick={handleRetryMapLoad} variant="outline" className="gap-2">
                <RefreshCw className="h-4 w-4" />
                Réessayer
              </Button>
            </div>
          </div>
        ) : !state.mapLoaded ? (
          <div className="h-96 w-full rounded-lg bg-muted flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
              <div className="w-48 bg-muted-foreground/20 rounded-full h-2 mx-auto mb-3">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${state.mapLoadingProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-muted-foreground">
                {state.mapLoadingProgress < 30 ? 'Initialisation...' :
                 state.mapLoadingProgress < 60 ? 'Récupération de la configuration...' :
                 state.mapLoadingProgress < 90 ? 'Chargement de Google Maps...' :
                 'Finalisation...'}
              </p>
            </div>
          </div>
        ) : null}
        <div 
          ref={mapContainer} 
          className={`w-full h-96 rounded-lg overflow-hidden ${!state.mapLoaded ? 'hidden' : ''}`}
        />
        <div className="mt-4 text-sm text-muted-foreground">
          {filteredProperties.length} bien(s) affiché(s) sur la carte
          {filteredProperties.length > 0 && " • Cliquez sur un marqueur pour plus d'informations"}
        </div>
      </CardContent>
    </Card>
  );
});

PropertyMap.displayName = 'PropertyMap';

export default PropertyMap;