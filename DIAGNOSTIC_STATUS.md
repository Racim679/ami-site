# Diagnostic du problème chk_status

## Étapes pour résoudre le problème

### 1. Exécutez ce script SQL dans Supabase SQL Editor pour voir la contrainte actuelle :

```sql
-- Voir toutes les contraintes CHECK sur properties
SELECT 
    conname AS constraint_name,
    pg_get_constraintdef(oid) AS constraint_definition
FROM pg_constraint
WHERE conrelid = 'properties'::regclass
AND contype = 'c'
ORDER BY conname;
```

### 2. Voir les valeurs de status actuellement dans la table :

```sql
SELECT DISTINCT status, COUNT(*) as count
FROM properties
GROUP BY status
ORDER BY status;
```

### 3. Script de correction (à exécuter dans Supabase SQL Editor) :

```sql
-- Supprimer toutes les contraintes CHECK liées au status
DO $$
DECLARE
    r RECORD;
BEGIN
    FOR r IN 
        SELECT conname 
        FROM pg_constraint 
        WHERE conrelid = 'properties'::regclass 
        AND contype = 'c'
        AND (pg_get_constraintdef(oid) LIKE '%status%')
    LOOP
        EXECUTE 'ALTER TABLE properties DROP CONSTRAINT ' || quote_ident(r.conname);
        RAISE NOTICE 'Contrainte supprimée: %', r.conname;
    END LOOP;
END $$;

-- Créer la nouvelle contrainte
ALTER TABLE properties 
ADD CONSTRAINT chk_status 
CHECK (status IN ('À Vendre', 'Vendu', 'À louer'));

-- Vérifier
SELECT 
    conname,
    pg_get_constraintdef(oid) 
FROM pg_constraint
WHERE conrelid = 'properties'::regclass
AND conname = 'chk_status';
```

### 4. Si ça ne fonctionne toujours pas, essayez avec des valeurs sans accents :

```sql
-- Alternative : contrainte sans accents
ALTER TABLE properties 
DROP CONSTRAINT IF EXISTS chk_status;

ALTER TABLE properties 
ADD CONSTRAINT chk_status 
CHECK (status IN ('a_vendre', 'vendu', 'a_louer'));
```

Et modifiez le code pour mapper les valeurs.

### 5. Vérifiez dans la console du navigateur (F12) :
- Ouvrez la console
- Essayez de modifier un bien
- Regardez les logs qui affichent le status exact envoyé

