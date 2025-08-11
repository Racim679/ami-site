import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, Ruler, DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PropertyQuoteForm from '@/components/PropertyQuoteForm';

interface PropertyDetailData {
  id: string;
  title: string;
  description?: string;
  surface_m2?: number;
  prix_dinar?: number;
  status: string;
  image_url?: string;
  created_at: string;
  latitude?: number;
  longitude?: number;
  locality?: {
    name: string;
    city?: {
      name: string;
    };
  };
  typology?: {
    label: string;
  };
}

const PropertyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<PropertyDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) return;

      try {
        const { data, error } = await supabase
          .from('properties')
          .select(`
            *,
            locality:localities(
              name,
              city:cities(name)
            ),
            typology:typologies(label)
          `)
          .eq('id', id)
          .maybeSingle();

        if (error) throw error;
        setProperty(data);
      } catch (error) {
        console.error('Erreur lors du chargement de la propriété:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les détails de cette propriété",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id, toast]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">Chargement...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Propriété non trouvée</h2>
                <Link to="/nos-biens">
                  <Button>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Retour à la liste
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  const formatPrice = (price?: number) => {
    if (!price) return 'Prix sur demande';
    return new Intl.NumberFormat('fr-TN', {
      style: 'decimal',
      minimumFractionDigits: 0,
    }).format(price) + ' DT';
  };

  const getLocationText = () => {
    const parts = [];
    if (property.locality?.name) parts.push(property.locality.name);
    if (property.locality?.city?.name) parts.push(property.locality.city.name);
    return parts.join(', ') || 'Localisation non spécifiée';
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/nos-biens">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour à la liste
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image */}
          <div className="space-y-4">
            <div className="aspect-video rounded-lg overflow-hidden bg-muted">
              {property.image_url ? (
                <img
                  src={property.image_url}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  Aucune image disponible
                </div>
              )}
            </div>
          </div>

          {/* Informations */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
              <div className="flex items-center text-muted-foreground mb-4">
                <MapPin className="w-4 h-4 mr-1" />
                {getLocationText()}
              </div>
              <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                {property.status}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {property.typology?.label && (
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="font-semibold">Type</div>
                    <div className="text-muted-foreground">{property.typology.label}</div>
                  </CardContent>
                </Card>
              )}
              
              {property.surface_m2 && (
                <Card>
                  <CardContent className="p-4 text-center">
                    <Ruler className="w-5 h-5 mx-auto mb-1 text-primary" />
                    <div className="font-semibold">{property.surface_m2} m²</div>
                    <div className="text-sm text-muted-foreground">Surface</div>
                  </CardContent>
                </Card>
              )}
              
              <Card>
                <CardContent className="p-4 text-center">
                  <DollarSign className="w-5 h-5 mx-auto mb-1 text-primary" />
                  <div className="font-semibold">{formatPrice(property.prix_dinar)}</div>
                  <div className="text-sm text-muted-foreground">Prix</div>
                </CardContent>
              </Card>
            </div>

            {property.description && (
              <Card>
                <CardHeader>
                  <CardTitle>Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {property.description}
                  </p>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Intéressé par cette propriété ?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Contactez-nous pour plus d'informations ou pour organiser une visite.
                </p>
                <Link to="/contact">
                  <Button className="w-full">
                    Nous contacter
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      {/* Section de demande de devis */}
      <PropertyQuoteForm 
        propertyTitle={property.title}
        latitude={property.latitude}
        longitude={property.longitude}
      />
      
      <Footer />
    </div>
  );
};

export default PropertyDetail;