"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const STORY_DURATION = 4000;

const storyImages = [
  "/images/dies-markasi-1.png",
  "/images/dies-markasi.png",
  "/images/essen-markasi-1.png",
];

export default function StoryBentoCard() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % storyImages.length);
    }, STORY_DURATION);

    return () => window.clearTimeout(timer);
  }, [activeIndex]);

  return (
    <article className="bento-card bento-card-large bento-card-dark story-bento-card">
      <div className="story-progress" aria-hidden="true">
        {storyImages.map((_, index) => (
          <span
            key={index}
            className={[
              "story-progress-track",
              index < activeIndex ? "is-complete" : "",
              index === activeIndex ? "is-active" : "",
            ].join(" ")}
          >
            {index === activeIndex && (
              <span
                className="story-progress-fill"
                key={activeIndex}
                style={{ animationDuration: `${STORY_DURATION}ms` }}
              />
            )}
          </span>
        ))}
      </div>

      <div className="story-image-stack" aria-hidden="true">
        {storyImages.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt=""
            className={index === activeIndex ? "is-active" : ""}
            loading="lazy"
            decoding="async"
            fill
            style={{ objectFit: 'cover' }}
          />
        ))}
      </div>

      <div className="bento-content">
        <span>01 / Strateji</span>
        <h3>Platformlara özel büyüme planı</h3>
        <p>
          Hedef kitlenizi, rakiplerinizi ve marka tonunuzu analiz ederek Instagram,
          TikTok, LinkedIn ve diğer kanallar için net bir iletişim omurgası kuruyoruz.
        </p>
      </div>
    </article>
  );
}
