import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

const Header = () => {
  const location = useLocation();

  const leftNavItems = [
    { path: "/", label: "Accueil" },
    { path: "/projets", label: "Projets" },
    { path: "/locaux", label: "Locaux" },
    { path: "/services", label: "Services", hasDropdown: true },
    { path: "/a-propos", label: "À propos" },
  ];

  const rightNavItems = [
    { path: "/localites", label: "Localités" },
    { path: "/carrieres", label: "Carrière" },
    { path: "/blog", label: "Blog", hasDropdown: true },
    { path: "/contact", label: "Contact", hasDropdown: true },
  ];

  return (
    <header className="bg-background border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Navigation gauche */}
          <nav className="hidden lg:flex items-center space-x-8">
            {leftNavItems.map((item) => (
              <div key={item.path} className="relative group">
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary",
                    location.pathname === item.path
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  {item.label}
                  {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
                </Link>
              </div>
            ))}
          </nav>

          {/* Logo central */}
          <Link to="/" className="flex items-center">
            <div className="bg-primary text-primary-foreground px-3 py-1 rounded">
              <span className="text-lg font-bold">aymen</span>
            </div>
            <span className="ml-2 text-sm text-muted-foreground">Promotion</span>
          </Link>

          {/* Navigation droite */}
          <nav className="hidden lg:flex items-center space-x-8">
            {rightNavItems.map((item) => (
              <div key={item.path} className="relative group">
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary",
                    location.pathname === item.path
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  {item.label}
                  {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
                </Link>
              </div>
            ))}
          </nav>

          {/* Menu mobile */}
          <div className="lg:hidden">
            <button className="text-muted-foreground hover:text-primary">
              Menu
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;