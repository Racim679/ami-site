import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, ExternalLink, Navigation } from 'lucide-react';

interface Property {
  id: string;
  title: string;
  status: string;
  latitude: number;
  longitude: number;
  surface_m2?: number;
  prix_dinar?: number;
  image_url?: string;
  locality?: { name: string };
  typology?: { label: string };
}

interface FallbackMapViewProps {
  properties: Property[];
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  uniqueStatuses: string[];
}

const FallbackMapView: React.FC<FallbackMapViewProps> = ({
  properties,
  selectedStatus,
  onStatusChange,
  uniqueStatuses
}) => {
  const formatPrice = (price?: number) => {
    if (!price) return 'Prix sur demande';
    return new Intl.NumberFormat('fr-TN', {
      style: 'decimal',
      minimumFractionDigits: 0,
    }).format(price) + ' DT';
  };

  const openGoogleMaps = (property: Property) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${property.latitude},${property.longitude}`;
    window.open(url, '_blank');
  };

  const openOpenStreetMap = (property: Property) => {
    const url = `https://www.openstreetmap.org/?mlat=${property.latitude}&mlon=${property.longitude}&zoom=15`;
    window.open(url, '_blank');
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Liste des Propriétés (Mode Alternatif)
        </CardTitle>
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium">Filtrer par status:</label>
          <select 
            value={selectedStatus} 
            onChange={(e) => onStatusChange(e.target.value)}
            className="px-3 py-2 border rounded-md text-sm"
          >
            <option value="all">Tous les status</option>
            {uniqueStatuses.map(status => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {properties.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Aucune propriété trouvée pour les critères sélectionnés
            </div>
          ) : (
            properties.map((property) => (
              <div key={property.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">{property.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {property.locality?.name || 'Localisation non définie'}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {property.typology?.label && (
                      <Badge variant="secondary">{property.typology.label}</Badge>
                    )}
                    <Badge variant="outline">{property.status}</Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                  {property.surface_m2 && (
                    <div>
                      <span className="text-muted-foreground">Surface:</span>
                      <span className="ml-1 font-medium">{property.surface_m2} m²</span>
                    </div>
                  )}
                  <div>
                    <span className="text-muted-foreground">Prix:</span>
                    <span className="ml-1 font-medium">{formatPrice(property.prix_dinar)}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openGoogleMaps(property)}
                    className="flex items-center gap-1"
                  >
                    <Navigation className="h-4 w-4" />
                    Google Maps
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openOpenStreetMap(property)}
                    className="flex items-center gap-1"
                  >
                    <MapPin className="h-4 w-4" />
                    OpenStreetMap
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="mt-4 pt-4 border-t text-sm text-muted-foreground">
          {properties.length} propriété(s) affichée(s) • Mode alternatif activé car la carte interactive n'est pas disponible
        </div>
      </CardContent>
    </Card>
  );
};

export default FallbackMapView;