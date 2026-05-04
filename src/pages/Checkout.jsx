import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Truck, CheckCircle2, X, ChevronRight, MapPin, Globe, Mail, Wallet } from 'lucide-react';
import { useCart } from '../context/CartContext';

const countries = [
  "United States", "Canada", "United Kingdom", "Germany", "France", "Italy", "Spain", "Australia", "Japan", "China",
  "Brazil", "Pakistan", "Mexico", "United Arab Emirates", "Saudi Arabia", "South Africa", "India", "Singapore", "South Korea"
];

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    country: 'United States',
    paymentMethod: 'bank-transfer'
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Note: clearCart() will be called when they close the modal or navigate away
  };

  return (
    <div className="pt-28 min-h-screen bg-black text-white px-4 md:px-8 max-w-7xl mx-auto pb-20">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left: Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center text-accent">
              <Truck size={24} />
            </div>
            <h1 className="text-3xl font-black uppercase tracking-tight italic">Secure Inquiry</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-secondary/30 border border-white/10 p-8 rounded-[30px] space-y-6">
              <h2 className="text-xl font-black uppercase tracking-tight italic mb-4 flex items-center gap-2">
                <MapPin size={20} className="text-accent" /> Logistics Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Full Name</label>
                  <input
                    required
                    type="text"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-accent outline-none transition-colors font-bold"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Email Address</label>
                  <input
                    required
                    type="email"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-accent outline-none transition-colors font-bold"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Shipping Address</label>
                <input
                  required
                  type="text"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-accent outline-none transition-colors font-bold"
                  placeholder="123 Performance Way"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">City</label>
                  <input
                    required
                    type="text"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-accent outline-none transition-colors font-bold"
                    placeholder="Miami"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Country</label>
                  <select
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-accent outline-none transition-colors appearance-none font-bold"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  >
                    {countries.map(c => <option key={c} value={c} className="bg-primary">{c}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-secondary/30 border border-white/10 p-8 rounded-[30px] space-y-6">
              <h2 className="text-xl font-black uppercase tracking-tight italic mb-4 flex items-center gap-2">
                <Wallet size={20} className="text-accent" /> Preferred Payment Method
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { id: 'bank-transfer', label: 'Bank Transfer', sub: 'Direct Wire' },
                  { id: 'crypto', label: 'Crypto', sub: 'BTC / USDT' },
                  { id: 'business-invoice', label: 'Business Invoice', sub: 'Net 30' }
                ].map((method) => (
                  <div
                    key={method.id}
                    onClick={() => setFormData({ ...formData, paymentMethod: method.id })}
                    className={`cursor-pointer p-4 border rounded-xl transition-all ${formData.paymentMethod === method.id ? 'border-accent bg-accent/10' : 'border-white/5 bg-white/5 hover:border-white/20'}`}
                  >
                    <div className="text-sm font-black uppercase tracking-tight">{method.label}</div>
                    <div className="text-[10px] text-gray-500 font-black uppercase tracking-widest mt-1">{method.sub}</div>
                  </div>
                ))}
              </div>
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest leading-relaxed">
                * Note: Payment details are not required at this stage. We will verify your order and send a secure payment link to your email.
              </p>
            </div>

            <button
              type="submit"
              disabled={cartItems.length === 0}
              className="w-full bg-accent text-black py-6 rounded-xl font-black uppercase tracking-[0.2em] hover:bg-white transition-all shadow-[0_0_30px_rgba(0,174,239,0.3)] flex items-center justify-center gap-3 disabled:opacity-50"
            >
              Submit Order Request <ChevronRight size={20} />
            </button>
          </form>
        </motion.div>

        {/* Right: Summary */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full lg:w-96"
        >
          <div className="bg-secondary/40 backdrop-blur-xl border border-white/10 p-8 rounded-[30px] sticky top-28">
            <h2 className="text-xl font-black uppercase tracking-tighter italic mb-8">Order Overview</h2>

            <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar mb-8">
              {cartItems.map((item, idx) => (
                <div key={idx} className="flex gap-4 items-center">
                  <div className="w-12 h-12 bg-primary border border-white/5 shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-black uppercase truncate">{item.name}</p>
                    <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest">{item.category}</p>
                  </div>
                  <span className="text-xs font-black">{item.price}</span>
                </div>
              ))}
              {cartItems.length === 0 && <p className="text-xs font-black uppercase text-gray-600 text-center py-10 italic">No items in request</p>}
            </div>

            <div className="pt-8 border-t border-white/5 space-y-4">
              <div className="flex justify-between text-[10px] font-black text-gray-500 uppercase tracking-widest">
                <span>Items Count</span>
                <span>{cartItems.length}</span>
              </div>
              <div className="flex justify-between text-[10px] font-black text-gray-500 uppercase tracking-widest">
                <span>Handling</span>
                <span className="text-accent">Pending Quote</span>
              </div>
              <div className="flex justify-between text-2xl font-black uppercase italic pt-4">
                <span>Est. Total</span>
                <span className="text-accent">${cartTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {isSubmitted && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/95 backdrop-blur-md"
              onClick={() => {
                clearCart();
                navigate('/');
              }}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-secondary border border-accent/30 p-12 rounded-[50px] max-w-lg w-full text-center shadow-[0_0_50px_rgba(0,174,239,0.2)]"
            >
              <div className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-8 text-accent shadow-[0_0_30px_rgba(0,174,239,0.3)]">
                <Mail size={48} />
              </div>
              <h2 className="text-4xl font-black uppercase tracking-tighter italic mb-6">Inquiry Sent!</h2>
              <div className="space-y-6 mb-12">
                <p className="text-gray-400 font-bold uppercase text-xs tracking-widest leading-relaxed">
                  We will contact you via email for confirmation within the next 2 hours.
                </p>
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                  <p className="text-accent font-black uppercase text-[10px] tracking-[0.2em]">
                    Important Note
                  </p>
                  <p className="text-gray-300 font-medium text-sm mt-2">
                    After confirmation email, we will send you a secure link for payment to complete your order.
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  clearCart();
                  navigate('/');
                }}
                className="w-full bg-white text-black py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-accent transition-all"
              >
                Return Home
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Checkout;
