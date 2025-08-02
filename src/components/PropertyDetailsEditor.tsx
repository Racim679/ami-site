import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Plus, X, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface PropertyDetailsEditorProps {
  propertyId: string;
}

interface PropertyDetail {
  bedrooms?: number;
  bathrooms?: number;
  rooms?: number;
  floors?: number;
  living_area?: number;
  has_city_view?: boolean;
  condition?: string;
}

interface ListItem {
  id?: string;
  text: string;
}

const PropertyDetailsEditor: React.FC<PropertyDetailsEditorProps> = ({ propertyId }) => {
  const { toast } = useToast();
  const [details, setDetails] = useState<PropertyDetail>({});
  const [amenities, setAmenities] = useState<ListItem[]>([]);
  const [securityFeatures, setSecurityFeatures] = useState<ListItem[]>([]);
  const [buildingFeatures, setBuildingFeatures] = useState<ListItem[]>([]);
  const [nearby, setNearby] = useState<ListItem[]>([]);
  const [documents, setDocuments] = useState<ListItem[]>([]);
  const [photos, setPhotos] = useState<ListItem[]>([]);
  const [videos, setVideos] = useState<ListItem[]>([]);
  
  const [newAmenity, setNewAmenity] = useState('');
  const [newSecurity, setNewSecurity] = useState('');
  const [newBuilding, setNewBuilding] = useState('');
  const [newNearby, setNewNearby] = useState('');
  const [newDocument, setNewDocument] = useState('');
  const [newPhoto, setNewPhoto] = useState('');
  const [newVideo, setNewVideo] = useState('');

  useEffect(() => {
    loadPropertyData();
  }, [propertyId]);

  const loadPropertyData = async () => {
    try {
      // Pour l'instant, charger des données factices
      // TODO: Remplacer par de vraies requêtes quand les types Supabase seront mis à jour
      setDetails({
        bedrooms: 3,
        bathrooms: 2,
        rooms: 5,
        floors: 2,
        living_area: 120,
        has_city_view: true,
        condition: 'Excellent'
      });
      
      setAmenities([
        { id: '1', text: 'Climatisation' },
        { id: '2', text: 'Cuisine équipée' }
      ]);
      
      setSecurityFeatures([
        { id: '1', text: 'Interphone' },
        { id: '2', text: 'Alarme' }
      ]);
      
      setBuildingFeatures([
        { id: '1', text: 'Ascenseur' },
        { id: '2', text: 'Parking' }
      ]);
      
      setNearby([
        { id: '1', text: 'École primaire' },
        { id: '2', text: 'Supermarché' }
      ]);
      
      setDocuments([
        { id: '1', text: 'Acte de propriété' },
        { id: '2', text: 'Certificat d\'urbanisme' }
      ]);
      
      setPhotos([
        { id: '1', text: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800' }
      ]);
      
      setVideos([
        { id: '1', text: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' }
      ]);
      
    } catch (error) {
      console.error('Erreur lors du chargement:', error);
    }
  };

  const handleDetailsChange = (field: keyof PropertyDetail, value: string | boolean | number) => {
    setDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const saveDetails = async () => {
    try {
      // TODO: Implémenter la sauvegarde réelle
      toast({
        title: "Succès",
        description: "Détails de la propriété mis à jour",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder les détails",
        variant: "destructive",
      });
    }
  };

  const addItem = (
    list: ListItem[], 
    setList: React.Dispatch<React.SetStateAction<ListItem[]>>, 
    newItem: string, 
    setNewItem: React.Dispatch<React.SetStateAction<string>>
  ) => {
    if (newItem.trim()) {
      const newListItem = { id: Date.now().toString(), text: newItem.trim() };
      setList([...list, newListItem]);
      setNewItem('');
    }
  };

  const removeItem = (
    list: ListItem[], 
    setList: React.Dispatch<React.SetStateAction<ListItem[]>>, 
    id: string
  ) => {
    setList(list.filter(item => item.id !== id));
  };

  const ListEditor = ({ 
    title, 
    items, 
    setItems, 
    newItem, 
    setNewItem, 
    placeholder 
  }: {
    title: string;
    items: ListItem[];
    setItems: React.Dispatch<React.SetStateAction<ListItem[]>>;
    newItem: string;
    setNewItem: React.Dispatch<React.SetStateAction<string>>;
    placeholder: string;
  }) => (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex gap-2">
            <Input
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder={placeholder}
              onKeyPress={(e) => e.key === 'Enter' && addItem(items, setItems, newItem, setNewItem)}
            />
            <Button
              size="sm"
              onClick={() => addItem(items, setItems, newItem, setNewItem)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {items.map((item) => (
              <Badge key={item.id} variant="secondary" className="flex items-center gap-1">
                {item.text}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => removeItem(items, setItems, item.id!)}
                />
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Property Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Détails de la propriété
            <Button size="sm" onClick={saveDetails}>
              <Save className="h-4 w-4 mr-1" />
              Sauvegarder
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="bedrooms">Chambres</Label>
              <Input
                id="bedrooms"
                type="number"
                value={details.bedrooms || ''}
                onChange={(e) => handleDetailsChange('bedrooms', parseInt(e.target.value) || 0)}
              />
            </div>
            <div>
              <Label htmlFor="bathrooms">Salles de bain</Label>
              <Input
                id="bathrooms"
                type="number"
                value={details.bathrooms || ''}
                onChange={(e) => handleDetailsChange('bathrooms', parseInt(e.target.value) || 0)}
              />
            </div>
            <div>
              <Label htmlFor="rooms">Pièces totales</Label>
              <Input
                id="rooms"
                type="number"
                value={details.rooms || ''}
                onChange={(e) => handleDetailsChange('rooms', parseInt(e.target.value) || 0)}
              />
            </div>
            <div>
              <Label htmlFor="floors">Étages</Label>
              <Input
                id="floors"
                type="number"
                value={details.floors || ''}
                onChange={(e) => handleDetailsChange('floors', parseInt(e.target.value) || 0)}
              />
            </div>
            <div>
              <Label htmlFor="living_area">Surface habitable (m²)</Label>
              <Input
                id="living_area"
                type="number"
                value={details.living_area || ''}
                onChange={(e) => handleDetailsChange('living_area', parseFloat(e.target.value) || 0)}
              />
            </div>
            <div>
              <Label htmlFor="condition">État</Label>
              <Input
                id="condition"
                value={details.condition || ''}
                onChange={(e) => handleDetailsChange('condition', e.target.value)}
                placeholder="Ex: Excellent, Bon, À rénover"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={details.has_city_view || false}
                onChange={(e) => handleDetailsChange('has_city_view', e.target.checked)}
                className="rounded"
              />
              <span>Vue sur la ville</span>
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Lists */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ListEditor
          title="Commodités"
          items={amenities}
          setItems={setAmenities}
          newItem={newAmenity}
          setNewItem={setNewAmenity}
          placeholder="Ex: Climatisation, Cuisine équipée..."
        />

        <ListEditor
          title="Sécurité"
          items={securityFeatures}
          setItems={setSecurityFeatures}
          newItem={newSecurity}
          setNewItem={setNewSecurity}
          placeholder="Ex: Interphone, Alarme..."
        />

        <ListEditor
          title="Caractéristiques du bâtiment"
          items={buildingFeatures}
          setItems={setBuildingFeatures}
          newItem={newBuilding}
          setNewItem={setNewBuilding}
          placeholder="Ex: Ascenseur, Parking..."
        />

        <ListEditor
          title="À proximité"
          items={nearby}
          setItems={setNearby}
          newItem={newNearby}
          setNewItem={setNewNearby}
          placeholder="Ex: École, Transport..."
        />

        <ListEditor
          title="Documents"
          items={documents}
          setItems={setDocuments}
          newItem={newDocument}
          setNewItem={setNewDocument}
          placeholder="Ex: Acte de propriété..."
        />

        <ListEditor
          title="Photos (URLs)"
          items={photos}
          setItems={setPhotos}
          newItem={newPhoto}
          setNewItem={setNewPhoto}
          placeholder="URL de l'image..."
        />
      </div>

      {/* Videos section spans full width */}
      <ListEditor
        title="Vidéos (URLs)"
        items={videos}
        setItems={setVideos}
        newItem={newVideo}
        setNewItem={setNewVideo}
        placeholder="URL YouTube ou TikTok..."
      />
    </div>
  );
};

export default PropertyDetailsEditor;