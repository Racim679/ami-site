import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
import ProjectsSection from "@/components/ProjectsSection";
import ApartmentExplorer from "@/components/ApartmentExplorer";
import WhyChooseUs from "@/components/WhyChooseUs";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section - Video Carousel */}
        <HeroCarousel />
        
        {/* Nos Projets Section */}
        <ProjectsSection />
        
        {/* Explorer nos appartements luxueux */}
        <ApartmentExplorer />
        
        {/* Pourquoi nous choisir */}
        <WhyChooseUs />
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
};

export default Index;
