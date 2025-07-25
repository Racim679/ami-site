import Header from "@/components/Header";

const Carrieres = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-foreground">Carrières</h1>
          <p className="text-xl text-muted-foreground">
            Rejoignez notre équipe dynamique
          </p>
        </div>
        
        <div className="mt-16">
          <div className="space-y-8">
            {/* Contenu des offres d'emploi à ajouter */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Carrieres;