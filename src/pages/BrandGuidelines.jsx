import React from 'react';
import { motion } from 'framer-motion';
import { Download, Type, Palette, Layout, Shield, FileText, Check, X } from 'lucide-react';

const BrandGuidelines = () => {
  return (
    <div className="pt-28 min-h-screen bg-black text-white pb-32">
      {/* Hero Section */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="flex justify-center mb-8">
            <div className="w-12 h-12 bg-accent rounded-sm flex items-center justify-center font-black text-black skew-x-[-15deg]">E</div>
          </div>
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter italic mb-8">
            Brand <span className="text-accent underline decoration-4 underline-offset-8">Guidelines</span>
          </h1>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed font-medium">
            Welcome to the Starkx Auto design system. We maintain a rigorous visual identity to ensure our brand reflects the precision and performance of our engineering. Use these resources to represent Starkx Auto accurately across all media.
          </p>
        </motion.div>
      </section>

      {/* Core Identity / Logo */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto mb-32">
        <h2 className="text-3xl font-black uppercase tracking-tight mb-12 flex items-center gap-4">
          <Layout className="text-accent" /> Visual Identity
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-secondary/20 border border-white/5 rounded-3xl p-12 flex flex-col items-center justify-center min-h-[400px] relative group">
            <div className="flex items-center gap-4 mb-12">
               <div className="w-16 h-16 bg-accent rounded flex items-center justify-center font-black text-black text-3xl skew-x-[-15deg]">E</div>
               <span className="text-5xl font-black tracking-tighter uppercase italic text-white">Starkx <span className="text-accent underline decoration-4 underline-offset-4">Auto</span></span>
            </div>
            <button className="absolute bottom-8 right-8 bg-white/5 p-4 rounded-full text-gray-500 hover:bg-accent hover:text-black transition-all group-hover:scale-110">
              <Download size={20} />
            </button>
            <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.4em]">Primary Logo (Dark Mode)</p>
          </div>
          <div className="bg-white border border-black/5 rounded-3xl p-12 flex flex-col items-center justify-center min-h-[400px] relative group">
            <div className="flex items-center gap-4 mb-12">
               <div className="w-16 h-16 bg-accent rounded flex items-center justify-center font-black text-black text-3xl skew-x-[-15deg]">E</div>
               <span className="text-5xl font-black tracking-tighter uppercase italic text-black">Starkx <span className="text-accent underline decoration-4 underline-offset-4">Auto</span></span>
            </div>
            <button className="absolute bottom-8 right-8 bg-black/5 p-4 rounded-full text-gray-400 hover:bg-accent hover:text-black transition-all group-hover:scale-110">
              <Download size={20} />
            </button>
            <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.4em]">Primary Logo (Light Mode)</p>
          </div>
        </div>
      </section>

      {/* Color Palette */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto mb-32">
        <h2 className="text-3xl font-black uppercase tracking-tight mb-12 flex items-center gap-4">
          <Palette className="text-accent" /> Color Palette
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { name: "Starkx Cyan", hex: "#00AEEF", usage: "Accents, CTA, Links", class: "bg-accent text-black" },
            { name: "Obsidian", hex: "#0A0A0A", usage: "Primary Background", class: "bg-black text-white border border-white/10" },
            { name: "Gunmetal", hex: "#1A1A1A", usage: "Secondary Background", class: "bg-secondary text-white" },
            { name: "Pure White", hex: "#FFFFFF", usage: "Primary Typography", class: "bg-white text-black" }
          ].map((color, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`p-8 rounded-3xl flex flex-col justify-between h-64 ${color.class}`}
            >
              <div>
                <h4 className="text-xl font-black uppercase tracking-tight mb-1">{color.name}</h4>
                <p className="text-[10px] font-black opacity-60 uppercase tracking-widest">{color.hex}</p>
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest leading-relaxed">{color.usage}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Typography */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto mb-32">
        <div className="bg-secondary/20 border border-white/5 rounded-[40px] p-8 md:p-16">
          <h2 className="text-3xl font-black uppercase tracking-tight mb-16 flex items-center gap-4">
            <Type className="text-accent" /> Typography
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-6">Primary Typeface: Inter (Modified)</p>
              <div className="space-y-8">
                <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic leading-none">HEADLINE BOLD</h1>
                <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight">SUB-HEADLINE</h2>
                <p className="text-lg text-gray-400 font-medium leading-relaxed">
                  Body copy uses Inter with a medium weight to ensure maximum legibility across all digital and physical surfaces. Character spacing is set to -0.02em for a tighter, premium feel.
                </p>
              </div>
            </div>
            <div className="space-y-12">
              <div>
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">Font Weights</p>
                <div className="flex flex-col gap-2">
                  <div className="h-4 bg-white w-full rounded" />
                  <div className="h-4 bg-white/60 w-3/4 rounded" />
                  <div className="h-4 bg-white/30 w-1/2 rounded" />
                </div>
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">Technical Details</p>
                <ul className="space-y-4 text-sm font-bold text-gray-300">
                  <li className="flex items-center gap-3"><Check size={16} className="text-accent" /> Tracking: -0.05em for headers</li>
                  <li className="flex items-center gap-3"><Check size={16} className="text-accent" /> Leading: 1.1 for display text</li>
                  <li className="flex items-center gap-3"><X size={16} className="text-red-400" /> Do not use Serif fonts</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Asset Downloads */}
      <section className="px-4 md:px-8 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-black uppercase tracking-tight mb-8">Partner Asset Pack</h2>
        <p className="text-gray-400 mb-12 font-medium">Download the full suite of high-resolution logos, brand imagery, and social media templates (ZIP, 142MB).</p>
        <button className="bg-accent text-black font-black uppercase tracking-widest text-xs px-12 py-6 rounded-full hover:bg-white transition-all shadow-[0_20px_40px_rgba(0,174,239,0.3)] flex items-center gap-4 mx-auto">
          <Download size={20} /> Download Brand Assets
        </button>
      </section>
    </div>
  );
};

export default BrandGuidelines;
