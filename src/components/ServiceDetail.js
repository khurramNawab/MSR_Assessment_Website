"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { subData, categories, slugify } from '@/data/servicesData';
import { notFound } from 'next/navigation';

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
  'seo-services': 'search-engine-marketing-services-for-traffic-lead-generation',
  'search-engine-marketing-services': 'search-engine-marketing-services-for-traffic-lead-generation',
  'Search-engine-marketing-services': 'search-engine-marketing-services-for-traffic-lead-generation',
  // New service slug aliases — old header/legacy URLs mapped to new canonical item.id slugs
  'mobile-app-development': 'mobile-application',
  'e-commerce-development': 'ecommerce-web-development',
  'branding-design': 'brand-identity-design',
  'brand-identity': 'brand-identity-design',
  'patent-filing': 'patent-application-india',
  'trademark-registration': 'register-trademark-online',
  'web-development-services': 'web-development'
};

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

export default function ServiceDetail({ serviceId }) {
  const { locale, t, translateService, translateCategory } = useLanguage();
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // Normalize ID
  let normalizedId = serviceId;
  if (serviceIdMapping[normalizedId]) {
    normalizedId = serviceIdMapping[normalizedId];
  }

  // Find Service
  let foundService = null;
  let foundCat = null;
  let rawCatKey = '';

  for (const catKey in subData) {
    const match = subData[catKey].find(item =>
      (item.id && item.id === normalizedId) || slugify(item.title) === normalizedId
    );
    if (match) {
      foundService = match;
      rawCatKey = catKey;
      foundCat = categories.find(c => c.id === catKey);
      break;
    }
  }

  // Effect to handle scroll reveal animations (simulates legacy data-reveal)
  useEffect(() => {
    const revealEls = document.querySelectorAll('[data-reveal]');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('revealed');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.07 });
    revealEls.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [serviceId]);

  if (!foundService) {
    notFound();
  }

  // Translate
  const service = translateService(foundService.title, foundService);
  const category = foundCat ? translateCategory(rawCatKey, foundCat) : { title: t('Services'), id: '' };

  const isSEOOverride = normalizedId === 'search-engine-marketing-services-for-traffic-lead-generation';

  // Dynamic Expert Designation
  let expertDesignation = foundService.expertAssigned || t("CA / CS Professional");
  let benefitTitle = foundService.expertAssigned ? t(`Expert ${foundService.expertAssigned}`) : t("Expert CA / CS Professional");
  let benefitDesc = t("Handled by a fully qualified professional, not an assistant or automated system.");

  if (!foundService.expertAssigned && category.id === 'digital') {
    expertDesignation = t("Tech Lead / Web Developer");
    benefitTitle = t("Expert Developer / Tech Lead");
    benefitDesc = t("Handled by a fully qualified tech professional, not a junior developer or template auto-builder.");
  } else if (!foundService.expertAssigned && category.id === 'ip') {
    expertDesignation = t("Patent / Trademark Attorney");
    benefitTitle = t("Expert IPR Attorney");
    benefitDesc = t("Handled by qualified patent and trademark attorneys to protect your intellectual assets.");
  } else if (category.id === 'training') {
    expertDesignation = t("Lead Auditor & Trainer");
    benefitTitle = t("Lead Auditor & Trainer");
    benefitDesc = t("Delivered by certified lead auditors and compliance instructors.");
  } else if (category.id === 'iso') {
    expertDesignation = t("IRCA Lead Auditor");
    benefitTitle = t("IRCA Certified Auditor");
    benefitDesc = t("Conducted by IRCA registered lead auditors with global standards expertise.");
  } else if (category.id === 'audit') {
    expertDesignation = t("Chartered Accountant / Auditor");
    benefitTitle = t("Chartered Accountant / Auditor");
    benefitDesc = t("Conducted by a fully qualified Chartered Accountant or certified auditor.");
  } else if (category.id === 'docs') {
    expertDesignation = t("Legal Counsel / Drafting Expert");
    benefitTitle = t("Expert Legal Advisor");
    benefitDesc = t("Drafted by experienced legal counsels and corporate lawyers.");
  } else if (category.id === 'compliance') {
    expertDesignation = t("CS / Compliance Expert");
    benefitTitle = t("CS & Legal Specialist");
    benefitDesc = t("Handled by certified company secretaries and legal governance counsels.");
  } else if (category.id === 'licenses') {
    expertDesignation = t("Licensing Consultant");
    benefitTitle = t("Licensing Consultant");
    benefitDesc = t("Managed by registration professionals to ensure quick statutory approval.");
  }

  const displayTitle = normalizedId === 'register-company-name' ? t("Company Registration in India") 
    : normalizedId === 'llp-registration-india' ? t("LLP Registration in India")
    : service.title;
  const displayDesc = normalizedId === 'register-company-name' ? t("Everything You Need for Company Registration, Brand Name Registration and Startup Registration in India") 
    : normalizedId === 'llp-registration-india' ? t("Looking for LLP Registration in India? Register your Limited Liability Partnership online with end-to-end assistance, quick processing, and expert guidance.")
    : service.desc;
  const displayTime = normalizedId === 'register-company-name' ? t("7 to 10 days") : (service.time || '--');
  const displayExpert = normalizedId === 'register-company-name' ? t("CA/CS") : expertDesignation;

  let guaranteeText = t("100% Compliance Guarantee — errors fixed at zero cost");
  if (category.id === 'digital') {
    guaranteeText = t("100% Delivery Guarantee — bug fixes & support at zero cost");
  } else if (category.id === 'ip') {
    guaranteeText = t("100% Filing Accuracy — robust protection for your brand");
  } else if (category.id === 'iso') {
    guaranteeText = t("100% Certification Guarantee — gap analysis ensures success");
  } else if (category.id === 'audit') {
    guaranteeText = t("100% Unbiased Auditing — identifying risks efficiently");
  } else if (category.id === 'training') {
    guaranteeText = t("100% Satisfaction — globally recognized training credentials");
  } else if (category.id === 'docs') {
    guaranteeText = t("100% Legally Binding — drafted securely for your protection");
  } else if (category.id === 'inc') {
    guaranteeText = t("100% Incorporation Guarantee — fast approval & secure setup");
  } else if (category.id === 'licenses' || category.id === 'compliance') {
    guaranteeText = t("100% Compliance Guarantee — regulatory adherence at zero risk");
  }

  // Background Image
  let bgImage = '/msrassessment/assets/elegant_executive_board_room_with_glass_doors_and_professional_seating.png';
  if (category.id === 'inc') {
    bgImage = '/msrassessment/assets/high_end_corporate_still_life_photography_of_a_professional_wax_seal_on_a.png';
  } else if (category.id === 'ip') {
    bgImage = '/msrassessment/assets/two_professional_businessmen_in_suits_shaking_hands_in_a_high_rise_office.png';
  } else if (category.id === 'iso') {
    bgImage = '/msrassessment/assets/global_business_map_visualization_with_data_nodes_and_connections_styliz.png';
  }

  let expertTeamDesc = t("MSR Assessment Pvt Ltd's qualified CA, CS and CMA team manages the complete process on your behalf — from documentation to final certificate delivery — ensuring full compliance with Indian regulatory requirements.");
  if (category.id === 'digital') {
    expertTeamDesc = t("MSR Assessment Pvt Ltd's expert developers and digital strategists manage the complete project on your behalf — from UI/UX design to final launch — ensuring high performance and digital growth.");
  } else if (category.id === 'ip') {
    expertTeamDesc = t("MSR Assessment Pvt Ltd's qualified IP attorneys manage the complete process on your behalf — from trademark search to final registry approval — ensuring full protection of your intellectual assets.");
  } else if (category.id === 'training') {
    expertTeamDesc = t("MSR Assessment Pvt Ltd's certified lead trainers deliver comprehensive workshops and practical training — ensuring your team is fully equipped with required industry standards and compliance knowledge.");
  } else if (category.id === 'iso' || category.id === 'audit') {
    expertTeamDesc = t("MSR Assessment Pvt Ltd's IRCA certified lead auditors and compliance experts manage the complete process on your behalf — from gap analysis to final accredited certification — ensuring global standard compliance.");
  } else if (category.id === 'docs' || category.id === 'compliance') {
    expertTeamDesc = t("MSR Assessment Pvt Ltd's experienced legal counsels and company secretaries manage the complete process on your behalf — ensuring all statutory documents and governance frameworks are legally sound.");
  } else if (category.id === 'licenses') {
    expertTeamDesc = t("MSR Assessment Pvt Ltd's licensing consultants manage the complete process on your behalf — from application drafting to final approval — ensuring full compliance with state and central regulatory requirements.");
  }

  // Pre-fill modal event
  const handleInquiryClick = () => {
    const hiddenSvc = document.getElementById('inq-service-pre');
    if (hiddenSvc) hiddenSvc.value = service.title;
    const msgField = document.getElementById('inq-message');
    if (msgField) msgField.value = `I am interested in: ${service.title}. Please contact me with more details.`;

    const modal = document.getElementById('inquiry-modal');
    if (modal) modal.classList.add('open');
  };

  // Related Services
  const relatedServices = subData[category.id]
    ? subData[category.id]
      .filter(item => slugify(item.title) !== normalizedId)
      .slice(0, 3)
    : [];

  // Benefits
  const targetBenefits = categoryBenefits[category.id] || categoryBenefits.inc;

  // Render
  return (
    <>
      {/* Hero */}
      <section className="svc-page-hero" aria-label="Service hero">
        <div
          className="svc-hero-bg-media"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url('${bgImage}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.15,
            filter: 'blur(1px)',
            pointerEvents: 'none',
            zIndex: 0
          }}
        />
        <div className="svc-hero-inner" style={{ position: 'relative', zIndex: 1 }}>
          <div className="svc-hero-left" data-reveal>
            <div className="breadcrumb">
              <Link href="/">{t("Home")}</Link>
              <i className="fas fa-chevron-right"></i>
              <Link href="/#services-section">{t("Services")}</Link>
              <i className="fas fa-chevron-right"></i>
              <span>{category.title}</span>
            </div>

            <div className="svc-cat-badge">
              <img src="/msrassessment/msr.png" alt="MSR Logo" style={{ width: '18px', height: '18px', objectFit: 'contain', marginRight: '6px' }} />
              <span>{category.title}</span>
            </div>

            <h1 className="svc-page-title">{displayTitle}</h1>
            <p className="svc-page-subtitle">{displayDesc}</p>

            <div className="svc-meta-row">
              <div className="svc-meta-item">
                <span className="svc-meta-label">{t("Pricing Model")}</span>
                <span className="svc-meta-value gold">{t("Get Customized Quote")}</span>
              </div>
              <div className="svc-meta-divider"></div>
              <div className="svc-meta-item">
                <span className="svc-meta-label">{(normalizedId === 'private-limited-company-registration-india' || normalizedId === 'llp-registration-india') ? t("Registered") : t("Processing Time")}</span>
                <span className="svc-meta-value">{(normalizedId === 'private-limited-company-registration-india' || normalizedId === 'llp-registration-india') ? t("5000+ companies") : displayTime}</span>
              </div>
              <div className="svc-meta-divider"></div>
              <div className="svc-meta-item">
                <span className="svc-meta-label">{t("Success Rate")}</span>
                <span className="svc-meta-value">98%</span>
              </div>
            </div>
          </div>

          {/* Sticky Sidebar */}
          <div className="svc-sidebar" data-reveal data-reveal-delay="2">
            <div className="svc-sidebar-card">
              <div className="sscard-header">
                <div className="sscard-price-label">{t("Professional Advisory")}</div>
                <div className="sscard-price" style={{ fontSize: '24px', color: 'white' }}>{t("Quote on Request")}</div>
                <div className="sscard-price-note">{t("Govt. fees communicated separately & upfront")}</div>
              </div>
              <div className="sscard-body">
                <div className="sscard-detail-row">
                  <span className="sscard-detail-label">{t("Processing Time")}</span>
                  <span className="sscard-detail-value">{displayTime}</span>
                </div>
                <div className="sscard-detail-row">
                  <span className="sscard-detail-label">{t("Expert Assigned")}</span>
                  <span className="sscard-detail-value green">{displayExpert}</span>
                </div>
                <div className="sscard-detail-row">
                  <span className="sscard-detail-label">{t("Communication")}</span>
                  <span className="sscard-detail-value">WhatsApp + Email</span>
                </div>
                <div className="sscard-detail-row">
                  <span className="sscard-detail-label">{t("Process")}</span>
                  <span className="sscard-detail-value">100% Digital</span>
                </div>
                {normalizedId === 'register-company-name' && (
                  <div className="sscard-detail-row">
                    <span className="sscard-detail-label">{t("Registration")}</span>
                    <span className="sscard-detail-value">5000++</span>
                  </div>
                )}
              </div>
              <div className="sscard-cta">
                <button suppressHydrationWarning={true} className="btn btn-md btn-primary" onClick={handleInquiryClick} style={{ width: '100%', justifyContent: 'center' }}>
                  {t("Talk To An Expert")} <i className="fas fa-arrow-right"></i>
                </button>
                <div className="sscard-guarantee">
                  <i className="fas fa-shield-check"></i>
                  <span>{guaranteeText}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Body Content */}
      <section className="svc-body-section">
        <div className="svc-body-inner">
          {normalizedId === 'register-company-name' ? (
            <div className="svc-body-main">
              <div className="svc-content-section" data-reveal>
                <h2 style={{ marginBottom: '16px' }}>{t("About register company name in India")}</h2>
                <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '16px' }}>
                  {t("MSR Assessment Pvt Ltd provides end-to-end assistance to register a company name in India and complete the company incorporation process seamlessly. Our qualified team of Chartered Accountants (CA), Company Secretaries (CS), and Cost & Management Accountants (CMA) manages the entire process on your behalf—from company name approval and documentation preparation to MCA filing and Certificate of Incorporation delivery.")}
                </p>
                <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: '1.8' }}>
                  {t("With extensive experience in company registration in India, our professionals have successfully assisted hundreds of businesses across various industries. We understand every aspect of the incorporation process and ensure that all legal, regulatory, and compliance requirements are handled accurately and efficiently.")}
                </p>
              </div>

              <div className="svc-content-section" data-reveal>
                <h2 style={{ marginBottom: '16px' }}>{t("Benefits to register company name in India")}</h2>
                <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '24px' }}>
                  {t("Registering a company name is one of the first and most important steps in establishing a successful business in India. A unique and approved company name helps create a strong brand identity, enhances credibility, and ensures compliance with regulatory requirements. Whether you are planning a private limited company, LLP, or startup registration in India, securing your company name early can provide several long-term advantages.")}
                </p>
                <div className="benefits-grid" style={{ marginTop: '20px' }}>
                  {[
                    { icon: "fa-id-badge", isGold: false, title: "Establish a Unique Business Identity", desc: "A registered company name helps distinguish your business from competitors and creates a professional identity in the marketplace. Customers are more likely to trust and remember a business with a unique and recognizable name." },
                    { icon: "fa-shield-halved", isGold: true, title: "Build Brand Recognition and Trust", desc: "Your register brand name is the foundation of your business. Registering it allows you to build brand awareness, strengthen your market presence, and gain customer confidence. It also supports future efforts to register your brand name and protect your intellectual property." },
                    { icon: "fa-lock", isGold: false, title: "Secure Your Preferred Business Name", desc: "By new company registration, you reduce the risk of another business using a similar name. Early registration helps reserve your preferred name and ensures it is available for company incorporation." },
                    { icon: "fa-bolt", isGold: true, title: "Simplify Company Registration in India", desc: "A pre-approved company name streamlines the company registration process. Once your name is approved by the Ministry of Corporate Affairs (MCA), you can proceed with incorporation more efficiently and avoid delays caused by name rejections." },
                    { icon: "fa-user-tie", isGold: false, title: "Enhance Professional Credibility", desc: "Businesses with registered company names often appear more reliable and trustworthy to customers, investors, suppliers, and financial institutions. A professionally registered name can help create a positive first impression." },
                    { icon: "fa-chart-line", isGold: true, title: "Support Startup Growth and Expansion", desc: "For entrepreneurs seeking startup registration in India, a registered company name provides a strong foundation for future growth. It helps establish a recognizable brand that can expand across different markets and business sectors." },
                    { icon: "fa-trademark", isGold: false, title: "Prepare for Trademark and Brand Protection", desc: "Registering a company name is an important step toward protecting your brand. It can support future trademark registration efforts, helping safeguard your business identity and reputation from unauthorized use." },
                    { icon: "fa-globe", isGold: true, title: "Improve Online Visibility", desc: "A unique company name makes it easier to secure a matching domain name, create social media profiles, and build an online presence. This can improve digital marketing efforts and help potential customers find your business more easily." }
                  ].map((b, idx) => (
                    <div className="benefit-item" key={idx}>
                      <div className={`benefit-icon ${b.isGold ? 'gold' : ''}`}><i className={`fas ${b.icon}`}></i></div>
                      <div>
                        <div className="benefit-title">{t(b.title)}</div>
                        <div className="benefit-desc">{t(b.desc)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="svc-content-section" data-reveal>
                <h2 style={{ marginBottom: '16px' }}>{t("Types of new company registration in India")}</h2>
                <div className="wj-grid" style={{ marginTop: '20px', maxWidth: '100%', margin: '20px 0 0 0', padding: '0', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
                  {[
                    { title: "Private Limited company registration", path: "/service/private-limited-company-registration-india/" },
                    { title: "LLP registration", path: "/service/llp-registration-india/" },
                    { title: "OPC Registration", path: "/service/opc-registration/" },
                    { title: "Partnership Firm", path: "/service/partnership-firm/" },
                    { title: "Registration for startup in India", path: "/service/startup-india-registration/" },
                    { title: "Nidhi company", path: "/service/nidhi-company/" },
                    { title: "Section 8 company", path: "/service/section-8-company/" }
                  ].map((type, idx) => (
                    <div className="wj-card" key={idx} style={{ padding: '20px', border: '1px solid var(--border-solid)', borderRadius: 'var(--r-md)', background: 'var(--bg-card)', transition: 'transform 0.3s ease' }}>
                      <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--primary)', marginBottom: '12px' }}>{t(type.title)}</h3>
                      <Link href={type.path} className="btn btn-sm btn-primary">
                        {t("Explore Registration")} <i className="fas fa-arrow-right" style={{ marginLeft: '6px' }}></i>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              <div className="svc-content-section" data-reveal>
                <h2 style={{ marginBottom: '16px' }}>{t("Frequently Asked Questions")}</h2>
                <div className="faq-list" id="company-name-faqs">
                  {[
                    { q: "How long does company name approval take in India?", a: "MCA name approval typically takes 2 to 3 business days through the RUN portal, provided the name is unique and complies with MCA guidelines." },
                    { q: "What is the validity of an approved company name?", a: "An approved company name is reserved for 20 days from the date of approval for a new company incorporation." },
                    { q: "Can I reserve a company name before incorporating?", a: "Yes, you can reserve a name in advance using the Reserve Unique Name (RUN) service on the MCA portal." },
                    { q: "Is stamp duty included in the registration fee?", a: "Stamp duty varies by state and is calculated based on authorized capital. We communicate statutory fees upfront before filing." }
                  ].map((faq, idx) => {
                    const isOpen = openFaqIndex === idx + 600;
                    return (
                      <div className={`faq-item ${isOpen ? 'open' : ''}`} key={idx}>
                        <button suppressHydrationWarning={true} className="faq-question" onClick={() => setOpenFaqIndex(isOpen ? null : idx + 600)}>
                          {t(faq.q)}<i className="fas fa-chevron-down"></i>
                        </button>
                        <div className="faq-answer" style={{ maxHeight: isOpen ? '1500px' : '0', padding: isOpen ? '0 20px 16px' : '0 20px', overflow: 'hidden', transition: 'max-height 0.35s ease, padding 0.35s ease' }}>
                          {t(faq.a)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Related Services */}
              <div className="svc-content-section" data-reveal>
                <h3><i className="fas fa-link"></i> {t("Related Services")}</h3>
                <div className="related-grid" id="related-grid">
                  {[
                    { title: "LLP Registration", time: "10-15 Days", icon: "fa-users", link: "/service/llp-registration-india/" },
                    { title: "Partnership Firm", time: "5-7 Days", icon: "fa-handshake", link: "/service/partnership-firm/" },
                    { title: "Nidhi Company", time: "15-20 Days", icon: "fa-building-columns", link: "/service/nidhi-company/" },
                    { title: "Private Limited Company", time: "10-12 Days", icon: "fa-building", link: "/service/private-limited-company-registration-india/" }
                  ].map((item, idx) => {
                    return (
                      <Link href={item.link} className="related-card" key={idx}>
                        <div className="related-icon"><i className={`fas ${item.icon}`}></i></div>
                        <div>
                          <div className="related-title">{t(item.title)}</div>
                          <div className="related-time">
                            <i className="far fa-clock" style={{ fontSize: '10px', marginRight: '4px', color: 'var(--accent)' }}></i>
                            {t(item.time)}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : isSEOOverride ? (
            <div className="svc-body-main">
              <div className="svc-content-section" data-reveal>
                <h3><i className="fas fa-info-circle"></i> {t("Benefits of Search Engine Marketing Services")}</h3>
                <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: '1.8' }}>
                  {t("A strong online presence is essential for attracting potential customers and staying ahead of competitors. When combined with a well-planned digital strategy from a Search engine marketing agency for business growth, businesses can strengthen their market presence, improve conversion rates, and achieve sustainable long-term growth while maximizing their marketing investment.")}
                </p>
                <ol style={{ paddingLeft: '20px', textAlign: 'left', marginTop: '16px', color: 'var(--text-muted)' }}>
                  <li style={{ marginBottom: '10px' }}>{t("Increase your organic traffic by attracting targeted visitors who are actively searching for the products and services you offer.")}</li>
                  <li style={{ marginBottom: '10px' }}>{t("Strengthen your brand authority by appearing in top search results and building trust and credibility within your industry.")}</li>
                  <li style={{ marginBottom: '10px' }}>{t("Generate more qualified leads by connecting with potential customers who have a strong intent to purchase and engage with your business.")}</li>
                  <li style={{ marginBottom: '10px' }}>{t("Achieve a higher return on investment compared to paid advertising, as SEO continues to drive traffic and leads even after the initial optimization efforts.")}</li>
                  <li style={{ marginBottom: '0' }}>{t("Support sustainable business growth by creating a strong online presence that helps expand your reach and maintain a competitive advantage over time.")}</li>
                </ol>
              </div>

              <div className="svc-content-section" data-reveal>
                <h3><i className="fas fa-check-circle"></i> {t("Our SEO & SEM Process")}</h3>
                <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '20px' }}>
                  {t("Our SEO process begins with a comprehensive website audit and keyword research to identify opportunities for improving search visibility and attracting relevant traffic. We then implement a tailored SEO optimization service that includes on-page improvements, technical enhancements, and performance optimization. For online stores, our E-com SEO strategies focus on optimizing product pages, category pages, and user experience to increase rankings and conversions. We also create engaging and keyword-focused content through professional SEO content writing, helping your website attract and retain potential customers. To strengthen your website's authority and credibility, we build high-quality backlinks for website growth from relevant and trusted sources. Throughout the process, we continuously monitor performance, analyze results, and refine strategies to ensure sustainable growth and long-term success.")}
                </p>
                <div className="process-steps">
                  <div className="ps-item"><div className="ps-node">1</div><div className="ps-body"><div className="ps-title">{t("Website Audit")}</div><p className="ps-desc">{t("Comprehensive analysis of your website's current performance.")}</p></div></div>
                  <div className="ps-item"><div className="ps-node">2</div><div className="ps-body"><div className="ps-title">{t("Keyword Research")}</div><p className="ps-desc">{t("Identify high-value keywords with strong search intent.")}</p></div></div>
                  <div className="ps-item"><div className="ps-node">3</div><div className="ps-body"><div className="ps-title">{t("Strategy Development")}</div><p className="ps-desc">{t("Create a customized SEO roadmap based on business goals.")}</p></div></div>
                  <div className="ps-item"><div className="ps-node">4</div><div className="ps-body"><div className="ps-title">{t("Optimization")}</div><p className="ps-desc">{t("Implement on-page, technical, and content improvements.")}</p></div></div>
                  <div className="ps-item"><div className="ps-node">5</div><div className="ps-body"><div className="ps-title">{t("Link Building")}</div><p className="ps-desc">{t("Build quality backlinks and strengthen domain authority.")}</p></div></div>
                  <div className="ps-item"><div className="ps-node">6</div><div className="ps-body"><div className="ps-title">{t("Reporting & Monitoring")}</div><p className="ps-desc">{t("Track rankings, traffic, leads, and conversions with transparent monthly reports.")}</p></div></div>
                </div>
              </div>

              <div className="svc-content-section" data-reveal>
                <h3><i className="fas fa-chart-bar"></i> {t("Professional Google Ads services for higher ROI")}</h3>
                <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: '1.8' }}>
                  {t("PPC advertising is a powerful way for small businesses and e-commerce brands to reach potential customers, drive targeted traffic, and generate high-quality leads quickly. Through strategic Google Ads Management, businesses can display their products and services to users who are actively searching for relevant solutions, resulting in higher conversion opportunities and measurable returns. Whether you want to increase online sales, promote specific products, or attract local customers, a well-structured campaign helps maximize your advertising budget. Partnering with a Search engine marketing agency for business growth ensures your campaigns are continuously optimized, keywords are refined, and performance is monitored to achieve sustainable growth and long-term success.")}
                </p>
              </div>

              <div className="svc-content-section" data-reveal>
                <h3><i className="fas fa-route"></i> {t("Our PPC Process")}</h3>
                <div className="process-steps">
                  <div className="ps-item"><div className="ps-node">1</div><div className="ps-body"><div className="ps-title">{t("Business & Competitor Analysis")}</div><p className="ps-desc">{t("We begin by understanding your business goals, target audience, industry trends, and competitors to create a customized advertising strategy.")}</p></div></div>
                  <div className="ps-item"><div className="ps-node">2</div><div className="ps-body"><div className="ps-title">{t("Keyword Research & Audience Targeting")}</div><p className="ps-desc">{t("Our team identifies high-intent keywords and defines the right audience segments to ensure your ads reach potential customers who are most likely to convert.")}</p></div></div>
                  <div className="ps-item"><div className="ps-node">3</div><div className="ps-body"><div className="ps-title">{t("Campaign Setup & Ad Creation")}</div><p className="ps-desc">{t("We create optimized campaigns, compelling ad copy, and relevant landing page recommendations designed to maximize clicks and conversions.")}</p></div></div>
                  <div className="ps-item"><div className="ps-node">4</div><div className="ps-body"><div className="ps-title">{t("Conversion Tracking Implementation")}</div><p className="ps-desc">{t("We set up tracking tools to measure leads, sales, phone calls, and other important actions, ensuring accurate performance monitoring.")}</p></div></div>
                  <div className="ps-item"><div className="ps-node">5</div><div className="ps-body"><div className="ps-title">{t("Bid Management & Budget Optimization")}</div><p className="ps-desc">{t("Campaign budgets and bidding strategies are continuously adjusted to maximize return on investment while minimizing unnecessary ad spend.")}</p></div></div>
                  <div className="ps-item"><div className="ps-node">6</div><div className="ps-body"><div className="ps-title">{t("Performance Monitoring & A/B Testing")}</div><p className="ps-desc">{t("We regularly test ad creatives, keywords, audiences, and landing pages to improve campaign performance and conversion rates.")}</p></div></div>
                  <div className="ps-item"><div className="ps-node">7</div><div className="ps-body"><div className="ps-title">{t("Reporting & Insights")}</div><p className="ps-desc">{t("Detailed performance reports provide transparency into key metrics, campaign results, and opportunities for further improvement.")}</p></div></div>
                  <div className="ps-item"><div className="ps-node">8</div><div className="ps-body"><div className="ps-title">{t("Continuous Optimization & Growth")}</div><p className="ps-desc">{t("Based on data-driven insights, we refine campaigns, expand opportunities, and scale successful strategies to drive sustainable business growth.")}</p></div></div>
                </div>
              </div>

              <div className="svc-content-section" data-reveal>
                <h3><i className="fas fa-question-circle"></i> {t("Why MSR Assessment Pvt. Ltd.?")}</h3>
                <ol style={{ paddingLeft: '20px', fontSize: '14.5px', color: 'var(--text-muted)', lineHeight: '2' }}>
                  <li>{t("Experienced SEO Professionals")}</li>
                  <li>{t("Data-Driven Marketing Strategies")}</li>
                  <li>{t("Transparent Reporting")}</li>
                  <li>{t("Ethical White-Hat SEO Practices")}</li>
                  <li>{t("Industry-Specific Expertise")}</li>
                  <li>{t("Dedicated Support Team")}</li>
                </ol>
              </div>

              {relatedServices.length > 0 && (
                <div className="svc-content-section" data-reveal>
                  <h3><i className="fas fa-link"></i> {t("Related Services")}</h3>
                  <div className="related-grid" id="related-grid">
                    {relatedServices.map((item, idx) => {
                      const slug = slugify(item.title);
                      return (
                        <Link href={`/service/${slug}/`} className="related-card" key={idx}>
                          <div className="related-icon"><i className={`fas ${item.icon}`}></i></div>
                          <div>
                            <div className="related-title">{t(item.title)}</div>
                            <div className="related-time">
                              <i className="far fa-clock" style={{ fontSize: '10px', marginRight: '4px', color: 'var(--accent)' }}></i>
                              {t(item.time)}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ) : normalizedId === 'private-limited-company-registration-india' ? (
            <div className="svc-body-main">
              <div className="svc-content-section" data-reveal>
                <h2 style={{ marginBottom: '16px' }}>{t("About Private Limited Company Registration in India")}</h2>
                <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '16px' }}>
                  {t("MSR Assessment Pvt Ltd offers comprehensive Private Limited Company Registration services in India to help entrepreneurs establish their businesses quickly and compliantly. Our qualified team of Chartered Accountants (CA), Company Secretaries (CS), and Cost & Management Accountants (CMA) manages the entire registration process on your behalf—from company name approval and document preparation to MCA filing and Certificate of Incorporation delivery.")}
                </p>
                <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: '1.8' }}>
                  {t("Having successfully assisted hundreds of businesses across India, our experts understand every aspect of pvt ltd Company Registration in India and ensure full compliance with applicable regulatory requirements. We simplify the incorporation process, minimize delays, and provide end-to-end professional support so you can focus on building and growing your business.")}
                </p>
              </div>

              <div className="svc-content-section" data-reveal>
                <h2>{t("Key benefits")}</h2>
                <div className="benefits-grid" style={{ marginTop: '20px' }}>
                  {[
                    { icon: "fa-user-tie", isGold: false, title: "Expert CA/CS Assistance", desc: "Incorporation handled by practicing Chartered Accountants & Company Secretaries." },
                    { icon: "fa-bolt", isGold: true, title: "Fast Execution", desc: "Company registration initiated same-day upon document submission." },
                    { icon: "fa-building", isGold: false, title: "Name Approval Guarantee", desc: "Strategic RUN/SPICe+ name reservations to avoid MCA rejections." },
                    { icon: "fa-rupee-sign", isGold: true, title: "All-Inclusive Packages", desc: "Includes DIN, DSC, Stamp Duty, and all Govt/Professional fees." },
                    { icon: "fa-headset", isGold: false, title: "Dedicated Manager", desc: "Single point of contact for your entire company formation process." },
                    { icon: "fa-file-invoice", isGold: true, title: "Post-Incorporation Setup", desc: "Assistance with PAN, TAN, GST, and Bank Account opening." }
                  ].map((b, idx) => (
                    <div className="benefit-item" key={idx}>
                      <div className={`benefit-icon ${b.isGold ? 'gold' : ''}`}><i className={`fas ${b.icon}`}></i></div>
                      <div>
                        <div className="benefit-title">{t(b.title)}</div>
                        <div className="benefit-desc">{t(b.desc)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="svc-content-section" data-reveal>
                <h2 style={{ marginBottom: '16px' }}>{t("Documents for private limited company")}</h2>
                <div className="docs-list" style={{ display: 'block' }}>
                  <h3 style={{ fontSize: '16px', color: 'var(--primary)', marginBottom: '8px' }}>{t("Identity Proof of Directors and Shareholders")}</h3>
                  <h4 style={{ fontSize: '14px', color: 'var(--text-muted)', marginLeft: '12px', marginBottom: '16px' }}>- {t("Passport Mandatory for foreign nationals")}</h4>

                  <h3 style={{ fontSize: '16px', color: 'var(--primary)', marginBottom: '16px' }}>{t("Address Proof of Directors and Shareholders")}</h3>
                  <h3 style={{ fontSize: '16px', color: 'var(--primary)', marginBottom: '16px' }}>{t("Passport-Size Photographs")}</h3>
                  <h3 style={{ fontSize: '16px', color: 'var(--primary)', marginBottom: '16px' }}>{t("Registered Office Address Proof")}</h3>

                  <h3 style={{ fontSize: '16px', color: 'var(--primary)', marginBottom: '8px' }}>{t("No Objection Certificate (NOC)")}</h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '16px' }}>{t("If the registered office premises are rented or owned by another person, a No Objection Certificate (NOC) from the property owner may be required.")}</p>

                  <h3 style={{ fontSize: '16px', color: 'var(--primary)', marginBottom: '8px' }}>{t("Rent Agreement (If Applicable)")}</h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '16px' }}>{t("A copy of the rent agreement is required if the company's registered office is located in rented premises.")}</p>

                  <h3 style={{ fontSize: '16px', color: 'var(--primary)', marginBottom: '16px' }}>{t("Director Details")}</h3>

                  <h3 style={{ fontSize: '16px', color: 'var(--primary)', marginBottom: '8px' }}>{t("Shareholding Information")}</h3>
                  <ul style={{ listStyle: 'disc', paddingLeft: '20px', color: 'var(--text-muted)', marginBottom: '16px', fontSize: '14px' }}>
                    <li>{t("Shareholders")}</li>
                    <li>{t("Number of shares subscribed")}</li>
                    <li>{t("Shareholding percentage")}</li>
                    <li>{t("Authorized and paid-up capital")}</li>
                  </ul>

                  <h3 style={{ fontSize: '16px', color: 'var(--primary)', marginBottom: '8px' }}>{t("Company Information")}</h3>
                  <ul style={{ listStyle: 'disc', paddingLeft: '20px', color: 'var(--text-muted)', marginBottom: '16px', fontSize: '14px' }}>
                    <li>{t("Proposed company name")}</li>
                    <li>{t("Nature of business activities")}</li>
                    <li>{t("Registered office address")}</li>
                    <li>{t("Capital structure details")}</li>
                  </ul>
                </div>
              </div>

              <div className="svc-content-section" data-reveal>
                <h2 style={{ marginBottom: '16px' }}>{t("Pvt Ltd Company registration process")}</h2>
                <div className="process-steps">
                  {[
                    { title: "Name Reservation", desc: "Filing RUN application on MCA portal." },
                    { title: "Digital Signatures", desc: "Procuring Class 3 DSCs for proposed directors." },
                    { title: "SpicE+ Submission", desc: "Filing core incorporation form with MOA & AOA documents." },
                    { title: "Certificate Release", desc: "Receiving COI, PAN, and TAN codes." }
                  ].map((step, idx) => (
                    <div className="ps-item" key={idx}>
                      <div className="ps-node">{idx + 1}</div>
                      <div className="ps-body">
                        <div className="ps-title">{t(step.title)}</div>
                        <p className="ps-desc">{t(step.desc)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="svc-content-section" data-reveal>
                <h2 style={{ marginBottom: '16px' }}>{t("FAQ")}</h2>
                <div className="faq-list" id="pvt-ltd-faq-list">
                  {[
                    { q: "How long does Private Limited Company Registration take in India?", a: "The registration timeline depends on document verification, company name approval, and MCA processing. The process is generally completed within a few business days, subject to regulatory approvals." },
                    { q: "Is a Digital Signature Certificate (DSC) mandatory?", a: "Yes. A Digital Signature Certificate (DSC) is required for directors to electronically sign incorporation forms and documents submitted to the Ministry of Corporate Affairs (MCA)." },
                    { q: "Can foreign nationals register a Private Limited Company in India?", a: "Yes. Foreign nationals and foreign entities can participate in Private Limited Company Registration in India, subject to applicable laws, regulations, and documentation requirements." },
                    { q: "What is the minimum capital required for a Private Limited Company?", a: "There is currently no mandatory minimum paid-up capital requirement for incorporating a Private Limited Company in India. The capital structure can be decided based on business requirements." },
                    { q: "Can a Private Limited Company raise investment?", a: "Yes. One of the major advantages of a Private Limited Company is its ability to attract investors, angel funding, venture capital, and other forms of business investment." },
                    { q: "What is the difference between a Private Limited Company and an LLP?", a: "A Private Limited Company is generally preferred by startups and businesses seeking investment and scalability, while an LLP offers partnership flexibility with comparatively fewer compliance requirements." },
                    { q: "What do I receive after successful company registration?", a: "Upon successful incorporation, the company receives: Certificate of Incorporation (COI), Corporate Identification Number (CIN), PAN, TAN" }
                  ].map((faq, idx) => {
                    const isOpen = openFaqIndex === idx + 800;
                    return (
                      <div className={`faq-item ${isOpen ? 'open' : ''}`} key={idx}>
                        <h3 style={{ margin: 0 }}>
                          <button suppressHydrationWarning={true} className="faq-question" onClick={() => setOpenFaqIndex(isOpen ? null : idx + 800)}>
                            {t(faq.q)}<i className="fas fa-chevron-down"></i>
                          </button>
                        </h3>
                        <div className="faq-answer" style={{ maxHeight: isOpen ? '1500px' : '0', padding: isOpen ? '0 20px 16px' : '0 20px', overflow: 'hidden', transition: 'max-height 0.35s ease, padding 0.35s ease' }}>
                          {faq.q === "What do I receive after successful company registration?" ? (
                            <>
                              <h4 style={{ fontSize: '14px', marginBottom: '8px' }}>{t("Upon successful incorporation, the company receives:")}</h4>
                              <ul style={{ listStyle: 'disc', paddingLeft: '20px', margin: 0 }}>
                                <li><h5 style={{ margin: 0, fontWeight: 'normal', fontSize: '14px' }}>{t("Certificate of Incorporation (COI)")}</h5></li>
                                <li><h5 style={{ margin: 0, fontWeight: 'normal', fontSize: '14px' }}>{t("Corporate Identification Number (CIN)")}</h5></li>
                                <li><h5 style={{ margin: 0, fontWeight: 'normal', fontSize: '14px' }}>{t("PAN")}</h5></li>
                                <li><h5 style={{ margin: 0, fontWeight: 'normal', fontSize: '14px' }}>{t("TAN")}</h5></li>
                              </ul>
                            </>
                          ) : (
                            t(faq.a)
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="svc-content-section" data-reveal>
                <h3><i className="fas fa-link"></i> {t("Related Service")}</h3>
                <div className="related-grid" id="related-grid">
                  {[
                    { title: "Startup India", time: "10-15 Days", icon: "fa-rocket", link: "/service/startup-india-registration/" },
                    { title: "LLP Registration", time: "10-15 Days", icon: "fa-users", link: "/service/llp-registration-india/" },
                    { title: "OPC Registration", time: "7-10 Days", icon: "fa-user-tie", link: "/service/opc-registration/" }
                  ].map((item, idx) => (
                    <Link href={item.link} className="related-card" key={idx}>
                      <div className="related-icon"><i className={`fas ${item.icon}`}></i></div>
                      <div>
                        <div className="related-title">{t(item.title)}</div>
                        <div className="related-time">
                          <i className="far fa-clock" style={{ fontSize: '10px', marginRight: '4px', color: 'var(--accent)' }}></i>
                          {t(item.time)}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ) : normalizedId === 'llp-registration-india' ? (
            <div className="svc-body-main">
              <div className="svc-content-section" data-reveal>
                <h2 style={{ marginBottom: '16px' }}>{t("About LLP Registration in India")}</h2>
                <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '16px' }}>
                  {t("MSR Assessment Pvt Ltd provides comprehensive LLP Registration in India services, helping businesses complete the incorporation process smoothly and efficiently. Our qualified team of Chartered Accountants (CA), Company Secretaries (CS), and Cost & Management Accountants (CMA) manages the entire registration process on your behalf—from LLP name reservation and document preparation to MCA filing and Certificate of Incorporation delivery.")}
                </p>
                <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: '1.8' }}>
                  {t("With extensive experience in LLP Registration India, our experts have successfully assisted hundreds of entrepreneurs and businesses across India. We ensure full compliance with the Limited Liability Partnership Act, 2008, and other applicable regulatory requirements, minimizing delays and helping you establish your LLP with confidence.")}
                </p>
              </div>

              <div className="svc-content-section" data-reveal>
                <h2 style={{ marginBottom: '16px' }}>{t("Key benefits")}</h2>
                <div className="benefits-grid" style={{ marginTop: '20px' }}>
                  {[
                    { icon: "fa-user-tie", isGold: false, title: "Expert CA/CS Assistance", desc: "Incorporation handled by practicing Chartered Accountants & Company Secretaries." },
                    { icon: "fa-bolt", isGold: true, title: "Fast Execution", desc: "Company registration initiated same-day upon document submission." },
                    { icon: "fa-building", isGold: false, title: "Name Approval Guarantee", desc: "Strategic RUN/SPICe+ name reservations to avoid MCA rejections." },
                    { icon: "fa-rupee-sign", isGold: true, title: "All-Inclusive Packages", desc: "Includes DIN, DSC, Stamp Duty, and all Govt/Professional fees." },
                    { icon: "fa-headset", isGold: false, title: "Dedicated Manager", desc: "Single point of contact for your entire company formation process." },
                    { icon: "fa-file-invoice", isGold: true, title: "Post-Incorporation Setup", desc: "Assistance with PAN, TAN, GST, and Bank Account opening." }
                  ].map((b, idx) => (
                    <div className="benefit-item" key={idx}>
                      <div className={`benefit-icon ${b.isGold ? 'gold' : ''}`}><i className={`fas ${b.icon}`}></i></div>
                      <div>
                        <div className="benefit-title">{t(b.title)}</div>
                        <div className="benefit-desc">{t(b.desc)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="svc-content-section" data-reveal>
                <h2 style={{ marginBottom: '16px' }}>{t("llp registration documents")}</h2>
                <div className="docs-list" style={{ display: 'block' }}>
                  <h3 style={{ fontSize: '16px', color: 'var(--primary)', marginBottom: '8px' }}>{t("Identity Proof of Designated Partners")}</h3>
                  <h3 style={{ fontSize: '16px', color: 'var(--primary)', marginBottom: '8px' }}>{t("Address Proof of Designated Partners")}</h3>
                  <h3 style={{ fontSize: '16px', color: 'var(--primary)', marginBottom: '8px' }}>{t("Passport-Size Photographs")}</h3>
                  <h3 style={{ fontSize: '16px', color: 'var(--primary)', marginBottom: '8px' }}>{t("Registered Office Address Proof")}</h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '16px' }}>{t("The document should generally not be older than 2 months.")}</p>

                  <h3 style={{ fontSize: '16px', color: 'var(--primary)', marginBottom: '8px' }}>{t("No Objection Certificate (NOC)")}</h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '16px' }}>{t("If the registered office premises are rented or owned by another person, a No Objection Certificate (NOC) from the property owner may be required.")}</p>
                  
                  <h3 style={{ fontSize: '16px', color: 'var(--primary)', marginBottom: '8px' }}>{t("Rent Agreement (If Applicable)")}</h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '16px' }}>{t("A copy of the rent agreement must be provided if the LLP's registered office is located on rented premises.")}</p>
                  
                  <h3 style={{ fontSize: '16px', color: 'var(--primary)', marginBottom: '8px' }}>{t("Details of Designated Partners")}</h3>
                  <h3 style={{ fontSize: '16px', color: 'var(--primary)', marginBottom: '8px' }}>{t("Proposed LLP Name")}</h3>
                  <h3 style={{ fontSize: '16px', color: 'var(--primary)', marginBottom: '8px' }}>{t("Business Activity Details")}</h3>
                  <h3 style={{ fontSize: '16px', color: 'var(--primary)', marginBottom: '8px' }}>{t("Capital Contribution Details")}</h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '16px' }}>{t("Capital contribution by each partner * Profit-sharing ratio * Rights and responsibilities of partners")}</p>
                  <h3 style={{ fontSize: '16px', color: 'var(--primary)', marginBottom: '16px' }}>{t("LLP Agreement Details")}</h3>
                </div>
              </div>

              <div className="svc-content-section" data-reveal>
                <h2 style={{ marginBottom: '16px' }}>{t("llp registration process")}</h2>
                <div className="process-steps">
                  {[
                    { title: "Name Reservation", desc: "Filing RUN application on MCA portal." },
                    { title: "Digital Signatures", desc: "Procuring Class 3 DSCs for proposed directors." },
                    { title: "SpicE+ Submission", desc: "Filing core incorporation form with MOA & AOA documents." },
                    { title: "Certificate Release", desc: "Receiving COI, PAN, and TAN codes." }
                  ].map((step, idx) => (
                    <div className="ps-item" key={idx}>
                      <div className="ps-node">{idx + 1}</div>
                      <div className="ps-body">
                        <div className="ps-title">{t(step.title)}</div>
                        <p className="ps-desc">{t(step.desc)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="svc-content-section" data-reveal>
                <h2 style={{ marginBottom: '16px' }}>{t("FAQ")}</h2>
                <div className="faq-list" id="llp-faq-list">
                  {[
                    { q: "Is a Digital Signature Certificate (DSC) required for LLP Registration?", a: "Yes. All designated partners must obtain a Digital Signature Certificate (DSC) to electronically sign and submit incorporation documents through the MCA portal." },
                    { q: "What is the minimum capital requirement for an LLP?", a: "There is no mandatory minimum capital requirement for LLP Registration in India. Partners can contribute capital based on the business's operational needs." },
                    { q: "Can an LLP have foreign partners?", a: "Yes. Foreign nationals and foreign entities can become partners in an LLP in India, subject to applicable laws, regulations, and foreign investment guidelines." },
                    { q: "Can an LLP own property and enter into contracts?", a: "Yes. Since an LLP is a separate legal entity, it can own assets, enter into contracts, open bank accounts, and conduct business in its own name." },
                    { q: "What is the difference between an LLP and a Private Limited Company?", a: "An LLP offers greater operational flexibility and lower compliance requirements, while a Private Limited Company is generally preferred by businesses seeking external investment, venture capital funding, and rapid scalability." }
                  ].map((faq, idx) => {
                    const isOpen = openFaqIndex === idx + 900;
                    return (
                      <div className={`faq-item ${isOpen ? 'open' : ''}`} key={idx}>
                        <h3 style={{ margin: 0 }}>
                          <button suppressHydrationWarning={true} className="faq-question" onClick={() => setOpenFaqIndex(isOpen ? null : idx + 900)}>
                            {t(faq.q)}<i className="fas fa-chevron-down"></i>
                          </button>
                        </h3>
                        <div className="faq-answer" style={{ maxHeight: isOpen ? '1500px' : '0', padding: isOpen ? '0 20px 16px' : '0 20px', overflow: 'hidden', transition: 'max-height 0.35s ease, padding 0.35s ease' }}>
                          {t(faq.a)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="svc-content-section" data-reveal>
                <h3><i className="fas fa-link"></i> {t("Related Services")}</h3>
                <div className="related-grid" id="related-grid">
                  {[
                    { title: "Partnership Firm", time: "5-7 Days", icon: "fa-handshake", link: "/service/partnership-firm/" },
                    { title: "OPC Registration", time: "7-10 Days", icon: "fa-user-tie", link: "/service/opc-registration/" },
                    { title: "Private Limited Company", time: "10-12 Days", icon: "fa-building", link: "/service/private-limited-company-registration-india/" }
                  ].map((item, idx) => (
                    <Link href={item.link} className="related-card" key={idx}>
                      <div className="related-icon"><i className={`fas ${item.icon}`}></i></div>
                      <div>
                        <div className="related-title">{t(item.title)}</div>
                        <div className="related-time">
                          <i className="far fa-clock" style={{ fontSize: '10px', marginRight: '4px', color: 'var(--accent)' }}></i>
                          {t(item.time)}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ) : normalizedId === 'social-media-marketing' ? (
            <div className="svc-body-main">
              <div className="svc-content-section" data-reveal>
                <h2>Social Media Management Services - Our Process</h2>
                <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '20px' }}>
                  Building a social media strategy requires consistent communication, engaging content, and active audience interaction. Professional Social Media Management Services help businesses create and maintain a compelling digital presence across platforms such as Facebook, Instagram, LinkedIn, and X. From content planning and creative design to community engagement and performance monitoring, every aspect is managed strategically to increase brand awareness and foster meaningful customer relationships. By maintaining a consistent brand voice and publishing relevant content, businesses can improve audience engagement, strengthen customer loyalty, and create more opportunities for lead generation and long-term growth.
                </p>
                <h3>Our Process</h3>
                <div className="process-steps">
                  {[
                    { title: "Business & Audience Research", desc: "We begin by understanding your business goals, target audience, industry trends, and competitors to create a customized content strategy." },
                    { title: "Content Strategy & Planning", desc: "A detailed content calendar is developed to ensure consistent posting, audience engagement, and alignment with your brand objectives." },
                    { title: "Creative Content Development", desc: "Our team designs eye-catching graphics, videos, captions, and promotional content that resonate with your audience and strengthen brand identity." },
                    { title: "Profile Optimization", desc: "We optimize your social media profiles with compelling descriptions, branding elements, and relevant information to improve visibility and credibility." },
                    { title: "Content Publishing & Scheduling", desc: "Posts are strategically scheduled and published at optimal times to maximize reach, engagement, and audience interaction." },
                    { title: "Community Management", desc: "We monitor comments, messages, and mentions, helping businesses engage with their audience and build stronger customer relationships." },
                    { title: "Performance Tracking & Reporting", desc: "Key metrics such as reach, engagement, follower growth, and conversions are analyzed to measure campaign effectiveness and identify opportunities for improvement." },
                    { title: "Continuous Optimization & Growth", desc: "Based on performance insights, we refine content strategies, improve engagement tactics, and implement new opportunities to support ongoing business growth." }
                  ].map((step, idx) => (
                    <div className="ps-item" key={idx}>
                      <div className="ps-node">{idx + 1}</div>
                      <div className="ps-body">
                        <div className="ps-title">{step.title}</div>
                        <p className="ps-desc">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="svc-content-section" data-reveal>
                <h2>Social Media Campaign Management</h2>
                <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '20px' }}>
                  Effective campaign management helps businesses reach the right audience, increase engagement, and achieve measurable marketing goals. Through strategic Social Media Promotion Services, brands can create targeted campaigns that enhance visibility and drive meaningful interactions. Whether it&apos;s Facebook &amp; Instagram Marketing for audience growth or Business Social Media Management for maintaining a consistent online presence, a well-planned approach ensures better brand awareness, higher engagement rates, and improved lead generation opportunities.
                </p>
                <h3>Our Process</h3>
                <div className="process-steps">
                  {[
                    { title: "Goal Definition & Strategy Planning", desc: "We identify campaign objectives, target audience, key performance indicators (KPIs), and platform selection to build a results-driven strategy." },
                    { title: "Audience Research & Segmentation", desc: "Customer demographics, interests, behaviors, and market trends are analyzed to ensure campaigns reach the most relevant audience." },
                    { title: "Content & Creative Development", desc: "Engaging visuals, videos, ad creatives, and compelling copy are created to capture attention and encourage audience interaction." },
                    { title: "Campaign Setup & Launch", desc: "Campaigns are configured with the appropriate targeting, budget allocation, placements, and scheduling to maximize performance." },
                    { title: "Performance Monitoring", desc: "Campaign metrics such as reach, impressions, engagement, clicks, and conversions are tracked in real time to evaluate effectiveness." },
                    { title: "Optimization & A/B Testing", desc: "Creative elements, audience segments, and campaign settings are continuously tested and refined to improve results and reduce costs." },
                    { title: "Lead Generation & Audience Engagement", desc: "Prospective customers are nurtured through targeted messaging, remarketing strategies, and ongoing engagement activities." },
                    { title: "Reporting & Growth Strategy", desc: "Detailed performance reports provide actionable insights, helping businesses scale successful campaigns and achieve sustainable growth." }
                  ].map((step, idx) => (
                    <div className="ps-item" key={idx}>
                      <div className="ps-node">{idx + 1}</div>
                      <div className="ps-body">
                        <div className="ps-title">{step.title}</div>
                        <p className="ps-desc">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="svc-content-section" data-reveal>
                <h2>Why Work With MSR?</h2>
                <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '16px' }}>
                  Every service is handled by a dedicated social media specialist — not an intern or automated tool. We&apos;ve managed brand presences across industries and understand what drives real engagement and lead generation.
                </p>
                <div className="benefits-grid">
                  {[
                    { icon: "fa-user-tie", isGold: false, title: "Dedicated Social Media Manager", desc: "Each client gets a named social media manager responsible for your brand." },
                    { icon: "fa-calendar-check", isGold: true, title: "Consistent Content Calendar", desc: "Planned, on-brand content published at optimal times every week." },
                    { icon: "fa-chart-line", isGold: false, title: "Data-Driven Strategy", desc: "Campaigns backed by analytics, not guesswork." },
                    { icon: "fa-comments", isGold: true, title: "WhatsApp + Email Communication", desc: "Direct, rapid communication with your assigned expert." },
                    { icon: "fa-mobile-screen", isGold: false, title: "100% Digital Process", desc: "No office visits required. Everything handled remotely." },
                    { icon: "fa-trophy", isGold: true, title: "98% Client Satisfaction Rate", desc: "Proven results in brand growth and audience engagement." }
                  ].map((b, idx) => (
                    <div className="benefit-item" key={idx}>
                      <div className={`benefit-icon ${b.isGold ? 'gold' : ''}`}><i className={`fas ${b.icon}`}></i></div>
                      <div>
                        <div className="benefit-title">{b.title}</div>
                        <div className="benefit-desc">{b.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          ) : normalizedId === 'web-development' ? (
            <div className="svc-body-main">
              <div className="svc-content-section" data-reveal>
                <h2>Website Design & Development</h2>
                <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: '1.8' }}>
                  Looking for a reliable web development company to create a high-performing website for your business? We specialize in custom web development solutions that help businesses establish a strong digital presence, attract more customers, and drive measurable growth. Whether you need a corporate website, eCommerce platform, web application, or custom portal, our experienced developers deliver secure, scalable, and user-friendly solutions tailored to your goals.
                </p>
              </div>

              <div className="svc-content-section" data-reveal>
                <h2>About Our Web Development Service</h2>
                <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '20px' }}>
                  As the best website development company, we provide comprehensive web and app development services tailored to help businesses succeed in the digital landscape. Our expert team specializes in creating innovative, scalable, and high-performing solutions with engaging UI designs that enhance user experience and drive conversions. From responsive websites to custom web applications, our skilled React JS developers work closely with experienced backend and front developers to deliver secure, fast, and feature-rich digital products.
                </p>
                <div className="benefits-grid">
                  {[
                    { icon: "fa-code", isGold: false, title: "Custom Website Development", desc: "We design and develop websites tailored to your business requirements, ensuring optimal performance, functionality, and user experience." },
                    { icon: "fa-cart-shopping", isGold: true, title: "Creating an eCommerce Website", desc: "Launch and grow your online store with powerful eCommerce solutions featuring secure payment gateways, inventory management, and conversion-focused design." },
                    { icon: "fa-window-restore", isGold: false, title: "Web Application Development", desc: "Transform your business processes with custom web applications built to improve efficiency, productivity, and customer engagement." },
                    { icon: "fa-layer-group", isGold: true, title: "CMS Development", desc: "Manage your website effortlessly with user-friendly content management systems such as WordPress and custom CMS solutions." },
                    { icon: "fa-wrench", isGold: false, title: "Website Maintenance & Support", desc: "Keep your website secure, updated, and performing at its best with our ongoing maintenance and technical support services." },
                    { icon: "fa-shield-check", isGold: true, title: "SEO-Friendly Development", desc: "Every website is built with clean code, fast loading speeds, mobile responsiveness, and SEO best practices from day one." }
                  ].map((b, idx) => (
                    <div className="benefit-item" key={idx}>
                      <div className={`benefit-icon ${b.isGold ? 'gold' : ''}`}><i className={`fas ${b.icon}`}></i></div>
                      <div>
                        <div className="benefit-title">{b.title}</div>
                        <div className="benefit-desc">{b.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="svc-content-section" data-reveal>
                <h2>Web & App Development Process</h2>
                <div className="process-steps">
                  {[
                    { title: "Discovery & Planning", desc: "We understand your business objectives, target audience, and project requirements." },
                    { title: "Design & Prototyping", desc: "Our team creates engaging user experiences and intuitive website layouts." },
                    { title: "Development", desc: "Using modern technologies and best practices, we build your website with performance and security in mind." },
                    { title: "Testing & Quality Assurance", desc: "We thoroughly test functionality, compatibility, speed, and security before launch." },
                    { title: "Launch & Support", desc: "After deployment, we provide continuous support to ensure your website remains successful." }
                  ].map((step, idx) => (
                    <div className="ps-item" key={idx}>
                      <div className="ps-node">{idx + 1}</div>
                      <div className="ps-body">
                        <div className="ps-title">{step.title}</div>
                        <p className="ps-desc">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="svc-content-section" data-reveal>
                <h2>Industries We Serve</h2>
                <div className="docs-list">
                  {["Healthcare", "Education", "Manufacturing", "Real Estate", "Finance", "Retail & eCommerce", "Technology", "Professional Services"].map((ind, idx) => (
                    <div className="doc-item" key={idx}><i className="fas fa-building"></i> {ind}</div>
                  ))}
                </div>
              </div>

              <div className="svc-content-section" data-reveal>
                <h2>Why Choose Us?</h2>
                <div className="benefits-grid">
                  {[
                    { icon: "fa-users", isGold: false, title: "Experienced Development Team", desc: "Our skilled developers have extensive experience building websites and web applications for businesses across multiple industries." },
                    { icon: "fa-magnifying-glass-chart", isGold: true, title: "SEO-Friendly Web Development", desc: "Every website is developed with clean code, fast loading speeds, mobile responsiveness, and SEO best practices." },
                    { icon: "fa-expand", isGold: false, title: "Scalable Solutions", desc: "We build websites that grow with your business and can easily accommodate future expansion and new features." },
                    { icon: "fa-comments", isGold: true, title: "Transparent Communication", desc: "From planning to deployment, we keep you informed throughout the development process." },
                    { icon: "fa-clock", isGold: false, title: "Timely Delivery", desc: "We follow efficient development processes to ensure projects are completed on schedule without compromising quality." }
                  ].map((b, idx) => (
                    <div className="benefit-item" key={idx}>
                      <div className={`benefit-icon ${b.isGold ? 'gold' : ''}`}><i className={`fas ${b.icon}`}></i></div>
                      <div>
                        <div className="benefit-title">{b.title}</div>
                        <div className="benefit-desc">{b.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="svc-content-section" data-reveal>
                <h2>Frequently Asked Questions</h2>
                <div className="faq-list" id="web-dev-faq-list">
                  {[
                    { q: "How much does web development cost?", a: "The cost depends on the complexity, features, and scope of your project. Contact us for a customized quote." },
                    { q: "How long does it take to develop a website?", a: "Most business websites are completed within 2–8 weeks, depending on requirements." },
                    { q: "Will my website be mobile-friendly?", a: "Yes. Every website we develop is fully responsive and optimized for all devices." },
                    { q: "Do you provide SEO services?", a: "Yes. We build SEO-friendly websites and offer ongoing SEO services to improve search rankings." }
                  ].map((faq, idx) => {
                    const isOpen = openFaqIndex === idx + 100;
                    return (
                      <div className={`faq-item ${isOpen ? 'open' : ''}`} key={idx}>
                        <button suppressHydrationWarning={true} className="faq-question" onClick={() => setOpenFaqIndex(isOpen ? null : idx + 100)}>
                          {faq.q}<i className="fas fa-chevron-down"></i>
                        </button>
                        <div className="faq-answer" style={{ maxHeight: isOpen ? '1500px' : '0', padding: isOpen ? '0 20px 16px' : '0 20px', overflow: 'hidden', transition: 'max-height 0.35s ease, padding 0.35s ease' }}>
                          {faq.a}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="svc-content-section" data-reveal>
                <h2>Ready to Grow Your Business Online?</h2>
                <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '16px' }}>
                  Partner with the best web development agency that delivers innovative, scalable, and results-driven digital solutions.
                </p>
                <Link href="/contact/" className="btn btn-md btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  Contact Us Today <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            </div>

          ) : normalizedId === 'ecommerce-web-development' ? (
            <div className="svc-body-main">
              <div className="svc-content-section" data-reveal>
                <h2>Custom E-commerce Website Development</h2>
                <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: '1.8' }}>
                  Every online business has unique requirements, and a custom-built solution ensures your website is designed to meet specific goals and customer expectations. From intuitive navigation and responsive design to secure payment integration and streamlined checkout experiences, a tailored approach helps create a seamless shopping journey. Custom E-commerce Website Development enables businesses to incorporate advanced features, improve scalability, and enhance overall performance while maintaining complete control over branding and functionality. By delivering a personalized user experience, businesses can increase customer satisfaction, improve conversion rates, and support long-term growth in a competitive digital marketplace.
                </p>
              </div>

              <div className="svc-content-section" data-reveal>
                <h2>E-commerce Website Design Process</h2>
                <div className="process-steps">
                  {[
                    { title: "Discovery & Requirement Analysis", desc: "We begin by understanding your business model, products, target audience, and project goals to create a clear development roadmap." },
                    { title: "Planning & Platform Selection", desc: "Based on your requirements, we recommend the most suitable platform, features, integrations, and technology stack for optimal performance." },
                    { title: "UI/UX Design", desc: "Our designers create intuitive layouts and engaging user experiences that make it easy for customers to browse, shop, and complete purchases." },
                    { title: "Store Development & Customization", desc: "We develop and customize the website, including product pages, category structures, shopping cart functionality, and payment gateway integration." },
                    { title: "Mobile Optimization", desc: "The store is optimized for smartphones and tablets to ensure a seamless shopping experience across all devices." },
                    { title: "Testing & Quality Assurance", desc: "We thoroughly test functionality, security, speed, payment processing, and user experience to ensure everything works flawlessly." },
                    { title: "Launch & Deployment", desc: "After final approval, the website is deployed to a live environment and configured for optimal performance and security." },
                    { title: "Maintenance & Growth Support", desc: "We provide ongoing updates, performance monitoring, feature enhancements, and technical support to help your online business grow and scale successfully." }
                  ].map((step, idx) => (
                    <div className="ps-item" key={idx}>
                      <div className="ps-node">{idx + 1}</div>
                      <div className="ps-body">
                        <div className="ps-title">{step.title}</div>
                        <p className="ps-desc">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="svc-content-section" data-reveal>
                <h2>Custom Online Store Development</h2>
                <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: '1.8' }}>
                  A custom online store is designed to meet the unique needs of your business while delivering a seamless shopping experience for customers. From intuitive navigation and secure payment integration to scalable functionality, every element is tailored to support growth and maximize conversions. We develop SEO-Friendly E-commerce Websites that help improve search visibility and attract potential customers through organic search. Our approach also incorporates Mobile-Friendly Online Store Development, ensuring your website performs flawlessly across smartphones, tablets, and desktops. When combined with effective <Link href="/service/search-engine-marketing-services-for-traffic-lead-generation/" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Search Engine Marketing</Link> strategies, a custom-built store can increase brand visibility, drive targeted traffic, and generate more sales, helping your business thrive in the competitive digital marketplace.
                </p>
              </div>

              <div className="svc-content-section" data-reveal>
                <h2>Why Work With MSR?</h2>
                <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '16px' }}>
                  Every e-commerce project is handled by an experienced web developer with deep knowledge of online retail, payment systems, and conversion optimization.
                </p>
                <div className="benefits-grid">
                  {[
                    { icon: "fa-laptop-code", isGold: false, title: "Expert Web Developers", desc: "Handled by senior developers experienced in e-commerce platforms and custom development." },
                    { icon: "fa-lock", isGold: true, title: "Secure Payment Integration", desc: "PCI-compliant payment gateways integrated for safe and smooth transactions." },
                    { icon: "fa-mobile-screen", isGold: false, title: "Mobile-First Design", desc: "All stores are optimized for mobile users ensuring maximum conversions." },
                    { icon: "fa-magnifying-glass-chart", isGold: true, title: "SEO-Friendly Build", desc: "Built with technical SEO best practices to drive organic traffic to your store." },
                    { icon: "fa-headset", isGold: false, title: "Post-Launch Support", desc: "Dedicated technical support after your store goes live." },
                    { icon: "fa-trophy", isGold: true, title: "98% Success Rate", desc: "Proven results in delivering high-performance online stores on time." }
                  ].map((b, idx) => (
                    <div className="benefit-item" key={idx}>
                      <div className={`benefit-icon ${b.isGold ? 'gold' : ''}`}><i className={`fas ${b.icon}`}></i></div>
                      <div>
                        <div className="benefit-title">{b.title}</div>
                        <div className="benefit-desc">{b.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          ) : normalizedId === 'brand-identity-design' ? (
            <div className="svc-body-main">
              <div className="svc-content-section" data-reveal>
                <h2>Professional Brand Design Services</h2>
                <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '20px' }}>
                  Creating a strong and recognizable presence in the market requires a clear visual direction and consistent messaging across all customer touchpoints. A well-crafted creative approach helps businesses communicate their values, stand out from competitors, and build lasting connections with their audience. From defining visual elements and communication styles to ensuring consistency across digital and print materials, every aspect is strategically developed to strengthen market positioning. When combined with effective <Link href="/service/social-media-marketing/" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>social media marketing</Link>, businesses can increase visibility, enhance audience engagement, and create a memorable experience that drives trust, loyalty, and long-term growth.
                </p>
                <div className="docs-list">
                  {["Package Design", "Brochure Design", "Poster Design", "User Interface Design", "Visiting Card Design", "Logo Design", "Infographic Design", "Brand Management"].map((item, idx) => (
                    <div className="doc-item" key={idx}><i className="fas fa-bezier-curve"></i> {item}</div>
                  ))}
                </div>
              </div>

              <div className="svc-content-section" data-reveal>
                <h2>Visual Identity Design Process</h2>
                <div className="process-steps">
                  {[
                    { title: "Discovery & Brand Identity Research", desc: "We begin by understanding your business, target audience, industry, competitors, and brand objectives to establish a strong strategic foundation." },
                    { title: "Brand Strategy Development", desc: "A clear brand positioning, messaging framework, mission, vision, and value proposition are defined to create a distinct market presence." },
                    { title: "Visual Direction & Concept Creation", desc: "Our team develops creative concepts, color palettes, typography, and visual styles that reflect your business personality and goals." },
                    { title: "Logo & Visual Asset Design", desc: "Unique visual assets are created to ensure consistency and recognition across all marketing channels and customer touchpoints." },
                    { title: "Brand Guidelines Creation", desc: "Comprehensive guidelines are developed to maintain consistency in visual communication, tone of voice, and brand application." },
                    { title: "Marketing & Digital Asset Design", desc: "Designs are created for websites, social platforms, presentations, business stationery, and promotional materials to ensure a cohesive presence." },
                    { title: "Review & Refinement", desc: "Feedback is incorporated and refinements are made to ensure all creative elements align with business objectives and audience expectations." },
                    { title: "Brand Identity Launch & Support", desc: "Once finalized, the new identity is implemented across channels, with ongoing support to maintain consistency and support future growth initiatives." }
                  ].map((step, idx) => (
                    <div className="ps-item" key={idx}>
                      <div className="ps-node">{idx + 1}</div>
                      <div className="ps-body">
                        <div className="ps-title">{step.title}</div>
                        <p className="ps-desc">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="svc-content-section" data-reveal>
                <h2>Why Work With MSR?</h2>
                <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '16px' }}>
                  Every brand identity project is handled by our dedicated design team with experience across industries. We don&apos;t use generic templates — every visual identity is custom-crafted.
                </p>
                <div className="benefits-grid">
                  {[
                    { icon: "fa-palette", isGold: false, title: "Expert Brand Designers", desc: "Seasoned designers who understand brand strategy and visual storytelling." },
                    { icon: "fa-bolt", isGold: true, title: "5–7 Day Delivery", desc: "Fast turnaround on logo and identity packages without compromising quality." },
                    { icon: "fa-comments", isGold: false, title: "WhatsApp + Email Communication", desc: "Direct communication with your assigned brand designer throughout the project." },
                    { icon: "fa-laptop-code", isGold: true, title: "100% Digital Process", desc: "All design work delivered digitally. No office visits needed." },
                    { icon: "fa-arrows-rotate", isGold: false, title: "Revision Rounds Included", desc: "Multiple revision rounds to ensure the final design is exactly what you envisioned." },
                    { icon: "fa-trophy", isGold: true, title: "98% Client Satisfaction", desc: "Consistent delivery of high-quality, impactful brand identities." }
                  ].map((b, idx) => (
                    <div className="benefit-item" key={idx}>
                      <div className={`benefit-icon ${b.isGold ? 'gold' : ''}`}><i className={`fas ${b.icon}`}></i></div>
                      <div>
                        <div className="benefit-title">{b.title}</div>
                        <div className="benefit-desc">{b.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          ) : normalizedId === 'mobile-application' ? (
            <div className="svc-body-main">
              <div className="svc-content-section" data-reveal>
                <h2>Mobile Application Development Company</h2>
                <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: '1.8' }}>
                  Looking for a trusted mobile app development company to bring your ideas to life? We specialize in mobile application development services that help businesses engage customers, streamline operations, and accelerate growth. Our experienced mobile application developers create innovative, scalable, and high-performance applications tailored to your unique business requirements. Whether you need an Android app, iOS application, cross-platform solution, or enterprise-grade software, our app development experts deliver mobile experiences that drive results.
                </p>
              </div>

              <div className="svc-content-section" data-reveal>
                <h2>Our App Development Services</h2>
                <div className="benefits-grid">
                  {[
                    { icon: "fa-mobile-screen", isGold: false, title: "Custom Mobile Application Development", desc: "We build custom mobile applications designed specifically for your business goals, target audience, and industry requirements. Our solutions are scalable, secure, and optimized for performance." },
                    { icon: "fa-android", isGold: true, title: "Android App Development", desc: "Our app developers create feature-rich Android applications that provide seamless user experiences across smartphones, tablets, and connected devices." },
                    { icon: "fa-apple", isGold: false, title: "iOS App Development", desc: "Develop premium iPhone and iPad applications with intuitive interfaces, advanced functionality, and high security standards." },
                    { icon: "fa-code-branch", isGold: true, title: "Cross-Platform App Development", desc: "Reduce mobile app development cost and accelerate deployment with cross-platform solutions that work across multiple operating systems." },
                    { icon: "fa-building", isGold: false, title: "Enterprise Mobile Applications", desc: "Enhance productivity and operational efficiency with enterprise-grade mobile applications designed for modern businesses." },
                    { icon: "fa-palette", isGold: true, title: "UI/UX Design for Mobile Apps", desc: "Our creative team designs intuitive user interfaces and engaging experiences that improve user retention and satisfaction." }
                  ].map((b, idx) => (
                    <div className="benefit-item" key={idx}>
                      <div className={`benefit-icon ${b.isGold ? 'gold' : ''}`}><i className={`fas ${b.icon}`}></i></div>
                      <div>
                        <div className="benefit-title">{b.title}</div>
                        <div className="benefit-desc">{b.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="svc-content-section" data-reveal>
                <h2>Our Custom Mobile Application Development Process</h2>
                <div className="process-steps">
                  {[
                    { title: "Discovery & Strategy", desc: "We analyze your business requirements, market opportunities, and user expectations to define a successful development roadmap." },
                    { title: "UI/UX Design", desc: "Our designers create wireframes, prototypes, and intuitive user experiences that align with your brand." },
                    { title: "Mobile Application Development", desc: "Our expert developers build robust applications using the latest technologies and industry best practices." },
                    { title: "Quality Assurance & Testing", desc: "We perform rigorous testing to ensure functionality, security, performance, and compatibility across devices." },
                    { title: "Deployment & Launch", desc: "Your app is deployed to app stores with complete optimization and compliance." },
                    { title: "Maintenance & Growth", desc: "We provide ongoing support, feature enhancements, and performance improvements." }
                  ].map((step, idx) => (
                    <div className="ps-item" key={idx}>
                      <div className="ps-node">{idx + 1}</div>
                      <div className="ps-body">
                        <div className="ps-title">{step.title}</div>
                        <p className="ps-desc">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="svc-content-section" data-reveal>
                <h2>Frequently Asked Questions</h2>
                <div className="faq-list" id="mobile-faq-list">
                  {[
                    { q: "How much does mobile app development cost?", a: "The cost depends on the app's features, complexity, platform requirements, and integrations. Contact us for a customized quote." },
                    { q: "How long does it take to develop a mobile application?", a: "Most projects take between 20 to 30 days, depending on scope and functionality." },
                    { q: "Do you develop apps for both Android and iOS?", a: "Yes. We offer Android, iOS, and cross-platform mobile application development services." },
                    { q: "Do you provide post-launch support?", a: "Yes. We offer maintenance, updates, monitoring, and technical support after launch." }
                  ].map((faq, idx) => {
                    const isOpen = openFaqIndex === idx + 200;
                    return (
                      <div className={`faq-item ${isOpen ? 'open' : ''}`} key={idx}>
                        <button suppressHydrationWarning={true} className="faq-question" onClick={() => setOpenFaqIndex(isOpen ? null : idx + 200)}>
                          {faq.q}<i className="fas fa-chevron-down"></i>
                        </button>
                        <div className="faq-answer" style={{ maxHeight: isOpen ? '1500px' : '0', padding: isOpen ? '0 20px 16px' : '0 20px', overflow: 'hidden', transition: 'max-height 0.35s ease, padding 0.35s ease' }}>
                          {faq.a}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

          ) : normalizedId === 'register-trademark-online' ? (
            <div className="svc-body-main">
              <div className="svc-content-section" data-reveal>
                <h2>Protect Your Brand with Professional Trademark Registration Services</h2>
                <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: '1.8' }}>
                  Your brand is one of your most valuable business assets. Registering a trademark helps protect your business name, logo, slogan, and identity from unauthorized use. Our trademark registration services simplify the process and help businesses secure legal protection quickly and efficiently. Whether you&apos;re a startup, entrepreneur, small business, or established company, our experts guide you through every step of trademark registration, from trademark search to application filing and approval.
                </p>
              </div>

              <div className="svc-content-section" data-reveal>
                <h2>Why Register a Trademark Name?</h2>
                <ul style={{ listStyle: 'none', paddingLeft: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {["Protect your business identity", "Prevent unauthorized use of your brand", "Build customer trust and credibility", "Gain exclusive legal rights", "Increase brand value", "Strengthen market presence", "Support business expansion"].map((item, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'var(--text-muted)' }}>
                      <i className="fas fa-check-circle" style={{ color: 'var(--success)', fontSize: '13px' }}></i>
                      <strong>{item}</strong>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="svc-content-section" data-reveal>
                <h2>Our Trademark Registration Services</h2>
                <div className="benefits-grid">
                  {[
                    { icon: "fa-search", isGold: false, title: "Trademark Search", desc: "We conduct a comprehensive trademark search to identify potential conflicts before filing your application." },
                    { icon: "fa-file-signature", isGold: true, title: "Trademark Filing", desc: "Our specialists prepare and submit your trademark application accurately to minimize delays and rejections." },
                    { icon: "fa-image", isGold: false, title: "Logo Trademark Registration", desc: "Protect your logo and visual identity with professional trademark filing services." },
                    { icon: "fa-trademark", isGold: true, title: "Brand Name Registration", desc: "Secure exclusive rights to your business name and protect your brand reputation." },
                    { icon: "fa-bell", isGold: false, title: "Trademark Monitoring", desc: "Monitor trademark activity and identify potential infringements that may affect your business." }
                  ].map((b, idx) => (
                    <div className="benefit-item" key={idx}>
                      <div className={`benefit-icon ${b.isGold ? 'gold' : ''}`}><i className={`fas ${b.icon}`}></i></div>
                      <div>
                        <div className="benefit-title">{b.title}</div>
                        <div className="benefit-desc">{b.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="svc-content-section" data-reveal>
                <h2>Our Trademark Registration Process</h2>
                <div className="process-steps">
                  {[
                    { title: "Trademark Search", desc: "Verify trademark availability and identify potential conflicts." },
                    { title: "Application Preparation", desc: "Gather necessary information and prepare the trademark application." },
                    { title: "Trademark Filing", desc: "Submit the application to the appropriate trademark authority." },
                    { title: "Examination & Review", desc: "Authorities review the application for compliance and eligibility." },
                    { title: "Registration Approval", desc: "Receive trademark registration and legal protection for your brand." }
                  ].map((step, idx) => (
                    <div className="ps-item" key={idx}>
                      <div className="ps-node">{idx + 1}</div>
                      <div className="ps-body">
                        <div className="ps-title">{step.title}</div>
                        <p className="ps-desc">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="svc-content-section" data-reveal>
                <h2>Frequently Asked Questions</h2>
                <div className="faq-list" id="tm-faq-list">
                  {[
                    { q: "How long does trademark registration take?", a: "The timeline varies depending on jurisdiction and examination procedures, but registration typically takes several months." },
                    { q: "Can I register a business name as a trademark?", a: "Yes. Business names, logos, slogans, and brand elements can often be registered as trademarks." },
                    { q: "Why should I register a trademark?", a: "Trademark registration grants legal protection and exclusive rights to your brand identity." },
                    { q: "Do you provide trademark consultation?", a: "Yes. We offer complete trademark consultation and filing support." }
                  ].map((faq, idx) => {
                    const isOpen = openFaqIndex === idx + 300;
                    return (
                      <div className={`faq-item ${isOpen ? 'open' : ''}`} key={idx}>
                        <button suppressHydrationWarning={true} className="faq-question" onClick={() => setOpenFaqIndex(isOpen ? null : idx + 300)}>
                          {faq.q}<i className="fas fa-chevron-down"></i>
                        </button>
                        <div className="faq-answer" style={{ maxHeight: isOpen ? '1500px' : '0', padding: isOpen ? '0 20px 16px' : '0 20px', overflow: 'hidden', transition: 'max-height 0.35s ease, padding 0.35s ease' }}>
                          {faq.a}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="svc-content-section" data-reveal>
                <h2>Ready to Register Your Trademark?</h2>
                <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '16px' }}>
                  Protect your brand, logo, and business identity with professional trademark registration services. Contact our experts today and start your trademark registration process with confidence.
                </p>
                <button suppressHydrationWarning={true} className="btn btn-md btn-primary" onClick={handleInquiryClick} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  Request a Free Consultation <i className="fas fa-arrow-right"></i>
                </button>
              </div>
            </div>

          ) : normalizedId === 'copyright-registration' ? (
            <div className="svc-body-main">
              <div className="svc-content-section" data-reveal>
                <h2>Protect your books, music, software, artwork, and digital content with expert copyright registration services and secure legal ownership rights.</h2>
                <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: '1.8' }}>
                  Copyright registration helps creators, businesses, artists, authors, and software developers secure legal ownership of their original work. Whether you need to protect literary content, music, software, artwork, videos, or digital assets, our copyright registration services simplify the process and ensure your intellectual property receives the protection it deserves. Our experts assist with document preparation, copyright application filing, and end-to-end support to help you register your copyright quickly and efficiently.
                </p>
              </div>

              <div className="svc-content-section" data-reveal>
                <h2>Register Copyright Services</h2>
                <div className="benefits-grid">
                  {[
                    { icon: "fa-search", isGold: false, title: "Copyright Search & Consultation", desc: "Our specialists review your work and provide guidance on copyright eligibility and registration requirements." },
                    { icon: "fa-file-signature", isGold: true, title: "Copyright Application Filing", desc: "We prepare and submit copyright applications accurately to reduce processing delays." },
                    { icon: "fa-code", isGold: false, title: "Software Copyright Registration", desc: "Protect software applications, source code, and digital products through copyright registration." },
                    { icon: "fa-pen-nib", isGold: true, title: "Content & Creative Work Protection", desc: "Secure ownership rights for blogs, articles, books, artwork, music, and multimedia content." },
                    { icon: "fa-headset", isGold: false, title: "End-to-End Registration Support", desc: "From documentation to application filing and status tracking, we manage the complete registration process." }
                  ].map((b, idx) => (
                    <div className="benefit-item" key={idx}>
                      <div className={`benefit-icon ${b.isGold ? 'gold' : ''}`}><i className={`fas ${b.icon}`}></i></div>
                      <div>
                        <div className="benefit-title">{b.title}</div>
                        <div className="benefit-desc">{b.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="svc-content-section" data-reveal>
                <h2>Copyright Registration Process</h2>
                <div className="process-steps">
                  {[
                    { title: "Document Review", desc: "Assess eligibility and gather required information." },
                    { title: "Application Preparation", desc: "Prepare copyright application and supporting documents." },
                    { title: "Copyright Filing", desc: "Submit the application to the relevant authority." },
                    { title: "Examination Process", desc: "Application review and verification." },
                    { title: "Registration Certificate", desc: "Receive copyright registration confirmation and legal protection." }
                  ].map((step, idx) => (
                    <div className="ps-item" key={idx}>
                      <div className="ps-node">{idx + 1}</div>
                      <div className="ps-body">
                        <div className="ps-title">{step.title}</div>
                        <p className="ps-desc">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="svc-content-section" data-reveal>
                <h2>Frequently Asked Questions</h2>
                <div className="faq-list" id="cr-faq-list">
                  {[
                    { q: "Why is copyright registration important?", a: "Copyright registration provides legal evidence of ownership and helps protect your original work from unauthorized use." },
                    { q: "Can software be copyrighted?", a: "Yes. Software, source code, applications, and digital products can be protected through copyright registration." },
                    { q: "How long does copyright registration take?", a: "Processing times vary depending on the authority and application requirements." },
                    { q: "Who can apply for copyright registration?", a: "Authors, artists, musicians, software developers, businesses, and content creators can apply for copyright registration." }
                  ].map((faq, idx) => {
                    const isOpen = openFaqIndex === idx + 400;
                    return (
                      <div className={`faq-item ${isOpen ? 'open' : ''}`} key={idx}>
                        <button suppressHydrationWarning={true} className="faq-question" onClick={() => setOpenFaqIndex(isOpen ? null : idx + 400)}>
                          {faq.q}<i className="fas fa-chevron-down"></i>
                        </button>
                        <div className="faq-answer" style={{ maxHeight: isOpen ? '1500px' : '0', padding: isOpen ? '0 20px 16px' : '0 20px', overflow: 'hidden', transition: 'max-height 0.35s ease, padding 0.35s ease' }}>
                          {faq.a}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

          ) : normalizedId === 'patent-application-india' ? (
            <div className="svc-body-main">
              <div className="svc-content-section" data-reveal>
                <h2>What is a Patent Application?</h2>
                <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: '1.8' }}>
                  A patent application is a formal legal request submitted to the Indian Patent Office (IPO) to secure exclusive rights over a new invention, process, or product. Once granted, a patent gives the inventor the right to prevent others from making, using, or selling the invention without permission for up to 20 years in India. Filing a patent application requires precise technical drafting, legal compliance under the Patents Act, 1970, and timely follow-up with the patent office — which is why professional guidance is critical.
                </p>
              </div>

              <div className="svc-content-section" data-reveal>
                <h2>Types of Patents We File</h2>
                <div className="benefits-grid">
                  {[
                    { icon: "fa-file-alt", isGold: false, title: "Provisional Patent Application", desc: "Filed when your invention is still being developed. Establishes a priority date immediately and gives you 12 months to file the complete specification. Ideal for startups and early-stage inventors." },
                    { icon: "fa-file-signature", isGold: true, title: "Complete Patent Application", desc: "Filed with full technical specifications, claims, and drawings. Can be filed independently or after a provisional application. This is the application that proceeds toward grant." },
                    { icon: "fa-globe", isGold: false, title: "PCT (International) Patent Filing", desc: "For inventors seeking protection in multiple countries simultaneously. We handle PCT filings under the Patent Cooperation Treaty with WIPO, covering 150+ countries." },
                    { icon: "fa-flag", isGold: true, title: "Convention/Priority Application", desc: "For applicants who have already filed in a foreign country and wish to claim priority in India within 12 months." }
                  ].map((b, idx) => (
                    <div className="benefit-item" key={idx}>
                      <div className={`benefit-icon ${b.isGold ? 'gold' : ''}`}><i className={`fas ${b.icon}`}></i></div>
                      <div>
                        <div className="benefit-title">{b.title}</div>
                        <div className="benefit-desc">{b.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="svc-content-section" data-reveal>
                <h2>Documents Required for Patent Filing in India</h2>
                <div className="docs-list">
                  {[
                    "Form 1 — Application for Grant of Patent",
                    "Form 2 — Provisional or Complete Specification",
                    "Form 5 — Declaration as to Inventorship",
                    "Form 26 — Power of Attorney (if filed through agent)",
                    "Proof of right to file (assignment deed, if applicable)",
                    "Drawings/diagrams of the invention (if applicable)",
                    "PAN & Aadhaar of the applicant(s)"
                  ].map((doc, idx) => (
                    <div className="doc-item" key={idx}><i className="fas fa-file-invoice"></i> {doc}</div>
                  ))}
                </div>
              </div>

              <div className="svc-content-section" data-reveal>
                <h2>Patent Application Process in India — Step by Step</h2>
                <div className="process-steps">
                  {[
                    { title: "Prior Art Search", desc: "Before filing, our experts conduct a prior art search to ensure your invention is novel and non-obvious." },
                    { title: "Drafting the Specification", desc: "We draft the complete patent specification — abstract, claims, description, and drawings — with technical precision." },
                    { title: "Filing with Indian Patent Office", desc: "The application is filed electronically with the appropriate IPO (Delhi, Mumbai, Chennai, or Kolkata) based on your jurisdiction." },
                    { title: "Publication", desc: "Your patent application is published in the official Patent Journal — typically 18 months from the filing/priority date." },
                    { title: "Request for Examination (RFE)", desc: "We file Form 18 to request substantive examination of your patent application." },
                    { title: "Examination & Objections", desc: "The Patent Office may raise objections (First Examination Report). Our team prepares and submits the response." },
                    { title: "Grant of Patent", desc: "Once all objections are addressed and the application meets all criteria, the patent is granted and published in the Patent Journal." }
                  ].map((step, idx) => (
                    <div className="ps-item" key={idx}>
                      <div className="ps-node">{idx + 1}</div>
                      <div className="ps-body">
                        <div className="ps-title">{step.title}</div>
                        <p className="ps-desc">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="svc-content-section" data-reveal>
                <h2>Frequently Asked Questions — Patent Application</h2>
                <div className="faq-list" id="patent-faq-list">
                  {[
                    { q: "How long does a patent application take to get granted in India?", a: "The typical timeline from filing to grant is 2–4 years, depending on the technology field and examination backlog. Filing early and responding to objections promptly helps reduce delays." },
                    { q: "Can I file a patent application online in India?", a: "Yes. The Indian Patent Office accepts e-filing through the IP India portal. MSR Assessment handles the entire filing process digitally on your behalf." },
                    { q: "What can be patented in India?", a: "Any novel, inventive, and industrially applicable invention — including products, processes, machines, and compositions — can be patented. Certain items like mathematical methods, business methods, and discoveries are excluded under the Patents Act." },
                    { q: "What is the difference between a provisional and complete patent application?", a: "A provisional application is filed to secure an early priority date when the invention is not fully ready. A complete application includes all technical details and is required for the patent to proceed to examination and grant." },
                    { q: "Can a startup or individual afford to file a patent in India?", a: "Yes. The Indian Patent Office offers significantly reduced government fees for individuals and recognized startups. MSR Assessment's professional fees are also structured to be startup-friendly." },
                    { q: "Do I need a patent attorney to file?", a: "While not legally mandatory, having a qualified professional handle the drafting and prosecution significantly improves the chances of grant and reduces objections." }
                  ].map((faq, idx) => {
                    const isOpen = openFaqIndex === idx + 500;
                    return (
                      <div className={`faq-item ${isOpen ? 'open' : ''}`} key={idx}>
                        <button suppressHydrationWarning={true} className="faq-question" onClick={() => setOpenFaqIndex(isOpen ? null : idx + 500)}>
                          {faq.q}<i className="fas fa-chevron-down"></i>
                        </button>
                        <div className="faq-answer" style={{ maxHeight: isOpen ? '1500px' : '0', padding: isOpen ? '0 20px 16px' : '0 20px', overflow: 'hidden', transition: 'max-height 0.35s ease, padding 0.35s ease' }}>
                          {faq.a}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="svc-body-main">

              {/* About Section */}
              <div className="svc-content-section" data-reveal>
                <h3><i className="fas fa-info-circle"></i> {t("About This Service")}</h3>
                <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: '1.8' }} id="svc-about-text">
                  {service.desc} {expertTeamDesc} {t("Our experts have handled hundreds similar cases and understand every nuance of this process.")}
                </p>
              </div>

              {/* Benefits */}
              <div className="svc-content-section" data-reveal>
                <h3><i className="fas fa-check-circle"></i> {t("Key Benefits")}</h3>
                <div className="benefits-grid">
                  {targetBenefits.map((b, idx) => (
                    <div className="benefit-item" key={idx}>
                      <div className={`benefit-icon ${b.isGold ? 'gold' : ''}`}><i className={`fas ${b.icon}`}></i></div>
                      <div>
                        <div className="benefit-title">{idx === 0 ? benefitTitle : t(b.title)}</div>
                        <div className="benefit-desc">{idx === 0 ? benefitDesc : t(b.desc)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Eligibility */}
              {service.eligibility && service.eligibility.length > 0 && (
                <div className="svc-content-section" data-reveal id="svc-eligibility-section">
                  <h3><i className="fas fa-check-circle"></i> {t("Eligibility Criteria")}</h3>
                  <ul id="svc-eligibility-list" style={{ listStyle: 'none', paddingLeft: '0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {service.eligibility.map((item, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', color: 'var(--text-muted)' }}>
                        <i className="fas fa-check-circle" style={{ color: 'var(--success)', fontSize: '12px' }}></i> {t(item)}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Documents Required */}
              {service.documents && service.documents.length > 0 && (
                <div className="svc-content-section" data-reveal>
                  <h3>
                    <i className="fas fa-folder-open"></i>{' '}
                    {['digital', 'training', 'audit', 'docs'].includes(category.id)
                      ? t("Core Features & Offerings")
                      : t("Documents Required")}
                  </h3>
                  <div className="docs-list" id="svc-docs-list">
                    {service.documents.map((doc, idx) => (
                      <div className="doc-item" key={idx}>
                        <i className="fas fa-file-invoice"></i> {t(doc)}
                      </div>
                    ))}
                  </div>
                  {!['digital', 'training', 'audit', 'docs'].includes(category.id) && (
                    <p style={{ fontSize: '12.5px', color: 'var(--text-faint)', marginTop: '12px' }}>
                      <i className="fas fa-info-circle"></i> {t("Our expert will provide a precise document checklist specific to your case after your consultation.")}
                    </p>
                  )}
                </div>
              )}

              {/* Our Process */}
              {service.process && service.process.length > 0 && (
                <div className="svc-content-section" data-reveal>
                  <h3><i className="fas fa-route"></i> {t("Our Process")}</h3>
                  <div className="process-steps">
                    {service.process.map((step, idx) => (
                      <div className="ps-item" key={idx}>
                        <div className="ps-node">{idx + 1}</div>
                        <div className="ps-body">
                          <div className="ps-title">{t(step.title)}</div>
                          <p className="ps-desc">{t(step.desc)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQs */}
              {service.faqs && service.faqs.length > 0 && (
                <div className="svc-content-section" data-reveal>
                  <h3>
                    <i className="fas fa-question-circle"></i> {t("Frequently Asked Questions")}
                  </h3>
                  <div className="faq-list" id="svc-faq-list">
                    {service.faqs.map((faq, idx) => {
                      const isOpen = openFaqIndex === idx;
                      return (
                        <div className={`faq-item ${isOpen ? 'open' : ''}`} key={idx}>
                          <button suppressHydrationWarning={true}
                            className="faq-question"
                            onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                          >
                            {t(faq.q)}
                            <i className="fas fa-chevron-down"></i>
                          </button>
                          <div
                            className="faq-answer"
                            style={{
                              maxHeight: isOpen ? '1500px' : '0',
                              padding: isOpen ? '0 20px 16px' : '0 20px',
                              overflow: 'hidden',
                              transition: 'max-height 0.35s ease, padding 0.35s ease'
                            }}
                          >
                            {t(faq.a)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Related Services */}
              {relatedServices.length > 0 && (
                <div className="svc-content-section" data-reveal>
                  <h3><i className="fas fa-link"></i> {t("Related Services")}</h3>
                  <div className="related-grid" id="related-grid">
                    {relatedServices.map((item, idx) => {
                      const slug = item.id || slugify(item.title);
                      return (
                        <Link href={`/service/${slug}/`} className="related-card" key={idx}>
                          <div className="related-icon"><i className={`fas ${item.icon}`}></i></div>
                          <div>
                            <div className="related-title">{t(item.title)}</div>
                            <div className="related-time">
                              <i className="far fa-clock" style={{ fontSize: '10px', marginRight: '4px', color: 'var(--accent)' }}></i>
                              {t(item.time)}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Sidebar */}
          <div>
            <div className="svc-sidebar-sticky">
              <div className="expert-card">
                <h4>{t("Why Work With MSR?")}</h4>
                <p>{t("Every service is personally owned by a qualified CA or CS — not a junior assistant. We've handled 5,000+ business compliance requirements since 2013.")}</p>
                <div className="expert-assurances">
                  <div className="ea-item"><i className="fas fa-check-circle"></i> {t("Qualified CA & CS Professionals")}</div>
                  <div className="ea-item"><i className="fas fa-check-circle"></i> {t("Transparent, Fixed Pricing")}</div>
                  <div className="ea-item"><i className="fas fa-check-circle"></i> {t("72-Hour Turnaround for Most Services")}</div>
                  <div className="ea-item"><i className="fas fa-check-circle"></i> {t("Pan-India Filing Capability")}</div>
                  <div className="ea-item"><i className="fas fa-check-circle"></i> {t("100% Digital, No Office Visits")}</div>
                  <div className="ea-item"><i className="fas fa-check-circle"></i> {t("Dedicated Relationship Manager")}</div>
                </div>
              </div>

              <button suppressHydrationWarning={true} className="btn btn-md btn-primary" onClick={handleInquiryClick} style={{ width: '100%', justifyContent: 'center' }}>
                <i className="fas fa-paper-plane"></i> {t("Send Inquiry Now")}
              </button>

              <div style={{ textAlign: 'center', marginTop: '12px' }}>
                <a href="tel:+918337004170" style={{ fontSize: '13px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  <i className="fas fa-phone" style={{ color: 'var(--primary)' }}></i>
                  {t("Call: +91 83370 04170")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
