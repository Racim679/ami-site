import { useEffect } from 'react';

const PWARegistration: React.FC = () => {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('SW enregistré: ', registration);
          })
          .catch((registrationError) => {
            console.log('SW échec d\'enregistrement: ', registrationError);
          });
      });
    }
  }, []);

  return null;
};

export default PWARegistration; 