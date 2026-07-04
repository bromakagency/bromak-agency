"use client";

import { useEffect, useState } from "react";

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      // Top of the page scroll position
      const scrollY = window.scrollY;
      // Total scrollable height
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      if (scrollHeight > 0) {
        const currentProgress = (scrollY / scrollHeight) * 100;
        setProgress(Math.min(currentProgress, 100)); // Cap at 100%
      } else {
        setProgress(0);
      }
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    // Initial call
    updateProgress();

    return () => {
      window.removeEventListener("scroll", updateProgress);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "4px",
        width: `${progress}%`,
        background: "linear-gradient(90deg, #b31212, #f54040)",
        zIndex: 9999,
        transition: "width 0.1s ease-out",
        boxShadow: "0 0 10px rgba(245, 64, 64, 0.5)",
      }}
    />
  );
}
