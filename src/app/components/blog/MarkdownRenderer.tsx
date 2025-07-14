/* eslint-disable @next/next/no-img-element */
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-3xl font-black text-white mb-6 mt-8 leading-tight">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-bold text-white mb-4 mt-6 leading-tight">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-bold text-white mb-3 mt-5 leading-tight">{children}</h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-lg font-bold text-white mb-3 mt-4 leading-tight">{children}</h4>
          ),
          h5: ({ children }) => (
            <h5 className="text-base font-bold text-white mb-2 mt-3 leading-tight">{children}</h5>
          ),
          h6: ({ children }) => (
            <h6 className="text-sm font-bold text-white mb-2 mt-3 leading-tight">{children}</h6>
          ),
          p: ({ children }) => (
            <p className="text-[#e7e9ea] leading-7 mb-6 text-base">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="text-[#e7e9ea] mb-6 ml-6 space-y-2">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="text-[#e7e9ea] mb-6 ml-6 space-y-2">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="text-[#e7e9ea] leading-6">{children}</li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-[#1d9bf0] pl-6 py-4 my-6 bg-[#16181c] rounded-r-lg">
              <p className="text-[#71767b] italic text-lg leading-relaxed">{children}</p>
            </blockquote>
          ),
          code: ({ children, className }) => {
            const isInline = !className;
            return isInline ? (
              <code className="bg-[#16181c] text-[#1d9bf0] px-2 py-1 rounded text-sm font-mono border border-[#2f3336]">
                {children}
              </code>
            ) : (
              <pre className="bg-[#16181c] border border-[#2f3336] rounded-lg p-6 overflow-x-auto my-6 shadow-x">
                <code className="text-[#e7e9ea] font-mono text-sm leading-6">{children}</code>
              </pre>
            );
          },
          a: ({ children, href }) => (
            <a href={href} className="text-[#1d9bf0] hover:text-[#1a8cd8] font-semibold transition-colors duration-200">
              {children}
            </a>
          ),
          strong: ({ children }) => (
            <strong className="font-bold text-white">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="italic text-[#71767b]">{children}</em>
          ),
          hr: () => (
            <hr className="border-[#2f3336] my-8" />
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto my-6">
              <table className="min-w-full border border-[#2f3336] rounded-lg">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border border-[#2f3336] px-6 py-4 text-left text-white font-bold bg-[#16181c]">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-[#2f3336] px-6 py-4 text-[#e7e9ea]">
              {children}
            </td>
          ),
          // Note: Next.js recommends using <Image /> from 'next/image' for optimization. If you want to optimize images, replace <img> with <Image /> and handle props accordingly.
          img: ({ src, alt }) => (
            <img src={src} alt={alt} className="max-w-full h-auto rounded-lg my-6 shadow-x-lg" />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}