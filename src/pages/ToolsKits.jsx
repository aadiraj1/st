import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wrench, Shield, Layers, Crosshair, CheckCircle2, ShoppingCart, Plus, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

const tools = [
  {
    name: "Precision Squeegee Kit",
    price: "$45.00",
    category: "Tools",
    type: "Installation",
    description: "Set of 5 varying durometer squeegees for different curves and channels.",
    image: "/e5818c65-0f63-4627-a57b-217d4cff828a/kt.jpg",
    icon: <Layers size={24} className="text-accent" />
  },
  {
    name: "Carbon Steel Snap Blades",
    price: "$15.00",
    category: "Tools",
    type: "Cutting",
    description: "Ultra-sharp 30-degree snap blades for perfect, clean cuts every time.",
    image: "/e5818c65-0f63-4627-a57b-217d4cff828a/kt2.jpg",
    icon: <Crosshair size={24} className="text-accent" />
  },
  {
    name: "Heat Gun Pro",
    price: "$120.00",
    category: "Tools",
    type: "Electronic",
    description: "Variable temperature control with digital display for precise film stretching.",
    image: "/e5818c65-0f63-4627-a57b-217d4cff828a/fn.jpg",
    icon: <Wrench size={24} className="text-accent" />
  },
  {
    name: "Slip Solution Mixer",
    price: "$35.00",
    category: "Tools",
    type: "Chemical Tool",
    description: "Perfectly calibrated mixing bottle for consistent tack and slip solutions.",
    image: "/e5818c65-0f63-4627-a57b-217d4cff828a/mx.png",
    icon: <Shield size={24} className="text-accent" />
  }
];

const ToolsKitsPage = () => {
  const { addToCart } = useCart();
  const [addedPopup, setAddedPopup] = useState(null);

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedPopup(product.name);
    setTimeout(() => {
      setAddedPopup(null);
    }, 2000);
  };

  return (
    <div className="pt-24 min-h-screen bg-black text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 px-4 md:px-8 max-w-7xl mx-auto text-center overflow-hidden rounded-[40px] mt-8">
        {/* Video Background */}
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-40">
          <source src="/e5818c65-0f63-4627-a57b-217d4cff828a/bck.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black z-10" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20"
        >
          <h1 className="text-5xl md:text-7xl font-black mb-6 text-glow uppercase italic">
            Tools & <span className="text-accent text-glow-accent italic">Kits</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 font-bold uppercase tracking-widest text-xs">
            Professional installation requires professional gear. Discover the tools trusted by Starkx installers worldwide.
          </p>
        </motion.div>
      </section>

      {/* Exploded View Diagram Section */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto border-y border-white/10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic mb-6"
            >
              The Anatomy of a <br /><span className="text-accent">Pro Squeegee</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 text-lg mb-8 leading-relaxed font-medium"
            >
              It's not just a piece of plastic. Our squeegees are engineered with varying durometers, ergonomic grips, and specialized edges to ensure flawless water extraction and film manipulation.
            </motion.p>
            <ul className="space-y-4">
              {[
                "80 Durometer rigid core for pressure",
                "Soft micro-edge to prevent scratching",
                "Ergonomic anti-slip center grip"
              ].map((item, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + (idx * 0.1) }}
                  className="flex items-center gap-3 text-gray-300 font-black uppercase tracking-widest text-[10px]"
                >
                  <div className="w-2 h-2 bg-accent rounded-full" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Exploded Animation */}
          <div className="w-full lg:w-1/2 h-[400px] relative flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="absolute inset-0 bg-accent/5 rounded-full blur-[100px]"
            />

            <div className="relative w-64 h-64">
              {/* Layer 1: Core */}
              <motion.div
                initial={{ y: 0, opacity: 0, rotateX: 60, rotateZ: -45 }}
                whileInView={{ y: -60, opacity: 1, rotateX: 60, rotateZ: -45 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2, type: "spring" }}
                className="absolute inset-0 bg-white border border-white rounded-lg shadow-2xl"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="absolute top-0 right-0 transform translate-x-full -translate-y-1/2 bg-black/80 backdrop-blur-md px-3 py-1 rounded border border-white/20 text-[10px] font-black uppercase tracking-widest whitespace-nowrap text-white">Rigid Core</div>
              </motion.div>

              {/* Layer 2: Grip */}
              <motion.div
                initial={{ y: 0, opacity: 0, rotateX: 60, rotateZ: -45 }}
                whileInView={{ y: 0, opacity: 1, rotateX: 60, rotateZ: -45 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4, type: "spring" }}
                className="absolute inset-0 bg-gray-800 border-2 border-gray-600 rounded-lg scale-90 shadow-2xl"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="absolute top-1/2 left-0 transform -translate-x-full -translate-y-1/2 bg-black/80 backdrop-blur-md px-3 py-1 rounded border border-white/20 text-[10px] font-black uppercase tracking-widest whitespace-nowrap text-white mr-4">Anti-Slip Grip</div>
              </motion.div>

              {/* Layer 3: Edge */}
              <motion.div
                initial={{ y: 0, opacity: 0, rotateX: 60, rotateZ: -45 }}
                whileInView={{ y: 60, opacity: 1, rotateX: 60, rotateZ: -45 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.6, type: "spring" }}
                className="absolute inset-0 bg-accent/20 border border-accent rounded-lg shadow-[0_0_30px_rgba(0,174,239,0.3)]"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="absolute bottom-0 right-0 transform translate-x-full translate-y-full bg-black/80 backdrop-blur-md px-3 py-1 rounded border border-white/20 text-[10px] font-black uppercase tracking-widest whitespace-nowrap text-white">Soft Edge</div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Product List */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto pb-32">
        <h2 className="text-4xl font-black uppercase tracking-tighter italic mb-16 text-center">Essential <span className="text-accent">Gear</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tools.map((tool, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-secondary/30 border border-white/10 p-1 rounded-[30px] flex flex-col sm:flex-row items-center gap-8 hover:border-accent/40 transition-all duration-500 shadow-2xl overflow-hidden"
            >
              <div className="w-full sm:w-48 h-48 bg-primary shrink-0 overflow-hidden rounded-[26px]">
                <img src={tool.image} alt={tool.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-100" />
              </div>
              <div className="flex-1 p-6 sm:pl-0">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/5 rounded-lg border border-white/10 group-hover:border-accent/30 transition-colors">
                      {tool.icon}
                    </div>
                    <h3 className="text-xl font-black uppercase tracking-tighter italic text-white group-hover:text-accent transition-colors">{tool.name}</h3>
                  </div>
                </div>
                <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-6 leading-relaxed">{tool.description}</p>
                <div className="flex items-center justify-between">
                  <span className="font-black italic text-accent">{tool.price}</span>
                  <button
                    onClick={() => handleAddToCart(tool)}
                    className="bg-white text-black px-6 py-2.5 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-accent transition-all flex items-center gap-2"
                  >
                    <Plus size={14} /> Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Added Popup */}
      <AnimatePresence>
        {addedPopup && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="fixed bottom-10 right-10 z-[200] bg-accent text-black px-8 py-4 rounded-xl font-black uppercase tracking-widest flex items-center gap-4 shadow-[0_0_50px_rgba(0,174,239,0.4)]"
          >
            <CheckCircle2 size={20} />
            {addedPopup} Added to Cart
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ToolsKitsPage;
