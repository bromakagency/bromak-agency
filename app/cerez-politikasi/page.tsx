import type { Metadata } from "next";
import LegalPage from "@/app/components/LegalPage";
import { cookiePolicy } from "@/app/legal-content";

export const metadata: Metadata = {
  alternates: { canonical: "/cerez-politikasi" },
  title: "Çerez Politikası | Bromak Agency",
  description:
    "Bromak Agency web sitesinde kullanılan çerez türleri, çerez yönetimi ve üçüncü taraf çerezleri hakkında bilgilendirme.",
};

export default function CerezPolitikasiPage() {
  return <LegalPage {...cookiePolicy} />;
}
