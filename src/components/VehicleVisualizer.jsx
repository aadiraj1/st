import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Shield, Zap, Star } from 'lucide-react';

const packages = [
  {
    id: "essential",
    name: "Essential Front",
    icon: Shield,
    badge: "Starter",
    color: "#00AEEF",
    desc: "18-24 inches of the hood and fenders, plus the front bumper and mirror caps.",
    coverage: "~30%",
    zones: ["bumper", "hood-partial", "mirrors"],
    highlights: ["Front Bumper", "Partial Hood (18-24\")", "Mirror Caps", "Front Fender Tips"]
  },
  {
    id: "track",
    name: "Track Pack",
    icon: Zap,
    badge: "Popular",
    color: "#00AEEF",
    desc: "Complete front end, full hood, full fenders, mirrors, and lower rocker panels.",
    coverage: "~60%",
    zones: ["bumper", "hood-full", "mirrors", "rockers"],
    highlights: ["Full Hood", "Full Front Bumper", "Both Mirrors", "Rocker Panels", "Full Fenders"]
  },
  {
    id: "full",
    name: "Full Vehicle",
    icon: Star,
    badge: "Complete",
    color: "#00AEEF",
    desc: "Every painted surface is wrapped and edges are tucked for invisible protection.",
    coverage: "100%",
    zones: ["bumper", "hood-full", "mirrors", "rockers", "doors", "roof", "rear"],
    highlights: ["All Panels", "Roof", "Doors & Pillars", "Rear Bumper", "Trunk", "Full Rockers"]
  }
];

