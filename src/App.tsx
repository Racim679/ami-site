import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import NosBiens from "./pages/NosBiens";
import Localites from "./pages/Localites";
import Contact from "./pages/Contact";
import Vendre from "./pages/Vendre";
import Favoris from "./pages/Favoris";
import Comparaison from "./pages/Comparaison";
import PropertyDetail from "./pages/PropertyDetail";
import PropertyPage from "./pages/PropertyPage";
import LocalityDetail from "./pages/LocalityDetail";
import NotFound from "./pages/NotFound";
import CRM from "./pages/CRM";
import Login from "./pages/Login";
import PolitiqueConfidentialite from "./pages/PolitiqueConfidentialite";
import ConditionsUtilisation from "./pages/ConditionsUtilisation";
import { ChatbotWidget } from "./components/ChatbotWidget";
import { ChatbotProvider } from "./contexts/ChatbotContext";
import ComparisonSystem from "./components/ComparisonSystem";
import PWARegistration from "./components/PWARegistration";
import Footer from "./components/Footer";
import { AnimatePresence, motion } from "framer-motion";

const queryClient = new QueryClient();

// Variantes d'animation pour les transitions de page
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  enter: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
      staggerChildren: 0.08,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.98,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

const loaderVariants = {
  initial: {
    scaleX: 0,
    originX: 0,
  },
  animate: {
    scaleX: 1,
    originX: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
  exit: {
    scaleX: 0,
    originX: 1,
    transition: {
      duration: 0.2,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

const AppContent = () => {
  const location = useLocation();

  return (
    <>
      {/* Barre de progression animée en haut */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`loader-${location.pathname}`}
          className="fixed top-0 left-0 right-0 h-1 z-[60] pointer-events-none overflow-hidden"
        >
          <motion.div
            variants={loaderVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="h-full bg-gradient-to-r from-primary via-secondary to-accent relative"
            style={{
              boxShadow: "0 0 10px rgba(79, 195, 179, 0.6), 0 0 20px rgba(79, 195, 179, 0.4)",
            }}
          >
            {/* Effet shimmer sur la barre de progression */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)",
                width: "30%",
              }}
              initial={{ x: "-100%" }}
              animate={{ x: "400%" }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Overlay de transition subtil - Retiré pour éviter le flou */}

      {/* Routes avec animation */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          variants={pageVariants}
          initial="initial"
          animate="enter"
          exit="exit"
          className="w-full min-h-screen"
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/nos-biens" element={<NosBiens />} />
            <Route path="/localites" element={<Localites />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/vendre" element={<Vendre />} />
            <Route path="/favoris" element={<Favoris />} />
            <Route path="/comparaison" element={<Comparaison />} />
            <Route path="/crm" element={<CRM />} />
            <Route path="/login" element={<Login />} />
            <Route path="/bien/:id" element={<PropertyDetail />} />
            <Route path="/property/:propertyId" element={<PropertyPage />} />
            <Route path="/localite/:localityId" element={<LocalityDetail />} />
            <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
            <Route path="/conditions-utilisation" element={<ConditionsUtilisation />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
      <Footer />
      <ChatbotWidget
        title="Racim Promotion"
        initialMessage1="Bonjour, je suis votre assistante immobilière ! 👋"
        initialMessage2="Vous recherchez un bien ? Souhaitez vendre un bien ? Ou simplement des questions sur nos services ? N'hésitez pas à nous dire ce dont vous avez besoin pour que nous puissions vous assister."
        webhookUrl="https://n8n.srv933307.hstgr.cloud/webhook/n8n"
      />
      <ComparisonSystem />
      <PWARegistration />
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ChatbotProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </ChatbotProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
