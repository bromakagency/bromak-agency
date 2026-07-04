import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import Animations from "@/app/components/Animations";
import type { LegalSection } from "@/app/legal-content";
import "@/app/legal.css";

type LegalPageProps = {
  title: string;
  updatedAt: string;
  intro: string[];
  sections: LegalSection[];
};

export default function LegalPage({ title, updatedAt, intro, sections }: LegalPageProps) {
  const getSectionId = (sectionTitle: string) =>
    sectionTitle
      .toLowerCase()
      .replaceAll("ı", "i")
      .replaceAll("ğ", "g")
      .replaceAll("ü", "u")
      .replaceAll("ş", "s")
      .replaceAll("ö", "o")
      .replaceAll("ç", "c")
      .replaceAll(".", "")
      .replaceAll(" ", "-");

  return (
    <div className="page-wrapper">
      <Animations />
      <div className="main-wrapper">
        <Navbar />

        <main className="legal-page">
          <section className="legal-hero">
            <span>YASAL</span>
            <h1>{title}</h1>
            <p>Son Güncelleme: {updatedAt}</p>
          </section>

          <section className="legal-content">
            <aside className="legal-toc" aria-label="İçindekiler">
              <span>İçindekiler</span>
              <a href="#legal-intro">Genel Bilgilendirme</a>
              {sections.map((section) => (
                <a href={`#${getSectionId(section.title)}`} key={section.title}>
                  {section.title}
                </a>
              ))}
            </aside>

            <div className="legal-section-list">
              <div className="legal-intro" id="legal-intro">
                {intro.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              {sections.map((section) => (
                <article className="legal-section" id={getSectionId(section.title)} key={section.title}>
                  <h2>{section.title}</h2>

                  {section.body?.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}

                  {section.items && (
                    <ul>
                      {section.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}

                  {section.subsections?.map((subsection) => (
                    <div className="legal-subsection" key={subsection.title}>
                      <h3>{subsection.title}</h3>
                      <p>{subsection.body}</p>
                    </div>
                  ))}

                  {section.outro?.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </article>
              ))}
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}
