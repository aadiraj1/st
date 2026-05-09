import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Shield, Zap, Droplets, Layers, ArrowLeft, CheckCircle2, ChevronRight } from 'lucide-react';
import { filmVariants } from '../data/filmVariants';

const FilmVariantDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const variant = filmVariants.find(v => v.slug === slug);
  const { scrollY } = useScroll();

  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    if (!variant) {
      navigate('/shop/film-variants');
    }
    window.scrollTo(0, 0);
  }, [variant, navigate]);

  if (!variant) return null;

  return (
    <div className="min-h-screen bg-black text-white selection:bg-accent selection:text-black">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ y: y1, opacity }}
          className="absolute inset-0 z-0"
        >
          {/* Video Background */}
          <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-100">
            <source src="/e5818c65-0f63-4627-a57b-217d4cff828a/bck.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black z-10" />
          <div
            className="absolute inset-0 blur-[120px] opacity-20 animate-pulse-slow z-20"
            style={{ backgroundColor: variant.color }}
          />
          {/* Abstract background elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full animate-spin-slow z-10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-accent/10 rounded-full animate-reverse-spin z-10" />
        </motion.div>

        <div className="container mx-auto px-6 relative z-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link to="/shop/film-variants" className="inline-flex items-center gap-2 text-accent text-xs font-black uppercase tracking-[0.3em] mb-12 hover:gap-4 transition-all">
              <ArrowLeft size={14} /> Back to variants
            </Link>
            <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter italic mb-6">
              {variant.name} <span className="text-accent underline decoration-4 underline-offset-[12px]">{variant.thickness}</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto font-medium leading-relaxed">
              {variant.desc}
            </p>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-500">Technical Deep Dive</span>
          <div className="w-px h-12 bg-gradient-to-b from-accent to-transparent" />
        </motion.div>
      </section>

      {/* Specifications Grid */}
      <section className="py-12 relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-black uppercase tracking-tight mb-12">Manufacturing Excellence</h2>
              <div className="space-y-8">
                {Object.entries(variant.detailedSpecs).map(([key, value], idx) => (
                  <div key={key} className="group border-b border-white/5 pb-6">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-2">{key}</p>
                    <div className="flex justify-between items-end">
                      <p className="text-2xl font-bold text-white group-hover:text-accent transition-colors">{value}</p>
                      <div className="w-12 h-1 bg-white/5 group-hover:w-24 group-hover:bg-accent transition-all duration-500" />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square"
            >
              <div className="absolute inset-0 bg-accent/5 rounded-[40px] rotate-3 blur-3xl" />
              <div className="relative h-full bg-secondary/30 border border-white/5 rounded-[40px] p-12 flex flex-col justify-center items-center overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <Layers size={120} className="text-accent mb-12 animate-pulse-slow" />
                <div className="text-center">
                  <h3 className="text-3xl font-black uppercase tracking-tight mb-4">Multi-Layer Tech</h3>
                  <p className="text-gray-400 font-medium max-w-sm">Every mil of {variant.name} is engineered with six distinct layers of polymer protection.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-32 bg-secondary/20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic">Why Choose {variant.name}?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {variant.features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-black/40 border border-white/5 p-10 rounded-3xl hover:border-accent/30 transition-all"
              >
                <CheckCircle2 size={32} className="text-accent mb-8" />
                <h4 className="text-xl font-black uppercase tracking-tight mb-4">{feature}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">Engineered to exceed industry standards for {feature.toLowerCase()}, ensuring your vehicle maintains its showroom shine.</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Visualizer Mockup */}
      <section className="py-32 border-t border-white/5">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-black uppercase tracking-[0.2em] mb-16">Visualizing <span className="text-accent">{variant.thickness}</span></h2>
          <div className="max-w-4xl mx-auto h-4 bg-white/5 rounded-full relative overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${(parseFloat(variant.thickness) / 9.5) * 100}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "circOut" }}
              className="absolute inset-y-0 left-0 bg-accent shadow-[0_0_20px_rgba(0,174,239,0.8)]"
            />
          </div>
          <div className="flex justify-between mt-6 text-[10px] font-black text-gray-500 uppercase tracking-widest">
            <span>0 MIL</span>
            <span>PROTECTION DEPTH</span>
            <span>9.5 MIL</span>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-18 pb-32" >
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-accent p-12 md:p-24 rounded-[40px] text-black text-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/20 rounded-full blur-[100px] -mr-48 -mt-48" />
            <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter italic mb-8 relative z-10">Ready to Protect?</h2>
            <div className="flex flex-col md:flex-row justify-center gap-6 relative z-10">
              <button
                onClick={() => navigate('/roll-inquiry', { state: { product: { name: variant.name, type: "Roll Order" } } })}
                className="bg-black text-white px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-all"
              >
                Inquire Now
              </button>

              <Link to="/shop/film-variants" className="bg-white/20 backdrop-blur-md px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white transition-all">
                Explore Other Tiers
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default FilmVariantDetail;
