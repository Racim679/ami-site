import React from 'react';

interface PropertyMapProps {
  latitude: number;
  longitude: number;
  title: string;
}

const PropertyMap: React.FC<PropertyMapProps> = ({ latitude, longitude, title }) => {
  return (
    <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center">
      <div className="text-center text-muted-foreground">
        <div className="text-lg font-semibold mb-2">Localisation</div>
        <div className="text-sm">
          Coordonnées: {latitude.toFixed(6)}, {longitude.toFixed(6)}
        </div>
        <div className="text-sm mt-2 text-primary">
          <a 
            href={`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Ouvrir dans Google Maps
          </a>
        </div>
      </div>
    </div>
  );
};

export default PropertyMap;