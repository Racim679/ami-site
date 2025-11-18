import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface SearchResult {
  id: string;
  title: string;
  description: string | null;
  typology: string | null;
  surface: number | null;
  price: number | null;
  locality_id: number | null;
  latitude: number | null;
  longitude: number | null;
  phone_whatsapp: string;
  image_url: string | null;
  status: string | null;
  created_at: string;
  updated_at: string | null;
  locality_name: string | null;
  city_name: string | null;
  search_score: number;
}

export const usePropertySearch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchProperties = useCallback(async (query: string): Promise<SearchResult[]> => {
    if (!query || query.trim().length === 0) {
      return [];
    }

    setLoading(true);
    setError(null);

    try {
      // Appeler la fonction PostgreSQL de recherche intelligente
      const { data, error: searchError } = await supabase.rpc(
        'search_properties_intelligent',
        { search_query: query.trim() }
      );

      if (searchError) {
        console.error('Erreur lors de la recherche:', searchError);
        setError(searchError.message);
        return [];
      }

      return (data as SearchResult[]) || [];
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue lors de la recherche';
      console.error('Erreur lors de la recherche:', err);
      setError(errorMessage);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    searchProperties,
    loading,
    error,
  };
};

