import React, { useEffect, useState, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { supabase } from '@/integrations/supabase/client';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, RefreshCw } from 'lucide-react';

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

// Cache pour l'API key Google Maps
const getCachedApiKey = () => localStorage.getItem('google_maps_api_key');
const setCachedApiKey = (key: string) => localStorage.setItem('google_maps_api_key', key);
const clearCachedApiKey = () => localStorage.removeItem('google_maps_api_key');

const PropertyMap: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  const [mapLoadingProgress, setMapLoadingProgress] = useState(0);
  
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<google.maps.Map | null>(null);
  const markers = useRef<google.maps.Marker[]>([]);
  const infoWindows = useRef<google.maps.InfoWindow[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Fetch properties from Supabase
  useEffect(() => {
    const fetchProperties = async () => {
      try {
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
        console.log('Properties fetched from database:', data);
        console.log('Number of properties:', data?.length);
        setProperties(data || []);
        setFilteredProperties(data || []);
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

  // Filter properties by status
  useEffect(() => {
    if (selectedStatus === 'all') {
      setFilteredProperties(properties);
    } else {
      setFilteredProperties(properties.filter(property => property.status === selectedStatus));
    }
  }, [selectedStatus, properties]);

  // Initialize Google Maps avec timeouts et cache
  useEffect(() => {
    const initializeMap = async () => {
      if (!mapContainer.current || map.current) return;

      try {
        setMapError(null);
        setMapLoadingProgress(10);
        console.log('Starting Google Maps initialization...');

        // Vérifier le cache d'abord
        let apiKey = getCachedApiKey();
        
        if (!apiKey) {
          setMapLoadingProgress(30);
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

        setMapLoadingProgress(60);

        // Timeout pour le chargement de Google Maps (10 secondes)
        const loader = new Loader({
          apiKey,
          version: 'weekly',
        });

        const mapLoadTimeout = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Timeout: Chargement de Google Maps trop lent')), 10000)
        );

        await Promise.race([loader.load(), mapLoadTimeout]);
        setMapLoadingProgress(90);

        map.current = new google.maps.Map(mapContainer.current, {
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

        setMapLoadingProgress(100);
        setMapLoaded(true);
        console.log('Google Maps loaded successfully');
      } catch (error) {
        console.error('Erreur lors de l\'initialisation de Google Maps:', error);
        setMapError(error instanceof Error ? error.message : 'Erreur inconnue');
        
        // En cas d'erreur de timeout, nettoyer le cache
        if (error instanceof Error && error.message.includes('Timeout')) {
          clearCachedApiKey();
        }
      }
    };

    initializeMap();
  }, []);

  // Update markers when filtered properties change
  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    // Remove existing markers and info windows
    markers.current.forEach(marker => marker.setMap(null));
    infoWindows.current.forEach(infoWindow => infoWindow.close());
    markers.current = [];
    infoWindows.current = [];

    // Add new markers
    console.log('Adding markers for properties:', filteredProperties);
    filteredProperties.forEach((property) => {
      const formatPrice = (price?: number) => {
        if (!price) return 'Prix sur demande';
        return new Intl.NumberFormat('fr-TN', {
          style: 'decimal',
          minimumFractionDigits: 0,
        }).format(price) + ' DT';
      };

      console.log('Creating marker for property:', property.title, 'at coordinates:', property.latitude, property.longitude);
      const marker = new google.maps.Marker({
        position: { lat: property.latitude, lng: property.longitude },
        map: map.current!,
        title: property.title,
        icon: {
          url: `data:image/svg+xml,${encodeURIComponent(`
            <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="18" fill="#3b82f6" stroke="#ffffff" stroke-width="2"/>
              <circle cx="20" cy="20" r="6" fill="#ffffff"/>
            </svg>
          `)}`,
          scaledSize: new google.maps.Size(40, 40),
          anchor: new google.maps.Point(20, 20)
        }
      });

      const infoWindowContent = `
        <div style="max-width: 250px; padding: 12px; font-family: system-ui;">
          ${property.image_url ? `
            <img src="${property.image_url}" alt="${property.title}" 
                 style="width: 100%; height: 120px; object-fit: cover; border-radius: 8px; margin-bottom: 8px;">
          ` : ''}
          <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600; color: #1f2937;">${property.title}</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 8px;">
            ${property.typology?.label ? `<span style="background: #dbeafe; color: #1e40af; padding: 2px 8px; border-radius: 12px; font-size: 12px;">${property.typology.label}</span>` : ''}
            <span style="background: #dcfce7; color: #166534; padding: 2px 8px; border-radius: 12px; font-size: 12px;">${property.status}</span>
          </div>
          <div style="margin-bottom: 8px;">
            ${property.surface_m2 ? `<p style="margin: 2px 0; font-size: 14px; color: #4b5563;">📐 ${property.surface_m2} m²</p>` : ''}
            <p style="margin: 2px 0; font-size: 14px; color: #4b5563;">💰 ${formatPrice(property.prix_dinar)}</p>
            ${property.locality?.name ? `<p style="margin: 2px 0; font-size: 14px; color: #4b5563;">📍 ${property.locality.name}</p>` : ''}
          </div>
          <button onclick="window.showPropertyDetail('${property.id}')" 
                  style="width: 100%; background: #3b82f6; color: white; border: none; padding: 8px 16px; border-radius: 6px; font-size: 14px; cursor: pointer; margin-top: 8px;">
            Voir les détails
          </button>
        </div>
      `;

      const infoWindow = new google.maps.InfoWindow({
        content: infoWindowContent,
      });

      marker.addListener('click', () => {
        // Close all other info windows
        infoWindows.current.forEach(iw => iw.close());
        infoWindow.open(map.current!, marker);
      });

      markers.current.push(marker);
      infoWindows.current.push(infoWindow);
    });

    // Add global function for navigation
    (window as any).showPropertyDetail = (propertyId: string) => {
      navigate(`/bien/${propertyId}`);
    };
  }, [filteredProperties, mapLoaded, navigate]);

  // Get unique statuses
  const uniqueStatuses = [...new Set(properties.map(p => p.status))];

  const retryMapLoad = () => {
    setMapError(null);
    setMapLoaded(false);
    setMapLoadingProgress(0);
    clearCachedApiKey();
    // Force re-render to trigger useEffect
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
        {mapError ? (
          <div className="h-96 w-full rounded-lg bg-muted flex items-center justify-center">
            <div className="text-center max-w-md">
              <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Erreur de chargement</h3>
              <p className="text-sm text-muted-foreground mb-4">{mapError}</p>
              <Button onClick={retryMapLoad} variant="outline" className="gap-2">
                <RefreshCw className="h-4 w-4" />
                Réessayer
              </Button>
            </div>
          </div>
        ) : !mapLoaded ? (
          <div className="h-96 w-full rounded-lg bg-muted flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
              <div className="w-48 bg-muted-foreground/20 rounded-full h-2 mx-auto mb-3">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${mapLoadingProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-muted-foreground">
                {mapLoadingProgress < 30 ? 'Initialisation...' :
                 mapLoadingProgress < 60 ? 'Récupération de la configuration...' :
                 mapLoadingProgress < 90 ? 'Chargement de Google Maps...' :
                 'Finalisation...'}
              </p>
            </div>
          </div>
        ) : null}
        <div 
          ref={mapContainer} 
          className={`w-full h-96 rounded-lg overflow-hidden ${!mapLoaded ? 'hidden' : ''}`}
        />
        <div className="mt-4 text-sm text-muted-foreground">
          {filteredProperties.length} bien(s) affiché(s) sur la carte
          {filteredProperties.length > 0 && " • Cliquez sur un marqueur pour plus d'informations"}
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyMap;