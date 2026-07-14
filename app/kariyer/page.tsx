import Navbar from "@/app/components/Navbar"
import Footer from "@/app/components/Footer"
import CareerClient from "./CareerClient"
import "./career.css"

import { getSeoMetadata } from "@/app/lib/seo";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return getSeoMetadata("kariyer", {
    title: "Kariyer & İş Başvurusu | Bromak Agency",
    description: "Bromak Agency ekibine katılmak veya staj yapmak için başvurunuzu gönderin.",
    keywords: "kariyer, iş başvurusu, staj başvurusu, reklam ajansı iş ilanları"
  }, "/kariyer");
}

export default function KariyerPage() {
  return (
    <>
      <Navbar />
      <main className="career-page">
        <div className="career-container">
          <div className="career-header">
            <h1>Kariyer <span style={{ color: "#e2130a" }}>&</span> Başvuru</h1>
            <p>
              Ekibimizin bir parçası olmak için iş veya staj başvurunuzu yapabilirsiniz. Yenilikçi ve dinamik ajans kültürümüzde yerinizi alın.
            </p>
          </div>
          
          <CareerClient />
        </div>
      </main>
      <Footer />
    </>
  )
}
