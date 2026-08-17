import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Search, CheckCircle2, AlertCircle, Calendar, BadgeCheck, Zap, LogOut, FileText, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import sequence from '../data/sequence.json';

const WarrantyStudioDashboard = () => {
  const [serial, setSerial] = useState('');
  const [type, setType] = useState('');
  const [result, setResult] = useState(null);
  const [isChecking, setIsChecking] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check auth
    const storedUser = localStorage.getItem('warrantyStudioUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate('/warranty-studio-login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('warrantyStudioUser');
    navigate('/warranty-studio-login');
  };

  const checkWarranty = (e) => {
    e.preventDefault();
    setIsChecking(true);
    setResult(null);

    // Simulate a "premium" scanning effect
    setTimeout(() => {
      const isValid = sequence.includes(serial.trim());
      
      if (isValid) {
        // Calculate years based on type
        let years = "5"; // Default
        const lowerType = type.toLowerCase();
        
        if (lowerType.includes('master')) years = "10";
        else if (lowerType.includes('elite')) years = "7";
        else if (lowerType.includes('plus')) years = "4";
        else if (lowerType.includes('nova')) years = "3";

        setResult({
          status: 'valid',
          years: years,
          serial: serial,
          type: type || 'Standard Protection'
        });
      } else {
        setResult({ status: 'invalid' });
      }
      setIsChecking(false);
    }, 1500);
  };

  if (!user) return null; // or a loader

  return (
    <div className="pt-28 min-h-screen bg-black text-white pb-32 selection:bg-accent selection:text-black grainy-bg">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        
        {/* Top Bar for Logged in User */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row items-center justify-between bg-white/5 border border-white/10 rounded-2xl p-4 md:p-6 mb-12 backdrop-blur-md"
        >
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center text-accent">
              <User size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Authorized Studio</p>
              <h2 className="text-xl font-black uppercase tracking-tight text-white">{user.studioName}</h2>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-red-400 hover:text-red-300 transition-colors px-4 py-2 border border-red-500/20 rounded-lg hover:bg-red-500/10"
          >
            <LogOut size={14} /> Disconnect
          </button>
        </motion.div>

        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 px-4 py-2 rounded-full mb-6 shadow-[0_0_20px_rgba(0,174,239,0.2)]">
            <ShieldCheck size={14} className="text-accent" />
            <span className="text-[10px] font-black uppercase tracking-widest text-accent">Studio Validation Portal</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic mb-6">
            Add & Verify <span className="text-accent underline decoration-4 underline-offset-8">Warranty</span>
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto font-medium leading-relaxed">
            Register and validate client PPF applications. Enter the roll serial number and film variant below.
          </p>
        </motion.div>

        {/* Search Form */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-effect p-8 md:p-12 rounded-[2rem] border border-white/5 relative overflow-hidden mb-12 shadow-2xl"
        >
          {/* Animated Background Element */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent/20 blur-[100px] rounded-full" />
          
          <form onSubmit={checkWarranty} className="relative z-10 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Serial Number</label>
                <div className="relative group">
                  <FileText className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-accent transition-colors" size={20} />
                  <input 
                    type="text"
                    required
                    placeholder="e.g. 1000 1000 1000 1001"
                    value={serial}
                    onChange={(e) => setSerial(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 px-14 py-4 rounded-xl focus:outline-none focus:border-accent/50 focus:bg-white/10 transition-all font-bold tracking-wider placeholder:text-gray-700"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Product Type</label>
                <div className="relative group">
                  <BadgeCheck className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-accent transition-colors" size={20} />
                  <input 
                    type="text"
                    required
                    placeholder="e.g. Elite, Master Plus"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 px-14 py-4 rounded-xl focus:outline-none focus:border-accent/50 focus:bg-white/10 transition-all font-bold tracking-wider placeholder:text-gray-700"
                  />
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isChecking}
              className="w-full bg-accent text-black font-black uppercase tracking-[0.2em] py-5 rounded-xl flex items-center justify-center gap-3 shadow-[0_15px_30px_rgba(0,174,239,0.3)] hover:bg-white transition-all disabled:opacity-50 mt-4"
            >
              {isChecking ? (
                <>
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  Processing Record...
                </>
              ) : (
                <>
                  Submit & Validate
                  <ShieldCheck size={20} />
                </>
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* Results Section */}
        <AnimatePresence mode="wait">
          {result && result.status === 'valid' && (
            <motion.div
              key="valid"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="space-y-8"
            >
              {/* Premium Success Card */}
              <div className="bg-gradient-to-br from-[#00AEER]/10 via-black to-[#00AEER]/5 border border-accent/40 rounded-[2.5rem] p-10 md:p-16 relative overflow-hidden shadow-[0_0_80px_rgba(0,174,239,0.15)]">
                {/* Glowing Orbs */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 blur-[100px] rounded-full pointer-events-none" />
                
                <div className="absolute top-1/2 right-10 -translate-y-1/2 p-8 opacity-[0.03] pointer-events-none">
                  <ShieldCheck size={300} className="text-white" />
                </div>

                <div className="relative z-10 text-center md:text-left">
                  <div className="flex flex-col md:flex-row items-center gap-8 mb-12 border-b border-white/10 pb-10">
                    <div className="w-24 h-24 bg-accent rounded-[2rem] flex items-center justify-center text-black shadow-[0_0_60px_rgba(0,174,239,0.6)] rotate-3">
                      <CheckCircle2 size={48} strokeWidth={2.5} className="-rotate-3" />
                    </div>
                    <div>
                      <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter italic text-white mb-3">
                        PPF Warranty Number <br className="hidden md:block" />
                        <span className="text-accent drop-shadow-[0_0_15px_rgba(0,174,239,0.5)]">Valid & Authorized</span>
                      </h2>
                      <p className="text-gray-400 font-bold uppercase tracking-[0.3em] text-xs">Official Starkx Registration Verified</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-10">
                    <div className="space-y-8">
                      <div className="bg-black/40 backdrop-blur-md rounded-3xl p-8 border border-white/5 space-y-6">
                        <h4 className="text-xs font-black uppercase tracking-widest text-accent flex items-center gap-2 mb-2">
                           <Zap size={16} /> Authorized Application
                        </h4>
                        <p className="text-gray-300 leading-relaxed font-medium text-lg">
                          This serial number has been successfully authenticated against our global database. The installation performed by <strong>{user.studioName}</strong> is now fully registered and covered under the Starkx Global Warranty.
                        </p>
                      </div>

                      <div className="inline-flex items-center gap-4 px-8 py-5 bg-gradient-to-r from-accent/20 to-transparent rounded-2xl border border-accent/20">
                        <div className="bg-accent/20 p-3 rounded-xl text-accent">
                          <Calendar size={28} />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Total Coverage Period</p>
                          <p className="text-3xl font-black text-white italic">{result.years} YEARS</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-b from-white/5 to-transparent backdrop-blur-md rounded-3xl p-8 border border-white/10 space-y-6 flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-black uppercase tracking-widest text-white border-b border-white/10 pb-4 mb-6">Certificate Details</h4>
                        <div className="space-y-5">
                          <div className="flex justify-between items-center border-b border-white/5 pb-3">
                            <span className="text-[10px] font-black uppercase text-gray-500">Serial ID</span>
                            <span className="text-base font-black text-white tracking-widest bg-black/50 px-3 py-1 rounded-lg border border-white/5">{result.serial}</span>
                          </div>
                          <div className="flex justify-between items-center border-b border-white/5 pb-3">
                            <span className="text-[10px] font-black uppercase text-gray-500">Film Variant</span>
                            <span className="text-sm font-black text-accent uppercase tracking-widest">{result.type}</span>
                          </div>
                          <div className="flex justify-between items-center border-b border-white/5 pb-3">
                            <span className="text-[10px] font-black uppercase text-gray-500">Installer</span>
                            <span className="text-sm font-bold text-white uppercase tracking-tight">{user.studioName}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] font-black uppercase text-gray-500">Status</span>
                            <span className="text-[10px] font-black uppercase tracking-widest bg-green-500 text-black px-3 py-1.5 rounded-md shadow-[0_0_15px_rgba(34,197,94,0.4)]">Active Warranty</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-6 mt-4 border-t border-white/10 flex items-center justify-center">
                         {/* Fake QR code for premium aesthetic */}
                         <div className="w-full h-16 bg-[url('https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=STARKX-VERIFIED')] bg-center bg-no-repeat bg-contain opacity-40 grayscale invert mix-blend-screen" />
                      </div>
                    </div>
                  </div>

                  <p className="text-center text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 bg-white/5 py-3 rounded-xl border border-white/5">
                    Official Warranty Certificate • Starkx.Pro Manufacturing Corp
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {result && result.status === 'invalid' && (
            <motion.div
              key="invalid"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-500/10 border border-red-500/20 rounded-3xl p-10 text-center relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-red-500" />
              <div className="w-20 h-20 bg-red-500/20 border border-red-500/50 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500">
                <AlertCircle size={40} />
              </div>
              <h3 className="text-3xl font-black uppercase tracking-tight italic mb-4 text-white">Verification Failed</h3>
              <p className="text-gray-400 max-w-lg mx-auto font-medium text-lg">
                The serial number entered does not match our authorized roll database. Please double-check the code or contact Starkx Support.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default WarrantyStudioDashboard;
