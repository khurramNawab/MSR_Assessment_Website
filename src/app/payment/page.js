"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function Payment() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    txid: '',
    amount: '',
    notes: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') {
      const filtered = value.replace(/[^A-Za-z\s\.]/g, "");
      setFormData({ ...formData, [name]: filtered });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.txid && formData.amount) {
      // Show Success Toast
      const toast = document.getElementById('toast');
      const toastMsg = document.getElementById('toast-msg');
      if (toast && toastMsg) {
        toastMsg.textContent = t("Transaction logged! Our accounts team will verify shortly.");
        toast.classList.add('show');
        setTimeout(() => {
          toast.classList.remove('show');
        }, 4000);
      }
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        txid: '',
        amount: '',
        notes: ''
      });
    }
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      const toast = document.getElementById('toast');
      const toastMsg = document.getElementById('toast-msg');
      if (toast && toastMsg) {
        toastMsg.textContent = t("Copied to clipboard!");
        toast.classList.add('show');
        setTimeout(() => {
          toast.classList.remove('show');
        }, 2000);
      }
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  return (
    <>
      {/* Hero */}
      <section className="payment-hero">
        <div className="payment-hero-wrap">
          <div className="breadcrumb" style={{ display: 'flex', justifyContent: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-faint)', marginBottom: '14px' }}>
            <Link href="/" style={{ color: 'var(--primary)', textDecoration: 'none' }}>{t("Home")}</Link>
            <span>/</span>
            <span>{t("Secure Payment")}</span>
          </div>
          <h1 className="payment-hero-title">{t("Secure Billing & Settlement")}</h1>
          <p className="payment-hero-desc">
            {t("Execute secure corporate bank transfers, B2B wire settlements, or scan via UPI. Please report your transaction details below for automated compliance tracking.")}
          </p>
        </div>
      </section>

      {/* Instant Online Payment CTA */}
      <div style={{ maxWidth: 'var(--content-w)', margin: 'var(--s4) auto -20px', padding: '0 var(--s5)', position: 'relative', zIndex: 10 }}>
        <div style={{ background: 'linear-gradient(135deg, var(--bg-dark) 0%, var(--bg-dark-2) 100%)', borderRadius: 'var(--r-xl)', padding: 'var(--s4) var(--s5)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--s3)', flexWrap: 'wrap', boxShadow: 'var(--sh-lg)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <div style={{ flex: 1, minWidth: '280px' }}>
            <span className="t-label" style={{ color: 'var(--accent-light)', marginBottom: '4px', display: 'inline-block' }}>{t("Instant Settlement")}</span>
            <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '24px', fontWeight: 700, color: 'white', marginBottom: '6px' }}>{t("Pay Instantly")}</h3>
            <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.8)' }}>{t("Settle your invoice securely using Credit/Debit Cards, UPI, Netbanking, or Corporate Wallets with immediate receipt confirmation.")}</p>
          </div>
          <Link href="/buy/" className="btn btn-md btn-accent" style={{ color: 'white', fontWeight: 700 }}>
            {t("Proceed to Pay Online")} <i className="fas fa-credit-card" style={{ marginLeft: '6px' }}></i>
          </Link>
        </div>
      </div>

      {/* Payment Details */}
      <section className="payment-section">
        <div className="payment-grid">
          {/* Bank Account Details Card */}
          <div className="pay-card">
            <div className="pay-card-header">
              <div className="pay-card-icon"><i className="fas fa-building-columns"></i></div>
              <div>
                <h2 className="pay-card-title">{t("B2B Corporate Wire")}</h2>
                <div className="pay-card-subtitle">{t("For NEFT / RTGS / IMPS Settlements")}</div>
              </div>
            </div>

            <div className="bank-details">
              <div className="bank-row">
                <span className="bank-label">Beneficiary Name</span>
                <span className="bank-value">
                  MSR Assessment Private Limited.
                  <button className="copy-btn" onClick={() => copyText('MSR Assessment Private Limited.')}><i className="far fa-copy"></i> Copy</button>
                </span>
              </div>
              <div className="bank-row">
                <span className="bank-label">Bank Name</span>
                <span className="bank-value">
                  HDFC BANK
                  <button className="copy-btn" onClick={() => copyText('HDFC BANK')}><i className="far fa-copy"></i> Copy</button>
                </span>
              </div>
              <div className="bank-row">
                <span className="bank-label">Account Number</span>
                <span className="bank-value">
                  50200073444028
                  <button className="copy-btn" onClick={() => copyText('50200073444028')}><i className="far fa-copy"></i> Copy</button>
                </span>
              </div>
              <div className="bank-row">
                <span className="bank-label">IFSC Code</span>
                <span className="bank-value" style={{ color: 'var(--accent)' }}>
                  HDFC0000693
                  <button className="copy-btn" onClick={() => copyText('HDFC0000693')}><i className="far fa-copy"></i> Copy</button>
                </span>
              </div>
              <div className="bank-row">
                <span className="bank-label">Account Type</span>
                <span className="bank-value">
                  Current Account
                  <button className="copy-btn" onClick={() => copyText('Current Account')}><i className="far fa-copy"></i> Copy</button>
                </span>
              </div>
              <div className="bank-row">
                <span className="bank-label">Branch Address</span>
                <span className="bank-value">
                  KOLKATA - PARK STREET
                  <button className="copy-btn" onClick={() => copyText('KOLKATA - PARK STREET')}><i className="far fa-copy"></i> Copy</button>
                </span>
              </div>
            </div>
          </div>

          {/* UPI QR Code Card */}
          <div className="qr-card">
            <div className="pay-card-header" style={{ border: 'none', paddingBottom: 0 }}>
              <div className="pay-card-icon" style={{ background: 'var(--accent)' }}><i className="fas fa-qrcode"></i></div>
              <div>
                <h2 className="pay-card-title">{t("Digital Settlement")}</h2>
                <div className="pay-card-subtitle">{t("Scan & Pay via any Business UPI App")}</div>
              </div>
            </div>

            <div className="qr-box" style={{ padding: '10px', background: 'white', borderRadius: 'var(--r-md)', border: '1px solid var(--border-solid)' }}>
              <img src="/MSR_QR.jpg" alt="MSR Assessment Pvt Ltd UPI QR Code" style={{ width: '180px', height: '180px', objectFit: 'contain', display: 'block' }} />
            </div>

            <div className="upi-info">
              <div>Direct UPI Address:</div>
              <span className="upi-id">msrassessment-1@okhdfcbank</span>
              <button className="copy-btn" style={{ margin: '6px auto 0' }} onClick={() => copyText('msrassessment-1@okhdfcbank')}><i className="far fa-copy"></i> Copy UPI ID</button>
            </div>
          </div>
        </div>
      </section>

      {/* Manual Report Transaction Form */}
      <section className="report-section" id="report">
        <div className="report-container">
          <div className="section-header centered" style={{ marginBottom: 'var(--s4)' }}>
            <span className="section-label">{t("Confirmation Queue")}</span>
            <h2 className="section-title" style={{ fontSize: '26px' }}>{t("Confirm Your Transaction")}</h2>
            <p className="section-desc" style={{ maxWidth: '540px', margin: '4px auto 0' }}>
              {t("Please log your settlement below. Our accounting professionals will verify the bank logs and release your corporate order confirmation.")}
            </p>
          </div>

          <div className="report-card">
            <form id="payment-form" onSubmit={handleFormSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="pay-name">{t("Company / Client Name *")}</label>
                  <input
                    type="text"
                    id="pay-name"
                    name="name"
                    required
                    placeholder="Verma Industries Pvt Ltd"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="pay-email">{t("Billing Email Address *")}</label>
                  <input
                    type="email"
                    id="pay-email"
                    name="email"
                    required
                    placeholder="accounts@vermaindustries.com"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="pay-phone">{t("Phone *")}</label>
                  <input
                    type="tel"
                    id="pay-phone"
                    name="phone"
                    required
                    placeholder="+91 99887 76655"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="pay-service">{t("Associated Service *")}</label>
                  <select id="pay-service" name="service" required value={formData.service} onChange={handleInputChange}>
                    <option value="">Select corporate service...</option>
                    <option>Company Registration</option>
                    <option>Trademark Registration</option>
                    <option>GST Registration</option>
                    <option>ISO Certification</option>
                    <option>FSSAI License</option>
                    <option>MSME Registration</option>
                    <option>Audit Services</option>
                    <option>Training Services</option>
                    <option>Website Development</option>
                    <option>Mobile App Development</option>
                    <option>Digital Marketing</option>
                    <option>Other Advisory Services</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="pay-txid">{t("Transaction ID / UTR Number *")}</label>
                  <input
                    type="text"
                    id="pay-txid"
                    name="txid"
                    required
                    placeholder="TXN9876543210 or UTR12345678"
                    value={formData.txid}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="pay-amount">{t("Payment Amount (INR) *")}</label>
                  <input
                    type="number"
                    id="pay-amount"
                    name="amount"
                    required
                    placeholder="Enter transferred amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="pay-notes">{t("Your Requirement")}</label>
                <textarea
                  id="pay-notes"
                  name="notes"
                  rows="3"
                  placeholder="Provide any details regarding legal entity names, custom requests..."
                  value={formData.notes}
                  onChange={handleInputChange}
                />
              </div>

              <button type="submit" className="btn-submit" style={{ width: '100%' }}>
                {t("Submit Inquiry")} <i className="fas fa-lock" style={{ marginLeft: '6px' }}></i>
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
