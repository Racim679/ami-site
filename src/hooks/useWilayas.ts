import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Wilaya {
   id: number;
   name: string;
}

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
               // Supprimer les doublons basés sur le nom (insensible à la casse)
               const uniqueWilayas = data.reduce((acc: Wilaya[], current) => {
                  const exists = acc.find(
                     w => w.name.toLowerCase() === current.name.toLowerCase()
                  );
                  if (!exists) {
                     acc.push(current);
                  }
                  return acc;
               }, []);
               setWilayas(uniqueWilayas);
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
