"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { articles } from '@/data/servicesData';

export default function BlogsPage() {
  const { t } = useLanguage();
  
  const [currentCategory, setCurrentCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

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
  }, [currentCategory, searchQuery]);

  // Categories translation map for display
  const categoryFilters = [
    { id: 'all', label: t('All Articles') },
    { id: 'gst', label: t('GST Updates') },
    { id: 'mca', label: t('MCA / Corporate Law') },
    { id: 'trademark', label: t('Trademark & IP') },
    { id: 'iso', label: t('ISO Quality Audit') }
  ];

  // Filtering logic
  const filteredArticles = articles.filter(art => {
    const matchesCategory = (currentCategory === 'all' || art.category === currentCategory);
    const matchesSearch = (
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      {/* Hero */}
      <section className="blog-hero">
        <div className="blog-hero-wrap">
          <div className="blog-hero-content">
            <div className="breadcrumb" style={{ display: 'flex', gap: '6px', fontSize: '12px', color: 'var(--text-faint)', marginBottom: '14px' }}>
              <Link href="/" style={{ color: 'var(--primary)', textDecoration: 'none' }}>{t("Home")}</Link>
              <span>/</span>
              <span>{t("Blogs & Updates")}</span>
            </div>
            <h1 className="blog-hero-title">{t("MSR Compliance Insights")}</h1>
            <p className="blog-hero-desc">{t("Expert analysis and regulatory updates from our CA and corporate legal partners — simplified for founders and corporate operations team managers.")}</p>
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="blog-filter-section" style={{ position: 'sticky', top: '70px', zIndex: 100 }}>
        <div className="bf-wrap">
          <div className="bf-categories">
            {categoryFilters.map(cat => (
              <button 
                key={cat.id} 
                className={`bf-cat-btn ${currentCategory === cat.id ? 'active' : ''}`}
                onClick={() => setCurrentCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <div className="bf-search-group">
            <i className="fas fa-search bf-search-icon"></i>
            <input 
              type="text" 
              className="bf-search-input" 
              placeholder={t("Search compliance updates...")} 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="blog-grid-section">
        <div className="bg-wrap">
          {filteredArticles.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '48px', color: 'var(--text-muted)', fontSize: '16px' }}>
              <i className="fas fa-search" style={{ fontSize: '32px', color: 'var(--text-faint)', marginBottom: '12px', display: 'block' }}></i>
              {t("No articles found matching your criteria.")}
            </div>
          ) : (
            filteredArticles.map((art, idx) => (
              <article className="insight-card revealed" data-category={art.category} key={idx}>
                <div className="insight-img" style={art.image ? { backgroundImage: `url('${art.image}')`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}>
                  <span className={`insight-tag ${art.tagClass}`}>{t(art.tagText)}</span>
                  {!art.image && <i className={`fas ${art.icon}`}></i>}
                </div>
                <div className="insight-content">
                  <div className="insight-date">{t(art.date)} &nbsp;·&nbsp; {t(art.readTime)}</div>
                  <h3 className="insight-title">{art.title}</h3>
                  <p className="insight-excerpt">{art.excerpt}</p>
                  <Link href={`/blogs/${art.id}/`} className="insight-read-more">
                    {t("Read Article")} <i className="fas fa-arrow-right"></i>
                  </Link>
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </>
  );
}
