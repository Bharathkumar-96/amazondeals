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

```bash
# from project root
node server/index.js
```

By default the server listens on port 4000. In development set the Vite API base so the frontend calls it, for example:

```bash
VITE_API_BASE=http://localhost:4000 npm run dev
```

The server exposes:
- GET /api/products — returns product array (includes `clicksCount`)
- POST /api/click { productId } — increments `clicksCount` in `server/data/products.json`

Important: A browser client cannot write directly to files on the server filesystem. The server provides a simple API that uses Node's `fs` to persist counts to `server/data/products.json`.
