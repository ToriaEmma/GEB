import { HeroSection } from "@/components/home/HeroSection";
import { SloganSection } from "@/components/home/SloganSection";
import { ChallengesSection } from "@/components/home/ChallengesSection";
import { SolutionPillars } from "@/components/home/SolutionPillars";
import { TimelineJourney } from "@/components/home/TimelineJourney";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { ImpactCounter } from "@/components/home/ImpactCounter";
import { PartnersMarquee } from "@/components/home/PartnersMarquee";
import { ContactCTA } from "@/components/home/ContactCTA";
export default function Home() {
  return (
    <div className="flex flex-col flex-1 w-full relative">
      <HeroSection />
      <SloganSection />
      <ChallengesSection />
      <SolutionPillars />
      <TimelineJourney />
      <ServicesPreview />
      <ImpactCounter />
      <PartnersMarquee />
      <ContactCTA />
    </div>
  );
}
