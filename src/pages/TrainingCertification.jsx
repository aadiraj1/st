import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Award, CheckCircle2, ChevronRight, X, Clock, Users, BookOpen } from 'lucide-react';

const programs = [
  {
    id: 1,
    title: "Master Installer Certification",
    duration: "4 Days Intensive",
    level: "Advanced",
    attendees: "Max 12 per class",
    description: "Our flagship program covering advanced bulk-cutting, edge wrapping, and complex surface engineering. Required for 'Master Installer' status.",
    image: "bg-blue-900/20"
  },
  {
    id: 2,
    title: "Paint Correction Specialist",
    duration: "2 Days",
    level: "Intermediate",
    attendees: "Max 8 per class",
    description: "Learn the science of surface decontamination and multi-stage paint correction techniques required before PPF application.",
    image: "bg-purple-900/20"
  },
  {
    id: 3,
    title: "Business of Detailing",
    duration: "1 Day",
    level: "All Levels",
    attendees: "Unlimited (Virtual)",
    description: "Focused on sales strategy, high-ticket closing, and operational efficiency for growing detailing studios.",
    image: "bg-teal-900/20"
  }
];

const TrainingCertification = () => {
  const [enrollModal, setEnrollModal] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleEnroll = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setEnrollModal(null);
  };

  return (
    <div className="pt-28 min-h-screen bg-black text-white pb-32">
      {/* Hero Section */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30 text-accent px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-8">
            <GraduationCap size={12} /> Elite Academy
          </div>
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter italic mb-8">
            Training & <span className="text-accent underline decoration-4 underline-offset-8">Certification</span>
          </h1>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed font-medium">
            Elevate your skills to the global standard. Our certification programs are designed to transform talented installers into master craftsmen recognized worldwide.
          </p>
        </motion.div>
      </section>

      {/* Program Grid */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto mb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {programs.map((prog, idx) => (
            <motion.div 
              key={prog.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-secondary/20 border border-white/10 rounded-3xl overflow-hidden flex flex-col group hover:border-accent/30 transition-all"
            >
              <div className={`h-48 ${prog.image} relative overflow-hidden`}>
                 <div className="absolute top-4 right-4 bg-accent text-black text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full">{prog.level}</div>
                 <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:scale-110 transition-transform duration-700">
                    <BookOpen size={80} />
                 </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-black uppercase tracking-tight mb-4 group-hover:text-accent transition-colors">{prog.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-1">{prog.description}</p>
                <div className="space-y-3 mb-8">
                   <div className="flex items-center gap-3 text-xs font-bold text-gray-400"><Clock size={14} className="text-accent" /> {prog.duration}</div>
                   <div className="flex items-center gap-3 text-xs font-bold text-gray-400"><Users size={14} className="text-accent" /> {prog.attendees}</div>
                </div>
                <button 
                  onClick={() => setEnrollModal(prog)}
                  className="w-full bg-white text-black py-4 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-accent transition-all flex items-center justify-center gap-2"
                >
                  Enroll Now <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Certification Badge Section */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto mb-32">
        <div className="bg-accent/5 border border-accent/20 rounded-[40px] p-8 md:p-16 flex flex-col lg:flex-row items-center gap-16">
           <div className="w-48 h-48 bg-accent/20 rounded-full flex items-center justify-center text-accent relative shrink-0">
              <Award size={100} strokeWidth={1} />
              <div className="absolute inset-0 border-4 border-accent border-dashed rounded-full animate-spin-slow opacity-20" />
           </div>
           <div className="flex-1 text-center lg:text-left">
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter italic mb-6">The Elite Certified Badge</h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-8 font-medium">Being Elite Certified isn't just about a certificate; it's about joining an exclusive community. Our badge is recognized by luxury car owners and collectors as a mark of absolute quality and trust.</p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                 {['Global Recognition', 'Priority Referrals', 'Advanced Technical Support'].map(item => (
                   <span key={item} className="bg-white/5 border border-white/10 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-gray-400">{item}</span>
                 ))}
              </div>
           </div>
        </div>
      </section>

      {/* Enrollment Modal */}
      <AnimatePresence>
        {enrollModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
              onClick={() => setEnrollModal(null)}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-secondary border border-white/10 p-8 md:p-12 rounded-[32px] max-w-lg w-full shadow-2xl"
            >
              <button onClick={() => setEnrollModal(null)} className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"><X size={24} /></button>
              <h2 className="text-2xl font-black uppercase tracking-tight mb-2">Enrollment Form</h2>
              <p className="text-gray-500 text-xs font-black uppercase tracking-widest mb-8 text-accent">{enrollModal.title}</p>
              
              <form onSubmit={handleEnroll} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Full Name</label>
                  <input required className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 outline-none focus:border-accent text-sm" placeholder="Alex Detailing" />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Studio / Business Name</label>
                  <input required className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 outline-none focus:border-accent text-sm" placeholder="Auto Shield Miami" />
                </div>
                <div>
                   <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Email Address</label>
                   <input required type="email" className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 outline-none focus:border-accent text-sm" placeholder="alex@autoshield.com" />
                </div>
                <button type="submit" className="w-full bg-accent text-black py-5 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-white transition-all shadow-xl">
                  Submit Registration
                </button>
              </form>
            </motion.div>
          </div>
        )}

        {isSubmitted && (
          <div className="fixed inset-0 z-[210] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
              onClick={() => setIsSubmitted(false)}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-secondary border border-accent/30 p-10 md:p-16 rounded-[40px] max-w-xl w-full text-center shadow-[0_0_100px_rgba(0,174,239,0.2)]"
            >
              <div className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-10 text-accent shadow-lg">
                <CheckCircle2 size={48} strokeWidth={3} />
              </div>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter italic mb-6 leading-none">Registration <br/>Successful</h2>
              <p className="text-gray-400 font-bold uppercase text-xs tracking-widest leading-relaxed mb-10">
                Thank you for choosing Elite Academy. Our team will contact you shortly to finalize your enrollment and provide next steps for certification.
              </p>
              <button 
                onClick={() => setIsSubmitted(false)}
                className="w-full bg-white text-black py-4 rounded-xl font-black uppercase tracking-widest hover:bg-accent transition-all"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TrainingCertification;
