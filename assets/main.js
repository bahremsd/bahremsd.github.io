/* ── helpers ──────────────────────────────────────────── */
function boldMe(s) {
  return s.replace(/Danis, B\. S\./g, '<strong>Danis, B. S.</strong>');
}

var ICONS = {
  email: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
  github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>'
};

var bibStore = {};

function renderLinks(lk, bib, bibKey) {
  var h = '<div class="pub-links">';
  if (lk && lk.arxiv)  h += '<a href="' + lk.arxiv  + '" target="_blank" class="pub-link">arXiv</a>';
  if (lk && lk.html)   h += '<a href="' + lk.html   + '" target="_blank" class="pub-link">HTML</a>';
  if (lk && lk.github) h += '<a href="' + lk.github + '" target="_blank" class="pub-link">GitHub</a>';
  if (bib) {
    bibStore[bibKey] = bib;
    h += '<button class="btn-bib" data-key="' + bibKey + '">BibTeX</button>';
  }
  h += '</div>';
  return h;
}

function renderCard(pub, idx) {
  var tag = pub.type === 'journal' ? 'Journal' : 'Conference';
  var bibKey = 'pub_' + idx;
  return '<div class="pub-card">' +
    '<div class="pub-meta"><span class="tag">' + tag + '</span>' + pub.year + '</div>' +
    '<div class="pub-title">' + pub.title + '</div>' +
    '<div class="pub-authors">' + boldMe(pub.authors) + '</div>' +
    '<div class="pub-venue">' + pub.venue +
      (pub.details ? '<span class="det">&middot; ' + pub.details + '</span>' : '') +
    '</div>' +
    renderLinks(pub.links, pub.bibtex, bibKey) +
  '</div>';
}

/* ── ABOUT ────────────────────────────────────────────── */
function renderAbout() {
  var d = window.ABOUT;

  var bios = d.bio.map(function(p) {
    return '<p>' + p + '</p>';
  }).join('');

  var edu = d.education.map(function(e) {
    return '<div class="edu-item">' +
      '<div class="edu-meta">' +
        '<img class="edu-logo" src="' + (typeof LOGO_MAP !== 'undefined' ? (LOGO_MAP[e.logo] || e.logo) : e.logo) + '" alt="' + e.school + '">' +
        '<div class="edu-year">' + e.year + '</div>' +
      '</div>' +
      '<div class="edu-content">' +
        '<h3>' + e.degree + '</h3>' +
        '<div class="school">' + e.school + ' &mdash; ' + e.location + '</div>' +
        '<div class="details">' + e.details + '<br><span class="cgpa">' + e.cgpa + '</span></div>' +
      '</div>' +
    '</div>';
  }).join('');

  var sel = window.PUBLICATIONS.filter(function(pub) {
    return d.selectedPublications.some(function(kw) {
      return pub.title.indexOf(kw) !== -1;
    });
  }).map(renderCard).join('');

  var soc = d.social.map(function(s) {
    var ext = s.type !== 'email' ? ' target="_blank"' : '';
    return '<a href="' + s.url + '"' + ext + ' class="soc-link">' +
      ICONS[s.type] + ' ' + s.label +
    '</a>';
  }).join('');

  document.getElementById('page-about').innerHTML =
    '<div class="wrap"><div class="about-hero">' +
      '<div class="profile-left"><img src="' + (typeof PHOTO_SRC !== 'undefined' ? PHOTO_SRC : 'assets/images/profile.jpg') + '" alt="' + d.name + '" class="profile-photo"><div class="profile-contact"><div class="profile-contact-item"><span class="contact-label">Address:</span><span class="contact-value">Koç University, Rumelifeneri Yolu,<br>34450 Sarıyer, Istanbul, Turkey</span></div><div class="profile-contact-item"><span class="contact-label">Email:</span><span class="contact-email">bdanis23@ku.edu.tr</span></div></div></div>' +
      '<div class="profile-text">' +
        '<h1>' + d.name + '</h1>' +
        '<div class="role">' + d.title + '</div>' +
        bios +
      '</div>' +
    '</div></div>' +
    '<div class="wrap">' +
      '<hr class="section-rule">' +
      '<div class="section-label">Education</div>' +
      '<div class="edu-list">' + edu + '</div>' +
      '<hr class="section-rule">' +
      '<div class="section-label">Selected Publications</div>' +
      '<div style="margin-bottom:3rem">' + sel + '</div>' +
      '<hr class="section-rule">' +
      '<div class="section-label">Contact</div>' +
      '<div class="social-row">' + soc + '</div>' +
    '</div>';
}

