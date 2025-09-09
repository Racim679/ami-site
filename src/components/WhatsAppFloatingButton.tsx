import React, { useEffect } from 'react';
import { useChatbot } from '@/contexts/ChatbotContext';

interface WhatsAppFloatingButtonProps {
  phoneNumber: string;
}

const WhatsAppFloatingButton = ({ phoneNumber }: WhatsAppFloatingButtonProps) => {
  const cleanPhoneNumber = phoneNumber.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://api.whatsapp.com/send/?phone=${cleanPhoneNumber}&text=Bonjour%2C+je+vous+contacte+concernant+le+bien+que+vous+proposez+via+AMI+Immobilier.+Pourriez-vous+me+donner+plus+d%27informations+s%27il+vous+pla%C3%AEt+%3F&type=phone_number&app_absent=0`;
  const [isVisible, setIsVisible] = React.useState(true);
  const { isOpen: chatbotIsOpen } = useChatbot();

  // Mettre à jour la visibilité en fonction de l'état du chatbot
  useEffect(() => {
    console.log('🟢 WhatsApp: Chatbot state changed:', chatbotIsOpen, 'Setting visibility to:', !chatbotIsOpen);
    setIsVisible(!chatbotIsOpen);
  }, [chatbotIsOpen]);
  useEffect(() => {
    console.log('WhatsApp component mounted, setting up popup');
    
    const setupPopup = () => {
      const button = document.getElementById('whatsappButton');
      const popup = document.getElementById('whatsappPopup');
      const closeBtn = document.getElementById('popupClose');
      
      console.log('Setting up WhatsApp popup elements:', { button, popup, closeBtn });
      
      if (!button || !popup || !closeBtn) {
        console.error('WhatsApp elements not found');
        return;
      }

      // Afficher le popup automatiquement après 3 secondes seulement si visible
      const showPopupTimeout = setTimeout(() => {
        if (isVisible && !chatbotIsOpen) {
          console.log('Showing WhatsApp popup automatically');
          popup.classList.add('active');
        }
      }, 3000);
      
      // Fermer le popup
      const handleClose = () => {
        console.log('Closing WhatsApp popup');
        popup.classList.remove('active');
      };
      
      closeBtn.addEventListener('click', handleClose);
      
      // Fermer le popup en cliquant ailleurs
      const handleClickOutside = (e: Event) => {
        if (!popup.contains(e.target as Node) && !button.contains(e.target as Node)) {
          console.log('Closing popup - clicked outside');
          popup.classList.remove('active');
        }
      };
      
      document.addEventListener('click', handleClickOutside);
      
      // Empêcher la fermeture lors du clic sur le bouton WhatsApp
      const handleButtonClick = () => {
        console.log('WhatsApp button clicked, closing popup');
        popup.classList.remove('active');
      };
      
      button.addEventListener('click', handleButtonClick);
      
      // Cleanup
      return () => {
        clearTimeout(showPopupTimeout);
        closeBtn.removeEventListener('click', handleClose);
        document.removeEventListener('click', handleClickOutside);
        button.removeEventListener('click', handleButtonClick);
      };
    };

    // Délai pour s'assurer que les éléments DOM sont rendus
    const setupTimeout = setTimeout(setupPopup, 100);
    
    return () => {
      clearTimeout(setupTimeout);
    };
  }, [isVisible, chatbotIsOpen]);

  return (
    <>
      <style>
        {`
          @keyframes whatsapp-wiggle {
            0% { transform: rotate(0deg); }
            15% { transform: rotate(15deg); }
            30% { transform: rotate(0deg); }
            100% { transform: rotate(0deg); }
          }
          
          @keyframes ripple-wave {
            0% { 
              transform: scale(1); 
              opacity: 1; 
            }
            100% { 
              transform: scale(2.5); 
              opacity: 0; 
            }
          }
          
          @keyframes popup-appear {
            0% { 
              opacity: 0; 
              transform: translateY(30px) translateX(20px) scale(0.8); 
              filter: blur(4px); 
            }
            50% { 
              opacity: 0.8; 
              transform: translateY(-5px) translateX(0) scale(1.02); 
              filter: blur(1px); 
            }
            100% { 
              opacity: 1; 
              transform: translateY(0) translateX(0) scale(1); 
              filter: blur(0px); 
            }
          }
          
          @keyframes logo-bounce {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
          }
          
          @keyframes text-fade-in {
            0% { 
              opacity: 0; 
              transform: translateY(10px); 
            }
            100% { 
              opacity: 1; 
              transform: translateY(0); 
            }
          }

          .whatsapp-widget {
            position: fixed;
            bottom: 90px;
            right: 24px;
            z-index: 9999;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            transform: translateX(0) scale(1);
            opacity: 1;
          }

          .whatsapp-widget.hidden {
            transform: translateX(100px) scale(0.8);
            opacity: 0;
            pointer-events: none;
          }

          .whatsapp-widget.visible {
            transform: translateX(0) scale(1);
            opacity: 1;
            animation: whatsapp-appear 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          }

          @keyframes whatsapp-appear {
            0% {
              transform: translateX(100px) scale(0.8) rotate(180deg);
              opacity: 0;
            }
            50% {
              transform: translateX(-10px) scale(1.1) rotate(0deg);
              opacity: 0.8;
            }
            100% {
              transform: translateX(0) scale(1) rotate(0deg);
              opacity: 1;
            }
          }

          .whatsapp-button {
            position: relative;
            width: 60px;
            height: 60px;
            background: #22C55E;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 4px 16px rgba(34, 197, 94, 0.15);
            transition: all 0.3s cubic-bezier(.4, 0, .2, 1);
            text-decoration: none;
            color: white;
          }

          .whatsapp-button:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 24px rgba(34, 197, 94, 0.3);
          }

          .whatsapp-icon {
            width: 30px;
            height: 30px;
            fill: currentColor;
            animation: whatsapp-wiggle 1s ease-in-out 5s infinite;
          }

          .whatsapp-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: 2px solid #22C55E;
            border-radius: 50%;
            transform: scale(1);
            opacity: 0;
            animation: ripple-wave 2s ease-out 5s infinite;
            pointer-events: none;
          }

          .whatsapp-popup {
            position: absolute;
            bottom: 80px;
            right: 0;
            width: 320px;
            background: #fff;
            border-radius: 20px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
            border: 1px solid #F3F4F6;
            padding: 16px;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
          }

          .whatsapp-popup.active {
            opacity: 1;
            visibility: visible;
            animation: popup-appear 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          }

          .popup-close {
            position: absolute;
            top: 12px;
            right: 12px;
            background: none;
            border: none;
            color: #9CA3AF;
            cursor: pointer;
            padding: 0;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: color 0.2s;
          }

          .popup-close:hover {
            color: #4B5563;
          }

          .popup-content {
            display: flex;
            align-items: flex-start;
            gap: 12px;
          }

          .popup-logo {
            position: relative;
            flex-shrink: 0;
            animation: logo-bounce 2s ease-in-out 0.8s infinite;
          }

          .popup-logo-img {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            overflow: hidden;
            background: #DBEAFE;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .popup-logo-img img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .popup-logo-status {
            position: absolute;
            bottom: -4px;
            right: -4px;
            width: 16px;
            height: 16px;
            background: #22C55E;
            border: 2px solid #fff;
            border-radius: 50%;
          }

          .popup-text {
            flex: 1;
            padding-right: 12px;
          }

          .popup-title {
            font-weight: 600;
            color: #111827;
            font-size: 15px;
            margin: 0 0 2px 0;
            animation: text-fade-in 0.4s ease-out 0.3s both;
          }

          .popup-subtitle {
            color: #6B7280;
            font-size: 12px;
            margin-bottom: 6px;
            animation: text-fade-in 0.4s ease-out 0.5s both;
          }

          .popup-message {
            color: #374151;
            font-size: 14px;
            line-height: 1.5;
            animation: text-fade-in 0.4s ease-out 0.7s both;
          }

          .popup-arrow {
            position: absolute;
            bottom: -8px;
            right: 32px;
            width: 16px;
            height: 16px;
            background: #fff;
            border-right: 1px solid #F3F4F6;
            border-bottom: 1px solid #F3F4F6;
            transform: rotate(45deg);
            z-index: 1;
          }

          @media (max-width: 480px) {
            .whatsapp-widget {
              bottom: 80px;
              right: 16px;
            }

            .whatsapp-popup {
              width: calc(100vw - 32px);
              right: -16px;
            }
          }
        `}
      </style>
      
      <div className={`whatsapp-widget ${isVisible ? 'visible' : 'hidden'}`} id="whatsappWidget">
        {/* Popup */}
        <div className="whatsapp-popup" id="whatsappPopup">
          <button className="popup-close" id="popupClose" aria-label="Fermer">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
            </svg>
          </button>
          
          <div className="popup-content">
            <div className="popup-logo">
              <div className="popup-logo-img">
                <img src="https://via.placeholder.com/50" alt="Logo" id="popupLogo" />
              </div>
              <div className="popup-logo-status"></div>
            </div>
            
            <div className="popup-text">
              <h3 className="popup-title" id="popupTitle">AMI Immobilier</h3>
              <div className="popup-subtitle" id="popupSubtitle">Propriétaire du bien</div>
              <div className="popup-message" id="popupMessage">
                Contactez le propriétaire du bien en cliquant sur ce bouton.
              </div>
            </div>
          </div>
          
          <div className="popup-arrow"></div>
        </div>

        {/* Bouton WhatsApp */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-button"
          id="whatsappButton"
          aria-label="Contact WhatsApp"
        >
          <svg className="whatsapp-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.886 3.488"/>
          </svg>
        </a>
      </div>
    </>
  );
};

export default WhatsAppFloatingButton;