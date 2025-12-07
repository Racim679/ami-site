import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, TrendingUp, DollarSign, Activity, AlertTriangle, Calendar } from "lucide-react";
import { Property } from "@/types/property";
import { calculatePropertyHealth } from "@/utils/dataQualityUtils";
import { differenceInDays, subMonths, isSameMonth } from "date-fns";

interface DashboardStatsProps {
   properties: Property[];
}

export const DashboardStats = ({ properties }: DashboardStatsProps) => {
   // 1. Total Biens
   const totalProperties = properties.length;

   // 2. Ventes du Mois (Basé sur updated_at et status = Vendu)
   const currentMonth = new Date().getMonth();
   const currentYear = new Date().getFullYear();

   const salesThisMonth = properties.filter(p => {
      if (p.status !== 'Vendu') return false;
      const date = new Date(p.updated_at);
      return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
   }).length;

   // 3. Valeur du Portefeuille (Somme des prix des biens À Vendre)
   const portfolioValue = properties
      .filter(p => p.status === 'À Vendre' && p.price)
      .reduce((sum, p) => sum + (p.price || 0), 0);

   // 4. Santé des Données (% de fiches complètes)
   const completeProperties = properties.filter(p => {
      return calculatePropertyHealth(p).isComplete;
   }).length;

   const healthScore = totalProperties > 0
      ? Math.round((completeProperties / totalProperties) * 100)
      : 0;

   // 5. Prix moyen au m² (Global)
   const propertiesWithPriceAndSurface = properties.filter(p => p.price && p.surface && p.price > 0 && p.surface > 0);
   const avgPricePerM2 = propertiesWithPriceAndSurface.length > 0
      ? propertiesWithPriceAndSurface.reduce((sum, p) => sum + (p.price! / p.surface!), 0) / propertiesWithPriceAndSurface.length
      : 0;

   // 6. Alertes Actives
   const staleCount = properties.filter(p => p.status !== 'Vendu' && differenceInDays(new Date(), new Date(p.updated_at)) > 30).length;
   const incompleteCount = properties.filter(p => calculatePropertyHealth(p).score < 60).length;
   const totalAlerts = staleCount + incompleteCount;

   // 7. Nouveaux biens ce mois-ci
   const newListingsThisMonth = properties.filter(p => {
      const date = new Date(p.created_at);
      return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
   }).length;

   // 8. Croissance vs mois dernier (Ventes)
   const lastMonthDate = subMonths(new Date(), 1);
   const salesLastMonth = properties.filter(p => {
      if (p.status !== 'Vendu') return false;
      const date = new Date(p.updated_at);
      return isSameMonth(date, lastMonthDate);
   }).length;

   const salesGrowth = salesLastMonth > 0
      ? ((salesThisMonth - salesLastMonth) / salesLastMonth) * 100
      : salesThisMonth > 0 ? 100 : 0;

   const formatCurrency = (value: number) => {
      if (value >= 1000000000) return `${(value / 1000000000).toFixed(1)} Md`;
      if (value >= 1000000) return `${(value / 1000000).toFixed(1)} M`;
      if (value >= 1000) return `${(value / 1000).toFixed(1)} k`;
      return value.toString();
   };

   return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
         <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
               <CardTitle className="text-sm font-medium">Total Biens</CardTitle>
               <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
               <div className="text-2xl font-bold">{totalProperties}</div>
               <p className="text-xs text-muted-foreground">
                  +{newListingsThisMonth} ce mois-ci
               </p>
            </CardContent>
         </Card>

         <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
               <CardTitle className="text-sm font-medium">Ventes du Mois</CardTitle>
               <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
               <div className="text-2xl font-bold">{salesThisMonth}</div>
               <p className={`text-xs ${salesGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {salesGrowth > 0 ? '+' : ''}{Math.round(salesGrowth)}% vs mois dernier
               </p>
            </CardContent>
         </Card>

         <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
               <CardTitle className="text-sm font-medium">Valeur Portefeuille</CardTitle>
               <DollarSign className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
               <div className="text-2xl font-bold">{formatCurrency(portfolioValue)} DZD</div>
               <p className="text-xs text-muted-foreground">
                  ~{formatCurrency(avgPricePerM2)} DZD/m² moy.
               </p>
            </CardContent>
         </Card>

         <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
               <CardTitle className="text-sm font-medium">Santé & Alertes</CardTitle>
               <div className="flex gap-1">
                  <Activity className={`h-4 w-4 ${healthScore < 50 ? 'text-red-500' : 'text-green-500'}`} />
                  {totalAlerts > 0 && <AlertTriangle className="h-4 w-4 text-orange-500" />}
               </div>
            </CardHeader>
            <CardContent>
               <div className="text-2xl font-bold">{healthScore}%</div>
               <p className="text-xs text-muted-foreground">
                  {totalAlerts > 0 ? `${totalAlerts} alertes actives` : "Aucune alerte"}
               </p>
            </CardContent>
         </Card>
      </div>
   );
};
