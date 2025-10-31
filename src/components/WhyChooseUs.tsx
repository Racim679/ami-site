import { Section, SectionHeader, SectionTitle, SectionSubtitle } from "@/components/ui/section";
import { EnhancedCard, EnhancedCardContent, EnhancedCardHeader, EnhancedCardTitle, EnhancedCardDescription } from "@/components/ui/enhanced-card";
import { Button } from "@/components/ui/button";
import { Shield, Award, Users, Clock, Home, Star } from "lucide-react";
import { Link } from "react-router-dom";

const WhyChooseUs = () => {
  const features = [
    {
      icon: Shield,
      title: "Sécurité & Confiance",
      description: "Transactions sécurisées et accompagnement juridique complet pour tous vos projets immobiliers avec une garantie totale."
    },
    {
      icon: Award,
      title: "Excellence & Qualité", 
      description: "Plus de 15 ans d'expertise dans la construction de résidences haut de gamme avec des finitions exceptionnelles et des matériaux premium."
    },
    {
      icon: Users,
      title: "Équipe Experte",
      description: "Professionnels qualifiés et expérimentés qui vous accompagnent personnellement à chaque étape de votre projet immobilier."
    },
    {
      icon: Clock,
      title: "Réactivité & Ponctualité",
      description: "Respect scrupuleux des délais avec disponibilité 24/7 et suivi rigoureux de chaque phase de votre projet."
    },
    {
      icon: Home,
      title: "Suivi Personnalisé",
      description: "Accompagnement sur mesure de la conception à la livraison avec un service client dédié et un suivi en temps réel."
    },
    {
      icon: Star,
      title: "Satisfaction Garantie",
      description: "Plus de 500 clients satisfaits et une réputation d'excellence reconnue dans tout le secteur immobilier algérien."
    }
  ];

  return (
    <Section variant="luxury" className="relative overflow-hidden">
      {/* Enhanced Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-primary to-accent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-accent to-primary rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-accent/3" />

      <div className="relative z-10">
        <SectionHeader className="animate-fade-in-up mb-20">
          <SectionTitle>
            Pourquoi Nous Choisir
          </SectionTitle>
          <SectionSubtitle>
            L'excellence immobilière à votre service avec une expertise reconnue et un savoir-faire unique qui fait la différence
          </SectionSubtitle>
        </SectionHeader>

        {/* Enhanced Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-20">
          {features.map((feature, index) => (
            <EnhancedCard 
              key={feature.title} 
              variant="premium" 
              className="text-center group hover:scale-105 hover:-translate-y-2 transition-all duration-500 animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <EnhancedCardHeader>
                <div className="mx-auto w-20 h-20 bg-gradient-to-br from-primary via-accent to-primary-light rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-luxury">
                  <feature.icon className="h-10 w-10 text-white" />
                </div>
                <EnhancedCardTitle className="text-2xl md:text-3xl mb-4">
                  {feature.title}
                </EnhancedCardTitle>
              </EnhancedCardHeader>
              <EnhancedCardContent>
                <EnhancedCardDescription className="text-base md:text-lg leading-relaxed">
                  {feature.description}
                </EnhancedCardDescription>
              </EnhancedCardContent>
            </EnhancedCard>
          ))}
        </div>

        {/* Enhanced Call to Action */}
        <div className="text-center animate-fade-in-up delay-700">
          <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 rounded-3xl p-12 md:p-16 border border-primary/20 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent animate-gradient" />
            <div className="relative">
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-8 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Prêt à Concrétiser Votre Rêve ?
              </h3>
              <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-12 max-w-4xl mx-auto font-body leading-relaxed">
                Rejoignez nos centaines de clients satisfaits et découvrez pourquoi nous sommes le choix n°1 pour l'immobilier de prestige en Algérie.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link to="/contact">
                  <Button variant="premium" size="xl" className="group min-w-[280px]">
                    Découvrir Nos Projets
                    <Star className="ml-2 h-5 w-5 group-hover:animate-pulse" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" size="xl" className="min-w-[280px]">
                    Demander une Consultation
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default WhyChooseUs;