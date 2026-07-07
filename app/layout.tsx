import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import CookieBanner from "./components/CookieBanner";
import { Analytics } from "@vercel/analytics/react";
import MetaPixel from "./components/MetaPixel";
import Script from "next/script";

const ttFirsNeue = localFont({
  src: [
    {
      path: "../public/fonts/TTFirsNeue/TT Firs Neue Trial Regular.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/TTFirsNeue/TT Firs Neue Trial Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/TTFirsNeue/TT Firs Neue Trial Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/TTFirsNeue/TT Firs Neue Trial DemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/TTFirsNeue/TT Firs Neue Trial Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/TTFirsNeue/TT Firs Neue Trial Bold.ttf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-manrope",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Bromak Agency - Konya Reklam Ajans\u0131",
  description:
    "Bromak Agency, Konya merkezli bir reklam ve dijital pazarlama ajans\u0131d\u0131r. Strateji, tasar\u0131m, dijital pazarlama ve i\u00e7erik \u00fcretimi hizmetleri sunuyoruz.",
  metadataBase: new URL("https://bromakagency.com"),
  openGraph: {
    title: "Bromak Agency - Konya Reklam Ajans\u0131",
    description:
      "Bromak Agency, Konya merkezli bir reklam ve dijital pazarlama ajans\u0131d\u0131r. Strateji, tasar\u0131m, dijital pazarlama ve i\u00e7erik \u00fcretimi hizmetleri sunuyoruz.",
    type: "website",
    url: "https://bromakagency.com",
    locale: "tr_TR",
    siteName: "Bromak Agency",
    images: [
      {
        url: "/images/bromak-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Bromak Agency - Dijital Reklam Ajansı",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bromak Agency - Konya Reklam Ajans\u0131",
    description:
      "Bromak Agency, Konya merkezli bir reklam ve dijital pazarlama ajans\u0131d\u0131r.",
    site: "@bromakagency",
    images: ["/images/bromak-og-image.jpg"],
  },
  applicationName: "Bromak Agency",
  authors: [{ name: "Bromak Agency" }],
  creator: "Bromak Agency",
  publisher: "Bromak Agency",
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/assets/logos/bromak-favicon.svg",
  },
  verification: {
    other: {
      "facebook-domain-verification": ["lkkm69em7i1c8l5vjge2j15a0prkin"],
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`lenis ${ttFirsNeue.variable}`}
      suppressHydrationWarning
    >
      <body data-scrolling-started="false" data-scrolling-direction="up" suppressHydrationWarning>
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-5Y4NVDVB0T"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-5Y4NVDVB0T');
            `,
          }}
        />
        <MetaPixel />
        {children}
        <CookieBanner />
        <Analytics />
      </body>
    </html>
  );
}

