import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import { MobileFilters } from "./MobileFilters";
import PropertySearchBar from "./PropertySearchBar";
import logo from "@/assets/ami-immobilier-logo.png";


const Header = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Navigation desktop - liens centrés
  const centerNavItems = [
    { path: "/", label: "Accueil", hasDropdown: false },
    { path: "/nos-biens", label: "Nos biens", hasDropdown: false },
    { path: "/comparaison", label: "Comparaison", hasDropdown: false },
    { path: "/favoris", label: "Favoris", hasDropdown: false },
  ];

  // Contact à droite
  const rightNavItem = { path: "/contact", label: "Contact", hasDropdown: false };

  // Navigation mobile - tous les liens (pour le menu hamburger)
  const leftNavItems = [
    { path: "/", label: "AMI Immo", hasDropdown: false },
  ];

  const mobileCenterNavItems = [
    { path: "/nos-biens", label: "Nos biens", hasDropdown: false },
    { path: "/comparaison", label: "Comparer", hasDropdown: false },
    { path: "/localites", label: "Localités", hasDropdown: false },
  ];

  const rightNavItems = [
    { path: "/favoris", label: "Favoris", hasDropdown: false },
    { path: "/contact", label: "Contact", hasDropdown: true },
  ];

  const allNavItems = [...leftNavItems, ...mobileCenterNavItems, ...rightNavItems];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header className="bg-white border-b border-border relative z-50">
        {/* Header principal - Desktop seulement */}
        <div className="hidden lg:block">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              {/* Logo - Desktop (à gauche) */}
              <div className="flex items-center flex-shrink-0">
                <Link to="/" className="hover:opacity-80 transition-opacity">
                  <img src={logo} alt="AMI Immobilier" className="h-12 w-auto" />
                </Link>
              </div>

              {/* Navigation centrée - Desktop seulement (4 liens au centre) */}
              <nav className="flex items-center justify-center flex-1 space-x-6">
                {centerNavItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary font-heading",
                      location.pathname === item.path
                        ? "text-primary"
                        : "text-muted-foreground"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              {/* Contact à droite - Desktop */}
              <div className="flex items-center flex-shrink-0">
                <Link
                  to={rightNavItem.path}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary font-heading",
                    location.pathname === rightNavItem.path
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  {rightNavItem.label}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Barre de recherche - Mobile et tablette seulement */}
        <div className="lg:hidden bg-white border-t border-border py-2">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3">
              {/* Menu hamburger - Mobile seulement */}
              <button
                onClick={toggleMobileMenu}
                className="text-foreground hover:text-primary transition-colors p-2"
                aria-label="Menu"
              >
                <Menu className="w-6 h-6" />
              </button>

              {/* Barre de recherche */}
              <PropertySearchBar className="flex-1" />

              {/* Bouton Filtres - Mobile seulement, visible sur /nos-biens */}
              {location.pathname === '/nos-biens' && (
                <div>
                  <MobileFilters />
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Menu mobile overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-50 lg:hidden">
          <div className="flex flex-col h-full">
            {/* Header du menu mobile */}
            <div className="flex items-center justify-between px-5 pt-5 pb-3">
              {/* Espace vide à gauche pour équilibrer */}
              <div className="w-10"></div>
              
              {/* Logo centré */}
              <Link 
                to="/" 
                className="flex items-center justify-center flex-1" 
                onClick={toggleMobileMenu}
              >
                <img src={logo} alt="AMI Immobilier" className="h-[168px] w-auto" />
              </Link>
              
              {/* Bouton fermer */}
              <button
                onClick={toggleMobileMenu}
                className="text-primary hover:text-primary/80 transition-colors duration-200 p-1.5"
                aria-label="Fermer le menu"
              >
                <X className="w-7 h-7" />
              </button>
            </div>

            {/* Navigation mobile */}
            <nav className="flex-1 px-5 pt-2 overflow-y-auto">
              <ul className="space-y-0">
                {allNavItems
                  .filter(item => item.path !== "/") // Exclure "AMI Immo" de la liste
                  .map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={toggleMobileMenu}
                      className={cn(
                        "flex items-center justify-between px-4 py-2.5 text-base font-bold transition-all duration-200 font-heading",
                        location.pathname === item.path
                          ? "text-primary"
                          : "text-primary hover:text-primary/80"
                      )}
                    >
                      <span>{item.label}</span>
                      {item.hasDropdown && (
                        <ChevronDown className="w-5 h-5 text-primary/70" />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;