"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translationMap, categoryTranslations, serviceTranslations } from '@/data/translations';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [locale, setLocaleState] = useState('en');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('selected_lang');
    if (stored === 'hi' || stored === 'en') {
      setLocaleState(stored);
    }
    setIsReady(true);
  }, []);

  const setLocale = (newLocale) => {
    if (newLocale === 'hi' || newLocale === 'en') {
      setLocaleState(newLocale);
      localStorage.setItem('selected_lang', newLocale);
    }
  };

  const t = (key) => {
    if (!key) return '';
    const cleanKey = key.trim().replace(/\s+/g, ' ');
    if (locale === 'hi' && translationMap[cleanKey]) {
      return translationMap[cleanKey];
    }
    return key;
  };

  // Helper to translate an entire service data object
  const translateService = (serviceName, originalData) => {
    if (locale !== 'hi') return originalData;
    const trans = serviceTranslations[serviceName];
    if (!trans) return originalData;
    return {
      ...originalData,
      title: trans.title || originalData.title,
      desc: trans.desc || originalData.desc,
      time: trans.time || originalData.time,
      eligibility: trans.eligibility || originalData.eligibility,
      documents: trans.documents || originalData.documents,
      process: trans.process || originalData.process,
      faqs: trans.faqs || originalData.faqs,
    };
  };

  // Helper to translate category data object
  const translateCategory = (categoryId, originalCategory) => {
    if (locale !== 'hi') return originalCategory;
    const trans = categoryTranslations[categoryId];
    if (!trans) return originalCategory;
    return {
      ...originalCategory,
      title: trans.title || originalCategory.title,
      desc: trans.desc || originalCategory.desc
    };
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, translateService, translateCategory, isReady }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
