import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import PartnerModal from './PartnerModal';

const Hero = () => {
  const [showPartnerModal, setShowPartnerModal] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.4 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  };

  const scrollToVariants = () => {
    const el = document.getElementById('variants');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <video autoPlay muted loop playsInline className="absolute w-full h-full object-cover z-0">
          <source src="/e5818c65-0f63-4627-a57b-217d4cff828a/bck.mp4" type="video/mp4" />
        </video>

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/95 via-primary/60 to-primary z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)] z-10" />

        {/* Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="container mx-auto px-4 sm:px-6 relative z-20 text-center pt-24 pb-20"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="inline-block mb-5 md:mb-8">
            <span className="flex items-center gap-2 bg-accent/10 border border-accent/20 backdrop-blur-lg px-4 sm:px-6 py-2 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-accent">
              <Shield className="animate-pulse flex-shrink-0" size={12} />
              <span>The Future of Surface Protection</span>
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-black mb-6 md:mb-8 tracking-tighter uppercase leading-[0.85] mix-blend-lighten"
            style={{ fontSize: 'clamp(3rem, 12vw, 10rem)' }}
          >
            Protecting <br />
            <span className="text-accent italic relative">
              Legacies.
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute -bottom-2 md:-bottom-4 left-0 h-2 md:h-4 bg-accent/20 -z-10"
              />
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="max-w-xl md:max-w-3xl mx-auto text-sm sm:text-base md:text-xl lg:text-2xl text-gray-400 mb-8 md:mb-12 font-medium leading-relaxed tracking-tight px-2"
          >
            Starkx.Pro Engineering designs and manufactures the world's most advanced self-healing films. From race tracks to city streets, we define the standard of invisible armor.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 px-4 sm:px-0"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(0,174,239,0.4)' }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToVariants}
              className="w-full sm:w-auto bg-accent text-black px-8 sm:px-12 py-4 sm:py-6 rounded-none font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] transition-all text-xs"
            >
              Explore Product Line
            </motion.button>
            <motion.button
              whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)', scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowPartnerModal(true)}
              className="w-full sm:w-auto border-2 border-white/20 px-8 sm:px-12 py-4 sm:py-6 rounded-none font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] transition-all text-xs backdrop-blur-sm"
            >
              Become a Partner
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        >
          <span className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-500">Scroll</span>
          <div className="w-[2px] h-8 md:h-12 bg-gradient-to-b from-accent to-transparent" />
        </motion.div>
      </section>

      <PartnerModal isOpen={showPartnerModal} onClose={() => setShowPartnerModal(false)} mode="partner" />
    </>
  );
};

export default Hero;
