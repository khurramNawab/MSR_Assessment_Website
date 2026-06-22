/**
 * MSR Assessment — article.js
 * Dynamically populates article.html from articles array in data.js
 */

document.addEventListener('DOMContentLoaded', () => {

  const params    = new URLSearchParams(window.location.search);
  const articleId = params.get('id');

  // ─── Fallback: no article ID ──────────────────────────────────────────────
  if (!articleId) {
    setNotFound();
    return;
  }

  // ─── Find article in data ─────────────────────────────────────────────────
  if (typeof articles === 'undefined') {
    setNotFound();
    return;
  }

  const foundArticle = articles.find(art => art.id === articleId);

  if (!foundArticle) {
    setNotFound();
    return;
  }

  // ─── Populate page ────────────────────────────────────────────────────────
  // Page title & meta
  document.title = `${foundArticle.title} | MSR Compliance Insights`;

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', `${foundArticle.title} — ${foundArticle.excerpt} MSR Assessment Pvt Ltd compliance insights.`);
  }

  // Hero Fields
  setText('art-breadcrumb-title', foundArticle.title);
  setText('art-title', foundArticle.title);
  setText('art-date', foundArticle.date);
  setText('art-read-time', foundArticle.readTime);

  // Category Tag Badge Styling
  const tagBadge = document.getElementById('art-tag');
  const tagText = document.getElementById('art-tag-text');
  if (tagBadge && tagText) {
    tagText.textContent = foundArticle.tagText;
    tagBadge.className = `art-tag-badge ${foundArticle.tagClass}`;
    
    const iconEl = tagBadge.querySelector('i');
    if (iconEl && foundArticle.icon) {
      iconEl.className = `fas ${foundArticle.icon}`;
    }
  }

  // Article Body Content
  const bodyContentEl = document.getElementById('art-body-content');
  if (bodyContentEl && foundArticle.content) {
    bodyContentEl.innerHTML = foundArticle.content;
  }

  // Pre-fill inquiry form fields
  const hiddenSvc = document.getElementById('inq-service-pre');
  if (hiddenSvc) {
    hiddenSvc.value = `Article: ${foundArticle.title}`;
  }
  const msgField = document.getElementById('inq-message');
  if (msgField) {
    msgField.value = `I read your article: "${foundArticle.title}" and would like to consult with an expert regarding its compliance regulations.`;
  }

  // ─── Render Related Articles ──────────────────────────────────────────────
  const relatedGrid = document.getElementById('art-related-grid');
  if (relatedGrid) {
    const others = articles
      .filter(art => art.id !== articleId && art.category === foundArticle.category)
      .slice(0, 2);

    // If no related articles in same category, show any other 2 articles
    const finalRelated = others.length > 0 
      ? others 
      : articles.filter(art => art.id !== articleId).slice(0, 2);

    if (finalRelated.length > 0) {
      relatedGrid.innerHTML = finalRelated.map(art => `
        <a href="article.html?id=${art.id}" class="related-card-art">
          <span class="rc-tag ${art.tagClass}" style="color: inherit; background: transparent; padding: 0;">${art.tagText}</span>
          <div class="rc-title">${art.title}</div>
          <div class="rc-meta">${art.date} &nbsp;·&nbsp; ${art.readTime}</div>
        </a>
      `).join('');
    } else {
      const parent = relatedGrid.closest('.related-articles-section');
      if (parent) parent.style.display = 'none';
    }
  }

  // ─── Helper Functions ─────────────────────────────────────────────────────
  function setText(id, value) {
    const el = document.getElementById(id);
    if (el && value) el.textContent = value;
  }

  function setNotFound() {
    window.location.replace('404.html');
  }

});
