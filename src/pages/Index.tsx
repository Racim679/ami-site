import Header from "@/components/Header";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 text-foreground">
              Promoteur Immobilier
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Votre partenaire de confiance pour tous vos projets immobiliers
            </p>
          </div>
        </section>

        {/* Sections principales */}
        <section className="py-16 px-4 bg-muted/50">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <h3 className="text-xl font-semibold mb-4 text-foreground">Nos Projets</h3>
                <p className="text-muted-foreground">Découvrez nos développements immobiliers</p>
              </div>
              <div className="text-center p-6">
                <h3 className="text-xl font-semibold mb-4 text-foreground">Nos Services</h3>
                <p className="text-muted-foreground">Une gamme complète de services immobiliers</p>
              </div>
              <div className="text-center p-6">
                <h3 className="text-xl font-semibold mb-4 text-foreground">Nos Localités</h3>
                <p className="text-muted-foreground">Présent dans les meilleures zones</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
