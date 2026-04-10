import * as React from 'react';
import { motion } from 'motion/react';
import { Sparkles, CreditCard, Users, BarChart3, Zap, ShieldCheck } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export function Problem() {
  return (
    <section className="py-24 px-6 bg-slate-50">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-display font-bold text-dark mb-6">
          Excel sheets aur manual work se pareshan?
        </h2>
        <p className="text-xl text-slate-600 leading-relaxed">
          Managing a growing business is hard. Scattered data, missed leads, and slow processes are killing your ROI. IQratech brings everything under one roof.
        </p>
      </div>
    </section>
  );
}

export function BentoGrid() {
  const features = [
    {
      title: "AI Insights",
      description: "Smart predictions for your sales. AI analyzes your data to find hidden opportunities.",
      icon: <Sparkles className="w-6 h-6 text-primary" />,
      className: "md:col-span-2 md:row-span-1",
      bg: "bg-blue-50",
    },
    {
      title: "Easy Payments",
      description: "Razorpay integrated. Billing automated. GST-ready bills in seconds.",
      icon: <CreditCard className="w-6 h-6 text-success" />,
      className: "md:col-span-1 md:row-span-1",
      bg: "bg-emerald-50",
    },
    {
      title: "CRM",
      description: "Customer data ek jagah par. Manage leads, contacts, and deals effortlessly.",
      icon: <Users className="w-6 h-6 text-orange-500" />,
      className: "md:col-span-1 md:row-span-2",
      bg: "bg-orange-50",
    },
    {
      title: "Analytics",
      description: "Real-time tracking with beautiful charts. See your growth as it happens.",
      icon: <BarChart3 className="w-6 h-6 text-purple-500" />,
      className: "md:col-span-2 md:row-span-1",
      bg: "bg-purple-50",
    },
    {
      title: "Smart Workflow",
      description: "Kaam fast, stress zero. Automate repetitive tasks and focus on scaling.",
      icon: <Zap className="w-6 h-6 text-yellow-500" />,
      className: "md:col-span-1 md:row-span-1",
      bg: "bg-yellow-50",
    },
    {
      title: "Secure & Reliable",
      description: "Enterprise-grade security for your business data. Built for scale.",
      icon: <ShieldCheck className="w-6 h-6 text-slate-500" />,
      className: "md:col-span-2 md:row-span-1",
      bg: "bg-slate-100",
    },
  ];

  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-dark mb-4">
            Everything you need to scale.
          </h2>
          <p className="text-slate-600 text-lg">
            Powerful features designed for the modern Indian entrepreneur.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={cn(
                "bento-card group",
                feature.className,
                feature.bg
              )}
            >
              <div className="mb-6 w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3 text-dark">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              
              {/* Decorative element */}
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white/40 rounded-full blur-2xl group-hover:bg-white/60 transition-all" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
