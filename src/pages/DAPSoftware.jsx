import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, Download, Zap, Database, Shield, Lock, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const DAPSoftware = () => {
  return (
    <div className="pt-28 min-h-screen bg-black text-white pb-32">
      {/* Hero Section */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto mb-24 relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[120px] -z-10 opacity-50" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30 text-accent px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-8">
            <Monitor size={12} /> Design Access Program
          </div>
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic mb-8 leading-none">
            DAP <span className="text-accent underline decoration-4 underline-offset-8">V3.0</span>
          </h1>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed font-medium">
            The world's most advanced pattern cutting software. Experience unparalleled precision with our library of over 100,000 vehicle patterns, engineered specifically for Elite Auto films.
          </p>
        </motion.div>
      </section>

      {/* Feature Grid */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto mb-32 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { title: "Precision-Fit", desc: "Every pattern is hand-tested to ensure a 0.5mm tolerance, reducing install time by up to 40%.", icon: <Zap /> },
          { title: "Live Library", desc: "Daily updates for new model releases, including the latest EVs and luxury supercars.", icon: <Database /> },
          { title: "Zero-Waste", desc: "Proprietary nesting algorithms minimize film waste, maximizing your profit per roll.", icon: <Shield /> }
        ].map((feat, idx) => (
          <div key={idx} className="bg-secondary/20 border border-white/5 p-10 rounded-3xl hover:border-accent/30 transition-all group">
            <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-accent mb-8 group-hover:bg-accent group-hover:text-black transition-all">
              {feat.icon}
            </div>
            <h3 className="text-2xl font-black uppercase tracking-tight mb-4">{feat.title}</h3>
            <p className="text-gray-500 leading-relaxed font-medium">{feat.desc}</p>
          </div>
        ))}
      </section>

      {/* Login Gate Section */}
      <section className="px-4 md:px-8 max-w-5xl mx-auto">
        <div className="bg-gradient-to-br from-secondary/40 to-black border border-white/10 rounded-[40px] p-8 md:p-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070')] opacity-5 mix-blend-overlay pointer-events-none" />
          <div className="relative z-10">
            <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-10 text-gray-500">
               <Lock size={32} />
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter italic mb-6 italic">Login Required</h2>
            <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto font-medium">Access to the DAP Software and its comprehensive pattern library is restricted to certified Elite Auto partners.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link to="/dealer-login" className="bg-accent text-black font-black uppercase tracking-widest text-xs px-12 py-5 hover:bg-white transition-all shadow-[0_20px_40px_rgba(0,174,239,0.2)] flex items-center gap-3">
                Dealer Login <ChevronRight size={18} />
              </Link>
              <Link to="/become-dealer" className="border border-white/10 font-black uppercase tracking-widest text-xs px-12 py-5 hover:bg-white/5 transition-all">
                Become a Dealer
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Download Preview */}
      <section className="mt-32 px-4 md:px-8 max-w-7xl mx-auto text-center">
        <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.4em] mb-8">Compatible with Graphtec, Roland, and Summa Plotters</p>
        <div className="flex flex-wrap justify-center gap-12 opacity-30 grayscale">
          {/* Mock Logos */}
          <div className="text-2xl font-black italic uppercase tracking-tighter">GRAPHTEC</div>
          <div className="text-2xl font-black italic uppercase tracking-tighter">ROLAND</div>
          <div className="text-2xl font-black italic uppercase tracking-tighter">SUMMA</div>
        </div>
      </section>
    </div>
  );
};

export default DAPSoftware;
