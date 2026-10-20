import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/bromakhome/", "/api/", "/bultenden-ayril"],
    },
    sitemap: "https://bromakagency.com/sitemap.xml",
  };
}
