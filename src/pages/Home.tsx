import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Home as HomeIcon, Shield, Users, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { AnimatedSection, AnimatedCard, AnimatedButton } from "@/components/AnimatedComponents";
import AuditButton from "@/components/ui/audit-button";
const Home: React.FC = () => {
  const navigate = useNavigate();
  const features = [{
    icon: HomeIcon,
    title: "Projets Immobiliers",
    description: "Découvrez nos résidences de standing et projets immobiliers exclusifs à Alger."
  }, {
    icon: Shield,
    title: "Sécurité & Confiance",
    description: "Plus de 500 transactions réussies avec un taux de satisfaction de 98%."
  }, {
    icon: Users,
    title: "Équipe Experte",
    description: "Une équipe de professionnels expérimentés pour vous accompagner."
  }, {
    icon: Award,
    title: "Service Premium",
    description: "Accompagnement personnalisé et service client d'excellence."
  }];
  return <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <AnimatedSection className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/60 z-10"></div>
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
        backgroundImage: "url('/placeholder.svg')"
      }}></div>

        <div className="relative z-20 text-center text-primary-foreground px-4 max-w-4xl mx-auto">
          <motion.h1 className="text-5xl md:text-7xl font-bold mb-6" initial={{
          opacity: 0,
          y: 50
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }}>IMAN IMMO</motion.h1>

          <motion.p className="text-xl md:text-2xl mb-8 text-primary-foreground/90" initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.2
        }}>
            Découvrez nos projets immobiliers exceptionnels à Alger
          </motion.p>

          <motion.div className="mb-6" initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.3
        }}>
            <AuditButton 
              text="Évaluation Gratuite"
              showArrow={true}
              onClick={() => navigate('/vendre')}
            />
          </motion.div>

          <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.4
        }}>
            <AnimatedButton className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg text-lg font-semibold transition-colors" onClick={() => navigate('/nos-biens')}>
              Découvrir nos biens
              <ArrowRight className="ml-2 w-5 h-5" />
            </AnimatedButton>
            <AnimatedButton className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary px-8 py-3 rounded-lg text-lg font-semibold transition-colors" onClick={() => navigate('/contact')}>
              Nous contacter
            </AnimatedButton>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Features Section */}
      <AnimatedSection className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }}>
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Pourquoi choisir Aymen Promotion ?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Une expertise reconnue et un accompagnement personnalisé pour tous vos projets immobiliers.
            </p>
          </motion.div>

          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" variants={{
          hidden: {
            opacity: 0
          },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1
            }
          }
        }} initial="hidden" whileInView="show" viewport={{
          once: true
        }}>
            {features.map((feature, index) => <motion.div key={index} variants={{
            hidden: {
              opacity: 0,
              y: 30
            },
            show: {
              opacity: 1,
              y: 0
            }
          }} transition={{
            duration: 0.5
          }}>
                <AnimatedCard className="text-center p-6 h-full bg-card border border-border">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </AnimatedCard>
              </motion.div>)}
          </motion.div>
        </div>
      </AnimatedSection>


      {/* CTA Section */}
      <AnimatedSection className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <motion.h2 className="text-4xl font-bold text-foreground mb-4" initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }}>
            Prêt à réaliser votre projet immobilier ?
          </motion.h2>

          <motion.p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto" initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6,
          delay: 0.2
        }}>
            Contactez notre équipe d'experts pour un accompagnement personnalisé.
          </motion.p>

          <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6,
          delay: 0.4
        }}>
            <AnimatedButton className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg text-lg font-semibold transition-colors" onClick={() => navigate('/vendre')}>
              Prendre rendez-vous
            </AnimatedButton>
            <AnimatedButton className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3 rounded-lg text-lg font-semibold transition-colors" onClick={() => navigate('/nos-biens')}>
              Voir nos biens
            </AnimatedButton>
          </motion.div>
        </div>
      </AnimatedSection>

      
      {/* Footer */}
      <Footer />
      
      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>;
};
export default Home;