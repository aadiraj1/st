import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, User, Mail, Phone, MapPin, Globe, CheckCircle2, ChevronRight, X, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BecomeDealer = () => {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    ownerName: '',
    email: '',
    phone: '',
    website: '',
    address: '',
    city: '',
    country: 'United States',
    businessType: 'Detailing Studio'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="pt-28 min-h-screen bg-black text-white pb-32">
      {/* Hero Section */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30 text-accent px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-8">
            <Building2 size={12} /> Partner Program
          </div>
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter italic mb-8">
            Become A <span className="text-accent underline decoration-4 underline-offset-8">Partner</span>
          </h1>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed font-medium">
            Join the world's most elite network of protective film installers. Elevate your business with industry-leading materials, precision software, and global branding.
          </p>
        </motion.div>
      </section>

      {/* Form Section */}
      <section className="px-4 md:px-8 max-w-5xl mx-auto">
        <div className="bg-secondary/20 border border-white/5 rounded-[40px] p-8 md:p-16 backdrop-blur-xl">
          <form onSubmit={handleSubmit} className="space-y-12">
            {/* Business Details */}
            <div>
              <h2 className="text-xl font-black uppercase tracking-tight mb-8 flex items-center gap-3">
                <Shield size={20} className="text-accent" /> Business Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Business Name</label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                    <input required className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-accent text-sm" placeholder="Elite Customs LLC" value={formData.businessName} onChange={(e) => setFormData({...formData, businessName: e.target.value})} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Business Website</label>
                  <div className="relative">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                    <input className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-accent text-sm" placeholder="www.yourstudio.com" value={formData.website} onChange={(e) => setFormData({...formData, website: e.target.value})} />
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Details */}
            <div>
              <h2 className="text-xl font-black uppercase tracking-tight mb-8 flex items-center gap-3">
                <User size={20} className="text-accent" /> Contact Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Contact Person</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                    <input required className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-accent text-sm" placeholder="John Wick" value={formData.ownerName} onChange={(e) => setFormData({...formData, ownerName: e.target.value})} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Work Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                    <input required type="email" className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-accent text-sm" placeholder="john@yourstudio.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                  </div>
                </div>
              </div>
            </div>

            {/* Location */}
            <div>
              <h2 className="text-xl font-black uppercase tracking-tight mb-8 flex items-center gap-3">
                <MapPin size={20} className="text-accent" /> Studio Location
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-2">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Street Address</label>
                  <input required className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 outline-none focus:border-accent text-sm" placeholder="123 Performance Way" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">City</label>
                  <input required className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 outline-none focus:border-accent text-sm" placeholder="Miami" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} />
                </div>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-accent text-black py-6 rounded-2xl font-black uppercase tracking-widest hover:bg-white transition-all shadow-[0_20px_40px_rgba(0,174,239,0.3)] flex items-center justify-center gap-4"
            >
              Submit Partnership Application <ChevronRight size={20} />
            </button>
          </form>
        </div>
      </section>

      {/* Benefits Sidebar (Visual) */}
      <section className="mt-32 px-4 md:px-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
         {['Exclusive Pricing', 'DAP Software Access', 'Global Marketing Support', 'Priority Technical Help'].map((benefit, idx) => (
           <div key={idx} className="p-8 border border-white/5 rounded-3xl text-center">
             <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle2 className="text-accent" size={20} /></div>
             <p className="text-xs font-black uppercase tracking-widest">{benefit}</p>
           </div>
         ))}
      </section>

      {/* Success Modal */}
      <AnimatePresence>
        {isSubmitted && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
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
              <div className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-10 text-accent shadow-[0_0_40px_rgba(0,174,239,0.3)]">
                <CheckCircle2 size={48} strokeWidth={3} />
              </div>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter italic mb-6 leading-none">Application <br/>Received</h2>
              <p className="text-gray-400 font-bold uppercase text-xs tracking-widest leading-relaxed mb-10">
                Thank you for your interest in Elite Auto. Our dealer relations team will review your credentials and contact you to let you know if you are eligible to join the network.
              </p>
              <button 
                onClick={() => navigate('/')}
                className="w-full bg-white text-black py-4 rounded-xl font-black uppercase tracking-widest hover:bg-accent transition-all"
              >
                Back To Home
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BecomeDealer;
