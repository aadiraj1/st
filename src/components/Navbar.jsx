import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Phone, MapPin, Menu, X, ShoppingCart, Trash2, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartItems, removeFromCart, cartTotal } = useCart();
  const navigate = useNavigate();

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navLinks = [
    { name: 'Products', href: '/#variants' },
    { name: 'Shop', href: '/shop' },
    { name: 'Find Installer', href: '/#dealer-map' },
    { name: 'Articles', href: '/blog' },
    { name: 'Dealer', href: '/#dealer' },
  ];

  const handleNavClick = (href) => {
    setMobileMenuOpen(false);
    // Handle hash navigation for same-page sections
    if (href.startsWith('/#')) {
      const id = href.replace('/#', '');
      // If already on home page, scroll directly
      if (window.location.pathname === '/') {
        const el = document.getElementById(id);
        if (el) {
          setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
        }
      }
    }
  };

  return (
    <>
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${isScrolled ? 'glass-effect py-2' : 'bg-transparent py-4 md:py-6'}`}>
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 md:gap-3 group cursor-pointer flex-shrink-0">
            <motion.div
              whileHover={{ rotate: 15 }}
              className="w-8 h-8 md:w-10 md:h-10 bg-accent rounded-sm flex items-center justify-center font-black text-black skew-x-[-12deg] shadow-[0_0_20px_rgba(0,174,239,0.4)]"
            >
              E
            </motion.div>
            <div className="flex flex-col leading-none">
              <span className="text-lg md:text-2xl font-black tracking-tighter uppercase italic">
                Starkx <span className="text-accent underline decoration-4 underline-offset-4">Auto</span>
              </span>
              <span className="text-[8px] md:text-[10px] font-bold tracking-[0.3em] md:tracking-[0.4em] uppercase text-gray-500 mt-0.5">Manufacturing</span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            {navLinks.map((link, i) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-xs font-black hover:text-accent transition-colors uppercase tracking-[0.2em] relative group"
              >
                <motion.span
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  {link.name}
                </motion.span>
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-white hover:text-accent transition-colors"
            >
              <ShoppingCart size={20} />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-black text-[10px] font-black rounded-full flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </button>

            <Link to="/become-dealer">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-accent text-black px-6 lg:px-8 py-3 rounded-none font-black text-[10px] uppercase tracking-[0.2em] hover:bg-white transition-all shadow-[0_10px_20px_rgba(0,174,239,0.2)]"
              >
                Become a Dealer
              </motion.button>
            </Link>
          </div>

          {/* Mobile Right Side */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-white"
            >
              <ShoppingCart size={22} />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-black text-[10px] font-black rounded-full flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </button>
            <button
              className="text-white p-2"
              onClick={() => setMobileMenuOpen(prev => !prev)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden bg-primary/98 backdrop-blur-xl border-t border-white/5"
            >
              <div className="container mx-auto px-4 py-6 flex flex-col gap-2">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <Link
                      to={link.href}
                      onClick={() => handleNavClick(link.href)}
                      className="flex items-center justify-between w-full py-4 border-b border-white/5 text-lg font-black uppercase tracking-tight hover:text-accent transition-colors"
                    >
                      {link.name}
                      <ChevronRight size={16} className="text-gray-600" />
                    </Link>
                  </motion.div>
                ))}
                <Link to="/become-dealer" onClick={() => setMobileMenuOpen(false)}>
                  <button className="w-full bg-accent text-black px-6 py-4 rounded-none font-black text-sm uppercase tracking-[0.2em] mt-4 hover:bg-white transition-all">
                    Dealer Portal
                  </button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-[200] flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setIsCartOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-sm md:max-w-md bg-secondary h-full shadow-2xl border-l border-white/5 flex flex-col"
            >
              <div className="p-5 md:p-8 border-b border-white/5 flex items-center justify-between">
                <h2 className="text-xl md:text-2xl font-black uppercase tracking-tighter italic">Your Cart</h2>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                  <X size={22} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 md:p-8 space-y-6">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-30">
                    <ShoppingCart size={56} className="mb-4" />
                    <p className="text-sm font-black uppercase tracking-widest">Cart is empty</p>
                  </div>
                ) : (
                  cartItems.map((item, idx) => (
                    <div key={idx} className="flex gap-4 group">
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-primary border border-white/5 shrink-0 overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between gap-2 mb-1">
                          <h3 className="text-sm font-black uppercase tracking-tight truncate">{item.name}</h3>
                          <button onClick={() => removeFromCart(idx)} className="text-gray-500 hover:text-red-500 transition-colors flex-shrink-0">
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <p className="text-[10px] text-gray-500 font-black uppercase mb-1">{item.type || item.category}</p>
                        <p className="text-sm font-black text-accent">{item.price}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="p-5 md:p-8 bg-black/50 border-t border-white/5">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xs font-black uppercase tracking-widest text-gray-500">Subtotal</span>
                  <span className="text-xl md:text-2xl font-black italic">${cartTotal.toFixed(2)}</span>
                </div>
                <button
                  disabled={cartItems.length === 0}
                  onClick={() => { setIsCartOpen(false); navigate('/checkout'); }}
                  className="w-full bg-accent text-black py-4 rounded-none font-black uppercase tracking-[0.2em] hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-sm"
                >
                  Checkout <ChevronRight size={18} />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
