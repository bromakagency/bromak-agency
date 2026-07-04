import type { Metadata } from "next";
import LegalPage from "@/app/components/LegalPage";
import { privacyPolicy } from "@/app/legal-content";

export const metadata: Metadata = {
  title: "Gizlilik Politikası | Bromak Agency",
  description:
    "Bromak Agency web sitesi gizlilik politikası ve kişisel verilerin işlenmesine ilişkin bilgilendirme.",
};

export default function GizlilikPolitikasiPage() {
  return <LegalPage {...privacyPolicy} />;
}
