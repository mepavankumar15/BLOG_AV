// src/types/database.ts
import type { Database } from '@/lib/supabase/types';

export type Post = Database['public']['Tables']['posts']['Row'];
export type Profile = Database['public']['Tables']['profiles']['Row'];