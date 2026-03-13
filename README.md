# noodle — landing page

> Think it. Catch it. Keep it.

Static landing page for [noodle](https://noodleapp.xyz), the thought-capture app for iOS.

## Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push this repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo
3. Vercel auto-detects the static site — no config needed
4. Click **Deploy**
5. Add your custom domain under **Settings → Domains**

Every push to `main` triggers an automatic redeploy.

### Local development

```bash
# Serve locally with any static server
npx serve site/

# Or with Python
cd site && python3 -m http.server 8000
```

## Structure

```
├── vercel.json         # Output directory, caching, security headers
├── site/
│   ├── index.html      # Landing page
│   ├── assets/
│   │   ├── css/
│   │   │   └── style.css
│   │   └── js/
│   │       └── main.js
│   ├── favicon.svg
│   └── robots.txt
└── README.md
```

## Brand

- **Typeface**: DM Sans (display/body) + DM Mono (metadata)
- **Palette**: Warm Off-White `#F7F5F2` · Near-Black `#111111` · Burnt Orange `#E8572A` · Mid Grey `#555555` · Muted Grey `#999999` · Warm Rule `#E0DDD8` · Panel `#EDEAE5` · Dark Surface `#1A1A1A`
- **Accent rule**: Burnt orange on interaction states only. One accent colour, ever.

---

noodle · 2025
# indigo
