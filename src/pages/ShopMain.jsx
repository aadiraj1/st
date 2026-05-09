import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Sparkles, Wrench, ShoppingBag } from 'lucide-react';

const categories = [
  {
    title: "Film Variants",
    description: "Explore our premium selection of PPF variants including Gloss, Matte, and Ceramic options.",
    icon: <Shield className="w-8 h-8 text-accent" />,
    path: "/shop/film-variants",
    image: "/images/ppf-variants.jpg", // Placeholder
    delay: 0.1
  },
  {
    title: "Care Products",
    description: "Professional-grade detailing supplies formulated to maintain your vehicle's pristine finish.",
    icon: <Sparkles className="w-8 h-8 text-accent" />,
    path: "/shop/care-products",
    image: "/images/care-products.jpg", // Placeholder
    delay: 0.2
  },
  {
    title: "Tools & Kits",
    description: "Specialized gear and comprehensive kits for professional installation and maintenance.",
    icon: <Wrench className="w-8 h-8 text-accent" />,
    path: "/shop/tools-kits",
    image: "/images/tools-kits.jpg", // Placeholder
    delay: 0.3
  },
  {
    title: "Merchandise",
    description: "Premium apparel and lifestyle accessories for the true automotive enthusiast.",
    icon: <ShoppingBag className="w-8 h-8 text-accent" />,
    path: "/shop/merchandise",
    image: "/images/merchandise.jpg", // Placeholder
    delay: 0.4
  }
];

const ShopMain = () => {
  return (
    <div className="pt-24 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden rounded-[40px] mt-8">
        {/* Video Background */}
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-40">
          <source src="/e5818c65-0f63-4627-a57b-217d4cff828a/bck.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black z-10" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center relative z-20"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-glow">
            Starkx <span className="text-accent text-glow-accent">Shop</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Discover our curated collection of premium paint protection films, professional detailing supplies, and exclusive merchandise.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/shop/special-offers" className="inline-block bg-accent/20 border border-accent text-accent px-8 py-4 rounded-full font-semibold hover:bg-accent hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(0,174,239,0.3)] hover:shadow-[0_0_30px_rgba(0,174,239,0.6)]">
              View Special Offers
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Categories Grid */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category, index) => (
            <Link to={category.path} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: category.delay }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 overflow-hidden transition-all duration-500 hover:border-accent/50 hover:shadow-[0_0_40px_rgba(0,174,239,0.15)]"
              >
                {/* Background glow effect */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="mb-6 inline-block p-4 bg-white/5 rounded-xl border border-white/10 group-hover:border-accent/30 transition-colors duration-500">
                    {category.icon}
                  </div>
                  <h3 className="text-3xl font-bold mb-4 text-white group-hover:text-accent transition-colors duration-300">
                    {category.title}
                  </h3>
                  <p className="text-gray-400 text-lg leading-relaxed">
                    {category.description}
                  </p>
                </div>
                
                {/* Decorative corner element */}
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-tl-[100px]" />
              </motion.div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ShopMain;
