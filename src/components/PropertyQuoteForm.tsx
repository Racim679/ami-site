import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface PropertyQuoteFormProps {
  propertyTitle?: string;
  latitude?: number;
  longitude?: number;
}

const PropertyQuoteForm: React.FC<PropertyQuoteFormProps> = ({ 
  propertyTitle,
  latitude = 36.7538,
  longitude = 3.0588
}) => {
  const [formData, setFormData] = useState({
    email: '',
    prenom: '',
    nom: '',
    telephone: ''
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation basique
    if (!formData.email || !formData.prenom || !formData.nom || !formData.telephone) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive",
      });
      return;
    }

    // Simulation d'envoi
    toast({
      title: "Demande envoyée",
      description: "Nous vous recontacterons dans les plus brefs délais",
    });

    // Reset du formulaire
    setFormData({
      email: '',
      prenom: '',
      nom: '',
      telephone: ''
    });
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Demandez votre devis</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Carte - Côté gauche */}
          <div className="order-2 lg:order-1">
            <Card className="h-full">
              <CardContent className="p-0">
                <div className="aspect-video w-full rounded-lg overflow-hidden">
                  <iframe
                    src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1000!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1234567890`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Localisation du bien"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Formulaire - Côté droit */}
          <div className="order-1 lg:order-2">
            <Card>
              <CardContent className="p-8">
                <div className="mb-6">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Besoin d'une information particulière à propos de notre bien ? 
                    Remplissez ce formulaire et nous vous recontacterons dans les plus brefs délais.
                  </p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="prenom">Prénom *</Label>
                      <Input
                        id="prenom"
                        name="prenom"
                        type="text"
                        value={formData.prenom}
                        onChange={handleInputChange}
                        className="mt-1 bg-white border-input focus:border-[#C49C7A] focus:ring-[#C49C7A]"
                        placeholder="Votre prénom"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="nom">Nom *</Label>
                      <Input
                        id="nom"
                        name="nom"
                        type="text"
                        value={formData.nom}
                        onChange={handleInputChange}
                        className="mt-1 bg-white border-input focus:border-[#C49C7A] focus:ring-[#C49C7A]"
                        placeholder="Votre nom"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">E-mail *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="mt-1 bg-white border-input focus:border-[#C49C7A] focus:ring-[#C49C7A]"
                      placeholder="votre.email@exemple.com"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="telephone">Numéro de téléphone *</Label>
                    <Input
                      id="telephone"
                      name="telephone"
                      type="tel"
                      value={formData.telephone}
                      onChange={handleInputChange}
                      className="mt-1 bg-white border-input focus:border-[#C49C7A] focus:ring-[#C49C7A]"
                      placeholder="+213 X XX XX XX XX"
                      required
                    />
                  </div>
                  
                  <div className="pt-4">
                    <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                      Samael Promotion Immobilière assure la protection de votre vie privée. 
                      Vos données personnelles ne seront utilisées que dans le cadre de votre demande 
                      et ne seront jamais transmises à des tiers.
                    </p>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-[#C49C7A] hover:bg-[#B8906A] text-white font-medium py-3"
                    >
                      Soumettre ma demande
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyQuoteForm;