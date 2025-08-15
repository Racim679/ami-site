-- Supprimer les contraintes de vérification sur les statuts pour permettre la mise à jour
ALTER TABLE properties DROP CONSTRAINT IF EXISTS properties_status_check;

-- Maintenant mettre à jour les données
-- 1. Standardiser les statuts (remplacer "available" par "à vendre")
UPDATE properties 
SET status = 'à vendre' 
WHERE status = 'available';

-- 2. Corriger les typologies (extraire juste le type sans le nombre de pièces)
UPDATE properties 
SET typology = CASE 
  WHEN typology LIKE 'Appartement%' THEN 'appartement'
  WHEN typology LIKE 'Villa%' THEN 'villa'
  WHEN typology LIKE 'Studio%' THEN 'studio'
  WHEN typology LIKE 'Duplex%' THEN 'duplex'
  WHEN typology LIKE 'Penthouse%' THEN 'penthouse'
  WHEN typology LIKE 'Loft%' THEN 'loft'
  WHEN typology LIKE 'Maison%' THEN 'maison'
  WHEN typology LIKE 'Terrain%' THEN 'terrain'
  WHEN typology LIKE 'Local%' THEN 'local commercial'
  WHEN typology LIKE 'Bureau%' THEN 'bureau'
  ELSE LOWER(typology)
END;

-- 3. Standardiser les noms de localités (correspondre aux options des filtres)
UPDATE localities 
SET name = CASE 
  WHEN LOWER(name) = 'hydra' THEN 'hydra'
  WHEN LOWER(name) = 'el madania' OR LOWER(name) = 'el-madania' THEN 'el-madania'
  WHEN LOWER(name) = 'bab el oued' OR LOWER(name) = 'bab-el-oued' THEN 'bab-el-oued'
  WHEN LOWER(name) = 'bir el djir' OR LOWER(name) = 'bir-el-djir' THEN 'bir-el-djir'
  WHEN LOWER(name) = 'el khroub' OR LOWER(name) = 'el-khroub' THEN 'el-khroub'
  WHEN LOWER(name) = 'belgaid' THEN 'belgaid'
  ELSE LOWER(name)
END;

-- 4. Ajouter des index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);
CREATE INDEX IF NOT EXISTS idx_properties_typology ON properties(typology);
CREATE INDEX IF NOT EXISTS idx_properties_price ON properties(price);
CREATE INDEX IF NOT EXISTS idx_properties_surface ON properties(surface);
CREATE INDEX IF NOT EXISTS idx_localities_name ON localities(name);