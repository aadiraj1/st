import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, User, AlertCircle, ShieldCheck, ChevronRight } from 'lucide-react';
import { supabase } from '../supabase';

const StudiosLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error: dbError } = await supabase
        .from('users')
        .select('*')
        .eq('username', username)
        .eq('password', password)
        .maybeSingle();

      if (dbError) {
        console.error('Supabase DB error:', dbError);
        setError(`Database Error: ${dbError.message} (${dbError.details || 'Check console'})`);
      } else if (data) {
        localStorage.setItem('studiosUser', username);
        navigate('/studios-dashboard');
      } else {
        setError('Wrong credentials');
      }
    } catch (err) {
      console.error('Unexpected login exception:', err);
      setError(`Unexpected error: ${err.message || err}`);
    } finally {
      setLoading(false);
    }
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
          <h1 className="text-4xl font-black uppercase tracking-tighter italic mb-2">Studios <span className="text-accent">Login</span></h1>
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em]">Secure Access</p>
        </div>

        <div className="bg-secondary/30 border border-white/10 rounded-[32px] p-8 md:p-10 backdrop-blur-xl">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-3 ml-1">Username</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                <input 
                  required
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
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

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-accent text-black py-5 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-white transition-all shadow-[0_15px_30px_rgba(0,174,239,0.3)] flex items-center justify-center gap-3 relative overflow-hidden group"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <>Login <ChevronRight size={18} /></>
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
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center justify-center gap-2 text-[10px] font-black text-gray-600 uppercase tracking-[0.2em]">
          <ShieldCheck size={14} className="text-accent" /> SSL SECURED • Starkx.Pro PROTECTION
        </div>
      </motion.div>
    </div>
  );
};

export default StudiosLogin;
