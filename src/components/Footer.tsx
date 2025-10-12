import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Facebook, Instagram, Linkedin, Youtube, Twitter, Phone, Mail, MapPin, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
const Footer = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    acceptTerms: false
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {
    toast
  } = useToast();
  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.acceptTerms) {
      toast({
        title: "Erreur",
        description: "Vous devez accepter les conditions pour continuer.",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "Catalogue envoyé !",
      description: "Le catalogue a été envoyé à votre adresse e-mail."
    });
    setIsDialogOpen(false);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      acceptTerms: false
    });
  };
  const navigationLinks = [{
    href: "/",
    label: "Accueil"
  }, {
    href: "/services",
    label: "Services"
  }, {
    href: "/nos-biens",
    label: "Nos Biens"
  }, {
    href: "/a-propos",
    label: "À propos"
  }, {
    href: "/contact",
    label: "Contact"
  }];
  const socialLinks = [{
    icon: Facebook,
    label: "Facebook",
    href: "#"
  }, {
    icon: Instagram,
    label: "Instagram",
    href: "#"
  }, {
    icon: Linkedin,
    label: "LinkedIn",
    href: "#"
  }, {
    icon: Youtube,
    label: "YouTube",
    href: "#"
  }];
  return <footer className="relative bg-gradient-to-br from-luxury-dark-900 to-luxury-dark-800 text-accent overflow-hidden">
      {/* Decorative element */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-radial from-accent/10 via-accent/5 to-transparent rounded-full transform translate-x-1/3 -translate-y-1/3"></div>
      
      <div className="relative container mx-auto px-4 py-16">
        
        
        {/* Brand Section */}
        <div className="text-center py-12 border-t border-accent/20">
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-light tracking-[0.2em] text-accent opacity-80 mb-3 font-gotham">IMAN
IMMO</h1>
          <p className="text-sm tracking-[0.25em] text-background uppercase opacity-60 font-gotham">
            Excellence Immobilière
          </p>
          
          {/* Catalog Download */}
          <div className="mt-8 max-w-md mx-auto">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="luxury" size="lg" className="w-full">
                  Télécharger le catalogue
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Télécharger le catalogue</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">Prénom</Label>
                      <Input id="firstName" value={formData.firstName} onChange={e => handleInputChange("firstName", e.target.value)} required />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Nom</Label>
                      <Input id="lastName" value={formData.lastName} onChange={e => handleInputChange("lastName", e.target.value)} required />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Adresse e-mail</Label>
                    <Input id="email" type="email" value={formData.email} onChange={e => handleInputChange("email", e.target.value)} required />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Numéro de téléphone</Label>
                    <Input id="phone" type="tel" value={formData.phone} onChange={e => handleInputChange("phone", e.target.value)} required />
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <Checkbox id="terms" checked={formData.acceptTerms} onCheckedChange={checked => handleInputChange("acceptTerms", checked)} />
                    <Label htmlFor="terms" className="text-sm leading-5">
                      J'atteste accepter que IMAN Promotion Immobilière assure la protection de ma vie privée en utilisant mes données personnelles uniquement pour gérer mon profil et mes demandes.
                    </Label>
                  </div>
                  
                  <Button type="submit" className="w-full">
                    Envoyer le catalogue
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="text-center pt-8 border-t border-accent/10">
          <p className="text-xs text-accent opacity-70">
            © 2024 IMAN Promotion. Tous droits réservés. | 
            <a href="/mentions-legales" className="hover:text-background transition-colors ml-1">Mentions légales</a> | 
            <a href="/politique-confidentialite" className="hover:text-background transition-colors ml-1">Politique de confidentialité</a>
          </p>
        </div>
      </div>
    </footer>;
};
export default Footer;