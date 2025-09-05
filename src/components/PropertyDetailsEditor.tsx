import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, X, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { ImageUploadDropzone } from '@/components/ImageUploadDropzone';

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
  
  // Basic property info
  const [propertyTitle, setPropertyTitle] = useState('');
  const [propertyDescription, setPropertyDescription] = useState('');
  
  const [buildingFeatures, setBuildingFeatures] = useState<ListItem[]>([]);
  const [photos, setPhotos] = useState<ListItem[]>([]);
  const [videos, setVideos] = useState<ListItem[]>([]);
  
  const [newBuilding, setNewBuilding] = useState('');
  const [newVideo, setNewVideo] = useState('');
  const [loading, setLoading] = useState(false);

  // Structured data states
  const [structuredAmenities, setStructuredAmenities] = useState<any>({});
  const [structuredSecurity, setStructuredSecurity] = useState<any>({});
  const [structuredNearby, setStructuredNearby] = useState<any>({});
  const [structuredDocuments, setStructuredDocuments] = useState<any>({});

  useEffect(() => {
    if (propertyId) {
      loadPropertyData();
      fetchStructuredData();
    }
  }, [propertyId]);

  const fetchStructuredData = async () => {
    if (!propertyId) return;

    try {
      // Fetch structured amenities
      const { data: amenitiesData } = await supabase
        .from('property_amenities_structured')
        .select('*')
        .eq('property_id', propertyId)
        .maybeSingle();
      
      if (amenitiesData) {
        setStructuredAmenities(amenitiesData);
      }

      // Fetch structured security
      const { data: securityData } = await supabase
        .from('property_security_structured')
        .select('*')
        .eq('property_id', propertyId)
        .maybeSingle();
      
      if (securityData) {
        setStructuredSecurity(securityData);
      }

      // Fetch structured nearby
      const { data: nearbyData } = await supabase
        .from('property_nearby_structured')
        .select('*')
        .eq('property_id', propertyId)
        .maybeSingle();
      
      if (nearbyData) {
        setStructuredNearby(nearbyData);
      }

      // Fetch structured documents
      const { data: documentsData } = await supabase
        .from('property_documents_structured')
        .select('*')
        .eq('property_id', propertyId)
        .maybeSingle();
      
      if (documentsData) {
        setStructuredDocuments(documentsData);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des données structurées:', error);
    }
  };

  const loadPropertyData = async () => {
    if (!propertyId) return;
    
    setLoading(true);
    try {
      console.log('🔄 Chargement des données pour la propriété:', propertyId);
      
      // Load basic property info (title and description)
      const { data: propertyData, error: propertyError } = await supabase
        .from('properties')
        .select('title, description')
        .eq('id', propertyId)
        .maybeSingle();
      
      console.log('📋 Données propriété récupérées:', propertyData);
      console.log('❌ Erreur propriété:', propertyError);
      
      if (!propertyError && propertyData) {
        setPropertyTitle(propertyData.title || '');
        setPropertyDescription(propertyData.description || '');
        console.log('✅ Title et description chargés:', {
          title: propertyData.title,
          description: propertyData.description
        });
      }

      // Load property details using direct table query
      const { data: detailsData, error: detailsError } = await supabase
        .from('property_details')
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

      // Load building features (seule table de liste restante)
      const { data: buildingData } = await supabase
        .from('property_building')
        .select('*')
        .eq('property_id', propertyId)
        .order('created_at');
      setBuildingFeatures(buildingData?.map((item: any) => ({ id: String(item.id), text: item.text })) || []);

      // Load photos
      const { data: photosData } = await supabase
        .from('property_photos')
        .select('*')
        .eq('property_id', propertyId)
        .order('created_at');
      setPhotos(photosData?.map((item: any) => ({ id: String(item.id), text: item.text })) || []);

      // Load videos
      const { data: videosData } = await supabase
        .from('property_videos')
        .select('*')
        .eq('property_id', propertyId)
        .order('created_at');
      setVideos(videosData?.map((item: any) => ({ id: String(item.id), text: item.text })) || []);

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
        .from('property_details')
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

  const saveBasicInfo = async () => {
    if (!propertyId) return;
    
    try {
      setLoading(true);
      
      console.log('💾 Sauvegarde des informations de base:', {
        propertyId,
        title: propertyTitle,
        description: propertyDescription
      });
      
      const { error } = await supabase
        .from('properties')
        .update({
          title: propertyTitle,
          description: propertyDescription,
          updated_at: new Date().toISOString()
        })
        .eq('id', propertyId);

      console.log('💾 Erreur de sauvegarde:', error);

      if (error) throw error;

      console.log('✅ Sauvegarde réussie !');

      toast({
        title: "Succès",
        description: "Informations de base mises à jour",
      });
    } catch (error) {
      console.error('❌ Erreur lors de la sauvegarde:', error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder les informations de base",
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
        text: newItem.trim()
      };

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

  const addPhoto = async (photoUrl: string) => {
    if (!photoUrl || !propertyId) return;
    
    try {
      const { data, error } = await supabase
        .from('property_photos')
        .insert({
          property_id: propertyId,
          text: photoUrl
        })
        .select()
        .single();

      if (error) throw error;

      const newPhoto = { id: String(data.id), text: photoUrl };
      setPhotos([...photos, newPhoto]);

      toast({
        title: "Succès",
        description: "Photo ajoutée avec succès",
      });
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la photo:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter la photo",
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


  const StructuredMultiSelect = ({ 
    title, 
    data,
    setData,
    options,
    table
  }: {
    title: string;
    data: any;
    setData: React.Dispatch<React.SetStateAction<any>>;
    options: { key: string; label: string }[];
    table: string;
  }) => {
    const handleToggle = async (key: string, value: boolean) => {
      if (!propertyId) return;
      
      try {
        console.log(`Updating ${key} to ${value} for property ${propertyId} in table ${table}`);
        
        // D'abord vérifier si un enregistrement existe avec maybeSingle()
        const { data: existingData, error: selectError } = await supabase
          .from(table as any)
          .select('id')
          .eq('property_id', propertyId)
          .maybeSingle();

        if (selectError) {
          console.error('Error checking existing record:', selectError);
          throw selectError;
        }

        const updateData = {
          property_id: propertyId,
          [key]: value,
          updated_at: new Date().toISOString()
        };

        let error;
        if (existingData) {
          // Mettre à jour l'enregistrement existant
          const result = await supabase
            .from(table as any)
            .update(updateData)
            .eq('property_id', propertyId);
          error = result.error;
        } else {
          // Créer un nouvel enregistrement
          const result = await supabase
            .from(table as any)
            .insert(updateData);
          error = result.error;
        }

        if (error) throw error;

        setData((prev: any) => ({
          ...prev,
          [key]: value
        }));

        toast({
          title: "Succès",
          description: "Mise à jour effectuée",
        });
      } catch (error) {
        console.error('Erreur lors de la mise à jour:', error);
        toast({
          title: "Erreur",
          description: "Impossible de mettre à jour",
          variant: "destructive",
        });
      }
    };

    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {options.map((option) => (
              <div key={option.key} className="flex items-center space-x-2">
                <Checkbox
                  id={option.key}
                  checked={data[option.key] || false}
                  onCheckedChange={(checked) => handleToggle(option.key, checked as boolean)}
                />
                <Label 
                  htmlFor={option.key}
                  className="text-sm font-normal cursor-pointer"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Basic Property Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Informations de base
            <Button size="sm" onClick={saveBasicInfo} disabled={loading}>
              <Save className="h-4 w-4 mr-1" />
              {loading ? 'Sauvegarde...' : 'Sauvegarder'}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="propertyTitle">Titre de la propriété</Label>
            <Input
              id="propertyTitle"
              value={propertyTitle}
              onChange={(e) => setPropertyTitle(e.target.value)}
              placeholder="Titre de la propriété..."
            />
          </div>
          <div>
            <Label htmlFor="propertyDescription">Description</Label>
            <Textarea
              id="propertyDescription"
              value={propertyDescription}
              onChange={(e) => setPropertyDescription(e.target.value)}
              placeholder="Description détaillée de la propriété..."
              className="min-h-[100px]"
            />
          </div>
        </CardContent>
      </Card>

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
              <Select value={details.condition || ''} onValueChange={(value) => handleDetailsChange('condition', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner l'état" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Neuf">Neuf</SelectItem>
                  <SelectItem value="Rénové">Rénové</SelectItem>
                  <SelectItem value="Bon état">Bon état</SelectItem>
                  <SelectItem value="À rénover">À rénover</SelectItem>
                  <SelectItem value="À démolir">À démolir</SelectItem>
                </SelectContent>
              </Select>
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

      {/* Structured Multi-Select Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StructuredMultiSelect
          title="Commodités"
          data={structuredAmenities}
          setData={setStructuredAmenities}
          options={[
            { key: "piscine", label: "Piscine" },
            { key: "garage", label: "Garage" },
            { key: "jardin", label: "Jardin" },
            { key: "terrasse", label: "Terrasse" },
            { key: "balcon", label: "Balcon" },
            { key: "cave", label: "Cave" },
            { key: "grenier", label: "Grenier" },
            { key: "buanderie", label: "Buanderie" }
          ]}
          table="property_amenities_structured"
        />

        <StructuredMultiSelect
          title="Sécurité"
          data={structuredSecurity}
          setData={setStructuredSecurity}
          options={[
            { key: "gardien", label: "Gardiennage" },
            { key: "ascenseur", label: "Ascenseur" },
            { key: "acces_handicape", label: "Accès handicapé" },
            { key: "video_surveillance", label: "Videosurveillance" },
            { key: "digicode", label: "Digicode" },
            { key: "interphone", label: "Interphone" },
            { key: "alarme", label: "Alarme" },
            { key: "portail_electrique", label: "Portail électrique" }
          ]}
          table="property_security_structured"
        />

        <StructuredMultiSelect
          title="À proximité"
          data={structuredNearby}
          setData={setStructuredNearby}
          options={[
            { key: "ecoles", label: "Écoles" },
            { key: "pharmacies", label: "Pharmacies" },
            { key: "mosquees", label: "Mosquées" },
            { key: "transports_publics", label: "Transports publics" },
            { key: "banques", label: "Banques" },
            { key: "universites", label: "Universités" },
            { key: "commerces", label: "Commerces" },
            { key: "restaurants", label: "Restaurants" },
            { key: "aeroports", label: "Aéroports" },
            { key: "hopitaux", label: "Hôpitaux" },
            { key: "parcs", label: "Parcs" },
            { key: "plages", label: "Plages" }
          ]}
          table="property_nearby_structured"
        />

        <StructuredMultiSelect
          title="Documents"
          data={structuredDocuments}
          setData={setStructuredDocuments}
          options={[
            { key: "acte_propriete", label: "Acte de propriété" },
            { key: "titre_propriete", label: "Titre de propriété" },
            { key: "livret_foncier", label: "Livret foncier" },
            { key: "certificat_inscription_fonciere", label: "Certificat d'inscription foncière" },
            { key: "fiche_fiscale", label: "Fiche fiscale" },
            { key: "documents_cadastraux", label: "Documents cadastraux" },
            { key: "plans_cadastraux", label: "Plans cadastraux" },
            { key: "certificat_urbanisme", label: "Certificat d'urbanisme" },
            { key: "permis_construire", label: "Permis de construire" },
            { key: "certification_conformite", label: "Certification de conformité" },
            { key: "promesse_vente", label: "Promesse de vente" },
            { key: "contrat_location", label: "Contrat de location" },
            { key: "mainlevee", label: "Mainlevée" },
            { key: "permis_exploitation", label: "Permis d'exploitation" },
            { key: "certificat_non_negativite", label: "Certificat de non-négativité" },
            { key: "certification_possession", label: "Certification de possession" }
          ]}
          table="property_documents_structured"
        />

        {/* Building Features - reste en liste car pas de table structurée */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Caractéristiques du bâtiment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex gap-2">
                <Input
                  value={newBuilding}
                  onChange={(e) => setNewBuilding(e.target.value)}
                  placeholder="Ajouter une caractéristique..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addItem('property_building', 'text', buildingFeatures, setBuildingFeatures, newBuilding, setNewBuilding);
                    }
                  }}
                  disabled={loading}
                />
                <Button
                  size="sm"
                  onClick={() => addItem('property_building', 'text', buildingFeatures, setBuildingFeatures, newBuilding, setNewBuilding)}
                  disabled={loading}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {buildingFeatures.map((item) => (
                  <Badge key={item.id} variant="secondary" className="flex items-center gap-1">
                    {item.text}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => removeItem('property_building', buildingFeatures, setBuildingFeatures, item.id!)}
                    />
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Photos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ImageUploadDropzone
              propertyId={propertyId}
              onImageUploaded={addPhoto}
              className="min-h-[200px]"
              bucketType="gallery"
            />
            {photos.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium">Photos ajoutées :</h4>
                {photos.map((photo) => (
                  <div key={photo.id} className="flex items-center justify-between p-2 border rounded">
                    <img src={photo.text} alt="Photo" className="w-16 h-16 object-cover rounded" />
                    <span className="flex-1 mx-3 text-sm truncate">{photo.text}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeItem('property_photos', photos, setPhotos, photo.id!)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Videos section spans full width - keep as text input */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Vidéos (URLs)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex gap-2">
              <Input
                value={newVideo}
                onChange={(e) => setNewVideo(e.target.value)}
                placeholder="URL YouTube ou TikTok..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addItem('property_videos', 'text', videos, setVideos, newVideo, setNewVideo);
                  }
                }}
                disabled={loading}
              />
              <Button
                size="sm"
                onClick={() => addItem('property_videos', 'text', videos, setVideos, newVideo, setNewVideo)}
                disabled={loading}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {videos.map((item) => (
                <Badge key={item.id} variant="secondary" className="flex items-center gap-1">
                  {item.text}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => removeItem('property_videos', videos, setVideos, item.id!)}
                  />
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PropertyDetailsEditor;