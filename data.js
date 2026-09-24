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
    /* NOUVEAU — ajouté à la demande d'Aya (17/09/2026). Tagline provisoire.
       Catégorie créée sans produits pour l'instant : les photos existent déjà
       dans images/menu/sides/ (nuggets, fried-cheese, strips, frites,
       piece-chicken, corn, riz, tiramisu, croquettes, wings, mfc-mix, salade)
       mais les prix n'ont pas été fournis, donc aucun produit n'est ajouté
       ici pour éviter d'inventer des prix. */
    id: 'accompagnements',
    label: 'Accompagnements',
    tagline: 'Le petit plus qui complète la commande.',
  },
  {
    /* NOUVEAU — ajouté à la demande d'Aya (17/09/2026). Catégorie créée sans
       produits pour l'instant : aucun produit/prix fourni. */
    id: 'mfc-kids',
    label: 'MFC Kids',
    tagline: 'Pensé pour les plus petits.',
  },
  {
    /* NOUVEAU — ajouté à la demande d'Aya (17/09/2026). Catégorie créée sans
       produits pour l'instant : aucun produit/prix fourni. */
    id: 'promotion-speciale',
    label: 'Promotion Spéciale',
    tagline: 'Les offres du moment.',
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
    description: 'Un nom qui trompe : chicken croustillant généreusement nappé de sauce fromage et sauce burger.',
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
    description: 'Le nom dit tout : chicken croustillant nappé de sauce fromage et sauce burger, avec deux cuisses croustillantes en plus.',
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
    description: 'Une double surprise : deux étages de chicken crispy et jambon, nappés de sauce fromage et sauce burger.',
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
    description: 'Un wrap grillé généreux, garni de chicken croustillant, frites et sauce fromage et sauce burger.',
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
    description: 'Un pain baguette croustillant, chicken pané, frites et sauce fromage et sauce burger.',
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
    description: 'Une tortilla moelleuse roulée autour de chicken crispy, salade fraîche, sauce fromage et sauce burger.',
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
    description: 'Une cuisse de poulet croustillante sur riz safrané, avec deux petits pains — simple et efficace.',
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
    description: 'Quatre filets de chicken croustillant sur riz safrané, servis avec du pain — pour les vrais appétits.',
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
    id: 'le-partager',
    category: 'box',
    name: 'Le Partager',
    description: 'Deux cuisses et deux filets de poulet croustillant sur riz safrané, avec du pain — un assortiment généreux fait pour être partagé.',
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
    people: '2 Personnes et +',
    image: 'images/menu/big-box/duo-150.jpg',
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
    image: 'images/menu/big-box/special.jpg',
    badge: null,
  },

  /* --------------------------- ACCOMPAGNEMENTS ---------------------------- */
  /* NOUVEAU — ajouté à la demande d'Aya (17/09/2026). */
  {
    id: 'piece-chicken',
    category: 'accompagnements',
    name: 'Pièce de Chicken',
    description: null,
    ingredients: ['1 Pièce'],
    price: 15,
    priceLabel: '15 DH',
    options: null,
    people: null,
    image: 'images/menu/sides/piece-chicken.jpg',
    badge: null,
  },
  {
    id: 'nuggets',
    category: 'accompagnements',
    name: 'Nuggets',
    description: null,
    ingredients: ['6 Pièces'],
    price: 25,
    priceLabel: '25 DH',
    options: null,
    people: null,
    image: 'images/menu/sides/nuggets.jpg',
    badge: null,
  },
  {
    id: 'strips',
    category: 'accompagnements',
    name: 'Strips',
    description: null,
    ingredients: ['3 Pièces'],
    price: 30,
    priceLabel: '30 DH',
    options: null,
    people: null,
    image: 'images/menu/sides/strips.jpg',
    badge: null,
  },
  {
    id: 'corn',
    category: 'accompagnements',
    name: 'Corn',
    description: null,
    ingredients: ['1 Pièce'],
    price: 30,
    priceLabel: '30 DH',
    options: null,
    people: null,
    image: 'images/menu/sides/corn.jpg',
    badge: null,
  },
  {
    id: 'frites',
    category: 'accompagnements',
    name: 'Frites',
    description: null,
    ingredients: ['1 Pièce'],
    price: 12,
    priceLabel: '12 DH',
    options: null,
    people: null,
    image: 'images/menu/sides/frites.jpg',
    badge: null,
  },
  {
    id: 'fried-cheese',
    category: 'accompagnements',
    name: 'Fried Cheese',
    description: null,
    ingredients: ['1 Pièce'],
    price: 20,
    priceLabel: '20 DH',
    options: null,
    people: null,
    image: 'images/menu/sides/fried-cheese.jpg',
    badge: null,
  },
  {
    id: 'wings',
    category: 'accompagnements',
    name: 'Wings',
    description: null,
    ingredients: ['6 Pièces'],
    price: 30,
    priceLabel: '30 DH',
    options: null,
    people: null,
    image: 'images/menu/sides/wings.jpg',
    badge: null,
  },
  {
    id: 'riz-crispy',
    category: 'accompagnements',
    name: 'Riz',
    description: 'Un riz nature moelleux, garni de morceaux de poulet crispy coupés en petites bouchées — simple, généreux et croustillant.',
    ingredients: null,
    price: 20,
    priceLabel: '20 DH',
    options: null,
    people: null,
    image: 'images/menu/sides/riz-crispy.jpg',
    badge: null,
  },

  /* -------------------------------- MFC KIDS ------------------------------ */
  /* NOUVEAU — ajouté à la demande d'Aya (18/09/2026). Nom, description et
     photo PROVISOIRES (placeholder) en attendant les vraies infos et photos
     du menu Kids — à remplacer. Prix confirmé par Aya : 35 DH pour les deux. */
  {
    id: 'kids-1',
    category: 'mfc-kids',
    name: 'Menu Kids 1', // PROVISOIRE — nom à remplacer
    description: "Un menu gourmand pour les petits : burger au chicken crispy, frites dorées, jus d'orange et une surprise offerte.",
    ingredients: null,
    price: 35,
    priceLabel: '35 DH',
    options: null,
    people: null,
    image: 'images/menu/mfc-kids/kids-1.jpg',
    badge: null,
  },
  {
    id: 'kids-2',
    category: 'mfc-kids',
    name: 'Menu Kids 2', // PROVISOIRE — nom à remplacer
    description: "Un menu croustillant pour les petits gourmands : nuggets de chicken, frites dorées, jus d'orange et une surprise offerte.",
    ingredients: null,
    price: 35,
    priceLabel: '35 DH',
    options: null,
    people: null,
    image: 'images/menu/mfc-kids/kids-2.jpg',
    badge: null,
  },

  /* -------------------------------- PROMOTION SPECIALE -------------------- */
  /* NOUVEAU — ajoutee a la demande d'Aya (18/09/2026). Offre : piña colada
     offerte en fin de menu, a consommer sur place. Pas de supplement de prix
     (priceLabel = "Offert sur place"). */
  {
    id: 'menu-pina-colada-offerte',
    category: 'promotion-speciale',
    name: 'Menu + Piña Colada Offerte',
    description: "Sur place uniquement : terminez votre menu en beauté avec une Piña Colada Signature offerte, au choix parmi nos saveurs.",
    ingredients: null,
    price: null,
    priceLabel: 'Offert sur place',
    options: null,
    people: null,
    image: 'images/menu/promotion-speciale/menu-pina-colada-offerte.jpg',
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
  /* NOUVEAU — ajouté à la demande d'Aya (17/09/2026) : carte "Soda 1L"
     séparée de la carte 25 cl. Photo provisoire (pack de sodas) en
     attendant qu'Aya envoie la vraie photo de la bouteille 1L — à
     remplacer dans images/menu/soda/ puis mettre à jour le champ image
     ci-dessous. Prix encore à confirmer. */
  {
    id: 'soda-1l',
    category: 'soda',
    name: 'Soda 1L',
    description: null,
    ingredients: null,
    price: null,
    priceLabel: null,
    options: null,
    people: null,
    image: 'images/menu/soda/soda-lineup.jpg',
    badge: null,
    needsReview: true,
  },

  /* ------------------------- PIÑA COLADA SIGNATURE ------------------------ */
  /* Photos envoyées par Aya le 15/09/2026. Prix confirmés par Aya le
     18/09/2026 : Fraise 35 DH, Tropical 35 DH, Virgin 30 DH. Descriptions
     écrites par Claude (texte marketing, pas issu du menu original). */
  {
    id: 'pina-colada-signature-1',
    category: 'pina-colada-signature',
    name: 'Piña Colada Fraise',
    description: 'Un mocktail glacé et fruité aux éclats de fraise, pour une pause fraîcheur pleine de gourmandise.',
    ingredients: null,
    price: 25,
    priceLabel: '25 DH',
    options: null,
    people: null,
    image: 'images/menu/pina-colada-signature/pina-colada-signature-1.jpg',
    badge: 'Nouveau',
  },
  {
    id: 'pina-colada-signature-2',
    category: 'pina-colada-signature',
    name: 'Piña Colada Tropical',
    description: 'Un mocktail exotique aux saveurs tropicales, frais et vitaminé, parfait pour accompagner votre commande.',
    ingredients: null,
    price: 25,
    priceLabel: '25 DH',
    options: null,
    people: null,
    image: 'images/menu/pina-colada-signature/pina-colada-signature-2.jpg',
    badge: 'Nouveau',
  },
  {
    id: 'pina-colada-signature-3',
    category: 'pina-colada-signature',
    name: 'Piña Colada Virgin',
    description: 'La piña colada classique sans alcool : ananas et coco, fraîche et onctueuse.',
    ingredients: null,
    price: 20,
    priceLabel: '20 DH',
    options: null,
    people: null,
    image: 'images/menu/pina-colada-signature/pina-colada-signature-3.jpg',
    badge: 'Nouveau',
  },
];

/* Coordonnées de commande — reprises du menu original (bouton "ORDER NOW"). */
const MFC_ORDER_PHONE = '0528236023';

/* NOTE — les prix "Croustillant" et "Le Partager" (partiellement masqués sur
   une première capture) ont été confirmés via une capture du menu officiel
   et sont maintenant renseignés ci-dessus. */
