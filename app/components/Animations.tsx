"use client";
import { useEffect } from "react";
import type { gsap as GSAP } from "gsap";
import type { ScrollTrigger as ST } from "gsap/ScrollTrigger";

export default function Animations() {
  useEffect(() => {
    // Store references for cleanup
    let lenis: {
      on: (e: string, cb: () => void) => void;
      raf: (t: number) => void;
      destroy: () => void;
    } | null = null;
    let tickerFn: ((time: number) => void) | null = null;
    let scrollHandler: (() => void) | null = null;
    let gsapRef: typeof GSAP | null = null;
    let isDestroyed = false;

    const init = async () => {
      const gsapModule = await import("gsap");
      const stModule = await import("gsap/ScrollTrigger");
      const lenisModule = await import("lenis");

      if (isDestroyed) return;

      gsapRef = gsapModule.default;
      const ScrollTrigger = stModule.ScrollTrigger;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const Lenis = lenisModule.default as new () => any;

      gsapRef.registerPlugin(ScrollTrigger);

      // Lenis smooth scroll
      lenis = new Lenis();
      lenis?.on("scroll", ScrollTrigger.update);
      tickerFn = (time: number) => lenis?.raf(time * 1000);
      gsapRef.ticker.add(tickerFn);
      gsapRef.ticker.lagSmoothing(0);

      // Init all animations
      initPhoneScreenScroll(gsapRef, ScrollTrigger);
      initButtonCharacterStagger();
      initGlobalParallax(gsapRef);
      initSlider(gsapRef);
      initCSSMarquee();
      scrollHandler = initDetectScrollingDirection();
      initAnimations(gsapRef, ScrollTrigger);
      initMobileBannerShow(ScrollTrigger);
    };

    init();

    return () => {
      isDestroyed = true;
      // Kill all ScrollTriggers
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        ScrollTrigger.getAll().forEach((t) => t.kill());
        ScrollTrigger.clearScrollMemory();
      });
      // Stop Lenis
      if (lenis) {
        lenis.destroy();
        lenis = null;
      }
      // Remove GSAP ticker
      if (gsapRef && tickerFn) {
        gsapRef.ticker.remove(tickerFn);
      }
      // Remove scroll listener
      if (scrollHandler) {
        window.removeEventListener("scroll", scrollHandler);
      }
    };
  }, []);

  return null;
}

function initPhoneScreenScroll(gsap: typeof GSAP, ScrollTrigger: typeof ST) {
  const track = document.querySelector("[data-phone-screen-track]");
  if (!track) return;
  let currentStep = 0;

  for (let i = 2; i <= 4; i++) {
    const trigger = document.querySelector(`[data-phone-trigger="${i}"]`);
    const prevHeader = document.querySelector(`[data-phone-header="${i - 1}"]`);
    const nextHeader = document.querySelector(`[data-phone-header="${i}"]`);

    ScrollTrigger.create({
      trigger,
      start: "top top",
      onEnter: () => {
        currentStep = i - 1;
        gsap.to(track, {
          yPercent: -25 * currentStep,
          duration: 0.75,
          ease: "power2.out",
        });
        document
          .querySelectorAll("[data-phone-header]")
          .forEach((h: Element) => h.classList.remove("active"));
        nextHeader?.classList.add("active");
      },
      onEnterBack: () => {
        currentStep = i - 2;
        gsap.to(track, {
          yPercent: -25 * currentStep,
          duration: 0.5,
          ease: "power2.out",
        });
        document
          .querySelectorAll("[data-phone-header]")
          .forEach((h: Element) => h.classList.remove("active"));
        prevHeader?.classList.add("active");
      },
      markers: false,
    });
  }
}

function initButtonCharacterStagger() {
  const offsetIncrement = 0.01;
  const buttons = document.querySelectorAll("[data-button-animate-chars]");
  buttons.forEach((button) => {
    const text = button.textContent || "";
    button.innerHTML = "";
    [...text].forEach((char, index) => {
      const span = document.createElement("span");
      span.textContent = char;
      span.style.transitionDelay = `${index * offsetIncrement}s`;
      if (char === " ") span.style.whiteSpace = "pre";
      button.appendChild(span);
    });
  });
}

