import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, MessageSquare, Phone, Mail, Book, Shield, Zap, X, CheckCircle2, Send } from 'lucide-react';

const faqCategories = [
  {
    id: 'installation',
    title: 'Installation',
    icon: <Zap size={20} />,
    questions: [
      { q: "How long does a full PPF installation take?", a: "A standard full-vehicle installation typically takes 1 to 2 business days. This allows for meticulous cleaning, decontamination, precision application, and a 24-hour settling period to ensure no edge lifting occurs before delivery." },
      { q: "Can PPF be applied over ceramic coating?", a: "No. PPF requires a clean, non-hydrophobic surface to bond correctly. If your vehicle has an existing ceramic coating, it must be chemically and mechanically removed before the film is applied. However, you can (and should) apply a coating over the PPF once installed." },
      { q: "Do you use pre-cut patterns or bulk installs?", a: "We utilize both. Our DAP (Design Access Program) offers the industry's most accurate pre-cut patterns for most modern vehicles. For custom work or ultra-premium seamless finishes, our certified installers are trained in advanced bulk-loading techniques." }
    ]
  },
  {
    id: 'care',
    title: 'Care & Maintenance',
    icon: <Shield size={20} />,
    questions: [
      { q: "How soon can I wash my car after installation?", a: "We recommend waiting at least 7 days before your first wash. This ensures the moisture used during application has fully evaporated and the adhesive bond is at maximum strength." },
      { q: "What cleaning products should I avoid?", a: "Avoid soaps containing waxes or sealants, especially on matte finishes. Never use petroleum-based solvents or high-pressure washers closer than 12 inches from film edges, as this can cause lifting." },
      { q: "Is the film truly self-healing?", a: "Yes. Our elastomeric top-coat will heal swirl marks and light scratches when exposed to heat (sunlight, warm water, or a heat gun). Deep gouges that penetrate the top-coat will not heal." }
    ]
  },
  {
    id: 'warranty',
    title: 'Warranty & Claims',
    icon: <Book size={20} />,
    questions: [
      { q: "What does the 10-year warranty cover?", a: "Our comprehensive warranty covers yellowing, staining, cracking, blistering, and delamination. It is backed by our global network of certified dealers." },
      { q: "Is the warranty transferable?", a: "Yes, the Elite Auto warranty is transferable to subsequent owners, provided the original installation was performed by a certified dealer and the vehicle care requirements have been met." }
    ]
  }
];

