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
              <div className="preview_chip_wrap">
                <div className="preview_chip_icon">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M4.57596 9.80078C5.33893 11.0234 6.58104 11.8242 8.00001 11.8242C9.41897 11.8242 10.6611 11.0234 11.4241 9.80078C11.5104 9.66016 11.4932 9.47656 11.3628 9.38672C11.2325 9.27344 11.0519 9.27344 10.9216 9.39453C10.2621 10.4844 9.17439 11.1172 8.00001 11.1172C6.82564 11.1172 5.73791 10.4844 5.07845 9.39453C4.94814 9.27344 4.76752 9.27344 4.63721 9.38672C4.50689 9.47656 4.48955 9.66016 4.57596 9.80078ZM8.00001 1C4.13673 1 1 4.14062 1 8C1 11.8594 4.13673 15 8.00001 15C11.8633 15 15 11.8594 15 8C15 4.14062 11.8633 1 8.00001 1Z"
                      fill="#FF9500"
                    />
                  </svg>
                </div>
                <span>AI Intelligence</span>
                <div className="preview_chip_blob" />
              </div>
              <h2 className="heading-2">
                Meet Your Personal
                <br />
                Health Companion
              </h2>
              <p className="subhead">
                From workouts to meals to sleep, Bevel&apos;s AI connects the
                dots between your daily choices and how your body responds.
              </p>
            </div>
            <div className="spacer-xlarge" />

            {/* Cards grid */}
            <div className="preview_grid">
              {/* Card 1 — Training */}
              <div
                className="preview_card"
                data-parallax="trigger"
                data-parallax-disable="tablet"
              >
                <div className="preview_text-wrap">
                  <h3 className="preview_card-title">Training</h3>
                </div>
                <div className="preview_01-content">
                  <div className="preview_blob_wrap is-11">
                    <BlobBg />
                    <div className="preview_blob_inner">
                      <div className="preview_01-blob-header">
                        <div>
                          <div className="preview_blob_text is-title">
                            Planned Workout ⚡️
                          </div>
                          <div className="preview_blob-subtext">
                            Based on your goals
                          </div>
                        </div>
                        <div className="preview_01-icon">
                          <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
                            <rect width="38" height="38" rx="19" fill="white" fillOpacity="0.15" />
                            <path d="M23.5625 13.1875L22.625 14.375L18.6875 19.625H15.125L14.7188 19.0625C14.1875 18.2812 13.3125 17.8125 12.375 17.8125H12.0312L10.4375 19.9375L11 20.375C11.625 20.8438 12 21.5625 12 22.3438V22.625L12.8125 23.625L14.3125 22.625L15.1562 23.4375H18.75L20.0312 22.0937L21.4375 23.4375L23.5 19.625H25.1875V23.1562C25.1875 23.5 25.4375 23.75 25.75 23.75H26.1562C26.5 23.75 26.75 23.5 26.75 23.1562V17.2812C26.75 16.9375 26.5 16.6875 26.1562 16.6875H25.75C25.4375 16.6875 25.1875 16.9375 25.1875 17.2812V18.625H24.0312L23.5625 13.1875Z" fill="white" fillOpacity="0.55" />
                          </svg>
                        </div>
                      </div>
                      <div className="preview_01-sublist">
                        {["Back Squat", "Plank", "Arch Hold"].map((ex) => (
                          <div key={ex} className="preview_01-subitem">
                            <div className="preview_blob-subitem-title">
                              <strong>{ex}</strong>
                            </div>
                            <div className="preview_blob-subitem-subtext">
                              {ex === "Back Squat" ? "Barbell" : "Bodyweight"}{" "}
                              <span className="preview_01-subitem-middot">•</span>{" "}
                              5 sets
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="preview_blob_wrap is-12">
                    <BlobBg />
                    <div className="preview_blob_inner">
                      <div className="preview_blob_text">
                        Let me know if you need anything else!
                      </div>
                    </div>
                  </div>
                </div>
                <img src={A("68bc1a447e73b0da2a0329b0_prev-01-bg.avif")}
                  alt=""
                  className="preview_card-bg"
                />
                <img src={A("68bc1a447e73b0da2a0329a2_prev-01-person.avif")}
                  alt=""
                  className="preview_01-person"
                  data-parallax="trigger"
                  data-parallax-start="5"
                  data-parallax-end="-10"
                />
              </div>

              {/* Card 2 — Fueling Tomorrow */}
              <div className="preview_card is-2">
                <div className="preview_text-wrap is-2">
                  <h3 className="preview_card-title">Fueling Tomorrow</h3>
                </div>
                <div className="preview_blob_wrap is-21">
                  <BlobBg />
                  <div className="preview_blob_inner">
                    <div className="preview_blob-02-header">
                      <div className="preview_blob_text is-title">
                        Very protein-rich 💪
                      </div>
                      <div className="preview_blob-02-icon">
                        <ExpandIcon />
                      </div>
                    </div>
                    <div className="preview_blob_text">
                      This Salmon Poke Bowl is a powerhouse with{" "}
                      <strong>over 34 g of protein</strong> to support muscle
                      repair after your long run, but since you had it only 50
                      minutes before bedtime, aim for lighter meals next time for
                      smoother digestion and restful sleep.
                    </div>
                  </div>
                </div>
                <img src={A("68bc1a447e73b0da2a0329cc_preview-2-bg.avif")}
                  alt=""
                  className="preview_card-bg is-2"
                />
                <img src={A("68bc1a447e73b0da2a0329d8_preview-2-hand.avif")}
                  alt=""
                  className="preview_02-object"
                  data-parallax="trigger"
                  data-parallax-start="15"
                  data-parallax-end="0"
                />
                <img src={A("68bc1a447e73b0da2a0329bf_preview-2-callouts.avif")}
                  alt=""
                  className="preview_02-object"
                  data-parallax="trigger"
                  data-parallax-start="15"
                  data-parallax-end="0"
                />
                <img src={A("68c0b9da017bf48e8264a08f_1543a61efd8a0df2f643e0c78a2a382c_Intelligence.avif")}
                  alt=""
                  className="preview_02-mobile-bg"
                />
              </div>

              {/* Card 3 — Resetting */}
              <div className="preview_card is-2">
                <div className="preview_text-wrap">
                  <h3 className="preview_card-title">Resetting</h3>
                </div>
                <img src={A("68bc1a447e73b0da2a0329e9_c7418a4efee799d8dab406d33c6aaa9d_preview-03-bg.avif")}
                  alt=""
                  className="preview_card-bg is-3"
                  data-parallax="trigger"
                  data-parallax-start="0"
                  data-parallax-end="-10"
                />
                <div className="preview_03-list">
                  <div className="preview_blob_wrap is-21">
                    <div className="preview_blob_bg-wrap">
                      <div className="preview_blob_bg-m1" />
                      <div className="preview_blob_bg-reset-blue" />
                      <div className="preview_blob_bg-m2" />
                      <div className="preview_blob_bg-m3" />
                    </div>
                    <div className="preview_blob_inner">
                      <div className="preview_blob-02-header">
                        <div className="preview_blob_text is-title">
                          Almost a full recharge ⚡️
                        </div>
                        <div className="preview_blob-02-icon">
                          <ExpandIcon />
                        </div>
                      </div>
                      <div className="preview_blob_text">
                        You gave your body time to recharge, with{" "}
                        <strong>strong REM</strong> and{" "}
                        <strong>deep sleep</strong>. While your heart rate stayed
                        a bit elevated, possibly due to your late meal, your
                        overall sleep quality was still solid.
                      </div>
                    </div>
                  </div>
                  {[
                    "How does this compare to last month?",
                    "Any tips for falling asleep faster?",
                    "What\u2019s my usual sleep baseline?",
                  ].map((q, i) => (
                    <div key={i} className="preview_blob_wrap is-32">
                      <BlobBg />
                      <div className="preview_blob_inner">
                        <div className="preview_blob-02-header">
                          <div className="preview_blob_text is-title">{q}</div>
                          <div className="preview_blob-03-icon">
                            <ArrowUpIcon />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card 4 — Finding Balance */}
              <div className="preview_card is-2 is-last">
                <div className="preview_text-wrap is-2">
                  <h3 className="preview_card-title">Finding Balance</h3>
                </div>
                <div className="preview_blob_wrap is-21">
                  <BlobBg />
                  <div className="preview_blob_inner">
                    <div className="preview_blob-02-header">
                      <div className="preview_blob_text is-title">
                        Late caffeine, lower recovery 📉
                      </div>
                      <div className="preview_blob-02-icon">
                        <ExpandIcon />
                      </div>
                    </div>
                    <div className="preview_blob_text">
                      It seems like your HRV has been{" "}
                      <strong>decreasing significantly for the last 7 days</strong>.
                      Your sleep looks fine to me, but I&apos;ve noticed that you
                      recently started caffeine late into the afternoon which could
                      have impacted your sleep restfulness.
                    </div>
                  </div>
                </div>
                <img src={A("68bc1a447e73b0da2a032a07_prev-04-bg.avif")}
                  alt=""
                  className="preview_card-bg"
                />
                <img src={A("68bc1a447e73b0da2a0329f1_prev-04-illustration.svg")}
                  alt=""
                  className="preview_04-person"
                />
                <img src={A("68bc1a447e73b0da2a0329f9_prev-04-person.avif")}
                  alt=""
                  className="preview_04-person"
                  data-parallax="trigger"
                  data-parallax-start="15"
                  data-parallax-end="0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



