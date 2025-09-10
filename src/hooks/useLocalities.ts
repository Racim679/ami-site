import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Locality {
  id: number;
  name: string;
  city_id: number;
}

interface City {
  id: number;
  name: string;
}

export const useLocalities = () => {
  const [localities, setLocalities] = useState<Locality[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [localitiesResponse, citiesResponse] = await Promise.all([
          supabase.from('localities').select('*').order('name'),
          supabase.from('cities').select('*').order('name')
        ]);

        if (localitiesResponse.data) {
          setLocalities(localitiesResponse.data);
        }
        if (citiesResponse.data) {
          setCities(citiesResponse.data);
        }
      } catch (error) {
        console.error('Error fetching localities and cities:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { localities, cities, loading };
};