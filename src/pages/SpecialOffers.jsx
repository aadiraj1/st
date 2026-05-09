import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer, Tag, Zap, ChevronRight, CheckCircle2, ShoppingCart, X, Globe, Truck, Package } from 'lucide-react';
import { useCart } from '../context/CartContext';

const SpecialOffersPage = () => {
  const { addToCart } = useCart();
  const [addedPopup, setAddedPopup] = useState(null);
  const [showCatalogModal, setShowCatalogModal] = useState(false);

  const bundleProduct = {
    name: "Ultimate Prep & Protect Kit",
    price: "$89.99",
    category: "Bundles",
    type: "Bundle",
    image: "https://images.unsplash.com/photo-1605515298946-d062f2e9da53?auto=format&fit=crop&q=80&w=800"
  };

  const microfiberProduct = {
    name: "Microfiber Pro Pack (Buy 2 Get 1)",
    price: "$25.98",
    category: "Care",
    type: "Fabric",
    image: "https://images.unsplash.com/photo-1621252179027-94459d278660?auto=format&fit=crop&q=80&w=800"
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedPopup(product.name);
    setTimeout(() => setAddedPopup(null), 2000);
  };

  // Simple countdown logic for visual effect
  const [timeLeft, setTimeLeft] = useState({
    hours: 24,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="pt-24 min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 md:px-8 max-w-7xl mx-auto text-center overflow-hidden rounded-[40px] mt-8">
        {/* Video Background */}
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-100">
          <source src="/e5818c65-0f63-4627-a57b-217d4cff828a/bck.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black z-10" />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="relative inline-block z-20"
        >
          <div className="absolute inset-0 bg-accent/20 blur-[100px] rounded-full" />
          <h1 className="text-5xl md:text-8xl font-black mb-6 uppercase tracking-tighter relative z-10 italic">
            Flash <span className="text-accent text-glow-accent italic">Deals</span>
          </h1>
        </motion.div>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10 font-bold uppercase tracking-widest text-xs relative z-20">
          Limited-time bundles and exclusive discounts on professional-grade protection.
        </p>

        {/* Countdown Timer */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-4 text-3xl md:text-5xl font-mono font-bold text-accent mb-16 relative z-20"
        >
            <Timer className="w-10 h-10 text-white" />
            <div className="bg-white/10 px-4 py-2 rounded-lg border border-white/20">
                {String(timeLeft.hours).padStart(2, '0')}
            </div>
            <span>:</span>
            <div className="bg-white/10 px-4 py-2 rounded-lg border border-white/20">
                {String(timeLeft.minutes).padStart(2, '0')}
            </div>
            <span>:</span>
            <div className="bg-white/10 px-4 py-2 rounded-lg border border-white/20 text-white">
                {String(timeLeft.seconds).padStart(2, '0')}
            </div>
        </motion.div>
      </section>

      {/* Featured Bundle */}
      <section className="py-10 px-4 md:px-8 max-w-7xl mx-auto">
        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-secondary/80 to-black border border-accent/30 rounded-[40px] p-8 md:p-12 relative overflow-hidden group shadow-2xl"
        >
            {/* Pop Animation Background */}
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
                <div className="w-full lg:w-1/2">
                    <div className="inline-flex items-center gap-2 bg-accent text-black font-black uppercase tracking-widest text-[10px] px-4 py-1.5 mb-6 skew-x-[-15deg]">
                        <Zap size={14} />
                        Highest Value
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black mb-4 leading-tight uppercase tracking-tighter italic">The Ultimate Prep & Protect Kit</h2>
                    <p className="text-gray-400 text-lg mb-8 leading-relaxed font-medium">
                        Everything you need to decontaminate, wash, and protect your vehicle. Includes our flagship Ceramic Boost Spray, Iron Remover, pH Neutral Soap, and 5 premium microfiber towels.
                    </p>
                    <div className="flex items-end gap-4 mb-8">
                        <span className="text-6xl font-black text-accent italic">$89.99</span>
                        <span className="text-2xl text-gray-500 line-through mb-1 font-black">$130.00</span>
                    </div>
                    <motion.button 
                        onClick={() => handleAddToCart(bundleProduct)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full sm:w-auto bg-white text-black font-black uppercase tracking-widest px-10 py-5 rounded-xl hover:bg-accent transition-all flex items-center justify-center gap-3 shadow-2xl"
                    >
                        Claim Bundle <ChevronRight />
                    </motion.button>
                </div>

                <div className="w-full lg:w-1/2 relative min-h-[400px] flex items-center justify-center">
                    <motion.div 
                        animate={{ y: [-10, 10, -10] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="relative z-10 w-80 h-80 bg-gradient-to-tl from-accent/40 to-blue-900/40 rounded-full blur-[80px] border border-accent/50 shadow-[0_0_100px_rgba(0,174,239,0.4)]"
                    />
                    <div className="absolute inset-0 flex items-center justify-center z-20 gap-6 flex-wrap">
                        {/* Abstract representations of the bundle items */}
                        <motion.div whileHover={{ scale: 1.1, rotate: -5 }} className="w-28 h-40 bg-accent rounded-2xl border border-white/20 shadow-2xl backdrop-blur-md flex items-center justify-center"><ShoppingCart size={40} className="text-black/50"/></motion.div>
                        <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="w-24 h-36 bg-white/10 rounded-2xl border border-white/20 shadow-2xl backdrop-blur-md flex items-center justify-center mt-12"><Tag size={32} className="text-white/50"/></motion.div>
                        <motion.div whileHover={{ scale: 1.1, rotate: -10 }} className="w-32 h-24 bg-blue-900/40 rounded-2xl border border-white/20 shadow-2xl backdrop-blur-md flex items-center justify-center -mt-12"><Zap size={32} className="text-accent/50"/></motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
      </section>

      {/* Grid Offers */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-secondary/40 border border-white/10 p-10 rounded-[30px] hover:border-accent/30 transition-all duration-500 group shadow-xl flex flex-col justify-between">
                <div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter italic mb-2">Buy 2, Get 1 Free</h3>
                  <p className="text-gray-400 mb-8 font-medium">On all microfibers and wash mitts. Precision grade fabrics for swirl-free finishing.</p>
                </div>
                <button 
                  onClick={() => handleAddToCart(microfiberProduct)}
                  className="text-accent font-black uppercase tracking-[0.2em] text-[10px] flex items-center gap-3 group-hover:gap-6 transition-all"
                >
                    Shop Microfibers <ChevronRight size={18} />
                </button>
            </div>
            <div className="bg-secondary/40 border border-white/10 p-10 rounded-[30px] hover:border-accent/30 transition-all duration-500 group shadow-xl flex flex-col justify-between">
                <div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter italic mb-2">Free Global Shipping</h3>
                  <p className="text-gray-400 mb-8 font-medium">On all orders over $250. Express professional logistics to your doorstep.</p>
                </div>
                <button 
                  onClick={() => setShowCatalogModal(true)}
                  className="text-accent font-black uppercase tracking-[0.2em] text-[10px] flex items-center gap-3 group-hover:gap-6 transition-all"
                >
                    Explore Catalog <ChevronRight size={18} />
                </button>
            </div>
        </div>
      </section>

      {/* Catalog / Shipping Modal */}
      <AnimatePresence>
        {showCatalogModal && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center px-4 py-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCatalogModal(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-secondary border border-white/10 rounded-[24px] md:rounded-[40px] p-6 sm:p-8 md:p-16 max-w-3xl w-full z-10 shadow-[0_0_50px_rgba(0,174,239,0.2)] max-h-[90vh] overflow-y-auto"
            >
              <button 
                onClick={() => setShowCatalogModal(false)}
                className="absolute top-5 right-5 md:top-8 md:right-8 text-gray-500 hover:text-white transition-colors z-10"
              >
                <X size={22} />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                <div>
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-accent/20 rounded-2xl flex items-center justify-center mb-6 md:mb-8 border border-accent/30">
                    <Globe className="text-accent" size={28} />
                  </div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tighter italic mb-4 md:mb-6 leading-none">Global <br/>Logistics <span className="text-accent underline">Unlocked</span></h2>
                  <p className="text-gray-400 font-medium leading-relaxed mb-6 md:mb-8 text-sm md:text-base">
                    We deliver professional protection to over 120 countries. Our logistics network ensures your products arrive in pristine condition, regardless of your location.
                  </p>
                  
                  <div className="space-y-4 md:space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center border border-white/10 shrink-0">
                        <Truck size={18} className="text-accent" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest">Express Air Freight</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center border border-white/10 shrink-0">
                        <Package size={18} className="text-accent" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest">Secure Industrial Packaging</span>
                    </div>
                  </div>
                </div>

                <div className="bg-black/40 border border-white/10 rounded-[20px] md:rounded-[30px] p-6 md:p-8 flex flex-col justify-center">
                  <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter italic mb-3 md:mb-4">Master Bundle</h3>
                  <p className="text-gray-500 text-sm mb-6 md:mb-8">Get the Ultimate Prep Kit along with our Global Protection Guide.</p>
                  <div className="text-2xl md:text-3xl font-black italic mb-6 md:mb-8">$89.99</div>
                  <button 
                    onClick={() => {
                      handleAddToCart(bundleProduct);
                      setShowCatalogModal(false);
                    }}
                    className="w-full bg-accent text-black font-black uppercase tracking-widest text-[10px] py-4 rounded-xl hover:bg-white transition-all shadow-xl"
                  >
                    Claim Bundle Now
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Added Popup */}
      <AnimatePresence>
        {addedPopup && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="fixed bottom-10 right-10 z-[200] bg-accent text-black px-8 py-4 rounded-xl font-black uppercase tracking-widest flex items-center gap-4 shadow-[0_0_50px_rgba(0,174,239,0.4)]"
          >
            <CheckCircle2 size={20} />
            {addedPopup} Added to Cart
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SpecialOffersPage;
