import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FileText,
  Camera,
  Calculator,
  Phone,
  Mail,
  MapPin,
  Building2,
  Home,
  Users,
  Award,
  Euro,
  CheckCircle
} from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { AnimatedSection } from "@/components/AnimatedComponents";

const Vendre = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState<string | null>(null);

  const sellingSteps = [
    {
      id: "evaluation",
      title: "Évaluation gratuite",
      description: "Obtenez une estimation précise de votre bien",
      icon: Calculator,
      color: "bg-blue-500"
    },
    {
      id: "photos",
      title: "Photos professionnelles",
      description: "Mise en valeur avec des photos de qualité",
      icon: Camera,
      color: "bg-green-500"
    },
    {
      id: "mandatage",
      title: "Mandatage",
      description: "Signez votre mandat de vente avec nous",
      icon: FileText,
      color: "bg-purple-500"
    }
  ];

  const advantages = [
    {
      title: "Estimation gratuite",
      description: "Évaluation précise de votre bien par nos experts",
      icon: Euro
    },
    {
      title: "Accompagnement complet",
      description: "De l'estimation à la signature chez le notaire",
      icon: CheckCircle
    },
    {
      title: "Marketing professionnel",
      description: "Photos, visite virtuelle et diffusion multi-canaux",
      icon: Camera
    },
    {
      title: "Négociation experte",
      description: "Nos agents négocient le meilleur prix pour vous",
      icon: Users
    }
  ];

  const renderStepContent = () => {
    switch (activeStep) {
      case "evaluation":
        return (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Demande d'évaluation gratuite</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nom">Nom</Label>
                  <Input id="nom" placeholder="Votre nom" />
                </div>
                <div>
                  <Label htmlFor="prenom">Prénom</Label>
                  <Input id="prenom" placeholder="Votre prénom" />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="votre@email.com" />
              </div>
              <div>
                <Label htmlFor="telephone">Téléphone</Label>
                <Input id="telephone" placeholder="Votre téléphone" />
              </div>
              <div>
                <Label htmlFor="adresse">Adresse du bien</Label>
                <Input id="adresse" placeholder="Adresse complète du bien" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type">Type de bien</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="appartement">Appartement</SelectItem>
                      <SelectItem value="maison">Maison</SelectItem>
                      <SelectItem value="villa">Villa</SelectItem>
                      <SelectItem value="terrain">Terrain</SelectItem>
                      <SelectItem value="local">Local commercial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="surface">Surface (m²)</Label>
                  <Input id="surface" type="number" placeholder="Surface" />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description du bien</Label>
                <Textarea id="description" placeholder="Décrivez votre bien..." rows={4} />
              </div>
              <Button className="w-full">Demander mon évaluation gratuite</Button>
            </CardContent>
          </Card>
        );
      case "photos":
        return (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Service photo professionnel</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <Camera className="w-24 h-24 mx-auto text-primary" />
                <h3 className="text-xl font-semibold">Photos et visite virtuelle</h3>
                <p className="text-muted-foreground">
                  Nos photographes professionnels mettent en valeur votre bien avec des photos haute qualité 
                  et une visite virtuelle 360°.
                </p>
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Inclus dans notre service :</h4>
                  <ul className="text-left space-y-1">
                    <li>• Photos haute résolution</li>
                    <li>• Visite virtuelle 360°</li>
                    <li>• Plan de masse et plan d'étage</li>
                    <li>• Vidéo de présentation (optionnel)</li>
                  </ul>
                </div>
                <Button onClick={() => navigate('/contact')}>
                  Planifier une séance photo
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      case "mandatage":
        return (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Mandat de vente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Types de mandats disponibles :</h4>
                  <div className="space-y-3">
                    <div className="border border-border p-3 rounded">
                      <h5 className="font-medium">Mandat simple</h5>
                      <p className="text-sm text-muted-foreground">
                        Vous pouvez confier la vente à plusieurs agences
                      </p>
                    </div>
                    <div className="border border-border p-3 rounded">
                      <h5 className="font-medium">Mandat exclusif</h5>
                      <p className="text-sm text-muted-foreground">
                        Mandat confié uniquement à notre agence avec conditions préférentielles
                      </p>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <Button onClick={() => navigate('/contact')}>
                    Prendre rendez-vous pour le mandat
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <AnimatedSection className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Vendre votre bien
          </motion.h1>
          <motion.p
            className="text-xl text-primary-foreground/90 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Vendez votre bien immobilier rapidement et au meilleur prix avec nos experts
          </motion.p>
        </div>
      </AnimatedSection>

      {/* Étapes de vente */}
      <AnimatedSection className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Comment vendre avec nous
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Un processus simple et efficace en 3 étapes
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            initial="hidden"
            animate="show"
          >
            {sellingSteps.map((step, index) => (
              <motion.div
                key={step.id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.5 }}
              >
                <div
                  className="h-full cursor-pointer hover:shadow-xl transition-all duration-300 bg-card border border-border rounded-lg p-6"
                  onClick={() => setActiveStep(step.id)}
                >
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-sm font-medium text-primary mb-2">
                      Étape {index + 1}
                    </div>
                    <CardTitle className="text-xl font-bold text-foreground">
                      {step.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground mb-4">
                      {step.description}
                    </p>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setActiveStep(step.id)}
                    >
                      Commencer
                    </Button>
                  </CardContent>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Contenu de l'étape active */}
      {activeStep && (
        <AnimatedSection className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="max-w-4xl mx-auto">
                <Button
                  variant="outline"
                  onClick={() => setActiveStep(null)}
                  className="mb-8"
                >
                  ← Retour aux étapes
                </Button>
                {renderStepContent()}
              </div>
            </motion.div>
          </div>
        </AnimatedSection>
      )}

      {/* Avantages */}
      <AnimatedSection className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Pourquoi nous choisir ?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Les avantages de confier la vente de votre bien à nos experts
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {advantages.map((advantage, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.5 }}
              >
                <Card className="h-full text-center">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <advantage.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-3">
                      {advantage.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {advantage.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Statistiques */}
      <AnimatedSection className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                show: { opacity: 1, scale: 1 }
              }}
              transition={{ duration: 0.5 }}
            >
              <Building2 className="w-12 h-12 mx-auto mb-4 text-primary-foreground/80" />
              <div className="text-3xl font-bold mb-2">500+</div>
              <div className="text-primary-foreground/80">Biens vendus</div>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                show: { opacity: 1, scale: 1 }
              }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Home className="w-12 h-12 mx-auto mb-4 text-primary-foreground/80" />
              <div className="text-3xl font-bold mb-2">45</div>
              <div className="text-primary-foreground/80">Jours moyenne de vente</div>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                show: { opacity: 1, scale: 1 }
              }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Users className="w-12 h-12 mx-auto mb-4 text-primary-foreground/80" />
              <div className="text-3xl font-bold mb-2">98%</div>
              <div className="text-primary-foreground/80">Clients satisfaits</div>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                show: { opacity: 1, scale: 1 }
              }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Award className="w-12 h-12 mx-auto mb-4 text-primary-foreground/80" />
              <div className="text-3xl font-bold mb-2">5 ans</div>
              <div className="text-primary-foreground/80">D'expérience</div>
            </motion.div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Footer */}
      <Footer />

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
};

export default Vendre;