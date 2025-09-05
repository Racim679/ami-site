import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { 
  Bed, 
  Bath, 
  Home, 
  Building, 
  Ruler, 
  Eye, 
  Settings,
  Shield,
  MapPin,
  FileText,
  Star,
  Check
} from 'lucide-react';

interface PropertyInfo {
  bedrooms?: number;
  bathrooms?: number;
  rooms?: number;
  floors?: number;
  surface?: number;
  living_area?: number;
  condition?: string;
  vue_ville?: boolean;
  vue_mer?: boolean;
  vue_montagne?: boolean;
  vue_jardin?: boolean;
  vue_cour?: boolean;
  vue_degagee?: boolean;
}

interface PropertyInfoSectionProps {
  propertyInfo: PropertyInfo;
  className?: string;
}

const PropertyInfoSection: React.FC<PropertyInfoSectionProps> = ({ 
  propertyInfo, 
  className = "" 
}) => {
  const {
    bedrooms,
    bathrooms,
    rooms,
    floors,
    surface,
    living_area,
    condition,
    vue_ville,
    vue_mer,
    vue_montagne,
    vue_jardin,
    vue_cour,
    vue_degagee
  } = propertyInfo;

  const getViewText = () => {
    const views = [];
    if (vue_ville) views.push('Ville');
    if (vue_mer) views.push('Mer');
    if (vue_montagne) views.push('Montagne');
    if (vue_jardin) views.push('Jardin');
    if (vue_cour) views.push('Cour');
    if (vue_degagee) views.push('Dégagée');
    return views.length > 0 ? views.join(', ') : null;
  };

  // Check if any property info exists
  const hasInfo = Object.values(propertyInfo).some(value => 
    value !== undefined && value !== null && value !== ''
  );

  if (!hasInfo) return null;

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Home className="w-5 h-5" />
          Informations générales
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {bedrooms !== undefined && bedrooms > 0 && (
            <div className="flex items-center gap-2">
              <Bed className="w-4 h-4 text-primary" />
              <span className="text-sm">
                <strong>{bedrooms}</strong> chambre{bedrooms > 1 ? 's' : ''}
              </span>
            </div>
          )}
          
          {bathrooms !== undefined && bathrooms > 0 && (
            <div className="flex items-center gap-2">
              <Bath className="w-4 h-4 text-primary" />
              <span className="text-sm">
                <strong>{bathrooms}</strong> salle{bathrooms > 1 ? 's' : ''} de bain
              </span>
            </div>
          )}
          
          {rooms !== undefined && rooms > 0 && (
            <div className="flex items-center gap-2">
              <Home className="w-4 h-4 text-primary" />
              <span className="text-sm">
                <strong>{rooms}</strong> pièce{rooms > 1 ? 's' : ''}
              </span>
            </div>
          )}
          
          {floors !== undefined && floors > 0 && (
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4 text-primary" />
              <span className="text-sm">
                <strong>{floors}</strong> étage{floors > 1 ? 's' : ''}
              </span>
            </div>
          )}
          
          {surface !== undefined && surface > 0 && (
            <div className="flex items-center gap-2">
              <Ruler className="w-4 h-4 text-primary" />
              <span className="text-sm">
                <strong>{surface} m²</strong> surface
              </span>
            </div>
          )}
          
          {living_area !== undefined && living_area > 0 && (
            <div className="flex items-center gap-2">
              <Ruler className="w-4 h-4 text-primary" />
              <span className="text-sm">
                <strong>{living_area} m²</strong> habitables
              </span>
            </div>
          )}
          
          {getViewText() && (
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-primary" />
              <span className="text-sm">Vue: <strong>{getViewText()}</strong></span>
            </div>
          )}
          
          {condition && (
            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4 text-primary" />
              <span className="text-sm">
                État: <strong>{condition}</strong>
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

interface PropertyListSectionProps {
  title: string;
  items: Array<{ [key: string]: string }>;
  icon: React.ReactNode;
  emptyMessage?: string;
  className?: string;
}

export const PropertyListSection: React.FC<PropertyListSectionProps> = ({
  title,
  items,
  icon,
  emptyMessage = "Aucune information disponible",
  className = ""
}) => {
  if (!items || items.length === 0) return null;

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
              <Star className="w-3 h-3 text-primary flex-shrink-0" />
              <span className="text-sm">
                {Object.values(item)[0]}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// À proximité Section
interface PropertyNearbyProps {
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
}

export const PropertyNearbySection: React.FC<PropertyNearbyProps> = ({ nearby }) => {
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

  const availableNearby = Object.entries(nearby)
    .filter(([_, value]) => value === true)
    .map(([key, _]) => nearbyLabels[key as keyof typeof nearbyLabels])
    .filter(Boolean);

  if (availableNearby.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          À proximité
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          {availableNearby.map((item, index) => (
            <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded-lg">
              <Check className="w-4 h-4 text-green-600" />
              <span className="text-sm">{item}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Amenities section with structured data
export const PropertyAmenitiesSection: React.FC<{ 
  amenities: {
    piscine?: boolean;
    garage?: boolean;
    jardin?: boolean;
    terrasse?: boolean;
    balcon?: boolean;
    cave?: boolean;
    grenier?: boolean;
    buanderie?: boolean;
  }
}> = ({ amenities }) => {
  const amenityItems = [];
  if (amenities.piscine) amenityItems.push({ amenity: 'Piscine' });
  if (amenities.garage) amenityItems.push({ amenity: 'Garage' });
  if (amenities.jardin) amenityItems.push({ amenity: 'Jardin' });
  if (amenities.terrasse) amenityItems.push({ amenity: 'Terrasse' });
  if (amenities.balcon) amenityItems.push({ amenity: 'Balcon' });
  if (amenities.cave) amenityItems.push({ amenity: 'Cave' });
  if (amenities.grenier) amenityItems.push({ amenity: 'Grenier' });
  if (amenities.buanderie) amenityItems.push({ amenity: 'Buanderie' });

  return (
    <PropertyListSection 
      title="Commodités" 
      items={amenityItems} 
      icon={<Home className="w-5 h-5" />}
      emptyMessage="Aucune commodité spécifiée"
    />
  );
};

// Security section with structured data
export const PropertySecuritySection: React.FC<{ 
  security: {
    gardien?: boolean;
    video_surveillance?: boolean;
    alarme?: boolean;
    digicode?: boolean;
    interphone?: boolean;
    portail_electrique?: boolean;
    ascenseur?: boolean;
    acces_handicape?: boolean;
  }
}> = ({ security }) => {
  const securityItems = [];
  if (security.gardien) securityItems.push({ security_feature: 'Gardien' });
  if (security.video_surveillance) securityItems.push({ security_feature: 'Vidéo surveillance' });
  if (security.alarme) securityItems.push({ security_feature: 'Alarme' });
  if (security.digicode) securityItems.push({ security_feature: 'Digicode' });
  if (security.interphone) securityItems.push({ security_feature: 'Interphone' });
  if (security.portail_electrique) securityItems.push({ security_feature: 'Portail électrique' });
  if (security.ascenseur) securityItems.push({ security_feature: 'Ascenseur' });
  if (security.acces_handicape) securityItems.push({ security_feature: 'Accès handicapé' });

  return (
    <PropertyListSection 
      title="Sécurité & Accessibilité" 
      items={securityItems} 
      icon={<Shield className="w-5 h-5" />}
      emptyMessage="Aucune information de sécurité"
    />
  );
};

// Building section
export const PropertyBuildingSection: React.FC<{ items: Array<{ building_feature: string }> }> = ({ items }) => (
  <PropertyListSection
    title="Caractéristiques du bâtiment"
    items={items}
    icon={<Building className="w-5 h-5" />}
  />
);


// Documents section with structured data
export const PropertyDocumentsSection: React.FC<{ 
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
  }
}> = ({ documents }) => {
  const documentItems = [];
  if (documents.titre_propriete) documentItems.push({ document_name: 'Titre de propriété' });
  if (documents.acte_propriete) documentItems.push({ document_name: 'Acte de propriété' });
  if (documents.livret_foncier) documentItems.push({ document_name: 'Livret foncier' });
  if (documents.certificat_inscription_fonciere) documentItems.push({ document_name: 'Certificat d\'inscription foncière' });
  if (documents.plans_cadastraux) documentItems.push({ document_name: 'Plans cadastraux' });
  if (documents.documents_cadastraux) documentItems.push({ document_name: 'Documents cadastraux' });
  if (documents.fiche_fiscale) documentItems.push({ document_name: 'Fiche fiscale' });
  if (documents.certificat_urbanisme) documentItems.push({ document_name: 'Certificat d\'urbanisme' });
  if (documents.permis_construire) documentItems.push({ document_name: 'Permis de construire' });
  if (documents.certification_conformite) documentItems.push({ document_name: 'Certification de conformité' });
  if (documents.contrat_location) documentItems.push({ document_name: 'Contrat de location' });
  if (documents.promesse_vente) documentItems.push({ document_name: 'Promesse de vente' });
  if (documents.mainlevee) documentItems.push({ document_name: 'Mainlevée' });
  if (documents.permis_exploitation) documentItems.push({ document_name: 'Permis d\'exploitation' });
  if (documents.certificat_non_negativite) documentItems.push({ document_name: 'Certificat de non-négativité' });
  if (documents.certification_possession) documentItems.push({ document_name: 'Certification de possession' });

  return (
    <PropertyListSection 
      title="Documents associés" 
      items={documentItems} 
      icon={<FileText className="w-5 h-5" />}
      emptyMessage="Aucun document disponible"
    />
  );
};

export default PropertyInfoSection;