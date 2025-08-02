-- Insérer 6 biens immobiliers dans la table properties
INSERT INTO public.properties (
  id,
  title,
  description,
  status,
  surface_m2,
  prix_dinar,
  typology_id,
  locality_id,
  image_url,
  latitude,
  longitude,
  created_at
) VALUES 
(
  gen_random_uuid(),
  'Appartement F3 moderne avec vue sur mer',
  'Magnifique appartement de 3 pièces situé au 5ème étage avec une vue imprenable sur la mer. Entièrement rénové avec des finitions de qualité. Proche de toutes commodités.',
  'livré',
  85.5,
  8500000,
  '36a6c906-72bb-4325-8c0c-110d86251ecc', -- Appartement
  '74bb88e4-557a-4e0b-a7d7-fa4d45c8c798', -- Bab El Oued
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
  36.7833,
  3.0500,
  now()
),
(
  gen_random_uuid(),
  'Villa luxueuse avec piscine',
  'Superbe villa de 250m² avec piscine privée, jardin paysagé et garage double. 5 chambres, 3 salles de bains, salon spacieux avec cheminée.',
  'en_cours',
  250.0,
  25000000,
  '99be046f-891c-4787-86f1-58ae56712fd6', -- Villa
  'f3933de3-7a81-4122-8198-314a4819e40f', -- Hydra
  'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
  36.7538,
  3.0588,
  now()
),
(
  gen_random_uuid(),
  'Studio étudiant centre-ville',
  'Studio meublé idéal pour étudiant ou jeune actif. Cuisine équipée, salle de bain moderne. Proche universités et transports.',
  'livré',
  35.0,
  3200000,
  '6693a796-8a99-4d65-86d9-93696c4ad2fc', -- Studio
  '1afdb5f8-8c53-4f9b-a3e8-da6ac04ffd3c', -- El Madania
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
  36.7372,
  3.0731,
  now()
),
(
  gen_random_uuid(),
  'Duplex spacieux avec terrasse',
  'Duplex de 4 pièces avec grande terrasse. Salon double hauteur, 3 chambres, 2 salles de bains. Parking privé inclus.',
  'lancement',
  120.0,
  12000000,
  '1aff2af9-56b3-4c75-a66e-8ddbbf0f3ad1', -- Duplex
  'bcc07508-2cb8-4cbf-a197-451a8da33acb', -- El Khroub
  'https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=800',
  36.4945,
  6.6439,
  now()
),
(
  gen_random_uuid(),
  'Terrain constructible zone résidentielle',
  'Terrain de 500m² en zone résidentielle avec toutes commodités. Certificat d\'urbanisme favorable. Idéal pour construction villa.',
  'en_cours',
  500.0,
  4500000,
  '1e0f2dc5-0233-4a25-9f02-c4d27cb056bf', -- Terrain
  '15872448-9032-4dac-a8cc-5ef7ba03af2d', -- Belgaïd
  'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800',
  35.6167,
  -0.6333,
  now()
),
(
  gen_random_uuid(),
  'Locaux commerciaux sur avenue principale',
  'Local commercial de 80m² sur avenue passante. Vitrine sur rue, idéal pour commerce de proximité ou bureau. Bon état général.',
  'livré',
  80.0,
  6800000,
  '0886df7a-4e90-4707-bdf3-439b2955be70', -- Locaux commerciaux
  '1289a44e-040c-4f64-878b-fa32bd6d11b9', -- Bir El Djir
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
  35.7167,
  -0.5833,
  now()
);

-- Vérifier que l'insertion s'est bien passée
SELECT COUNT(*) as total_properties FROM properties;