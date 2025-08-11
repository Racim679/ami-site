import React, { useEffect, useRef, useState } from "react";

const PropertyMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [apiKey, setApiKey] = useState<string | null>(null);

  // 1. Récupérer la clé Google Maps depuis Supabase Edge Function
  useEffect(() => {
    const fetchApiKey = async () => {
      try {
        const res = await fetch(
          "https://iuuolubfhswwgrpumqtc.supabase.co/functions/v1/google-maps-config"
        );
        const data = await res.json();
        if (data.apiKey) {
          setApiKey(data.apiKey);
        } else {
          console.error("Clé API introuvable");
        }
      } catch (err) {
        console.error("Erreur de récupération de la clé :", err);
      }
    };

    fetchApiKey();
  }, []);

  // 2. Charger Google Maps et afficher la carte
  useEffect(() => {
    if (!apiKey || !mapRef.current) return;

    // Charger le script Google Maps
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.onload = () => {
      // Créer la carte
      const map = new google.maps.Map(mapRef.current as HTMLElement, {
        center: { lat: 36.7538, lng: 3.0588 }, // Coordonnées d'Alger
        zoom: 12,
      });

      // Ajouter un marqueur
      new google.maps.Marker({
        position: { lat: 36.7538, lng: 3.0588 },
        map,
        title: "Exemple de propriété",
      });
    };

    document.body.appendChild(script);
  }, [apiKey]);

  return (
    <div>
      <h2>Carte de la propriété</h2>
      <div
        ref={mapRef}
        style={{ width: "100%", height: "400px", border: "1px solid #ccc" }}
      ></div>
    </div>
  );
};

export default PropertyMap;