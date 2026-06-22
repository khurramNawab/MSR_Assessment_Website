import ServiceDetail from '@/components/ServiceDetail';
import { subData, slugify } from '@/data/servicesData';

export function generateStaticParams() {
  const slugs = [];

  // Add all standard slugs from subData
  for (const catKey in subData) {
    subData[catKey].forEach(item => {
      // Use explicit item.id as the URL slug if set, otherwise fall back to slugified title
      slugs.push({ id: item.id || slugify(item.title) });
    });
  }

  // Add legacy mapped slugs
  const legacySlugs = [
    'agreements',
    'affidavits',
    'moa-aoa',
    'iso-audit',
    'risk-assessment',
    'iso-9001',
    'iso-14001',
    'iso-27001',
    'iso-45001',
    'iso-22000',
    'internal-audit',
    'compliance-audit',
    'Search-engine-marketing-services',
    // Header alias slugs that redirect via serviceIdMapping
    'e-commerce-development',
    'branding-design',
    'patent-filing',
    'trademark-registration'
  ];

  legacySlugs.forEach(slug => {
    slugs.push({ id: slug });
  });

  return slugs;
}

export async function generateMetadata({ params }) {
  const { id } = await params;

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
    'register-company-name': {
      title: "Register Company Name India | Reserve Business Name",
      description: "Register company name in India online with expert assistance. Check name availability, reserve your company name, and get MCA name approval quickly and hassle-free."
    },
    'private-limited-company-registration-india': {
      title: "Private Limited Company Registration in India | Online Setup",
      description: "Register a Private Limited Company in India with expert assistance. Get company incorporation, DSC, DIN, MCA filing, and compliance support through a simple online process."
    },
    'llp-registration-india': {
      title: "LLP Registration in India | Online LLP Registration Services",
      description: "Register your LLP in India with expert assistance. Get support for name reservation, partner documentation, MCA filing, and LLP incorporation through a simple online process."
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
    }
  };

  if (metaMap[id]) {
    return {
      title: metaMap[id].title,
      description: metaMap[id].description,
      openGraph: { title: metaMap[id].title, description: metaMap[id].description }
    };
  }

  if (id === 'search-engine-marketing-services' || id === 'search-engine-marketing-services-for-traffic-lead-generation' || id === 'Search-engine-marketing-services') {
    return {
      title: "Search Engine Marketing Services for Traffic & Lead Generation",
      description: "Boost your business with expert SEO and Search Engine Marketing (SEM) services that improve online visibility, drive targeted traffic, increase conversions, and generate high-quality leads.",
      openGraph: {
        title: "Search Engine Marketing Services for Traffic & Lead Generation",
        description: "Boost your business with expert SEO and Search Engine Marketing (SEM) services that improve online visibility, drive targeted traffic, increase conversions, and generate high-quality leads."
      }
    };
  }

  return {
    title: "MSR Assessment Pvt Ltd | Corporate & Legal Services"
  };
}

export default async function ServicePage({ params }) {
  const { id } = await params;
  return <ServiceDetail serviceId={id} />;
}
