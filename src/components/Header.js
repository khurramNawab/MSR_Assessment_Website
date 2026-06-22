"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';

export default function Header() {
  const { locale, setLocale, t } = useLanguage();
  const pathname = usePathname();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Refs for outside-click detection
  const servicesRef = useRef(null);
  const langRef = useRef(null);
  const mobileNavRef = useRef(null);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close everything on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesOpen(false);
    setLangOpen(false);
  }, [pathname]);

  // Outside click to close desktop dropdowns
  useEffect(() => {
    const handleOutside = (e) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target)) {
        setServicesOpen(false);
      }
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const closeMobile = () => setMobileMenuOpen(false);

  return (
    <>
      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="mobile-overlay"
          onClick={closeMobile}
          aria-hidden="true"
        />
      )}

      <header
        className={`site-header ${isScrolled ? 'scrolled' : ''}`}
        id="site-header"
        role="banner"
      >
        <div className="header-wrap">
          {/* Logo */}
          <Link href="/" className="site-logo" aria-label="MSR Assessment Pvt Ltd Home">
            <img src="/msrassessment/msr.png" alt="MSR Assessment Pvt Ltd Logo" width="65" height="65" />
            <div className="logo-wordmark">
              <span className="logo-name">{t("MSR Assessment Pvt Ltd")}</span>
              <span className="logo-tagline">{t("Corporate & Legal Services")}</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="header-nav desktop-nav" role="navigation" aria-label="Main navigation">
            <Link href="/" className={`nav-link ${pathname === '/' ? 'is-active' : ''}`}>{t("Home")}</Link>
            <Link href="/about-us/" className={`nav-link ${pathname === '/about-us/' ? 'is-active' : ''}`}>{t("About Us")}</Link>

            {/* Services Mega Menu */}
            <div
              className={`nav-dropdown ${servicesOpen ? 'open' : ''}`}
              ref={servicesRef}
            >
              <button suppressHydrationWarning={true}
                className="nav-link"
                onClick={() => { setServicesOpen(v => !v); setLangOpen(false); }}
                aria-expanded={servicesOpen}
                aria-haspopup="true"
                suppressHydrationWarning={true}
              >
                {t("Services")} <span className="chevron"><i className={`fas fa-chevron-down ${servicesOpen ? 'rotated' : ''}`}></i></span>
              </button>

              {/* The mega panel is positioned fixed to the header, centered to viewport */}
              <div className="mega-panel mega-panel-wide" role="menu">
                <div className="mega-grid">
                  {/* Column 1: Company Registration & Documentation */}
                  <div className="mega-col">
                    <div className="mega-category-block">
                      <div className="mega-col-label">{t("Incorporation")}</div>
                      <h4>{t("Company Registration")}</h4>
                      <div className="mega-links">
                        <Link href="/register-company-name/" className="mega-link" style={{ fontWeight: 700, color: 'var(--primary)' }}>
                          <i className="fas fa-circle-arrow-right"></i> {t("Overview Page")}
                        </Link>
                        <Link href="/service/private-limited-company-registration-india/" className="mega-link">{t("Private Limited Co")}</Link>
                        <Link href="/service/llp-registration-india/" className="mega-link">{t("LLP Registration")}</Link>
                        <Link href="/service/opc-registration/" className="mega-link">{t("OPC Registration")}</Link>
                        <Link href="/service/partnership-firm/" className="mega-link">{t("Partnership Firm")}</Link>
                        <Link href="/service/startup-india-registration/" className="mega-link">{t("Startup India")}</Link>
                        <Link href="/service/nidhi-company/" className="mega-link">{t("Nidhi Company")}</Link>
                        <Link href="/service/section-8-company/" className="mega-link">{t("Section 8 Company")}</Link>
                      </div>
                    </div>
                    <div className="mega-category-block" style={{ marginTop: '15px' }}>
                      <div className="mega-col-label">{t("Contracts")}</div>
                      <h4>{t("Documentation Services")}</h4>
                      <div className="mega-links">
                        <Link href="/service/legal-drafting/" className="mega-link">{t("Legal Drafting")}</Link>
                        <Link href="/service/agreements/" className="mega-link">{t("Agreements & Contracts")}</Link>
                        <Link href="/service/affidavits/" className="mega-link">{t("Affidavits Preparation")}</Link>
                        <Link href="/service/moa-aoa/" className="mega-link">{t("MOA & AOA Drafting")}</Link>
                        <Link href="/service/compliance-documentation/" className="mega-link">{t("Compliance Drafting")}</Link>
                      </div>
                    </div>
                  </div>

                  {/* Column 2: ISO Certification & Training */}
                  <div className="mega-col">
                    <div className="mega-category-block">
                      <div className="mega-col-label">{t("Standards")}</div>
                      <h4>{t("ISO Certification")}</h4>
                      <div className="mega-links">
                        <Link href="/iso-certification/" className="mega-link" style={{ fontWeight: 700, color: 'var(--primary)' }}>
                          <i className="fas fa-circle-arrow-right"></i> {t("Overview Page")}
                        </Link>
                        <Link href="/service/iso-9001-certification/" className="mega-link">{t("ISO 9001 (Quality)")}</Link>
                        <Link href="/service/iso-14001-certification/" className="mega-link">{t("ISO 14001 (Environment)")}</Link>
                        <Link href="/service/iso-27001-certification/" className="mega-link">{t("ISO 27001 (Security)")}</Link>
                        <Link href="/service/iso-45001-certification/" className="mega-link">{t("ISO 45001 (Health & Safety)")}</Link>
                        <Link href="/service/iso-22000-certification/" className="mega-link">{t("ISO 22000 (Food Safety)")}</Link>
                        <Link href="/service/iso-13485-certification/" className="mega-link">{t("ISO 13485 (Medical Devices)")}</Link>
                        <Link href="/service/iso-50001-certification/" className="mega-link">{t("ISO 50001 (Energy)")}</Link>
                        <Link href="/service/iso-31000-consulting/" className="mega-link">{t("ISO 31000 (Risk Management)")}</Link>
                        <Link href="/service/gmp-certification/" className="mega-link">{t("GMP Certification")}</Link>
                        <Link href="/service/haccp-certification/" className="mega-link">{t("HACCP Certification")}</Link>
                      </div>
                    </div>
                    <div className="mega-category-block" style={{ marginTop: '15px' }}>
                      <div className="mega-col-label">{t("Workshops")}</div>
                      <h4>{t("Training Services")}</h4>
                      <div className="mega-links">
                        <Link href="/training-services/" className="mega-link" style={{ fontWeight: 700, color: 'var(--primary)' }}>
                          <i className="fas fa-circle-arrow-right"></i> {t("Overview Page")}
                        </Link>
                        <Link href="/service/iso-awareness-training/" className="mega-link">{t("ISO Awareness")}</Link>
                        <Link href="/service/internal-auditor-training/" className="mega-link">{t("Internal Auditor Training")}</Link>
                        <Link href="/service/compliance-training/" className="mega-link">{t("Compliance Training")}</Link>
                        <Link href="/service/corporate-workshops/" className="mega-link">{t("Corporate Workshops")}</Link>
                      </div>
                    </div>
                  </div>

                  {/* Column 3: Digital Services & IPR */}
                  <div className="mega-col">
                    <div className="mega-category-block">
                      <div className="mega-col-label">{t("Software & Web")}</div>
                      <h4>{t("Digital Services")}</h4>
                      <div className="mega-links">
                        <Link href="/service/web-development/" className="mega-link" style={{ fontWeight: 700, color: 'var(--primary)' }}>
                          <i className="fas fa-circle-arrow-right"></i> {t("Web Development")}
                        </Link>
                        <Link href="/service/mobile-application/" className="mega-link" style={{ fontWeight: 700, color: 'var(--primary)' }}>
                          <i className="fas fa-circle-arrow-right"></i> {t("Mobile App Dev")}
                        </Link>
                        <Link href="/digital-marketing/" className="mega-link" style={{ fontWeight: 700, color: 'var(--primary)' }}>
                          <i className="fas fa-circle-arrow-right"></i> {t("Digital Marketing")}
                        </Link>
                        <Link href="/service/ecommerce-web-development/" className="mega-link">{t("E-Commerce Dev")}</Link>
                        <Link href="/service/search-engine-marketing-services/" className="mega-link">{t("SEO Services")}</Link>
                        <Link href="/service/social-media-marketing/" className="mega-link">{t("Social Media Marketing")}</Link>
                        <Link href="/service/brand-identity-design/" className="mega-link">{t("Branding & Design")}</Link>
                      </div>
                    </div>
                    <div className="mega-category-block" style={{ marginTop: '15px' }}>
                      <div className="mega-col-label">{t("IP & Branding")}</div>
                      <h4>{t("IPR Services")}</h4>
                      <div className="mega-links">
                        <Link href="/trademark-registration/" className="mega-link" style={{ fontWeight: 700, color: 'var(--primary)' }}>
                          <i className="fas fa-circle-arrow-right"></i> {t("Trademark Registration")}
                        </Link>
                        <Link href="/service/trademark-objection/" className="mega-link">{t("Trademark Objection")}</Link>
                        <Link href="/service/trademark-renewal/" className="mega-link">{t("Trademark Renewal")}</Link>
                        <Link href="/service/copyright-registration/" className="mega-link">{t("Copyright Registration")}</Link>
                        <Link href="/service/patent-application-india/" className="mega-link">{t("Patent Filing")}</Link>
                        <Link href="/service/design-registration/" className="mega-link">{t("Design Registration")}</Link>
                      </div>
                    </div>
                  </div>

                  {/* Column 4: Tax, Licensing & Auditing */}
                  <div className="mega-col">
                    <div className="mega-category-block">
                      <div className="mega-col-label">{t("Tax & Licensing")}</div>
                      <h4>{t("Licenses & Approvals")}</h4>
                      <div className="mega-links">
                        <Link href="/gst-registration/" className="mega-link" style={{ fontWeight: 700, color: 'var(--primary)' }}>
                          <i className="fas fa-circle-arrow-right"></i> {t("GST Registration")}
                        </Link>
                        <Link href="/fssai-license/" className="mega-link" style={{ fontWeight: 700, color: 'var(--primary)' }}>
                          <i className="fas fa-circle-arrow-right"></i> {t("FSSAI License")}
                        </Link>
                        <Link href="/msme-registration/" className="mega-link" style={{ fontWeight: 700, color: 'var(--primary)' }}>
                          <i className="fas fa-circle-arrow-right"></i> {t("MSME Registration")}
                        </Link>
                        <Link href="/service/iec-registration/" className="mega-link">{t("IEC Registration")}</Link>
                        <Link href="/service/trade-license/" className="mega-link">{t("Trade License")}</Link>
                        <Link href="/service/shop-establishment-license/" className="mega-link">{t("Shop & Establishment")}</Link>
                      </div>
                    </div>
                    <div className="mega-category-block" style={{ marginTop: '15px' }}>
                      <div className="mega-col-label">{t("Risk & Review")}</div>
                      <h4>{t("Audit & Inspection")}</h4>
                      <div className="mega-links">
                        <Link href="/audit-services/" className="mega-link" style={{ fontWeight: 700, color: 'var(--primary)' }}>
                          <i className="fas fa-circle-arrow-right"></i> {t("Overview Page")}
                        </Link>
                        <Link href="/internal-audit-services/" className="mega-link">{t("Internal Audit")}</Link>
                        <Link href="/compliance-consulting/" className="mega-link">{t("Compliance Audit")}</Link>
                        <Link href="/service/iso-audit/" className="mega-link">{t("ISO Audit Support")}</Link>
                        <Link href="/service/risk-assessment/" className="mega-link">{t("Risk Assessment")}</Link>
                        <Link href="/service/inspection-support/" className="mega-link">{t("Inspection Support")}</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Link href="/certification-process/" className={`nav-link ${pathname === '/certification-process/' ? 'is-active' : ''}`}>{t("Certification Process")}</Link>
            <Link href="/career/" className={`nav-link ${pathname === '/career/' ? 'is-active' : ''}`}>{t("Career")}</Link>
            <Link href="/blogs/" className={`nav-link ${pathname === '/blogs/' ? 'is-active' : ''}`}>{t("Blogs")}</Link>
            <Link href="/contact/" className="nav-link nav-contact-btn">{t("Contact Us")}</Link>
            <Link href="/payment/" className={`nav-link ${pathname === '/payment/' ? 'is-active' : ''}`}>{t("Online Payment")}</Link>

            {/* Language Selector */}
            <div className={`nav-dropdown lang-selector ${langOpen ? 'open' : ''}`} ref={langRef}>
              <button suppressHydrationWarning={true}
                className="nav-link"
                onClick={() => { setLangOpen(v => !v); setServicesOpen(false); }}
                aria-expanded={langOpen}
                aria-haspopup="true"
                suppressHydrationWarning={true}
              >
                <i className="fas fa-globe"></i> <span>{locale.toUpperCase()}</span> <span className="chevron"><i className="fas fa-chevron-down"></i></span>
              </button>
              <div className="mega-panel mega-panel-xs lang-panel">
                <a href="#" className={`lang-item ${locale === 'en' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setLocale('en'); setLangOpen(false); }}>English</a>
                <a href="#" className={`lang-item ${locale === 'hi' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setLocale('hi'); setLangOpen(false); }}>हिन्दी (Hindi)</a>
              </div>
            </div>
          </nav>

          {/* Mobile Menu Toggle */}
          <button suppressHydrationWarning={true}
            className="menu-toggle"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open navigation"
            aria-expanded={mobileMenuOpen}
          >
            <i className="fas fa-bars"></i>
          </button>

          {/* Header Actions (Desktop CTA) */}
          <div className="header-actions">
            <button suppressHydrationWarning={true}
              className="btn btn-sm btn-primary"
              onClick={() => {
                const modal = document.getElementById('inquiry-modal');
                if (modal) modal.classList.add('open');
              }}
            >
              {t("Talk To An Expert")}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <nav
        className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}
        ref={mobileNavRef}
        role="navigation"
        aria-label="Mobile navigation"
        id="mobile-drawer"
      >
        {/* Drawer Header */}
        <div className="mobile-drawer-head">
          <Link href="/" className="site-logo" onClick={closeMobile}>
            <img src="/msrassessment/msr.png" alt="MSR Assessment Pvt Ltd Logo" width="44" height="44" />
            <div className="logo-wordmark">
              <span className="logo-name" style={{ fontSize: '13px' }}>{t("MSR Assessment Pvt Ltd")}</span>
              <span className="logo-tagline">{t("Corporate & Legal Services")}</span>
            </div>
          </Link>
          <button suppressHydrationWarning={true} className="mobile-drawer-close" onClick={closeMobile} aria-label="Close navigation">
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Drawer Links */}
        <div className="mobile-drawer-body">
          <Link href="/" className={`mobile-nav-link ${pathname === '/' ? 'is-active' : ''}`} onClick={closeMobile}>
            <i className="fas fa-home"></i> {t("Home")}
          </Link>
          <Link href="/about-us/" className={`mobile-nav-link ${pathname === '/about-us/' ? 'is-active' : ''}`} onClick={closeMobile}>
            <i className="fas fa-building"></i> {t("About Us")}
          </Link>

          {/* Mobile Services Accordion */}
          <MobileServicesAccordion t={t} closeMobile={closeMobile} />

          <Link href="/certification-process/" className={`mobile-nav-link ${pathname === '/certification-process/' ? 'is-active' : ''}`} onClick={closeMobile}>
            <i className="fas fa-certificate"></i> {t("Certification Process")}
          </Link>
          <Link href="/career/" className={`mobile-nav-link ${pathname === '/career/' ? 'is-active' : ''}`} onClick={closeMobile}>
            <i className="fas fa-briefcase"></i> {t("Career")}
          </Link>
          <Link href="/blogs/" className={`mobile-nav-link ${pathname === '/blogs/' ? 'is-active' : ''}`} onClick={closeMobile}>
            <i className="fas fa-pen-nib"></i> {t("Blogs")}
          </Link>
          <Link href="/contact/" className="mobile-nav-link" onClick={closeMobile}>
            <i className="fas fa-envelope"></i> {t("Contact Us")}
          </Link>
          <Link href="/payment/" className={`mobile-nav-link ${pathname === '/payment/' ? 'is-active' : ''}`} onClick={closeMobile}>
            <i className="fas fa-credit-card"></i> {t("Online Payment")}
          </Link>

          {/* Language toggle */}
          <div className="mobile-lang-row">
            <span className="mobile-lang-label"><i className="fas fa-globe"></i> Language:</span>
            <button suppressHydrationWarning={true} className={`mobile-lang-btn ${locale === 'en' ? 'active' : ''}`} onClick={() => { setLocale('en'); closeMobile(); }}>EN</button>
            <button suppressHydrationWarning={true} className={`mobile-lang-btn ${locale === 'hi' ? 'active' : ''}`} onClick={() => { setLocale('hi'); closeMobile(); }}>हि</button>
          </div>

          {/* Mobile CTA */}
          <button suppressHydrationWarning={true}
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '16px', borderRadius: '10px', padding: '14px' }}
            onClick={() => {
              closeMobile();
              setTimeout(() => {
                const modal = document.getElementById('inquiry-modal');
                if (modal) modal.classList.add('open');
              }, 300);
            }}
          >
            {t("Talk To An Expert")} <i className="fas fa-arrow-right"></i>
          </button>
        </div>
      </nav>
    </>
  );
}

