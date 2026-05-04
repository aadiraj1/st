import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
  {
    number: "01",
    title: "Detail Inspection",
    desc: "Every vehicle undergoes a high-lumen lighting audit to identify every swirl, scratch, and contamination on the surface before we touch it."
  },
  {
    number: "02",
    title: "Surface Prep",
    desc: "A multi-stage decontamination wash, clay bar treatment, and paint correction ensure the finish is absolutely flawless before protection is applied."
  },
  {
    number: "03",
    title: "Precision Install",
    desc: "Our master installers apply custom-cut film or multi-layer ceramic coatings in our dust-controlled studio for a bubble-free, seamless finish."
  },
  {
    number: "04",
    title: "Final Cure & Audit",
    desc: "Post-installation inspection and controlled curing ensure the bond is permanent and the finish meets our uncompromising 50-point quality check."
  }
];

const Process = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="process" className="py-24 bg-secondary grainy-bg">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Left: Step UI */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-sm font-bold text-accent uppercase tracking-[0.3em] mb-4">The Craft</h2>
            <p className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-12">Our Precision Process</p>

            <div className="space-y-4">
              {steps.map((step, idx) => (
                <div 
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`p-6 border-l-2 cursor-pointer transition-all ${activeStep === idx ? 'border-accent bg-white/5' : 'border-white/10 hover:border-white/30'}`}
                >
                  <div className="flex items-center gap-4 mb-2">
                    <span className={`font-black text-xl ${activeStep === idx ? 'text-accent' : 'text-gray-500'}`}>
                      {step.number}
                    </span>
                    <h3 className={`font-bold uppercase tracking-widest ${activeStep === idx ? 'text-white' : 'text-gray-400'}`}>
                      {step.title}
                    </h3>
                  </div>
                  {activeStep === idx && (
                    <motion.p 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="text-gray-400 text-sm leading-relaxed pl-9"
                    >
                      {step.desc}
                    </motion.p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Visual (Video/GIF placeholder) */}
          <div className="w-full lg:w-1/2 aspect-square relative bg-primary overflow-hidden border border-white/5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                {/* User to add step-specific video/GIF src here */}
                <video 
                  autoPlay 
                  muted 
                  loop 
                  className="w-full h-full object-cover opacity-100"
                  src="" /* User to add src */
                />
                
                {/* Decorative Elements */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8">
                  <div className="text-[120px] font-black text-white/5 leading-none select-none">
                    {steps[activeStep].number}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
