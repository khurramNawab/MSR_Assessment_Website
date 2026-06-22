"use client";

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function InquiryModal() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    service_interested: 'General Website Inquiry'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClose = () => {
    const modal = document.getElementById('inquiry-modal');
    if (modal) modal.classList.remove('open');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') {
      // Name validation: restrict to alphabets, dots, spaces
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
        access_key: "4e92a331-2386-417d-ad39-6f3c17dee60d", // Web3Forms key from mailer.js
        from_name: "MSR Assessment Website (React)",
        subject: `New Inquiry from ${formData.name} - MSR Assessment`,
        ...formData,
        message_body: `
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Service: ${formData.service_interested}
Message: ${formData.message}
        `.trim()
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
          toastMsg.textContent = t("Sent successfully! Our expert will contact you within 2 hours.");
          toast.classList.add('show');
          setTimeout(() => toast.classList.remove('show'), 4000);
        }
        
        // Reset Form
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          service_interested: 'General Website Inquiry'
        });
        
        // Close Modal
        setTimeout(handleClose, 1200);
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
    <div id="inquiry-modal" className="modal-overlay" role="dialog" aria-modal="true" onClick={(e) => { if(e.target.id === 'inquiry-modal') handleClose(); }}>
      <div className="modal-box">
        <div className="modal-header">
          <div>
            <h2 className="modal-title">{t("Talk To An Expert")}</h2>
            <p className="modal-subtitle">{t("Our team will respond within 2 business hours.")}</p>
          </div>
          <button className="modal-close" onClick={handleClose} aria-label="Close">
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="modal-body">
          <form id="inquiry-form" onSubmit={handleSubmit}>
            <input type="hidden" name="service_interested" value={formData.service_interested} />
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="inq-name">{t("Full Name *")}</label>
                <input 
                  type="text" 
                  id="inq-name" 
                  name="name" 
                  required 
                  placeholder={t("Rajesh Sharma")} 
                  value={formData.name} 
                  onChange={handleInputChange} 
                />
              </div>
              <div className="form-group">
                <label htmlFor="inq-phone">{t("Phone *")}</label>
                <input 
                  type="tel" 
                  id="inq-phone" 
                  name="phone" 
                  required 
                  placeholder="+91 98765 43210" 
                  value={formData.phone} 
                  onChange={handleInputChange} 
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="inq-email">{t("Email Address *")}</label>
              <input 
                type="email" 
                id="inq-email" 
                name="email" 
                required 
                placeholder="rajesh@yourcompany.com" 
                value={formData.email} 
                onChange={handleInputChange} 
              />
            </div>
            <div className="form-group">
              <label htmlFor="inq-message">{t("Your Requirement")}</label>
              <textarea 
                id="inq-message" 
                name="message" 
                rows="4" 
                placeholder={t("Tell us what you need...")} 
                value={formData.message} 
                onChange={handleInputChange} 
              />
            </div>
            <button type="submit" className="btn-submit" disabled={isSubmitting}>
              {isSubmitting ? <><i className="fas fa-spinner fa-spin"></i> {t("Sending...")}</> : <>{t("Submit Inquiry")} <i className="fas fa-arrow-right"></i></>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
