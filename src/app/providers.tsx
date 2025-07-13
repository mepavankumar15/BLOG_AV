// src/app/providers.tsx
'use client';

export default function Providers({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  // No providers needed for Supabase - it handles auth state internally
  return <>{children}</>;
}