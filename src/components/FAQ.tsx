import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQ: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("tous");

  const faqData: FAQItem[] = [
    {
      question: "Comment fonctionne le processus d'achat immobilier ?",
      answer: "Le processus d'achat immobilier comprend plusieurs étapes : recherche de bien, visite, offre d'achat, compromis de vente, obtention du prêt, signature de l'acte authentique. Notre équipe vous accompagne à chaque étape pour sécuriser votre investissement.",
      category: "achat"
    },
    {
      question: "Quels sont les documents nécessaires pour un prêt immobilier ?",
      answer: "Les documents requis incluent : justificatifs d'identité, bulletins de salaire des 3 derniers mois, avis d'imposition, relevés bancaires, justificatifs de l'apport, estimation du bien, et parfois des garanties supplémentaires selon votre profil.",
      category: "financement"
    },
    {
      question: "Quelle est la différence entre un appartement et une maison ?",
      answer: "Un appartement est généralement plus compact, avec des charges de copropriété, idéal pour les petits budgets ou les investissements locatifs. Une maison offre plus d'espace et d'autonomie, mais nécessite plus d'entretien et un budget plus important.",
      category: "achat"
    },
    {
      question: "Comment estimer la valeur d'un bien immobilier ?",
      answer: "L'estimation se base sur plusieurs critères : prix au m² du quartier, état du bien, surface, exposition, étage, année de construction, et les prix de vente récents de biens similaires dans le secteur. Utilisez notre outil d'estimation en ligne pour une première évaluation.",
      category: "estimation"
    },
    {
      question: "Quels sont les frais annexes à prévoir lors d'un achat ?",
      answer: "Outre le prix du bien, prévoyez : frais de notaire (7-8%), frais d'agence (3-5%), frais de dossier bancaire, assurance emprunteur, garanties bancaires, et éventuellement des travaux. Ces frais représentent environ 10-15% du prix d'achat.",
      category: "financement"
    },
    {
      question: "Comment choisir le bon quartier pour investir ?",
      answer: "Évaluez la proximité des transports, commerces, écoles, services publics, la sécurité, les projets d'aménagement futurs, et l'évolution des prix. Un quartier en développement offre souvent un bon potentiel de plus-value à long terme.",
      category: "investissement"
    },
    {
      question: "Qu'est-ce que le taux d'endettement maximum ?",
      answer: "Le taux d'endettement maximum est fixé à 35% de vos revenus nets. Il inclut tous vos crédits en cours (immobilier, consommation, etc.). Ce ratio permet aux banques d'évaluer votre capacité de remboursement et de limiter les risques de surendettement.",
      category: "financement"
    },
    {
      question: "Comment négocier le prix d'un bien immobilier ?",
      answer: "Analysez les prix du marché, identifiez les défauts du bien, préparez vos arguments (travaux nécessaires, délais, etc.), et proposez une offre réaliste mais en dessous du prix demandé. La négociation se fait généralement entre 5% et 15% du prix initial.",
      category: "achat"
    },
    {
      question: "Quels sont les avantages de l'investissement locatif ?",
      answer: "L'investissement locatif offre plusieurs avantages : revenus complémentaires, déduction fiscale des charges, constitution d'un patrimoine, et potentiel de plus-value. Il nécessite cependant une gestion locative et une bonne connaissance du marché.",
      category: "investissement"
    },
    {
      question: "Comment se déroule une visite de bien immobilier ?",
      answer: "Une visite dure généralement 30 à 60 minutes. Vérifiez l'état général, l'isolation, l'exposition, les nuisances, les charges, et posez toutes vos questions. Prenez des photos et notes pour comparer avec d'autres biens. N'hésitez pas à revenir pour une seconde visite.",
      category: "achat"
    }
  ];

  const categories = [
    { id: "tous", label: "Toutes les questions" },
    { id: "achat", label: "Achat" },
    { id: "financement", label: "Financement" },
    { id: "estimation", label: "Estimation" },
    { id: "investissement", label: "Investissement" }
  ];

  const filteredFAQ = activeCategory === "tous"
    ? faqData
    : faqData.filter(item => item.category === activeCategory);

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <HelpCircle className="w-8 h-8 text-blue-600" />
          <h2 className="text-3xl font-bold text-gray-900">Questions Fréquentes</h2>
        </div>
        <p className="text-lg text-gray-600">
          Trouvez rapidement les réponses à vos questions sur l'immobilier
        </p>
      </div>

      {/* Filtres par catégorie */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === category.id
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Liste des questions */}
      <div className="space-y-4">
        {filteredFAQ.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm"
          >
            <button
              onClick={() => toggleItem(index)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium text-gray-900 pr-4">
                {item.question}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-gray-500 transition-transform ${openItems.includes(index) ? "rotate-180" : ""
                  }`}
              />
            </button>

            {openItems.includes(index) && (
              <div className="px-6 pb-4">
                <div className="border-t border-gray-100 pt-4">
                  <p className="text-gray-700 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Section de contact */}
      <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Vous ne trouvez pas votre réponse ?
        </h3>
        <p className="text-gray-600 mb-6">
          Notre équipe d'experts est là pour vous aider. N'hésitez pas à nous contacter.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Contactez-nous
          </button>
          <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors">
            Utiliser le chatbot
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQ; 