import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, ZoomOut, RotateCcw, Search, MapPin as MapPinIcon, X, Globe } from 'lucide-react';

const locations = [
  { top: "25%", left: "20%", name: "Calgary PPF Pros", location: "Calgary", country: "Canada" },
  { top: "32%", left: "22%", name: "PPF Guys", location: "Ontario", country: "Canada" },
  { top: "35%", left: "24%", name: "Toronto PPF XPEL", location: "Ontario", country: "Canada" },
  { top: "38%", left: "18%", name: "SRS Tints/PPF", location: "Mississauga", country: "Canada" },
  { top: "43%", left: "13%", name: "ID Protection", location: "Vancouver", country: "Canada" },
  { top: "48%", left: "16%", name: "The PPF Pros", location: "Arizona", country: "USA" },
  { top: "52%", left: "11%", name: "Protective Film Solutions", location: "California", country: "USA" },
  { top: "55%", left: "20%", name: "Houston PPF LLC", location: "Texas", country: "USA" },
  { top: "50%", left: "25%", name: "PPF Auto Spa", location: "Atlanta", country: "USA" },
  { top: "58%", left: "24%", name: "Bespoke PPF Solutions", location: "Sarasota", country: "USA" },
  { top: "42%", left: "30%", name: "Gleamworks Detailing", location: "New York", country: "USA" },
  { top: "26%", left: "46%", name: "DIY PPF", location: "United Kingdom", country: "UK" },
  { top: "28%", left: "44%", name: "Primeautoz", location: "United Kingdom", country: "UK" },
  { top: "29%", left: "47%", name: "Regal PPF", location: "United Kingdom", country: "UK" },
  { top: "31%", left: "45%", name: "SouthWest PPF", location: "United Kingdom", country: "UK" },
  { top: "27%", left: "46%", name: "Detail & Protect Ltd", location: "United Kingdom", country: "UK" },
  { top: "25%", left: "45%", name: "The PPF Experts", location: "United Kingdom", country: "UK" },
  { top: "30%", left: "47%", name: "KING PPF", location: "United Kingdom", country: "UK" },
  { top: "29%", left: "46%", name: "Platinum PPF", location: "United Kingdom", country: "UK" },
  { top: "27%", left: "50%", name: "PPF Group N.V.", location: "Netherlands", country: "Netherlands" },
  { top: "30%", left: "52%", name: "FilmDirect", location: "Germany", country: "Germany" },
  { top: "32%", left: "53%", name: "PPF Germany", location: "Germany", country: "Germany" },
  { top: "20%", left: "55%", name: "Pure Performance Factory", location: "Sweden", country: "Sweden" },
  { top: "25%", left: "62%", name: "PPF Solutions UAB", location: "Lithuania", country: "Lithuania" },
  { top: "26%", left: "62%", name: "PPF Stamp", location: "Lithuania", country: "Lithuania" },
  { top: "48%", left: "65%", name: "SparkPro Islamabad", location: "Islamabad", country: "Pakistan" },
];

