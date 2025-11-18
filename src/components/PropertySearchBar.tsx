import { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { usePropertySearch } from '@/hooks/usePropertySearch';
import { cn } from '@/lib/utils';

interface PropertySearchBarProps {
  className?: string;
  onSearch?: (query: string) => void;
}

const PropertySearchBar = ({ className, onSearch }: PropertySearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { searchProperties, loading } = usePropertySearch();
  const inputRef = useRef<HTMLInputElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Récupérer la recherche depuis l'URL au chargement
  useEffect(() => {
    const queryParam = searchParams.get('q');
    if (queryParam) {
      setSearchQuery(queryParam);
    }
  }, [searchParams]);

  const handleSearch = (query: string) => {
    // Nettoyer le timeout précédent
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    setSearchQuery(query);

    // Si la recherche est vide, rediriger vers nos-biens sans paramètre q
    if (!query.trim()) {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete('q');
      navigate(`/nos-biens?${newParams.toString()}`);
      onSearch?.('');
      return;
    }

    // Debounce: attendre 500ms avant de lancer la recherche
    searchTimeoutRef.current = setTimeout(() => {
      const newParams = new URLSearchParams(searchParams);
      newParams.set('q', query.trim());
      navigate(`/nos-biens?${newParams.toString()}`);
      onSearch?.(query.trim());
    }, 500);
  };

  const handleClear = () => {
    setSearchQuery('');
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('q');
    navigate(`/nos-biens?${newParams.toString()}`);
    onSearch?.('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      // Nettoyer le timeout pour exécuter immédiatement
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
      const query = searchQuery.trim();
      if (query) {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('q', query);
        navigate(`/nos-biens?${newParams.toString()}`);
        onSearch?.(query);
      }
    }
  };

  // Nettoyer le timeout au démontage
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className={cn('relative flex-1 max-w-2xl', className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-accent/80" />
        <Input
          ref={inputRef}
          type="text"
          placeholder="Rechercher"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            'pl-10 pr-10 h-12 rounded-full border-2 bg-primary/90 text-white placeholder:text-white/60',
            isFocused
              ? 'border-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:border-accent'
              : 'border-accent/50'
          )}
        />
        {searchQuery && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors"
            aria-label="Effacer la recherche"
          >
            <X className="h-5 w-5" />
          </button>
        )}
        {loading && searchQuery && (
          <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-accent"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertySearchBar;

