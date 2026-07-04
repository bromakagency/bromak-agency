"use client";

import { useEffect, useRef, useState } from "react";

const awards = [
  {
    year: "2023",
    title: "TRT Geleceğin İletişimcileri",
    category: "Radyo Programcılığı",
    placement: "İkincilik",
    image: "/assets/awards/trt-radyo-2023.svg",
  },
  {
    year: "2023",
    title: "TRT Geleceğin İletişimcileri",
    category: "Radyo Belgeseli",
    placement: "Üçüncülük",
    image: "/assets/awards/trt-radyo-belgesel-2023.svg",
  },
  {
    year: "2024",
    title: "TRT Geleceğin İletişimcileri",
    category: "İnternet Sitesi",
    placement: "Birincilik",
    image: "/assets/awards/trt-internet-sitesi-2024.svg",
  },
  {
    year: "2024",
    title: "TRT Geleceğin İletişimcileri",
    category: "Radyo Programcılığı",
    placement: "İkincilik",
    image: "/assets/awards/trt-radyo-2023.svg",
  },
  {
    year: "2025",
    title: "TRT Geleceğin İletişimcileri",
    category: "İnternet Sitesi",
    placement: "Üçüncülük",
    image: "/assets/awards/trt-internet-sitesi-2025.svg",
  },
  {
    year: "2025",
    title: "Aydın Doğan Genç İletişimciler",
    category: "İnternet Sitesi",
    placement: "Birincilik",
    image: "/assets/awards/aydin-dogan-internet-sitesi-2025.svg",
  },
];

export default function AwardsCarousel() {
  const [active, setActive] = useState(0);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const scrollToIndex = (index: number) => {
    const card = cardRefs.current[index];
    const track = card?.parentElement;

    if (card && track) {
      const trackWidth = track.clientWidth;
      const cardWidth = card.clientWidth;
      const cardLeft = card.offsetLeft;
      const scrollTarget = cardLeft - trackWidth / 2 + cardWidth / 2;

      track.scrollTo({
        left: scrollTarget,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const track = e.currentTarget;
    const trackCenter = track.scrollLeft + track.clientWidth / 2;

    let closestIndex = active;
    let minDistance = Infinity;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      const distance = Math.abs(cardCenter - trackCenter);

      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== active) {
      setActive(closestIndex);
    }
  };

  const move = (direction: -1 | 1) => {
    let next = active + direction;
    if (next < 0) next = awards.length - 1;
    if (next >= awards.length) next = 0;
    scrollToIndex(next);
  };

  return (
    <section className="awards-showcase" aria-label="Bromak ödülleri">
      <div className="awards-copy">
        <span className="about-eyebrow">ÖDÜLLERİMİZ</span>
        <h2>
          Başarılarımız
          <br />
          her yıl daha da
          <br />
          büyüyor.
        </h2>
        <p>
          Yaratıcı vizyonumuz ve disiplinli çalışma anlayışımız ulusal
          yarışmalarda ödüllerle tescillendi.
        </p>
        <button type="button" onClick={() => scrollToIndex(0)}>
          Tüm Ödüller <span>↗</span>
        </button>
      </div>

      <div className="awards-slider">
        <button
          className="award-nav award-nav-prev"
          type="button"
          onClick={() => move(-1)}
          aria-label="Önceki ödül"
        >
          ←
        </button>

        <div className="award-card-track" onScroll={handleScroll}>
          {awards.map((award, index) => (
            <article
              ref={(node) => {
                cardRefs.current[index] = node;
              }}
              className={`award-slide-card${index === active ? " active" : ""}`}
              key={`${award.year}-${award.category}-${index}`}
              onClick={() => scrollToIndex(index)}
            >
              <img
                src={award.image}
                alt={`${award.title} ${award.category}`}
                loading="lazy"
                decoding="async"
              />
              <div>
                <h3>{award.title}</h3>
                <p>{award.category}</p>
                <b>{award.placement}</b>
              </div>
            </article>
          ))}
        </div>

        <button
          className="award-nav award-nav-next"
          type="button"
          onClick={() => move(1)}
          aria-label="Sonraki ödül"
        >
          →
        </button>

        <div className="award-year-timeline">
          {awards.map((award, index) => (
            <button
              type="button"
              className={index === active ? "active" : ""}
              key={`${award.year}-${award.category}-${index}-timeline`}
              onClick={() => scrollToIndex(index)}
            >
              <strong>{award.year}</strong>
              <span />
              <small>{award.category}</small>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
