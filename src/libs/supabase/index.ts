import env from '@/env/client.mjs';
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

type Public = Database['public'];

export type Tables<T extends keyof Public['Tables']> = Public['Tables'][T]['Row'];
export type Functions<T extends keyof Public['Functions']> = Public['Functions'][T]['Returns'];

export default createClient<Database>(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  { auth: { persistSession: false } },
);
