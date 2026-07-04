"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useCallback, type PointerEvent } from "react";

const SLIDE_DURATION = 4000;

export default function FeaturedWorksSlider({ works = [] }: { works: any[] }) {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const dragStartX = useRef<number | null>(null);
  const dragDeltaX = useRef(0);

  const featuredWorks = works.slice(0, 3);

  const goToPrevious = () => {
    setActiveIndex((current) => (current - 1 + featuredWorks.length) % featuredWorks.length);
  };

  if (featuredWorks.length === 0) return null;

  const goToNext = useCallback(() => {
    setActiveIndex((current) => (current + 1) % featuredWorks.length);
  }, [featuredWorks.length]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % featuredWorks.length);
    }, SLIDE_DURATION);

    return () => window.clearTimeout(timer);
  }, [activeIndex]);

  const openActiveWork = () => {
    router.push(`/isler/${featuredWorks[activeIndex].slug}`);
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    dragStartX.current = event.clientX;
    dragDeltaX.current = 0;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (dragStartX.current === null) return;
    dragDeltaX.current = event.clientX - dragStartX.current;
  };

  const handlePointerEnd = (event: PointerEvent<HTMLDivElement>) => {
    if (dragStartX.current === null) return;

    if (Math.abs(dragDeltaX.current) > 48) {
      if (dragDeltaX.current > 0) {
        goToPrevious();
      } else {
        goToNext();
      }
    } else if (Math.abs(dragDeltaX.current) < 8) {
      openActiveWork();
    }

    dragStartX.current = null;
    dragDeltaX.current = 0;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const activeWork = featuredWorks[activeIndex];

  return (
    <section className="featured-work" aria-label="Öne çıkan işler">
      <div
        className="featured-work-media"
        role="link"
        tabIndex={0}
        aria-label={`${activeWork.title} detayını aç`}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openActiveWork();
          }
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
      >

        {featuredWorks.map((work, index) => (
          <div key={work.id || work.title} className={`featured-slide ${index === activeIndex ? "is-active" : ""}`}>
            <img
              src={work.coverImage}
              alt={work.title}
              className="featured-cover"
              draggable={false}
            />
            {work.heroImage && (
              <img
                src={work.heroImage}
                alt={`${work.title} Logo`}
                className="featured-logo"
                draggable={false}
              />
            )}
          </div>
        ))}
      </div>

      <Link href={`/isler/${activeWork.slug}`} className="featured-work-content">
        <span>{activeWork.duration}</span>
        <h2>{activeWork.title}</h2>
      </Link>

      <div className="featured-work-dots" aria-label="Slider göstergesi">
        {featuredWorks.map((work, index) => (
          <button
            key={work.title}
            type="button"
            className={index === activeIndex ? "is-active" : ""}
            onClick={() => setActiveIndex(index)}
            aria-label={`${index + 1}. projeyi göster`}
          />
        ))}
      </div>

      <div className="featured-work-controls">
        <button type="button" onClick={goToPrevious} aria-label="Önceki proje">
          ‹
        </button>
        <button type="button" onClick={goToNext} aria-label="Sonraki proje">
          ›
        </button>
      </div>
    </section>
  );
}
