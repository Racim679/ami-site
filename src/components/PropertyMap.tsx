import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { supabase } from '@/integrations/supabase/client';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import 'leaflet/dist/leaflet.css';

// Fix pour les icônes par défaut de Leaflet
delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

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

  // Fetch properties et localities depuis Supabase
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
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filtrer les propriétés par status
  useEffect(() => {
    if (selectedStatus === 'all') {
      setFilteredProperties(properties);
    } else {
      setFilteredProperties(properties.filter(property => property.status === selectedStatus));
    }
  }, [selectedStatus, properties]);

  // Obtenir le nom de la localité
  const getLocalityName = (localityId?: string) => {
    if (!localityId) return '';
    const locality = localities.find(l => l.id === localityId);
    return locality ? locality.name : '';
  };

  // Obtenir les status uniques
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
        <CardTitle>Carte des Biens Immobiliers</CardTitle>
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
        <div className="h-96 w-full rounded-lg overflow-hidden">
          <MapContainer
            center={[36.8065, 10.1815]} // Coordonnées par défaut (Tunis)
            zoom={10}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {filteredProperties.map((property) => (
              <Marker
                key={property.id}
                position={[property.latitude, property.longitude]}
              >
                <Popup>
                  <div>
                    <h3 style={{ fontWeight: 'bold', marginBottom: '4px' }}>{property.title}</h3>
                    <p style={{ fontSize: '12px', margin: '2px 0' }}>
                      Status: {property.status}
                    </p>
                    {getLocalityName(property.locality_id) && (
                      <p style={{ fontSize: '12px', margin: '2px 0' }}>
                        Localité: {getLocalityName(property.locality_id)}
                      </p>
                    )}
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
        <div className="mt-4 text-sm text-muted-foreground">
          {filteredProperties.length} bien(s) affiché(s) sur la carte
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyMap;