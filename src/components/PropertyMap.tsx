import React, { useEffect, useState, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { supabase } from '@/integrations/supabase/client';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface Property {
  id: string;
  title: string;
  status: string;
  latitude: number;
  longitude: number;
  locality_id?: string;
}

interface Locality {
  id: string;
  name: string;
}

const PropertyMap: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [localities, setLocalities] = useState<Locality[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [showTokenInput, setShowTokenInput] = useState(true);
  
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const { toast } = useToast();

  // Fetch properties and localities from Supabase
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [propertiesResult, localitiesResult] = await Promise.all([
          supabase
            .from('properties')
            .select('id, title, status, latitude, longitude, locality_id')
            .not('latitude', 'is', null)
            .not('longitude', 'is', null),
          supabase
            .from('localities')
            .select('id, name')
        ]);

        if (propertiesResult.error) throw propertiesResult.error;
        if (localitiesResult.error) throw localitiesResult.error;

        setProperties(propertiesResult.data || []);
        setLocalities(localitiesResult.data || []);
        setFilteredProperties(propertiesResult.data || []);
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

    fetchData();
  }, [toast]);

  // Filter properties by status
  useEffect(() => {
    if (selectedStatus === 'all') {
      setFilteredProperties(properties);
    } else {
      setFilteredProperties(properties.filter(property => property.status === selectedStatus));
    }
  }, [selectedStatus, properties]);

  // Initialize map
  const initializeMap = (token: string) => {
    if (!mapContainer.current || map.current) return;

    mapboxgl.accessToken = token;
    
    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [10.1815, 36.8065], // Tunis coordinates
        zoom: 10,
      });

      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
      
      setShowTokenInput(false);
      toast({
        title: "Succès",
        description: "Carte chargée avec succès",
      });
    } catch (error) {
      console.error('Erreur lors de l\'initialisation de la carte:', error);
      toast({
        title: "Erreur",
        description: "Token Mapbox invalide",
        variant: "destructive",
      });
    }
  };

  // Update markers when filtered properties change
  useEffect(() => {
    if (!map.current) return;

    // Remove existing markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    // Add new markers
    filteredProperties.forEach((property) => {
      const localityName = getLocalityName(property.locality_id);
      
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div style="padding: 8px;">
          <h3 style="font-weight: bold; margin-bottom: 4px; font-size: 14px;">${property.title}</h3>
          <p style="font-size: 12px; margin: 2px 0; color: #666;">Status: ${property.status}</p>
          ${localityName ? `<p style="font-size: 12px; margin: 2px 0; color: #666;">Localité: ${localityName}</p>` : ''}
        </div>
      `);

      const marker = new mapboxgl.Marker()
        .setLngLat([property.longitude, property.latitude])
        .setPopup(popup)
        .addTo(map.current!);

      markers.current.push(marker);
    });
  }, [filteredProperties, localities]);

  // Get locality name
  const getLocalityName = (localityId?: string) => {
    if (!localityId) return '';
    const locality = localities.find(l => l.id === localityId);
    return locality ? locality.name : '';
  };

  // Get unique statuses
  const uniqueStatuses = [...new Set(properties.map(p => p.status))];

  const handleTokenSubmit = () => {
    if (!mapboxToken.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez saisir votre token Mapbox",
        variant: "destructive",
      });
      return;
    }
    initializeMap(mapboxToken);
  };

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
        <CardTitle>Carte des Biens Immobiliers</CardTitle>
        {showTokenInput && (
          <div className="space-y-4 p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              Pour afficher la carte, vous devez saisir votre token public Mapbox. 
              Vous pouvez obtenir votre token sur{' '}
              <a 
                href="https://mapbox.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                mapbox.com
              </a>
            </p>
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Votre token public Mapbox..."
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleTokenSubmit}>Charger la carte</Button>
            </div>
          </div>
        )}
        {!showTokenInput && (
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
        )}
      </CardHeader>
      <CardContent>
        <div className="h-96 w-full rounded-lg overflow-hidden">
          <div ref={mapContainer} className="w-full h-full" />
        </div>
        {!showTokenInput && (
          <div className="mt-4 text-sm text-muted-foreground">
            {filteredProperties.length} bien(s) affiché(s) sur la carte
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PropertyMap;