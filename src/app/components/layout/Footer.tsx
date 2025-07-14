// src/app/components/layout/Footer.tsx
export default function Footer() {
  return (
    <footer className="glass border-t border-[#2f3336] py-6 sm:py-8 mt-12 sm:mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs sm:text-sm text-[#71767b]">
            © 2024 BLOG AV. Built with Next.js and Supabase.
          </p>
          <div className="mt-4 flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-6 text-xs text-[#71767b]">
            <a href="#" className="hover:text-[#1d9bf0] transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[#1d9bf0] transition-colors duration-200">
              Terms of Service
            </a>
            <a href="#" className="hover:text-[#1d9bf0] transition-colors duration-200">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}