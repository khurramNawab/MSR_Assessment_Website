/**
 * MSR Assessment — service.js
 * Dynamically populates service.html from data.js
 */

document.addEventListener('DOMContentLoaded', () => {

  const params = new URLSearchParams(window.location.search);
  let serviceId = params.get('id');

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

  // Normalize legacy/mega-menu service IDs to match slugified titles in data.js
  const serviceIdMapping = {
    'agreements': 'agreements-contracts',
    'affidavits': 'affidavits-preparation',
    'moa-aoa': 'moa-aoa-drafting',
    'iso-audit': 'iso-audit-support',
    'risk-assessment': 'risk-assessment-inspection',
    'iso-9001': 'iso-9001-certification',
    'iso-14001': 'iso-14001-certification',
    'iso-27001': 'iso-27001-certification',
    'iso-45001': 'iso-45001-certification',
    'iso-22000': 'iso-22000-certification',
    'internal-audit': 'internal-audit-services',
    'compliance-audit': 'compliance-auditing',
    'seo-services': 'seo-sem-marketing-services-for-traffic-and-lead-generation'
  };

  if (serviceIdMapping[serviceId]) {
    serviceId = serviceIdMapping[serviceId];
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

  // ─── Favicon Injection ───────────────────────────────────────────────────
  if (!document.querySelector("link[rel~='icon']")) {
    const link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/png';
    link.href = 'msr.png';
    document.getElementsByTagName('head')[0].appendChild(link);
  }

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

  // Dynamic Expert Designation
  let expertDesignation = "CA / CS Professional";
  let benefitTitle = "Expert CA / CS Professional";
  let benefitDesc = "Handled by a fully qualified professional, not an assistant or automated system.";

  if (foundCat) {
    if (foundCat.id === 'digital') {
      expertDesignation = "Tech Lead / Web Developer";
      benefitTitle = "Expert Developer / Tech Lead";
      benefitDesc = "Handled by a fully qualified tech professional, not a junior developer or template auto-builder.";
    } else if (foundCat.id === 'ip') {
      expertDesignation = "Patent / Trademark Attorney";
      benefitTitle = "Expert IPR Attorney";
      benefitDesc = "Handled by qualified patent and trademark attorneys to protect your intellectual assets.";
    } else if (foundCat.id === 'training') {
      expertDesignation = "Lead Auditor & Trainer";
      benefitTitle = "Lead Auditor & Trainer";
      benefitDesc = "Delivered by certified lead auditors and compliance instructors.";
    } else if (foundCat.id === 'iso') {
      expertDesignation = "IRCA Lead Auditor";
      benefitTitle = "IRCA Certified Auditor";
      benefitDesc = "Conducted by IRCA registered lead auditors with global standards expertise.";
    } else if (foundCat.id === 'audit') {
      expertDesignation = "Chartered Accountant / Auditor";
      benefitTitle = "Chartered Accountant / Auditor";
      benefitDesc = "Conducted by a fully qualified Chartered Accountant or certified auditor.";
    } else if (foundCat.id === 'docs') {
      expertDesignation = "Legal Counsel / Drafting Expert";
      benefitTitle = "Expert Legal Advisor";
      benefitDesc = "Drafted by experienced legal counsels and corporate lawyers.";
    } else if (foundCat.id === 'compliance') {
      expertDesignation = "CS / Compliance Expert";
      benefitTitle = "CS & Legal Specialist";
      benefitDesc = "Handled by certified company secretaries and legal governance counsels.";
    } else if (foundCat.id === 'licenses') {
      expertDesignation = "Licensing Consultant";
      benefitTitle = "Licensing Consultant";
      benefitDesc = "Managed by registration professionals to ensure quick statutory approval.";
    }
  }

  setText('sscard-expert', expertDesignation);
  setText('benefit-expert-title', benefitTitle);
  setText('benefit-expert-desc', benefitDesc);

  let guaranteeText = "100% Compliance Guarantee — errors fixed at zero cost";
  if (foundCat) {
    if (foundCat.id === 'digital') {
      guaranteeText = "100% Delivery Guarantee — bug fixes & support at zero cost";
    } else if (foundCat.id === 'ip') {
      guaranteeText = "100% Filing Accuracy — robust protection for your brand";
    } else if (foundCat.id === 'iso') {
      guaranteeText = "100% Certification Guarantee — gap analysis ensures success";
    } else if (foundCat.id === 'audit') {
      guaranteeText = "100% Unbiased Auditing — identifying risks efficiently";
    } else if (foundCat.id === 'training') {
      guaranteeText = "100% Satisfaction — globally recognized training credentials";
    } else if (foundCat.id === 'docs') {
      guaranteeText = "100% Legally Binding — drafted securely for your protection";
    } else if (foundCat.id === 'inc') {
      guaranteeText = "100% Incorporation Guarantee — fast approval & secure setup";
    } else if (foundCat.id === 'licenses' || foundCat.id === 'compliance') {
      guaranteeText = "100% Compliance Guarantee — regulatory adherence at zero risk";
    }
  }
  setText('sscard-guarantee-text', guaranteeText);

  // Update label texts to support no-pricing requirement
  const priceMetaLabel = document.querySelector('.svc-meta-item:first-child .svc-meta-label');
  if (priceMetaLabel) priceMetaLabel.textContent = 'Pricing Model';

  const sidebarPriceLabel = document.querySelector('.sscard-price-label');
  if (sidebarPriceLabel) sidebarPriceLabel.textContent = 'Professional Advisory';

  // Update sidebar icon/badge with logo
  const badgeIcon = document.querySelector('.svc-cat-badge i');
  if (badgeIcon) {
    const imgLogo = document.createElement('img');
    imgLogo.src = 'msr.png';
    imgLogo.alt = 'MSR Logo';
    imgLogo.style.width = '18px';
    imgLogo.style.height = '18px';
    imgLogo.style.objectFit = 'contain';
    imgLogo.style.marginRight = '6px';
    // Optional: Make it look like an icon by dropping its brightness/coloring if needed, or leave it original
    badgeIcon.replaceWith(imgLogo);
  }

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
    bgMedia.style.opacity = '0.15';
    bgMedia.style.filter = 'blur(1px)';
    bgMedia.style.pointerEvents = 'none';
    bgMedia.style.zIndex = '0';
  }

  // About text
  const aboutEl = document.getElementById('svc-about-text');
  if (aboutEl) {
    let expertTeamDesc = "MSR Assessment Pvt Ltd's qualified CA, CS and CMA team manages the complete process on your behalf — from documentation to final certificate delivery — ensuring full compliance with Indian regulatory requirements.";

    if (foundCat) {
      if (foundCat.id === 'digital') {
        expertTeamDesc = "MSR Assessment Pvt Ltd's expert developers and digital strategists manage the complete project on your behalf — from UI/UX design to final launch — ensuring high performance and digital growth.";
      } else if (foundCat.id === 'ip') {
        expertTeamDesc = "MSR Assessment Pvt Ltd's qualified IP attorneys manage the complete process on your behalf — from trademark search to final registry approval — ensuring full protection of your intellectual assets.";
      } else if (foundCat.id === 'training') {
        expertTeamDesc = "MSR Assessment Pvt Ltd's certified lead trainers deliver comprehensive workshops and practical training — ensuring your team is fully equipped with required industry standards and compliance knowledge.";
      } else if (foundCat.id === 'iso' || foundCat.id === 'audit') {
        expertTeamDesc = "MSR Assessment Pvt Ltd's IRCA certified lead auditors and compliance experts manage the complete process on your behalf — from gap analysis to final accredited certification — ensuring global standard compliance.";
      } else if (foundCat.id === 'docs' || foundCat.id === 'compliance') {
        expertTeamDesc = "MSR Assessment Pvt Ltd's experienced legal counsels and company secretaries manage the complete process on your behalf — ensuring all statutory documents and governance frameworks are legally sound.";
      } else if (foundCat.id === 'licenses') {
        expertTeamDesc = "MSR Assessment Pvt Ltd's licensing consultants manage the complete process on your behalf — from application drafting to final approval — ensuring full compliance with state and central regulatory requirements.";
      }
    }

    aboutEl.textContent = `${foundService.desc} ${expertTeamDesc} Our experts have handled hundreds of similar cases and understand every nuance of this process.`;
  }

  // Expert Card Dynamic Updates
  const expertCardParagraph = document.querySelector('.expert-card p');
  const expertAssurances = document.querySelector('.expert-assurances');

  if (expertCardParagraph && foundCat) {
    let pText = "Every service is personally owned by a qualified CA, CS, or CMA — not a junior assistant. We've handled 5,000+ business compliance requirements since 2013.";
    let assurancesHtml = `
      <div class="ea-item"><i class="fas fa-check-circle"></i> Qualified CA, CS & CMA Professionals</div>
      <div class="ea-item"><i class="fas fa-check-circle"></i> Transparent, Fixed Pricing</div>
      <div class="ea-item"><i class="fas fa-check-circle"></i> 72-Hour Turnaround for Most Services</div>
      <div class="ea-item"><i class="fas fa-check-circle"></i> Pan-India Filing Capability</div>
      <div class="ea-item"><i class="fas fa-check-circle"></i> 100% Digital, No Office Visits</div>
      <div class="ea-item"><i class="fas fa-check-circle"></i> Dedicated Relationship Manager</div>
    `;

    if (foundCat.id === 'digital') {
      pText = "Every project is personally owned by a senior tech lead — not a junior developer. We've delivered 500+ successful digital projects since 2013.";
      assurancesHtml = `
        <div class="ea-item"><i class="fas fa-check-circle"></i> Expert Web & App Developers</div>
        <div class="ea-item"><i class="fas fa-check-circle"></i> Transparent, Milestone-Based Pricing</div>
        <div class="ea-item"><i class="fas fa-check-circle"></i> Fast & Agile Delivery Sprints</div>
        <div class="ea-item"><i class="fas fa-check-circle"></i> Premium UI/UX Standards</div>
        <div class="ea-item"><i class="fas fa-check-circle"></i> 100% Digital Collaboration</div>
        <div class="ea-item"><i class="fas fa-check-circle"></i> Dedicated Tech Project Manager</div>
      `;
    } else if (foundCat.id === 'ip') {
      pText = "Every filing is personally handled by an experienced IP Attorney. We've secured 2,000+ trademarks and patents since 2013.";
      assurancesHtml = `
        <div class="ea-item"><i class="fas fa-check-circle"></i> Qualified IP Attorneys</div>
        <div class="ea-item"><i class="fas fa-check-circle"></i> Transparent, Fixed Pricing</div>
        <div class="ea-item"><i class="fas fa-check-circle"></i> Rapid Filing & Status Updates</div>
        <div class="ea-item"><i class="fas fa-check-circle"></i> Pan-India Registry Capability</div>
        <div class="ea-item"><i class="fas fa-check-circle"></i> 100% Digital, No Office Visits</div>
        <div class="ea-item"><i class="fas fa-check-circle"></i> Dedicated Relationship Manager</div>
      `;
    } else if (foundCat.id === 'iso' || foundCat.id === 'audit' || foundCat.id === 'training') {
      pText = "Every assessment is led by an IRCA Certified Auditor. We've completed 5,000+ audits and certifications since 2013.";
      assurancesHtml = `
        <div class="ea-item"><i class="fas fa-check-circle"></i> IRCA Certified Lead Auditors</div>
        <div class="ea-item"><i class="fas fa-check-circle"></i> Transparent, Fixed Pricing</div>
        <div class="ea-item"><i class="fas fa-check-circle"></i> Fast-Track Audit Scheduling</div>
        <div class="ea-item"><i class="fas fa-check-circle"></i> Global Accreditation Standards</div>
        <div class="ea-item"><i class="fas fa-check-circle"></i> Comprehensive Gap Analysis</div>
        <div class="ea-item"><i class="fas fa-check-circle"></i> Dedicated Audit Coordinator</div>
      `;
    } else if (foundCat.id === 'docs' || foundCat.id === 'compliance' || foundCat.id === 'licenses') {
      pText = "Every filing is handled by a seasoned Legal Counsel or CS. We've managed 5,000+ business compliances since 2013.";
      assurancesHtml = `
        <div class="ea-item"><i class="fas fa-check-circle"></i> Legal & CS Professionals</div>
        <div class="ea-item"><i class="fas fa-check-circle"></i> Transparent, Fixed Pricing</div>
        <div class="ea-item"><i class="fas fa-check-circle"></i> Fast Processing Turnarounds</div>
        <div class="ea-item"><i class="fas fa-check-circle"></i> Pan-India Filing Capability</div>
        <div class="ea-item"><i class="fas fa-check-circle"></i> 100% Digital, No Office Visits</div>
        <div class="ea-item"><i class="fas fa-check-circle"></i> Dedicated Relationship Manager</div>
      `;
    }

    expertCardParagraph.textContent = pText;
    if (expertAssurances) expertAssurances.innerHTML = assurancesHtml;
  }

  // ─── Dynamic Benefits Grid Injection ───────────────────────────────────────
  const benefitsGrid = document.querySelector('.benefits-grid');
  if (benefitsGrid && foundCat) {
    const categoryBenefits = {
      iso: [
        { icon: "fa-certificate", isGold: false, title: "IRCA Certified Auditors", desc: "Audits conducted by globally recognized IRCA certified lead auditors." },
        { icon: "fa-bolt", isGold: true, title: "Fast-Track Certification", desc: "Streamlined processes to get your ISO certification rapidly without delays." },
        { icon: "fa-globe", isGold: false, title: "Global Recognition", desc: "Our ISO certificates are internationally accepted and IAF accredited." },
        { icon: "fa-rupee-sign", isGold: true, title: "Transparent Pricing", desc: "No hidden costs. All audit and certification fees disclosed upfront." },
        { icon: "fa-file-signature", isGold: false, title: "Complete Documentation", desc: "We draft all mandatory manuals, SOPs, and policies for compliance." },
        { icon: "fa-shield-check", isGold: true, title: "100% Success Rate", desc: "Guaranteed successful certification with pre-assessment gap analysis." }
      ],
      inc: [
        { icon: "fa-user-tie", isGold: false, title: "Expert CA/CS Assistance", desc: "Incorporation handled by practicing Chartered Accountants & Company Secretaries." },
        { icon: "fa-bolt", isGold: true, title: "Fast Execution", desc: "Company registration initiated same-day upon document submission." },
        { icon: "fa-building", isGold: false, title: "Name Approval Guarantee", desc: "Strategic RUN/SPICe+ name reservations to avoid MCA rejections." },
        { icon: "fa-rupee-sign", isGold: true, title: "All-Inclusive Packages", desc: "Includes DIN, DSC, Stamp Duty, and all Govt/Professional fees." },
        { icon: "fa-headset", isGold: false, title: "Dedicated Manager", desc: "Single point of contact for your entire company formation process." },
        { icon: "fa-file-invoice", isGold: true, title: "Post-Incorporation Setup", desc: "Assistance with PAN, TAN, GST, and Bank Account opening." }
      ],
      digital: [
        { icon: "fa-laptop-code", isGold: false, title: "Expert Tech Leads", desc: "Handled by senior full-stack developers and UI/UX designers, not templates." },
        { icon: "fa-rocket", isGold: true, title: "Rapid Deployment", desc: "Agile development cycles ensure your digital project goes live on schedule." },
        { icon: "fa-mobile-screen", isGold: false, title: "Responsive & Modern", desc: "Fully mobile-optimized designs using the latest web and app frameworks." },
        { icon: "fa-chart-line", isGold: true, title: "SEO & Growth Focused", desc: "Built with technical SEO best practices to ensure high search rankings." },
        { icon: "fa-code-branch", isGold: false, title: "Clean & Scalable Code", desc: "Enterprise-grade architecture that grows with your business needs." },
        { icon: "fa-headset", isGold: true, title: "Continuous Support", desc: "Post-launch maintenance and dedicated technical support teams." }
      ],
      ip: [
        { icon: "fa-trademark", isGold: false, title: "Specialized IP Attorneys", desc: "Drafting and filing performed by registered trademark and patent agents." },
        { icon: "fa-bolt", isGold: true, title: "Same-Day Filing", desc: "TM application filed and TM number generated within 24 hours." },
        { icon: "fa-search", isGold: false, title: "Comprehensive Search", desc: "In-depth trademark and patent registry searches to prevent objections." },
        { icon: "fa-rupee-sign", isGold: true, title: "Transparent Pricing", desc: "Fixed professional fees with government statutory fees explicitly stated." },
        { icon: "fa-gavel", isGold: false, title: "Objection Handling", desc: "Expert legal drafting and representation for registry objections and hearings." },
        { icon: "fa-shield-check", isGold: true, title: "Brand Protection", desc: "Complete legal security to stop competitors from copying your assets." }
      ],
      training: [
        { icon: "fa-chalkboard-user", isGold: false, title: "Industry Expert Trainers", desc: "Workshops led by veteran compliance officers and lead auditors." },
        { icon: "fa-users", isGold: true, title: "Interactive Sessions", desc: "Practical, hands-on training tailored to real-world corporate scenarios." },
        { icon: "fa-certificate", isGold: false, title: "Recognized Certifications", desc: "Participants receive valid certificates of completion and competence." },
        { icon: "fa-building", isGold: true, title: "On-Site & Virtual", desc: "Flexible training delivery at your corporate premises or via online seminars." },
        { icon: "fa-book-open", isGold: false, title: "Custom Study Material", desc: "Comprehensive manuals, checklists, and guides provided to attendees." },
        { icon: "fa-briefcase", isGold: true, title: "Corporate Alignment", desc: "Curriculum designed to align specifically with your organizational goals." }
      ],
      licenses: [
        { icon: "fa-user-tie", isGold: false, title: "Regulatory Experts", desc: "Handled by professionals with deep knowledge of licensing authorities." },
        { icon: "fa-bolt", isGold: true, title: "Fast-Track Processing", desc: "Expedited application submissions for immediate license approvals." },
        { icon: "fa-file-signature", isGold: false, title: "Flawless Documentation", desc: "We prepare, format, and verify all requisite forms to avoid rejections." },
        { icon: "fa-rupee-sign", isGold: true, title: "No Hidden Costs", desc: "Transparent pricing structure covering all departmental and advisory fees." },
        { icon: "fa-headset", isGold: false, title: "Liaison Support", desc: "We handle all follow-ups and queries with government departments." },
        { icon: "fa-shield-check", isGold: true, title: "Compliance Guarantee", desc: "100% legal adherence to municipal, state, and central regulations." }
      ],
      audit: [
        { icon: "fa-magnifying-glass-chart", isGold: false, title: "Certified Auditors", desc: "Independent assessments conducted by qualified internal auditors." },
        { icon: "fa-chart-pie", isGold: true, title: "Actionable Insights", desc: "Detailed audit reports highlighting risks and actionable improvement areas." },
        { icon: "fa-lock", isGold: false, title: "Strict Confidentiality", desc: "Your financial and operational data is secured with strict NDAs." },
        { icon: "fa-bullseye", isGold: true, title: "Objective Evaluation", desc: "Unbiased, third-party review of your organizational processes." },
        { icon: "fa-file-invoice", isGold: false, title: "Comprehensive Scope", desc: "Covering financial, operational, and regulatory compliance domains." },
        { icon: "fa-shield-check", isGold: true, title: "Risk Mitigation", desc: "Proactive identification of vulnerabilities before they impact your business." }
      ],
      docs: [
        { icon: "fa-pen-nib", isGold: false, title: "Legal Drafters", desc: "Contracts meticulously drafted by experienced corporate lawyers." },
        { icon: "fa-bolt", isGold: true, title: "Quick Turnaround", desc: "Rapid drafting of agreements without compromising on legal rigidity." },
        { icon: "fa-scale-balanced", isGold: false, title: "Legally Binding", desc: "Documents structured to be fully enforceable under Indian jurisdiction." },
        { icon: "fa-shield-halved", isGold: true, title: "Risk Protection", desc: "Clauses strategically designed to protect your corporate interests." },
        { icon: "fa-user-check", isGold: false, title: "Custom Tailored", desc: "Bespoke agreements tailored to your specific business arrangements." },
        { icon: "fa-arrows-rotate", isGold: true, title: "Revision Support", desc: "Includes modifications and adjustments based on stakeholder feedback." }
      ],
      compliance: [
        { icon: "fa-scale-unbalanced", isGold: false, title: "Corporate Experts", desc: "Advisory from seasoned Company Secretaries and Legal Consultants." },
        { icon: "fa-bell", isGold: true, title: "Timely Filings", desc: "Proactive alerts and on-time submissions for ROC and MCA deadlines." },
        { icon: "fa-file-shield", isGold: false, title: "Penalty Avoidance", desc: "Strategic compliance planning to save your business from hefty fines." },
        { icon: "fa-rupee-sign", isGold: true, title: "Fixed Retainers", desc: "Predictable, transparent annual compliance packages for peace of mind." },
        { icon: "fa-headset", isGold: false, title: "Ongoing Advisory", desc: "Continuous legal guidance for board meetings and corporate governance." },
        { icon: "fa-check-double", isGold: true, title: "100% Accuracy", desc: "Error-free filings guaranteed by multi-level professional reviews." }
      ]
    };

    const targetBenefits = categoryBenefits[foundCat.id] || categoryBenefits.inc;

    benefitsGrid.innerHTML = targetBenefits.map(b => `
      <div class="benefit-item">
        <div class="benefit-icon ${b.isGold ? 'gold' : ''}"><i class="fas ${b.icon}"></i></div>
        <div>
          <div class="benefit-title">${b.title}</div>
          <div class="benefit-desc">${b.desc}</div>
        </div>
      </div>
    `).join('');
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
  const docsList = document.getElementById('svc-docs-list') || document.querySelector('.docs-list');
  if (docsList) {
    if (foundService.documents && foundService.documents.length > 0) {
      // Rename heading for relevant categories to make more sense
      if (foundCat && ['digital', 'training', 'audit', 'docs'].includes(foundCat.id)) {
        const docsTitle = docsList.closest('.svc-content-section').querySelector('h3');
        if (docsTitle) docsTitle.innerHTML = '<i class="fas fa-layer-group"></i> Core Features & Offerings';
      }

      docsList.innerHTML = foundService.documents.map(doc => `
        <div class="doc-item"><i class="fas fa-file-invoice"></i> ${doc}</div>
      `).join('');
    } else {
      const parentSection = docsList.closest('.svc-content-section');
      if (parentSection) parentSection.style.display = 'none';
    }
  }

  // ─── Dynamic Process Injection ────────────────────────────────────────────
  const processSteps = document.getElementById('svc-process-steps') || document.querySelector('.process-steps');
  if (processSteps) {
    if (foundService.process && foundService.process.length > 0) {
      processSteps.innerHTML = foundService.process.map((step, idx) => `
        <div class="ps-item">
          <div class="ps-node">${idx + 1}</div>
          <div class="ps-body">
            <div class="ps-title">${step.title}</div>
            <p class="ps-desc">${step.desc}</p>
          </div>
        </div>
      `).join('');
    } else {
      const parentSection = processSteps.closest('.svc-content-section');
      if (parentSection) parentSection.style.display = 'none';
    }
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

  // ─── SEO Specific Overrides ───────────────────────────────────────────────
  if (slugify(foundService.title) === 'seo-sem-marketing-services-for-traffic-and-lead-generation') {
    // 1. Override About section
    const aboutTitle = document.querySelector('.svc-content-section h3 i.fa-info-circle')?.parentElement;
    if (aboutTitle) aboutTitle.innerHTML = '<i class="fas fa-info-circle"></i><h2>Benefits of SEO for Your Business</h2>';
    const aboutEl2 = document.getElementById('svc-about-text');
    if (aboutEl2) {
      aboutEl2.innerHTML = `
        <ol style="padding-left: 20px; text-align: left; margin-bottom: 0;">
          <li style="margin-bottom: 10px;">Increase your organic traffic by attracting targeted visitors who are actively searching for the products and services you offer.</li>
          <li style="margin-bottom: 10px;">Strengthen your brand authority by appearing in top search results and building trust and credibility within your industry.</li>
          <li style="margin-bottom: 10px;">Generate more qualified leads by connecting with potential customers who have a strong intent to purchase and engage with your business.</li>
          <li style="margin-bottom: 10px;">Achieve a higher return on investment compared to paid advertising, as SEO continues to drive traffic and leads even after the initial optimization efforts.</li>
          <li style="margin-bottom: 0;">Support sustainable business growth by creating a strong online presence that helps expand your reach and maintain a competitive advantage over time.</li>
        </ol>
      `;
    }

    // 2. Override Key Benefits to Our SEO Process
    const benefitsSection = document.querySelector('.benefits-grid')?.closest('.svc-content-section');
    if (benefitsSection) {
      const benefitsTitle = benefitsSection.querySelector('h3');
      if (benefitsTitle) benefitsTitle.innerHTML = '<i class="fas fa-check-circle"></i><h2> Our SEO Process</h2>';

      const bGrid = benefitsSection.querySelector('.benefits-grid');
      bGrid.innerHTML = `
        <div class="benefit-item">
          <div class="benefit-icon"><i class="fas fa-search"></i></div>
          <div><div class="benefit-title">Website Audit</div><div class="benefit-desc">Comprehensive analysis of your website's current performance.</div></div>
        </div>
        <div class="benefit-item">
          <div class="benefit-icon gold"><i class="fas fa-key"></i></div>
          <div><div class="benefit-title">Keyword Research</div><div class="benefit-desc">Identify high-value keywords with strong search intent.</div></div>
        </div>
        <div class="benefit-item">
          <div class="benefit-icon"><i class="fas fa-chess-knight"></i></div>
          <div><div class="benefit-title">Strategy Development</div><div class="benefit-desc">Create a customized SEO roadmap based on business goals.</div></div>
        </div>
        <div class="benefit-item">
          <div class="benefit-icon gold"><i class="fas fa-tools"></i></div>
          <div><div class="benefit-title">Optimization</div><div class="benefit-desc">Implement on-page, technical, and content improvements.</div></div>
        </div>
        <div class="benefit-item">
          <div class="benefit-icon"><i class="fas fa-link"></i></div>
          <div><div class="benefit-title">Link Building</div><div class="benefit-desc">Build quality backlinks and strengthen domain authority.</div></div>
        </div>
        <div class="benefit-item">
          <div class="benefit-icon gold"><i class="fas fa-chart-line"></i></div>
          <div><div class="benefit-title">Reporting & Monitoring</div><div class="benefit-desc">Track rankings, traffic, leads, and conversions with transparent monthly reports.</div></div>
        </div>
      `;
    }

    // 3. Override FAQ to Why MSR Assessment
    const faqSection = document.getElementById('svc-faq-list')?.closest('.svc-content-section');
    if (faqSection) {
      const faqTitle = faqSection.querySelector('h3');
      if (faqTitle) faqTitle.innerHTML = '<i class="fas fa-question-circle"></i> Why MSR Assessment Pvt. Ltd.?';

      const fList = document.getElementById('svc-faq-list');
      fList.innerHTML = `
        <ol style="padding-left: 20px; font-size: 14.5px; color: var(--text-muted); line-height: 2;">
          <li>Experienced SEO Professionals</li>
          <li>Data-Driven SEO Strategies</li>
          <li>Transparent Reporting</li>
          <li>Ethical White-Hat SEO Practices</li>
          <li>Industry-Specific Expertise</li>
          <li>Dedicated Support Team</li>
        </ol>
      `;
    }

    // Hide Process Section to avoid duplicate
    const processStepsSec = document.querySelector('.process-steps')?.closest('.svc-content-section');
    if (processStepsSec) processStepsSec.style.display = 'none';
  }

  // ─── Helper ───────────────────────────────────────────────────────────────
  function setText(id, value) {
    const el = document.getElementById(id);
    if (el && value) el.textContent = value;
  }

  function setNotFound() {
    window.location.replace('404.html');
  }

});
