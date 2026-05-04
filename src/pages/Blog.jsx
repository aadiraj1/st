import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { Link } from 'react-router-dom';
import { Search, Tag, Calendar, User, ChevronRight, Share2 } from 'lucide-react';
import { blogPosts } from '../data/blogData';

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Technical', 'Guides', 'Maintenance', 'Events'];

  const filteredPosts = activeCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);

  return (
    <div className="pt-28 min-h-screen bg-black text-white pb-20">
      {/* Hero Section */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic mb-6">
            Elite <span className="text-accent underline decoration-4 underline-offset-8">Insights</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto font-bold uppercase text-xs tracking-[0.3em]">
            Deep Dives, Technical Analysis, and Global Updates
          </p>
        </motion.div>

        {/* Featured Post */}
        {blogPosts.filter(p => p.featured).map(post => (
          <motion.div 
            key={post.id}
            whileHover={{ scale: 1.01 }}
            className="relative bg-secondary/30 border border-white/10 rounded-3xl overflow-hidden flex flex-col lg:flex-row mb-16 group"
          >
            <div className={`w-full lg:w-1/2 h-80 lg:h-auto ${post.image} relative`}>
               {post.imageUrl && <img src={post.imageUrl} className="w-full h-full object-cover opacity-50" alt={post.title} />}
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
            </div>
            <div className="p-8 lg:p-12 flex-1 flex flex-col justify-center">
              <span className="inline-block bg-accent text-black font-black uppercase tracking-widest text-[10px] px-3 py-1 mb-6 skew-x-[-15deg]">Featured Article</span>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-6 group-hover:text-accent transition-colors">{post.title}</h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed line-clamp-3">{post.excerpt}</p>
              <div className="flex flex-wrap items-center justify-between gap-8 pt-8 border-t border-white/5">
                <div className="flex items-center gap-6 text-xs font-bold uppercase tracking-widest text-gray-500">
                  <span className="flex items-center gap-2"><User size={14} className="text-accent" /> {post.author}</span>
                  <span className="flex items-center gap-2"><Calendar size={14} className="text-accent" /> {post.date}</span>
                </div>
                <Link to={`/blog/${post.id}`} className="bg-white text-black px-8 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-accent transition-colors">
                  Read Full Story
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Categories & Search */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto mb-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-b border-white/10 pb-8">
          <div className="flex flex-wrap gap-4">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeCategory === cat ? 'bg-accent text-black' : 'bg-white/5 text-gray-500 hover:text-white'}`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input 
              type="text" 
              placeholder="Search articles..." 
              className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-6 outline-none focus:border-accent text-xs"
            />
          </div>
        </div>
      </section>

      {/* Post Grid */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.filter(p => !p.featured).map((post, idx) => (
            <motion.div 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-secondary/20 border border-white/5 rounded-2xl overflow-hidden hover:border-accent/30 transition-all group flex flex-col"
            >
              <div className={`h-48 ${post.image} relative`}>
                {post.imageUrl && <img src={post.imageUrl} className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700" alt={post.title} />}
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-[10px] font-black uppercase tracking-widest px-3 py-1 text-accent">
                  {post.category}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-black uppercase tracking-tight mb-4 group-hover:text-accent transition-colors">{post.title}</h3>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed line-clamp-3">{post.excerpt}</p>
                <div className="mt-auto flex justify-between items-center pt-6 border-t border-white/5">
                  <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">{post.date}</span>
                  <Link to={`/blog/${post.id}`} className="flex items-center gap-2 text-accent font-black uppercase text-[10px] tracking-widest hover:text-white transition-colors">
                    Read More <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="mt-32 px-4 md:px-8 max-w-5xl mx-auto">
        <NewsletterCard />
      </section>
    </div>
  );
};

const NewsletterCard = () => {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <div className="bg-accent/10 border border-accent/20 rounded-3xl p-12 text-center relative overflow-hidden">
      <AnimatePresence mode="wait">
        {!subscribed ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <h2 className="text-3xl font-black uppercase tracking-tighter italic mb-4">Stay Ahead of the Curve</h2>
            <p className="text-gray-400 uppercase text-[10px] font-black tracking-[0.2em] mb-8">Get technical updates and industry news delivered weekly.</p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email" 
                className="flex-1 bg-black/40 border border-white/10 rounded-lg px-6 py-4 outline-none focus:border-accent text-white"
              />
              <button type="submit" className="bg-accent text-black font-black uppercase tracking-widest text-xs px-8 py-4 hover:bg-white transition-all shadow-[0_10px_20px_rgba(0,174,239,0.2)]">
                Subscribe
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="thanks"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-8"
          >
            <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6 text-black">
               <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <h2 className="text-3xl font-black uppercase tracking-tighter italic mb-4">Thank you for subscribing!</h2>
            <p className="text-gray-400 uppercase text-[10px] font-black tracking-[0.2em]">We will send you our new updates soon.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


export default Blog;

