import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Car, Ship, Home, Bike, ArrowRight } from 'lucide-react';

const industries = [
  {
    slug: "automotive",
    icon: <Car size={32} />,
    title: "Automotive",
    desc: "From daily drivers to track-ready supercars, our film provides unmatched protection against road debris and environmental hazards.",
    image: "/e5818c65-0f63-4627-a57b-217d4cff828a/autom.jpg"
  },
  {
    slug: "marine",
    icon: <Ship size={32} />,
    title: "Marine",
    desc: "Specialized protection for hulls and interiors against salt water, UV degradation, and extreme maritime conditions.",
    image: "/e5818c65-0f63-4627-a57b-217d4cff828a/mar1.jpg"
  },
  {
    slug: "home-office",
    icon: <Home size={32} />,
    title: "Home & Office",
    desc: "Energy-efficient window films and surface protection for high-traffic interior spaces and luxury furniture.",
    image: "/e5818c65-0f63-4627-a57b-217d4cff828a/home.jpg"
  },
  {
    slug: "motorcycle",
    icon: <Bike size={32} />,
    title: "Motorcycle",
    desc: "Precisely cut protection for tanks, fairings, and high-impact zones on all types of two-wheeled machines.",
    image: "/e5818c65-0f63-4627-a57b-217d4cff828a/motor.jpg"
  }
];

const Industries = () => {
  return (
    <section id="industries" className="py-20 bg-primary">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-xs font-black text-accent uppercase tracking-[0.5em] mb-4"
            >
              Versatility in Protection
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-none italic"
            >
              Protection for Nearly Every <span className="text-accent">Surface</span> Under the Sun
            </motion.p>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-gray-500 max-w-sm text-sm uppercase tracking-widest font-bold mb-2"
          >
            Our proprietary films are engineered to perform in the most demanding environments on Earth.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
          {industries.map((item, idx) => (
            <Link key={idx} to={`/solutions/${item.slug}`}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group relative aspect-[3/4] overflow-hidden cursor-pointer bg-black"
              >
                {/* Background Image */}
                <div className="absolute inset-0 bg-secondary transition-transform duration-1000 group-hover:scale-110">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-all opacity-40 group-hover:opacity-70" />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent z-10 opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Content */}
                <div className="absolute inset-0 p-10 flex flex-col justify-end z-20">
                  <div className="w-12 h-12 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform origin-left">
                    {item.icon}
                  </div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter mb-4 group-hover:text-accent transition-colors italic">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-400 font-medium leading-relaxed max-h-0 opacity-0 group-hover:max-h-32 group-hover:opacity-100 transition-all duration-700 overflow-hidden">
                    {item.desc}
                  </p>
                  <div className="mt-8 pt-8 border-t border-white/10 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    Explore Solutions <ArrowRight size={14} className="text-accent" />
                  </div>
                </div>

                {/* Hover Border Accent */}
                <div className="absolute inset-x-0 bottom-0 h-1 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-30" />
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Industries;
