import "./globals.css";
import { LanguageProvider } from '@/context/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InquiryModal from '@/components/InquiryModal';

export const metadata = {
  title: "ISO Certification Services in India | ISO 9001, 14001, 45001, 22000 & 27001 | MSR Assessment",
  description: "Get ISO certification services from MSR Assessment. Expert auditors, fast certification process, global support, and affordable ISO 9001, ISO 14001, ISO 45001, ISO 22000 & ISO 27001 certification solutions.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <link rel="icon" type="image/png" href="/msr.png" />
      </head>
      <body>
        <LanguageProvider>
          {/* Trust Ribbon */}
          <div className="trust-ribbon" role="marquee" aria-label="Trust indicators">
            <div className="trust-ribbon-track">
              <span className="ribbon-item"><span className="ri-dot"></span> Accredited ISO Audits</span>
              <span className="ribbon-item"><span className="ri-dot"></span> <strong>5,000+</strong> Audits Completed</span>
              <span className="ribbon-item"><span className="ri-dot"></span> <strong>12+ Years</strong> Regulatory Experience</span>
              <span className="ribbon-item"><span className="ri-dot"></span> IRCA Certified Lead Auditors</span>
              <span className="ribbon-item"><span className="ri-dot"></span> Corporate Governance Specialists</span>
              <span className="ribbon-item"><span className="ri-dot"></span> Pan-India Audit Offices</span>
              <span className="ribbon-item"><span className="ri-dot"></span> Accredited ISO Audits</span>
              <span className="ribbon-item"><span className="ri-dot"></span> <strong>5,000+</strong> Audits Completed</span>
              <span className="ribbon-item"><span className="ri-dot"></span> <strong>12+ Years</strong> Regulatory Experience</span>
            </div>
          </div>
          <Header />
          <main style={{ minHeight: '80vh' }}>
            {children}
          </main>
          <Footer />
          <InquiryModal />
          
          {/* Toast Notification Container */}
          <div className="toast" id="toast">
            <i className="fas fa-check-circle"></i>
            <span id="toast-msg">Success!</span>
          </div>

          {/* Floating WhatsApp Button */}
          <a 
            href="https://wa.me/918337004170?text=Hello%20MSR%20Assessment%20Pvt%20Ltd%20Team%2C%20I%20would%20like%20to%20know%20more%20about%20your%20services."
            className="whatsapp-float" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Contact MSR Assessment Pvt Ltd on WhatsApp"
          >
            <i className="fab fa-whatsapp"></i>
          </a>
        </LanguageProvider>
      </body>
    </html>
  );
}
