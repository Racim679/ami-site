import React from 'react';

interface WhatsAppFloatingButtonProps {
  phoneNumber: string;
}

const WhatsAppFloatingButton = ({ phoneNumber }: WhatsAppFloatingButtonProps) => {
  const cleanPhoneNumber = phoneNumber.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://api.whatsapp.com/send/?phone=${cleanPhoneNumber}&text=Bonjour%2C+je+vous+contacte+concernant+le+bien+que+vous+proposez+via+AMI+Immobilier.+Pourriez-vous+me+donner+plus+d%27informations+s%27il+vous+pla%C3%AEt+%3F&type=phone_number&app_absent=0`;

  return (
    <>
      <style>
        {`
          @keyframes whatsapp-vibrate {
            0% { transform: translate(0, 0); }
            1% { transform: translate(2px, -2px); }
            2% { transform: translate(-2px, 2px); }
            3% { transform: translate(2px, 2px); }
            4% { transform: translate(-2px, -2px); }
            5% { transform: translate(0, 0); }
            95% { transform: translate(0, 0); }
            96% { transform: translate(2px, -2px); }
            97% { transform: translate(-2px, 2px); }
            98% { transform: translate(2px, 2px); }
            99% { transform: translate(-2px, -2px); }
            100% { transform: translate(0, 0); }
          }
          
          .whatsapp-button {
            position: fixed;
            bottom: 120px;
            right: 20px;
            width: 60px;
            height: 60px;
            background-color: #25d366;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4);
            z-index: 1000;
            text-decoration: none;
            color: white;
            transition: all 0.3s ease;
            animation: whatsapp-vibrate 4s infinite;
          }
          
          .whatsapp-button:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 30px rgba(37, 211, 102, 0.6);
            color: white;
          }
          
          .whatsapp-icon {
            font-size: 30px;
          }
          
          @media (max-width: 768px) {
            .whatsapp-button {
              bottom: 100px;
              right: 15px;
              width: 55px;
              height: 55px;
            }
            
            .whatsapp-icon {
              font-size: 26px;
            }
          }
        `}
      </style>
      
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-button"
        title="Contactez-nous sur WhatsApp"
      >
        <span className="whatsapp-icon">💬</span>
      </a>
    </>
  );
};

export default WhatsAppFloatingButton;