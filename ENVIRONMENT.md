# Configuration de l'Environnement

## Variables d'Environnement

### Configuration n8n
```bash
VITE_N8N_ENDPOINT=http://localhost:5678/webhook-test/rag-agent
```

### Configuration Supabase (optionnel)
```bash
VITE_SUPABASE_URL=https://xiduvcxmtzpwgwmtsmzc.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Configuration Mapbox (optionnel)
```bash
VITE_MAPBOX_TOKEN=your_mapbox_token_here
```

## Lancement du Projet

### 1. Installation des dépendances
```bash
npm install
```

### 2. Lancement du site
```bash
npm run dev
```

### 3. Lancement de n8n (dans un terminal séparé)
```bash
# Windows (CMD)
set N8N_ENDPOINT_WEBHOOK_CORS_ALLOW_ORIGIN=http://localhost:8081
n8n

# Ou utiliser le script automatique
start-n8n.bat
```

## Scripts Disponibles

- `start-site.bat` : Lance automatiquement le site React
- `start-n8n.bat` : Lance n8n avec la configuration CORS

## Ports Utilisés

- **Site React** : http://localhost:8081 (ou 8080 si disponible)
- **n8n** : http://localhost:5678 