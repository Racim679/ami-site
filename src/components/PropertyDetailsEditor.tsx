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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPropertyData();
  }, [propertyId]);

  const loadPropertyData = async () => {
    if (!propertyId) return;
    
    setLoading(true);
    try {
      // Load property details using direct table query
      const { data: detailsData, error: detailsError } = await supabase
        .from('property_details' as any)
        .select('*')
        .eq('property_id', propertyId);
      
      if (!detailsError && detailsData && detailsData.length > 0) {
        const detail = detailsData[0] as any;
        setDetails({
          bedrooms: detail.bedrooms,
          bathrooms: detail.bathrooms,
          rooms: detail.rooms,
          floors: detail.floors,
          living_area: detail.living_area,
          has_city_view: detail.has_city_view,
          condition: detail.condition
        });
      } else {
        setDetails({});
      }

      // Load amenities
      const { data: amenitiesData } = await supabase
        .from('property_amenities' as any)
        .select('*')
        .eq('property_id', propertyId)
        .order('created_at');
      setAmenities(amenitiesData?.map((item: any) => ({ id: String(item.id), text: item.amenity })) || []);

      // Load security features
      const { data: securityData } = await supabase
        .from('property_security_features' as any)
        .select('*')
        .eq('property_id', propertyId)
        .order('created_at');
      setSecurityFeatures(securityData?.map((item: any) => ({ id: String(item.id), text: item.security_feature })) || []);

      // Load building features
      const { data: buildingData } = await supabase
        .from('property_building_features' as any)
        .select('*')
        .eq('property_id', propertyId)
        .order('created_at');
      setBuildingFeatures(buildingData?.map((item: any) => ({ id: String(item.id), text: item.building_feature })) || []);

      // Load nearby
      const { data: nearbyData } = await supabase
        .from('property_nearby' as any)
        .select('*')
        .eq('property_id', propertyId)
        .order('created_at');
      setNearby(nearbyData?.map((item: any) => ({ id: String(item.id), text: item.nearby_feature })) || []);

      // Load documents
      const { data: documentsData } = await supabase
        .from('property_documents' as any)
        .select('*')
        .eq('property_id', propertyId)
        .order('created_at');
      setDocuments(documentsData?.map((item: any) => ({ id: String(item.id), text: item.document_name })) || []);

      // Load photos
      const { data: photosData } = await supabase
        .from('property_photos' as any)
        .select('*')
        .eq('property_id', propertyId)
        .order('display_order', { ascending: true });
      setPhotos(photosData?.map((item: any) => ({ id: String(item.id), text: item.photo_url })) || []);

      // Load videos
      const { data: videosData } = await supabase
        .from('property_videos' as any)
        .select('*')
        .eq('property_id', propertyId)
        .order('created_at');
      setVideos(videosData?.map((item: any) => ({ id: String(item.id), text: item.video_url })) || []);

    } catch (error) {
      console.error('Erreur lors du chargement:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les données de la propriété",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDetailsChange = (field: keyof PropertyDetail, value: string | boolean | number) => {
    setDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const saveDetails = async () => {
    if (!propertyId) return;
    
    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('property_details' as any)
        .upsert({
          property_id: propertyId,
          bedrooms: details.bedrooms,
          bathrooms: details.bathrooms,
          rooms: details.rooms,
          floors: details.floors,
          living_area: details.living_area,
          has_city_view: details.has_city_view,
          condition: details.condition,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      toast({
        title: "Succès",
        description: "Détails de la propriété mis à jour",
      });
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder les détails",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (
    table: string,
    column: string,
    list: ListItem[], 
    setList: React.Dispatch<React.SetStateAction<ListItem[]>>, 
    newItem: string, 
    setNewItem: React.Dispatch<React.SetStateAction<string>>
  ) => {
    if (!newItem.trim() || !propertyId) return;
    
    try {
      const insertData: any = {
        property_id: propertyId,
        [column]: newItem.trim()
      };

      if (table === 'property_photos') {
        insertData.display_order = list.length;
      }

      const { data, error } = await supabase
        .from(table as any)
        .insert(insertData)
        .select()
        .single();

      if (error) throw error;

      const newListItem = { id: String((data as any)?.id), text: newItem.trim() };
      setList([...list, newListItem]);
      setNewItem('');

      toast({
        title: "Succès",
        description: "Élément ajouté",
      });
    } catch (error) {
      console.error('Erreur lors de l\'ajout:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter l'élément",
        variant: "destructive",
      });
    }
  };

  const removeItem = async (
    table: string,
    list: ListItem[], 
    setList: React.Dispatch<React.SetStateAction<ListItem[]>>, 
    id: string
  ) => {
    try {
      const { error } = await supabase
        .from(table as any)
        .delete()
        .eq('id', id);

      if (error) throw error;

      setList(list.filter(item => item.id !== id));

      toast({
        title: "Succès",
        description: "Élément supprimé",
      });
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'élément",
        variant: "destructive",
      });
    }
  };

  const ListEditor = ({ 
    title, 
    items, 
    setItems, 
    newItem, 
    setNewItem, 
    placeholder,
    table,
    column
  }: {
    title: string;
    items: ListItem[];
    setItems: React.Dispatch<React.SetStateAction<ListItem[]>>;
    newItem: string;
    setNewItem: React.Dispatch<React.SetStateAction<string>>;
    placeholder: string;
    table: string;
    column: string;
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
              onKeyPress={(e) => e.key === 'Enter' && addItem(table, column, items, setItems, newItem, setNewItem)}
              disabled={loading}
            />
            <Button
              size="sm"
              onClick={() => addItem(table, column, items, setItems, newItem, setNewItem)}
              disabled={loading}
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
                  onClick={() => removeItem(table, items, setItems, item.id!)}
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
            <Button size="sm" onClick={saveDetails} disabled={loading}>
              <Save className="h-4 w-4 mr-1" />
              {loading ? 'Sauvegarde...' : 'Sauvegarder'}
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
          table="property_amenities"
          column="amenity"
        />

        <ListEditor
          title="Sécurité"
          items={securityFeatures}
          setItems={setSecurityFeatures}
          newItem={newSecurity}
          setNewItem={setNewSecurity}
          placeholder="Ex: Interphone, Alarme..."
          table="property_security_features"
          column="security_feature"
        />

        <ListEditor
          title="Caractéristiques du bâtiment"
          items={buildingFeatures}
          setItems={setBuildingFeatures}
          newItem={newBuilding}
          setNewItem={setNewBuilding}
          placeholder="Ex: Ascenseur, Parking..."
          table="property_building_features"
          column="building_feature"
        />

        <ListEditor
          title="À proximité"
          items={nearby}
          setItems={setNearby}
          newItem={newNearby}
          setNewItem={setNewNearby}
          placeholder="Ex: École, Transport..."
          table="property_nearby"
          column="nearby_feature"
        />

        <ListEditor
          title="Documents"
          items={documents}
          setItems={setDocuments}
          newItem={newDocument}
          setNewItem={setNewDocument}
          placeholder="Ex: Acte de propriété..."
          table="property_documents"
          column="document_name"
        />

        <ListEditor
          title="Photos (URLs)"
          items={photos}
          setItems={setPhotos}
          newItem={newPhoto}
          setNewItem={setNewPhoto}
          placeholder="URL de l'image..."
          table="property_photos"
          column="photo_url"
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
        table="property_videos"
        column="video_url"
      />
    </div>
  );
};

export default PropertyDetailsEditor;