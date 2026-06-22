// data.js - Shared compliance databases for MSR Assessment Pvt Ltd
// Structured to align with Google Search Essentials and E-E-A-T Guidelines

const categories = [
  { id: 'iso', title: "ISO Certification", desc: "Accredited quality, security, and operational standards frameworks.", icon: "fa-certificate" },
  { id: 'audit', title: "Audit & Inspection", desc: "Independent internal compliance audits, process reviews, and inspections.", icon: "fa-shield-halved" },
  { id: 'compliance', title: "Compliance Consulting", desc: "Enterprise risk mitigation, regulatory liaisons, and corporate governance.", icon: "fa-scale-balanced" },
  { id: 'inc', title: "Company Registration", desc: "Fast-track company incorporation and business setup services in India.", icon: "fa-building" },
  { id: 'docs', title: "Documentation Services", desc: "Professional drafting of legal agreements, contracts, and company deeds.", icon: "fa-file-signature" },
  { id: 'training', title: "Training Services", desc: "ISO compliance workshops, awareness sessions, and auditor development.", icon: "fa-chalkboard-user" },
  { id: 'digital', title: "Digital Services", desc: "Sleek website development, custom mobile applications, and growth campaigns.", icon: "fa-laptop-code" },
  { id: 'ip', title: "IPR Services", desc: "Trademark, copyright, and patent filings to safeguard your intellectual property.", icon: "fa-trademark" },
  { id: 'licenses', title: "Licenses & Approvals", desc: "Obtaining mandatory GST registrations, FSSAI licenses, and MSME certificates.", icon: "fa-file-invoice-dollar" }
];

