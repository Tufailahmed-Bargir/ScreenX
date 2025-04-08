
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Generator from "@/pages/Generator";
import Features from "@/components/Features";
import StepsSection from "@/components/StepsSection";
import ExamplesGallery from "@/components/ExamplesGallery";
import Footer from "@/components/Footer";
import { useRef } from "react";
const Index = () => {
  const generateRef = useRef(null);
  const examplesRef = useRef(null);

  const scrollToGenerate = () => {
    generateRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToExamples = () => {
    examplesRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
      <Hero scrollToGenerate={scrollToGenerate} scrollToExamples={scrollToExamples} />
        <div ref={generateRef}>
        <Generator />
        </div>
        <Features />
        <StepsSection />
        <div ref={examplesRef}>
        <ExamplesGallery />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
