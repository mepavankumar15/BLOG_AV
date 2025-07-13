'use server';

import { supabaseAdmin } from './supabase/admin-client';
import { supabase } from './supabase/client';

export async function createPost(formData: FormData, userId: string) {
  if (!userId) throw new Error('Unauthorized');
  const title = formData.get('title');
  const slug = formData.get('slug');
  const content = formData.get('content');
  console.log('Creating post:', { userId, title, slug, content });

  const { error } = await supabaseAdmin.from('posts').insert({
    user_id: userId,
    title,
    slug,
    content,
    published: true,
  });

  if (error) {
    console.error('SupabaseAdmin insert error:', JSON.stringify(error, null, 2));
    // Try with regular supabase client for more error details
    const { error: clientError } = await supabase.from('posts').insert({
      user_id: userId,
      title,
      slug,
      content,
      published: true,
    });
    if (clientError) {
      console.error('Supabase client insert error:', JSON.stringify(clientError, null, 2));
    }
    throw error;
  }
}