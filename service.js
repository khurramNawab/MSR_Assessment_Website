/**
 * MSR Assessment — service.js
 * Dynamically populates service.html from data.js
 */

document.addEventListener('DOMContentLoaded', () => {

  const params    = new URLSearchParams(window.location.search);
  let serviceId   = params.get('id');

  // ─── Filename-based routing if no query param ────────────────────────────
  if (!serviceId) {
    const path = window.location.pathname;
    const file = path.substring(path.lastIndexOf('/') + 1);
    if (file && file.endsWith('.html') && file !== 'service.html') {
      serviceId = file.replace('.html', '');
    }
  }

  // ─── Fallback: no service ID ──────────────────────────────────────────────
  if (!serviceId) {
    setNotFound();
    return;
  }

  // ─── Find service in data ─────────────────────────────────────────────────
  let foundService = null;
  let foundCat = null;

  for (const catKey in subData) {
    const match = subData[catKey].find(item => slugify(item.title) === serviceId);
    if (match) {
      foundService = match;
      foundCat = categories.find(c => c.id === catKey);
      break;
    }
  }

  if (!foundService) { setNotFound(); return; }

  // ─── Populate page ────────────────────────────────────────────────────────
  const catTitle = foundCat ? foundCat.title : 'Services';

  // Page title & meta
  document.title = `${foundService.title} | MSR Assessment Pvt Ltd`;

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', `${foundService.title} — ${foundService.desc} Contact us for custom quotation. Expert CA/CS professionals. MSR Assessment Pvt Ltd.`);

  // Hero fields
  setText('svc-title', foundService.title);
  setText('svc-desc', foundService.desc);
  setText('svc-price', 'Get Customized Quote');
  setText('svc-time', foundService.time);
  setText('svc-category', catTitle);
  setText('svc-category-label', catTitle);

  // Sidebar
  setText('sscard-price', 'Quote on Request');
  setText('sscard-time', foundService.time);

  // Update label texts to support no-pricing requirement
  const priceMetaLabel = document.querySelector('.svc-meta-item:first-child .svc-meta-label');
  if (priceMetaLabel) priceMetaLabel.textContent = 'Pricing Model';

  const sidebarPriceLabel = document.querySelector('.sscard-price-label');
  if (sidebarPriceLabel) sidebarPriceLabel.textContent = 'Professional Advisory';

  // Update sidebar icon
  const iconEl = document.querySelector('.svc-cat-badge i');
  if (iconEl && foundService.icon) iconEl.className = `fas ${foundService.icon}`;

  // Set hero section background based on category
  const heroSection = document.querySelector('.svc-page-hero');
  if (heroSection && foundCat) {
    let bgImage = 'assets/elegant_executive_board_room_with_glass_doors_and_professional_seating.png';
    if (foundCat.id === 'digital') {
      bgImage = 'assets/abstract_high_end_technology_background_with_glowing_floor_lines_in_a_dark.png';
    } else if (foundCat.id === 'inc') {
      bgImage = 'assets/high_end_corporate_still_life_photography_of_a_professional_wax_seal_on_a.png';
    } else if (foundCat.id === 'ip') {
      bgImage = 'assets/two_professional_businessmen_in_suits_shaking_hands_in_a_high_rise_office.png';
    } else if (foundCat.id === 'iso') {
      bgImage = 'assets/global_business_map_visualization_with_data_nodes_and_connections_styliz.png';
    }
    
    let bgMedia = heroSection.querySelector('.svc-hero-bg-media');
    if (!bgMedia) {
      bgMedia = document.createElement('div');
      bgMedia.className = 'svc-hero-bg-media';
      heroSection.prepend(bgMedia);
    }
    
    // Style bgMedia inline for visual excellence
    bgMedia.style.position = 'absolute';
    bgMedia.style.inset = '0';
    bgMedia.style.backgroundImage = `url('${bgImage}')`;
    bgMedia.style.backgroundSize = 'cover';
    bgMedia.style.backgroundPosition = 'center';
    bgMedia.style.backgroundRepeat = 'no-repeat';
    bgMedia.style.opacity = '0.04';
    bgMedia.style.filter = 'blur(1.5px)';
    bgMedia.style.pointerEvents = 'none';
    bgMedia.style.zIndex = '0';
  }

  // About text
  const aboutEl = document.getElementById('svc-about-text');
  if (aboutEl) {
    aboutEl.textContent = `${foundService.desc} MSR Assessment Pvt Ltd's qualified CA and CS team manages the complete process on your behalf — from documentation to final certificate delivery — ensuring full compliance with Indian regulatory requirements. Our experts have handled hundreds of similar cases and understand every nuance of this filing process.`;
  }

  // Pre-fill inquiry modal
  const hiddenSvc = document.getElementById('inq-service-pre');
  if (hiddenSvc) hiddenSvc.value = foundService.title;
  const msgField = document.getElementById('inq-message');
  if (msgField) msgField.value = `I am interested in: ${foundService.title}. Please contact me with more details.`;

  // ─── Dynamic Eligibility Injection ─────────────────────────────────────────
  const eligibilitySection = document.getElementById('svc-eligibility-section');
  const eligibilityList = document.getElementById('svc-eligibility-list');
  if (eligibilitySection && eligibilityList) {
    if (foundService.eligibility && foundService.eligibility.length > 0) {
      eligibilityList.innerHTML = foundService.eligibility.map(item => `
        <li><i class="fas fa-check-circle"></i> ${item}</li>
      `).join('');
      eligibilitySection.style.display = 'block';
    } else {
      eligibilitySection.style.display = 'none';
    }
  }

  // ─── Dynamic Documents Injection ──────────────────────────────────────────
  const docsList = document.getElementById('svc-docs-list');
  if (docsList && foundService.documents && foundService.documents.length > 0) {
    docsList.innerHTML = foundService.documents.map(doc => `
      <div class="doc-item"><i class="fas fa-file-invoice"></i> ${doc}</div>
    `).join('');
  }

  // ─── Dynamic Process Injection ────────────────────────────────────────────
  const processSteps = document.getElementById('svc-process-steps');
  if (processSteps && foundService.process && foundService.process.length > 0) {
    processSteps.innerHTML = foundService.process.map((step, idx) => `
      <div class="ps-item">
        <div class="ps-node">${idx + 1}</div>
        <div class="ps-body">
          <div class="ps-title">${step.title}</div>
          <p class="ps-desc">${step.desc}</p>
        </div>
      </div>
    `).join('');
  }

  // ─── Dynamic FAQs Injection ───────────────────────────────────────────────
  const faqList = document.getElementById('svc-faq-list');
  if (faqList && foundService.faqs && foundService.faqs.length > 0) {
    faqList.innerHTML = foundService.faqs.map(faq => `
      <div class="faq-item">
        <button class="faq-question">
          ${faq.q}
          <i class="fas fa-chevron-down"></i>
        </button>
        <div class="faq-answer">
          ${faq.a}
        </div>
      </div>
    `).join('');

    // Handle FAQ Accordion clicks via event delegation
    faqList.addEventListener('click', (e) => {
      const questionBtn = e.target.closest('.faq-question');
      if (!questionBtn) return;
      const item = questionBtn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  }

  // ─── Related Services ─────────────────────────────────────────────────────
  const relatedGrid = document.getElementById('related-grid');
  if (relatedGrid && foundCat) {
    const others = subData[foundCat.id]
      .filter(item => slugify(item.title) !== serviceId)
      .slice(0, 3);

    if (others.length > 0) {
      relatedGrid.innerHTML = others.map(item => `
        <a href="service.html?id=${slugify(item.title)}" class="related-card">
          <div class="related-icon"><i class="fas ${item.icon}"></i></div>
          <div>
            <div class="related-title">${item.title}</div>
            <div class="related-time"><i class="far fa-clock" style="font-size:10px;margin-right:4px;color:var(--accent);"></i>${item.time}</div>
          </div>
        </a>
      `).join('');
    } else {
      const parent = relatedGrid.closest('.svc-content-section');
      if (parent) parent.style.display = 'none';
    }
  }

  // ─── Helper ───────────────────────────────────────────────────────────────
  function setText(id, value) {
    const el = document.getElementById(id);
    if (el && value) el.textContent = value;
  }

  function setNotFound() {
    setText('svc-title', 'Service Not Found');
    setText('svc-desc', 'The service you are looking for does not exist or may have been moved. Please return to the services page.');
  }

});