const subData = {
  iso: [
    {
      title: "ISO Certification",
      desc: "Get globally recognized ISO accreditations (ISO 9001, 14001, 27001, 45001, 22000, 13485, 50001) with our IRCA certified lead auditors.",
      time: "7-15 days",
      icon: "fa-certificate",
      isLarge: true,
      eligibility: ["Proprietorships & Partnerships", "Private Limited & LLP Companies", "Manufacturing & Service Units", "NGOs & Trusts"],
      documents: ["Pan Card & Aadhaar of Directors", "Certificate of Incorporation", "Utility Bill / Rent Agreement", "Scope of Business Activities"],
      process: [
        { title: "Gap Analysis", desc: "Review of existing manuals and operational workflows." },
        { title: "Documentation & Training", desc: "Drafting policies and training the team on standard requirements." },
        { title: "Internal Audit", desc: "Mock audit to ensure system compliance before registrar visit." },
        { title: "Registrar Audit & Listing", desc: "Accredited assessment and publication on IAF directory." }
      ]
    },
    {
      title: "ISO 9001 Certification",
      desc: "Quality Management System (QMS) accreditation to optimize workflows, improve quality control, and scale systems.",
      time: "7-10 days",
      icon: "fa-award",
      isLarge: true,
      eligibility: ["Any business size", "Manufacturing plants", "Software developers", "Consultancies"],
      documents: ["Business Registration Proof", "Process Flow Chart", "Organization Chart", "Customer Feedback Form sample"],
      process: [
        { title: "SOP Drafting", desc: "Establishing clear standard operating procedures." },
        { title: "QMS Implementation", desc: "Training staff to follow documented procedures." },
        { title: "External Registrar Audit", desc: "Formal Stage 1 and Stage 2 auditing." }
      ]
    },
    { title: "ISO 14001 Certification", desc: "Environmental Management System (EMS) framework to control waste, emissions, and minimize footprint.", time: "10-12 days", icon: "fa-leaf", isLarge: false },
    { title: "ISO 45001 Certification", desc: "Occupational Health & Safety (OHS) system to safeguard labor and workplace operations.", time: "10-12 days", icon: "fa-hard-hat", isLarge: false },
    { title: "ISO 27001 Certification", desc: "Information Security Management System (ISMS) framework to secure data and mitigate risks.", time: "15-20 days", icon: "fa-shield-halved", isLarge: true },
    { title: "ISO 22000 Certification", desc: "Food Safety Management System (FSMS) framework for compliance in the food supply chain.", time: "12-15 days", icon: "fa-utensils", isLarge: false },
    { title: "ISO 13485 Certification", desc: "Quality standards for medical device design, manufacturing, and diagnostic setups.", time: "15-20 days", icon: "fa-heartbeat", isLarge: false },
    { title: "ISO 50001 Certification", desc: "Energy Management System (EnMS) framework to improve efficiency and reduce carbon footprint.", time: "15-18 days", icon: "fa-bolt", isLarge: false },
    { title: "GMP Certification", desc: "Good Manufacturing Practices to ensure consistency in production and hygiene standards.", time: "10-15 days", icon: "fa-prescription-bottle-medical", isLarge: false },
    { title: "HACCP Certification", desc: "Hazard Analysis Critical Control Point to prevent chemical, physical and biological hazards in food.", time: "10-15 days", icon: "fa-shield-virus", isLarge: false }
  ],
  audit: [
    {
      title: "Audit Services",
      desc: "Professional corporate auditing services including internal audits, compliance audits, and risk assessment checks.",
      time: "Varies",
      icon: "fa-file-shield",
      isLarge: true,
      eligibility: ["Public & Private Companies", "Partnership Firms", "Government Contractors", "NGOs"],
      documents: ["Ledger Statements", "Compliance Registers", "Director Declarations", "Prior Audit Reports"],
      process: [
        { title: "Planning & Scoping", desc: "Determining audit boundaries and key areas." },
        { title: "Fieldwork", desc: "Verifying logs, accounts, and testing system controls." },
        { title: "Reporting", desc: "Drafting the audit findings report and action plan." }
      ]
    },
    { title: "Internal Audit Services", desc: "Independent evaluation of internal accounting workflows, corporate rules, and asset tracking.", time: "Ongoing", icon: "fa-clipboard-list", isLarge: true },
    { title: "Compliance Auditing", desc: "Regular auditing of operating setups against state, labor, environmental, and corporate laws.", time: "Varies", icon: "fa-file-shield", isLarge: false },
    { title: "Risk Assessment & Inspection", desc: "Systematic auditing to identify physical, financial, and digital liabilities and set safety gates.", time: "7-10 days", icon: "fa-triangle-exclamation", isLarge: false },
    { title: "ISO Audit Support", desc: "Preparation and on-site support for registrar assessments and surveillance audits.", time: "3-5 days", icon: "fa-user-check", isLarge: false },
    { title: "Inspection Support", desc: "Liaison support and dossier preparation for government and regulatory body inspections.", time: "Ongoing", icon: "fa-building-shield", isLarge: false }
  ],
  compliance: [
    { title: "ISO 31000 Consulting", desc: "Establish enterprise-wide risk management guidelines to handle operational uncertainties.", time: "15-20 days", icon: "fa-gavel", isLarge: true },
    { title: "Compliance Consulting", desc: "Liaison support, statutory compliance management, and corporate filings with MCA and other regulatory bodies.", time: "Ongoing", icon: "fa-balance-scale", isLarge: false },
    { title: "Corporate Governance Advisory", desc: "Designing ethical frameworks, board committees, and code of conduct matrices for enterprise operations.", time: "Varies", icon: "fa-users-gear", isLarge: false }
  ],
  inc: [
    {
      title: "Company Registration",
      desc: "Complete business incorporation services managed by experienced CAs and Corporate Secretarial professionals.",
      time: "7-10 days",
      icon: "fa-building",
      isLarge: true,
      eligibility: ["Minimum 2 Directors for Pvt Ltd", "Minimum 2 Partners for LLP", "Indian Citizen & Resident"],
      documents: ["Pan Card & Aadhaar", "Proof of Bank Account", "Rent Agreement of Office", "NOC from Property Owner"],
      process: [
        { title: "Name Reservation", desc: "Filing RUN application on MCA portal." },
        { title: "Digital Signatures", desc: "Procuring Class 3 DSCs for proposed directors." },
        { title: "SpicE+ Submission", desc: "Filing core incorporation form with MOA & AOA documents." },
        { title: "Certificate Release", desc: "Receiving COI, PAN, and TAN codes." }
      ]
    },
    { title: "Private Limited Company", desc: "Most popular legal structure for high-growth startups seeking venture funding.", time: "7-10 days", icon: "fa-city", isLarge: true },
    { title: "LLP Registration", desc: "Limited Liability Partnership combining company structure with partnership flexibility.", time: "8-12 days", icon: "fa-handshake", isLarge: false },
    { title: "OPC Registration", desc: "One Person Company structure for solo founders with corporate liability benefits.", time: "7-10 days", icon: "fa-user-tie", isLarge: false },
    { title: "Partnership Firm", desc: "Traditional business registration under Indian Partnership Act 1932.", time: "5-7 days", icon: "fa-user-group", isLarge: false },
    { title: "Startup India Registration", desc: "DPIIT recognition to claim tax holidays, patent subsidies, and relaxed tender rules.", time: "10-15 days", icon: "fa-rocket", isLarge: false },
    { title: "Nidhi Company", desc: "Mutual benefit financial company registration under Section 406 of Companies Act 2013.", time: "15-20 days", icon: "fa-coins", isLarge: false },
    { title: "Section 8 Company", desc: "Non-profit organization registration for charitable, educational, or artistic pursuits.", time: "10-15 days", icon: "fa-ribbon", isLarge: false }
  ],
  docs: [
    { title: "Legal Drafting", desc: "Professional drafting of notices, plaints, written statements, and commercial petitions.", time: "2-4 days", icon: "fa-scroll", isLarge: false },
    { title: "Agreements & Contracts", desc: "Custom drafting of NDAs, Vendor Agreements, SLA Contracts, and employment agreements.", time: "3-5 days", icon: "fa-file-signature", isLarge: false },
    { title: "Affidavits Preparation", desc: "Drafting and notary service for statutory declarations and formal affidavits.", time: "1-2 days", icon: "fa-stamp", isLarge: false },
    { title: "MOA & AOA Drafting", desc: "Structuring Memorandum and Articles of Association to define company rules and activities.", time: "3-5 days", icon: "fa-book", isLarge: false },
    { title: "Compliance Documentation", desc: "Structuring compliance calendars, registers, board resolutions, and annual reports.", time: "5-7 days", icon: "fa-folder-open", isLarge: false }
  ],
  training: [
    {
      title: "Training Services",
      desc: "Accredited workshops and corporate training programs for ISO awareness, safety protocols, and internal auditor skills.",
      time: "Flexible",
      icon: "fa-chalkboard-user",
      isLarge: true,
      eligibility: ["Corporate employees", "Compliance managers", "QA teams", "Students"],
      documents: ["Attendee List", "Prior Certifications (if any)", "Corporate Details"],
      process: [
        { title: "Curriculum Design", desc: "Tailoring the workshop topics to business operations." },
        { title: "Session Delivery", desc: "Interactive training session with lead assessors." },
        { title: "Assessment & Certificates", desc: "Practical evaluation and release of training credentials." }
      ]
    },
    { title: "ISO Awareness Training", desc: "Introductory workshops to align teams with high-level structure and standard policies.", time: "1-2 days", icon: "fa-lightbulb", isLarge: false },
    { title: "Internal Auditor Training", desc: "Developing in-house competency to conduct regular internal audits (Clause 9.2).", time: "3 days", icon: "fa-user-pen", isLarge: false },
    { title: "Compliance Training", desc: "Educating staff on anti-bribery, environmental regulations, and local labor safety guidelines.", time: "Varies", icon: "fa-scale-balanced", isLarge: false },
    { title: "Corporate Workshops", desc: "Custom strategic training modules for leadership teams and executive managers.", time: "1-2 days", icon: "fa-chalkboard", isLarge: false }
  ],
  digital: [
    {
      title: "Website Development",
      desc: "Premium, custom web design and front-end development tailored for high-end conversion rates and fast page loading.",
      time: "10-15 days",
      icon: "fa-laptop-code",
      isLarge: true,
      eligibility: ["All businesses", "Startups", "E-commerce brands"],
      documents: ["Brand Identity Logo", "Domain Details", "Copywriting Content"],
      process: [
        { title: "UI/UX Mockup", desc: "Creating sleek, conversion-driven visual blueprints." },
        { title: "Frontend Coding", desc: "Developing optimized responsive interfaces." },
        { title: "Launch & SEO Check", desc: "Deploying and configuring search descriptors." }
      ]
    },
    {
      title: "Mobile App Development",
      desc: "Premium iOS and Android application engineering utilizing modern frameworks to ensure buttery smooth performance.",
      time: "20-30 days",
      icon: "fa-mobile-screen",
      isLarge: true,
      eligibility: ["Enterprises", "Startups", "SaaS platforms"],
      documents: ["App Concept Scope", "API Specifications", "Assets & Designs"],
      process: [
        { title: "Architecture Design", desc: "Mapping API endpoints and database schemas." },
        { title: "Cross-Platform Coding", desc: "Developing native-quality apps." },
        { title: "App Store Publishing", desc: "Filing and launching on Apple & Google directories." }
      ]
    },
    {
      title: "Digital Marketing",
      desc: "Grow your online presence with targeted SEO campaigns, paid advertisements, and strategic social media growth.",
      time: "Monthly",
      icon: "fa-bullhorn",
      isLarge: true,
      eligibility: ["E-commerce entities", "B2B consultancies", "Corporate brands"],
      documents: ["Ad Accounts Access", "Target Audience Profile", "Competitor List"],
      process: [
        { title: "Audit & Planning", desc: "Running baseline metrics and keyword searches." },
        { title: "Campaign Execution", desc: "Deploying copy assets and bidding strategies." },
        { title: "Performance Reports", desc: "Weekly tracking and budget adjustments." }
      ]
    },
    { title: "E-Commerce Development", desc: "Building high-performance online storefronts with payment gateway integrations.", time: "12-18 days", icon: "fa-cart-shopping", isLarge: false },
    {
      title: "SEO & SEM Marketing Services for Traffic and Lead Generation",
      desc: "Grow your business with expert Search engine marketing services that increase online visibility, attract qualified traffic, and generate more leads.",
      time: "Ongoing",
      icon: "fa-magnifying-glass-chart",
      isLarge: true,
      eligibility: [
        "Manufacturing & Production",
        "Startups & New Ventures",
        "Healthcare & Pharma",
        "E-commerce & D2C Brands",
        "Export & Import Businesses",
        "IT & Software Services",
        "Professional Services",
        "Education & Training",
        "Hospitality & Tourism"
      ],
      documents: [
        "Site Audit & Competitor Analysis",
        "Keyword Research & Strategy",
        "On-Page SEO & Technical SEO",
        "Core Web Vitals",
        "Local SEO & GMB Optimization",
        "Content Writing",
        "White-Hat Link Building",

      ],
      process: [
        { title: "Step 1: Website Audit", desc: "Comprehensive analysis of your website's current performance." },
        { title: "Step 2: Keyword Research", desc: "Identify high-value keywords with strong search intent." },
        { title: "Step 3: Strategy Development", desc: "Create a customized SEO roadmap based on business goals." },
        { title: "Step 4: Optimization", desc: "Implement on-page, technical, and content improvements." },
        { title: "Step 5: Link Building", desc: "Build quality backlinks and strengthen domain authority." },
        { title: "Step 6: Reporting & Monitoring", desc: "Track rankings, traffic, leads, and conversions with transparent monthly reports." }
      ],
      faqs: [
        { q: "Why Choose Our SEO Services?", a: "We improve Google rankings, increase website traffic, generate quality leads, boost brand visibility, and provide long-term marketing results with higher ROI than paid advertising." },
        { q: "Why MSR Assessment Pvt. Ltd.?", a: "We have experienced SEO professionals, use data-driven and white-hat strategies, provide transparent reporting, and offer dedicated support. Our mission is to help your business achieve higher visibility and measurable growth." }
      ]
    },
    { title: "Social Media Marketing", desc: "Content calendar drafting, asset design, and brand building across platforms.", time: "Monthly", icon: "fa-share-nodes", isLarge: false },
    { title: "Branding & Design", desc: "Logo wordmarks, corporate guidelines, pitch decks, and commercial designs.", time: "5-7 days", icon: "fa-bezier-curve", isLarge: false }
  ],
  ip: [
    {
      title: "Trademark Registration",
      desc: "Register your corporate name, logo, or slogan with our corporate legal desk to secure exclusive intellectual rights.",
      time: "2-3 days",
      icon: "fa-trademark",
      isLarge: true,
      eligibility: ["Proprietorships & Startups", "Corporate Companies", "NGOs & Trusts", "Foreign Entities"],
      documents: ["Brand Name & Logo File", "Authorisation Document signed", "Incorporation Certificate", "MSME Registration (if discount requested)"],
      process: [
        { title: "Trademark Search", desc: "Running deep database searches to ensure availability." },
        { title: "Application Drafting", desc: "Drafting application files under correct class listings." },
        { title: "Filing & TM Mark", desc: "Filing application with IP office to begin TM use." }
      ]
    },
    { title: "Trademark Objection", desc: "Filing official replies to examination reports issued by IP Office inspectors.", time: "5-7 days", icon: "fa-file-shield", isLarge: false },
    { title: "Trademark Renewal", desc: "Filing maintenance documents to renew trademark rights every 10 years.", time: "2-3 days", icon: "fa-rotate", isLarge: false },
    { title: "Copyright Registration", desc: "Securing statutory rights for literary, dramatic, musical, artistic, or software works.", time: "10-15 days", icon: "fa-copyright", isLarge: false },
    { title: "Patent Filing", desc: "Provisional or complete patent specifications filing with IP office.", time: "Varies", icon: "fa-lightbulb", isLarge: false },
    { title: "Design Registration", desc: "Securing industrial design rights for unique product aesthetics and shapes.", time: "7-10 days", icon: "fa-compass-drafting", isLarge: false }
  ],
  licenses: [
    {
      title: "GST Registration",
      desc: "Quick, hassle-free Goods and Services Tax (GST) registration managed by our Chartered Accountants.",
      time: "3-5 days",
      icon: "fa-file-invoice-dollar",
      isLarge: true,
      eligibility: ["Turnover > Limit (₹20L/₹40L)", "Interstate sellers", "E-commerce sellers"],
      documents: ["Pan Card of Entity", "Aadhaar Card of promoter", "Rent Agreement / Utility Bill", "Promoter Photo"],
      process: [
        { title: "Documents Review", desc: "Checking accuracy of address proofs." },
        { title: "Form GST REG-01", desc: "Submitting application details on GST portal." },
        { title: "Clarifications (if any)", desc: "Replying to officer query codes." },
        { title: "GSTIN Release", desc: "Retrieving official registration certificate." }
      ]
    },
    {
      title: "FSSAI License",
      desc: "Obtain mandatory food registration, state license, or central license from FSSAI based on business capacity.",
      time: "5-7 days",
      icon: "fa-utensils",
      isLarge: true,
      eligibility: ["Restaurants & Cafes", "Food manufacturers", "Packers & Distributors", "Cloud kitchens"],
      documents: ["Promoter ID Proof", "Premises Rent Agreement", "List of Food Categories", "Water Potability Report"],
      process: [
        { title: "Category Check", desc: "Determining whether Registration, State, or Central is needed." },
        { title: "Application Filing", desc: "Filing Form A or Form B on FoSCoS portal." },
        { title: "Officer Inspection Support", desc: "Coordination during physical facility reviews." }
      ]
    },
    {
      title: "MSME Registration",
      desc: "Secure Government Udyam registration to avail corporate credit benefits, subsidies, and tender waivers.",
      time: "1-2 days",
      icon: "fa-briefcase",
      isLarge: true,
      eligibility: ["Proprietors", "Partnerships", "LLP & Private Companies"],
      documents: ["Aadhaar linked with Phone", "PAN Card of Business", "Bank details", "Employee count"],
      process: [
        { title: "Portal Entry", desc: "Verifying Aadhaar details on Udyam site." },
        { title: "Details Log", desc: "Entering investment and turnover metrics." },
        { title: "Certificate Release", desc: "Instant retrieval of MSME certificate." }
      ]
    },
    { title: "IEC Registration", desc: "Import Export Code registration from DGFT to trade goods globally.", time: "2-3 days", icon: "fa-ship", isLarge: false },
    { title: "Trade License", desc: "Municipal authorization to operate commercial premises in local zones.", time: "5-7 days", icon: "fa-map-pin", isLarge: false },
    { title: "Shop & Establishment License", desc: "Mandatory labor registration for commercial establishments and shops.", time: "2-3 days", icon: "fa-shop", isLarge: false }
  ]
};

