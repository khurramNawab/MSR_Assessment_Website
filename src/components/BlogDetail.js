"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { articles } from '@/data/servicesData';
import { notFound } from 'next/navigation';

export default function BlogDetail({ articleId }) {
  const { t } = useLanguage();
  
  const foundArticle = articles.find(art => art.id === articleId);

  useEffect(() => {
    const revealEls = document.querySelectorAll('[data-reveal]');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('revealed');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.07 });
    revealEls.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [articleId]);

  if (!foundArticle) {
    notFound();
  }

  // Pre-fill modal event
  const handleInquiryClick = () => {
    const hiddenSvc = document.getElementById('inq-service-pre');
    if (hiddenSvc) hiddenSvc.value = `Article: ${foundArticle.title}`;
    const msgField = document.getElementById('inq-message');
    if (msgField) msgField.value = `I read your article: "${foundArticle.title}" and would like to consult with an expert regarding its compliance regulations.`;
    
    const modal = document.getElementById('inquiry-modal');
    if (modal) modal.classList.add('open');
  };

  // Related articles
  const relatedArticles = articles
    .filter(art => art.id !== articleId && art.category === foundArticle.category)
    .slice(0, 2);

  const finalRelated = relatedArticles.length > 0 
    ? relatedArticles 
    : articles.filter(art => art.id !== articleId).slice(0, 2);

  return (
    <>
      {/* Hero */}
      <section className="art-page-hero">
        <div className="art-hero-inner">
          <div className="art-hero-left" data-reveal>
            <div className="breadcrumb">
              <Link href="/">{t("Home")}</Link>
              <i className="fas fa-chevron-right"></i>
              <Link href="/blogs/">{t("Blogs")}</Link>
              <i className="fas fa-chevron-right"></i>
              <span>{foundArticle.title}</span>
            </div>

            <div className={`art-tag-badge ${foundArticle.tagClass}`}>
              <i className={`fas ${foundArticle.icon || 'fa-info-circle'}`}></i>
              <span>{t(foundArticle.tagText)}</span>
            </div>

            <h1 className="art-page-title">{foundArticle.title}</h1>
            {foundArticle.image && (
              <div style={{ margin: 'var(--s3) 0', width: '100%', height: '300px', backgroundImage: `url('${foundArticle.image}')`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: 'var(--r-md)', border: '1px solid var(--border-solid)' }}></div>
            )}

            <div className="art-meta-row">
              <div className="art-meta-item">
                <span className="art-meta-label">{t("Published")}</span>
                <span className="art-meta-value">{t(foundArticle.date)}</span>
              </div>
              <div className="art-meta-divider"></div>
              <div className="art-meta-item">
                <span className="art-meta-label">{t("Reading Time")}</span>
                <span className="art-meta-value">{t(foundArticle.readTime)}</span>
              </div>
              <div className="art-meta-divider"></div>
              <div className="art-meta-item">
                <span className="art-meta-label">{t("Audience Focus")}</span>
                <span className="art-meta-value">{t("Corporate Operations")}</span>
              </div>
            </div>
          </div>

          {/* Right Sidebar (Expert CTA) */}
          <div className="art-sidebar-sticky" data-reveal data-reveal-delay="2">
            <div className="art-expert-card">
              <h4>{t("Need Advisory Help?")}</h4>
              <p>{t("MSR Assessment's CA & CS team is available to assist you with compliance updates, documentation, or government filings.")}</p>
              <div className="art-assurances">
                <div className="art-ea-item"><i className="fas fa-check-circle"></i> {t("CA/CS Professional Consulting")}</div>
                <div className="art-ea-item"><i className="fas fa-check-circle"></i> {t("Zero-Error Filing Process")}</div>
                <div className="art-ea-item"><i className="fas fa-check-circle"></i> {t("Dedicated Client Account Owner")}</div>
              </div>
            </div>

            <button className="btn btn-md btn-primary" onClick={handleInquiryClick} style={{ width: '100%', justifyContent: 'center' }}>
              <i className="fas fa-paper-plane"></i> {t("Consult An Expert Now")}
            </button>

            <div style={{ textAlign: 'center', marginTop: '12px' }}>
              <a href="tel:+918337004170" style={{ fontSize: '13px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', textDecoration: 'none' }}>
                <i className="fas fa-phone" style={{ color: 'var(--primary)' }}></i>
                {t("Call Helpline: +91 83370 04170")}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="art-body-section">
        <div className="art-body-inner">
          <div>
            <article className="art-content-card" data-reveal>
              <div className="art-main-text" dangerouslySetInnerHTML={{ __html: foundArticle.content }}></div>
            </article>

            {/* Related Articles */}
            {finalRelated.length > 0 && (
              <div className="related-articles-section" data-reveal>
                <div className="related-title-row">
                  <h3>{t("Keep Reading Insights")}</h3>
                </div>
                <div className="related-grid" id="art-related-grid">
                  {finalRelated.map((art, idx) => (
                    <Link href={`/blogs/${art.id}/`} className="related-card-art" key={idx}>
                      <span className={`rc-tag ${art.tagClass}`} style={{ color: 'inherit', background: 'transparent', padding: '0' }}>{t(art.tagText)}</span>
                      <div className="rc-title">{art.title}</div>
                      <div className="rc-meta">{t(art.date)} &nbsp;·&nbsp; {t(art.readTime)}</div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div></div>
        </div>
      </section>
    </>
  );
}
