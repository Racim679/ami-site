-- 1. Ajouter les nouvelles tables structurées pour les commodités spécifiques
CREATE TABLE IF NOT EXISTS property_amenities_structured (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  
  -- Commodités principales
  piscine BOOLEAN DEFAULT FALSE,
  garage BOOLEAN DEFAULT FALSE,
  jardin BOOLEAN DEFAULT FALSE,
  terrasse BOOLEAN DEFAULT FALSE,
  balcon BOOLEAN DEFAULT FALSE,
  cave BOOLEAN DEFAULT FALSE,
  grenier BOOLEAN DEFAULT FALSE,
  buanderie BOOLEAN DEFAULT FALSE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Table structurée pour sécurité et accessibilité
CREATE TABLE IF NOT EXISTS property_security_structured (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  
  -- Sécurité & Accessibilité
  gardien BOOLEAN DEFAULT FALSE,
  ascenseur BOOLEAN DEFAULT FALSE,
  acces_handicape BOOLEAN DEFAULT FALSE,
  video_surveillance BOOLEAN DEFAULT FALSE,
  digicode BOOLEAN DEFAULT FALSE,
  interphone BOOLEAN DEFAULT FALSE,
  alarme BOOLEAN DEFAULT FALSE,
  portail_electrique BOOLEAN DEFAULT FALSE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Table structurée pour les documents avec catégories
CREATE TABLE IF NOT EXISTS property_documents_structured (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  
  -- Documents de propriété
  livret_foncier BOOLEAN DEFAULT FALSE,
  acte_propriete BOOLEAN DEFAULT FALSE,
  titre_propriete BOOLEAN DEFAULT FALSE,
  
  -- Documents administratifs
  contrat_location BOOLEAN DEFAULT FALSE,
  certification_possession BOOLEAN DEFAULT FALSE,
  
  -- Documents fiscaux
  certificat_inscription_fonciere BOOLEAN DEFAULT FALSE,
  fiche_fiscale BOOLEAN DEFAULT FALSE,
  
  -- Documents cadastraux
  documents_cadastraux BOOLEAN DEFAULT FALSE,
  plans_cadastraux BOOLEAN DEFAULT FALSE,
  certificat_urbanisme BOOLEAN DEFAULT FALSE,
  
  -- Documents de construction
  permis_construire BOOLEAN DEFAULT FALSE,
  certification_conformite BOOLEAN DEFAULT FALSE,
  
  -- Autres documents
  promesse_vente BOOLEAN DEFAULT FALSE,
  mainlevee BOOLEAN DEFAULT FALSE,
  permis_exploitation BOOLEAN DEFAULT FALSE,
  certificat_non_negativite BOOLEAN DEFAULT FALSE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Activer RLS sur toutes les nouvelles tables
ALTER TABLE property_amenities_structured ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_security_structured ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_documents_structured ENABLE ROW LEVEL SECURITY;

-- 5. Créer les politiques RLS
CREATE POLICY "Property amenities structured are viewable by everyone" 
ON property_amenities_structured FOR SELECT USING (true);

CREATE POLICY "Property amenities structured can be managed by authenticated users" 
ON property_amenities_structured FOR ALL USING (auth.role() = 'authenticated'::text);

CREATE POLICY "Property security structured are viewable by everyone" 
ON property_security_structured FOR SELECT USING (true);

CREATE POLICY "Property security structured can be managed by authenticated users" 
ON property_security_structured FOR ALL USING (auth.role() = 'authenticated'::text);

CREATE POLICY "Property documents structured are viewable by everyone" 
ON property_documents_structured FOR SELECT USING (true);

CREATE POLICY "Property documents structured can be managed by authenticated users" 
ON property_documents_structured FOR ALL USING (auth.role() = 'authenticated'::text);

-- 6. Créer des triggers pour updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_property_amenities_structured_updated_at
    BEFORE UPDATE ON property_amenities_structured
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_property_security_structured_updated_at
    BEFORE UPDATE ON property_security_structured
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_property_documents_structured_updated_at
    BEFORE UPDATE ON property_documents_structured
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();