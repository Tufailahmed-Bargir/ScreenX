
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Generator from "@/pages/Generator";
import Features from "@/components/Features";
import StepsSection from "@/components/StepsSection";
import ExamplesGallery from "@/components/ExamplesGallery";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        <Hero />
        <Generator />
        <Features />
        <StepsSection />
        <ExamplesGallery />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
