import * as React from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

export function About() {
  return (
    <section id="about" className="py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-dark mb-8">
              Empowering Bharat’s Entrepreneurs.
            </h2>
            <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
              <p>
                We started IQratech to bridge the gap between complex tech and local business needs. We believe that every Indian SMB deserves the same powerful tools that Silicon Valley giants use.
              </p>
              <p>
                Our mission is simple: to make business management so easy that you can focus on what you do best—growing your dream. Aapka growth, hamari priority.
              </p>
              <div className="pt-6 flex items-center gap-2 font-display font-bold text-primary italic">
                <Heart className="w-6 h-6 fill-primary" />
                Made with love in India, for the World.
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl rotate-3">
              <img 
                src="https://picsum.photos/seed/india-business/800/800" 
                alt="Indian Entrepreneurs" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-success/10 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
