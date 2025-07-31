import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Building, Plus } from "lucide-react";

interface PropertyFormData {
  title: string;
  description: string;
  status: "lancement" | "en_cours" | "livré";
  surface_m2: string;
  prix_dinar: string;
  typology_id: string;
  locality_id: string;
  image_url: string;
  latitude: string;
  longitude: string;
}

const CRM = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<PropertyFormData>({
    title: "",
    description: "",
    status: "lancement",
    surface_m2: "",
    prix_dinar: "",
    typology_id: "",
    locality_id: "",
    image_url: "",
    latitude: "",
    longitude: "",
  });

  const typologies = [
    { id: "36a6c906-72bb-4325-8c0c-110d86251ecc", label: "Appartement" },
    { id: "52e02ba1-48e7-40b6-a3f5-4ca7cda07665", label: "Appartement commercial" },
    { id: "05644ccf-1f27-4780-ad83-50e0c72f57d3", label: "Complexe touristique" },
    { id: "1aff2af9-56b3-4c75-a66e-8ddbbf0f3ad1", label: "Duplex" },
    { id: "f4f54705-e199-45ab-aece-5ea03cfcc9e5", label: "Hôtel" },
    { id: "d70a49c1-890b-4f18-a5f1-4e0b51b48a17", label: "Immeuble commercial" },
    { id: "fb47bbb8-68cc-49ed-a43d-9ff88f16dd45", label: "Immeuble duplex" },
    { id: "0886df7a-4e90-4707-bdf3-439b2955be70", label: "Locaux commerciaux" },
    { id: "fb764e4a-49b2-4455-ab28-62276661dc9e", label: "Loft" },
    { id: "a442b3de-97e0-4a76-943c-f6fccd2a8718", label: "Maison" },
    { id: "d59fe838-818c-448e-a8b8-e7567874ed58", label: "Propriété de campagne" },
    { id: "80f4a6ef-eb74-471e-a8f9-a1435457516c", label: "Ranch" },
    { id: "6693a796-8a99-4d65-86d9-93696c4ad2fc", label: "Studio" },
    { id: "1e0f2dc5-0233-4a25-9f02-c4d27cb056bf", label: "Terrain" },
    { id: "2ad957dd-2ade-4f81-ab69-ca5521b28cfe", label: "Triplex" },
    { id: "99be046f-891c-4787-86f1-58ae56712fd6", label: "Villa" },
  ];

  const localities = [
    { id: "74bb88e4-557a-4e0b-a7d7-fa4d45c8c798", name: "Bab El Oued" },
    { id: "15872448-9032-4dac-a8cc-5ef7ba03af2d", name: "Belgaïd" },
    { id: "1289a44e-040c-4f64-878b-fa32bd6d11b9", name: "Bir El Djir" },
    { id: "bcc07508-2cb8-4cbf-a197-451a8da33acb", name: "El Khroub" },
    { id: "1afdb5f8-8c53-4f9b-a3e8-da6ac04ffd3c", name: "El Madania" },
    { id: "f3933de3-7a81-4122-8198-314a4819e40f", name: "Hydra" },
  ];

  const handleInputChange = (field: keyof PropertyFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.status) {
      toast({
        title: "Erreur",
        description: "Le titre et le statut sont obligatoires",
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
        surface_m2: formData.surface_m2 ? parseFloat(formData.surface_m2) : null,
        prix_dinar: formData.prix_dinar ? parseInt(formData.prix_dinar) : null,
        typology_id: formData.typology_id || null,
        locality_id: formData.locality_id || null,
        image_url: formData.image_url || null,
        latitude: formData.latitude ? parseFloat(formData.latitude) : null,
        longitude: formData.longitude ? parseFloat(formData.longitude) : null,
      };

      const { error } = await supabase
        .from("properties")
        .insert([propertyData]);

      if (error) {
        throw error;
      }

      toast({
        title: "Succès",
        description: "Le bien a été ajouté avec succès",
      });

      // Reset form
      setFormData({
        title: "",
        description: "",
        status: "lancement",
        surface_m2: "",
        prix_dinar: "",
        typology_id: "",
        locality_id: "",
        image_url: "",
        latitude: "",
        longitude: "",
      });

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <Header />
      
      <main className="container mx-auto px-4 py-8 mt-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Building className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">CRM - Gestion des Biens</h1>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Ajouter un nouveau bien
              </CardTitle>
              <CardDescription>
                Remplissez les informations pour ajouter un bien à votre portefeuille
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
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
                        <SelectItem value="lancement">En lancement</SelectItem>
                        <SelectItem value="en_cours">En cours</SelectItem>
                        <SelectItem value="livré">Livré</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Type de bien */}
                  <div className="space-y-2">
                    <Label htmlFor="typology">Type de bien</Label>
                    <Select
                      value={formData.typology_id}
                      onValueChange={(value) => handleInputChange("typology_id", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un type" />
                      </SelectTrigger>
                      <SelectContent>
                        {typologies.map((type) => (
                          <SelectItem key={type.id} value={type.id}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Localité */}
                  <div className="space-y-2">
                    <Label htmlFor="locality">Localité</Label>
                    <Select
                      value={formData.locality_id}
                      onValueChange={(value) => handleInputChange("locality_id", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une localité" />
                      </SelectTrigger>
                      <SelectContent>
                        {localities.map((locality) => (
                          <SelectItem key={locality.id} value={locality.id}>
                            {locality.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Surface */}
                  <div className="space-y-2">
                    <Label htmlFor="surface">Surface (m²)</Label>
                    <Input
                      id="surface"
                      type="number"
                      value={formData.surface_m2}
                      onChange={(e) => handleInputChange("surface_m2", e.target.value)}
                      placeholder="Ex: 85"
                    />
                  </div>

                  {/* Prix */}
                  <div className="space-y-2">
                    <Label htmlFor="price">Prix (DZD)</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.prix_dinar}
                      onChange={(e) => handleInputChange("prix_dinar", e.target.value)}
                      placeholder="Ex: 5000000"
                    />
                  </div>

                  {/* URL de l'image */}
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="image_url">URL de l'image</Label>
                    <Input
                      id="image_url"
                      value={formData.image_url}
                      onChange={(e) => handleInputChange("image_url", e.target.value)}
                      placeholder="https://exemple.com/image.jpg"
                    />
                  </div>

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

                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? "Ajout en cours..." : "Ajouter le bien"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CRM;