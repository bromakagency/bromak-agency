import "swiper/css";
import Animations from "./components/Animations";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import PhoneSection from "./components/PhoneSection";
import PreviewSection from "./components/PreviewSection";
import SliderSection from "./components/SliderSection";
import UsesSection from "./components/UsesSection";
import ReviewsSection from "./components/ReviewsSection";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";


export default function Home() {
  return (
    <div className="page-wrapper">
      <Animations />
      <div className="main-wrapper">
        <Navbar />
        <HeroSection />
        <PhoneSection />
        <PreviewSection />
        <SliderSection />
        <UsesSection />
        <ReviewsSection />
        <CTASection />
        <Footer />

      </div>
    </div>
  );
}

