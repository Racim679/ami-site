import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NosBiens from "./pages/NosBiens";
import Services from "./pages/Services";
import APropos from "./pages/APropos";
import Localites from "./pages/Localites";
import Contact from "./pages/Contact";
import Vendre from "./pages/Vendre";
import Favoris from "./pages/Favoris";
import Comparaison from "./pages/Comparaison";
import PropertyDetail from "./pages/PropertyDetail";
import NotFound from "./pages/NotFound";
import CRM from "./pages/CRM";
import Login from "./pages/Login";
import Chatbot from "./components/Chatbot";
import ComparisonSystem from "./components/ComparisonSystem";
import PWARegistration from "./components/PWARegistration";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nos-biens" element={<NosBiens />} />
          <Route path="/services" element={<Services />} />
          <Route path="/a-propos" element={<APropos />} />
          <Route path="/localites" element={<Localites />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/vendre" element={<Vendre />} />
          <Route path="/favoris" element={<Favoris />} />
          <Route path="/comparaison" element={<Comparaison />} />
            <Route path="/crm" element={<CRM />} />
            <Route path="/login" element={<Login />} />
          <Route path="/bien/:id" element={<PropertyDetail />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Chatbot />
        <ComparisonSystem />
        <PWARegistration />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
