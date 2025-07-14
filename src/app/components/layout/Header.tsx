'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase/client';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
        <nav className="flex items-center justify-between py-3 sm:py-4">
          {/* Logo / Brand */}
          <Link
            href="/"
            className="flex-shrink-0"
          >
            <span className="gradient-text bg-gradient-to-r from-[#1d9bf0] to-[#667eea] bg-clip-text text-transparent text-xl sm:text-2xl md:text-3xl font-black tracking-tight hover:scale-105 transition-transform duration-300">
              BLOG AV
            </span>
          </Link>

          {/* Hamburger menu for mobile */}
          <button
            className="sm:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#1d9bf0]"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Navigation Links */}
          <div className="hidden sm:flex items-center space-x-4 md:space-x-8">
            <Link
              href="/"
              className="btn-premium px-4 md:px-6 py-2 text-sm font-bold hover:scale-105 transition-all duration-200"
            >
              Home
            </Link>
            <Link
              href="/blog"
              className="btn-premium px-4 md:px-6 py-2 text-sm font-bold hover:scale-105 transition-all duration-200"
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
                      className="btn-premium px-4 md:px-6 py-2 text-sm font-bold hover:scale-105 transition-all duration-200"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/signup"
                      className="btn-premium px-4 md:px-6 py-2 text-sm font-bold hover:scale-105 transition-all duration-200"
                    >
                      Sign Up
                    </Link>
                  </>
                ) : (
                  <Link
                    href="/profile"
                    className="px-4 md:px-6 py-2 rounded-full text-white hover:bg-[#16181c] hover:text-[#1d9bf0] transition-all duration-200 hover:scale-105 font-bold"
                  >
                    Profile
                  </Link>
                )}
              </>
            )}
          </div>

          {/* Mobile menu dropdown */}
          {mobileMenuOpen && (
            <div className="absolute top-full left-0 w-full bg-[#16181c] border-b border-[#2f3336] shadow-x-lg sm:hidden animate-fade-in z-50">
              <div className="flex flex-col py-4 px-6 space-y-2">
                <Link href="/" className="btn-premium py-2 text-base font-bold" onClick={() => setMobileMenuOpen(false)}>
                  Home
                </Link>
                <Link href="/blog" className="btn-premium py-2 text-base font-bold" onClick={() => setMobileMenuOpen(false)}>
                  Blogs
                </Link>
                {!loading && (
                  <>
                    {!user ? (
                      <>
                        <Link href="/login" className="btn-premium py-2 text-base font-bold" onClick={() => setMobileMenuOpen(false)}>
                          Sign In
                        </Link>
                        <Link href="/signup" className="btn-premium py-2 text-base font-bold" onClick={() => setMobileMenuOpen(false)}>
                          Sign Up
                        </Link>
                      </>
                    ) : (
                      <Link href="/profile" className="py-2 text-base font-bold text-white hover:text-[#1d9bf0]" onClick={() => setMobileMenuOpen(false)}>
                        Profile
                      </Link>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}