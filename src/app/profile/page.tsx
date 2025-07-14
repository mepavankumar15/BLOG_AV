"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Post {
  id: number;
  title: string;
  slug: string;
  created_at: string;
}

interface Profile {
  id: string;
  name: string | null;
  email: string | null;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchProfileAndPosts() {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setProfile(null);
        setPosts([]);
        setLoading(false);
        return;
      }
      // Fetch profile
      const { data: profileData } = await supabase
        .from("profiles")
        .select("id, name")
        .eq("id", user.id)
        .single();
      setProfile({
        id: user.id,
        name: typeof profileData?.name === "string"
          ? profileData.name
          : typeof user.user_metadata?.name === "string"
            ? user.user_metadata.name
            : null,
        email: typeof user.email === "string" ? user.email : null,
      });
      // Fetch posts
      const { data: postsData } = await supabase
        .from("posts")
        .select("id, title, slug, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      setPosts(postsData || []);
      setLoading(false);
    }
    fetchProfileAndPosts();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="py-12 lg:py-16 bg-[#000000] min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#000000] via-[#0f0f0f] to-[#16181c]"></div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-[#71767b] text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="py-12 lg:py-16 bg-[#000000] min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#000000] via-[#0f0f0f] to-[#16181c]"></div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-[#71767b] text-lg mb-4">
            You haven&apos;t logged in yet.
          </div>
          <Link href="/login" className="text-[#1d9bf0] hover:text-[#1a8cd8] font-bold transition-colors duration-200">
            Sign in to continue
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 lg:py-16 bg-[#000000] min-h-screen relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#000000] via-[#0f0f0f] to-[#16181c]"></div>
      
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-white mb-2">
            Your Profile
          </h1>
          <p className="text-[#71767b]">Manage your account and posts</p>
        </div>
        
        <div className="card p-8 shadow-x-lg mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {profile.name || "Anonymous User"}
              </h2>
              <p className="text-[#71767b]">{profile.email}</p>
            </div>
            <Link
              href="/blog/create"
              className="btn-premium px-6 py-3 text-sm font-bold hover:scale-105 transition-all duration-200"
            >
              Create Post
            </Link>
          </div>
        </div>
        
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white mb-4">Your Blog Posts</h2>
          {posts.length === 0 ? (
            <div className="card p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-[#1d9bf0] to-[#667eea] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No posts yet</h3>
              <p className="text-[#71767b] mb-4">Start writing your first blog post!</p>
              <Link
                href="/blog/create"
                className="btn-premium px-6 py-2 text-sm font-bold hover:scale-105 transition-all duration-200"
              >
                Write Your First Post
              </Link>
            </div>
          ) : (
            <div className="grid gap-4">
              {posts.map((post) => (
                <div key={post.id} className="card p-6 hover-lift">
                  <Link href={`/blog/${post.slug}`} className="block">
                    <h3 className="text-xl font-bold text-white hover:text-[#1d9bf0] transition-colors duration-200 mb-2">
                      {post.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <time className="text-sm text-[#71767b]">
                        {new Date(post.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>
                      <span className="text-[#1d9bf0] text-sm font-semibold">Read post →</span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="text-center mt-8">
          <button
            onClick={handleSignOut}
            className="px-8 py-3 text-lg font-bold border-2 border-red-500 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-all duration-200 hover:scale-105"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
} 