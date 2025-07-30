import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, BarChart3, MapPin, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useFavorites } from "@/components/FavoritesSystem";
import { useComparison } from "@/components/ComparisonSystem";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { AnimatedSection, AnimatedCard } from "@/components/AnimatedComponents";

const Favoris = () => {
  const navigate = useNavigate();
  const { favorites, removeFromFavorites } = useFavorites();
  const { addToComparison, isInComparison } = useComparison();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const handleCompare = () => {
    navigate('/comparaison');
  };

  const handleViewOnMap = () => {
    navigate('/nos-biens');
  };

  const totalPages = Math.ceil(favorites.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentFavorites = favorites.slice(startIndex, endIndex);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

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

        <Footer />
        <ScrollToTop />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <AnimatedSection className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <motion.h1 
                className="text-4xl md:text-6xl font-bold mb-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Mes Favoris
              </motion.h1>
              <motion.p 
                className="text-xl text-primary-foreground/90"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {favorites.length} bien{favorites.length > 1 ? 's' : ''} sauvegardé{favorites.length > 1 ? 's' : ''}
              </motion.p>
            </div>
            
            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={handleCompare}
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Comparer
              </Button>
              <Button
                variant="outline"
                onClick={handleViewOnMap}
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                <MapPin className="w-4 h-4 mr-2" />
                Voir sur la carte
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/nos-biens')}
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
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
                        {formatCurrency(favorite.price)}
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

      {/* Footer */}
      <Footer />
      
      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
};

export default Favoris; 