-- Créer le bucket property-images pour les photos de galerie
INSERT INTO storage.buckets (id, name, public) 
VALUES ('property-images', 'property-images', true);

-- Rendre le bucket photo_principale public aussi
UPDATE storage.buckets 
SET public = true 
WHERE id = 'photo_principale';

-- Créer les politiques pour property-images
CREATE POLICY "Property images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'property-images');

CREATE POLICY "Anyone can upload property images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'property-images');

CREATE POLICY "Anyone can update property images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'property-images');

CREATE POLICY "Anyone can delete property images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'property-images');

-- Créer les politiques pour photo_principale
CREATE POLICY "Main photos are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'photo_principale');

CREATE POLICY "Anyone can upload main photos" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'photo_principale');

CREATE POLICY "Anyone can update main photos" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'photo_principale');

CREATE POLICY "Anyone can delete main photos" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'photo_principale');