import { HeroSection } from "@/components/home/HeroSection";
import { StatsBar } from "@/components/home/StatsBar";
import { FeaturedServices } from "@/components/home/FeaturedServices";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { FeaturedStylists } from "@/components/home/FeaturedStylists";
import { PackagesPreview } from "@/components/home/PackagesPreview";
import { BeforeAfterGallery } from "@/components/home/BeforeAfterGallery";
import { Testimonials } from "@/components/home/Testimonials";
import { LiveQueueWidget } from "@/components/home/LiveQueueWidget";
import { OffersBar } from "@/components/home/OffersBar";
import { CTASection } from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <StatsBar />
      <FeaturedServices />
      <WhyChooseUs />
      <FeaturedStylists />
      <BeforeAfterGallery />
      <PackagesPreview />
      <LiveQueueWidget />
      <Testimonials />
      <OffersBar />
      <CTASection />
    </div>
  );
}
