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
          const staticLink = getServiceLink(item.title);
          return `
            <a href="${staticLink}"
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

  // ─── 5b. HELPER FOR STATIC NAVIGATION ──────────────────────────────────────
  function getServiceLink(title) {
    const t = title.toLowerCase();
    if (t.includes('9001')) return 'iso-9001-certification.html';
    if (t.includes('14001')) return 'iso-14001-certification.html';
    if (t.includes('45001')) return 'iso-45001-certification.html';
    if (t.includes('27001')) return 'iso-27001-certification.html';
    if (t.includes('22000')) return 'iso-22000-certification.html';
    if (t.includes('13485')) return 'iso-13485-certification.html';
    if (t.includes('50001')) return 'iso-50001-certification.html';
    if (t.includes('31000')) return 'iso-31000-consulting.html';
    if (t.includes('internal audit') || t.includes('audit services')) return 'internal-audit-services.html';
    if (t.includes('compliance')) return 'compliance-consulting.html';
    if (t.includes('governance')) return 'compliance-consulting.html';
    return 'index.html';
  }

  // ─── 6. MOBILE NAVIGATION DRAWER & ACCORDIONS ─────────────────────────────
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const menuClose  = document.getElementById('mobile-menu-close');
  const headerNav  = document.getElementById('header-nav');

  if (menuToggle && headerNav) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      headerNav.classList.add('open');
      menuToggle.setAttribute('aria-expanded', 'true');
    });
  }

  if (menuClose && headerNav) {
    menuClose.addEventListener('click', (e) => {
      e.stopPropagation();
      headerNav.classList.remove('open');
      if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
    });
  }

  // Close nav drawer when clicking outside it on mobile
  document.addEventListener('click', (e) => {
    if (headerNav && headerNav.classList.contains('open')) {
      if (!headerNav.contains(e.target) && e.target !== menuToggle && !menuToggle.contains(e.target)) {
        headerNav.classList.remove('open');
        if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
      }
    }
  });

  // Services Dropdown Toggle on Mobile
  const navDropdowns = document.querySelectorAll('.nav-dropdown');
  navDropdowns.forEach(dropdown => {
    const btn = dropdown.querySelector('button, .nav-link');
    if (btn) {
      btn.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          e.stopPropagation();
          dropdown.classList.toggle('open');
          const isOpen = dropdown.classList.contains('open');
          btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        }
      });
    }
  });

  // Category Block Accordion inside Mega Menu on Mobile
  const megaBlocks = document.querySelectorAll('.mega-category-block');
  megaBlocks.forEach(block => {
    const header = block.querySelector('h4');
    if (header) {
      header.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          e.stopPropagation();
          block.classList.toggle('open');
        }
      });
    }
  });

  // Language Selector Mobile Toggle
  const langSelector = document.querySelector('.lang-selector');
  if (langSelector) {
    const langBtn = langSelector.querySelector('#lang-btn');
    if (langBtn) {
      langBtn.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          e.stopPropagation();
          langSelector.classList.toggle('open');
          const isOpen = langSelector.classList.contains('open');
          langBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        }
      });
    }
  }

  // ─── 7. DYNAMIC HOMEPAGE ARTICLES ─────────────────────────────────────────
  const insightsGrid = document.querySelector('.insights-grid');
  if (insightsGrid && typeof articles !== 'undefined') {
    // Show only the first 3 articles on the homepage
    const homeArticles = articles.slice(0, 3);
    insightsGrid.innerHTML = homeArticles.map(art => `
      <a href="article.html?id=${art.id}" class="insight-card">
        <div class="insight-img">
          <span class="insight-tag ${art.tagClass}">${art.tagText}</span>
          <img src="${art.image}" alt="${art.title}">
        </div>
        <div class="insight-content">
          <div class="insight-date">${art.date} &nbsp;·&nbsp; ${art.readTime}</div>
          <h3 class="insight-title">${art.title}</h3>
          <p class="insight-excerpt">${art.excerpt}</p>
          <span class="insight-read-more">Read Article <i class="fas fa-arrow-right"></i></span>
        </div>
      </a>
    `).join('');
  }

  // ─── 8. STICKY CTA SCROLL TRIGGER ─────────────────────────────────────────
  const stickyCta = document.getElementById('sticky-cta-bar');
  if (stickyCta) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 600) {
        stickyCta.classList.add('visible');
      } else {
        stickyCta.classList.remove('visible');
      }
    }, { passive: true });
  }

  // ─── 9. CERTIFICATE REGISTRY SEARCH ───────────────────────────────────────
  const verBtn = document.getElementById('btn-verify-cert');
  const verInput = document.getElementById('cert-number');
  const verResults = document.getElementById('ver-results');

  if (verBtn && verInput && verResults) {
    verBtn.addEventListener('click', () => {
      const val = verInput.value.trim().toUpperCase();
      if (!val) {
        alert('Please enter a certificate number.');
        return;
      }

      // Hardcoded registry database for validation
      const certDb = {
        'MSR-QMS-2026-4891': { company: 'TechForge Solutions Pvt Ltd', standard: 'ISO 9001:2015 (QMS)', status: 'Active', issue: '14-Jan-2026', expiry: '13-Jan-2029', scope: 'Design, development, and deployment of enterprise SaaS and cloud infrastructure platforms.' },
        'MSR-ISMS-2026-9042': { company: 'Zenith Labs India', standard: 'ISO 27001:2022 (ISMS)', status: 'Active', issue: '22-Mar-2026', expiry: '21-Mar-2029', scope: 'Information security management for biotechnology research databases and clinical operations.' },
        'MSR-EMS-2026-3118': { company: 'Sunburst Energy Systems', standard: 'ISO 14001:2015 (EMS)', status: 'Active', issue: '05-Feb-2026', expiry: '04-Feb-2029', scope: 'Installation and management of commercial photovoltaic arrays and hybrid grids.' },
        'MSR-FSMS-2026-0722': { company: 'Organic Roots Foods LLP', standard: 'ISO 22000:2018 (FSMS)', status: 'Active', issue: '19-May-2026', expiry: '18-May-2029', scope: 'Processing, packaging, and supply chain logistics of organic spices and certified food products.' }
      };

      const cert = certDb[val] || certDb[val.replace(/\s+/g, '')];

      if (cert) {
        document.getElementById('r-company').textContent = cert.company;
        document.getElementById('r-standard').textContent = cert.standard;
        document.getElementById('r-status').textContent = cert.status;
        document.getElementById('r-issue').textContent = cert.issue;
        document.getElementById('r-expiry').textContent = cert.expiry;
        document.getElementById('r-scope').textContent = cert.scope;

        const statusEl = document.getElementById('r-status');
        statusEl.className = 'rg-val green';

        verResults.innerHTML = `
          <div class="registry-card" style="border-color: var(--success); background: #E8F5E9;">
            <div style="color: var(--success); font-weight: 700; display: flex; align-items: center; gap: 8px; font-size: 16px;">
              <i class="fas fa-circle-check"></i> Certificate Valid & Active
            </div>
            <div class="registry-grid">
              <div class="rg-item"><span class="rg-label">Certified Entity</span><span class="rg-val" id="r-company">${cert.company}</span></div>
              <div class="rg-item"><span class="rg-label">Standard Accreditation</span><span class="rg-val" id="r-standard">${cert.standard}</span></div>
              <div class="rg-item"><span class="rg-label">Registration Status</span><span class="rg-val green" id="r-status" style="color: var(--success); font-weight:700;">${cert.status}</span></div>
              <div class="rg-item"><span class="rg-label">Initial Date of Issue</span><span class="rg-val" id="r-issue">${cert.issue}</span></div>
              <div class="rg-item"><span class="rg-label">Registration Expiry</span><span class="rg-val" id="r-expiry">${cert.expiry}</span></div>
              <div class="rg-item" style="grid-column: span 2;"><span class="rg-label">Accredited Operational Scope</span><span class="rg-val" id="r-scope" style="font-size: 13.5px; line-height: 1.5; font-weight: 500;">${cert.scope}</span></div>
            </div>
          </div>
        `;
        verResults.classList.add('active');
        verResults.scrollIntoView({ behavior: 'smooth' });
      } else {
        verResults.innerHTML = `
          <div class="registry-card" style="border-color: #E74C3C; background: #FDEDEC;">
            <div style="color: #C0392B; font-weight: 700; display: flex; align-items: center; gap: 8px; font-size: 16px;">
              <i class="fas fa-circle-xmark"></i> Registry Matching Failed
            </div>
            <p style="font-size: 13.5px; margin-top: 10px; color: var(--text-mid); line-height: 1.6;">
              No records matched the certificate ID <strong>"${val}"</strong>. Please verify the registration number on your certificate document, check formatting, or query our central support desk at <a href="mailto:support@msrassessment.com" style="color: var(--primary); font-weight: 600; text-decoration: underline;">support@msrassessment.com</a>.
            </p>
          </div>
        `;
        verResults.classList.add('active');
      }
    });
  }

});
