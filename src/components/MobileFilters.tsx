import { useState } from 'react';
import { X, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLocalities } from '@/hooks/useLocalities';

interface MobileFiltersProps {
  onFiltersChange?: (filters: any) => void;
}

const initialFilters = {
  promo: false,
  status: {
    available: false,
    sold: false,
    rented: false,
    reserved: false
  },
  typology: {
    appartement: false,
    maison: false,
    villa: false,
    studio: false,
    terrain: false,
    duplex: false,
    penthouse: false
  },
  price: {
    min: '',
    max: ''
  },
  locality_id: '',
  condition: '',
  caracteristiques: {
    bedrooms: 0,
    bathrooms: 0,
    rooms: 0,
    floors: 0
  },
  surface: {
    min: '',
    max: ''
  },
  commodites: {
    piscine: false,
    garage: false,
    jardin: false,
    terrasse: false,
    balcon: false,
    cave: false,
    buanderie: false,
    grenier: false
  },
  securite: {
    alarme: false,
    interphone: false,
    digicode: false,
    video_surveillance: false,
    acces_handicape: false,
    gardien: false,
    ascenseur: false,
    portail_electrique: false
  },
  documents: {
    livret_foncier: false,
    acte_propriete: false,
    titre_propriete: false,
    contrat_location: false,
    certification_possession: false,
    certificat_inscription_fonciere: false,
    fiche_fiscale: false,
    documents_cadastraux: false,
    plans_cadastraux: false,
    certificat_urbanisme: false,
    permis_construire: false,
    certification_conformite: false,
    promesse_vente: false,
    mainlevee: false,
    permis_exploitation: false,
    certificat_non_negativite: false
  },
  proximite: {
    ecoles: false,
    commerces: false,
    hopitaux: false,
    transports_publics: false,
    aeroports: false,
    restaurants: false,
    universites: false,
    banques: false,
    mosquees: false,
    pharmacies: false,
    plages: false,
    parcs: false
  },
  vue: {
    vue_mer: false,
    vue_ville: false,
    vue_montagne: false,
    vue_jardin: false,
    vue_cour: false,
    vue_degagee: false
  }
};

