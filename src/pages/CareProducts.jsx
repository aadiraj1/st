import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, PlayCircle, Info, CheckCircle2, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

const products = [
  {
    id: 1,
    name: "Ceramic Boost Spray",
    price: "$34.99",
    category: "Protection",
    type: "Chemical",
    description: "Extends the life of your ceramic coating and adds insane slickness.",
    details: "Formulated with SiO2, this spray-on, wipe-off formula provides up to 3 months of protection. Safe for PPF and bare paint.",
    image: "/e5818c65-0f63-4627-a57b-217d4cff828a/stcr.jpg"
  },
  {
    id: 2,
    name: "pH Neutral Car Wash",
    price: "$19.99",
    category: "Washing",
    type: "Chemical",
    description: "Ultra-lubricated shampoo safe for waxes, sealants, and coatings.",
    details: "Produces thick, clinging foam that encapsulates dirt, allowing for a scratch-free wash experience.",
    image: "/e5818c65-0f63-4627-a57b-217d4cff828a/ph2.jpg"
  },
  {
    id: 3,
    name: "Iron Remover",
    price: "$24.99",
    category: "Decontamination",
    type: "Chemical",
    description: "Dissolves embedded iron particles from paint and wheels.",
    details: "Color-changing formula turns purple as it reacts with iron fallout. Essential prep step before polishing or coating.",
    image: "/e5818c65-0f63-4627-a57b-217d4cff828a/ir.jpg"
  },
  {
    id: 4,
    name: "Interior Detailer",
    price: "$18.99",
    category: "Interior",
    type: "Chemical",
    description: "Cleans and protects plastics, vinyl, and leather with a matte finish.",
    details: "Leaves no greasy residue. Anti-static properties repel dust. Contains UV inhibitors to prevent fading.",
    image: "/e5818c65-0f63-4627-a57b-217d4cff828a/id.jpg"
  }
];

const CareProductsPage = () => {
  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [addedPopup, setAddedPopup] = useState(null);

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedPopup(product.name);
    setSelectedProduct(null);
    setTimeout(() => {
      setAddedPopup(null);
    }, 2000);
  };

  return (
    <div className="pt-24 min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 md:px-8 max-w-7xl mx-auto text-center overflow-hidden rounded-[40px] mt-8">
        {/* Video Background */}
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-100">
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
            Care <span className="text-accent text-glow-accent italic">Products</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 font-bold uppercase tracking-widest text-xs">
            Professional-grade detailing chemistry formulated to maintain and protect your vehicle's pristine finish.
          </p>
        </motion.div>
      </section>

      {/* Product Grid */}
      <section className="py-10 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative bg-secondary/30 border border-white/10 rounded-2xl overflow-hidden hover:border-accent/50 transition-all duration-300"
            >
              {/* Image */}
              <div className="h-64 w-full relative overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <span className="absolute top-4 left-4 text-[10px] font-black uppercase tracking-wider bg-accent/20 text-accent px-3 py-1 rounded-full border border-accent/30">
                  {product.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-6 relative z-10 bg-black/60 backdrop-blur-sm h-[200px] flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-black uppercase tracking-tighter italic">{product.name}</h3>
                    <span className="text-accent font-black italic">{product.price}</span>
                  </div>
                  <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-4 line-clamp-2">{product.description}</p>
                </div>

                <div className="flex gap-2 mt-auto">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex-1 bg-white text-black font-black uppercase tracking-widest text-[10px] py-3 rounded-lg hover:bg-accent transition-all"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="p-3 border border-white/20 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <Info size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* "How to Use" Motion Section */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto border-t border-white/10 mt-10">
        <div className="bg-secondary/40 border border-white/5 rounded-[40px] p-8 md:p-16 flex flex-col md:flex-row items-center gap-12">

          {/* LEFT CONTENT */}
          <div className="w-full md:w-1/2">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic mb-6"
            >
              Master the <span className="text-accent">Wash Process</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-400 mb-8 font-medium leading-relaxed"
            >
              Watch our step-by-step guides to ensure you're using our products correctly and safely to avoid wash-induced marring.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3 bg-accent/20 text-accent border border-accent/30 px-8 py-4 rounded-full font-black uppercase tracking-widest text-xs hover:bg-accent hover:text-black transition-all"
            >
              <PlayCircle size={20} />
              Watch Tutorials
            </motion.button>
          </div>

          {/* RIGHT VIDEO */}
          <div className="w-full md:w-1/2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="aspect-video bg-black rounded-[30px] border border-white/10 overflow-hidden relative group shadow-2xl"
            >

              {/* AUTOPLAY VIDEO */}
              <video
                src="/e5818c65-0f63-4627-a57b-217d4cff828a/smmm.mp4"
                className="w-full h-full object-cover object-bottom"
                autoPlay
                muted
                loop
                playsInline
              />

              {/* SUBTLE OVERLAY (not blocking) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

              {/* OPTIONAL CENTER ICON (fade out on hover) */}


            </motion.div>
          </div>

        </div>
      </section>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center px-4 py-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-secondary border border-white/10 rounded-[32px] p-8 max-w-lg w-full z-10 shadow-[0_0_50px_rgba(0,174,239,0.2)] max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-5 right-5 text-gray-500 hover:text-white transition-colors z-10"
              >
                <X size={22} />
              </button>
              <span className="text-accent text-[10px] font-black uppercase tracking-widest mb-4 block">{selectedProduct.category}</span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter italic mb-4">{selectedProduct.name}</h2>
              <p className="text-gray-400 font-medium leading-relaxed mb-8">{selectedProduct.details}</p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <span className="text-3xl font-black italic">{selectedProduct.price}</span>
                <button
                  onClick={() => handleAddToCart(selectedProduct)}
                  className="w-full sm:w-auto bg-accent text-black px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-white transition-all shadow-xl"
                >
                  Add to Cart
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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

export default CareProductsPage;
