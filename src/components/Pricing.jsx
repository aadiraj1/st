import React from 'react';
import { Check } from 'lucide-react';

const tiers = [
  {
    name: "Front End",
    price: "799",
    desc: "Essential protection for impact zones.",
    features: ["Front Bumper", "Hood & Fenders", "Side Mirrors", "10-Year Warranty", "Free First Wash"]
  },
  {
    name: "Full Vehicle",
    price: "3499",
    desc: "Comprehensive protection for the entire car.",
    features: ["Every Painted Surface", "Door Cups & Edges", "Headlights", "Full Ceramic Topping", "Lifetime Support"],
    popular: true
  },
  {
    name: "Ceramic Pro",
    price: "1299",
    desc: "Multi-layer gloss and protection.",
    features: ["9H Hardness", "Chemical Resistance", "Deep Mirror Finish", "Interior Protection", "Wheel Coating"]
  }
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-24 bg-primary px-6 relative overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-sm font-bold text-accent uppercase tracking-[0.3em] mb-4">Investment</h2>
          <p className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-6">Transparent Packages</p>
          <p className="text-gray-400 max-w-2xl mx-auto">Premium protection is an investment in your car's future value. We offer tiered packages to suit every level of protection required.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {tiers.map((tier, idx) => (
            <div 
              key={idx} 
              className={`relative p-10 border transition-all ${tier.popular ? 'bg-secondary border-accent scale-105 z-10 shadow-[0_0_50px_rgba(0,174,239,0.1)]' : 'bg-secondary/50 border-white/5 hover:border-white/20'}`}
            >
              {tier.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent text-black px-6 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-full">
                  Recommended
                </div>
              )}

              <h3 className="text-2xl font-black uppercase tracking-widest mb-2">{tier.name}</h3>
              <p className="text-gray-400 text-sm mb-8 font-light">{tier.desc}</p>
              
              <div className="flex items-baseline gap-1 mb-10">
                <span className="text-sm font-bold text-gray-400 uppercase">Starting at</span>
                <span className="text-5xl font-black text-accent">${tier.price}</span>
              </div>

              <ul className="space-y-4 mb-10">
                {tier.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                    <Check size={16} className="text-accent" /> {f}
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 font-black uppercase tracking-widest text-xs transition-all ${tier.popular ? 'bg-accent text-black hover:bg-white' : 'bg-white/5 text-white hover:bg-white hover:text-black'}`}>
                Inquire Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
