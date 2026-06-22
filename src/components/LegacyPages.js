"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

/* ==========================================================================
   1. CAREER PAGE
   ========================================================================== */
export function CareerPage() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', role: '', cv: '', cover: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.phone && formData.email && formData.role && formData.cv) {
      setSubmitted(true);
      const toast = document.getElementById('toast');
      const toastMsg = document.getElementById('toast-msg');
      if (toast && toastMsg) {
        toastMsg.textContent = t("Application submitted successfully!");
        toast.classList.add('show');
        setTimeout(() => {
          toast.classList.remove('show');
        }, 3000);
      }
      setFormData({ name: '', phone: '', email: '', role: '', cv: '', cover: '' });
    }
  };

  return (
    <>
      <section className="career-hero">
        <div className="career-hero-wrap">
          <div className="breadcrumb" style={{ display: 'flex', justifyContent: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-faint)', marginBottom: '14px' }}>
            <Link href="/" style={{ color: 'var(--primary)', textDecoration: 'none' }}>{t("Home")}</Link>
            <span>/</span>
            <span>{t("Careers")}</span>
          </div>
          <h1 className="career-hero-title">{t("Build Your Career at MSR Assessment Pvt Ltd")}</h1>
          <p className="career-hero-desc">{t("We are always looking for ambitious Chartered Accountants, Company Secretaries, Corporate Lawyers, and Digital Developers to join our growing advisory firm.")}</p>
        </div>
      </section>

      <section className="why-join-section">
        <div className="section-header centered">
          <span className="section-label">{t("Company Culture")}</span>
          <h2 className="section-title">{t("Why Professionals Choose MSR")}</h2>
          <p className="section-desc">{t("Collaborate in an environment that prioritizes technical accuracy, client growth, and professional growth.")}</p>
        </div>
        <div className="wj-grid">
          <div className="wj-card">
            <div className="wj-icon"><i className="fas fa-handshake-angle"></i></div>
            <h3 className="wj-title">{t("Advisory Mentorship")}</h3>
            <p className="wj-desc">{t("Work closely with experienced legal partners and senior accounting advisors on complex compliance files.")}</p>
          </div>
          <div className="wj-card">
            <div className="wj-icon"><i className="fas fa-laptop-code"></i></div>
            <h3 className="wj-title">{t("Digital-First Systems")}</h3>
            <p className="wj-desc">{t("Operate with high-efficiency cloud dashboards, automated workflows, and modern communications models.")}</p>
          </div>
          <div className="wj-card">
            <div className="wj-icon"><i className="fas fa-arrow-up-right-dots"></i></div>
            <h3 className="wj-title">{t("Clear Career Growth")}</h3>
            <p className="wj-desc">{t("Structured evaluations, leadership track pathways, and certifications sponsorship opportunities.")}</p>
          </div>
        </div>
      </section>

      <section className="positions-section">
        <div className="section-header centered">
          <span className="section-label">{t("Opportunities")}</span>
          <h2 className="section-title">{t("Currently Open Positions")}</h2>
          <p className="section-desc">{t("Join our office in Delhi or operate remotely on select advisory profiles.")}</p>
        </div>
        <div className="pos-container">
          {[
            { title: "Associate Consultant — Corporate Law", loc: "Delhi (Onsite)", type: "Full-Time", exp: "2-4 Yrs Exp" },
            { title: "Chartered Accountant (CA) — Taxation & Audit", loc: "Delhi / Hybrid", type: "Full-Time", exp: "3+ Yrs Exp" },
            { title: "Associate Developer — E-Commerce & Web Systems", loc: "Remote", type: "Full-Time", exp: "1-3 Yrs Exp" },
            { title: "Customer Care Executive", loc: "Delhi / Remote", type: "Full-Time", exp: "Fresher / Experience (Both Welcome)", desc: "We are hiring Customer Care Executives to manage client communications, coordinate document checklists, and support our processing desks. Both Freshers and Experienced candidates are welcome!" }
          ].map((pos, idx) => (
            <div className="pos-card" key={idx}>
              <div>
                <h3 className="pos-title">{t(pos.title)}</h3>
                {pos.desc && <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px', lineHeight: '1.6' }}>{t(pos.desc)}</p>}
                <div className="pos-meta">
                  <span><i className="fas fa-map-pin"></i> {t(pos.loc)}</span>
                  <span><i className="fas fa-briefcase"></i> {t(pos.type)}</span>
                  <span><i className="fas fa-user-tie"></i> {t(pos.exp)}</span>
                </div>
              </div>
              <a href="#apply" className="btn btn-sm btn-primary">{t("Apply Now")}</a>
            </div>
          ))}
        </div>
      </section>

      <section className="apply-section" id="apply">
        <div className="apply-container">
          <div className="wp-header">
            <h2 className="wp-title">{t("Join Our Talent Queue")}</h2>
          </div>
          <div className="wp-body">
            <form onSubmit={handleSubmit} id="career-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="car-name">{t("Full Name *")}</label>
                  <input type="text" id="car-name" required placeholder="Sanjay Verma" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                </div>
                <div className="form-group">
                  <label htmlFor="car-phone">{t("Phone Number *")}</label>
                  <input type="tel" id="car-phone" required placeholder="+91 98765 43210" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="car-email">{t("Email Address *")}</label>
                <input type="email" id="car-email" required placeholder="sanjay@example.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              </div>
              <div className="form-group">
                <label htmlFor="car-role">{t("Position of Interest *")}</label>
                <select id="car-role" required value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })}>
                  <option value="">{t("Select a role...")}</option>
                  <option>{t("Associate Consultant — Corporate Law")}</option>
                  <option>{t("Chartered Accountant — Taxation & Audit")}</option>
                  <option>{t("Associate Developer — E-Commerce & Web Systems")}</option>
                  <option>{t("Customer Care Executive")}</option>
                  <option>{t("Other / General Application")}</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="car-cv">{t("Resume / CV Link *")}</label>
                <input type="url" id="car-cv" required placeholder="Google Drive, Dropbox, or PDF URL link" value={formData.cv} onChange={(e) => setFormData({ ...formData, cv: e.target.value })} />
              </div>
              <div className="form-group">
                <label htmlFor="car-cover">{t("Cover Note / Brief Intro")}</label>
                <textarea id="car-cover" rows="4" placeholder={t("Briefly describe your expertise and why you'd like to join us...")} value={formData.cover} onChange={(e) => setFormData({ ...formData, cover: e.target.value })}></textarea>
              </div>
              <button type="submit" className="btn-submit" style={{ width: '100%' }}>
                {t("Submit Application")} <i className="fas fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

/* ==========================================================================
   2. CERTIFICATION PROCESS
   ========================================================================== */
