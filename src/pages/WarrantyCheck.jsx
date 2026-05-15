import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Search, CheckCircle2, AlertCircle, Calendar, BadgeCheck, Zap } from 'lucide-react';
import sequence from '../data/sequence.json';

const WarrantyCheck = () => {
  const [serial, setSerial] = useState('');
  const [type, setType] = useState('');
  const [result, setResult] = useState(null);
  const [isChecking, setIsChecking] = useState(false);

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

  return (
    <div className="pt-28 min-h-screen bg-black text-white pb-32 selection:bg-accent selection:text-black grainy-bg">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 px-4 py-2 rounded-full mb-6">
            <Zap size={14} className="text-accent" />
            <span className="text-[10px] font-black uppercase tracking-widest text-accent">Authentication Portal</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic mb-6">
            Warranty <span className="text-accent underline decoration-4 underline-offset-8">Verify</span>
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto font-medium leading-relaxed">
            Enter your unique product credentials below to verify authenticity and activate your global protection coverage.
          </p>
        </motion.div>

        {/* Search Form */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-effect p-8 md:p-12 rounded-[2rem] border border-white/5 relative overflow-hidden mb-12"
        >
          {/* Animated Background Element */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent/20 blur-[100px] rounded-full" />
          
          <form onSubmit={checkWarranty} className="relative z-10 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Serial Number</label>
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-accent transition-colors" size={20} />
                  <input 
                    type="text"
                    required
                    placeholder="e.g. 1000 1000 1000 1001"
                    value={serial}
                    onChange={(e) => setSerial(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 px-12 py-4 rounded-xl focus:outline-none focus:border-accent/50 focus:bg-white/10 transition-all font-bold tracking-wider placeholder:text-gray-700"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Product Type</label>
                <div className="relative group">
                  <BadgeCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-accent transition-colors" size={20} />
                  <input 
                    type="text"
                    required
                    placeholder="e.g. Elite, Master Plus"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 px-12 py-4 rounded-xl focus:outline-none focus:border-accent/50 focus:bg-white/10 transition-all font-bold tracking-wider placeholder:text-gray-700"
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
                  Securing Connection...
                </>
              ) : (
                <>
                  Verify Authenticity
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
              {/* Success Card */}
              <div className="bg-gradient-to-br from-accent/20 to-transparent border border-accent/30 rounded-[2.5rem] p-10 md:p-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <ShieldCheck size={200} className="text-accent" />
                </div>

                <div className="relative z-10 text-center md:text-left">
                  <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
                    <div className="w-20 h-20 bg-accent rounded-3xl flex items-center justify-center text-black shadow-[0_0_50px_rgba(0,174,239,0.5)]">
                      <CheckCircle2 size={40} strokeWidth={3} />
                    </div>
                    <div>
                      <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight italic text-white mb-2">Authenticity Verified</h2>
                      <p className="text-accent font-black uppercase tracking-[0.3em] text-xs">Starkx Premium Protection</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                    <div className="space-y-6">
                      <p className="text-gray-300 leading-relaxed font-medium text-lg">
                        "Your Starkx protective film is officially verified. This certificate confirms that your vehicle is shielded by our genuine, top-tier automotive protection technology. Engineered for extreme durability and mirror-like clarity, this warranty guarantees that your investment is protected against yellowing, cracking, and manufacturing defects. You are now part of the Elite Starkx community, where quality meets eternity."
                      </p>
                      <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 rounded-2xl border border-white/10">
                        <Calendar className="text-accent" size={24} />
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Coverage Duration</p>
                          <p className="text-2xl font-black text-white italic">{result.years} YEARS</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-black/40 backdrop-blur-md rounded-3xl p-8 border border-white/5 space-y-6">
                      <h4 className="text-sm font-black uppercase tracking-widest text-gray-400 border-b border-white/5 pb-4">Certificate Details</h4>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-[10px] font-black uppercase text-gray-500">Serial ID</span>
                          <span className="text-sm font-bold text-white tracking-widest">{result.serial}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[10px] font-black uppercase text-gray-500">Tier</span>
                          <span className="text-sm font-bold text-accent uppercase tracking-widest">{result.type}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[10px] font-black uppercase text-gray-500">Status</span>
                          <span className="text-[10px] font-black uppercase bg-green-500 text-black px-2 py-1 rounded">Active</span>
                        </div>
                      </div>
                      <div className="pt-4 border-t border-white/5 flex items-center justify-center">
                         <div className="w-full h-12 bg-[url('https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=STARKX-VERIFIED')] bg-center bg-no-repeat bg-contain opacity-50 grayscale invert" />
                      </div>
                    </div>
                  </div>

                  <p className="text-center text-[9px] font-black uppercase tracking-[0.4em] text-gray-600">
                    Officially Licensed & Certified by Starkx.Pro Manufacturing Corp
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
              className="bg-red-500/10 border border-red-500/20 rounded-3xl p-10 text-center"
            >
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6 text-black shadow-[0_0_40px_rgba(239,68,68,0.3)]">
                <AlertCircle size={32} />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight italic mb-4">Verification Failed</h3>
              <p className="text-gray-400 max-w-md mx-auto font-medium">
                The serial number entered does not match our official records. Please double-check the number on your warranty card or contact your certified installer.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Disclaimer */}
        <p className="mt-20 text-center text-[10px] font-bold uppercase tracking-widest text-gray-600 opacity-50 max-w-2xl mx-auto leading-loose">
          STARKX.PRO MANUFACTURING CORP RESERVES THE RIGHT TO INSPECT ANY CLAIM PHYSICALLY OR DIGITALLY BEFORE APPROVAL. WARRANTY COVERS MATERIAL DEFECTS ONLY. VOID IF INSTALLED BY NON-CERTIFIED PERSONNEL.
        </p>
      </div>
    </div>
  );
};

export default WarrantyCheck;
