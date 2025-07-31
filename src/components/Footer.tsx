import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Facebook, Instagram, Linkedin, Youtube, Twitter } from "lucide-react";
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
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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

    // Simulate email sending
    toast({
      title: "Catalogue envoyé !",
      description: "Le catalogue a été envoyé à votre adresse e-mail.",
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

  const socialLinks = [
    { icon: Facebook, label: "Facebook" },
    { icon: Instagram, label: "Instagram" },
    { icon: Linkedin, label: "LinkedIn" },
    { icon: Youtube, label: "YouTube" },
    { icon: Twitter, label: "TikTok" },
    { icon: Twitter, label: "X (Twitter)" }
  ];

  const localities = [
    "Casablanca",
    "Rabat", 
    "Marrakech",
    "Tanger",
    "Agadir",
    "Fès"
  ];

  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left - Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold mb-6">IMAN Promotion</h3>
            <div className="space-y-2">
              <p>123 Avenue Mohammed V</p>
              <p>Casablanca, Maroc</p>
              <p>Tél: +212 5 22 XX XX XX</p>
              <p>Email: contact@iman-promotion.ma</p>
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-4 pt-4">
              {socialLinks.map((social, index) => (
                <button
                  key={index}
                  className="w-10 h-10 bg-background/10 rounded-full flex items-center justify-center hover:bg-background/20 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </button>
              ))}
            </div>
          </div>

          {/* Center - Localities */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Nos localités</h3>
            <div className="grid grid-cols-2 gap-3">
              {localities.map((locality, index) => (
                <div 
                  key={index}
                  className="p-3 bg-background/10 rounded-lg text-center hover:bg-background/20 transition-colors cursor-pointer"
                >
                  {locality}
                </div>
              ))}
            </div>
          </div>

          {/* Right - Catalog */}
          <div className="text-center">
            <img
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f"
              alt="Catalogue"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="secondary" size="lg" className="w-full">
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
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Nom</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Adresse e-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Numéro de téléphone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      checked={formData.acceptTerms}
                      onCheckedChange={(checked) => handleInputChange("acceptTerms", checked)}
                    />
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
      </div>
    </footer>
  );
};

export default Footer;