import * as React from 'react';
import { motion } from 'motion/react';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '@/src/lib/firebase';
import { format } from 'date-fns';
import { ArrowRight, Calendar, User } from 'lucide-react';

export function BlogList() {
  const [posts, setPosts] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const q = query(
      collection(db, 'posts'), 
      where('status', '==', 'published'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPosts(postsData);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'posts');
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-slate-500 font-medium">Loading latest stories...</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="py-20 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
        <p className="text-slate-500 font-medium">No blog posts yet. Check back soon!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post, i) => (
        <motion.article
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="group bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all hover:-translate-y-1"
        >
          <div className="aspect-[16/10] overflow-hidden relative">
            <img 
              src={post.coverImage || `https://picsum.photos/seed/${post.slug}/800/500`} 
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-primary text-[10px] font-bold uppercase rounded-full shadow-sm">
                Business
              </span>
            </div>
          </div>
          
          <div className="p-8">
            <div className="flex items-center gap-4 text-xs text-slate-400 mb-4">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {post.createdAt ? format(post.createdAt.toDate(), 'MMM d, yyyy') : 'Recently'}
              </span>
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                {post.authorName}
              </span>
            </div>
            
            <h3 className="text-2xl font-bold text-dark mb-3 group-hover:text-primary transition-colors line-clamp-2">
              {post.title}
            </h3>
            
            <p className="text-slate-600 mb-6 line-clamp-3 leading-relaxed">
              {post.excerpt || post.content.substring(0, 150) + '...'}
            </p>
            
            <button className="flex items-center gap-2 text-primary font-bold group/btn">
              Read More
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
