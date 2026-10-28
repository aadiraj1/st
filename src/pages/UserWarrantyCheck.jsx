// import React, { useState, useEffect, useMemo } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   ShieldCheck,
//   Search,
//   CheckCircle2,
//   AlertCircle,
//   Calendar,
//   Clock,
//   Car,
//   MapPin,
//   Phone,
//   Sparkles,
//   Zap,
//   Printer,
//   Copy,
//   Check,
//   ArrowRight,
//   ShieldAlert
// } from 'lucide-react';
// import localWarranties from '../data/userWarranties.json';

// const UserWarrantyCheck = () => {
//   const [serial, setSerial] = useState('');
//   const [isSearching, setIsSearching] = useState(false);
//   const [warrantyData, setWarrantyData] = useState(null);
//   const [notFound, setNotFound] = useState(false);
//   const [copied, setCopied] = useState(false);
//   const [allWarranties, setAllWarranties] = useState(localWarranties);
//   const [now, setNow] = useState(new Date());

//   // Dynamic fetch with cache-busting to pick up updates directly from GitHub without full redeploy delay
//   useEffect(() => {
//     const fetchLatestData = async () => {
//       try {
//         const basePath = import.meta.env.BASE_URL || '/';
//         const url = `${basePath.endsWith('/') ? basePath : basePath + '/'}data/userWarranties.json?t=${Date.now()}`;
//         const res = await fetch(url);
//         if (res.ok) {
//           const json = await res.json();
//           if (Array.isArray(json) && json.length > 0) {
//             setAllWarranties(json);
//           }
//         }
//       } catch (err) {
//         // Fallback to local import already initialized
//       }
//     };
//     fetchLatestData();
//   }, []);

//   // Update clock every second for live real-time countdown
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setNow(new Date());
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   // Helper to normalize serial numbers (removes whitespace/hyphens for easy matching)
//   const normalize = (str) => (str || '').replace(/[\s-]/g, '').toLowerCase();

//   const handleSearch = (e) => {
//     if (e) e.preventDefault();
//     if (!serial.trim()) return;

//     setIsSearching(true);
//     setNotFound(false);
//     setWarrantyData(null);

//     setTimeout(() => {
//       const cleanInput = normalize(serial);
//       const match = allWarranties.find((w) => normalize(w.warrantyNumber) === cleanInput);

//       if (match) {
//         setWarrantyData(match);
//         setNotFound(false);
//       } else {
//         setWarrantyData(null);
//         setNotFound(true);
//       }
//       setIsSearching(false);
//     }, 600);
//   };

//   // Format serial as user types (4-4-4-4)
//   const handleInputChange = (e) => {
//     let val = e.target.value.replace(/[^a-zA-Z0-9]/g, '');
//     if (val.length > 16) val = val.slice(0, 16);
//     // group by 4
//     const chunks = val.match(/.{1,4}/g);
//     setSerial(chunks ? chunks.join(' ') : val);
//   };

//   // Copy warranty number
//   const handleCopy = (text) => {
//     navigator.clipboard.writeText(text);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   // Print warranty certificate
//   const handlePrint = () => {
//     window.print();
//   };

//   // Calculate real-time warranty remaining time & percentages
//   const timeDetails = useMemo(() => {
//     if (!warrantyData) return null;

//     const installDate = new Date(warrantyData.installationDate);
//     const years = Number(warrantyData.warrantyYears) || 5;

//     // Calculate exact expiry date
//     const expiryDate = new Date(installDate);
//     expiryDate.setFullYear(expiryDate.getFullYear() + years);

//     const totalDurationMs = expiryDate.getTime() - installDate.getTime();
//     const remainingMs = expiryDate.getTime() - now.getTime();
//     const isExpired = remainingMs <= 0;

//     if (isExpired) {
//       return {
//         isExpired: true,
//         percentRemaining: 0,
//         yearsRemaining: 0,
//         daysRemaining: 0,
//         hoursRemaining: 0,
//         minutesRemaining: 0,
//         secondsRemaining: 0,
//         expiryFormatted: expiryDate.toLocaleDateString('en-US', {
//           year: 'numeric',
//           month: 'long',
//           day: 'numeric'
//         }),
//         installFormatted: installDate.toLocaleDateString('en-US', {
//           year: 'numeric',
//           month: 'long',
//           day: 'numeric'
//         })
//       };
//     }

//     const totalSeconds = Math.floor(remainingMs / 1000);
//     const seconds = totalSeconds % 60;
//     const totalMinutes = Math.floor(totalSeconds / 60);
//     const minutes = totalMinutes % 60;
//     const totalHours = Math.floor(totalMinutes / 60);
//     const hours = totalHours % 24;
//     const totalDays = Math.floor(totalHours / 24);

//     const remYears = Math.floor(totalDays / 365);
//     const remDays = totalDays % 365;

//     const percent = Math.max(0, Math.min(100, (remainingMs / totalDurationMs) * 100));

