-- Migration pour corriger la contrainte chk_status
-- Cette migration supprime l'ancienne contrainte et en crée une nouvelle
-- qui accepte les valeurs avec accents : "À Vendre", "Vendu", "À louer"

-- Supprimer l'ancienne contrainte si elle existe
ALTER TABLE properties 
DROP CONSTRAINT IF EXISTS chk_status;

-- Créer la nouvelle contrainte avec les valeurs correctes (avec accents)
ALTER TABLE properties 
ADD CONSTRAINT chk_status 
CHECK (status IN ('À Vendre', 'Vendu', 'À louer'));

-- Commentaire pour documentation
COMMENT ON CONSTRAINT chk_status ON properties IS 
'Contrainte qui vérifie que le statut est l''un des suivants : À Vendre, Vendu, À louer';

