"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { categories, subData, articles, slugify } from '@/data/servicesData';

const coreServicesSlides = [
  {
    title: "ISO Certification Services",
    desc: "ISO 9001, ISO 27001, ISO 14001, ISO 45001, ISO 22000 and industry-specific certifications.",
    bg: "/assets/global_business_map_visualization_with_data_nodes_and_connections_styliz.png",
    link: "/iso-certification/",
    icon: "fa-certificate"
  },
  {
    title: "IPR Registration Services",
    desc: "Trademark Registration, Copyright Registration, Patent Assistance, Design Registration and Brand Protection.",
    bg: "/assets/two_professional_businessmen_in_suits_shaking_hands_in_a_high_rise_office.png",
    link: "/trademark-registration/",
    icon: "fa-trademark"
  },
  {
    title: "Digital Marketing Services",
    desc: "SEO, Google Ads, Social Media management, Local SEO and Lead Generation.",
    bg: "/assets/elegant_executive_board_room_with_glass_doors_and_professional_seating.png",
    link: "/digital-marketing/",
    icon: "fa-chart-line"
  },
  {
    title: "Web Development Services",
    desc: "Business Websites, Ecommerce Stores, Corporate Portals and Custom Web Applications, CRM.",
    bg: "/assets/modern_high_rise_corporate_office_building_with_glass_facade_representing.png",
    link: "/service/web-development/",
    icon: "fa-laptop-code"
  }
];

const googleReviewsList = [
  { name: "Rahul Sharma", date: "2 weeks ago", text: "MSR Assessment provided excellent support for our ISO 9001 certification. Very professional team and smooth process." },
  { name: "Ananya Desai", date: "1 month ago", text: "Highly recommend their trademark registration services. They handled all our queries promptly and ensured a hassle-free filing." },
  { name: "Vikram Singh", date: "2 months ago", text: "Outstanding ISO 27001 audit support. The auditors were extremely knowledgeable and guided us through the entire compliance process." },
  { name: "Priya Patel", date: "3 months ago", text: "Best corporate compliance consultants in India. They assisted us with GST setup, company incorporation, and FSSAI licensing seamlessly." },
  { name: "Arjun Mehta", date: "4 months ago", text: "Their digital marketing and web development team helped us revamp our online presence and significantly boosted our local SEO rankings." }
];

