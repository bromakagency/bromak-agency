"use client";

import { useState, useEffect } from "react";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";

type Props = {
  gallery: string[];
  title: string;
};

export default function WorkGalleryClient({ gallery, title }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Klavyedeki yön tuşları ve ESC için
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") setIsOpen(false);
      if (e.key === "ArrowLeft") prevImg();
      if (e.key === "ArrowRight") nextImg();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex]);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
    document.body.style.overflow = "hidden"; // Scroll'u kilitle
  };

  const closeLightbox = () => {
    setIsOpen(false);
    document.body.style.overflow = ""; // Scroll'u geri aç
  };

  const nextImg = () => {
    setCurrentIndex((prev) => (prev + 1) % gallery.length);
  };

  const prevImg = () => {
    setCurrentIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextImg();
    } else if (isRightSwipe) {
      prevImg();
    }
  };

  return (
    <>
      <section className="work-detail-grid" aria-label={`${title} proje görselleri`}>
        {gallery.map((item, index) => {
          const [url, span = "small", fit = "cover"] = item.split("|");
          let spanClass = "bento-small";
          if (span === "wide") spanClass = "bento-wide";
          if (span === "tall") spanClass = "bento-tall";
          if (span === "large") spanClass = "bento-large";

          return (
            <figure 
              className={`work-detail-tile clickable-tile ${spanClass}`} 
              key={`${url}-${index}`}
              onClick={() => openLightbox(index)}
              style={{ backgroundColor: "transparent" }}
            >
              <img
                src={url}
                alt={`Galeri ${index + 1}`}
                loading="lazy"
                decoding="async"
              />
            </figure>
          );
        })}
      </section>

      {/* Lightbox Modal */}
      {isOpen && (
        <div 
          className="lightbox-overlay" 
          onClick={closeLightbox}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <button className="lightbox-close" onClick={closeLightbox}>
            <FiX size={32} />
          </button>
          
          <button className="lightbox-nav prev" onClick={(e) => { e.stopPropagation(); prevImg(); }}>
            <FiChevronLeft size={48} />
          </button>
          
          <img 
            src={gallery[currentIndex].split("|")[0]} 
            alt={`Galeri ${currentIndex + 1}`} 
            className="lightbox-image"
            onClick={(e) => e.stopPropagation()} // Resme tıklayınca kapanmasın
          />
          
          <button className="lightbox-nav next" onClick={(e) => { e.stopPropagation(); nextImg(); }}>
            <FiChevronRight size={48} />
          </button>
          
          <div className="lightbox-counter">
            {currentIndex + 1} / {gallery.length}
          </div>
        </div>
      )}
    </>
  );
}
