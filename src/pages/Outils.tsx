import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Calculator,
  TrendingUp,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Building2,
  Home,
  Users,
  Award
} from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MortgageCalculator from "@/components/MortgageCalculator";
import PriceEstimator from "@/components/PriceEstimator";
import AppointmentBooking from "@/components/AppointmentBooking";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { AnimatedSection, AnimatedCard } from "@/components/AnimatedComponents";

const Outils = () => {
  const navigate = useNavigate();
  const [activeTool, setActiveTool] = useState<string | null>(null);

  const tools = [
    {
      id: "mortgage",
      title: "Simulateur de crédit",
      description: "Calculez votre capacité d'emprunt et vos mensualités",
      icon: Calculator,
      color: "bg-blue-500"
    },
    {
      id: "estimator",
      title: "Estimateur de prix",
      description: "Estimez la valeur de votre bien immobilier",
      icon: TrendingUp,
      color: "bg-green-500"
    },
    {
      id: "appointment",
      title: "Prise de Rendez-vous",
      description: "Prenez rendez-vous avec nos experts",
      icon: Calendar,
      color: "bg-purple-500"
    }
  ];

  const helpServices = [
    {
      title: "Contactez un expert",
      description: "Parlez directement avec nos conseillers",
      icon: Phone,
      action: () => navigate('/contact')
    },
    {
      title: "Prendre rendez-vous",
      description: "Planifiez une visite ou une consultation",
      icon: Calendar,
      action: () => setActiveTool('appointment')
    }
  ];

  const renderToolContent = () => {
    switch (activeTool) {
      case "mortgage":
        return <MortgageCalculator />;
      case "estimator":
        return <PriceEstimator />;
      case "appointment":
        return <AppointmentBooking />;
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
            Nos Outils
          </motion.h1>
          <motion.p
            className="text-xl text-primary-foreground/90 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Des outils pratiques pour vous accompagner dans vos projets immobiliers
          </motion.p>
        </div>
      </AnimatedSection>

      {/* Outils principaux */}
      <AnimatedSection className="py-16">
        <div className="container mx-auto px-4">
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
            {tools.map((tool, index) => (
              <motion.div
                key={tool.id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.5 }}
              >
                <div
                  className="h-full cursor-pointer hover:shadow-xl transition-all duration-300 bg-card border border-border rounded-lg p-6"
                  onClick={() => setActiveTool(tool.id)}
                >
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 ${tool.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <tool.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-foreground">
                      {tool.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground mb-4">
                      {tool.description}
                    </p>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setActiveTool(tool.id)}
                    >
                      Utiliser
                    </Button>
                  </CardContent>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Contenu de l'outil actif */}
      {activeTool && (
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
                  onClick={() => setActiveTool(null)}
                  className="mb-8"
                >
                  ← Retour aux outils
                </Button>
                {renderToolContent()}
              </div>
            </motion.div>
          </div>
        </AnimatedSection>
      )}

      {/* Section d'aide */}
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
              Besoin d'aide ?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Notre équipe d'experts est là pour vous accompagner dans tous vos projets immobiliers
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
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
            {helpServices.map((service, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.5 }}
              >
                <div
                  className="h-full cursor-pointer hover:shadow-xl transition-all duration-300 bg-card border border-border rounded-lg"
                  onClick={service.action}
                >
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <service.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      {service.description}
                    </p>
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      Commencer
                    </Button>
                  </CardContent>
                </div>
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
              <div className="text-primary-foreground/80">Projets réalisés</div>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                show: { opacity: 1, scale: 1 }
              }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Home className="w-12 h-12 mx-auto mb-4 text-primary-foreground/80" />
              <div className="text-3xl font-bold mb-2">150+</div>
              <div className="text-primary-foreground/80">Biens disponibles</div>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                show: { opacity: 1, scale: 1 }
              }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Users className="w-12 h-12 mx-auto mb-4 text-primary-foreground/80" />
              <div className="text-3xl font-bold mb-2">1000+</div>
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

export default Outils; 