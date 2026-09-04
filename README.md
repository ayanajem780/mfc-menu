# MFC — Menu Digital 3D Premium

Site statique (HTML / CSS / JS, sans dépendance) : le nouveau menu digital immersif de MFC.

## Structure

```
index.html          → structure de la page (hero, nav, sections, modale, footer)
styles.css          → tout le design (palette, typographie, animations, responsive)
script.js           → rendu des catégories/produits depuis data.js + interactions
data.js             → SOURCE DE VÉRITÉ des produits (nom, prix, description, image...)
images/menu/        → photos produits, rangées par catégorie
images/hero/         → image de secours (poster) du Hero vidéo
videos/hero.mp4      → vidéo du Hero (H.264, compatible partout)
videos/hero.webm     → même vidéo, format WebM (plus léger sur Chrome/Firefox/Edge)
```

## Modifier le menu

Tout le contenu vient de `data.js`. Pour changer un prix, un nom, ajouter une
option ou un produit : éditez ce fichier, rien d'autre à toucher. Chaque
produit a ce format :

```js
{
  id: 'regime',
  category: 'twister-burgers',   // 'twister-burgers' | 'box' | 'big-box' | 'sides'
  name: 'Régime',
  description: null,             // texte libre si besoin
  ingredients: null,             // ex: ['8 Pièces chicken', '2 Frites', ...]
  price: 35,
  priceLabel: '35 DH',
  options: [{ name: 'Seul', price: 35 }, { name: 'Menu', price: 42 }],
  people: null,                  // ex: '2 Personnes'
  image: 'images/menu/twister-burgers/regime.jpg',
  badge: null,
}
```

## ⚠️ 2 prix à confirmer

Sur la capture d'écran fournie, la barre de réponse Instagram cachait
partiellement les prix de **Croustillant** et **Le Partager** (colonnes
Seul / Menu). Ils sont affichés comme "Prix à confirmer" dans le site — dès
que vous avez les vrais montants, mettez-les à jour dans `data.js` (champs
`price`, `priceLabel` et `options`), et retirez `needsReview: true`.

## Photos produits

Les images viennent d'un recadrage du menu que vous avez fourni (résolution
d'origine limitée, car issue d'une capture Instagram). Pour un rendu encore
plus premium, remplacez les fichiers dans `images/menu/<categorie>/` par de
la vraie photographie produit en haute résolution — les noms de fichiers et
les chemins dans `data.js` restent identiques, il suffit d'écraser les
fichiers.

## Aucune boisson

Comme demandé, la catégorie Boissons a été entièrement retirée de
l'interface. Les box/big box qui incluent "1L Boisson" dans leur composition
d'origine conservent cette mention dans la liste d'ingrédients (c'est une
information sur le contenu du repas, pas un produit boisson à part entière)
— si vous préférez la masquer aussi, supprimez la ligne `'1L Boisson'` dans
`data.js` pour DUO, FIDELITY et ENSEMBLE.

## Vidéo du Hero

Le Hero (première page) affiche votre vidéo en plein écran, en fond, avec le
titre "MENU" / "Made to crave." par-dessus. Fichiers concernés :
`videos/hero.mp4`, `videos/hero.webm`, `images/hero/hero-poster.jpg`
(l'image affichée le temps que la vidéo charge, et pour les visiteurs qui
limitent les animations).

Pour remplacer la vidéo par une nouvelle version plus tard, ré-exportez-la
au même format (H.264 muet, ~900px de large suffit pour un fond de Hero) et
écrasez `videos/hero.mp4` / `videos/hero.webm` en gardant exactement ces
noms de fichiers — rien d'autre à changer.

Comportement : lecture automatique, muette, en boucle, avec une entrée en
fondu et un léger effet de profondeur au scroll/à la souris. Si la vidéo ne
peut pas se lancer (connexion lente, navigateur qui bloque l'autoplay), la
première image (`hero-poster.jpg`) reste affichée proprement à la place.

## Déployer (Vercel)

```
git init
git add .
git commit -m "Menu digital 3D premium MFC"
git push
```

Puis importez le repo dans Vercel (site 100% statique, aucune configuration
de build nécessaire).

## Performance & 3D

Pas de Three.js / WebGL : la sensation "3D premium" vient de transforms CSS
(perspective, rotateX/Y, translateZ), d'un léger parallax souris/scroll et
d'un tilt gyroscope sur mobile — léger, rapide, et qui fonctionne partout
sans modèle 3D à charger. `prefers-reduced-motion` désactive automatiquement
les animations pour les visiteurs qui le demandent.
