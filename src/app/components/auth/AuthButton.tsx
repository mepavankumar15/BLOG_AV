'use client';

import { useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase/client';
import Link from 'next/link';

export default function AuthButton() {
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
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => listener?.subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="px-6 py-2 rounded-full border-2 border-[#2f3336] text-[#71767b] font-bold opacity-50">
        Loading...
      </div>
    );
  }

  if (user) {
    return (
      <button
        onClick={() => supabase.auth.signOut()}
        className="px-6 py-2 rounded-full border-2 border-[#2f3336] text-white font-bold hover:bg-[#16181c] hover:border-[#1d9bf0] transition-all duration-200 hover:scale-105"
      >
        Sign Out
      </button>
    );
  }

  return (
    <Link
      href="/login"
      className="btn-premium px-6 py-2 text-sm font-bold hover:scale-105 transition-all duration-200"
    >
      Sign In
    </Link>
  );
}