import Header from "@/components/Header";

const Localites = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-foreground">Nos Localités</h1>
          <p className="text-xl text-muted-foreground">
            Découvrez les zones où nous opérons
          </p>
        </div>
        
        <div className="mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Contenu des localités à ajouter */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Localites;