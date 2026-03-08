# bahremsd.github.io

Personal academic website of Bahrem Serhat Danis.

## Structure

```
bahremsd.github.io/
├── index.html                  ← main page (do not edit)
├── .nojekyll                   ← disables Jekyll on GitHub Pages
├── assets/
│   ├── style.css               ← all styles & responsive breakpoints
│   ├── main.js                 ← render engine (do not edit)
│   ├── fonts/
│   │   ├── Fontin-Regular.ttf
│   │   ├── Fontin-Bold.ttf
│   │   ├── Fontin-Italic.ttf
│   │   └── Fontin-SmallCaps.ttf
│   └── images/
│       ├── profile.jpg
│       ├── koc_logo.png
│       └── itu_logo.png
└── _data/
    ├── about.js                ← ✏️  edit bio, education, social links
    └── publications.js         ← ✏️  edit / add publications
```

## How to update content

### Add a publication
Open `_data/publications.js` and copy-paste a block:

```js
{
  type: "journal",        // "journal" or "conference"
  year: 2026,
  authors: "Danis, B. S., ...",   // "Danis, B. S." is auto-bolded
  title: "Your paper title",
  venue: "Journal Name",
  details: "Vol. X, pp. Y–Z",
  links: {
    arxiv:  "https://arxiv.org/abs/XXXX.XXXXX",  // optional
    html:   "https://...",                         // optional
    github: "https://github.com/...",              // optional
  },
  bibtex: `@article{key, ...}`,
},
```

### Update bio or education
Open `_data/about.js` and edit the fields directly.

## Responsive breakpoints

| Device | Width |
|--------|-------|
| Desktop | 1024px+ |
| Tablet | 768–1023px |
| Mobile landscape | 480–767px |
| Mobile portrait | < 480px |
