import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Truck, Globe, RotateCcw, Package, AlertCircle, CheckCircle2, Clock, X, ChevronRight, Hash } from 'lucide-react';

const ShippingReturns = () => {
  const [showModal, setShowModal] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(false);
    setIsSubmitted(true);
  };

  return (
    <div className="pt-28 min-h-screen bg-black text-white pb-32">
      {/* Hero Section */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-2 rounded-full text-xs font-black uppercase tracking-[0.3em] mb-10">
            <Globe className="text-accent" size={16} /> Global Logistics Network
          </div>
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter italic mb-8">
            Shipping & <span className="text-accent underline decoration-4 underline-offset-8">Returns</span>
          </h1>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed font-medium">
            From our manufacturing hubs to your doorstep. We utilize a secure, climate-controlled logistics chain to ensure your film arrives in pristine, factory-fresh condition, no matter where you are in the world.
          </p>
        </motion.div>
      </section>

      {/* Logistics Overview */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto mb-32 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { title: "Global Express", desc: "Door-to-door delivery in 3-5 business days via DHL or FedEx Priority.", icon: <Truck />, highlight: "150+ Countries" },
          { title: "Safe-Package Tech", desc: "Reinforced 4-wall hexagonal tubing to prevent roll crushing during transit.", icon: <Package />, highlight: "Zero-Damage Guarantee" },
          { title: "Real-Time Tracking", desc: "Minute-by-minute updates from our climate-controlled warehouse to your shop.", icon: <Clock />, highlight: "SMS & Email Alerts" }
        ].map((item, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="bg-secondary/20 border border-white/5 p-10 rounded-3xl relative overflow-hidden group"
          >
            <div className="w-16 h-16 bg-accent/10 border border-accent/20 rounded-2xl flex items-center justify-center text-accent mb-8 group-hover:bg-accent group-hover:text-black transition-all duration-500">
              {item.icon}
            </div>
            <h3 className="text-2xl font-black uppercase tracking-tight mb-4">{item.title}</h3>
            <p className="text-gray-400 leading-relaxed font-medium mb-8">{item.desc}</p>
            <div className="text-[10px] font-black text-accent uppercase tracking-widest bg-accent/10 px-3 py-1 rounded inline-block">
              {item.highlight}
            </div>
          </motion.div>
        ))}
      </section>

      {/* Return Policy */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto mb-32">
        <div className="bg-secondary/10 border border-white/5 rounded-[40px] overflow-hidden flex flex-col lg:flex-row">
          <div className="p-8 md:p-16 lg:w-1/2">
            <h3 className="text-3xl font-black uppercase tracking-tight mb-8 flex items-center gap-4">
              <RotateCcw className="text-accent" /> Our Return Policy
            </h3>
            <p className="text-gray-400 text-lg leading-relaxed mb-10 font-medium">
              We stand behind our products. If you are not satisfied with your purchase, we offer a streamlined return process for unused, factory-sealed materials.
            </p>
            <ul className="space-y-6">
              {[
                { title: "30-Day Window", desc: "Returns accepted within 30 days of the delivery date." },
                { title: "Factory Seal", desc: "Rolls must be in original packaging with intact security seals." },
                { title: "Partial Returns", desc: "We cannot accept returns on partially used or cut rolls." }
              ].map((point, idx) => (
                <li key={idx} className="flex gap-4">
                  <div className="mt-1"><CheckCircle2 size={18} className="text-accent" /></div>
                  <div>
                    <h4 className="font-black uppercase tracking-tight text-white">{point.title}</h4>
                    <p className="text-sm text-gray-500 font-medium">{point.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:w-1/2 bg-accent/5 p-8 md:p-16 border-l border-white/5">
            <h4 className="text-xl font-black uppercase tracking-tight mb-8">Restocking & Refunds</h4>
            <div className="space-y-8">
              <div className="p-6 bg-black/40 rounded-2xl border border-white/5">
                <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Restocking Fee</p>
                <p className="text-2xl font-black text-white">15% OF ORDER VALUE</p>
                <p className="text-xs text-gray-600 mt-2">Applies to all non-defective returns to cover inspection and re-warehousing.</p>
              </div>
              <div className="p-6 bg-black/40 rounded-2xl border border-white/5">
                <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Refund Timing</p>
                <p className="text-2xl font-black text-white">7-10 BUSINESS DAYS</p>
                <p className="text-xs text-gray-600 mt-2">Processing time once the returned material is inspected at our hub.</p>
              </div>
            </div>
            <button 
              onClick={() => setShowModal(true)}
              className="w-full mt-12 bg-white text-black font-black uppercase tracking-widest text-xs py-5 hover:bg-accent transition-all shadow-lg"
            >
              Initiate Return Request
            </button>
          </div>
        </div>
      </section>

      {/* Note */}
      <section className="px-4 md:px-8 max-w-4xl mx-auto flex items-start gap-6 bg-white/5 p-8 rounded-3xl border border-white/10">
        <AlertCircle size={32} className="text-accent shrink-0" />
        <p className="text-sm text-gray-400 leading-relaxed font-medium">
          <strong className="text-white uppercase tracking-tighter">Please Note:</strong> Custom-cut patterns (DAP Pre-cuts) are manufactured to order specifically for your vehicle VIN and are <strong>not eligible for return</strong> unless a manufacturing defect is identified and verified by our technical team.
        </p>
      </section>

      {/* Return Request Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center px-4 py-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
              onClick={() => setShowModal(false)}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-secondary border border-white/10 p-6 sm:p-8 md:p-12 rounded-[24px] md:rounded-[32px] max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <button onClick={() => setShowModal(false)} className="absolute top-5 right-5 text-gray-500 hover:text-white transition-colors z-10"><X size={22} /></button>
              
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-2">Return Request</h2>
              <p className="text-accent text-[10px] font-black uppercase tracking-[0.2em] mb-6 sm:mb-8">Process your inquiry with our logistics team</p>
              
              <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Order Number</label>
                    <div className="relative">
                       <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={14} />
                       <input required className="w-full bg-white/5 border border-white/10 rounded-xl py-3 sm:py-4 pl-10 pr-4 outline-none focus:border-accent text-sm transition-colors" placeholder="SR-9921" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Full Name</label>
                    <input required className="w-full bg-white/5 border border-white/10 rounded-xl py-3 sm:py-4 px-4 outline-none focus:border-accent text-sm transition-colors" placeholder="Alex Rivers" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Email Address</label>
                  <input required type="email" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 sm:py-4 px-4 outline-none focus:border-accent text-sm transition-colors" placeholder="alex@studio.com" />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Country</label>
                  <input required className="w-full bg-white/5 border border-white/10 rounded-xl py-3 sm:py-4 px-4 outline-none focus:border-accent text-sm transition-colors" placeholder="United States" />
                </div>
                
                <button type="submit" className="w-full bg-accent text-black py-4 sm:py-5 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-white transition-all shadow-xl group flex items-center justify-center gap-3">
                  Submit Request <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </motion.div>
          </div>
        )}

        {isSubmitted && (
          <div className="fixed inset-0 z-[210] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/95 backdrop-blur-xl"
              onClick={() => setIsSubmitted(false)}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-secondary border border-accent/30 p-10 md:p-16 rounded-[40px] max-w-xl w-full text-center shadow-2xl"
            >
              <div className="w-24 h-24 bg-accent/20 text-accent rounded-full flex items-center justify-center mx-auto mb-10 shadow-lg">
                <CheckCircle2 size={48} strokeWidth={3} />
              </div>
              
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter italic mb-6 leading-none">
                Request Sent
              </h2>
              
              <p className="text-gray-400 font-bold uppercase text-[11px] tracking-widest leading-relaxed mb-12 max-w-sm mx-auto">
                our return handling team contact you shortly
              </p>
              
              <button 
                onClick={() => setIsSubmitted(false)}
                className="w-full bg-white text-black py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-accent transition-all"
              >
                Close Window
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShippingReturns;

