import { A, sliderData, sliderMobileData } from "@/app/lib/utils";
import Image from "next/image";

export default function SliderSection() {
  return (
    <section className="section_slider">
      <div className="padding-global">
        <div className="container-large">
          <div className="slider_layout">
            <div className="spacer-large" />
            <div className="spacer-large" />
            {/* Desktop Swiper */}
            <div className="slider_wrap swiper">
              <div className="slider_list swiper-wrapper">
                {sliderData.map((s, i) => (
                  <div key={i} className="slider_slide swiper-slide">
                    <div className="slider_img-wrap">
                      <Image src={A(s.img)} alt="" className="slider_img" fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
                    </div>
                    <div className="slider_slide-content">
                      <h3 className="slider_title">{s.title}</h3>
                      <p className="slider_p">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile list */}
            <div className="slider_mobile_list">
              {sliderMobileData.map((s, i) => (
                <div
                  key={i}
                  className={`slider_mobile_slide${s.isWide ? " is-1" : ""}`}
                >
                  <Image src={A(s.img)} alt="" className="slider_mobile_img" fill sizes="100vw" style={{ objectFit: 'cover' }} />
                  <div className="slider_mobile_content">
                    <h3 className="slider_mobile_title">{s.title}</h3>
                    <p className="slider_mobile_p">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="slider_divider-wrap">
              <Image src={A("68be9374e082493b98603444_divider.svg")}
                alt=""
                className="slider_divider-img"
                width={1260}
                height={20}
              />
              <Image src={A("68be93765ba5fbacdfa696d1_divider-mobile.svg")}
                alt=""
                className="slider_divider-img-mobile"
                width={430}
                height={20}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



