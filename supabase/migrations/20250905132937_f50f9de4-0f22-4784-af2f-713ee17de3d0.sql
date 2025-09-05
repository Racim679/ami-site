-- Mettre à jour les politiques RLS pour property_photos pour permettre la gestion sans authentification
-- comme c'est le cas pour les autres tables de propriétés

-- Supprimer les anciennes politiques restrictives
DROP POLICY IF EXISTS "Property photos can be managed by authenticated users" ON property_photos;

-- Créer de nouvelles politiques permettant l'accès à tous
CREATE POLICY "Property photos can be managed by anyone" 
ON property_photos 
FOR ALL 
USING (true)
WITH CHECK (true);

-- Faire de même pour property_videos et property_building pour la cohérence
DROP POLICY IF EXISTS "Property videos can be managed by authenticated users" ON property_videos;
DROP POLICY IF EXISTS "Property building features can be managed by authenticated user" ON property_building;

CREATE POLICY "Property videos can be managed by anyone" 
ON property_videos 
FOR ALL 
USING (true)
WITH CHECK (true);

CREATE POLICY "Property building features can be managed by anyone" 
ON property_building 
FOR ALL 
USING (true)
WITH CHECK (true);