'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase/client';

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await supabase.auth.getUser();
        setUser(data.user);
      } catch (error) {
        console.error('Error getting user:', error);
      } finally {
        setLoading(false);
      }
    };

    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session && session.user ? session.user : null);
      setLoading(false);
    });

    return () => listener?.subscription.unsubscribe();
  }, []);

  return (
    <header className="glass sticky top-0 z-50 border-b border-[#2f3336] shadow-x-lg backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between py-4">
          {/* Logo / Brand */}
          <Link
            href="/"
            className="flex-shrink-0"
          >
            <span className="gradient-text bg-gradient-to-r from-[#1d9bf0] to-[#667eea] bg-clip-text text-transparent text-2xl md:text-3xl font-black tracking-tight hover:scale-105 transition-transform duration-300">
              BLOG AV
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-8">
            <Link
              href="/"
              className="px-4 py-2 rounded-full text-white hover:bg-[#16181c] hover:text-[#1d9bf0] transition-all duration-200 hover:scale-105 text-sm font-semibold"
            >
              Home
            </Link>
            <Link
              href="/blog"
              className="px-4 py-2 rounded-full text-white hover:bg-[#16181c] hover:text-[#1d9bf0] transition-all duration-200 hover:scale-105 text-sm font-semibold"
            >
              Blogs
            </Link>

            {/* Auth Buttons */}
            {!loading && (
              <>
                {!user ? (
                  <>
                    <Link
                      href="/login"
                      className="px-6 py-2 rounded-full border-2 border-[#2f3336] text-white font-bold hover:bg-[#16181c] hover:border-[#1d9bf0] transition-all duration-200 hover:scale-105"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/signup"
                      className="btn-premium px-6 py-2 text-sm font-bold hover:scale-105 transition-all duration-200"
                    >
                      Sign Up
                    </Link>
                  </>
                ) : (
                  <Link
                    href="/profile"
                    className="px-6 py-2 rounded-full text-white hover:bg-[#16181c] hover:text-[#1d9bf0] transition-all duration-200 hover:scale-105 font-bold"
                  >
                    Profile
                  </Link>
                )}
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}