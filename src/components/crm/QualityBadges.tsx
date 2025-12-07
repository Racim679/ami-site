import { Badge } from "@/components/ui/badge";
import { QualityFlag } from "@/utils/dataQualityUtils";
import { AlertTriangle, Clock, FileText, ImageOff, DollarSign } from "lucide-react";

interface QualityBadgesProps {
   flags: QualityFlag[];
   compact?: boolean;
}

export const QualityBadges = ({ flags, compact = false }: QualityBadgesProps) => {
   if (flags.length === 0) return null;

   const getIcon = (type: QualityFlag['type']) => {
      switch (type) {
         case 'missing_photo': return <ImageOff className="h-3 w-3" />;
         case 'stale': return <Clock className="h-3 w-3" />;
         case 'incomplete_desc': return <FileText className="h-3 w-3" />;
         case 'missing_price': return <DollarSign className="h-3 w-3" />;
         default: return <AlertTriangle className="h-3 w-3" />;
      }
   };

   const getVariant = (severity: QualityFlag['severity']) => {
      switch (severity) {
         case 'high': return "destructive";
         case 'medium': return "secondary"; // Using secondary for medium to differentiate
         case 'low': return "outline";
         default: return "outline";
      }
   };

   // Custom styles for specific severities if needed beyond standard variants
   const getClassName = (severity: QualityFlag['severity']) => {
      if (severity === 'medium') return "bg-orange-100 text-orange-800 hover:bg-orange-200 border-transparent";
      return "";
   };

   if (compact) {
      // Show only icons or abbreviated count if too many
      return (
         <div className="flex flex-wrap gap-1 mt-1">
            {flags.slice(0, 3).map((flag, i) => (
               <Badge
                  key={i}
                  variant={getVariant(flag.severity)}
                  className={`px-1.5 py-0.5 h-5 ${getClassName(flag.severity)}`}
                  title={flag.message}
               >
                  {getIcon(flag.type)}
                  <span className="ml-1 text-[10px]">{flag.message}</span>
               </Badge>
            ))}
            {flags.length > 3 && (
               <Badge variant="outline" className="px-1.5 py-0.5 h-5 text-[10px]">
                  +{flags.length - 3}
               </Badge>
            )}
         </div>
      );
   }

   return (
      <div className="flex flex-wrap gap-2">
         {flags.map((flag, i) => (
            <Badge
               key={i}
               variant={getVariant(flag.severity)}
               className={`flex items-center gap-1 ${getClassName(flag.severity)}`}
            >
               {getIcon(flag.type)}
               <span>{flag.message}</span>
            </Badge>
         ))}
      </div>
   );
};
