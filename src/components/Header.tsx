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
      <header className="bg-background border-b border-border relative z-50">
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
        <div className="fixed inset-0 bg-white z-50 lg:hidden">
          <div className="flex flex-col h-full">
            {/* Header du menu mobile */}
            <div className="flex items-center justify-between px-5 pt-5 pb-3">
              {/* Logo */}
              <Link 
                to="/" 
                className="flex items-center" 
                onClick={toggleMobileMenu}
              >
                <img src={logo} alt="AMI Immobilier" className="h-14 w-auto" />
              </Link>
              <button
                onClick={toggleMobileMenu}
                className="text-primary hover:text-primary/80 transition-colors duration-200 p-1.5"
                aria-label="Fermer le menu"
              >
                <X className="w-7 h-7" />
              </button>
            </div>

            {/* Titre AMI Immo */}
            <div className="px-5 pb-4">
              <h2 className="text-primary text-2xl font-bold font-heading tracking-tight">
                AMI Immo
              </h2>
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