-- Ajouter des données d'exemple pour les vues et la proximité
-- Mettre à jour les vues pour les propriétés existantes
UPDATE property_details 
SET vue_ville = true, vue_degagee = true
WHERE property_id = '11111111-1111-1111-1111-111111111111'; -- Appartement Hydra

UPDATE property_details 
SET vue_ville = true
WHERE property_id = '22222222-2222-2222-2222-222222222222'; -- Studio El Madania

UPDATE property_details 
SET vue_jardin = true, vue_degagee = true, vue_montagne = true
WHERE property_id = '33333333-3333-3333-3333-333333333333'; -- Villa Bir El Djir

UPDATE property_details 
SET vue_degagee = true
WHERE property_id = '44444444-4444-4444-4444-444444444444'; -- Terrain El Khroub

UPDATE property_details 
SET vue_mer = true, vue_ville = true, vue_degagee = true
WHERE property_id = '55555555-5555-5555-5555-555555555555'; -- Penthouse Centre Alger

-- Insérer des données de proximité pour les propriétés existantes
INSERT INTO property_nearby_structured (property_id, ecoles, pharmacies, mosquees, transports_publics, banques, universites, commerces, restaurants, aeroports, hopitaux, parcs, plages)
VALUES 
  ('11111111-1111-1111-1111-111111111111', true, true, true, true, true, false, true, true, false, true, true, false),  -- Appartement Hydra
  ('22222222-2222-2222-2222-222222222222', true, true, true, true, true, false, true, true, false, false, false, false), -- Studio El Madania
  ('33333333-3333-3333-3333-333333333333', true, true, true, false, true, false, true, true, true, true, true, false),    -- Villa Bir El Djir
  ('44444444-4444-4444-4444-444444444444', false, false, false, false, false, false, false, false, false, false, false, false), -- Terrain El Khroub
  ('55555555-5555-5555-5555-555555555555', true, true, true, true, true, true, true, true, true, true, true, true)   -- Penthouse Centre Alger
ON CONFLICT (property_id) DO NOTHING;