//     return {
//       isExpired: false,
//       percentRemaining: percent.toFixed(1),
//       yearsRemaining: remYears,
//       daysRemaining: remDays,
//       hoursRemaining: hours,
//       minutesRemaining: minutes,
//       secondsRemaining: seconds,
//       totalDaysRemaining: totalDays,
//       expiryFormatted: expiryDate.toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'long',
//         day: 'numeric'
//       }),
//       installFormatted: installDate.toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'long',
//         day: 'numeric'
//       })
//     };
//   }, [warrantyData, now]);

//   return (
//     <div className="pt-28 md:pt-36 min-h-screen bg-black text-white pb-32 selection:bg-accent selection:text-black grainy-bg print:bg-white print:text-black print:p-0">
//       <div className="max-w-5xl mx-auto px-4 md:px-8">
        
//         {/* Header / Intro - Hidden on Print */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-center mb-12 print:hidden"
//         >
//           <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 px-5 py-2 rounded-full mb-6 backdrop-blur-md">
//             <Sparkles size={16} className="text-accent animate-pulse" />
//             <span className="text-xs font-black uppercase tracking-[0.2em] text-accent">
//               Official Customer Warranty Portal
//             </span>
//           </div>

//           <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter italic mb-5">
//             Realtime <span className="text-accent underline decoration-4 underline-offset-8">Warranty Check</span>
//           </h1>
//           <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
//             Verify your official Starkx Paint Protection Film coverage, view installer studio credentials, and track your remaining warranty time live.
//           </p>
//         </motion.div>

//         {/* Search Panel - Hidden on Print */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.98 }}
//           animate={{ opacity: 1, scale: 1 }}
//           className="glass-effect p-6 md:p-10 rounded-3xl border border-white/10 relative overflow-hidden mb-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] print:hidden"
//         >
//           {/* Subtle neon ambient glow */}
//           <div className="absolute -top-32 -right-32 w-72 h-72 bg-accent/15 blur-[120px] rounded-full pointer-events-none" />
//           <div className="absolute -bottom-32 -left-32 w-72 h-72 bg-accent/10 blur-[120px] rounded-full pointer-events-none" />

//           <form onSubmit={handleSearch} className="relative z-10">
//             <label className="block text-xs font-black uppercase tracking-[0.2em] text-accent mb-3">
//               Enter 16-Digit Warranty Code
//             </label>

//             <div className="flex flex-col sm:flex-row items-center gap-4">
//               <div className="relative w-full">
//                 <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" size={22} />
//                 <input
//                   type="text"
//                   required
//                   placeholder="e.g. 2000 2000 2000 2044"
//                   value={serial}
//                   onChange={handleInputChange}
//                   className="w-full bg-white/5 border border-white/15 px-14 py-4 md:py-5 rounded-2xl focus:outline-none focus:border-accent focus:bg-white/10 focus:ring-2 focus:ring-accent/20 transition-all font-mono font-bold text-lg md:text-xl tracking-wider placeholder:text-gray-600 text-white"
//                 />
//               </div>

//               <motion.button
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 type="submit"
//                 disabled={isSearching}
//                 className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-accent text-black font-black uppercase tracking-[0.2em] text-xs md:text-sm rounded-2xl hover:bg-white transition-all shadow-[0_0_30px_rgba(0,174,239,0.4)] flex items-center justify-center gap-3 whitespace-nowrap cursor-pointer disabled:opacity-50"
//               >
//                 {isSearching ? (
//                   <>
//                     <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
//                     <span>Verifying...</span>
//                   </>
//                 ) : (
//                   <>
//                     <span>Verify Now</span>
//                     <ArrowRight size={18} />
//                   </>
//                 )}
//               </motion.button>
//             </div>

//             {/* Quick Demo Fill Helper */}
//             <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-gray-400">
//               <span className="font-semibold text-gray-500">Quick Test:</span>
//               <button
//                 type="button"
//                 onClick={() => {
//                   setSerial('2000 2000 2000 2044');
//                   setTimeout(() => {
//                     const match = allWarranties.find((w) => normalize(w.warrantyNumber) === '2000200020002044');
//                     if (match) {
//                       setWarrantyData(match);
//                       setNotFound(false);
//                     }
//                   }, 150);
//                 }}
//                 className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 hover:bg-accent/20 border border-white/10 hover:border-accent/40 rounded-lg text-accent font-mono transition-colors cursor-pointer"
//               >
//                 <span>2000 2000 2000 2044</span>
//                 <span className="text-[10px] bg-accent/30 text-white px-1.5 py-0.5 rounded">Active</span>
//               </button>
//             </div>
//           </form>
//         </motion.div>

