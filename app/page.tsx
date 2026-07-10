import HomeHero from "@/components/HomeHero";
import StatsStrip from "@/components/StatsStrip";
import HomeServicesShowcase from "@/components/HomeServicesShowcase";
import HomeCorporateBand from "@/components/HomeCorporateBand";
import HomeFaqSection from "@/components/HomeFaqSection";

export default function Home() {
  return (
    <>
      <HomeHero />
      <section className="border-b border-[#eef0f3] bg-white py-16">
        <div className="site-container">
          <StatsStrip variant="home" />
        </div>
      </section>
      <HomeServicesShowcase />
      <HomeCorporateBand />
      <HomeFaqSection />
    </>
  );
}
