import { useState } from 'react';
import { X, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface MobileFiltersProps {
  onFiltersChange?: (filters: any) => void;
}

export const MobileFilters = ({ onFiltersChange }: MobileFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('principaux');
  const [filters, setFilters] = useState({
    promo: false,
    typeOffre: {
      aVendre: false,
      vendu: false,
      aLouer: false,
      loue: false
    },
    type: {
      appartement: false,
      maison: false,
      villa: false,
      studio: false,
      terrain: false
    },
    prix: {
      min: '',
      max: '',
      currency: 'm'
    },
    etat: {
      neuf: false,
      renove: false,
      bonEtat: false,
      aRenover: false,
      aDemolir: false
    },
    terrain: {
      min: '',
      max: ''
    }
  });

  const handleFilterChange = (category: string, key?: string, value?: any) => {
    if (key) {
      setFilters(prev => ({
        ...prev,
        [category]: {
          ...(prev[category as keyof typeof prev] as Record<string, any>),
          [key]: value
        }
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        [category]: value
      }));
    }
  };

  const resetFilters = () => {
    setFilters({
      promo: false,
      typeOffre: {
        aVendre: false,
        vendu: false,
        aLouer: false,
        loue: false
      },
      type: {
        appartement: false,
        maison: false,
        villa: false,
        studio: false,
        terrain: false
      },
      prix: {
        min: '',
        max: '',
        currency: 'm'
      },
      etat: {
        neuf: false,
        renove: false,
        bonEtat: false,
        aRenover: false,
        aDemolir: false
      },
      terrain: {
        min: '',
        max: ''
      }
    });
  };

  const applyFilters = () => {
    onFiltersChange?.(filters);
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="lg:hidden relative"
        >
          <SlidersHorizontal className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      
      <SheetContent side="bottom" className="h-[85vh] p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <SheetHeader className="px-6 py-4 border-b">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-xl font-semibold">Filtres</SheetTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </SheetHeader>

          {/* Tabs */}
          <div className="flex-1 overflow-hidden">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
              <TabsList className="w-full mx-4 my-4 grid grid-cols-2">
                <TabsTrigger 
                  value="principaux" 
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Principaux
                </TabsTrigger>
                <TabsTrigger 
                  value="avancees"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Avancées
                </TabsTrigger>
              </TabsList>

              <div className="flex-1 overflow-y-auto px-6">
                <TabsContent value="principaux" className="space-y-6 mt-0">
                  {/* Toggle Promo */}
                  <div className="flex items-center justify-between">
                    <Label htmlFor="promo" className="text-base font-medium">Promo</Label>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="promo"
                        checked={filters.promo}
                        onCheckedChange={(checked) => handleFilterChange('promo', undefined, checked)}
                      />
                    </div>
                  </div>

                  {/* Type d'offre */}
                  <div className="space-y-3">
                    <h3 className="text-base font-medium">Type d'offre</h3>
                    <div className="space-y-2">
                      {[
                        { key: 'aVendre', label: 'À vendre' },
                        { key: 'vendu', label: 'Vendu' },
                        { key: 'aLouer', label: 'À louer' },
                        { key: 'loue', label: 'Loué' }
                      ].map((item) => (
                        <div key={item.key} className="flex items-center space-x-3">
                          <Checkbox
                            id={`typeOffre-${item.key}`}
                            checked={filters.typeOffre[item.key as keyof typeof filters.typeOffre]}
                            onCheckedChange={(checked) => 
                              handleFilterChange('typeOffre', item.key, checked)
                            }
                          />
                          <Label htmlFor={`typeOffre-${item.key}`} className="text-sm">
                            {item.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Type */}
                  <div className="space-y-3">
                    <h3 className="text-base font-medium">Type</h3>
                    <div className="space-y-2">
                      {[
                        { key: 'appartement', label: 'Appartement' },
                        { key: 'maison', label: 'Maison' },
                        { key: 'villa', label: 'Villa' },
                        { key: 'studio', label: 'Studio' },
                        { key: 'terrain', label: 'Terrain' }
                      ].map((item) => (
                        <div key={item.key} className="flex items-center space-x-3">
                          <Checkbox
                            id={`type-${item.key}`}
                            checked={filters.type[item.key as keyof typeof filters.type]}
                            onCheckedChange={(checked) => 
                              handleFilterChange('type', item.key, checked)
                            }
                          />
                          <Label htmlFor={`type-${item.key}`} className="text-sm">
                            {item.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Prix */}
                  <div className="space-y-3">
                    <h3 className="text-base font-medium">Prix</h3>
                    <div className="flex space-x-2">
                      <div className="flex-1 relative">
                        <Input
                          placeholder="Min"
                          value={filters.prix.min}
                          onChange={(e) => handleFilterChange('prix', 'min', e.target.value)}
                          className="pr-12"
                        />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs">
                          {filters.prix.currency}
                        </div>
                      </div>
                      <div className="flex-1 relative">
                        <Input
                          placeholder="Max"
                          value={filters.prix.max}
                          onChange={(e) => handleFilterChange('prix', 'max', e.target.value)}
                          className="pr-12"
                        />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs">
                          {filters.prix.currency}
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="avancees" className="space-y-6 mt-0">
                  {/* État */}
                  <div className="space-y-3">
                    <h3 className="text-base font-medium">État</h3>
                    <div className="space-y-2">
                      {[
                        { key: 'neuf', label: 'Neuf' },
                        { key: 'renove', label: 'Rénové' },
                        { key: 'bonEtat', label: 'Bon état' },
                        { key: 'aRenover', label: 'À rénover' },
                        { key: 'aDemolir', label: 'À démolir' }
                      ].map((item) => (
                        <div key={item.key} className="flex items-center space-x-3">
                          <Checkbox
                            id={`etat-${item.key}`}
                            checked={filters.etat[item.key as keyof typeof filters.etat]}
                            onCheckedChange={(checked) => 
                              handleFilterChange('etat', item.key, checked)
                            }
                          />
                          <Label htmlFor={`etat-${item.key}`} className="text-sm">
                            {item.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Terrain */}
                  <div className="space-y-3">
                    <h3 className="text-base font-medium">Terrain</h3>
                    <div className="flex space-x-2">
                      <div className="flex-1 relative">
                        <Input
                          placeholder="Min"
                          value={filters.terrain.min}
                          onChange={(e) => handleFilterChange('terrain', 'min', e.target.value)}
                          className="pr-12"
                        />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs">
                          m²
                        </div>
                      </div>
                      <div className="flex-1 relative">
                        <Input
                          placeholder="Max"
                          value={filters.terrain.max}
                          onChange={(e) => handleFilterChange('terrain', 'max', e.target.value)}
                          className="pr-12"
                        />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs">
                          m²
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Voir tout */}
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={resetFilters}
                  >
                    Voir tout
                  </Button>
                </TabsContent>
              </div>
            </Tabs>
          </div>

          {/* Footer Actions */}
          <div className="border-t p-4 space-y-3">
            <Button 
              onClick={applyFilters}
              className="w-full bg-primary hover:bg-primary/90"
            >
              Appliquer les filtres
            </Button>
            <Button 
              variant="outline" 
              onClick={resetFilters}
              className="w-full"
            >
              Réinitialiser
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};