import { useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface Property {
  id: string;
  title: string;
  status: string;
  latitude: number;
  longitude: number;
  surface_m2?: number;
  prix_dinar?: number;
  image_url?: string;
  locality?: { name: string };
  typology?: { label: string };
}

interface MarkerInfo {
  marker: google.maps.Marker;
  infoWindow: google.maps.InfoWindow;
  propertyId: string;
}

export const useOptimizedMarkers = (map: google.maps.Map | null) => {
  const markersRef = useRef<Map<string, MarkerInfo>>(new Map());
  const navigate = useNavigate();

  const formatPrice = useCallback((price?: number) => {
    if (!price) return 'Prix sur demande';
    return new Intl.NumberFormat('fr-TN', {
      style: 'decimal',
      minimumFractionDigits: 0,
    }).format(price) + ' DT';
  }, []);

  const createInfoWindowContent = useCallback((property: Property) => {
    return `
      <div style="max-width: 250px; padding: 12px; font-family: system-ui;">
        ${property.image_url ? `
          <img src="${property.image_url}" alt="${property.title}" 
               style="width: 100%; height: 120px; object-fit: cover; border-radius: 8px; margin-bottom: 8px;">
        ` : ''}
        <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600; color: #1f2937;">${property.title}</h3>
        <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 8px;">
          ${property.typology?.label ? `<span style="background: #dbeafe; color: #1e40af; padding: 2px 8px; border-radius: 12px; font-size: 12px;">${property.typology.label}</span>` : ''}
          <span style="background: #dcfce7; color: #166534; padding: 2px 8px; border-radius: 12px; font-size: 12px;">${property.status}</span>
        </div>
        <div style="margin-bottom: 8px;">
          ${property.surface_m2 ? `<p style="margin: 2px 0; font-size: 14px; color: #4b5563;">📐 ${property.surface_m2} m²</p>` : ''}
          <p style="margin: 2px 0; font-size: 14px; color: #4b5563;">💰 ${formatPrice(property.prix_dinar)}</p>
          ${property.locality?.name ? `<p style="margin: 2px 0; font-size: 14px; color: #4b5563;">📍 ${property.locality.name}</p>` : ''}
        </div>
        <button onclick="window.showPropertyDetail('${property.id}')" 
                style="width: 100%; background: #3b82f6; color: white; border: none; padding: 8px 16px; border-radius: 6px; font-size: 14px; cursor: pointer; margin-top: 8px;">
          Voir les détails
        </button>
      </div>
    `;
  }, [formatPrice]);

  const createMarker = useCallback((property: Property) => {
    if (!map) return null;

    const marker = new google.maps.Marker({
      position: { lat: property.latitude, lng: property.longitude },
      map: map,
      title: property.title,
      icon: {
        url: `data:image/svg+xml,${encodeURIComponent(`
          <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="18" fill="#3b82f6" stroke="#ffffff" stroke-width="2"/>
            <circle cx="20" cy="20" r="6" fill="#ffffff"/>
          </svg>
        `)}`,
        scaledSize: new google.maps.Size(40, 40),
        anchor: new google.maps.Point(20, 20)
      }
    });

    const infoWindow = new google.maps.InfoWindow({
      content: createInfoWindowContent(property),
    });

    marker.addListener('click', () => {
      // Fermer toutes les autres info windows
      markersRef.current.forEach(({ infoWindow: iw }) => iw.close());
      infoWindow.open(map, marker);
    });

    return { marker, infoWindow, propertyId: property.id };
  }, [map, createInfoWindowContent]);

  const updateMarkers = useCallback((properties: Property[]) => {
    if (!map) return;

    const currentPropertyIds = new Set(properties.map(p => p.id));
    const existingPropertyIds = new Set(markersRef.current.keys());

    // Supprimer les marqueurs qui ne sont plus nécessaires
    markersRef.current.forEach(({ marker, infoWindow }, propertyId) => {
      if (!currentPropertyIds.has(propertyId)) {
        marker.setMap(null);
        infoWindow.close();
        markersRef.current.delete(propertyId);
      }
    });

    // Ajouter ou mettre à jour les marqueurs
    properties.forEach((property) => {
      const existingMarker = markersRef.current.get(property.id);
      
      if (!existingMarker) {
        // Créer un nouveau marqueur
        const markerInfo = createMarker(property);
        if (markerInfo) {
          markersRef.current.set(property.id, markerInfo);
        }
      } else {
        // Mettre à jour le marqueur existant si nécessaire
        const newPosition = { lat: property.latitude, lng: property.longitude };
        const currentPosition = existingMarker.marker.getPosition();
        
        if (!currentPosition || 
            currentPosition.lat() !== newPosition.lat || 
            currentPosition.lng() !== newPosition.lng) {
          existingMarker.marker.setPosition(newPosition);
        }
        
        // Mettre à jour le contenu de l'info window
        existingMarker.infoWindow.setContent(createInfoWindowContent(property));
      }
    });

    // Configurer la navigation globale
    (window as any).showPropertyDetail = (propertyId: string) => {
      navigate(`/bien/${propertyId}`);
    };
  }, [map, createMarker, createInfoWindowContent, navigate]);

  const clearAllMarkers = useCallback(() => {
    markersRef.current.forEach(({ marker, infoWindow }) => {
      marker.setMap(null);
      infoWindow.close();
    });
    markersRef.current.clear();
  }, []);

  return { updateMarkers, clearAllMarkers };
};