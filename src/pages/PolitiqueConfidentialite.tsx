import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const PolitiqueConfidentialite = () => {
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
              Politique de Confidentialité
            </h1>
            <h2 className="text-2xl font-semibold text-primary mb-8 text-center">
              RACIM IMMOBILIER
            </h2>

            <div className="space-y-8">
              <section className="bg-card p-6 rounded-lg border shadow-sm">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Données collectées :
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Informations sur les biens immobiliers (adresse, prix, caractéristiques)</li>
                  <li>• Numéros de téléphone des vendeurs (fournis volontairement)</li>
                  <li>• Informations de contact des acheteurs intéressés (optionnel)</li>
                </ul>
              </section>

              <section className="bg-card p-6 rounded-lg border shadow-sm">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Utilisation des données :
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Publication d'annonces immobilières (publiques ou privées selon choix)</li>
                  <li>• Mise en relation entre vendeurs et acheteurs</li>
                  <li>• Mise en relation avec des notaires partenaires</li>
                  <li>• Communication des informations sur les biens</li>
                </ul>
              </section>

              <section className="bg-card p-6 rounded-lg border shadow-sm">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Confidentialité :
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Certaines annonces peuvent être privées/fermées selon demande</li>
                  <li>• Accès contrôlé aux informations sensibles</li>
                  <li>• Les coordonnées des vendeurs visibles uniquement aux acheteurs sérieux</li>
                </ul>
              </section>

              <section className="bg-card p-6 rounded-lg border shadow-sm">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Partage des données :
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Transmission de coordonnées uniquement pour mise en relation</li>
                  <li>• Aucune vente de données à des tiers</li>
                  <li>• Partage limité aux notaires partenaires sur demande</li>
                </ul>
              </section>

              <section className="bg-card p-6 rounded-lg border shadow-sm">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Vos droits :
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Modification ou suppression de votre annonce</li>
                  <li>• Choix du niveau de confidentialité</li>
                  <li>• Contact : <a href="mailto:ssracim.dev@gmail.com" className="text-primary hover:underline">ssracim.dev@gmail.com</a></li>
                </ul>
              </section>
            </div>
          </div>
        </motion.div>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default PolitiqueConfidentialite;