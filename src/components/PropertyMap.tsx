import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface Property {
  id: string;
  title: string;
  status: string;
  latitude: number;
  longitude: number;
  surface?: number;
  price?: number;
  image_url?: string;
  localities?: {
    name: string;
  };
}

const PropertyMap: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // Fetch properties from Supabase
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        console.log('Fetching properties from database...');
        const { data, error } = await supabase
          .from('properties')
          .select(`
            id,
            title,
            status,
            latitude,
            longitude,
            surface,
            price,
            image_url,
            localities!inner(name)
          `)
          .not('latitude', 'is', null)
          .not('longitude', 'is', null)
          .order('created_at', { ascending: false })
          .limit(50);

        if (error) {
          console.error('Error fetching properties:', error);
          return;
        }

        console.log('Properties fetched from database:', data);
        console.log('Number of properties:', data?.length || 0);
        
        const transformedData = data?.map(item => ({
          id: item.id,
          title: item.title,
          status: item.status,
          latitude: Number(item.latitude),
          longitude: Number(item.longitude),
          surface: item.surface ? Number(item.surface) : undefined,
          price: item.price ? Number(item.price) : undefined,
          image_url: item.image_url || undefined,
          localities: Array.isArray(item.localities) && item.localities.length > 0 
            ? item.localities[0] 
            : undefined
        })) || [];

        setProperties(transformedData);
      } catch (error) {
        console.error('Error in fetchProperties:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Filter properties based on selected status
  useEffect(() => {
    if (selectedStatus === 'all') {
      setFilteredProperties(properties);
    } else {
      setFilteredProperties(properties.filter(property => property.status === selectedStatus));
    }
  }, [properties, selectedStatus]);

  // Initialize map when component mounts
  useEffect(() => {
    console.log('PropertyMap component mounted');
    
    if (window.google && window.google.maps) {
      console.log("Google Maps API already loaded.");
      if (!isMapLoaded) {
        console.log('Initializing map...');
        initMap();
      }
      return;
    }

    console.log('Loading Google Maps API...');
    // Load Google Maps API
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAcfSxQm9zP3ja7vkuEDQvKfW4mNLVZpkA&loading=async`;
    script.async = true;
    script.onload = () => {
      console.log('Google Maps script loaded successfully');
      initMap();
    };
    script.onerror = (error) => {
      console.error('Failed to load Google Maps script:', error);
    };
    document.head.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  // Reinitialize markers when filtered properties change
  useEffect(() => {
    if (isMapLoaded && filteredProperties.length > 0) {
      addMarkersToMap();
    }
  }, [filteredProperties, isMapLoaded]);

  const initMap = () => {
    console.log('initMap called');
    const mapElement = document.getElementById("property-map");
    if (!mapElement) {
      console.error('Map element not found');
      return;
    }

    try {
      console.log('Creating Google Maps instance...');
      const map = new google.maps.Map(mapElement, {
        center: { lat: 36.7538, lng: 3.0588 }, // Alger center
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      });

      // Store map instance globally for marker updates
      (window as any).propertyMap = map;
      setIsMapLoaded(true);
      console.log('Map initialized successfully');
      
      // Add markers immediately if properties are available
      if (filteredProperties.length > 0) {
        console.log('Adding markers to map...');
        addMarkersToMap();
      }
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  };

  const addMarkersToMap = () => {
    const map = (window as any).propertyMap;
    if (!map) return;

    // Clear existing markers
    if ((window as any).propertyMarkers) {
      (window as any).propertyMarkers.forEach((marker: google.maps.Marker) => {
        marker.setMap(null);
      });
    }

    const markers: google.maps.Marker[] = [];

    // Format price helper
    const formatPrice = (price: number) => {
      return new Intl.NumberFormat('fr-DZ', {
        style: 'currency',
        currency: 'DZD',
        minimumFractionDigits: 0,
      }).format(price);
    };

    // Loop through filtered properties and add them to the map
    filteredProperties.forEach(({ id, title, status, latitude, longitude, surface, price, image_url, localities }) => {
      const marker = new google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map,
        title: title || undefined,
      });

      // Create info window content
      const infoWindowContent = `
        <div style="max-width: 300px; padding: 10px;">
          ${image_url ? `<img src="${image_url}" alt="${title}" style="width: 100%; height: 150px; object-fit: cover; border-radius: 8px; margin-bottom: 10px;" />` : ""}
          ${title ? `<h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: bold;">${title}</h3>` : ""}
          ${localities?.name ? `<p style="margin: 0 0 4px 0; color: #666; font-size: 14px;"><strong>Localité:</strong> ${localities.name}</p>` : ""}
          ${surface ? `<p style="margin: 0 0 4px 0; color: #666; font-size: 14px;"><strong>Surface:</strong> ${surface} m²</p>` : ""}
          ${price ? `<p style="margin: 0 0 4px 0; color: #666; font-size: 14px;"><strong>Prix:</strong> ${formatPrice(price)}</p>` : ""}
          <p style="margin: 0 0 8px 0; color: #666; font-size: 14px;"><strong>Status:</strong> ${status === 'available' ? 'Disponible' : 'Réservé'}</p>
          <a href="/property/${id}" style="display: inline-block; background-color: #3b82f6; color: white; text-decoration: none; padding: 8px 16px; border-radius: 4px; font-size: 14px;">
            Voir les détails
          </a>
        </div>`;

      const infoWindow = new google.maps.InfoWindow({
        content: infoWindowContent,
        disableAutoPan: true, // Prevents the small zoom/movement when clicking a marker
      });

      // Open InfoWindow on marker click
      marker.addListener("click", () => {
        infoWindow.open(map, marker);
      });

      markers.push(marker);
    });

    // Store markers globally for cleanup
    (window as any).propertyMarkers = markers;
  };

  // Get unique statuses for filter
  const uniqueStatuses = [...new Set(properties.map(property => property.status))];

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Carte des Propriétés</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-96">
            <p>Chargement de la carte...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Carte des Propriétés ({filteredProperties.length} propriétés)</CardTitle>
        <div className="flex gap-4 items-center">
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filtrer par statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              {uniqueStatuses.map(status => (
                <SelectItem key={status} value={status}>
                  {status === 'available' ? 'Disponible' : 'Réservé'}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div id="property-map" style={{ height: "550px", width: "100%" }} />
      </CardContent>
    </Card>
  );
};

export default PropertyMap;