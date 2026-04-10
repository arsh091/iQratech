import * as React from 'react';
import { motion } from 'motion/react';
import { 
  collection, 
  query, 
  orderBy, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  serverTimestamp, 
  onSnapshot 
} from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db, handleFirestoreError, OperationType } from '@/src/lib/firebase';
import { Plus, Edit2, Trash2, Save, X, Eye, FileText } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/src/lib/utils';

export function BlogAdmin() {
  const [user] = useAuthState(auth);
  const [posts, setPosts] = React.useState<any[]>([]);
  const [isEditing, setIsEditing] = React.useState(false);
  const [currentPost, setCurrentPost] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  // Form State
  const [formData, setFormData] = React.useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    status: 'draft' as 'draft' | 'published',
    coverImage: ''
  });

  React.useEffect(() => {
    if (!user) return;

    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
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
  }, [user]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const postData = {
      ...formData,
      authorId: user.uid,
      authorName: user.displayName || 'Admin',
      updatedAt: serverTimestamp(),
    };

    try {
      if (currentPost) {
        await updateDoc(doc(db, 'posts', currentPost.id), postData);
      } else {
        await addDoc(collection(db, 'posts'), {
          ...postData,
          createdAt: serverTimestamp(),
        });
      }
      resetForm();
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'posts');
    }
  };

  const handleDelete = async (postId: string) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      await deleteDoc(doc(db, 'posts', postId));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `posts/${postId}`);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      content: '',
      excerpt: '',
      status: 'draft',
      coverImage: ''
    });
    setCurrentPost(null);
    setIsEditing(false);
  };

  const startEdit = (post: any) => {
    setCurrentPost(post);
    setFormData({
      title: post.title,
      slug: post.slug,
      content: post.content,
      excerpt: post.excerpt || '',
      status: post.status,
      coverImage: post.coverImage || ''
    });
    setIsEditing(true);
  };

  if (!user) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Please login to access the Admin Panel</h2>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-display font-bold text-dark">Blog Management</h2>
        {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white font-bold rounded-full hover:bg-blue-700 transition-all shadow-lg shadow-primary/20"
          >
            <Plus className="w-5 h-5" />
            New Post
          </button>
        )}
      </div>

      {isEditing ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl mb-12"
        >
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold">{currentPost ? 'Edit Post' : 'Create New Post'}</h3>
            <button onClick={resetForm} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
              <X className="w-6 h-6 text-slate-400" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Title</label>
                <input 
                  type="text"
                  required
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value, slug: e.target.value.toLowerCase().replace(/ /g, '-')})}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="Enter post title"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Slug</label>
                <input 
                  type="text"
                  required
                  value={formData.slug}
                  onChange={e => setFormData({...formData, slug: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="url-friendly-slug"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Excerpt</label>
              <textarea 
                rows={2}
                value={formData.excerpt}
                onChange={e => setFormData({...formData, excerpt: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                placeholder="Short summary for the card..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Content (Markdown)</label>
              <textarea 
                required
                rows={10}
                value={formData.content}
                onChange={e => setFormData({...formData, content: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-mono text-sm"
                placeholder="Write your post content here..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Cover Image URL</label>
                <input 
                  type="url"
                  value={formData.coverImage}
                  onChange={e => setFormData({...formData, coverImage: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="https://picsum.photos/..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Status</label>
                <select 
                  value={formData.status}
                  onChange={e => setFormData({...formData, status: e.target.value as any})}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>

            <div className="pt-4 flex gap-4">
              <button 
                type="submit"
                className="flex-1 py-4 bg-primary text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                {currentPost ? 'Update Post' : 'Publish Post'}
              </button>
              <button 
                type="button"
                onClick={resetForm}
                className="px-8 py-4 bg-slate-100 text-dark font-bold rounded-xl hover:bg-slate-200 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {loading ? (
            <div className="py-12 text-center text-slate-400">Loading posts...</div>
          ) : posts.length === 0 ? (
            <div className="py-20 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
              <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 font-medium">No posts found. Start by creating one!</p>
            </div>
          ) : (
            posts.map(post => (
              <div key={post.id} className="bg-white p-6 rounded-2xl border border-slate-200 flex items-center justify-between group hover:border-primary transition-all">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-xl bg-slate-100 overflow-hidden shrink-0">
                    {post.coverImage ? (
                      <img src={post.coverImage} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-300">
                        <FileText />
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-dark group-hover:text-primary transition-colors">{post.title}</h4>
                    <div className="flex items-center gap-3 mt-1">
                      <span className={cn(
                        "text-[10px] font-bold uppercase px-2 py-0.5 rounded-full",
                        post.status === 'published' ? "bg-success/10 text-success" : "bg-slate-100 text-slate-500"
                      )}>
                        {post.status}
                      </span>
                      <span className="text-xs text-slate-400">
                        {post.createdAt ? format(post.createdAt.toDate(), 'MMM d, yyyy') : 'Just now'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => startEdit(post)}
                    className="p-2 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
                    title="Edit"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => handleDelete(post.id)}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
