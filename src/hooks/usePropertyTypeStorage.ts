import { useCallback } from 'react';

export const usePropertyTypeStorage = () => {
  const storePropertyType = useCallback((typology: string) => {
    try {
      localStorage.setItem('selectedPropertyType', typology);
      console.log('Property type stored:', typology);
    } catch (error) {
      console.error('Error storing property type:', error);
    }
  }, []);

  const getStoredPropertyType = useCallback((): string | null => {
    try {
      return localStorage.getItem('selectedPropertyType');
    } catch (error) {
      console.error('Error getting stored property type:', error);
      return null;
    }
  }, []);

  const clearStoredPropertyType = useCallback(() => {
    try {
      localStorage.removeItem('selectedPropertyType');
    } catch (error) {
      console.error('Error clearing stored property type:', error);
    }
  }, []);

  return {
    storePropertyType,
    getStoredPropertyType,
    clearStoredPropertyType
  };
};

export default usePropertyTypeStorage;