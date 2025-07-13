// src/lib/supabase/types.ts
export interface Database {
  public: {
    Tables: {
      posts: {
        Row: {
          id: number;
          title: string;
          slug: string;
          content: string;
          published: boolean;
          created_at: string;
          user_id: string;
        };
        Insert: {
          id?: number;
          title: string;
          slug: string;
          content: string;
          published?: boolean;
          created_at?: string;
          user_id: string;
        };
        Update: {
          id?: number;
          title?: string;
          slug?: string;
          content?: string;
          published?: boolean;
          created_at?: string;
          user_id?: string;
        };
      };
      profiles: {
        Row: {
          id: string;
          name: string | null;
          avatar_url: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
        };
      };
    };
  };
}