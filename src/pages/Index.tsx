import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
import BiensSection from "@/components/BiensSection";
import ApartmentExplorer from "@/components/ApartmentExplorer";
import WhyChooseUs from "@/components/WhyChooseUs";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import Chatbot from "@/components/Chatbot";

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
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* Scroll to Top Button */}
      <ScrollToTop />
      
      {/* Chatbot */}
      <Chatbot />
    </div>
  );
};

export default Index;
