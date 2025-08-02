-- Insert 6 sample properties into the properties table
INSERT INTO public.properties (
  title,
  description,
  status,
  surface_m2,
  prix_dinar,
  latitude,
  longitude,
  typology_id,
  locality_id,
  image_url
) VALUES 
(
  'Villa moderne avec piscine',
  'Magnifique villa de 300m² avec piscine, jardin paysager et vue panoramique. Finitions haut de gamme.',
  'disponible',
  300.00,
  85000000,
  36.7528,
  3.0420,
  (SELECT id FROM typologies LIMIT 1),
  (SELECT id FROM localities LIMIT 1),
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'
),
(
  'Appartement F4 centre-ville',
  'Appartement lumineux de 120m² au cœur de la ville. 4 pièces, balcon, parking inclus.',
  'disponible',
  120.00,
  45000000,
  36.7755,
  3.0597,
  (SELECT id FROM typologies LIMIT 1),
  (SELECT id FROM localities LIMIT 1),
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'
),
(
  'Terrain constructible 500m²',
  'Terrain plat et viabilisé, idéal pour construction individuelle. Proche commodités.',
  'disponible',
  500.00,
  25000000,
  36.7308,
  3.0870,
  (SELECT id FROM typologies LIMIT 1),
  (SELECT id FROM localities LIMIT 1),
  'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800'
),
(
  'Duplex avec terrasse',
  'Superbe duplex de 150m² avec grande terrasse. Vue mer, 3 chambres, cuisine équipée.',
  'vendu',
  150.00,
  62000000,
  36.7645,
  3.0412,
  (SELECT id FROM typologies LIMIT 1),
  (SELECT id FROM localities LIMIT 1),
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800'
),
(
  'Local commercial 80m²',
  'Local commercial en rez-de-chaussée, vitrine sur rue passante. Idéal bureaux ou commerce.',
  'loue',
  80.00,
  35000000,
  36.7528,
  3.0597,
  (SELECT id FROM typologies LIMIT 1),
  (SELECT id FROM localities LIMIT 1),
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800'
),
(
  'Maison traditionnelle rénovée',
  'Charmante maison de 180m² entièrement rénovée. Cachet authentique, jardin arboré.',
  'disponible',
  180.00,
  55000000,
  36.7434,
  3.0512,
  (SELECT id FROM typologies LIMIT 1),
  (SELECT id FROM localities LIMIT 1),
  'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800'
);