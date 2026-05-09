import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Globe, Award, Zap, Target, Eye } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="pt-28 min-h-screen bg-black text-white pb-32">
      {/* Hero Section */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30 text-accent px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-8">
            Established 2012
          </div>
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic mb-8">
            Our <span className="text-accent underline decoration-4 underline-offset-8">Heritage</span>
          </h1>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed font-medium">
            From a boutique lab in Silicon Valley to a global powerhouse in surface engineering. Starkx.Pro is built on the obsession of absolute perfection in protection.
          </p>
        </motion.div>
      </section>

      {/* Story Section */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto mb-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter italic leading-none">
            A Decade of <br />Engineering Mastery
          </h2>
          <p className="text-gray-400 leading-relaxed text-lg">
            In 2012, Starkx.Pro was founded with a singular mission: to eliminate the compromise between clarity and protection. At the time, paint protection films were prone to yellowing, orange-peel textures, and premature failure.
          </p>
          <p className="text-gray-400 leading-relaxed text-lg">
            Our founders, a team of material scientists and detailing purists, spent three years in R&D before launching our first 'Titan' series. Today, our films utilize active molecular memory and advanced TPU polymers that set the industry benchmark for impact resistance and optical purity.
          </p>

          <div className="grid grid-cols-2 gap-8 pt-8">
            <div>
              <p className="text-4xl font-black text-accent mb-2">500k+</p>
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                Vehicles Protected
              </p>
            </div>
            <div>
              <p className="text-4xl font-black text-accent mb-2">40+</p>
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                Countries Reached
              </p>
            </div>
          </div>
        </div>

        {/* 🔥 Updated Image Card */}
        <div className="relative">
          <div className="aspect-square bg-secondary/30 border border-white/10 rounded-[40px] flex items-center justify-center relative overflow-hidden group">

            {/* Background Image */}
            <img
              src="/e5818c65-0f63-4627-a57b-217d4cff828a/eng.jpg" // 🔁 replace with your image path
              alt="Engineering"
              className="absolute inset-0 w-full h-full object-cover opacity-100 group-hover:scale-105 transition-transform duration-700"
            />


            {/* Shield Icon */}
            <Shield
              size={200}
              className="absolute text-white/10 group-hover:text-accent/20 transition-colors duration-700 z-[2]"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 to-transparent pointer-events-none z-[2]" />

            {/* Text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-[3]">
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-accent mb-4">
                Core Philosophy
              </p>
              <p className="text-3xl font-black italic uppercase tracking-tighter">
                Engineered <br /> for Eternity
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-secondary/20 border border-white/5 p-12 md:p-16 rounded-[40px] relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 text-white/5 group-hover:text-accent/5 transition-colors">
              <Target size={120} />
            </div>
            <h3 className="text-3xl font-black uppercase tracking-tight mb-8 flex items-center gap-4">
              <Zap className="text-accent" /> Our Mission
            </h3>
            <p className="text-gray-400 text-lg leading-relaxed font-medium relative z-10">
              To provide the most advanced, invisible, and durable surface protection solutions through continuous innovation and an unwavering commitment to the craftsman's standard.
            </p>
          </div>

          <div className="bg-secondary/20 border border-white/5 p-12 md:p-16 rounded-[40px] relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 text-white/5 group-hover:text-accent/5 transition-colors">
              <Eye size={120} />
            </div>
            <h3 className="text-3xl font-black uppercase tracking-tight mb-8 flex items-center gap-4">
              <Globe className="text-accent" /> Our Vision
            </h3>
            <p className="text-gray-400 text-lg leading-relaxed font-medium relative z-10">
              To be the global authority in high-performance coatings, where every asset worth preserving is protected by Starkx engineering.
            </p>
          </div>
        </div>
      </section>

      {/* Global Headquarters */}
      <section className="px-4 md:px-8 max-w-5xl mx-auto text-center">
        <h3 className="text-3xl font-black uppercase tracking-tight mb-16 italic">
          Global Operations
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { city: "San Francisco", role: "R&D & Design" },
            { city: "Dubai", role: "Middle East Logistics" },
            { city: "Singapore", role: "Asia-Pacific Hub" }
          ].map((loc, idx) => (
            <div key={idx} className="space-y-4">
              <div className="w-16 h-16 bg-accent/10 border border-accent/20 rounded-2xl flex items-center justify-center text-accent mx-auto mb-6">
                <Award size={32} />
              </div>
              <h4 className="text-xl font-black uppercase tracking-tight">
                {loc.city}
              </h4>
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                {loc.role}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutUs;