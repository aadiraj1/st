import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Users, Award, BookOpen } from 'lucide-react';
import PartnerModal from './PartnerModal';

const benefits = [
  {
    icon: <MapPin size={24} />,
    title: 'Global Territory',
    desc: 'Exclusive distribution rights in key territories across North America, Europe, and Asia.'
  },
  {
    icon: <Users size={24} />,
    title: 'Dealer Portal',
    desc: 'Access our proprietary DAP software for precision-cut patterns and inventory management.'
  },
  {
    icon: <Award size={24} />,
    title: 'Certification',
    desc: 'Master-level training and global certification programs for your installation team.'
  },
  {
    icon: <BookOpen size={24} />,
    title: 'Market Access',
    desc: 'Leverage the Starkx Auto brand power and our global marketing engine to drive leads.'
  }
];

const DealerNetwork = () => {
  const [modalMode, setModalMode] = useState(null); // 'dealer' | 'partner' | null

  const scrollToMap = () => {
    const el = document.getElementById('dealer-map');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <section id="dealer" className="py-20 md:py-32 bg-primary relative overflow-hidden">
        {/* Background Graphic */}
        <div className="absolute top-0 right-0 p-24 opacity-[0.02] pointer-events-none hidden md:block">
          <Users size={800} strokeWidth={1} />
        </div>

        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-secondary/30 border border-white/5 p-6 sm:p-12 md:p-24 relative z-10 overflow-hidden">
            {/* Blue Accent */}
            <div className="absolute top-0 left-0 w-2 h-full bg-accent" />

            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
              <div className="w-full lg:w-1/2">
                <motion.h2
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  className="text-xs font-black text-accent uppercase tracking-[0.5em] mb-4"
                >
                  Join the Network
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8 leading-[0.9]"
                >
                  Become an <br />
                  Starkx Dealer
                </motion.p>
                <p className="text-gray-400 text-base md:text-lg mb-12 font-medium leading-relaxed max-w-xl">
                  We are looking for Starkx installers and business owners to join our global network. Team up with the world's leading PPF manufacturer and elevate your shop's potential.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10">
                  {benefits.map((item, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="text-accent shrink-0 border border-accent/20 w-10 h-10 flex items-center justify-center">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-bold uppercase tracking-widest text-sm mb-2">{item.title}</h4>
                        <p className="text-xs text-gray-500 font-medium leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-12 md:mt-16 flex flex-col sm:flex-row gap-4 sm:gap-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setModalMode('dealer')}
                    className="bg-accent text-black px-10 py-5 font-black uppercase tracking-widest text-xs shadow-[0_0_20px_rgba(0,174,239,0.3)] hover:bg-white transition-all"
                  >
                    Apply to Join
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={scrollToMap}
                    className="border border-white/10 px-10 py-5 font-black uppercase tracking-widest text-xs hover:bg-white/5 transition-all"
                  >
                    Find a Local Dealer
                  </motion.button>
                </div>
              </div>

              <div className="w-full lg:w-1/2 relative">
                <div className="aspect-[4/5] bg-primary relative overflow-hidden border border-white/5">
                  <img
                    src="/e5818c65-0f63-4627-a57b-217d4cff828a/wrkk1.png"
                    alt="Dealer Workshop"
                    className="w-full h-full object-cover opacity-80 transition-all duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-10 left-10 right-10">
                    <div className="text-4xl font-black text-white/10 uppercase tracking-tighter absolute -top-12 left-0 leading-none select-none">
                      Certified <br /> Workflow
                    </div>
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">Join 200+ Shops Globally</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PartnerModal
        isOpen={modalMode !== null}
        onClose={() => setModalMode(null)}
        mode={modalMode || 'dealer'}
      />
    </>
  );
};

export default DealerNetwork;
