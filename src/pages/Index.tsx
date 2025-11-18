import ModernHeader from "@/components/ModernHeader";
import HeroCarousel from "@/components/HeroCarousel";
import FeaturedPropertiesCarousel from "@/components/FeaturedPropertiesCarousel";
import BiensSection from "@/components/BiensSection";
import ExclusivePropertiesSection from "@/components/ExclusivePropertiesSection";
import ApartmentExplorer from "@/components/ApartmentExplorer";
import WhyChooseUs from "@/components/WhyChooseUs";
import ProjectsSection from "@/components/ProjectsSection";
import ScrollToTop from "@/components/ScrollToTop";
import Chatbot from "@/components/Chatbot";


const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <ModernHeader />
      <main>
        {/* Hero Section - Video Carousel */}
        <HeroCarousel />
        
        {/* Featured Properties Carousel */}
        <FeaturedPropertiesCarousel />
        
        {/* Nos Biens Section */}
        <BiensSection />
        
        {/* Section des biens exclusifs */}
        <ExclusivePropertiesSection />
        
        {/* Explorer nos appartements luxueux */}
        <ApartmentExplorer />
        
        {/* Pourquoi nous choisir */}
        <WhyChooseUs />
        
        {/* Nos Projets */}
        <ProjectsSection />
      </main>
      
      
      {/* Scroll to Top Button */}
      <ScrollToTop />
      
      {/* Chatbot */}
      <Chatbot />
      
    </div>
  );
};

export default Index;
