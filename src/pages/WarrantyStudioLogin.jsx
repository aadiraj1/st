import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, User, AlertCircle, ShieldCheck, ChevronRight } from 'lucide-react';
import studiosData from '../data/warrantyStudios.json';

const WarrantyStudioLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Simulate network delay for premium feel
    setTimeout(() => {
      const validUser = studiosData.find(
        (user) => user.username === username && user.password === password
      );

      if (validUser) {
        // Save auth state locally
        localStorage.setItem('warrantyStudioUser', JSON.stringify(validUser));
        navigate('/warranty-studio-dashboard');
      } else {
        setError('Invalid username or password. Please try again.');
      }
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="pt-28 min-h-screen bg-black text-white flex items-center justify-center px-4 pb-20 grainy-bg">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Decorative Background Elements */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-accent/10 blur-[100px] rounded-full -z-10" />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full -z-10" />

        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-accent/10 rounded-3xl text-accent mb-6 shadow-[0_0_40px_rgba(0,174,239,0.3)] border border-accent/20 relative overflow-hidden">
             <div className="absolute inset-0 bg-accent/20 animate-pulse" />
             <Lock size={36} className="relative z-10" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic mb-3 text-white drop-shadow-lg">
            Authorized <span className="text-accent">Studio</span>
          </h1>
          <p className="text-gray-400 text-xs font-black uppercase tracking-[0.4em]">Warranty Portal Access</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-10 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-50" />
          
          <form onSubmit={handleLogin} className="space-y-6 relative z-10">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3 ml-1">Studio Username</label>
              <div className="relative group">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-accent transition-colors" size={20} />
                <input 
                  required
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-14 pr-4 outline-none focus:border-accent/50 focus:bg-white/5 transition-all text-sm font-bold tracking-wider placeholder:text-gray-700"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3 ml-1">Access Key</label>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-accent transition-colors" size={20} />
                <input 
                  required
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-14 pr-4 outline-none focus:border-accent/50 focus:bg-white/5 transition-all text-sm font-bold tracking-wider placeholder:text-gray-700"
                />
              </div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-accent text-black py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-white transition-all shadow-[0_15px_30px_rgba(0,174,239,0.3)] flex items-center justify-center gap-3 relative overflow-hidden group mt-4"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <>Authenticate <ChevronRight size={18} /></>
              )}
            </motion.button>
          </form>

          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                className="overflow-hidden"
              >
                <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-4">
                  <AlertCircle className="text-red-500 shrink-0" size={20} />
                  <p className="text-[11px] font-bold text-red-400 leading-relaxed uppercase tracking-tight">{error}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-3 text-center">
          <div className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">
            <ShieldCheck size={16} className="text-accent" /> Starkx.Pro Certified Portal
          </div>
          <p className="text-[9px] font-bold text-gray-700 uppercase tracking-widest max-w-xs leading-relaxed">
            Restricted Access. Authorized personnel only. All activities are securely logged.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default WarrantyStudioLogin;
