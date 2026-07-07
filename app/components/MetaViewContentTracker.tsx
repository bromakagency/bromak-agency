"use client";

import { useEffect } from "react";
import { trackViewContent } from "@/app/lib/meta-client";

export default function MetaViewContentTracker({ 
  content_name, 
  content_category 
}: { 
  content_name: string; 
  content_category: string; 
}) {
  useEffect(() => {
    // Wait a brief moment to ensure Next.js has fully updated the browser history state for the soft navigation
    const timeout = setTimeout(() => {
      trackViewContent({ 
        content_name, 
        content_category,
        event_source_url: window.location.href
      });
    }, 100);
    
    return () => clearTimeout(timeout);
  }, [content_name, content_category]);

  return null;
}
