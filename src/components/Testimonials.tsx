import React, { useState } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
  property?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Ahmed Benali",
    role: "Acheteur",
    rating: 5,
    comment: "Excellente expérience avec Aymen Promotion. L'équipe a été très professionnelle et nous a trouvé exactement ce que nous cherchions. Je recommande vivement !",
    date: "Décembre 2024",
    avatar: "/placeholder.svg",
    property: "Résidence Al Manar"
  },
  {
    id: 2,
    name: "Fatima Zerrouki",
    role: "Locataire",
    rating: 5,
    comment: "Service client exceptionnel. L'appartement correspond parfaitement à nos attentes et le suivi a été impeccable. Merci à toute l'équipe !",
    date: "Novembre 2024",
    avatar: "/placeholder.svg",
    property: "Complexe Andalous Garden"
  },
  {
    id: 3,
    name: "Karim Boudiaf",
    role: "Investisseur",
    rating: 4,
    comment: "Investissement rentable grâce aux conseils avisés de l'équipe. Le processus d'achat a été fluide et transparent. Satisfait de mon choix.",
    date: "Octobre 2024",
    avatar: "/placeholder.svg",
    property: "Villa Park Premium"
  },
  {
    id: 4,
    name: "Sara Messaoudi",
    role: "Acheteuse",
    rating: 5,
    comment: "Première expérience d'achat immobilier et tout s'est parfaitement déroulé. L'équipe a été patiente et m'a guidée à chaque étape.",
    date: "Septembre 2024",
    avatar: "/placeholder.svg",
    property: "Tour Horizon City"
  },
  {
    id: 5,
    name: "Mohammed Tazi",
    role: "Locataire",
    rating: 4,
    comment: "Location rapide et efficace. L'appartement est conforme aux photos et la gestion locative est sérieuse. Je recommande.",
    date: "Août 2024",
    avatar: "/placeholder.svg",
    property: "Résidence Marina Bay"
  }
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
          }`}
      />
    ));
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Ce que disent nos clients
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez les témoignages de nos clients satisfaits qui nous font confiance pour leurs projets immobiliers.
          </p>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
            <div className="text-gray-600">Clients satisfaits</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">4.8/5</div>
            <div className="text-gray-600">Note moyenne</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">98%</div>
            <div className="text-gray-600">Taux de satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">5 ans</div>
            <div className="text-gray-600">D'expérience</div>
          </div>
        </div>

        {/* Témoignages */}
        <div className="max-w-4xl mx-auto">
          <Card className="relative overflow-hidden">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <Quote className="w-8 h-8 text-blue-200" />
                <div className="flex gap-1">
                  {renderStars(testimonials[currentIndex].rating)}
                </div>
              </div>

              <blockquote className="text-lg text-gray-700 mb-6 italic">
                "{testimonials[currentIndex].comment}"
              </blockquote>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={testimonials[currentIndex].avatar}
                    alt={testimonials[currentIndex].name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonials[currentIndex].name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonials[currentIndex].role}
                    </div>
                    {testimonials[currentIndex].property && (
                      <div className="text-xs text-blue-600">
                        {testimonials[currentIndex].property}
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  {testimonials[currentIndex].date}
                </div>
              </div>
            </CardContent>

            {/* Navigation */}
            <div className="absolute top-1/2 -translate-y-1/2 left-4">
              <Button
                variant="outline"
                size="sm"
                onClick={prevTestimonial}
                className="rounded-full w-10 h-10 p-0 bg-white shadow-md hover:bg-gray-50"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 right-4">
              <Button
                variant="outline"
                size="sm"
                onClick={nextTestimonial}
                className="rounded-full w-10 h-10 p-0 bg-white shadow-md hover:bg-gray-50"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </Card>

          {/* Indicateurs */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${index === currentIndex ? "bg-blue-600" : "bg-gray-300"
                  }`}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button size="lg" className="px-8">
            Laisser un avis
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 