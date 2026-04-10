import * as React from 'react';
import { motion } from 'motion/react';

export function FeatureDeepDive() {
  const deepFeatures = [
    {
      title: "Automated Invoicing",
      subtitle: "GST-ready bills in seconds.",
      description: "Stop worrying about tax compliance. Our system automatically calculates GST and generates professional invoices that you can send directly to your clients via WhatsApp or Email.",
      image: "https://picsum.photos/seed/invoice/600/400",
      reverse: false
    },
    {
      title: "Smart Workflow",
      subtitle: "Kaam fast, stress zero.",
      description: "Automate your daily operations. From lead assignment to task tracking, IQratech handles the boring stuff so you can focus on strategy and growth.",
      image: "https://picsum.photos/seed/workflow/600/400",
      reverse: true
    },
    {
      title: "Mobile App",
      subtitle: "Access your dashboard from anywhere.",
      description: "From Mumbai to New York, keep your business in your pocket. Our mobile app gives you real-time access to all your critical data and insights.",
      image: "https://picsum.photos/seed/mobile/600/400",
      reverse: false
    }
  ];

  return (
    <section id="solutions" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto space-y-32">
        {deepFeatures.map((feature, i) => (
          <div key={i} className={`flex flex-col ${feature.reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-16`}>
            <motion.div 
              initial={{ opacity: 0, x: feature.reverse ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex-1"
            >
              <h3 className="text-primary font-bold mb-4 uppercase tracking-widest text-sm">{feature.title}</h3>
              <h2 className="text-4xl font-display font-bold text-dark mb-6">{feature.subtitle}</h2>
              <p className="text-xl text-slate-600 leading-relaxed">
                {feature.description}
              </p>
              <button className="mt-8 px-8 py-3 rounded-full border border-slate-200 font-bold hover:border-primary hover:text-primary transition-all">
                Learn More
              </button>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex-1"
            >
              <div className="glass p-2 rounded-3xl shadow-2xl">
                <img 
                  src={feature.image} 
                  alt={feature.title} 
                  className="rounded-2xl w-full h-auto object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
