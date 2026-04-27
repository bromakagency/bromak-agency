import { A, reviewsData } from "@/app/lib/utils";

const Star = () => (
  <div className="reviews_marquee_star">
    <svg width="25" height="25" viewBox="0 0 25 25" fill="none">
      <path
        d="M12.0187 2.4582C12.2351 1.79236 13.1771 1.79236 13.3934 2.4582L15.238 8.13518C15.3347 8.43296 15.6122 8.63457 15.9253 8.63457H21.8944C22.5945 8.63457 22.8856 9.53046 22.3192 9.94198L17.4901 13.4505C17.2368 13.6346 17.1308 13.9608 17.2276 14.2586L19.0721 19.9355C19.2885 20.6014 18.5264 21.1551 17.96 20.7436L13.1309 17.235C12.8776 17.051 12.5346 17.051 12.2813 17.235L7.45213 20.7436C6.88572 21.1551 6.12363 20.6014 6.33998 19.9355L8.18454 14.2586C8.28129 13.9608 8.1753 13.6346 7.922 13.4505L3.09287 9.94198C2.52647 9.53046 2.81756 8.63457 3.51767 8.63457H9.4868C9.7999 8.63457 10.0774 8.43296 10.1741 8.13518L12.0187 2.4582Z"
        fill="#FF9500"
      />
    </svg>
  </div>
);

const Stars = () => (
  <div className="reviews_marquee_star-list">
    {[...Array(5)].map((_, i) => (
      <Star key={i} />
    ))}
  </div>
);

function ReviewItem({ r }: { r: (typeof reviewsData)[0] }) {
  return (
    <div className="reviews_marquee_item">
      <div className="reviews_marquee_top">
        <div className="reviews_marquee_header">
          <div className="reviews_marquee_star-wrap">
            <Stars />
          </div>
          <div className="reviews_marquee_title">{r.title}</div>
          <div className="reviews_marquee_subtitle">
            <div>{r.user}</div>
          </div>
        </div>
      </div>
      <p className="reviews_marquee_quote">{r.quote}</p>
    </div>
  );
}

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
              />
            </div>
            {/* Mobile top image */}
            <div className="reviews_m-img-wrap">
              <img src={A("68bc1a447e73b0da2a03296b_Reviews-M-Top.avif")}
                alt=""
                className="reviews_m-img"
              />
            </div>
            {/* Head */}
            <div className="reviews_head-wrap">
              <h2 className="reviews_head heading-2">
                Crafted with Care.
                <br />
                Loved Everywhere.
              </h2>
              <div className="spacer-xsmedium" />
              <p className="reviews_p subhead">
                Don&apos;t take our words for it. See why Bevel is trusted and
                loved by people around the world who want to feel better, live
                longer, and train smarter.
              </p>
            </div>
            {/* Mobile bottom image */}
            <div className="reviews_m-img-wrap is-bottom">
              <img src={A("68bc1a447e73b0da2a032965_Reviews-M-Bottom.avif")}
                alt=""
                className="reviews_m-img"
              />
              <div className="reviews_m-img-overlay" />
            </div>
            <div className="spacer-xlarge" />
            {/* Desktop marquee */}
            <div data-css-marquee="" className="reviews_marquee_wrap">
              <div data-css-marquee-list="" className="reviews_marquee_collection">
                <div className="reviews_marquee_list">
                  {reviewsData.map((r, i) => (
                    <ReviewItem key={i} r={r} />
                  ))}
                </div>
              </div>
            </div>
            {/* Mobile reviews */}
            <div className="reviews_marquee_wrap is-mobile">
              <div className="reviews_marquee_collection">
                <div className="reviews_marquee_list">
                  {reviewsData.slice(0, 3).map((r, i) => (
                    <ReviewItem key={i} r={r} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



