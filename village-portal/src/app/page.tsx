import Navbar from "@/components/navbar";
import HeroSection from "@/components/sections/hero-section";
import InformationSection from "@/components/sections/information-section";
import ReportSection from "@/components/sections/report-section";
import UMKMSection from "@/components/sections/umkm-section";
import ForumSection from "@/components/sections/forum-section";
import BroadcastSection from "@/components/sections/broadcast-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <InformationSection />
        <ReportSection />
        <UMKMSection />
        <ForumSection />
        <BroadcastSection />
      </main>
      <Footer />
    </div>
  );
}
