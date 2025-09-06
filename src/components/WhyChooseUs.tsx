import { Section, SectionHeader, SectionTitle, SectionSubtitle } from "@/components/ui/section";
import { EnhancedCard, EnhancedCardContent, EnhancedCardHeader, EnhancedCardTitle, EnhancedCardDescription } from "@/components/ui/enhanced-card";
import { Button } from "@/components/ui/button";
import { Sparkles, Award, Users, Clock } from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    {
      icon: Award,
      title: "Excellence & Qualité",
      description: "Plus de 15 ans d'expertise dans la construction de résidences haut de gamme avec des finitions exceptionnelles."
    },
    {
      icon: Users,
      title: "Service Personnalisé", 
      description: "Un accompagnement sur mesure à chaque étape de votre projet, de la conception à la livraison."
    },
    {
      icon: Sparkles,
      title: "Innovation & Design",
      description: "Des architectures modernes et innovantes qui allient esthétisme, fonctionnalité et durabilité."
    },
    {
      icon: Clock,
      title: "Respect des Délais",
      description: "Engagement ferme sur les délais de livraison avec un suivi rigoureux de chaque phase du projet."
    }
  ];

  return (
    <Section variant="gradient" className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-primary to-accent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-accent to-primary rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10">
        <SectionHeader className="animate-fade-in-up">
          <SectionTitle>
            Pourquoi Nous Choisir
          </SectionTitle>
          <SectionSubtitle>
            L'excellence immobilière à votre service avec une expertise reconnue et un savoir-faire unique en Algérie
          </SectionSubtitle>
        </SectionHeader>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <EnhancedCard 
              key={feature.title} 
              variant="luxury" 
              className="text-center group hover:scale-105 transition-all duration-500 animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <EnhancedCardHeader>
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 group-hover:rotate-3">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <EnhancedCardTitle className="text-xl mb-3">
                  {feature.title}
                </EnhancedCardTitle>
              </EnhancedCardHeader>
              <EnhancedCardContent>
                <EnhancedCardDescription className="text-base leading-relaxed">
                  {feature.description}
                </EnhancedCardDescription>
              </EnhancedCardContent>
            </EnhancedCard>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center animate-fade-in-up delay-700">
          <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-3xl p-12 border border-primary/20 backdrop-blur-sm">
            <h3 className="text-3xl md:text-4xl font-bold font-heading mb-6 gradient-text">
              Prêt à Concrétiser Votre Rêve ?
            </h3>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto font-body">
              Rejoignez nos centaines de clients satisfaits et découvrez pourquoi nous sommes le choix n°1 pour l'immobilier de prestige.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button variant="luxury" size="xl" className="group">
                Découvrir Nos Projets
                <Sparkles className="ml-2 h-5 w-5 group-hover:animate-pulse" />
              </Button>
              <Button variant="outline" size="xl">
                Demander une Consultation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default WhyChooseUs;