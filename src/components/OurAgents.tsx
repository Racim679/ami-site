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

const agents: Agent[] = [
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  }
];

const OurAgents: React.FC = () => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
          }`}
      />
    ));
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Notre équipe d'experts
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Une équipe de professionnels expérimentés pour vous accompagner dans tous vos projets immobiliers.
          </p>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {agents.map((agent) => (
            <Card key={agent.id} className="group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                {/* Avatar & Info */}
                <div className="text-center mb-4">
                  <div className="relative inline-block mb-4">
                    <img
                      src={agent.avatar}
                      alt={agent.name}
                      className="w-24 h-24 rounded-full object-cover mx-auto group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-green-500 text-white rounded-full p-1">
                      <Award className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {agent.name}
                  </h3>
                  <p className="text-blue-600 font-medium mb-1">
                    {agent.role}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    {agent.speciality}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center justify-center gap-1 mb-2">
                    {renderStars(agent.rating)}
                    <span className="text-sm text-gray-600 ml-1">
                      ({agent.rating})
                    </span>
                  </div>

                  <p className="text-xs text-gray-500 mb-3">
                    {agent.experience} • {agent.deals} transactions
                  </p>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {agent.description}
                </p>

                {/* Languages */}
                <div className="mb-4">
                  <p className="text-xs font-medium text-gray-700 mb-1">Langues :</p>
                  <div className="flex flex-wrap gap-1">
                    {agent.languages.map((lang, index) => (
                      <span
                        key={index}
                        className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Contact */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-3 h-3" />
                    <span>{agent.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-3 h-3" />
                    <span>{agent.email}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1">
                    Contacter
                  </Button>
                  <Button variant="outline" size="sm">
                    Profil
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">15+</div>
            <div className="text-gray-600">Années d'expérience</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
            <div className="text-gray-600">Transactions réussies</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
            <div className="text-gray-600">Clients satisfaits</div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button size="lg" className="px-8">
            Prendre rendez-vous
          </Button>
        </div>
      </div>
    </section>
  );
};

export default OurAgents; 