/* ==========================================================================
   MFC — DONNÉES DU MENU
   Source de vérité : menu réel MFC (capture d'écran fournie par le client).
   Ne pas inventer de produits, prix, descriptions ou ingrédients.
   Structure volontairement simple pour être modifiée facilement plus tard.

   Champs par produit :
   - id            : identifiant unique (slug)
   - category      : 'twister-burgers' | 'box' | 'big-box'
   - name          : nom du produit (tel quel dans le menu original)
   - description   : texte descriptif si présent dans le menu original (sinon null)
   - ingredients   : liste du contenu si présent dans le menu original (sinon null)
   - price         : prix de base en DH (nombre)
   - priceLabel    : affichage du prix tel qu'imprimé ("150 DH", etc.)
   - options       : variantes de prix ("Seul" / "Menu") si présentes, sinon null
   - people        : nombre de personnes si indiqué ("2 Personnes"...), sinon null
   - image         : chemin vers la photo issue du menu original
   - badge         : badge éventuel du menu original (aucun trouvé actuellement)
   - needsReview   : true si une valeur du menu original était partiellement
                      illisible/coupée sur la capture fournie (voir note en fin de fichier)
   ========================================================================== */

const MFC_CATEGORIES = [
  {
    id: 'twister-burgers',
    label: 'Twister & Burgers',
    tagline: 'Croustillant. Généreux. Signature.',
  },
  {
    id: 'box',
    label: 'Box',
    tagline: 'Le repas complet, prêt à partager.',
  },
  {
    id: 'big-box',
    label: 'Big Box',
    tagline: 'Pour les grandes tablées et les grandes faims.',
  },
  {
    /* NOUVEAU — ajouté à la demande d'Aya (15/09/2026). Tagline provisoire,
       à modifier si besoin : ce n'est pas un texte tiré du menu original. */
    id: 'soda',
    label: 'Soda',
    tagline: 'La fraîcheur qui accompagne chaque commande.',
  },
  {
    /* NOUVEAU — ajouté à la demande d'Aya (15/09/2026). Tagline provisoire,
       à modifier si besoin : ce n'est pas un texte tiré du menu original. */
    id: 'pina-colada-signature',
    label: 'Piña Colada Signature',
    tagline: 'La touche exotique signée MFC.',
  },
];

