# Guide des Meta Tags Premium pour Facebook/Google

## ✅ Meta Tags Ajoutés

### 1. og:url (URL Canonique)
**Ajouté :** ✅
```html
<meta property="og:url" content="https://votre-domaine.com/politique-confidentialite" />
```

**Utilité :**
- Indique l'URL canonique de la page
- Améliore l'apparence du lien partagé sur Facebook
- Peut faire disparaître le triangle rouge dans les paramètres Facebook
- Aide à éviter les problèmes de duplication de contenu

**Implémentation :** 
- URL générée dynamiquement à partir de `window.location.origin + window.location.pathname`
- S'adapte automatiquement à votre domaine (Lovable ou domaine personnalisé)

### 2. og:type (Type de Contenu)
**Déjà présent :** ✅
```html
<meta property="og:type" content="website" />
```

**Utilité :**
- Indique à Facebook que c'est un site web
- Améliore le rendu du partage
- Standard Open Graph

### 3. fb:app_id (App ID Facebook) - Optionnel
**Préparé :** ✅ (Commenté, à activer si vous avez un App ID)

```html
<meta property="fb:app_id" content="VOTRE_APP_ID" />
```

**Utilité :**
- Améliore l'intégration avec Facebook
- Permet d'utiliser les Insights Facebook
- Peut faire disparaître le triangle rouge dans les paramètres
- Nécessite un App Facebook créé sur https://developers.facebook.com/

**Comment l'activer :**
1. Créez une App Facebook sur https://developers.facebook.com/
2. Notez votre App ID
3. Dans `src/pages/PolitiqueConfidentialite.tsx`, décommentez les lignes 82-90
4. Remplacez `'YOUR_FB_APP_ID'` par votre App ID réel

**Exemple :**
```typescript
const fbAppId = document.querySelector('meta[property="fb:app_id"]');
if (!fbAppId) {
  const meta = document.createElement('meta');
  meta.setAttribute('property', 'fb:app_id');
  meta.content = '1234567890123456'; // Votre App ID
  document.head.appendChild(meta);
}
```

## 📋 Meta Tags Complets Actuellement Configurés

### Open Graph (Facebook)
- ✅ `og:title` - Titre de la page
- ✅ `og:description` - Description de la page
- ✅ `og:type` - Type de contenu (website)
- ✅ `og:url` - URL canonique
- ✅ `og:image` - Image de prévisualisation (utilise favicon par défaut)

### SEO Standard
- ✅ `meta description` - Description pour les moteurs de recherche
- ✅ `meta robots` - Indexation (index, follow)
- ✅ `lang` - Langue (fr)

### Facebook Spécifique (Optionnel)
- ⚠️ `fb:app_id` - App ID Facebook (à activer si disponible)

## 🎯 Améliorations Recommandées

### 1. Image Open Graph Optimisée
Pour un meilleur rendu sur Facebook, créez une image spécifique :
- **Dimensions :** 1200x630px (ratio 1.91:1)
- **Format :** JPG ou PNG
- **Taille :** < 1MB
- **Contenu :** Logo + texte "Politique de Confidentialité - AMI IMMOBILIER"

**Placement :**
- Option 1 : Dans `public/og-privacy-policy.png`
- Option 2 : URL absolue vers votre CDN

**Mise à jour du code :**
```typescript
meta.content = window.location.origin + '/og-privacy-policy.png';
```

### 2. Twitter Cards (Bonus)
Pour améliorer aussi le partage sur Twitter :
```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Politique de Confidentialité - AMI IMMOBILIER" />
<meta name="twitter:description" content="..." />
<meta name="twitter:image" content="..." />
```

### 3. Schema.org Markup (Bonus)
Pour améliorer le SEO Google :
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Politique de Confidentialité",
  "description": "...",
  "url": "..."
}
</script>
```

## 🧪 Test des Meta Tags

### Facebook Sharing Debugger
1. Aller sur : https://developers.facebook.com/tools/debug/
2. Coller votre URL
3. Cliquer sur "Scraper"
4. Vérifier que tous les meta tags sont détectés

**Vérifications :**
- ✅ og:title présent
- ✅ og:description présent
- ✅ og:url présent
- ✅ og:type présent
- ✅ og:image présent (si configuré)
- ✅ fb:app_id présent (si configuré)

### Google Rich Results Test
1. Aller sur : https://search.google.com/test/rich-results
2. Coller votre URL
3. Vérifier les résultats

## 📝 Checklist Finale

- [x] og:url ajouté (URL dynamique)
- [x] og:type présent (website)
- [ ] fb:app_id activé (si vous avez un App ID)
- [ ] Image og:image optimisée (1200x630px)
- [ ] Testé avec Facebook Sharing Debugger
- [ ] Testé avec Google Rich Results

## 🔗 Ressources

- **Facebook Sharing Debugger :** https://developers.facebook.com/tools/debug/
- **Open Graph Protocol :** https://ogp.me/
- **Facebook App Creation :** https://developers.facebook.com/apps/
- **Google Rich Results Test :** https://search.google.com/test/rich-results

---

**Note :** Les meta tags og:url et og:type sont maintenant configurés. Pour activer fb:app_id, suivez les instructions ci-dessus.

