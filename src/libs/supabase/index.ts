import env from '@/env/client.mjs';
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

export type Site = Database['public']['Tables']['site']['Row'];
export type Post = Database['public']['Tables']['post']['Row'];
export type RecentPosts = Database['public']['Functions']['get_recent_posts']['Returns'];

export default createClient<Database>(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  { auth: { persistSession: false } },
);
