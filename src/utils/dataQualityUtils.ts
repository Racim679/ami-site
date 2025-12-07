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

   // 1. CRITÈRES CRITIQUES (Base : 40 points)
   // Ces éléments sont indispensables pour une annonce valide
   let criticalScore = 0;
   const maxCritical = 40;

   if (property.price && property.price > 0) criticalScore += 10;
   else warnings.push("Prix manquant (Critique)");

   if (property.surface && property.surface > 0) criticalScore += 10;
   else warnings.push("Surface manquante (Critique)");

   if (property.commune_id) criticalScore += 10;
   else warnings.push("Commune manquante (Critique)");

   if (property.typology) criticalScore += 10;
   else warnings.push("Type de bien manquant (Critique)");

   score += criticalScore;

   // 2. VISUEL (Base : 30 points)
   // L'image est le facteur #1 de clic
   if (property.image_url) {
      score += 30;
   } else {
      warnings.push("Photo principale manquante (-30%)");
   }

   // 3. QUALITATIF (Base : 20 points)
   // Description et Titre
   if (property.title && property.title.length > 10) {
      score += 10;
   } else {
      score += 5; // Titre présent mais court
      warnings.push("Titre peu descriptif");
   }

   if (property.description && property.description.length > 100) {
      score += 10;
   } else if (property.description && property.description.length > 20) {
      score += 8; // Description correcte mais perfectible
      warnings.push("Description pourrait être plus détaillée");
   } else if (property.description) {
      score += 5; // Description très courte
      warnings.push("Description trop courte");
   } else {
      warnings.push("Description manquante");
   }

   // 4. BONUS & TECHNIQUE (Base : 10 points)
   // GPS et Contact
   if (property.latitude && property.longitude) {
      score += 5;
   } else {
      warnings.push("Géolocalisation exacte manquante (Bonus)");
   }

   if (property.phone_whatsapp) {
      score += 5;
   } else {
      warnings.push("Numéro WhatsApp manquant");
   }

   // PÉNALITÉS BLOQUANTES
   // Si pas de photo, le score ne peut pas dépasser 60% même si tout le reste est parfait
   if (!property.image_url && score > 60) score = 60;

   // Si pas de prix, le score ne peut pas dépasser 50%
   if ((!property.price || property.price === 0) && score > 50) score = 50;

   const isComplete = score >= 95; // On considère complet à 95% (ex: manque juste GPS exact)

   return {
      score,
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
