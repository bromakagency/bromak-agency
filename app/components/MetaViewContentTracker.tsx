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
    trackViewContent({ content_name, content_category });
  }, [content_name, content_category]);

  return null;
}
