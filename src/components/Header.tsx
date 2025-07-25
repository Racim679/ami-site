import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const Header = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Accueil" },
    { path: "/projets", label: "Projets" },
    { path: "/locaux", label: "Locaux" },
    { path: "/services", label: "Services" },
    { path: "/a-propos", label: "À propos" },
    { path: "/localites", label: "Localités" },
    { path: "/carrieres", label: "Carrières" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <header className="bg-background border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-primary">
            Promoteur Immobilier
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  location.pathname === item.path
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="md:hidden">
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