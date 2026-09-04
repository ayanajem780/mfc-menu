/* ==========================================================================
   MFC — MENU DIGITAL 3D PREMIUM — logique de rendu & interactions
   Tout le contenu (produits, prix, catégories) vient de data.js.
   ========================================================================== */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;

  const productsByCategory = (id) => MFC_PRODUCTS.filter((p) => p.category === id);

  /* ------------------------------ helpers ------------------------------ */

  function el(tag, className, html) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (html !== undefined) node.innerHTML = html;
    return node;
  }

  function escapeHtml(str) {
    if (str == null) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function priceLabelFor(product) {
    if (product.priceLabel) return product.priceLabel;
    if (product.price != null) return product.price + ' DH';
    return '—';
  }

  /* --------------------------------- hero video --------------------------------- */

  function initHero() {
    const hero = document.getElementById('hero');
    const video = document.getElementById('heroVideo');
    if (!hero || !video) return;

    // Reduced motion: no autoplay, no parallax — the poster frame stands in
    // as a still, elegant fallback.
    if (prefersReducedMotion) {
      video.removeAttribute('autoplay');
      video.pause();
      return;
    }

    // Some browsers ignore the autoplay attribute until play() is called
    // from script; fail silently if the platform still blocks it (the
    // poster frame remains visible either way).
    const playAttempt = video.play();
    if (playAttempt && typeof playAttempt.catch === 'function') {
      playAttempt.catch(() => {});
    }

    // Subtle scroll depth: the video eases into a slightly tighter, higher
    // crop as the hero scrolls out — never enough to reveal an edge, since
    // the video is permanently oversized via CSS scale(1.06).
    let mouseX = 0;
    let mouseY = 0;
    let ticking = false;

    function render() {
      ticking = false;
      const heroH = hero.offsetHeight || 1;
      const scrollProgress = Math.max(0, Math.min(1, window.scrollY / heroH));
      const scale = 1.06 + scrollProgress * 0.05;
      const shiftY = scrollProgress * 26 + mouseY * 6;
      const shiftX = mouseX * 6;
      video.style.transform = `scale(${scale.toFixed(3)}) translate3d(${shiftX.toFixed(1)}px, ${shiftY.toFixed(1)}px, 0)`;
    }

    function requestRender() {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(render);
      }
    }

    window.addEventListener('scroll', requestRender, { passive: true });

    if (!isCoarsePointer) {
      hero.addEventListener('pointermove', (e) => {
        const r = hero.getBoundingClientRect();
        mouseX = (e.clientX - r.left) / r.width - 0.5;
        mouseY = (e.clientY - r.top) / r.height - 0.5;
        requestRender();
      });
      hero.addEventListener('pointerleave', () => {
        mouseX = 0;
        mouseY = 0;
        requestRender();
      });
    }

    requestRender();
  }

  /* ------------------------------ category nav ------------------------------ */

  function initNav() {
    const nav = document.getElementById('catNav');
    MFC_CATEGORIES.forEach((cat, i) => {
      const btn = el('button', 'catnav__btn' + (i === 0 ? ' is-active' : ''), escapeHtml(cat.label));
      btn.type = 'button';
      btn.dataset.target = cat.id;
      btn.addEventListener('click', () => {
        const target = document.getElementById('cat-' + cat.id);
        if (!target) return;
        const navH = document.querySelector('.catnav-wrap').offsetHeight;
        const y = target.getBoundingClientRect().top + window.pageYOffset - navH - 4;
        window.scrollTo({ top: y, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      });
      nav.appendChild(btn);
    });
  }

  function setActiveNav(id) {
    document.querySelectorAll('.catnav__btn').forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.target === id);
    });
  }

  /* ------------------------------ card builder ------------------------------ */

  function buildCard(product) {
    const card = el('article', 'card reveal' + (product.needsReview ? ' needs-review' : ''));
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', product.name);

    const media = el('div', 'card__media');
    const img = el('img');
    img.src = product.image;
    img.alt = product.name;
    img.loading = 'lazy';
    media.appendChild(img);
    if (product.badge) media.appendChild(el('span', 'card__badge', escapeHtml(product.badge)));
    if (product.people) media.appendChild(el('span', 'card__people', escapeHtml(product.people)));
    card.appendChild(media);

    const body = el('div', 'card__body');
    body.appendChild(el('h3', 'card__name', escapeHtml(product.name)));

    let metaText = '';
    if (product.ingredients && product.ingredients.length) {
      metaText = product.ingredients.join(' · ');
    } else if (product.options) {
      metaText = product.options
        .map((o) => o.name + (o.price != null ? ' ' + o.price + ' DH' : ''))
        .join(' · ');
    }
    if (metaText) body.appendChild(el('p', 'card__meta', escapeHtml(metaText)));
    if (product.needsReview) body.appendChild(el('span', 'pill-note', 'Prix à confirmer'));

    const footer = el('div', 'card__footer');
    footer.appendChild(el('span', 'card__price', escapeHtml(priceLabelFor(product))));
    const cta = el(
      'span',
      'card__cta',
      '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>'
    );
    footer.appendChild(cta);
    body.appendChild(footer);

    card.appendChild(body);

    card.addEventListener('click', () => openModal(product));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(product);
      }
    });

    if (!prefersReducedMotion && !isCoarsePointer) {
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(900px) rotateX(${(-py * 8).toFixed(2)}deg) rotateY(${(px * 8).toFixed(2)}deg) translateY(-4px)`;
      });
      card.addEventListener('pointerleave', () => {
        card.style.transform = '';
      });
    }

    return card;
  }

  /* --------------------------- category sections --------------------------- */

  function buildCategorySection(cat) {
    const section = el('section', 'category');
    section.id = 'cat-' + cat.id;

    section.appendChild(el('div', 'category__glow'));

    const head = el('div', 'category__head reveal');
    if (cat.id === 'twister-burgers') {
      /* Twister & Burgers only: the "MFC · 01" eyebrow is replaced with a
         slowly spinning 3D logo disc (pure CSS 3D, no library needed). */
      const logo3dWrap = el('div', 'logo3d-wrap');
      logo3dWrap.setAttribute('aria-hidden', 'true');
      const logo3d = el('div', 'logo3d');
      const front = el('div', 'logo3d__face logo3d__face--front');
      const frontImg = el('img');
      frontImg.src = 'images/logo/mfc-logo.png';
      frontImg.alt = '';
      front.appendChild(frontImg);
      const back = el('div', 'logo3d__face logo3d__face--back');
      const backImg = el('img');
      backImg.src = 'images/logo/mfc-logo.png';
      backImg.alt = '';
      back.appendChild(backImg);
      logo3d.appendChild(front);
      logo3d.appendChild(back);
      logo3dWrap.appendChild(logo3d);
      head.appendChild(logo3dWrap);
    } else {
      head.appendChild(el('p', 'eyebrow', 'MFC · ' + (cat.id === 'box' ? '02' : cat.id === 'big-box' ? '03' : '04')));
    }
    head.appendChild(el('h2', 'category__title', escapeHtml(cat.label)));
    head.appendChild(el('p', 'category__tagline', escapeHtml(cat.tagline)));
    section.appendChild(head);

    const products = productsByCategory(cat.id);

    const isTwisterBurgers = cat.id === 'twister-burgers';

    if (isTwisterBurgers) {
      /* Real product photos (red studio backdrop kept as-is, no cutout),
         shown as 3 separated cards (image + name + description) instead of
         an overlapping floating stage — leaves room to add a description
         under each one (edit the "description" field on that product in
         data.js and it will appear here automatically). */
      const trioIds = ['cadeau', 'regime', 'complet'];
      const trioGrid = el('div', 'trio-grid reveal');
      trioIds.forEach((id) => {
        const p = products.find((prod) => prod.id === id);
        if (!p) return;
        const card = el('div', 'trio-card');
        const media = el('div', 'trio-card__media');
        const img = el('img');
        img.src = p.image;
        img.alt = escapeHtml(p.name);
        img.loading = 'lazy';
        media.appendChild(img);
        card.appendChild(media);
        const body = el('div', 'trio-card__body');
        body.appendChild(el('h3', 'trio-card__name', escapeHtml(p.name)));
        if (p.description) {
          body.appendChild(el('p', 'trio-card__desc', escapeHtml(p.description)));
        }
        if (p.options && p.options.length) {
          const prices = el('div', 'trio-card__prices');
          p.options.forEach((o) => {
            const row = el('span', 'trio-card__price-row');
            row.appendChild(el('span', 'trio-card__price-name', escapeHtml(o.name)));
            row.appendChild(el('span', 'trio-card__price-val', o.price != null ? o.price + ' DH' : '—'));
            prices.appendChild(row);
          });
          body.appendChild(prices);
        }
        card.appendChild(body);
        trioGrid.appendChild(card);
      });
      section.appendChild(trioGrid);
    } else {
      const stage = el('div', 'category__stage reveal');
      const stagePicks = products.slice(0, 4);
      const slots = ['fi-a', 'fi-b', 'fi-c', 'fi-d'];
      stagePicks.forEach((p, i) => {
        const wrap = el('div', 'float-item ' + slots[i % slots.length]);
        const img = el('img');
        img.src = p.image;
        img.alt = '';
        img.loading = 'lazy';
        wrap.appendChild(img);
        stage.appendChild(wrap);
      });
      section.appendChild(stage);
    }

    const trioIds = ['cadeau', 'regime', 'complet'];
    const gridProducts = isTwisterBurgers
      ? products.filter((p) => !trioIds.includes(p.id))
      : products;

    const grid = el('div', 'grid');
    gridProducts.forEach((p) => grid.appendChild(buildCard(p)));
    section.appendChild(grid);

    return section;
  }

  function initCategories() {
    const wrap = document.getElementById('categories');
    MFC_CATEGORIES.forEach((cat) => {
      wrap.appendChild(buildCategorySection(cat));
    });
  }

  /* ---------------------------------- modal ---------------------------------- */

  const overlay = document.getElementById('modalOverlay');
  const modalImg = document.getElementById('modalImg');
  const modalCategory = document.getElementById('modalCategory');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalIngredients = document.getElementById('modalIngredients');
  const modalOptions = document.getElementById('modalOptions');
  const modalPrice = document.getElementById('modalPrice');
  const modalOrderBtn = document.getElementById('modalOrderBtn');
  const modalClose = document.getElementById('modalClose');

  let lastFocused = null;

  function openModal(product) {
    lastFocused = document.activeElement;

    modalImg.src = product.image;
    modalImg.alt = product.name;

    const cat = MFC_CATEGORIES.find((c) => c.id === product.category);
    modalCategory.textContent = cat ? cat.label : '';

    modalTitle.textContent = product.name;

    modalDesc.textContent = product.description || (product.people ? 'Format ' + product.people + '.' : '');
    modalDesc.style.display = modalDesc.textContent ? '' : 'none';

    modalIngredients.innerHTML = '';
    if (product.ingredients && product.ingredients.length) {
      product.ingredients.forEach((ing) => {
        modalIngredients.appendChild(el('li', null, escapeHtml(ing)));
      });
      modalIngredients.style.display = '';
    } else {
      modalIngredients.style.display = 'none';
    }

    modalOptions.innerHTML = '';
    if (product.options && product.options.length) {
      modalOptions.style.display = '';
      product.options.forEach((opt, i) => {
        const btn = el(
          'button',
          'modal__option' + (i === 0 ? ' is-selected' : ''),
          `<span class="opt-name">${escapeHtml(opt.name)}</span><span class="opt-price">${opt.price != null ? opt.price + ' DH' : '—'}</span>`
        );
        btn.type = 'button';
        btn.addEventListener('click', () => {
          modalOptions.querySelectorAll('.modal__option').forEach((b) => b.classList.remove('is-selected'));
          btn.classList.add('is-selected');
          modalPrice.textContent = opt.price != null ? opt.price + ' DH' : 'Prix à confirmer';
        });
        modalOptions.appendChild(btn);
      });
      const first = product.options[0];
      modalPrice.textContent = first.price != null ? first.price + ' DH' : 'Prix à confirmer';
    } else {
      modalOptions.style.display = 'none';
      modalPrice.textContent = priceLabelFor(product);
    }

    modalOrderBtn.href = 'tel:' + MFC_ORDER_PHONE;

    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    modalClose.focus();
  }

  function closeModal() {
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  }

  modalClose.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) closeModal();
  });

  /* --------------------------------- reveal + nav sync --------------------------------- */

  function initObservers() {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: '0px 0px -6% 0px' }
    );
    document.querySelectorAll('.reveal').forEach((node) => revealObserver.observe(node));

    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id.replace('cat-', '');
            setActiveNav(id);
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    MFC_CATEGORIES.forEach((cat) => {
      const node = document.getElementById('cat-' + cat.id);
      if (node) navObserver.observe(node);
    });
  }

  /* ----------------------------------- init ----------------------------------- */

  document.addEventListener('DOMContentLoaded', () => {
    initHero();
    initNav();
    initCategories();
    initObservers();
  });
})();
