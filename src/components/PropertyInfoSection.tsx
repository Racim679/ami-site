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
  Star
} from 'lucide-react';

interface PropertyInfo {
  bedrooms?: number;
  bathrooms?: number;
  rooms?: number;
  floors?: number;
  livingArea?: number;
  hasCityView?: boolean;
  condition?: string;
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
    livingArea,
    hasCityView,
    condition
  } = propertyInfo;

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
          
          {livingArea !== undefined && livingArea > 0 && (
            <div className="flex items-center gap-2">
              <Ruler className="w-4 h-4 text-primary" />
              <span className="text-sm">
                <strong>{livingArea} m²</strong> habitables
              </span>
            </div>
          )}
          
          {hasCityView && (
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-primary" />
              <span className="text-sm">Vue sur la ville</span>
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

// Export specific section components for different types
export const PropertyAmenitiesSection: React.FC<{ items: Array<{ amenity: string }> }> = ({ items }) => (
  <PropertyListSection
    title="Commodités"
    items={items}
    icon={<Star className="w-5 h-5" />}
  />
);

export const PropertySecuritySection: React.FC<{ items: Array<{ security_feature: string }> }> = ({ items }) => (
  <PropertyListSection
    title="Sécurité"
    items={items}
    icon={<Shield className="w-5 h-5" />}
  />
);

export const PropertyBuildingSection: React.FC<{ items: Array<{ building_feature: string }> }> = ({ items }) => (
  <PropertyListSection
    title="Caractéristiques du bâtiment"
    items={items}
    icon={<Building className="w-5 h-5" />}
  />
);

export const PropertyNearbySection: React.FC<{ items: Array<{ nearby_feature: string }> }> = ({ items }) => (
  <PropertyListSection
    title="À proximité"
    items={items}
    icon={<MapPin className="w-5 h-5" />}
  />
);

export const PropertyDocumentsSection: React.FC<{ items: Array<{ document_name: string }> }> = ({ items }) => (
  <PropertyListSection
    title="Documents associés"
    items={items}
    icon={<FileText className="w-5 h-5" />}
  />
);

export default PropertyInfoSection;