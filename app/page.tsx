import Banner from "@/components/shared/banner";
import CtaSection from "@/components/shared/cta-section";
import Features from "@/components/shared/features";
import Footer from "@/components/shared/footer";
import HeroSection from "@/components/shared/hero-section";
import Navbar from "@/components/shared/navbar";

export default function Home() {
  return (
    <>
      <Banner />
      <Navbar />
      <HeroSection />
      <Features />
      <CtaSection />
      <Footer />
    </>
  );
}
