import { HeroSection } from "@/components/HeroSection";
import { StorySection } from "@/components/StorySection";
import { ThreadCanvas } from "@/components/Interaction/ThreadCanvas";
import { ThreadBridge } from "@/components/Interaction/ThreadBridge";
import { FeaturedWorks } from "@/components/FeaturedWorks";
import { CraftSection } from "@/components/CraftSection";
import { CTASection } from "@/components/CTASection";
import { SampleWorks } from "@/components/SampleWorks";
import { Testimonials } from "@/components/Testimonials";
import { InquiryForm } from "@/components/InquiryForm";
import { MobileStickyCTA } from "@/components/MobileStickyCTA";

export default function Home() {
  return (
    <main className="w-full overflow-x-hidden">
      <div className="relative isolate">
        <HeroSection />
        <ThreadBridge />
        <ThreadCanvas />
      </div>
      <StorySection />
      <SampleWorks />
      <FeaturedWorks />
      <CraftSection />
      <Testimonials />
      <InquiryForm />
      <CTASection />
      <MobileStickyCTA />
    </main>
  );
}
