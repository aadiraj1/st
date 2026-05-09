import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Truck, CheckCircle2, ChevronRight, MapPin, Globe, Mail, Box, ShieldCheck, Info } from 'lucide-react';
import { filmVariants } from '../data/filmVariants';

const countries = [
  "United States", "Canada", "United Kingdom", "Germany", "France", "Italy", "Spain", "Australia", "Japan", "China",
  "Brazil", "Pakistan", "Mexico", "United Arab Emirates", "Saudi Arabia", "South Africa", "India", "Singapore", "South Korea"
];

const RollInquiry = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [variant, setVariant] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    country: 'United States',
    quantity: 1,
    notes: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const passedVariant = location.state?.product;
    if (passedVariant) {
        const found = filmVariants.find(v => v.name.toLowerCase() === passedVariant.name.toLowerCase());
        setVariant(found || filmVariants[2]); // Default to Starkx if not found
    } else {
        setVariant(filmVariants[2]); // Default
    }
  }, [location]);

  useEffect(() => {
    // Logic for minimum quantity
    if (formData.country === 'United States') {
        if (formData.quantity < 1) setFormData(prev => ({ ...prev, quantity: 1 }));
    } else {
        if (formData.quantity < 100) setFormData(prev => ({ ...prev, quantity: 100 }));
    }
  }, [formData.country]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (!variant) return null;

  const minQty = formData.country === 'United States' ? 1 : 100;

  return (
    <div className="pt-28 min-h-screen bg-black text-white px-4 md:px-8 pb-32 selection:bg-accent selection:text-black">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <span className="text-accent text-[10px] font-black uppercase tracking-[0.5em] mb-4 block">Official Roll Inquiry</span>
                <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic mb-6">
                    Bulk <span className="text-accent underline decoration-4 underline-offset-8">Acquisition</span>
                </h1>
                <p className="text-gray-500 font-medium max-w-2xl mx-auto">
                    Direct manufacturer-to-dealer procurement. Please provide your logistics details for a formal commercial quote.
                </p>
            </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left: Product Info */}
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:col-span-5 space-y-8"
            >
                <div className="bg-secondary/30 border border-white/5 p-10 rounded-[40px] relative overflow-hidden group">
                    <div 
                        className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-[100px] opacity-10 transition-all group-hover:scale-150"
                        style={{ backgroundColor: variant.color }}
                    />
                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-12">
                            <div className="px-4 py-2 bg-accent/10 border border-accent/20 text-accent font-black text-xl italic rounded-lg">
                                {variant.thickness}
                            </div>
                            <ShieldCheck size={32} className="text-accent/40" />
                        </div>
                        <h2 className="text-4xl font-black uppercase tracking-tight mb-4">{variant.name} Series</h2>
                        <p className="text-gray-400 font-medium mb-8 leading-relaxed">{variant.desc}</p>
                        
                        <div className="space-y-4">
                            {variant.features.map((f, i) => (
                                <div key={i} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-gray-300">
                                    <div className="w-1.5 h-1.5 bg-accent rounded-full" /> {f}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="bg-accent/5 border border-accent/20 p-8 rounded-[30px] flex items-start gap-6">
                    <div className="w-12 h-12 bg-accent/20 rounded-2xl flex items-center justify-center text-accent shrink-0">
                        <Info size={24} />
                    </div>
                    <div>
                        <h4 className="text-sm font-black uppercase tracking-tight mb-2 text-white">Logistics Policy</h4>
                        <p className="text-xs text-gray-500 font-medium leading-relaxed">
                            For domestic (USA) orders, we offer single roll delivery. For international logistics, minimum order quantity is 100 units due to export compliance.
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:col-span-7"
            >
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-secondary/20 border border-white/10 p-10 rounded-[40px] space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Full Name</label>
                                <input 
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-accent outline-none transition-all font-bold"
                                    placeholder="Enter your name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Work Email</label>
                                <input 
                                    required
                                    type="email"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-accent outline-none transition-all font-bold"
                                    placeholder="your@company.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Company / Studio</label>
                                <input 
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-accent outline-none transition-all font-bold"
                                    placeholder="Business Name"
                                    value={formData.company}
                                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Destination Country</label>
                                <div className="relative">
                                    <select 
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-accent outline-none transition-all font-bold appearance-none cursor-pointer"
                                        value={formData.country}
                                        onChange={(e) => setFormData({...formData, country: e.target.value})}
                                    >
                                        {countries.map(c => <option key={c} value={c} className="bg-black">{c}</option>)}
                                    </select>
                                    <Globe size={18} className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center mb-1">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Roll Quantity</label>
                                <span className="text-[9px] font-black text-accent uppercase tracking-widest">Min. {minQty} Required</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <input 
                                    required
                                    type="number"
                                    min={minQty}
                                    className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-accent outline-none transition-all font-bold text-2xl"
                                    value={formData.quantity}
                                    onChange={(e) => setFormData({...formData, quantity: parseInt(e.target.value)})}
                                />
                                <div className="w-20 h-full flex items-center justify-center bg-white/5 border border-white/10 rounded-2xl">
                                    <Box size={24} className="text-gray-500" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Special Logistics Notes</label>
                            <textarea 
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-accent outline-none transition-all font-bold resize-none h-32"
                                placeholder="Port of entry, custom labeling, or express shipping requirements..."
                                value={formData.notes}
                                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                            />
                        </div>
                    </div>

                    <button 
                        type="submit"
                        className="w-full bg-accent text-black py-8 rounded-[25px] font-black uppercase tracking-[0.3em] text-sm hover:bg-white transition-all shadow-[0_20px_60px_rgba(0,174,239,0.25)] flex items-center justify-center gap-4 group"
                    >
                        Submit Roll Inquiry <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </form>
            </motion.div>
        </div>
      </div>

      {/* Professional Success Modal */}
      <AnimatePresence>
        {isSubmitted && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/95 backdrop-blur-xl"
                    onClick={() => navigate('/')}
                />
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="relative bg-secondary border border-accent/20 p-12 md:p-20 rounded-[60px] max-w-2xl w-full text-center shadow-2xl overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[100px] -mr-32 -mt-32" />
                    
                    <div className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-10 text-accent shadow-[0_0_40px_rgba(0,174,239,0.3)]">
                        <Mail size={48} strokeWidth={2.5} />
                    </div>

                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic mb-8">Inquiry Received</h2>
                    
                    <div className="space-y-8 mb-16">
                        <p className="text-gray-400 font-bold uppercase text-xs tracking-[0.2em] leading-relaxed max-w-md mx-auto">
                           Thank you for your interest in <span className="text-white">{variant.name} {variant.thickness}</span> bulk acquisition.
                        </p>
                        <div className="bg-white/5 border border-white/10 p-10 rounded-[35px] relative">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent text-black px-4 py-1 text-[9px] font-black uppercase tracking-widest">Timeline Notice</div>
                            <p className="text-white font-black text-xl md:text-2xl italic leading-tight">
                                We will contact you within <span className="text-accent underline underline-offset-8 decoration-2">2 to 3 working days</span> related to your order.
                            </p>
                        </div>
                    </div>

                    <button 
                        onClick={() => navigate('/')}
                        className="w-full bg-white text-black py-6 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-accent transition-all shadow-xl"
                    >
                        Return to Manufacturing Hub
                    </button>
                </motion.div>
            </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RollInquiry;