export default function Home() {
  const { t, locale, translateCategory, translateService } = useLanguage();

  // Tab state
  const [activeTab, setActiveTab] = useState('iso');

  // Certificate verification state
  const [certInput, setCertInput] = useState('');
  const [certResult, setCertResult] = useState(null);

  // Stats count-up state (simple trigger)
  const [countStats, setCountStats] = useState({ served: 0, yrs: 0, rate: 0 });
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeBookTab, setActiveBookTab] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setActiveSlide((prev) => (prev === coreServicesSlides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(slideInterval);
  }, []);

  // Auto-advance book spreads every 6 seconds
  useEffect(() => {
    const bookTimer = setInterval(() => {
      setActiveBookTab(prev => (prev === 2 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(bookTimer);
  }, []);

  useEffect(() => {
    // Simple count-up trigger after mounting
    const timer = setTimeout(() => {
      setCountStats({ served: 5000, yrs: 12, rate: 98 });
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const handleVerifyCert = () => {
    const val = certInput.trim().toUpperCase();
    if (!val) {
      alert(t('Please enter a certificate number.'));
      return;
    }

    const certDb = {
      'MSR-QMS-2026-4891': { company: 'TechForge Solutions Pvt Ltd', standard: 'ISO 9001:2015 (QMS)', status: 'Active', issue: '14-Jan-2026', expiry: '13-Jan-2029', scope: 'Design, development, and deployment of enterprise SaaS and cloud infrastructure platforms.' },
      'MSR-ISMS-2026-9042': { company: 'Zenith Labs India', standard: 'ISO 27001:2022 (ISMS)', status: 'Active', issue: '22-Mar-2026', expiry: '21-Mar-2029', scope: 'Information security management for biotechnology research databases and clinical operations.' },
      'MSR-EMS-2026-3118': { company: 'Sunburst Energy Systems', standard: 'ISO 14001:2015 (EMS)', status: 'Active', issue: '05-Feb-2026', expiry: '04-Feb-2029', scope: 'Installation and management of commercial photovoltaic arrays and hybrid grids.' },
      'MSR-FSMS-2026-0722': { company: 'Organic Roots Foods LLP', standard: 'ISO 22000:2018 (FSMS)', status: 'Active', issue: '19-May-2026', expiry: '18-May-2029', scope: 'Processing, packaging, and supply chain logistics of organic spices and certified food products.' }
    };

    const cert = certDb[val] || certDb[val.replace(/\s+/g, '')];
    if (cert) {
      setCertResult({ success: true, ...cert });
    } else {
      setCertResult({ success: false, query: val });
    }
  };

  const currentCategory = categories.find(c => c.id === activeTab);
  const translatedCategory = translateCategory(activeTab, currentCategory);
  const rawSubServices = subData[activeTab] || [];
  const translatedSubServices = rawSubServices.map(item => translateService(item.title, item));

  // Helper to dynamically match service path
  const getServiceLink = (title) => {
    const tLower = title.toLowerCase();
    if (tLower.includes('9001')) return '/service/iso-9001-certification/';
    if (tLower.includes('14001')) return '/service/iso-14001-certification/';
    if (tLower.includes('45001')) return '/service/iso-45001-certification/';
    if (tLower.includes('27001')) return '/service/iso-27001-certification/';
    if (tLower.includes('22000')) return '/service/iso-22000-certification/';
    if (tLower.includes('13485')) return '/service/iso-13485-certification/';
    if (tLower.includes('50001')) return '/service/iso-50001-certification/';
    if (tLower.includes('31000')) return '/service/iso-31000-consulting/';
    if (tLower.includes('internal audit') || tLower.includes('audit services')) return '/internal-audit-services/';
    if (tLower.includes('compliance')) return '/compliance-consulting/';
    if (tLower.includes('governance')) return '/compliance-consulting/';
    return `/service/${slugify(title)}/`;
  };

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section" aria-label="Hero" id="hero">
        <div className="hero-bg-media"></div>
        <div className="hero-bg-overlay"></div>

        <div className="hero-wrap">
          <div className="hero-left">
            <div className="hero-badge-row">
              <span className="hero-badge"><i className="fas fa-shield-check"></i> MCA &amp; ROC Filings</span>
              <span className="hero-badge"><i className="fas fa-certificate"></i> ISO Certification Body</span>
              <span className="hero-badge"><i className="fas fa-trademark"></i> Trademark &amp; GST Setup</span>
            </div>

            <h1 className="hero-headline" style={{ fontSize: 'clamp(26px, 4vw, 42px)', lineHeight: 1.15 }}>
              {t("ISO Certification Services in India & Worldwide | Fast, Reliable & Affordable Certification Solutions")}
            </h1>

            <p className="hero-body" style={{ fontSize: '18px', fontWeight: '600', color: 'var(--accent)', marginTop: '8px', marginBottom: '12px', lineHeight: '1.4' }}>
              {t("Get ISO certified with expert auditors and a hassle-free certification process. MSR Assessment helps businesses achieve ISO 9001, ISO 14001, ISO 45001, ISO 22000, ISO 27001, Product Certification, and compliance certifications across multiple industries worldwide.")}
            </p>

            <div className="hero-actions">
              <button suppressHydrationWarning={true}
                className="btn btn-lg btn-primary"
                onClick={() => {
                  const modal = document.getElementById('inquiry-modal');
                  if (modal) modal.classList.add('open');
                }}
              >
                {t("Get Free ISO Consultation")} <i className="fas fa-arrow-right"></i>
              </button>
              <a href="#services-section" className="btn btn-lg btn-outline">
                <i className="fas fa-th-large"></i> Explore Services
              </a>
            </div>

            {/* Metric Card */}
            <div className="hero-metrics-card">
              <div className="hero-trust-stat">
                <div className="ht-num"><span>{countStats.served.toLocaleString('en-IN')}</span><em>+</em></div>
                <div className="ht-label">{t("Businesses Served")}</div>
              </div>
              <div className="hero-divider"></div>
              <div className="hero-trust-stat">
                <div className="ht-num"><span>{countStats.yrs}</span><em>+ Yrs</em></div>
                <div className="ht-label">In Operation</div>
              </div>
              <div className="hero-divider"></div>
              <div className="hero-trust-stat">
                <div className="ht-num"><span>{countStats.rate}</span><em>%</em></div>
                <div className="ht-label">Success Rate</div>
              </div>
            </div>

            <div className="hero-accreditations">
              <span className="accred-label">Recognized Regulatory Bodies:</span>
              <span className="accred-item"><i className="fas fa-landmark"></i> Ministry of Corporate Affairs</span>
              <span className="accred-item"><i className="fas fa-balance-scale"></i> ICSI</span>
              <span className="accred-item"><i className="fas fa-building"></i> ICAI</span>
            </div>
          </div>

          {/* Right: Open Book — Two-Page Spread Catalog */}
          <div className="hero-right">
            <div className="open-book">
              {/* Book Cover Shadow / Depth */}
              <div className="book-cover-shadow"></div>

              {/* Book Body */}
              <div className="book-body">

                {/* LEFT PAGE */}
                <div className={`book-leaf book-leaf-left spread-${activeBookTab}`} key={`left-${activeBookTab}`}>
                  {activeBookTab === 0 && (
                    <>
                      <div className="leaf-header">
                        <div className="leaf-icon"><i className="fas fa-certificate"></i></div>
                        <div>
                          <div className="leaf-title">ISO Certification</div>
                          <div className="leaf-sub">Accredited · NABCB · IAS</div>
                        </div>
                      </div>
                      <div className="leaf-list">
                        {[
                          { code: '9001', name: 'ISO 9001', tag: 'Quality Management', link: '/service/iso-9001-certification/' },
                          { code: '14001', name: 'ISO 14001', tag: 'Environmental Mgmt', link: '/service/iso-14001-certification/' },
                          { code: '27001', name: 'ISO 27001', tag: 'Information Security', link: '/service/iso-27001-certification/' },
                          { code: '45001', name: 'ISO 45001', tag: 'Occupational Health', link: '/service/iso-45001-certification/' },
                          { code: '22000', name: 'ISO 22000', tag: 'Food Safety FSMS', link: '/service/iso-22000-certification/' },
                          { code: '13485', name: 'ISO 13485', tag: 'Medical Devices QMS', link: '/service/iso-13485-certification/' },
                          { code: '31000', name: 'ISO 31000', tag: 'Risk Management', link: '/service/iso-31000-consulting/' },
                        ].map((s, i) => (
                          <Link key={i} href={s.link} className="leaf-row">
                            <span className="lr-code">{s.code}</span>
                            <div className="lr-info">
                              <span className="lr-name">{s.name}</span>
                              <span className="lr-tag">{s.tag}</span>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div className="leaf-footer"><i className="fas fa-shield-check"></i> Pan-India ISO Body</div>
                    </>
                  )}
                  {activeBookTab === 1 && (
                    <>
                      <div className="leaf-header">
                        <div className="leaf-icon"><i className="fas fa-laptop-code"></i></div>
                        <div>
                          <div className="leaf-title">Digital & Web</div>
                          <div className="leaf-sub">SEO · Dev · Marketing</div>
                        </div>
                      </div>
                      <div className="leaf-list">
                        {[
                          { code: 'WEB', name: 'Website Development', tag: 'Corporate · eCommerce', link: '/service/web-development/' },
                          { code: 'APP', name: 'App Development', tag: 'iOS · Android', link: '/service/app-development/' },
                          { code: 'SEO', name: 'SEO Services India', tag: 'Google Rankings', link: '/service/seo-services/' },
                          { code: 'PPC', name: 'Google Ads / PPC', tag: 'Lead Generation', link: '/service/google-ads-ppc/' },
                          { code: 'SMM', name: 'Social Media Mktg', tag: 'Facebook · Instagram', link: '/service/social-media-marketing/' },
                          { code: 'ECM', name: 'Ecommerce Solutions', tag: 'Shopify · WooCommerce', link: '/service/ecommerce-development/' },
                          { code: 'BRD', name: 'Branding & Design', tag: 'Logo · Identity', link: '/service/branding-design/' },
                        ].map((s, i) => (
                          <Link key={i} href={s.link} className="leaf-row">
                            <span className="lr-code">{s.code}</span>
                            <div className="lr-info">
                              <span className="lr-name">{s.name}</span>
                              <span className="lr-tag">{s.tag}</span>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div className="leaf-footer"><i className="fas fa-chart-line"></i> Digital Growth Partner</div>
                    </>
                  )}
                  {activeBookTab === 2 && (
                    <>
                      <div className="leaf-header">
                        <div className="leaf-icon"><i className="fas fa-file-invoice-dollar"></i></div>
                        <div>
                          <div className="leaf-title">Tax & Licensing</div>
                          <div className="leaf-sub">GST · ITR · Compliance</div>
                        </div>
                      </div>
                      <div className="leaf-list">
                        {[
                          { code: 'GST', name: 'GST Filing & Returns', tag: 'GSTR-1 · GSTR-3B', link: '/service/gst-filing/' },
                          { code: 'ITR', name: 'Income Tax Returns', tag: 'Individual · Corporate', link: '/service/income-tax-return/' },
                          { code: 'TDS', name: 'TDS Compliance', tag: 'Deduction · Filing', link: '/service/tds-compliance/' },
                          { code: 'TRD', name: 'Trade License', tag: 'Municipal · Shops Act', link: '/service/trade-license/' },
                          { code: 'PF', name: 'PF & ESI Registration', tag: 'Labour · EPFO', link: '/service/pf-esi-registration/' },
                          { code: 'ROC', name: 'Annual ROC Filings', tag: 'MCA · AGM Reports', link: '/service/roc-annual-filing/' },
                        ].map((s, i) => (
                          <Link key={i} href={s.link} className="leaf-row">
                            <span className="lr-code">{s.code}</span>
                            <div className="lr-info">
                              <span className="lr-name">{s.name}</span>
                              <span className="lr-tag">{s.tag}</span>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div className="leaf-footer"><i className="fas fa-calculator"></i> CA & CS Managed Filings</div>
                    </>
                  )}
                </div>

                {/* CENTER SPINE */}
                <div className="book-spine">
                  <div className="spine-line"></div>
                  <div className="spine-shadow-left"></div>
                  <div className="spine-shadow-right"></div>
                </div>

                {/* RIGHT PAGE */}
                <div className={`book-leaf book-leaf-right spread-${activeBookTab}`} key={`right-${activeBookTab}`}>
                  {activeBookTab === 0 && (
                    <>
                      <div className="leaf-header">
                        <div className="leaf-icon"><i className="fas fa-building-columns"></i></div>
                        <div>
                          <div className="leaf-title">Company Registration</div>
                          <div className="leaf-sub">MCA · ROC · DPIIT</div>
                        </div>
                      </div>
                      <div className="leaf-list">
                        {[
                          { code: 'PVT', name: 'Private Limited Co.', tag: 'ROC · MCA Registration', link: '/service/private-limited-company-registration-india/' },
                          { code: 'LLP', name: 'LLP Registration', tag: 'Limited Liability', link: '/service/llp-registration-india/' },
                          { code: 'OPC', name: 'OPC Registration', tag: 'One Person Company', link: '/service/opc-registration/' },
                          { code: 'GST', name: 'GST Registration', tag: 'GSTIN · Input Tax', link: '/service/gst-registration/' },
                          { code: 'FSSAI', name: 'FSSAI License', tag: 'Food Safety', link: '/service/fssai-registration/' },
                          { code: 'MSME', name: 'MSME / Udyam', tag: 'Govt Benefits', link: '/service/msme-registration/' },
                          { code: 'IEC', name: 'IEC Registration', tag: 'Import Export · DGFT', link: '/service/iec-registration/' },
                        ].map((s, i) => (
                          <Link key={i} href={s.link} className="leaf-row">
                            <span className="lr-code">{s.code}</span>
                            <div className="lr-info">
                              <span className="lr-name">{s.name}</span>
                              <span className="lr-tag">{s.tag}</span>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div className="leaf-footer"><i className="fas fa-landmark"></i> MCA · ROC Filings</div>
                    </>
                  )}
                  {activeBookTab === 1 && (
                    <>
                      <div className="leaf-header">
                        <div className="leaf-icon"><i className="fas fa-trademark"></i></div>
                        <div>
                          <div className="leaf-title">IPR & Trademark</div>
                          <div className="leaf-sub">IP India · Patent · Copyright</div>
                        </div>
                      </div>
                      <div className="leaf-list">
                        {[
                          { code: 'TM', name: 'Trademark Registration', tag: 'Brand · IP India', link: '/trademark-registration/' },
                          { code: 'CPY', name: 'Copyright Registration', tag: 'Creative Works', link: '/service/copyright-registration/' },
                          { code: 'PAT', name: 'Patent Filing', tag: 'Invention Patent', link: '/service/patent-filing/' },
                          { code: 'DSN', name: 'Design Registration', tag: 'Industrial Design', link: '/service/design-registration/' },
                          { code: 'TMO', name: 'Trademark Objection', tag: 'Reply · Hearing', link: '/service/trademark-objection/' },
                          { code: 'TMR', name: 'Trademark Renewal', tag: 'Class Renewal', link: '/service/trademark-renewal/' },
                        ].map((s, i) => (
                          <Link key={i} href={s.link} className="leaf-row">
                            <span className="lr-code">{s.code}</span>
                            <div className="lr-info">
                              <span className="lr-name">{s.name}</span>
                              <span className="lr-tag">{s.tag}</span>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div className="leaf-footer"><i className="fas fa-shield-halved"></i> IP India Practitioners</div>
                    </>
                  )}
                  {activeBookTab === 2 && (
                    <>
                      <div className="leaf-header">
                        <div className="leaf-icon"><i className="fas fa-certificate"></i></div>
                        <div>
                          <div className="leaf-title">ISO Standards</div>
                          <div className="leaf-sub">Audits · Compliance</div>
                        </div>
                      </div>
                      <div className="leaf-list">
                        {[
                          { code: 'AUDIT', name: 'Internal Audit', tag: 'Gap Assessment · Stage 1', link: '/internal-audit-services/' },
                          { code: 'SURV', name: 'Surveillance Audit', tag: 'Annual Renewal Audit', link: '/iso-certification/' },
                          { code: 'CERT', name: 'Certification Audit', tag: 'Stage 2 · Registry', link: '/certification-process/' },
                          { code: 'TRAIN', name: 'ISO Awareness Training', tag: 'Lead Auditor Course', link: '/iso-certification/' },
                          { code: 'ISMS', name: 'ISMS Implementation', tag: 'ISO 27001 Setup', link: '/service/iso-27001-certification/' },
                          { code: 'QMS', name: 'QMS Implementation', tag: 'ISO 9001 Setup', link: '/service/iso-9001-certification/' },
                        ].map((s, i) => (
                          <Link key={i} href={s.link} className="leaf-row">
                            <span className="lr-code">{s.code}</span>
                            <div className="lr-info">
                              <span className="lr-name">{s.name}</span>
                              <span className="lr-tag">{s.tag}</span>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div className="leaf-footer"><i className="fas fa-shield-check"></i> Accredited ISO Auditors</div>
                    </>
                  )}
                </div>
              </div>

              {/* Page Turn Controls */}
              <div className="book-controls">
                <button suppressHydrationWarning={true} className="book-nav-btn" onClick={() => setActiveBookTab(p => (p === 0 ? 2 : p - 1))} suppressHydrationWarning={true}>
                  <i className="fas fa-chevron-left"></i>
                </button>
                <div className="book-dots">
                  {[0, 1, 2].map(i => (
                    <button suppressHydrationWarning={true}
                      key={i}
                      className={`book-dot ${activeBookTab === i ? 'active' : ''}`}
                      onClick={() => setActiveBookTab(i)}
                      suppressHydrationWarning={true}
                      aria-label={`Go to spread ${i + 1}`}
                    />
                  ))}
                </div>
                <button suppressHydrationWarning={true} className="book-nav-btn" onClick={() => setActiveBookTab(p => (p === 2 ? 0 : p + 1))} suppressHydrationWarning={true}>
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Core Services Carousel */}

      <section className="section services-carousel-section" id="services-section" style={{ background: 'var(--bg-alt)', borderBottom: '1px solid var(--border-solid)' }}>
        <div className="container">
          <div className="section-header centered">
            <span className="section-label">{t("Services Hub")}</span>
            <h2 className="section-title">{t("Our Core Services")}</h2>
            <p className="section-desc">{t("End-to-end business, compliance, and digital growth solutions tailored for Indian businesses.")}</p>
          </div>

          <div className="carousel-container" style={{ position: 'relative', marginTop: 'var(--s5)', overflow: 'hidden', borderRadius: 'var(--r-xl)', boxShadow: 'var(--sh-lg)', background: 'var(--primary)' }}>
            <div className="carousel-slides" style={{ display: 'flex', transition: 'transform 0.5s ease-in-out', transform: `translateX(-${activeSlide * (100 / coreServicesSlides.length)}%)`, width: '400%' }}>
              {coreServicesSlides.map((slide, idx) => (
                <div key={idx} className="carousel-slide" style={{ width: '25%', flexShrink: 0, position: 'relative', height: '450px', background: 'var(--primary)' }}>
                  <div
                    className="slide-bg"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundImage: `url('${slide.bg}')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      opacity: 0.2,
                      zIndex: 0
                    }}
                  />
                  <div className="slide-content" style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'var(--s6) var(--s8)', color: 'white', maxWidth: '800px' }}>
                    <div style={{ width: '60px', height: '60px', borderRadius: 'var(--r-md)', background: 'var(--accent-pale)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', marginBottom: 'var(--s3)' }}>
                      <i className={`fas ${slide.icon}`}></i>
                    </div>
                    <h3 className="t-h2" style={{ color: 'white', marginBottom: 'var(--s2)' }}>{t(slide.title)}</h3>
                    <p className="t-body-lg" style={{ color: 'rgba(255, 255, 255, 0.85)', marginBottom: 'var(--s4)', lineHeight: 1.6 }}>{t(slide.desc)}</p>
                    <div>
                      <Link href={slide.link} className="btn btn-lg btn-accent">
                        {t("Explore Category")} <i className="fas fa-arrow-right" style={{ marginLeft: '8px' }}></i>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button suppressHydrationWarning={true}
              onClick={() => setActiveSlide((prev) => (prev === 0 ? coreServicesSlides.length - 1 : prev - 1))}
              style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', width: '48px', height: '48px', borderRadius: '50%', cursor: 'pointer', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', transition: 'background 0.3s' }}
              className="carousel-arrow"
              aria-label="Previous Slide"
              suppressHydrationWarning={true}
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            <button suppressHydrationWarning={true}
              onClick={() => setActiveSlide((prev) => (prev === coreServicesSlides.length - 1 ? 0 : prev + 1))}
              style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', width: '48px', height: '48px', borderRadius: '50%', cursor: 'pointer', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', transition: 'background 0.3s' }}
              className="carousel-arrow"
              aria-label="Next Slide"
              suppressHydrationWarning={true}
            >
              <i className="fas fa-chevron-right"></i>
            </button>

            {/* Indicator Dots */}
            <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px', zIndex: 2 }}>
              {coreServicesSlides.map((_, idx) => (
                <button suppressHydrationWarning={true}
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  style={{ width: '10px', height: '10px', borderRadius: '50%', border: 'none', background: activeSlide === idx ? 'var(--accent)' : 'rgba(255,255,255,0.3)', cursor: 'pointer', padding: 0 }}
                  aria-label={`Go to slide ${idx + 1}`}
                  suppressHydrationWarning={true}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section" style={{ background: 'var(--bg-card)', borderBottom: '1px solid var(--border-solid)' }}>
        <div className="container">
          <div className="section-header centered">
            <h2 className="section-title">{t("Why Choose MSR Assessment for ISO Certification?")}</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'var(--s4)', marginTop: 'var(--s5)' }}>
            {[
              { icon: "fa-bolt", title: "Fast Certification Process", desc: "Reduce delays with streamlined audits and documentation support." },
              { icon: "fa-user-tie", title: "Experienced Auditors", desc: "Qualified experts with industry-specific certification experience." },
              { icon: "fa-globe", title: "Global Certification Support", desc: "Serving businesses across India, UAE, Saudi Arabia, Qatar, Africa, Europe, and more." },
              { icon: "fa-handshake", title: "End-to-End Guidance", desc: "From gap analysis to final certification issuance." }
            ].map((pillar, idx) => (
              <div key={idx} style={{ display: 'flex', gap: 'var(--s2)', alignItems: 'flex-start', background: 'var(--bg-alt)', padding: 'var(--s3)', borderRadius: 'var(--r-md)', border: '1px solid var(--border-solid)' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: 'var(--r-sm)', background: 'var(--accent-pale)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>
                  <i className={`fas ${pillar.icon}`}></i>
                </div>
                <div>
                  <h3 className="t-h4" style={{ color: 'var(--primary)', marginBottom: '6px', fontSize: '15.5px', fontWeight: '700' }}>{t(pillar.title)}</h3>
                  <p className="t-sm" style={{ margin: 0, color: 'var(--text-muted)', lineHeight: '1.5' }}>{t(pillar.desc)}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'var(--s5)' }}>
            <button suppressHydrationWarning={true}
              className="btn btn-lg btn-primary"
              onClick={() => {
                const modal = document.getElementById('inquiry-modal');
                if (modal) modal.classList.add('open');
              }}
            >
              {t("Talk to an ISO Expert")} <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </section>

      {/* Industries We Serve Section */}
      <section className="section" style={{ background: 'var(--bg-alt)', borderBottom: '1px solid var(--border-solid)' }}>
        <div className="container">
          <div className="section-header centered">
            <h2 className="section-title">{t("Industry-Specific Certification Solutions")}</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: 'var(--s5)' }}>
            {[
              { icon: "fa-industry", title: "Manufacturing", link: "/service/manufacturing-compliance/" },
              { icon: "fa-laptop-code", title: "IT & Software", link: "/service/it-services-compliance/" },
              { icon: "fa-heartbeat", title: "Healthcare", link: "/service/healthcare-compliance/" },
              { icon: "fa-bowl-food", title: "Food Processing", link: "/service/food-industry-compliance/" },
              { icon: "fa-helmet-safety", title: "Construction", link: "/service/construction-compliance/" },
              { icon: "fa-truck-ramp-box", title: "Logistics", link: "/service/logistics-compliance/" },
              { icon: "fa-hotel", title: "Hospitality", link: "/service/hospitality-compliance/" },
              { icon: "fa-flask", title: "Chemical", link: "/service/chemical-compliance/" },
              { icon: "fa-plug", title: "Electrical", link: "/service/electrical-compliance/" },
              { icon: "fa-train", title: "Railway", link: "/service/railway-compliance/" }
            ].map((ind, idx) => (
              <Link key={idx} href={ind.link} className="industry-card" style={{ textAlign: 'center', padding: 'var(--s3)', background: 'var(--bg-card)', border: '1px solid var(--border-solid)', borderRadius: 'var(--r-md)', display: 'block', textDecoration: 'none', transition: 'transform 0.3s' }}>
                <div className="industry-icon" style={{ fontSize: '28px', color: 'var(--accent)', marginBottom: '12px' }}><i className={`fas ${ind.icon}`}></i></div>
                <h3 className="industry-name" style={{ fontSize: '14.5px', fontWeight: 700, color: 'var(--primary)', margin: 0 }}>{t(ind.title)}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section" id="testimonials">
        <div className="container-wide">
          <div className="section-header centered">
            <h2 className="section-title">{t("Trusted by Businesses Across India & Worldwide")}</h2>
          </div>

          {/* DOMESTIC CLIENTS ROW */}
          <div className="marquee-group-title">{t("Domestic Advisory Clients")}</div>
          <div className="testimonial-marquee-wrapper">
            <div className="testimonial-marquee-container rtl">
              <div className="testimonial-marquee-track">
                {/* Domestic Card 1: TechForge */}
                <div className="testimonial-card-container">
                  <div className="testimonial-card-inner">
                    <div className="card-front">
                      <div className="logo-holder">
                        <img src="/assets/domestic/TripNCare.jpg" alt="TripNCare" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '4px' }} />
                      </div>
                      <div className="company-title">{t("TripNCare")}</div>
                      <div className="company-location">{t("Kolkata, IN")}</div>
                    </div>
                    <div className="card-back">
                      <div className="t-rating">★★★★★</div>
                      <p className="t-quote-text">"{t("MSR registered our Private Limited company in just 12 days. Exceptional speed and professional handling of ROC queries.")}"</p>
                      <div className="t-author">
                        <div className="t-author-name">{t("Karan Mehta")}</div>
                        <div className="t-author-role">{t("Co-Founder & CEO")}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Domestic Card 2: Organic Roots */}
                <div className="testimonial-card-container">
                  <div className="testimonial-card-inner">
                    <div className="card-front">
                      <div className="logo-holder">
                        <img src="/assets/domestic/ak_infrastructure_solutions.jpeg" alt="AK Infrastructure Solutions" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '4px' }} />
                      </div>
                      <div className="company-title">{t("AK Infrastructure Solutions")}</div>
                      <div className="company-location">{t("Jaipur, IN")}</div>
                    </div>
                    <div className="card-back">
                      <div className="t-rating">★★★★★</div>
                      <p className="t-quote-text">"{t("Acquired our State FSSAI License and GST registration smoothly. Prompt updates and fully digital processing.")}"</p>
                      <div className="t-author">
                        <div className="t-author-name">{t("Priya Sharma")}</div>
                        <div className="t-author-role">{t("Founder")}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Domestic Card 3: Arya Enterprises */}
                <div className="testimonial-card-container">
                  <div className="testimonial-card-inner">
                    <div className="card-front">
                      <div className="logo-holder">
                        <img src="/assets/domestic/lizbon_healthcare.jpeg" alt="Lizbon Healthcare" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '4px' }} />
                      </div>
                      <div className="company-title">{t("Lizbon Healthcare")}</div>
                      <div className="company-location">{t("Ahmedabad, IN")}</div>
                    </div>
                    <div className="card-back">
                      <div className="t-rating">★★★★★</div>
                      <p className="t-quote-text">"{t("Successfully resolved our trademark objection case. Their legal drafting and advisory team is top-tier.")}"</p>
                      <div className="t-author">
                        <div className="t-author-name">{t("Rohit Agarwal")}</div>
                        <div className="t-author-role">{t("Managing Director")}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Domestic Card 4: Nexus Consultancy */}
                <div className="testimonial-card-container">
                  <div className="testimonial-card-inner">
                    <div className="card-front">
                      <div className="logo-holder">
                        <img src="/assets/domestic/saba_logo.png" alt="Saba Improving Values" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '4px' }} />
                      </div>
                      <div className="company-title">{t("Saba Improving Values")}</div>
                      <div className="company-location">{t("Chennai, IN")}</div>
                    </div>
                    <div className="card-back">
                      <div className="t-rating">★★★★★</div>
                      <p className="t-quote-text">"{t("Excellent annual corporate compliance management. They are reliable, thorough, and highly organized.")}"</p>
                      <div className="t-author">
                        <div className="t-author-name">{t("Deepika Reddy")}</div>
                        <div className="t-author-role">{t("Director")}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Domestic Card 5: Zenith Labs */}
                <div className="testimonial-card-container">
                  <div className="testimonial-card-inner">
                    <div className="card-front">
                      <div className="logo-holder">
                        <svg width="55" height="55" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="2" y="2" width="46" height="46" rx="8" fill="#EEF2F6" />
                          <path d="M18 14H32" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" />
                          <path d="M22 14V22L14 34C13 36 14.5 38 17 38H33C35.5 38 37 36 36 34L28 22V14" stroke="var(--primary)" strokeWidth="2" strokeLinejoin="round" />
                          <path d="M18 32H32" stroke="var(--accent)" strokeWidth="2" />
                        </svg>
                      </div>
                      <div className="company-title">{t("Zenith Labs")}</div>
                      <div className="company-location">{t("Mumbai, IN")}</div>
                    </div>
                    <div className="card-back">
                      <div className="t-rating">★★★★★</div>
                      <p className="t-quote-text">"{t("Secured our ISO 9001 and ISO 27001 certifications. The audit guidance was extremely detailed.")}"</p>
                      <div className="t-author">
                        <div className="t-author-name">{t("Dr. Amit Verma")}</div>
                        <div className="t-author-role">{t("Chief Operations Officer")}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Domestic Card 6: Vardan Logistics */}
                <div className="testimonial-card-container">
                  <div className="testimonial-card-inner">
                    <div className="card-front">
                      <div className="logo-holder">
                        <svg width="55" height="55" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="2" y="2" width="46" height="46" rx="8" fill="var(--bg-alt)" />
                          <path d="M12 18H38M12 25H38M12 32H28" stroke="var(--primary)" strokeWidth="3" strokeLinecap="round" />
                          <path d="M32 32L38 25L32 18" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div className="company-title">{t("Vardan Logistics")}</div>
                      <div className="company-location">{t("Delhi, IN")}</div>
                    </div>
                    <div className="card-back">
                      <div className="t-rating">★★★★★</div>
                      <p className="t-quote-text">"{t("Helped us obtain our IEC Registration and Shop Act license. Very cooperative team and direct compliance logs.")}"</p>
                      <div className="t-author">
                        <div className="t-author-name">{t("Satish Kumar")}</div>
                        <div className="t-author-role">{t("Logistics Head")}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* DUPLICATE SET FOR SEAMLESS LOOP */}
                {/* Domestic Card 1 */}
                <div className="testimonial-card-container">
                  <div className="testimonial-card-inner">
                    <div className="card-front">
                      <div className="logo-holder">
                        <img src="/assets/domestic/TripNCare.jpg" alt="TripNCare" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '4px' }} />
                      </div>
                      <div className="company-title">{t("TripNCare")}</div>
                      <div className="company-location">{t("Kolkata, IN")}</div>
                    </div>
                    <div className="card-back">
                      <div className="t-rating">★★★★★</div>
                      <p className="t-quote-text">"{t("MSR registered our Private Limited company in just 12 days. Exceptional speed and professional handling of ROC queries.")}"</p>
                      <div className="t-author">
                        <div className="t-author-name">{t("Karan Mehta")}</div>
                        <div className="t-author-role">{t("Co-Founder & CEO")}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Domestic Card 2 */}
                <div className="testimonial-card-container">
                  <div className="testimonial-card-inner">
                    <div className="card-front">
                      <div className="logo-holder">
                        <img src="/assets/domestic/ak_infrastructure_solutions.jpeg" alt="AK Infrastructure Solutions" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '4px' }} />
                      </div>
                      <div className="company-title">{t("AK Infrastructure Solutions")}</div>
                      <div className="company-location">{t("Jaipur, IN")}</div>
                    </div>
                    <div className="card-back">
                      <div className="t-rating">★★★★★</div>
                      <p className="t-quote-text">"{t("Acquired our State FSSAI License and GST registration smoothly. Prompt updates and fully digital processing.")}"</p>
                      <div className="t-author">
                        <div className="t-author-name">{t("Priya Sharma")}</div>
                        <div className="t-author-role">{t("Founder")}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Domestic Card 3 */}
                <div className="testimonial-card-container">
                  <div className="testimonial-card-inner">
                    <div className="card-front">
                      <div className="logo-holder">
                        <img src="/assets/domestic/lizbon_healthcare.jpeg" alt="Lizbon Healthcare" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '4px' }} />
                      </div>
                      <div className="company-title">{t("Lizbon Healthcare")}</div>
                      <div className="company-location">{t("Ahmedabad, IN")}</div>
                    </div>
                    <div className="card-back">
                      <div className="t-rating">★★★★★</div>
                      <p className="t-quote-text">"{t("Successfully resolved our trademark objection case. Their legal drafting and advisory team is top-tier.")}"</p>
                      <div className="t-author">
                        <div className="t-author-name">{t("Rohit Agarwal")}</div>
                        <div className="t-author-role">{t("Managing Director")}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Domestic Card 4 */}
                <div className="testimonial-card-container">
                  <div className="testimonial-card-inner">
                    <div className="card-front">
                      <div className="logo-holder">
                        <img src="/assets/domestic/saba_logo.png" alt="saba Improving Values" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '4px' }} />
                      </div>
                      <div className="company-title">{t("Saba Improving Values")}</div>
                      <div className="company-location">{t("Chennai, IN")}</div>
                    </div>
                    <div className="card-back">
                      <div className="t-rating">★★★★★</div>
                      <p className="t-quote-text">"{t("Excellent annual corporate compliance management. They are reliable, thorough, and highly organized.")}"</p>
                      <div className="t-author">
                        <div className="t-author-name">{t("Deepika Reddy")}</div>
                        <div className="t-author-role">{t("Director")}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Domestic Card 5 */}
                <div className="testimonial-card-container">
                  <div className="testimonial-card-inner">
                    <div className="card-front">
                      <div className="logo-holder">
                        <svg width="55" height="55" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="2" y="2" width="46" height="46" rx="8" fill="#EEF2F6" />
                          <path d="M18 14H32" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" />
                          <path d="M22 14V22L14 34C13 36 14.5 38 17 38H33C35.5 38 37 36 36 34L28 22V14" stroke="var(--primary)" strokeWidth="2" strokeLinejoin="round" />
                          <path d="M18 32H32" stroke="var(--accent)" strokeWidth="2" />
                        </svg>
                      </div>
                      <div className="company-title">{t("Zenith Labs")}</div>
                      <div className="company-location">{t("Mumbai, IN")}</div>
                    </div>
                    <div className="card-back">
                      <div className="t-rating">★★★★★</div>
                      <p className="t-quote-text">"{t("Secured our ISO 9001 and ISO 27001 certifications. The audit guidance was extremely detailed.")}"</p>
                      <div className="t-author">
                        <div className="t-author-name">{t("Dr. Amit Verma")}</div>
                        <div className="t-author-role">{t("Chief Operations Officer")}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Domestic Card 6 */}
                <div className="testimonial-card-container">
                  <div className="testimonial-card-inner">
                    <div className="card-front">
                      <div className="logo-holder">
                        <svg width="55" height="55" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="2" y="2" width="46" height="46" rx="8" fill="var(--bg-alt)" />
                          <path d="M12 18H38M12 25H38M12 32H28" stroke="var(--primary)" strokeWidth="3" strokeLinecap="round" />
                          <path d="M32 32L38 25L32 18" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div className="company-title">{t("Vardan Logistics")}</div>
                      <div className="company-location">{t("Delhi, IN")}</div>
                    </div>
                    <div className="card-back">
                      <div className="t-rating">★★★★★</div>
                      <p className="t-quote-text">"{t("Helped us obtain our IEC Registration and Shop Act license. Very cooperative team and direct compliance logs.")}"</p>
                      <div className="t-author">
                        <div className="t-author-name">{t("Satish Kumar")}</div>
                        <div className="t-author-role">{t("Logistics Head")}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* GLOBAL CLIENTS ROW */}
          <div className="marquee-group-title">{t("Global Enterprise Clients")}</div>
          <div className="testimonial-marquee-wrapper">
            <div className="testimonial-marquee-container ltr">
              <div className="testimonial-marquee-track">
                {/* Global Card 1: Apex Global */}
                <div className="testimonial-card-container">
                  <div className="testimonial-card-inner">
                    <div className="card-front">
                      <div className="logo-holder">
                        <img src="/assets/global/Dressler-consulting.webp" alt="Dressler Consulting" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '4px' }} />
                      </div>
                      <div className="company-title">{t("Dressler Consulting")}</div>
                      <div className="company-location">{t("Merrick, New York")}</div>
                    </div>
                    <div className="card-back">
                      <div className="t-rating">★★★★★</div>
                      <p className="t-quote-text">"{t("Seamless Indian subsidiary incorporation. MSR acted as our legal counsel, handling all RBI FDI filings.")}"</p>
                      <div className="t-author">
                        <div className="t-author-name">{t("Sarah Jenkins")}</div>
                        <div className="t-author-role">{t("VP of Operations")}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Global Card 2: BlueFin Capital */}
                <div className="testimonial-card-container">
                  <div className="testimonial-card-inner">
                    <div className="card-front">
                      <div className="logo-holder">
                        <img src="/assets/global/IT%20Five.png" alt="IT Five" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '4px' }} />
                      </div>
                      <div className="company-title">{t("IT Five")}</div>
                      <div className="company-location">{t("Armenia")}</div>
                    </div>
                    <div className="card-back">
                      <div className="t-rating">★★★★★</div>
                      <p className="t-quote-text">"{t("Highly efficient compliance auditing for our Indian investments. Excellent documentation and risk reviews.")}"</p>
                      <div className="t-author">
                        <div className="t-author-name">{t("Marcus Tan")}</div>
                        <div className="t-author-role">{t("Managing Partner")}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Global Card 3: Nova Retail UK */}
                <div className="testimonial-card-container">
                  <div className="testimonial-card-inner">
                    <div className="card-front">
                      <div className="logo-holder">
                        <img src="/assets/global/Peleka.png" alt="Peleka" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '4px' }} />
                      </div>
                      <div className="company-title">{t("Peleka")}</div>
                      <div className="company-location">{t("Yerevan, Armenia")}</div>
                    </div>
                    <div className="card-back">
                      <div className="t-rating">★★★★★</div>
                      <p className="t-quote-text">"{t("MSR managed our trademark and design registrations in India. Thorough search and seamless filing process.")}"</p>
                      <div className="t-author">
                        <div className="t-author-name">{t("Emily Watson")}</div>
                        <div className="t-author-role">{t("E-Commerce Director")}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Global Card 4: Sunburst Energy */}
                <div className="testimonial-card-container">
                  <div className="testimonial-card-inner">
                    <div className="card-front">
                      <div className="logo-holder">
                        <svg width="55" height="55" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="2" y="2" width="46" height="46" rx="8" fill="#FFFBEB" />
                          <circle cx="25" cy="25" r="8" fill="#D97706" />
                          <path d="M25 8V14M25 36V42M8 25H14M36 25H42M13 13L17.5 17.5M32.5 32.5L37 37M37 13L32.5 17.5M17.5 32.5L13 37" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      </div>
                      <div className="company-title">{t("Sunburst Energy")}</div>
                      <div className="company-location">{t("Berlin, Germany")}</div>
                    </div>
                    <div className="card-back">
                      <div className="t-rating">★★★★★</div>
                      <p className="t-quote-text">"{t("Outstanding ISO 14001 certification audit support for our solar projects in India. Highly professional team.")}"</p>
                      <div className="t-author">
                        <div className="t-author-name">{t("Dieter Brandt")}</div>
                        <div className="t-author-role">{t("Infrastructure Director")}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Global Card 5: Summit Ventures */}
                <div className="testimonial-card-container">
                  <div className="testimonial-card-inner">
                    <div className="card-front">
                      <div className="logo-holder">
                        <svg width="55" height="55" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="2" y="2" width="46" height="46" rx="8" fill="var(--bg-alt)" />
                          <path d="M12 36L22 22L29 30L38 16" stroke="var(--primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                          <circle cx="38" cy="16" r="3" fill="var(--accent)" />
                        </svg>
                      </div>
                      <div className="company-title">{t("Summit Ventures")}</div>
                      <div className="company-location">{t("Dubai, UAE")}</div>
                    </div>
                    <div className="card-back">
                      <div className="t-rating">★★★★★</div>
                      <p className="t-quote-text">"{t("Excellent corporate governance legal drafts and regulatory compliance advisory. Very prompt in communication.")}"</p>
                      <div className="t-author">
                        <div className="t-author-name">{t("Tariq Al-Mansoor")}</div>
                        <div className="t-author-role">{t("Managing Partner")}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Global Card 6: Integra Health */}
                <div className="testimonial-card-container">
                  <div className="testimonial-card-inner">
                    <div className="card-front">
                      <div className="logo-holder">
                        <svg width="55" height="55" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="2" y="2" width="46" height="46" rx="8" fill="#FDF2F8" />
                          <path d="M25 10V40M10 25H40" stroke="#DB2777" strokeWidth="4" strokeLinecap="round" />
                          <rect x="20" y="20" width="10" height="10" fill="#FFFFFF" rx="1" />
                        </svg>
                      </div>
                      <div className="company-title">{t("Integra Health")}</div>
                      <div className="company-location">{t("Toronto, Canada")}</div>
                    </div>
                    <div className="card-back">
                      <div className="t-rating">★★★★★</div>
                      <p className="t-quote-text">"{t("Helped us set up our clinical trial licensing and regulatory clearances in India. Outstanding service.")}"</p>
                      <div className="t-author">
                        <div className="t-author-name">{t("Dr. Robert Chen")}</div>
                        <div className="t-author-role">{t("Compliance Director")}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* DUPLICATE SET FOR SEAMLESS LOOP */}
                {/* Global Card 1 */}
                <div className="testimonial-card-container">
                  <div className="testimonial-card-inner">
                    <div className="card-front">
                      <div className="logo-holder">
                        <svg width="55" height="55" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="2" y="2" width="46" height="46" rx="8" fill="#EEF2F6" />
                          <path d="M25 8L40 38H10L25 8Z" stroke="var(--primary)" strokeWidth="2" strokeLinejoin="round" />
                          <path d="M25 8V38" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="2 2" />
                        </svg>
                      </div>
                      <div className="company-title">{t("Apex Global Inc.")}</div>
                      <div className="company-location">{t("New York, USA")}</div>
                    </div>
                    <div className="card-back">
                      <div className="t-rating">★★★★★</div>
                      <p className="t-quote-text">"{t("Seamless Indian subsidiary incorporation. MSR acted as our legal counsel, handling all RBI FDI filings.")}"</p>
                      <div className="t-author">
                        <div className="t-author-name">{t("Sarah Jenkins")}</div>
                        <div className="t-author-role">{t("VP of Operations")}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Global Card 2 */}
                <div className="testimonial-card-container">
                  <div className="testimonial-card-inner">
                    <div className="card-front">
                      <div className="logo-holder">
                        <img src="/assets/global/Dressler-consulting.webp" alt="Dressler Consulting" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '4px' }} />
                      </div>
                      <div className="company-title">{t("Dressler Consulting")}</div>
                      <div className="company-location">{t("Merrick, New York")}</div>
                    </div>
                    <div className="card-back">
                      <div className="t-rating">★★★★★</div>
                      <p className="t-quote-text">"{t("Highly efficient compliance auditing for our Indian investments. Excellent documentation and risk reviews.")}"</p>
                      <div className="t-author">
                        <div className="t-author-name">{t("Marcus Tan")}</div>
                        <div className="t-author-role">{t("Managing Partner")}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Global Card 3 */}
                <div className="testimonial-card-container">
                  <div className="testimonial-card-inner">
                    <div className="card-front">
                      <div className="logo-holder">
                        <img src="/assets/global/IT%20Five.png" alt="IT Five" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '4px' }} />
                      </div>
                      <div className="company-title">{t("IT Five")}</div>
                      <div className="company-location">{t("Yerevan, Armenia")}</div>
                    </div>
                    <div className="card-back">
                      <div className="t-rating">★★★★★</div>
                      <p className="t-quote-text">"{t("MSR managed our trademark and design registrations in India. Thorough search and seamless filing process.")}"</p>
                      <div className="t-author">
                        <div className="t-author-name">{t("Emily Watson")}</div>
                        <div className="t-author-role">{t("E-Commerce Director")}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Global Card 4 */}
                <div className="testimonial-card-container">
                  <div className="testimonial-card-inner">
                    <div className="card-front">
                      <div className="logo-holder">
                        <img src="/assets/global/Peleka.png" alt="Peleka" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '4px' }} />
                      </div>
                      <div className="company-title">{t("Peleka")}</div>
                      <div className="company-location">{t("Yerevan, Armenia")}</div>
                    </div>
                    <div className="card-back">
                      <div className="t-rating">★★★★★</div>
                      <p className="t-quote-text">"{t("Outstanding ISO 14001 certification audit support for our solar projects in India. Highly professional team.")}"</p>
                      <div className="t-author">
                        <div className="t-author-name">{t("Dieter Brandt")}</div>
                        <div className="t-author-role">{t("Infrastructure Director")}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Global Card 5 */}
                <div className="testimonial-card-container">
                  <div className="testimonial-card-inner">
                    <div className="card-front">
                      <div className="logo-holder">
                        <svg width="55" height="55" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="2" y="2" width="46" height="46" rx="8" fill="var(--bg-alt)" />
                          <path d="M12 36L22 22L29 30L38 16" stroke="var(--primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                          <circle cx="38" cy="16" r="3" fill="var(--accent)" />
                        </svg>
                      </div>
                      <div className="company-title">{t("Summit Ventures")}</div>
                      <div className="company-location">{t("Dubai, UAE")}</div>
                    </div>
                    <div className="card-back">
                      <div className="t-rating">★★★★★</div>
                      <p className="t-quote-text">"{t("Excellent corporate governance legal drafts and regulatory compliance advisory. Very prompt in communication.")}"</p>
                      <div className="t-author">
                        <div className="t-author-name">{t("Tariq Al-Mansoor")}</div>
                        <div className="t-author-role">{t("Managing Partner")}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Global Card 6 */}
                <div className="testimonial-card-container">
                  <div className="testimonial-card-inner">
                    <div className="card-front">
                      <div className="logo-holder">
                        <svg width="55" height="55" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="2" y="2" width="46" height="46" rx="8" fill="#FDF2F8" />
                          <path d="M25 10V40M10 25H40" stroke="#DB2777" strokeWidth="4" strokeLinecap="round" />
                          <rect x="20" y="20" width="10" height="10" fill="#FFFFFF" rx="1" />
                        </svg>
                      </div>
                      <div className="company-title">{t("Integra Health")}</div>
                      <div className="company-location">{t("Toronto, Canada")}</div>
                    </div>
                    <div className="card-back">
                      <div className="t-rating">★★★★★</div>
                      <p className="t-quote-text">"{t("Helped us set up our clinical trial licensing and regulatory clearances in India. Outstanding service.")}"</p>
                      <div className="t-author">
                        <div className="t-author-name">{t("Dr. Robert Chen")}</div>
                        <div className="t-author-role">{t("Compliance Director")}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GOOGLE REVIEWS WIDGET */}
      <section className="section bg-light" style={{ borderTop: '1px solid var(--border-solid)' }}>
        <div className="container-wide">
          <div className="section-header centered">
            <span className="section-label">{t("Verified Feedback")}</span>
            <h2 className="section-title" style={{ fontSize: '26px' }}>{t("What Our Clients Say on Google")}</h2>
            <p className="section-desc">{t("Independent, verified reviews from businesses across India.")}</p>
          </div>

          <div className="google-reviews-wrapper">
            <div className="google-reviews-track">
              {[...googleReviewsList, ...googleReviewsList].map((review, idx) => (
                <div className="google-review-card" key={idx}>
                  <div className="gr-header">
                    <div className="gr-user">
                      <div className="gr-avatar">{review.name.charAt(0)}</div>
                      <div className="gr-user-info">
                        <span className="gr-name">{review.name}</span>
                        <span className="gr-date">{review.date}</span>
                      </div>
                    </div>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" className="gr-google-icon" />
                  </div>
                  <div className="gr-stars">★★★★★</div>
                  <div className="gr-text">{t(review.text)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* GLOBAL COMPLIANCE FAQ SECTION */}
      <section className="section" id="faq-section" style={{ background: 'var(--bg-card)', borderTop: '1px solid var(--border-solid)' }}>
        <div className="container">
          <div className="section-header centered">
            <h2 className="section-title" style={{ color: 'var(--primary)' }}>{t("Frequently Asked Questions")}</h2>
          </div>

          <div style={{ maxWidth: '800px', margin: 'var(--s4) auto 0', display: 'flex', flexDirection: 'column', gap: 'var(--s2)' }}>
            {[
              {
                q: t("How long does ISO certification take?"),
                a: t("The time required for ISO certification depends on your organization's size, complexity, number of locations, and the standard being implemented. For small and medium-sized businesses, the certification process typically takes 7 to 30 days, while larger organizations may require additional time for documentation review, audits, and corrective actions. Our team works closely with clients to ensure a smooth and efficient certification process.")
              },
              {
                q: t("What is the cost of ISO certification?"),
                a: t("The cost of ISO certification varies based on several factors, including the type of ISO standard, company size, number of employees, business activities, and certification scope. Since every organization has unique requirements, we provide customized quotations tailored to your specific needs. Contact our experts for a free consultation and detailed cost estimate.")
              },
              {
                q: t("Which ISO certification is best for my business?"),
                a: (
                  <>
                    <p style={{ marginBottom: '12px' }}>{t("The ideal ISO certification depends on your industry and business objectives:")}</p>
                    <ul style={{ paddingLeft: '20px', marginBottom: '12px', listStyleType: 'disc' }}>
                      <li><strong>{t("ISO 9001")}</strong> – {t("Quality Management Systems")}</li>
                      <li><strong>{t("ISO 14001")}</strong> – {t("Environmental Management Systems")}</li>
                      <li><strong>{t("ISO 45001")}</strong> – {t("Occupational Health & Safety Management Systems")}</li>
                      <li><strong>{t("ISO 22000")}</strong> – {t("Food Safety Management Systems")}</li>
                      <li><strong>{t("ISO 27001")}</strong> – {t("Information Security Management Systems")}</li>
                    </ul>
                    <p>{t("If you're unsure which certification is right for your organization, our specialists can assess your requirements and recommend the most suitable standard.")}</p>
                  </>
                )
              },
              {
                q: t("Is ISO certification mandatory?"),
                a: t("ISO certification is generally not mandatory by law for most businesses. However, many government tenders, corporate contracts, international trade opportunities, and industry-specific requirements may require organizations to hold relevant ISO certifications. Additionally, ISO certification helps improve operational efficiency, customer confidence, and market competitiveness.")
              },
              {
                q: t("How can I verify my certificate?"),
                a: t("You can verify the authenticity and validity of your certificate through our online certificate verification system. Simply enter your certificate number on the verification page to view the certification details and current status. This ensures transparency and builds trust with customers, suppliers, and stakeholders.")
              },
              {
                q: t("Does ISO certification need renewal?"),
                a: t("Yes. ISO certifications are typically valid for three years, subject to periodic surveillance audits to ensure ongoing compliance. After the certification cycle ends, a recertification audit is conducted to maintain certification status.")
              },
              {
                q: t("What are the benefits of ISO certification?"),
                a: t("ISO certification helps organizations improve quality, increase customer satisfaction, streamline processes, reduce operational risks, and enhance business credibility. It also demonstrates a commitment to international standards, making it easier to win contracts, enter new markets, and build stakeholder trust.")
              }
            ].map((faq, idx) => (
              <div
                className={`faq-item ${activeFaq === idx ? 'open' : ''}`}
                key={idx}
                style={{ border: '1px solid var(--border-solid)', borderRadius: 'var(--r-md)', overflow: 'hidden' }}
              >
                <button suppressHydrationWarning={true}
                  className="faq-question"
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  style={{ width: '100%', padding: '16px 20px', background: 'none', border: 'none', textAlign: 'left', fontSize: '15px', fontWeight: 700, color: 'var(--primary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                  suppressHydrationWarning={true}
                >
                  {faq.q}
                  <i className="fas fa-chevron-down"></i>
                </button>
                <div className="faq-answer">
                  {faq.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION (CRO Optimized) */}
      <section className="cta-section" aria-label="Call to action">
        <div className="container">
          <div className="cta-box">
            <div className="cta-content">
              <h3 className="cta-title" style={{ fontSize: '18px', color: 'var(--accent)', marginBottom: '8px' }}>{t("Request Free Consultation")}</h3>
              <h2 className="cta-title" style={{ fontSize: '32px' }}>{t("Ready to Get ISO Certified?")}</h2>
              <p className="cta-subtitle">{t("Join hundreds of businesses that trust MSR Assessment for reliable certification and compliance services.")}</p>
            </div>
            <div className="cta-actions">
              <button suppressHydrationWarning={true}
                className="btn btn-lg btn-accent"
                onClick={() => {
                  const modal = document.getElementById('inquiry-modal');
                  if (modal) modal.classList.add('open');
                }}
                suppressHydrationWarning={true}
              >
                {t("Get Certification Quote")} <i className="fas fa-arrow-right"></i>
              </button>
              <a
                href="https://wa.me/918337004170?text=Hello%20MSR%20Assessment%20Team%2C%20I%20would%20like%20to%20consult%20an%20auditor%20regarding%20ISO%20certification."
                className="btn btn-lg btn-outline-inv"
              >
                <i className="fab fa-whatsapp"></i> {t("+91 83370 04170")}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "MSR Assessment Pvt Ltd",
            "url": "https://msrassessment.com",
            "logo": "https://msrassessment.com/msr.png",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+91-83370-04170",
              "contactType": "sales",
              "areaServed": "IN",
              "availableLanguage": ["en", "hi"]
            },
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "2ND FLOOR, 23 A, ROYD STREET, P.S, Park St",
              "addressLocality": "Kolkata",
              "addressRegion": "West Bengal",
              "postalCode": "700016",
              "addressCountry": "IN"
            },
            "identifier": {
              "@type": "PropertyValue",
              "name": "GSTIN",
              "value": "19AAQCM2742Q1ZL"
            },
            "sameAs": [
              "https://www.facebook.com/msrassessment2020/",
              "https://www.instagram.com/msr_assessment/",
              "https://www.youtube.com/channel/UC0_Ji0MVc-1VtQIPVB-rijw",
              "https://www.linkedin.com/company/msr-assessment-pvt-ltd/"
            ]
          })
        }
        }
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is the typical timeline to secure an accredited ISO 9001 certification in India?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Generally, it requires 7 to 15 business days to prepare the compliance manuals, conduct a gap evaluation, execute Stage 1 assessments, and complete the registry listing, depending upon the complexity and size of your corporate activities."
                }
              },
              {
                "@type": "Question",
                "name": "How does the ISO 27001 audit protect our data assets and client security expectations?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "ISO 27001 establishes an Information Security Management System (ISMS). Our threat auditors test your network borders, database encryption standards, access tokens, and data storage configurations to align controls, mitigating vulnerability exposures."
                }
              },
              {
                "@type": "Question",
                "name": "What is the validity period of an ISO certificate, and what are surveillance audits?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "An ISO certificate is officially valid for three (3) years from the date of issue. To preserve validity, accredited registrars require annual surveillance audits in Year 1 and Year 2 to verify that your QMS/ISMS is continuously maintained."
                }
              },
              {
                "@type": "Question",
                "name": "What are the primary cost factors during the certification and compliance process?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Pricing is calculated based on three elements: the size of the operating entity (man-days needed for the audit), the number of physical offices/locations, and the specific accreditation body selected (e.g., IAS or NABCB). We offer transparent, all-inclusive pricing without hidden charges."
                }
              }
            ]
          })
        }}
      />
    </>
  );
}