export const MobileFilters = ({ onFiltersChange }: MobileFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('principaux');
  const [filters, setFilters] = useState(initialFilters);
  const { localities, loading: localitiesLoading } = useLocalities();

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
    setFilters(initialFilters);
  };

  const applyFilters = () => {
    onFiltersChange?.(filters);
    setIsOpen(false);
  };

  const NumberSelector = ({ value, onChange, max = 6 }: { value: number; onChange: (val: number) => void; max?: number }) => (
    <div className="flex space-x-1">
      {Array.from({ length: max + 1 }, (_, i) => (
        <Button
          key={i}
          variant={value === i ? "default" : "outline"}
          size="sm"
          className={`w-10 h-10 ${
            value === i 
              ? "bg-primary text-primary-foreground" 
              : "bg-background border-border hover:bg-muted"
          }`}
          onClick={() => onChange(i)}
        >
          {i === max ? `+${i}` : i}
        </Button>
      ))}
    </div>
  );

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

                  {/* Statut */}
                  <div className="space-y-3">
                    <h3 className="text-base font-medium">Statut</h3>
                    <div className="space-y-2">
                      {[
                        { key: 'available', label: 'Disponible' },
                        { key: 'sold', label: 'Vendu' },
                        { key: 'rented', label: 'Loué' },
                        { key: 'reserved', label: 'Réservé' }
                      ].map((item) => (
                        <div key={item.key} className="flex items-center space-x-3">
                          <Checkbox
                            id={`status-${item.key}`}
                            checked={filters.status[item.key as keyof typeof filters.status]}
                            onCheckedChange={(checked) => 
                              handleFilterChange('status', item.key, checked)
                            }
                          />
                          <Label htmlFor={`status-${item.key}`} className="text-sm">
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
                        { key: 'terrain', label: 'Terrain' },
                        { key: 'duplex', label: 'Duplex' },
                        { key: 'penthouse', label: 'Penthouse' }
                      ].map((item) => (
                        <div key={item.key} className="flex items-center space-x-3">
                          <Checkbox
                            id={`typology-${item.key}`}
                            checked={filters.typology[item.key as keyof typeof filters.typology]}
                            onCheckedChange={(checked) => 
                              handleFilterChange('typology', item.key, checked)
                            }
                          />
                          <Label htmlFor={`typology-${item.key}`} className="text-sm">
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
                          type="number"
                          value={filters.price.min}
                          onChange={(e) => handleFilterChange('price', 'min', e.target.value)}
                          className="pr-12"
                        />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs">
                          DA
                        </div>
                      </div>
                      <div className="flex-1 relative">
                        <Input
                          placeholder="Max"
                          type="number"
                          value={filters.price.max}
                          onChange={(e) => handleFilterChange('price', 'max', e.target.value)}
                          className="pr-12"
                        />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs">
                          DA
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Localité */}
                  <div className="space-y-3">
                    <h3 className="text-base font-medium">Localité</h3>
                    <Select 
                      value={filters.locality_id} 
                      onValueChange={(value) => handleFilterChange('locality_id', undefined, value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une localité" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Toutes les localités</SelectItem>
                        {!localitiesLoading && localities.map((locality) => (
                          <SelectItem key={locality.id} value={locality.id.toString()}>
                            {locality.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* État */}
                  <div className="space-y-3">
                    <h3 className="text-base font-medium">État</h3>
                    <Select 
                      value={filters.condition} 
                      onValueChange={(value) => handleFilterChange('condition', undefined, value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner l'état" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Tous les états</SelectItem>
                        <SelectItem value="neuf">Neuf</SelectItem>
                        <SelectItem value="excellent">Excellent</SelectItem>
                        <SelectItem value="bon">Bon état</SelectItem>
                        <SelectItem value="moyen">État moyen</SelectItem>
                        <SelectItem value="renover">À rénover</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>

                <TabsContent value="avancees" className="space-y-6 mt-0">
                  {/* Caractéristiques */}
                  <div className="space-y-4">
                    <h3 className="text-base font-medium">Caractéristiques</h3>
                    
                    <div className="space-y-3">
                      <Label className="text-sm">Nombre de chambres</Label>
                      <NumberSelector
                        value={filters.caracteristiques.bedrooms}
                        onChange={(val) => handleFilterChange('caracteristiques', 'bedrooms', val)}
                      />
                    </div>

                    <div className="space-y-3">
                      <Label className="text-sm">Nombre de salles de bain</Label>
                      <NumberSelector
                        value={filters.caracteristiques.bathrooms}
                        onChange={(val) => handleFilterChange('caracteristiques', 'bathrooms', val)}
                      />
                    </div>

                    <div className="space-y-3">
                      <Label className="text-sm">Pièces</Label>
                      <NumberSelector
                        value={filters.caracteristiques.rooms}
                        onChange={(val) => handleFilterChange('caracteristiques', 'rooms', val)}
                      />
                    </div>

                    <div className="space-y-3">
                      <Label className="text-sm">Étages</Label>
                      <NumberSelector
                        value={filters.caracteristiques.floors}
                        onChange={(val) => handleFilterChange('caracteristiques', 'floors', val)}
                      />
                    </div>
                  </div>

                  {/* Surface du terrain */}
                  <div className="space-y-3">
                    <h3 className="text-base font-medium">Surface du terrain</h3>
                    <div className="flex space-x-2">
                      <div className="flex-1 relative">
                        <Input
                          placeholder="Min"
                          type="number"
                          value={filters.surface.min}
                          onChange={(e) => handleFilterChange('surface', 'min', e.target.value)}
                          className="pr-12"
                        />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs">
                          m²
                        </div>
                      </div>
                      <div className="flex-1 relative">
                        <Input
                          placeholder="Max"
                          type="number"
                          value={filters.surface.max}
                          onChange={(e) => handleFilterChange('surface', 'max', e.target.value)}
                          className="pr-12"
                        />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs">
                          m²
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Commodités */}
                  <div className="space-y-3">
                    <h3 className="text-base font-medium">Commodités</h3>
                    <div className="space-y-2">
                      {[
                        { key: 'piscine', label: 'Piscine' },
                        { key: 'garage', label: 'Garage' },
                        { key: 'jardin', label: 'Jardin' },
                        { key: 'terrasse', label: 'Terrasse' },
                        { key: 'balcon', label: 'Balcon' },
                        { key: 'cave', label: 'Cave' },
                        { key: 'buanderie', label: 'Buanderie' },
                        { key: 'grenier', label: 'Grenier' }
                      ].map((item) => (
                        <div key={item.key} className="flex items-center space-x-3">
                          <Checkbox
                            id={`commodites-${item.key}`}
                            checked={filters.commodites[item.key as keyof typeof filters.commodites]}
                            onCheckedChange={(checked) => 
                              handleFilterChange('commodites', item.key, checked)
                            }
                          />
                          <Label htmlFor={`commodites-${item.key}`} className="text-sm">
                            {item.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Sécurité & Accessibilité */}
                  <div className="space-y-3">
                    <h3 className="text-base font-medium">Sécurité & Accessibilité</h3>
                    <div className="space-y-2">
                      {[
                        { key: 'alarme', label: 'Alarme' },
                        { key: 'interphone', label: 'Interphone' },
                        { key: 'digicode', label: 'Digicode' },
                        { key: 'video_surveillance', label: 'Vidéo surveillance' },
                        { key: 'acces_handicape', label: 'Accès handicapé' },
                        { key: 'gardien', label: 'Gardien' },
                        { key: 'ascenseur', label: 'Ascenseur' },
                        { key: 'portail_electrique', label: 'Portail électrique' }
                      ].map((item) => (
                        <div key={item.key} className="flex items-center space-x-3">
                          <Checkbox
                            id={`securite-${item.key}`}
                            checked={filters.securite[item.key as keyof typeof filters.securite]}
                            onCheckedChange={(checked) => 
                              handleFilterChange('securite', item.key, checked)
                            }
                          />
                          <Label htmlFor={`securite-${item.key}`} className="text-sm">
                            {item.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Documents de propriété */}
                  <div className="space-y-3">
                    <h3 className="text-base font-medium">Documents de propriété</h3>
                    <div className="space-y-2">
                      {[
                        { key: 'livret_foncier', label: 'Livret foncier' },
                        { key: 'acte_propriete', label: 'Acte de propriété' },
                        { key: 'titre_propriete', label: 'Titre de propriété' }
                      ].map((item) => (
                        <div key={item.key} className="flex items-center space-x-3">
                          <Checkbox
                            id={`documents-${item.key}`}
                            checked={filters.documents[item.key as keyof typeof filters.documents]}
                            onCheckedChange={(checked) => 
                              handleFilterChange('documents', item.key, checked)
                            }
                          />
                          <Label htmlFor={`documents-${item.key}`} className="text-sm">
                            {item.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Proximité */}
                  <div className="space-y-3">
                    <h3 className="text-base font-medium">Proximité</h3>
                    <div className="space-y-2">
                      {[
                        { key: 'ecoles', label: 'Écoles' },
                        { key: 'commerces', label: 'Commerces' },
                        { key: 'hopitaux', label: 'Hôpitaux' },
                        { key: 'transports_publics', label: 'Transports en commun' },
                        { key: 'aeroports', label: 'Accès autoroute' }
                      ].map((item) => (
                        <div key={item.key} className="flex items-center space-x-3">
                          <Checkbox
                            id={`proximite-${item.key}`}
                            checked={filters.proximite[item.key as keyof typeof filters.proximite]}
                            onCheckedChange={(checked) => 
                              handleFilterChange('proximite', item.key, checked)
                            }
                          />
                          <Label htmlFor={`proximite-${item.key}`} className="text-sm">
                            {item.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Vue */}
                  <div className="space-y-3">
                    <h3 className="text-base font-medium">Vue</h3>
                    <div className="space-y-2">
                      {[
                        { key: 'vue_mer', label: 'Vue sur la mer' },
                        { key: 'vue_montagne', label: 'Vue montagne' },
                        { key: 'vue_ville', label: 'Vue sur la ville' },
                        { key: 'vue_degagee', label: 'Vue dégagée' }
                      ].map((item) => (
                        <div key={item.key} className="flex items-center space-x-3">
                          <Checkbox
                            id={`vue-${item.key}`}
                            checked={filters.vue[item.key as keyof typeof filters.vue]}
                            onCheckedChange={(checked) => 
                              handleFilterChange('vue', item.key, checked)
                            }
                          />
                          <Label htmlFor={`vue-${item.key}`} className="text-sm">
                            {item.label}
                          </Label>
                        </div>
                      ))}
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