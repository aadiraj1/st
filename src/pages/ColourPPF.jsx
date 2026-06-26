import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ShieldCheck, Droplets, Sun, Layers, ArrowRight } from 'lucide-react';

const colorPalettes = [
  {
    id: 'matte-black',
    name: 'Matte Black',
    color: '#111111',
    finish: 'Matte',
    description: 'A stealthy, aggressive finish that absorbs light and accentuates sharp body lines.',
    bestFor: 'Aggressive Styling & Stealth Enthusiasts',
    vehicles: 'Sports cars, SUVs, and bold modern vehicles.',
    personality: 'Mysterious, commanding, and unapologetically bold.'
  },
  {
    id: 'gloss-red',
    name: 'Carmine Red',
    color: '#cc0000',
    finish: 'High Gloss',
    description: 'A vibrant, deep gloss red that demands attention and screams performance.',
    bestFor: 'Exotic & High-Performance Drivers',
    vehicles: 'Exotics, track cars, and dynamic daily drivers.',
    personality: 'Passionate, energetic, and thrill-seeking.'
  },
  {
    id: 'nardo-gray',
    name: 'Nardo Gray',
    color: '#8c92ac',
    finish: 'Gloss',
    description: 'A flat, solid gray that provides a sleek, industrial, and ultra-modern aesthetic.',
    bestFor: 'Modern Minimalists',
    vehicles: 'Luxury sedans, modern sports coupes, and tuned cars.',
    personality: 'Sophisticated, trendy, and understatedly cool.'
  },
  {
    id: 'midnight-blue',
    name: 'Midnight Blue',
    color: '#0a1930',
    finish: 'Metallic Gloss',
    description: 'A rich, dark blue that shifts tones beautifully under different lighting conditions.',
    bestFor: 'Executive & Elegance Seekers',
    vehicles: 'Luxury SUVs, grand tourers, and executive sedans.',
    personality: 'Refined, professional, and elegantly confident.'
  },
  {
    id: 'emerald-green',
    name: 'Emerald Green',
    color: '#004a25',
    finish: 'Metallic Gloss',
    description: 'A deep jewel tone offering a classic yet highly unique visual presence.',
    bestFor: 'Classic & Unique Tastes',
    vehicles: 'Vintage restomods, luxury wagons, and bespoke builds.',
    personality: 'Distinctive, cultured, and appreciative of heritage.'
  },
  {
    id: 'tiffany-blue',
    name: 'Tiffany Blue',
    color: '#0abab5',
    finish: 'Gloss',
    description: 'A bright, iconic cyan that gives off an upscale, vibrant, and luxurious energy.',
    bestFor: 'Fashion-Forward Creators',
    vehicles: 'Compact luxury, exotic convertibles, and custom cruisers.',
    personality: 'Playful, luxurious, and highly photogenic.'
  },
  {
    id: 'satin-pearl',
    name: 'Satin Pearl White',
    color: '#f0f0f0',
    finish: 'Satin',
    description: 'A silky, elegant white with subtle pearlescent flakes that pop under sunlight.',
    bestFor: 'Clean Elegance',
    vehicles: 'Luxury SUVs, EVs, and premium sedans.',
    personality: 'Pristine, futuristic, and gracefully elegant.'
  },
  {
    id: 'metallic-purple',
    name: 'Midnight Purple',
    color: '#301934',
    finish: 'Color Shift',
    description: 'A legendary color-shifting hue transitioning from deep purple to bronze and blue.',
    bestFor: 'JDM & Custom Enthusiasts',
    vehicles: 'Tuned imports, widebody builds, and iconic sports cars.',
    personality: 'Nostalgic, rare, and fiercely individualistic.'
  },
  {
    id: 'olive-drab',
    name: 'Tactical Olive',
    color: '#4B5320',
    finish: 'Matte',
    description: 'A rugged, military-inspired green perfect for an adventurous, off-road look.',
    bestFor: 'Overlanders & Off-Roaders',
    vehicles: '4x4s, trucks, and adventure SUVs.',
    personality: 'Rugged, tough, and ready for anything.'
  },
  {
    id: 'chalk-gray',
    name: 'Chalk Gray',
    color: '#d6d1ca',
    finish: 'Gloss',
    description: 'A warm, creamy gray that adds a touch of bespoke luxury to modern styling.',
    bestFor: 'European Luxury Enthusiasts',
    vehicles: 'High-end European sports cars and super-SUVs.',
    personality: 'Exclusive, tasteful, and quietly wealthy.'
  },
  {
    id: 'miami-blue',
    name: 'Miami Blue',
    color: '#3da5d9',
    finish: 'Gloss',
    description: 'An electric, tropical blue that feels like driving down a sunny coastal highway.',
    bestFor: 'Coastal Cruisers',
    vehicles: 'Convertibles, mid-engine sports cars, and hot hatches.',
    personality: 'Vibrant, outgoing, and perpetually on vacation.'
  },
  {
    id: 'satin-black',
    name: 'Satin Black',
    color: '#222222',
    finish: 'Satin',
    description: 'A subtle semi-gloss finish offering the stealth of matte with easier maintenance.',
    bestFor: 'Daily Driven Stealth',
    vehicles: 'Muscle cars, super-SUVs, and aggressive sedans.',
    personality: 'Intimidating, sleek, and practical.'
  },
  {
    id: 'racing-yellow',
    name: 'Speed Yellow',
    color: '#ffcc00',
    finish: 'High Gloss',
    description: 'A blindingly bright yellow that commands attention and highlights track heritage.',
    bestFor: 'Track Day Heroes',
    vehicles: 'Supercars, track toys, and aggressive coupes.',
    personality: 'Loud, hyperactive, and unapologetic.'
  },
  {
    id: 'rose-gold',
    name: 'Rose Gold',
    color: '#b76e79',
    finish: 'Metallic',
    description: 'A luxurious, warm metallic finish that exudes high fashion and exclusivity.',
    bestFor: 'Urban Trendsetters',
    vehicles: 'Luxury coupes, bespoke city cars, and hyper-exotics.',
    personality: 'Glamorous, trendy, and wildly expensive looking.'
  },
  {
    id: 'lava-orange',
    name: 'Lava Orange',
    color: '#ff4500',
    finish: 'Gloss',
    description: 'A fiery, saturated orange that looks like molten metal under the sun.',
    bestFor: 'Attention Seekers',
    vehicles: 'Supercars and aggressive track weapons.',
    personality: 'Explosive, extroverted, and wildly fun.'
  },
  {
    id: 'brushed-titanium',
    name: 'Brushed Titanium',
    color: '#878681',
    finish: 'Textured Metallic',
    description: 'A unique metallic film that simulates the raw, directional look of brushed metal.',
    bestFor: 'Sci-Fi & Futuristic Builds',
    vehicles: 'Concept-style builds, EVs, and exotic supercars.',
    personality: 'Industrial, raw, and mechanically pure.'
  },
  {
    id: 'sapphire-blue',
    name: 'Sapphire Blue',
    color: '#0f52ba',
    finish: 'Metallic Gloss',
    description: 'A brilliant, deeply reflective blue with heavy metallic flake that dances in light.',
    bestFor: 'Classic Sports Car Lovers',
    vehicles: 'Grand tourers, hot hatches, and muscle cars.',
    personality: 'Bright, lively, and classically beautiful.'
  },
  {
    id: 'champagne-gold',
    name: 'Champagne Gold',
    color: '#f7e7ce',
    finish: 'Metallic',
    description: 'A soft, muted gold that feels opulent without being overly flashy.',
    bestFor: 'Subtle Wealth',
    vehicles: 'Flagship luxury sedans and premium SUVs.',
    personality: 'Graceful, timeless, and softly spoken.'
  },
  {
    id: 'acid-green',
    name: 'Acid Green',
    color: '#8ee53f',
    finish: 'High Gloss',
    description: 'A neon, radioactive green usually reserved for hybrid hypercars.',
    bestFor: 'Hypercar Aesthetic',
    vehicles: 'Exotics, track cars, and heavily modified builds.',
    personality: 'Shocking, electrifying, and aggressively modern.'
  },
  {
    id: 'cherry-blossom',
    name: 'Cherry Blossom Pink',
    color: '#ffb7c5',
    finish: 'Gloss',
    description: 'A soft, pastel pink that turns heads with its cute yet striking appearance.',
    bestFor: 'Kawaii & Custom Stance',
    vehicles: 'Stanced cars, drift builds, and quirky city cars.',
    personality: 'Sweet, stylish, and highly creative.'
  },
  {
    id: 'mocha-brown',
    name: 'Mocha Bronze',
    color: '#4b3621',
    finish: 'Metallic Gloss',
    description: 'A deep, rich brown with bronze flakes that looks incredibly classy and distinct.',
    bestFor: 'Restomods & Classic Throwbacks',
    vehicles: 'Vintage Porsches, classic muscle, and luxury wagons.',
    personality: 'Cultured, vintage, and distinctly mature.'
  },
  {
    id: 'frozen-blue',
    name: 'Frozen Blue',
    color: '#a0d6b4',
    finish: 'Matte Metallic',
    description: 'An icy, frosted light blue that accentuates sharp aerodynamic elements.',
    bestFor: 'Performance EVs',
    vehicles: 'Electric sports cars, luxury EVs, and modern coupes.',
    personality: 'Cool, precise, and technologically advanced.'
  },
  {
    id: 'blood-red',
    name: 'Vampire Red',
    color: '#660000',
    finish: 'Satin',
    description: 'A dark, brooding red that feels immensely powerful and slightly sinister.',
    bestFor: 'Villainous Builds',
    vehicles: 'Aggressive muscle cars, slammed sedans, and big SUVs.',
    personality: 'Dark, powerful, and intimidating.'
  },
  {
    id: 'pearl-magenta',
    name: 'Mystic Magenta',
    color: '#8b008b',
    finish: 'Color Shift',
    description: 'A vibrant magenta that shifts to deep purple and gold depending on the angle.',
    bestFor: 'Show Car Builders',
    vehicles: 'Lowriders, air-ride builds, and custom show cars.',
    personality: 'Flamboyant, mesmerizing, and show-stopping.'
  },
  {
    id: 'gunmetal-gray',
    name: 'Gunmetal Gray',
    color: '#535659',
    finish: 'Matte Metallic',
    description: 'A serious, heavy metallic gray that looks like milled aluminum or weaponry.',
    bestFor: 'No-Nonsense Performance',
    vehicles: 'Track cars, heavily tuned street cars, and modern muscle.',
    personality: 'Serious, focused, and purely functional.'
  }
];

