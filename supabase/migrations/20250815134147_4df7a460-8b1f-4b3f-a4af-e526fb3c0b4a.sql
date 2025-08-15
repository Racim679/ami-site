-- Ajouter le champ WhatsApp obligatoire à la table properties
ALTER TABLE properties 
ADD COLUMN phone_whatsapp VARCHAR(20) NOT NULL DEFAULT '+213';

-- Mettre à jour les propriétés existantes avec des numéros d'exemple
UPDATE properties 
SET phone_whatsapp = CASE 
  WHEN id = '11111111-1111-1111-1111-111111111111' THEN '+213556123456' -- Appartement Hydra
  WHEN id = '22222222-2222-2222-2222-222222222222' THEN '+213557234567' -- Studio El Madania
  WHEN id = '33333333-3333-3333-3333-333333333333' THEN '+213558345678' -- Villa Bir El Djir
  WHEN id = '44444444-4444-4444-4444-444444444444' THEN '+213559456789' -- Terrain El Khroub
  WHEN id = '55555555-5555-5555-5555-555555555555' THEN '+213550567890' -- Penthouse Centre Alger
  ELSE '+213550000000'
END;