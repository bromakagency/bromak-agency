"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import { fbq } from "@/app/lib/meta-client";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "27322011684148956";

export default function MetaPixel() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Only track PageView on route change (soft nav).
    // Initial page load is handled by the script itself running fbq('track', 'PageView') inside its body.
    // Wait, since we are initializing fbq in the script, we might want to manually trigger PageView here if it's a client-side transition.
    
    // We can just rely on fbq('track', 'PageView') here for all pathname changes if we don't put track PageView in the script tag.
    // But it's safer to just put it in the script tag for first load, and trigger again on subsequent path changes.
    // However, in Next.js App Router, the first render also runs useEffect. To prevent double PageView on hard load,
    // we can either track if it's the first load, or just trigger it here exclusively and remove it from the script tag.
    
    // Let's trigger it here exclusively.
    fbq("track", "PageView");
  }, [pathname, searchParams]);

  return (
    <>
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