const VehicleVisualizer = () => {
  const [activePkg, setActivePkg] = useState(packages[1]);
  const [animating, setAnimating] = useState(false);
  const carRef = useRef(null);

  const isActive = (zone) =>
    activePkg.zones.includes(zone)
      ? "bg-accent/80 shadow-[0_0_18px_rgba(0,174,239,0.6)] border-accent"
      : "bg-white/5 border-white/10";

  const selectPackage = useCallback((pkg) => {
    if (pkg.id === activePkg.id) return;
    setAnimating(true);
    setActivePkg(pkg);
    setTimeout(() => setAnimating(false), 600);

    // On mobile: auto-scroll to the car wireframe so user can see what changed
    if (window.innerWidth < 1024 && carRef.current) {
      setTimeout(() => {
        carRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 80);
    }
  }, [activePkg.id]);

  const IconComponent = activePkg.icon;

  return (
    <section className="py-12 md:py-20 bg-secondary/30 relative border-t border-white/5 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">

        {/* Section Header */}
        <div className="text-center mb-10 md:mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[10px] font-black text-accent uppercase tracking-[0.6em] mb-3"
          >
            Interactive Coverage
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black uppercase tracking-tighter"
          >
            Visualize Your Protection
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1, transition: { delay: 0.2 } }}
            className="text-sm text-gray-400 mt-4 max-w-md mx-auto"
          >
            Tap a package below — the car updates instantly to show exactly what gets protected.
          </motion.p>
        </div>

        {/* Package Selector Tabs — grid on mobile, row on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 md:mb-16">
          {packages.map((pkg) => {
            const Icon = pkg.icon;
            const isSelected = activePkg.id === pkg.id;
            return (
              <button
                key={pkg.id}
                onClick={() => selectPackage(pkg)}
                className={`relative group flex items-center md:flex-col gap-5 md:gap-3 p-5 md:py-6 md:px-4 rounded-[24px] border transition-all duration-500 overflow-hidden ${
                  isSelected
                    ? 'border-accent bg-accent/10 shadow-[0_20px_40px_rgba(0,174,239,0.15)] scale-[1.02] z-10'
                    : 'border-white/5 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05]'
                }`}
              >
                {/* Background glow on hover/selected */}
                <div className={`absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent transition-opacity duration-500 ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                
                <div className={`w-12 h-12 md:w-10 md:h-10 rounded-xl flex items-center justify-center transition-all duration-500 relative z-10 ${isSelected ? 'bg-accent text-black rotate-0' : 'bg-white/5 text-gray-500 rotate-3 group-hover:rotate-0 group-hover:text-white'}`}>
                  <Icon size={20} />
                </div>

                <div className="flex-1 text-left md:text-center relative z-10">
                  <div className="flex items-center md:justify-center gap-2 mb-1">
                    <span className={`text-sm md:text-[11px] font-black uppercase tracking-widest ${isSelected ? 'text-accent' : 'text-gray-400 group-hover:text-white'}`}>
                      {pkg.name}
                    </span>
                    {isSelected && (
                      <span className="md:hidden text-[8px] font-black uppercase tracking-widest bg-accent text-black px-2 py-0.5 rounded-full">
                        {pkg.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter md:hidden">
                    {pkg.desc.split('.')[0]}
                  </p>
                </div>

                {isSelected && (
                  <motion.div
                    layoutId="activeBorder"
                    className="absolute bottom-0 left-0 w-full h-1 bg-accent hidden md:block"
                  />
                )}
                
                {/* Mobile Badge */}
                <div className="hidden md:block">
                  {isSelected && (
                    <motion.span
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-[9px] font-black uppercase tracking-widest bg-accent text-black px-3 py-1 rounded-full mt-2 inline-block"
                    >
                      {pkg.badge}
                    </motion.span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">

          {/* LEFT: Car wireframe — appears FIRST on mobile so user sees it update */}
          <div
            ref={carRef}
            className="w-full lg:w-1/2 flex justify-center py-10 relative order-1 lg:order-2"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,174,239,0.06)_0%,transparent_65%)] pointer-events-none" />

            {/* Active package name — floating label above car */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activePkg.id + "-label"}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-2 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 bg-primary/80 backdrop-blur-md border border-accent/30 rounded-full px-4 py-2"
              >
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-accent">
                  {activePkg.name}
                </span>
                <span className="text-[10px] font-bold text-gray-400">— {activePkg.coverage} covered</span>
              </motion.div>
            </AnimatePresence>

            {/* Top-Down Car */}
            <motion.div
              key={activePkg.id}
              initial={{ scale: 0.97, opacity: 0.6 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative w-full max-w-[240px] md:max-w-[300px] h-[520px] md:h-[600px] border-2 border-white/10 rounded-[60px] p-4 flex flex-col gap-2"
            >
              {/* Front Bumper */}
              <div className={`w-full h-8 rounded-t-[40px] border transition-all duration-500 ease-out ${isActive('bumper')}`} />

              {/* Hood Area */}
              <div className="flex w-full h-28 md:h-32 gap-2">
                <div className={`w-1/2 h-full rounded-tl-xl border transition-all duration-500 ease-out ${isActive(activePkg.id === 'essential' ? 'hood-partial' : 'hood-full')} ${activePkg.id === 'essential' ? 'h-1/2 self-start' : ''}`} />
                <div className={`w-1/2 h-full rounded-tr-xl border transition-all duration-500 ease-out ${isActive(activePkg.id === 'essential' ? 'hood-partial' : 'hood-full')} ${activePkg.id === 'essential' ? 'h-1/2 self-start' : ''}`} />
              </div>

              {/* Cabin Area */}
              <div className="flex w-full h-44 md:h-48 gap-2 relative">
                {/* Mirrors */}
                <div className={`absolute -left-6 top-4 w-4 h-6 rounded-l-full border transition-all duration-500 ease-out ${isActive('mirrors')}`} />
                <div className={`absolute -right-6 top-4 w-4 h-6 rounded-r-full border transition-all duration-500 ease-out ${isActive('mirrors')}`} />

                {/* Rockers / Doors */}
                <div className={`w-4 h-full rounded-l-md border transition-all duration-500 ease-out ${isActive('rockers')} ${isActive('doors')}`} />
                <div className={`flex-1 h-full rounded-md border transition-all duration-500 ease-out ${isActive('roof')}`} />
                <div className={`w-4 h-full rounded-r-md border transition-all duration-500 ease-out ${isActive('rockers')} ${isActive('doors')}`} />
              </div>

              {/* Rear Section */}
              <div className={`w-full flex-1 rounded-b-[40px] border transition-all duration-500 ease-out ${isActive('rear')}`} />
            </motion.div>

            {/* Legend */}
            <div className="absolute bottom-3 right-4 md:right-10 flex items-center gap-3 bg-primary/90 border border-white/10 px-4 py-2 rounded-full">
              <div className="w-3 h-3 bg-accent shadow-[0_0_10px_#00AEEF] animate-pulse rounded-full" />
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">Protected</span>
            </div>
          </div>

          {/* RIGHT: Details panel */}
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePkg.id + "-details"}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
              >
                {/* Package header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-accent/10 border border-accent/30 rounded-2xl flex items-center justify-center">
                    <IconComponent size={22} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-accent mb-1">{activePkg.badge} Package</p>
                    <h3 className="text-2xl font-black uppercase tracking-tighter">{activePkg.name}</h3>
                  </div>
                  <div className="ml-auto text-right">
                    <p className="text-3xl font-black text-accent">{activePkg.coverage}</p>
                    <p className="text-[9px] text-gray-500 uppercase tracking-widest font-bold">Coverage</p>
                  </div>
                </div>

                <p className="text-sm text-gray-400 leading-relaxed mb-8 border-l-2 border-accent/30 pl-4">
                  {activePkg.desc}
                </p>

                {/* What's included grid */}
                <p className="text-[9px] font-black uppercase tracking-widest text-gray-500 mb-4">What's Protected</p>
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {activePkg.highlights.map((item, i) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06 }}
                      className="flex items-center gap-3 bg-white/5 border border-white/8 rounded-xl px-4 py-3"
                    >
                      <div className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" />
                      <span className="text-xs font-bold text-gray-300">{item}</span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => {
                    const mapSection = document.getElementById('dealer-map');
                    if (mapSection) mapSection.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full bg-accent text-black py-4 font-black text-[11px] uppercase tracking-[0.25em] hover:bg-white transition-all duration-300 rounded-none flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(0,174,239,0.3)]"
                >
                  Find Installer for {activePkg.name}
                  <ChevronRight size={16} />
                </button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VehicleVisualizer;
