import { CareerSection } from "@/components/portfolio/CareerSection";
import { ExpertiseSection } from "@/components/portfolio/ExpertiseSection";
import { HeroSection, StatsSection } from "@/components/portfolio/HeroSection";
import { ImpactSection } from "@/components/portfolio/ImpactSection";
import { ProjectSection } from "@/components/portfolio/ProjectSection";
import { shellClassName } from "@/components/portfolio/shared";
import { SiteFooter } from "@/components/portfolio/SiteFooter";
import { SiteHeader } from "@/components/portfolio/SiteHeader";
import { projects } from "@/data/portfolio";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="home" className={shellClassName}>
        <HeroSection />
        <StatsSection />
        <ProjectSection projects={projects} />
        <ImpactSection />
        <CareerSection />
        <ExpertiseSection />
      </main>
      <SiteFooter />
    </>
  );
}
