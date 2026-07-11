// scripts/generate.js — SSG: reads data.json, generates static HTML
const fs = require('fs');
const path = require('path');

const DATA = JSON.parse(fs.readFileSync('data.json', 'utf-8'));

// ── Helpers ────────────────────────────────────────────
function esc(t) {
  return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function buildLangIndex() {
  const map = new Map();
  DATA.forEach(book => {
    book.languages.forEach(l => {
      if (!map.has(l.code)) map.set(l.code, { code: l.code, name: l.name, count: 0 });
      map.get(l.code).count++;
    });
  });
  return [...map.values()].sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

const ALL_LANGS = buildLangIndex();

// ── Templates ──────────────────────────────────────────
const SITE_URL = 'https://piggy-print.github.io/awesome-arxiv-multilingual';

function renderNav() {
  return ALL_LANGS.map(l =>
    `<a href="lang/${l.code}.html" class="lang-btn">${esc(l.name)} (${l.count})</a>`
  ).join('\n                    ');
}

function renderBookList(books, showBuyBtn = false) {
  return books.map(book => {
    const btns = book.languages.map(l => {
      const href = showBuyBtn
        ? `https://piggyprint.gumroad.com/l/${l.gumroad}`
        : `lang/${l.code}.html`;
      const cls = showBuyBtn ? 'buy-btn' : 'lang-btn';
      const label = showBuyBtn ? '🛒 Buy — $9.99' : esc(l.name);
      return `<a href="${href}" target="_blank" rel="noopener noreferrer" class="${cls}">${label}</a>`;
    }).join('\n                            ');
    return `                    <div class="book-card">
                        <h2>${esc(book.title)}</h2>
                        <div class="lang-links">
                            ${btns}
                        </div>
                    </div>`;
  }).join('\n');
}

function pageShell(title, desc, body, langPages) {
  const langLinks = langPages
    ? `<nav class="lang-nav" id="langNav">
                    <span class="nav-label">Browse by language:</span>
                    ${renderNav()}
                </nav>`
    : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${esc(title)}</title>
    <meta name="description" content="${esc(desc)}">
    <link rel="canonical" href="${SITE_URL}/">
    <!-- Open Graph -->
    <meta property="og:title" content="${esc(title)}">
    <meta property="og:description" content="${esc(desc)}">
    <meta property="og:url" content="${SITE_URL}/">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="PiggyPrint Translated Docs">
    <meta name="twitter:card" content="summary">
    <!-- Structured Data -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "PiggyPrint Translated Docs",
      "description": "Multilingual translated lecture notes on quantum machine learning, tensor networks, and agentic AI.",
      "url": "${SITE_URL}/",
      "inLanguage": ["en", "zh", "es", "fr", "de", "ja", "ko", "pt", "ar", "id"],
      "publisher": { "@type": "Organization", "name": "PiggyPrint" }
    }
    </script>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <header>
            ${body.header}
        </header>
        ${langLinks}
        <div id="bookList">
            ${body.content}
        </div>
        <footer>
            <p>Powered by <a href="https://piggyprint.gumroad.com/" target="_blank">PiggyPrint</a></p>
        </footer>
    </div>
</body>
</html>`;
}

// ── Generate index.html ────────────────────────────────
const indexBody = {
  header: `<h1>📚 PiggyPrint Translated Docs</h1>
            <p>Multilingual lecture notes & books</p>`,
  content: renderBookList(DATA, false)
};

fs.writeFileSync('index.html', pageShell(
  'PiggyPrint Translated Docs — Multilingual AI & Science Books',
  'Browse multilingual translated lecture notes on quantum machine learning, tensor networks, and agentic AI. Available in 中文, Español, Français, Deutsch, 日本語, 한국어, Português, العربية, Indonesia.',
  indexBody,
  true
));
console.log('✓ index.html generated');

// ── Generate lang/*.html ────────────────────────────────
const langDir = 'lang';
if (!fs.existsSync(langDir)) fs.mkdirSync(langDir);

ALL_LANGS.forEach(lang => {
  const matching = DATA
    .map(book => {
      const match = book.languages.find(l => l.code === lang.code);
      return match ? { title: book.title, gumroad: match.gumroad, langName: match.name } : null;
    })
    .filter(Boolean);

  const langBody = {
    header: `<a href="../index.html" class="back">← All Languages</a>
            <h1>📖 ${esc(lang.name)}</h1>
            <p>${matching.length} book${matching.length !== 1 ? 's' : ''} available</p>`,
    content: matching.map(book =>
      `                    <div class="book-card">
                        <h2>${esc(book.title)}</h2>
                        <a href="https://piggyprint.gumroad.com/l/${book.gumroad}" target="_blank" rel="noopener noreferrer" class="buy-btn">🛒 Buy — $9.99</a>
                    </div>`
    ).join('\n')
  };

  const html = pageShell(
    `${lang.name} — PiggyPrint Translated Docs`,
    `Browse ${lang.name} translations of PiggyPrint's multilingual books on quantum ML, tensor networks, and agentic AI.`,
    langBody,
    false
  );

  fs.writeFileSync(`lang/${lang.code}.html`, html);
  console.log(`✓ lang/${lang.code}.html generated`);
});

console.log('\n✅ Static site generated successfully!');
