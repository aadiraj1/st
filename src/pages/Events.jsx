import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Users, Ticket, ArrowRight, Zap, Trophy, Star, X, CheckCircle2, AlertCircle } from 'lucide-react';

const upcomingEvents = [
  {
    id: 1,
    title: "Global Expo 2026",
    date: "June 12-15, 2026",
    location: "Las Vegas, NV",
    type: "Industry Conference",
    description: "The world's largest gathering of protective film professionals. Starkx.Pro will be unveiling our next-generation 'Titan' series film with active molecular memory.",
    capacity: "5,000+ Attendees",
    featured: true
  },
  {
    id: 2,
    title: "Masterclass: Advanced Bulk Cutting",
    date: "May 22, 2026",
    location: "Dubai, UAE",
    type: "Training Workshop",
    description: "A hands-on, intensive 2-day workshop for senior installers focusing on complex bumpers and seamless bulk installs without pre-cut patterns.",
    capacity: "20 Seats Only"
  },
  {
    id: 3,
    title: "Tokyo Auto Salon Showcase",
    date: "July 05, 2026",
    location: "Chiba, Japan",
    type: "Consumer Show",
    description: "Join us at the Makuhari Messe as we showcase 10 iconic JDM legends protected by Starkx PPF. Exclusive merchandise drops available at the booth.",
    capacity: "Public Event"
  }
];

const pastHighlights = [
  { year: "2025", title: "Manufacturer of the Year", award: "Global Detailing Awards" },
  { year: "2024", title: "Innovation in Polymers", award: "Chemical Engineering Expo" },
  { year: "2023", title: "Sustainable Coating Award", award: "Euro Automotive Summit" }
];

