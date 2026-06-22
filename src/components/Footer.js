"use client";

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="footer-grid">
        {/* Brand */}
        <div className="footer-brand">
          <div className="footer-logo">
            <img src="/msrassessment/msr.png" alt="MSR Assessment Pvt Ltd" width="65" height="65" />
            <span className="footer-logo-name">{t("MSR Assessment Pvt Ltd")}</span>
          </div>
          <p className="footer-tagline">
            {t("India's trusted partner since 2022 for corporate registration, compliance management, and business advisory services.")}
          </p>

          <p className="footer-address" style={{ marginTop: '10px', fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.5' }}>
            <strong>Head Office:</strong> 2ND FLOOR, 23 A, ROYD STREET, P.S, Park St, Kolkata, West Bengal 700016.<br />
            <strong>GST No:</strong> 19AAQCM2742Q1ZL
          </p>
          <div className="footer-socials">
            <a href="https://www.facebook.com/msrassessment2020/" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://www.instagram.com/msr_assessment/" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://www.youtube.com/channel/UC0_Ji0MVc-1VtQIPVB-rijw" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="YouTube">
              <i className="fab fa-youtube"></i>
            </a>
            <a href="https://www.linkedin.com/company/msr-assessment-pvt-ltd/" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="LinkedIn">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>

        {/* Digital Services */}
        <div className="footer-col">
          <h4>{t("Digital Services")}</h4>
          <Link href="/service/web-development/">{t("Web Development")}</Link>
          <Link href="/service/mobile-application/">{t("App Development")}</Link>
          <Link href="/service/ecommerce-web-development/">{t("Ecommerce")}</Link>
          <Link href="/digital-marketing/">{t("Digital Marketing")}</Link>
          <Link href="/service/brand-identity-design/">{t("Branding & Design")}</Link>
        </div>

        {/* Tax & Licensing */}
        <div className="footer-col">
          <h4>{t("Tax & Licensing")}</h4>
          <Link href="/gst-registration/">{t("GST Registration")}</Link>
          <Link href="/fssai-license/">{t("FSSAI License")}</Link>
          <Link href="/msme-registration/">{t("MSME Registration")}</Link>
          <Link href="/service/iec-registration/">{t("IEC Registration")}</Link>
          <Link href="/service/trade-license/">{t("Trade License")}</Link>
        </div>

        {/* ISO Certification */}
        <div className="footer-col">
          <h4>{t("ISO Certification")}</h4>
          <Link href="/service/iso-9001-certification/">ISO 9001</Link>
          <Link href="/service/iso-14001-certification/">ISO 14001</Link>
          <Link href="/service/iso-27001-certification/">ISO 27001</Link>
          <Link href="/service/iso-45001-certification/">ISO 45001</Link>
          <Link href="/service/iso-22000-certification/">ISO 22000</Link>
          <Link href="/service/iso-13485-certification/">ISO 13485</Link>
          <Link href="/service/iso-31000-consulting/">ISO 31000</Link>
        </div>

        {/* IPR Services */}
        <div className="footer-col">
          <h4>{t("IPR Services")}</h4>
          <Link href="/service/copyright-registration/">{t("Copyright Registration")}</Link>
          <Link href="/service/patent-application-india/">{t("Patent Filing")}</Link>
          <Link href="/service/design-registration/">{t("Design Registration")}</Link>
          <Link href="/service/trademark-objection/">{t("Trademark Objection")}</Link>
          <Link href="/service/trademark-renewal/">{t("Trademark Renewal")}</Link>
        </div>

        {/* Contact Helpline */}
        <div className="footer-newsletter">
          <h4>{t("Advisory Helpline")}</h4>
          <p>{t("Talk to our central processing desk or query registry certificates.")}</p>
          <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <a href="tel:+918337004170" style={{ color: 'white', fontWeight: 700, fontSize: '15px' }}>
              <i className="fas fa-phone" style={{ color: 'var(--accent)', marginRight: '6px' }}></i> +91 83370 04170
            </a>
            <a href="mailto:admin@msrassessment.com" style={{ color: 'white', fontWeight: 700, fontSize: '15px' }}>
              <i className="fas fa-envelope" style={{ color: 'var(--accent)', marginRight: '6px' }}></i> admin@msrassessment.com
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2022-2026 MSR Assessment Pvt Ltd. All rights reserved. Registered under MCA.</span>
        <div className="footer-legal-links">
          <Link href="/privacy-policy/">{t("Privacy Policy")}</Link>
          <Link href="/terms-of-service/">{t("Terms of Service")}</Link>
          <Link href="/refund-policy/">{t("Refund Policy")}</Link>
          <Link href="/cookie-policy/">{t("Cookie Policy")}</Link>
          <a href="#">Disclaimer</a>
        </div>
      </div>
    </footer>
  );
}
