import Header from "@/components/Header";
import Footer from "@/components/Footer";

const APropos = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-foreground page-heading">À Propos</h1>
          <p className="text-xl text-muted-foreground description">
            Découvrez notre histoire et nos valeurs
          </p>
        </div>
        
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="prose prose-lg mx-auto">
            {/* Contenu à propos à ajouter */}
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default APropos;