/* ─── Mobile Services Accordion sub-component ─── */
function MobileServicesAccordion({ t, closeMobile }) {
  const [open, setOpen] = useState(false);
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (key) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const sections = [
    {
      key: 'company',
      label: t("Incorporation"),
      title: t("Company Registration"),
      links: [
        { href: '/register-company-name/', label: t("Overview Page"), bold: true },
        { href: '/service/private-limited-company-registration-india/', label: t("Private Limited Co") },
        { href: '/service/llp-registration-india/', label: t("LLP Registration") },
        { href: '/service/opc-registration/', label: t("OPC Registration") },
        { href: '/service/partnership-firm/', label: t("Partnership Firm") },
        { href: '/service/startup-india-registration/', label: t("Startup India") },
        { href: '/service/nidhi-company/', label: t("Nidhi Company") },
        { href: '/service/section-8-company/', label: t("Section 8 Company") },
      ]
    },
    {
      key: 'docs',
      label: t("Contracts"),
      title: t("Documentation Services"),
      links: [
        { href: '/service/legal-drafting/', label: t("Legal Drafting") },
        { href: '/service/agreements/', label: t("Agreements & Contracts") },
        { href: '/service/affidavits/', label: t("Affidavits Preparation") },
        { href: '/service/moa-aoa/', label: t("MOA & AOA Drafting") },
        { href: '/service/compliance-documentation/', label: t("Compliance Drafting") },
      ]
    },
    {
      key: 'iso',
      label: t("Standards"),
      title: t("ISO Certification"),
      links: [
        { href: '/iso-certification/', label: t("Overview Page"), bold: true },
        { href: '/service/iso-9001-certification/', label: t("ISO 9001") },
        { href: '/service/iso-14001-certification/', label: t("ISO 14001") },
        { href: '/service/iso-27001-certification/', label: t("ISO 27001") },
        { href: '/service/iso-45001-certification/', label: t("ISO 45001") },
        { href: '/service/iso-22000-certification/', label: t("ISO 22000") },
        { href: '/service/gmp-certification/', label: t("GMP Certification") },
        { href: '/service/haccp-certification/', label: t("HACCP Certification") },
      ]
    },
    {
      key: 'digital',
      label: t("Software & Web"),
      title: t("Digital Services"),
      links: [
        { href: '/service/web-development/', label: t("Web Development"), bold: true },
        { href: '/service/mobile-application/', label: t("Mobile App Dev"), bold: true },
        { href: '/digital-marketing/', label: t("Digital Marketing"), bold: true },
        { href: '/service/ecommerce-web-development/', label: t("E-Commerce Dev") },
        { href: '/service/search-engine-marketing-services/', label: t("SEO Services") },
        { href: '/service/social-media-marketing/', label: t("Social Media Marketing") },
        { href: '/service/brand-identity-design/', label: t("Branding & Design") },
      ]
    },
    {
      key: 'ipr',
      label: t("IP & Branding"),
      title: t("IPR Services"),
      links: [
        { href: '/trademark-registration/', label: t("Trademark Registration"), bold: true },
        { href: '/service/trademark-objection/', label: t("Trademark Objection") },
        { href: '/service/trademark-renewal/', label: t("Trademark Renewal") },
        { href: '/service/copyright-registration/', label: t("Copyright Registration") },
        { href: '/service/patent-application-india/', label: t("Patent Filing") },
        { href: '/service/design-registration/', label: t("Design Registration") },
      ]
    },
    {
      key: 'licenses',
      label: t("Tax & Licensing"),
      title: t("Licenses & Approvals"),
      links: [
        { href: '/gst-registration/', label: t("GST Registration"), bold: true },
        { href: '/fssai-license/', label: t("FSSAI License"), bold: true },
        { href: '/msme-registration/', label: t("MSME Registration"), bold: true },
        { href: '/service/iec-registration/', label: t("IEC Registration") },
        { href: '/service/trade-license/', label: t("Trade License") },
        { href: '/service/shop-establishment-license/', label: t("Shop & Establishment") },
      ]
    },
    {
      key: 'audit',
      label: t("Risk & Review"),
      title: t("Audit & Inspection"),
      links: [
        { href: '/audit-services/', label: t("Overview Page"), bold: true },
        { href: '/internal-audit-services/', label: t("Internal Audit") },
        { href: '/compliance-consulting/', label: t("Compliance Audit") },
        { href: '/service/iso-audit/', label: t("ISO Audit Support") },
        { href: '/service/risk-assessment/', label: t("Risk Assessment") },
        { href: '/service/inspection-support/', label: t("Inspection Support") },
      ]
    },
  ];

  return (
    <div className="mobile-services-accordion">
      <button suppressHydrationWarning={true}
        className={`mobile-nav-link mobile-services-toggle ${open ? 'is-active' : ''}`}
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
      >
        <i className="fas fa-th-large"></i>
        {t("Services")}
        <i className={`fas fa-chevron-${open ? 'up' : 'down'} ms-acc-chevron`}></i>
      </button>

      {open && (
        <div className="mobile-services-body">
          {sections.map(section => (
            <div key={section.key} className="ms-section">
              <button suppressHydrationWarning={true}
                className="ms-section-head"
                onClick={() => toggleSection(section.key)}
                aria-expanded={!!openSections[section.key]}
              >
                <span>
                  <span className="ms-section-label">{section.label}</span>
                  <span className="ms-section-title">{section.title}</span>
                </span>
                <i className={`fas fa-chevron-${openSections[section.key] ? 'up' : 'down'}`}></i>
              </button>
              {openSections[section.key] && (
                <div className="ms-section-links">
                  {section.links.map((link, i) => (
                    <Link
                      key={i}
                      href={link.href}
                      className="ms-link"
                      style={link.bold ? { fontWeight: 700, color: 'var(--primary)' } : {}}
                      onClick={closeMobile}
                    >
                      {link.bold && <i className="fas fa-circle-arrow-right" style={{ fontSize: '10px', color: 'var(--accent)' }}></i>}
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
