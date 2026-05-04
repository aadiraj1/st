import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Send, Building2, User, Mail, Phone, Globe } from 'lucide-react';

const PartnerModal = ({ isOpen, onClose, mode = 'partner' }) => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', country: '', message: '' });

  const isDealer = mode === 'dealer';

  const title = isDealer ? 'Apply to Join the Network' : 'Become a Partner';
  const subtitle = isDealer
    ? 'Join 200+ certified installers worldwide. Fill in your details and our team will reach out.'
    : 'Partner with the world\'s leading PPF manufacturer. Tell us about yourself.';

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => setSubmitted(false), 400);
    setForm({ name: '', company: '', email: '', phone: '', country: '', message: '' });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="fixed inset-0 z-[201] flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full max-w-lg bg-[#111] border border-white/10 rounded-2xl shadow-[0_30px_100px_rgba(0,0,0,0.8)] overflow-hidden max-h-[90vh] flex flex-col">
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent" />

              {/* Header */}
              <div className="flex items-start justify-between p-6 pb-4 border-b border-white/5 flex-shrink-0">
                <div>
                  <p className="text-[10px] font-black text-accent uppercase tracking-[0.4em] mb-1">
                    {isDealer ? 'Dealer Application' : 'Partnership Inquiry'}
                  </p>
                  <h2 className="text-xl font-black uppercase tracking-tight text-white">{title}</h2>
                  <p className="text-xs text-gray-500 mt-1 font-medium leading-relaxed">{subtitle}</p>
                </div>
                <button
                  onClick={handleClose}
                  className="ml-4 mt-1 p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white flex-shrink-0"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Body */}
              <div className="overflow-y-auto flex-1">
                <AnimatePresence mode="wait">
                  {!submitted ? (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="p-6 space-y-4"
                    >
                      {/* Name + Company */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="relative">
                          <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                          <input
                            required
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Full Name *"
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-9 pr-4 text-sm text-white placeholder:text-gray-600 focus:border-accent focus:outline-none transition-colors"
                          />
                        </div>
                        <div className="relative">
                          <Building2 size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                          <input
                            required
                            type="text"
                            name="company"
                            value={form.company}
                            onChange={handleChange}
                            placeholder="Company / Shop Name *"
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-9 pr-4 text-sm text-white placeholder:text-gray-600 focus:border-accent focus:outline-none transition-colors"
                          />
                        </div>
                      </div>

                      {/* Email + Phone */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="relative">
                          <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                          <input
                            required
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Email Address *"
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-9 pr-4 text-sm text-white placeholder:text-gray-600 focus:border-accent focus:outline-none transition-colors"
                          />
                        </div>
                        <div className="relative">
                          <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                          <input
                            type="tel"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="Phone Number"
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-9 pr-4 text-sm text-white placeholder:text-gray-600 focus:border-accent focus:outline-none transition-colors"
                          />
                        </div>
                      </div>

                      {/* Country */}
                      <div className="relative">
                        <Globe size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                        <input
                          required
                          type="text"
                          name="country"
                          value={form.country}
                          onChange={handleChange}
                          placeholder="Country / City *"
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-9 pr-4 text-sm text-white placeholder:text-gray-600 focus:border-accent focus:outline-none transition-colors"
                        />
                      </div>

                      {/* Message */}
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us about your business or goals (optional)"
                        rows={3}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white placeholder:text-gray-600 focus:border-accent focus:outline-none transition-colors resize-none"
                      />

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 bg-accent text-black font-black uppercase tracking-[0.2em] text-xs py-4 rounded-xl hover:bg-white transition-colors"
                      >
                        <Send size={14} />
                        Submit Application
                      </motion.button>

                      <p className="text-center text-[10px] text-gray-600">
                        * Required fields. No spam — we'll only contact you about your inquiry.
                      </p>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-8 flex flex-col items-center text-center gap-5"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.1 }}
                        className="w-20 h-20 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center"
                      >
                        <CheckCircle size={36} className="text-accent" />
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-black uppercase tracking-tight text-white mb-2">
                          Application Received!
                        </h3>
                        <p className="text-sm text-gray-400 leading-relaxed font-medium max-w-xs mx-auto">
                          Thank you <span className="text-white font-bold">{form.name}</span>! We will contact you shortly — <span className="text-accent font-bold">within 3 to 4 business days</span> — for manual verification and next steps.
                        </p>
                      </div>
                      <div className="w-full border border-white/5 rounded-xl p-4 bg-white/5 text-left space-y-1">
                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">What happens next?</p>
                        {['Your application is reviewed by our team', 'Manual verification within 3–4 days', 'Onboarding call & welcome to the network'].map((step, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-accent font-black text-[8px] flex-shrink-0">{i + 1}</div>
                            <p className="text-xs text-gray-400">{step}</p>
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={handleClose}
                        className="w-full py-3 border border-white/10 rounded-xl text-xs font-black uppercase tracking-widest text-gray-400 hover:border-accent hover:text-accent transition-colors"
                      >
                        Close
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PartnerModal;
