import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layers, ShieldAlert, Zap, Box, ArrowRight } from 'lucide-react';
import { filmVariants } from '../data/filmVariants';

const FilmVariants = () => {
  const navigate = useNavigate();

  const handleOrder = (productName, type) => {
    navigate('/roll-inquiry', { state: { product: { name: productName, type: type } } });
  };

  return (
    <section id="variants" className="py-16 md:py-24 bg-primary relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-14">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[10px] font-black text-accent uppercase tracking-[0.5em] mb-4 md:mb-6"
          >
            Engineered Thickness
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black uppercase tracking-tighter"
          >
            The Manufacturing Standard
          </motion.p>
        </div>

        {/* Responsive grid: 1 col mobile → 2 tablet → 4 desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 lg:gap-8">
          {filmVariants.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`relative group bg-secondary/30 border border-white/5 p-6 md:p-8 lg:p-10 flex flex-col justify-between hover:border-accent/30 transition-all duration-500 overflow-hidden ${item.featured ? 'lg:-translate-y-6 bg-secondary/50 border-accent/20' : ''}`}
            >
              {/* Background Glow */}
              <div
                className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-[80px] transition-all group-hover:scale-150 opacity-20 pointer-events-none"
                style={{ backgroundColor: item.color }}
              />

              <div>
                {/* Thickness Badge */}
                <div className="inline-block px-3 py-1.5 bg-accent/10 border border-accent/20 text-accent font-black text-base md:text-xl italic mb-5 md:mb-8">
                  {item.thickness}
                </div>

                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-2 md:mb-3">{item.name}</h3>
                <p className="text-[10px] font-bold uppercase tracking-widest mb-1 md:mb-2 text-accent">{item.warranty} Warranty</p>
                <p className="text-gray-400 text-xs leading-relaxed font-medium mb-6 md:mb-8">{item.desc}</p>

                {/* Features */}
                <ul className="space-y-2 md:space-y-3 mb-8 md:mb-10">
                  {item.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-300">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actions */}
              <div className="space-y-3 mt-auto">
                <Link
                  to={`/film-variant/${item.slug}`}
                  className="flex items-center justify-center gap-2 w-full py-3 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-accent transition-colors border border-white/5 hover:border-accent/20 rounded-sm"
                >
                  View Details <ArrowRight size={12} />
                </Link>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleOrder(item.name, 'Roll Order')}
                  className="w-full py-4 bg-white text-black font-black uppercase tracking-[0.15em] text-[10px] hover:bg-accent transition-colors"
                >
                  Order Rolls
                </motion.button>
              </div>

              {/* Featured Badge */}
              {item.featured && (
                <div className="absolute top-4 right-4 bg-accent text-black px-4 py-1 font-black uppercase text-[9px] tracking-widest skew-x-[-15deg] z-30 shadow-lg">
                  Industry Leader
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-16 md:mt-24 text-center">
          <p className="text-gray-500 font-bold uppercase tracking-[0.2em] text-[10px] mb-6 md:mb-8">
            All films are self-healing, hydrophobic, and anti-yellowing.
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 opacity-20">
            <ShieldAlert size={32} />
            <Zap size={32} />
            <Layers size={32} />
            <Box size={32} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FilmVariants;
