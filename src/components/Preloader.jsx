import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500); // 2.5 seconds for a premium feel

    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    exit: {
      y: '-100%',
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1],
        delay: 0.2
      }
    }
  };

  const textVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      }
    }
  };

  const barVariants = {
    initial: { width: 0 },
    animate: {
      width: '100%',
      transition: {
        duration: 2,
        ease: "easeInOut",
      }
    }
  };

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          variants={containerVariants}
          initial="initial"
          exit="exit"
          className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden"
        >
          <div className="relative">
            {/* Branding Text */}
            <motion.div
              variants={textVariants}
              initial="initial"
              animate="animate"
              className="flex flex-col items-center"
            >
              {/* Animated Logo Mark */}
              <motion.div
                animate={{ 
                  rotate: [0, 15, -15, 0],
                  scale: [1, 1.1, 1],
                  boxShadow: [
                    "0 0 20px rgba(0,174,239,0.2)",
                    "0 0 60px rgba(0,174,239,0.8)",
                    "0 0 20px rgba(0,174,239,0.2)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-16 h-16 md:w-24 md:h-24 bg-accent rounded-md flex items-center justify-center font-black text-4xl md:text-6xl text-black skew-x-[-15deg] mb-8"
              >
                S
              </motion.div>
              
              <h1 className="text-4xl md:text-6xl font-black tracking-[0.3em] text-white italic mb-4">
                STARKX<span className="text-accent">.PRO</span>
              </h1>
              
              {/* Animated Progress Line */}
              <div className="w-64 h-[2px] bg-white/10 relative overflow-hidden">
                <motion.div
                  variants={barVariants}
                  initial="initial"
                  animate="animate"
                  className="absolute inset-y-0 left-0 bg-accent shadow-[0_0_15px_rgba(0,174,239,0.8)]"
                />
              </div>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="mt-6 text-[10px] font-black uppercase tracking-[0.5em] text-gray-500"
              >
                Engineered for Perfection
              </motion.p>
            </motion.div>

            {/* Background Decorative Elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] -z-10" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
