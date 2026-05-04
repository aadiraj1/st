import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Car, Ship, Home, Bike, CheckCircle2, Shield, Zap, Target, ArrowRight } from 'lucide-react';

const solutionsData = {
  "automotive": {
    title: "Automotive",
    subtitle: "Precision-Engineered Paint Protection",
    icon: <Car size={48} />,
    image: "/e5818c65-0f63-4627-a57b-217d4cff828a/autom.jpg",
    description: "Our automotive Paint Protection Film (PPF) is an advanced, multi-layered thermoplastic urethane shield designed to absorb the energy of road debris. Whether you're navigating daily highway commutes or pushing limits on the track, your vehicle is constantly under fire from high-velocity gravel, acidic contaminants, and harsh environmental fallout. Our proprietary film acts as a sacrificial barrier that preserves the factory finish, maintaining that deep, 'just-waxed' showroom shine for years while significantly bolstering the vehicle's future resale value. By utilizing high-density polymer technology, we ensure that your investment remains immune to the elements.",
    features: [
      {
        title: "Advanced Self-Healing Top Coat",
        desc: "The top layer of our film is composed of an elastomeric polymer that maintains a 'memory' of its original shape. When minor scratches, swirls, or abrasions occur, simple exposure to ambient heat—or even a warm sunny day—triggers the polymer to flow back into its smooth, factory state, effectively erasing the damage before your eyes."
      },
      {
        title: "Impact Absorption & Energy Dissipation",
        desc: "Engineered at an 8-mil thickness, the film's structural core is designed to dissipate the kinetic energy of stone impacts. Instead of the force being concentrated on a single point on your paint, the urethane layer spreads the impact across a wider area, preventing the paint from chipping or cracking under pressure."
      },
      {
        title: "Molecular Stain Resistance",
        desc: "Our film features a low-surface-energy top coat that prevents contaminants from bonding to the surface. Acid rain, bird droppings, and tree sap, which would typically etch into clear coats, are easily wiped away. This layer also provides a powerful barrier against yellowing and oxidation caused by prolonged UV exposure."
      },
      {
        title: "DAP Digital Precision Fitment",
        desc: "We don't believe in taking knives to your car. Every kit is digitally designed and cut using our proprietary DAP software, ensuring a perfect 1:1 match with your vehicle's specific panels. This allows for wrapped edges and a virtually invisible installation that follows the most complex contours of modern supercars."
      }
    ],
    stats: [
      { label: "Durability", value: "10 Years" },
      { label: "Thickness", value: "8 Mils" },
      { label: "Clarity", value: "99.9%" }
    ],
    cta: "Protect Your Drive"
  },
  "marine": {
    title: "Marine",
    subtitle: "Hardcore Maritime Defense",
    icon: <Ship size={48} />,
    image: "/e5818c65-0f63-4627-a57b-217d4cff828a/mar1.jpg",
    description: "The maritime environment is arguably the most aggressive on Earth. Constant exposure to high-salinity water, intense UV radiation, and physical friction from docking can rapidly degrade a vessel's gelcoat and finish. Our Marine Protection Systems are specifically engineered to seal the porous surface of gelcoats, preventing the 'chalking' and oxidation that typically plagues boats. This invisible armor provides a high-gloss, ultra-slick surface that reduces drag and makes cleaning significantly easier, allowing you to spend more time on the water and less time buffing and waxing.",
    features: [
      {
        title: "Salinity & Corrosion Barrier",
        desc: "Saltwater is a universal solvent that accelerates the degradation of almost any material. Our marine film creates a completely non-porous seal over the hull and brightwork, preventing salt crystals from embedding into the surface and causing permanent staining or corrosion of metal components."
      },
      {
        title: "Extreme UV Stabilization",
        desc: "UV radiation at sea is intensified by reflection off the water. Our marine-grade films contain high concentrations of UV inhibitors that block 99% of harmful rays, preventing the photochemical reaction that causes white gelcoats to turn yellow and colored hulls to fade and lose their vibrancy."
      },
      {
        title: "Hydrophobic Hull Efficiency",
        desc: "The ultra-slick, hydrophobic properties of our film significantly reduce surface tension. This not only makes the hull 'self-cleaning' as it moves through the water but can also contribute to improved fuel efficiency by reducing drag against the water's surface."
      },
      {
        title: "Dock Rash & Impact Shield",
        desc: "From the occasional bump against a piling to the friction of fenders during a storm, boat hulls are prone to physical damage. Our high-impact urethane layer provides a tough cushion that absorbs these lateral forces, preserving the pristine look of your vessel's exterior."
      }
    ],
    stats: [
      { label: "UV Rejection", value: "99%" },
      { label: "Salt Resistance", value: "Extreme" },
      { label: "Warranty", value: "7 Years" }
    ],
    cta: "Guard Your Vessel"
  },
  "home-office": {
    title: "Home & Office",
    subtitle: "Architectural Surface Engineering",
    icon: <Home size={48} />,
    image: "/e5818c65-0f63-4627-a57b-217d4cff828a/home.jpg",
    description: "Modern architecture and interior design rely on expensive, sensitive materials that are often left unprotected. Our Architectural Solutions range from high-performance window films that regulate interior climates to invisible surface protection for luxury stone, wood, and glass furniture. We bridge the gap between aesthetics and utility, ensuring that your living and working environments remain pristine despite the rigors of daily use. By filtering the solar spectrum and reinforcing surfaces, we extend the life of your most valued assets.",
    features: [
      {
        title: "Solar Spectrum Filtration",
        desc: "Our window films are engineered to selectively filter the solar spectrum. By blocking up to 60% of Infrared (IR) heat and 99% of UV radiation while allowing visible light to pass through, we create a more comfortable interior environment, reduce air conditioning costs, and protect fine art and furniture from fading."
      },
      {
        title: "Invisible Furniture Shield",
        desc: "Marble countertops and high-gloss wooden desks are beautiful but notoriously fragile. Our ultra-clear furniture film provides a heat-resistant, acid-resistant barrier that prevents staining from spills (like wine or coffee) and scratches from daily objects, all without altering the look or texture of the material."
      },
      {
        title: "Safety & Security Reinforcement",
        desc: "In the event of an accidental impact or forced entry attempt, our security films hold glass fragments together within the frame. This significantly reduces the risk of injury from flying shards and acts as a powerful deterrent to smash-and-grab thefts in both residential and commercial settings."
      },
      {
        title: "Anti-Graffiti & Sacrificial Layers",
        desc: "For commercial glass in high-traffic urban areas, we offer sacrificial layers that take the brunt of vandalism, scratching, and acid etching. When damage occurs, the film is simply peeled away and replaced, saving thousands of dollars in professional glass replacement costs."
      }
    ],
    stats: [
      { label: "Heat Reduction", value: "Up to 60%" },
      { label: "UV Protection", value: "Total" },
      { label: "Durability", value: "Lifetime" }
    ],
    cta: "Secure Your Space"
  },
  "motorcycle": {
    title: "Motorcycle",
    subtitle: "Two-Wheeled Precision Guard",
    icon: <Bike size={48} />,
    image: "/e5818c65-0f63-4627-a57b-217d4cff828a/motor.jpg",
    description: "Motorcycles are uniquely exposed to the elements and physical wear. Every ride involves high-speed wind resistance, road grime impact, and constant rider contact with the bike's surfaces. Our Motorcycle Protection Kits are designed with the most complex geometries in mind, providing an invisible, high-performance 'skin' that shields vulnerable fairings, fuel tanks, and headlights. We understand that on a bike, aesthetics are everything, which is why our films are engineered to be completely invisible, maintaining the sharp lines and vibrant colors of your machine.",
    features: [
      {
        title: "Anti-Friction Tank Defense",
        desc: "The fuel tank is subject to constant friction from the rider's gear, zippers, and buttons, which quickly dulls the paint. Our film provides a high-slip, ultra-durable barrier that prevents these micro-scratches, while our matte-finish options can even provide additional grip for knee positioning."
      },
      {
        title: "High-Speed Impact Shield",
        desc: "Motorcycle fairings are at the front line of every ride, taking direct hits from sand, gravel, and insects at highway speeds. Our urethane layer acts as a shock absorber, preventing 'sandblasting' effects and keeping your front fairings and fenders looking factory-new."
      },
      {
        title: "Headlight & Lens Preservation",
        desc: "Plastic headlight lenses are prone to pitting and yellowing over time, which reduces light output and compromises safety. Our optically clear film protects the lens from impact damage and UV-induced oxidation, ensuring your path stays bright and your bike looks sharp."
      },
      {
        title: "Hydrophobic Ease of Maintenance",
        desc: "Cleaning a motorcycle after a long ride can be a chore. The hydrophobic nature of our film means that mud, bugs, and road grime don't bond to the surface. A simple rinse and light wipe are often all that's needed to return the bike to its pristine, pre-ride condition."
      }
    ],
    stats: [
      { label: "Fitment", value: "DAP Precise" },
      { label: "Self-Heal", value: "Instant" },
      { label: "Finish", value: "Gloss/Matte" }
    ],
    cta: "Ride Protected"
  }
};

