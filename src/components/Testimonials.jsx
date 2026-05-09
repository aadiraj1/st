import React from 'react';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    name: "Alex Thompson",
    car: "Porsche 911 GT3",
    text: "The attention to detail is staggering. You can't even see the film, but knowing my paint is safe while driving on the track gives me such peace of mind. Highly recommended.",
    rating: 5
  },
  {
    name: "Sarah Jenkins",
    car: "Tesla Model S Plaid",
    text: "The ceramic coating is like a magic mirror. My car stays clean for weeks and water just slides right off. The team at Starkx are true professionals who care about their craft.",
    rating: 5
  },
  {
    name: "Michael Chen",
    car: "Range Rover Autobiography",
    text: "I've tried other shops before, but nobody matches the precision of the edges here. They tucked everything invisibly. Simply the best shop in the city for high-end cars.",
    rating: 5
  }
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-primary px-6">
      <div className="container mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-sm font-bold text-accent uppercase tracking-[0.3em] mb-4">Voice of the Client</h2>
          <p className="text-4xl md:text-5xl font-black uppercase tracking-tight">The Starkx Experience</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-secondary p-10 relative group border border-white/5 hover:border-accent/20 transition-all">
              <Quote className="absolute top-8 right-8 text-white/5 group-hover:text-accent/10 transition-colors" size={60} />
              
              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={14} className="text-accent" fill="#00AEEF" />
                ))}
              </div>

              <p className="text-gray-300 italic mb-8 leading-relaxed font-light">
                "{t.text}"
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center text-accent font-bold">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-white uppercase text-sm tracking-widest">{t.name}</h4>
                  <p className="text-accent text-xs font-medium">{t.car}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Video Testimonial Placeholder */}
        <div className="mt-20 max-w-4xl mx-auto aspect-video glass-effect relative flex items-center justify-center group overflow-hidden cursor-pointer border border-white/10">
          <img 
            src="" /* User to add video thumbnail src */
            className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700" 
            alt="Client Story"
          />
          <div className="absolute inset-0 bg-primary/40 group-hover:bg-primary/20 transition-colors" />
          
          <div className="relative z-10 text-center">
            <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center text-black mb-4 mx-auto transform group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(0,174,239,0.5)]">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="m7 4 12 8-12 8V4z"/>
              </svg>
            </div>
            <p className="font-black uppercase tracking-widest text-lg">Watch Client Story</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
