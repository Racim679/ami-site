-- Corriger les politiques RLS pour permettre l'accès aux propriétés
-- Le CRM utilise une authentification locale, pas Supabase auth

-- Supprimer l'ancienne politique restrictive
DROP POLICY IF EXISTS "Properties can be managed by authenticated users" ON properties;

-- Créer une nouvelle politique qui permet l'accès complet aux propriétés
-- Ceci est approprié pour un CRM interne
CREATE POLICY "Properties can be managed by anyone" 
ON properties 
FOR ALL 
USING (true) 
WITH CHECK (true);

-- Vérifier que RLS est activé
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;