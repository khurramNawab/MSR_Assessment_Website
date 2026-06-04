// data.js - Shared data for the site

const categories = [
    { id: 'inc',      title: "Company Registration",     desc: "Start your business with a legally solid foundation.",         icon: "fa-building" },
    { id: 'ip',       title: "IPR Services",              desc: "Protect your brand name, logo and creative assets.",         icon: "fa-paint-brush" },
    { id: 'iso',      title: "ISO Certification",         desc: "Global quality standards, safety, and management systems.",  icon: "fa-certificate" },
    { id: 'docs',     title: "Documentation Services",   desc: "Custom legal drafts, agreements, MoA/AoA, and affidavits.",  icon: "fa-file-contract" },
    { id: 'licenses', title: "Licenses & Approvals",     desc: "Mandatory corporate approvals, GST, and FSSAI licenses.",    icon: "fa-stamp" },
    { id: 'audit',    title: "Audit & Inspection",       desc: "Internal compliance reviews, risk audits and inspections.",  icon: "fa-shield-halved" },
    { id: 'training', title: "Training Services",        desc: "ISO awareness, internal auditor and compliance programs.",   icon: "fa-graduation-cap" },
    { id: 'digital',  title: "Digital Services",         desc: "Enterprise website, app, design and growth marketing.",     icon: "fa-laptop-code" }
];

