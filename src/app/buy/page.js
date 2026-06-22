"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

// Helper to resolve API path dynamically based on whether page is served from a subfolder
const getApiPath = (filename) => {
  if (typeof window !== 'undefined') {
    const pathname = window.location.pathname;
    const parts = pathname.split('/');
    // Search for the page name segment
    const pageIndex = parts.findIndex(p => ['buy', 'verify', 'payment', 'api'].includes(p));
    if (pageIndex > 0) {
      const base = parts.slice(0, pageIndex).join('/');
      return `${base}/api/${filename}`;
    }
  }
  return `/msrassessment/api/${filename}`; // fallback default
};

export default function BuyPage() {
  const { t } = useLanguage();
  const router = useRouter();

  // Form Fields State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [amount, setAmount] = useState('');

  // Page States
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Script loader helper
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Restrict name input to letters, spaces, and periods
  const handleNameChange = (e) => {
    const original = e.target.value;
    const filtered = original.replace(/[^A-Za-z\s\.]/g, '');
    setName(filtered);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Client-side validations
    if (!name.trim() || !email.trim() || !phone.trim() || !service || !amount) {
      setErrorMsg(t('All fields are required. Please fill in all fields.'));
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMsg(t('Please provide a valid email address.'));
      return;
    }

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      setErrorMsg(t('Please enter a valid positive amount.'));
      return;
    }

    setLoading(true);

    try {
      // 1. Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        setErrorMsg(t('Unable to connect to payment gateway. Please check your internet connection.'));
        setLoading(false);
        return;
      }

      // 2. Fetch Order ID from PHP API
      const response = await fetch(getApiPath('create-order.php'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          service: service,
          amount: numericAmount
        })
      });

      const resData = await response.json();

      if (!response.ok || !resData.order_id) {
        setErrorMsg(resData.error || t('Payment gateway initialization failed.'));
        setLoading(false);
        return;
      }

      // 3. Trigger Razorpay Modal
      const options = {
        key: resData.razorpay_key_id || '', // Provided securely by API
        amount: Math.round(numericAmount * 100),
        currency: 'INR',
        name: 'MSR Assessment Pvt Ltd',
        description: 'Corporate & Legal Services',
        image: typeof window !== 'undefined' ? window.location.origin + '/msrassessment/msr.png' : '/msrassessment/msr.png',
        order_id: resData.order_id,
        prefill: {
          name: name.trim(),
          email: email.trim(),
          contact: phone.trim()
        },
        notes: {
          customer_name: name.trim(),
          service: service
        },
        theme: {
          color: '#183153'
        },
        handler: async function (paymentResponse) {
          // Trigger when payment is completed successfully
          setLoading(true);
          try {
            const verifyResponse = await fetch(getApiPath('verify-payment.php'), {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                razorpay_payment_id: paymentResponse.razorpay_payment_id,
                razorpay_order_id: paymentResponse.razorpay_order_id,
                razorpay_signature: paymentResponse.razorpay_signature,
                name: name.trim(),
                email: email.trim(),
                phone: phone.trim(),
                service: service,
                amount: numericAmount
              })
            });

            const verifyData = await verifyResponse.json();

            if (verifyResponse.ok && verifyData.status === 'success') {
              // Redirect to success page with query parameters
              const params = new URLSearchParams({
                status: 'success',
                payment_id: paymentResponse.razorpay_payment_id,
                order_id: paymentResponse.razorpay_order_id,
                amount: numericAmount.toFixed(2),
                name: name.trim(),
                email: email.trim(),
                phone: phone.trim(),
                service: service,
                date: verifyData.date || new Date().toLocaleString('en-IN')
              });
              router.push(`/verify/?${params.toString()}`);
            } else {
              setErrorMsg(verifyData.error || t('Signature verification failed. Please contact support.'));
              setLoading(false);
            }
          } catch (err) {
            setErrorMsg(t('Verification error. Please contact administrator.'));
            setLoading(false);
          }
        },
        modal: {
          ondismiss: function () {
            setErrorMsg(t('Payment cancelled by user.'));
            setLoading(false);
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error("Transaction Error:", err);
      setErrorMsg(t('Error initializing transaction.') + " Details: " + err.message);
      setLoading(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="pay-hero">
        <div className="pay-hero-wrap">
          <div className="breadcrumb" style={{ display: 'flex', justifyContent: 'center', gap: '6px', fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginBottom: '14px' }}>
            <Link href="/" style={{ color: 'var(--accent-light)', textDecoration: 'none' }}>{t("Home")}</Link>
            <span>/</span>
            <Link href="/payment/" style={{ color: 'var(--accent-light)', textDecoration: 'none' }}>{t("Payment")}</Link>
            <span>/</span>
            <span>{t("Pay Online")}</span>
          </div>
          <h1 className="pay-hero-title">{t("Instant Online Payment")}</h1>
          <p className="pay-hero-desc">{t("Settle invoices or secure professional consulting audits instantly via Razorpay. Support cards, UPI, netbanking, and corporate wallets.")}</p>
        </div>
      </section>

      {/* Content Form Container */}
      <section className="pay-container">
        <div className="checkout-wrapper">
          {loading ? (
            <div className="loading-overlay">
              <div className="spinner"></div>
              <h2 className="checkout-form-title">{t("Connecting to Gateway...")}</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '15px', marginBottom: 'var(--s3)' }}>
                {t("Please do not refresh the page or click back. The payment checkout window is opening.")}
              </p>
              <div style={{ background: 'var(--bg-alt)', padding: 'var(--s2)', borderRadius: 'var(--r-sm)', width: '100%', maxWidth: '400px', textAlign: 'left', fontSize: '14px', margin: '0 auto' }}>
                <div style={{ display: 'flex', justifycontent: 'space-between', marginBottom: '6px', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>{t("Company Name:")}</span>
                  <strong style={{ color: 'var(--text)' }}>{name}</strong>
                </div>
                <div style={{ display: 'flex', justifycontent: 'space-between', marginBottom: '6px', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>{t("Service:")}</span>
                  <strong style={{ color: 'var(--text)' }}>{service}</strong>
                </div>
                <div style={{ display: 'flex', justifycontent: 'space-between', borderTop: '1px dotted var(--border-solid)', paddingTop: '6px', fontWeight: '700', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--primary)' }}>{t("Total Amount:")}</span>
                  <span style={{ color: 'var(--accent)' }}>₹{parseFloat(amount || '0').toLocaleString('en-IN', { minimumFractionDigits: 2 })} INR</span>
                </div>
              </div>
            </div>
          ) : (
            <>
              <h2 className="checkout-form-title">{t("Checkout Payment Details")}</h2>

              {errorMsg && (
                <div className="error-alert">
                  <i className="fas fa-exclamation-triangle"></i>
                  <span>{errorMsg}</span>
                </div>
              )}

              {mounted && (
                <form onSubmit={handleSubmit} id="checkout-form" suppressHydrationWarning>
                  <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="pay-name">{t("Company / Client Name *")}</label>
                    <input 
                      type="text" 
                      id="pay-name" 
                      required 
                      placeholder="Verma Industries Pvt Ltd" 
                      value={name} 
                      onChange={handleNameChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="pay-email">{t("Billing Email Address *")}</label>
                    <input 
                      type="email" 
                      id="pay-email" 
                      required 
                      placeholder="accounts@vermaindustries.com" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="pay-phone">{t("Phone Number *")}</label>
                    <input 
                      type="tel" 
                      id="pay-phone" 
                      required 
                      placeholder="+91 99887 76655" 
                      value={phone} 
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="pay-service">{t("Associated Service *")}</label>
                    <select 
                      id="pay-service" 
                      required 
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                    >
                      <option value="">{t("Select corporate service...")}</option>
                      <option>{t("Company Registration")}</option>
                      <option>{t("Trademark Registration")}</option>
                      <option>{t("GST Registration")}</option>
                      <option>{t("ISO Certification")}</option>
                      <option>{t("FSSAI License")}</option>
                      <option>{t("MSME Registration")}</option>
                      <option>{t("Audit Services")}</option>
                      <option>{t("Training Services")}</option>
                      <option>{t("Website Development")}</option>
                      <option>{t("Mobile App Development")}</option>
                      <option>{t("Digital Marketing")}</option>
                      <option>{t("Other Advisory Services")}</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="pay-amount">{t("Payment Amount (INR) *")}</label>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', fontWeight: '700', color: 'var(--text-mid)' }}>₹</span>
                    <input 
                      type="number" 
                      id="pay-amount" 
                      min="1" 
                      step="0.01" 
                      required 
                      placeholder={t("Enter amount to pay")} 
                      style={{ paddingLeft: '32px' }}
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                </div>

                  <button type="submit" className="btn-submit" style={{ width: '100%', marginTop: 'var(--s2)' }}>
                    {t("Proceed to Pay")} ₹ {parseFloat(amount || '0').toLocaleString('en-IN', { minimumFractionDigits: 2 })} {t("Securely")}
                  </button>
                </form>
              )}
            </>
          )}

          {/* Security Badge row */}
          <div className="pay-badge-row">
            <div className="pay-badge-item">
              <i className="fas fa-shield-halved"></i>
              <span>{t("100% SECURE CHECKOUT")}</span>
            </div>
            <div className="pay-badge-item">
              <i className="fas fa-check-double"></i>
              <span>{t("RAZORPAY VERIFIED")}</span>
            </div>
            <div className="pay-badge-item">
              <i className="fas fa-receipt"></i>
              <span>{t("INSTANT INVOICING")}</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
