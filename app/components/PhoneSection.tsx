import { A, phoneHeaders } from "@/app/lib/utils";

// Desktop UI item sets
const wrap1Desktop = [
  { src: "68bc1a457e73b0da2a032a3d_phone-item-01-01.svg", cls: "ui_01_item is-1" },
  { src: "68bc1a457e73b0da2a032a3f_phone-item-01-05.svg", cls: "ui_01_item is-2" },
  { src: "68bc1a457e73b0da2a032a3e_phone-item-01-03.svg", cls: "ui_01_item is-3" },
  { src: "68bc1a457e73b0da2a032a41_phone-item-01-02.svg", cls: "ui_01_item is-4" },
  { src: "68bc1a457e73b0da2a032a40_phone-item-01-06.svg", cls: "ui_01_item is-5" },
  { src: "68bc1a457e73b0da2a032a43_phone-item-01-04.svg", cls: "ui_01_item is-6" },
];
const wrap1Mobile = [
  "68bd3509f0c25110620cf894_Phone-Mobile-Item-01-01.avif",
  "68bd3509212540550b3cce50_Phone-Mobile-Item-01-02.avif",
  "68bd350bd2a2cfbea3c14325_Phone-Mobile-Item-01-03.avif",
  "68bd350a3dcc23923f34a7ef_Phone-Mobile-Item-01-04.avif",
];

const wrap2Desktop = [
  { src: "68bc1a457e73b0da2a032a4a_phone-02-06.avif", cls: "ui_02_item is-1" },
  { src: "68bc1a457e73b0da2a032a46_phone-02-03.svg", cls: "ui_02_item is-2" },
  { src: "68bc1a457e73b0da2a032a47_phone-02-02.svg", cls: "ui_02_item is-3" },
  { src: "6926cc45859729c1a69a7007_ad6039db3f109f2fe0b464d175ddade4_phone-02-01.avif", cls: "ui_02_item is-4" },
  { src: "68bc1a457e73b0da2a032a45_phone-02-04.svg", cls: "ui_02_item is-5" },
  { src: "68bc1a457e73b0da2a032a50_phone-02-05.avif", cls: "ui_02_item is-6" },
];
const wrap2Mobile = [
  "68bd3d6b98c7147394e57661_Phone-Mobile-Items-02-01.avif",
  "68bd3d6b558e9c33b7c7559b_Phone-Mobile-Items-02-02.avif",
  "68bd3d6b4e207f61a28e2d4c_Phone-Mobile-Items-02-03.avif",
  "68bd3d6b0cc400a6b093b505_Phone-Mobile-Items-02-04.avif",
];

const wrap3Desktop = [
  { src: "68bc1a457e73b0da2a032a55_phone-03-02.svg", cls: "ui_03_item is-1" },
  { src: "68bc1a457e73b0da2a032a56_phone-03-03.svg", cls: "ui_03_item is-2" },
  { src: "68bc1a457e73b0da2a032a54_phone-03-06.svg", cls: "ui_03_item is-3" },
  { src: "68bc1a457e73b0da2a032a68_phone-03-05.svg", cls: "ui_03_item is-4" },
  { src: "68bc1a457e73b0da2a032a69_phone-03-04.svg", cls: "ui_03_item is-5" },
  { src: "68bc1a457e73b0da2a032a6a_phone-03-01.svg", cls: "ui_03_item is-6" },
];
const wrap3Mobile = [
  "68bd3ecf0e5485bb6d999d32_Phone-Mobile-Items-03-01.avif",
  "68bd3ecfb82e6ba6402fc9b3_Phone-Mobile-Items-03-02.avif",
  "68bd3ecf0df74d5bdf163212_Phone-Mobile-Items-03-03.avif",
  "68bd3ecfe4df332308c13e8d_Phone-Mobile-Items-03-04.avif",
];

