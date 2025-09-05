import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ProjectsSection = () => {
  const projectCategories = [
    {
      title: "Projets en cours de lancement",
      projects: [
        "Résidence Al Manar",
        "Complexe Andalous Garden",
        "Villa Park Premium"
      ]
    },
    {
      title: "Projets en développement", 
      projects: [
        "Tour Horizon City",
        "Résidence Marina Bay",
        "Green Valley Estate"
      ]
    },
    {
      title: "Projets livrés",
      projects: [
        "Résidence Prestige",
        "Villa Royal Gardens",
        "Complexe Atlas Heights",
        "Résidence Océan View"
      ]
    }
  ];

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-foreground section-title">Nos Projets</h2>
          <p className="text-xl text-muted-foreground description">
            Découvrez l'évolution de nos projets immobiliers
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projectCategories.map((category, index) => (
            <Card key={index} className="h-full">
              <CardHeader>
                <CardTitle className="text-xl text-center font-heading font-medium">{category.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {category.projects.map((project, projectIndex) => (
                    <li 
                      key={projectIndex}
                      className="p-3 bg-muted/50 rounded-lg text-center hover:bg-muted transition-colors"
                    >
                      {project}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;