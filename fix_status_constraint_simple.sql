-- Script SIMPLE pour corriger la contrainte chk_status
-- Copiez-collez ceci dans Supabase SQL Editor et exécutez

-- 1. Supprimer l'ancienne contrainte (peu importe son nom exact)
DO $$
BEGIN
    -- Essayer de supprimer avec différents noms possibles
    ALTER TABLE properties DROP CONSTRAINT IF EXISTS chk_status;
    ALTER TABLE properties DROP CONSTRAINT IF EXISTS properties_status_check;
    ALTER TABLE properties DROP CONSTRAINT IF EXISTS check_status;
    
    -- Supprimer toutes les contraintes CHECK qui contiennent "status"
    FOR r IN 
        SELECT conname 
        FROM pg_constraint 
        WHERE conrelid = 'properties'::regclass 
        AND contype = 'c'
        AND (pg_get_constraintdef(oid) LIKE '%status%')
    LOOP
        EXECUTE 'ALTER TABLE properties DROP CONSTRAINT ' || quote_ident(r.conname);
    END LOOP;
EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'Erreur lors de la suppression: %', SQLERRM;
END $$;

-- 2. Créer la nouvelle contrainte
ALTER TABLE properties 
ADD CONSTRAINT chk_status 
CHECK (status IN ('À Vendre', 'Vendu', 'À louer'));

-- 3. Vérifier
SELECT 
    conname,
    pg_get_constraintdef(oid) 
FROM pg_constraint
WHERE conrelid = 'properties'::regclass
AND conname = 'chk_status';

