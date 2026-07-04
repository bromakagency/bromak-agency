"use client";

import { useEffect, useState } from "react";

const PLATFORMS = [
  { name: "Google", logo: "https://cdn.simpleicons.org/google/111111" },
  { name: "Google Ads", logo: "https://cdn.simpleicons.org/googleads/111111" },
  { name: "Meta", logo: "https://cdn.simpleicons.org/meta/111111" },
  { name: "TikTok", logo: "https://cdn.simpleicons.org/tiktok/111111" },
  { name: "Google Analytics", logo: "https://cdn.simpleicons.org/googleanalytics/111111" },
  { name: "Tag Manager", logo: "https://cdn.simpleicons.org/googletagmanager/111111" },
  { name: "Search Console", logo: "https://cdn.simpleicons.org/googlesearchconsole/111111" },
];

export default function PlatformEcosystem() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="platform-ecosystem-section">
      <div className="platform-eco-inner">
        <div className="platform-eco-heading">
          <h2>Tüm reklam ekosistemi tek merkezde.</h2>
          <p>
            Müşterilerinizin dijital ayak izi bıraktığı her platformda, 
            resmi partnerliklerimiz ve derin uzmanlığımızla yanınızdayız.
          </p>
        </div>

        <div className="platform-marquee-wrapper">
          <div className="platform-marquee">
            {[...PLATFORMS, ...PLATFORMS].map((platform, i) => (
              <div key={i} className="platform-badge">
                <div className="platform-logo-box">
                  <img src={platform.logo} alt={platform.name} loading="lazy" />
                </div>
                <span>{platform.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
