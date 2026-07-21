import { Consultation } from "@/components/home/Consultation";
import { Differences } from "@/components/home/Differences";
import { Footer } from "@/components/home/Footer";
import { Header } from "@/components/home/Header";
import { Hero } from "@/components/home/Hero";
import { ProgrammeOverview } from "@/components/home/ProgrammeOverview";
import { ProgramsCarousel } from "@/components/home/ProgramsCarousel";
import { RecognitionCarousel } from "@/components/home/RecognitionCarousel";
import { HomeStructuredData } from "@/components/seo/HomeStructuredData";

export default function Home() {
  return (
    <>
      <HomeStructuredData />
      <Header />
      <main>
        <Hero />
        <ProgrammeOverview />
        <Differences />
        <ProgramsCarousel />
        <RecognitionCarousel />
        <Consultation />
      </main>
      <Footer />
    </>
  );
}
