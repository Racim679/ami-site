import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Wilaya {
   id: number;
   name: string;
   originalNames: string[]; // Pour stocker toutes les variations (Alger, Algiers)
}

// Normaliser les noms de wilayas pour regrouper les variations
const normalizeWilayaName = (name: string): string => {
   const normalized = name.toLowerCase().trim();
   // Regrouper Alger et Algiers
   if (normalized === 'algiers' || normalized === 'alger') {
      return 'Alger';
   }
   // Capitaliser la première lettre
   return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
};

export const useWilayas = () => {
   const [wilayas, setWilayas] = useState<Wilaya[]>([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchWilayas = async () => {
         try {
            const { data, error } = await supabase
               .from('wilayas')
               .select('id, name')
               .order('name');

            if (error) {
               console.error('Error fetching wilayas:', error);
            } else if (data) {
               // Regrouper les wilayas par nom normalisé
               const wilayaMap = new Map<string, Wilaya>();

               data.forEach(w => {
                  const normalizedName = normalizeWilayaName(w.name);

                  if (wilayaMap.has(normalizedName)) {
                     // Ajouter ce nom aux variations
                     const existing = wilayaMap.get(normalizedName)!;
                     if (!existing.originalNames.includes(w.name)) {
                        existing.originalNames.push(w.name);
                     }
                  } else {
                     // Créer une nouvelle entrée
                     wilayaMap.set(normalizedName, {
                        id: w.id,
                        name: normalizedName,
                        originalNames: [w.name]
                     });
                  }
               });

               setWilayas(Array.from(wilayaMap.values()));
            }
         } catch (error) {
            console.error('Error fetching wilayas:', error);
         } finally {
            setLoading(false);
         }
      };

      fetchWilayas();
   }, []);

   return { wilayas, loading };
};

// Helper pour vérifier si un nom de wilaya correspond au filtre
export const matchesWilayaFilter = (propertyWilayaName: string | undefined, filterValue: string): boolean => {
   if (!propertyWilayaName || !filterValue) return false;

   const normalizedProperty = normalizeWilayaName(propertyWilayaName);
   const normalizedFilter = normalizeWilayaName(filterValue);

   return normalizedProperty === normalizedFilter;
};
