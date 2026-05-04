import React from 'react';

const brands = ["PORSCHE", "FERRARI", "MERCEDES", "BMW", "AUDI", "LAMBORGHINI", "BENTLEY", "MCLAREN"];

const Marquee = () => {
  return (
    <div className="bg-secondary/50 border-y border-white/5 py-5 md:py-8 overflow-hidden relative">
      <div className="flex animate-marquee">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex shrink-0 items-center">
            {brands.map((brand) => (
              <span
                key={brand}
                className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-black text-white/5 mx-6 sm:mx-10 md:mx-16 lg:mx-24 hover:text-accent/20 transition-colors cursor-default whitespace-nowrap"
              >
                {brand}
              </span>
            ))}
          </div>
        ))}
      </div>

      {/* Gradient Fades */}
      <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-primary to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-primary to-transparent z-10 pointer-events-none" />
    </div>
  );
};

export default Marquee;
