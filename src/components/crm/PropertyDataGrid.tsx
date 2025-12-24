import { useState, useMemo } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Edit, Search, Filter, Trash2 } from "lucide-react";
import { calculatePropertyHealth, getHealthBadgeColor, generateQualityFlags } from "@/utils/dataQualityUtils";
import { Property } from "@/types/property";
import { QualityBadges } from "./QualityBadges";

interface Commune {
   id: number;
   name: string;
}

interface PropertyDataGridProps {
   properties: Property[];
   communes: Commune[];
   onEdit: (property: Property) => void;
   onDelete: (propertyId: string, propertyTitle: string) => void;
}

export const PropertyDataGrid = ({ properties, communes, onEdit, onDelete }: PropertyDataGridProps) => {
   const [searchQuery, setSearchQuery] = useState("");
   const [statusFilter, setStatusFilter] = useState<string>("all");
   const [communeFilter, setCommuneFilter] = useState<string>("all");
   const [showIncompleteOnly, setShowIncompleteOnly] = useState(false);
   const [sortBy, setSortBy] = useState<"date" | "price" | "surface">("date");
   const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

   const getCommuneLabel = (communeId: number | null) => {
      if (!communeId) return "Non spécifié";
      const commune = communes.find(c => c.id === communeId);
      return commune?.name || "Inconnu";
   };

   const getStatusLabel = (status: string) => {
      switch (status) {
         case "À Vendre": return "À Vendre";
         case "Vendu": return "Vendu";
         case "À louer": return "À louer";
         default: return status;
      }
   };

   // Filtrage et tri des biens
   const filteredAndSortedProperties = useMemo(() => {
      let filtered = properties;

      // Recherche textuelle
      if (searchQuery) {
         filtered = filtered.filter(p =>
            p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.id.toLowerCase().includes(searchQuery.toLowerCase())
         );
      }

      // Filtre par statut
      if (statusFilter !== "all") {
         filtered = filtered.filter(p => p.status === statusFilter);
      }

      // Filtre par commune
      if (communeFilter !== "all") {
         filtered = filtered.filter(p => p.commune_id?.toString() === communeFilter);
      }

      // Filtre fiches incomplètes
      if (showIncompleteOnly) {
         filtered = filtered.filter(p => {
            const health = calculatePropertyHealth(p);
            return !health.isComplete;
         });
      }

      // Tri
      const sorted = [...filtered].sort((a, b) => {
         let comparison = 0;

         switch (sortBy) {
            case "price":
               comparison = (a.price || 0) - (b.price || 0);
               break;
            case "surface":
               comparison = (a.surface || 0) - (b.surface || 0);
               break;
            case "date":
            default:
               comparison = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
               break;
         }

         return sortOrder === "asc" ? comparison : -comparison;
      });

      return sorted;
   }, [properties, searchQuery, statusFilter, communeFilter, showIncompleteOnly, sortBy, sortOrder]);

   const handleSort = (column: "date" | "price" | "surface") => {
      if (sortBy === column) {
         setSortOrder(sortOrder === "asc" ? "desc" : "asc");
      } else {
         setSortBy(column);
         setSortOrder("desc");
      }
   };

   return (
      <div className="space-y-4">
         {/* Barre de filtres */}
         <div className="flex flex-col md:flex-row gap-4">
            {/* Recherche */}
            <div className="flex-1 relative">
               <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
               <Input
                  placeholder="Rechercher par titre ou ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
               />
            </div>

            {/* Filtre Statut */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
               <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Statut" />
               </SelectTrigger>
               <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="À Vendre">À Vendre</SelectItem>
                  <SelectItem value="Vendu">Vendu</SelectItem>
                  <SelectItem value="À louer">À louer</SelectItem>
               </SelectContent>
            </Select>

            {/* Filtre Commune */}
            <Select value={communeFilter} onValueChange={setCommuneFilter}>
               <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Commune" />
               </SelectTrigger>
               <SelectContent>
                  <SelectItem value="all">Toutes les communes</SelectItem>
                  {communes.map((commune) => (
                     <SelectItem key={commune.id} value={commune.id.toString()}>
                        {commune.name}
                     </SelectItem>
                  ))}
               </SelectContent>
            </Select>

            {/* Toggle Fiches Incomplètes */}
            <Button
               variant={showIncompleteOnly ? "default" : "outline"}
               onClick={() => setShowIncompleteOnly(!showIncompleteOnly)}
               className="whitespace-nowrap"
            >
               <Filter className="h-4 w-4 mr-2" />
               Fiches incomplètes
            </Button>
         </div>

         {/* Résultats */}
         <div className="text-sm text-muted-foreground">
            {filteredAndSortedProperties.length} bien(s) trouvé(s)
         </div>

         {/* Tableau */}
         <div className="rounded-md border">
            <Table>
               <TableHeader>
                  <TableRow>
                     <TableHead>Santé</TableHead>
                     <TableHead>Titre</TableHead>
                     <TableHead>Type</TableHead>
                     <TableHead>Commune</TableHead>
                     <TableHead
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => handleSort("surface")}
                     >
                        Surface {sortBy === "surface" && (sortOrder === "asc" ? "↑" : "↓")}
                     </TableHead>
                     <TableHead
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => handleSort("price")}
                     >
                        Prix {sortBy === "price" && (sortOrder === "asc" ? "↑" : "↓")}
                     </TableHead>
                     <TableHead>WhatsApp</TableHead>
                     <TableHead>Statut</TableHead>
                     <TableHead>Actions</TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {filteredAndSortedProperties.length === 0 ? (
                     <TableRow>
                        <TableCell colSpan={9} className="text-center text-muted-foreground py-8">
                           Aucun bien trouvé
                        </TableCell>
                     </TableRow>
                  ) : (
                     filteredAndSortedProperties.map((property) => {
                        const health = calculatePropertyHealth(property);
                        return (
                           <TableRow key={property.id}>
                              <TableCell>
                                 <div className="flex flex-col gap-1">
                                    <Badge className={getHealthBadgeColor(health.score)}>
                                       {health.score}%
                                    </Badge>
                                    <QualityBadges flags={generateQualityFlags(property)} compact />
                                 </div>
                              </TableCell>
                              <TableCell className="font-medium">{property.title}</TableCell>
                              <TableCell>{property.typology || "Non spécifié"}</TableCell>
                              <TableCell>{getCommuneLabel(property.commune_id)}</TableCell>
                              <TableCell>{property.surface ? `${property.surface} m²` : "Non spécifié"}</TableCell>
                              <TableCell>
                                 {property.price
                                    ? `${property.price.toLocaleString()} DZD`
                                    : "Non spécifié"
                                 }
                              </TableCell>
                              <TableCell className="font-mono text-sm">
                                 {property.phone_whatsapp}
                              </TableCell>
                              <TableCell>
                                 <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${property.status === 'Vendu' ? 'bg-red-100 text-red-800' :
                                       property.status === 'À louer' ? 'bg-blue-100 text-blue-800' :
                                          'bg-green-100 text-green-800'}`}>
                                    {getStatusLabel(property.status)}
                                 </span>
                              </TableCell>
                              <TableCell>
                                 <div className="flex items-center gap-2">
                                    <Button
                                       variant="outline"
                                       size="sm"
                                       onClick={() => onEdit(property)}
                                       className="flex items-center gap-1"
                                    >
                                       <Edit className="h-3 w-3" />
                                       Modifier
                                    </Button>
                                    <Button
                                       variant="destructive"
                                       size="sm"
                                       onClick={() => onDelete(property.id, property.title)}
                                       className="flex items-center gap-1"
                                    >
                                       <Trash2 className="h-3 w-3" />
                                       Supprimer
                                    </Button>
                                 </div>
                              </TableCell>
                           </TableRow>
                        );
                     })
                  )}
               </TableBody>
            </Table>
         </div>
      </div>
   );
};