function initGlobalParallax(gsap: typeof GSAP) {
  const mm = gsap.matchMedia();
  mm.add(
    {
      isMobile: "(max-width:479px)",
      isMobileLandscape: "(max-width:767px)",
      isTablet: "(max-width:991px)",
      isDesktop: "(min-width:992px)",
    },
    (context) => {
      const { isMobile, isMobileLandscape, isTablet } = context.conditions || {};
      const ctx = gsap.context(() => {
        document
          .querySelectorAll('[data-parallax="trigger"]')
          .forEach((trigger: Element) => {
            const disable = trigger.getAttribute("data-parallax-disable");
            if (
              (disable === "mobile" && isMobile) ||
              (disable === "mobileLandscape" && isMobileLandscape) ||
              (disable === "tablet" && isTablet)
            )
              return;
            const target =
              trigger.querySelector('[data-parallax="target"]') || trigger;
            const direction =
              trigger.getAttribute("data-parallax-direction") || "vertical";
            const prop = direction === "horizontal" ? "xPercent" : "yPercent";
            const scrubAttr = trigger.getAttribute("data-parallax-scrub");
            const scrub = scrubAttr ? parseFloat(scrubAttr) : true;
            const startVal = parseFloat(
              trigger.getAttribute("data-parallax-start") || "20"
            );
            const endVal = parseFloat(
              trigger.getAttribute("data-parallax-end") || "-20"
            );
            const scrollStart = `clamp(${
              trigger.getAttribute("data-parallax-scroll-start") || "top bottom"
            })`;
            const scrollEnd = `clamp(${
              trigger.getAttribute("data-parallax-scroll-end") || "bottom top"
            })`;
            gsap.fromTo(
              target,
              { [prop]: startVal },
              {
                [prop]: endVal,
                ease: "none",
                scrollTrigger: {
                  trigger,
                  start: scrollStart,
                  end: scrollEnd,
                  scrub,
                },
              }
            );
          });
      });
      return () => ctx.revert();
    }
  );
}

function initSlider(gsap: typeof GSAP) {
  gsap.matchMedia().add("(min-width: 768px)", () => {
    import("swiper").then((SwiperModule) => {
      const Swiper = SwiperModule.default;
      import("swiper/modules").then((modules) => {
        const slider = new Swiper(".swiper", {
          modules: [modules.Autoplay],
          centeredSlides: true,
          slidesPerView: "auto",
          spaceBetween: 32,
          initialSlide: 1,
          loop: true,
          slideToClickedSlide: true,
          autoplay: {
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          },
        });
        return () => {
          if (slider) slider.destroy(true, true);
        };
      });
    });
  });
}

function initCSSMarquee() {
  const pixelsPerSecond = 75;
  const marquees = document.querySelectorAll("[data-css-marquee]");
  marquees.forEach((marquee) => {
    marquee
      .querySelectorAll("[data-css-marquee-list]")
      .forEach((list) => {
        const duplicate = list.cloneNode(true) as Element;
        marquee.appendChild(duplicate);
      });
  });
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target
          .querySelectorAll("[data-css-marquee-list]")
          .forEach((list) => {
            (list as HTMLElement).style.animationPlayState = entry.isIntersecting
              ? "running"
              : "paused";
          });
      });
    },
    { threshold: 0 }
  );
  marquees.forEach((marquee) => {
    marquee
      .querySelectorAll("[data-css-marquee-list]")
      .forEach((list) => {
        const el = list as HTMLElement;
        el.style.animationDuration = el.offsetWidth / pixelsPerSecond + "s";
        el.style.animationPlayState = "paused";
      });
    observer.observe(marquee);
  });
}

function initDetectScrollingDirection(): () => void {
  let lastScrollTop = 0;
  const threshold = 10;
  const thresholdTop = 50;

  const handler = () => {
    const nowScrollTop = window.scrollY;
    if (Math.abs(lastScrollTop - nowScrollTop) >= threshold) {
      const direction = nowScrollTop > lastScrollTop ? "down" : "up";
      document
        .querySelectorAll("[data-scrolling-direction]")
        .forEach((el) => el.setAttribute("data-scrolling-direction", direction));
      const started = nowScrollTop > thresholdTop;
      document
        .querySelectorAll("[data-scrolling-started]")
        .forEach((el) =>
          el.setAttribute("data-scrolling-started", started ? "true" : "false")
        );
      lastScrollTop = nowScrollTop;
    }
  };

  window.addEventListener("scroll", handler);
  return handler;
}

