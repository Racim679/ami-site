import Header from "@/components/Header";

const Blog = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-foreground">Blog</h1>
          <p className="text-xl text-muted-foreground">
            Actualités et conseils immobiliers
          </p>
        </div>
        
        <div className="mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Articles de blog à ajouter */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Blog;