import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Handshake, ShieldCheck, Zap, Globe, MessageSquare, ChevronRight } from 'lucide-react';

const partnershipTiers = [
   {
      title: "OEM Integration",
      desc: "Factory-level protection solutions for automotive manufacturers (OEMs).",
      features: ["Factory-Fresh Protection", "Seamless Application", "Custom Polymer Formulation"]
   },
   {
      title: "B2B Distribution",
      desc: "Regional and global distribution rights for Elite Auto films and products.",
      features: ["Exclusive Territories", "Marketing Support", "Logistics Priority"]
   },
   {
      title: "Strategic Alliance",
      desc: "Collaboration for co-branded products and advanced material research.",
      features: ["Shared R&D", "Co-Marketing", "Event Integration"]
   }
];

const Partnerships = () => {
   const [showForm, setShowForm] = useState(false);
   const [submitted, setSubmitted] = useState(false);

   const [formData, setFormData] = useState({
      name: "",
      email: "",
      company: "",
      type: "OEM"
   });

   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      setSubmitted(true);
   };

   const closeModal = () => {
      setShowForm(false);
      setSubmitted(false);
      setFormData({ name: "", email: "", company: "", type: "OEM" });
   };

   return (
      <div className="pt-28 min-h-screen bg-black text-white pb-32">

         {/* HERO */}
         <section className="px-4 md:px-8 max-w-7xl mx-auto mb-24 text-center">
            <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30 text-accent px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-8">
               Global Alliances
            </div>

            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic mb-8">
               Strategic <span className="text-accent underline decoration-4 underline-offset-8">Partners</span>
            </h1>

            <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed font-medium">
               We collaborate with industry leaders to push the boundaries of surface protection and global distribution.
            </p>
         </section>

         {/* TIERS */}
         <section className="px-4 md:px-8 max-w-7xl mx-auto mb-32 grid grid-cols-1 md:grid-cols-3 gap-8">
            {partnershipTiers.map((tier, idx) => (
               <div
                  key={idx}
                  className="bg-secondary/30 border border-white/5 p-12 rounded-[40px] flex flex-col h-full group hover:border-accent/30 transition-all"
               >
                  <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-accent mb-10 group-hover:bg-accent group-hover:text-black transition-all">
                     <ShieldCheck size={32} />
                  </div>

                  <h3 className="text-3xl font-black uppercase tracking-tight mb-6 italic">
                     {tier.title}
                  </h3>

                  <p className="text-gray-500 font-medium mb-10 leading-relaxed flex-1">
                     {tier.desc}
                  </p>

                  <ul className="space-y-4 mb-12">
                     {tier.features.map((feat, i) => (
                        <li key={i} className="flex items-center gap-3 text-xs font-bold text-gray-400">
                           <Zap size={14} className="text-accent" /> {feat}
                        </li>
                     ))}
                  </ul>
               </div>
            ))}
         </section>

         {/* GLOBAL SECTION */}
         <section className="px-4 md:px-8 max-w-7xl mx-auto mb-32">
            <div className="bg-secondary/20 border border-white/5 rounded-[40px] p-8 md:p-16 flex flex-col lg:flex-row items-center gap-16">

               <div className="flex-1 space-y-8">
                  <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic leading-none">
                     A Global <br />Network of Trust
                  </h2>

                  <p className="text-gray-400 text-lg leading-relaxed font-medium">
                     Our partners span across 40 countries, from boutique studios to OEM manufacturers.
                  </p>

                  <div className="flex gap-12">
                     <div>
                        <p className="text-4xl font-black text-accent mb-2">150+</p>
                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Active Partners</p>
                     </div>
                     <div>
                        <p className="text-4xl font-black text-accent mb-2">40</p>
                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Countries</p>
                     </div>
                  </div>
               </div>

               <div className="w-full lg:w-1/2 aspect-video bg-black/40 border border-white/5 rounded-3xl flex items-center justify-center relative overflow-hidden">
                  <Globe size={200} className="text-white/5" />
                  <Handshake size={64} className="absolute text-accent opacity-20" />
               </div>
            </div>
         </section>

         {/* INQUIRY */}
         <section className="px-4 md:px-8 max-w-4xl mx-auto">
            <div className="bg-accent/10 border border-accent/20 p-12 md:p-20 rounded-[40px] text-center">

               <MessageSquare size={48} className="mx-auto mb-8 text-accent" />

               <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter italic mb-6">
                  Partnership Inquiry
               </h3>

               <p className="text-gray-400 mb-12 font-medium">
                  Interested in collaborating? Submit your details below.
               </p>

               {/* SINGLE BUTTON */}
               <button
                  onClick={() => setShowForm(true)}
                  className="bg-accent text-black font-black uppercase tracking-widest text-xs px-12 py-5 hover:bg-white transition-all shadow-xl flex items-center gap-3 mx-auto"
               >
                  Send Inquiry <ChevronRight size={18} />
               </button>
            </div>
         </section>

         {/* MODAL */}
         {showForm && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4">

               <div className="bg-secondary/30 border border-white/10 rounded-3xl p-10 w-full max-w-md text-center">

                  {!submitted ? (
                     <>
                        <h3 className="text-2xl font-black uppercase mb-6">
                           Partnership Form
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-4 text-left">

                           <input
                              name="name"
                              onChange={handleChange}
                              placeholder="Full Name"
                              className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-sm"
                              required
                           />

                           <input
                              name="email"
                              onChange={handleChange}
                              placeholder="Email"
                              className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-sm"
                              required
                           />

                           <input
                              name="company"
                              onChange={handleChange}
                              placeholder="Company"
                              className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-sm"
                           />

                           <select
                              name="type"
                              onChange={handleChange}
                              className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-sm"
                           >
                              <option>OEM</option>
                              <option>Distribution</option>
                              <option>Strategic</option>
                           </select>

                           <button
                              type="submit"
                              className="w-full bg-accent text-black font-black uppercase text-xs py-4 rounded-xl mt-4"
                           >
                              Submit Request
                           </button>
                        </form>
                     </>
                  ) : (
                     <>
                        <h3 className="text-xl font-black uppercase mb-4 text-accent">
                           Request Received
                        </h3>

                        <p className="text-gray-300 text-sm leading-relaxed">
                           Our official partnership team will review your request and contact you soon regarding next steps.
                        </p>

                        <button
                           onClick={closeModal}
                           className="mt-8 text-xs font-black uppercase tracking-widest text-accent underline"
                        >
                           Close
                        </button>
                     </>
                  )}

               </div>
            </div>
         )}

      </div>
   );
};

export default Partnerships;