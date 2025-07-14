import NextAuth from 'next-auth/next';
import { supabase } from '@/lib/supabase/client';
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

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
    async jwt({ token, user }: { token: JWT; user?: unknown }) {
      if (user && typeof user === "object" && user !== null && "id" in user && "email" in user) {
        // @ts-expect-error: user shape is dynamic
        token.sub = user.id;
        // @ts-expect-error: user shape is dynamic
        token.email = user.email;
        // @ts-expect-error: user shape is dynamic
        token.name = user.name;
      }
      return token;
    },
    // @ts-expect-error: NextAuth session.user type augmentation limitation
    async session({ session, token }: { session: Session; token: JWT }) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (!session.user) session.user = {} as any;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (session.user as any).id = token.sub;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (session.user as any).email = token.email;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (session.user as any).name = token.name;
      return session;
    },
  },
  secret: process.env.AUTH_SECRET as string,
});

export { handler as GET, handler as POST };