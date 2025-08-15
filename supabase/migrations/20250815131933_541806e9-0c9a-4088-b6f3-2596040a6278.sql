-- Corriger les statuts avec les bonnes valeurs (avec les accents corrects)
UPDATE properties 
SET status = CASE 
  WHEN LOWER(status) = 'à vendre' OR status = 'available' THEN 'À Vendre'
  WHEN LOWER(status) = 'vendu' OR status = 'fondu' THEN 'Vendu'  
  WHEN LOWER(status) = 'à louer' OR status = 'alloué' OR status = 'loué' THEN 'À louer'
  ELSE 'À Vendre'
END;