import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Globe, Users } from 'lucide-react';

const leaders = [
  {
    name: "Dr. Aris Vance",
    role: "Chief Executive Officer & Founder",
    bio: "With a PhD in Polymer Physics from Stanford, Dr. Vance spent a decade leading material science teams in the aerospace industry before founding Starkx Auto. His obsession with 'optical clarity' led to the development of the Titan top-coat series. He believes that protection should never be a compromise for beauty.",
    philosophy: "Precision is our only currency.",
    image: "/e5818c65-0f63-4627-a57b-217d4cff828a/m1.jpg"
  },
  {
    name: "Marcus Chen",
    role: "Chief Technology Officer",
    bio: "Marcus is the architect behind the DAP (Design Access Program) pattern software. Formerly a senior developer at a leading CAD/CAM firm, he joined Starkx Auto in 2015 to digitize the detailing industry. Under his leadership, our pattern library has grown to the largest in the world with 99.9% fitment accuracy.",
    philosophy: "Software is the backbone of craftsmanship.",
    image: "/e5818c65-0f63-4627-a57b-217d4cff828a/m2.jpg"
  },
  {
    name: "Sarah Jenkins",
    role: "Global Operations Director",
    bio: "Sarah oversees our supply chain across 40 countries. With 15 years in high-end automotive logistics, she ensures that every roll of film manufactured in our Valley hub reaches dealers in pristine, climate-controlled conditions. She is the architect of our 'Safe-Package' technology.",
    philosophy: "Logistics is the art of the impossible.",
    image: "/e5818c65-0f63-4627-a57b-217d4cff828a/m3.jpg"
  }
];

const Management = () => {
  return (
    <div className="pt-28 min-h-screen bg-black text-white pb-32">

      {/* Hero */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto mb-24 text-center">
        <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30 text-accent px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-8">
          The Visionaries
        </div>

        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic mb-8">
          Executive <span className="text-accent underline decoration-4 underline-offset-8">Leadership</span>
        </h1>

        <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed font-medium">
          Guided by pioneers in material science, software engineering, and global logistics. Our management team is committed to defining the next generation of protection.
        </p>
      </section>

      {/* Leaders */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto space-y-32">
        {leaders.map((leader, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 items-center`}
          >

            {/* Image Card */}
            <div className="w-full lg:w-1/3 aspect-[4/5] rounded-[40px] overflow-hidden relative group border border-white/10">

              {/* Image */}
              <img
                src={leader.image}
                alt={leader.name}
                className="absolute inset-0 w-full h-full object-cover 
                brightness-[0.45] contrast-[1.1] saturate-[0.8] blur-[1px]
                transition-all duration-700 group-hover:scale-105 group-hover:blur-0 group-hover:brightness-[0.6]"
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/70 group-hover:bg-black/50 transition duration-500" />

              {/* Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

              {/* Accent glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 to-transparent mix-blend-overlay opacity-60" />

              {/* Icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:scale-110 transition-transform duration-700">
                <ShieldCheck size={120} />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 space-y-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic mb-2">
                  {leader.name}
                </h2>
                <p className="text-accent font-black uppercase tracking-[0.2em] text-xs">
                  {leader.role}
                </p>
              </div>

              <p className="text-gray-400 text-lg leading-relaxed font-medium">
                {leader.bio}
              </p>

              <div className="p-8 bg-secondary/20 border-l-4 border-accent rounded-r-3xl italic">
                <p className="text-gray-300 font-bold tracking-tight text-xl">
                  "{leader.philosophy}"
                </p>
              </div>

              <div className="grid grid-cols-3 gap-8 pt-4 opacity-40 grayscale">
                <div className="flex items-center gap-2"><Zap size={16} /> Innovate</div>
                <div className="flex items-center gap-2"><Globe size={16} /> Scale</div>
                <div className="flex items-center gap-2"><Users size={16} /> Protect</div>
              </div>
            </div>

          </motion.div>
        ))}
      </section>

      {/* CTA (cleaned) */}
      <section className="mt-32 px-4 md:px-8 max-w-5xl mx-auto">
        <div className="bg-gradient-to-br from-secondary/40 to-black border border-white/10 rounded-[40px] p-12 text-center">
          <h3 className="text-2xl font-black uppercase tracking-tight mb-6">
            Corporate Governance
          </h3>
          <p className="text-gray-500 max-w-xl mx-auto text-sm font-medium leading-relaxed">
            Starkx Auto adheres to the highest standards of transparency and ethics. Our global advisory board includes veterans from the automotive and chemical industries.
          </p>
        </div>
      </section>

    </div>
  );
};

export default Management;