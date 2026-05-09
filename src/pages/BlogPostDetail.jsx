import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, User, Clock, ChevronLeft, Tag } from 'lucide-react';
import { blogPosts } from '../data/blogData';

const BlogPostDetail = () => {
  const { id } = useParams();
  const post = blogPosts.find(p => p.id === parseInt(id)) || blogPosts.find(p => p.slug === id);
  
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!post) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
        <h1 className="text-4xl font-black mb-6">Article Not Found</h1>
        <Link to="/blog" className="text-accent flex items-center gap-2 font-black uppercase tracking-widest">
          <ChevronLeft size={20} /> Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20">
      {/* Header / Hero */}
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 hover:text-accent transition-colors mb-8 group"
          >
            <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Journal
          </Link>
          
          <div className="flex items-center gap-4 mb-6">
            <span className="bg-accent text-black text-[10px] font-black uppercase tracking-widest px-3 py-1 skew-x-[-15deg]">
              {post.category}
            </span>
            <div className="h-[1px] flex-1 bg-white/10" />
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-none mb-8">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-8 text-[10px] font-black uppercase tracking-widest text-gray-500 border-b border-white/5 pb-12">
            <div className="flex items-center gap-2">
              <User size={14} className="text-accent" /> {post.author}
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-accent" /> {post.date}
            </div>
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-accent" /> 6 Min Read
            </div>
          </div>
        </motion.div>
      </div>

      {/* Featured Image */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="container mx-auto px-6 max-w-7xl mb-20"
      >
        <div className={`aspect-[21/9] rounded-3xl overflow-hidden border border-white/10 relative ${post.image}`}>
          {post.imageUrl && (
            <img 
              src={post.imageUrl} 
              alt={post.title} 
              className="w-full h-full object-cover opacity-100"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        </div>
      </motion.div>

      {/* Content */}
      <div className="container mx-auto px-6 max-w-7xl flex flex-col lg:flex-row gap-16">
        {/* Sidebar */}
        <aside className="lg:w-1/4 order-2 lg:order-1">
          <div className="sticky top-32 space-y-12">
            {/* Tags */}
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 mb-6">Related Tags</h4>
              <div className="flex flex-wrap gap-2">
                {post.tags?.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-widest text-gray-400">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Newsletter Mini */}
            <div className="p-8 bg-secondary/30 border border-white/5 rounded-2xl overflow-hidden">
              <AnimatePresence mode="wait">
                {!subscribed ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <h4 className="text-xl font-black uppercase tracking-tighter mb-4 italic">Get Weekly Updates</h4>
                    <p className="text-xs text-gray-500 uppercase font-bold tracking-widest leading-relaxed mb-6">Technical deep dives delivered to your inbox.</p>
                    <form onSubmit={handleSubscribe}>
                      <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email Address" 
                        className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-xs outline-none mb-4 focus:border-accent text-white"
                      />
                      <button type="submit" className="w-full bg-accent text-black font-black uppercase tracking-widest text-[10px] py-3 rounded-lg hover:bg-white transition-colors">
                        Subscribe
                      </button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="thanks"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-4"
                  >
                    <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 text-black">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <h4 className="text-lg font-black uppercase tracking-tighter mb-2 italic">Thanks!</h4>
                    <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest leading-relaxed">We will send you our new updates.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </aside>

        {/* Main Article Body */}
        <article className="lg:w-3/4 order-1 lg:order-2">
          <div 
            className="blog-content max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />


          <div className="mt-20 pt-12 border-t border-white/10 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center font-black text-black">
                {post.author.charAt(0)}
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Written by</p>
                <p className="font-black uppercase tracking-tight">{post.author}</p>
              </div>
            </div>
            <button className="flex items-center gap-2 text-accent font-black uppercase text-[10px] tracking-[0.3em] hover:text-white transition-colors">
              Next Article <ChevronRight size={14} />
            </button>
          </div>
        </article>
      </div>

      {/* Recommended */}
      <section className="container mx-auto px-6 max-w-7xl mt-32">
        <h3 className="text-xs font-black text-accent uppercase tracking-[0.5em] mb-12">Keep Reading</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.filter(p => p.id !== post.id).slice(0, 3).map(rec => (
            <Link to={`/blog/${rec.id}`} key={rec.id} className="group">
              <div className={`aspect-video rounded-xl overflow-hidden mb-6 border border-white/5 relative ${rec.image}`}>
                 {rec.imageUrl && <img src={rec.imageUrl} className="w-full h-full object-cover opacity-100 group-hover:scale-105 transition-transform duration-700" alt={rec.title} />}
              </div>
              <h4 className="text-xl font-black uppercase tracking-tight group-hover:text-accent transition-colors">{rec.title}</h4>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

const ChevronRight = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
);

export default BlogPostDetail;

