import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogData';

const Articles = () => {
  // Use the first 3 posts for the home page display
  const articles = blogPosts.slice(0, 3);

  return (
    <section id="articles" className="py-20 bg-primary">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-14 gap-8">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-xs font-black text-accent uppercase tracking-[0.5em] mb-4"
            >
              The Journal
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-black uppercase tracking-tighter"
            >
              News & Innovation
            </motion.p>
          </div>
          <Link to="/blog" className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 hover:text-white transition-colors pb-4 border-b border-transparent hover:border-white">
            Browse All Articles
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {articles.map((article, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group"
            >
              <Link to={`/blog/${article.id}`}>
                <div className="relative aspect-[16/10] bg-secondary overflow-hidden mb-8 border border-white/5">
                  {article.imageUrl ? (
                    <img 
                      src={article.imageUrl} 
                      alt={article.title} 
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" 
                    />
                  ) : (
                    <div className={`w-full h-full ${article.image}`} />
                  )}
                  <div className="absolute top-6 left-6 bg-accent text-black px-4 py-1 text-[10px] font-black uppercase tracking-widest skew-x-[-15deg]">
                    {article.category}
                  </div>
                </div>

                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent mb-4 block">
                  {article.date}
                </span>
                <h3 className="text-2xl font-black uppercase tracking-[0.02em] mb-4 leading-tight group-hover:text-accent transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-400 font-medium leading-relaxed line-clamp-2">
                  {article.excerpt}
                </p>
                
                <div className="mt-8 flex items-center gap-4 group-hover:gap-6 transition-all">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Read Full Story</span>
                  <div className="flex-1 h-[1px] bg-white/10 group-hover:bg-accent transition-colors" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Articles;

