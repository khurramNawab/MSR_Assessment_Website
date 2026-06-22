import ServiceDetail from '@/components/ServiceDetail';
import { 
  CareerPage, 
  CertificationProcessPage, 
  CertificationGuidesPage, 
  CaseStudiesPage, 
  CertificateVerificationPage, 
  FaqsPage, 
  IndustriesPage, 
  PrivacyPolicyPage, 
  RefundPolicyPage,
  CookiePolicyPage,
  TermsOfServicePage, 
  TeamPage, 
  IndustryCompliancePage, 
  LocationCertPage 
} from '@/components/LegacyPages';

export function generateStaticParams() {
  const rootSlugs = [
    // Existing categories / service overviews:
    'register-company-name',
    'iso-certification',
    'training-services',
    'website-development',
    'mobile-app-development',
    'digital-marketing',
    'trademark-registration',
    'gst-registration',
    'fssai-license',
    'msme-registration',
    'audit-services',
    'internal-audit-services',
    'compliance-consulting',
    
    // Standalone pages:
    'service',
    'career',
    'certification-process',
    'certification-guides',
    'case-studies',
    'certificate-verification',
    'faqs',
    'industries',
    'privacy-policy',
    'refund-policy',
    'cookie-policy',
    'team',
    'terms-of-service',
    
    // Industry pages:
    'construction-compliance',
    'food-industry-compliance',
    'healthcare-compliance',
    'it-services-compliance',
    'logistics-compliance',
    'manufacturing-compliance',
    
    // Location pages:
    'iso-certification-delhi',
    'iso-certification-mumbai',
    'iso-certification-bengaluru'
  ];

  return rootSlugs.map(slug => ({ id: slug }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;

  // Map root slugs to their canonical service metadata IDs
  const idMap = {
    'trademark-registration': 'register-trademark-online',
    'mobile-app-development': 'mobile-application',
    'website-development': 'web-development',
  };

  const lookupId = idMap[id] || id;

  const metaMap = {
    'social-media-marketing': {
      title: "Social Media Marketing Services for Brand Growth & Engagement",
      description: "Grow your brand with professional Social Media Marketing services. Increase engagement, reach your target audience, generate leads, and drive business growth across leading social platforms."
    },
    'web-development': {
      title: "Custom Web Development Solutions for Modern Brands",
      description: "Looking for professional web development services? Get custom, responsive, and SEO-friendly websites designed to drive growth and conversions."
    },
    'brand-identity-design': {
      title: "Brand Identity & Design Services for Business Growth",
      description: "Create a memorable brand with professional Brand Identity and Design services. Build recognition, strengthen credibility, and connect with your target audience."
    },
    'mobile-application': {
      title: "Mobile Application Development Company | Custom App Solutions",
      description: "Leading mobile app development company offering custom mobile application development services. Build scalable, secure, and user-friendly apps for business growth."
    },
    'register-trademark-online': {
      title: "Fast Trademark Registration Services | Protect Your Brand",
      description: "Get fast trademark registration services to protect your brand, logo, and business name. Expert filing support with affordable pricing."
    },
    'copyright-registration': {
      title: "Copyright Registration Services to Protect Creative Works",
      description: "Protect your books, music, software, artwork, and digital content with expert copyright registration services and secure legal ownership rights."
    },
    'patent-application-india': {
      title: "Patent Application in India — Protect Your Innovation",
      description: "File your patent application in India with qualified IP professionals. MSR Assessment Pvt Ltd offers end-to-end patent filing services — from prior art search to grant tracking — 100% online, Pan-India."
    },
    'ecommerce-web-development': {
      title: "E-commerce Web Development Services for Online Growth",
      description: "Build a high-performing online store with our E-commerce Web Development services. Get a secure, scalable, and user-friendly website designed to drive sales and business growth."
    },
    'register-company-name': {
      title: "Register Company Name India | Reserve Business Name",
      description: "Register company name in India online with expert assistance. Check name availability, reserve your company name, and get MCA name approval quickly and hassle-free."
    },
    'iso-certification': {
      title: "ISO Certification Services | Accredited Registrar & Audits",
      description: "Get ISO 9001, 14001, 27001, 45001 certified. MSR Assessment Pvt Ltd is an accredited ISO certification body offering audits and certification."
    },
    'training-services': {
      title: "ISO Training Services | Lead Auditor & Awareness Programs",
      description: "Professional ISO compliance training, internal auditor development, and corporate awareness workshops delivered by certified experts."
    },
    'gst-registration': {
      title: "Online GST Registration Services | Fast & Hassle-Free Filing",
      description: "Get your GST registration online within 3-5 days. Managed by qualified Chartered Accountants with transparent pricing and no hidden fees."
    },
    'fssai-license': {
      title: "FSSAI License Registration Online | Food License Services",
      description: "Obtain your FSSAI food license or registration online. Seamless compliance support for cloud kitchens, restaurants, packers, and distributors."
    },
    'msme-registration': {
      title: "MSME Udyam Registration Online | Secure Government Subsidies",
      description: "Get your MSME Udyam certificate online in 1-2 days. Avail interest subsidies, corporate credit benefits, and government tender waivers."
    },
    'audit-services': {
      title: "Corporate Audit & Inspection Services | Risk Auditing Team",
      description: "Independent internal audits, risk assessment checks, compliance audits, and regulatory inspections managed by expert Chartered Accountants."
    }
  };

  if (metaMap[lookupId]) {
    return {
      title: metaMap[lookupId].title,
      description: metaMap[lookupId].description,
      openGraph: { title: metaMap[lookupId].title, description: metaMap[lookupId].description }
    };
  }

  const formattedTitle = id
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title: `${formattedTitle} | MSR Assessment Pvt Ltd`,
    description: `Professional ${formattedTitle} services for corporate compliance, audits, and business growth in India.`
  };
}

export default async function RootServicePage({ params }) {
  const { id } = await params;

  // Route to standalone subcomponents if matching
  if (id === 'career') return <CareerPage />;
  if (id === 'certification-process') return <CertificationProcessPage />;
  if (id === 'certification-guides') return <CertificationGuidesPage />;
  if (id === 'case-studies') return <CaseStudiesPage />;
  if (id === 'certificate-verification') return <CertificateVerificationPage />;
  if (id === 'faqs') return <FaqsPage />;
  if (id === 'industries') return <IndustriesPage />;
  if (id === 'privacy-policy') return <PrivacyPolicyPage />;
  if (id === 'refund-policy') return <RefundPolicyPage />;
  if (id === 'cookie-policy') return <CookiePolicyPage />;
  if (id === 'terms-of-service') return <TermsOfServicePage />;
  if (id === 'team') return <TeamPage />;

  // Industry compliance sub-routing
  if ([
    'construction-compliance',
    'food-industry-compliance',
    'healthcare-compliance',
    'it-services-compliance',
    'logistics-compliance',
    'manufacturing-compliance'
  ].includes(id)) {
    return <IndustryCompliancePage id={id} />;
  }

  // Location ISO certification sub-routing
  if ([
    'iso-certification-delhi',
    'iso-certification-mumbai',
    'iso-certification-bengaluru'
  ].includes(id)) {
    return <LocationCertPage id={id} />;
  }

  // Fallback to service details rendering
  return <ServiceDetail serviceId={id} />;
}
