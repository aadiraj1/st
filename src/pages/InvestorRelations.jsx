import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, FileText, PieChart, BarChart, Download, Newspaper, ExternalLink } from 'lucide-react';

const reports = [
  { title: "2025 Annual Report", type: "PDF", size: "12.4 MB" },
  { title: "Q1 2026 Financial Results", type: "PDF", size: "4.8 MB" },
  { title: "Sustainability Report 2025", type: "PDF", size: "8.2 MB" },
  { title: "Corporate Governance PDF", type: "PDF", size: "2.1 MB" }
];

const InvestorRelations = () => {
  return (
    <div className="pt-28 min-h-screen bg-black text-white pb-32">
      {/* Hero Section */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30 text-accent px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-8">
            Growth & Governance
          </div>
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic mb-8">
            Investor <span className="text-accent underline decoration-4 underline-offset-8">Relations</span>
          </h1>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed font-medium">
            Elite Auto Protection is committed to delivering long-term value to our shareholders through relentless innovation and global market expansion.
          </p>
        </motion.div>
      </section>

      {/* Stock Overview (Mock) */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto mb-32">
         <div className="bg-secondary/20 border border-white/5 p-12 rounded-[40px] flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 space-y-4 text-center lg:text-left">
               <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Stock Information (EAP: NASDAQ)</div>
               <div className="flex items-center justify-center lg:justify-start gap-6">
                  <span className="text-6xl md:text-8xl font-black italic">$428.15</span>
                  <div className="flex flex-col text-green-400 font-bold">
                     <span className="flex items-center gap-1"><TrendingUp size={20} /> +2.4%</span>
                     <span className="text-[10px] uppercase tracking-widest">Since Open</span>
                  </div>
               </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 w-full lg:w-auto">
               {[
                 { label: "Market Cap", value: "$4.2B" },
                 { label: "PE Ratio", value: "32.4" },
                 { label: "Dividend", value: "$1.20" }
               ].map((stat, idx) => (
                 <div key={idx} className="bg-white/5 p-6 rounded-2xl border border-white/5">
                    <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-1">{stat.label}</p>
                    <p className="text-xl font-black">{stat.value}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Reports Grid */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto mb-32">
         <h3 className="text-3xl font-black uppercase tracking-tight mb-12 italic flex items-center gap-4">
            <FileText className="text-accent" /> Financial Reporting
         </h3>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reports.map((report, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="bg-secondary/30 border border-white/10 p-8 rounded-3xl flex flex-col h-full group"
              >
                 <div className="w-12 h-12 bg-accent/10 border border-accent/20 rounded-xl flex items-center justify-center text-accent mb-8 group-hover:bg-accent group-hover:text-black transition-all">
                    <PieChart size={24} />
                 </div>
                 <h4 className="text-xl font-black uppercase tracking-tight mb-4 flex-1">{report.title}</h4>
                 <div className="flex justify-between items-center pt-6 border-t border-white/5">
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{report.size} • {report.type}</span>
                    <button className="text-accent hover:text-white transition-colors"><Download size={20} /></button>
                 </div>
              </motion.div>
            ))}
         </div>
      </section>

      {/* Newsroom */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto">
         <div className="flex justify-between items-end mb-16">
            <h3 className="text-4xl font-black uppercase tracking-tight italic flex items-center gap-4">
               <Newspaper className="text-accent" /> Corporate News
            </h3>
            <button className="text-[10px] font-black text-gray-500 uppercase tracking-widest hover:text-white transition-colors">View All Press Releases</button>
         </div>
         <div className="space-y-6">
            {[
              { date: "May 02, 2026", title: "Elite Auto Protection Announces Q1 2026 Earnings with 45% YOY Growth.", source: "Press Release" },
              { date: "April 15, 2026", title: "New Strategic Partnership with Global Logistics Leader for Middle East Expansion.", source: "Corporate Update" },
              { date: "March 28, 2026", title: "Elite Auto Protection to Participate in Upcoming Investor Conference in NYC.", source: "Events" }
            ].map((news, idx) => (
              <div key={idx} className="bg-secondary/10 border border-white/5 p-8 rounded-3xl flex flex-col md:flex-row justify-between items-center hover:bg-secondary/30 transition-all cursor-pointer">
                 <div className="flex flex-col gap-2 mb-6 md:mb-0">
                    <span className="text-[10px] font-black text-accent uppercase tracking-widest">{news.date} • {news.source}</span>
                    <h4 className="text-xl font-black uppercase tracking-tight">{news.title}</h4>
                 </div>
                 <ExternalLink size={20} className="text-gray-600" />
              </div>
            ))}
         </div>
      </section>

      {/* Contact IR */}
      <section className="mt-32 px-4 md:px-8 max-w-4xl mx-auto text-center">
         <div className="bg-accent/5 border border-accent/20 p-12 rounded-[40px]">
            <BarChart size={40} className="mx-auto mb-6 text-accent" />
            <h4 className="text-2xl font-black uppercase tracking-tight mb-4 italic">Investor Contact</h4>
            <p className="text-gray-400 mb-8 font-medium">For inquiries related to shareholder services or financial reporting, please contact our IR team.</p>
            <a href="mailto:investors@eliteauto.com" className="text-[10px] font-black text-white uppercase tracking-widest underline underline-offset-4 hover:text-accent transition-colors">investors@eliteauto.com</a>
         </div>
      </section>
    </div>
  );
};

export default InvestorRelations;
