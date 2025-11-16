import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import { MobileFilters } from "./MobileFilters";
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

  const centerNavItems = [
    { path: "/nos-biens", label: "Nos biens", hasDropdown: false },
    { path: "/vendre", label: "Vendre", hasDropdown: false },
    { path: "/localites", label: "Localités", hasDropdown: false },
  ];

  const rightNavItems = [
    { path: "/crm", label: "CRM", hasDropdown: false },
    { path: "/favoris", label: "Favoris", hasDropdown: false },
    { path: "/contact", label: "Contact", hasDropdown: true },
  ];

  const allNavItems = [...leftNavItems, ...centerNavItems, ...rightNavItems];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header className="bg-background border-b border-border relative z-50">
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
              <div className="flex items-center lg:hidden">
                <MobileFilters />
                <span className="ml-2 text-sm text-muted-foreground font-heading">Filtres</span>
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
      </header>

      {/* Menu mobile overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-slate-900 z-50 lg:hidden">
          <div className="flex flex-col h-full">
            {/* Header du menu mobile */}
            <div className="flex items-center justify-between p-4 border-b border-slate-700">
              <Link to="/" className="flex items-center" onClick={toggleMobileMenu}>
                <img src={logo} alt="AMI Immobilier" className="h-10 w-auto" />
              </Link>
              <button
                onClick={toggleMobileMenu}
                className="text-slate-300 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation mobile */}
            <nav className="flex-1 p-4">
              <ul className="space-y-6">
                {allNavItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={toggleMobileMenu}
                      className={cn(
                        "flex items-center justify-between text-lg font-medium transition-colors font-heading",
                        location.pathname === item.path
                          ? "text-primary"
                          : "text-white hover:text-primary"
                      )}
                    >
                      <span>{item.label}</span>
                      {item.hasDropdown && <ChevronDown className="w-5 h-5" />}
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