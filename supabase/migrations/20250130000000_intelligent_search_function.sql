-- Migration: Fonction de recherche intelligente pour les propriétés
-- Cette fonction permet de rechercher dans tous les champs pertinents d'une propriété

-- Fonction pour rechercher les propriétés de manière intelligente
CREATE OR REPLACE FUNCTION search_properties_intelligent(search_query TEXT)
RETURNS TABLE (
  id UUID,
  title TEXT,
  description TEXT,
  typology TEXT,
  surface NUMERIC,
  price NUMERIC,
  locality_id INTEGER,
  latitude NUMERIC,
  longitude NUMERIC,
  phone_whatsapp TEXT,
  image_url TEXT,
  status TEXT,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  locality_name TEXT,
  city_name TEXT,
  search_score NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  WITH search_terms AS (
    SELECT unnest(string_to_array(lower(trim(search_query)), ' ')) AS term
  ),
  property_scores AS (
    SELECT 
      p.id,
      p.title,
      p.description,
      p.typology,
      p.surface,
      p.price,
      p.locality_id,
      p.latitude,
      p.longitude,
      p.phone_whatsapp,
      p.image_url,
      p.status,
      p.created_at,
      p.updated_at,
      l.name AS locality_name,
      c.name AS city_name,
      -- Calcul du score de recherche
      (
        -- Titre (poids le plus élevé: 10)
        CASE WHEN p.title IS NOT NULL THEN
          (SELECT COUNT(*) FROM search_terms WHERE lower(p.title) LIKE '%' || term || '%') * 10
        ELSE 0 END +
        -- Description (poids: 5)
        CASE WHEN p.description IS NOT NULL THEN
          (SELECT COUNT(*) FROM search_terms WHERE lower(p.description) LIKE '%' || term || '%') * 5
        ELSE 0 END +
        -- Typologie (poids: 8)
        CASE WHEN p.typology IS NOT NULL THEN
          (SELECT COUNT(*) FROM search_terms WHERE lower(p.typology) LIKE '%' || term || '%') * 8
        ELSE 0 END +
        -- Localité (poids: 9)
        CASE WHEN l.name IS NOT NULL THEN
          (SELECT COUNT(*) FROM search_terms WHERE lower(l.name) LIKE '%' || term || '%') * 9
        ELSE 0 END +
        -- Ville (poids: 9)
        CASE WHEN c.name IS NOT NULL THEN
          (SELECT COUNT(*) FROM search_terms WHERE lower(c.name) LIKE '%' || term || '%') * 9
        ELSE 0 END +
        -- Vues (poids: 6)
        CASE WHEN pd.vue_mer = true AND EXISTS (SELECT 1 FROM search_terms WHERE term IN ('mer', 'vue mer', 'vue-mer', 'mer', 'plage')) THEN 6
             WHEN pd.vue_montagne = true AND EXISTS (SELECT 1 FROM search_terms WHERE term IN ('montagne', 'vue montagne', 'vue-montagne', 'montagne')) THEN 6
             WHEN pd.vue_ville = true AND EXISTS (SELECT 1 FROM search_terms WHERE term IN ('ville', 'vue ville', 'vue-ville', 'city')) THEN 6
             WHEN pd.vue_jardin = true AND EXISTS (SELECT 1 FROM search_terms WHERE term IN ('jardin', 'vue jardin', 'vue-jardin', 'garden')) THEN 6
             WHEN pd.vue_cour = true AND EXISTS (SELECT 1 FROM search_terms WHERE term IN ('cour', 'vue cour', 'vue-cour')) THEN 6
             WHEN pd.vue_degagee = true AND EXISTS (SELECT 1 FROM search_terms WHERE term IN ('dégagée', 'degagee', 'vue dégagée', 'vue-degagee')) THEN 6
        ELSE 0 END +
        -- Aménagements (poids: 5)
        CASE WHEN pa.piscine = true AND EXISTS (SELECT 1 FROM search_terms WHERE term IN ('piscine', 'pool')) THEN 5
             WHEN pa.garage = true AND EXISTS (SELECT 1 FROM search_terms WHERE term IN ('garage', 'parking')) THEN 5
             WHEN pa.jardin = true AND EXISTS (SELECT 1 FROM search_terms WHERE term IN ('jardin', 'garden')) THEN 5
             WHEN pa.terrasse = true AND EXISTS (SELECT 1 FROM search_terms WHERE term IN ('terrasse', 'terrace')) THEN 5
             WHEN pa.balcon = true AND EXISTS (SELECT 1 FROM search_terms WHERE term IN ('balcon', 'balcony')) THEN 5
             WHEN pa.cave = true AND EXISTS (SELECT 1 FROM search_terms WHERE term IN ('cave', 'cellar')) THEN 5
             WHEN pa.grenier = true AND EXISTS (SELECT 1 FROM search_terms WHERE term IN ('grenier', 'attic')) THEN 5
             WHEN pa.buanderie = true AND EXISTS (SELECT 1 FROM search_terms WHERE term IN ('buanderie', 'laundry')) THEN 5
        ELSE 0 END +
        -- Documents (poids: 4)
        CASE WHEN pdoc.acte_propriete = true AND EXISTS (SELECT 1 FROM search_terms WHERE term IN ('acte', 'propriété', 'propriete', 'acte propriété')) THEN 4
             WHEN pdoc.permis_construire = true AND EXISTS (SELECT 1 FROM search_terms WHERE term IN ('permis', 'construire', 'permis construire')) THEN 4
             WHEN pdoc.certification_conformite = true AND EXISTS (SELECT 1 FROM search_terms WHERE term IN ('certificat', 'conformité', 'conformite', 'certification')) THEN 4
             WHEN pdoc.titre_propriete = true AND EXISTS (SELECT 1 FROM search_terms WHERE term IN ('titre', 'titre propriété')) THEN 4
        ELSE 0 END +
        -- Infrastructures à proximité (poids: 5)
        CASE WHEN pn.ecoles = true AND EXISTS (SELECT 1 FROM search_terms WHERE term IN ('école', 'ecole', 'écoles', 'ecoles', 'school')) THEN 5
             WHEN pn.pharmacies = true AND EXISTS (SELECT 1 FROM search_terms WHERE term IN ('pharmacie', 'pharmacy')) THEN 5
             WHEN pn.mosquees = true AND EXISTS (SELECT 1 FROM search_terms WHERE term IN ('mosquée', 'mosquee', 'mosquées', 'mosquees')) THEN 5
             WHEN pn.transports_publics = true AND EXISTS (SELECT 1 FROM search_terms WHERE term IN ('transport', 'transports', 'métro', 'metro', 'bus')) THEN 5
             WHEN pn.banques = true AND EXISTS (SELECT 1 FROM search_terms WHERE term IN ('banque', 'bank')) THEN 5
             WHEN pn.universites = true AND EXISTS (SELECT 1 FROM search_terms WHERE term IN ('université', 'universite', 'university')) THEN 5
             WHEN pn.commerces = true AND EXISTS (SELECT 1 FROM search_terms WHERE term IN ('commerce', 'commerces', 'shop', 'shopping')) THEN 5
             WHEN pn.restaurants = true AND EXISTS (SELECT 1 FROM search_terms WHERE term IN ('restaurant', 'restaurants')) THEN 5
             WHEN pn.aeroports = true AND EXISTS (SELECT 1 FROM search_terms WHERE term IN ('aéroport', 'aeroport', 'airport')) THEN 5
             WHEN pn.hopitaux = true AND EXISTS (SELECT 1 FROM search_terms WHERE term IN ('hôpital', 'hopital', 'hospital')) THEN 5
             WHEN pn.parcs = true AND EXISTS (SELECT 1 FROM search_terms WHERE term IN ('parc', 'parcs', 'park')) THEN 5
             WHEN pn.plages = true AND EXISTS (SELECT 1 FROM search_terms WHERE term IN ('plage', 'plages', 'beach')) THEN 5
        ELSE 0 END +
        -- Description du bâtiment (poids: 4)
        CASE WHEN EXISTS (
          SELECT 1 FROM property_building pb 
          WHERE pb.property_id = p.id 
          AND EXISTS (
            SELECT 1 FROM search_terms 
            WHERE lower(pb.text) LIKE '%' || term || '%'
          )
        ) THEN 4 ELSE 0 END
      ) AS search_score
    FROM properties p
    LEFT JOIN localities l ON p.locality_id = l.id
    LEFT JOIN cities c ON l.city_id = c.id
    LEFT JOIN property_details pd ON pd.property_id = p.id
    LEFT JOIN property_amenities_structured pa ON pa.property_id = p.id
    LEFT JOIN property_documents_structured pdoc ON pdoc.property_id = p.id
    LEFT JOIN property_nearby_structured pn ON pn.property_id = p.id
    WHERE 
      -- Recherche dans le titre
      (p.title IS NOT NULL AND EXISTS (SELECT 1 FROM search_terms WHERE lower(p.title) LIKE '%' || term || '%'))
      OR
      -- Recherche dans la description
      (p.description IS NOT NULL AND EXISTS (SELECT 1 FROM search_terms WHERE lower(p.description) LIKE '%' || term || '%'))
      OR
      -- Recherche dans la typologie
      (p.typology IS NOT NULL AND EXISTS (SELECT 1 FROM search_terms WHERE lower(p.typology) LIKE '%' || term || '%'))
      OR
      -- Recherche dans la localité
      (l.name IS NOT NULL AND EXISTS (SELECT 1 FROM search_terms WHERE lower(l.name) LIKE '%' || term || '%'))
      OR
      -- Recherche dans la ville
      (c.name IS NOT NULL AND EXISTS (SELECT 1 FROM search_terms WHERE lower(c.name) LIKE '%' || term || '%'))
      OR
      -- Recherche dans les vues
      (pd.vue_mer = true AND EXISTS (SELECT 1 FROM search_terms WHERE term IN ('mer', 'vue mer', 'vue-mer', 'plage')))
      OR (pd.vue_montagne = true AND EXISTS (SELECT 1 FROM search_terms WHERE term IN ('montagne', 'vue montagne', 'vue-montagne')))
      OR (pd.vue_ville = true AND EXISTS (SELECT 1 FROM search_terms WHERE term IN ('ville', 'vue ville', 'vue-ville', 'city')))
      OR (pd.vue_jardin = true AND EXISTS (SELECT 1 FROM search_terms WHERE term IN ('jardin', 'vue jardin', 'vue-jardin', 'garden')))
      OR (pd.vue_cour = true AND EXISTS (SELECT 1 FROM search_terms WHERE term IN ('cour', 'vue cour', 'vue-cour')))
      OR (pd.vue_degagee = true AND EXISTS (SELECT 1 FROM search_terms WHERE term IN ('dégagée', 'degagee', 'vue dégagée', 'vue-degagee')))
      OR
      -- Recherche dans les aménagements
      (pa.piscine = true AND EXISTS (SELECT 1 FROM search_terms WHERE term IN ('piscine', 'pool')))
      OR (pa.garage = true AND EXISTS (SELECT 1 FROM search_terms WHERE term IN ('garage', 'parking')))
      OR (pa.jardin = true AND EXISTS (SELECT 1 FROM search_terms WHERE term IN ('jardin', 'garden')))
      OR (pa.terrasse = true AND EXISTS (SELECT 1 FROM search_terms WHERE term IN ('terrasse', 'terrace')))
      OR (pa.balcon = true AND EXISTS (SELECT 1 FROM search_terms WHERE term IN ('balcon', 'balcony')))
      OR (pa.cave = true AND EXISTS (SELECT 1 FROM search_terms WHERE term IN ('cave', 'cellar')))
      OR (pa.grenier = true AND EXISTS (SELECT 1 FROM search_terms WHERE term IN ('grenier', 'attic')))
      OR (pa.buanderie = true AND EXISTS (SELECT 1 FROM search_terms WHERE term IN ('buanderie', 'laundry')))
      OR
      -- Recherche dans les documents
      (pdoc.acte_propriete = true AND EXISTS (SELECT 1 FROM search_terms WHERE term IN ('acte', 'propriété', 'propriete', 'acte propriété')))
      OR (pdoc.permis_construire = true AND EXISTS (SELECT 1 FROM search_terms WHERE term IN ('permis', 'construire', 'permis construire')))
      OR (pdoc.certification_conformite = true AND EXISTS (SELECT 1 FROM search_terms WHERE term IN ('certificat', 'conformité', 'conformite', 'certification')))
      OR (pdoc.titre_propriete = true AND EXISTS (SELECT 1 FROM search_terms WHERE term IN ('titre', 'titre propriété')))
      OR
      -- Recherche dans les infrastructures à proximité
      (pn.ecoles = true AND EXISTS (SELECT 1 FROM search_terms WHERE term IN ('école', 'ecole', 'écoles', 'ecoles', 'school')))
      OR (pn.pharmacies = true AND EXISTS (SELECT 1 FROM search_terms WHERE term IN ('pharmacie', 'pharmacy')))
      OR (pn.mosquees = true AND EXISTS (SELECT 1 FROM search_terms WHERE term IN ('mosquée', 'mosquee', 'mosquées', 'mosquees')))
      OR (pn.transports_publics = true AND EXISTS (SELECT 1 FROM search_terms WHERE term IN ('transport', 'transports', 'métro', 'metro', 'bus')))
      OR (pn.banques = true AND EXISTS (SELECT 1 FROM search_terms WHERE term IN ('banque', 'bank')))
      OR (pn.universites = true AND EXISTS (SELECT 1 FROM search_terms WHERE term IN ('université', 'universite', 'university')))
      OR (pn.commerces = true AND EXISTS (SELECT 1 FROM search_terms WHERE term IN ('commerce', 'commerces', 'shop', 'shopping')))
      OR (pn.restaurants = true AND EXISTS (SELECT 1 FROM search_terms WHERE term IN ('restaurant', 'restaurants')))
      OR (pn.aeroports = true AND EXISTS (SELECT 1 FROM search_terms WHERE term IN ('aéroport', 'aeroport', 'airport')))
      OR (pn.hopitaux = true AND EXISTS (SELECT 1 FROM search_terms WHERE term IN ('hôpital', 'hopital', 'hospital')))
      OR (pn.parcs = true AND EXISTS (SELECT 1 FROM search_terms WHERE term IN ('parc', 'parcs', 'park')))
      OR (pn.plages = true AND EXISTS (SELECT 1 FROM search_terms WHERE term IN ('plage', 'plages', 'beach')))
      OR
      -- Recherche dans la description du bâtiment
      EXISTS (
        SELECT 1 FROM property_building pb 
        WHERE pb.property_id = p.id 
        AND EXISTS (
          SELECT 1 FROM search_terms 
          WHERE lower(pb.text) LIKE '%' || term || '%'
        )
      )
  )
  SELECT 
    ps.id,
    ps.title,
    ps.description,
    ps.typology,
    ps.surface,
    ps.price,
    ps.locality_id,
    ps.latitude,
    ps.longitude,
    ps.phone_whatsapp,
    ps.image_url,
    ps.status,
    ps.created_at,
    ps.updated_at,
    ps.locality_name,
    ps.city_name,
    ps.search_score
  FROM property_scores ps
  WHERE ps.search_score > 0
  ORDER BY ps.search_score DESC, ps.created_at DESC;
END;
$$ LANGUAGE plpgsql;

-- Commentaire sur la fonction
COMMENT ON FUNCTION search_properties_intelligent IS 'Fonction de recherche intelligente qui recherche dans le titre, la description, la typologie, la localisation (localité et ville), les vues, les aménagements, les documents, les infrastructures à proximité et la description du bâtiment. Retourne les résultats triés par score de pertinence.';

