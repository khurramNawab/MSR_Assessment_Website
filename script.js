/**
 * MSR Assessment — script.js
 * Homepage interactions, counters, service grid rendering
 */

document.addEventListener('DOMContentLoaded', () => {

  // ─── 1. HEADER SCROLL EFFECT ───────────────────────────────────────────────
  const header = document.getElementById('site-header');
  if (header) {
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ─── 2. SCROLL REVEAL ───────────────────────────────────────────────────────
  const revealEls = document.querySelectorAll('[data-reveal]');
  if (revealEls.length > 0) {
    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.07, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => revealObs.observe(el));
  }

  // ─── 3. COUNT-UP ANIMATION ─────────────────────────────────────────────────
  const counters = document.querySelectorAll('.count-up');
  if (counters.length > 0) {
    const countObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'), 10);
        let start = 0;
        const duration = 1400;
        const startTime = performance.now();
        const tick = (now) => {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          start = Math.floor(eased * target);
          el.textContent = start.toLocaleString('en-IN');
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        countObs.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(c => countObs.observe(c));
  }

  // ─── 4. MODAL & POPUP LOGIC ────────────────────────────────────────────────
  const modal = document.getElementById('inquiry-modal');
  const openModal = () => { if (modal) modal.classList.add('open'); };
  const closeModal = () => { if (modal) modal.classList.remove('open'); };

  // All inquiry trigger buttons
  ['btn-inquiry', 'hero-inquiry-btn', 'cta-inquiry-btn'].forEach(id => {
    const btn = document.getElementById(id);
    if (btn) btn.addEventListener('click', openModal);
  });

  // Contact Us navbar links
  document.querySelectorAll('.nav-contact-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  // Close button
  const closeBtn = document.getElementById('modal-close-btn');
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  // Click backdrop to close
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  // Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
      closeWelcomePopup();
    }
  });

  // Footer contact link
  const footerContact = document.getElementById('footer-contact');
  if (footerContact) footerContact.addEventListener('click', (e) => {
    e.preventDefault(); openModal();
  });

  // ─── 4b. WELCOME POPUP LOGIC ─────────────────────────────────────────────
  const welcomePopup = document.getElementById('welcome-popup');
  const closeWelcomePopup = () => { if (welcomePopup) welcomePopup.classList.remove('open'); };

  if (welcomePopup) {
    // Show popup once per session after 1.2s delay
    if (!sessionStorage.getItem('welcome-popup-seen')) {
      setTimeout(() => {
        welcomePopup.classList.add('open');
        sessionStorage.setItem('welcome-popup-seen', 'true');
      }, 1200);
    }

    // Close on X click
    const wpClose = document.getElementById('wp-close-btn');
    if (wpClose) wpClose.addEventListener('click', closeWelcomePopup);

    // Close on Explore Services click and scroll to section
    const wpExplore = document.getElementById('wp-action-explore');
    if (wpExplore) {
      wpExplore.addEventListener('click', () => {
        closeWelcomePopup();
        const svcSection = document.getElementById('services-section');
        if (svcSection) {
          svcSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }

    // Close and open expert inquiry modal
    const wpExpert = document.getElementById('wp-action-expert');
    if (wpExpert) {
      wpExpert.addEventListener('click', () => {
        closeWelcomePopup();
        openModal();
      });
    }

    // Click backdrop to close
    welcomePopup.addEventListener('click', (e) => {
      if (e.target === welcomePopup) closeWelcomePopup();
    });
  }

  // ─── 5. SERVICE TABS & BENTO GRID ──────────────────────────────────────────
  const tabsContainer = document.getElementById('svc-tabs');
  const bentoGrid     = document.getElementById('bento-grid');
  const catTitle      = document.getElementById('svc-cat-title');
  const catDesc       = document.getElementById('svc-cat-desc');
  const countBadge    = document.getElementById('svc-count');

  if (tabsContainer && bentoGrid && typeof categories !== 'undefined') {

    // Build tabs
    categories.forEach((cat, idx) => {
      const btn = document.createElement('button');
      btn.className = 'svc-tab' + (idx === 0 ? ' active' : '');
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', idx === 0 ? 'true' : 'false');
      btn.setAttribute('data-cat', cat.id);
      btn.innerHTML = `<i class="fas ${cat.icon}"></i> ${cat.title}`;
      btn.addEventListener('click', () => switchCategory(cat.id, btn));
      tabsContainer.appendChild(btn);
    });

    // Initial render
    const firstCat = categories[0];
    renderBento(firstCat.id, firstCat.title, firstCat.desc);

    function switchCategory(catId, clickedBtn) {
      document.querySelectorAll('.svc-tab').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      clickedBtn.classList.add('active');
      clickedBtn.setAttribute('aria-selected', 'true');

      const cat = categories.find(c => c.id === catId);
      if (cat) renderBento(cat.id, cat.title, cat.desc);
    }

    function renderBento(catId, title, desc) {
      const items = subData[catId];
      if (!items) return;

      bentoGrid.classList.add('fading');

      setTimeout(() => {
        catTitle.textContent = title;
        catDesc.textContent  = desc;
        countBadge.textContent = `${items.length} service${items.length !== 1 ? 's' : ''}`;

        bentoGrid.innerHTML = items.map((item, i) => {
          const num = String(i + 1).padStart(2, '0');
          return `
            <a href="service.html?id=${slugify(item.title)}"
               class="bento-card${item.isLarge ? ' feature' : ''}"
               role="listitem"
               aria-label="${item.title}">
              <div class="card-header-row">
                <span class="card-num">${num}</span>
                <div class="card-icon" aria-hidden="true"><i class="fas ${item.icon}"></i></div>
              </div>
              <div class="card-body">
                <h3 class="card-title">${item.title}</h3>
                <p class="card-desc">${item.desc}</p>
              </div>
              <div class="card-footer">
                <span class="card-time"><i class="far fa-clock"></i> ${item.time}</span>
                <span class="card-link">Explore <i class="fas fa-arrow-right"></i></span>
              </div>
            </a>
          `;
        }).join('');

        bentoGrid.classList.remove('fading');
      }, 200);
    }
  }

});
