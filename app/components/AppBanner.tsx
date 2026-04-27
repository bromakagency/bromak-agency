import Link from "next/link";
import { A } from "@/app/lib/utils";

export default function AppBanner() {
  return (
    <Link href="#" className="app-banner" data-banner="">
      <img src={A("680374dd1d29e94d56778719_bevel-app-icon.png")}
        alt="Bevel app icon"
        style={{ width: "42px", borderRadius: "10px" }}
      />
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 600, fontSize: "15px" }}>Bevel Health</div>
        <div style={{ fontSize: "13px", color: "#657786" }}>
          The Everything Health App
        </div>
      </div>
      <div
        className="button-stagger"
        style={{ padding: ".625rem 1.25rem", fontSize: "1rem", flex: "none" }}
      >
        <span>Open</span>
      </div>
    </Link>
  );
}




