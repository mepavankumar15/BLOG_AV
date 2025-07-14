// src/app/components/blog/PostCard.tsx
import Link from 'next/link';

interface PostCardProps {
  title: string;
  slug: string;
  author: string | null;
  date: string;
}

export default function PostCard({ title, slug, author, date }: PostCardProps) {
  return (
    <article className="card p-8 hover-lift group relative overflow-hidden">
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1d9bf0]/5 to-[#667eea]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <Link href={`/blog/${slug}`} className="block relative z-10">
        <h2 className="text-2xl font-black text-white mb-4 group-hover:text-[#1d9bf0] transition-colors duration-200 leading-tight">
          {title}
        </h2>
        <div className="flex items-center gap-3 text-sm text-[#71767b]">
          {author && (
            <>
              <span className="font-semibold text-[#1d9bf0]">By {author}</span>
              <span className="w-1 h-1 bg-[#71767b] rounded-full"></span>
            </>
          )}
          <time dateTime={date} className="font-medium">
            {new Date(date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
        </div>
        
        {/* Read more indicator */}
        <div className="mt-4 flex items-center text-[#1d9bf0] font-semibold group-hover:translate-x-2 transition-transform duration-200">
          <span>Read more</span>
          <svg
            style={{ width: '1.5rem', height: '1.5rem' }}
            className="ml-2 group-hover:translate-x-1 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </Link>
    </article>
  );
}