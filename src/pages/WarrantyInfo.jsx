import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, AlertCircle, FileText, CheckCircle2, XCircle, Settings, Zap, Search } from 'lucide-react';
import { filmVariants } from '../data/filmVariants';

const WarrantyInfo = () => {
  return (
    <div className="pt-28 min-h-screen bg-black text-white pb-32 selection:bg-accent selection:text-black">
      {/* Hero Section */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-8 text-accent shadow-[0_0_40px_rgba(0,174,239,0.2)]">
            <ShieldCheck size={48} />
          </div>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic mb-6">
            Starkx <span className="text-accent underline decoration-4 underline-offset-8">Guarantee</span>
          </h1>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed font-medium">
            We don't just sell film; we sell peace of mind. Our global warranty program is engineered to protect your investment for the long haul, backed by the industry's most rigorous testing standards.
          </p>
        </motion.div>
      </section>

      {/* Warranty Tiers Table */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto mb-32">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-y-4">
            <thead>
              <tr className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
                <th className="px-8 py-4">Product Tier</th>
                <th className="px-8 py-4">Duration</th>
                <th className="px-8 py-4">Coverage Scope</th>
                <th className="px-8 py-4 text-center">Transferable</th>
              </tr>
            </thead>
            <tbody>
              {filmVariants.map((tier, idx) => (
                <motion.tr 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-secondary/20 border border-white/5 rounded-2xl group hover:bg-secondary/40 transition-colors"
                >
                  <td className="px-8 py-8 rounded-l-2xl">
                    <span className="text-xl font-black uppercase tracking-tight text-white group-hover:text-accent transition-colors">{tier.name}</span>
                  </td>
                  <td className="px-8 py-8 font-bold text-accent italic text-lg">{tier.warranty}</td>
                  <td className="px-8 py-8">
                    <div className="flex flex-wrap gap-2">
                      {tier.features.map((c, i) => (
                        <span key={i} className="bg-white/5 text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded text-gray-400">{c}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-8 py-8 rounded-r-2xl text-center font-bold text-gray-300">
                    Yes (One-time)
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* What's Covered / Not Covered */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto mb-32 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-green-500/5 border border-green-500/20 rounded-3xl p-10">
          <h3 className="text-2xl font-black uppercase tracking-tight mb-8 flex items-center gap-3 text-green-400">
            <CheckCircle2 size={28} /> Full Coverage
          </h3>
          <ul className="space-y-4 text-gray-400 font-medium leading-relaxed">
            <li>• Manufacturing defects in the film's structure.</li>
            <li>• Significant yellowing or staining that cannot be cleaned.</li>
            <li>• Premature cracking or blistering under normal use.</li>
            <li>• Adhesive failure or delamination from original paint.</li>
          </ul>
        </div>
        <div className="bg-red-500/5 border border-red-500/20 rounded-3xl p-10">
          <h3 className="text-2xl font-black uppercase tracking-tight mb-8 flex items-center gap-3 text-red-400">
            <XCircle size={28} /> Not Covered
          </h3>
          <ul className="space-y-4 text-gray-400 font-medium leading-relaxed">
            <li>• Damage caused by accidents, collisions, or vandalism.</li>
            <li>• Lifting caused by high-pressure washing (improper distance).</li>
            <li>• Normal wear and tear or track-day extreme rock impacts.</li>
            <li>• Application by non-certified or unauthorized installers.</li>
          </ul>
        </div>
      </section>

      {/* Claim Process */}
      <section className="px-4 md:px-8 max-w-5xl mx-auto mb-32">
        <h3 className="text-3xl font-black uppercase tracking-tight mb-16 text-center italic">The Claim Process</h3>
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-white/10 hidden md:block" />
          <div className="space-y-12">
            {[
              { title: "Documentation", desc: "Keep your original invoice and the installer's certificate of warranty.", icon: <FileText /> },
              { title: "Inspection", desc: "Contact your original installer for a physical audit of the defect.", icon: <Search /> },
              { title: "Approval", desc: "Our technical team reviews the audit and approves the material replacement.", icon: <Settings /> },
              { title: "Replacement", desc: "Fresh film is dispatched to your dealer for immediate re-installation.", icon: <Zap /> }
            ].map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-start gap-8 relative"
              >
                <div className="w-16 h-16 bg-secondary border border-white/10 rounded-2xl flex items-center justify-center text-accent shrink-0 relative z-10 shadow-2xl">
                  {step.icon}
                </div>
                <div>
                  <h4 className="text-xl font-black uppercase tracking-tight mb-2">{step.title}</h4>
                  <p className="text-gray-500 leading-relaxed font-medium">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="px-4 md:px-8 max-w-4xl mx-auto text-center opacity-40">
        <div className="flex justify-center mb-6 text-gray-500"><AlertCircle size={40} /></div>
        <p className="text-[10px] font-bold uppercase tracking-widest leading-loose">
          Starkx Auto Manufacturing Corp reserves the right to inspect any claim physically or digitally before approval. Replacement coverage is limited to material costs only unless otherwise specified by your certified dealer's labor agreement. Void where prohibited by law.
        </p>
      </section>
    </div>
  );
};

export default WarrantyInfo;
