import * as React from 'react';
import { Navbar, Footer } from './components/Layout';
import { Hero } from './components/Hero';
import { Problem, BentoGrid } from './components/Features';
import { FeatureDeepDive } from './components/FeatureDeepDive';
import { Testimonials, Pricing } from './components/Pricing';
import { About } from './components/About';
import { BlogList } from './components/BlogList';
import { BlogAdmin } from './components/BlogAdmin';
import { ErrorBoundary } from './components/ErrorBoundary';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './lib/firebase';

export default function App() {
  const [user] = useAuthState(auth);
  const isAdmin = user?.email === 'zubairrazasiddiqui@gmail.com';

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white selection:bg-primary/20 selection:text-primary">
        <Navbar />
        <main>
          <Hero />
          <Problem />
          <BentoGrid />
          <FeatureDeepDive />
          
          {/* Blog Section */}
          <section id="blog" className="py-24 px-6 bg-slate-50">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-display font-bold text-dark mb-4">Latest Insights</h2>
                <p className="text-slate-600 text-lg">Stay updated with the latest in business automation and growth.</p>
              </div>
              <BlogList />
            </div>
          </section>

          {/* Admin Panel (Only visible to you) */}
          {isAdmin && (
            <section id="admin" className="py-24 px-6 bg-white border-t border-slate-100">
              <BlogAdmin />
            </section>
          )}

          <Testimonials />
          <Pricing />
          <About />
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}
