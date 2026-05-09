import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Plus, CheckCircle2, Filter, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';

const accessories = [
  // Bestsellers / Featured
  {
    name: "Ceramic Boost Coating",
    category: "Coating",
    price: "$29.99",
    type: "Chemical",
    image: "/e5818c65-0f63-4627-a57b-217d4cff828a/cot2.jpg"
  },
  {
    name: "PPF Specific Cleaner",
    category: "Protection",
    price: "$24.50",
    type: "Chemical",
    image: "/e5818c65-0f63-4627-a57b-217d4cff828a/pp1.jpg"
  },
  {
    name: "UV TINTS",
    category: "Uv",
    price: "$45.00",
    type: "Tint",
    image: "/e5818c65-0f63-4627-a57b-217d4cff828a/wint.jpg"
  },
  {
    name: "Advanced Hydro Guard",
    category: "Coating",
    price: "$39.99",
    type: "Chemical",
    image: "/e5818c65-0f63-4627-a57b-217d4cff828a/coat1.jpg"
  },

  // Care Products
  {
    name: "Ceramic Boost Spray",
    category: "Care",
    price: "$34.99",
    type: "Chemical",
    image: "/e5818c65-0f63-4627-a57b-217d4cff828a/stcr.jpg"
  },
  {
    name: "pH Neutral Car Wash",
    category: "Care",
    price: "$19.99",
    type: "Chemical",
    image: "/e5818c65-0f63-4627-a57b-217d4cff828a/ph2.jpg"
  },
  {
    name: "Iron Remover",
    category: "Care",
    price: "$24.99",
    type: "Chemical",
    image: "/e5818c65-0f63-4627-a57b-217d4cff828a/ir.jpg"
  },
  {
    name: "Interior Detailer",
    category: "Care",
    price: "$18.99",
    type: "Chemical",
    image: "/e5818c65-0f63-4627-a57b-217d4cff828a/id.jpg"
  },

  // Tools & Kits
  {
    name: "Precision Squeegee Kit",
    category: "Tools",
    price: "$45.00",
    type: "Installation",
    image: "/e5818c65-0f63-4627-a57b-217d4cff828a/kt.jpg"
  },
  {
    name: "Carbon Steel Snap Blades",
    category: "Tools",
    price: "$15.00",
    type: "Cutting",
    image: "/e5818c65-0f63-4627-a57b-217d4cff828a/kt2.jpg"
  },
  {
    name: "Heat Gun Pro",
    category: "Tools",
    price: "$120.00",
    type: "Electronic",
    image: "/e5818c65-0f63-4627-a57b-217d4cff828a/fn.jpg"
  },
  {
    name: "Slip Solution Mixer",
    category: "Tools",
    price: "$35.00",
    type: "Chemical Tool",
    image: "/e5818c65-0f63-4627-a57b-217d4cff828a/mx.png"
  },

  // Merchandise
  {
    name: "Starkx Origin Tee",
    category: "Apparel",
    price: "$35.00",
    type: "Merch",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Detailer's Hoodie",
    category: "Apparel",
    price: "$65.00",
    type: "Merch",
    image: "/e5818c65-0f63-4627-a57b-217d4cff828a/hod.jpg"
  },
  {
    name: "Pro Snapback",
    category: "Apparel",
    price: "$28.00",
    type: "Merch",
    image: "/e5818c65-0f63-4627-a57b-217d4cff828a/hod.jpg"
  },
  {
    name: "Tech Jacket",
    category: "Apparel",
    price: "$120.00",
    type: "Merch",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=800"
  },

  // Special Offers / Bundles
  {
    name: "Ultimate Prep & Protect Kit",
    category: "Bundles",
    price: "$89.99",
    type: "Offer",
    image: "https://images.unsplash.com/photo-1605515298946-d062f2e9da53?auto=format&fit=crop&q=80&w=800"
  }
];

const Accessories = () => {
  const { addToCart } = useCart();
  const [addedPopup, setAddedPopup] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleQuickAdd = (product) => {
    addToCart(product);
    setAddedPopup(product.name);
    setTimeout(() => setAddedPopup(null), 2000);
  };

  const filteredAccessories = accessories.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pt-28 min-h-screen bg-black text-white pb-32">
      {/* Video Background */}
      <div className="container mx-auto px-6 relative z-10 overflow-hidden rounded-[40px] py-20 mt-4">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-40">
          <source src="/e5818c65-0f63-4627-a57b-217d4cff828a/bck.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black z-10" />


        {/* Header content moved into the div above */}
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8 relative z-20">
          <div className="max-w-2xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic leading-none mb-6"
            >
              Starkx <span className="text-accent underline decoration-4 underline-offset-8">Accessories</span>
            </motion.h1>
            <p className="text-gray-500 text-lg font-bold uppercase tracking-tight">
              Precision tools and high-performance chemistry for professional results.
            </p>
          </div>

          <div className="w-full md:w-80 relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-accent transition-colors" size={18} />
            <input
              type="text"
              placeholder="Search accessories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-12 pr-6 outline-none focus:border-accent transition-all font-black uppercase text-[10px] tracking-widest"
            />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredAccessories.map((product, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="group"
            >
              <div className="relative aspect-[3/4] bg-primary overflow-hidden border border-white/5 rounded-3xl">
                <div className="absolute inset-0 opacity-80 group-hover:opacity-100 transition-opacity">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex justify-between items-end mb-4">
                    <div>
                      <span className="text-accent text-[10px] font-black uppercase tracking-widest block mb-2">{product.category}</span>
                      <h3 className="text-xl font-black uppercase tracking-tighter italic">{product.name}</h3>
                    </div>
                    <span className="text-lg font-black">{product.price}</span>
                  </div>

                  <button
                    onClick={() => handleQuickAdd(product)}
                    className="w-full bg-white text-black py-4 rounded-xl font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-accent transition-all"
                  >
                    <Plus size={18} /> Add to Request
                  </button>
                </div>

                <div className="absolute top-6 left-6">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                    {product.type}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
          {filteredAccessories.length === 0 && (
            <div className="col-span-full py-32 text-center">
              <p className="text-2xl font-black uppercase tracking-widest text-gray-700 italic">No matching accessories found</p>
            </div>
          )}
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
    </div>
  );
};

export default Accessories;
