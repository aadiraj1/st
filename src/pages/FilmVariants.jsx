import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Droplets, Sun, Layers, ArrowRight } from 'lucide-react';
import FilmVariantsComponent from '../components/FilmVariants';
import { filmVariants } from '../data/filmVariants';

const specData = [
  { feature: "Thickness", nova: "6.5 mil", plus: "7.5 mil", Starkx: "8.5 mil", master: "9.5 mil" },
  { feature: "Self-Healing", nova: "Heat Activated", plus: "Heat Activated", Starkx: "Instant/Room Temp", master: "Instant/Room Temp" },
  { feature: "Hydrophobicity", nova: "High", plus: "High", Starkx: "Extreme", master: "Extreme" },
  { feature: "UV Protection", nova: "Standard", plus: "Advanced", Starkx: "Maximized", master: "Maximized" },
  { feature: "Warranty", nova: "3 Years", plus: "4 Years", Starkx: "7 Years", master: "10 Years" },
];

const FilmVariantsPage = () => {
  const [activeTab, setActiveTab] = useState('nova');

  const activeVariant = filmVariants.find(v => v.slug === activeTab);

  return (
    <div className="pt-24 min-h-screen bg-black text-white selection:bg-accent selection:text-black">
      {/* Hero Section */}
      <section className="relative py-20 px-4 md:px-8 max-w-7xl mx-auto text-center overflow-hidden rounded-[40px] mt-8">
        {/* Video Background */}
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-40">
          <source src="/e5818c65-0f63-4627-a57b-217d4cff828a/bck.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black z-10" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20"
        >
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic mb-6">
            Starkx <span className="text-accent underline decoration-4 underline-offset-8">Variants</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 font-medium">
            Engineered for perfection. Discover the technical specifications and unique benefits of our industry-leading paint protection films.
          </p>
        </motion.div>
      </section>

      {/* Interactive View Change Section */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto border-t border-white/10">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-black uppercase tracking-tight mb-8">Compare Tiers</h2>
            <div className="flex flex-wrap gap-4 mb-8">
              {filmVariants.map((v) => (
                <button
                  key={v.slug}
                  onClick={() => setActiveTab(v.slug)}
                  className={`px-8 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all duration-300 border ${
                    activeTab === v.slug
                      ? 'bg-accent text-black border-accent shadow-[0_0_20px_rgba(0,174,239,0.5)]'
                      : 'bg-white/5 text-white border-white/10 hover:bg-white/10'
                  }`}
                >
                  {v.name}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-4 text-accent">
                    <span className="text-4xl font-black italic">{activeVariant.thickness}</span>
                    <div className="h-px flex-1 bg-white/10" />
                    <span className="text-xs font-black uppercase tracking-[0.3em] text-gray-500">{activeVariant.warranty} Warranty</span>
                </div>
                <p className="text-gray-400 leading-relaxed text-lg font-medium">
                  {activeVariant.desc}
                </p>
                <div className="flex flex-wrap gap-3">
                    {activeVariant.features.map((f, i) => (
                        <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] font-black uppercase tracking-widest text-gray-400">{f}</span>
                    ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="w-full md:w-1/2 relative h-[400px] rounded-[40px] overflow-hidden border border-white/10 bg-secondary/30 flex items-center justify-center group">
             <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex items-center justify-center p-12"
              >
                 <div 
                    className="absolute inset-0 blur-[100px] opacity-20 transition-all duration-1000"
                    style={{ backgroundColor: activeVariant.color }}
                 />
                 <div className="relative z-10 w-full h-full border-2 border-white/10 rounded-3xl flex flex-col items-center justify-center bg-black/40 backdrop-blur-xl group-hover:border-accent/30 transition-colors">
                    <Layers size={80} className="text-accent mb-6" />
                    <span className="text-5xl font-black uppercase tracking-widest text-white italic">{activeVariant.name}</span>
                 </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Specifications Table */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-black uppercase tracking-tight mb-16 text-center">Technical Specifications</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="py-6 px-8 border-b border-white/20 bg-white/5 font-black uppercase tracking-widest text-[10px] text-gray-500">Feature</th>
                <th className="py-6 px-8 border-b border-white/20 bg-white/5 font-black uppercase tracking-widest text-[10px] text-gray-300">Nova</th>
                <th className="py-6 px-8 border-b border-white/20 bg-white/5 font-black uppercase tracking-widest text-[10px] text-blue-400">Plus</th>
                <th className="py-6 px-8 border-b border-white/20 bg-white/5 font-black uppercase tracking-widest text-[10px] text-accent">Starkx</th>
                <th className="py-6 px-8 border-b border-white/20 bg-white/5 font-black uppercase tracking-widest text-[10px] text-purple-400">Master</th>
              </tr>
            </thead>
            <tbody>
              {specData.map((row, idx) => (
                <motion.tr 
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="hover:bg-white/5 transition-colors group"
                >
                  <td className="py-6 px-8 border-b border-white/10 font-black uppercase tracking-tight text-xs text-gray-400 group-hover:text-white">{row.feature}</td>
                  <td className="py-6 px-8 border-b border-white/10 text-sm font-bold text-gray-500">{row.nova}</td>
                  <td className="py-6 px-8 border-b border-white/10 text-sm font-bold text-gray-500">{row.plus}</td>
                  <td className="py-6 px-8 border-b border-white/10 text-sm font-bold text-gray-500">{row.Starkx}</td>
                  <td className="py-6 px-8 border-b border-white/10 text-sm font-bold text-gray-500">{row.master}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Shared Component */}
      <FilmVariantsComponent />

    </div>
  );
};

export default FilmVariantsPage;
