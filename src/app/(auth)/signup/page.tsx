'use client';

import { signUp } from '@/lib/supabase/auth-helpers';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    try {
      await signUp(
        formData.get('email') as string,
        formData.get('password') as string,
        formData.get('name') as string
      );
      router.push('/profile');
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Signup failed');
    }
  }

  return (
    <div className="py-12 lg:py-16 bg-[#000000] min-h-screen relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#000000] via-[#0f0f0f] to-[#16181c]"></div>
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-white mb-2">
              Join BLOG AV
            </h1>
            <p className="text-[#71767b]">Create your account and start sharing</p>
          </div>
          
          <div className="card p-8 shadow-x-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-bold text-white">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="block w-full bg-[#16181c] border border-[#2f3336] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#1d9bf0] focus:border-[#1d9bf0] transition-all duration-200"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-bold text-white">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="block w-full bg-[#16181c] border border-[#2f3336] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#1d9bf0] focus:border-[#1d9bf0] transition-all duration-200"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-bold text-white">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="block w-full bg-[#16181c] border border-[#2f3336] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#1d9bf0] focus:border-[#1d9bf0] transition-all duration-200"
                  placeholder="Create a strong password"
                  required
                />
              </div>
              <button
                type="submit"
                className="btn-premium w-full py-3 text-lg font-bold hover:scale-105 transition-all duration-200"
              >
                Create Account
              </button>
            </form>
            <div className="text-center mt-6">
              <span className="text-[#71767b]">Already have an account? </span>
              <Link href="/login" className="text-[#1d9bf0] hover:text-[#1a8cd8] font-bold transition-colors duration-200">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}