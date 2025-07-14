"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChangeEvent, FormEvent } from 'react';

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
  const [newUserId, setNewUserId] = useState('');
  const [changeStatus, setChangeStatus] = useState('');

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

  async function handleChangeUserId(e: FormEvent) {
    e.preventDefault();
    setChangeStatus('Processing...');
    if (!newUserId) {
      setChangeStatus('Please enter a new user ID.');
      return;
    }
    // 1. Check if newUserId already exists in profiles
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', newUserId)
      .single();
    if (existingProfile) {
      setChangeStatus('That user ID is already taken.');
      return;
    }
    // 2. Update profiles table
    const { error: profileError } = await supabase
      .from('profiles')
      .update({ id: newUserId })
      .eq('id', profile?.id);
    if (profileError) {
      setChangeStatus('Error updating profile: ' + profileError.message);
      return;
    }
    // 3. Update posts table
    const { error: postsError } = await supabase
      .from('posts')
      .update({ user_id: newUserId })
      .eq('user_id', profile?.id);
    if (postsError) {
      setChangeStatus('Error updating posts: ' + postsError.message);
      return;
    }
    setChangeStatus('User ID changed successfully! Please sign out and log in again.');
    setProfile((prev) => prev ? { ...prev, id: newUserId } : prev);
  }

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
              <p className="text-[#71767b] text-xs mt-2">User ID: {profile.id}</p>
            </div>
            <Link
              href="/blog/create"
              className="btn-premium px-6 py-3 text-sm font-bold hover:scale-105 transition-all duration-200"
            >
              Create Post
            </Link>
          </div>
          {/* Change User ID Form */}
          <form onSubmit={handleChangeUserId} className="mt-4 space-y-2">
            <label className="block text-sm text-white font-semibold mb-1">
              Change User ID (must be unique):
            </label>
            <input
              type="text"
              value={newUserId}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setNewUserId(e.target.value)}
              className="border px-2 py-1 rounded w-full text-black"
              required
            />
            <button type="submit" className="btn-premium px-4 py-1 text-sm font-bold mt-2">Change User ID</button>
            {changeStatus && <div className="text-xs mt-1 text-[#1d9bf0]">{changeStatus}</div>}
          </form>
        </div>
        
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white mb-4">Your Blog Posts</h2>
          {posts.length === 0 ? (
            <div className="card p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-[#1d9bf0] to-[#667eea] rounded-full flex items-center justify-center mx-auto mb-4">
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No posts yet</h3>

              <p  className="text-[#71767b] mb-4">Start writing your first blog post!</p>
              <div id="the-post">
              <Link
                href="/blog/create" 
                className="btn-premium px-6 py-2 text-sm font-bold hover:scale-105 transition-all duration-200"
              >
                Write Your First Post
              </Link>
              </div>
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
        
        <div id="sign-out" className="text-center mt-8">
          <button
            onClick={handleSignOut}
            className="btn-premium px-6 py-2 text-sm font-bold hover:scale-105 transition-all duration-200"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
} 