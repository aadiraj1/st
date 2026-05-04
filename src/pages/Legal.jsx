import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, FileText, AlertTriangle, Scale, CheckCircle2 } from 'lucide-react';

const legalContent = {
  terms: {
    title: "Terms of Service",
    lastUpdated: "April 29, 2026",
    sections: [
      {
        h: "1. Scope of Agreement",
        p: "This agreement governs the use of Elite Auto's global digital platforms, including the primary website, dealer portal, and Design Access Program (DAP)."
      },
      {
        h: "2. Commercial Use & Licensing",
        p: "All software and design assets are protected under strict commercial licensing. Reverse engineering or redistribution is strictly prohibited."
      },
      {
        h: "3. Compliance & Ethics",
        p: "Users must comply with applicable international trade laws. Any violation may result in immediate termination of access rights."
      }
    ]
  },
  privacy: {
    title: "Privacy Policy",
    lastUpdated: "April 29, 2026",
    sections: [
      {
        h: "1. Global Data Governance",
        p: "We follow GDPR, CCPA, and APPI standards to ensure secure handling of all personal and business data."
      },
      {
        h: "2. Cryptographic Security",
        p: "All data is encrypted using AES-256 standards with multi-layer authentication and hardware-secured key management."
      },
      {
        h: "3. Data Retention",
        p: "Data is retained only as required by law or operational necessity. Users may request permanent deletion of their records."
      }
    ]
  },
  ip: {
    title: "Intellectual Property",
    lastUpdated: "April 29, 2026",
    sections: [
      {
        h: "1. Patent Protection",
        p: "Elite Auto technologies are protected under global patent filings covering polymer and adhesive systems."
      },
      {
        h: "2. Pattern Security",
        p: "All design patterns are digitally watermarked and actively monitored for unauthorized distribution."
      },
      {
        h: "3. Brand Control",
        p: "Brand assets are licensed under strict usage guidelines. Any misuse is subject to legal enforcement."
      }
    ]
  }
};

const Legal = () => {
  const [activeTab, setActiveTab] = useState('terms');

  return (
    <div className="pt-28 min-h-screen bg-black text-white pb-32">

      {/* HERO */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto mb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-8 text-accent">
            <Scale size={32} />
          </div>

          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic mb-8">
            Legal <span className="text-accent underline decoration-4 underline-offset-8">Center</span>
          </h1>

          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
            Secure corporate documentation system. Access is logged, monitored, and protected under compliance protocols.
          </p>
        </motion.div>
      </section>

      {/* MAIN */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">

        {/* SIDEBAR */}
        <div className="w-full lg:w-64 space-y-2">

          {[
            { id: 'terms', label: 'Terms of Service', icon: <FileText size={18} /> },
            { id: 'privacy', label: 'Privacy Policy', icon: <Lock size={18} /> },
            { id: 'ip', label: 'Intellectual Property', icon: <Shield size={18} /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all
              ${activeTab === tab.id
                  ? 'bg-accent text-black shadow-lg'
                  : 'bg-white/5 text-gray-500 hover:bg-white/10'
                }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}

          {/* SECURITY NOTICE */}
          <div className="pt-12 mt-12 border-t border-white/5">
            <div className="p-6 bg-black/40 border border-white/10 rounded-2xl">
              <AlertTriangle className="text-accent mb-4" size={20} />
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest leading-relaxed">
                All legal access is monitored and recorded for compliance auditing.
                Unauthorized attempts are automatically logged.
              </p>
            </div>
          </div>

        </div>

        {/* CONTENT */}
        <div className="flex-1 bg-secondary/10 border border-white/5 rounded-[40px] p-8 md:p-16 min-h-[600px]">

          {/* HEADER */}
          <div className="flex justify-between items-start mb-12 pb-8 border-b border-white/5">

            <div>
              <h2 className="text-3xl font-black uppercase tracking-tight mb-2">
                {legalContent[activeTab].title}
              </h2>

              <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">
                Last Updated: {legalContent[activeTab].lastUpdated}
              </p>
            </div>

            <div className="flex items-center gap-2 text-accent text-xs font-black uppercase tracking-widest">
              <Lock size={18} />
              SECURED
            </div>

          </div>

          {/* SECTIONS */}
          <div className="space-y-12">
            {legalContent[activeTab].sections.map((section, idx) => (
              <div key={idx} className="space-y-4">
                <h3 className="text-xl font-black uppercase tracking-tight italic text-white">
                  {section.h}
                </h3>
                <p className="text-gray-400 leading-relaxed font-medium text-lg">
                  {section.p}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FOOTER COMPLIANCE */}
      <section className="mt-32 px-4 md:px-8 max-w-5xl mx-auto text-center opacity-30">
        <p className="text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] leading-loose">
          ELITE AUTO LEGAL SYSTEM IS MONITORED AND ENCRYPTED. ALL ACCESS IS LOGGED FOR COMPLIANCE AUDITING PURPOSES. © 2026 ELITE AUTO MANUFACTURING CORP.
        </p>
      </section>

    </div>
  );
};

export default Legal;