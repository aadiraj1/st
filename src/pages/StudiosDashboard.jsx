import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../supabase';
import { FileText, Calendar, Settings, Mail, CheckCircle2, AlertCircle } from 'lucide-react';

const StudiosDashboard = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);
  
  const [crNumber, setCrNumber] = useState('');
  const [applyDate, setApplyDate] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [email, setEmail] = useState('');
  
  const [status, setStatus] = useState({ type: null, message: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('studiosUser');
    if (!user) {
      navigate('/studios-login');
    } else {
      setUsername(user);
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, message: '' });

    try {
      const { error } = await supabase
        .from('submissions')
        .insert([
          {
            customer_name: username,
            cr_number: crNumber,
            apply_date: applyDate,
            service_type: serviceType,
            email: email
          }
        ]);

      if (!error) {
        setStatus({ type: 'success', message: 'Saved successfully' });
        setCrNumber('');
        setApplyDate('');
        setServiceType('');
        setEmail('');

        const emailRes = await fetch('/api/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email,
            crNumber,
            serviceType,
            applyDate,
            username
          })
        });
        if (!emailRes.ok) {
          const errData = await emailRes.json().catch(() => ({}));
          console.error('Email sending failed:', errData);
        } else {
          console.log('Email sent successfully:', await emailRes.json());
        }

      } else {
        setStatus({ type: 'error', message: 'Error saving data. Check Supabase connection.' });
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'An unexpected error occurred.' });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('studiosUser');
    navigate('/studios-login');
  };

  if (!username) return null;

  return (
    <div className="pt-28 min-h-screen bg-black text-white px-4 pb-20">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-white/10 pb-6 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic mb-2">Studios <span className="text-accent">Dashboard</span></h1>
            <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em]">Welcome, {username}</p>
          </div>
          <button 
            onClick={handleLogout}
            className="text-[10px] font-black text-gray-500 hover:text-red-400 uppercase tracking-widest transition-colors"
          >
            Logout
          </button>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-secondary/30 border border-white/10 rounded-[32px] p-8 md:p-12 backdrop-blur-xl"
        >
          <h2 className="text-2xl font-black uppercase tracking-tight mb-8">New Submission</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-3 ml-1">CR Number</label>
                <div className="relative">
                  <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                  <input 
                    required
                    type="text" 
                    value={crNumber}
                    onChange={(e) => setCrNumber(e.target.value)}
                    placeholder="Enter CR Number"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-accent transition-colors text-sm font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-3 ml-1">Apply Date</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                  <input 
                    required
                    type="date" 
                    value={applyDate}
                    onChange={(e) => setApplyDate(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-accent transition-colors text-sm font-medium [color-scheme:dark]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-3 ml-1">Service Type</label>
                <div className="relative">
                  <Settings className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                  <select 
                    required
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-accent transition-colors text-sm font-medium appearance-none"
                  >
                    <option value="">Select Service</option>
                    <option value="Nova">Nova — 3 Years Warranty</option>
                    <option value="Plus">Plus — 4 Years Warranty</option>
                    <option value="Elite">Elite — 7 Years Warranty</option>
                    <option value="Master">Master — 10 Years Warranty</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-3 ml-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                  <input 
                    required
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="customer@email.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-accent transition-colors text-sm font-medium"
                  />
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button 
                type="submit"
                disabled={loading}
                className="bg-accent text-black px-10 py-5 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-white transition-all shadow-[0_15px_30px_rgba(0,174,239,0.3)] inline-flex items-center justify-center gap-3 relative overflow-hidden group min-w-[200px]"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  'Submit Form'
                )}
              </button>
            </div>
          </form>

          <AnimatePresence>
            {status.message && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`mt-8 p-6 border rounded-2xl flex items-center gap-4 ${
                  status.type === 'success' 
                    ? 'bg-green-500/10 border-green-500/20 text-green-500' 
                    : 'bg-red-500/10 border-red-500/20 text-red-500'
                }`}
              >
                {status.type === 'success' ? (
                  <CheckCircle2 className="shrink-0" size={20} />
                ) : (
                  <AlertCircle className="shrink-0" size={20} />
                )}
                <p className="text-xs font-bold leading-relaxed uppercase tracking-tight">{status.message}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default StudiosDashboard;
