import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const reviews = [
  {
    name: "Alex V.",
    role: "Porsche 911 GT3 Owner",
    text: "The 10.5 mil film is a game changer for track days. Zero rock chips after 5 sessions. Optical clarity is better than factory paint.",
    color: "from-blue-600 to-cyan-500"
  },
  {
    name: "Sarah J.",
    role: "Certified Installer – LA",
    text: "The adhesive system saves us hours on installation. Tacks perfectly and stretches around complex curves without silvering.",
    color: "from-purple-600 to-pink-500"
  },
  {
    name: "Michael C.",
    role: "Fleet Manager",
    text: "We protected our entire luxury transport fleet. Self-healing properties keep our black cars flawless month after month.",
    color: "from-emerald-600 to-teal-500"
  },
  {
    name: "David T.",
    role: "Tesla Model S Plaid Owner",
    text: "Unbelievable depth. The ceramic boost integrates seamlessly. Water literally explodes off the hood when driving in rain.",
    color: "from-orange-600 to-amber-500"
  },
  {
    name: "Elena R.",
    role: "Marine Protection Specialist",
    text: "We use the industrial line for yacht hulls. Stands up to saltwater and sun better than any brand we've tested in 15 years.",
    color: "from-indigo-600 to-blue-500"
  }
];

const ReviewCard = ({ review }) => (
  <div className="w-[260px] sm:w-[320px] bg-secondary/40 backdrop-blur-xl p-5 sm:p-6 border border-white/5 whitespace-normal inline-block relative overflow-hidden transition-all duration-500 hover:border-accent/40 hover:-translate-y-2 group/card rounded-2xl flex-shrink-0">
    {/* Quote icon */}
    <Quote className="absolute top-4 right-4 text-white/5 group-hover/card:text-accent/10 transition-colors" size={40} />

    {/* Stars */}
    <div className="flex gap-1 mb-3">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={11} className="text-accent" fill="#00AEEF" />
      ))}
    </div>

    {/* Review text */}
    <p className="text-xs sm:text-sm text-gray-300 mb-4 leading-relaxed font-medium italic relative z-10 line-clamp-3">
      "{review.text}"
    </p>

    {/* Author */}
    <div className="flex items-center gap-3 relative z-10">
      <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${review.color} flex items-center justify-center text-white font-black text-sm shadow-lg transform rotate-3 group-hover/card:rotate-0 transition-transform flex-shrink-0`}>
        {review.name.charAt(0)}
      </div>
      <div>
        <div className="flex items-center gap-1.5">
          <h4 className="font-black text-white uppercase text-xs tracking-widest">{review.name}</h4>
          <CheckCircle2 size={11} className="text-accent" />
        </div>
        <p className="text-accent/70 text-[9px] font-black uppercase tracking-widest mt-0.5">{review.role}</p>
      </div>
    </div>

    {/* Hover effects */}
    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity rounded-2xl" />
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover/card:opacity-100 transition-all duration-500" />
  </div>
);

const ReviewsMarquee = () => {
  return (
    <section className="py-10 md:py-16 bg-primary overflow-hidden relative border-y border-white/5 grainy-bg">
      <div className="container mx-auto px-4 md:px-6 mb-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-[10px] font-black text-accent uppercase tracking-[0.5em] mb-3">Global Validation</h2>
          <p className="text-3xl md:text-5xl font-black uppercase tracking-tighter italic">
            Trusted by the <span className="text-accent underline decoration-4 underline-offset-6">elite</span>
          </p>
        </motion.div>
      </div>

      {/* Marquee Row 1 — left to right */}
      <div className="relative flex overflow-x-hidden group mb-4">
        <div className="animate-marquee-slow whitespace-nowrap flex gap-4 sm:gap-6 py-2 group-hover:pause-animation">
          {[...reviews, ...reviews, ...reviews].map((review, idx) => (
            <ReviewCard key={idx} review={review} />
          ))}
        </div>
        <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-primary to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-primary to-transparent z-10 pointer-events-none" />
      </div>

      {/* Marquee Row 2 — right to left (reversed) */}
      <div className="relative flex overflow-x-hidden group">
        <div className="animate-marquee-slow-reverse whitespace-nowrap flex gap-4 sm:gap-6 py-2 group-hover:pause-animation">
          {[...reviews.slice().reverse(), ...reviews.slice().reverse(), ...reviews.slice().reverse()].map((review, idx) => (
            <ReviewCard key={idx} review={review} />
          ))}
        </div>
        <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-primary to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-primary to-transparent z-10 pointer-events-none" />
      </div>

      <div className="container mx-auto px-4 md:px-6 mt-8 text-center">
        <button className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] hover:text-accent transition-colors">
          View All Verified Reviews (1,200+)
        </button>
      </div>
    </section>
  );
};

export default ReviewsMarquee;
