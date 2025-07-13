'use client';

import { createPost } from '@/lib/actions';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';

export default function CreatePostPage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUserId(data.user?.id ?? null);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!loading && !userId) {
      router.push('/login');
    }
  }, [loading, userId, router]);

  async function handleSubmit(formData: FormData) {
    try {
      if (!userId) throw new Error('Not authenticated');
      await createPost(formData, userId);
      router.push('/blog');
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to create post');
    }
  }

  if (loading || !userId) {
    return (
      <div className="py-12 lg:py-16 bg-[#000000] min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#000000] via-[#0f0f0f] to-[#16181c]"></div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-[#71767b] text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 lg:py-16 bg-[#000000] min-h-screen relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#000000] via-[#0f0f0f] to-[#16181c]"></div>
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-black text-white mb-2">
              Create New Post
            </h1>
            <p className="text-[#71767b]">Share your thoughts with the world</p>
          </div>
          
          <div className="card p-8 shadow-x-lg">
            <form action={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="title" className="block text-sm font-bold text-white">
                  Post Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="block w-full bg-[#16181c] border border-[#2f3336] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#1d9bf0] focus:border-[#1d9bf0] transition-all duration-200"
                  placeholder="Enter your post title"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="slug" className="block text-sm font-bold text-white">
                  URL Slug
                </label>
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  className="block w-full bg-[#16181c] border border-[#2f3336] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#1d9bf0] focus:border-[#1d9bf0] transition-all duration-200"
                  placeholder="my-awesome-post"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="content" className="block text-sm font-bold text-white">
                  Content (Markdown)
                </label>
                <textarea
                  id="content"
                  name="content"
                  rows={20}
                  className="block w-full bg-[#16181c] border border-[#2f3336] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#1d9bf0] focus:border-[#1d9bf0] transition-all duration-200 font-mono text-sm"
                  placeholder="Write your post content here using Markdown..."
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="btn-premium px-8 py-3 text-lg font-bold hover:scale-105 transition-all duration-200"
                >
                  Publish Post
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}