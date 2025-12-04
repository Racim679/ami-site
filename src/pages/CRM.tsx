import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import PropertyDetailsEditor from "@/components/PropertyDetailsEditor";
import { Building, Plus, LogOut, Edit, Save, X } from "lucide-react";
import { ImageUploadDropzone } from "@/components/ImageUploadDropzone";

interface PropertyFormData {
  title: string;
  description: string;
  status: "À Vendre" | "Vendu" | "À louer";
  surface: string;
  price: string;
  typology: string;
  commune_id: string;
  image_url: string;
  latitude: string;
  longitude: string;
  phone_whatsapp: string;
}

interface Property {
  id: string;
  title: string;
  description?: string | null;
  status: "À Vendre" | "Vendu" | "À louer";
  surface: number | null;
  price: number | null;
  typology: string | null;
  commune_id: number | null;
  image_url: string | null;
  latitude: number | null;
  longitude: number | null;
  phone_whatsapp: string;
  created_at: string;
  updated_at: string;
}

const CRM = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [properties, setProperties] = useState<Property[]>([]);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  // État pour gérer l'ID de nouvelle propriété
  const [newPropertyId, setNewPropertyId] = useState<string | null>(null);
  const [tempPropertyId, setTempPropertyId] = useState<string>(() => crypto.randomUUID());
  const [activeTab, setActiveTab] = useState<string>("list");
  const [galleryPhotos, setGalleryPhotos] = useState<Array<{ id?: string, url: string }>>([]);
  const [formData, setFormData] = useState<PropertyFormData>({
    title: "",
    description: "",
    status: "À Vendre",
    surface: "",
    price: "",
    typology: "",
    commune_id: "",
    image_url: "",
    latitude: "",
    longitude: "",
    phone_whatsapp: "+213",
  });

  const typologies = [
    "appartement",
    "villa",
    "maison",
    "studio",
    "duplex",
    "triplex",
    "loft",
    "terrain",
    "local commercial",
    "penthouse",
    "bureau"
  ];

  const [communes, setCommunes] = useState<Array<{ id: number, name: string }>>([]);

  // Vérification de l'authentification et chargement des biens
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("crmAuth");
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      loadProperties();
      loadCommunes();
    }
  }, [navigate]);

  const loadCommunes = async () => {
    try {
      const { data, error } = await supabase
        .from("communes")
        .select("id, name")
        .order("name");

      if (error) throw error;
      setCommunes(data || []);
    } catch (error: any) {
      console.error("Erreur lors du chargement des communes:", error);
    }
  };

  const loadProperties = async () => {
    try {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProperties(data || []);
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les biens",
        variant: "destructive",
      });
    }
  };

  // Fonction pour créer les structures par défaut pour un nouveau bien
  const createDefaultPropertyStructures = async (propertyId: string) => {
    try {
      // Créer les commodités par défaut
      await supabase
        .from("property_amenities_structured")
        .insert([{
          property_id: propertyId,
          piscine: false,
          garage: false,
          jardin: false,
          terrasse: false,
          balcon: false,
          cave: false,
          grenier: false,
          buanderie: false
        }]);

      // Créer la sécurité par défaut
      await supabase
        .from("property_security_structured")
        .insert([{
          property_id: propertyId,
          gardien: false,
          video_surveillance: false,
          alarme: false,
          digicode: false,
          interphone: false,
          portail_electrique: false,
          ascenseur: false,
          acces_handicape: false
        }]);

      // Créer les documents par défaut
      await supabase
        .from("property_documents_structured")
        .insert([{
          property_id: propertyId,
          titre_propriete: false,
          acte_propriete: false,
          livret_foncier: false,
          certificat_inscription_fonciere: false,
          plans_cadastraux: false,
          documents_cadastraux: false,
          fiche_fiscale: false,
          certificat_urbanisme: false,
          permis_construire: false,
          certification_conformite: false,
          contrat_location: false,
          promesse_vente: false,
          mainlevee: false,
          permis_exploitation: false,
          certificat_non_negativite: false,
          certification_possession: false
        }]);

      // Créer les éléments à proximité par défaut
      await supabase
        .from("property_nearby_structured")
        .insert([{
          property_id: propertyId,
          ecoles: false,
          pharmacies: false,
          mosquees: false,
          transports_publics: false,
          banques: false,
          universites: false,
          commerces: false,
          restaurants: false,
          aeroports: false,
          hopitaux: false,
          parcs: false,
          plages: false
        }]);

    } catch (error) {
      console.error("Erreur lors de la création des structures par défaut:", error);
      // Ne pas interrompre le processus si ces insertions échouent
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("crmAuth");
    toast({
      title: "Déconnexion",
      description: "Vous avez été déconnecté avec succès",
    });
    navigate("/login");
  };

  const handleInputChange = (field: keyof PropertyFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.status || !formData.surface || !formData.commune_id || !formData.phone_whatsapp) {
      toast({
        title: "Erreur",
        description: "Le titre, le statut, la surface, la commune et le WhatsApp sont obligatoires",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Utiliser l'ID temporaire généré au début
      const propertyId = tempPropertyId;

      const propertyData = {
        id: propertyId,
        title: formData.title,
        description: formData.description || null,
        status: formData.status,
        surface: formData.surface ? parseFloat(formData.surface) : null,
        price: formData.price ? parseInt(formData.price) : null,
        typology: formData.typology || null,
        commune_id: formData.commune_id ? parseInt(formData.commune_id) : null,
        image_url: formData.image_url || null,
        latitude: formData.latitude ? parseFloat(formData.latitude) : null,
        longitude: formData.longitude ? parseFloat(formData.longitude) : null,
        phone_whatsapp: formData.phone_whatsapp,
      };

      console.log('=== DEBUG AJOUT ===');
      console.log('formData.description:', formData.description);
      console.log('propertyData à envoyer:', propertyData);

      const { data, error } = await supabase
        .from("properties")
        .insert([propertyData])
        .select()
        .single();

      if (error) {
        throw error;
      }

      // Créer les lignes par défaut dans les tables liées
      await createDefaultPropertyStructures(data.id);

      toast({
        title: "Succès",
        description: "Le bien a été ajouté avec succès. Vous pouvez maintenant ajouter les détails avancés.",
      });

      // Reset form and reload properties
      setFormData({
        title: "",
        description: "",
        status: "À Vendre",
        surface: "",
        price: "",
        typology: "",
        commune_id: "",
        image_url: "",
        latitude: "",
        longitude: "",
        phone_whatsapp: "+213",
      });

      // Set the new property for details editing
      setNewPropertyId(data.id);
      // Charger les photos existantes
      await loadGalleryPhotos(data.id);
      loadProperties();

      // Générer un nouvel ID temporaire pour la prochaine création
      setTempPropertyId(crypto.randomUUID());

      // Switch to details tab
      setActiveTab("details");

    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = async (property: Property) => {
    setEditingProperty(property);
    setNewPropertyId(null);
    setFormData({
      title: property.title,
      description: property.description || "",
      status: property.status,
      surface: property.surface?.toString() || "",
      price: property.price?.toString() || "",
      typology: property.typology || "",
      commune_id: property.commune_id?.toString() || "",
      image_url: property.image_url || "",
      latitude: property.latitude?.toString() || "",
      longitude: property.longitude?.toString() || "",
      phone_whatsapp: property.phone_whatsapp || "+213",
    });
    // Charger les photos de la galerie
    await loadGalleryPhotos(property.id);
    setActiveTab("add");
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editingProperty) return;

    if (!formData.title || !formData.status || !formData.surface || !formData.commune_id || !formData.phone_whatsapp) {
      toast({
        title: "Erreur",
        description: "Le titre, le statut, la surface, la commune et le WhatsApp sont obligatoires",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const propertyData = {
        title: formData.title,
        description: formData.description || null,
        status: formData.status,
        surface: formData.surface ? parseFloat(formData.surface) : null,
        price: formData.price ? parseInt(formData.price) : null,
        typology: formData.typology || null,
        commune_id: formData.commune_id ? parseInt(formData.commune_id) : null,
        image_url: formData.image_url || null,
        latitude: formData.latitude ? parseFloat(formData.latitude) : null,
        longitude: formData.longitude ? parseFloat(formData.longitude) : null,
        phone_whatsapp: formData.phone_whatsapp,
      };

      console.log('=== DEBUG MODIFICATION ===');
      console.log('formData.description:', formData.description);
      console.log('propertyData à envoyer:', propertyData);

      const { error } = await supabase
        .from("properties")
        .update(propertyData)
        .eq("id", editingProperty.id);

      if (error) {
        throw error;
      }

      toast({
        title: "Succès",
        description: "Le bien a été modifié avec succès",
      });

      // Reset form and reload properties
      setEditingProperty(null);
      setFormData({
        title: "",
        description: "",
        status: "À Vendre",
        surface: "",
        price: "",
        typology: "",
        commune_id: "",
        image_url: "",
        latitude: "",
        longitude: "",
        phone_whatsapp: "+213",
      });
      loadProperties();

    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const cancelEdit = () => {
    setEditingProperty(null);
    setNewPropertyId(null);
    setGalleryPhotos([]); // Réinitialiser les photos
    setTempPropertyId(crypto.randomUUID()); // Générer un nouvel ID temporaire
    setFormData({
      title: "",
      description: "",
      status: "À Vendre",
      surface: "",
      price: "",
      typology: "",
      locality_id: "",
      image_url: "",
      latitude: "",
      longitude: "",
      phone_whatsapp: "+213",
    });
    setActiveTab("list");
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "À Vendre": return "À Vendre";
      case "Vendu": return "Vendu";
      case "À louer": return "À louer";
      default: return status;
    }
  };

  const getCommuneLabel = (communeId: number | null) => {
    if (!communeId) return "Non spécifié";
    const commune = communes.find(c => c.id === communeId);
    return commune?.name || "Inconnu";
  };

  // Fonction pour charger les photos de la galerie
  const loadGalleryPhotos = async (propertyId: string) => {
    try {
      const { data, error } = await supabase
        .from('property_photos')
        .select('id, text')
        .eq('property_id', propertyId)
        .order('created_at', { ascending: true });

      if (error) throw error;

      setGalleryPhotos(data?.map(photo => ({ id: photo.id, url: photo.text })) || []);
    } catch (error) {
      console.error('Erreur lors du chargement des photos:', error);
    }
  };

  // Fonction pour ajouter une photo à la galerie
  const addGalleryPhoto = async (url: string) => {
    const propertyId = editingProperty?.id || newPropertyId;
    if (!propertyId) {
      toast({
        title: "Attention",
        description: "Veuillez d'abord créer le bien avant d'ajouter des photos",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('property_photos')
        .insert({
          property_id: propertyId,
          text: url
        })
        .select()
        .single();

      if (error) throw error;

      setGalleryPhotos(prev => [...prev, { id: data.id, url: url }]);

      toast({
        title: "Photo ajoutée",
        description: "La photo a été ajoutée à la galerie",
      });
    } catch (error: any) {
      console.error('Erreur lors de l\'ajout de la photo:', error);
      toast({
        title: "Erreur",
        description: error.message || "Impossible d'ajouter la photo",
        variant: "destructive",
      });
    }
  };

  // Fonction pour supprimer une photo
  const removeGalleryPhoto = async (photoId: string) => {
    try {
      const { error } = await supabase
        .from('property_photos')
        .delete()
        .eq('id', photoId);

      if (error) throw error;

      setGalleryPhotos(prev => prev.filter(photo => photo.id !== photoId));

      toast({
        title: "Photo supprimée",
        description: "La photo a été retirée de la galerie",
      });
    } catch (error: any) {
      console.error('Erreur lors de la suppression:', error);
      toast({
        title: "Erreur",
        description: error.message || "Impossible de supprimer la photo",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <Header />

      <main className="container mx-auto px-4 py-8 mt-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Building className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold text-foreground">CRM - Gestion des Biens</h1>
            </div>
            <Button onClick={handleLogout} variant="outline" className="flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              Se déconnecter
            </Button>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="list">Liste des biens</TabsTrigger>
              <TabsTrigger value="add">{editingProperty ? "Modifier ici" : "Ajouter un bien"}</TabsTrigger>
              <TabsTrigger value="details" disabled={!editingProperty && !newPropertyId}>
                Détails avancés
              </TabsTrigger>
            </TabsList>

            <TabsContent value="list" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Biens immobiliers ({properties.length})</CardTitle>
                  <CardDescription>
                    Gérez vos biens immobiliers existants
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {properties.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      Aucun bien trouvé. Ajoutez votre premier bien !
                    </p>
                  ) : (
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Titre</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Commune</TableHead>
                            <TableHead>Surface</TableHead>
                            <TableHead>Prix</TableHead>
                            <TableHead>WhatsApp</TableHead>
                            <TableHead>Statut</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {properties.map((property) => (
                            <TableRow key={property.id}>
                              <TableCell className="font-medium">{property.title}</TableCell>
                              <TableCell>{property.typology || "Non spécifié"}</TableCell>
                              <TableCell>{getCommuneLabel(property.commune_id)}</TableCell>
                              <TableCell>{property.surface ? `${property.surface} m²` : "Non spécifié"}</TableCell>
                              <TableCell>
                                {property.price
                                  ? `${property.price.toLocaleString()} DZD`
                                  : "Non spécifié"
                                }
                              </TableCell>
                              <TableCell className="font-mono text-sm">
                                {property.phone_whatsapp}
                              </TableCell>
                              <TableCell>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                  ${property.status === 'Vendu' ? 'bg-red-100 text-red-800' :
                                    property.status === 'À louer' ? 'bg-blue-100 text-blue-800' :
                                      'bg-green-100 text-green-800'}`}>
                                  {getStatusLabel(property.status)}
                                </span>
                              </TableCell>
                              <TableCell>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleEdit(property)}
                                  className="flex items-center gap-1"
                                >
                                  <Edit className="h-3 w-3" />
                                  Modifier
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="add" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {editingProperty ? (
                      <>
                        <Edit className="h-5 w-5" />
                        Modifier le bien
                      </>
                    ) : (
                      <>
                        <Plus className="h-5 w-5" />
                        Ajouter un nouveau bien
                      </>
                    )}
                  </CardTitle>
                  <CardDescription>
                    {editingProperty
                      ? "Modifiez les informations du bien sélectionné"
                      : "Remplissez les informations pour ajouter un bien à votre portefeuille"
                    }
                  </CardDescription>
                  {editingProperty && (
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" onClick={cancelEdit}>
                        <X className="h-4 w-4 mr-1" />
                        Annuler
                      </Button>
                    </div>
                  )}
                </CardHeader>
                <CardContent>
                  <form onSubmit={editingProperty ? handleUpdate : handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Titre */}
                      <div className="space-y-2">
                        <Label htmlFor="title">Titre *</Label>
                        <Input
                          id="title"
                          value={formData.title}
                          onChange={(e) => handleInputChange("title", e.target.value)}
                          placeholder="Ex: Appartement F3 centre-ville"
                          required
                        />
                      </div>

                      {/* Statut */}
                      <div className="space-y-2">
                        <Label htmlFor="status">Statut *</Label>
                        <Select
                          value={formData.status}
                          onValueChange={(value) => handleInputChange("status", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner le statut" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="À Vendre">À Vendre</SelectItem>
                            <SelectItem value="Vendu">Vendu</SelectItem>
                            <SelectItem value="À louer">À louer</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Type de bien */}
                      <div className="space-y-2">
                        <Label htmlFor="typology">Type de bien</Label>
                        <Select
                          value={formData.typology}
                          onValueChange={(value) => handleInputChange("typology", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner un type" />
                          </SelectTrigger>
                          <SelectContent>
                            {typologies.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Commune */}
                      <div className="space-y-2">
                        <Label htmlFor="commune">Commune *</Label>
                        <Select
                          value={formData.commune_id}
                          onValueChange={(value) => handleInputChange("commune_id", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner une commune" />
                          </SelectTrigger>
                          <SelectContent>
                            {communes.map((commune) => (
                              <SelectItem key={commune.id} value={commune.id.toString()}>
                                {commune.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Surface */}
                      <div className="space-y-2">
                        <Label htmlFor="surface">Surface (m²) *</Label>
                        <Input
                          id="surface"
                          type="number"
                          value={formData.surface}
                          onChange={(e) => handleInputChange("surface", e.target.value)}
                          placeholder="Ex: 85"
                          required
                        />
                      </div>

                      {/* Prix */}
                      <div className="space-y-2">
                        <Label htmlFor="price">Prix (DZD)</Label>
                        <Input
                          id="price"
                          type="number"
                          value={formData.price}
                          onChange={(e) => handleInputChange("price", e.target.value)}
                          placeholder="Ex: 5000000"
                        />
                      </div>

                      {/* Image Upload */}
                      <div className="space-y-2 md:col-span-2">
                        <Label>Image du bien</Label>
                        <ImageUploadDropzone
                          onImageUploaded={(url) => handleInputChange("image_url", url)}
                          propertyId={editingProperty?.id || tempPropertyId}
                          className="h-32"
                          bucketType="main"
                        />
                        {formData.image_url && (
                          <div className="mt-2">
                            <img
                              src={formData.image_url}
                              alt="Aperçu"
                              className="h-20 w-20 object-cover rounded-lg border"
                            />
                          </div>
                        )}
                      </div>

                      {/* Galerie de photos supplémentaires */}
                      {(editingProperty || newPropertyId) && (
                        <div className="space-y-2 md:col-span-2">
                          <Label>Photos supplémentaires de la galerie</Label>
                          <ImageUploadDropzone
                            onImageUploaded={(url) => addGalleryPhoto(url)}
                            propertyId={editingProperty?.id || newPropertyId || tempPropertyId}
                            className="h-32"
                            bucketType="gallery"
                          />

                          {galleryPhotos.length > 0 && (
                            <div className="mt-4">
                              <p className="text-sm text-muted-foreground mb-2">
                                {galleryPhotos.length} photo{galleryPhotos.length > 1 ? 's' : ''} dans la galerie
                              </p>
                              <div className="grid grid-cols-4 gap-2">
                                {galleryPhotos.map((photo) => (
                                  <div key={photo.id || photo.url} className="relative group">
                                    <img
                                      src={photo.url}
                                      alt="Photo galerie"
                                      className="h-20 w-full object-cover rounded-lg border"
                                    />
                                    <Button
                                      variant="destructive"
                                      size="sm"
                                      className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
                                      onClick={() => photo.id && removeGalleryPhoto(photo.id)}
                                    >
                                      <X className="h-3 w-3" />
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Coordonnées GPS */}
                      <div className="space-y-2">
                        <Label htmlFor="latitude">Latitude</Label>
                        <Input
                          id="latitude"
                          type="number"
                          step="any"
                          value={formData.latitude}
                          onChange={(e) => handleInputChange("latitude", e.target.value)}
                          placeholder="Ex: 36.7538"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="longitude">Longitude</Label>
                        <Input
                          id="longitude"
                          type="number"
                          step="any"
                          value={formData.longitude}
                          onChange={(e) => handleInputChange("longitude", e.target.value)}
                          placeholder="Ex: 3.0588"
                        />
                      </div>

                      {/* WhatsApp */}
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="phone_whatsapp">Numéro WhatsApp *</Label>
                        <Input
                          id="phone_whatsapp"
                          type="tel"
                          value={formData.phone_whatsapp}
                          onChange={(e) => handleInputChange("phone_whatsapp", e.target.value)}
                          placeholder="Ex: +213556123456"
                          required
                        />
                      </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        placeholder="Description détaillée du bien..."
                        rows={4}
                      />
                    </div>

                    <div className="flex gap-3">
                      <Button type="submit" disabled={isLoading} className="flex-1">
                        {isLoading ? (
                          editingProperty ? "Modification en cours..." : "Ajout en cours..."
                        ) : (
                          editingProperty ? (
                            <>
                              <Save className="h-4 w-4 mr-2" />
                              Modifier le bien
                            </>
                          ) : (
                            <>
                              <Plus className="h-4 w-4 mr-2" />
                              Ajouter le bien de base
                            </>
                          )
                        )}
                      </Button>
                    </div>

                    {/* Informations après ajout */}
                    {newPropertyId && (
                      <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-green-800 text-sm font-medium mb-2">
                          ✅ Bien ajouté avec succès !
                        </p>
                        <p className="text-green-700 text-sm mb-3">
                          Vous pouvez maintenant compléter les détails avancés (commodités, sécurité, photos, etc.)
                        </p>
                        <Button
                          onClick={() => setActiveTab("details")}
                          className="w-full"
                          variant="default"
                        >
                          Ajouter les détails avancés
                        </Button>
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="details" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Détails avancés de la propriété</CardTitle>
                  <CardDescription>
                    {editingProperty
                      ? `Gérez les détails avancés de: ${editingProperty.title}`
                      : newPropertyId
                        ? "Ajoutez les détails avancés de votre nouveau bien"
                        : "Sélectionnez une propriété pour gérer ses détails avancés"
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {editingProperty || newPropertyId ? (
                    <PropertyDetailsEditor propertyId={editingProperty?.id || newPropertyId!} />
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Building className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p className="text-lg font-medium mb-2">Aucune propriété sélectionnée</p>
                      <p className="text-sm mb-4">
                        Pour accéder aux détails avancés :
                      </p>
                      <div className="space-y-2 text-sm">
                        <p>• Modifiez une propriété existante depuis la liste</p>
                        <p>• Ou ajoutez un nouveau bien dans l'onglet précédent</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>


    </div>
  );
};

export default CRM;