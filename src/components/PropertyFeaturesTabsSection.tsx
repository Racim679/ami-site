import React, { useState } from 'react';
import { Home, Shield, Building, MapPin, FileText, Check } from 'lucide-react';

interface PropertyFeaturesTabsSectionProps {
  amenities: {
    piscine?: boolean;
    garage?: boolean;
    jardin?: boolean;
    terrasse?: boolean;
    balcon?: boolean;
    cave?: boolean;
    grenier?: boolean;
    buanderie?: boolean;
  };
  security: {
    gardien?: boolean;
    video_surveillance?: boolean;
    alarme?: boolean;
    digicode?: boolean;
    interphone?: boolean;
    portail_electrique?: boolean;
    ascenseur?: boolean;
    acces_handicape?: boolean;
  };
  documents: {
    titre_propriete?: boolean;
    acte_propriete?: boolean;
    livret_foncier?: boolean;
    certificat_inscription_fonciere?: boolean;
    plans_cadastraux?: boolean;
    documents_cadastraux?: boolean;
    fiche_fiscale?: boolean;
    certificat_urbanisme?: boolean;
    permis_construire?: boolean;
    certification_conformite?: boolean;
    contrat_location?: boolean;
    promesse_vente?: boolean;
    mainlevee?: boolean;
    permis_exploitation?: boolean;
    certificat_non_negativite?: boolean;
    certification_possession?: boolean;
  };
  nearby: {
    ecoles?: boolean;
    pharmacies?: boolean;
    mosquees?: boolean;
    transports_publics?: boolean;
    banques?: boolean;
    universites?: boolean;
    commerces?: boolean;
    restaurants?: boolean;
    aeroports?: boolean;
    hopitaux?: boolean;
    parcs?: boolean;
    plages?: boolean;
  };
  building: Array<{ text: string }>;
}

const PropertyFeaturesTabsSection: React.FC<PropertyFeaturesTabsSectionProps> = ({
  amenities,
  security,
  documents,
  nearby,
  building
}) => {
  const [activeTab, setActiveTab] = useState('amenities');

  // Prepare amenities data
  const amenityItems = [];
  if (amenities.piscine) amenityItems.push('Piscine');
  if (amenities.garage) amenityItems.push('Garage');
  if (amenities.jardin) amenityItems.push('Jardin');
  if (amenities.terrasse) amenityItems.push('Terrasse');
  if (amenities.balcon) amenityItems.push('Balcon');
  if (amenities.cave) amenityItems.push('Cave');
  if (amenities.grenier) amenityItems.push('Grenier');
  if (amenities.buanderie) amenityItems.push('Buanderie');

  // Prepare security data
  const securityItems = [];
  if (security.gardien) securityItems.push('Gardien');
  if (security.video_surveillance) securityItems.push('Vidéo surveillance');
  if (security.alarme) securityItems.push('Alarme');
  if (security.digicode) securityItems.push('Digicode');
  if (security.interphone) securityItems.push('Interphone');
  if (security.portail_electrique) securityItems.push('Portail électrique');
  if (security.ascenseur) securityItems.push('Ascenseur');
  if (security.acces_handicape) securityItems.push('Accès handicapé');

  // Prepare documents data
  const documentItems = [];
  if (documents.titre_propriete) documentItems.push('Titre de propriété');
  if (documents.acte_propriete) documentItems.push('Acte de propriété');
  if (documents.livret_foncier) documentItems.push('Livret foncier');
  if (documents.certificat_inscription_fonciere) documentItems.push('Certificat d\'inscription foncière');
  if (documents.plans_cadastraux) documentItems.push('Plans cadastraux');
  if (documents.documents_cadastraux) documentItems.push('Documents cadastraux');
  if (documents.fiche_fiscale) documentItems.push('Fiche fiscale');
  if (documents.certificat_urbanisme) documentItems.push('Certificat d\'urbanisme');
  if (documents.permis_construire) documentItems.push('Permis de construire');
  if (documents.certification_conformite) documentItems.push('Certification de conformité');
  if (documents.contrat_location) documentItems.push('Contrat de location');
  if (documents.promesse_vente) documentItems.push('Promesse de vente');
  if (documents.mainlevee) documentItems.push('Mainlevée');
  if (documents.permis_exploitation) documentItems.push('Permis d\'exploitation');
  if (documents.certificat_non_negativite) documentItems.push('Certificat de non-négativité');
  if (documents.certification_possession) documentItems.push('Certification de possession');

  // Prepare nearby data
  const nearbyLabels = {
    ecoles: "Écoles",
    pharmacies: "Pharmacies",
    mosquees: "Mosquées",
    transports_publics: "Transports publics",
    banques: "Banques",
    universites: "Universités",
    commerces: "Commerces",
    restaurants: "Restaurants",
    aeroports: "Aéroports",
    hopitaux: "Hôpitaux",
    parcs: "Parcs",
    plages: "Plages"
  };

  const nearbyItems = Object.entries(nearby)
    .filter(([_, value]) => value === true)
    .map(([key, _]) => nearbyLabels[key as keyof typeof nearbyLabels])
    .filter(Boolean);

  // Prepare building data
  const buildingItems = building.map(b => b.text);

  const tabs = [
    {
      id: 'amenities',
      label: 'Commodités',
      icon: <Home className="w-4 h-4" />,
      items: amenityItems,
      emptyMessage: 'Aucune commodité spécifiée'
    },
    {
      id: 'security',
      label: 'Sécurité',
      icon: <Shield className="w-4 h-4" />,
      items: securityItems,
      emptyMessage: 'Aucune information de sécurité disponible'
    },
    {
      id: 'building',
      label: 'Bâtiment',
      icon: <Building className="w-4 h-4" />,
      items: buildingItems,
      emptyMessage: 'Aucune caractéristique du bâtiment disponible'
    },
    {
      id: 'nearby',
      label: 'À proximité',
      icon: <MapPin className="w-4 h-4" />,
      items: nearbyItems,
      emptyMessage: 'Aucune information sur les environs disponible'
    },
    {
      id: 'documents',
      label: 'Documents',
      icon: <FileText className="w-4 h-4" />,
      items: documentItems,
      emptyMessage: 'Aucun document disponible'
    }
  ];

  // Filter out tabs with no items
  const visibleTabs = tabs.filter(tab => tab.items.length > 0);
  
  // If no tabs have content, don't render anything
  if (visibleTabs.length === 0) return null;

  // Set the first visible tab as active if current active tab has no items
  const currentTab = tabs.find(tab => tab.id === activeTab);
  if (!currentTab || currentTab.items.length === 0) {
    setActiveTab(visibleTabs[0].id);
  }

  const activeTabData = tabs.find(tab => tab.id === activeTab);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Points Forts</h2>
      
      {/* Tabs Navigation */}
      <div className="flex flex-wrap gap-2 mb-6 bg-muted/30 p-2 rounded-lg">
        {visibleTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            {tab.icon}
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[200px]">
        {activeTabData && (
          <div>
            {activeTabData.items.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {activeTabData.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm py-8 text-center">
                {activeTabData.emptyMessage}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyFeaturesTabsSection;