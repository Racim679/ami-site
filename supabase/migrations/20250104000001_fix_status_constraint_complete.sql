-- Script complet pour diagnostiquer et corriger la contrainte chk_status
-- Étape 1 : Voir toutes les contraintes CHECK sur la table properties
SELECT 
    conname AS constraint_name,
    pg_get_constraintdef(oid) AS constraint_definition
FROM pg_constraint
WHERE conrelid = 'properties'::regclass
AND contype = 'c'
ORDER BY conname;

-- Étape 2 : Voir les valeurs de status actuellement dans la table
SELECT DISTINCT status, COUNT(*) as count
FROM properties
GROUP BY status
ORDER BY status;

-- Étape 3 : Supprimer TOUTES les contraintes CHECK liées au status
DO $$
DECLARE
    r RECORD;
BEGIN
    FOR r IN 
        SELECT conname 
        FROM pg_constraint 
        WHERE conrelid = 'properties'::regclass 
        AND contype = 'c'
        AND (conname LIKE '%status%' OR pg_get_constraintdef(oid) LIKE '%status%')
    LOOP
        EXECUTE 'ALTER TABLE properties DROP CONSTRAINT IF EXISTS ' || quote_ident(r.conname);
        RAISE NOTICE 'Contrainte supprimée: %', r.conname;
    END LOOP;
END $$;

-- Étape 4 : Créer la nouvelle contrainte avec les valeurs exactes
ALTER TABLE properties 
ADD CONSTRAINT chk_status 
CHECK (status IN ('À Vendre', 'Vendu', 'À louer'));

-- Étape 5 : Vérifier que la contrainte a été créée
SELECT 
    conname AS constraint_name,
    pg_get_constraintdef(oid) AS constraint_definition
FROM pg_constraint
WHERE conrelid = 'properties'::regclass
AND conname = 'chk_status';

