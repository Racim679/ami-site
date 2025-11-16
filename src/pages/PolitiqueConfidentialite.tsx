import { motion } from "framer-motion";
import { useEffect } from "react";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import { Card } from "@/components/ui/card";

const PolitiqueConfidentialite = () => {
  useEffect(() => {
    // GARANTIR L'ACCESSIBILITÉ PUBLIQUE - Pas d'authentification requise
    // Cette page doit être accessible par tous, y compris les robots de Facebook/Meta
    
    // Mise à jour du titre
    document.title = "Politique de Confidentialité - AMI IMMOBILIER";
    
    // Meta tags pour le SEO
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Politique de confidentialité d\'AMI IMMOBILIER. Découvrez comment nous collectons, utilisons et protégeons vos données personnelles conformément au RGPD.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Politique de confidentialité d\'AMI IMMOBILIER. Découvrez comment nous collectons, utilisons et protégeons vos données personnelles conformément au RGPD.';
      document.head.appendChild(meta);
    }

    // Meta tags Open Graph pour Facebook
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', 'Politique de Confidentialité - AMI IMMOBILIER');
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:title');
      meta.content = 'Politique de Confidentialité - AMI IMMOBILIER';
      document.head.appendChild(meta);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', 'Politique de confidentialité d\'AMI IMMOBILIER. Découvrez comment nous collectons, utilisons et protégeons vos données personnelles.');
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:description');
      meta.content = 'Politique de confidentialité d\'AMI IMMOBILIER. Découvrez comment nous collectons, utilisons et protégeons vos données personnelles.';
      document.head.appendChild(meta);
    }

    const ogType = document.querySelector('meta[property="og:type"]');
    if (ogType) {
      ogType.setAttribute('content', 'website');
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:type');
      meta.content = 'website';
      document.head.appendChild(meta);
    }

    // Meta robots pour s'assurer que la page est indexable
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute('content', 'index, follow');

    // Meta language
    const htmlLang = document.documentElement.getAttribute('lang');
    if (!htmlLang) {
      document.documentElement.setAttribute('lang', 'fr');
    }

    // Cleanup function
    return () => {
      // Optionnel: restaurer les meta tags par défaut si nécessaire
    };
  }, []);

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
            {/* En-tête */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Politique de Confidentialité
              </h1>
              <p className="text-muted-foreground text-lg">
                Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </div>

            {/* Introduction */}
            <Card className="p-6 mb-8">
              <p className="text-muted-foreground leading-relaxed">
                Cette Politique de Confidentialité décrit nos politiques et procédures concernant la collecte, 
                l'utilisation et la divulgation de vos informations lorsque vous utilisez notre Service. Elle vous 
                informe également de vos droits en matière de protection des données et de la manière dont la loi vous protège.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Nous utilisons vos Données Personnelles pour fournir et améliorer le Service. En utilisant le Service, 
                vous acceptez la collecte et l'utilisation d'informations conformément à cette Politique de Confidentialité.
              </p>
            </Card>

            {/* Table des matières */}
            <Card className="p-6 mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Table des matières</h2>
              <nav className="space-y-2">
                <a href="#definitions" className="block text-primary hover:underline">1. Interprétation et Définitions</a>
                <a href="#data-collection" className="block text-primary hover:underline">2. Collecte et Utilisation de Vos Données Personnelles</a>
                <a href="#cookies" className="block text-primary hover:underline">3. Technologies de Suivi et Cookies</a>
                <a href="#data-use" className="block text-primary hover:underline">4. Utilisation de Vos Données Personnelles</a>
                <a href="#data-sharing" className="block text-primary hover:underline">5. Partage de Vos Données Personnelles</a>
                <a href="#data-retention" className="block text-primary hover:underline">6. Conservation de Vos Données Personnelles</a>
                <a href="#data-security" className="block text-primary hover:underline">7. Sécurité de Vos Données Personnelles</a>
                <a href="#gdpr-rights" className="block text-primary hover:underline">8. Vos Droits en vertu du RGPD</a>
                <a href="#exercise-rights" className="block text-primary hover:underline">9. Exercice de Vos Droits</a>
                <a href="#children-privacy" className="block text-primary hover:underline">10. Confidentialité des Enfants</a>
                <a href="#links" className="block text-primary hover:underline">11. Liens vers d'autres Sites Web</a>
                <a href="#changes" className="block text-primary hover:underline">12. Modifications de cette Politique de Confidentialité</a>
                <a href="#contact" className="block text-primary hover:underline">13. Contactez-nous</a>
              </nav>
            </Card>

            {/* Section 1: Interprétation et Définitions */}
            <section id="definitions" className="mb-12">
              <Card className="p-6">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  1. Interprétation et Définitions
                </h2>
                
                <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Interprétation</h3>
                <p className="text-muted-foreground mb-4">
                  Les mots dont la première lettre est en majuscule ont des significations définies dans les conditions suivantes. 
                  Les définitions suivantes ont la même signification qu'elles apparaissent au singulier ou au pluriel.
                </p>

                <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Définitions</h3>
                <div className="space-y-4 text-muted-foreground">
                  <div>
                    <strong className="text-foreground">Compte</strong> désigne un compte unique créé pour vous permettre d'accéder à notre Service ou à certaines parties de notre Service.
                  </div>
                  <div>
                    <strong className="text-foreground">Entreprise</strong> (désignée par "l'Entreprise", "Nous", "Notre" ou "Nos" dans le présent Accord) fait référence à <strong className="text-foreground">AMI IMMOBILIER</strong>.
                  </div>
                  <div>
                    <strong className="text-foreground">Cookies</strong> sont de petits fichiers placés sur votre ordinateur, appareil mobile ou tout autre appareil par un site web, contenant les détails de votre historique de navigation sur ce site web parmi ses nombreuses utilisations.
                  </div>
                  <div>
                    <strong className="text-foreground">Pays</strong> fait référence à : Algérie
                  </div>
                  <div>
                    <strong className="text-foreground">Appareil</strong> désigne tout appareil pouvant accéder au Service tel qu'un ordinateur, un téléphone portable ou une tablette numérique.
                  </div>
                  <div>
                    <strong className="text-foreground">Données Personnelles</strong> désignent toute information relative à une personne identifiée ou identifiable.
                  </div>
                  <div>
                    <strong className="text-foreground">Service</strong> fait référence au Site Web.
                  </div>
                  <div>
                    <strong className="text-foreground">Fournisseur de Service</strong> désigne toute personne physique ou morale qui traite les données pour le compte de l'Entreprise. Il fait référence à des sociétés tierces ou à des personnes employées par l'Entreprise pour faciliter le Service, fournir le Service au nom de l'Entreprise, effectuer des services liés au Service ou aider l'Entreprise à analyser la façon dont le Service est utilisé.
                  </div>
                  <div>
                    <strong className="text-foreground">Données d'Utilisation</strong> désignent les données collectées automatiquement, soit générées par l'utilisation du Service, soit à partir de l'infrastructure du Service elle-même (par exemple, la durée d'une visite de page).
                  </div>
                  <div>
                    <strong className="text-foreground">Site Web</strong> fait référence à AMI IMMOBILIER, accessible depuis notre plateforme en ligne.
                  </div>
                  <div>
                    <strong className="text-foreground">Vous</strong> désigne la personne accédant ou utilisant le Service, ou la société, ou toute autre entité juridique au nom de laquelle cette personne accède ou utilise le Service, selon le cas.
                  </div>
                </div>
              </Card>
            </section>

            {/* Section 2: Collecte et Utilisation */}
            <section id="data-collection" className="mb-12">
              <Card className="p-6">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  2. Collecte et Utilisation de Vos Données Personnelles
                </h2>

                <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Types de Données Collectées</h3>

                <h4 className="text-lg font-semibold text-foreground mt-4 mb-2">Données Personnelles</h4>
                <p className="text-muted-foreground mb-4">
                  Lors de l'utilisation de notre Service, nous pouvons vous demander de nous fournir certaines informations 
                  personnellement identifiables qui peuvent être utilisées pour vous contacter ou vous identifier. Les informations 
                  personnellement identifiables peuvent inclure, sans s'y limiter :
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4 ml-4">
                  <li>Adresse e-mail</li>
                  <li>Prénom et nom</li>
                  <li>Numéro de téléphone</li>
                  <li>Adresse, État, Province, Code postal, Ville</li>
                  <li>Informations sur les biens immobiliers recherchés ou proposés</li>
                  <li>Préférences de contact</li>
                  <li>Messages et communications</li>
                </ul>

                <h4 className="text-lg font-semibold text-foreground mt-4 mb-2">Données d'Utilisation</h4>
                <p className="text-muted-foreground mb-4">
                  Les Données d'Utilisation sont collectées automatiquement lors de l'utilisation du Service.
                </p>
                <p className="text-muted-foreground mb-4">
                  Les Données d'Utilisation peuvent inclure des informations telles que l'adresse de protocole Internet (IP) de votre 
                  appareil, le type de navigateur, la version du navigateur, les pages de notre Service que vous visitez, l'heure et 
                  la date de votre visite, le temps passé sur ces pages, les identifiants uniques d'appareil et d'autres données de diagnostic.
                </p>
                <p className="text-muted-foreground mb-4">
                  Lorsque vous accédez au Service par ou via un appareil mobile, nous pouvons collecter certaines informations 
                  automatiquement, y compris, sans s'y limiter, le type d'appareil mobile que vous utilisez, l'ID unique de votre 
                  appareil mobile, l'adresse IP de votre appareil mobile, votre système d'exploitation mobile, le type de navigateur 
                  Internet mobile que vous utilisez, les identifiants uniques d'appareil et d'autres données de diagnostic.
                </p>
                <p className="text-muted-foreground mb-4">
                  Nous pouvons également collecter des informations que votre navigateur envoie chaque fois que vous visitez notre 
                  Service ou lorsque vous accédez au Service par ou via un appareil mobile.
                </p>

                <h4 className="text-lg font-semibold text-foreground mt-4 mb-2">Données Stockées Localement</h4>
                <p className="text-muted-foreground mb-4">
                  Notre Service utilise le stockage local de votre navigateur (localStorage) pour améliorer votre expérience utilisateur :
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4 ml-4">
                  <li><strong>Favoris</strong> : Nous stockons les biens immobiliers que vous avez ajoutés à vos favoris</li>
                  <li><strong>Comparaisons</strong> : Nous stockons les biens que vous avez sélectionnés pour comparaison</li>
                  <li><strong>Préférences</strong> : Nous stockons vos préférences de navigation (type de bien sélectionné, etc.)</li>
                  <li><strong>Authentification</strong> : Nous stockons les informations de session pour les utilisateurs authentifiés</li>
                </ul>
                <p className="text-muted-foreground mb-4">
                  Ces données sont stockées uniquement sur votre appareil et ne sont pas transmises à nos serveurs, sauf lorsque 
                  vous utilisez des fonctionnalités nécessitant une synchronisation (comme la sauvegarde de favoris).
                </p>
              </Card>
            </section>

            {/* Section 3: Cookies */}
            <section id="cookies" className="mb-12">
              <Card className="p-6">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  3. Technologies de Suivi et Cookies
                </h2>
                <p className="text-muted-foreground mb-4">
                  Nous utilisons des Cookies et des technologies de suivi similaires pour suivre l'activité sur notre Service et 
                  stocker certaines informations. Les technologies de suivi utilisées sont des balises, des tags et des scripts pour 
                  collecter et suivre les informations et pour améliorer et analyser notre Service.
                </p>

                <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Types de Cookies Utilisés</h3>

                <h4 className="text-lg font-semibold text-foreground mt-4 mb-2">Cookies Nécessaires / Essentiels</h4>
                <p className="text-muted-foreground mb-4">
                  <strong>Type :</strong> Cookies de Session<br />
                  <strong>Administrés par :</strong> Nous<br />
                  <strong>Objectif :</strong> Ces Cookies sont essentiels pour vous fournir les services disponibles sur le Site Web et 
                  pour vous permettre d'utiliser certaines de ses fonctionnalités. Ils aident à authentifier les utilisateurs et à 
                  empêcher l'utilisation frauduleuse de comptes d'utilisateurs. Sans ces Cookies, les services que vous avez demandés 
                  ne peuvent pas être fournis, et nous n'utilisons ces Cookies que pour vous fournir ces services.
                </p>

                <h4 className="text-lg font-semibold text-foreground mt-4 mb-2">Cookies de Fonctionnalité</h4>
                <p className="text-muted-foreground mb-4">
                  <strong>Type :</strong> Cookies Persistants<br />
                  <strong>Administrés par :</strong> Nous<br />
                  <strong>Objectif :</strong> Ces Cookies nous permettent de nous souvenir des choix que vous faites lorsque vous 
                  utilisez le Site Web, comme la mémorisation de vos détails de connexion ou de votre préférence linguistique. 
                  L'objectif de ces Cookies est de vous fournir une expérience plus personnelle et d'éviter que vous ayez à ressaisir 
                  vos préférences chaque fois que vous utilisez le Site Web.
                </p>

                <h4 className="text-lg font-semibold text-foreground mt-4 mb-2">Cookies de Suivi et de Performance</h4>
                <p className="text-muted-foreground mb-4">
                  <strong>Type :</strong> Cookies Persistants<br />
                  <strong>Administrés par :</strong> Tiers<br />
                  <strong>Objectif :</strong> Ces Cookies sont utilisés pour suivre les informations sur le trafic vers le Site Web et 
                  la façon dont les utilisateurs utilisent le Site Web. Les informations recueillies via ces Cookies peuvent directement 
                  ou indirectement vous identifier en tant que visiteur individuel. Nous pouvons également utiliser ces Cookies pour tester 
                  de nouvelles pages, fonctionnalités ou nouvelles fonctionnalités du Site Web pour voir comment nos utilisateurs réagissent.
                </p>

                <p className="text-muted-foreground mt-4">
                  Vous pouvez instruire votre navigateur de refuser tous les Cookies ou d'indiquer quand un Cookie est envoyé. Cependant, 
                  si vous n'acceptez pas les Cookies, vous ne pourrez peut-être pas utiliser certaines parties de notre Service.
                </p>
              </Card>
            </section>

            {/* Section 4: Utilisation des Données */}
            <section id="data-use" className="mb-12">
              <Card className="p-6">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  4. Utilisation de Vos Données Personnelles
                </h2>
                <p className="text-muted-foreground mb-4">
                  L'Entreprise peut utiliser les Données Personnelles aux fins suivantes :
                </p>
                <ul className="list-disc list-inside space-y-3 text-muted-foreground mb-4 ml-4">
                  <li><strong>Pour fournir et maintenir notre Service</strong>, y compris pour surveiller l'utilisation de notre Service.</li>
                  <li><strong>Pour gérer Votre Compte :</strong> pour gérer votre inscription en tant qu'utilisateur du Service. Les Données Personnelles que vous fournissez peuvent vous donner accès à différentes fonctionnalités du Service qui sont disponibles pour vous en tant qu'utilisateur enregistré.</li>
                  <li><strong>Pour l'exécution d'un contrat :</strong> le développement, la conformité et l'engagement du contrat d'achat pour les produits, articles ou services que vous avez achetés ou de tout autre contrat avec Nous par le biais du Service.</li>
                  <li><strong>Pour Vous contacter :</strong> Pour vous contacter par e-mail, appels téléphoniques, SMS ou autres formes équivalentes de communication électronique, telles que les notifications push d'une application mobile concernant les mises à jour ou les communications informatives liées aux fonctionnalités, produits ou services contractés, y compris les mises à jour de sécurité, lorsque cela est nécessaire ou raisonnable pour leur mise en œuvre.</li>
                  <li><strong>Pour vous fournir</strong> des actualités, des offres spéciales et des informations générales sur d'autres biens, services et événements que nous proposons et qui sont similaires à ceux que vous avez déjà achetés ou sur lesquels vous vous êtes renseigné, sauf si vous avez choisi de ne pas recevoir ces informations.</li>
                  <li><strong>Pour gérer Vos demandes :</strong> Pour assister et gérer vos demandes à Nous.</li>
                  <li><strong>Pour des transferts d'entreprise :</strong> Nous pouvons utiliser vos informations pour évaluer ou mener une fusion, une cession, une restructuration, une réorganisation, une dissolution ou autre vente ou transfert de tout ou partie de Nos actifs, que ce soit en tant qu'entreprise en activité ou dans le cadre d'une faillite, d'une liquidation ou d'une procédure similaire, dans laquelle les Données Personnelles détenues par Nous sur nos utilisateurs de Service font partie des actifs transférés.</li>
                  <li><strong>Pour d'autres fins :</strong> Nous pouvons utiliser vos informations à d'autres fins, telles que l'analyse de données, l'identification des tendances d'utilisation, la détermination de l'efficacité de nos campagnes promotionnelles et pour évaluer et améliorer notre Service, produits, services, marketing et votre expérience.</li>
                </ul>

                <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Utilisations Spécifiques au Service Immobilier</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4 ml-4">
                  <li>Publication d'annonces immobilières (publiques ou privées selon votre choix)</li>
                  <li>Mise en relation entre vendeurs et acheteurs</li>
                  <li>Mise en relation avec des notaires partenaires</li>
                  <li>Communication des informations sur les biens immobiliers</li>
                  <li>Gestion des rendez-vous avec nos agents immobiliers</li>
                  <li>Traitement des demandes de devis et d'estimation</li>
                  <li>Amélioration de nos services de recherche et de recommandation de biens</li>
                </ul>
              </Card>
            </section>

            {/* Section 5: Partage des Données */}
            <section id="data-sharing" className="mb-12">
              <Card className="p-6">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  5. Partage de Vos Données Personnelles
                </h2>
                <p className="text-muted-foreground mb-4">
                  Nous pouvons partager vos informations personnelles dans les situations suivantes :
                </p>

                <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Avec des Fournisseurs de Service</h3>
                <p className="text-muted-foreground mb-4">
                  Nous pouvons partager vos informations personnelles avec des Fournisseurs de Service pour surveiller et analyser 
                  l'utilisation de notre Service, pour le traitement des paiements, pour vous contacter.
                </p>
                <p className="text-muted-foreground mb-4">
                  <strong>Services tiers utilisés :</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4 ml-4">
                  <li><strong>Supabase :</strong> Hébergement de base de données et stockage des données. Leur politique de confidentialité est disponible sur <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://supabase.com/privacy</a></li>
                  <li><strong>Google Maps :</strong> Services de cartographie et géolocalisation. Leur politique de confidentialité est disponible sur <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://policies.google.com/privacy</a></li>
                  <li><strong>n8n :</strong> Service de webhook pour le chatbot. Leur politique de confidentialité est disponible sur <a href="https://n8n.io/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://n8n.io/privacy</a></li>
                </ul>

                <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Pour des Transferts d'Entreprise</h3>
                <p className="text-muted-foreground mb-4">
                  Nous pouvons partager ou transférer vos informations personnelles dans le cadre de, ou pendant les négociations de, 
                  toute fusion, vente d'actifs de l'Entreprise, financement ou acquisition de tout ou partie de Notre entreprise à 
                  une autre société.
                </p>

                <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Avec des Partenaires d'Affaires</h3>
                <p className="text-muted-foreground mb-4">
                  Nous pouvons partager vos informations avec Nos partenaires d'affaires pour vous offrir certains produits, services 
                  ou promotions. Dans le contexte de notre activité immobilière, cela inclut :
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4 ml-4">
                  <li>Notaires partenaires pour faciliter les transactions immobilières</li>
                  <li>Agents immobiliers pour la mise en relation avec les clients</li>
                </ul>

                <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Avec Votre Consentement</h3>
                <p className="text-muted-foreground mb-4">
                  Nous pouvons divulguer vos informations personnelles à toute autre fin avec votre consentement.
                </p>

                <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Aucune Vente de Données</h3>
                <p className="text-muted-foreground mb-4">
                  Nous ne vendons pas vos données personnelles à des tiers. Vos données sont utilisées uniquement dans le cadre de 
                  la fourniture de nos services immobiliers.
                </p>
              </Card>
            </section>

            {/* Section 6: Conservation */}
            <section id="data-retention" className="mb-12">
              <Card className="p-6">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  6. Conservation de Vos Données Personnelles
                </h2>
                <p className="text-muted-foreground mb-4">
                  L'Entreprise ne conservera Vos Données Personnelles que pendant la durée nécessaire aux fins énoncées dans cette 
                  Politique de Confidentialité. Nous conserverons et utiliserons Vos Données Personnelles dans la mesure nécessaire 
                  pour nous conformer à nos obligations légales (par exemple, si nous sommes tenus de conserver vos données pour 
                  nous conformer aux lois applicables), résoudre les litiges et faire respecter nos accords et politiques juridiques.
                </p>
                <p className="text-muted-foreground mb-4">
                  L'Entreprise conservera également les Données d'Utilisation à des fins d'analyse interne. Les Données d'Utilisation 
                  sont généralement conservées pour une période plus courte, sauf lorsque ces données sont utilisées pour renforcer 
                  la sécurité ou améliorer la fonctionnalité de Notre Service, ou lorsque Nous sommes légalement tenus de conserver 
                  ces données pendant des périodes plus longues.
                </p>
                <p className="text-muted-foreground mb-4">
                  <strong>Durées de conservation spécifiques :</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4 ml-4">
                  <li>Données de compte : conservées tant que votre compte est actif, puis 3 ans après la dernière activité</li>
                  <li>Données de contact : conservées pendant 3 ans après le dernier contact</li>
                  <li>Données de transaction : conservées pendant 10 ans conformément aux obligations comptables</li>
                  <li>Données de navigation : conservées pendant 13 mois maximum</li>
                </ul>
              </Card>
            </section>

            {/* Section 7: Sécurité */}
            <section id="data-security" className="mb-12">
              <Card className="p-6">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  7. Sécurité de Vos Données Personnelles
                </h2>
                <p className="text-muted-foreground mb-4">
                  La sécurité de Vos Données Personnelles est importante pour Nous, mais rappelez-vous qu'aucune méthode de transmission 
                  sur Internet, ou méthode de stockage électronique n'est sécurisée à 100%. Bien que Nous nous efforcions d'utiliser des 
                  moyens commercialement acceptables pour protéger Vos Données Personnelles, Nous ne pouvons garantir leur sécurité absolue.
                </p>
                <p className="text-muted-foreground mb-4">
                  <strong>Mesures de sécurité mises en place :</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4 ml-4">
                  <li>Chiffrement des données en transit (HTTPS/TLS)</li>
                  <li>Chiffrement des données au repos dans notre base de données</li>
                  <li>Authentification sécurisée pour l'accès aux comptes</li>
                  <li>Accès restreint aux données personnelles aux seuls employés autorisés</li>
                  <li>Surveillance régulière des systèmes pour détecter les violations de sécurité</li>
                  <li>Sauvegardes régulières des données</li>
                </ul>
              </Card>
            </section>

            {/* Section 8: Droits RGPD */}
            <section id="gdpr-rights" className="mb-12">
              <Card className="p-6">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  8. Vos Droits en vertu du Règlement Général sur la Protection des Données (RGPD)
                </h2>
                <p className="text-muted-foreground mb-4">
                  Si vous êtes un résident de l'Espace Économique Européen (EEE) ou si vos données sont traitées dans le cadre du RGPD, 
                  vous disposez de certains droits concernant vos données personnelles. L'Entreprise s'engage à respecter la confidentialité 
                  de Vos Données Personnelles et à garantir que vous pouvez exercer Vos droits.
                </p>
                <p className="text-muted-foreground mb-4">
                  Vous avez le droit, en vertu de cette Politique de Confidentialité, et par la loi si vous êtes dans l'UE, de :
                </p>

                <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Droit d'Accès</h3>
                <p className="text-muted-foreground mb-4">
                  Vous avez le droit d'accéder, de mettre à jour ou de supprimer les informations que Nous avons sur Vous. Chaque fois que 
                  cela est possible, vous pouvez accéder, mettre à jour ou demander la suppression de Vos Données Personnelles directement 
                  dans les paramètres de votre compte. Si vous ne pouvez pas effectuer ces actions vous-même, veuillez Nous contacter pour 
                  vous assister. Cela vous permet également de recevoir une copie des Données Personnelles que Nous détenons sur Vous.
                </p>

                <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Droit de Rectification</h3>
                <p className="text-muted-foreground mb-4">
                  Vous avez le droit d'avoir toute information incomplète ou inexacte que Nous détenons sur Vous corrigée.
                </p>

                <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Droit d'Opposition</h3>
                <p className="text-muted-foreground mb-4">
                  Vous avez le droit de vous opposer au traitement de Vos Données Personnelles lorsque Nous nous appuyons sur un intérêt 
                  légitime comme base légale pour Notre traitement et qu'il y a quelque chose concernant votre situation particulière 
                  qui vous fait vouloir vous opposer à notre traitement de Vos Données Personnelles sur ce terrain. Vous avez également le 
                  droit de vous opposer lorsque Nous traitons Vos Données Personnelles à des fins de marketing direct.
                </p>

                <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Droit à l'Effacement</h3>
                <p className="text-muted-foreground mb-4">
                  Vous avez le droit de demander à Nous de supprimer ou de retirer Vos Données Personnelles lorsqu'il n'y a pas de bonne 
                  raison pour Nous de continuer à les traiter.
                </p>

                <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Droit à la Portabilité des Données</h3>
                <p className="text-muted-foreground mb-4">
                  Nous vous fournirons, ou à un tiers que vous avez choisi, Vos Données Personnelles dans un format structuré, couramment 
                  utilisé et lisible par machine. Veuillez noter que ce droit ne s'applique qu'aux informations automatisées pour lesquelles 
                  vous avez initialement donné votre consentement pour que Nous les utilisions ou lorsque Nous avons utilisé les informations 
                  pour exécuter un contrat avec Vous.
                </p>

                <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Droit de Retirer Votre Consentement</h3>
                <p className="text-muted-foreground mb-4">
                  Vous avez le droit de retirer votre consentement à l'utilisation de vos Données Personnelles. Si Vous retirez votre 
                  consentement, Nous ne pourrons peut-être pas vous fournir l'accès à certaines fonctionnalités spécifiques du Service.
                </p>
              </Card>
            </section>

            {/* Section 9: Exercice des Droits */}
            <section id="exercise-rights" className="mb-12">
              <Card className="p-6">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  9. Exercice de Vos Droits de Protection des Données
                </h2>
                <p className="text-muted-foreground mb-4">
                  Vous pouvez exercer vos droits d'accès, de rectification, d'annulation et d'opposition en Nous contactant. Veuillez noter 
                  que Nous pouvons vous demander de vérifier votre identité avant de répondre à de telles demandes. Si vous faites une 
                  demande, Nous ferons de notre mieux pour vous répondre dans les plus brefs délais.
                </p>
                <p className="text-muted-foreground mb-4">
                  Vous avez le droit de déposer une plainte auprès d'une autorité de protection des données concernant Notre collecte et 
                  utilisation de Vos Données Personnelles. Pour plus d'informations, si vous êtes dans l'Espace Économique Européen (EEE), 
                  veuillez contacter votre autorité locale de protection des données dans l'EEE.
                </p>
                <p className="text-muted-foreground mb-4">
                  <strong>Délai de réponse :</strong> Nous nous engageons à répondre à votre demande dans un délai maximum de 30 jours 
                  à compter de la réception de votre demande.
                </p>
              </Card>
            </section>

            {/* Section 10: Confidentialité des Enfants */}
            <section id="children-privacy" className="mb-12">
              <Card className="p-6">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  10. Confidentialité des Enfants
                </h2>
                <p className="text-muted-foreground mb-4">
                  Notre Service ne s'adresse à personne de moins de 18 ans. Nous ne collectons pas sciemment d'informations personnellement 
                  identifiables de quiconque de moins de 18 ans. Si vous êtes un parent ou un tuteur et que vous savez que votre enfant 
                  Nous a fourni des Données Personnelles, veuillez Nous contacter. Si Nous apprenons que Nous avons collecté des Données 
                  Personnelles de quiconque de moins de 18 ans sans vérification du consentement parental, Nous prenons des mesures pour 
                  supprimer ces informations de Nos serveurs.
                </p>
                <p className="text-muted-foreground mb-4">
                  Si Nous devons nous appuyer sur le consentement comme base légale pour traiter vos informations et que votre pays exige 
                  le consentement d'un parent, Nous pouvons exiger le consentement de votre parent avant de collecter et d'utiliser ces informations.
                </p>
              </Card>
            </section>

            {/* Section 11: Liens */}
            <section id="links" className="mb-12">
              <Card className="p-6">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  11. Liens vers d'autres Sites Web
                </h2>
                <p className="text-muted-foreground mb-4">
                  Notre Service peut contenir des liens vers d'autres sites Web qui ne sont pas exploités par Nous. Si vous cliquez sur 
                  un lien tiers, vous serez dirigé vers le site de ce tiers. Nous vous conseillons fortement de consulter la Politique de 
                  Confidentialité de chaque site que vous visitez.
                </p>
                <p className="text-muted-foreground mb-4">
                  Nous n'avons aucun contrôle sur et n'assumons aucune responsabilité pour le contenu, les politiques de confidentialité ou 
                  les pratiques de tout site ou service tiers.
                </p>
              </Card>
            </section>

            {/* Section 12: Modifications */}
            <section id="changes" className="mb-12">
              <Card className="p-6">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  12. Modifications de cette Politique de Confidentialité
                </h2>
                <p className="text-muted-foreground mb-4">
                  Nous pouvons mettre à jour Notre Politique de Confidentialité de temps à autre. Nous vous informerons de tout changement 
                  en publiant la nouvelle Politique de Confidentialité sur cette page.
                </p>
                <p className="text-muted-foreground mb-4">
                  Nous vous informerons par e-mail et/ou un avis prominent sur Notre Service, avant que le changement ne devienne effectif 
                  et mettrons à jour la date de "Dernière mise à jour" en haut de cette Politique de Confidentialité.
                </p>
                <p className="text-muted-foreground mb-4">
                  Il vous est conseillé de consulter cette Politique de Confidentialité périodiquement pour tout changement. Les modifications 
                  de cette Politique de Confidentialité sont effectives lorsqu'elles sont publiées sur cette page.
                </p>
              </Card>
            </section>

            {/* Section 13: Contact */}
            <section id="contact" className="mb-12">
              <Card className="p-6">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  13. Contactez-nous
                </h2>
                <p className="text-muted-foreground mb-4">
                  Si vous avez des questions concernant cette Politique de Confidentialité, vous pouvez Nous contacter :
                </p>
                <div className="space-y-2 text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Par e-mail :</strong>{" "}
                    <a href="mailto:ssracim.dev@gmail.com" className="text-primary hover:underline">
                      ssracim.dev@gmail.com
                    </a>
                  </p>
                  <p>
                    <strong className="text-foreground">Responsable du traitement des données :</strong> AMI IMMOBILIER
                  </p>
                  <p>
                    <strong className="text-foreground">Pour exercer vos droits :</strong> Veuillez envoyer un e-mail à l'adresse ci-dessus 
                    en précisant votre demande (accès, rectification, suppression, portabilité, opposition) et en joignant une copie d'une 
                    pièce d'identité pour vérification.
                  </p>
                </div>
              </Card>
            </section>

            {/* Retour en haut */}
            <div className="text-center mt-8">
              <a 
                href="#top" 
                className="text-primary hover:underline inline-flex items-center gap-2"
              >
                Retour en haut ↑
              </a>
            </div>
          </div>
        </motion.div>
      </main>
      <ScrollToTop />
    </div>
  );
};

export default PolitiqueConfidentialite;
