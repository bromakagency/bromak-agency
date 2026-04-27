import Link from "next/link";
import { A } from "@/app/lib/utils";

const AppleIcon = () => (
  <svg width="19" height="22" viewBox="0 0 19 22" fill="none">
    <path
      d="M14.5384 11.4959C14.5543 9.73875 15.4501 8.09141 16.9197 7.14703C15.9842 5.82313 14.5384 5.01203 12.9371 4.92375C11.2876 4.75266 9.62622 5.92906 8.81513 5.92906C7.98812 5.92906 6.60206 4.93969 5.22397 4.96781C3.39178 5.02406 1.70903 6.04156 0.821875 7.66875C-1.03047 10.9747 0.338 15.8109 2.11312 18.5003C3.00433 19.8163 4.03775 21.2816 5.41381 21.2334C6.75812 21.1769 7.24853 20.3658 8.88794 20.3658C10.5114 20.3658 10.9697 21.2334 12.3701 21.2013C13.8076 21.1769 14.6989 19.8725 15.558 18.5406C16.1929 17.6127 16.6833 16.5952 17.0135 15.5213C15.252 14.775 14.5404 12.7261 14.5384 11.4959Z"
      fill="currentColor"
    />
    <path
      d="M11.8829 3.20859C12.6699 2.27016 13.0523 1.06562 12.9531 0.851562C11.7547 0.974531 10.6568 1.54547 9.85778 2.44266C9.07466 3.32188 8.67634 4.46609 8.75862 5.56406C9.96478 5.57694 11.1199 5.03813 11.8829 3.20859Z"
      fill="currentColor"
    />
  </svg>
);

export default function HeroSection() {
  return (
    <section className="section_hero">
      <div className="padding-global">
        <div className="container-large">
          <div className="hero_layout">
            <div className="hero_content">
              <div className="hero_header">
                <h1 className="hero_head heading-1 home-new-1">
                  sadece nitelikli
                  <br />
                  bir odak<span style={{ color: '#ff3b30' }}>.</span>
                </h1>
              </div>
              <div className="spacer-large" style={{ height: '14rem' }} />
              <div className="hero_awards_row">
                <style dangerouslySetInnerHTML={{
                  __html: `
                  @media (max-width: 768px) {
                    .hero_head.home-new-1 {
                      font-size: 2.8rem !important;
                      line-height: 1.1 !important;
                      padding: 0 1rem;
                      text-align: center;
                      word-break: break-word;
                      margin-top: 6rem;
                    }
                  }
                  @media (min-width: 769px) {
                    .hero_head.home-new-1 {
                      margin-top: 16rem;
                    }
                  }
                  .hero_awards_row {
                    position: relative;
                    width: 100%;
                    overflow: hidden;
                  }
                  .hero_awards_track {
                    display: flex;
                    align-items: center;
                    width: max-content;
                  }
                  .hero_awards_set {
                    display: flex;
                    align-items: center;
                    gap: 2rem;
                    padding-right: 2rem;
                  }
                  .hero_award_item {
                    flex: 0 0 auto;
                    display: flex;
                    align-items: center;
                  }
                  .hero_award_item img {
                    height: 180px;
                    width: auto;
                    filter: brightness(0) invert(1);
                    opacity: 0.75;
                  }
                  .hero_award_divider {
                    width: 1px;
                    height: 100px;
                    background: rgba(255,255,255,0.3);
                    flex: 0 0 auto;
                  }
                  @keyframes awardsScroll {
                    0%   { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                  }
                  @media (max-width: 768px) {
                    .hero_award_item img {
                      height: 120px;
                    }
                    .hero_award_divider {
                      height: 70px;
                    }
                    .hero_awards_track {
                      animation: awardsScroll 14s linear infinite;
                    }
                  }
                  @media (min-width: 769px) {
                    [aria-hidden="true"].hero_awards_set {
                      display: none;
                    }
                  }
                `}} />
                <div className="hero_awards_track">
                  {/* Set 1 */}
                  <div className="hero_awards_set">
                    <div className="hero_award_item">
                      <img src="/assets/awards/awards.svg" alt="TRT & Aydın Doğan Ödülü" />
                    </div>
                    <div className="hero_award_divider" />
                    <div className="hero_award_item">
                      <img src="/assets/awards/awards1.svg" alt="Kristal Elma Ödülü" />
                    </div>
                    <div className="hero_award_divider" />
                    <div className="hero_award_item">
                      <img src="/assets/awards/awards2.svg" alt="Altın Örümcek Ödülü" />
                    </div>
                    <div className="hero_award_divider" />
                    <div className="hero_award_item">
                      <img src="/assets/awards/awards3.svg" alt="The ONE Awards" />
                    </div>
                  </div>
                  {/* Set 2 — kopya (sadece mobil döngüsü için) */}
                  <div className="hero_awards_set" aria-hidden="true">
                    <div className="hero_award_item">
                      <img src="/assets/awards/awards.svg" alt="" />
                    </div>
                    <div className="hero_award_divider" />
                    <div className="hero_award_item">
                      <img src="/assets/awards/awards1.svg" alt="" />
                    </div>
                    <div className="hero_award_divider" />
                    <div className="hero_award_item">
                      <img src="/assets/awards/awards2.svg" alt="" />
                    </div>
                    <div className="hero_award_divider" />
                    <div className="hero_award_item">
                      <img src="/assets/awards/awards3.svg" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Hero backgrounds */}
      <img src={A("68bc1a447e73b0da2a0328f1_b2b3cf2ff166334a15ffb4a73828781d_Bevel-hero.avif")}
        alt=""
        className="hero_bg"
        fetchPriority="high"
        loading="eager"
      />
      <img src={A("68bc1a447e73b0da2a032954_4280eae8143d4a302184a8983a81746c_hero-mobile.avif")}
        alt=""
        className="hero_bg-mobile"
        fetchPriority="high"
        loading="eager"
      />
    </section>
  );
}