const wrap4Desktop = [
  { src: "68bc1a457e73b0da2a032a6d_phone-04-06.avif", cls: "ui_04_item is-1" },
  { src: "68bc1a457e73b0da2a032a72_phone-04-05.svg", cls: "ui_04_item is-2" },
  { src: "68bc1a457e73b0da2a032a73_phone-04-02.svg", cls: "ui_04_item is-3" },
  { src: "68bc1a457e73b0da2a032a75_phone-04-01.svg", cls: "ui_04_item is-4" },
  { src: "68bc1a457e73b0da2a032a74_phone-04-03.svg", cls: "ui_04_item is-5" },
  { src: "68bc1a457e73b0da2a032a71_phone-04-04.svg", cls: "ui_04_item is-6" },
];
const wrap4Mobile = [
  "68bd3f7c1bcd863f212b2927_Phone-Mobile-Items-04-01.avif",
  "68bd3f7c05de00e06b4026ab_Phone-Mobile-Items-04-02.avif",
  "68bd3f7cb70c6bf9ec3112c9_Phone-Mobile-Items-04-03.avif",
  "68bd3f7cfacc89f34cffa609_Phone-Mobile-Items-04-04.avif",
];

type UISet = { desktop: { src: string; cls: string }[]; mobile: string[] };

function UIWrap({ n, set }: { n: string; set: UISet }) {
  return (
    <div className="ui_wrap" data-phone-items-wrap={n}>
      {set.desktop.map((item, i) => (
        <img key={i} src={A(item.src)} alt="" className={item.cls} data-phone-items="" />
      ))}
      {set.mobile.map((src, i) => (
        <img key={i}
          src={A(src)}
          alt=""
          className={`ui_01_mobile-item is-${i + 1}`}
          data-phone-mobile-item=""
        />
      ))}
    </div>
  );
}

const uiSets: UISet[] = [
  { desktop: wrap1Desktop, mobile: wrap1Mobile },
  { desktop: wrap2Desktop, mobile: wrap2Mobile },
  { desktop: wrap3Desktop, mobile: wrap3Mobile },
  { desktop: wrap4Desktop, mobile: wrap4Mobile },
];

export default function PhoneSection() {
  return (
    <section className="section_phone">
      <div className="phone_track">
        <div className="phone_frame">
          <div className="padding-global" style={{ height: "100%" }}>
            <div className="container-large" style={{ height: "100%" }}>
              <div className="phone_inner">
                {/* Headers */}
                <div className="phone_head-grid">
                  {phoneHeaders.map((h) => (
                    <div
                      key={h.n}
                      className={`phone_header${h.active ? " active" : ""}`}
                      data-phone-header={h.n}
                    >
                      <h2 className="phone_head heading-2">{h.title}</h2>
                      <p className="phone_p subhead">{h.desc}</p>
                    </div>
                  ))}
                </div>
                {/* Visual */}
                <div className="phone_visual_wrap">
                  <div className="phone_mockup_wrap">
                    <img src={A("68c0826fd3988ffc8592fcc1_93173bd40d2fe4c447493e87edc46b17_Group-20685.avif")}
                      alt=""
                      className="phone_visual_mockup"
                    />
                    <div className="phone_mockup_screen-wrap">
                      <div className="phone_mockup_screen-track" data-phone-screen-track="">
                        <img src={A("68bc1a457e73b0da2a032a1f_Recovery.avif")} alt="" className="phone_mockup_screen" />
                        <img src={A("68bc1a457e73b0da2a032a27_Nutrition.avif")} alt="" className="phone_mockup_screen" />
                        <img src={A("68bc1a457e73b0da2a032a37_Sleep.avif")} alt="" className="phone_mockup_screen" />
                        <img src={A("68bc1a457e73b0da2a032a2f_6d8f8652f5c0d9b9313582f746abc1ad_Strain.avif")} alt="" className="phone_mockup_screen" />
                      </div>
                    </div>
                    <img src={A("68bf20bfe5ada2afa3926ff3_dynamic-island.avif")}
                      alt=""
                      className="phone_island"
                    />
                  </div>
                  <div className="phone_blur" />
                  <div className="phone_ui_wrap">
                    {uiSets.map((set, i) => (
                      <UIWrap key={i} n={String(i + 1)} set={set} />
                    ))}
                  </div>
                  <img src={A("68bc1a457e73b0da2a032a3c_phone-bg.svg")}
                    alt=""
                    className="phone_bg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Scroll triggers */}
        {[1, 2, 3, 4, 5].map((n) => (
          <div
            key={n}
            className={`phone_scroll-trigger${n > 1 ? ` is-${n}` : ""}`}
            data-phone-trigger={String(n)}
          />
        ))}
      </div>
    </section>
  );
}



