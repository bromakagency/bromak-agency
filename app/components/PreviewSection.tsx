import { A } from "@/app/lib/utils";

const ExpandIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M11.2188 7.71875L15.4375 3.5H12.75C12.3125 3.5 12 3.1875 12 2.75C12 2.34375 12.3125 2 12.75 2H17.2188C17.6562 2 17.9688 2.34375 17.9688 2.75V7.25C17.9688 7.6875 17.6562 8 17.2188 8C16.8125 8 16.4688 7.6875 16.4688 7.25V4.5625L12.25 8.78125C11.9688 9.09375 11.5 9.09375 11.2188 8.78125C10.9062 8.5 10.9062 8.03125 11.2188 7.71875ZM8.78125 12.2812L4.53125 16.5H7.25C7.65625 16.5 8 16.8438 8 17.25C8 17.6875 7.65625 18 7.25 18H2.75C2.3125 18 2 17.6875 2 17.25V12.75C2 12.3438 2.3125 12 2.75 12C3.15625 12 3.5 12.3438 3.5 12.75V15.4688L7.71875 11.25C8 10.9375 8.46875 10.9375 8.78125 11.25C9.0625 11.5312 9.0625 12 8.78125 12.2812Z"
      fill="white"
      fillOpacity="0.4"
    />
  </svg>
);

const ArrowUpIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <rect width="28" height="28" rx="14" fill="#222326" fillOpacity="0.2" />
    <path
      d="M9.42676 13.1543C9.21257 13.1543 9.03255 13.0837 8.88672 12.9424C8.74544 12.7965 8.6748 12.612 8.6748 12.3887C8.6748 12.179 8.75684 11.9899 8.9209 11.8213L13.4121 7.31641C13.4941 7.23893 13.5853 7.17969 13.6855 7.13867C13.7858 7.0931 13.8906 7.07031 14 7.07031C14.1094 7.07031 14.2142 7.0931 14.3145 7.13867C14.4193 7.17969 14.5081 7.23893 14.5811 7.31641L19.0791 11.8213C19.2432 11.9899 19.3252 12.179 19.3252 12.3887C19.3252 12.612 19.2523 12.7965 19.1064 12.9424C18.9652 13.0837 18.7874 13.1543 18.5732 13.1543C18.4593 13.1543 18.3545 13.1338 18.2588 13.0928C18.1631 13.0518 18.0811 12.9948 18.0127 12.9219L16.4609 11.3906L13.9932 8.61523L11.5322 11.3906L9.9873 12.9219C9.91439 12.9948 9.83008 13.0518 9.73438 13.0928C9.64323 13.1338 9.54069 13.1543 9.42676 13.1543ZM14 20.0654C13.7676 20.0654 13.5785 19.9902 13.4326 19.8398C13.2868 19.694 13.2139 19.5026 13.2139 19.2656V10.9258L13.2959 8.64258C13.2959 8.42839 13.3597 8.25521 13.4873 8.12305C13.6195 7.99089 13.7904 7.9248 14 7.9248C14.2051 7.9248 14.3714 7.99089 14.499 8.12305C14.6312 8.25521 14.6973 8.42839 14.6973 8.64258L14.7861 10.9258V19.2656C14.7861 19.5026 14.7132 19.694 14.5674 19.8398C14.4215 19.9902 14.2324 20.0654 14 20.0654Z"
      fill="white"
    />
  </svg>
);

function BlobBg() {
  return (
    <div className="preview_blob_bg-wrap">
      <div className="preview_blob_bg-m1" />
      <div className="preview_blob_bg-m2" />
      <div className="preview_blob_bg-m3" />
    </div>
  );
}

export default function PreviewSection() {
  return (
    <section className="section_preview" data-banner-trigger="">
      <div className="padding-global">
        <div className="container-large">
          <div className="preview_layout">
            {/* Header */}
            <div className="preview_head-wrap">
              <h2 className="heading-2" style={{ color: "#111" }}>
                Markanız İçin
                <br />
                Stratejik Üretim Alanı
              </h2>
              <p className="subhead" style={{ color: "#444" }}>
                Öncü bir Konya reklam ajansı olarak; fikir, tasarım, içerik ve performans kararlarını aynı yaratıcı
                akışta birleştirerek markanızın dijital varlığını güçlendiriyoruz.
              </p>
            </div>
            <div className="spacer-xlarge" />

            {/* Cards grid */}
            <div className="preview_grid">
              {/* Card 1 — Strategy */}
              <div
                className="preview_card"
                data-parallax="trigger"
                data-parallax-disable="tablet"
              >
                {/* Overlays removed per user request */}
                <picture>
                  <source media="(max-width: 767px)" srcSet="/images/dizgiline_elektronik_websitesi_mobil.webp" />
                  <img src="/images/dizgiline_elektonik_website.webp"
                    alt="Dizgiline Elektronik web sitesi"
                    className="preview_card-bg"
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
                {/* 
                <img src={A("68bc1a447e73b0da2a0329a2_prev-01-person.avif")}
                  alt=""
                  className="preview_01-object is-2"
                  loading="lazy"
                  decoding="async"
                  data-parallax="trigger"
                  data-parallax-start="5"
                  data-parallax-end="-10"
                />
                */}
              </div>

              {/* Card 2 — Content */}
              <div className="preview_card is-2">
                {/* Overlays removed per user request */}
                <picture>
                  <source media="(max-width: 767px)" srcSet="/images/tuana_gida_websitesi_mobil.webp" />
                  <img src="/images/tuana_gida_website.webp"
                    alt="Tuana Gıda web sitesi"
                    className="preview_card-bg"
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
              </div>

              {/* Card 3 — Design */}
              <div className="preview_card is-2">
                {/* Overlays removed per Proje Galerisi (Sürükle Bırak)user request */}
                <picture>
                  <source media="(max-width: 767px)" srcSet="/images/konfiat_web_sitesi_mobil.webp" />
                  <img src="/images/konfiat_web_sitesi.webp"
                    alt="Konfiat web sitesi"
                    className="preview_card-bg"
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
              </div>

              {/* Card 4 — Growth */}
              <div className="preview_card is-2 is-last">
                <picture>
                  <source media="(max-width: 767px)" srcSet="/images/parlak_mobilya_web_sitesi_mobil.webp" />
                  <img src="/images/parlak_mobilya_web_sitesi.webp"
                    alt="Parlak Mobilya web sitesi"
                    className="preview_card-bg"
                    loading="lazy"
                    decoding="async"
                  />
                </picture>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



