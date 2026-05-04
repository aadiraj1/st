import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const services = [
  {
    title: "Paint Protection Film (PPF)",
    tagline: "The Ultimate Shield",
    desc: "Self-healing, invisible urethane film that protects your paint from rock chips, road debris, and weathering.",
    popular: true
  },
  {
    title: "Ceramic Coating",
    tagline: "Showroom Shine Forever",
    desc: "Long-lasting hydrophobic protection that repels water, dirt, and UV rays while enhancing gloss and depth.",
    popular: false
  },
  {
    title: "Window Tinting",
    tagline: "Heat & UV Rejection",
    desc: "Premium ceramic tints that reduce heat, glare, and skin damage while providing privacy and style.",
    popular: false
  }
];

const Services = () => {
  return (
    <section id="services" className="py-24 bg-primary px-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-sm font-bold text-accent uppercase tracking-[0.3em] mb-4">Our Expertise</h2>
            <p className="text-4xl md:text-5xl font-black uppercase tracking-tight">Preservation Services</p>
          </div>
          <p className="text-gray-400 max-w-sm mb-2 text-sm leading-relaxed">
            Professional application of world-class protection systems tailored for high-performance and luxury vehicles.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              className="relative aspect-[4/5] overflow-hidden group cursor-pointer border border-white/5"
            >
              {/* Background Image (User to add src) */}
              <img 
                src="" /* User to add service image src here */
                alt={service.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Popular Badge */}
              {service.popular && (
                <div className="absolute top-6 right-6 bg-accent text-black px-4 py-1 text-[10px] font-black uppercase tracking-widest z-20">
                  Most Popular
                </div>
              )}

              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end z-10 translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-accent text-xs font-bold uppercase tracking-widest mb-2 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                  {service.tagline}
                </p>
                <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">{service.title}</h3>
                
                <div className="h-0 group-hover:h-20 transition-all duration-500 overflow-hidden">
                  <p className="text-gray-300 text-sm leading-relaxed mb-6">
                    {service.desc}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-widest pt-4 border-t border-white/10">
                  Learn More <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