const IndustrySolutions = () => {
  const { slug } = useParams();
  const data = solutionsData[slug] || solutionsData["automotive"];

  return (
    <div className="pt-24 min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen md:min-h-[90vh] flex items-center overflow-hidden py-32">
        <div className="absolute inset-0 z-0">
          <img src={data.image} alt={data.title} className="w-full h-full object-cover opacity-40 scale-105" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center text-black shadow-[0_0_30px_rgba(0,174,239,0.4)]">
                {data.icon}
              </div>
              <span className="text-accent font-black uppercase tracking-[0.4em] text-sm">{data.title} Solutions</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic leading-none mb-8">
              {data.subtitle.split(' ').map((word, i) => (
                <span key={i} className={i === data.subtitle.split(' ').length - 1 ? "text-accent" : ""}>{word} </span>
              ))}
            </h1>
            <p className="text-xl text-gray-400 font-medium leading-relaxed mb-12">
              {data.description}
            </p>
            <div className="flex flex-wrap gap-8">
              {data.stats.map((stat, idx) => (
                <div key={idx} className="border-l-2 border-accent pl-6">
                  <div className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-1">{stat.label}</div>
                  <div className="text-3xl font-black italic">{stat.value}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Floating Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[8px] font-black uppercase tracking-[0.5em] text-gray-500">Scroll</span>
          <div className="w-[1px] h-10 bg-accent/30" />
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="py-22 bg-primary">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-xs font-black text-accent uppercase tracking-[0.5em] mb-4">Core Technology</h2>
            <p className="text-4xl font-black uppercase tracking-tighter italic">Engineered for <span className="text-accent">Extreme Performance</span></p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-secondary/30 border border-white/5 p-10 rounded-[40px] hover:border-accent/30 transition-all group"
              >
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-black transition-all">
                  <CheckCircle2 size={24} />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tighter italic mb-4">{feature.title}</h3>
                <p className="text-gray-400 font-medium leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-22 relative overflow-hidden">
        <div className="absolute inset-0 bg-accent/5" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic mb-12 leading-tight">
            Ready to <span className="text-accent">Elevate</span> Your <br />{data.title} Protection?
          </h2>
          <Link to="/shop" className="inline-flex items-center gap-4 bg-white text-black px-12 py-6 rounded-2xl font-black uppercase tracking-widest hover:bg-accent transition-all group">
            {data.cta} <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default IndustrySolutions;
