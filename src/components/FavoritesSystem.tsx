import React, { useState, useEffect } from "react";
import { Heart, HeartOff } from "lucide-react";

interface Property {
  id: string;
  title: string;
  price: number;
  surface: number;
  location: string;
  image: string;
  type: string;
}

interface FavoritesSystemProps {
  property: Property;
  onToggle?: (isFavorite: boolean) => void;
}

const FavoritesSystem: React.FC<FavoritesSystemProps> = ({ property, onToggle }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favorites.some((fav: Property) => fav.id === property.id));
  }, [property.id]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    if (isFavorite) {
      const newFavorites = favorites.filter((fav: Property) => fav.id !== property.id);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      setIsFavorite(false);
    } else {
      favorites.push(property);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      setIsFavorite(true);
    }

    onToggle?.(!isFavorite);
  };

  return (
    <button
      onClick={toggleFavorite}
      className={`p-2 rounded-full transition-all duration-200 ${isFavorite
        ? 'bg-red-500 text-white hover:bg-red-600'
        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-300'
        }`}
      title={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
    >
      {isFavorite ? <Heart className="w-5 h-5 fill-current" /> : <HeartOff className="w-5 h-5" />}
    </button>
  );
};

// Hook pour gérer les favoris globalement
export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Property[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(stored);
  }, []);

  const addToFavorites = (property: Property) => {
    const newFavorites = [...favorites, property];
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const removeFromFavorites = (propertyId: string) => {
    const newFavorites = favorites.filter(fav => fav.id !== propertyId);
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const isFavorite = (propertyId: string) => {
    return favorites.some(fav => fav.id === propertyId);
  };

  return { favorites, addToFavorites, removeFromFavorites, isFavorite };
};

export default FavoritesSystem; 