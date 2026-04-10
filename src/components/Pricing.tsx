import * as React from 'react';
import { motion } from 'motion/react';
import { Check, Star } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export function Testimonials() {
  const testimonials = [
    {
      quote: "IQratech ne hamari efficiency 40% badha di hai. Highly recommended for Indian agencies!",
      author: "Ankit Sharma",
      role: "CEO of TechFlow",
      image: "https://picsum.photos/seed/ankit/100/100"
    },
    {
      quote: "The best CRM I've used. Simple, fast, and works perfectly for our Mumbai-based team.",
      author: "Priya Patel",
      role: "Founder, Bloom Digital",
      image: "https://picsum.photos/seed/priya/100/100"
    },
    {
      quote: "GST invoicing used to be a nightmare. Now it's just one click. Shandar product!",
      author: "Rahul Verma",
      role: "Director, Verma Logistics",
      image: "https://picsum.photos/seed/rahul/100/100"
    },
    {
      quote: "Finally a SaaS that understands the Indian market. The Hinglish touch is brilliant.",
      author: "Sanjay Gupta",
      role: "Operations Head, RetailPro",
      image: "https://picsum.photos/seed/sanjay/100/100"
    }
  ];

  return (
    <section className="py-24 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <h2 className="text-4xl font-display font-bold text-dark mb-4">Loved by Founders</h2>
        <p className="text-slate-600">Join 500+ businesses scaling with IQratech.</p>
      </div>

      <div className="marquee">
        <div className="marquee-content">
          {[...testimonials, ...testimonials].map((t, i) => (
            <div key={i} className="w-[400px] p-8 rounded-3xl border border-slate-100 bg-slate-50/50 flex flex-col gap-6">
              <p className="text-lg text-slate-700 italic">"{t.quote}"</p>
              <div className="flex items-center gap-4">
                <img src={t.image} alt={t.author} className="w-12 h-12 rounded-full object-cover" referrerPolicy="no-referrer" />
                <div>
                  <h4 className="font-bold text-dark">{t.author}</h4>
                  <p className="text-sm text-slate-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Pricing() {
  const [isYearly, setIsYearly] = React.useState(false);

  const tiers = [
    {
      name: "Free",
      price: "0",
      description: "For side hustles and solo entrepreneurs.",
      features: ["Basic tracking", "1 User", "Up to 100 leads", "Community support"],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Starter",
      price: isYearly ? "1,599" : "1,999",
      description: "For growing teams ready to automate.",
      features: ["Everything in Free", "5 Users", "Unlimited leads", "Email support", "GST Invoicing"],
      cta: "Start Trial",
      popular: false
    },
    {
      name: "Pro",
      price: isYearly ? "3,999" : "4,999",
      description: "Full AI Suite for serious scale.",
      features: ["Everything in Starter", "Unlimited Users", "AI Insights", "Priority Support", "Custom Workflows"],
      cta: "Go Pro",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "Tailored solutions for large organizations.",
      features: ["Everything in Pro", "Dedicated Account Manager", "SSO & Security", "Custom Integrations"],
      cta: "Contact Sales",
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-24 px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-dark mb-6">Simple, Transparent Pricing</h2>
          
          <div className="flex items-center justify-center gap-4">
            <span className={cn("text-sm font-medium", !isYearly ? "text-dark" : "text-slate-400")}>Monthly</span>
            <button 
              onClick={() => setIsYearly(!isYearly)}
              className="w-14 h-7 bg-slate-200 rounded-full relative p-1 transition-colors hover:bg-slate-300"
            >
              <motion.div 
                animate={{ x: isYearly ? 28 : 0 }}
                className="w-5 h-5 bg-primary rounded-full shadow-sm"
              />
            </button>
            <span className={cn("text-sm font-medium", isYearly ? "text-dark" : "text-slate-400")}>
              Yearly <span className="text-success font-bold ml-1">(Save 20%)</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((tier, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "relative p-8 rounded-3xl border bg-white flex flex-col h-full",
                tier.popular ? "border-primary shadow-xl shadow-primary/10 ring-1 ring-primary" : "border-slate-200"
              )}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1">
                  <Star className="w-3 h-3 fill-white" />
                  MOST POPULAR
                </div>
              )}
              
              <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
              <div className="mb-4">
                <span className="text-4xl font-display font-bold">₹{tier.price}</span>
                {tier.price !== "Custom" && <span className="text-slate-400">/mo</span>}
              </div>
              <p className="text-slate-500 text-sm mb-8">{tier.description}</p>
              
              <ul className="space-y-4 mb-10 flex-1">
                {tier.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm text-slate-600">
                    <Check className="w-5 h-5 text-success shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              
              <button className={cn(
                "w-full py-4 rounded-xl font-bold transition-all",
                tier.popular 
                  ? "bg-primary text-white hover:bg-blue-700 shadow-lg shadow-primary/20" 
                  : "bg-slate-100 text-dark hover:bg-slate-200"
              )}>
                {tier.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
