-- 1. Ajouter les colonnes pour les types de vues dans property_details
ALTER TABLE property_details 
ADD COLUMN IF NOT EXISTS vue_mer BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS vue_montagne BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS vue_ville BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS vue_jardin BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS vue_cour BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS vue_degagee BOOLEAN DEFAULT FALSE;

-- 2. Créer une table structurée pour la proximité
CREATE TABLE IF NOT EXISTS property_nearby_structured (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  
  -- Proximité des services
  ecoles BOOLEAN DEFAULT FALSE,
  pharmacies BOOLEAN DEFAULT FALSE,
  mosquees BOOLEAN DEFAULT FALSE,
  transports_publics BOOLEAN DEFAULT FALSE,
  banques BOOLEAN DEFAULT FALSE,
  universites BOOLEAN DEFAULT FALSE,
  commerces BOOLEAN DEFAULT FALSE,
  restaurants BOOLEAN DEFAULT FALSE,
  aeroports BOOLEAN DEFAULT FALSE,
  hopitaux BOOLEAN DEFAULT FALSE,
  parcs BOOLEAN DEFAULT FALSE,
  plages BOOLEAN DEFAULT FALSE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT property_nearby_structured_property_id_unique UNIQUE (property_id)
);

-- 3. Activer RLS sur la nouvelle table
ALTER TABLE property_nearby_structured ENABLE ROW LEVEL SECURITY;

-- 4. Créer les politiques RLS
CREATE POLICY "Property nearby structured are viewable by everyone" 
ON property_nearby_structured FOR SELECT USING (true);

CREATE POLICY "Property nearby structured can be managed by authenticated users" 
ON property_nearby_structured FOR ALL USING (auth.role() = 'authenticated'::text);

-- 5. Créer trigger pour updated_at
CREATE TRIGGER update_property_nearby_structured_updated_at
    BEFORE UPDATE ON property_nearby_structured
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();