-- Insérer des données d'exemple pour les propriétés existantes
-- Property amenities structured pour les propriétés démo
INSERT INTO property_amenities_structured (property_id, piscine, garage, jardin, terrasse, balcon, cave, grenier, buanderie)
VALUES 
  ('11111111-1111-1111-1111-111111111111', false, true, false, true, true, false, false, true),  -- Appartement Hydra
  ('22222222-2222-2222-2222-222222222222', false, false, false, false, true, false, false, false), -- Studio El Madania
  ('33333333-3333-3333-3333-333333333333', true, true, true, true, false, true, true, true),    -- Villa Bir El Djir
  ('44444444-4444-4444-4444-444444444444', false, false, false, false, false, false, false, false), -- Terrain El Khroub
  ('55555555-5555-5555-5555-555555555555', true, true, false, true, true, false, false, true)   -- Penthouse Centre Alger
ON CONFLICT (property_id) DO NOTHING;

-- Property security structured pour les propriétés démo
INSERT INTO property_security_structured (property_id, gardien, ascenseur, acces_handicape, video_surveillance, digicode, interphone, alarme, portail_electrique)
VALUES 
  ('11111111-1111-1111-1111-111111111111', true, true, false, true, true, true, false, false),  -- Appartement Hydra
  ('22222222-2222-2222-2222-222222222222', false, true, false, false, true, true, false, false), -- Studio El Madania
  ('33333333-3333-3333-3333-333333333333', true, false, true, true, false, true, true, true),    -- Villa Bir El Djir
  ('44444444-4444-4444-4444-444444444444', false, false, false, false, false, false, false, false), -- Terrain El Khroub
  ('55555555-5555-5555-5555-555555555555', true, true, true, true, true, true, true, false)   -- Penthouse Centre Alger
ON CONFLICT (property_id) DO NOTHING;

-- Property documents structured pour les propriétés démo
INSERT INTO property_documents_structured (property_id, livret_foncier, acte_propriete, titre_propriete, contrat_location, certification_possession, certificat_inscription_fonciere, fiche_fiscale, documents_cadastraux, plans_cadastraux, certificat_urbanisme, permis_construire, certification_conformite, promesse_vente, mainlevee, permis_exploitation, certificat_non_negativite)
VALUES 
  ('11111111-1111-1111-1111-111111111111', true, true, true, false, true, true, true, true, true, true, false, true, false, false, false, true),  -- Appartement Hydra
  ('22222222-2222-2222-2222-222222222222', true, true, true, false, true, true, true, true, true, true, false, true, false, false, false, true), -- Studio El Madania
  ('33333333-3333-3333-3333-333333333333', true, true, true, false, true, true, true, true, true, true, true, true, false, false, false, true),    -- Villa Bir El Djir
  ('44444444-4444-4444-4444-444444444444', true, true, true, false, true, true, true, true, true, true, false, false, true, false, false, true), -- Terrain El Khroub
  ('55555555-5555-5555-5555-555555555555', true, true, true, false, true, true, true, true, true, true, true, true, false, false, false, true)   -- Penthouse Centre Alger
ON CONFLICT (property_id) DO NOTHING;