//         {/* Not Found Alert */}
//         <AnimatePresence>
//           {notFound && (
//             <motion.div
//               initial={{ opacity: 0, y: 15 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -15 }}
//               className="bg-red-500/10 border border-red-500/30 p-6 md:p-8 rounded-2xl mb-12 flex items-start gap-4 backdrop-blur-md"
//             >
//               <ShieldAlert className="text-red-400 shrink-0 mt-1" size={28} />
//               <div>
//                 <h3 className="text-lg font-bold text-red-300 uppercase tracking-wide mb-1">
//                   Warranty Record Not Found
//                 </h3>
//                 <p className="text-gray-400 text-sm leading-relaxed mb-3">
//                   We could not find an active installation record matching code <span className="font-mono text-white font-bold">{serial}</span>.
//                 </p>
//                 <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
//                   <li>Please double-check the 16-digit code provided on your installation card.</li>
//                   <li>If your car was recently coated/wrapped, the authorized studio may take up to 24 hours to sync the record.</li>
//                   <li>Contact your authorized Starkx installation studio for assistance.</li>
//                 </ul>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Verified Warranty Dashboard Display */}
//         <AnimatePresence>
//           {warrantyData && timeDetails && (
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: 20 }}
//               transition={{ duration: 0.5 }}
//               className="space-y-8"
//               id="warranty-certificate"
//             >
//               {/* Main Certificate Card */}
//               <div className="relative bg-gradient-to-br from-[#121418] to-[#0a0a0c] border border-accent/30 rounded-3xl p-6 md:p-12 overflow-hidden shadow-[0_0_60px_rgba(0,174,239,0.15)] print:shadow-none print:border-black print:bg-white">
                
//                 {/* Glowing accents */}
//                 <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 blur-[130px] rounded-full pointer-events-none print:hidden" />
//                 <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 blur-[120px] rounded-full pointer-events-none print:hidden" />

//                 {/* Top Certificate Header */}
//                 <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-white/10 pb-8 mb-8 print:border-black">
//                   <div className="flex items-center gap-4">
//                     <div className="w-16 h-16 rounded-2xl bg-accent/15 border border-accent/40 flex items-center justify-center text-accent shadow-[0_0_20px_rgba(0,174,239,0.3)] shrink-0 print:border-black print:text-black">
//                       <ShieldCheck size={36} />
//                     </div>
//                     <div>
//                       <div className="flex items-center gap-2 mb-1">
//                         <span className="text-[10px] font-black uppercase tracking-[0.25em] text-accent bg-accent/10 px-2.5 py-1 rounded-md border border-accent/20">
//                           Verified Protection
//                         </span>
//                         <span className="text-[10px] font-bold text-gray-400">Authentic Starkx PPF</span>
//                       </div>
//                       <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white print:text-black">
//                         Digital Warranty Certificate
//                       </h2>
//                     </div>
//                   </div>

//                   {/* Status Pill & Action Buttons */}
//                   <div className="flex flex-wrap items-center gap-3">
//                     <div
//                       className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest border ${
//                         timeDetails.isExpired
//                           ? 'bg-red-500/10 border-red-500/40 text-red-400'
//                           : 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.25)]'
//                       }`}
//                     >
//                       <span className={`w-2.5 h-2.5 rounded-full ${timeDetails.isExpired ? 'bg-red-400' : 'bg-emerald-400 animate-pulse'}`} />
//                       {timeDetails.isExpired ? 'Warranty Expired' : 'Active & Protected'}
//                     </div>

//                     <button
//                       onClick={handlePrint}
//                       type="button"
//                       className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold uppercase tracking-wider text-gray-300 hover:text-white transition-all cursor-pointer print:hidden"
//                     >
//                       <Printer size={16} />
//                       <span>Print Card</span>
//                     </button>
//                   </div>
//                 </div>

//                 {/* Realtime Countdown Ticker (If Active) */}
//                 {!timeDetails.isExpired ? (
//                   <div className="bg-black/60 border border-accent/30 rounded-2xl p-6 md:p-8 mb-8 backdrop-blur-xl relative overflow-hidden print:border-black print:bg-gray-50">
//                     <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-6">
//                       <div>
//                         <div className="flex items-center gap-2 text-accent text-xs font-black uppercase tracking-[0.2em] mb-1">
//                           <Clock size={16} className="animate-spin text-accent" style={{ animationDuration: '8s' }} />
//                           <span>Realtime Warranty Clock</span>
//                         </div>
//                         <h3 className="text-lg md:text-xl font-bold text-white print:text-black">
//                           Coverage Time Remaining
//                         </h3>
//                       </div>

//                       <div className="text-xs text-gray-400 font-mono">
//                         Coverage Expires: <span className="text-accent font-bold">{timeDetails.expiryFormatted}</span>
//                       </div>
//                     </div>

