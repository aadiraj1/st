import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, User, AlertCircle, ShieldCheck, ChevronRight, X, Mail, Phone, Fingerprint, CheckCircle2 } from 'lucide-react';

const DealerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [supportFormData, setSupportFormData] = useState({
    email: '',
    phone: '',
    userId: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Simulate network delay
    setTimeout(() => {
      setLoading(false);
      setError("Invalid credentials. Please re-enter correct credentials or contact our support team if the issue persists.");
    }, 1500);
  };

  const handleSupportSubmit = (e) => {
    e.preventDefault();
    setIsSupportModalOpen(false);
    setIsSuccessModalOpen(true);
    // Reset form
    setSupportFormData({ email: '', phone: '', userId: '' });
  };

  return (
    <div className="pt-28 min-h-screen bg-black text-white flex items-center justify-center px-4 pb-20">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/20 rounded-2xl text-accent mb-6 shadow-[0_0_30px_rgba(0,174,239,0.2)]">
            <Lock size={32} />
          </div>
          <h1 className="text-4xl font-black uppercase tracking-tighter italic mb-2">Dealer <span className="text-accent">Portal</span></h1>
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em]">Secure Access for Authorized Partners</p>
        </div>

        <div className="bg-secondary/30 border border-white/10 rounded-[32px] p-8 md:p-10 backdrop-blur-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-3 ml-1">Email Address</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                <input 
                  required
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@dealer.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-accent transition-colors text-sm font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-3 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                <input 
                  required
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-accent transition-colors text-sm font-medium"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="hidden" />
                <div className="w-4 h-4 border border-white/20 rounded flex items-center justify-center group-hover:border-accent transition-colors">
                   <div className="w-2 h-2 bg-accent scale-0 transition-transform" />
                </div>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Remember Me</span>
              </label>
              <a href="#" className="text-[10px] font-black text-accent uppercase tracking-widest hover:text-white transition-colors">Forgot Password?</a>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-accent text-black py-5 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-white transition-all shadow-[0_15px_30px_rgba(0,174,239,0.3)] flex items-center justify-center gap-3 relative overflow-hidden group"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <>Sign In <ChevronRight size={18} /></>
              )}
            </button>
          </form>

          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-8 p-6 bg-red-500/10 border border-red-500/20 rounded-2xl flex gap-4"
              >
                <AlertCircle className="text-red-500 shrink-0" size={20} />
                <div>
                   <p className="text-xs font-bold text-red-500 leading-relaxed uppercase tracking-tight">{error}</p>

                   <button 
                    onClick={() => setIsSupportModalOpen(true)}
                    className="text-[10px] font-black text-white uppercase tracking-widest mt-3 hover:text-accent transition-colors flex items-center gap-2 group"
                   >
                    Contact Support Team <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                   </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Support Request Modal */}
        <AnimatePresence>
          {isSupportModalOpen && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/90 backdrop-blur-md"
                onClick={() => setIsSupportModalOpen(false)}
              />
              <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="relative bg-[#0A0A0A] border border-white/10 p-8 md:p-10 rounded-[32px] max-w-md w-full shadow-2xl overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl -mr-16 -mt-16" />
                <button 
                  onClick={() => setIsSupportModalOpen(false)} 
                  className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors z-10"
                >
                  <X size={24} />
                </button>
                
                <div className="mb-8">
                  <h2 className="text-2xl font-black uppercase tracking-tight mb-2 italic">Support <span className="text-accent">Request</span></h2>
                  <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Verify your identity to receive a reset link</p>
                </div>
                
                <form onSubmit={handleSupportSubmit} className="space-y-5 relative z-10">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 ml-1">Registered Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
                      <input 
                        required 
                        type="email"
                        value={supportFormData.email}
                        onChange={(e) => setSupportFormData({...supportFormData, email: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-accent text-sm transition-colors font-medium" 
                        placeholder="your@email.com" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 ml-1">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
                      <input 
                        required 
                        type="tel"
                        value={supportFormData.phone}
                        onChange={(e) => setSupportFormData({...supportFormData, phone: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-accent text-sm transition-colors font-medium" 
                        placeholder="+1 (555) 000-0000" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 ml-1">User ID</label>
                    <div className="relative">
                      <Fingerprint className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
                      <input 
                        required 
                        type="text"
                        value={supportFormData.userId}
                        onChange={(e) => setSupportFormData({...supportFormData, userId: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-accent text-sm transition-colors font-medium" 
                        placeholder="Dealer ID / Username" 
                      />
                    </div>
                  </div>
                  
                  <button type="submit" className="w-full bg-accent text-black py-5 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-white transition-all shadow-xl group flex items-center justify-center gap-3 mt-4">
                    Send Reset Link <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              </motion.div>
            </div>
          )}

          {isSuccessModalOpen && (
            <div className="fixed inset-0 z-[210] flex items-center justify-center px-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/95 backdrop-blur-xl"
                onClick={() => setIsSuccessModalOpen(false)}
              />
              <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="relative bg-[#0A0A0A] border border-accent/30 p-10 md:p-12 rounded-[40px] max-w-md w-full text-center shadow-2xl"
              >
                <div className="w-20 h-20 bg-accent/20 text-accent rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(0,174,239,0.2)]">
                  <CheckCircle2 size={40} strokeWidth={3} />
                </div>
                
                <h2 className="text-3xl font-black uppercase tracking-tighter italic mb-4">Request <span className="text-accent">Sent</span></h2>
                
                <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.2em] leading-relaxed mb-10 max-w-xs mx-auto">
                  Our team has sent you a reset link. Please check your registered email.
                </p>
                
                <button 
                  onClick={() => setIsSuccessModalOpen(false)}
                  className="w-full bg-white text-black py-4 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-accent transition-all shadow-lg"
                >
                  Back to Login
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <div className="mt-10 flex items-center justify-center gap-2 text-[10px] font-black text-gray-600 uppercase tracking-[0.2em]">
          <ShieldCheck size={14} className="text-accent" /> SSL SECURED • Starkx AUTO PROTECTION
        </div>
      </motion.div>
    </div>
  );
};

export default DealerLogin;
