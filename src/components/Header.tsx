import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ChevronDown, Menu, X, Filter } from "lucide-react";
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
    { path: "/", label: "IMAN IMMO", hasDropdown: false },
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
      <header className="bg-background border-b border-border relative z-50">
        {/* Header principal */}
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo - Desktop */}
            <div className="hidden lg:flex items-center flex-shrink-0">
              <Link to="/" className="hover:opacity-80 transition-opacity">
                <img src={logo} alt="AMI Immobilier" className="h-12 w-auto" />
              </Link>
            </div>

            {/* Navigation centrée - Desktop seulement (4 liens au centre) */}
            <nav className="hidden lg:flex items-center justify-center flex-1 space-x-6">
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
            <div className="hidden lg:flex items-center flex-shrink-0">
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

            {/* Logo mobile ou Filtres (visible seulement sur mobile) */}
            {location.pathname === '/nos-biens' ? (
              <div className="flex items-center lg:hidden gap-2">
                <MobileFilters />
              </div>
            ) : (
              <Link to="/" className="flex items-center lg:hidden">
                <img src={logo} alt="AMI Immobilier" className="h-10 w-auto" />
              </Link>
            )}

            {/* Bouton menu mobile */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden text-muted-foreground hover:text-primary"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Barre de recherche - Visible sur toutes les pages */}
        <div className="bg-primary/95 border-t border-accent/30 py-3">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3">
              {/* Menu hamburger - Mobile seulement */}
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden text-white hover:text-accent transition-colors p-2"
                aria-label="Menu"
              >
                <Menu className="w-6 h-6" />
              </button>

              {/* Barre de recherche */}
              <PropertySearchBar className="flex-1" />

              {/* Bouton Filtres - Mobile seulement, visible sur /nos-biens */}
              {location.pathname === '/nos-biens' && (
                <div className="lg:hidden">
                  <MobileFilters />
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Menu mobile overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-[#0f172a] z-50 lg:hidden">
          <div className="flex flex-col h-full">
            {/* Header du menu mobile */}
            <div className="flex items-center justify-between px-5 pt-5 pb-3">
              {/* Logo avec fond bleu clair rectangulaire */}
              <Link 
                to="/" 
                className="flex items-center bg-primary px-4 py-2.5 rounded-md hover:bg-primary/90 transition-all duration-200 shadow-lg" 
                onClick={toggleMobileMenu}
              >
                <img src={logo} alt="AMI Immobilier" className="h-7 w-auto" />
              </Link>
              <button
                onClick={toggleMobileMenu}
                className="text-white hover:text-primary transition-colors duration-200 p-1.5"
                aria-label="Fermer le menu"
              >
                <X className="w-7 h-7" />
              </button>
            </div>

            {/* Titre IMAN IMMO */}
            <div className="px-5 pb-4">
              <h2 className="text-primary text-2xl font-bold font-heading tracking-tight">
                IMAN IMMO
              </h2>
            </div>

            {/* Navigation mobile */}
            <nav className="flex-1 px-5 pt-2 overflow-y-auto">
              <ul className="space-y-0.5">
                {allNavItems
                  .filter(item => item.path !== "/") // Exclure "IMAN IMMO" de la liste
                  .map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={toggleMobileMenu}
                      className={cn(
                        "flex items-center justify-between px-4 py-4 text-lg font-bold transition-all duration-200 font-heading",
                        location.pathname === item.path
                          ? "text-primary"
                          : "text-white hover:text-primary/80"
                      )}
                    >
                      <span>{item.label}</span>
                      {item.hasDropdown && (
                        <ChevronDown className="w-5 h-5 text-white/70" />
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