# AMI Immobilier

Site web vitrine pour AMI Immobilier, agence immobilière en Algérie.

## Description

Application React + TypeScript + Vite permettant de présenter les biens immobiliers (appartements, villas, terrains) disponibles à la vente ou à la location en Algérie.

## Stack Technique

- **Framework** : React 18 + TypeScript
- **Build Tool** : Vite 5
- **Styling** : Tailwind CSS + shadcn/ui
- **Base de données** : Supabase
- **Authentification** : Supabase Auth
- **Cartes** : Google Maps API
- **Animations** : Framer Motion
- **Déploiement** : Vercel

## Prérequis

- Node.js 18+ 
- npm ou yarn
- Compte Supabase
- Clés API Google Maps (optionnel)

## Installation

```bash
# Cloner le repository
git clone <repo-url>
cd AMI_IMMOBILIER_SITE

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env
# Éditer .env avec vos clés Supabase

# Lancer en mode développement
npm run dev
```

## Variables d'environnement

Créer un fichier `.env` à la racine :

```env
VITE_SUPABASE_URL=https://votre-projet.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=votre-cle-publique
```

## Scripts disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Lancer le serveur de développement |
| `npm run build` | Build pour production |
| `npm run preview` | Prévisualiser le build |
| `npm run lint` | Lancer ESLint |

## Structure du projet

```
src/
├── assets/           # Images, polices, fichiers statiques
├── components/       # Composants React réutilisables
│   ├── crm/         # Composants du CRM
│   └── ui/          # Composants UI (shadcn)
├── hooks/           # Custom React hooks
├── integrations/    # Configurations externes (Supabase)
├── lib/             # Utilitaires
├── pages/           # Pages de l'application
├── types/           # Types TypeScript
└── utils/           # Fonctions utilitaires
```

## Fonctionnalités

- Catalogue de biens immobiliers avec filtres avancés
- Fiches détaillées des biens (photos, vidéos, caractéristiques)
- CRM pour la gestion des biens
- Système de comparaison de biens
- Favoris et partage
- Formulaire de contact et prise de rendez-vous
- Chatbot intégré
- Design responsive (mobile-first)

## Déploiement

Le projet est configuré pour être déployé sur Vercel :

1. Connecter le repository GitHub à Vercel
2. Configurer les variables d'environnement dans le dashboard Vercel
3. Déployer

Configuration build sur Vercel :
- **Framework Preset** : Vite
- **Build Command** : `npm run build`
- **Output Directory** : `dist`

## Licence

© 2025 AMI Immobilier. Tous droits réservés.
Développé par Si Smail Racim.
