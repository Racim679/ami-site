-- Corriger les politiques RLS pour la table properties
DROP POLICY IF EXISTS "Properties can be managed by authenticated users" ON public.properties;

-- Créer une nouvelle politique qui permet aux utilisateurs authentifiés de gérer les propriétés
CREATE POLICY "Properties can be managed by authenticated users" 
ON public.properties 
FOR ALL 
USING (auth.uid() IS NOT NULL)
WITH CHECK (auth.uid() IS NOT NULL);