const specs = [
  { label: 'Gloss Level', value: '90 GU (varies by finish)', icon: <Sun size={20} /> },
  { label: 'Elongation', value: '300%', icon: <ArrowRight size={20} /> },
  { label: 'Adhesion', value: '1900 N/m', icon: <ShieldCheck size={20} /> },
  { label: 'Warranty', value: '7 Year Global Limited', icon: <ShieldCheck size={20} /> },
  { label: 'Hydrophobic', value: 'Advanced Top-Coat', icon: <Droplets size={20} /> },
];

const ColourPPF = () => {
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const handleOrder = () => {
    navigate('/roll-inquiry', { state: { product: { name: 'Colour PPF', type: 'Roll Order' } } });
  };

  return (
    <main className="bg-primary min-h-screen pt-24 pb-20 overflow-hidden">
      {/* Hero Section */}
      <section className="container mx-auto px-4 md:px-6 mb-20 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-4xl mx-auto pt-10"
        >
          <h1 className="text-[10px] font-black text-accent uppercase tracking-[0.5em] mb-6">
            Aesthetic Transformation
          </h1>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter mb-8 leading-tight">
            Color meets <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-white">Ultimate Protection</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-medium">
            Starkx Colour PPF goes beyond traditional wrapping. It combines the aesthetic transformation of a premium vinyl wrap with the extreme durability, self-healing, and protective qualities of elite Paint Protection Film.
          </p>
        </motion.div>
      </section>

      {/* Interactive Palettes */}
      <section className="mb-24 relative">
        <div className="container mx-auto px-4 md:px-6 mb-8 flex justify-between items-end">
          <div>
            <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tight">Dynamic Palettes</h3>
            <p className="text-accent text-[10px] font-black uppercase tracking-widest mt-2">Find your perfect match</p>
          </div>
          <div className="flex gap-2 hidden md:flex">
            <button onClick={scrollLeft} className="p-3 border border-white/10 hover:border-accent hover:text-accent transition-colors rounded-full bg-secondary/50">
              <ChevronLeft size={20} />
            </button>
            <button onClick={scrollRight} className="p-3 border border-white/10 hover:border-accent hover:text-accent transition-colors rounded-full bg-secondary/50">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Swipe Container */}
        <div className="relative w-full">
          {/* Fading Edges */}
          <div className="absolute left-0 top-0 bottom-0 w-8 md:w-24 bg-gradient-to-r from-primary to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 md:w-24 bg-gradient-to-l from-primary to-transparent z-10 pointer-events-none" />

          <div
            ref={scrollRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-6 px-4 md:px-24 pb-8 pt-4 hide-scrollbar cursor-grab active:cursor-grabbing"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {colorPalettes.map((palette, index) => (
              <motion.div
                key={palette.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="snap-center shrink-0 w-[85vw] md:w-[400px] bg-secondary/30 border border-white/5 rounded-xl overflow-hidden group hover:border-accent/30 transition-all duration-500"
              >
                {/* Color Display Area */}
                <div 
                  className="h-48 md:h-64 w-full relative flex items-center justify-center overflow-hidden"
                  style={{ backgroundColor: palette.color }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-50 mix-blend-overlay" />
                  <div className="absolute inset-0 shadow-[inset_0_-20px_50px_rgba(0,0,0,0.5)]" />
                  
                  {/* Subtle reflections */}
                  {palette.finish.includes('Gloss') && (
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/20 blur-2xl rounded-full" />
                  )}
                  
                  <span className="relative z-10 text-white/90 font-black uppercase tracking-[0.3em] text-xs mix-blend-difference">
                    {palette.finish}
                  </span>
                </div>

                {/* Info Area */}
                <div className="p-6 md:p-8">
                  <h4 className="text-2xl font-black uppercase tracking-tight mb-2 group-hover:text-accent transition-colors">{palette.name}</h4>
                  <p className="text-gray-400 text-xs leading-relaxed mb-6 h-12">{palette.description}</p>
                  
                  <div className="space-y-4">
                    <div className="bg-primary/50 p-4 border border-white/5 rounded-lg">
                      <p className="text-[9px] font-black uppercase tracking-widest text-accent mb-1">Best Suited For</p>
                      <p className="text-sm font-bold">{palette.bestFor}</p>
                      <p className="text-xs text-gray-400 mt-1">{palette.vehicles}</p>
                    </div>
                    
                    <div className="bg-primary/50 p-4 border border-white/5 rounded-lg">
                      <p className="text-[9px] font-black uppercase tracking-widest text-accent mb-1">Vibe & Personality</p>
                      <p className="text-xs text-gray-300 italic">"{palette.personality}"</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Mobile Scroll Indicator */}
          <div className="flex justify-center md:hidden gap-1 mt-2">
             <span className="text-[10px] text-gray-500 uppercase tracking-widest flex items-center gap-2">
               <ChevronLeft size={12} /> Swipe to explore <ChevronRight size={12} />
             </span>
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="container mx-auto px-4 md:px-6 mb-24">
        <div className="bg-secondary/20 border border-white/10 rounded-2xl p-8 md:p-12 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 relative z-10">
            <div>
              <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-6">Technical <br/> Specifications</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-8">
                Every roll of Starkx Colour PPF is rigorously tested to ensure it meets our elite standards for impact resistance, hydrophobic performance, and self-healing capabilities, regardless of the color pigment.
              </p>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleOrder}
                className="w-full md:w-auto px-10 py-4 bg-accent text-black font-black uppercase tracking-[0.15em] text-xs hover:bg-white transition-colors"
              >
                Inquire For Order
              </motion.button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {specs.map((spec, i) => (
                <div key={i} className="bg-primary/80 border border-white/5 p-5 rounded-xl flex items-start gap-4 hover:border-accent/30 transition-colors">
                  <div className="text-accent bg-accent/10 p-2 rounded-lg">
                    {spec.icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">{spec.label}</p>
                    <p className="text-sm font-bold text-white">{spec.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ColourPPF;
