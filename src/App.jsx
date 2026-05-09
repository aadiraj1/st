import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Pages
import Home from './pages/Home';
import ShopMain from './pages/ShopMain';
import FilmVariantsPage from './pages/FilmVariants';
import CareProductsPage from './pages/CareProducts';
import ToolsKitsPage from './pages/ToolsKits';
import MerchandisePage from './pages/Merchandise';
import SpecialOffersPage from './pages/SpecialOffers';
import Checkout from './pages/Checkout';
import Blog from './pages/Blog';
import Events from './pages/Events';
import HelpCenter from './pages/HelpCenter';
import WarrantyInfo from './pages/WarrantyInfo';
import ShippingReturns from './pages/ShippingReturns';
import BrandGuidelines from './pages/BrandGuidelines';
import DealerLogin from './pages/DealerLogin';
import DAPSoftware from './pages/DAPSoftware';
import PreCutLibrary from './pages/PreCutLibrary';
import BecomeDealer from './pages/BecomeDealer';
import TrainingCertification from './pages/TrainingCertification';
import AboutUs from './pages/AboutUs';
import Management from './pages/Management';
import Careers from './pages/Careers';
import InvestorRelations from './pages/InvestorRelations';
import Partnerships from './pages/Partnerships';
import Legal from './pages/Legal';
import TermsOfUse from './pages/TermsOfUse';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Accessories from './pages/Accessories';
import IndustrySolutions from './pages/IndustrySolutions';
import BlogPostDetail from './pages/BlogPostDetail';
import FilmVariantDetail from './pages/FilmVariantDetail';
import RollInquiry from './pages/RollInquiry';
import Chatbot from './components/Chatbot';
import Preloader from './components/Preloader';








const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4, ease: 'easeInOut' }}
  >
    {children}
  </motion.div>
);

function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const location = useLocation();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative selection:bg-accent selection:text-white grainy-bg">
      <ScrollToTop />
      <Preloader />


      {/* Custom Cursor */}
      <motion.div
        className="custom-cursor hidden md:block"
        animate={{ x: mousePos.x - 10, y: mousePos.y - 10 }}
        transition={{ type: 'spring', damping: 20, stiffness: 250, mass: 0.5 }}
      />
      <div
        className="custom-cursor-dot hidden md:block"
        style={{ left: mousePos.x - 2, top: mousePos.y - 2 }}
      />

      {/* Scroll Progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-accent z-[100] origin-left"
        style={{ scaleX }}
      />

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<ShopMain />} />
        <Route path="/shop/film-variants" element={<FilmVariantsPage />} />
        <Route path="/shop/care-products" element={<CareProductsPage />} />
        <Route path="/shop/tools-kits" element={<ToolsKitsPage />} />
        <Route path="/shop/merchandise" element={<MerchandisePage />} />
        <Route path="/shop/special-offers" element={<SpecialOffersPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPostDetail />} />

        <Route path="/events" element={<Events />} />
        <Route path="/help-center" element={<HelpCenter />} />
        <Route path="/warranty" element={<WarrantyInfo />} />
        <Route path="/shipping-returns" element={<ShippingReturns />} />
        <Route path="/brand-guidelines" element={<BrandGuidelines />} />
        <Route path="/dealer-login" element={<DealerLogin />} />
        <Route path="/dap-software" element={<DAPSoftware />} />
        <Route path="/pre-cut-library" element={<PreCutLibrary />} />
        <Route path="/become-dealer" element={<BecomeDealer />} />
        <Route path="/training-certification" element={<TrainingCertification />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/management" element={<Management />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/investors" element={<InvestorRelations />} />
        <Route path="/partnerships" element={<Partnerships />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/terms-of-use" element={<TermsOfUse />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/accessories" element={<Accessories />} />
        <Route path="/solutions/:slug" element={<IndustrySolutions />} />
        <Route path="/film-variant/:slug" element={<FilmVariantDetail />} />
        <Route path="/roll-inquiry" element={<RollInquiry />} />





      </Routes>

      {/* Floating Chatbot */}
      <Chatbot />

      <Footer />
    </div>
  );
}

export default App;
