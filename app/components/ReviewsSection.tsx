import { A } from "@/app/lib/utils";

export default function ReviewsSection() {
  return (
    <section className="section_reviews">
      <div className="padding-global">
        <div className="container-large">
          <div className="reviews_layout">
            {/* Desktop image */}
            <div className="reviews_img-wrap">
              <img src={A("68bc1a447e73b0da2a03295c_reviews-img.avif")}
                alt=""
                className="reviews_img"
                loading="lazy"
                decoding="async"
              />
            </div>
            {/* Mobile top image */}
            <div className="reviews_m-img-wrap">
              <img src={A("68bc1a447e73b0da2a03296b_Reviews-M-Top.avif")}
                alt=""
                className="reviews_m-img"
                loading="lazy"
                decoding="async"
              />
            </div>
            {/* Head */}
            <div className="reviews_head-wrap">
              <h2 className="reviews_head heading-2" style={{ color: '#111' }}>
                Özenle Üretilen İşler.
                <br />
                Güvenle Kurulan Ortaklıklar.
              </h2>
              <div className="spacer-xsmedium" />
              <p className="reviews_p subhead" style={{ color: '#333' }}>
                Markaların dijitalde daha güçlü görünmesi için strateji,
                tasarım ve performansı aynı masada buluşturuyoruz.
              </p>
            </div>
            {/* Mobile bottom image */}
            <div className="reviews_m-img-wrap is-bottom">
              <img src={A("68bc1a447e73b0da2a032965_Reviews-M-Bottom.avif")}
                alt=""
                className="reviews_m-img"
                loading="lazy"
                decoding="async"
              />
              <div className="reviews_m-img-overlay" />
            </div>
            {/* Reviews removed per user request */}
          </div>
        </div>
      </div>
    </section>
  );
}
