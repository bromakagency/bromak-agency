"use client";

import { useEffect, useRef, useState } from "react";

const socialVideos = [
  "http://aywah.neodest.com.tr/videos/video1.mp4",
  "http://aywah.neodest.com.tr/videos/video2.mp4",
  "http://aywah.neodest.com.tr/videos/video1.mp4",
  "http://aywah.neodest.com.tr/videos/video2.mp4",
  "http://aywah.neodest.com.tr/videos/video1.mp4",
  "http://aywah.neodest.com.tr/videos/video2.mp4",
];

const marqueeVideos = [...socialVideos, ...socialVideos];

function LazyVideoCard({ src }: { src: string }) {
  const cardRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting) setShouldLoad(true);
      },
      {
        root: null,
        rootMargin: "520px",
        threshold: 0.05,
      }
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (shouldLoad && isVisible) {
      video.play().catch(() => undefined);
    } else {
      video.pause();
    }
  }, [isVisible, shouldLoad]);

  return (
    <article className="video-card" ref={cardRef}>
      <video
        ref={videoRef}
        src={shouldLoad ? src : undefined}
        muted
        loop
        playsInline
        preload="none"
      />
    </article>
  );
}

export default function VideoShowcase() {
  return (
    <section className="social-video-showcase">
      <div className="video-showcase-heading">
        <span>REELS & KISA VİDEO</span>
        <h2>
          Sosyal medyada hareket eden içerikler<span>.</span>
        </h2>
        <p>
          Markanız için üretilen dikey video içeriklerini platform formatlarına uygun
          şekilde planlıyor, tasarlıyor ve yayına hazırlıyoruz.
        </p>
      </div>

      <div className="video-showcase-window" aria-label="Sosyal medya video örnekleri">
        <div className="video-showcase-track">
          {marqueeVideos.map((src, index) => (
            <LazyVideoCard src={src} key={`${src}-${index}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
