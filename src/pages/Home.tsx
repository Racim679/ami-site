import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Home as HomeIcon, Shield, Users, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import { AnimatedSection, AnimatedCard, AnimatedButton } from "@/components/AnimatedComponents";
import AuditButton from "@/components/ui/audit-button";
import FeaturedPropertiesCarousel from "@/components/FeaturedPropertiesCarousel";
import CitiesCarousel from "@/components/CitiesCarousel";
import PropertyFilters, { FilterState } from "@/components/PropertyFilters";
const Home: React.FC = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<FilterState>({
    typeOffre: "",
    type: "",
    localite: "",
    minPrice: "",
    maxPrice: "",
    minSurface: "",
    maxSurface: "",
    chambres: "",
    sallesBain: "",
    etages: "",
    commodites: [],
    securite: [],
    documents: [],
    proximite: [],
    vue: ""
  });
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
      <AnimatedSection className="relative h-[60vh] md:h-[75vh] lg:h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/60 z-10"></div>
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
        backgroundImage: "url('/placeholder.svg')"
      }}></div>

        <div className="relative z-20 text-center text-primary-foreground px-4 sm:px-6 md:px-8 w-full max-w-4xl mx-auto">
          <motion.h1 className="text-3xl min-[375px]:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight" initial={{
          opacity: 0,
          y: 50
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }}>AMI IMMO</motion.h1>

          <motion.p className="text-sm min-[375px]:text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-primary-foreground/90 px-2 sm:px-4 leading-relaxed" initial={{
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

          <motion.div className="mb-6 w-full flex justify-center px-4 sm:px-0" initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.3
        }}>
            <div className="w-full sm:w-auto max-w-xs sm:max-w-none">
              <AuditButton text="Nos biens" showArrow={true} onClick={() => navigate('/nos-biens')} width="100%" height={50} fontSize={14} className="w-full sm:w-auto sm:!w-[380px]" />
            </div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Filtres - Desktop seulement */}
      <AnimatedSection className="hidden lg:block pt-2 pb-2 bg-muted/30">
        <div className="container mx-auto px-4">
          <PropertyFilters onSearch={setFilters} />
        </div>
      </AnimatedSection>

      {/* Featured Properties Carousel */}
      <FeaturedPropertiesCarousel externalFilters={filters} />

      {/* Cities Carousel */}
      <CitiesCarousel />

      {/* Features Section */}
      <AnimatedSection className="pb-4 pt-2 bg-background">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-4 sm:mb-6 px-4" initial={{
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
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4 leading-tight">Pourquoi choisir AMI Immobilier ?</h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed md:text-lg">
              Une expertise reconnue et un accompagnement personnalisé pour tous vos projets immobiliers.
            </p>
          </motion.div>

          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6" variants={{
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
                <AnimatedCard className="text-center p-4 md:p-5 h-full bg-card border border-border">
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

          {/* CTA Contact */}
          <motion.div className="text-center mt-6 md:mt-8" initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6,
          delay: 0.4
        }}>
            <AuditButton text="Contactez-nous" showArrow={true} onClick={() => navigate('/contact')} width="auto" height={50} fontSize={14} className="mx-auto" />
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>;
};
export default Home;