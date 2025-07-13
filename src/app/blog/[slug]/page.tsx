import { supabase } from '@/lib/supabase/client';
import { notFound } from 'next/navigation';
import MarkdownRenderer from '@/app/components/blog/MarkdownRenderer';

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  console.log('Looking for post with slug:', slug);
  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single();
  console.log('Supabase post result:', post, 'Error:', error);

  if (!post) notFound();

  return (
    <div className="py-12 lg:py-16 bg-[#000000] min-h-screen relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#000000] via-[#0f0f0f] to-[#16181c]"></div>
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <article className="card p-8 shadow-x-lg">
            <header className="mb-8">
              <h1 className="text-4xl lg:text-5xl font-black mb-6 text-white leading-tight">
                {post.title}
              </h1>
              <div className="flex items-center gap-3 text-sm text-[#71767b] mb-6">
                <span className="font-semibold text-[#1d9bf0]">By User</span>
                <span className="w-1 h-1 bg-[#71767b] rounded-full"></span>
                <time dateTime={post.created_at} className="font-medium">
                  {new Date(post.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>
              <div className="w-full h-px bg-gradient-to-r from-transparent via-[#2f3336] to-transparent"></div>
            </header>
            
            <div className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-[#e7e9ea] prose-strong:text-white prose-a:text-[#1d9bf0] prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-[#1d9bf0] prose-blockquote:bg-[#16181c] prose-blockquote:border-l-4 prose-blockquote:pl-4 prose-blockquote:py-2 prose-blockquote:rounded-r-lg prose-code:bg-[#16181c] prose-code:text-[#1d9bf0] prose-code:px-2 prose-code:py-1 prose-code:rounded prose-pre:bg-[#16181c] prose-pre:border prose-pre:border-[#2f3336]">
              <MarkdownRenderer content={post.content} />
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}