# Dipayan Mahato — Portfolio

A fully responsive, accessible personal portfolio site, styled with Canva-inspired
design principles (bold Poppins/Lato type pairing, rounded card layouts, soft shadows,
a violet/coral/teal palette) and content pulled from your live site
(`dipayan3203-github-io.vercel.app`).

## File structure

```
portfolio/
├── index.html          # All page content & structure
├── css/
│   └── style.css        # All styling — organized with a table of contents at the top
├── js/
│   └── script.js        # Nav toggle, scroll effects, stat counters, form handling
└── README.md
```

No build step, no frameworks, no package manager — open `index.html` in a browser and
it works. The only external dependencies are Google Fonts and Font Awesome, both
loaded via CDN `<link>` tags in `<head>`.

## What's already wired up

- **Hero** — headline, tagline, CTA buttons, social links, and a signature "code
  console" graphic with floating stack chips (no stock photo used, since none of your
  own photo was provided).
- **About** — your NIT Durgapur → backend engineering narrative, plus a highlights list.
- **Tech stack** — four card groups (Languages, AI & ML, Backend, Cloud & DevOps),
  pulled directly from your stack list.
- **Experience** — timeline with Accepto Technologies and ORC Engineering entries.
- **Projects** — Gemini Image Analyzer, YouTube Idea Generator, Trackify, each linking
  out to `github.com/dipayan3203`.
- **Education & certifications** — NIT Durgapur degree + your two certificates,
  linked to their verification pages.
- **Contact** — email, phone, LinkedIn, GitHub, location, and a working front-end
  contact form (see note below).

## Things to double-check / customize

1. **Project links** — all three project cards currently link to your GitHub profile
   root (`github.com/dipayan3203`). Update each `href` in the `#projects` section of
   `index.html` to the specific repo URL once you have them handy.
2. **Contact form backend** — the form in `js/script.js` (`#contactForm` handler) is a
   client-side demo: it validates fields and shows a success message, but doesn't
   actually send anything anywhere. Wire it up to a service like
   [Formspree](https://formspree.io) or [Getform](https://getform.io) (just add their
   `action` URL to the `<form>` tag), or replace it with a `mailto:` fallback.
3. **Resume download** — the "Download Resume" button currently triggers the browser's
   print dialog (same trick your current site uses). If you'd rather link directly to a
   PDF, drop it in `assets/` and update the button handler in `js/script.js` (the swap
   is commented right above the `window.print()` line).
4. **Favicon** — none is set. Add a `favicon.ico` or SVG icon and a `<link rel="icon">`
   tag in `<head>` if you want one in the browser tab.

## Deployment

This is a static site — deploy it anywhere that serves static files:

- **GitHub Pages** (matches your existing `dipayan3203.github.io` setup): copy these
  three files/folders into that repo's root, commit, and push. No build step needed.
- **Vercel / Netlify**: drag-and-drop the `portfolio/` folder, or connect the repo —
  no framework preset required, just a static site.

## Accessibility & responsiveness notes

- Semantic HTML5 (`header`, `nav`, `main`, `section`, `article`, `footer`), one `h1`
  per page, logical heading order throughout.
- Skip-to-content link, visible focus states, `aria-label`s on icon-only links/buttons,
  `aria-live` region for form status messages.
- All decorative graphics (blobs, code console illustration) are `aria-hidden`.
- Responsive breakpoints at 1024px (tablet) and 860px/480px (mobile), with a hamburger
  nav below 860px.
- Respects `prefers-reduced-motion` (disables smooth scroll & animations).
