import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";

const ApartmentExplorer = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const categories = [
    {
      name: "Séjour",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
      images: [
        "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7",
        "https://images.unsplash.com/photo-1567016432779-094069958ea5"
      ]
    },
    {
      name: "Cuisine", 
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
      images: [
        "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136",
        "https://images.unsplash.com/photo-1556909909-30c4ac6fcec4"
      ]
    },
    {
      name: "Suite",
      image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334", 
      images: [
        "https://images.unsplash.com/photo-1483058712412-4245e9b90334",
        "https://images.unsplash.com/photo-1560448204-e1a3ecbf5ade",
        "https://images.unsplash.com/photo-1571508601891-ca5e7a713859"
      ]
    },
    {
      name: "Piscine",
      image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
      images: [
        "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d",
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5"
      ]
    },
    {
      name: "Salle d'eau",
      image: "https://images.unsplash.com/photo-1487958449943-2426f7d7c7a",
      images: [
        "https://images.unsplash.com/photo-1487958449943-2426f7d7c7a",
        "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14", 
        "https://images.unsplash.com/photo-1507652313519-d4e9174996dd"
      ]
    }
  ];

  // Auto carousel for selected category
  useEffect(() => {
    if (selectedCategory) {
      const category = categories.find(cat => cat.name === selectedCategory);
      if (category) {
        const interval = setInterval(() => {
          setCurrentImageIndex((prev) => (prev + 1) % category.images.length);
        }, 5000);

        return () => clearInterval(interval);
      }
    }
  }, [selectedCategory]);

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setCurrentImageIndex(0);
  };

  const selectedCategoryData = categories.find(cat => cat.name === selectedCategory);

  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            Explorer nos appartements luxueux
          </h2>
          <p className="text-xl text-muted-foreground">
            Découvrez nos espaces d'exception
          </p>
        </div>

        {!selectedCategory ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {categories.map((category, index) => (
              <Card 
                key={index}
                className="cursor-pointer hover:shadow-lg transition-shadow group"
                onClick={() => handleCategoryClick(category.name)}
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-lg">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <h3 className="text-white text-xl font-semibold">
                        {category.name}
                      </h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <div className="flex items-center justify-center mb-8">
              <button
                onClick={() => setSelectedCategory(null)}
                className="text-primary hover:text-primary/80 text-lg font-medium"
              >
                ← Retour aux catégories
              </button>
            </div>
            
            <h3 className="text-2xl font-bold mb-8 text-foreground">
              {selectedCategory}
            </h3>

            {selectedCategoryData && (
              <div className="relative max-w-4xl mx-auto">
                <img
                  src={selectedCategoryData.images[currentImageIndex]}
                  alt={`${selectedCategory} ${currentImageIndex + 1}`}
                  className="w-full h-96 object-cover rounded-lg"
                />
                
                {/* Image indicators */}
                <div className="flex justify-center mt-4 space-x-2">
                  {selectedCategoryData.images.map((_, index) => (
                    <button
                      key={index}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentImageIndex ? "bg-primary" : "bg-muted"
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ApartmentExplorer;