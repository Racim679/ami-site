import { Facebook, Instagram, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/ami-immo-logo-transparant.png";

// Icône TikTok personnalisée
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const Footer = () => {
  const whatsappUrl = "https://api.whatsapp.com/send/?phone=33765683250&text=Bonjour%2C%20j%27ai%20%C3%A9t%C3%A9%20redirig%C3%A9%20via%20votre%20site%20web%20vers%20vous.%0A%0AMa%20demande%20%3A%20%5BVeuillez%20indiquer%20votre%20demande%20-%20vente%2C%20location%20ou%20achat%5D&type=phone_number&app_absent=0";

  const socialLinks = [
    {
      icon: Youtube,
      label: "YouTube",
      href: "#"
    },
    {
      icon: Instagram,
      label: "Instagram",
      href: "#"
    },
    {
      icon: TikTokIcon,
      label: "TikTok",
      href: "#"
    },
    {
      icon: Facebook,
      label: "Facebook",
      href: "#"
    }
  ];

  return (
    <footer className="relative bg-footer-bg text-white overflow-hidden">
      <div className="relative container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
          {/* Left Section - Copyright and Developer */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <p className="text-sm md:text-base text-white mb-1">
              Droits d&apos;auteur © 2025. AMI Immobilier
            </p>
            <p className="text-xs md:text-sm text-white/80">
              Développé par Si Smail Racim
            </p>
          </div>

          {/* Center Section - Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center justify-center" aria-label="Accueil AMI Immobilier">
              {/* mix-blend-screen: le noir du PNG se fond sur le fond du footer (comme de la transparence) */}
              <img
                src={logo}
                alt="AMI Immobilier"
                className="h-16 md:h-20 w-auto mix-blend-screen"
              />
            </Link>
          </div>

          {/* Right Section - Social Media Icons */}
          <div className="flex items-center gap-4 md:gap-5">
            {/* Social Media Icons */}
            <div className="flex items-center gap-3 md:gap-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-[#d4af37] transition-colors duration-300"
                    aria-label={social.label}
                  >
                    <IconComponent className="w-5 h-5 md:w-6 md:h-6" />
                  </a>
                );
              })}
            </div>

            {/* WhatsApp Icon with Red Glow */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-[#25d366] rounded-full transition-all duration-300 hover:scale-110"
              aria-label="Contact WhatsApp"
              style={{
                boxShadow: "0 0 20px rgba(255, 0, 0, 0.5), 0 4px 20px rgba(37, 211, 102, 0.4)"
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="white"
                className="w-6 h-6 md:w-7 md:h-7"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;