const MFC_PRODUCTS = [
  /* ---------------------- TWISTER & BURGERS ---------------------- */
  {
    id: 'regime',
    category: 'twister-burgers',
    name: 'Régime',
    description: null,
    ingredients: null,
    price: 35,
    priceLabel: '35 DH',
    options: [
      { name: 'Seul', price: 35 },
      { name: 'Menu', price: 42 },
    ],
    people: null,
    image: 'images/menu/twister-burgers/regime.jpg',
    badge: null,
  },
  {
    id: 'complet',
    category: 'twister-burgers',
    name: 'Complet',
    description: null,
    ingredients: null,
    price: 58,
    priceLabel: '58 DH',
    options: [
      { name: 'Seul', price: 58 },
      { name: 'Menu', price: 74 },
    ],
    people: null,
    image: 'images/menu/twister-burgers/complet.jpg',
    badge: null,
  },
  {
    id: 'cadeau',
    category: 'twister-burgers',
    name: 'Cadeau',
    description: null,
    ingredients: null,
    price: 55,
    priceLabel: '55 DH',
    options: [
      { name: 'Seul', price: 55 },
      { name: 'Menu', price: 68 },
    ],
    people: null,
    image: 'images/menu/twister-burgers/cadeau.jpg',
    badge: null,
  },
  {
    id: 'le-crispy',
    category: 'twister-burgers',
    name: 'Le Crispy',
    description: null,
    ingredients: null,
    price: 38,
    priceLabel: '38 DH',
    options: [
      { name: 'Seul', price: 38 },
      { name: 'Menu', price: 45 },
    ],
    people: null,
    image: 'images/menu/twister-burgers/crispy.jpg',
    badge: null,
  },
  {
    id: 'le-crunchy',
    category: 'twister-burgers',
    name: 'Le Crunchy',
    description: null,
    ingredients: null,
    price: 40,
    priceLabel: '40 DH',
    options: [
      { name: 'Seul', price: 40 },
      { name: 'Menu', price: 55 },
    ],
    people: null,
    image: 'images/menu/twister-burgers/crunchy.jpg',
    badge: null,
  },
  {
    id: 'mfc-wrap',
    category: 'twister-burgers',
    name: 'MFC Wrap',
    description: null,
    ingredients: null,
    price: 35,
    priceLabel: '35 DH',
    options: [
      { name: 'Seul', price: 35 },
      { name: 'Menu', price: 42 },
    ],
    people: null,
    image: 'images/menu/twister-burgers/wrap.jpg',
    badge: null,
  },

  /* ------------------------------- BOX ---------------------------- */
  {
    id: 'rapide',
    category: 'box',
    name: 'Rapide',
    description: null,
    ingredients: null,
    price: 35,
    priceLabel: '35 DH',
    options: [
      { name: 'Seul', price: 35 },
      { name: 'Menu', price: 42 },
    ],
    people: null,
    image: 'images/menu/twister-burgers/rapide.jpg',
    badge: null,
  },
  {
    id: 'le-chef',
    category: 'box',
    name: 'Le Chef',
    description: null,
    ingredients: null,
    price: 60,
    priceLabel: '60 DH',
    options: [
      { name: 'Seul', price: 60 },
      { name: 'Menu', price: 70 },
    ],
    people: null,
    image: 'images/menu/twister-burgers/chef.jpg',
    badge: null,
  },
  {
    id: 'croustillant',
    category: 'box',
    name: 'Croustillant',
    description: null,
    ingredients: null,
    price: 40,
    priceLabel: '40 DH',
    options: [
      { name: 'Seul', price: 40 },
      { name: 'Menu', price: 55 },
    ],
    people: null,
    image: 'images/menu/twister-burgers/croustillant.jpg',
    badge: null,
  },
  {
    id: 'le-partager',
    category: 'box',
    name: 'Le Partager',
    description: null,
    ingredients: null,
    price: 60,
    priceLabel: '60 DH',
    options: [
      { name: 'Seul', price: 60 },
      { name: 'Menu', price: 70 },
    ],
    people: null,
    image: 'images/menu/twister-burgers/partager.jpg',
    badge: null,
  },

  /* ----------------------------- BIG BOX --------------------------- */
  {
    id: 'duo',
    category: 'big-box',
    name: 'Duo',
    description: null,
    ingredients: ['8 Pièces chicken', '2 Frites', '4 Buns', '2 Riz Chili', '1L Boisson'],
    price: 150,
    priceLabel: '150 DH',
    options: null,
    people: '2 Personnes',
    image: 'images/menu/big-box/family-bucket-large.jpg',
    badge: null,
  },
  {
    id: 'ensemble',
    category: 'big-box',
    name: 'Ensemble',
    description: null,
    ingredients: ['12 Pièces chicken', '4 Frites', '8 Buns', '4 Riz Chili', '1L Boisson'],
    price: 280,
    priceLabel: '280 DH',
    options: null,
    people: '4 Personnes',
    image: 'images/menu/big-box/family-bucket-large.jpg',
    badge: null,
  },
  {
    id: 'fidelity',
    category: 'big-box',
    name: 'Fidelity',
    description: null,
    ingredients: ['10 Pièces chicken', '3 Frites', '6 Buns', '3 Riz Chili', '1L Boisson'],
    price: 200,
    priceLabel: '200 DH',
    options: null,
    people: '3 Personnes',
    image: 'images/menu/big-box/family-bucket-large.jpg',
    badge: null,
  },
  {
    id: 'special',
    category: 'big-box',
    name: 'Special',
    description: null,
    ingredients: ['6 Pièces chicken', '4 Fillets', '4 Pains', '4 Sauces'],
    price: 100,
    priceLabel: '100 DH',
    options: null,
    people: null,
    image: 'images/menu/big-box/family-bucket-large.jpg',
    badge: null,
  },

  /* -------------------------------- SODA --------------------------------- */
  /* NOUVEAU — ajouté à la demande d'Aya (15/09/2026), regroupé en une seule
     fiche "Soda" le 15/09/2026 : une carte dans le menu, et au clic une
     liste des 4 boissons (champ "variants") — cliquer sur une boisson
     l'affiche seule dans la fenêtre. Prix encore à confirmer pour chacune. */
  {
    id: 'soda',
    category: 'soda',
    name: 'Soda 250 ml (25 cl)',
    description: null,
    ingredients: null,
    price: null,
    priceLabel: null,
    options: null,
    people: null,
    image: 'images/menu/soda/soda-lineup.jpg',
    badge: null,
    needsReview: true,
    variants: [
      { id: 'soda-coca', name: 'Coca-Cola', image: 'images/menu/soda/coca-cola.jpg', price: null, priceLabel: null },
      { id: 'soda-fanta', name: 'Fanta', image: 'images/menu/soda/fanta.jpg', price: null, priceLabel: null },
      { id: 'soda-sprite', name: 'Sprite', image: 'images/menu/soda/sprite.jpg', price: null, priceLabel: null },
      { id: 'soda-hawai', name: 'Hawaï Tropical', image: 'images/menu/soda/hawai-tropical.jpg', price: null, priceLabel: null },
    ],
  },

  /* ------------------------- PIÑA COLADA SIGNATURE ------------------------ */
  /* NOUVEAU — ajouté à la demande d'Aya (15/09/2026). 3 fiches, photos
     envoyées par Aya le 15/09/2026. Noms et prix encore provisoires : à
     remplacer dès qu'elle envoie les infos exactes (needsReview -> pastille
     "Prix à confirmer"). */
  {
    id: 'pina-colada-signature-1',
    category: 'pina-colada-signature',
    name: 'Piña Colada Fraise',
    description: null,
    ingredients: null,
    price: null,
    priceLabel: null,
    options: null,
    people: null,
    image: 'images/menu/pina-colada-signature/pina-colada-signature-1.jpg',
    badge: null,
    needsReview: true,
  },
  {
    id: 'pina-colada-signature-2',
    category: 'pina-colada-signature',
    name: 'Piña Colada Tropical',
    description: null,
    ingredients: null,
    price: null,
    priceLabel: null,
    options: null,
    people: null,
    image: 'images/menu/pina-colada-signature/pina-colada-signature-2.jpg',
    badge: null,
    needsReview: true,
  },
  {
    id: 'pina-colada-signature-3',
    category: 'pina-colada-signature',
    name: 'Piña Colada Virgin',
    description: null,
    ingredients: null,
    price: null,
    priceLabel: null,
    options: null,
    people: null,
    image: 'images/menu/pina-colada-signature/pina-colada-signature-3.jpg',
    badge: null,
    needsReview: true,
  },
];

/* Coordonnées de commande — reprises du menu original (bouton "ORDER NOW"). */
const MFC_ORDER_PHONE = '0528236023';

/* NOTE — les prix "Croustillant" et "Le Partager" (partiellement masqués sur
   une première capture) ont été confirmés via une capture du menu officiel
   et sont maintenant renseignés ci-dessus. */
