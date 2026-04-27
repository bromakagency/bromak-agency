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

export default function CTASection() {
  return (
    <section className="section_cta">
      <div className="padding-global">
        <div className="container-large">
          <div className="cta_head-wrap">
            <h2 className="cta_head heading-2">
              Start Living Better.
              <br />
              Download Bevel Today.
            </h2>
            <div className="spacer-xsmedium" />
            <Link href="#" className="button-stagger is-cta">
              <div className="button-icon">
                <AppleIcon />
              </div>
              <div data-button-animate-chars="">Download Bevel</div>
            </Link>
          </div>
          <div className="spacer-large" />
          <div className="cta_img-wrap">
            <div className="cta_img-inner">
              <img src={A("697932c9f70080112ecb4132_cta-image-new.avif")}
                alt=""
                className="cta_p-img"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}