export function CertificationProcessPage() {
  const { t } = useLanguage();
  return (
    <>
      {/* Hero */}
      <section className="timeline-hero">
        <div 
          className="svc-hero-bg-media"
          style={{ backgroundImage: "url('/msrassessment/assets/modern_high_rise_corporate_office_building_with_glass_facade_representing.png')", opacity: 0.05 }}
        ></div>
        <div className="timeline-hero-wrap">
          <div>
            <div className="breadcrumb" style={{ display: 'flex', gap: '6px', fontSize: '12px', color: 'var(--text-faint)', marginBottom: '14px' }}>
              <Link href="/" style={{ color: 'var(--primary)', textDecoration: 'none' }}>{t("Home")}</Link>
              <span>/</span>
              <span>{t("Certification Process")}</span>
            </div>
            <h1 className="timeline-hero-title">{t("A Structured Path to Global Quality Certification")}</h1>
            <p className="timeline-hero-desc">
              {t("We simplify corporate ISO audit processes. From gap analysis to compliance certification, our qualified auditors manage every process milestone with strict regulatory transparency.")}
            </p>
          </div>
          <div className="timeline-hero-image" style={{ backgroundImage: "url('/msrassessment/assets/certification_workflow.png')", backgroundSize: 'cover', backgroundPosition: 'center', height: '240px', borderRadius: 'var(--r-md)', border: '1px solid var(--border-solid)' }}></div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="process-timeline-section">
        {/* Section: Resource Hub Expanded Guidance */}
        <div className="container" style={{ marginBottom: 'var(--s8)' }}>
          <div className="svc-content-section" style={{ marginTop: 'var(--s2)', borderTop: '1px solid var(--border-solid)', paddingTop: 'var(--s4)' }}>
            <h3><i className="fas fa-book-open"></i> {t("Technical Audit Methodology & Resource Library")}</h3>
            <p style={{ fontSize: '14.5px', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '14px' }}>
              {t("MSR Assessment Pvt Ltd publishes this resource directory under the guidance of our Editorial Board, consisting of certified lead assessors and legal advisors. Our objective is to provide Indian businesses with clear, actionable insights into international standards.")}
            </p>
            
            <div style={{ background: 'var(--bg-alt)', border: '1px solid var(--border-solid)', borderRadius: 'var(--r-md)', padding: 'var(--s3)', fontSize: '14px', lineHeight: 1.7, color: 'var(--text-muted)', marginBottom: '20px' }}>
              <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--primary)', marginBottom: '6px' }}>{t("Detailed Audit Stage 1 & Stage 2 Timeline Flow")}</h4>
              <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                {t("The auditing process comprises two main stages: Stage 1 (Document Review) and Stage 2 (On-Site Conformity Audit). Our lead auditing desk coordinates all scheduling, document reviews, and corrective action submissions to secure certificates within 14-30 business days. This structured timeline is designed to ensure that the organization's management system is not only aligned with standard clauses but also fully functional and capable of generating the operational evidence necessary to clear third-party registrar assessments.")}
              </p>

              <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--primary)', marginBottom: '6px' }}>{t("Phase 01: Pre-Audit Gap Analysis & Context Determination")}</h4>
              <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                {t("Our lead assessors conduct a thorough physical and document review of your existing operations against standard clauses. We evaluate your organizational context (Clause 4.1), identify the expectations of interested parties (Clause 4.2), and determine the appropriate scope of certification. The resulting Gap Matrix identifies specific deficiencies in your current procedures, records, and controls, providing your management team with a step-by-step remediation roadmap to ensure no standard requirement is overlooked.")}
              </p>

              <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--primary)', marginBottom: '6px' }}>{t("Phase 02: Document Architecture Design & Policy Formulation")}</h4>
              <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                {t("We assist in drafting the required documentation framework. This includes compiling the high-level Corporate Quality Manual, designing the Environmental Management Plan or Statement of Applicability (SoA), and writing detailed Standard Operating Procedures (SOPs) for all key business divisions. Every document is structured to satisfy Clause 7.5 requirements, establishing version control, authorization protocols, distribution rules, and document identification schemes to prevent the use of obsolete procedures on the operating floor.")}
              </p>

              <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--primary)', marginBottom: '6px' }}>{t("Phase 03: Operational Controls Deployment & Daily Logging")}</h4>
              <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                {t("With documentation approved, we support the operational deployment of compliance controls. This involves configuring risk registers, environmental aspect-impact logs, and occupational hazard controls (HIRA). We establish daily record sheets, machinery calibration logs, IT access logs, and safety walkthrough records. Maintaining active, signed daily logs is essential to prove to third-party registrar assessors that your processes are operated under controlled conditions.")}
              </p>

              <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--primary)', marginBottom: '6px' }}>{t("Phase 04: Competency Assessment & Employee Awareness Training")}</h4>
              <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                {t("We conduct formal training workshops across all organizational levels. Under Clause 7.2 and 7.3, employees must be aware of the Quality Policy, standard objectives, and their specific responsibilities in maintaining standard status. We compile employee competency matrices, document training session attendance records, and conduct brief evaluations. This ensures your staff is fully prepared to answer questions from the registrar assessor during physical floor reviews.")}
              </p>

              <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--primary)', marginBottom: '6px' }}>{t("Phase 05: Internal Auditor Development & Mock Audits")}</h4>
              <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                {t("We develop your internal audit capabilities by training selected personnel on audit methodologies. The trained internal audit team performs a complete, independent mock audit across all operating departments, using custom audit checklists. We record all findings, raise internal non-conformities (NCs) where necessary, and compile the final internal audit report (Clause 9.2). This simulation prepares your team for the registrar's visit and tests system effectiveness.")}
              </p>

              <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--primary)', marginBottom: '6px' }}>{t("Phase 06: Management Review Meeting (MRM) Execution")}</h4>
              <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                {t("We coordinate and facilitate the mandatory Management Review Meeting (Clause 9.3). Top management and process owners review the suitability, adequacy, and effectiveness of the management system. The agenda includes reviewing internal audit results, process performance, customer feedback, status of corrective actions, objectives status, and risk assessment updates. The meeting outcomes, resource allocations, and strategic decisions are documented in signed MRM minutes.")}
              </p>

              <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--primary)', marginBottom: '6px' }}>{t("Phase 07: Stage 1 Registrar Documentation Audit")}</h4>
              <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                {t("The chosen third-party registrar assessor performs the Stage 1 review. This is primarily a documentation audit to verify that your system architecture satisfies standard requirements. The assessor inspects your Quality Manual, scope statement, risk register, internal audit report, and MRM minutes. Any documentation gaps identified during Stage 1 must be addressed before the assessor schedules the on-site Stage 2 conformity audit.")}
              </p>

              <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--primary)', marginBottom: '6px' }}>{t("Phase 08: Stage 2 Registrar Physical/Logical Assessment")}</h4>
              <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                {t("The registrar assessor conducts the Stage 2 audit on-site (or remotely for specific IT/digital environments). They verify process conformity, inspect physical facilities, review logs, verify calibration certificates, check safety practices, and interview employees. The auditor's goal is to verify that the procedures documented in your manual are actively followed in daily practice and that your records support compliance claims.")}
              </p>

              <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--primary)', marginBottom: '6px' }}>{t("Phase 09: CAPA Resolution & Certificate Recommendation")}</h4>
              <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                {t("If the registrar assessor identifies any non-conformities (NCs) during Stage 2, the organization is given a specific timeline (typically 30-60 days) to address them. We guide your team in preparing and submitting the CAPA evidence files. Once resolved, the certifying body approves your listing and issues the official ISO certificate, registering it in the global IAF directory.")}
              </p>

              <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--primary)', marginBottom: '6px' }}>{t("Phase 10: Registry Listing, Certificate Release, & Verification")}</h4>
              <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                {t("The registrar's certification committee performs the final review and issues the official accredited ISO certificate. The certificate details, scope, and status are registered in the global IAF CertSearch directory. MSR's team verifies the listing and helps you implement our certificate lookup widget, allowing clients, government tender boards, and corporate buyers to verify your accredited status instantly.")}
              </p>

              <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--primary)', marginBottom: '6px' }}>{t("Phase 11: Annual Surveillance Audits (Year 1 & 2)")}</h4>
              <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                {t("ISO certificates are valid for a three-year cycle, subject to annual surveillance audits. In Year 1 and Year 2, the certifying registrar schedules mandatory periodic reviews. MSR's advisory desk provides continuous support, helping you update risk registers, record internal audits, conduct MRMs, and verify calibration records. These surveillance runs ensure that compliance controls remain active and prevent suspension.")}
              </p>

              <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--primary)', marginBottom: '6px' }}>{t("Phase 12: Comprehensive Recertification Audit Planning (Year 3)")}</h4>
              <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                {t("Before the certificate's third-year expiration, the organization must undergo a complete recertification assessment. We plan and schedule this review six months in advance. We perform a complete baseline audit, update your quality manual, verify that all operational records are locked, and manage the recertification process with the registrar to ensure seamless compliance renewal.")}
              </p>
            </div>

            <h3><i className="fas fa-spellcheck"></i> {t("Glossary of Key Compliance Terms")}</h3>
            <p style={{ fontSize: '14.5px', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '14px' }}>
              {t("Understanding standard nomenclature is essential for effective system management. Below is a reference glossary of terms used in ISO audit frameworks:")}
            </p>
            <div style={{ marginLeft: '10px', borderLeft: '3px solid var(--accent)', paddingLeft: '15px', marginBottom: '20px' }}>
              <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--primary)', marginBottom: '6px' }}>{t("Accreditation vs. Certification")}</h4>
              <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                {t("Accreditation is the formal recognition granted to an auditing body (the Registrar) by an authorized body (like NABCB or IAS) confirming their competence to audit. Certification is the third-party validation issued to an organization confirming compliance with a specific standard.")}
              </p>

              <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--primary)', marginBottom: '6px' }}>{t("Stage 1 vs. Stage 2 Audit")}</h4>
              <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                {t("Stage 1 is a documentation audit to review the readiness of the system (e.g. QMS scope, context analysis, internal audits). Stage 2 is the formal on-site audit evaluating actual process compliance, records, calibrations, and interviewing shop floor staff.")}
              </p>

              <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--primary)', marginBottom: '6px' }}>{t("CAPA (Corrective and Preventive Action)")}</h4>
              <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                {t("A systematic method for identifying non-conformities, conducting root-cause analysis (e.g., Fishbone or 5-Whys), implementing actions to eliminate the cause, and verifying the effectiveness of those actions to prevent recurrence.")}
              </p>

              <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--primary)', marginBottom: '6px' }}>{t("Integrated Management System (IMS)")}</h4>
              <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                {t("An operational framework that combines multiple ISO standards (e.g. ISO 9001, 14001, 45001) into a single, unified management system, reducing audit overhead and duplicate documentation.")}
              </p>
            </div>

            <h3><i className="fas fa-file-contract"></i> {t("Global Certification Verification Guidelines")}</h3>
            <p style={{ fontSize: '14.5px', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '14px' }}>
              {t("Accredited ISO certificates carry significant commercial weight, helping businesses qualify for corporate contracts and government tenders. However, the market also hosts non-accredited or fraudulent certificate issuers. Stakeholders must understand how to verify the authenticity of any compliance credential:")}
            </p>
            <ul style={{ fontSize: '14.0px', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '14px', paddingLeft: '20px', listStyleType: 'disc' }}>
              <li><strong>{t("Verify the Accreditation Symbol:")}</strong> {t("A valid certificate must display the mark of a recognized accreditation body (e.g., NABCB, UKAS, IAS, ANAB) that is a member of the IAF.")}</li>
              <li><strong>{t("Search the IAF CertSearch Directory:")}</strong> {t("The International Accreditation Forum maintains a central registry (iafcertsearch.org) containing all active accredited certificates globally.")}</li>
              <li><strong>{t("Confirm the Registrar Scope:")}</strong> {t("Ensure the certification body is accredited for your specific industrial category (identified by NACE/IAF sector codes).")}</li>
              <li><strong>{t("Audit the Certificate Status:")}</strong> {t("Verify the expiry date, standard version, and scope statement to confirm the certification is active and covers your operations.")}</li>
            </ul>

            <h3><i className="fas fa-hand-holding-hand"></i> {t("Guidelines for Selecting an Accredited Registrar")}</h3>
            <p style={{ fontSize: '14.5px', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '14px' }}>
              {t("To ensure that your ISO certificate is globally recognized, it must be issued by a registrar whose accreditation is active under the International Accreditation Forum (IAF) Multilateral Recognition Agreement (MLA).")}
            </p>
            <p style={{ fontSize: '14.5px', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '14px' }}>
              {t("Prior to hiring a certification body, verify their listing on the official directory of the national accreditation body (e.g., NABCB in India, UKAS in the UK, IAS in the US). Certificates issued by unaccredited or non-IAF-aligned registries hold no legal standing in government tenders or international trade procurement.")}
            </p>

            <h3><i className="fas fa-arrows-spin"></i> {t("Continual Improvement & CAPA Implementation")}</h3>
            <p style={{ fontSize: '14.5px', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '14px' }}>
              {t("Continual improvement is the cornerstone of all ISO standards. Under Clause 10, organizations must establish a process to log and investigate process errors, customer complaints, and system failures. A Corrective and Preventive Action (CAPA) framework is applied to prevent these issues from recurring:")}
            </p>
            <ul style={{ fontSize: '14.0px', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '14px', paddingLeft: '20px', listStyleType: 'disc' }}>
              <li><strong>{t("Root-Cause Analysis:")}</strong> {t("Use diagnostic methods (such as the 5-Whys or Ishikawa Fishbone diagrams) to identify the true origin of the non-conformity.")}</li>
              <li><strong>{t("Corrective Actions:")}</strong> {t("Deploy immediate containment steps to resolve the immediate symptom, followed by long-term adjustments to eliminate the root cause.")}</li>
              <li><strong>{t("Verification Audits:")}</strong> {t("Perform a follow-up assessment after 30 to 60 days to verify that the implemented actions are active and effective.")}</li>
              <li><strong>{t("Log Updates:")}</strong> {t("Record all outcomes in the CAPA register and present the data during annual management reviews to demonstrate continual improvement.")}</li>
            </ul>

            <h3><i className="fas fa-bullhorn"></i> {t("Internal Communication & Awareness Controls")}</h3>
            <p style={{ fontSize: '14.5px', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '14px' }}>
              {t("Effective implementation of any management system requires transparent communication pathways. Under Clause 7.4 of the High-Level Structure, certified entities must establish procedures for internal and external communication:")}
            </p>
            <ul style={{ fontSize: '14.0px', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '14px', paddingLeft: '20px', listStyleType: 'disc' }}>
              <li><strong>{t("Define the Target Audience:")}</strong> {t("Identify who needs to receive specific compliance information (e.g. employees, customers, subcontractors, regulators).")}</li>
              <li><strong>{t("Establish the Timeline:")}</strong> {t("Define when communication should occur (e.g., daily floor briefings, monthly performance reviews, annual corporate reports).")}</li>
              <li><strong>{t("Control the Message Content:")}</strong> {t("Ensure that all communicated documentation is accurate, approved under version control, and aligned with standard policies.")}</li>
              <li><strong>{t("Document the Communication Logs:")}</strong> {t("Keep signed records of meetings, emails, training runs, and memo boards to present as evidence during registrar assessments.")}</li>
            </ul>

            <h3><i className="fas fa-file-lines"></i> {t("Document Control & Record Maintenance Rules")}</h3>
            <p style={{ fontSize: '14.5px', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '14px' }}>
              {t("Under Clause 7.5 of the High-Level Structure, certified organizations must implement strict document control protocols. Every standard operating procedure, policy statement, and record sheet must carry a unique identifier, version control number, author signature, and distribution list.")}
            </p>
            <p style={{ fontSize: '14.5px', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '14px' }}>
              {t("Outdated versions of documents must be immediately archived or marked obsolete to prevent accidental use on the operating floor. Maintaining absolute control over your documentation prevents minor non-conformities during recurring surveillance audits.")}
            </p>

            <h3><i className="fas fa-diagram-project"></i> {t("Core Implementation Stages & Timeline Flow")}</h3>
            <p style={{ fontSize: '14.5px', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '14px' }}>
              {t("The timeline to achieve accredited certification varies based on organizational scale and operational complexity. Small to medium businesses typically navigate the pipeline in 30 to 45 business days, while multi-site enterprises require a structured 90-day roadmap:")}
            </p>
            <div style={{ marginLeft: '10px', borderLeft: '3px solid var(--accent)', paddingLeft: '15px', marginBottom: '20px' }}>
              <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--primary)', marginBottom: '6px' }}>{t("Stage 01: Diagnosis & SOP Formulation (Weeks 1-3)")}</h4>
              <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                {t("The consulting team conducts physical walkthroughs and interviews to identify compliance gaps. Standard Operating Procedures (SOPs), Quality Policies, and HIRA matrices are designed and distributed to all process owners.")}
              </p>

              <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--primary)', marginBottom: '6px' }}>{t("Stage 02: System Training & Internal Audits (Weeks 4-6)")}</h4>
              <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                {t("Employees receive training on the new controls. A mock internal audit is performed across all departments to test the operational registers, followed by a formal Management Review Meeting to review system performance.")}
              </p>

              <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--primary)', marginBottom: '6px' }}>{t("Stage 03: Registrar Assessment & Listing (Weeks 7-8)")}</h4>
              <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                {t("The chosen registrar assessor conducts a Stage 1 documentation review, followed by the Stage 2 physical floor inspection. Gaps are addressed through a CAPA plan, triggering the certificate release and IAF CertSearch registration.")}
              </p>
            </div>
          </div>
        </div>

        <div className="pt-container">
          {[
            { step: "01", title: "Initial Consultation", desc: "Share your industry profile and certification objectives. Our corporate auditing team assesses the applicable ISO standards, standard codes (QMS, ISMS, OHS, etc.), and sets the operational scope.", deliv: "Feasibility report & specific certification checklist" },
            { step: "02", title: "Gap Analysis", desc: "We conduct a systematic review of your current processes, records, and facilities to check conformity levels against desired ISO standards, defining system gaps that need mitigation.", deliv: "Gap analysis matrix & system remediation roadmap" },
            { step: "03", title: "Process Documentation", desc: "Our experts draft the mandatory documentation required for certification, including Quality Manuals, System Operating Procedures (SOPs), process logs, and organizational policy guidelines.", deliv: "Tailored Quality Manual & operational SOPs" },
            { step: "04", title: "Awareness & Auditor Training", desc: "We conduct formal training workshops for your core team members, explaining system regulations, logging practices, and explaining internal process audit procedures.", deliv: "Trainee certificates & compliance workshop records" },
            { step: "05", title: "Internal Audit Review", desc: "Our lead auditors perform a mock internal audit run on all operating departments, verifying that system regulations are actively implemented and preparing logs to address deviations.", deliv: "Internal audit report & corrective actions log" },
            { step: "06", title: "Certification Audit (Stage 1 & 2)", desc: "We coordinate the final audit with recognized national/international registrar auditors. We manage department interactions, policy reviews, and support your team throughout the inspection.", deliv: "Audit verification & registrar inspection reports" },
            { step: "07", title: "Certification Issued", desc: "Upon successful inspection checks, the certifying body registers your entity and issues the official ISO Certificate, certifying your organization compliant to the global standard.", deliv: "ISO Quality Standards Certificate" },
            { step: "08", title: "Ongoing Compliance", desc: "To preserve standard status, we provide continuous guidance for mandatory surveillance audits, annual logging, and policy upgrades ahead of recurring inspector inspections.", deliv: "Annual compliance advisory & surveillance audit preparation" }
          ].map((item, idx) => (
            <div className="pt-card-row" key={idx}>
              <div className="pt-badge">{item.step}</div>
              <div className="pt-card">
                <h3 className="pt-step-title">{t(item.title)}</h3>
                <p className="pt-step-desc">{t(item.desc)}</p>
                <div className="pt-step-deliverables">
                  <i className="fas fa-list-check"></i> {t("Deliverables:")} {t(item.deliv)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section" style={{ padding: 'var(--s10) 0', background: 'var(--primary)', color: 'white' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-head)', fontSize: '32px', fontWeight: '800', letterSpacing: '-1px', marginBottom: '14px' }}>
            {t("Ready to Elevate Your Operational Standards?")}
          </h2>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.7)', maxWidth: '540px', margin: '0 auto var(--s4)', lineHeight: '1.65' }}>
            {t("Consult with a qualified lead auditor to map out your organization's ISO certification roadmap.")}
          </p>
          <button 
            className="btn btn-lg btn-accent" 
            onClick={() => {
              const modal = document.getElementById('inquiry-modal');
              if (modal) modal.classList.add('open');
            }}
          >
            {t("Consult Lead Auditor")} <i className="fas fa-arrow-right" style={{ marginLeft: '6px' }}></i>
          </button>
        </div>
      </section>
    </>
  );
}

/* ==========================================================================
   3. CERTIFICATION GUIDES
   ========================================================================== */
export function CertificationGuidesPage() {
  const { t } = useLanguage();
  return (
    <section className="section" style={{ padding: 'var(--s8) 0' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        <h1 className="t-h1 centered" style={{ color: 'var(--primary)', marginBottom: 'var(--s4)' }}>{t("ISO Compliance Guides & Checklists")}</h1>
        <p className="t-body-lg centered" style={{ marginBottom: 'var(--s6)' }}>{t("Download helpful resources, statutory registers lists, and standard checklists curated by MSR lead auditors.")}</p>

        <div className="wj-grid">
          {[
            { icon: "fa-file-pdf", title: "ISO 9001:2015 Checklist", desc: "Complete QMS audit checkpoints covering Clauses 4 to 10 for quality managers." },
            { icon: "fa-shield-halved", title: "ISO 27001 Security Guide", desc: "Cybersecurity checklist and data encryption guidelines for IT systems compliance." },
            { icon: "fa-book-open", title: "Corporate ROC Calendar 2026", desc: "Filing dates and governance deadlines for Private Limited and LLP corporate entities." }
          ].map((guide, idx) => (
            <div className="wj-card" key={idx} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div className="wj-icon"><i className={`fas ${guide.icon}`}></i></div>
                <h3 className="wj-title">{t(guide.title)}</h3>
                <p className="wj-desc" style={{ marginBottom: 'var(--s3)' }}>{t(guide.desc)}</p>
              </div>
              <button className="btn btn-sm btn-primary" onClick={() => alert(t("Resource download initiated."))} style={{ width: '100%', justifyContent: 'center' }}>
                {t("Download PDF")} <i className="fas fa-download" style={{ marginLeft: '6px' }}></i>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   4. CASE STUDIES
   ========================================================================== */
export function CaseStudiesPage() {
  const { t } = useLanguage();
  return (
    <section className="section" style={{ background: 'var(--bg-alt)', padding: 'var(--s8) 0' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        <h1 className="t-h1 centered" style={{ color: 'var(--primary)', marginBottom: 'var(--s4)' }}>{t("Corporate Compliance Transformations")}</h1>
        <p className="t-body-lg centered" style={{ marginBottom: 'var(--s6)' }}>{t("Read how MSR Assessment Pvt Ltd helps diverse business enterprises streamline workflows, secure certifications, and mitigate risks.")}</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s4)' }}>
          {[
            { client: "TechForge Solutions Pvt Ltd", standard: "ISO 9001 & ISO 27001", results: "Boosted client acquisition conversion rates by 35% after publishing accredited QMS & ISMS listing directories, passing rigorous international vendor safety checks." },
            { client: "Organic Roots Foods LLP", standard: "ISO 22000 (Food Safety)", results: "Successfully restructured raw material supply chain audits and packaging facility checks to secure central FSSAI state licenses." },
            { client: "Sunburst Energy Systems", standard: "ISO 14001 (Environment)", results: "Minimized chemical waste discharge and standardized environmental footprint monitoring across solar photovoltaic arrays setups." }
          ].map((cs, idx) => (
            <div className="wj-card" key={idx} style={{ textAlign: 'left' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-solid)', paddingBottom: '12px', marginBottom: '12px' }}>
                <strong style={{ color: 'var(--primary)', fontSize: '16px' }}>{cs.client}</strong>
                <span className="svc-meta-value gold" style={{ fontSize: '13px' }}>{cs.standard}</span>
              </div>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.6' }}>{t(cs.results)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   5. CERTIFICATE VERIFICATION
   ========================================================================== */
export function CertificateVerificationPage() {
  const { t } = useLanguage();
  const [certId, setCertId] = useState('');
  const [result, setResult] = useState(null);

  const certDb = {
    'MSR-QMS-2026-4891': { company: 'TechForge Solutions Pvt Ltd', standard: 'ISO 9001:2015 (QMS)', status: 'Active', issue: '14-Jan-2026', expiry: '13-Jan-2029', scope: 'Design, development, and deployment of enterprise SaaS and cloud infrastructure platforms.' },
    'MSR-ISMS-2026-9042': { company: 'Zenith Labs India', standard: 'ISO 27001:2022 (ISMS)', status: 'Active', issue: '22-Mar-2026', expiry: '21-Mar-2029', scope: 'Information security management for biotechnology research databases and clinical operations.' },
    'MSR-EMS-2026-3118': { company: 'Sunburst Energy Systems', standard: 'ISO 14001:2015 (EMS)', status: 'Active', issue: '05-Feb-2026', expiry: '04-Feb-2029', scope: 'Installation and management of commercial photovoltaic arrays and hybrid grids.' },
    'MSR-FSMS-2026-0722': { company: 'Organic Roots Foods LLP', standard: 'ISO 22000:2018 (FSMS)', status: 'Active', issue: '19-May-2026', expiry: '18-May-2029', scope: 'Processing, packaging, and supply chain logistics of organic spices and certified food products.' }
  };

  const handleVerify = () => {
    const val = certId.trim().toUpperCase();
    if (!val) {
      alert(t("Please enter a certificate number."));
      return;
    }
    const match = certDb[val] || certDb[val.replace(/\s+/g, '')];
    setResult(match ? { success: true, ...match } : { success: false, query: val });
  };

  return (
    <>
      <section className="svc-page-hero" style={{ paddingBottom: 'var(--s4)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="t-label" style={{ textTransform: 'uppercase', fontSize: '12px', fontWeight: '700', letterSpacing: '1px', color: 'var(--accent)' }}>{t("Public Registry Database")}</span>
          <h1 className="t-h1" style={{ color: 'var(--primary)', marginTop: 'var(--s2)', fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: '800' }}>{t("Accredited Certificate Verification Desk")}</h1>
          <p className="t-body-lg" style={{ marginTop: 'var(--s2)', maxWidth: '680px', marginLeft: 'auto', marginRight: 'auto', color: 'var(--text-muted)' }}>
            {t("Verify the status and validity scope of certifications issued by MSR Assessment Pvt Ltd. Enter your unique certificate ID to pull real-time database details.")}
          </p>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg-card)', paddingTop: 0 }}>
        <div className="container">
          <div className="verification-search-wrap" style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center', background: 'var(--bg)', border: '1px solid var(--border-solid)', borderRadius: 'var(--r-xl)', padding: 'var(--s5)' }}>
            <i className="fas fa-database" style={{ fontSize: '38px', color: 'var(--accent)', marginBottom: 'var(--s2)' }}></i>
            <h3 className="t-h3" style={{ color: 'var(--primary)', fontSize: '20px', fontWeight: '700' }}>{t("Search Certificate Registry")}</h3>
            <p className="t-sm" style={{ marginTop: '6px', fontSize: '13px', color: 'var(--text-muted)' }}>{t("Input the registration number exactly as it appears on your document.")}</p>

            <div className="v-input-group" style={{ display: 'flex', gap: '8px', marginTop: 'var(--s3)', flexWrap: 'wrap' }}>
              <input 
                type="text" 
                id="cert-number" 
                placeholder="e.g. MSR-QMS-2026-4891" 
                aria-label="Certificate Registration Number"
                value={certId}
                onChange={(e) => setCertId(e.target.value)}
                style={{ flex: 1, padding: '12px 16px', borderRadius: 'var(--r-sm)', border: '1px solid var(--border-solid)', fontSize: '14px', background: 'var(--bg-card)', color: 'var(--text)' }}
              />
              <button className="btn btn-md btn-primary" onClick={handleVerify} id="btn-verify-cert">{t("Query Registry")}</button>
            </div>

            <div style={{ fontSize: '12.5px', color: 'var(--text-faint)', marginTop: 'var(--s2)' }}>
              <strong>{t("Try registry ID:")}</strong>{' '}
              <span 
                style={{ fontFamily: 'monospace', color: 'var(--text-muted)', cursor: 'pointer', textDecoration: 'underline' }}
                onClick={() => setCertId('MSR-QMS-2026-4891')}
              >
                MSR-QMS-2026-4891
              </span>{' '}
              ({t("Active QMS example")})
            </div>

            {/* Verification Result */}
            {result && (
              <div className="v-results-container active" style={{ marginTop: 'var(--s4)', textAlign: 'left' }}>
                {result.success ? (
                  <div className="registry-card" style={{ borderColor: 'var(--success)', background: '#E8F5E9', border: '1px solid var(--success)', borderRadius: 'var(--r-lg)', padding: 'var(--s3)' }}>
                    <div style={{ color: 'var(--success)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px' }}>
                      <i className="fas fa-circle-check"></i> {t("Certificate Valid & Active")}
                    </div>
                    <div className="registry-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginTop: '14px' }}>
                      <div className="rg-item" style={{ display: 'flex', flexDirection: 'column' }}><span className="rg-label" style={{ fontSize: '11px', color: 'var(--text-faint)', textTransform: 'uppercase' }}>{t("Certified Entity")}</span><span className="rg-val" style={{ fontWeight: 700, fontSize: '13.5px' }}>{result.company}</span></div>
                      <div className="rg-item" style={{ display: 'flex', flexDirection: 'column' }}><span className="rg-label" style={{ fontSize: '11px', color: 'var(--text-faint)', textTransform: 'uppercase' }}>{t("Standard Accreditation")}</span><span className="rg-val" style={{ fontWeight: 700, fontSize: '13.5px' }}>{result.standard}</span></div>
                      <div className="rg-item" style={{ display: 'flex', flexDirection: 'column' }}><span className="rg-label" style={{ fontSize: '11px', color: 'var(--text-faint)', textTransform: 'uppercase' }}>{t("Registration Status")}</span><span className="rg-val green" style={{ color: 'var(--success)', fontWeight: '700', fontSize: '13.5px' }}>{t(result.status)}</span></div>
                      <div className="rg-item" style={{ display: 'flex', flexDirection: 'column' }}><span className="rg-label" style={{ fontSize: '11px', color: 'var(--text-faint)', textTransform: 'uppercase' }}>{t("Initial Date of Issue")}</span><span className="rg-val" style={{ fontWeight: 700, fontSize: '13.5px' }}>{result.issue}</span></div>
                      <div className="rg-item" style={{ display: 'flex', flexDirection: 'column' }}><span className="rg-label" style={{ fontSize: '11px', color: 'var(--text-faint)', textTransform: 'uppercase' }}>{t("Registration Expiry")}</span><span className="rg-val" style={{ fontWeight: 700, fontSize: '13.5px' }}>{result.expiry}</span></div>
                      <div className="rg-item" style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column' }}><span className="rg-label" style={{ fontSize: '11px', color: 'var(--text-faint)', textTransform: 'uppercase' }}>{t("Accredited Operational Scope")}</span><span className="rg-val" style={{ fontSize: '13px', lineHeight: 1.5, fontWeight: 500 }}>{result.scope}</span></div>
                    </div>
                  </div>
                ) : (
                  <div className="registry-card" style={{ borderColor: '#E74C3C', background: '#FDEDEC', border: '1px solid #E74C3C', borderRadius: 'var(--r-lg)', padding: 'var(--s3)' }}>
                    <div style={{ color: '#C0392B', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px' }}>
                      <i className="fas fa-circle-xmark"></i> {t("Registry Matching Failed")}
                    </div>
                    <p style={{ fontSize: '13.5px', marginTop: '10px', color: 'var(--text-mid)', lineHeight: '1.6' }}>
                      {t("No records matched the certificate ID")} <strong>{`"${result.query}"`}</strong>. {t("Please verify the registration number on your certificate document, check formatting, or query our central support desk at")} <a href="mailto:support@msrassessment.com" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'underline' }}>support@msrassessment.com</a>.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg-alt)', borderTop: '1px solid var(--border-solid)', borderBottom: '1px solid var(--border-solid)', padding: 'var(--s8) 0' }}>
        <div className="container">
          <div className="section-header centered">
            <span className="section-label">{t("Registry Helpdesk")}</span>
            <h2 className="section-title" style={{ color: 'var(--primary)' }}>{t("Frequently Asked Registry Questions")}</h2>
            <p className="section-desc">{t("Learn about certificate validity checks, suspension rules, and audit status queries.")}</p>
          </div>

          <div style={{ maxWidth: '800px', margin: 'var(--s5) auto 0', display: 'flex', flexDirection: 'column', gap: 'var(--s2)' }}>
            {[
              { q: "Why is my certificate showing \"Inactive\" or \"Suspended\" in the registry?", a: "A certificate is suspended or set to inactive if the audited organization fails to coordinate annual surveillance inspections within the mandated timeline or if structural deviations in quality standards are identified during audits." },
              { q: "How can we verify the international accreditation of our certificate?", a: "Every certificate issued by MSR Assessment features the stamp of our respective accreditation board (e.g., IAS or NABCB) along with an accreditation registry number. You can verify this directly on the official portal of the accreditation body." }
            ].map((faq, idx) => (
              <FaqCollapseItem key={idx} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function FaqCollapseItem({ q, a }) {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div style={{ border: '1px solid var(--border-solid)', borderRadius: 'var(--r-md)', overflow: 'hidden', background: 'var(--bg-card)' }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{ width: '100%', padding: '16px 20px', background: 'none', border: 'none', textAlign: 'left', fontSize: '15px', fontStyle: 'normal', fontWeight: 700, color: 'var(--primary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
      >
        {t(q)}
        <i className={`fas fa-chevron-down`} style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}></i>
      </button>
      {isOpen && (
        <div style={{ padding: '0 20px 16px', fontSize: '13.5px', color: 'var(--text-muted)', lineHeight: '1.7' }}>
          {t(a)}
        </div>
      )}
    </div>
  );
}

/* ==========================================================================
   6. FAQS PAGE
   ========================================================================== */
export function FaqsPage() {
  const { t } = useLanguage();
  return (
    <section className="section" style={{ background: 'var(--bg-alt)', padding: 'var(--s8) 0' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <h1 className="t-h1 centered" style={{ color: 'var(--primary)', marginBottom: 'var(--s4)' }}>{t("Frequently Asked Questions (FAQs)")}</h1>
        <p className="t-body-lg centered" style={{ marginBottom: 'var(--s6)' }}>{t("Find direct answers to common queries about company registrations, trademark applications, and ISO auditing services.")}</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s3)' }}>
          {[
            { q: "What is the difference between ISO 9001 and ISO 27001?", a: "ISO 9001 is a Quality Management System (QMS) standard focused on consistency of service delivery, processes optimization, and client satisfaction. ISO 27001 is an Information Security Management System (ISMS) standard focused on securing databases, data access controls, and cyber risks mitigation." },
            { q: "How long does it take to register a Private Limited Company?", a: "Normally, it takes 7-10 working days from the submission of all digital signatures (DSCs) and proposed names approval requests to MCA. Post-incorporation deliverables include COI, corporate PAN, and TAN." },
            { q: "What is Udyam MSME Registration?", a: "Udyam is the official portal registration for Micro, Small and Medium Enterprises under the Ministry of MSME, offering loan subsidies, tender fee waivers, and interest reductions." },
            { q: "Do you provide physical office audits or 100% remote consulting?", a: "We support both. Most ROC and licensing setups are processed completely digitally online. ISO audits and verification stages are scheduled as on-site audits or remote audits based on IAF classification guidelines." }
          ].map((faq, idx) => (
            <FaqCollapseItem key={idx} q={faq.q} a={faq.a} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   7. INDUSTRIES PAGE
   ========================================================================== */
export function IndustriesPage() {
  const { t } = useLanguage();
  return (
    <section className="section" style={{ padding: 'var(--s8) 0' }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        <h1 className="t-h1 centered" style={{ color: 'var(--primary)', marginBottom: 'var(--s4)' }}>{t("ISO Compliance Sector Solutions")}</h1>
        <p className="t-body-lg centered" style={{ marginBottom: 'var(--s6)' }}>{t("We implement auditing and compliance frameworks tailored to the unique operational risks of major Indian industries.")}</p>

        <div className="wj-grid">
          {[
            { id: "construction-compliance", title: "Infrastructure & Civil Eng.", desc: "Scaffolding permit controls, material test logs, HIRA logs, and BOCW Act safety compliance.", icon: "fa-helmet-safety" },
            { id: "food-industry-compliance", title: "Food Processing & Retail", desc: "HACCP hygiene audits, FSSAI licensing documentation, and supply chain contamination controls.", icon: "fa-utensils" },
            { id: "healthcare-compliance", title: "Pharma & Diagnostics Labs", desc: "ISO 13485 medical device QA, patient privacy logs, and biomedical disposal audits.", icon: "fa-heartbeat" },
            { id: "it-services-compliance", title: "IT/SaaS & Cloud Operations", desc: "ISO 27001 data checks, SOC2 control logs, vulnerability patches, and DPDP Act audits.", icon: "fa-laptop-code" },
            { id: "logistics-compliance", title: "Logistics & Fleet Transit", desc: "ISO 9001 cargo logs, supply chain checks, vehicle fitness reviews, and transit permits.", icon: "fa-truck-ramp-box" },
            { id: "manufacturing-compliance", title: "Heavy Manufacturing Units", desc: "ISO 14001 environmental emissions checks, machinery audits, and LOTO safety protocols.", icon: "fa-industry" }
          ].map((ind, idx) => (
            <div className="wj-card" key={idx} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div className="wj-icon"><i className={`fas ${ind.icon}`}></i></div>
                <h3 className="wj-title">{t(ind.title)}</h3>
                <p className="wj-desc" style={{ marginBottom: 'var(--s3)' }}>{t(ind.desc)}</p>
              </div>
              <Link href={`/${ind.id}/`} className="btn btn-sm btn-primary" style={{ justifyContent: 'center' }}>
                {t("View Compliance Guide")}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   8. PRIVACY POLICY
   ========================================================================== */
export function PrivacyPolicyPage() {
  const { t } = useLanguage();
  return (
    <section className="section" style={{ padding: 'var(--s8) 0' }}>
      <div className="container" style={{ maxWidth: '800px', textAlign: 'left' }}>
        <h1 className="t-h1 centered" style={{ color: 'var(--primary)', marginBottom: 'var(--s4)' }}>{t("Privacy Policy")}</h1>
        <p className="t-sm" style={{ color: 'var(--text-faint)', marginBottom: 'var(--s4)' }}>{t("Last Updated: June 2026")}</p>

        <div className="t-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: 'var(--text-muted)', lineHeight: '1.7' }}>
          <p>{t("MSR Assessment Pvt Ltd (\"we\", \"our\", or \"us\") is committed to protecting your corporate and personal information. This Privacy Policy details how we collect, store, and process client data collected via website contact registers, inquiry forms, and payment checkouts, in compliance with the Digital Personal Data Protection (DPDP) Act 2023 of India.")}</p>
          
          <h3 style={{ color: 'var(--primary)', fontSize: '18px', fontWeight: '700', marginTop: '12px' }}>1. Information We Collect</h3>
          <p>{t("We collect company details, billing emails, contact numbers, and payment tokens submitted during consultations setups or invoice checkouts. Statutory files (like PAN, COIs, or GST registers) uploaded for licensing procedures are stored on secure cloud drives restricted to legal assessors.")}</p>

          <h3 style={{ color: 'var(--primary)', fontSize: '18px', fontWeight: '700', marginTop: '12px' }}>2. How We Use Data</h3>
          <p>{t("Your business information is strictly utilized to process company registrations, draft legal documents, run ISO audit assessments, and issue compliance certificates. We do not sell, rent, or distribute data to third-party marketing companies.")}</p>

          <h3 style={{ color: 'var(--primary)', fontSize: '18px', fontWeight: '700', marginTop: '12px' }}>3. Data Security Gateways</h3>
          <p>{t("All web connections are protected via SSL/TLS data transfer protocols. Financial data (like credit cards or UPI details) input during payment steps are processed directly via secure Razorpay checkout portals and are never saved on our server databases.")}</p>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   9. TERMS OF SERVICE
   ========================================================================== */
export function TermsOfServicePage() {
  const { t } = useLanguage();
  return (
    <section className="section" style={{ padding: 'var(--s8) 0' }}>
      <div className="container" style={{ maxWidth: '800px', textAlign: 'left' }}>
        <h1 className="t-h1 centered" style={{ color: 'var(--primary)', marginBottom: 'var(--s4)' }}>{t("Terms of Service")}</h1>
        <p className="t-sm" style={{ color: 'var(--text-faint)', marginBottom: 'var(--s4)' }}>{t("Last Updated: June 2026")}</p>

        <div className="t-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: 'var(--text-muted)', lineHeight: '1.7' }}>
          <p>{t("Welcome to the website of MSR Assessment Pvt Ltd. By browsing this website, scheduling quality audits, or settling invoices online, you agree to comply with the following Terms and Conditions.")}</p>

          <h3 style={{ color: 'var(--primary)', fontSize: '18px', fontWeight: '700', marginTop: '12px' }}>1. Scope of Services</h3>
          <p>{t("MSR Assessment Pvt Ltd acts as a third-party registrar and corporate advisory firm. We provide ISO auditing facilitation, company registration drafting, and licenses filing. The timeline estimates (e.g. 7-10 days) are standard operational timelines, subject to government authority approvals or server processing queue delays.")}</p>

          <h3 style={{ color: 'var(--primary)', fontSize: '18px', fontWeight: '700', marginTop: '12px' }}>2. Professional Fees & Government Charges</h3>
          <p>{t("Our advisory fees are fixed and communicated upfront. Government statutory fees (like stamp duty or MCA registration charges) must be settled separately as actuals. Professional fees are non-refundable once incorporation forms or filing dossiers have been filed with the respective registries.")}</p>

          <h3 style={{ color: 'var(--primary)', fontSize: '18px', fontWeight: '700', marginTop: '12px' }}>3. Client Responsibility</h3>
          <p>{t("Clients must verify the accuracy and authenticity of all business proofs, director KYC files, and compliance declarations. MSR Assessment Pvt Ltd assumes no liability for penalties arising from incorrect, delayed, or false files submitted by clients.")}</p>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   10. TEAM PAGE
   ========================================================================== */
export function TeamPage() {
  const { t } = useLanguage();
  return (
    <>
      <section className="team-hero">
        <div className="team-hero-wrap">
          <div className="breadcrumb" style={{ display: 'flex', justifyContent: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-faint)', marginBottom: '14px' }}>
            <Link href="/" style={{ color: 'var(--primary)', textDecoration: 'none' }}>{t("Home")}</Link>
            <span>/</span>
            <span>{t("Team Advisors")}</span>
          </div>
          <h1 className="team-hero-title">{t("Qualified Corporate Advisors & Partners")}</h1>
          <p className="team-hero-desc">{t("Every compliance, tax and legal filing file is managed directly by a qualified, registered Chartered Accountant or Company Secretary partner.")}</p>
        </div>
      </section>

      <section className="team-grid-section">
        <div className="container">
          <h2 className="team-section-title" style={{ fontSize: '20px', fontWeight: '700', color: 'var(--primary)', marginBottom: 'var(--s3)', textAlign: 'left' }}>{t("Leadership Partners")}</h2>
          <div className="team-grid" style={{ marginBottom: 'var(--s5)' }}>
            {[
              { name: "Ramesh K. Aggarwal", role: "Founding Partner & Lead CS", bio: "Over 15 years of experience in corporate law restructuring, MCA compliance procedures, and NGO registries audits.", cred: "FCS, Institute of Company Secretaries of India" },
              { name: "Meera Malhotra, CA", role: "Tax Partner & Chief Auditor", bio: "Ex-Big 4 tax manager specializing in GST audits, corporate financial statement drafting, and income tax assessment disputes.", cred: "FCA, Institute of Chartered Accountants of India" },
              { name: "Sanjay Sharma", role: "Senior IP Partner & Trademark Counsel", bio: "Registered Patent & Trademark Attorney handling IP litigation, oppositions replies, and trademark objections replies.", cred: "LL.B (Delhi University), Bar Council of India" }
            ].map((tm, idx) => (
              <div className="team-card" key={idx}>
                <div className="team-avatar-placeholder"><i className="fas fa-user-tie"></i></div>
                <h3 className="team-name">{tm.name}</h3>
                <p className="team-role">{t(tm.role)}</p>
                <p className="team-bio">{t(tm.bio)}</p>
                <div className="team-credentials">{t(tm.cred)}</div>
              </div>
            ))}
          </div>

          <h2 className="team-section-title" style={{ fontSize: '20px', fontWeight: '700', color: 'var(--primary)', marginBottom: 'var(--s3)', textAlign: 'left' }}>{t("Advisors & Consultants")}</h2>
          <div className="team-grid">
            {[
              { name: "Anjali Verma", role: "Consultant — ISO Standards & Auditing", bio: "IRCA certified ISO Lead Auditor guiding corporate quality standards implementation and GAP analysis auditing.", cred: "ISO QMS & ISMS Lead Auditor Certified" },
              { name: "Vikram Aditya", role: "CS Consultant — ROC Compliance", bio: "Manages corporate governance filings, DIN KYC records, name amendments, and share transfers for private entities.", cred: "ACS, Institute of Company Secretaries of India" },
              { name: "Rahul Singhal", role: "Consultant — GST & Licenses Setup", bio: "Coordinates state approvals, FSSAI registration filings, import-export codes setup, and GST return verifications.", cred: "ACA, Associate Member - ICAI" }
            ].map((tm, idx) => (
              <div className="team-card" key={idx}>
                <div className="team-avatar-placeholder"><i className="fas fa-user-tie"></i></div>
                <h3 className="team-name">{tm.name}</h3>
                <p className="team-role">{t(tm.role)}</p>
                <p className="team-bio">{t(tm.bio)}</p>
                <div className="team-credentials">{t(tm.cred)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* ==========================================================================
   11. INDUSTRY COMPLIANCE DETAIL
   ========================================================================== */
const industryData = {
  'construction-compliance': {
    title: "Construction ISO Certification & Site Safety Compliance",
    label: "Infrastructure & Engineering",
    desc: "Mitigate high-risk site accidents, control subcontractor material standards, manage project timelines, and secure government tenders. We implement robust ISO 9001 and ISO 45001 safety and quality auditing frameworks across development zones.",
    auditor: "Dr. Alok Kumar Sen (MSR-AUD-0914)",
    date: "June 2026",
    definition: "Construction and Infrastructure ISO Compliance integrates quality assurance controls with strict occupational health and safety structures to mitigate site-level risk factors. Using the common high-level structures of ISO 9001 (QMS) and ISO 45001 (OHSMS), civil contractors and developers formalize risk assessments, subcontractor evaluations, machinery operating protocols, and workplace accident prevention guidelines.",
    qa: [
      { label: "Standard Scope", val: "ISO 9001 (QMS) & ISO 45001 (OHS)" },
      { label: "Regulatory Focus", val: "BOCW Act, National Building Code" },
      { label: "Auditing Focus", val: "Scaffolding, PPE compliance, Subcontractor logs" },
      { label: "Validity Period", val: "3 Years (Annual Site Audits Mandated)" }
    ],
    benefits: [
      { title: "Zero Incident Workplaces", desc: "HIRA checklists and daily toolbox talks drop site accident and injury rates, protecting human lives." },
      { title: "BOCW Act Shield", desc: "Ensures complete alignment with Building and Other Construction Workers Act rules, avoiding site closures." },
      { title: "Lower Insurance Premium", desc: "Audited ISO 45001 sites qualify for significant discount points on workmen compensation insurance." },
      { title: "Government Tender Wins", desc: "Fulfills the mandatory safety and quality pre-qualification codes for municipal and national bids." }
    ],
    docs: [
      "Hazard Identification & Risk Assessment (HIRA) Logs",
      "Site safety Plan and Fire Escape Layout Maps",
      "Concrete Slump & Cube Compressive Test Logs",
      "Subcontractor Quality & Safety Compliance Audits",
      "Crane & Lifting Equipment Structural Stability Logs",
      "Daily Toolbox Talk Logs and Accident Records"
    ],
    steps: [
      { step: "01", title: "Site Diagnostic Audit", desc: "We examine site layouts, scaffolding safety, electrical routing, and quality logs to map operational gaps against ISO standards." },
      { step: "02", title: "HIRA & Safety Plan Drafting", desc: "We compile the site-specific HIRA registry, write OHS safety manuals, design structural quality checklists, and draft emergency plans." },
      { step: "03", title: "Toolbox Talks & Worker Training", desc: "We train site engineers, supervisors, and labor forces on HIRA registers, PPE protocols, fall-protection controls, and fire escape paths." },
      { step: "04", title: "Mock Evacuation & Quality Audit", desc: "We run mock safety evacuations and audit subcontractor concrete checks to prepare the site files for registrar inspections." },
      { step: "05", title: "External Registrar Assessments", desc: "Accredited assessors conduct Stage 1 document reviews and Stage 2 site inspections. Certificate issuance follows upon resolution." }
    ]
  },
  'food-industry-compliance': {
    title: "Food Processing & Retail Quality ISO Compliance",
    label: "Food Safety & Quality Assurance",
    desc: "Achieve compliance under FSSAI rules, pass hygiene safety inspections, and secure customer trust. We implement ISO 22000 (FSMS) and HACCP frameworks.",
    auditor: "Ms. Shalini Gupta (MSR-AUD-0418)",
    date: "June 2026",
    definition: "Food Safety ISO Compliance (ISO 22000 & HACCP) ensures complete monitoring of the food supply chain from harvest to packaging, identifying biological, chemical, or physical hazards to guarantee food safety.",
    qa: [
      { label: "Standard Scope", val: "ISO 22000:2018 & HACCP Standards" },
      { label: "Regulatory Focus", val: "FSSAI Food Safety regulations" },
      { label: "Auditing Focus", val: "Storage temperature, contamination risk, hygiene logs" },
      { label: "Validity Period", val: "3 Years (Surveillance audits required annually)" }
    ],
    benefits: [
      { title: "Contamination Safety", desc: "Standard operating procedures reduce food spoilage and bacterial contamination risks to zero." },
      { title: "FSSAI Licensing Ease", desc: "Pre-audit files ensure FSSAI regulatory compliance audits are passed seamlessly." },
      { title: "Accredited Exports", desc: "Accredited FSMS directory listing enables international trade and retail supply contracts." },
      { title: "Brand Credibility", desc: "Build consumer trust by demonstrating commitment to food safety and hygiene protocols." }
    ],
    docs: [
      "Hazard Analysis Critical Control Point (HACCP) Plan",
      "Temperature Log Registers for Storage Rooms",
      "Employee hygiene training logs",
      "Water potability and testing certificates",
      "Festing pest control registers logs",
      "Supplier quality scorecards"
    ],
    steps: [
      { step: "01", title: "Hygiene Gap Assessment", desc: "We inspect facility storage rooms, packaging areas, and employee sanitation desks for food safety compliance." },
      { step: "02", title: "HACCP Manual Drafting", desc: "We structure critical control point thresholds, draft FSMS manuals, and formulate corrective action registers." },
      { step: "03", title: "Staff Sanitation Training", desc: "We train handlers on cross-contamination checks, waste management, and allergen controls." },
      { step: "04", title: "Registrar Audits", desc: "Accredited registrars conduct formal Stage 1 and Stage 2 food safety inspections to list the business." }
    ]
  },
  'healthcare-compliance': {
    title: "Pharma, Diagnostics & Healthcare ISO Compliance",
    label: "Clinical & Pharmaceutical",
    desc: "Maintain clinical audit standards, secure drug manufacturing licenses, and verify patient privacy controls. We implement ISO 13485 (Medical Devices) and ISO 9001 protocols.",
    auditor: "Dr. Vineet Malhotra (MSR-AUD-1102)",
    date: "June 2026",
    definition: "Healthcare and Medical Devices ISO Compliance (ISO 13485 & ISO 9001) coordinates clinical device design, sterile packaging, biological waste disposal, and patient data security under DPDP Act rules.",
    qa: [
      { label: "Standard Scope", val: "ISO 13485:2016 & ISO 9001" },
      { label: "Regulatory Focus", val: "CDSCO, Drugs & Cosmetics Act" },
      { label: "Auditing Focus", val: "Device sterility, patient privacy, waste logs" },
      { label: "Validity Period", val: "3 Years (Annual inspections mandated)" }
    ],
    benefits: [
      { title: "CDSCO Compliance", desc: "Drafting robust regulatory dossiers helps secure CDSCO manufacturing and sales licenses easily." },
      { title: "Sterility Assurance", desc: "Cleanroom protocols and validation checklists prevent device defects and batch rejection." },
      { title: "DPDP Data Protection", desc: "Align patient intake records with digital data protection guidelines, protecting privacy." },
      { title: "Global Device Exports", desc: "ISO 13485 is globally recognized, enabling CE marking and export of medical diagnostic tools." }
    ],
    docs: [
      "Device Design File & sterilization records",
      "Cleanroom validation logs",
      "Biomedical waste management disposal logs",
      "Staff clinical competence records",
      "Patient data consent and DPDP policy",
      "Calibration certificates for diagnostic devices"
    ],
    steps: [
      { step: "01", title: "Cleanroom & Operations Audit", desc: "We audit sterilization lines, device assembling setups, and data handling workflows for compliance." },
      { step: "02", title: "ISO 13485 Dossier Preparation", desc: "We draft quality management manuals, sterile packaging protocols, and validation files." },
      { step: "03", title: "Staff Bio-Safety Training", desc: "We train laboratory staff on disposal codes, data security, and calibration logs." },
      { step: "04", title: "Accreditation Checks", desc: "Accredited assessors perform on-site clinical and quality audits for registration." }
    ]
  },
  'it-services-compliance': {
    title: "IT/SaaS & Cloud Operations ISO Cyber Security Compliance",
    label: "Technology & Cyber Security",
    desc: "Secure enterprise SaaS pipelines, satisfy customer due diligence, and comply with the DPDP Act 2023. We deploy ISO 27001 (ISMS) and SOC2 mapping registries.",
    auditor: "Mr. Rajeev Mehta (MSR-AUD-0714)",
    date: "June 2026",
    definition: "IT and SaaS Cyber Security Compliance (ISO 27001 & SOC2) enforces logical access controls, databases encryption, regular vulnerability patching, and business continuity plans to mitigate cyber risks.",
    qa: [
      { label: "Standard Scope", val: "ISO 27001:2022 (ISMS) & SOC2" },
      { label: "Regulatory Focus", val: "DPDP Act 2023, CERT-In advisories" },
      { label: "Auditing Focus", val: "Access logs, database encryption, patch schedules" },
      { label: "Validity Period", val: "3 Years (Annual audits mandated)" }
    ],
    benefits: [
      { title: "DPDP Law Protection", desc: "Data protection mappings and consent screens shield your startup from heavy DPDP penalties." },
      { title: "Close Enterprise Deals", desc: "Pass vendor security checks of Fortune 500 enterprise customers with active ISMS credentials." },
      { title: "Prevent Cyber Breaches", desc: "Logical firewalls and encryption protocols secure critical database clusters from data theft." },
      { title: "Downtime Prevention", desc: "Disaster recovery hosting setups prevent website and application downtime during hardware crashes." }
    ],
    docs: [
      "Statement of Applicability (SoA) document",
      "Access control policies and user permissions log",
      "Vulnerability assessment (VAPT) reports",
      "Disaster recovery and backup test logs",
      "DPDP consent forms and website privacy policy",
      "Third-party vendor NDAs"
    ],
    steps: [
      { step: "01", title: "Vulnerability Scanning", desc: "We audit database setups, check port exposures, and run vulnerability scans across SaaS servers." },
      { step: "02", title: "ISMS Manual Drafting", desc: "We compile the Statement of Applicability, write data access logs, and set encryption parameters." },
      { step: "03", title: "Staff Access Auditing", desc: "We train internal IT engineers on safe coding practices, access control reviews, and backup schedules." },
      { step: "04", title: "Official Certification", desc: "Security registrars conduct Stage 1 and Stage 2 audits to verify implementation and issue the ISMS certificate." }
    ]
  },
  'logistics-compliance': {
    title: "Logistics, Warehousing & Fleet Transit ISO Compliance",
    label: "Logistics & Supply Chain",
    desc: "Optimize supply chain workflows, maintain warehousing climate controls, and qualify for port clearances. We implement ISO 9001 and ISO 28000 (Supply Chain Security).",
    auditor: "Mr. Harish Chandra (MSR-AUD-1019)",
    date: "June 2026",
    definition: "Logistics and Transit ISO Compliance establishes quality and security checks to manage fleet operations, temperature-sensitive cargo warehousing, custom permits, and vendor logistics checks.",
    qa: [
      { label: "Standard Scope", val: "ISO 9001 (QMS) & ISO 28000" },
      { label: "Regulatory Focus", val: "Motor Vehicles Act, Customs guidelines" },
      { label: "Auditing Focus", val: "Cold-chain temperature logs, transit permits, warehouse safety" },
      { label: "Validity Period", val: "3 Years (Annual surveillance audits mandated)" }
    ],
    benefits: [
      { title: "Reduced Transit Risks", desc: "Vehicle check-sheets and route safety protocols reduce delivery delays and cargo damage." },
      { title: "Cold-Chain Integrity", desc: "Climate control logs and alarm testing prevent spoilage of pharmaceutical and food items." },
      { title: "Custom Clearances Ease", desc: "ISO 28000 security credentials simplify Customs approvals and port transit protocols." },
      { title: "Supplier Selection Win", desc: "Accredited supply chain safety logs make your business a preferred partner for global cargo giants." }
    ],
    docs: [
      "Warehouse safety layouts and emergency maps",
      "Cold-chain temperature tracking charts",
      "Vehicle maintenance logs and permit files",
      "Driver safety compliance registers",
      "Cargo loading and cargo seal logs",
      "Supplier service agreements"
    ],
    steps: [
      { step: "01", title: "Warehouse Gap Audit", desc: "We audit warehousing spaces, inspect fire routes, and review vehicle fitness records." },
      { step: "02", title: "SOP & Log Drafting", desc: "We draft climate monitoring manuals, fleet route maps, and vendor compliance files." },
      { step: "03", title: "Driver Safety Briefing", desc: "We train transit drivers and loaders on cargo security, cargo seals, and accident logs." },
      { step: "04", title: "Registrar Review", desc: "Accredited auditors verify supply chain security implementation for listing." }
    ]
  },
  'manufacturing-compliance': {
    title: "Heavy Manufacturing & Assembly ISO Compliance",
    label: "Industrial Manufacturing",
    desc: "Minimize environmental waste discharge, protect floor labor from accidents, and optimize machinery throughput. We implement ISO 9001, ISO 14001, and ISO 45001.",
    auditor: "Dr. Sandeep Vardhan (MSR-AUD-0824)",
    date: "June 2026",
    definition: "Heavy Manufacturing and Factory Compliance integrates Quality (QMS), Environment (EMS), and Safety (OHSMS) into a unified Integrated Management System (IMS) to regulate manufacturing lines.",
    qa: [
      { label: "Standard Scope", val: "ISO 9001 (QMS), ISO 14001 & ISO 45001 (IMS)" },
      { label: "Regulatory Focus", val: "Factories Act 1948, State Pollution Control Board" },
      { label: "Auditing Focus", val: "Emissions data, machine safety, LOTO protocols, waste treatment" },
      { label: "Validity Period", val: "3 Years (Annual inspections mandated)" }
    ],
    benefits: [
      { title: "SPCB Clearance Success", desc: "A robust Environmental Management System (EMS) makes securing SPCB renewals and Consent to Operate simple." },
      { title: "Lower Downtime Rates", desc: "Lock-Out Tag-Out (LOTO) and machine guarding protocols prevent factory floor accidents and downtime." },
      { title: "Zero Defect Production", desc: "First-pass yield (FPY) checklists and process calibration optimize raw material consumption." },
      { title: "Corporate OEM Approval", desc: "Large OEMs and automotive brands mandate IMS certifications for their Tier-1 and Tier-2 suppliers." }
    ],
    docs: [
      "Environmental Aspect-Impact Registry",
      "Machinery calibration logs",
      "Consent to Operate (CTO) certificate from SPCB",
      "LOTO machinery isolation logs",
      "Factory floor safety maps and PPE logs",
      "Hazardous waste treatment agreements"
    ],
    steps: [
      { step: "01", title: "Factory Floor Assessment", desc: "We audit machine lines, check emissions outlets, and inspect hazard control setups." },
      { step: "02", title: "IMS Documentation", desc: "We compile Aspect-Impact registers, draft safety manuals, and write process calibration SOPs." },
      { step: "03", title: "Floor Safety Briefings", desc: "We train supervisors and technicians on emergency shutdowns, SPCB limits, and LOTO steps." },
      { step: "04", title: "Registrar Assessments", desc: "Auditors inspect factory documents and run floor reviews to release certification." }
    ]
  }
};

export function IndustryCompliancePage({ id }) {
  const { t } = useLanguage();
  const data = industryData[id];

  if (!data) return <div className="container centered" style={{ padding: '40px' }}><p>{t("Industry data not found.")}</p></div>;

  return (
    <>
      <section className="svc-page-hero">
        <div className="svc-hero-inner">
          <div>
            <div className="breadcrumb">
              <Link href="/">{t("Home")}</Link> <i className="fas fa-chevron-right"></i> <Link href="/industries/">{t("Industries")}</Link>
              <i className="fas fa-chevron-right"></i> <span>{t(data.label)}</span>
            </div>
            <div className="svc-cat-badge" style={{ background: '#E0F2F1', borderColor: 'rgba(0, 150, 136, 0.2)', color: '#00796B' }}>
              <i className="fas fa-industry"></i> {t(data.label)}
            </div>
            <h1 className="svc-page-title" id="svc-title" style={{ fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: '800', color: 'var(--primary)', marginTop: 'var(--s2)' }}>{t(data.title)}</h1>
            <p className="svc-page-subtitle" id="svc-desc" style={{ marginTop: '12px', fontSize: '15px', color: 'var(--text-muted)', lineHeight: '1.7' }}>{t(data.desc)}</p>
            <div className="svc-meta-row" style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginTop: 'var(--s3)' }}>
              <div className="svc-meta-item">
                <span className="svc-meta-label">{t("Audit Standards")}</span>
                <span className="svc-meta-value" style={{ fontWeight: 700 }}>{data.qa[0].val}</span>
              </div>
              <div className="svc-meta-divider"></div>
              <div className="svc-meta-item">
                <span className="svc-meta-label">{t("Accreditation Scope")}</span>
                <span className="svc-meta-value gold" style={{ color: 'var(--accent)', fontWeight: 700 }}>{t("National & International")}</span>
              </div>
            </div>
          </div>

          <div className="svc-sidebar">
            <div className="svc-sidebar-card">
              <div className="sscard-header">
                <div className="sscard-price-label">{t("Advisory Model")}</div>
                <div className="sscard-price" id="sscard-price">{t("Quote on Request")}</div>
                <div className="sscard-price-note">{t("Gap Audit & Implementation Included")}</div>
              </div>
              <div className="sscard-body">
                {data.qa.map((q, idx) => (
                  <div className="sscard-detail-row" key={idx}>
                    <span className="sscard-detail-label">{t(q.label)}</span>
                    <span className="sscard-detail-value">{t(q.val)}</span>
                  </div>
                ))}
              </div>
              <div className="sscard-cta">
                <button className="btn btn-md btn-accent" onClick={() => {
                  const modal = document.getElementById('inquiry-modal');
                  if (modal) modal.classList.add('open');
                }} style={{ width: '100%', justifyContent: 'center' }}>{t("Get Site Audit Quote")}</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="svc-body-section">
        <div className="svc-body-inner">
          <div className="svc-body-main">
            <div style={{ background: 'var(--bg-alt)', border: '1px solid var(--border-solid)', borderRadius: 'var(--r-md)', padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--s4)', fontSize: '13px', color: 'var(--text-muted)', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <i className="fas fa-user-shield" style={{ color: 'var(--accent)', marginRight: '6px' }}></i> {t("Verified by Safety Auditor:")} <strong>{data.auditor}</strong>
              </div>
              <div>
                <i className="far fa-calendar-check" style={{ color: 'var(--accent)', marginRight: '6px' }}></i> {t("Last Reviewed:")} <strong>{t(data.date)}</strong>
              </div>
            </div>

            <div className="definition-block" style={{ padding: 'var(--s3)', borderLeft: '4px solid var(--primary)', background: 'var(--bg-alt)', borderRadius: 'var(--r-sm)', marginBottom: 'var(--s4)' }}>
              <p style={{ fontSize: '14.5px', color: 'var(--text-muted)', lineHeight: '1.75' }}>{t(data.definition)}</p>
            </div>

            <div className="svc-content-section" style={{ marginTop: 'var(--s5)' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--primary)', marginBottom: 'var(--s3)' }}><i className="fas fa-arrow-up-right-dots"></i> {t("Core Auditing Benefits")}</h3>
              <div className="benefits-grid">
                {data.benefits.map((b, idx) => (
                  <div className="benefit-item" key={idx}>
                    <div className="benefit-icon"><i className="fas fa-check-circle"></i></div>
                    <div>
                      <h5 className="benefit-title">{t(b.title)}</h5>
                      <p className="benefit-desc">{t(b.desc)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="svc-content-section" style={{ marginTop: 'var(--s5)' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--primary)', marginBottom: 'var(--s3)' }}><i className="fas fa-file-shield"></i> {t("Required Document Dossier")}</h3>
              <div className="docs-list" id="svc-docs-list">
                {data.docs.map((doc, idx) => (
                  <div className="doc-item" key={idx}><i className="fas fa-file-invoice"></i> {t(doc)}</div>
                ))}
              </div>
            </div>

            <div className="svc-content-section" style={{ marginTop: 'var(--s5)' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--primary)', marginBottom: 'var(--s3)' }}><i className="fas fa-route"></i> {t("Auditing & Implementation Roadmap")}</h3>
              <div className="process-steps">
                {data.steps.map((step, idx) => (
                  <div className="ps-item" key={idx}>
                    <div className="ps-node">{step.step}</div>
                    <div className="ps-body">
                      <div className="ps-title">{t(step.title)}</div>
                      <p className="ps-desc">{t(step.desc)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ==========================================================================
   12. LOCATION CERTIFICATION DETAIL
   ========================================================================== */
const locationData = {
  'iso-certification-delhi': {
    city: "Delhi NCR",
    desc: "Accredited ISO Quality, Safety, and Cyber Security Certifications in Delhi, Gurugram, Noida, and Faridabad. Fast gap analysis and registration under IAS and IAF guidelines.",
    text: "MSR Assessment Pvt Ltd serves as Delhi NCR's leading registrar consulting firm. We assist local startups, heavy factories in Okhla/Narela, and technology SaaS firms in Gurugram to secure accredited ISO certificates within 7 to 10 working days, protecting credentials on global directories."
  },
  'iso-certification-mumbai': {
    city: "Mumbai",
    desc: "Accredited ISO quality and security standards certification services in Mumbai, Navi Mumbai, and Thane. Fast gap audits and registrations under IAF directories.",
    text: "MSR Assessment Pvt Ltd is Mumbai's trusted partner for compliance audits. We help logistics operators, corporate BFSI setups in BKC, and exporters to implement ISO 9001 and ISO 27001 systems seamlessly with fixed professional rates."
  },
  'iso-certification-bengaluru': {
    city: "Bengaluru",
    desc: "Accredited ISO Quality, Cyber Security, and Environmental Standards in Bengaluru. Streamlined audit assessments for IT/SaaS startups and manufacturers.",
    text: "MSR Assessment Pvt Ltd assists Bengaluru's technology hubs in Whitefield, Electronic City, and Koramangala to secure ISO 27001 (ISMS) and ISO 9001 certifications. We customize Statement of Applicability audits and data security registers to help startups pass international vendor reviews."
  }
};

export function LocationCertPage({ id }) {
  const { t } = useLanguage();
  const data = locationData[id];

  if (!data) return <div className="container centered" style={{ padding: '40px' }}><p>{t("Location data not found.")}</p></div>;

  return (
    <section className="section" style={{ padding: 'var(--s8) 0' }}>
      <div className="container" style={{ maxWidth: '800px', textAlign: 'left' }}>
        <div className="breadcrumb" style={{ display: 'flex', gap: '6px', fontSize: '12px', color: 'var(--text-faint)', marginBottom: '14px' }}>
          <Link href="/">{t("Home")}</Link>
          <span>/</span>
          <span>{t("Locations")}</span>
        </div>
        <h1 className="t-h1" style={{ color: 'var(--primary)', marginBottom: 'var(--s3)', fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: '800' }}>{t("ISO Certification in")} {t(data.city)}</h1>
        <p className="t-body-lg" style={{ color: 'var(--accent)', fontWeight: 600, marginBottom: 'var(--s4)' }}>{t(data.desc)}</p>

        <div className="t-body" style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '15px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p>{t(data.text)}</p>
          <p>{t("Our auditing process is fully digitalized to eliminate office visits. MSR lead assessors handle the complete gap assessment, documentation design, and external Stage 1/Stage 2 reviews, ensuring 100% success rate with IAF accredited certificate listings.")}</p>
        </div>

        <div className="expert-card" style={{ marginTop: 'var(--s5)' }}>
          <h4 style={{ color: 'var(--primary)', fontWeight: '700', marginBottom: 'var(--s2)' }}>{t("Start Auditing Setup Today")}</h4>
          <p style={{ fontSize: '13.5px', color: 'var(--text-muted)' }}>{t("Contact our central processing desk to get connected with a localized IRCA lead auditor for your corporate standard.")}</p>
          <button className="btn btn-md btn-primary" onClick={() => {
            const modal = document.getElementById('inquiry-modal');
            if (modal) modal.classList.add('open');
          }} style={{ marginTop: '14px' }}>{t("Talk to a Lead Auditor")}</button>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   13. REFUND POLICY PAGE
   ========================================================================== */
export function RefundPolicyPage() {
  const { t } = useLanguage();
  return (
    <section className="section" style={{ padding: 'var(--s8) 0' }}>
      <div className="container" style={{ maxWidth: '800px', textAlign: 'left' }}>
        <h1 className="t-h1 centered" style={{ color: 'var(--primary)', marginBottom: 'var(--s4)' }}>{t("Refund Policy")}</h1>
        <p className="t-sm" style={{ color: 'var(--text-faint)', marginBottom: 'var(--s4)' }}>{t("Last Updated: June 2026")}</p>

        <div className="t-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: 'var(--text-muted)', lineHeight: '1.7' }}>
          <p>{t("At MSR Assessment Pvt Ltd, we strive to provide high-quality corporate services, including ISO certification facilitation, trademark registration, company incorporation, and tax filings. Since our services involve government statutory filings and professional resource allocation, refunds are processed according to the terms below.")}</p>

          <h3 style={{ color: 'var(--primary)', fontSize: '18px', fontWeight: '700', marginTop: '12px' }}>1. Refund Eligibility</h3>
          <p>{t("Refund requests are evaluated based on the stage of the service:")}</p>
          <ul style={{ paddingLeft: '20px', listStyleType: 'disc', margin: '10px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li>{t("If a refund request is made before any professional work has started or before any application is prepared, a full refund (minus a 10% processing fee) will be issued.")}</li>
            <li>{t("Once our legal/accounting team has initiated the document drafting, trademark search, or gap analysis, only a partial refund (up to 50% of the professional fee) may be considered.")}</li>
            <li>{t("No refunds are provided once application forms have been submitted to government portals (MCA, GSTN, IP India, etc.) or once registration fees/stamp duties have been paid to statutory authorities.")}</li>
          </ul>

          <h3 style={{ color: 'var(--primary)', fontSize: '18px', fontWeight: '700', marginTop: '12px' }}>2. Government Fees</h3>
          <p>{t("Statutory fees, stamp duties, and government portal charges paid to the Ministry of Corporate Affairs, Trademark Registry, GST Department, or other government bodies are completely non-refundable, as these are paid directly to the government on your behalf.")}</p>

          <h3 style={{ color: 'var(--primary)', fontSize: '18px', fontWeight: '700', marginTop: '12px' }}>3. Processing of Refunds</h3>
          <p>{t("Approved refunds will be processed within 7-10 business days and credited to the original payment source (bank account, card, or UPI wallet) used during checkout.")}</p>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   14. COOKIE POLICY PAGE
   ========================================================================== */
export function CookiePolicyPage() {
  const { t } = useLanguage();
  return (
    <section className="section" style={{ padding: 'var(--s8) 0' }}>
      <div className="container" style={{ maxWidth: '800px', textAlign: 'left' }}>
        <h1 className="t-h1 centered" style={{ color: 'var(--primary)', marginBottom: 'var(--s4)' }}>{t("Cookie Policy")}</h1>
        <p className="t-sm" style={{ color: 'var(--text-faint)', marginBottom: 'var(--s4)' }}>{t("Last Updated: June 2026")}</p>

        <div className="t-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: 'var(--text-muted)', lineHeight: '1.7' }}>
          <p>{t("MSR Assessment Pvt Ltd uses cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and understand user preferences. This Cookie Policy explains what cookies are and how you can manage them.")}</p>

          <h3 style={{ color: 'var(--primary)', fontSize: '18px', fontWeight: '700', marginTop: '12px' }}>1. What are Cookies?</h3>
          <p>{t("Cookies are small text files stored on your browser or device when you visit a website. They help the site recognize your device, remember preferences, and optimize site functionality.")}</p>

          <h3 style={{ color: 'var(--primary)', fontSize: '18px', fontWeight: '700', marginTop: '12px' }}>2. Types of Cookies We Use</h3>
          <ul style={{ paddingLeft: '20px', listStyleType: 'disc', margin: '10px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li><strong>{t("Necessary Cookies:")}</strong> {t("Essential for core website operation, such as managing your session, language settings, and secure payment pathways.")}</li>
            <li><strong>{t("Analytical/Performance Cookies:")}</strong> {t("Help us count visits and traffic sources so we can measure and improve website performance.")}</li>
            <li><strong>{t("Functional Cookies:")}</strong> {t("Used to remember selections you make (such as locale selections) to provide a more personalized experience.")}</li>
          </ul>

          <h3 style={{ color: 'var(--primary)', fontSize: '18px', fontWeight: '700', marginTop: '12px' }}>3. Managing Your Cookie Preferences</h3>
          <p>{t("Most web browsers automatically accept cookies, but you can modify your browser settings to block cookies or notify you when a cookie is set. Please note that blocking essential cookies may affect website functionality.")}</p>
        </div>
      </div>
    </section>
  );
}

