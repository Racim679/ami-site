import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, BarChart3, MapPin, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useFavorites } from "@/components/FavoritesSystem";
import { useComparison } from "@/components/ComparisonSystem";
import ScrollToTop from "@/components/ScrollToTop";
import { AnimatedSection, AnimatedCard } from "@/components/AnimatedComponents";
import { formatPrice } from "@/lib/utils";

const Favoris = () => {
  const navigate = useNavigate();
  const { favorites, removeFromFavorites } = useFavorites();
  const { addToComparison, isInComparison, comparisonItems } = useComparison();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const handleCompare = () => {
    // Si aucun favori, ne rien faire
    if (favorites.length === 0) {
      alert('Aucun favori à comparer. Ajoutez des biens à vos favoris d\'abord.');
      return;
    }

    const maxItems = 5;
    
    // Lire la comparaison actuelle depuis localStorage pour avoir les données les plus récentes
    const currentComparison = JSON.parse(localStorage.getItem('comparison') || '[]');
    
    // Filtrer les favoris qui ne sont pas déjà dans la comparaison
    const favoritesToAdd = favorites.filter(fav => 
      !currentComparison.some((item: any) => item.id === fav.id)
    );
    
    // Si tous les favoris sont déjà dans la comparaison, naviguer directement
    if (favoritesToAdd.length === 0) {
      navigate('/comparaison');
      return;
    }
    
    // Calculer combien on peut ajouter sans dépasser la limite
    const availableSlots = maxItems - currentComparison.length;
    const itemsToAdd = favoritesToAdd.slice(0, availableSlots);
    
    if (itemsToAdd.length === 0) {
      // La comparaison est déjà pleine
      alert(`La comparaison est déjà pleine (${maxItems} biens maximum). Veuillez retirer des biens de la comparaison pour en ajouter d'autres.`);
      navigate('/comparaison');
      return;
    }
    
    // Construire la nouvelle liste de comparaison et la sauvegarder directement
    const newComparison = [...currentComparison, ...itemsToAdd];
    localStorage.setItem('comparison', JSON.stringify(newComparison));
    
    // Afficher un message informatif
    if (itemsToAdd.length < favoritesToAdd.length) {
      alert(`${itemsToAdd.length} bien(s) ajouté(s) à la comparaison. ${favoritesToAdd.length - itemsToAdd.length} bien(s) n'a/ont pas pu être ajouté(s) car la limite de ${maxItems} biens est atteinte.`);
    }
    
    // Naviguer vers la page de comparaison
    navigate('/comparaison');
  };

  const handleViewOnMap = () => {
    navigate('/nos-biens');
  };

  const totalPages = Math.ceil(favorites.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentFavorites = favorites.slice(startIndex, endIndex);

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        
        <AnimatedSection className="py-20">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="max-w-md mx-auto">
                <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Aucun favori pour le moment
                </h2>
                <p className="text-muted-foreground mb-8">
                  Explorez nos biens immobiliers et ajoutez vos coups de cœur à vos favoris.
                </p>
                <Button 
                  onClick={() => navigate('/nos-biens')}
                  className="bg-primary hover:bg-primary/90"
                >
                  Découvrir nos biens
                </Button>
              </div>
            </motion.div>
          </div>
        </AnimatedSection>

        <ScrollToTop />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <AnimatedSection className="bg-primary text-primary-foreground py-8 md:py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-4">
            <div>
              <motion.h1 
                className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-2 md:mb-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Mes Favoris
              </motion.h1>
              <motion.p 
                className="text-sm sm:text-base md:text-lg lg:text-xl text-primary-foreground/90"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {favorites.length} bien{favorites.length > 1 ? 's' : ''} sauvegardé{favorites.length > 1 ? 's' : ''}
              </motion.p>
            </div>
            
            <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCompare}
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary text-xs sm:text-sm md:text-base px-3 sm:px-4 md:px-6 h-8 sm:h-9 md:h-10"
              >
                <BarChart3 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                Comparer
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleViewOnMap}
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary text-xs sm:text-sm md:text-base px-3 sm:px-4 md:px-6 h-8 sm:h-9 md:h-10"
              >
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden md:inline">Voir sur la carte</span>
                <span className="md:hidden">Carte</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/nos-biens')}
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary text-xs sm:text-sm md:text-base px-3 sm:px-4 md:px-6 h-8 sm:h-9 md:h-10"
              >
                <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                Retour
              </Button>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Liste des favoris */}
      <AnimatedSection className="py-16">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
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
            {currentFavorites.map((favorite, index) => (
              <motion.div
                key={favorite.id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.5 }}
              >
                <AnimatedCard className="group overflow-hidden hover:shadow-xl transition-all duration-300 bg-card border border-border">
                  <div className="relative overflow-hidden">
                    <img
                      src={favorite.image}
                      alt={favorite.title}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromFavorites(favorite.id)}
                        className="w-8 h-8 p-0 rounded-full bg-white/80 hover:bg-white"
                      >
                        <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => addToComparison(favorite)}
                        disabled={isInComparison(favorite.id)}
                        className="w-8 h-8 p-0 rounded-full bg-white/80 hover:bg-white"
                      >
                        <BarChart3 className={`w-4 h-4 ${isInComparison(favorite.id) ? "text-primary" : "text-gray-600"}`} />
                      </Button>
                    </div>
                    {favorite.price > 0 && (
                      <div className="absolute bottom-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                        {formatPrice(favorite.price)}
                      </div>
                    )}
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-foreground">
                      {favorite.title}
                    </h3>
                    <div className="flex items-center text-muted-foreground mb-3">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{favorite.location}</span>
                    </div>
                                         <div className="flex justify-between items-center">
                       <div className="flex gap-2">
                         <span className="text-sm px-3 py-1 bg-muted rounded-full text-muted-foreground">
                           {favorite.type}
                         </span>
                       </div>
                       <Button variant="outline" size="sm">
                         En savoir plus
                       </Button>
                     </div>
                  </CardContent>
                </AnimatedCard>
              </motion.div>
            ))}
          </motion.div>

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div 
              className="flex justify-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Précédent
                </Button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    onClick={() => setCurrentPage(page)}
                    className="w-10 h-10 p-0"
                  >
                    {page}
                  </Button>
                ))}
                
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Suivant
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </AnimatedSection>

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
};

export default Favoris; 