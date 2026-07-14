import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import BultendenAyrilClient from "./BultendenAyrilClient";

export const metadata = {
  alternates: { canonical: "/bultenden-ayril" },
  title: "Bültenden Ayrıl | Bromak Agency",
  description: "Bromak Agency e-bülten aboneliğinizi iptal edin.",
};

export default function UnsubscribePage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f9f9f9", padding: "40px 20px" }}>
        <BultendenAyrilClient />
      </main>
      <Footer />
    </>
  );
}
