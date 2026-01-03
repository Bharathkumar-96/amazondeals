# DiscountShop

Simple React + Vite project to display affiliate product cards.

# DiscountShop

Simple React + Vite project to display affiliate product cards.

Features:
- Vite + React 18
- Material UI for UI components
- Navbar, Header, Footer with a light color theme
- `src/data/products.js` — single place to export product data (id, name, category, mrpPrice, discountPercent, currentPrice, description, image, affiliateUrl)

Quick start

1. Install dependencies:

```bash
cd /home/devrabbit/Documents/amazonofferswebsite
npm install
```

2. Run development server:

```bash
npm run dev
```

3. Open the URL printed by Vite (usually http://localhost:5173).

Notes
- Replace the example `affiliateUrl` values in `src/data/products.js` with your real affiliate links. Each product already includes UTM parameters (utm_source=DiscountShop&utm_medium=affiliate&utm_campaign=card) — change them as desired.
- Images are linked from Unsplash as examples; swap them for your hosted images for production.

Tests & CI

- Run tests locally with:

```bash
npm test
```

- A simple GitHub Actions workflow is included at `.github/workflows/ci.yml` which will run tests and build on push.

Analytics & tracking

- Clicks on "View Deal" are recorded locally via a small analytics helper in `src/utils/analytics.js`. In production you should replace that with a network call to your analytics backend to capture conversions and clicks.

Next steps (suggested):
- Add `affiliateUrl` to each product that points to your partner links.
- Add category filtering UI improvements and persistent sorting options.
- Hook analytics to a backend or third-party tracker to capture clicks server-side.
 - Run the local API server to persist click counts to disk. Start it with:
This project is a static React app (Vite + React + Material UI) intended for static hosting (Netlify, Vercel, GitHub Pages, etc.).

Data
- Product data lives in `src/data/products.js`. Update that file to change or add products. For static deployment, product data is baked into the build.

Analytics
- This repository contains a small client-side analytics helper in `src/utils/analytics.js` that records events to localStorage for quick testing. For production analytics and conversion tracking, connect your affiliate links to a real analytics provider.