const HelpCenter = () => {
  const [activeCategory, setActiveCategory] = useState('installation');
  const [openIndex, setOpenIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [modalTitle, setModalTitle] = useState('Support Inquiry');

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(false);
    setIsSubmitted(true);
  };

  const openSupportModal = (title) => {
    setModalTitle(title);
    setShowModal(true);
  };

  return (
    <div className="pt-28 min-h-screen bg-black text-white pb-32">
      {/* Hero Section */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic mb-8">
            How Can We <span className="text-accent underline decoration-4 underline-offset-8">Help?</span>
          </h1>
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Search for installation guides, care tips, or warranty info..."
              className="w-full bg-secondary/40 border border-white/10 rounded-full py-5 pl-16 pr-8 outline-none focus:border-accent text-lg shadow-2xl"
            />
          </div>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
        {/* Sidebar Categories */}
        <div className="w-full lg:w-64 space-y-2">
          {faqCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setOpenIndex(null);
              }}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl text-sm font-black uppercase tracking-widest transition-all ${activeCategory === cat.id ? 'bg-accent text-black shadow-lg' : 'bg-white/5 text-gray-500 hover:bg-white/10'}`}
            >
              {cat.icon} {cat.title}
            </button>
          ))}

          <div className="pt-12 mt-12 border-t border-white/5">
            <h4 className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-6">Need more help?</h4>
            <div className="space-y-4">
              <button onClick={() => openSupportModal('Live Support Request')} className="flex items-center gap-3 text-xs font-bold text-gray-400 hover:text-accent transition-colors"><MessageSquare size={16} /> Live Chat</button>
              <a href="mailto:support@eliteauto.com" className="flex items-center gap-3 text-xs font-bold text-gray-400 hover:text-accent transition-colors"><Mail size={16} /> support@eliteauto.com</a>
              <a href="tel:+1800ELITE" className="flex items-center gap-3 text-xs font-bold text-gray-400 hover:text-accent transition-colors"><Phone size={16} /> 1-800-ELITE</a>
            </div>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="flex-1">
          <h2 className="text-3xl font-black uppercase tracking-tight mb-8">
            {faqCategories.find(c => c.id === activeCategory)?.title} FAQ
          </h2>
          <div className="space-y-4">
            {faqCategories.find(c => c.id === activeCategory)?.questions.map((item, idx) => (
              <div key={idx} className="bg-secondary/20 border border-white/5 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                >
                  <span className="text-lg font-bold text-gray-200">{item.q}</span>
                  <motion.div
                    animate={{ rotate: openIndex === idx ? 180 : 0 }}
                  >
                    <ChevronDown size={20} className="text-accent" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openIndex === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-white/5"
                    >
                      <div className="p-6 text-gray-400 leading-relaxed font-medium">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="mt-32 px-4 md:px-8 max-w-5xl mx-auto">
        <div className="bg-gradient-to-br from-secondary/60 to-black border border-white/10 rounded-[40px] p-12 md:p-20 text-center">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic mb-6">Still Have Questions?</h2>
          <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto font-medium">Our product specialists are available 24/7 to assist with technical queries, order tracking, and dealer support.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <button onClick={() => openSupportModal('Contact Support')} className="bg-white text-black font-black uppercase tracking-widest text-xs px-10 py-5 hover:bg-accent transition-all shadow-xl">Contact Support</button>
            <button onClick={() => openSupportModal('Submit A Ticket')} className="border border-white/10 font-black uppercase tracking-widest text-xs px-10 py-5 hover:bg-white/5 transition-all">Submit A Ticket</button>
          </div>
        </div>
      </section>

      {/* Support Modal */}
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
              
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-2">Help Center</h2>
              <p className="text-accent text-[10px] font-black uppercase tracking-[0.2em] mb-6 sm:mb-8">{modalTitle}</p>
              
              <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Full Name</label>
                    <input required className="w-full bg-white/5 border border-white/10 rounded-xl py-3 sm:py-4 px-4 outline-none focus:border-accent text-sm transition-colors" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Email Address</label>
                    <input required type="email" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 sm:py-4 px-4 outline-none focus:border-accent text-sm transition-colors" placeholder="john@example.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Subject</label>
                  <input required className="w-full bg-white/5 border border-white/10 rounded-xl py-3 sm:py-4 px-4 outline-none focus:border-accent text-sm transition-colors" placeholder="Technical Issue" />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Message</label>
                  <textarea required rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 sm:py-4 px-4 outline-none focus:border-accent text-sm transition-colors resize-none" placeholder="How can we help you today?" />
                </div>
                
                <button type="submit" className="w-full bg-accent text-black py-4 sm:py-5 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-white transition-all shadow-xl group flex items-center justify-center gap-3">
                  Submit Inquiry <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            </motion.div>
          </div>
        )}

        {isSubmitted && (
          <div className="fixed inset-0 z-[210] flex items-center justify-center px-4 py-6">
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
              className="relative bg-secondary border border-accent/30 p-8 sm:p-10 md:p-16 rounded-[24px] md:rounded-[40px] max-w-xl w-full text-center shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-accent/20 text-accent rounded-full flex items-center justify-center mx-auto mb-8 sm:mb-10 shadow-lg">
                <CheckCircle2 size={40} strokeWidth={3} />
              </div>
              
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-black uppercase tracking-tighter italic mb-4 sm:mb-6 leading-none">
                Inquiry Received
              </h2>
              
              <p className="text-gray-400 font-bold uppercase text-[11px] tracking-widest leading-relaxed mb-8 sm:mb-12 max-w-sm mx-auto">
                our team contact you within 1 to 2 business working days
              </p>
              
              <button 
                onClick={() => setIsSubmitted(false)}
                className="w-full bg-white text-black py-4 sm:py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-accent transition-all"
              >
                Back to Center
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HelpCenter;

