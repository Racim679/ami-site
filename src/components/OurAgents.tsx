import React from "react";
import { Phone, Mail, MapPin, Star, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
interface Agent {
  id: number;
  name: string;
  role: string;
  speciality: string;
  experience: string;
  rating: number;
  deals: number;
  phone: string;
  email: string;
  avatar: string;
  description: string;
  languages: string[];
  certifications: string[];
}
const agents: Agent[] = [{
  id: 1,
  name: "Aymen Benali",
  role: "Directeur Commercial",
  speciality: "Vente & Investissement",
  experience: "8 ans d'expérience",
  rating: 4.9,
  deals: 150,
  phone: "+213 770 123 456",
  email: "aymen@aymenpromotion.dz",
  avatar: "/placeholder.svg",
  description: "Spécialiste en investissement immobilier et gestion de portefeuille. Expert en négociation et accompagnement client.",
  languages: ["Français", "Arabe", "Anglais"],
  certifications: ["Certification FNAIM", "Expert Immobilier"]
}, {
  id: 2,
  name: "Sarah Messaoudi",
  role: "Conseillère Immobilière",
  speciality: "Location & Gestion",
  experience: "5 ans d'expérience",
  rating: 4.8,
  deals: 89,
  phone: "+213 770 234 567",
  email: "sarah@aymenpromotion.dz",
  avatar: "/placeholder.svg",
  description: "Spécialisée dans la location et la gestion locative. Accompagnement personnalisé pour les locataires et propriétaires.",
  languages: ["Français", "Arabe"],
  certifications: ["Gestion Locative", "Droit Immobilier"]
}, {
  id: 3,
  name: "Karim Zerrouki",
  role: "Expert Immobilier",
  speciality: "Nouveautés & Promotion",
  experience: "6 ans d'expérience",
  rating: 4.7,
  deals: 112,
  phone: "+213 770 345 678",
  email: "karim@aymenpromotion.dz",
  avatar: "/placeholder.svg",
  description: "Expert en promotion immobilière et nouveaux projets. Accompagnement complet du projet à la livraison.",
  languages: ["Français", "Arabe", "Anglais"],
  certifications: ["Promotion Immobilière", "Gestion de Projet"]
}, {
  id: 4,
  name: "Fatima Boudiaf",
  role: "Conseillère Client",
  speciality: "Accompagnement Achat",
  experience: "4 ans d'expérience",
  rating: 4.9,
  deals: 67,
  phone: "+213 770 456 789",
  email: "fatima@aymenpromotion.dz",
  avatar: "/placeholder.svg",
  description: "Spécialisée dans l'accompagnement des primo-accédants et l'obtention de financements immobiliers.",
  languages: ["Français", "Arabe"],
  certifications: ["Financement Immobilier", "Accompagnement Client"]
}];
const OurAgents: React.FC = () => {
  const renderStars = (rating: number) => {
    return Array.from({
      length: 5
    }, (_, i) => <Star key={i} className={`w-3 h-3 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />);
  };

  const AgentCard: React.FC<{ agent: Agent }> = ({ agent }) => (
    <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
      <CardContent className="p-6">
        <div className="text-center mb-4">
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/70 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold text-xl">
            {agent.name.split(' ').map(n => n[0]).join('')}
          </div>
          <h3 className="font-bold text-lg text-gray-900">{agent.name}</h3>
          <p className="text-primary font-medium">{agent.role}</p>
          <p className="text-sm text-gray-600">{agent.speciality}</p>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-center gap-1">
            {renderStars(agent.rating)}
            <span className="text-sm text-gray-600 ml-1">({agent.rating})</span>
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-center p-2 bg-gray-50 rounded-lg">
              <div className="font-bold text-primary">{agent.deals}</div>
              <div className="text-gray-600">Transactions</div>
            </div>
            <div className="text-center p-2 bg-gray-50 rounded-lg">
              <div className="font-bold text-primary">{agent.experience}</div>
              <div className="text-gray-600">Expérience</div>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-600 text-center mb-4 line-clamp-3">
          {agent.description}
        </p>

        <div className="space-y-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full group-hover:border-primary group-hover:text-primary transition-colors"
            asChild
          >
            <a href={`tel:${agent.phone}`} className="flex items-center justify-center gap-2">
              <Phone className="w-4 h-4" />
              Appeler
            </a>
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full group-hover:border-primary group-hover:text-primary transition-colors"
            asChild
          >
            <a href={`mailto:${agent.email}`} className="flex items-center justify-center gap-2">
              <Mail className="w-4 h-4" />
              Email
            </a>
          </Button>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="text-xs text-gray-500 text-center">
            <div className="mb-1">
              <strong>Langues:</strong> {agent.languages.join(', ')}
            </div>
            <div className="flex items-center justify-center gap-1">
              <Award className="w-3 h-3" />
              <span>{agent.certifications.join(', ')}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Notre Équipe d'Experts
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Rencontrez nos agents immobiliers expérimentés qui vous accompagneront dans votre projet immobilier avec professionnalisme et expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {agents.map((agent, index) => (
            <AgentCard key={index} agent={agent} />
          ))}
        </div>
      </div>
    </section>
  );
};
export default OurAgents;