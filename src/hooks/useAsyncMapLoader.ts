import { useState, useCallback } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { supabase } from '@/integrations/supabase/client';

interface MapLoaderState {
  mapLoaded: boolean;
  mapError: string | null;
  mapLoadingProgress: number;
  isLoading: boolean;
}

interface MapLoaderAPI {
  initializeMap: (container: HTMLDivElement) => Promise<google.maps.Map | null>;
  retryMapLoad: () => void;
  state: MapLoaderState;
}

// Cache pour l'API key Google Maps
const getCachedApiKey = () => localStorage.getItem('google_maps_api_key');
const setCachedApiKey = (key: string) => localStorage.setItem('google_maps_api_key', key);
const clearCachedApiKey = () => localStorage.removeItem('google_maps_api_key');

export const useAsyncMapLoader = (): MapLoaderAPI => {
  const [state, setState] = useState<MapLoaderState>({
    mapLoaded: false,
    mapError: null,
    mapLoadingProgress: 0,
    isLoading: false,
  });

  const updateState = useCallback((updates: Partial<MapLoaderState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  const initializeMap = useCallback(async (container: HTMLDivElement): Promise<google.maps.Map | null> => {
    if (!container) return null;

    try {
      updateState({ isLoading: true, mapError: null, mapLoadingProgress: 10 });

      // Vérifier le cache d'abord
      let apiKey = getCachedApiKey();
      
      if (!apiKey) {
        updateState({ mapLoadingProgress: 30 });
        console.log('API key not cached, fetching from edge function...');
        
        // Timeout pour l'appel à la fonction edge (5 secondes)
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Timeout: Impossible de récupérer la clé API')), 5000)
        );
        
        const apiCallPromise = supabase.functions.invoke('google-maps-config');
        
        const { data: configData, error: configError } = await Promise.race([
          apiCallPromise,
          timeoutPromise
        ]) as any;
        
        if (configError) {
          clearCachedApiKey();
          throw new Error(`Erreur de fonction edge: ${configError.message || 'Erreur inconnue'}`);
        }
        
        if (!configData?.apiKey) {
          clearCachedApiKey();
          throw new Error('Clé API Google Maps non trouvée');
        }

        apiKey = configData.apiKey;
        setCachedApiKey(apiKey);
        console.log('API key retrieved and cached successfully');
      } else {
        console.log('Using cached API key');
      }

      updateState({ mapLoadingProgress: 60 });

      // Timeout pour le chargement de Google Maps (10 secondes)
      const loader = new Loader({
        apiKey,
        version: 'weekly',
      });

      const mapLoadTimeout = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout: Chargement de Google Maps trop lent')), 10000)
      );

      await Promise.race([loader.load(), mapLoadTimeout]);
      updateState({ mapLoadingProgress: 90 });

      const map = new google.maps.Map(container, {
        center: { lat: 36.7538, lng: 3.0588 },
        zoom: 11,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [
          {
            featureType: 'poi',
            stylers: [{ visibility: 'off' }]
          }
        ]
      });

      updateState({ 
        mapLoadingProgress: 100, 
        mapLoaded: true, 
        isLoading: false 
      });
      
      console.log('Google Maps loaded successfully');
      return map;
      
    } catch (error) {
      console.error('Erreur lors de l\'initialisation de Google Maps:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
      
      updateState({ 
        mapError: errorMessage, 
        isLoading: false,
        mapLoadingProgress: 0 
      });
      
      // En cas d'erreur de timeout, nettoyer le cache
      if (error instanceof Error && error.message.includes('Timeout')) {
        clearCachedApiKey();
      }
      
      return null;
    }
  }, [updateState]);

  const retryMapLoad = useCallback(() => {
    clearCachedApiKey();
    setState({
      mapLoaded: false,
      mapError: null,
      mapLoadingProgress: 0,
      isLoading: false,
    });
  }, []);

  return {
    initializeMap,
    retryMapLoad,
    state,
  };
};