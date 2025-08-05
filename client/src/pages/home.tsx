import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import StatsSection from "@/components/stats-section";
import ProgramsSection from "@/components/programs-section";
import TuitionCalculator from "@/components/tuition-calculator";
import VirtualTour from "@/components/virtual-tour";
import GallerySection from "@/components/gallery-section";
import NewsSection from "@/components/news-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <StatsSection />
      <ProgramsSection />
      <TuitionCalculator />
      <VirtualTour />
      <GallerySection />
      <NewsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
