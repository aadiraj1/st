import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

const merch = [
  {
    name: "Starkx Origin Tee",
    price: "$35.00",
    category: "Apparel",
    type: "Merch",
    image: "/e5818c65-0f63-4627-a57b-217d4cff828a/shhtt.jpeg",
    tag: "New Arrival"
  },
  {
    name: "Detailer's Hoodie",
    price: "$65.00",
    category: "Apparel",
    type: "Merch",
    image: "/e5818c65-0f63-4627-a57b-217d4cff828a/hod.jpg",
    tag: "Bestseller"
  },
  {
    name: "Pro Snapback",
    price: "$28.00",
    category: "Apparel",
    type: "Merch",
    image: "/e5818c65-0f63-4627-a57b-217d4cff828a/cap.png",
    tag: ""
  },
  {
    name: "Tech Jacket",
    price: "$120.00",
    category: "Apparel",
    type: "Merch",
    image: "/e5818c65-0f63-4627-a57b-217d4cff828a/jac.jpg",
    tag: "Limited Edition"
  }
];

const MerchandisePage = () => {
  const { addToCart } = useCart();
  const [addedPopup, setAddedPopup] = useState(null);

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedPopup(product.name);
    setTimeout(() => setAddedPopup(null), 2000);
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
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-glow tracking-tight uppercase italic">
            Starkx <span className="text-accent text-glow-accent italic">Lifestyle</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 font-bold uppercase tracking-widest text-xs">
            Premium apparel for the automotive purist. Minimalist design, maximum comfort.
          </p>
        </motion.div>
      </section>

      {/* Product Grid */}
      <section className="py-10 px-4 md:px-8 max-w-7xl mx-auto pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {merch.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative h-[450px] bg-primary rounded-2xl overflow-hidden mb-6 border border-white/5 group-hover:border-accent/30 transition-all duration-500 shadow-2xl">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

                {item.tag && (
                  <span className="absolute top-6 left-6 bg-accent text-black text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-lg">
                    {item.tag}
                  </span>
                )}

                {/* Quick Add Button */}
                <motion.div
                  className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500"
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(item);
                    }}
                    className="w-full bg-white text-black font-black uppercase tracking-widest text-xs py-4 rounded-xl hover:bg-accent transition-all shadow-2xl flex items-center justify-center gap-2"
                  >
                    <ShoppingCart size={16} /> Quick Add
                  </button>
                </motion.div>
              </div>

              <div className="text-center px-4">
                <h3 className="text-xl font-black uppercase tracking-tighter italic mb-1 group-hover:text-accent transition-colors">{item.name}</h3>
                <p className="text-accent font-black italic">{item.price}</p>
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

export default MerchandisePage;