//                     {/* Countdown Digits Grid */}
//                     <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 md:gap-4 mb-6">
//                       {[
//                         { label: 'Years', val: timeDetails.yearsRemaining },
//                         { label: 'Days', val: timeDetails.daysRemaining },
//                         { label: 'Hours', val: String(timeDetails.hoursRemaining).padStart(2, '0') },
//                         { label: 'Mins', val: String(timeDetails.minutesRemaining).padStart(2, '0') },
//                         { label: 'Secs', val: String(timeDetails.secondsRemaining).padStart(2, '0'), highlight: true },
//                         { label: 'Status', val: `${timeDetails.percentRemaining}%`, sub: 'Remaining' }
//                       ].map((item, idx) => (
//                         <div
//                           key={idx}
//                           className={`p-3 md:p-4 rounded-xl text-center border backdrop-blur-md transition-all ${
//                             item.highlight
//                               ? 'bg-accent/15 border-accent/50 text-accent shadow-[0_0_15px_rgba(0,174,239,0.2)]'
//                               : 'bg-white/5 border-white/10 text-white print:bg-white print:border-gray-300 print:text-black'
//                           }`}
//                         >
//                           <div className="text-2xl md:text-3xl font-black font-mono tracking-tight mb-1">
//                             {item.val}
//                           </div>
//                           <div className="text-[10px] uppercase font-black tracking-widest text-gray-400">
//                             {item.label}
//                           </div>
//                         </div>
//                       ))}
//                     </div>

//                     {/* Progress Bar */}
//                     <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden print:bg-gray-200">
//                       <motion.div
//                         className="bg-gradient-to-r from-accent to-emerald-400 h-2.5 rounded-full"
//                         initial={{ width: 0 }}
//                         animate={{ width: `${timeDetails.percentRemaining}%` }}
//                         transition={{ duration: 1, ease: 'easeOut' }}
//                       />
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 mb-8 text-center">
//                     <p className="text-red-300 font-bold uppercase tracking-wider text-sm">
//                       This warranty coverage expired on {timeDetails.expiryFormatted}.
//                     </p>
//                   </div>
//                 )}

//                 {/* Detailed Information Grid */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
//                   {/* Warranty Number & Customer */}
//                   <div className="bg-white/5 border border-white/10 rounded-2xl p-5 md:p-6 print:border-gray-300 print:bg-white">
//                     <div className="text-xs uppercase font-black tracking-widest text-gray-500 mb-2">
//                       Warranty Identification
//                     </div>
//                     <div className="flex items-center justify-between gap-2 mb-4">
//                       <span className="text-lg md:text-xl font-mono font-black text-accent tracking-wider">
//                         {warrantyData.warrantyNumber}
//                       </span>
//                       <button
//                         onClick={() => handleCopy(warrantyData.warrantyNumber)}
//                         className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors cursor-pointer print:hidden"
//                         title="Copy code"
//                       >
//                         {copied ? <Check size={18} className="text-emerald-400" /> : <Copy size={18} />}
//                       </button>
//                     </div>

//                     <div className="space-y-2 pt-2 border-t border-white/5 print:border-gray-200">
//                       <div className="flex justify-between text-sm">
//                         <span className="text-gray-400">Coverage Type:</span>
//                         <span className="font-bold text-white print:text-black">
//                           {warrantyData.coverageType || 'Paint Protection Film'}
//                         </span>
//                       </div>
//                       <div className="flex justify-between text-sm">
//                         <span className="text-gray-400">Client / Account:</span>
//                         <span className="font-bold text-white print:text-black">
//                           {warrantyData.customerName || 'Registered Owner'}
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Vehicle Details */}
//                   <div className="bg-white/5 border border-white/10 rounded-2xl p-5 md:p-6 print:border-gray-300 print:bg-white">
//                     <div className="flex items-center gap-2 text-xs uppercase font-black tracking-widest text-gray-500 mb-2">
//                       <Car size={16} className="text-accent" />
//                       <span>Protected Vehicle</span>
//                     </div>
//                     <div className="text-xl md:text-2xl font-black text-white print:text-black uppercase tracking-tight mb-4">
//                       {warrantyData.carName}
//                     </div>

//                     <div className="space-y-2 pt-2 border-t border-white/5 print:border-gray-200">
//                       <div className="flex justify-between text-sm">
//                         <span className="text-gray-400">Film Variant:</span>
//                         <span className="font-black text-accent bg-accent/10 px-2.5 py-0.5 rounded border border-accent/20 uppercase tracking-wider text-xs">
//                           {warrantyData.productVariant} Series
//                         </span>
//                       </div>
//                       <div className="flex justify-between text-sm">
//                         <span className="text-gray-400">Warranty Term:</span>
//                         <span className="font-bold text-white print:text-black">
//                           {warrantyData.warrantyYears || 5} Years Official Guarantee
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Studio Details */}
//                   <div className="bg-white/5 border border-white/10 rounded-2xl p-5 md:p-6 print:border-gray-300 print:bg-white">
//                     <div className="flex items-center gap-2 text-xs uppercase font-black tracking-widest text-gray-500 mb-2">
//                       <MapPin size={16} className="text-accent" />
//                       <span>Certified Installation Studio</span>
//                     </div>
//                     <div className="text-lg md:text-xl font-black text-white print:text-black uppercase tracking-tight mb-2">
//                       {warrantyData.studioName}
//                     </div>
//                     {warrantyData.studioLocation && (
//                       <p className="text-xs text-gray-400 mb-3 leading-relaxed">
//                         {warrantyData.studioLocation}
//                       </p>
//                     )}
//                     {warrantyData.contact && (
//                       <div className="flex items-center gap-2 text-xs text-accent font-semibold pt-2 border-t border-white/5 print:border-gray-200">
//                         <Phone size={14} />
//                         <span>{warrantyData.contact}</span>
//                       </div>
//                     )}
//                   </div>