// Central Compliance Articles Database (E-E-A-T Optimized)
const articles = [
  {
    id: "gstr-9-annual-return-key-changes-and-compliances-for-fy-2025-26",
    title: "GSTR-9 Annual Return: Key Changes and Compliances for FY 2025-26",
    category: "gst",
    tagClass: "it-gst",
    tagText: "GST Compliance",
    icon: "fa-file-invoice-dollar",
    image: "assets/premium_corporate_photography_of_four_professional_business_consultants_.jpg",
    date: "June 2026",
    readTime: "5 min read",
    excerpt: "We break down the new amendments to the GSTR-9 format, clarifying optional tables, matching criteria, and penalty limits for corporate filers.",
    content: `
      <p>Filing the GSTR-9 Annual Return for the Financial Year 2025-26 comes with updated requirements and tighter audit reconciliations. The Central Board of Indirect Taxes and Customs (CBIC) has streamlined various tables to ensure higher data accuracy while easing compliance for smaller taxpayers.</p>
      <h3>Key Changes in GSTR-9 for FY 2025-26</h3>
      <p>Several modifications have been introduced to Table 4 (details of outward supplies), Table 5 (exempted and non-GST outward supplies), and Table 6 (details of ITC availed). Taxpayers must pay close attention to the following aspects:</p>
      <ul>
        <li><strong>Mandatory HSN Code Reporting:</strong> Reporting of HSN codes at the 6-digit level is now mandatory for businesses with an annual turnover exceeding ₹5 Crore. For businesses below this threshold, 4-digit HSN reporting is optional but recommended.</li>
        <li><strong>Reconciliation with GSTR-2B:</strong> Input Tax Credit (ITC) claimed in GSTR-3B must closely match with GSTR-2B. Discrepancies exceeding 5% are flagged automatically, requiring explanation in Table 8.</li>
        <li><strong>Table 6 Split:</strong> The breakdown of ITC into inputs, capital goods, and input services remains mandatory for input services, though a combined reporting of inputs and capital goods might still be accepted in some state jurisdictions.</li>
      </ul>
      <h3>Table-by-Table Breakdown & Best Practices</h3>
      <p>To ensure a hassle-free filing process and minimize errors, follow these table-specific strategies:</p>
      <h4>1. Outward Supplies (Table 4 & 5)</h4>
      <p>Ensure that all B2B, B2C, export, and zero-rated supplies match the cumulative totals of monthly GSTR-1 and GSTR-3B returns. Any amendments made in subsequent months of FY 2025-26 must be correctly reported in Table 10 and 11.</p>
      <h4>2. Input Tax Credit (Table 6, 7 & 8)</h4>
      <p>Reconcile your books of accounts with GSTR-2B. Reversal of ITC under Rule 37, 42, and 43 must be accurately declared in Table 7 to avoid interest liabilities. Any blocked credit under Section 17(5) should be tracked separately.</p>
      <h4>3. Penalty and Late Fees</h4>
      <p>The late fee for delayed filing of GSTR-9 remains ₹200 per day (₹100 under CGST and ₹100 under SGST), capped at 0.5% of the turnover in the state or union territory. Avoid last-minute portal congestion by preparing reconciliations by October 2026.</p>
      <h3>Conclusion</h3>
      <p>GSTR-9 is not merely a compilation return; it represents a final opportunity for businesses to correct compliance gaps before department audits. Consulting a qualified Chartered Accountant to run pre-filing reconciliations is highly recommended to protect your business from unnecessary demand notices.</p>
    `
  },
  {
    id: "mca-v3-portal-upgrade-troubleshooting-common-filing-errors",
    title: "MCA V3 Portal Upgrade: Troubleshooting Common Filing Errors",
    category: "mca",
    tagClass: "it-mca",
    tagText: "MCA Compliance",
    icon: "fa-building",
    image: "assets/elegant_executive_board_room_with_glass_doors_and_professional_seating.png",
    date: "May 2026",
    readTime: "4 min read",
    excerpt: "MCA has migrated core files to the V3 platform. Here are the step-by-step guidelines to complete digital signature linking and name reservations.",
    content: `
      <p>The Ministry of Corporate Affairs (MCA) has migrated core business filings to the V3 platform to streamline compliance, automate approvals, and enhance security. However, corporate secretarial teams and directors frequently encounter transient errors during initial account linking and Digital Signature Certificate (DSC) registration.</p>
      <h3>Common Issues & System Fixes</h3>
      <p>If you are experiencing verification failures or signature upload loops, review these standard troubleshooting steps:</p>
      <h4>1. Registering/Updating DSC on V3</h4>
      <p>Ensure that the latest EMudhra driver is installed and the token is inserted. A frequent error on V3 is "DSC not registered in system." To resolve this, log in as a registered user, navigate to 'My Profile', click on 'Register DSC', and select the corresponding certificate. Ensure that your browser's popup blocker is disabled and Chrome's SSL settings are up to date.</p>
      <h4>2. PAN-DIN Name Mismatch</h4>
      <p>The V3 portal validates your details against the Income Tax PAN database. If there is even a minor spelling difference or spacing mismatch between your PAN and DIN records, name reservations (RUN forms) or incorporation filings (SPICe+) may fail. You must file a DIN correction form (DIR-6) to align your details with your PAN before proceeding.</p>
      <h3>Step-by-Step Guideline for Name Reservations</h3>
      <p>To reserve a name using the RUN (Reserve Unique Name) service on V3, follow this procedure:</p>
      <ol>
        <li>Create a Business User account on the MCA V3 portal. A simple Registered User account cannot access full company formation forms.</li>
        <li>Draft a clear object clause. V3 uses auto-classification, and mismatching the proposed name with the main business objects will lead to auto-rejection.</li>
        <li>Submit up to two proposed names in order of preference, along with NOCs if the proposed name contains a registered trademark word.</li>
      </ol>
      <h3>Conclusion</h3>
      <p>The V3 portal is a significant upgrade that reduces manual processing times, but its strict automated validations require precise data inputs. Ensure that your secretarial documents, DSCs, and PAN records are fully synchronized to avoid filing delays.</p>
    `
  },
  {
    id: "why-registering-your-trademark-before-funding-is-mandatory",
    title: "Why Registering Your Trademark Before Funding is Mandatory",
    category: "trademark",
    tagClass: "it-ip",
    tagText: "IP & Trademark",
    icon: "fa-trademark",
    image: "assets/high_end_corporate_still_life_photography_of_a_professional_wax_seal_on_a.png",
    date: "April 2026",
    readTime: "3 min read",
    excerpt: "Failing to register your brand logo or trademark class early can lead to legal oppositions during investor due diligence operations.",
    content: `
      <p>Trademark registration is a critical asset protection step that startups must prioritize before seeking external funding. In India, brand names and logos are registered under the Trade Marks Act 1999 across various classes of goods and services.</p>
      <h3>Why Investors Prioritize Registered Trademarks</h3>
      <p>During a funding round, investors conduct thorough legal due diligence. Mismatches or disputes in brand ownership can delay or derail the investment. Here is why ownership is crucial:</p>
      <ul>
        <li><strong>Exclusive Rights:</strong> A registered trademark grants the company the sole right to use the brand name, logo, or tagline in commerce, preventing competitors from passing off similar services.</li>
        <li><strong>Asset Value:</strong> Trademarks are intangible assets that can be valued, licensed, or sold, directly adding to the company's valuation.</li>
        <li><strong>Protection Against Infringement:</strong> Registration provides a strong legal basis to sue for trademark infringement, securing your market position.</li>
      </ul>
      <h3>Common Obstacles in the Filing Process</h3>
      <p>Failing to do a preliminary TM Search could result in a registry objection code or opponent legal notices. MSR's legal desk advises setting up class registrations prior to seed funding rounds to ensure intellectual rights are locked.</p>
    `
  },
  {
    id: "a-beginner-guide-to-iso-9001-2015-quality-management-systems",
    title: "A Beginner's Guide to ISO 9001:2015 Quality Management Systems",
    category: "iso",
    tagClass: "it-iso",
    tagText: "ISO QMS",
    icon: "fa-award",
    image: "assets/modern_high_rise_corporate_office_building_with_glass_facade_representing.png",
    date: "March 2026",
    readTime: "6 min read",
    excerpt: "Learn how structured SOP drafting and process controls under ISO frameworks help reduce system errors and attract premium global clients.",
    content: `
      <p>ISO 9001:2015 is the international standard for Quality Management Systems (QMS). Implementing this framework helps organizations consistently deliver products and services that meet customer and regulatory requirements.</p>
      <h3>Core Principles of ISO 9001</h3>
      <p>The standard is built on several key quality management principles that drive organizational excellence:</p>
      <ul>
        <li><strong>Customer Focus:</strong> Aligning business objectives with customer needs and feedback to enhance satisfaction.</li>
        <li><strong>Leadership:</strong> Establishing a unified purpose and direction, with top management actively driving the quality policy.</li>
        <li><strong>Process Approach:</strong> Managing activities as interrelated processes that function as a coherent system to optimize efficiency.</li>
        <li><strong>Continual Improvement:</strong> Fostering an ongoing commitment to identify gaps, implement corrective actions, and track progress.</li>
      </ul>
      <h3>The Six Steps to accredited ISO status</h3>
      <p>From initial Gap Analysis to Stage 1 and Stage 2 registrar evaluations, MSR Assessment Private Limited helps quality managers implement SOP registers and complete audits seamlessly.</p>
    `
  },
  {
    id: "startup-tax-exemption-how-to-apply-for-section-80-iac-exemptions",
    title: "Startup Tax Exemption: How to Apply for Section 80-IAC Exemptions",
    category: "gst",
    tagClass: "it-tax",
    tagText: "Taxation",
    icon: "fa-receipt",
    image: "assets/global_business_map_visualization_with_data_nodes_and_connections_styliz.png",
    date: "February 2026",
    readTime: "4 min read",
    excerpt: "Steps to register with DPIIT under Startup India guidelines and file applications for 3 consecutive tax exemption years.",
    content: `
      <p>To support early-stage companies, the Government of India provides a 3-year income tax holiday under Section 80-IAC of the Income-tax Act. Eligible startups can apply through the DPIIT portal to obtain this exemption.</p>
      <h3>Eligibility Criteria for Section 80-IAC</h3>
      <p>To qualify for the tax holiday, startups must satisfy the following conditions:</p>
      <ul>
        <li><strong>DPIIT Recognition:</strong> The entity must be recognized as a startup by the Department for Promotion of Industry and Internal Trade (DPIIT).</li>
        <li><strong>Company Type:</strong> Must be incorporated as a Private Limited Company or a Limited Liability Partnership (LLP).</li>
        <li><strong>Incorporation Date:</strong> Must be incorporated on or after April 1, 2016.</li>
        <li><strong>Innovation Focus:</strong> The startup must demonstrate a scalable business model focused on innovation, development, or improvement of products, processes, or services.</li>
      </ul>
      <h3>Filing Procedure on DPIIT Portal</h3>
      <p>Compile details of the incorporation, proof of innovative process structure, and submit the tax holiday application dossier. MSR's CA and legal desk helps draft DPIIT project reports to ensure approval success.</p>
    `
  },
  {
    id: "security-checkpoints-for-corporate-website-auditing",
    title: "Security Checkpoints for Corporate Website Auditing",
    category: "iso",
    tagClass: "it-digital",
    tagText: "Tech & Web",
    icon: "fa-laptop-code",
    image: "assets/two_professional_businessmen_in_suits_shaking_hands_in_a_high_rise_office.png",
    date: "January 2026",
    readTime: "5 min read",
    excerpt: "How implementing HTTPS protocols, SSL certification, and databases encryption tags prepares your portal for regulatory compliance safety audits.",
    content: `
      <p>In the digital age, a corporate website is often the primary touchpoint for clients, investors, and regulators. Security vulnerabilities on your portal can lead to data breaches, brand reputation damage, and severe legal penalties under the Digital Personal Data Protection (DPDP) Act 2023.</p>
      <h3>Essential Security Checkpoints</h3>
      <p>During a security audit, compliance officers and technical auditors evaluate several key layers of your website architecture:</p>
      <h4>1. HTTPS Protocols & SSL Certificates</h4>
      <p>Ensure that all web traffic is encrypted using Secure Sockets Layer (SSL) or Transport Layer Security (TLS) protocols. An active SSL certificate protects login credentials and payment information from interception and improves search engine visibility.</p>
      <h4>2. Database Encryption & Storage Security</h4>
      <p>Any personal identifiable information (PII) collected via contact forms or client dashboards must be encrypted at rest and in transit. Implement strong hashing algorithms (e.g., bcrypt) for passwords and restrict access to backend databases using strict firewall configurations.</p>
      <h4>3. Vulnerability Scanning & Penetration Testing</h4>
      <p>Regularly scan your website code and server environment for common vulnerabilities listed in the OWASP Top 10, such as SQL injection, cross-site scripting (XSS), and broken authentication. Conducting annual penetration tests simulates real-world attacks to identify security weaknesses.</p>
      <h4>4. Privacy Policy & DPDP Compliance</h4>
      <p>Update your website's Privacy Policy to comply with the DPDP Act 2023. You must provide clear details regarding data collection purposes, storage duration, user consent mechanisms, and specify contact details for your Data Protection Officer (DPO).</p>
      <h3>Conclusion</h3>
      <p>Implementing structured website security controls is a fundamental aspect of modern corporate governance. Regular audits ensure that your business remains compliant with data protection laws, preserves client trust, and maintains operational integrity.</p>
    `
  }
];

// Simple slugify function
function slugify(text) {
  return text.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}
