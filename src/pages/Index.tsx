import HeroSection from "@/components/wedding/HeroSection";
import EventDetailsSection from "@/components/wedding/EventDetailsSection";
import WishlistGiftsSection from "@/components/wedding/WishlistGiftsSection";
import RSVPSection from "@/components/wedding/RSVPSection";
import FooterSection from "@/components/wedding/FooterSection";
import SectionNav from "@/components/wedding/SectionNav";
const Index = () => {
  return (
    <main id="main-content" className="min-h-screen bg-background">
      <SectionNav />
      <HeroSection />
      <EventDetailsSection />
      <WishlistGiftsSection />
      <RSVPSection />
      <FooterSection />
    </main>
  );
};

export default Index;