/* ── PUBLICATIONS ─────────────────────────────────────── */
function renderPublications() {
  var pubs = window.PUBLICATIONS;
  var yearsMap = {};
  pubs.forEach(function(p) { yearsMap[p.year] = true; });
  var years = Object.keys(yearsMap).map(Number).sort(function(a, b) { return b - a; });

  var h = '<div class="wrap pub-page">' +
    '<div class="pub-page-hd">Publications</div>' +
    '';

  years.forEach(function(yr) {
    var yp = pubs.filter(function(p) { return p.year === yr; });
    var j  = yp.filter(function(p) { return p.type === 'journal'; });
    var c  = yp.filter(function(p) { return p.type === 'conference'; });
    h += '<div class="year-block"><div class="year-hd">' + yr + '</div>';
    if (j.length) {
      h += '<div class="type-hd">Journal Publications</div>';
      j.forEach(function(p, i) { h += renderCard(p, yr + '_j' + i); });
    }
    if (c.length) {
      h += '<div class="type-hd">Conference Presentations &amp; Posters</div>';
      c.forEach(function(p, i) { h += renderCard(p, yr + '_c' + i); });
    }
    h += '</div>';
  });

  h += '</div>';
  document.getElementById('page-publications').innerHTML = h;
}

/* ── NAV ──────────────────────────────────────────────── */
function showPage(name) {
  document.querySelectorAll('.page').forEach(function(p) {
    p.classList.remove('active');
  });
  document.getElementById('page-' + name).classList.add('active');
  ['about', 'publications'].forEach(function(n) {
    var d  = document.getElementById('nav-' + n);
    var dr = document.getElementById('drawer-' + n);
    if (d)  d.classList.toggle('active', n === name);
    if (dr) dr.classList.toggle('active', n === name);
  });
  window.scrollTo(0, 0);
}

function toggleTheme() {
  var dark = document.documentElement.getAttribute('data-theme') === 'dark';
  document.documentElement.setAttribute('data-theme', dark ? 'light' : 'dark');
  document.querySelectorAll('.btn-theme').forEach(function(b) {
    b.textContent = dark ? '●' : '○';
  });
}

function toggleDrawer() {
  document.getElementById('nav-drawer').classList.toggle('open');
}

function closeDrawer() {
  document.getElementById('nav-drawer').classList.remove('open');
}

function copyBib(btn) {
  var key  = btn.getAttribute('data-key');
  var text = bibStore[key] || '';
  navigator.clipboard.writeText(text).then(function() {
    btn.textContent = 'Copied!';
    btn.classList.add('ok');
    setTimeout(function() {
      btn.textContent = 'BibTeX';
      btn.classList.remove('ok');
    }, 2200);
  });
}

/* ── EVENT LISTENERS (attached after DOM ready) ───────── */
document.addEventListener('DOMContentLoaded', function() {

  document.getElementById('brand-link').addEventListener('click', function(e) {
    e.preventDefault(); showPage('about'); closeDrawer();
  });
  document.getElementById('nav-about').addEventListener('click', function(e) {
    e.preventDefault(); showPage('about');
  });
  document.getElementById('nav-publications').addEventListener('click', function(e) {
    e.preventDefault(); showPage('publications');
  });
  document.getElementById('btn-theme').addEventListener('click', toggleTheme);
  document.getElementById('btn-theme-drawer').addEventListener('click', toggleTheme);
  document.getElementById('hamburger').addEventListener('click', toggleDrawer);
  document.getElementById('drawer-about').addEventListener('click', function(e) {
    e.preventDefault(); showPage('about'); closeDrawer();
  });
  document.getElementById('drawer-publications').addEventListener('click', function(e) {
    e.preventDefault(); showPage('publications'); closeDrawer();
  });

  /* BibTeX buttons — event delegation on document */
  document.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('btn-bib')) {
      copyBib(e.target);
    }
  });

});

/* ── INIT ─────────────────────────────────────────────── */
renderAbout();
renderPublications();
