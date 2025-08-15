import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
import BiensSection from "@/components/BiensSection";
import ApartmentExplorer from "@/components/ApartmentExplorer";
import WhyChooseUs from "@/components/WhyChooseUs";
import ProjectsSection from "@/components/ProjectsSection";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import Chatbot from "@/components/Chatbot";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section - Video Carousel */}
        <HeroCarousel />
        
        {/* Nos Biens Section */}
        <BiensSection />
        
        {/* Explorer nos appartements luxueux */}
        <ApartmentExplorer />
        
        {/* Pourquoi nous choisir */}
        <WhyChooseUs />
        
        {/* Nos Projets */}
        <ProjectsSection />
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* Scroll to Top Button */}
      <ScrollToTop />
      
      {/* Chatbot */}
      <Chatbot />
      
      {/* WhatsApp Button */}
      <WhatsAppFloatingButton />
    </div>
  );
};

export default Index;
