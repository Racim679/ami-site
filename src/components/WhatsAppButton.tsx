import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const whatsappUrl = "https://api.whatsapp.com/send/?phone=33765683250&text=Bonjour%2C%20j%27ai%20%C3%A9t%C3%A9%20redirig%C3%A9%20via%20votre%20site%20web%20vers%20vous.%0A%0AMa%20demande%20%3A%20%5BVeuillez%20indiquer%20votre%20demande%20-%20vente%2C%20location%20ou%20achat%5D&type=phone_number&app_absent=0";

  return (
    <div className="fixed bottom-20 right-5 z-[1000] md:bottom-24 md:right-6">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 md:w-15 md:h-15 bg-[#25d366] rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] transition-all duration-300 text-white hover:scale-110 hover:shadow-[0_6px_30px_rgba(37,211,102,0.6)] animate-[vibrate_4s_infinite]"
        title="Contactez-nous sur WhatsApp"
      >
        <MessageCircle className="w-7 h-7 md:w-8 md:h-8" />
      </a>
      
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes vibrate {
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
        `
      }} />
    </div>
  );
};

export default WhatsAppButton;