function initAnimations(gsap: typeof GSAP, ScrollTrigger: typeof ST) {
  const WRAP_COUNT = 4;

  const readRotation = (el: Element): number => {
    const st = getComputedStyle(el);
    const tr =
      st.transform || st.getPropertyValue("-webkit-transform") || "";
    if (!tr || tr === "none") return 0;
    const match = tr.match(/matrix\(([^)]+)\)/);
    if (!match) return 0;
    const values = match[1].split(",").map(Number);
    return Math.round(Math.atan2(values[1], values[0]) * (180 / Math.PI));
  };

  function buildDesktopSegment(i: number) {
    const wrap = document.querySelector(`[data-phone-items-wrap="${i}"]`);
    const startTrigger = document.querySelector(`[data-phone-trigger="${i}"]`);
    const endTrigger = document.querySelector(`[data-phone-trigger="${i + 1}"]`);
    if (!wrap || !startTrigger || !endTrigger) return;

    const items = Array.from(
      wrap.querySelectorAll("[data-phone-items]")
    ) as HTMLElement[];
    if (!items.length) return;

    const states = items.map((el) => {
      const cs = getComputedStyle(el);
      return {
        el,
        top: cs.top !== "auto" ? cs.top : null,
        left: cs.left !== "auto" ? cs.left : null,
        right: cs.right !== "auto" ? cs.right : null,
        bottom: cs.bottom !== "auto" ? cs.bottom : null,
        rotation: readRotation(el),
      };
    });

    states.forEach((s) => {
      if (s.right !== null) s.el.style.right = "auto";
      if (s.bottom !== null) s.el.style.bottom = "auto";
      gsap.set(s.el, {
        position: "absolute",
        top: "50%",
        left: "50%",
        xPercent: -50,
        yPercent: -50,
        x: 0,
        y: 0,
        rotation: 0,
        opacity: 1,
      });
    });

    const tl = gsap.timeline({ defaults: { duration: 1.1, ease: "power3.out" } });

    states.forEach((s, idx) => {
      const toVars: Record<string, string | number> = {
        xPercent: 0,
        yPercent: 0,
        rotation: s.rotation,
        opacity: 1,
      };
      if (s.top !== null) toVars.top = s.top;
      if (s.left !== null) toVars.left = s.left;
      if (s.right !== null) {
        toVars.right = s.right;
        toVars.left = "auto";
      }
      if (s.bottom !== null) {
        toVars.bottom = s.bottom;
        toVars.top = "auto";
      }
      tl.to(s.el, toVars, idx === 0 ? 0 : "<+=0.06");
    });

    tl.to({}, { duration: 0.6 });
    tl.to(items, { opacity: 0, duration: 0.6, stagger: 0.06 }, "+=0");

    ScrollTrigger.create({
      animation: tl,
      trigger: startTrigger,
      start: "top top",
      endTrigger: endTrigger,
      end: "top top",
      scrub: 1,
    });
  }

  function buildMobileSegment(i: number) {
    const wrap = document.querySelector(`[data-phone-items-wrap="${i}"]`);
    const startTrigger = document.querySelector(`[data-phone-trigger="${i}"]`);
    const endTrigger = document.querySelector(`[data-phone-trigger="${i + 1}"]`);
    if (!wrap || !startTrigger || !endTrigger) return;

    const items = Array.from(
      wrap.querySelectorAll("[data-phone-mobile-item]")
    ) as HTMLElement[];
    if (!items.length) return;

    gsap.set(items, { opacity: 0 });

    const tl = gsap.timeline({ defaults: { duration: 1.1, ease: "power3.out" } });
    tl.to(items, { opacity: 1, duration: 0.6, stagger: 0.06 });
    tl.to({}, { duration: 0.6 });
    tl.to(items, { opacity: 0, duration: 0.6, stagger: 0.06 }, "+=0");

    ScrollTrigger.create({
      animation: tl,
      trigger: startTrigger,
      start: "top top",
      endTrigger: endTrigger,
      end: "top top",
      scrub: 1,
    });
  }

  gsap.matchMedia().add("(min-width: 768px)", () => {
    for (let i = 1; i <= WRAP_COUNT; i++) buildDesktopSegment(i);
  });
  gsap.matchMedia().add("(max-width: 767px)", () => {
    for (let i = 1; i <= WRAP_COUNT; i++) buildMobileSegment(i);
  });
}

function initMobileBannerShow(ScrollTrigger: typeof ST) {
  const fixedEl = document.querySelector("[data-banner]");
  const triggerEl = document.querySelector("[data-banner-trigger]");
  if (!fixedEl || !triggerEl) return;
  let isBelow = false;
  let shown = false;
  const show = () => {
    if (shown) return;
    fixedEl.classList.add("is-banner-visible");
    shown = true;
  };
  const hide = () => {
    if (!shown) return;
    fixedEl.classList.remove("is-banner-visible");
    shown = false;
  };
  ScrollTrigger.create({
    trigger: triggerEl,
    start: "top center",
    onEnter: () => {
      isBelow = true;
      hide();
    },
    onLeaveBack: () => {
      isBelow = false;
      hide();
    },
    onRefresh: (self: ST) => {
      isBelow = self.progress > 0;
      hide();
    },
  });
  ScrollTrigger.create({
    onUpdate(self: ST) {
      if (!isBelow) {
        hide();
        return;
      }
      if (self.direction === -1) show();
      else hide();
    },
  });
}