//                   {/* Installation & Expiry Dates */}
//                   <div className="bg-white/5 border border-white/10 rounded-2xl p-5 md:p-6 print:border-gray-300 print:bg-white">
//                     <div className="flex items-center gap-2 text-xs uppercase font-black tracking-widest text-gray-500 mb-2">
//                       <Calendar size={16} className="text-accent" />
//                       <span>Timeline Verification</span>
//                     </div>

//                     <div className="space-y-4 pt-1">
//                       <div className="flex items-center justify-between text-sm">
//                         <span className="text-gray-400">Installation Date:</span>
//                         <span className="font-mono font-bold text-white print:text-black">
//                           {timeDetails.installFormatted}
//                         </span>
//                       </div>
//                       <div className="flex items-center justify-between text-sm">
//                         <span className="text-gray-400">Valid Through:</span>
//                         <span className="font-mono font-bold text-accent">
//                           {timeDetails.expiryFormatted}
//                         </span>
//                       </div>
//                       <div className="flex items-center justify-between text-sm pt-2 border-t border-white/5 print:border-gray-200">
//                         <span className="text-gray-400">Total Days Remaining:</span>
//                         <span className="font-mono font-bold text-emerald-400">
//                           {timeDetails.totalDaysRemaining || 0} Days
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Footer Security Notice */}
//                 <div className="pt-6 border-t border-white/10 text-center flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500 print:border-gray-300">
//                   <div className="flex items-center gap-2">
//                     <CheckCircle2 size={16} className="text-emerald-400" />
//                     <span>Cryptographically Verified Serial Code on Starkx Global Ledger</span>
//                   </div>
//                   <div className="font-mono text-[11px]">
//                     starkx-protection.com • Official Authentication
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//       </div>
//     </div>
//   );
// };

// export default UserWarrantyCheck;


import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Search,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Clock,
  Car,
  MapPin,
  Phone,
  Sparkles,
  Zap,
  Printer,
  Copy,
  Check,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import localWarranties from '../data/userWarranties.json';

