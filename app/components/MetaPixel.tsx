"use client";

import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import { fbq } from "@/app/lib/meta-client";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "27322011684148956";

function PixelTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Process fbclid and create _fbc cookie if consent is granted
    if (searchParams) {
      const fbclid = searchParams.get("fbclid");
      if (fbclid) {
        const prefsStr = localStorage.getItem("bromak_cookie_consent");
        if (prefsStr) {
          try {
            const prefs = JSON.parse(prefsStr);
            if (prefs.marketing) {
              const hasFbc = document.cookie.includes('_fbc=');
              if (!hasFbc) {
                const fbcValue = `fb.1.${Date.now()}.${fbclid}`;
                document.cookie = `_fbc=${fbcValue}; path=/; max-age=7776000; SameSite=Lax`;
              }
            }
          } catch (e) {
            console.error("Cookie consent parse error", e);
          }
        }
      }
    }

    fbq("track", "PageView");
  }, [pathname, searchParams]);

  return null;
}

export default function MetaPixel() {
  return (
    <>
      <Suspense fallback={null}>
        <PixelTracker />
      </Suspense>
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${PIXEL_ID}');
          `,
        }}
      />
    </>
  );
}
