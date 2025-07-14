import NextAuth from 'next-auth/next';
import { supabase } from '@/lib/supabase/client';

const handler = NextAuth({
  providers: [
    {
      id: 'supabase',
      name: 'Supabase',
      type: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: Record<'email' | 'password', string> | undefined) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const { data, error } = await supabase.auth.signInWithPassword({
          email: credentials.email,
          password: credentials.password,
        });

        if (error || !data.user) {
          return null;
        }

        return {
          id: data.user.id,
          email: data.user.email,
          name: data.user.user_metadata?.full_name || null,
        };
      },
    },
  ],
  callbacks: {
    async jwt({ token, user }: { token: unknown; user?: unknown }) {
      if (user && typeof user === 'object' && user !== null && 'id' in user && 'email' in user) {
        // @ts-expect-error: dynamic user object
        token = { ...token, sub: user.id, email: user.email };
      }
      return token;
    },
    async session({ session, token }: { session: unknown; token: unknown }) {
      // @ts-expect-error: dynamic session/token object
      if (token && typeof token === 'object' && token !== null && 'sub' in token && session && typeof session === 'object' && session !== null && 'user' in session) {
        // @ts-expect-error: dynamic session.user
        session.user.id = token.sub;
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET as string,
});

export { handler as GET, handler as POST };