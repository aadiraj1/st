import React from 'react';
import { motion } from 'framer-motion';

const metrics = [
  { value: "99.9", symbol: "%", label: "UV Rejection", desc: "Blocks harmful radiation preventing paint fade and interior cracking." },
  { value: "110", symbol: "°", label: "Contact Angle", desc: "Extreme hydrophobicity. Water beads and rolls off, carrying dirt with it." },
  { value: "400", symbol: "%", label: "Elongation", desc: "Maximum stretch before break. Wraps complex curves seamlessly." },
  { value: "10", symbol: "YR", label: "Guarantee", desc: "Optically clear warranty against yellowing, bubbling, and cracking." }
];

const CircularProgress = ({ value, label, symbol, index }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-40 h-40 mb-6">
        {/* Background Ring */}
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle 
            cx="50" cy="50" r="45" 
            fill="transparent" 
            stroke="rgba(255,255,255,0.05)" 
            strokeWidth="2" 
          />
          {/* Animated Progress Ring */}
          <motion.circle 
            initial={{ strokeDashoffset: 283 }}
            whileInView={{ strokeDashoffset: 283 - (283 * Math.min(parseInt(value) || 100, 100)) / 100 }}
            transition={{ duration: 2, delay: index * 0.2, ease: "easeOut" }}
            cx="50" cy="50" r="45" 
            fill="transparent" 
            stroke="#00AEEF" 
            strokeWidth="4"
            strokeDasharray="283"
            strokeLinecap="round"
            className="drop-shadow-[0_0_10px_rgba(0,174,239,0.5)]"
          />
        </svg>
        
        {/* Number inside ring */}
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <motion.span 
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 + 1 }}
            className="text-4xl font-black text-white leading-none tracking-tighter"
          >
            {value}<span className="text-accent text-xl">{symbol}</span>
          </motion.span>
        </div>
      </div>
      <h4 className="text-sm font-black uppercase tracking-widest text-white mb-2">{label}</h4>
    </div>
  );
};

const PerformanceMetrics = () => {
  return (
    <section className="py-20 bg-primary relative overflow-hidden border-t border-white/5">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-64 bg-accent/5 blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-14">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-xs font-black text-accent uppercase tracking-[0.5em] mb-4"
          >
            Data-Driven Superiority
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black uppercase tracking-tighter"
          >
            Performance Metrics
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {metrics.map((metric, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="text-center group"
            >
              <CircularProgress value={metric.value} label={metric.label} symbol={metric.symbol} index={idx} />
              <p className="text-gray-500 text-xs font-medium leading-relaxed max-w-xs mx-auto mt-4 group-hover:text-gray-300 transition-colors">
                {metric.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PerformanceMetrics;
