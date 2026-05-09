import React, { useState, useRef, useEffect } from 'react';

const Comparison = () => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef(null);

  const handleMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX || (e.touches && e.touches[0].clientX);
    const pos = ((x - rect.left) / rect.width) * 100;
    setSliderPos(Math.min(Math.max(pos, 0), 100));
  };

  return (
    <section className="py-14 bg-primary px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-accent uppercase tracking-[0.3em] mb-4">Visible Results</h2>
          <p className="text-3xl md:text-5xl font-black uppercase tracking-tight">Experience The Difference</p>
        </div>

        <div 
          ref={containerRef}
          className="relative aspect-video w-full max-w-5xl mx-auto overflow-hidden border border-white/10 select-none cursor-ew-resize group"
          onMouseMove={handleMove}
          onTouchMove={handleMove}
        >
          {/* After Image (Top) */}
          <div 
            className="absolute inset-0 z-10 overflow-hidden"
            style={{ width: `${sliderPos}%` }}
          >
            <div className="absolute inset-0 w-[1000px] md:w-[1280px]">
              <img 
                src="/e5818c65-0f63-4627-a57b-217d4cff828a/after_ppf_paint_1777321582520.png"
                alt="After Protection"
                className="w-full h-full object-cover grayscale-0"
              />
            </div>
            <div className="absolute top-6 left-6 bg-accent text-black px-4 py-1.5 text-xs font-black uppercase tracking-widest z-20 shadow-[-10px_0_30px_rgba(0,174,239,0.5)]">
              Diamond Shielded
            </div>
          </div>

          {/* Before Image (Bottom) */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/e5818c65-0f63-4627-a57b-217d4cff828a/before_ppf_paint_1777321349880.png"
              alt="Before Protection"
              className="w-full h-full object-cover grayscale-0"
            />
            <div className="absolute top-6 right-6 bg-red-600 text-white px-4 py-1.5 text-xs font-black uppercase tracking-widest z-20 border border-white/10 shadow-xl">
              Vulnerable Paint
            </div>
          </div>

          {/* Slider Line */}
          <div 
            className="absolute top-0 bottom-0 z-30 w-1 bg-accent/80 cursor-ew-resize shadow-[0_0_20px_rgba(0,174,239,0.5)]"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-accent rounded-full flex items-center justify-center text-black pointer-events-none border-4 border-primary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="m11 17-5-5 5-5M13 17l5-5-5-5"/>
              </svg>
            </div>
          </div>
        </div>

        <p className="text-center mt-8 text-gray-500 italic text-sm">
          Slide to compare the mirror-like finish and intense depth of our paint protection.
        </p>
      </div>
    </section>
  );
};

export default Comparison;
