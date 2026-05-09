import React from 'react';
import { motion } from 'framer-motion';
import { Target, Zap, ShieldCheck, Heart } from 'lucide-react';

const features = [
  {
    icon: <Target className="text-accent" />,
    title: "Precision Fit",
    desc: "Computer-cut patterns specifically designed for your exact make and model, ensuring full coverage without visible edges."
  },
  {
    icon: <Zap className="text-accent" />,
    title: "Self-Healing",
    desc: "Minor scratches and swirl marks disappear with heat exposure, keeping your film looking new for years."
  },
  {
    icon: <ShieldCheck className="text-accent" />,
    title: "Warranty Backed",
    desc: "Our premium films come with a 10-year manufacturer warranty against yellowing, cracking, or peeling."
  },
  {
    icon: <Heart className="text-accent" />,
    title: "Care & Passion",
    desc: "We treat every vehicle as if it were our own, with meticulous attention to detail at every stage."
  }
];

const Features = () => {
  return (
    <section id="features" className="py-14 bg-primary relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-sm font-bold text-accent uppercase tracking-[0.3em] mb-4">The Standard of Excellence</h2>
          <p className="text-4xl md:text-5xl font-black uppercase tracking-tight">Why Starkx.Pro?</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -10 }}
              className="bg-secondary p-10 border border-white/5 hover:border-accent/40 transition-all group relative"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors pointer-events-none" />
              
              <div className="w-14 h-14 bg-white/5 flex items-center justify-center mb-8 border border-white/10 group-hover:bg-accent group-hover:text-black transition-all">
                {React.cloneElement(feature.icon, { size: 28, className: "group-hover:text-black transition-all" })}
              </div>
              <h3 className="text-xl font-bold mb-4 uppercase tracking-wider">{feature.title}</h3>
              <p className="text-gray-400 font-light leading-relaxed text-sm">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
