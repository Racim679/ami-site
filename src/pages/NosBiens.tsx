import Header from "@/components/Header";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";

const NosBiens = () => {
  const [selectedTypology, setSelectedTypology] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [visibleResidences, setVisibleResidences] = useState(9);

  const residences = [
    {
      id: 1,
      title: "Résidence Al Manar",
      location: "Said Hamdine, Alger",
      description: "Un complexe résidentiel moderne offrant tout le confort nécessaire pour une vie paisible et luxueuse.",
      image: "/placeholder.svg",
      typology: "F3",
      status: "En lancement",
      city: "Alger"
    },
    {
      id: 2,
      title: "Complexe Andalous Garden",
      location: "Hydra, Alger",
      description: "Des appartements haut de gamme dans un cadre verdoyant avec toutes les commodités modernes.",
      image: "/placeholder.svg",
      typology: "F4",
      status: "En cours de réalisation",
      city: "Alger"
    },
    {
      id: 3,
      title: "Villa Park Premium",
      location: "Dely Ibrahim, Alger",
      description: "Résidence de standing avec vue panoramique et finitions de qualité supérieure.",
      image: "/placeholder.svg",
      typology: "F5",
      status: "Fini",
      city: "Alger"
    },
    {
      id: 4,
      title: "Tour Horizon City",
      location: "El Biar, Alger",
      description: "Une tour moderne au cœur de la ville avec tous les services à proximité.",
      image: "/placeholder.svg",
      typology: "F2",
      status: "En lancement",
      city: "Alger"
    },
    {
      id: 5,
      title: "Résidence Marina Bay",
      location: "Ain Benian, Alger",
      description: "Résidence en bord de mer offrant une vue exceptionnelle sur la baie d'Alger.",
      image: "/placeholder.svg",
      typology: "Duplex",
      status: "En cours de réalisation",
      city: "Alger"
    },
    {
      id: 6,
      title: "Green Valley Estate",
      location: "Cheraga, Alger",
      description: "Un projet écologique dans un environnement naturel préservé.",
      image: "/placeholder.svg",
      typology: "Studio",
      status: "En lancement",
      city: "Alger"
    },
    {
      id: 7,
      title: "Résidence Prestige",
      location: "Kouba, Alger",
      description: "Appartements de luxe avec finitions haut de gamme et services personnalisés.",
      image: "/placeholder.svg",
      typology: "F3",
      status: "Fini",
      city: "Alger"
    },
    {
      id: 8,
      title: "Villa Royal Gardens",
      location: "Ben Aknoun, Alger",
      description: "Villas individuelles dans un cadre résidentiel calme et sécurisé.",
      image: "/placeholder.svg",
      typology: "F4",
      status: "Fini",
      city: "Alger"
    },
    {
      id: 9,
      title: "Complexe Atlas Heights",
      location: "Bouzareah, Alger",
      description: "Résidence moderne avec vue sur la mer et espaces verts aménagés.",
      image: "/placeholder.svg",
      typology: "F5",
      status: "En cours de réalisation",
      city: "Alger"
    },
    {
      id: 10,
      title: "Résidence Océan View",
      location: "Rais Hamidou, Alger",
      description: "Appartements avec vue mer et accès direct à la plage.",
      image: "/placeholder.svg",
      typology: "F2",
      status: "Fini",
      city: "Alger"
    },
    {
      id: 11,
      title: "Golden Residence",
      location: "Ouled Fayet, Alger",
      description: "Résidence de standing avec services hôteliers et spa.",
      image: "/placeholder.svg",
      typology: "F3",
      status: "En lancement",
      city: "Alger"
    },
    {
      id: 12,
      title: "Crystal Palace",
      location: "Staoueli, Alger",
      description: "Complexe résidentiel avec piscine et salle de sport.",
      image: "/placeholder.svg",
      typology: "Duplex",
      status: "En cours de réalisation",
      city: "Alger"
    }
  ];

  const filteredResidences = residences.filter(residence => {
    return (
      (!selectedTypology || residence.typology === selectedTypology) &&
      (!selectedStatus || residence.status === selectedStatus) &&
      (!selectedLocation || residence.city === selectedLocation)
    );
  });

  const displayedResidences = filteredResidences.slice(0, visibleResidences);

  const loadMore = () => {
    const increment = window.innerWidth >= 768 ? 9 : 3;
    setVisibleResidences(prev => prev + increment);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-cover bg-center bg-no-repeat" style={{
        backgroundImage: "url('/placeholder.svg')"
      }}>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl text-white">
              <h1 className="text-5xl font-bold mb-6">
                Découvrez nos projets exceptionnels
              </h1>
              <p className="text-xl leading-relaxed">
                Optez pour le raffinement et le confort des appartements au standing de notre promotion immobilière
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="bg-emerald-800 p-6 rounded-2xl shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-white text-sm font-medium">Typologie</label>
                <Select value={selectedTypology} onValueChange={setSelectedTypology}>
                  <SelectTrigger className="bg-white border-0 h-12">
                    <SelectValue placeholder="Sélectionner la typologie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="F2">F2</SelectItem>
                    <SelectItem value="F3">F3</SelectItem>
                    <SelectItem value="F4">F4</SelectItem>
                    <SelectItem value="F5">F5</SelectItem>
                    <SelectItem value="Duplex">Duplex</SelectItem>
                    <SelectItem value="Studio">Studio</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-white text-sm font-medium">Statut</label>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="bg-white border-0 h-12">
                    <SelectValue placeholder="Sélectionner le statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="En lancement">En lancement</SelectItem>
                    <SelectItem value="En cours de réalisation">En cours de réalisation</SelectItem>
                    <SelectItem value="Fini">Fini</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-white text-sm font-medium">Localité</label>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger className="bg-white border-0 h-12">
                    <SelectValue placeholder="Sélectionner la localité" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Alger">Alger</SelectItem>
                    <SelectItem value="Oran">Oran</SelectItem>
                    <SelectItem value="Constantine">Constantine</SelectItem>
                    <SelectItem value="Annaba">Annaba</SelectItem>
                    <SelectItem value="Tizi Ouzou">Tizi Ouzou</SelectItem>
                    <SelectItem value="Sétif">Sétif</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Residences Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedResidences.map((residence) => (
              <Card key={residence.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="relative overflow-hidden">
                  <img 
                    src={residence.image} 
                    alt={residence.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                    {residence.typology}
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-foreground">{residence.title}</h3>
                  <div className="flex items-center text-muted-foreground mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{residence.location}</span>
                  </div>
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {residence.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm px-3 py-1 bg-muted rounded-full">
                      {residence.status}
                    </span>
                    <Button variant="outline" size="sm">
                      En savoir plus
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {visibleResidences < filteredResidences.length && (
            <div className="text-center mt-12">
              <Button onClick={loadMore} size="lg" className="px-8">
                Voir plus
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default NosBiens;