-- Corriger la politique RLS pour property_details pour permettre l'accès public
DROP POLICY IF EXISTS "Property details can be managed by authenticated users" ON public.property_details;
CREATE POLICY "Property details can be managed by anyone" 
ON public.property_details 
FOR ALL 
USING (true)
WITH CHECK (true);