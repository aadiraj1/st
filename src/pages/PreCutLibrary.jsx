import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout, Search, Grid, Lock, ChevronRight, CheckCircle2, X, Car, Calendar, Fingerprint, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const PreCutLibrary = () => {
  const [isRequestModalOpen, setIsRequestModalOpen] = React.useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = React.useState(false);
  const [requestFormData, setRequestFormData] = React.useState({
    vehicleYear: '',
    vehicleMake: '',
    vehicleModel: '',
    dealerId: '',
    notes: ''
  });

  const handleRequestSubmit = (e) => {
    e.preventDefault();
    setIsRequestModalOpen(false);
    setIsSuccessModalOpen(true);
    // Reset form
    setRequestFormData({ vehicleYear: '', vehicleMake: '', vehicleModel: '', dealerId: '', notes: '' });
  };
  return (
    <div className="pt-28 min-h-screen bg-black text-white pb-32">
      {/* Hero Section */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto mb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30 text-accent px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-8">
            <Layout size={12} /> Pattern Repository
          </div>
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter italic mb-8 leading-none">
            Pre-Cut <span className="text-accent underline decoration-4 underline-offset-8">Library</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
            Search, preview, and download precision patterns for any vehicle in seconds. Our library is the industry gold standard for fitment.
          </p>
        </motion.div>
      </section>

      {/* Stats Bar */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto mb-32">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Patterns", value: "105,420" },
            { label: "New This Week", value: "+214" },
            { label: "Model Years", value: "1995-2026" },
            { label: "Accuracy", value: "99.9%" }
          ].map((stat, idx) => (
            <div key={idx} className="bg-secondary/20 border border-white/5 p-6 rounded-2xl text-center">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-2xl font-black text-white">{stat.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Main Grid / Login Gate */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto">
        <div className="relative">
          {/* Mock Grid (Blurred) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 blur-lg pointer-events-none opacity-20 select-none">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-secondary h-80 rounded-3xl border border-white/10" />
            ))}
          </div>

          {/* Login Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-secondary/80 backdrop-blur-xl border border-accent/20 p-8 md:p-16 rounded-[40px] text-center max-w-2xl shadow-[0_0_100px_rgba(0,174,239,0.1)]"
            >
              <div className="w-20 h-20 bg-accent/20 rounded-3xl flex items-center justify-center mx-auto mb-8 text-accent shadow-lg">
                <Lock size={32} />
              </div>
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter italic mb-6">Database Gated</h2>
              <p className="text-gray-300 text-lg mb-10 leading-relaxed font-medium">The pattern library is exclusive to certified installers. Please login or apply for a dealership to access downloads.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/dealer-login" className="bg-accent text-black font-black uppercase tracking-widest text-xs px-10 py-5 hover:bg-white transition-all shadow-xl">Installer Login</Link>
                <Link to="/become-dealer" className="border border-white/10 font-black uppercase tracking-widest text-xs px-10 py-5 hover:bg-white/5 transition-all">Become A Partner</Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="mt-32 px-4 md:px-8 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h3 className="text-2xl font-black uppercase tracking-tight mb-8 italic">Why our patterns?</h3>
            {[
              "Extended edge coverage for deep wrapping",
              "Precision-matched parking sensor cutouts",
              "Advanced relief cuts for complex curves",
              "Engineered specifically for 8.5mil+ films"
            ].map((text, idx) => (
              <div key={idx} className="flex items-center gap-4 text-gray-400 font-bold">
                <CheckCircle2 className="text-accent" size={20} />
                <span className="text-sm tracking-tight">{text}</span>
              </div>
            ))}
          </div>
          <div className="bg-accent/5 border border-accent/10 p-10 rounded-3xl flex flex-col justify-center text-center">
            <Search className="mx-auto mb-6 text-accent opacity-50" size={48} />
            <h4 className="text-xl font-black uppercase tracking-tight mb-4 leading-none">Can't find a pattern?</h4>
            <p className="text-sm text-gray-500 font-medium mb-8">Our design team can digitize any vehicle within 48 hours for authorized dealers.</p>
            <button
              onClick={() => setIsRequestModalOpen(true)}
              className="text-[10px] font-black text-white uppercase tracking-widest underline underline-offset-4 hover:text-accent transition-colors"
            >
              Request New Pattern
            </button>
          </div>
        </div>

        {/* Pattern Request Modal */}
        <AnimatePresence>
          {isRequestModalOpen && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/90 backdrop-blur-md"
                onClick={() => setIsRequestModalOpen(false)}
              />
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="relative bg-[#0A0A0A] border border-white/10 p-8 md:p-10 rounded-[32px] max-w-lg w-full shadow-2xl overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl -mr-16 -mt-16" />
                <button
                  onClick={() => setIsRequestModalOpen(false)}
                  className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors z-10"
                >
                  <X size={24} />
                </button>

                <div className="mb-8">
                  <h2 className="text-2xl font-black uppercase tracking-tight mb-2 italic">Request <span className="text-accent">Digitization</span></h2>
                  <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Our team will digitize your vehicle within 48 hours</p>
                </div>

                <form onSubmit={handleRequestSubmit} className="space-y-4 relative z-10">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 ml-1">Vehicle Year</label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
                        <input
                          required
                          type="text"
                          value={requestFormData.vehicleYear}
                          onChange={(e) => setRequestFormData({ ...requestFormData, vehicleYear: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-accent text-sm transition-colors font-medium text-white"
                          placeholder="2026"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 ml-1">Vehicle Make</label>
                      <div className="relative">
                        <Car className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
                        <input
                          required
                          type="text"
                          value={requestFormData.vehicleMake}
                          onChange={(e) => setRequestFormData({ ...requestFormData, vehicleMake: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-accent text-sm transition-colors font-medium text-white"
                          placeholder="Porsche"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 ml-1">Vehicle Model</label>
                    <div className="relative">
                      <Car className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
                      <input
                        required
                        type="text"
                        value={requestFormData.vehicleModel}
                        onChange={(e) => setRequestFormData({ ...requestFormData, vehicleModel: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-accent text-sm transition-colors font-medium text-white"
                        placeholder="911 GT3 RS"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 ml-1">Dealer ID / Email</label>
                    <div className="relative">
                      <Fingerprint className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
                      <input
                        required
                        type="text"
                        value={requestFormData.dealerId}
                        onChange={(e) => setRequestFormData({ ...requestFormData, dealerId: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-accent text-sm transition-colors font-medium text-white"
                        placeholder="Authorized Dealer Credentials"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 ml-1">Additional Notes</label>
                    <div className="relative">
                      <MessageSquare className="absolute left-4 top-5 text-gray-600" size={16} />
                      <textarea
                        value={requestFormData.notes}
                        onChange={(e) => setRequestFormData({ ...requestFormData, notes: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-accent text-sm transition-colors font-medium text-white h-24 resize-none"
                        placeholder="Specific areas (e.g. interior, rocker panels...)"
                      />
                    </div>
                  </div>

                  <button type="submit" className="w-full bg-accent text-black py-5 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-white transition-all shadow-xl group flex items-center justify-center gap-3 mt-4">
                    Submit Request <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
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

                <h2 className="text-3xl font-black uppercase tracking-tighter italic mb-4 leading-none">Request <span className="text-accent">Submitted</span></h2>

                <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.2em] leading-relaxed mb-10 max-w-xs mx-auto">
                  Your request has been successfully submitted. Our design team has prioritized this vehicle for digitization. We strive to provide patterns based on local fleet availability in your surrounding area within 48 hours.
                </p>

                <button
                  onClick={() => setIsSuccessModalOpen(false)}
                  className="w-full bg-white text-black py-4 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-accent transition-all shadow-lg"
                >
                  Return to Library
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
};

export default PreCutLibrary;
