import { supabase } from './client';

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
}

export async function signUp(email: string, password: string, name: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: name },
    },
  });

  if (error) throw error;

  // Automatically create a profile row for the new user
  if (data.user) {
    const { id } = data.user;
    const { error: profileError } = await supabase.from('profiles').insert({
      id,
      name,
    });
    if (profileError) {
      // Optionally, handle or log the error
      console.error('Error creating profile:', profileError);
    }
  }

  return data;
}
