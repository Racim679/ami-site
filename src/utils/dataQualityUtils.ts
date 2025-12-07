interface Property {
   id: string;
   title: string;
   description?: string | null;
   status: "À Vendre" | "Vendu" | "À louer";
   surface: number | null;
   price: number | null;
   typology: string | null;
   commune_id: number | null;
   image_url: string | null;
   latitude: number | null;
   longitude: number | null;
   phone_whatsapp: string;
   created_at: string;
   updated_at: string;
}

export interface PropertyHealthScore {
   score: number; // 0-100
   warnings: string[];
   isComplete: boolean;
}

/**
 * Calcule le score de santé d'une fiche bien
 * Critères : Photos, Description, Prix, Surface, Localisation GPS
 */
export const calculatePropertyHealth = (property: Property): PropertyHealthScore => {
   const warnings: string[] = [];
   let score = 0;
   const maxScore = 5;

   // 1. Image principale (20 points)
   if (property.image_url) {
      score += 1;
   } else {
      warnings.push("Image principale manquante");
   }

   // 2. Description (20 points)
   if (property.description && property.description.length > 50) {
      score += 1;
   } else if (!property.description) {
      warnings.push("Description manquante");
   } else {
      warnings.push("Description trop courte (< 50 caractères)");
   }

   // 3. Prix (20 points)
   if (property.price && property.price > 0) {
      score += 1;
   } else {
      warnings.push("Prix manquant");
   }

   // 4. Surface (20 points)
   if (property.surface && property.surface > 0) {
      score += 1;
   } else {
      warnings.push("Surface manquante");
   }

   // 5. Localisation GPS (20 points)
   if (property.latitude && property.longitude) {
      score += 1;
   } else {
      warnings.push("Coordonnées GPS manquantes");
   }

   const percentageScore = Math.round((score / maxScore) * 100);
   const isComplete = score === maxScore;

   return {
      score: percentageScore,
      warnings,
      isComplete
   };
};

/**
 * Retourne une couleur basée sur le score de santé
 */
export const getHealthColor = (score: number): string => {
   if (score >= 80) return "text-green-500";
   if (score >= 50) return "text-orange-500";
   return "text-red-500";
};

/**
 * Retourne un badge de couleur basé sur le score
 */
export const getHealthBadgeColor = (score: number): string => {
   if (score >= 80) return "bg-green-100 text-green-800";
   if (score >= 50) return "bg-orange-100 text-orange-800";
   return "bg-red-100 text-red-800";
};

export interface QualityFlag {
   type: 'missing_photo' | 'missing_price' | 'stale' | 'incomplete_desc';
   severity: 'low' | 'medium' | 'high';
   message: string;
}

export const generateQualityFlags = (property: Property): QualityFlag[] => {
   const flags: QualityFlag[] = [];

   // 1. Photo manquante
   if (!property.image_url) {
      flags.push({ type: 'missing_photo', severity: 'high', message: 'Photo manquante' });
   }

   // 2. Bien stagnant (Stale)
   const daysSinceUpdate = Math.floor((new Date().getTime() - new Date(property.updated_at).getTime()) / (1000 * 3600 * 24));

   if (property.status !== 'Vendu') {
      if (daysSinceUpdate > 60) {
         flags.push({ type: 'stale', severity: 'high', message: `Inactif ${daysSinceUpdate}j` });
      } else if (daysSinceUpdate > 30) {
         flags.push({ type: 'stale', severity: 'medium', message: `Inactif ${daysSinceUpdate}j` });
      }
   }

   // 3. Description incomplète
   if (!property.description || property.description.length < 50) {
      flags.push({ type: 'incomplete_desc', severity: 'medium', message: 'Description courte' });
   }

   // 4. Prix manquant
   if (!property.price || property.price === 0) {
      flags.push({ type: 'missing_price', severity: 'high', message: 'Prix manquant' });
   }

   return flags;
};
