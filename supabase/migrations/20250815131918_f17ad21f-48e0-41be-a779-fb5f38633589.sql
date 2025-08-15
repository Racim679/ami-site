-- Corriger les statuts avec les bonnes valeurs
UPDATE properties 
SET status = CASE 
  WHEN status = 'à vendre' THEN 'À Vendre'
  WHEN status = 'fondu' THEN 'Vendu'
  WHEN status = 'alloué' THEN 'À louer'
  WHEN status = 'loué' THEN 'À louer'
  ELSE 'À Vendre'
END;