import { A, usesData } from "@/app/lib/utils";

export default function UsesSection() {
  return (
    <section className="section_uses">
      <div className="padding-global">
        <div className="container-large">
          <div className="uses_layout">
            <div className="uses_head-wrap">
              <h2 className="uses_head heading-2" style={{ color: '#111' }}>Markalar İçin Uçtan Uca Üretim</h2>
              <p className="uses_p subhead" style={{ color: '#333' }}>
                Stratejiden tasarıma, içerikten performansa kadar markanızın
                ihtiyaç duyduğu yaratıcı üretimi tek akışta topluyoruz.
              </p>
            </div>
            <div className="spacer-large" />
            <div className="uses_grid">
              {usesData.map((u, i) => (
                <div key={i} className="uses_card">
                  {(u.eye || u.title) && (
                    <div className="uses_content">
                      {u.eye && <div className="uses_eyebrow">{u.eye}</div>}
                      {u.title && (
                        <h3 className="uses_title">
                          {u.title.split("\n").map((line, idx, arr) => (
                            <span key={idx}>
                              {line}
                              {idx !== arr.length - 1 && <br />}
                            </span>
                          ))}
                        </h3>
                      )}
                    </div>
                  )}
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



