import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Heart, Coffee, Laptop, Plane, Star } from 'lucide-react';

const jobs = [
  { title: "Senior Polymer Scientist", location: "San Francisco, CA", type: "Full-Time", dept: "R&D" },
  { title: "Pattern Design Engineer", location: "Remote (Global)", type: "Contract", dept: "DAP Design" },
  { title: "Regional Sales Director", location: "Dubai, UAE", type: "Full-Time", dept: "Sales" },
  { title: "Customer Success Lead", location: "Singapore", type: "Full-Time", dept: "Support" }
];

const Careers = () => {
  return (
    <div className="pt-28 min-h-screen bg-black text-white pb-32">

      {/* Hero */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30 text-accent px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-8">
            Join The Evolution
          </div>

          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic mb-8">
            Work At <span className="text-accent underline decoration-4 underline-offset-8">Elite</span>
          </h1>

          <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed font-medium">
            We are looking for obsessives. The scientists, designers, and thinkers who want to push the boundaries of what's possible in surface preservation.
          </p>
        </motion.div>
      </section>

      {/* Culture */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto mb-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        <div className="relative order-2 lg:order-1">
          <div className="aspect-video bg-secondary/30 border border-white/10 rounded-[40px] flex items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2069')] opacity-20 grayscale group-hover:grayscale-0 transition-all duration-1000" />
            <div className="relative z-10 text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-accent mb-4 italic">
                Life at Elite
              </p>
              <p className="text-3xl font-black uppercase tracking-tighter">
                Innovation <br />Without Borders
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-8 order-1 lg:order-2">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter italic leading-none">
            Culture of <br />Obsession
          </h2>

          <p className="text-gray-400 leading-relaxed text-lg font-medium">
            We don't do 'good enough'. Our teams are empowered to experiment, fail fast, and build products that they are proud to use on their own vehicles.
          </p>

          <div className="grid grid-cols-2 gap-6 pt-4">
            <div className="flex items-center gap-4 text-sm font-bold text-gray-300">
              <Heart size={18} className="text-accent" /> Health & Wellness
            </div>
            <div className="flex items-center gap-4 text-sm font-bold text-gray-300">
              <Coffee size={18} className="text-accent" /> Premium Workspace
            </div>
            <div className="flex items-center gap-4 text-sm font-bold text-gray-300">
              <Laptop size={18} className="text-accent" /> Flexible Work
            </div>
            <div className="flex items-center gap-4 text-sm font-bold text-gray-300">
              <Plane size={18} className="text-accent" /> Global Travel
            </div>
          </div>
        </div>
      </section>

      {/* Openings */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto mb-32">

        <div className="flex justify-between items-end mb-16">
          <h3 className="text-4xl font-black uppercase tracking-tight italic">
            Current Openings
          </h3>
          <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
            {jobs.length} POSITIONS AVAILABLE
          </span>
        </div>

        <div className="space-y-4">
          {jobs.map((job, idx) => (
            <motion.div
              key={idx}
              whileHover={{ x: 10 }}
              className="bg-secondary/20 border border-white/5 p-8 rounded-3xl flex flex-col md:flex-row justify-between items-center group cursor-pointer hover:border-accent/30 transition-all"
            >

              <div className="flex flex-col gap-2 mb-6 md:mb-0 text-center md:text-left">
                <h4 className="text-xl font-black uppercase tracking-tight group-hover:text-accent transition-colors">
                  {job.title}
                </h4>

                <div className="flex items-center justify-center md:justify-start gap-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                  <span className="flex items-center gap-1">
                    <Star size={12} className="text-accent" /> {job.dept}
                  </span>
                  <span>•</span>
                  <span>{job.location}</span>
                  <span>•</span>
                  <span>{job.type}</span>
                </div>
              </div>

              {/* REPLACED APPLY BUTTON */}
              <div className="text-right">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                  Applications Currently Closed
                </p>
                <p className="text-xs text-gray-500 mt-1 max-w-xs">
                  When positions become available, they will be announced here through our official hiring cycle.
                </p>
              </div>

            </motion.div>
          ))}
        </div>
      </section>

      {/* General Inquiry */}
      <section className="px-4 md:px-8 max-w-4xl mx-auto">
        <div className="bg-accent/5 border border-accent/20 p-12 rounded-[40px] text-center">

          <Briefcase size={40} className="mx-auto mb-6 text-accent" />

          <h4 className="text-2xl font-black uppercase tracking-tight mb-4 italic">
            Don't see your role?
          </h4>

          <p className="text-gray-400 mb-8 font-medium">
            We're always looking for exceptional talent. Send your portfolio and resume to our team.
          </p>

          <a
            href="mailto:talent@eliteauto.com"
            className="text-[10px] font-black text-white uppercase tracking-widest underline underline-offset-4 hover:text-accent transition-colors"
          >
            talent@starkx.com
          </a>

        </div>
      </section>

    </div>
  );
};

export default Careers;