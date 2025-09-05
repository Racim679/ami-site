import { motion } from "framer-motion";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";

const ConditionsUtilisation = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4 py-12"
        >
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-foreground mb-8 text-center">
              Conditions d'Utilisation
            </h1>
            <h2 className="text-2xl font-semibold text-primary mb-8 text-center">
              RACIM IMMOBILIER
            </h2>

            <div className="space-y-8">
              <section className="bg-card p-6 rounded-lg border shadow-sm">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Services proposés :
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Plateforme de mise en relation immobilière</li>
                  <li>• Publication d'annonces (publiques ou privées)</li>
                  <li>• Mise en relation avec des notaires partenaires</li>
                  <li>• Facilitation des contacts vendeur-acheteur</li>
                </ul>
              </section>

              <section className="bg-card p-6 rounded-lg border shadow-sm">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Notre rôle :
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Simple intermédiaire de mise en relation</li>
                  <li>• Nous ne sommes PAS agents immobiliers ni notaires</li>
                  <li>• Nous ne gérons aucune transaction financière</li>
                  <li>• Nous ne validons pas les informations légales</li>
                </ul>
              </section>

              <section className="bg-card p-6 rounded-lg border shadow-sm">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Responsabilités :
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Les vendeurs sont responsables de leurs informations</li>
                  <li>• Les acheteurs vérifient les biens par eux-mêmes</li>
                  <li>• Les notaires sont indépendants et responsables de leurs services</li>
                  <li>• Toute transaction se fait directement entre les parties</li>
                </ul>
              </section>

              <section className="bg-card p-6 rounded-lg border shadow-sm">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Limitation de responsabilité :
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Aucune garantie sur les biens proposés</li>
                  <li>• Aucune responsabilité sur les transactions</li>
                  <li>• Simple service de contact et orientation</li>
                </ul>
              </section>
            </div>
          </div>
        </motion.div>
      </main>
      <ScrollToTop />
    </div>
  );
};

export default ConditionsUtilisation;