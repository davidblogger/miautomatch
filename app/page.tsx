import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/blocks/Hero";
import { Brands } from "@/components/blocks/Brands";
import { FeaturedVehicles } from "@/components/blocks/FeaturedVehicles";
import { WhyMiAutoMatch } from "@/components/blocks/WhyMiAutoMatch";
import { Testimonials } from "@/components/blocks/Testimonials";
import { CTASection } from "@/components/blocks/CTASection";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Brands />
        <FeaturedVehicles />
        <WhyMiAutoMatch />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
