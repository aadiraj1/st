import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary pt-20 pb-10 border-t border-white/5 px-6 grainy-bg">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-20">
          {/* Brand Col */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-10 group cursor-pointer">
              <img src="/e5818c65-0f63-4627-a57b-217d4cff828a/logostk_transparent.png" alt="Starkx Logo" className="h-[72px] md:h-24 object-contain logo-glow-pulse group-hover:brightness-125 transition-all duration-300" />
            </div>
            <p className="text-gray-500 text-xs font-medium leading-relaxed mb-10 max-w-xs uppercase tracking-tight">
              A global leader in protective films and surface engineering. Defining the future of surface preservation for automotive, marine, and architectural assets.
            </p>

          </div>

          {/* Shop */}
          <div>
            <Link to="/shop">
              <h4 className="text-white font-black uppercase tracking-[0.3em] text-[10px] mb-10 hover:text-accent transition-colors">Shop PPF & Care</h4>
            </Link>
            <ul className="space-y-4">
              <li><Link to="/shop/film-variants" className="text-gray-500 hover:text-accent text-[11px] font-bold transition-colors uppercase tracking-tight">Film Variants</Link></li>
              <li><Link to="/colour-ppf" className="text-gray-500 hover:text-accent text-[11px] font-bold transition-colors uppercase tracking-tight">Colour PPF</Link></li>
              <li><Link to="/shop/care-products" className="text-gray-500 hover:text-accent text-[11px] font-bold transition-colors uppercase tracking-tight">Care Products</Link></li>
              <li><Link to="/shop/tools-kits" className="text-gray-500 hover:text-accent text-[11px] font-bold transition-colors uppercase tracking-tight">Tools & Kits</Link></li>
              <li><Link to="/shop/merchandise" className="text-gray-500 hover:text-accent text-[11px] font-bold transition-colors uppercase tracking-tight">Merchandise</Link></li>
              <li><Link to="/shop/special-offers" className="text-gray-500 hover:text-accent text-[11px] font-bold transition-colors uppercase tracking-tight">Special Offers</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-black uppercase tracking-[0.3em] text-[10px] mb-10">Resources</h4>
            <ul className="space-y-4">
              <li><Link to="/help-center" className="text-gray-500 hover:text-accent text-[11px] font-bold transition-colors uppercase tracking-tight">Help Center</Link></li>
              <li><Link to="/blog" className="text-gray-500 hover:text-accent text-[11px] font-bold transition-colors uppercase tracking-tight">Blog</Link></li>
              <li><Link to="/events" className="text-gray-500 hover:text-accent text-[11px] font-bold transition-colors uppercase tracking-tight">Events</Link></li>
              <li><Link to="/warranty" className="text-gray-500 hover:text-accent text-[11px] font-bold transition-colors uppercase tracking-tight">Warranty Info</Link></li>
              <li><Link to="/shipping-returns" className="text-gray-500 hover:text-accent text-[11px] font-bold transition-colors uppercase tracking-tight">Shipping & Returns</Link></li>

            </ul>
          </div>

          {/* Dealers */}
          <div>
            <h4 className="text-white font-black uppercase tracking-[0.3em] text-[10px] mb-10">Dealers & Installers</h4>
            <ul className="space-y-4">
              <li><Link to="/dealer-login" className="text-gray-500 hover:text-accent text-[11px] font-bold transition-colors uppercase tracking-tight">Dealer Login</Link></li>
              <li><Link to="/dap-software" className="text-gray-500 hover:text-accent text-[11px] font-bold transition-colors uppercase tracking-tight">DAP Software</Link></li>
              <li><Link to="/pre-cut-library" className="text-gray-500 hover:text-accent text-[11px] font-bold transition-colors uppercase tracking-tight">Pre-Cut Library</Link></li>
              <li><Link to="/become-dealer" className="text-gray-500 hover:text-accent text-[11px] font-bold transition-colors uppercase tracking-tight">Become a Dealer</Link></li>
              <li><Link to="/training-certification" className="text-gray-500 hover:text-accent text-[11px] font-bold transition-colors uppercase tracking-tight">Training & Certification</Link></li>
              <li><Link to="/studios-login" className="text-gray-500 hover:text-accent text-[11px] font-bold transition-colors uppercase tracking-tight">Studios Login</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-black uppercase tracking-[0.3em] text-[10px] mb-10">Company</h4>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-gray-500 hover:text-accent text-[11px] font-bold transition-colors uppercase tracking-tight">About Us</Link></li>
              <li><Link to="/management" className="text-gray-500 hover:text-accent text-[11px] font-bold transition-colors uppercase tracking-tight">Management</Link></li>
              <li><Link to="/careers" className="text-gray-500 hover:text-accent text-[11px] font-bold transition-colors uppercase tracking-tight">Careers</Link></li>
              {/* <li><Link to="/investors" className="text-gray-500 hover:text-accent text-[11px] font-bold transition-colors uppercase tracking-tight">Investor Relations</Link></li> */}
              <li><Link to="/partnerships" className="text-gray-500 hover:text-accent text-[11px] font-bold transition-colors uppercase tracking-tight">Partnerships</Link></li>
              <li><Link to="/legal" className="text-gray-500 hover:text-accent text-[11px] font-bold transition-colors uppercase tracking-tight">Legal</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-16 border-t border-white/5 flex flex-col lg:flex-row justify-between items-center gap-10">
          <p className="text-gray-600 text-[9px] font-black uppercase tracking-[0.4em]">
            © {new Date().getFullYear()} Starkx.Pro Manufacturing Corp. All Rights Reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-10">
            <Link to="/terms-of-use" className="text-gray-600 text-[9px] font-black uppercase tracking-[0.4em] cursor-pointer hover:text-white transition-colors">Terms Of Use</Link>
            <Link to="/privacy-policy" className="text-gray-600 text-[9px] font-black uppercase tracking-[0.4em] cursor-pointer hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/legal" className="text-gray-600 text-[9px] font-black uppercase tracking-[0.4em] cursor-pointer hover:text-white transition-colors">Legal</Link>
          </div>
          <div className="flex items-center gap-3 text-gray-700 text-[9px] font-black uppercase tracking-[0.4em]">
            <Shield size={12} className="text-accent" /> Secure & Encrypted
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
