import * as React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Play } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden mesh-gradient">
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold text-primary bg-primary/10 rounded-full border border-primary/20">
            Trusted by 500+ Indian Businesses
          </span>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-dark mb-6 leading-[1.1] tracking-tight">
            Business Operations ab manage <br className="hidden md:block" />
            karein <span className="text-primary">smarter tarike se.</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            IQratech helps Indian SMBs automate workflows, track growth, and scale faster with AI-driven insights. Built for the next billion-dollar startups.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button className="w-full sm:w-auto px-8 py-4 bg-primary text-white font-bold rounded-full hover:bg-blue-700 transition-all shadow-xl shadow-primary/25 flex items-center justify-center gap-2 group">
              Start Free Trial
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-white text-dark font-bold rounded-full border border-slate-200 hover:border-primary transition-all flex items-center justify-center gap-2 group">
              <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <Play className="w-4 h-4 text-primary fill-primary" />
              </div>
              Watch Demo
            </button>
          </div>
        </motion.div>

        {/* Dashboard Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-5xl mx-auto"
        >
          <div className="glass rounded-2xl p-2 shadow-2xl relative overflow-hidden">
            <div className="bg-slate-50 rounded-xl overflow-hidden border border-slate-200 aspect-[16/9] flex items-center justify-center">
              {/* Mock UI Content */}
              <div className="w-full h-full p-6 flex flex-col gap-6">
                <div className="flex justify-between items-center">
                  <div className="flex gap-4">
                    <div className="w-32 h-8 bg-slate-200 rounded-lg animate-pulse" />
                    <div className="w-24 h-8 bg-slate-200 rounded-lg animate-pulse" />
                  </div>
                  <div className="w-10 h-10 bg-primary/20 rounded-full animate-pulse" />
                </div>
                <div className="grid grid-cols-3 gap-6">
                  <div className="h-32 bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
                    <div className="w-1/2 h-4 bg-slate-100 rounded mb-4" />
                    <div className="w-3/4 h-8 bg-primary/10 rounded" />
                  </div>
                  <div className="h-32 bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
                    <div className="w-1/2 h-4 bg-slate-100 rounded mb-4" />
                    <div className="w-3/4 h-8 bg-success/10 rounded" />
                  </div>
                  <div className="h-32 bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
                    <div className="w-1/2 h-4 bg-slate-100 rounded mb-4" />
                    <div className="w-3/4 h-8 bg-slate-100 rounded" />
                  </div>
                </div>
                <div className="flex-1 bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                  <div className="w-1/4 h-6 bg-slate-100 rounded mb-6" />
                  <div className="flex items-end gap-4 h-32">
                    {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                      <div key={i} className="flex-1 bg-primary/20 rounded-t-lg" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Floating elements */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-10 -right-10 glass p-4 rounded-2xl shadow-xl hidden lg:block"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-success rounded-full flex items-center justify-center text-white">
                ₹
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Revenue Growth</p>
                <p className="text-lg font-bold text-dark">+42.5%</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-10 -left-10 glass p-4 rounded-2xl shadow-xl hidden lg:block"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white">
                AI
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Smart Insights</p>
                <p className="text-lg font-bold text-dark">3 New Leads Found</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Trust Bar */}
      <div className="max-w-7xl mx-auto mt-24">
        <p className="text-center text-slate-400 font-medium mb-10 uppercase tracking-widest text-xs">
          Trusted by India's fastest growing startups
        </p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-40 grayscale">
          {['Zomato', 'Razorpay', 'Cred', 'Paytm', 'Swiggy'].map((brand) => (
            <span key={brand} className="text-2xl font-display font-black tracking-tighter">
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
