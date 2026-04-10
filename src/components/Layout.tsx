import * as React from 'react';
import { motion } from 'motion/react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '@/src/lib/utils';

import { auth, googleProvider } from '@/src/lib/firebase';
import { signInWithPopup, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

export function Navbar() {
  const [user] = useAuthState(auth);
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleLogout = () => signOut(auth);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Solutions', href: '#solutions' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Resources', href: '#resources' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4',
        scrolled ? 'bg-white/80 backdrop-blur-lg border-bottom border-slate-200 py-3' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-display font-bold text-xl shadow-lg shadow-primary/20">
            IQ
          </div>
          <span className="text-2xl font-display font-bold tracking-tight text-dark">
            IQratech
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <div key={link.name} className="group relative">
              <a
                href={link.href}
                className="text-slate-600 hover:text-primary font-medium flex items-center gap-1 transition-colors"
              >
                {link.name}
                <ChevronDown className="w-4 h-4 opacity-50 group-hover:rotate-180 transition-transform" />
              </a>
            </div>
          ))}
          {user?.email === 'zubairrazasiddiqui@gmail.com' && (
            <a href="#admin" className="text-primary font-bold flex items-center gap-1">
              Dashboard
            </a>
          )}
        </div>

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full border border-slate-200">
                <img src={user.photoURL || ''} className="w-6 h-6 rounded-full" referrerPolicy="no-referrer" />
                <span className="text-sm font-medium text-slate-700">{user.displayName?.split(' ')[0]}</span>
              </div>
              <button 
                onClick={handleLogout}
                className="px-5 py-2 text-slate-600 font-medium hover:text-red-500 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <button 
                onClick={handleLogin}
                className="px-5 py-2 text-slate-600 font-medium hover:text-primary transition-colors"
              >
                Login
              </button>
              <button className="px-6 py-2.5 bg-primary text-white font-semibold rounded-full hover:bg-blue-700 transition-all shadow-lg shadow-primary/25 hover:scale-105 active:scale-95">
                Get Started
              </button>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden p-2 text-dark" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 bg-white border-t border-slate-100 p-6 shadow-xl md:hidden"
        >
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-lg font-medium text-slate-600"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <hr className="border-slate-100" />
            <button className="w-full py-3 text-slate-600 font-medium">Login</button>
            <button className="w-full py-3 bg-primary text-white font-semibold rounded-xl">
              Get Started
            </button>
          </div>
        </motion.div>
      )}
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="bg-dark text-white pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-display font-bold text-lg">
              IQ
            </div>
            <span className="text-xl font-display font-bold tracking-tight">
              IQratech
            </span>
          </div>
          <p className="text-slate-400 leading-relaxed">
            Empowering Bharat's entrepreneurs with world-class business automation tools.
          </p>
        </div>
        
        <div>
          <h4 className="font-bold mb-6">Product</h4>
          <ul className="space-y-4 text-slate-400">
            <li><a href="#features" className="hover:text-primary transition-colors">Features</a></li>
            <li><a href="#solutions" className="hover:text-primary transition-colors">Solutions</a></li>
            <li><a href="#pricing" className="hover:text-primary transition-colors">Pricing</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Changelog</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6">Company</h4>
          <ul className="space-y-4 text-slate-400">
            <li><a href="#about" className="hover:text-primary transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6">Resources</h4>
          <ul className="space-y-4 text-slate-400">
            <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Community</a></li>
            <li><a href="#blog" className="hover:text-primary transition-colors">Blog</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-slate-500 text-sm">
          © 2026 IQratech Inc. All rights reserved.
        </p>
        <p className="text-slate-500 text-sm flex items-center gap-1">
          Made with <span className="text-red-500">❤️</span> in India, for the World.
        </p>
      </div>
    </footer>
  );
}
