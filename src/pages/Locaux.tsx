import Header from "@/components/Header";

const Locaux = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-foreground">Nos Locaux</h1>
          <p className="text-xl text-muted-foreground">
            Espaces commerciaux et professionnels disponibles
          </p>
        </div>
        
        <div className="mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contenu des locaux à ajouter */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Locaux;