const Events = () => {
  const [registerModal, setRegisterModal] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState('success'); // 'success' or 'passed'

  const handleRegister = (e) => {
    e.preventDefault();
    const selectedDate = new Date(e.target.date.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      setRegistrationStatus('passed');
    } else {
      setRegistrationStatus('success');
    }
    
    setRegisterModal(null);
    setIsSubmitted(true);
  };

  return (
    <div className="pt-28 min-h-screen bg-black text-white pb-32">
      {/* Hero Section */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto mb-24 relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[120px] -z-10" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30 text-accent px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-8">
            <Zap size={12} /> Global Hub
          </div>
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic mb-8">
            The Starkx <span className="text-accent underline decoration-4 underline-offset-8">Circuit</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            From industry expos in Vegas to masterclass workshops in Dubai, witness the future of surface engineering across the globe.
          </p>
        </motion.div>
      </section>

      {/* Featured Event */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto mb-32">
        {upcomingEvents.filter(e => e.featured).map(event => (
          <motion.div 
            key={event.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-secondary/40 border border-accent/20 rounded-[40px] p-8 md:p-16 flex flex-col lg:flex-row gap-12 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[80px] group-hover:scale-150 transition-transform duration-1000" />
            <div className="flex-1 relative z-10">
              <span className="text-accent font-black uppercase tracking-[0.4em] text-xs mb-6 block">Featured Expo</span>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-8 leading-none">{event.title}</h2>
              <p className="text-gray-400 text-xl leading-relaxed mb-10 max-w-xl">{event.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-accent border border-white/10"><Calendar size={20} /></div>
                  <div>
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Date</p>
                    <p className="text-lg font-bold">{event.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-accent border border-white/10"><MapPin size={20} /></div>
                  <div>
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Location</p>
                    <p className="text-lg font-bold">{event.location}</p>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setRegisterModal(event)}
                className="bg-accent text-black font-black uppercase tracking-widest text-xs px-10 py-5 hover:bg-white transition-all shadow-[0_20px_40px_rgba(0,174,239,0.2)] flex items-center gap-4"
              >
                Register For Booth Visit <ArrowRight size={18} />
              </button>
            </div>
            <div className="w-full lg:w-96 bg-black/40 border border-white/5 rounded-3xl p-8 flex flex-col justify-between relative z-10">
              <div>
                <h4 className="text-xl font-black uppercase tracking-tight mb-6">Who's Attending?</h4>
                <div className="space-y-4">
                  {['OEM Manufacturers', 'Starkx Detailing Studios', 'Global Distributors', 'Chemical Engineers'].map(item => (
                    <div key={item} className="flex items-center gap-3 text-sm font-bold text-gray-400">
                      <Star size={14} className="text-accent" /> {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-12 pt-12 border-t border-white/5">
                <p className="text-4xl font-black text-accent mb-2">5,000+</p>
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Expected Participants</p>
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Event Grid */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto mb-32">
        <h3 className="text-3xl font-black uppercase tracking-tight mb-12 flex items-center gap-4">
          <Calendar className="text-accent" /> Upcoming Schedule
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {upcomingEvents.filter(e => !e.featured).map((event, idx) => (
            <motion.div 
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-secondary/20 border border-white/10 p-8 rounded-3xl hover:border-accent/30 transition-all group"
            >
              <div className="flex justify-between items-start mb-8">
                <span className="bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest px-4 py-2 text-gray-400">{event.type}</span>
                <span className="flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-widest"><Users size={14} /> {event.capacity}</span>
              </div>
              <h4 className="text-2xl font-black uppercase tracking-tight mb-4 group-hover:text-accent transition-colors">{event.title}</h4>
              <p className="text-gray-500 text-sm leading-relaxed mb-8">{event.description}</p>
              <div className="flex justify-between items-center mt-auto pt-8 border-t border-white/5">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">When & Where</span>
                  <span className="text-xs font-bold">{event.date} • {event.location}</span>
                </div>
                <button 
                  onClick={() => setRegisterModal(event)}
                  className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-accent hover:text-black transition-all"
                >
                  <Ticket size={20} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* History / Awards */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto">
        <div className="bg-secondary/10 border border-white/5 rounded-[40px] p-8 md:p-16">
          <h3 className="text-3xl font-black uppercase tracking-tight mb-16 text-center">Hall of Excellence</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {pastHighlights.map((item, idx) => (
              <div key={idx} className="text-center relative">
                <div className="text-8xl font-black text-white/5 absolute -top-12 left-1/2 -translate-x-1/2 select-none">{item.year}</div>
                <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-8 relative z-10">
                  <Trophy size={32} className="text-accent" />
                </div>
                <h4 className="text-xl font-black uppercase tracking-tight mb-2 relative z-10">{item.title}</h4>
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest relative z-10">{item.award}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Modal */}
      <AnimatePresence>
        {registerModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
              onClick={() => setRegisterModal(null)}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-secondary border border-white/10 p-8 md:p-12 rounded-[32px] max-w-lg w-full shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl -mr-16 -mt-16" />
              <button onClick={() => setRegisterModal(null)} className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors z-10"><X size={24} /></button>
              
              <h2 className="text-3xl font-black uppercase tracking-tight mb-2">Event Registration</h2>
              <p className="text-accent text-[10px] font-black uppercase tracking-[0.2em] mb-8">{registerModal.title}</p>
              
              <form onSubmit={handleRegister} className="space-y-6 relative z-10">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Full Name</label>
                  <input required name="name" className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 outline-none focus:border-accent text-sm transition-colors" placeholder="Enter your name" />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Email Address</label>
                  <input required type="email" name="email" className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 outline-none focus:border-accent text-sm transition-colors" placeholder="your@email.com" />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Select Date</label>
                  <input required type="date" name="date" className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 outline-none focus:border-accent text-sm transition-colors [color-scheme:dark]" />
                </div>
                
                <button type="submit" className="w-full bg-accent text-black py-5 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-white transition-all shadow-xl group flex items-center justify-center gap-3">
                  Confirm Registration <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
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
              className="absolute inset-0 bg-black/95 backdrop-blur-xl"
              onClick={() => setIsSubmitted(false)}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className={`relative bg-secondary border ${registrationStatus === 'success' ? 'border-accent/30' : 'border-red-500/30'} p-10 md:p-16 rounded-[40px] max-w-xl w-full text-center shadow-2xl`}
            >
              <div className={`w-24 h-24 ${registrationStatus === 'success' ? 'bg-accent/20 text-accent' : 'bg-red-500/20 text-red-500'} rounded-full flex items-center justify-center mx-auto mb-10 shadow-lg`}>
                {registrationStatus === 'success' ? <CheckCircle2 size={48} strokeWidth={3} /> : <AlertCircle size={48} strokeWidth={3} />}
              </div>
              
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter italic mb-6 leading-none">
                {registrationStatus === 'success' ? 'Request Received' : 'Event Expired'}
              </h2>
              
              <p className="text-gray-400 font-bold uppercase text-[11px] tracking-widest leading-relaxed mb-12 max-w-sm mx-auto">
                {registrationStatus === 'success' 
                  ? 'we will contact you shortly via email for availbality of seats and confrmation'
                  : 'already passed wait for next expop 2027'}
              </p>
              
              <button 
                onClick={() => setIsSubmitted(false)}
                className="w-full bg-white text-black py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-accent transition-all"
              >
                Return to Circuit
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Events;

