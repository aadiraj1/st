import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Plus, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const products = [
  {
    name: "Ceramic Boost Coating",
    category: "Coating",
    price: "$29.99",
    type: "Coating",
    image: "/e5818c65-0f63-4627-a57b-217d4cff828a/cot2.jpg"
  },
  {
    name: "PPF Specific Cleaner",
    category: "Protection",
    price: "$24.50",
    type: "Protection",
    image: "/e5818c65-0f63-4627-a57b-217d4cff828a/pp1.jpg"
  },
  {
    name: "UV TINTS",
    category: "Uv",
    price: "$45.00",
    type: "Uv",
    image: "/e5818c65-0f63-4627-a57b-217d4cff828a/wint.jpg"
  },
  {
    name: "Advanced Hydro Guard",
    category: "Coating",
    price: "$39.99",
    type: "Coating",
    image: "/e5818c65-0f63-4627-a57b-217d4cff828a/coat1.jpg"
  }
];

const Bestsellers = () => {
  const { addToCart } = useCart();
  const [addedPopup, setAddedPopup] = useState(null);

  const handleQuickAdd = (product) => {
    addToCart(product);
    setAddedPopup(product.name);
    setTimeout(() => setAddedPopup(null), 2000);
  };

  return (
    <section id="bestsellers" className="py-20 bg-secondary/50 relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-14 gap-8">
          <div>
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-xs font-black text-accent uppercase tracking-[0.5em] mb-4"
            >
              Essential Care
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-black uppercase tracking-tighter"
            >
              elite Bestsellers
            </motion.p>
          </div>
          <Link to="/accessories" className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-accent border-b border-accent pb-2 hover:gap-6 transition-all">
            View All Products <ShoppingCart size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group"
            >
              <div className="relative aspect-square bg-primary overflow-hidden border border-white/5 cursor-pointer">
                <div className="absolute inset-0 opacity-80 group-hover:opacity-100 transition-opacity">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                
                <div className="absolute bottom-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform">
                  <motion.button 
                    onClick={() => handleQuickAdd(product)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 bg-accent text-black flex items-center justify-center shadow-[0_0_20px_rgba(0,174,239,0.4)]"
                  >
                    <Plus size={24} />
                  </motion.button>
                </div>

                <div className="absolute top-6 left-6">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 border border-white/10 px-3 py-1 bg-primary/80">
                    {product.category}
                  </span>
                </div>
              </div>

              <div className="pt-6">
                <h3 className="text-xl font-bold uppercase tracking-tight mb-2 group-hover:text-accent transition-colors">
                  {product.name}
                </h3>
                <p className="text-lg font-black text-gray-300">
                  {product.price}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Add Popup */}
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
    </section>
  );
};

export default Bestsellers;
