import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="py-12 lg:py-20 bg-[#000000] min-h-screen relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#000000] via-[#0f0f0f] to-[#16181c]"></div>
      
      {/* Subtle background elements */}
      <div className="absolute top-20 left-10 w-48 h-48 bg-[#1d9bf0] rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
      <div className="absolute top-40 right-10 w-48 h-48 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
      
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center animate-fade-in mb-20">
          <h1 className="text-4xl lg:text-6xl font-black mb-6 text-white leading-tight">
            Welcome to{' '}
            <span className="gradient-text bg-gradient-to-r from-[#1d9bf0] to-[#667eea] bg-clip-text text-transparent">
              BLOG AV
            </span>
          </h1>
          <p className="text-lg lg:text-xl text-[#71767b] mb-8 max-w-2xl mx-auto leading-relaxed">
            Share your thoughts, stories, and ideas with the world. Create, publish, and discover amazing content in a premium experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/blog"
              className="btn-premium px-6 py-3 text-base font-bold hover:scale-105 transition-transform duration-200"
            >
              Explore Blogs
            </Link>
          </div>
        </div>
        
        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-20">
          <div className="card p-8 text-center hover-lift">
            <h3 className="text-xl font-bold text-white mb-6">Rich Content Creation</h3>
            <p className="text-sm text-[#71767b] leading-relaxed mb-6">
              Create beautiful posts with full markdown support, including headers, lists, code blocks, and rich formatting. Express your ideas with complete creative freedom.
            </p>
            <div className="text-xs text-[#1d9bf0] font-semibold">
              • Markdown Support • Code Highlighting • Rich Text Formatting • Image Embedding
            </div>
          </div>
          
          <div className="card p-8 text-center hover-lift">
            <h3 className="text-xl font-bold text-white mb-6">Vibrant Community</h3>
            <p className="text-sm text-[#71767b] leading-relaxed mb-6">
              Connect with writers and readers from around the world. Share insights, discover new perspectives, and build meaningful connections through thoughtful content.
            </p>
            <div className="text-xs text-[#1d9bf0] font-semibold">
              • Global Writers • Reader Engagement • Thoughtful Discussions • Knowledge Sharing
            </div>
          </div>
          
          <div className="card p-8 text-center hover-lift">
            <h3 className="text-xl font-bold text-white mb-6">Fast & Modern Platform</h3>
            <p className="text-sm text-[#71767b] leading-relaxed mb-6">
              Built with cutting-edge technologies like Next.js and Supabase for lightning-fast performance, real-time updates, and a seamless user experience.
            </p>
            <div className="text-xs text-[#1d9bf0] font-semibold">
              • Next.js 15 • Supabase • Real-time Updates • Optimized Performance
            </div>
          </div>
        </div>
        
        {/* Additional section */}
        <div className="text-center">
          <div className="card p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">Ready to Start Writing?</h2>
            <p className="text-[#71767b] mb-8">
              Join our community of writers and share your stories with the world.
            </p>
            <Link
              href="/signup"
              className="btn-premium px-8 py-3 text-base font-bold hover:scale-105 transition-all duration-200"
            >
              Create Your Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}