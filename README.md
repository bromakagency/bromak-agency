# Bevel Site — Next.js

**Bevel - The Everything Health App** landing page. Framer'dan HTML export edilip Next.js App Router'a taşınmıştır.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Vanilla CSS (`app/globals.css`)
- **Animations:** GSAP + ScrollTrigger + Lenis (smooth scroll)
- **Slider:** Swiper.js
- **Fonts:** Archivo (next/font/google) · Graphik (local woff2)

## Proje Yapısı

```
app/
├── components/
│   ├── Animations.tsx      # GSAP/Lenis/Swiper — client component
│   ├── Navbar.tsx
│   ├── HeroSection.tsx
│   ├── PhoneSection.tsx    # Sticky scroll phone mockup
│   ├── PreviewSection.tsx  # AI cards
│   ├── SliderSection.tsx   # Swiper + mobile list
│   ├── UsesSection.tsx
│   ├── ReviewsSection.tsx  # CSS marquee
│   ├── CTASection.tsx
│   ├── Footer.tsx
│   └── AppBanner.tsx       # Mobile sticky banner
├── lib/
│   └── utils.ts            # Asset helper A() + shared data
├── globals.css
├── layout.tsx
├── page.tsx
├── robots.ts
└── sitemap.ts
public/
├── assets/                 # 82 görseller (avif/svg/png)
└── fonts/                  # Graphik-Medium.woff2, Graphik-Regular.woff2
```

## Geliştirme

```bash
npm run dev     # http://localhost:3000
npm run build   # Production build
npm run start   # Production server
```

## Notlar

- Domain değişince `app/robots.ts` ve `app/sitemap.ts` içindeki `bevelhealth.com` URL'lerini güncelleyin.
- `app/layout.tsx` içindeki `metadataBase` URL'sini güncelleyin.
