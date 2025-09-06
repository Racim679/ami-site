import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const ModernHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = {
    left: [
      { name: "Nos Biens", path: "/nos-biens" },
      { name: "Localités", path: "/localites" },
    ],
    center: [
      { name: "Accueil", path: "/" },
    ],
    right: [
      { name: "Services", path: "/services" },
      { name: "À Propos", path: "/a-propos" },
      { name: "Contact", path: "/contact" },
    ],
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-secondary to-secondary-light text-secondary-foreground py-2 px-4 hidden md:block">
        <div className="container mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>+213 XXX XXX XXX</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>contact@promoteur.dz</span>
            </div>
          </div>
          <div className="text-xs opacity-80">
            Votre partenaire immobilier de confiance
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-border shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            
            {/* Left Navigation - Desktop */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigationItems.left.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-foreground hover:text-primary font-heading font-medium text-lg transition-all duration-300 relative group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </nav>

            {/* Logo - Center */}
            <div className="flex-1 lg:flex-none text-center lg:text-left">
              <Link
                to="/"
                className="inline-block text-3xl lg:text-4xl font-black font-heading gradient-text hover:scale-105 transition-transform duration-300"
              >
                PROMOTEUR
              </Link>
            </div>

            {/* Right Navigation - Desktop */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigationItems.right.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-foreground hover:text-primary font-heading font-medium text-lg transition-all duration-300 relative group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
              <Button variant="luxury" size="lg" className="ml-4">
                Demander un Devis
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden h-12 w-12"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg border-b shadow-xl">
            <div className="container mx-auto px-4 py-8">
              <nav className="space-y-6">
                {[...navigationItems.left, ...navigationItems.center, ...navigationItems.right].map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="block text-2xl font-heading font-medium text-foreground hover:text-primary transition-colors duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-6 border-t border-border">
                  <Button variant="luxury" size="lg" className="w-full">
                    Demander un Devis
                  </Button>
                </div>
              </nav>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default ModernHeader;