import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Droplets, Maximize, Target } from 'lucide-react';

const layers = [
  {
    id: 1,
    name: "Self-Healing Clear Coat",
    tech: "0.5 mil Polyurethane",
    desc: "Advanced elastomeric polymer that reflows to eliminate fine scratches and swirl marks when subjected to heat.",
    icon: <Shield className="text-accent" size={22} />,
  },
  {
    id: 2,
    name: "Impact Resistant Core",
    tech: "7.0 – 10.0 mil TPU",
    desc: "Optically clear, high-tensile core that absorbs rock chips and road debris before they reach the paint.",
    icon: <Target className="text-accent" size={22} />,
  },
  {
    id: 3,
    name: "Acrylic Adhesive",
    tech: "1.0 mil Formulation",
    desc: "Proprietary high-tack, low-initial-grab adhesive. Ensures zero silvering, easy repositioning, and clean removal.",
    icon: <Droplets className="text-accent" size={22} />,
  },
  {
    id: 4,
    name: "Matte Release Liner",
    tech: "3.0 mil Polyester",
    desc: "Protects the adhesive structure during transport and storage. Ensures consistent tension during installation.",
    icon: <Maximize className="text-accent" size={22} />,
  }
];

const FilmAnatomy = () => {
  return (
    <section className="py-16 md:py-24 bg-primary relative overflow-hidden border-y border-white/5">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[10px] font-black text-accent uppercase tracking-[0.5em] mb-4"
          >
            Proprietary Engineering
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter"
          >
            The Anatomy of Protection
          </motion.p>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto text-sm font-medium px-4">
            The multi-layer technology that makes Starkx Auto film the global manufacturing standard.
          </p>
        </div>

        {/* Layers — vertical cards, always stacked cleanly */}
        <div className="max-w-2xl mx-auto flex flex-col gap-4 md:gap-6">
          {layers.map((layer, index) => (
            <motion.div
              key={layer.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12 }}
              whileHover={{ scale: 1.01 }}
              className="flex items-start gap-4 md:gap-6 p-5 md:p-7 bg-secondary/60 border border-white/5 rounded-xl hover:border-accent/40 transition-all duration-300 group"
            >
              {/* Layer number + icon */}
              <div className="flex flex-col items-center gap-2 flex-shrink-0">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  {layer.icon}
                </div>
                <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">L{index + 1}</span>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                  <h3 className="text-base md:text-lg font-black uppercase tracking-tight text-white">{layer.name}</h3>
                  <span className="inline-block px-2 py-0.5 bg-accent/10 border border-accent/20 text-[9px] font-bold text-accent tracking-[0.2em] uppercase rounded-sm w-fit">
                    {layer.tech}
                  </span>
                </div>
                <p className="text-xs md:text-sm font-medium text-gray-400 leading-relaxed">{layer.desc}</p>
              </div>

              {/* Accent bar on left */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 group-hover:h-1/2 bg-accent transition-all duration-300 rounded-r-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FilmAnatomy;
