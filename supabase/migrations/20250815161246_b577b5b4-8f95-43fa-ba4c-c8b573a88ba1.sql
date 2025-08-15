-- Mettre à jour les politiques RLS pour permettre l'accès public aux tables structurées
-- comme c'est le cas pour la table properties

-- Property amenities structured
DROP POLICY IF EXISTS "Property amenities structured can be managed by authenticated u" ON public.property_amenities_structured;
CREATE POLICY "Property amenities structured can be managed by anyone" 
ON public.property_amenities_structured 
FOR ALL 
USING (true)
WITH CHECK (true);

-- Property security structured  
DROP POLICY IF EXISTS "Property security structured can be managed by authenticated us" ON public.property_security_structured;
CREATE POLICY "Property security structured can be managed by anyone" 
ON public.property_security_structured 
FOR ALL 
USING (true)
WITH CHECK (true);

-- Property nearby structured
DROP POLICY IF EXISTS "Property nearby structured can be managed by authenticated user" ON public.property_nearby_structured;
CREATE POLICY "Property nearby structured can be managed by anyone" 
ON public.property_nearby_structured 
FOR ALL 
USING (true)
WITH CHECK (true);

-- Property documents structured
DROP POLICY IF EXISTS "Property documents structured can be managed by authenticated u" ON public.property_documents_structured;
CREATE POLICY "Property documents structured can be managed by anyone" 
ON public.property_documents_structured 
FOR ALL 
USING (true)
WITH CHECK (true);