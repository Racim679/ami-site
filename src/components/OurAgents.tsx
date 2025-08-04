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
  return;
};
export default OurAgents;