import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Property } from "@/types/property";
import { calculatePropertyHealth } from "@/utils/dataQualityUtils";
import { differenceInDays, format } from "date-fns";
import { fr } from "date-fns/locale";
import { AlertTriangle, Clock, FileWarning, Copy, ArrowRight, CheckCircle2 } from "lucide-react";
import { useState } from "react";

interface AlertsPanelProps {
   properties: Property[];
   communes: Array<{ id: number, name: string }>;
   onEdit: (property: Property) => void;
}

export const AlertsPanel = ({ properties, communes, onEdit }: AlertsPanelProps) => {
   const [activeCategory, setActiveCategory] = useState<'stale' | 'incomplete' | 'duplicate' | 'all'>('all');

   // 1. Détection des biens inactifs (Stale)
   // Pas de mise à jour depuis 30 jours et pas vendu
   const staleProperties = properties.filter(p => {
      if (p.status === 'Vendu') return false;
      const daysSinceUpdate = differenceInDays(new Date(), new Date(p.updated_at));
      return daysSinceUpdate > 30;
   });

   // 2. Détection des fiches incomplètes
   // Score < 60%
   const incompleteProperties = properties.filter(p => {
      const health = calculatePropertyHealth(p);
      return health.score < 60;
   });

   // 3. Détection des doublons potentiels
   // Même titre ou (même prix + même surface + même commune)
   const duplicateGroups: Property[][] = [];
   const processedIds = new Set<string>();

   properties.forEach((p1) => {
      if (processedIds.has(p1.id)) return;

      const duplicates = properties.filter(p2 => {
         if (p1.id === p2.id) return false;

         // Critère 1: Titre très similaire (exact match pour l'instant pour simplifier)
         const titleMatch = p1.title.toLowerCase().trim() === p2.title.toLowerCase().trim();

         // Critère 2: Même commune + surface + prix
         const specsMatch = p1.commune_id === p2.commune_id &&
            p1.surface === p2.surface &&
            p1.price === p2.price;

         return titleMatch || specsMatch;
      });

      if (duplicates.length > 0) {
         const group = [p1, ...duplicates];
         duplicateGroups.push(group);
         group.forEach(g => processedIds.add(g.id));
      }
   });

   const totalAlerts = staleProperties.length + incompleteProperties.length + duplicateGroups.length;

   const getCommuneName = (id: number | null) => {
      if (!id) return "Inconnue";
      return communes.find(c => c.id === id)?.name || "Inconnue";
   };

   return (
      <div className="space-y-6 animate-in fade-in duration-500">
         {/* Summary Cards */}
         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card
               className={`cursor-pointer transition-all hover:shadow-md ${activeCategory === 'all' ? 'border-primary ring-1 ring-primary' : ''}`}
               onClick={() => setActiveCategory('all')}
            >
               <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Alertes</CardTitle>
               </CardHeader>
               <CardContent>
                  <div className="text-2xl font-bold">{totalAlerts}</div>
                  <p className="text-xs text-muted-foreground">Nécessitent attention</p>
               </CardContent>
            </Card>

            <Card
               className={`cursor-pointer transition-all hover:shadow-md ${activeCategory === 'stale' ? 'border-orange-500 ring-1 ring-orange-500' : ''}`}
               onClick={() => setActiveCategory('stale')}
            >
               <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Biens Inactifs</CardTitle>
                  <Clock className="h-4 w-4 text-orange-500" />
               </CardHeader>
               <CardContent>
                  <div className="text-2xl font-bold text-orange-600">{staleProperties.length}</div>
                  <p className="text-xs text-muted-foreground">+30 jours sans maj</p>
               </CardContent>
            </Card>

            <Card
               className={`cursor-pointer transition-all hover:shadow-md ${activeCategory === 'incomplete' ? 'border-red-500 ring-1 ring-red-500' : ''}`}
               onClick={() => setActiveCategory('incomplete')}
            >
               <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Fiches Incomplètes</CardTitle>
                  <FileWarning className="h-4 w-4 text-red-500" />
               </CardHeader>
               <CardContent>
                  <div className="text-2xl font-bold text-red-600">{incompleteProperties.length}</div>
                  <p className="text-xs text-muted-foreground">Score qualité &lt; 60%</p>
               </CardContent>
            </Card>

            <Card
               className={`cursor-pointer transition-all hover:shadow-md ${activeCategory === 'duplicate' ? 'border-blue-500 ring-1 ring-blue-500' : ''}`}
               onClick={() => setActiveCategory('duplicate')}
            >
               <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Doublons Possibles</CardTitle>
                  <Copy className="h-4 w-4 text-blue-500" />
               </CardHeader>
               <CardContent>
                  <div className="text-2xl font-bold text-blue-600">{duplicateGroups.length}</div>
                  <p className="text-xs text-muted-foreground">Groupes identifiés</p>
               </CardContent>
            </Card>
         </div>

         {/* Alert Lists */}
         <div className="grid gap-6">
            {/* Stale Properties List */}
            {(activeCategory === 'all' || activeCategory === 'stale') && staleProperties.length > 0 && (
               <Card className="border-orange-200 bg-orange-50/30">
                  <CardHeader>
                     <CardTitle className="flex items-center gap-2 text-orange-800">
                        <Clock className="h-5 w-5" />
                        Biens Inactifs ({staleProperties.length})
                     </CardTitle>
                     <CardDescription>Ces biens n'ont pas été mis à jour depuis plus de 30 jours</CardDescription>
                  </CardHeader>
                  <CardContent>
                     <ScrollArea className="h-[300px] pr-4">
                        <div className="space-y-4">
                           {staleProperties.map(property => {
                              const days = differenceInDays(new Date(), new Date(property.updated_at));
                              return (
                                 <div key={property.id} className="flex items-center justify-between p-4 bg-white rounded-lg border shadow-sm">
                                    <div>
                                       <h4 className="font-medium">{property.title}</h4>
                                       <p className="text-sm text-muted-foreground">
                                          {getCommuneName(property.commune_id)} • Modifié le {format(new Date(property.updated_at), "dd MMM yyyy", { locale: fr })}
                                       </p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                       <Badge variant="outline" className="text-orange-600 border-orange-200 bg-orange-50">
                                          {days} jours
                                       </Badge>
                                       <Button size="sm" variant="ghost" onClick={() => onEdit(property)}>
                                          <ArrowRight className="h-4 w-4" />
                                       </Button>
                                    </div>
                                 </div>
                              );
                           })}
                        </div>
                     </ScrollArea>
                  </CardContent>
               </Card>
            )}

            {/* Incomplete Properties List */}
            {(activeCategory === 'all' || activeCategory === 'incomplete') && incompleteProperties.length > 0 && (
               <Card className="border-red-200 bg-red-50/30">
                  <CardHeader>
                     <CardTitle className="flex items-center gap-2 text-red-800">
                        <FileWarning className="h-5 w-5" />
                        Fiches Incomplètes ({incompleteProperties.length})
                     </CardTitle>
                     <CardDescription>Améliorez la qualité de ces fiches pour une meilleure visibilité</CardDescription>
                  </CardHeader>
                  <CardContent>
                     <ScrollArea className="h-[300px] pr-4">
                        <div className="space-y-4">
                           {incompleteProperties.map(property => {
                              const health = calculatePropertyHealth(property);
                              return (
                                 <div key={property.id} className="flex items-center justify-between p-4 bg-white rounded-lg border shadow-sm">
                                    <div>
                                       <h4 className="font-medium">{property.title}</h4>
                                       <div className="flex gap-2 mt-1">
                                          {health.warnings.slice(0, 2).map((w, i) => (
                                             <Badge key={i} variant="secondary" className="text-xs bg-red-100 text-red-700 hover:bg-red-200">
                                                {w}
                                             </Badge>
                                          ))}
                                          {health.warnings.length > 2 && (
                                             <Badge variant="secondary" className="text-xs">+{health.warnings.length - 2}</Badge>
                                          )}
                                       </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                       <div className="text-right">
                                          <span className="text-lg font-bold text-red-600">{health.score}%</span>
                                          <p className="text-xs text-muted-foreground">Score</p>
                                       </div>
                                       <Button size="sm" variant="ghost" onClick={() => onEdit(property)}>
                                          <ArrowRight className="h-4 w-4" />
                                       </Button>
                                    </div>
                                 </div>
                              );
                           })}
                        </div>
                     </ScrollArea>
                  </CardContent>
               </Card>
            )}

            {/* Duplicates List */}
            {(activeCategory === 'all' || activeCategory === 'duplicate') && duplicateGroups.length > 0 && (
               <Card className="border-blue-200 bg-blue-50/30">
                  <CardHeader>
                     <CardTitle className="flex items-center gap-2 text-blue-800">
                        <Copy className="h-5 w-5" />
                        Doublons Potentiels ({duplicateGroups.length})
                     </CardTitle>
                     <CardDescription>Groupes de biens similaires détectés</CardDescription>
                  </CardHeader>
                  <CardContent>
                     <ScrollArea className="h-[300px] pr-4">
                        <div className="space-y-6">
                           {duplicateGroups.map((group, idx) => (
                              <div key={idx} className="bg-white rounded-lg border shadow-sm p-4">
                                 <h4 className="text-sm font-medium text-muted-foreground mb-3">Groupe #{idx + 1}</h4>
                                 <div className="space-y-2">
                                    {group.map(property => (
                                       <div key={property.id} className="flex items-center justify-between p-2 bg-slate-50 rounded border">
                                          <div className="flex items-center gap-3">
                                             <div className="h-8 w-8 bg-slate-200 rounded flex items-center justify-center text-xs font-mono">
                                                {property.id.slice(0, 4)}
                                             </div>
                                             <div>
                                                <p className="font-medium text-sm">{property.title}</p>
                                                <p className="text-xs text-muted-foreground">
                                                   {property.surface}m² • {property.price?.toLocaleString()} DZD
                                                </p>
                                             </div>
                                          </div>
                                          <Button size="sm" variant="ghost" onClick={() => onEdit(property)}>
                                             <ArrowRight className="h-4 w-4" />
                                          </Button>
                                       </div>
                                    ))}
                                 </div>
                              </div>
                           ))}
                        </div>
                     </ScrollArea>
                  </CardContent>
               </Card>
            )}

            {totalAlerts === 0 && (
               <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                     <CheckCircle2 className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-green-800">Tout est parfait !</h3>
                  <p className="text-muted-foreground max-w-md mt-2">
                     Aucune alerte détectée. Vos données sont à jour, complètes et sans doublons.
                  </p>
               </div>
            )}
         </div>
      </div>
   );
};
