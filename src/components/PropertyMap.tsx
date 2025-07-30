import React, { useEffect, useState, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { supabase } from '@/integrations/supabase/client';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

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

const PropertyMap: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [mapLoaded, setMapLoaded] = useState(false);
  
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

  // Initialize Google Maps
  useEffect(() => {
    const initializeMap = async () => {
      if (!mapContainer.current || map.current) return;

      try {
        console.log('Starting Google Maps initialization...');
        // Get Google Maps API key from edge function
        const { data: configData, error: configError } = await supabase.functions.invoke('google-maps-config');
        
        console.log('Edge function response:', { configData, configError });
        
        if (configError || !configData?.apiKey) {
          console.error('Failed to get API key:', configError);
          throw new Error('Impossible de récupérer la clé API Google Maps');
        }

        console.log('API key retrieved successfully');

        const loader = new Loader({
          apiKey: configData.apiKey,
          version: 'weekly',
        });

        await loader.load();

        map.current = new google.maps.Map(mapContainer.current, {
          center: { lat: 36.7538, lng: 3.0588 }, // Alger centre coordinates
          zoom: 11,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          styles: [
            {
              featureType: 'poi',
              stylers: [{ visibility: 'off' }]
            }
          ]
        });

        setMapLoaded(true);
        toast({
          title: "Succès",
          description: "Carte Google Maps chargée avec succès",
        });
      } catch (error) {
        console.error('Erreur lors de l\'initialisation de Google Maps:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger Google Maps",
          variant: "destructive",
        });
      }
    };

    initializeMap();
  }, [toast]);

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

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Chargement de la carte...</div>
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
        {!mapLoaded && (
          <div className="h-96 w-full rounded-lg bg-muted flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
              <p className="text-sm text-muted-foreground">Chargement de Google Maps...</p>
            </div>
          </div>
        )}
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