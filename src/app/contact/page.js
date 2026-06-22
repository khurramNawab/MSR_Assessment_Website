"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') {
      const filtered = value.replace(/[^A-Za-z\s\.]/g, "");
      setFormData({ ...formData, [name]: filtered });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      alert("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        access_key: "4e92a331-2386-417d-ad39-6f3c17dee60d",
        from_name: "MSR Assessment Contact Page",
        subject: `New Contact Form Submission from ${formData.name}`,
        ...formData
      };

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      if (result.success) {
        // Show Toast
        const toast = document.getElementById('toast');
        const toastMsg = document.getElementById('toast-msg');
        if (toast && toastMsg) {
          toastMsg.textContent = t("Sent successfully!");
          toast.classList.add('show');
          setTimeout(() => toast.classList.remove('show'), 4000);
        }
        
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          message: ''
        });
      } else {
        alert("Submission failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <main id="main-content" style={{ paddingTop: 'calc(38px + 104px)' }}>
        {/* CONTACT WRAPPER */}
        <section className="section" style={{ background: 'var(--bg-card)' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 'var(--s8)', alignItems: 'start' }}>
              {/* Left: Contact info */}
              <div>
                <span className="t-label">{t("Advisory Desk")}</span>
                <h1 className="t-h1" style={{ color: 'var(--primary)', marginTop: 'var(--s2)', marginBottom: 'var(--s3)' }}>
                  {t("Request a Compliance Evaluation")}
                </h1>
                <p className="t-body" style={{ marginBottom: 'var(--s4)', lineHeight: 1.7 }}>
                  {t("Connect directly with our Lead Auditor registry. Whether you are executing a gap review, planning an audit timeline, or seeking certificate details, our central processing unit handles queries within 2 hours.")}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s3)' }}>
                  <div style={{ display: 'flex', gap: 'var(--s2)', alignItems: 'flex-start' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: 'var(--r-sm)', background: 'var(--accent-pale)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0 }}>
                      <i className="fas fa-location-dot"></i>
                    </div>
                    <div>
                      <h4 style={{ fontSize: '14.5px', fontWeight: 700, color: 'var(--primary)', marginBottom: '4px' }}>
                        {t("Headquarters Address")}
                      </h4>
                      <p className="t-sm" style={{ margin: 0, lineHeight: 1.5 }}>
                        {t("2ND FLOOR, 23 A, ROYD STREET, P.S, Park St, Kolkata, West Bengal 700016.")}
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 'var(--s2)', alignItems: 'flex-start' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: 'var(--r-sm)', background: 'var(--accent-pale)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0 }}>
                      <i className="fas fa-phone"></i>
                    </div>
                    <div>
                      <h4 style={{ fontSize: '14.5px', fontWeight: 700, color: 'var(--primary)', marginBottom: '4px' }}>
                        {t("Helpline Hotline")}
                      </h4>
                      <p className="t-sm" style={{ margin: 0, lineHeight: 1.5 }}>
                        <a href="tel:+918337004170" style={{ color: 'var(--primary)', fontWeight: 700 }}>+91 83370 04170</a>
                        &nbsp;({t("9:30 AM to 6:30 PM IST")})
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 'var(--s2)', alignItems: 'flex-start' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: 'var(--r-sm)', background: 'var(--accent-pale)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0 }}>
                      <i className="fas fa-envelope"></i>
                    </div>
                    <div>
                      <h4 style={{ fontSize: '14.5px', fontWeight: 700, color: 'var(--primary)', marginBottom: '4px' }}>
                        {t("Official Audit Enquiries")}
                      </h4>
                      <p className="t-sm" style={{ margin: 0, lineHeight: 1.5 }}>
                        <a href="mailto:admin@msrassessment.com" style={{ color: 'var(--primary)', fontWeight: 700 }}>
                          admin@msrassessment.com
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social badge */}
                <div style={{ marginTop: 'var(--s5)', borderTop: '1px solid var(--border-solid)', paddingTop: 'var(--s3)' }}>
                  <span className="t-xs" style={{ textTransform: 'uppercase', fontWeight: 700, color: 'var(--text-faint)' }}>
                    {t("Connect Globally")}
                  </span>
                  <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    <a href="https://wa.me/918337004170?text=Hello%20MSR%20Assessment%20Team%2C%20I%20would%20like%20to%20know%20more%20about%20your%20services." className="btn btn-sm btn-accent" style={{ borderRadius: 'var(--r-sm)', fontSize: '12.5px' }}>
                      <i className="fab fa-whatsapp"></i> {t("WhatsApp Consulting Desk")}
                    </a>
                  </div>
                </div>
              </div>

              {/* Right: CRO form block */}
              <div style={{ background: 'var(--bg-alt)', border: '1px solid var(--border-solid)', borderRadius: 'var(--r-xl)', padding: 'var(--s4)', boxShadow: 'var(--sh-md)' }}>
                <h3 className="t-h3" style={{ color: 'var(--primary)', marginBottom: '6px' }}>{t("Request fixed-price audit quote")}</h3>
                <p className="t-sm" style={{ marginBottom: 'var(--s3)' }}>{t("Enter your project details below to receive compliance roadmaps.")}</p>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label htmlFor="ct-name" style={{ fontSize: '12px', fontWeight: 700, color: 'var(--primary)' }}>
                      {t("Full Name")} <span style={{ color: '#C0392B' }}>*</span>
                    </label>
                    <input 
                      type="text" 
                      id="ct-name" 
                      name="name" 
                      required 
                      placeholder={t("Rajesh Sharma")} 
                      style={{ padding: '12px', borderRadius: 'var(--r-sm)', border: '1px solid var(--border-solid)', outline: 'none' }}
                      value={formData.name} 
                      onChange={handleInputChange} 
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--s2)' }}>
                    <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <label htmlFor="ct-phone" style={{ fontSize: '12px', fontWeight: 700, color: 'var(--primary)' }}>
                        {t("Phone Number")} <span style={{ color: '#C0392B' }}>*</span>
                      </label>
                      <input 
                        type="tel" 
                        id="ct-phone" 
                        name="phone" 
                        required 
                        placeholder="+91 98765 43210" 
                        style={{ padding: '12px', borderRadius: 'var(--r-sm)', border: '1px solid var(--border-solid)', outline: 'none' }}
                        value={formData.phone} 
                        onChange={handleInputChange} 
                      />
                    </div>
                    <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <label htmlFor="ct-email" style={{ fontSize: '12px', fontWeight: 700, color: 'var(--primary)' }}>
                        {t("Corporate Email")} <span style={{ color: '#C0392B' }}>*</span>
                      </label>
                      <input 
                        type="email" 
                        id="ct-email" 
                        name="email" 
                        required 
                        placeholder="rajesh@company.com" 
                        style={{ padding: '12px', borderRadius: 'var(--r-sm)', border: '1px solid var(--border-solid)', outline: 'none' }}
                        value={formData.email} 
                        onChange={handleInputChange} 
                      />
                    </div>
                  </div>
                  <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label htmlFor="ct-service" style={{ fontSize: '12px', fontWeight: 700, color: 'var(--primary)' }}>
                      {t("Accreditation Required")}
                    </label>
                    <select 
                      id="ct-service" 
                      name="service" 
                      required
                      style={{ padding: '12px', borderRadius: 'var(--r-sm)', border: '1px solid var(--border-solid)', background: 'white' }}
                      value={formData.service} 
                      onChange={handleInputChange}
                    >
                      <option value="">{t("Select standard...")}</option>
                      <option>ISO 9001 (Quality Control)</option>
                      <option>ISO 14001 (Environmental Management)</option>
                      <option>ISO 27001 (Data & Cyber Security)</option>
                      <option>ISO 45001 (Occupational Health & Safety)</option>
                      <option>ISO 22000 (Food Quality Systems)</option>
                      <option>ISO 13485 (Medical Devices Quality)</option>
                      <option>Internal Audit / Gap Assessment</option>
                      <option>Compliance Advisory</option>
                    </select>
                  </div>
                  <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label htmlFor="ct-message" style={{ fontSize: '12px', fontWeight: 700, color: 'var(--primary)' }}>
                      {t("Brief Description of Operations")}
                    </label>
                    <textarea 
                      id="ct-message" 
                      name="message" 
                      rows="3" 
                      placeholder={t("Tell us about your industry sector, number of offices, and target timeline...")} 
                      style={{ padding: '12px', borderRadius: 'var(--r-sm)', border: '1px solid var(--border-solid)', resize: 'none' }}
                      value={formData.message} 
                      onChange={handleInputChange} 
                    />
                  </div>
                  <button type="submit" className="btn btn-md btn-primary" style={{ justifyContent: 'center', width: '100%', fontWeight: 700, padding: '14px' }} disabled={isSubmitting}>
                    {isSubmitting ? t("Sending...") : <>{t("Send Inquiry to Auditor")} <i className="fas fa-arrow-right" style={{ marginLeft: '6px' }}></i></>}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* RESPONSE PROMISE */}
        <section className="section" style={{ background: 'var(--bg-alt)', borderTop: '1px solid var(--border-solid)', borderBottom: '1px solid var(--border-solid)' }}>
          <div className="container" style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <i className="far fa-circle-check" style={{ fontSize: '38px', color: 'var(--success)', marginBottom: 'var(--s2)' }}></i>
            <h3 className="t-h3" style={{ color: 'var(--primary)' }}>{t("The MSR Response Promise")}</h3>
            <p className="t-sm" style={{ lineHeight: 1.7, maxWidth: '680px', margin: '10px auto 0' }}>
              {t("All requests are directly routed to our certified auditor panel. We do not use automated bot filters. An expert assessor will contact you to align scope, coordinate gap analysis, and provide transparent fixed-price quotes.")}
            </p>
          </div>
        </section>

        {/* GOOGLE MAP EMBED */}
        <section className="section" style={{ background: 'var(--bg-card)', padding: 'var(--s4) 0 var(--s8)' }} aria-label="Office Location Map">
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 'var(--s4)' }}>
              <span className="t-label">{t("Find Us")}</span>
              <h2 className="t-h2" style={{ color: 'var(--primary)', marginTop: 'var(--s2)' }}>{t("Our Head Office Location")}</h2>
            </div>
            <div style={{ borderRadius: 'var(--r-xl)', overflow: 'hidden', border: '1px solid var(--border-solid)', height: '400px', width: '100%', boxShadow: 'var(--sh-md)' }}>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.5828859737525!2d88.35418107598818!3d22.557306833538804!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0277085c8297b1%3A0xe54e60df43d4d420!2s23a%2C%20Royd%20St%2C%20Taltala%2C%20Kolkata%2C%20West%20Bengal%20700016!5e0!3m2!1sen!2sin!4v1718712345678!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="MSR Assessment Head Office Map Location"
              ></iframe>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
