"use client";

import { useEffect, useState } from "react";
import "./seo-components.css";

const TOOLS = [
  { name: "Semrush", logo: "https://cdn.simpleicons.org/semrush/111111" },
  { name: "Ahrefs", logo: "/assets/ahrefs_logos.svg", isCustom: true },
  { name: "Search Console", logo: "https://cdn.simpleicons.org/googlesearchconsole/111111" },
  { name: "Analytics", logo: "https://cdn.simpleicons.org/googleanalytics/111111" },
  { name: "Lighthouse", logo: "https://cdn.simpleicons.org/lighthouse/111111" },
  { name: "Yoast SEO", logo: "https://cdn.simpleicons.org/yoast/111111" },
];

export default function SeoToolEcosystem() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="seo-tool-section">
      <div className="seo-tool-inner">
        <div className="seo-tool-heading">
          <h2>Dünya Standartlarında SEO Araçları</h2>
          <p>
            Sitenizi optimize ederken global ölçekte kendini kanıtlamış, 
            endüstri lideri analiz ve ölçümleme araçlarını kullanıyoruz.
          </p>
        </div>

        <div className="seo-tool-marquee-wrapper">
          <div className="seo-tool-marquee left-to-right">
            {[...TOOLS, ...TOOLS].map((tool, i) => (
              <div key={`top-${i}`} className="seo-tool-badge">
                <div className="seo-tool-logo">
                  <img 
                    src={tool.logo} 
                    alt={tool.name} 
                    loading="lazy" 
                    style={tool.isCustom ? { filter: 'grayscale(100%) brightness(0.1)' } : undefined}
                  />
                </div>
                <span>{tool.name}</span>
              </div>
            ))}
          </div>
          <div className="seo-tool-marquee right-to-left">
            {[...TOOLS, ...TOOLS].reverse().map((tool, i) => (
              <div key={`bottom-${i}`} className="seo-tool-badge">
                <div className="seo-tool-logo">
                  <img 
                    src={tool.logo} 
                    alt={tool.name} 
                    loading="lazy" 
                    style={tool.isCustom ? { filter: 'grayscale(100%) brightness(0.1)' } : undefined}
                  />
                </div>
                <span>{tool.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