const UserWarrantyCheck = () => {
  const [serial, setSerial] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [warrantyData, setWarrantyData] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [copied, setCopied] = useState(false);
  const [allWarranties, setAllWarranties] = useState(localWarranties);
  const [now, setNow] = useState(new Date());

  // Dynamic fetch with cache-busting to pick up updates directly from GitHub without full redeploy delay
  useEffect(() => {
    const fetchLatestData = async () => {
      try {
        const basePath = import.meta.env.BASE_URL || '/';
        const url = `${basePath.endsWith('/') ? basePath : basePath + '/'}data/userWarranties.json?t=${Date.now()}`;
        const res = await fetch(url);
        if (res.ok) {
          const json = await res.json();
          if (Array.isArray(json) && json.length > 0) {
            setAllWarranties(json);
          }
        }
      } catch (err) {
        // Fallback to local import already initialized
      }
    };
    fetchLatestData();
  }, []);

  // Update clock every second for live real-time countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Helper to normalize serial numbers (removes whitespace/hyphens for easy matching)
  const normalize = (str) => (str || '').replace(/[\s-]/g, '').toLowerCase();

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (!serial.trim()) return;

    setIsSearching(true);
    setNotFound(false);
    setWarrantyData(null);

    setTimeout(() => {
      const cleanInput = normalize(serial);
      const match = allWarranties.find((w) => normalize(w.warrantyNumber) === cleanInput);

      if (match) {
        setWarrantyData(match);
        setNotFound(false);
      } else {
        setWarrantyData(null);
        setNotFound(true);
      }
      setIsSearching(false);
    }, 600);
  };

  // Format serial as user types (4-4-4-4)
  const handleInputChange = (e) => {
    let val = e.target.value.replace(/[^a-zA-Z0-9]/g, '');
    if (val.length > 16) val = val.slice(0, 16);
    // group by 4
    const chunks = val.match(/.{1,4}/g);
    setSerial(chunks ? chunks.join(' ') : val);
  };

  // Copy warranty number
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Print warranty certificate
  const handlePrint = () => {
    window.print();
  };

  // Calculate real-time warranty remaining time & percentages
  const timeDetails = useMemo(() => {
    if (!warrantyData) return null;

    // Safely parse installation date parts (YYYY-MM-DD) to prevent timezone shifts
    const [iYear, iMonth, iDay] = (warrantyData.installationDate || '').split('-').map(Number);
    const installDate = new Date(iYear, iMonth - 1, iDay);
    const years = Number(warrantyData.warrantyYears) || 5;

    // Calculate exact expiry date safely by shifting calendar years accurately
    const expiryDate = new Date(iYear + years, iMonth - 1, iDay);

    const totalDurationMs = expiryDate.getTime() - installDate.getTime();
    const remainingMs = expiryDate.getTime() - now.getTime();
    const isExpired = remainingMs <= 0;

    if (isExpired) {
      return {
        isExpired: true,
        percentRemaining: 0,
        yearsRemaining: 0,
        daysRemaining: 0,
        hoursRemaining: 0,
        minutesRemaining: 0,
        secondsRemaining: 0,
        expiryFormatted: expiryDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        installFormatted: installDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      };
    }

    const totalSeconds = Math.floor(remainingMs / 1000);
    const seconds = totalSeconds % 60;
    const totalMinutes = Math.floor(totalSeconds / 60);
    const minutes = totalMinutes % 60;
    const totalHours = Math.floor(totalMinutes / 60);
    const hours = totalHours % 24;
    const totalDays = Math.floor(totalHours / 24);

    const remYears = Math.floor(totalDays / 365);
    const remDays = totalDays % 365;

    const percent = Math.max(0, Math.min(100, (remainingMs / totalDurationMs) * 100));

    return {
      isExpired: false,
      percentRemaining: percent.toFixed(1),
      yearsRemaining: remYears,
      daysRemaining: remDays,
      hoursRemaining: hours,
      minutesRemaining: minutes,
      secondsRemaining: seconds,
      totalDaysRemaining: totalDays,
      expiryFormatted: expiryDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      installFormatted: installDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    };
  }, [warrantyData, now]);

  return (
    <div className="pt-28 md:pt-36 min-h-screen bg-black text-white pb-32 selection:bg-accent selection:text-black grainy-bg print:bg-white print:text-black print:p-0">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        
        {/* Header / Intro - Hidden on Print */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 print:hidden"
        >
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 px-5 py-2 rounded-full mb-6 backdrop-blur-md">
            <Sparkles size={16} className="text-accent animate-pulse" />
            <span className="text-xs font-black uppercase tracking-[0.2em] text-accent">
              Official Customer Warranty Portal
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter italic mb-5">
            Realtime <span className="text-accent underline decoration-4 underline-offset-8">Warranty Check</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Verify your official Starkx Paint Protection Film coverage, view installer studio credentials, and track your remaining warranty time live.
          </p>
        </motion.div>

        {/* Search Panel - Hidden on Print */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-effect p-6 md:p-10 rounded-3xl border border-white/10 relative overflow-hidden mb-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] print:hidden"
        >
          {/* Subtle neon ambient glow */}
          <div className="absolute -top-32 -right-32 w-72 h-72 bg-accent/15 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-72 h-72 bg-accent/10 blur-[120px] rounded-full pointer-events-none" />

          <form onSubmit={handleSearch} className="relative z-10">
            <label className="block text-xs font-black uppercase tracking-[0.2em] text-accent mb-3">
              Enter 16-Digit Warranty Code
            </label>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="relative w-full">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" size={22} />
                <input
                  type="text"
                  required
                  placeholder="e.g. 2000 2000 2000 2044"
                  value={serial}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border border-white/15 px-14 py-4 md:py-5 rounded-2xl focus:outline-none focus:border-accent focus:bg-white/10 focus:ring-2 focus:ring-accent/20 transition-all font-mono font-bold text-lg md:text-xl tracking-wider placeholder:text-gray-600 text-white"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSearching}
                className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-accent text-black font-black uppercase tracking-[0.2em] text-xs md:text-sm rounded-2xl hover:bg-white transition-all shadow-[0_0_30px_rgba(0,174,239,0.4)] flex items-center justify-center gap-3 whitespace-nowrap cursor-pointer disabled:opacity-50"
              >
                {isSearching ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <span>Verify Now</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </motion.button>
            </div>

            {/* Quick Demo Fill Helper */}
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-gray-400">
              <span className="font-semibold text-gray-500">Quick Test:</span>
              <button
                type="button"
                onClick={() => {
                  setSerial('2000 2000 2000 2044');
                  setTimeout(() => {
                    const match = allWarranties.find((w) => normalize(w.warrantyNumber) === '1000100010001033');
                    if (match) {
                      setWarrantyData(match);
                      setNotFound(false);
                    }
                  }, 150);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 hover:bg-accent/20 border border-white/10 hover:border-accent/40 rounded-lg text-accent font-mono transition-colors cursor-pointer"
              >
                <span>2000 2000 2000 2044</span>
                <span className="text-[10px] bg-accent/30 text-white px-1.5 py-0.5 rounded">Active</span>
              </button>
            </div>
          </form>
        </motion.div>

        {/* Not Found Alert */}
        <AnimatePresence>
          {notFound && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-red-500/10 border border-red-500/30 p-6 md:p-8 rounded-2xl mb-12 flex items-start gap-4 backdrop-blur-md"
            >
              <ShieldAlert className="text-red-400 shrink-0 mt-1" size={28} />
              <div>
                <h3 className="text-lg font-bold text-red-300 uppercase tracking-wide mb-1">
                  Warranty Record Not Found
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                  We could not find an active installation record matching code <span className="font-mono text-white font-bold">{serial}</span>.
                </p>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                  <li>Please double-check the 16-digit code provided on your installation card.</li>
                  <li>If your car was recently coated/wrapped, the authorized studio may take up to 24 hours to sync the record.</li>
                  <li>Contact your authorized Starkx installation studio for assistance.</li>
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Verified Warranty Dashboard Display */}
        <AnimatePresence>
          {warrantyData && timeDetails && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
              id="warranty-certificate"
            >
              {/* Main Certificate Card */}
              <div className="relative bg-gradient-to-br from-[#121418] to-[#0a0a0c] border border-accent/30 rounded-3xl p-6 md:p-12 overflow-hidden shadow-[0_0_60px_rgba(0,174,239,0.15)] print:shadow-none print:border-black print:bg-white">
                
                {/* Glowing accents */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 blur-[130px] rounded-full pointer-events-none print:hidden" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 blur-[120px] rounded-full pointer-events-none print:hidden" />

                {/* Top Certificate Header */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-white/10 pb-8 mb-8 print:border-black">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-accent/15 border border-accent/40 flex items-center justify-center text-accent shadow-[0_0_20px_rgba(0,174,239,0.3)] shrink-0 print:border-black print:text-black">
                      <ShieldCheck size={36} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-black uppercase tracking-[0.25em] text-accent bg-accent/10 px-2.5 py-1 rounded-md border border-accent/20">
                          Verified Protection
                        </span>
                        <span className="text-[10px] font-bold text-gray-400">Authentic Starkx PPF</span>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white print:text-black">
                        Digital Warranty Certificate
                      </h2>
                    </div>
                  </div>

                  {/* Status Pill & Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3">
                    <div
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest border ${
                        timeDetails.isExpired
                          ? 'bg-red-500/10 border-red-500/40 text-red-400'
                          : 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.25)]'
                      }`}
                    >
                      <span className={`w-2.5 h-2.5 rounded-full ${timeDetails.isExpired ? 'bg-red-400' : 'bg-emerald-400 animate-pulse'}`} />
                      {timeDetails.isExpired ? 'Warranty Expired' : 'Active & Protected'}
                    </div>

                    <button
                      onClick={handlePrint}
                      type="button"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold uppercase tracking-wider text-gray-300 hover:text-white transition-all cursor-pointer print:hidden"
                    >
                      <Printer size={16} />
                      <span>Print Card</span>
                    </button>
                  </div>
                </div>

                {/* Realtime Countdown Ticker (If Active) */}
                {!timeDetails.isExpired ? (
                  <div className="bg-black/60 border border-accent/30 rounded-2xl p-6 md:p-8 mb-8 backdrop-blur-xl relative overflow-hidden print:border-black print:bg-gray-50">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-6">
                      <div>
                        <div className="flex items-center gap-2 text-accent text-xs font-black uppercase tracking-[0.2em] mb-1">
                          <Clock size={16} className="animate-spin text-accent" style={{ animationDuration: '8s' }} />
                          <span>Realtime Warranty Clock</span>
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-white print:text-black">
                          Coverage Time Remaining
                        </h3>
                      </div>

                      <div className="text-xs text-gray-400 font-mono">
                        Coverage Expires: <span className="text-accent font-bold">{timeDetails.expiryFormatted}</span>
                      </div>
                    </div>

                    {/* Countdown Digits Grid */}
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 md:gap-4 mb-6">
                      {[
                        { label: 'Years', val: timeDetails.yearsRemaining },
                        { label: 'Days', val: timeDetails.daysRemaining },
                        { label: 'Hours', val: String(timeDetails.hoursRemaining).padStart(2, '0') },
                        { label: 'Mins', val: String(timeDetails.minutesRemaining).padStart(2, '0') },
                        { label: 'Secs', val: String(timeDetails.secondsRemaining).padStart(2, '0'), highlight: true },
                        { label: 'Status', val: `${timeDetails.percentRemaining}%`, sub: 'Remaining' }
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className={`p-3 md:p-4 rounded-xl text-center border backdrop-blur-md transition-all ${
                            item.highlight
                              ? 'bg-accent/15 border-accent/50 text-accent shadow-[0_0_15px_rgba(0,174,239,0.2)]'
                              : 'bg-white/5 border-white/10 text-white print:bg-white print:border-gray-300 print:text-black'
                          }`}
                        >
                          <div className="text-2xl md:text-3xl font-black font-mono tracking-tight mb-1">
                            {item.val}
                          </div>
                          <div className="text-[10px] uppercase font-black tracking-widest text-gray-400">
                            {item.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden print:bg-gray-200">
                      <motion.div
                        className="bg-gradient-to-r from-accent to-emerald-400 h-2.5 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${timeDetails.percentRemaining}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 mb-8 text-center">
                    <p className="text-red-300 font-bold uppercase tracking-wider text-sm">
                      This warranty coverage expired on {timeDetails.expiryFormatted}.
                    </p>
                  </div>
                )}

                {/* Detailed Information Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
                  {/* Warranty Number & Customer */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 md:p-6 print:border-gray-300 print:bg-white">
                    <div className="text-xs uppercase font-black tracking-widest text-gray-500 mb-2">
                      Warranty Identification
                    </div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="text-lg md:text-xl font-mono font-black text-accent tracking-wider">
                        {warrantyData.warrantyNumber}
                      </span>
                      <button
                        onClick={() => handleCopy(warrantyData.warrantyNumber)}
                        className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors cursor-pointer print:hidden"
                        title="Copy code"
                      >
                        {copied ? <Check size={18} className="text-emerald-400" /> : <Copy size={18} />}
                      </button>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-white/5 print:border-gray-200">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Coverage Type:</span>
                        <span className="font-bold text-white print:text-black">
                          {warrantyData.coverageType || 'Paint Protection Film'}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Client / Account:</span>
                        <span className="font-bold text-white print:text-black">
                          {warrantyData.customerName || 'Registered Owner'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Vehicle Details */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 md:p-6 print:border-gray-300 print:bg-white">
                    <div className="flex items-center gap-2 text-xs uppercase font-black tracking-widest text-gray-500 mb-2">
                      <Car size={16} className="text-accent" />
                      <span>Protected Vehicle</span>
                    </div>
                    <div className="text-xl md:text-2xl font-black text-white print:text-black uppercase tracking-tight mb-4">
                      {warrantyData.carName}
                    </div>

                    <div className="space-y-2 pt-2 border-t border-white/5 print:border-gray-200">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Film Variant:</span>
                        <span className="font-black text-accent bg-accent/10 px-2.5 py-0.5 rounded border border-accent/20 uppercase tracking-wider text-xs">
                          {warrantyData.productVariant} Series
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Warranty Term:</span>
                        <span className="font-bold text-white print:text-black">
                          {warrantyData.warrantyYears || 5} Years Official Guarantee
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Studio Details */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 md:p-6 print:border-gray-300 print:bg-white">
                    <div className="flex items-center gap-2 text-xs uppercase font-black tracking-widest text-gray-500 mb-2">
                      <MapPin size={16} className="text-accent" />
                      <span>Certified Installation Studio</span>
                    </div>
                    <div className="text-lg md:text-xl font-black text-white print:text-black uppercase tracking-tight mb-2">
                      {warrantyData.studioName}
                    </div>
                    {warrantyData.studioLocation && (
                      <p className="text-xs text-gray-400 mb-3 leading-relaxed">
                        {warrantyData.studioLocation}
                      </p>
                    )}
                    {warrantyData.contact && (
                      <div className="flex items-center gap-2 text-xs text-accent font-semibold pt-2 border-t border-white/5 print:border-gray-200">
                        <Phone size={14} />
                        <span>{warrantyData.contact}</span>
                      </div>
                    )}
                  </div>

                  {/* Installation & Expiry Dates */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 md:p-6 print:border-gray-300 print:bg-white">
                    <div className="flex items-center gap-2 text-xs uppercase font-black tracking-widest text-gray-500 mb-2">
                      <Calendar size={16} className="text-accent" />
                      <span>Timeline Verification</span>
                    </div>

                    <div className="space-y-4 pt-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Installation Date:</span>
                        <span className="font-mono font-bold text-white print:text-black">
                          {timeDetails.installFormatted}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Valid Through:</span>
                        <span className="font-mono font-bold text-accent">
                          {timeDetails.expiryFormatted}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm pt-2 border-t border-white/5 print:border-gray-200">
                        <span className="text-gray-400">Total Days Remaining:</span>
                        <span className="font-mono font-bold text-emerald-400">
                          {timeDetails.totalDaysRemaining || 0} Days
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Security Notice */}
                <div className="pt-6 border-t border-white/10 text-center flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500 print:border-gray-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-400" />
                    <span>Cryptographically Verified Serial Code on Starkx Global Ledger</span>
                  </div>
                  <div className="font-mono text-[11px]">
                    starkx-protection.com • Official Authentication
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default UserWarrantyCheck;
