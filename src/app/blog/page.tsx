// src/app/blog/page.tsx
import { supabase } from '@/lib/supabase/client';
import PostCard from '@/app/components/blog/PostCard';

export default async function BlogPage() {
  // Fetch posts without join for debugging
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });

  // Debug log
  // eslint-disable-next-line no-console
  console.log('Fetched posts:', posts, 'Error:', error);

  return (
    <div className="py-16 lg:py-24 bg-[#000000] min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-16">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl lg:text-6xl font-black text-white mb-6">
              Discover{' '}
              <span className="gradient-text bg-gradient-to-r from-[#1d9bf0] to-[#667eea] bg-clip-text text-transparent">
                Amazing Stories
              </span>
            </h1>
            <p className="text-xl text-[#71767b] max-w-2xl mx-auto leading-relaxed">
              Explore thought-provoking content from our community of writers and creators.
            </p>
          </div>
          
          <div className="grid gap-8 max-w-4xl mx-auto">
            {posts?.map((post, index) => (
              <div key={post.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <PostCard
                  title={post.title}
                  slug={post.slug}
                  author={post.user_id}
                  date={post.created_at}
                />
              </div>
            ))}
            
            {(!posts || posts.length === 0) && (
              <div className="text-center py-16">
                <h3 className="text-2xl font-bold text-white mb-2">No posts yet</h3>
                <p className="text-[#71767b]">Be the first to share your story!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}