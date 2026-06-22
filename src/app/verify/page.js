"use client";

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

function VerifyReceiptContent() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();

  const status = searchParams.get('status');
  const paymentId = searchParams.get('payment_id') || '';
  const orderId = searchParams.get('order_id') || '';
  const amount = searchParams.get('amount') || '0.00';
  const name = searchParams.get('name') || 'N/A';
  const email = searchParams.get('email') || 'N/A';
  const phone = searchParams.get('phone') || 'N/A';
  const service = searchParams.get('service') || 'N/A';
  const date = searchParams.get('date') || new Date().toLocaleString('en-IN');
  const errorMsg = searchParams.get('error') || t('Payment verification failed or was cancelled.');

  const isSuccess = status === 'success';

  return (
    <div className="receipt-card">
      {isSuccess ? (
        <>
          <div className="status-icon-wrap status-success">
            <i className="fas fa-check-circle"></i>
          </div>
          <h2 className="receipt-title">{t("Payment Verified Successfully!")}</h2>
          <p className="receipt-subtitle">{t("Thank you. Your corporate compliance order payment has been secured.")}</p>

          <div className="receipt-details">
            <div className="receipt-row">
              <span className="receipt-label">{t("Client Name")}</span>
              <span className="receipt-value">{name}</span>
            </div>
            <div className="receipt-row">
              <span className="receipt-label">{t("Email Address")}</span>
              <span className="receipt-value">{email}</span>
            </div>
            <div className="receipt-row">
              <span className="receipt-label">{t("Phone Number")}</span>
              <span className="receipt-value">{phone}</span>
            </div>
            <div className="receipt-row">
              <span className="receipt-label">{t("Associated Service")}</span>
              <span className="receipt-value">{service}</span>
            </div>
            <div className="receipt-row">
              <span className="receipt-label">{t("Razorpay Order ID")}</span>
              <span className="receipt-value">{orderId}</span>
            </div>
            <div className="receipt-row">
              <span className="receipt-label">{t("Razorpay Payment ID")}</span>
              <span className="receipt-value" style={{ color: 'var(--accent)' }}>{paymentId}</span>
            </div>
            <div className="receipt-row">
              <span className="receipt-label">{t("Transaction Date")}</span>
              <span className="receipt-value">{date}</span>
            </div>
            <div className="receipt-row" style={{ fontSize: '16px', borderTop: '1px dotted var(--border-solid)', paddingTop: '8px' }}>
              <span className="receipt-label" style={{ fontWeight: 700, color: 'var(--primary)' }}>{t("Amount Paid")}</span>
              <span className="receipt-value" style={{ color: 'var(--success)' }}>₹{parseFloat(amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })} INR</span>
            </div>
          </div>

          <div className="receipt-actions">
            <button onClick={() => window.print()} className="btn btn-md btn-outline">
              {t("Print Receipt")} <i className="fas fa-print"></i>
            </button>
            <Link href="/" className="btn btn-md btn-primary">
              {t("Back to Home")} <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="status-icon-wrap status-failure">
            <i className="fas fa-times-circle"></i>
          </div>
          <h2 className="receipt-title">{t("Payment Verification Failed")}</h2>
          <p className="receipt-subtitle">{t("We encountered an issue while verifying your transaction.")}</p>

          <div className="receipt-details" style={{ background: '#FFF5F5' }}>
            <div className="receipt-row" style={{ border: 'none' }}>
              <span className="receipt-label" style={{ color: '#9B1C1C' }}>{t("Reason:")}</span>
              <span className="receipt-value" style={{ color: '#9B1C1C' }}>{errorMsg}</span>
            </div>
            {paymentId && (
              <div className="receipt-row" style={{ border: 'none', paddingTop: '0' }}>
                <span className="receipt-label">{t("Transaction ID:")}</span>
                <span className="receipt-value">{paymentId}</span>
              </div>
            )}
          </div>

          <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', marginBottom: 'var(--s4)', lineHeight: '1.6' }}>
            {t("If amount was deducted from your account, it will automatically refund within 5-7 business days. Please try again or reach out to support.")}
          </p>

          <div className="receipt-actions">
            <Link href="/buy/" className="btn btn-md btn-primary">
              {t("Try Again")} <i className="fas fa-rotate-left"></i>
            </Link>
            <Link href="/contact/" className="btn btn-md btn-outline">
              {t("Contact Helpline")} <i className="fas fa-phone"></i>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default function VerifyPage() {
  const { t } = useLanguage();
  return (
    <>
      <section className="status-hero">
        <h1 style={{ fontFamily: 'var(--font-head)', fontSize: '32px', fontWeight: '800', color: 'white' }}>
          {t("Transaction Status")}
        </h1>
      </section>

      <section className="status-container">
        <Suspense fallback={<div className="loading-overlay"><div className="spinner"></div></div>}>
          <VerifyReceiptContent />
        </Suspense>
      </section>
    </>
  );
}