const subData = {
    inc: [
        { 
          title: "Company Registration", 
          desc: "Complete end-to-end company incorporation guidance by qualified CA/CS experts.", 
          time: "10-15 days", 
          icon: "fa-city", 
          isLarge: true,
          eligibility: [
            "Minimum 2 Directors (at least one Indian resident)",
            "Minimum 2 Shareholders (directors can act as shareholders)",
            "Registered corporate address within Indian territory"
          ],
          documents: [
            "PAN Card of all Directors and Shareholders",
            "Aadhaar Card / Voter ID / Passport (Identity Proof)",
            "Bank Statement / Utility Bill (under 2 months old for Address Proof)",
            "NOC from Owner & Utility Bill of the Registered Office Premises"
          ],
          process: [
            { title: "DSC Procurement", desc: "Obtain secure Class 3 Digital Signature Certificates for all directors." },
            { title: "RUN Name Reservation", desc: "Reserve a unique, legally compliant corporate name on the MCA portal." },
            { title: "SPICe+ Incorporation Filing", desc: "Prepare and submit MoA, AoA, PAN, and TAN applications to ROC." },
            { title: "Certificate Issuance", desc: "Receive the official Certificate of Incorporation (COI) along with PAN and TAN." }
          ],
          faqs: [
            { q: "What is the minimum capital required?", a: "There is no statutory minimum paid-up capital requirement to register a Private Limited Company." },
            { q: "Can a foreigner be a director?", a: "Yes, a foreign national can become a director, provided there is at least one Indian resident director." },
            { q: "How long is the registration valid?", a: "Once incorporated, a company has a perpetual existence until it is formally closed or wound up." }
          ]
        },
        { title: "Private Limited Company", desc: "Standard corporate incorporation including DIN, DSC, and ROC filing.", time: "10-15 days", icon: "fa-building", isLarge: false },
        { title: "LLP Registration", desc: "Establish a Limited Liability Partnership with flexible partner governance.", time: "10-12 days", icon: "fa-handshake", isLarge: false },
        { title: "OPC Registration", desc: "One Person Company model tailored for solo founders looking for corporate safety.", time: "12-15 days", icon: "fa-user", isLarge: false },
        { title: "Partnership Firm", desc: "Traditional partnership deed drafting and registration with Registrar of Firms.", time: "5-7 days", icon: "fa-users-rectangle", isLarge: false },
        { title: "Startup India Registration", desc: "Obtain DPIIT recognition to claim tax holidays, funding access and compliance ease.", time: "15-20 days", icon: "fa-rocket", isLarge: false },
        { title: "Nidhi Company", desc: "Start a mutual benefit financial institution under MCA guidelines.", time: "25-30 days", icon: "fa-piggy-bank", isLarge: false },
        { title: "Section 8 Company", desc: "Incorporate a non-profit organization or charitable NGO with ROC clearance.", time: "15-20 days", icon: "fa-hands-holding", isLarge: false }
    ],
    ip: [
        { 
          title: "Trademark Registration", 
          desc: "Secure brand name, logo, or slogan registration under the Indian Trademarks Act.", 
          time: "12-18 months", 
          icon: "fa-trademark", 
          isLarge: true,
          eligibility: [
            "Any individual, proprietorship firm, LLP, or company claiming trademark ownership",
            "Usage can be proposed or based on user date supported by an affidavit"
          ],
          documents: [
            "Logo image or brand name text copy",
            "Signed Authorization Form (TM-48) appointing our expert counsel",
            "Partnership Deed / Incorporation Certificate (if applying as an entity)",
            "User Affidavit (if trademark is already in use prior to application date)"
          ],
          process: [
            { title: "Trademark Search", desc: "Conduct a thorough class search to detect conflicting visual or text marks." },
            { title: "Filing TM-A Form", desc: "Submit the trademark application online to get instant filing number and 'TM' status." },
            { title: "Examination Report", desc: "The registrar reviews the mark and issues an Examination Report." },
            { title: "Journal Publication", desc: "Upon acceptance, the mark is advertised in the national Trademark Journal for 4 months." },
            { title: "Registration Certificate", desc: "If no opposition is filed, the Registrar issues the official Registration Certificate." }
          ],
          faqs: [
            { q: "What is a trademark class?", a: "Trademarks are classified into 45 distinct classes based on the nature of goods and services." },
            { q: "How long does a trademark last?", a: "Once registered, a trademark is valid for 10 years and can be renewed indefinitely." },
            { q: "What is trademark objection?", a: "It is an examination query raised by the TM office regarding similarity or absolute grounds." }
          ]
        },
        { title: "Trademark Objection", desc: "Draft and file legal responses to examination reports and objections.", time: "10-15 days", icon: "fa-gavel", isLarge: false },
        { title: "Trademark Renewal", desc: "File extensions before expiry to preserve trademark protection.", time: "5-7 days", icon: "fa-arrows-spin", isLarge: false },
        { title: "Copyright Registration", desc: "Establish ownership over literary, musical, dramatic, artistic, or software code works.", time: "6-8 months", icon: "fa-file-signature", isLarge: false },
        { title: "Patent Filing", desc: "Secure exclusive industrial rights for your novel inventions and processes.", time: "2-3 years", icon: "fa-lightbulb", isLarge: false },
        { title: "Design Registration", desc: "Protect unique shape, pattern, configuration, or ornamentation of manufactured products.", time: "6-9 months", icon: "fa-compass-drafting", isLarge: false }
    ],
    iso: [
        { 
          title: "ISO Certification", 
          desc: "Expert advisory and auditing for globally recognized ISO quality standard frameworks.", 
          time: "7-10 days", 
          icon: "fa-award", 
          isLarge: true,
          eligibility: [
            "Any operating business entity seeking quality management optimization",
            "Must have defined core operating workflows ready for process documentation"
          ],
          documents: [
            "GST Registration or Business License",
            "Corporate Scope Statement outlining core operating activity",
            "Signed Advisory Consent form authorizing audit coordination"
          ],
          process: [
            { title: "Gap Analysis", desc: "Review current workflow setups against specific ISO requirement guidelines." },
            { title: "Standard Documentation", desc: "Formulate policy drafts, SOP documents, and quality manuals." },
            { title: "Internal Audit Review", desc: "Conduct a trial internal audit run to evaluate operational readiness." },
            { title: "Certification Audit", desc: "Co-ordinate with registrar auditors to review policies and issue certificate." }
          ],
          faqs: [
            { q: "What is ISO 9001?", a: "It is the international standard outlining Quality Management Systems (QMS) requirements." },
            { q: "Is ISO mandatory?", a: "ISO is voluntary, but highly recommended for tenders, quality standards, and client trust." },
            { q: "How long is a certificate valid?", a: "ISO certificates are valid for 3 years, subject to annual surveillance audits." }
          ]
        },
        { title: "ISO 9001", desc: "Quality Management System (QMS) standard compliance for processes.", time: "7-10 days", icon: "fa-circle-check", isLarge: false },
        { title: "ISO 14001", desc: "Environmental Management System (EMS) operational standards.", time: "10-15 days", icon: "fa-leaf", isLarge: false },
        { title: "ISO 27001", desc: "Information Security Management System (ISMS) audit and compliance.", time: "15-20 days", icon: "fa-shield-halved", isLarge: false },
        { title: "ISO 45001", desc: "Occupational Health & Safety (OHS) workplace standards compliance.", time: "10-15 days", icon: "fa-hard-hat", isLarge: false },
        { title: "ISO 22000", desc: "Food Safety Management System (FSMS) operational framework standard.", time: "15-20 days", icon: "fa-utensils", isLarge: false },
        { title: "GMP Certification", desc: "Good Manufacturing Practices certification for pharmaceutical and food sectors.", time: "20-25 days", icon: "fa-industry", isLarge: false },
        { title: "HACCP Certification", desc: "Hazard Analysis Critical Control Point standard for biological/chemical safety.", time: "15-20 days", icon: "fa-microscope", isLarge: false }
    ],
    docs: [
        { title: "Legal Drafting", desc: "Custom drafting of lawsuits, appeals, replies and legal notices.", time: "3-5 days", icon: "fa-pen-nib", isLarge: true },
        { title: "Agreements", desc: "Partnership, vendor, service-level and employment contracts.", time: "2-4 days", icon: "fa-file-signature", isLarge: false },
        { title: "Affidavits", desc: "Formal written statements of fact certified by oath commissioners.", time: "1-2 days", icon: "fa-file-lines", isLarge: false },
        { title: "MOA & AOA", desc: "Drafting custom Charter Documents for corporate structures.", time: "3-5 days", icon: "fa-book-open", isLarge: false },
        { title: "Compliance Documentation", desc: "Drafting board resolutions, compliance templates and Registers.", time: "4-6 days", icon: "fa-clipboard-check", isLarge: false }
    ],
    licenses: [
        { 
          title: "GST Registration", 
          desc: "Obtain GST Identification Number (GSTIN) and coordinate initial GST filings.", 
          time: "3-5 days", 
          icon: "fa-receipt", 
          isLarge: true,
          eligibility: [
            "Businesses exceeding mandatory annual turnover thresholds (₹20L/₹40L for goods/services)",
            "Exporters, e-commerce sellers, and interstate traders (regardless of turnover)"
          ],
          documents: [
            "PAN Card of the Business Entity / Proprietor",
            "Aadhaar Card of the Proprietor / Authorized Signatory",
            "Proof of Business Place (Rent Agreement, Electricity Bill, NOC)",
            "Bank Statement / Cancelled Cheque showing corporate/personal details"
          ],
          process: [
            { title: "Application Preparation", desc: "Assemble registration data, class selection, and digital signature uploads." },
            { title: "Portal Submission", desc: "Submit application on the official GST Common Portal to generate ARN." },
            { title: "Verification Process", desc: "Department tax officer reviews application and documents for verification." },
            { title: "GSTIN Issuance", desc: "Tax department grants the official GSTIN and registration certificate." }
          ],
          faqs: [
            { q: "Is GST registration mandatory for exports?", a: "Yes, GST registration is compulsory for businesses selling outside India." },
            { q: "What is composition scheme?", a: "It is a simpler GST scheme for small taxpayers with lower tax rates and quarterly filings." },
            { q: "Can I cancel GST registration?", a: "Yes, you can apply for cancellation online if business operations cease or turnover drops." }
          ]
        },
        { 
          title: "FSSAI License", 
          desc: "Acquire mandatory food business operator registrations from central/state food safety departments.", 
          time: "7-10 days", 
          icon: "fa-bowl-food", 
          isLarge: false,
          eligibility: [
            "Any business handling manufacturing, processing, packaging, or sale of food products",
            "FSSAI Registration (under ₹12L turnover) or State/Central License (over ₹12L)"
          ],
          documents: [
            "Passport photograph and ID proof of Food Business Operator",
            "Address proof of operating commercial food unit",
            "Food safety management system plan (for State & Central licenses)",
            "Layout blueprint of the manufacturing/commercial unit"
          ],
          process: [
            { title: "Eligibility Assessment", desc: "Identify if the business requires Basic Registration, State, or Central license." },
            { title: "FOSCOS Submission", desc: "Upload safety plans, layout maps, and certificates onto FOSCOS portal." },
            { title: "Safety Inspection", desc: "If mandated, a safety inspector reviews premises for compliance." },
            { title: "Certificate Grant", desc: "FSSAI issues the 14-digit registration or licensing number." }
          ],
          faqs: [
            { q: "Who needs FSSAI license?", a: "Every operator handling food, from street vendors to large factories and cloud kitchens." },
            { q: "How long is it valid?", a: "Valid from 1 to 5 years, and renewal application must be filed 30 days prior to expiry." }
          ]
        },
        { 
          title: "MSME Registration", 
          desc: "Secure Udyam Registration to gain state incentives, priority sector bank lending, and payment protection.", 
          time: "2-3 days", 
          icon: "fa-building-shield", 
          isLarge: false,
          eligibility: [
            "Micro, Small, and Medium Enterprises based on investment in plant/machinery and turnover",
            "Covers both manufacturing and service sector operations"
          ],
          documents: [
            "Aadhaar Card of the Proprietor / Partner / Director",
            "PAN Card of the Business Entity",
            "Bank details (Account number & IFSC code)",
            "GSTIN of the operating entity (if applicable)"
          ],
          process: [
            { title: "Data Alignment", desc: "Coordinate business categorization (Micro/Small/Medium) based on financial metrics." },
            { title: "Udyam Portal Submission", desc: "File declaration regarding investments, assets, and payroll on the ministry portal." },
            { title: "System Validation", desc: "The registration system validates PAN and GST information directly." },
            { title: "Certificate Generation", desc: "The government portal generates the official Udyam Registration Certificate." }
          ],
          faqs: [
            { q: "What is Udyam registration?", a: "It is the official national registration portal for MSMEs in India." },
            { q: "Are there tax benefits?", a: "Yes, MSMEs enjoy credit guarantees, stamp duty exemptions, and subsidy claims." }
          ]
        },
        { title: "IEC Registration", desc: "Obtain Import Export Code from DGFT for global business transactions.", time: "3-5 days", icon: "fa-globe", isLarge: false },
        { title: "Trade License", desc: "Obtain municipal corporation clearance to operate commercial trades locally.", time: "10-15 days", icon: "fa-shop", isLarge: false },
        { title: "Shop & Establishment License", desc: "Establish regional labor department registration for retail and commercial premises.", time: "3-5 days", icon: "fa-address-card", isLarge: false }
    ],
    audit: [
        { 
          title: "Audit Services", 
          desc: "Expert independent audits evaluating internal controls, accounts compliance, and risk setups.", 
          time: "Varies", 
          icon: "fa-scale-balanced", 
          isLarge: true,
          eligibility: [
            "Corporate entities requiring mandatory or voluntary audit checks",
            "Establishments preparing for annual filing closures"
          ],
          documents: [
            "Balance sheets and trial balances under evaluation",
            "Bank statements, vouchers, purchase ledgers",
            "Previous internal audit reports or compliance logs"
          ],
          process: [
            { title: "Planning & Scope", desc: "Define audit areas, sample checks, timelines, and audit resources." },
            { title: "Fieldwork Auditing", desc: "Examine vouchers, bills, entries, bank statements and compliance approvals." },
            { title: "Draft Report", desc: "Formulate audit notes and findings for management feedback." },
            { title: "Final Audit Signoff", desc: "Appoint CA team to issue final signed Audit Report with notes." }
          ],
          faqs: [
            { q: "What is internal audit?", a: "It is an advisory service checking system safety, efficiency, and compliance controls." },
            { q: "What is tax audit limit?", a: "Generally mandated if business turnover exceeds ₹10 Crore in a fiscal year." }
          ]
        },
        { title: "Internal Audit", desc: "Examine internal accounting workflows, corporate guidelines and asset tracking.", time: "Varies", icon: "fa-clipboard-list", isLarge: false },
        { title: "Compliance Audit", desc: "Check business operations against state, federal, environmental and labor laws.", time: "7-10 days", icon: "fa-file-shield", isLarge: false },
        { title: "ISO Audit", desc: "Evaluate operational setups against ISO standards ahead of registrar checks.", time: "5-7 days", icon: "fa-award", isLarge: false },
        { title: "Risk Assessment", desc: "Identify operational hazards, compliance liabilities and prepare mitigation steps.", time: "10-12 days", icon: "fa-triangle-exclamation", isLarge: false },
        { title: "Inspection Support", desc: "Provide liaison experts to support during government department audit inspections.", time: "On-Demand", icon: "fa-user-tie", isLarge: false }
    ],
    training: [
        { 
          title: "Training Services", 
          desc: "Corporate compliance training, ISO awareness training, and professional development programs.", 
          time: "Varies", 
          icon: "fa-chalkboard-user", 
          isLarge: true,
          eligibility: [
            "Corporate employees, executives, and process managers",
            "Manufacturers aiming for team certification readiness"
          ],
          documents: [
            "Corporate profile and current quality metrics",
            "List of designated trainees and process owners"
          ],
          process: [
            { title: "Training Need Analysis", desc: "Map team skills gap against standards like ISO QMS, OHS, or ISMS." },
            { title: "Custom Curriculum", desc: "Prepare professional curriculum modules, slides, templates, and logs." },
            { title: "Workshop Sessions", desc: "Conduct online or onsite interactive trainer training modules." },
            { title: "Trainee Assessment", desc: "Run practical tests and issue training compliance certificates." }
          ],
          faqs: [
            { q: "Do you issue training certificates?", a: "Yes, individual certificates are issued to all qualifying team members." },
            { q: "Can workshops be customized?", a: "Yes, training material is adapted to suit your specific company operations." }
          ]
        },
        { title: "ISO Awareness Training", desc: "Basics of Quality Management and process mapping principles.", time: "2-3 days", icon: "fa-people-group", isLarge: false },
        { title: "Internal Auditor Training", desc: "Certification course training employees to audit internal standards.", time: "3-5 days", icon: "fa-graduation-cap", isLarge: false },
        { title: "Compliance Training", desc: "Educating management on labor regulations, corporate laws and filing rules.", time: "2-4 days", icon: "fa-book-bookmark", isLarge: false },
        { title: "Corporate Workshops", desc: "Tailored workshops for legal drafting, tax filings, and quality controls.", time: "Varies", icon: "fa-person-chalkboard", isLarge: false }
    ],
    digital: [
        { 
          title: "Website Development", 
          desc: "Design and code corporate portal setups featuring high security, clean responsive grid layouts.", 
          time: "15-20 days", 
          icon: "fa-laptop", 
          isLarge: true,
          eligibility: [
            "Registered corporate enterprises, consulting firms, startups or organizations",
            "Established corporate identity, logo, and copy outline ready"
          ],
          documents: [
            "Corporate logo and branding color manual",
            "Domain access and web server login details",
            "Draft website layout copy and sitemap checklist"
          ],
          process: [
            { title: "UI Mockups Design", desc: "Design elegant glassmorphism and grid mockup layouts for corporate review." },
            { title: "Coding & Setup", desc: "Build layouts in lightweight responsive templates using modern clean styling." },
            { title: "Content Placement", desc: "Format executive copies, service grids, contact forms and assets." },
            { title: "Launch & SEO Audit", desc: "Deploy pages, check loading metrics, verify responsiveness, and enable SEO tags." }
          ],
          faqs: [
            { q: "Is maintenance included?", a: "We provide 3 months of complimentary technical support post-deployment." },
            { q: "Are pages mobile responsive?", a: "Yes, all layouts adapt perfectly across all screen sizes (tablets, mobiles)." }
          ]
        },
        { 
          title: "Mobile App Development", 
          desc: "Secure mobile applications for Android and iOS systems built using React Native or Flutter.", 
          time: "30-45 days", 
          icon: "fa-mobile-screen-button", 
          isLarge: false,
          eligibility: [
            "Enterprises launching digital user dashboards or internal workflow tools",
            "Detailed app feature flow description ready for coding review"
          ],
          documents: [
            "Google Play & Apple Developer accounts detail",
            "Figma design layouts / functional workflow requirements checklist",
            "API keys and server database infrastructure credentials"
          ],
          process: [
            { title: "Wireframe Mapping", desc: "Map out screens, dashboard panels, user accounts flows, and databases." },
            { title: "App Coding", desc: "Write responsive logic and implement APIs, forms, and secure login modules." },
            { title: "System Testing", desc: "Execute multi-device testing to eliminate crashes, lag, and UI layout faults." },
            { title: "Store Publication", desc: "Manage store approvals and submit apps on App Store and Play Store." }
          ],
          faqs: [
            { q: "Which platforms do you cover?", a: "We build hybrid apps running smoothly on both iOS and Android systems." },
            { q: "Can you link apps to websites?", a: "Yes, we integrate shared databases and APIs for real-time data sync." }
          ]
        },
        { 
          title: "Digital Marketing", 
          desc: "Maximize lead conversions and build premium corporate visibility online.", 
          time: "Monthly Retainer", 
          icon: "fa-chart-simple", 
          isLarge: false,
          eligibility: [
            "Established firms seeking target leads and corporate branding campaigns",
            "Defined marketing goals and media budget ready"
          ],
          documents: [
            "Access to business social channels (LinkedIn, Meta, Google)",
            "Briefing regarding target audience, services focus, and competitors list"
          ],
          process: [
            { title: "Strategy Phase", desc: "Perform market studies, review competitor search tags, and map leads funnel." },
            { title: "Content Drafts", desc: "Create classy visual posts, informative corporate articles, and video copies." },
            { title: "Campaign Launch", desc: "Run high-yielding Google Search, LinkedIn B2B, and Meta campaigns." },
            { title: "Reports Review", desc: "Deliver transparent monthly analytics review mapping leads, traffic, and spend." }
          ],
          faqs: [
            { q: "What channels do you focus on?", a: "We prioritize Google Ads (for immediate search intent) and LinkedIn Ads (for B2B)." },
            { q: "How long before we see leads?", a: "Paid search campaigns start showing lead results within 48 to 72 hours." }
          ]
        },
        { title: "E-Commerce Development", desc: "Create e-stores with secure payments, inventory tracking and invoice sync.", time: "20-25 days", icon: "fa-cart-shopping", isLarge: false },
        { title: "SEO Services", desc: "Rank organic keywords on Google search to drive organic leads.", time: "Ongoing", icon: "fa-magnifying-glass-chart", isLarge: false },
        { title: "Social Media Marketing", desc: "Professional corporate channel setups and high-value LinkedIn/Meta branding.", time: "Ongoing", icon: "fa-share-nodes", isLarge: false },
        { title: "Branding & Design", desc: "Create premium logos, corporate brochures, stationery, and branding manuals.", time: "5-7 days", icon: "fa-palette", isLarge: false }
    ]
};

// Expose simple slugify function
function slugify(text) {
    return text.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}
