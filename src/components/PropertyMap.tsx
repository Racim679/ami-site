import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';

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

  const formatPrice = (price?: number) => {
    if (!price) return 'Prix sur demande';
    return new Intl.NumberFormat('fr-DZ', {
      style: 'decimal',
      minimumFractionDigits: 0,
    }).format(price) + ' DA';
  };

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProperties.map((property) => (
            <div 
              key={property.id}
              className="border rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => navigate(`/bien/${property.id}`)}
            >
              {property.image_url && (
                <img 
                  src={property.image_url} 
                  alt={property.title}
                  className="w-full h-32 object-cover rounded mb-3"
                />
              )}
              <div className="flex items-start gap-2 mb-2">
                <MapPin className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-semibold text-sm mb-1">{property.title}</h3>
                  <p className="text-xs text-muted-foreground">{property.locality?.name}</p>
                </div>
              </div>
              
              <div className="space-y-1 text-xs text-muted-foreground">
                {property.surface_m2 && (
                  <p>Surface: {property.surface_m2} m²</p>
                )}
                <p className="font-semibold text-foreground">{formatPrice(property.prix_dinar)}</p>
              </div>
              
              <div className="flex gap-2 mt-3">
                {property.typology?.label && (
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    {property.typology.label}
                  </span>
                )}
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                  {property.status}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        {filteredProperties.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            Aucun bien trouvé pour ce filtre
          </div>
        )}
        
        <div className="mt-4 text-sm text-muted-foreground">
          {filteredProperties.length} bien(s) affiché(s)
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyMap;