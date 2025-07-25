import Header from "@/components/Header";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-foreground">Contact</h1>
          <p className="text-xl text-muted-foreground">
            Prenez contact avec notre équipe
          </p>
        </div>
        
        <div className="mt-16 max-w-2xl mx-auto">
          <div className="bg-card p-6 rounded-lg border border-border">
            {/* Formulaire de contact à ajouter */}
            <p className="text-muted-foreground">Formulaire de contact à implémenter</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;