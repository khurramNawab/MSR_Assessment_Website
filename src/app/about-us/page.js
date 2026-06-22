"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function AboutUs() {
  const { t } = useLanguage();
  const [activeSlide, setActiveSlide] = useState(0);

  const galleryImages = [
    '/msrassessment/assets/company_photos/mohsin.jpeg',
    '/msrassessment/assets/company_photos/msr_1.jpeg',
    '/msrassessment/assets/company_photos/msr_2.jpeg',
    '/msrassessment/assets/company_photos/msr_3.avif',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % galleryImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [galleryImages.length]);

  // Handle scroll reveal animations
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
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="svc-page-hero">
        <div
          className="svc-hero-bg-media"
          style={{ backgroundImage: "url('/msrassessment/assets/modern_high_rise_corporate_office_building_with_glass_facade_representing.png')", opacity: 0.05 }}
        ></div>
        <div className="container">
          <span className="t-label">{t("About Us")}</span>
          <h1 className="t-h1" style={{ color: 'var(--primary)', marginTop: 'var(--s2)' }}>
            {t("About MSR Assessment Pvt. Ltd.")}
          </h1>
          <p className="t-body-lg" style={{ marginTop: 'var(--s2)', maxWidth: '850px' }}>
            {t("MSR Assessment Pvt. Ltd. is a leading ISO certification and compliance solutions provider dedicated to helping businesses achieve internationally recognized standards. Since our inception, we have supported organizations across manufacturing, IT, healthcare, food processing, construction, logistics, hospitality, and service sectors in improving quality, safety, security, and operational excellence through globally accepted certification frameworks.")}
          </p>
          <p className="t-body-lg" style={{ marginTop: 'var(--s2)', maxWidth: '850px' }}>
            {t("Our mission is to simplify the certification journey through expert guidance, transparent processes, and industry-specific auditing services. With a team of experienced auditors and technical experts, we help organizations strengthen management systems, improve compliance, and build trust with customers worldwide.")}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="svc-body-section">
        <div className="svc-body-inner" style={{ gridTemplateColumns: '1fr', maxWidth: '1000px', margin: '0 auto' }}>
          <div className="svc-body-main">

            <div className="svc-content-section" data-reveal>
              <h2>{t("Our Story")}</h2>
              <p style={{ fontSize: '15.5px', color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '16px' }}>
                {t("MSR Assessment was founded in the year 2022 with a vision to make international certification standards accessible, practical, and valuable for businesses of all sizes. Starting with ISO certification and auditing services, we have expanded our expertise to include compliance consulting, product certification, risk management systems, and business process improvement solutions.")}
              </p>
              <p style={{ fontSize: '15.5px', color: 'var(--text-muted)', lineHeight: '1.8' }}>
                {t("Today, we proudly serve clients across India and international markets, helping organizations achieve sustainable growth through globally recognized certification frameworks.")}
              </p>
            </div>

            <div className="svc-content-section" data-reveal>
              <h2>{t("About our vision")}</h2>
              <p style={{ fontSize: '15.5px', color: 'var(--text-muted)', lineHeight: '1.8' }}>
                {t("To empower organizations with reliable certification, auditing, and compliance solutions that enhance quality, operational efficiency, customer satisfaction, and long-term business success. We aim to become one of the most trusted global certification and compliance partners, recognized for integrity, technical excellence, and customer-focused service delivery.")}
              </p>
            </div>

            <div className="svc-content-section" data-reveal>
              <h2>{t("What We Do")}</h2>
              <p style={{ fontSize: '15.5px', color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '30px' }}>
                {t("We provide a comprehensive range of certification and compliance services, including:")}
              </p>

              <h3><i className="fas fa-certificate" style={{ color: 'var(--accent)', marginRight: '8px' }}></i> {t("ISO Certification Services")}</h3>
              <div className="wj-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', margin: '20px 0', padding: 0, maxWidth: '100%' }}>
                {[
                  { name: "ISO 9001 Quality Management System", link: "/service/iso-9001-certification/" },
                  { name: "ISO 14001 Environmental Management System", link: "/service/iso-14001-certification/" },
                  { name: "ISO 45001 Occupational Health & Safety Management System", link: "/service/iso-45001-certification/" },
                  { name: "ISO 22000 Food Safety Management System", link: "/service/iso-22000-certification/" },
                  { name: "ISO 27001 Information Security Management System", link: "/service/iso-27001-certification/" },
                  { name: "ISO 31000 Risk Management System", link: "/service/iso-31000/" }
                ].map((item, idx) => (
                  <Link href={item.link} className="wj-card" key={idx} style={{ display: 'block', textDecoration: 'none' }}>
                    <h4 style={{ fontSize: '15px', fontWeight: '600', color: 'var(--primary)' }}>{t(item.name)}</h4>
                  </Link>
                ))}
              </div>

              <h3 style={{ marginTop: '40px' }}><i className="fas fa-shield-alt" style={{ color: 'var(--accent)', marginRight: '8px' }}></i> {t("Compliance & Business Solutions")}</h3>
              <ul style={{ listStyle: 'none', padding: 0, marginTop: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                {[
                  "Product Certification",
                  "Audit Services",
                  "Documentation Support",
                  "Gap Analysis",
                  "Certification Verification",
                  "Barcode Registration",
                  "Training & Awareness Programs"
                ].map((item, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '15.5px', color: 'var(--text-muted)', background: 'var(--bg-alt)', padding: '15px 20px', borderRadius: '8px', border: '1px solid var(--border-solid)' }}>
                    <i className="fas fa-check-circle" style={{ color: 'var(--accent)' }}></i> {t(item)}
                  </li>
                ))}
              </ul>

              <div style={{ marginTop: '40px', padding: '30px', background: 'var(--bg-alt)', borderRadius: '12px', borderLeft: '4px solid var(--accent)' }}>
                <h4 style={{ fontSize: '18px', color: 'var(--primary)', marginBottom: '12px' }}>{t("Start your ISO Certification Journey with MSR Assessment")}</h4>
                <Link href="/contact/" className="btn btn-primary btn-md">
                  {t("Get Certified Today")} <i className="fas fa-arrow-right" style={{ marginLeft: '8px' }}></i>
                </Link>
              </div>
            </div>

            <div className="svc-content-section" data-reveal>
              <h2>{t("Serving Businesses Worldwide")}</h2>
              <p style={{ fontSize: '15.5px', color: 'var(--text-muted)', lineHeight: '1.8' }}>
                {t("From startups to large enterprises, MSR Assessment helps organizations demonstrate compliance, improve operational performance, and gain competitive advantages through internationally recognized certification standards. Our commitment to quality and customer satisfaction has made us a trusted certification partner for businesses seeking sustainable growth and global recognition.")}
              </p>
            </div>

            <div className="svc-content-section" data-reveal>
              <h2>{t("Gallery")}</h2>
              <div className="carousel-container" style={{ position: 'relative', marginTop: '20px', overflow: 'hidden', borderRadius: 'var(--r-xl)', boxShadow: 'var(--sh-lg)', background: 'var(--bg-card)' }}>
                <div className="carousel-slides" style={{ display: 'flex', transition: 'transform 0.5s ease-in-out', transform: `translateX(-${activeSlide * (100 / galleryImages.length)}%)`, width: `${galleryImages.length * 100}%` }}>
                  {galleryImages.map((src, idx) => (
                    <div key={idx} className="carousel-slide" style={{ width: `${100 / galleryImages.length}%`, flexShrink: 0, position: 'relative', height: '500px' }}>
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          backgroundImage: `url('${src}')`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                      />
                    </div>
                  ))}
                </div>

                {/* Navigation Arrows */}
                <button suppressHydrationWarning={true}
                  onClick={() => setActiveSlide((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1))}
                  style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.3)', color: 'white', width: '50px', height: '50px', borderRadius: '50%', cursor: 'pointer', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', transition: 'all 0.3s' }}
                  className="carousel-arrow"
                  aria-label="Previous Slide"
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
                <button suppressHydrationWarning={true}
                  onClick={() => setActiveSlide((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1))}
                  style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.3)', color: 'white', width: '50px', height: '50px', borderRadius: '50%', cursor: 'pointer', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', transition: 'all 0.3s' }}
                  className="carousel-arrow"
                  aria-label="Next Slide"
                >
                  <i className="fas fa-chevron-right"></i>
                </button>

                {/* Dots indicator */}
                <div style={{ position: 'absolute', bottom: '20px', left: '0', right: '0', display: 'flex', justifyContent: 'center', gap: '10px', zIndex: 2 }}>
                  {galleryImages.map((_, idx) => (
                    <button
                      key={idx}
                      suppressHydrationWarning={true}
                      onClick={() => setActiveSlide(idx)}
                      style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        border: 'none',
                        background: activeSlide === idx ? 'var(--accent)' : 'rgba(255,255,255,0.6)',
                        cursor: 'pointer',
                        padding: 0,
                        transition: 'background 0.3s'
                      }}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="svc-content-section" data-reveal style={{ background: 'var(--primary)', padding: '50px', borderRadius: 'var(--r-xl)', marginTop: '60px', color: 'white', textAlign: 'center' }}>
              <h2 style={{ color: 'white', marginBottom: '20px', border: 'none' }}>{t("Contact MSR Assessment")}</h2>
              <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.9)', lineHeight: '1.8', marginBottom: '10px', maxWidth: '700px', margin: '0 auto 10px auto' }}>
                {t("Ready to achieve certification and strengthen your business credibility?")}
              </p>
              <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.9)', lineHeight: '1.8', marginBottom: '30px', maxWidth: '700px', margin: '0 auto 30px auto' }}>
                {t("Contact our team today for expert guidance on ISO certification, auditing, and compliance solutions.")}
              </p>
              <Link href="/contact/" className="btn btn-accent btn-lg" style={{ display: 'inline-flex', alignItems: 'center', padding: '16px 32px', fontSize: '16px' }}>
                <i className="fas fa-phone-alt" style={{ marginRight: '10px' }}></i> {t("Request Free Consultation")}
              </Link>
              <p style={{ marginTop: '24px', fontSize: '15px', color: 'var(--accent)', fontWeight: '600' }}>
                {t("Let's Build a Stronger, More Compliant Business Together")}
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
