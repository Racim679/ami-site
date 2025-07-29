import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

// Exemple de données d'appartements (à remplacer par tes vraies données)
const appartements = [
  { id: 1, lat: 36.7525, lng: 3.042, titre: "Appartement 1" },
  { id: 2, lat: 36.753, lng: 3.05, titre: "Appartement 2" },
  // Ajoute d'autres appartements ici
];

const containerStyle = {
  width: "100%",
  height: "400px"
};

const center = {
  lat: 36.7525,
  lng: 3.042
};

const MapAppartements: React.FC = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDBrBG2cKMvoFANJvNnK6jlqcYSGr2vDWo"
  });

  if (!isLoaded) {
    return <div>Chargement de la carte...</div>;
  }

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
      {appartements.map(app => (
        <Marker key={app.id} position={{ lat: app.lat, lng: app.lng }} title={app.titre} />
      ))}
    </GoogleMap>
  );
};

export default MapAppartements; 