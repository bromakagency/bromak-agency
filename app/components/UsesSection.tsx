import { A, usesData } from "@/app/lib/utils";

export default function UsesSection() {
  return (
    <section className="section_uses">
      <div className="padding-global">
        <div className="container-large">
          <div className="uses_layout">
            <div className="uses_head-wrap">
              <h2 className="uses_head heading-2">Designed for Daily Life</h2>
              <p className="uses_p subhead">
                From stress and energy to sleep and habits, Bevel helps you stay
                in sync with your body and build routines that support it.
              </p>
            </div>
            <div className="spacer-large" />
            <div className="uses_grid">
              {usesData.map((u, i) => (
                <div key={i} className="uses_card">
                  <div className="uses_content">
                    <div className="uses_eyebrow">{u.eye}</div>
                    <h3 className="uses_title">
                      {u.title.split("\n").map((line, idx, arr) => (
                        <span key={idx}>
                          {line}
                          {idx !== arr.length - 1 && <br />}
                        </span>
                      ))}
                    </h3>
                  </div>
                  <img src={A(u.img)}
                    alt=""
                    className="uses_img"
                    data-parallax="trigger"
                    data-parallax-start="0"
                    data-parallax-end="3"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



