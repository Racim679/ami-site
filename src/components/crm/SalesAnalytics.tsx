import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Property } from "@/types/property";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, PieChart, Pie, Legend } from 'recharts';
import { format, subMonths, isSameMonth, parseISO, differenceInDays } from "date-fns";
import { fr } from "date-fns/locale";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, DollarSign, Calendar, Clock } from "lucide-react";

interface SalesAnalyticsProps {
   properties: Property[];
}

export const SalesAnalytics = ({ properties }: SalesAnalyticsProps) => {
   // 1. Préparation des données pour les graphiques
   const last12Months = Array.from({ length: 12 }, (_, i) => {
      const date = subMonths(new Date(), 11 - i);
      return {
         date,
         month: format(date, "MMM", { locale: fr }),
         fullMonth: format(date, "MMMM yyyy", { locale: fr }),
         sales: 0,
         revenue: 0,
         listings: 0
      };
   });

   // Remplissage des données
   properties.forEach(property => {
      const date = new Date(property.created_at); // Pour les ajouts
      const updateDate = new Date(property.updated_at); // Pour les ventes (approx)

      // Listings (Ajouts)
      const listingMonth = last12Months.find(m => isSameMonth(m.date, date));
      if (listingMonth) {
         listingMonth.listings += 1;
      }

      // Ventes
      if (property.status === 'Vendu') {
         const saleMonth = last12Months.find(m => isSameMonth(m.date, updateDate));
         if (saleMonth) {
            saleMonth.sales += 1;
            saleMonth.revenue += property.price || 0;
         }
      }
   });

   // 2. Pipeline Breakdown
   const pipelineData = [
      { name: 'À Vendre', value: properties.filter(p => p.status === 'À Vendre').length, color: '#3b82f6' },
      { name: 'Vendu', value: properties.filter(p => p.status === 'Vendu').length, color: '#22c55e' },
      { name: 'À Louer', value: properties.filter(p => p.status === 'À louer').length, color: '#f59e0b' },
   ].filter(d => d.value > 0);

   // 3. KPIs
   const soldProperties = properties.filter(p => p.status === 'Vendu');
   const totalRevenue = soldProperties.reduce((sum, p) => sum + (p.price || 0), 0);
   const avgSalePrice = soldProperties.length > 0 ? totalRevenue / soldProperties.length : 0;

   // Délai moyen de vente
   const avgDaysToSell = soldProperties.length > 0
      ? soldProperties.reduce((sum, p) => {
         const days = differenceInDays(new Date(p.updated_at), new Date(p.created_at));
         return sum + Math.max(0, days);
      }, 0) / soldProperties.length
      : 0;

   // Comparaison mois courant vs mois précédent
   const currentMonth = last12Months[11];
   const prevMonth = last12Months[10];

   const salesGrowth = prevMonth.sales > 0
      ? ((currentMonth.sales - prevMonth.sales) / prevMonth.sales) * 100
      : currentMonth.sales > 0 ? 100 : 0;

   const formatCurrency = (value: number) => {
      if (value >= 1000000) return `${(value / 1000000).toFixed(1)} M`;
      if (value >= 1000) return `${(value / 1000).toFixed(1)} k`;
      return value.toString();
   };

   return (
      <div className="space-y-6 animate-in fade-in duration-500">
         {/* KPIs Cards */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Revenus Totaux (12 mois)</CardTitle>
                  <DollarSign className="h-4 w-4 text-green-500" />
               </CardHeader>
               <CardContent>
                  <div className="text-2xl font-bold">{formatCurrency(totalRevenue)} DZD</div>
                  <p className="text-xs text-muted-foreground">
                     Sur {soldProperties.length} ventes
                  </p>
               </CardContent>
            </Card>

            <Card>
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Prix Moyen Vente</CardTitle>
                  <TrendingUp className="h-4 w-4 text-blue-500" />
               </CardHeader>
               <CardContent>
                  <div className="text-2xl font-bold">{formatCurrency(avgSalePrice)} DZD</div>
                  <p className="text-xs text-muted-foreground">
                     Par bien vendu
                  </p>
               </CardContent>
            </Card>

            <Card>
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Délai Moyen Vente</CardTitle>
                  <Clock className="h-4 w-4 text-orange-500" />
               </CardHeader>
               <CardContent>
                  <div className="text-2xl font-bold">{Math.round(avgDaysToSell)} jours</div>
                  <p className="text-xs text-muted-foreground">
                     Mise en ligne → Vente
                  </p>
               </CardContent>
            </Card>

            <Card>
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Croissance Ventes</CardTitle>
                  {salesGrowth >= 0 ? (
                     <TrendingUp className="h-4 w-4 text-green-500" />
                  ) : (
                     <TrendingDown className="h-4 w-4 text-red-500" />
                  )}
               </CardHeader>
               <CardContent>
                  <div className={`text-2xl font-bold ${salesGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                     {salesGrowth > 0 ? '+' : ''}{Math.round(salesGrowth)}%
                  </div>
                  <p className="text-xs text-muted-foreground">
                     Par rapport au mois dernier
                  </p>
               </CardContent>
            </Card>
         </div>

         {/* Charts Section */}
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sales Trend Chart */}
            <Card className="col-span-1">
               <CardHeader>
                  <CardTitle>Évolution des Ventes & Ajouts</CardTitle>
                  <CardDescription>Comparaison des nouveaux biens vs biens vendus</CardDescription>
               </CardHeader>
               <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                     <AreaChart data={last12Months}>
                        <defs>
                           <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                              <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                           </linearGradient>
                           <linearGradient id="colorListings" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                           </linearGradient>
                        </defs>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <Tooltip />
                        <Area type="monotone" dataKey="sales" name="Ventes" stroke="#22c55e" fillOpacity={1} fill="url(#colorSales)" />
                        <Area type="monotone" dataKey="listings" name="Nouveaux Biens" stroke="#3b82f6" fillOpacity={1} fill="url(#colorListings)" />
                     </AreaChart>
                  </ResponsiveContainer>
               </CardContent>
            </Card>

            {/* Pipeline Pie Chart */}
            <Card className="col-span-1">
               <CardHeader>
                  <CardTitle>Répartition du Portefeuille</CardTitle>
                  <CardDescription>État actuel de tous les biens</CardDescription>
               </CardHeader>
               <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                     <PieChart>
                        <Pie
                           data={pipelineData}
                           cx="50%"
                           cy="50%"
                           innerRadius={60}
                           outerRadius={80}
                           paddingAngle={5}
                           dataKey="value"
                        >
                           {pipelineData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                           ))}
                        </Pie>
                        <Tooltip />
                        <Legend verticalAlign="bottom" height={36} />
                     </PieChart>
                  </ResponsiveContainer>
               </CardContent>
            </Card>
         </div>

         {/* Recent Sales Table */}
         <Card>
            <CardHeader>
               <CardTitle>Dernières Ventes</CardTitle>
               <CardDescription>Historique des biens vendus récemment</CardDescription>
            </CardHeader>
            <CardContent>
               <Table>
                  <TableHeader>
                     <TableRow>
                        <TableHead>Bien</TableHead>
                        <TableHead>Date de Vente</TableHead>
                        <TableHead>Prix Final</TableHead>
                        <TableHead>Délai Vente</TableHead>
                        <TableHead>Statut</TableHead>
                     </TableRow>
                  </TableHeader>
                  <TableBody>
                     {soldProperties.slice(0, 5).map((property) => {
                        const daysToSell = differenceInDays(new Date(property.updated_at), new Date(property.created_at));
                        return (
                           <TableRow key={property.id}>
                              <TableCell className="font-medium">{property.title}</TableCell>
                              <TableCell>{format(new Date(property.updated_at), "dd MMM yyyy", { locale: fr })}</TableCell>
                              <TableCell>{property.price ? `${property.price.toLocaleString()} DZD` : '-'}</TableCell>
                              <TableCell>{daysToSell} jours</TableCell>
                              <TableCell>
                                 <Badge variant="secondary" className="bg-green-100 text-green-800">Vendu</Badge>
                              </TableCell>
                           </TableRow>
                        );
                     })}
                     {soldProperties.length === 0 && (
                        <TableRow>
                           <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                              Aucune vente enregistrée pour le moment
                           </TableCell>
                        </TableRow>
                     )}
                  </TableBody>
               </Table>
            </CardContent>
         </Card>
      </div>
   );
};
