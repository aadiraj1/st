import React from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-14 bg-primary px-6 relative overflow-hidden">
      <div className="container mx-auto">
        <div className="bg-secondary p-8 md:p-16 border border-white/5 relative overflow-hidden">
          {/* Background Decorative Blur */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 blur-[100px] rounded-full" />
          
          <div className="flex flex-col lg:flex-row gap-16 relative z-10">
            {/* Left: Contact Info */}
            <div className="w-full lg:w-1/2">
              <h2 className="text-sm font-bold text-accent uppercase tracking-[0.3em] mb-4">Connect</h2>
              <p className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-8">Secure Your Slot</p>
              
              <div className="space-y-8">
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-white/5 flex items-center justify-center shrink-0 border border-white/10 text-accent">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Call Us</h4>
                    <p className="text-xl font-bold">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-white/5 flex items-center justify-center shrink-0 border border-white/10 text-accent">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Our Studio</h4>
                    <p className="text-xl font-bold italic">123 Precision Way, Auto District<br />Los Angeles, CA 90210</p>
                  </div>
                </div>

                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-white/5 flex items-center justify-center shrink-0 border border-white/10 text-accent">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Hours</h4>
                    <p className="text-sm font-medium">Mon - Fri: 9:00 AM - 6:00 PM<br />Sat: 10:00 AM - 4:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 flex flex-col sm:flex-row gap-4">

                <button className="bg-white/5 text-white border border-white/10 px-8 py-5 font-black uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-all">
                  Send Email
                </button>
              </div>
            </div>

            {/* Right: Map Placeholder */}
            <div className="w-full lg:w-1/2 aspect-square lg:aspect-auto h-full min-h-[400px] border border-white/10 bg-primary overflow-hidden relative">
              {/* User to add Google Maps iframe src here */}
              <iframe 
                src="" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy"
                title="Location Map"
              ></iframe>
              
              <div className="absolute inset-0 pointer-events-none border-[20px] border-secondary" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
