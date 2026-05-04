import React from 'react';
import { motion } from 'framer-motion';
import { Scale, ShieldCheck, AlertCircle, Globe, BookOpen, ExternalLink } from 'lucide-react';

const TermsOfUse = () => {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      icon: <ShieldCheck className="text-accent" size={24} />,
      content: "By accessing, browsing, or using the Elite Auto website and services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use and all applicable laws and regulations. If you do not agree to these terms, you are not authorized to use our platform or purchase our products. These terms constitute a legally binding agreement between you and Elite Auto Manufacturing Corp."
    },
    {
      title: "2. Intellectual Property Rights",
      icon: <BookOpen className="text-accent" size={24} />,
      content: "All content on this site, including but not limited to text, graphics, logos, icons, images, audio clips, digital downloads, data compilations, and software (including our proprietary DAP Software), is the exclusive property of Elite Auto Manufacturing Corp. and is protected by international copyright, trademark, and patent laws. Unauthorized reproduction, modification, or distribution of these materials is strictly prohibited."
    },
    {
      title: "3. User License & Restrictions",
      icon: <Globe className="text-accent" size={24} />,
      content: "We grant you a limited, non-exclusive, non-transferable license to access and make personal use of this site. This license does not include any resale or commercial use of this site or its contents; any collection and use of any product listings, descriptions, or prices; any derivative use of this site or its contents; or any use of data mining, robots, or similar data gathering and extraction tools."
    },
    {
      title: "4. Professional Conduct & Dealer Obligations",
      icon: <Scale className="text-accent" size={24} />,
      content: "For users accessing the Dealer Portal or DAP Software, additional professional obligations apply. You agree to provide accurate, current, and complete information. You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer. You agree to accept responsibility for all activities that occur under your account or password."
    },
    {
      title: "5. Disclaimer of Warranties",
      icon: <AlertCircle className="text-accent" size={24} />,
      content: "Elite Auto products and services are provided on an 'as is' and 'as available' basis. We make no representations or warranties of any kind, express or implied, as to the operation of our services or the information, content, materials, or products included. You expressly agree that your use of our services is at your sole risk."
    },
    {
      title: "6. Limitation of Liability",
      icon: <AlertCircle className="text-accent" size={24} />,
      content: "Elite Auto Manufacturing Corp. shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use our products or services, even if we have been advised of the possibility of such damages. This includes, but is not limited to, damages for loss of profits, data, or other intangibles."
    }
  ];

  const [isContactOpen, setIsContactOpen] = React.useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsContactOpen(false);
    setIsSuccessOpen(true);
  };

  return (
    <div className="pt-28 min-h-screen bg-black text-white pb-32">
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-accent/10 to-transparent pointer-events-none" />
      
      <section className="px-4 md:px-8 max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Legal Documentation</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic mb-8">
            Terms Of <span className="text-accent underline decoration-4 underline-offset-8">Use</span>
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
            Last Updated: April 29, 2026. These terms govern your access to and use of Elite Auto's global digital ecosystem and professional protection services.
          </p>
        </motion.div>

        <div className="space-y-12">
          {sections.map((section, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group p-8 md:p-12 bg-white/[0.02] border border-white/5 rounded-[40px] hover:border-accent/30 transition-all duration-500"
            >
              <div className="flex flex-col md:flex-row gap-8">
                <div className="shrink-0">
                  <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-accent group-hover:text-black transition-all duration-500">
                    {section.icon}
                  </div>
                </div>
                <div className="space-y-6">
                  <h2 className="text-2xl font-black uppercase tracking-tight italic">{section.title}</h2>
                  <p className="text-gray-400 leading-relaxed text-lg font-medium">
                    {section.content}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-32 p-12 bg-accent rounded-[40px] text-black text-center relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:scale-110 transition-transform duration-1000" />
          <h2 className="text-4xl font-black uppercase tracking-tighter italic mb-6">Have Legal Questions?</h2>
          <p className="text-black/70 font-bold mb-10 max-w-xl mx-auto uppercase tracking-tight text-sm">
            Our compliance team is here to help you understand our operational standards and your rights within our ecosystem.
          </p>
          <button 
            onClick={() => setIsContactOpen(true)}
            className="px-10 py-5 bg-black text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-none hover:bg-white hover:text-black transition-all flex items-center gap-3 mx-auto relative z-10"
          >
            Contact Compliance <ExternalLink size={14} />
          </button>
        </motion.div>
      </section>

      {/* Form Modal */}
      {isContactOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            onClick={() => setIsContactOpen(false)}
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className="relative bg-secondary border border-white/10 p-10 rounded-[40px] max-w-lg w-full"
          >
            <h2 className="text-3xl font-black uppercase tracking-tighter italic mb-8">Contact Compliance</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <input required type="text" placeholder="Full Name" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-accent transition-colors" />
                <input required type="email" placeholder="Corporate Email" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-accent transition-colors" />
                <textarea required placeholder="Legal Inquiry Details" rows={4} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-accent transition-colors resize-none"></textarea>
              </div>
              <button type="submit" className="w-full bg-accent text-black py-5 rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-white transition-all">
                Submit Inquiry
              </button>
            </form>
          </motion.div>
        </div>
      )}

      {/* Success Popup */}
      {isSuccessOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/95 backdrop-blur-md"
            onClick={() => setIsSuccessOpen(false)}
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative bg-accent text-black p-12 rounded-[50px] max-w-md w-full text-center"
          >
            <div className="w-20 h-20 bg-black/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <ShieldCheck size={40} />
            </div>
            <h3 className="text-4xl font-black uppercase tracking-tighter italic mb-4">Received</h3>
            <p className="font-bold uppercase text-xs tracking-widest leading-relaxed mb-10">
              Your inquiry has been logged in our secure legal database. Our team will contact you shortly.
            </p>
            <button 
              onClick={() => setIsSuccessOpen(false)}
              className="w-full bg-black text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default TermsOfUse;
