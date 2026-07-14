import type { Metadata } from "next";
import LegalPage from "@/app/components/LegalPage";
import { termsOfUse } from "@/app/legal-content";

export const metadata: Metadata = {
  alternates: { canonical: "/kullanim-sartlari" },
  title: "Kullanım Şartları | Bromak Agency",
  description:
    "Bromak Agency web sitesi kullanım şartları, fikri mülkiyet hakları ve kullanıcı sorumlulukları.",
};

export default function KullanimSartlariPage() {
  return <LegalPage {...termsOfUse} />;
}