const GlobalMap = () => {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedLoc, setSelectedLoc] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const clampPan = useCallback((newX, newY, currentZoom) => {
    if (!containerRef.current) return { x: newX, y: newY };
    const w = containerRef.current.offsetWidth;
    const h = containerRef.current.offsetHeight;
    const maxX = (w * (currentZoom - 1)) / 2;
    const maxY = (h * (currentZoom - 1)) / 2;
    return {
      x: Math.min(Math.max(newX, -maxX), maxX),
      y: Math.min(Math.max(newY, -maxY), maxY),
    };
  }, []);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.5, 4));
  const handleZoomOut = () => {
    setZoom(prev => {
      const nz = Math.max(prev - 0.5, 1);
      if (nz === 1) setPan({ x: 0, y: 0 });
      else setPan(p => clampPan(p.x, p.y, nz));
      return nz;
    });
  };

  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setSearchQuery("");
    setShowResults(false);
    setSelectedLoc(null);
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 0.15 : -0.15;
    setZoom(prev => {
      const nz = Math.min(Math.max(prev + delta, 1), 4);
      if (nz === 1) setPan({ x: 0, y: 0 });
      return nz;
    });
  };

  const focusLocation = useCallback((loc, targetZoom = 3) => {
    if (isMobile) return; // On mobile: no zoom, show overlay card instead
    if (!containerRef.current) return;
    const w = containerRef.current.offsetWidth;
    const h = containerRef.current.offsetHeight;
    const pointX = (parseFloat(loc.left) / 100) * w * targetZoom;
    const pointY = (parseFloat(loc.top) / 100) * h * targetZoom;
    const panX = (w * targetZoom / 2) - pointX;
    const panY = (h * targetZoom / 2) - pointY;
    setZoom(targetZoom);
    setPan(clampPan(panX, panY, targetZoom));
  }, [isMobile, clampPan]);

  const handlePinClick = (loc) => {
    setSelectedLoc(loc);
    focusLocation(loc);
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim().length > 1) {
      const filtered = locations.filter(l =>
        l.country.toLowerCase().includes(query.toLowerCase()) ||
        l.location?.toLowerCase().includes(query.toLowerCase()) ||
        l.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
      setShowResults(true);
    } else {
      setShowResults(false);
      setSearchResults([]);
    }
  };

  const selectLocation = (loc) => {
    setSelectedLoc(loc);
    setSearchQuery(loc.name);
    setShowResults(false);
    focusLocation(loc);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setShowResults(false);
    setSearchResults([]);
    setSelectedLoc(null);
    if (!isMobile) {
      setZoom(1);
      setPan({ x: 0, y: 0 });
    }
  };

  // Filtered locations for map pins
  const visibleLocations = searchQuery.trim().length > 1
    ? locations.filter(l =>
        l.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : locations;

  return (
    <section id="dealer-map" className="py-20 md:py-20 bg-primary relative overflow-hidden">
      {/* Dot grid bg */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(rgba(0,174,239,1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">

        {/* Header Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-10 md:mb-12">
          <div className="flex-1 max-w-2xl">
            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              className="text-[10px] font-black text-accent uppercase tracking-[0.6em] mb-3"
            >
              Manufacturer Authority
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9] mb-6"
            >
              Verified Global <br className="hidden md:block"/> Infrastructure
            </motion.h2>

            {/* Search Bar */}
            <div className="relative max-w-lg">
              <div className="relative">
                <Search
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                  size={18}
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearch}
                  placeholder="Search country, city, or installer name..."
                  className="w-full bg-secondary border border-white/10 rounded-2xl py-4 pl-12 pr-12 text-sm font-semibold text-white focus:border-accent focus:shadow-[0_0_0_3px_rgba(0,174,239,0.15)] outline-none transition-all placeholder:text-gray-600"
                />
                <AnimatePresence>
                  {searchQuery && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      onClick={clearSearch}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all"
                    >
                      <X size={12} />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>

              {/* Dropdown Results */}
              <AnimatePresence>
                {showResults && searchResults.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-secondary border border-white/10 rounded-2xl overflow-hidden z-[200] shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
                  >
                    <div className="max-h-64 overflow-y-auto">
                      {searchResults.map((loc, idx) => (
                        <button
                          key={idx}
                          onClick={() => selectLocation(loc)}
                          className="w-full flex items-center gap-4 px-5 py-3.5 hover:bg-accent/10 transition-colors border-b border-white/5 last:border-0 text-left group"
                        >
                          <div className="w-9 h-9 bg-accent/10 border border-accent/20 rounded-xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-black transition-all flex-shrink-0">
                            <MapPinIcon size={16} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[11px] font-black uppercase tracking-wider text-white truncate">{loc.name}</p>
                            <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">{loc.location} · {loc.country}</p>
                          </div>
                          <span className="text-[8px] font-black uppercase tracking-widest border border-white/10 rounded-full px-2 py-1 text-gray-500 flex-shrink-0">
                            {loc.country}
                          </span>
                        </button>
                      ))}
                    </div>
                    <div className="px-5 py-2.5 bg-white/5 border-t border-white/5">
                      <p className="text-[9px] text-gray-600 font-bold uppercase tracking-widest">
                        {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
                      </p>
                    </div>
                  </motion.div>
                )}
                {showResults && searchResults.length === 0 && searchQuery.length > 1 && (
                  <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-secondary border border-white/10 rounded-2xl px-5 py-6 text-center z-[200]"
                  >
                    <Globe size={28} className="text-gray-600 mx-auto mb-2" />
                    <p className="text-xs font-black uppercase tracking-widest text-gray-500">No installers found for "{searchQuery}"</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Stats + Controls */}
          <div className="flex flex-row md:flex-col items-center md:items-end gap-6 md:gap-4">
            <div className="flex gap-6">
              <div className="text-right">
                <p className="text-2xl md:text-3xl font-black text-white">2.4k+</p>
                <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Installers</p>
              </div>
              <div className="text-right">
                <p className="text-2xl md:text-3xl font-black text-accent">54</p>
                <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Countries</p>
              </div>
            </div>
            {/* Zoom controls — hidden on mobile */}
            <div className="hidden md:flex bg-secondary border border-white/5 p-1.5 rounded-full gap-1">
              <button onClick={handleZoomIn} className="w-9 h-9 flex items-center justify-center hover:bg-accent hover:text-black transition-all rounded-full text-white">
                <ZoomIn size={16} />
              </button>
              <div className="w-[1px] h-4 bg-white/10 self-center" />
              <button onClick={handleZoomOut} className="w-9 h-9 flex items-center justify-center hover:bg-accent hover:text-black transition-all rounded-full text-white">
                <ZoomOut size={16} />
              </button>
              <div className="w-[1px] h-4 bg-white/10 self-center" />
              <button onClick={handleReset} className="w-9 h-9 flex items-center justify-center hover:bg-accent hover:text-black transition-all rounded-full text-white">
                <RotateCcw size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* ─── MAP CONTAINER ─── */}
        <div
          ref={containerRef}
          className="relative w-full h-[420px] md:h-[600px] bg-secondary border border-white/5 overflow-hidden rounded-2xl md:rounded-3xl shadow-[0_0_80px_rgba(0,0,0,0.5)]"
          onWheel={!isMobile ? handleWheel : undefined}
          style={{ cursor: isMobile ? 'default' : (zoom > 1 ? 'grab' : 'default') }}
        >
          {/* Scan line */}
          <motion.div
            animate={{ top: ["-10%", "110%"] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 w-full h-[8%] bg-gradient-to-b from-transparent via-accent/8 to-transparent z-10 pointer-events-none"
          />

          {/* Pannable / zoomable inner — DESKTOP only */}
          <motion.div
            className="w-full h-full relative"
            animate={isMobile ? {} : { scale: zoom, x: pan.x, y: pan.y }}
            transition={{ type: "spring", stiffness: 120, damping: 25 }}
            drag={!isMobile && zoom > 1}
            dragElastic={0}
            dragConstraints={containerRef.current ? {
              left: -(containerRef.current.offsetWidth * (zoom - 1)) / 2,
              right: (containerRef.current.offsetWidth * (zoom - 1)) / 2,
              top: -(containerRef.current.offsetHeight * (zoom - 1)) / 2,
              bottom: (containerRef.current.offsetHeight * (zoom - 1)) / 2,
            } : { left: -800, right: 800, top: -500, bottom: 500 }}
            onDragEnd={(e, info) => setPan(p => clampPan(p.x + info.offset.x, p.y + info.offset.y, zoom))}
          >
            {/* Map image */}
            <div className="absolute inset-0 pointer-events-none">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=2600"
                alt="Global Map"
                className="w-full h-full object-cover opacity-50 brightness-[0.35]"
              />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,var(--primary)_85%)]" />
            </div>

            {/* Pins */}
            <AnimatePresence mode="popLayout">
              {visibleLocations.map((loc) => {
                const isSelected = selectedLoc?.name === loc.name;
                return (
                  <motion.div
                    key={loc.name}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    className="absolute group z-20"
                    style={{ top: loc.top, left: loc.left, transform: 'translate(-50%, -50%)' }}
                    onClick={() => handlePinClick(loc)}
                  >
                    {/* Pulse ring */}
                    <motion.div
                      animate={{ scale: [1, 2.8, 1], opacity: [0.4, 0, 0.4] }}
                      transition={{ duration: 3.5, repeat: Infinity }}
                      className={`absolute inset-0 rounded-full pointer-events-none ${isSelected ? 'bg-accent' : 'bg-accent/60'}`}
                    />

                    {/* Dot */}
                    <div className={`relative w-3 h-3 md:w-3 md:h-3 rounded-full border-2 cursor-pointer transition-all duration-300 z-10
                      ${isSelected
                        ? 'bg-accent border-white shadow-[0_0_20px_rgba(0,174,239,0.9)] scale-150'
                        : 'bg-white border-accent shadow-[0_0_10px_rgba(0,174,239,0.5)] group-hover:bg-accent group-hover:scale-125'
                      }`}
                    />

                    {/* Tooltip — always visible on mobile for selected, hover on desktop */}
                    <div className={`absolute left-5 top-1/2 -translate-y-1/2 z-30 pointer-events-none
                      bg-primary/95 backdrop-blur-xl border rounded-lg shadow-[0_8px_30px_rgba(0,0,0,0.5)] min-w-[110px] px-3 py-2
                      transition-all duration-200
                      ${isSelected
                        ? 'opacity-100 visible border-accent/50'
                        : 'opacity-0 invisible group-hover:opacity-100 group-hover:visible border-white/10'
                      }`}
                    >
                      <span className="block text-[9px] md:text-[10px] font-black uppercase tracking-wider text-white leading-tight mb-0.5">{loc.name}</span>
                      <div className="flex items-center gap-1.5">
                        <div className="w-1 h-1 bg-accent rounded-full animate-pulse" />
                        <span className="text-[8px] font-bold text-accent uppercase tracking-widest">{loc.location}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {/* ── MOBILE: Selected Studio Overlay Card ── */}
          <AnimatePresence>
            {isMobile && selectedLoc && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute bottom-4 left-4 right-4 z-50 bg-primary/95 backdrop-blur-xl border border-accent/30 rounded-2xl p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]"
              >
                <button
                  onClick={() => setSelectedLoc(null)}
                  className="absolute top-3 right-3 w-6 h-6 bg-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-white"
                >
                  <X size={12} />
                </button>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-accent/10 border border-accent/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPinIcon size={18} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-accent mb-0.5">Verified Installer</p>
                    <p className="text-sm font-black uppercase tracking-tight text-white">{selectedLoc.name}</p>
                    <p className="text-[10px] text-gray-400 font-bold mt-0.5">{selectedLoc.location} · {selectedLoc.country}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/10">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                  <p className="text-[9px] text-gray-500 uppercase tracking-widest font-bold">Active in Starkx Auto Network</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Zoom hint — desktop only */}
          <div className="absolute bottom-4 right-4 hidden md:flex items-center gap-3 bg-primary/90 border border-white/5 py-2 px-4 rounded-full z-30 pointer-events-none">
            <div className="w-1.5 h-1.5 bg-accent rounded-full animate-ping" />
            <span className="text-[8px] font-black uppercase tracking-[0.25em] text-white/40">
              {zoom > 1 ? "Drag to navigate" : "Scroll to zoom · Click pin to focus"}
            </span>
          </div>

          {/* Mobile search hint */}
          {isMobile && !searchQuery && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-primary/90 border border-white/5 py-2 px-4 rounded-full z-30 pointer-events-none whitespace-nowrap">
              <div className="w-1.5 h-1.5 bg-accent rounded-full animate-ping" />
              <span className="text-[8px] font-black uppercase tracking-widest text-white/40">Tap a pin to see studio details</span>
            </div>
          )}
        </div>

        {/* Stats strip */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { val: "50+", label: "Countries" },
            { val: "2k+", label: "Installers" },
            { val: "1M+", label: "Vehicles Saved" },
            { val: "10yr", label: "Max Warranty" },
          ].map(({ val, label }) => (
            <div key={label} className="text-center p-5 border border-white/5 bg-primary/40 rounded-2xl">
              <p className="text-2xl md:text-3xl font-black text-accent mb-1">{val}</p>
              <p className="text-[9px] font-bold uppercase tracking-widest text-gray-500">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GlobalMap;
